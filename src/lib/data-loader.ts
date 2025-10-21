
import { createClientForServerComponent } from "@/lib/supabase/server";

export type Block = {
    id: string;
    order_index: number;
    block_type: string;
    title: string | null;
    content: string | null;
    image_url: string | null;
    sub_content: string | null;
};

export async function getPageContentBySlug(slug: string): Promise<Block[]> {
    const supabase = createClientForServerComponent();
    
    const { data: pageData, error: pageError } = await supabase
        .from('pages')
        .select('id')
        .eq('slug', slug)
        .single();
    
    // Se a página não for encontrada ou ocorrer um erro, retorna um array vazio.
    // Isso evita poluir o console com erros para páginas que ainda não existem no CMS.
    if (pageError && pageError.code !== 'PGRST116') {
        console.error(`Error fetching page with slug "${slug}":`, pageError);
        return [];
    }

    if (!pageData) {
        return [];
    }
    
    const { data: blocksData, error: blocksError } = await supabase
        .from('blocks')
        .select('id, order_index, block_type, title, content, image_url, sub_content')
        .eq('page_id', pageData.id)
        .order('order_index', { ascending: true });

    if (blocksError) {
        console.error(`Error fetching blocks for page "${slug}":`, blocksError);
        return [];
    }
    
    return blocksData || [];
}

// Helper to find a specific block from the array
export function findBlock(blocks: Block[], blockType: string): Block | null {
    return blocks.find(b => b.block_type === blockType) || null;
}
