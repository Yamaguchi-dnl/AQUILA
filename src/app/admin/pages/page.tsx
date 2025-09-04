
"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { PageHeader } from '@/components/shared/page-header';
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

export default function AdminPagesList() {
  const supabase = createClient();
  const { toast } = useToast();
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);

  const fetchPages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .order('title', { ascending: true });

    if (error) {
      console.error("Error fetching pages:", error);
      toast({ variant: 'destructive', title: 'Erro', description: 'Não foi possível carregar as páginas.' });
    } else {
      setPages(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleAddPage = () => {
    setSelectedPage(null);
    setIsFormOpen(true);
  };
  
  const handleEditPage = (page: Page) => {
      setSelectedPage(page);
      setIsFormOpen(true);
  };

  const handleDeletePage = async (pageId: string) => {
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
      fetchPages();
    } catch (error: any) {
        toast({ variant: 'destructive', title: 'Erro ao excluir', description: error.message });
    }
  };
  
  const handleSuccess = () => {
      fetchPages();
      setIsFormOpen(false);
  }

  if (loading) {
    return <div className="flex justify-center items-center h-full"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <>
      <PageHeader title="Páginas do Site" subtitle="Gerencie as páginas e o conteúdo de cada uma.">
         <div className="text-center mt-4">
            <Button onClick={handleAddPage}><PlusCircle className="mr-2 h-4 w-4" /> Adicionar Nova Página</Button>
         </div>
      </PageHeader>
      
      <section className="py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pages.map(page => (
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
                      <Button variant="destructive-outline" size="icon"><Trash2 className="h-4 w-4" /></Button>
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
                        <AlertDialogAction onClick={() => handleDeletePage(page.id)}>Confirmar Exclusão</AlertDialogAction>
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
