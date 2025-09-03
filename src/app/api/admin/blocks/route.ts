
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';
import { cookies } from 'next/headers';

// POST (Create/Update a block)
export async function POST(request: NextRequest) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

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

    try {
        const { blockData, pageSlug } = await request.json();
        
        const dataToUpsert: any = {
            ...blockData,
            updated_at: new Date().toISOString(),
            updated_by: user.id,
        };
        
        // If it's a new block, remove the ID so Supabase can generate one.
        if (!blockData.id) {
            delete dataToUpsert.id;
        }

        const { error } = await supabase
            .from('blocks')
            .upsert(dataToUpsert, { onConflict: 'id' });

        if (error) {
            console.error('Supabase error:', error);
            throw new Error(error.message);
        }

        // Revalidate the path to show the updated content
        if (pageSlug) {
           revalidatePath(`/admin/pages/${pageSlug}`);
           revalidatePath(`/${pageSlug === 'home' ? '' : pageSlug }`); // Revalidate public page
        }
        
        return NextResponse.json({ message: `Bloco ${blockData.id ? 'atualizado' : 'criado'} com sucesso.` });

    } catch (error: any) {
        return NextResponse.json({ message: error.message || 'Ocorreu um erro inesperado no servidor.' }, { status: 500 });
    }
}


// DELETE a block
export async function DELETE(request: NextRequest) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    
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
        
        if (findError) throw findError;

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
