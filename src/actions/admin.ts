
'use server';

import { createClientForAction } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

// Helper function to map slugs to actual paths
function getPublicPathFromSlug(slug: string): string {
    const slugToPathMap: { [key: string]: string } = {
        'home': '/',
        'sobre': '/sobre',
        'trabalhe-conosco': '/trabalhe-conosco',
        'equipa': '/equipa',
        'fundos': '/fundos',
        'golden-visa': '/golden-visa',
    };
    return slugToPathMap[slug] || `/${slug}`;
}


export async function savePage(formData: FormData) {
    const supabase = createClientForAction();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { success: false, message: 'Não autenticado.' };
    }

    try {
        const rawData = {
            id: formData.get('id') as string | undefined,
            title: formData.get('title') as string,
            slug: (formData.get('slug') as string).toLowerCase().replace(/\s+/g, '-'),
            description: formData.get('description') as string | undefined,
        };

        if (!rawData.title || !rawData.slug) {
            return { success: false, message: 'Título e Slug são obrigatórios.' };
        }
        
        // Check for duplicate slug
        const query = supabase.from('pages').select('id').eq('slug', rawData.slug);
        if (rawData.id) {
            query.neq('id', rawData.id);
        }
        const { data: existingPage, error: slugError } = await query.single();

        if (slugError && slugError.code !== 'PGRST116') { // Ignore "No rows found"
            throw new Error(`Erro ao verificar slug: ${slugError.message}`);
        }
        if (existingPage) {
            return { success: false, message: 'Este "slug" já está em uso por outra página.' };
        }

        const { error: dbError } = await supabase.from('pages').upsert(rawData);

        if (dbError) {
            throw new Error(`Erro no banco de dados: ${dbError.message}`);
        }

        revalidatePath('/admin/pages');
        if (rawData.id) {
            revalidatePath(`/admin/pages/${rawData.slug}`);
        }

        return { success: true, message: `Página ${rawData.id ? 'atualizada' : 'criada'} com sucesso.` };

    } catch (error: any) {
        console.error("Erro na Server Action (savePage):", error);
        return { success: false, message: error.message || 'Ocorreu um erro inesperado.' };
    }
}


export async function saveBlock(formData: FormData) {
    const supabase = createClientForAction();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { success: false, message: 'Não autenticado. Por favor, faça login novamente.' };
    }
        
    const blockId = formData.get('id') as string | undefined;
    const pageId = formData.get('page_id') as string;
    const pageSlug = formData.get('pageSlug') as string;

    // --- 1. Create a version of the current block BEFORE updating it ---
    if (blockId) {
        const { data: currentBlock } = await supabase
            .from('blocks')
            .select('*')
            .eq('id', blockId)
            .single();

        if (currentBlock) {
            const { error: versionError } = await supabase
                .from('block_versions')
                .insert({
                    version_of_block_id: currentBlock.id,
                    page_id: currentBlock.page_id,
                    order_index: currentBlock.order_index,
                    block_type: currentBlock.block_type,
                    title: currentBlock.title,
                    content: currentBlock.content,
                    sub_content: currentBlock.sub_content,
                    image_url: currentBlock.image_url,
                    versioned_by: user.id,
                });
            if (versionError) console.error("Could not save block version:", versionError.message);
        }
    }
    
    // --- 2. Process the new data and update the 'blocks' table ---
    try {
        const rawData = {
            id: blockId,
            page_id: pageId,
            order_index: parseInt(formData.get('order_index') as string, 10),
            title: formData.get('title') as string,
            block_type: formData.get('block_type') as string,
            content: formData.get('content') as string || undefined,
            sub_content: formData.get('sub_content') as string || undefined,
        };

        if (!rawData.page_id || !rawData.title || !rawData.block_type || isNaN(rawData.order_index)) {
             return { success: false, message: 'Dados do bloco inválidos. Campos obrigatórios estão faltando.' };
        }

        const image_file = formData.get('image_file') as File | null;
        const current_image_url = formData.get('current_image_url') as string | null;

        if (!pageSlug) {
             return { success: false, message: 'Slug da página ausente.' };
        }
        
        let imageUrl = current_image_url;

        if (image_file && image_file.size > 0) {
            if (image_file.size > MAX_FILE_SIZE) {
                 return { success: false, message: 'Tamanho máximo da imagem é 5MB.' };
            }
            if (!ACCEPTED_IMAGE_TYPES.includes(image_file.type)) {
                 return { success: false, message: 'Apenas os formatos .jpg, .jpeg, .png e .webp são aceitos.' };
            }
            
            if (imageUrl) {
                try {
                    const oldPath = new URL(imageUrl).pathname.split('/site-images/')[1];
                    if (oldPath) await supabase.storage.from('site-images').remove([oldPath]);
                } catch (e) {
                    console.error("Não foi possível remover a imagem antiga:", e);
                }
            }
            
            const filePath = `${pageSlug}/${Date.now()}-${image_file.name}`;
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('site-images')
                .upload(filePath, image_file);

            if (uploadError) {
                return { success: false, message: `Falha no upload da imagem: ${uploadError.message}` };
            }

            const { data: { publicUrl } } = supabase.storage
                .from('site-images')
                .getPublicUrl(uploadData.path);
            imageUrl = publicUrl;
        }
        
        const dataToUpsert: any = {
            ...rawData,
            image_url: imageUrl,
            updated_at: new Date().toISOString(),
            updated_by: user.id,
        };
        
        if (!dataToUpsert.id) {
            delete dataToUpsert.id;
            // When creating a new block, we set the updated_by as created_by
            dataToUpsert.created_by = user.id;
        }

        const { data: upsertedData, error: dbError } = await supabase
            .from('blocks')
            .upsert(dataToUpsert, { onConflict: 'id' })
            .select()
            .single();

        if (dbError) {
             console.error('Erro do Supabase:', dbError);
             return { success: false, message: `Erro no banco de dados: ${dbError.message}` };
        }
        
        // --- 3. Revalidate paths ---
        const publicPath = getPublicPathFromSlug(pageSlug);
        revalidatePath(`/admin/pages/${pageSlug}`);
        revalidatePath(`/admin/history`);
        revalidatePath(publicPath);
        
        return { success: true, message: `Bloco ${dataToUpsert.id ? 'atualizado' : 'criado'} com sucesso.` };

    } catch (error: any) {
        console.error("Erro na Server Action:", error);
        return { success: false, message: error.message || 'Ocorreu um erro inesperado no servidor.' };
    }
}


