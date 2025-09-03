
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';
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
  current_image_url: z.string().url().optional(),
});

export async function POST(request: NextRequest) {
    const supabase = createClient();

    // 1. Authenticate user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return NextResponse.json({ message: 'Não autenticado' }, { status: 401 });
    }
    
    // 2. Authorize user (check if admin)
    const { data: userData, error: userError } = await supabase
        .from('users')
        .select('is_admin')
        .eq('id', user.id)
        .single();
    
    if (userError || !userData?.is_admin) {
        return NextResponse.json({ message: 'Não autorizado' }, { status: 403 });
    }

    try {
        const formData = await request.formData();
        const blockDataString = formData.get('blockData') as string;
        const pageSlug = formData.get('pageSlug') as string;
        const image_file = formData.get('image_file') as File | null;
        
        if (!blockDataString || !pageSlug) {
            return NextResponse.json({ message: 'Dados do bloco ou slug da página ausentes.' }, { status: 400 });
        }

        const parsedBlockData = JSON.parse(blockDataString);
        const validatedBlock = blockSchema.safeParse(parsedBlockData);
        
        if (!validatedBlock.success) {
            return NextResponse.json({ message: 'Dados do bloco inválidos.', errors: validatedBlock.error.flatten().fieldErrors }, { status: 400 });
        }

        let imageUrl = validatedBlock.data.current_image_url;

        // 3. Handle image upload if a file is present
        if (image_file && image_file.size > 0) {
            if (image_file.size > MAX_FILE_SIZE) {
                 return NextResponse.json({ message: 'Tamanho máximo da imagem é 5MB.' }, { status: 400 });
            }
            if (!ACCEPTED_IMAGE_TYPES.includes(image_file.type)) {
                 return NextResponse.json({ message: 'Apenas os formatos .jpg, .jpeg, .png e .webp são aceitos.' }, { status: 400 });
            }
            
            // Delete the old image if a new one is being uploaded for an existing block
            if (imageUrl) {
                try {
                    const oldPath = new URL(imageUrl).pathname.split('/site-images/')[1];
                    if (oldPath) await supabase.storage.from('site-images').remove([oldPath]);
                } catch (e) {
                    console.error("Não foi possível remover a imagem antiga:", e);
                }
            }
            
            // Upload the new image
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
        
        // 4. Prepare data for Supabase upsert
        const { current_image_url, ...dataToUpsert } = {
            ...validatedBlock.data,
            image_url: imageUrl,
            updated_at: new Date().toISOString(),
            updated_by: user.id,
        };
        
        if (!dataToUpsert.id) {
            delete dataToUpsert.id; // Let Supabase generate a new ID
        }

        // 5. Upsert block data into the database
        const { error: dbError } = await supabase.from('blocks').upsert(dataToUpsert, { onConflict: 'id' });

        if (dbError) {
             console.error('Erro do Supabase:', dbError);
             throw new Error(dbError.message);
        }

        // 6. Revalidate cache
        revalidatePath(`/admin/pages/${pageSlug}`);
        revalidatePath(`/${pageSlug === 'home' ? '' : pageSlug }`); // Revalidate public page
        
        return NextResponse.json({ message: `Bloco ${dataToUpsert.id ? 'atualizado' : 'criado'} com sucesso.` });

    } catch (error: any) {
        console.error("Erro na API POST:", error);
        return NextResponse.json({ message: error.message || 'Ocorreu um erro inesperado no servidor.' }, { status: 500 });
    }
}


// DELETE a block
export async function DELETE(request: NextRequest) {
    const supabase = createClient();
    
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ message: 'Não autenticado' }, { status: 401 });
    }
    
    const { data: userData, error: userError } = await supabase
        .from('users')
        .select('is_admin')
        .eq('id', user.id)
        .single();
    
    if (userError || !userData?.is_admin) {
        return NextResponse.json({ message: 'Não autorizado' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const blockId = searchParams.get('id');
    const pageSlug = searchParams.get('pageSlug');

    if (!blockId) {
        return NextResponse.json({ message: 'ID do bloco é obrigatório' }, { status: 400 });
    }

    try {
        const { data: block, error: findError } = await supabase
            .from('blocks')
            .select('image_url')
            .eq('id', blockId)
            .single();
        
        if (findError && findError.code !== 'PGRST116') { // Ignore "No rows found" error
             throw findError;
        }

        // If block has an image, try to delete it from storage
        if (block?.image_url) {
            try {
                const imagePath = new URL(block.image_url).pathname.split('/site-images/')[1];
                if (imagePath) {
                    await supabase.storage.from('site-images').remove([imagePath]);
                }
            } catch (e) {
                 // Log the error but don't block the request if image deletion fails
                 console.error("Could not remove image from storage:", e);
            }
        }
        
        // Delete the block from the database
        const { error: dbError } = await supabase.from('blocks').delete().eq('id', blockId);
        if (dbError) throw dbError;
        
        if (pageSlug) {
            revalidatePath(`/admin/pages/${pageSlug}`);
            revalidatePath(`/${pageSlug === 'home' ? '' : pageSlug }`); // Revalidate public page
        }

        return NextResponse.json({ message: 'Bloco excluído.' });
    } catch (error: any) {
        console.error('Delete action error:', error);
        return NextResponse.json({ message: error.message || 'Ocorreu um erro inesperado ao excluir.' }, { status: 500 });
    }
}
