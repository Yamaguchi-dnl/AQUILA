"use client";

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, PlusCircle, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { PageFormDialog } from '@/components/forms/page-form';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

type Page = {
  id: string;
  slug: string;
  title: string | null;
  description: string | null;
  created_at: string;
};

type PageClientContentProps = {
    initialPages: Page[];
}

export function PageClientContent({ initialPages }: PageClientContentProps) {
  const supabase = createClient();
  const { toast } = useToast();
  const router = useRouter();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [isDeleting, startDeleteTransition] = useTransition();

  const handleAddPage = () => {
    setSelectedPage(null);
    setIsFormOpen(true);
  };
  
  const handleEditPage = (page: Page) => {
      setSelectedPage(page);
      setIsFormOpen(true);
  };

  const handleDeletePage = async (pageId: string) => {
    startDeleteTransition(async () => {
        try {
        const { error: blocksError } = await supabase
            .from('blocks')
            .delete()
            .eq('page_id', pageId);
        
        if (blocksError) throw blocksError;

        const { error: pageError } = await supabase
            .from('pages')
            .delete()
            .eq('id', pageId);

        if (pageError) throw pageError;

        toast({ title: 'Sucesso', description: 'Página e seus blocos foram excluídos.' });
        router.refresh(); // Re-fetches server data and updates initialPages prop
        } catch (error: any) {
            toast({ variant: 'destructive', title: 'Erro ao excluir', description: error.message });
        }
    });
  };
  
  const handleSuccess = () => {
      router.refresh(); // Re-fetch server data
      setIsFormOpen(false);
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Páginas do Site</h1>
            <p className="text-muted-foreground">Gerencie as páginas e o conteúdo de cada uma.</p>
          </div>
          <Button onClick={handleAddPage}><PlusCircle className="mr-2 h-4 w-4" /> Adicionar Nova Página</Button>
      </div>
      
      <section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {initialPages.map(page => (
            <Card key={page.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{page.title}</CardTitle>
                <CardDescription>/{page.slug}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-3">{page.description || 'Nenhuma descrição.'}</p>
              </CardContent>
              <CardContent className="flex justify-end gap-2">
                 <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive-outline" size="icon" disabled={isDeleting}><Trash2 className="h-4 w-4" /></Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta ação não pode ser desfeita. Isso excluirá permanentemente a página e TODOS os seus blocos de conteúdo.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeletePage(page.id)} disabled={isDeleting}>
                            {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Confirmar Exclusão
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <Button variant="outline" size="sm" onClick={() => handleEditPage(page)}><Edit className="h-4 w-4 mr-2" />Editar</Button>
                  <Button asChild variant="default" size="sm">
                  <Link href={`/admin/pages/${page.slug}`}>
                     Editar Conteúdo
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <PageFormDialog 
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
        page={selectedPage}
        onSuccess={handleSuccess}
      />
    </>
  );
}
