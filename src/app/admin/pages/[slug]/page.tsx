
import { createClientForServerComponent } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { PageEditor } from "@/components/admin/page-editor";

type Page = {
    id: string;
    title: string | null;
    slug: string;
}

type Block = {
    id: string;
    order_index: number;
    block_type: string;
    title: string | null;
    content: string | null;
    image_url: string | null;
    sub_content: string | null;
};

async function getPageData(slug: string) {
    const supabase = createClientForServerComponent();
    
    const { data: pageData, error: pageError } = await supabase
        .from('pages')
        .select('id, title, slug')
        .eq('slug', slug)
        .single();
    
    if (pageError || !pageData) {
        console.error("Error fetching page or page not found:", pageError);
        return { page: null, blocks: [] };
    }
    
    let { data: blocksData, error: blocksError } = await supabase
        .from('blocks')
        .select('id, order_index, block_type, title, content, image_url, sub_content')
        .eq('page_id', pageData.id)
        .order('order_index', { ascending: true });

    if (blocksError) {
        console.error("Error fetching blocks:", blocksError);
        return { page: pageData, blocks: [] };
    }
    
    // Filtro específico para a página golden-visa para remover blocos antigos/duplicados
    if (slug === 'golden-visa' && blocksData) {
        blocksData = blocksData.filter(block => block.block_type.startsWith('golden-visa-'));
    }
    
    return { page: pageData, blocks: blocksData || [] };
}


export default async function AdminSinglePage({ params }: { params: { slug: string } }) {
    const { slug } = params;
    
    if (!slug) {
        notFound();
    }

    const { page, blocks } = await getPageData(slug);
    
    if (!page) {
        return (
             <PageHeader title="Página não encontrada" subtitle="A página que você está tentando acessar não existe." />
        );
    }
    
    return (
        <>
            <PageHeader title={`Editando: ${page.title}`} subtitle={`Gerencie o conteúdo da página "${page.slug}"`} />
            <PageEditor initialPage={page} initialBlocks={blocks} />
        </>
    );
}
