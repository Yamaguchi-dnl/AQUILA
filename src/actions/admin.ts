
'use server'

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// Type for block data - could be expanded based on your form
type BlockData = {
    id?: string;
    page_id: string;
    order_index: number;
    block_type: string;
    title: string;
    content?: string;
    image_url?: string;
    pageSlug: string;
};

export async function updateBlock(data: BlockData) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { success: false, message: 'Não autenticado' };
    }
    
    // Check if user is admin
    const { data: userData } = await supabase
        .from('users')
        .select('is_admin')
        .eq('id', user.id)
        .single();
    
    if (!userData?.is_admin) {
        return { success: false, message: 'Não autorizado' };
    }

    const { pageSlug, ...blockData } = data;

    const dataToUpsert = {
        ...blockData,
        updated_by: user.id,
    };

    // If we are creating a new block, we don't include the id
    if (!data.id) {
        // @ts-ignore
        delete dataToUpsert.id;
    }

    try {
        const { error } = await supabase
            .from('blocks')
            .upsert(dataToUpsert, { onConflict: 'id' });

        if (error) {
            console.error('Supabase error:', error);
            throw new Error(error.message);
        }

        // Revalidate the page cache to show the changes immediately
        revalidatePath(`/admin/pages/${pageSlug}`);
        
        return { success: true, message: `Bloco ${data.id ? 'atualizado' : 'criado'} com sucesso.` };

    } catch (error: any) {
        console.error('Server action error:', error);
        return { success: false, message: error.message || 'Ocorreu um erro inesperado no servidor.' };
    }
}


export async function deleteBlock(blockId: string, imagePath: string | null, pageSlug: string) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { success: false, message: 'Não autenticado' };
    }
    
    const { data: userData } = await supabase
        .from('users')
        .select('is_admin')
        .eq('id', user.id)
        .single();
    
    if (!userData?.is_admin) {
        return { success: false, message: 'Não autorizado' };
    }

    try {
        // Delete image from storage if it exists
        if (imagePath) {
            const { error: storageError } = await supabase.storage.from('site-images').remove([imagePath]);
            if (storageError) {
                console.error("Could not delete image from storage:", storageError.message);
                // Non-fatal, we can still proceed to delete the block record
            }
        }

        // Delete the block record from the database
        const { error: dbError } = await supabase.from('blocks').delete().eq('id', blockId);
        if (dbError) throw dbError;
        
        revalidatePath(`/admin/pages/${pageSlug}`);

        return { success: true, message: 'Bloco excluído.' };
    } catch (error: any) {
        console.error('Delete action error:', error);
        return { success: false, message: error.message || 'Ocorreu um erro inesperado ao excluir.' };
    }
}
