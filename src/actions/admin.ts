
'use server';

import { createClientForAction } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export async function saveBlock(formData: FormData) {
    const supabase = createClientForAction();

    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return { success: false, message: 'Não autenticado. Por favor, faça login novamente.' };
        }
        
        const rawData = {
            id: formData.get('id') as string || undefined,
            page_id: formData.get('page_id') as string,
            order_index: parseInt(formData.get('order_index') as string, 10),
            title: formData.get('title') as string,
            block_type: formData.get('block_type') as string,
            content: formData.get('content') as string || undefined,
        };

        if (!rawData.page_id || !rawData.title || !rawData.block_type || isNaN(rawData.order_index)) {
             return { success: false, message: 'Dados do bloco inválidos. Campos obrigatórios estão faltando.' };
        }

        const pageSlug = formData.get('pageSlug') as string;
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
        }

        const { error: dbError } = await supabase.from('blocks').upsert(dataToUpsert, { onConflict: 'id' });

        if (dbError) {
             console.error('Erro do Supabase:', dbError);
             return { success: false, message: `Erro no banco de dados: ${dbError.message}` };
        }

        revalidatePath(`/admin/pages/${pageSlug}`);
        revalidatePath(`/${pageSlug === 'home' ? '' : pageSlug }`);
        
        return { success: true, message: `Bloco ${dataToUpsert.id ? 'atualizado' : 'criado'} com sucesso.` };

    } catch (error: any) {
        console.error("Erro na Server Action:", error);
        return { success: false, message: error.message || 'Ocorreu um erro inesperado no servidor.' };
    }
}

export async function deleteBlock(blockId: string, pageSlug: string) {
    const supabase = createClientForAction();
    
    try {
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
            revalidatePath(`/admin/pages/${pageSlug}`);
            revalidatePath(`/${pageSlug === 'home' ? '' : pageSlug }`);
        }

        return { message: 'Bloco excluído.', success: true };
    } catch (error: any) {
        console.error('Erro na ação de excluir:', error);
        return { message: error.message || 'Ocorreu um erro inesperado ao excluir.', success: false };
    }
}