export async function revertBlockToVersion(versionId: string, pageSlug: string) {
    const supabase = createClientForAction();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { success: false, message: 'Não autenticado.' };
    }

    try {
        // 1. Get the version data
        const { data: versionData, error: versionError } = await supabase
            .from('block_versions')
            .select('*')
            .eq('version_id', versionId)
            .single();

        if (versionError || !versionData) {
            throw new Error('Versão não encontrada ou erro ao buscar.');
        }

        const blockId = versionData.version_of_block_id;

        // 2. Save the CURRENT live block to history before overwriting it
        const { data: currentBlock } = await supabase
            .from('blocks')
            .select('*')
            .eq('id', blockId)
            .single();

        if (currentBlock) {
             await supabase
                .from('block_versions')
                .insert({
                    version_of_block_id: currentBlock.id,
                    page_id: currentBlock.page_id,
                    order_index: currentBlock.order_index,
                    block_type: currentBlock.block_type,
                    title: currentBlock.title,
                    content: currentBlock.content,
                    sub_content: currentBlock.sub_content,
                    image_url: currentBlock.image_url,
                    versioned_by: user.id,
                });
        }

        // 3. Restore the old version to the live 'blocks' table
        const { error: revertError } = await supabase
            .from('blocks')
            .update({
                order_index: versionData.order_index,
                block_type: versionData.block_type,
                title: versionData.title,
                content: versionData.content,
                sub_content: versionData.sub_content,
                image_url: versionData.image_url,
                updated_at: new Date().toISOString(),
                updated_by: user.id,
            })
            .eq('id', blockId);

        if (revertError) {
            throw new Error(`Erro ao reverter o bloco: ${revertError.message}`);
        }

        // 4. Revalidate paths
        const publicPath = getPublicPathFromSlug(pageSlug);
        revalidatePath(`/admin/pages/${pageSlug}`);
        revalidatePath('/admin/history');
        revalidatePath(publicPath);

        return { success: true, message: 'Bloco restaurado para a versão selecionada.' };

    } catch (error: any) {
        console.error("Erro na ação de reverter:", error);
        return { success: false, message: error.message };
    }
}


export async function deleteBlock(blockId: string, pageSlug: string) {
    try {
        const supabase = createClientForAction();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return { message: 'Não autenticado', success: false };
        }
        
        if (!blockId) {
            return { message: 'ID do bloco é obrigatório', success: false };
        }

        const { data: block, error: findError } = await supabase
            .from('blocks')
            .select('image_url')
            .eq('id', blockId)
            .single();
        
        if (findError && findError.code !== 'PGRST116') { // Ignora erro "nenhuma linha encontrada"
             throw findError;
        }

        if (block?.image_url) {
            try {
                const imagePath = new URL(block.image_url).pathname.split('/site-images/')[1];
                if (imagePath) {
                    await supabase.storage.from('site-images').remove([imagePath]);
                }
            } catch (e) {
                 console.error("Não foi possível remover imagem do storage:", e);
            }
        }
        
        const { error: dbError } = await supabase.from('blocks').delete().eq('id', blockId);
        if (dbError) {
            console.error('Erro do Supabase:', dbError);
            return { message: `Erro no banco de dados: ${dbError.message}`, success: false };
        }
        
        if (pageSlug) {
            const publicPath = getPublicPathFromSlug(pageSlug);
            revalidatePath(`/admin/pages/${pageSlug}`);
            revalidatePath(publicPath);
            revalidatePath('/admin/history');
        }

        return { message: 'Bloco excluído.', success: true };
    } catch (error: any) {
        console.error('Erro na ação de excluir:', error);
        return { message: error.message || 'Ocorreu um erro inesperado ao excluir.', success: false };
    }
}
