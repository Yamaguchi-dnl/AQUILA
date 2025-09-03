'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const blockSchema = z.object({
  id: z.string().optional(),
  page_id: z.string(),
  order_index: z.coerce.number(),
  title: z.string().min(1, "O título é obrigatório."),
  block_type: z.string().min(1, "O tipo do bloco é obrigatório."),
  content: z.string().optional(),
});

// Ação para salvar/atualizar um bloco
export async function saveBlock(prevState: any, formData: FormData) {
    const supabase = createClient();

    // 1. Autenticar usuário
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { message: 'Não autenticado', success: false };
    }
    
    // 2. Autorizar usuário (verificar se é admin)
    const { data: userData, error: userError } = await supabase
        .from('users')
        .select('is_admin')
        .eq('id', user.id)
        .single();
    
    if (userError || !userData?.is_admin) {
        return { message: 'Não autorizado', success: false };
    }

    try {
        const blockPayload = {
            id: formData.get('id') as string | undefined,
            page_id: formData.get('page_id') as string,
            order_index: formData.get('order_index') as string,
            title: formData.get('title') as string,
            block_type: formData.get('block_type') as string,
            content: formData.get('content') as string | undefined,
        };
        
        const pageSlug = formData.get('pageSlug') as string;
        const image_file = formData.get('image_file') as File | null;
        const current_image_url = formData.get('current_image_url') as string | null;

        if (!pageSlug) {
             return { message: 'Slug da página ausente.', success: false };
        }
        
        const validatedBlock = blockSchema.safeParse(blockPayload);
        
        if (!validatedBlock.success) {
            return { message: 'Dados do bloco inválidos.', success: false, errors: validatedBlock.error.flatten().fieldErrors };
        }

        let imageUrl = current_image_url;

        // 3. Lidar com o upload da imagem se um arquivo estiver presente
        if (image_file && image_file.size > 0) {
            if (image_file.size > MAX_FILE_SIZE) {
                 return { message: 'Tamanho máximo da imagem é 5MB.', success: false };
            }
            if (!ACCEPTED_IMAGE_TYPES.includes(image_file.type)) {
                 return { message: 'Apenas os formatos .jpg, .jpeg, .png e .webp são aceitos.', success: false };
            }
            
            // Deletar a imagem antiga se uma nova estiver sendo enviada para um bloco existente
            if (imageUrl) {
                try {
                    const oldPath = new URL(imageUrl).pathname.split('/site-images/')[1];
                    if (oldPath) await supabase.storage.from('site-images').remove([oldPath]);
                } catch (e) {
                    console.error("Não foi possível remover a imagem antiga:", e);
                }
            }
            
            // Fazer o upload da nova imagem
            const filePath = `${pageSlug}/${Date.now()}-${image_file.name}`;
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('site-images')
                .upload(filePath, image_file);

            if (uploadError) {
                return { message: `Falha no upload da imagem: ${uploadError.message}`, success: false };
            }

            const { data: { publicUrl } } = supabase.storage
                .from('site-images')
                .getPublicUrl(uploadData.path);
            imageUrl = publicUrl;
        }
        
        // 4. Preparar dados para o upsert no Supabase
        const dataToUpsert = {
            ...validatedBlock.data,
            image_url: imageUrl,
            updated_at: new Date().toISOString(),
            updated_by: user.id,
        };
        
        if (!dataToUpsert.id) {
            // @ts-ignore
            delete dataToUpsert.id; // Deixa o Supabase gerar um novo ID
        }

        // 5. Fazer o upsert dos dados do bloco no banco de dados
        const { error: dbError } = await supabase.from('blocks').upsert(dataToUpsert, { onConflict: 'id' });

        if (dbError) {
             console.error('Erro do Supabase:', dbError);
             return { message: dbError.message, success: false };
        }

        // 6. Revalidar o cache
        revalidatePath(`/admin/pages/${pageSlug}`);
        revalidatePath(`/${pageSlug === 'home' ? '' : pageSlug }`); // Revalidar a página pública
        
        return { message: `Bloco ${dataToUpsert.id ? 'atualizado' : 'criado'} com sucesso.`, success: true };

    } catch (error: any) {
        console.error("Erro na Server Action:", error);
        return { message: error.message || 'Ocorreu um erro inesperado no servidor.', success: false };
    }
}


// Ação para excluir um bloco
export async function deleteBlock(blockId: string, pageSlug: string) {
    const supabase = createClient();
    
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { message: 'Não autenticado', success: false };
    }
    
    const { data: userData, error: userError } = await supabase
        .from('users')
        .select('is_admin')
        .eq('id', user.id)
        .single();
    
    if (userError || !userData?.is_admin) {
        return { message: 'Não autorizado', success: false };
    }
    
    if (!blockId) {
        return { message: 'ID do bloco é obrigatório', success: false };
    }

    try {
        const { data: block, error: findError } = await supabase
            .from('blocks')
            .select('image_url')
            .eq('id', blockId)
            .single();
        
        if (findError && findError.code !== 'PGRST116') { // Ignorar erro "No rows found"
             throw findError;
        }

        // Se o bloco tiver uma imagem, tentar deletá-la do storage
        if (block?.image_url) {
            try {
                const imagePath = new URL(block.image_url).pathname.split('/site-images/')[1];
                if (imagePath) {
                    await supabase.storage.from('site-images').remove([imagePath]);
                }
            } catch (e) {
                 // Registrar o erro, mas não bloquear a requisição se a exclusão da imagem falhar
                 console.error("Could not remove image from storage:", e);
            }
        }
        
        // Deletar o bloco do banco de dados
        const { error: dbError } = await supabase.from('blocks').delete().eq('id', blockId);
        if (dbError) throw dbError;
        
        if (pageSlug) {
            revalidatePath(`/admin/pages/${pageSlug}`);
            revalidatePath(`/${pageSlug === 'home' ? '' : pageSlug }`); // Revalidar a página pública
        }

        return { message: 'Bloco excluído.', success: true };
    } catch (error: any) {
        console.error('Delete action error:', error);
        return { message: error.message || 'Ocorreu um erro inesperado ao excluir.', success: false };
    }
}
