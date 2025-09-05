
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlusCircle, Edit } from 'lucide-react';
import Link from 'next/link';
import { PageFormDialog } from '@/components/forms/page-form';
import { DeletePageButton } from './delete-page-button';

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
  const router = useRouter();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);

  const handleAddPage = () => {
    setSelectedPage(null);
    setIsFormOpen(true);
  };
  
  const handleEditPage = (page: Page) => {
      setSelectedPage(page);
      setIsFormOpen(true);
  };
  
  const handleSuccess = () => {
      router.refresh(); // Re-fetch server data
      setIsFormOpen(false);
  }

  return (
    <>
      <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Páginas do Site</h1>
            <p className="text-muted-foreground">Gerencie as páginas e o conteúdo de cada uma.</p>
          </div>
          <Button onClick={handleAddPage}><PlusCircle className="mr-2 h-4 w-4" /> Adicionar Nova Página</Button>
      </div>
      
      <section className="py-8">
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
                 <DeletePageButton pageId={page.id} onSuccess={handleSuccess} />
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
