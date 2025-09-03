
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

export async function saveBlock(prevState: any, formData: FormData) {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { message: 'Não autenticado.', success: false, errors: null };
    }
    
    // Check for admin privileges in user_metadata
    if (user.user_metadata?.is_admin !== true) {
        return { message: 'Não autorizado.', success: false, errors: null };
    }

    try {
        const validatedBlock = blockSchema.safeParse({
            id: formData.get('id') as string | undefined,
            page_id: formData.get('page_id') as string,
            order_index: formData.get('order_index') as string,
            title: formData.get('title') as string,
            block_type: formData.get('block_type') as string,
            content: formData.get('content') as string | undefined,
        });

        if (!validatedBlock.success) {
            return { 
                message: 'Dados do bloco inválidos.', 
                success: false, 
                errors: validatedBlock.error.flatten().fieldErrors 
            };
        }

        const pageSlug = formData.get('pageSlug') as string;
        const image_file = formData.get('image_file') as File | null;
        const current_image_url = formData.get('current_image_url') as string | null;

        if (!pageSlug) {
             return { message: 'Slug da página ausente.', success: false, errors: null };
        }
        
        let imageUrl = current_image_url;

        if (image_file && image_file.size > 0) {
            if (image_file.size > MAX_FILE_SIZE) {
                 return { message: 'Tamanho máximo da imagem é 5MB.', success: false, errors: null };
            }
            if (!ACCEPTED_IMAGE_TYPES.includes(image_file.type)) {
                 return { message: 'Apenas os formatos .jpg, .jpeg, .png e .webp são aceitos.', success: false, errors: null };
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
                return { message: `Falha no upload da imagem: ${uploadError.message}`, success: false, errors: null };
            }

            const { data: { publicUrl } } = supabase.storage
                .from('site-images')
                .getPublicUrl(uploadData.path);
            imageUrl = publicUrl;
        }
        
        const dataToUpsert = {
            ...validatedBlock.data,
            image_url: imageUrl,
            updated_at: new Date().toISOString(),
            updated_by: user.id,
        };
        
        if (!dataToUpsert.id) {
            // @ts-ignore
            delete dataToUpsert.id;
        }

        const { error: dbError } = await supabase.from('blocks').upsert(dataToUpsert, { onConflict: 'id' });

        if (dbError) {
             console.error('Erro do Supabase:', dbError);
             return { message: dbError.message, success: false, errors: null };
        }

        revalidatePath(`/admin/pages/${pageSlug}`);
        revalidatePath(`/${pageSlug === 'home' ? '' : pageSlug }`);
        
        return { message: `Bloco ${dataToUpsert.id ? 'atualizado' : 'criado'} com sucesso.`, success: true, errors: null };

    } catch (error: any) {
        console.error("Erro na Server Action:", error);
        return { message: error.message || 'Ocorreu um erro inesperado no servidor.', success: false, errors: null };
    }
}

export async function deleteBlock(blockId: string, pageSlug: string) {
    const supabase = createClient();
    
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { message: 'Não autenticado', success: false };
    }
    
    if (user.user_metadata?.is_admin !== true) {
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
        
        if (findError && findError.code !== 'PGRST116') {
             throw findError;
        }

        if (block?.image_url) {
            try {
                const imagePath = new URL(block.image_url).pathname.split('/site-images/')[1];
                if (imagePath) {
                    await supabase.storage.from('site-images').remove([imagePath]);
                }
            } catch (e) {
                 console.error("Could not remove image from storage:", e);
            }
        }
        
        const { error: dbError } = await supabase.from('blocks').delete().eq('id', blockId);
        if (dbError) throw dbError;
        
        if (pageSlug) {
            revalidatePath(`/admin/pages/${pageSlug}`);
            revalidatePath(`/${pageSlug === 'home' ? '' : pageSlug }`);
        }

        return { message: 'Bloco excluído.', success: true };
    } catch (error: any) {
        console.error('Delete action error:', error);
        return { message: error.message || 'Ocorreu um erro inesperado ao excluir.', success: false };
    }
}
