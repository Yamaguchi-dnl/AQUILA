

"use client";

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useParams } from 'next/navigation';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Loader2, PlusCircle, Trash2, Edit } from 'lucide-react';
import { BlockFormDialog } from '@/components/forms/block-form';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

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
};

export default function AdminSinglePage() {
    const supabase = createClient();
    const params = useParams();
    const { toast } = useToast();
    
    const slug = params.slug as string;

    const [page, setPage] = useState<Page | null>(null);
    const [blocks, setBlocks] = useState<Block[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);
    
    const fetchData = useCallback(async () => {
        setLoading(true);
        if (!slug) return;
        try {
            const { data: pageData, error: pageError } = await supabase
                .from('pages')
                .select('id, title, slug')
                .eq('slug', slug)
                .single();
            
            if (pageError || !pageData) {
                console.error("Error fetching page or page not found:", pageError);
                toast({ variant: 'destructive', title: 'Erro', description: 'Página não encontrada.' });
                setPage(null);
                setBlocks([]);
            } else {
                setPage(pageData);
                const { data: blocksData, error: blocksError } = await supabase
                    .from('blocks')
                    .select('id, order_index, block_type, title, content, image_url')
                    .eq('page_id', pageData.id)
                    .order('order_index', { ascending: true });

                if (blocksError) {
                    console.error("Error fetching blocks:", blocksError);
                    toast({ variant: 'destructive', title: 'Erro', description: 'Não foi possível carregar os blocos.' });
                } else {
                    setBlocks(blocksData || []);
                }
            }
        } catch (error) {
            console.error(error);
            toast({ variant: 'destructive', title: 'Erro', description: 'Ocorreu um erro inesperado.' });
        } finally {
            setLoading(false);
        }
    }, [slug, supabase, toast]);

    useEffect(() => {
        fetchData();
    }, [slug, fetchData]);

    const handleAddBlock = () => {
        setSelectedBlock(null);
        setIsFormOpen(true);
    };

    const handleEditBlock = (block: Block) => {
        setSelectedBlock(block);
        setIsFormOpen(true);
    };

    const handleDeleteBlock = async (blockId: string) => {
        try {
             const response = await fetch(`/api/admin/blocks?id=${blockId}&pageSlug=${page!.slug}`, {
                method: 'DELETE',
            });
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message);
            }

            toast({ title: 'Sucesso', description: result.message });
            fetchData();
        } catch (error: any) {
            toast({ variant: 'destructive', title: 'Erro', description: error.message });
        }
    };
    
    if (loading) {
        return <div className="flex justify-center items-center h-full"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    }

    if (!page) {
        return <PageHeader title="Página não encontrada" subtitle="A página que você está tentando acessar não existe." />;
    }

    return (
        <>
            <PageHeader title={`Editando: ${page.title}`} subtitle={`Gerencie o conteúdo da página "${page.slug}"`}>
                <div className="flex justify-end mt-4">
                    <Button onClick={handleAddBlock}><PlusCircle className="mr-2 h-4 w-4" /> Adicionar Bloco</Button>
                </div>
            </PageHeader>
            <section className="py-8">
                 {blocks.length > 0 ? (
                    <div className="grid gap-6">
                        {blocks.map(block => (
                            <Card key={block.id} className="relative group">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <CardTitle>{block.title || "Bloco sem título"}</CardTitle>
                                        <Badge variant="outline">{block.block_type}</Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="grid md:grid-cols-3 gap-6">
                                    <div className="md:col-span-2 space-y-2">
                                        <p className="text-sm font-semibold text-muted-foreground">Conteúdo</p>
                                        <div 
                                            className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground" 
                                            dangerouslySetInnerHTML={{__html: block.content || '<p>Sem conteúdo.</p>'}} 
                                        />
                                    </div>
                                    {block.image_url && (
                                        <div className="space-y-2">
                                            <p className="text-sm font-semibold text-muted-foreground">Imagem</p>
                                            <Image 
                                                src={block.image_url} 
                                                alt={block.title || 'Imagem do bloco'} 
                                                width={200}
                                                height={150}
                                                className="rounded-md object-cover border"
                                            />
                                        </div>
                                    )}
                                </CardContent>
                                <CardFooter className="flex justify-end gap-2">
                                     <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="destructive-outline" size="sm"><Trash2 className="h-4 w-4 mr-2" />Excluir</Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Esta ação não pode ser desfeita. Isso excluirá permanentemente o bloco e seus dados.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleDeleteBlock(block.id)}>Confirmar</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                    <Button variant="outline" size="sm" onClick={() => handleEditBlock(block)}><Edit className="h-4 w-4 mr-2" />Editar</Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 border-2 border-dashed rounded-lg">
                        <h3 className="text-xl font-semibold">Nenhum bloco de conteúdo</h3>
                        <p className="text-muted-foreground mt-2">Clique em "Adicionar Bloco" para começar a construir esta página.</p>
                        <Button onClick={handleAddBlock} className="mt-4"><PlusCircle className="mr-2 h-4 w-4" /> Adicionar Bloco</Button>
                    </div>
                )}
            </section>
            
            <BlockFormDialog 
                isOpen={isFormOpen}
                setIsOpen={setIsFormOpen}
                pageId={page.id}
                pageSlug={page.slug}
                block={selectedBlock}
                onSuccess={fetchData}
                lastOrderIndex={blocks.length > 0 ? Math.max(...blocks.map(b => b.order_index)) : 0}
            />
        </>
    );
}
