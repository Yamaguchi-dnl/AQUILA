
"use client";

import { useState, useCallback, useTransition } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Loader2, PlusCircle, Trash2, Edit } from 'lucide-react';
import { BlockFormDialog } from '@/components/forms/block-form';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { deleteBlock } from '@/actions/admin';
import { useRouter } from 'next/navigation';

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

interface PageEditorProps {
    initialPage: Page;
    initialBlocks: Block[];
}

export function PageEditor({ initialPage, initialBlocks }: PageEditorProps) {
    const { toast } = useToast();
    const router = useRouter();
    
    const [page] = useState<Page>(initialPage);
    const [blocks, setBlocks] = useState<Block[]>(initialBlocks);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);
    const [isPending, startTransition] = useTransition();
    
    const handleAddBlock = () => {
        setSelectedBlock(null);
        setIsFormOpen(true);
    };

    const handleEditBlock = (block: Block) => {
        setSelectedBlock(block);
        setIsFormOpen(true);
    };
    
    const handleSuccess = () => {
        // Refreshes the current route, which will re-run the server component's data fetch
        router.refresh();
    };

    const handleDelete = async (blockId: string) => {
        if (!page?.slug) return;
        startTransition(async () => {
            const result = await deleteBlock(blockId, page.slug);
            if (result.success) {
                toast({ title: 'Sucesso', description: result.message });
                handleSuccess(); // Refresh data on success
            } else {
                toast({ variant: 'destructive', title: 'Erro', description: result.message });
            }
        });
    };

    return (
        <>
            <div className="flex justify-end my-4">
                <Button onClick={handleAddBlock}><PlusCircle className="mr-2 h-4 w-4" /> Adicionar Bloco</Button>
            </div>
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
                                            <Button variant="destructive-outline" size="sm" disabled={isPending}><Trash2 className="h-4 w-4 mr-2" />Excluir</Button>
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
                                                <AlertDialogAction onClick={() => handleDelete(block.id)}>Confirmar</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                    <Button variant="outline" size="sm" onClick={() => handleEditBlock(block)} disabled={isPending}><Edit className="h-4 w-4 mr-2" />Editar</Button>
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
                onSuccess={handleSuccess}
                lastOrderIndex={blocks.length > 0 ? Math.max(...blocks.map(b => b.order_index)) : 0}
            />
        </>
    );
}

