
'use server';

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const formSchema = z.object({
  id: z.string().optional(),
  page_id: z.string(),
  pageSlug: z.string(),
  order_index: z.coerce.number(),
  title: z.string().min(1, "O título é obrigatório."),
  block_type: z.string().min(1, "O tipo do bloco é obrigatório."),
  content: z.string().optional(),
  image_file: z
    .any()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, `Tamanho máximo da imagem é 5MB.`)
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Apenas os formatos .jpg, .jpeg, .png e .webp são aceitos."
    ).optional(),
  current_image_url: z.string().optional(),
});


export async function saveBlock(prevState: any, formData: FormData) {
    const supabase = createClient();

    // 1. Autenticação e Autorização
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { message: "Não autenticado. Faça login para continuar.", success: false };
    }
    const { data: userData, error: userError } = await supabase
        .from('users')
        .select('is_admin')
        .eq('id', user.id)
        .single();

    if (userError || !userData?.is_admin) {
        return { message: "Não autorizado.", success: false };
    }

    // 2. Validação dos dados do formulário
    const validatedFields = formSchema.safeParse(Object.fromEntries(formData.entries()));
    if (!validatedFields.success) {
        console.error(validatedFields.error.flatten().fieldErrors);
        return {
            message: "Dados do formulário inválidos. Verifique os campos.",
            success: false,
        };
    }
    
    const { image_file, current_image_url, pageSlug, ...blockData } = validatedFields.data;
    let imageUrl = current_image_url;

    try {
        // 3. Upload da Imagem (se houver)
        if (image_file && image_file.size > 0) {
            // Deleta a imagem antiga se uma nova for enviada
            if (current_image_url) {
                try {
                    const oldPath = new URL(current_image_url).pathname.split('/site-images/')[1];
                    if (oldPath) await supabase.storage.from('site-images').remove([oldPath]);
                } catch (e) {
                    console.error("Não foi possível remover a imagem antiga:", e);
                }
            }
            
            // Upload da nova imagem
            const filePath = `${pageSlug}/${Date.now()}-${image_file.name}`;
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('site-images')
                .upload(filePath, image_file);

            if (uploadError) throw new Error(`Falha no upload da imagem: ${uploadError.message}`);

            const { data: { publicUrl } } = supabase.storage
                .from('site-images')
                .getPublicUrl(uploadData.path);
            imageUrl = publicUrl;
        }

        // 4. Salvar os dados do bloco no banco de dados
        const dataToUpsert: any = {
            ...blockData,
            image_url: imageUrl,
            updated_at: new Date().toISOString(),
            updated_by: user.id,
        };
        
        if (!blockData.id) {
            delete dataToUpsert.id; // Deixa o Supabase gerar um novo ID
        }

        const { error: dbError } = await supabase.from('blocks').upsert(dataToUpsert, { onConflict: 'id' });

        if (dbError) {
             console.error('Erro do Supabase:', dbError);
             throw new Error(dbError.message);
        }

        // 5. Revalidação do Cache
        if (pageSlug) {
           revalidatePath(`/admin/pages/${pageSlug}`);
           revalidatePath(`/${pageSlug === 'home' ? '' : pageSlug }`); // Revalida a página pública
        }

        return { message: `Bloco ${blockData.id ? 'atualizado' : 'criado'} com sucesso.`, success: true };

    } catch (e: any) {
        console.error("Erro na Server Action saveBlock:", e);
        return { message: e.message || "Ocorreu um erro inesperado.", success: false };
    }
}
