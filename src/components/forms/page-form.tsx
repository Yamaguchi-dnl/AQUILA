
"use client";

import { useEffect, useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { Label } from '../ui/label';
import { savePage } from '@/actions/admin';

type Page = {
  id: string;
  slug: string;
  title: string | null;
  description: string | null;
};

type PageFormDialogProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  page: Page | null;
  onSuccess: () => void;
};

export function PageFormDialog({ isOpen, setIsOpen, page, onSuccess }: PageFormDialogProps) {
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);
    const [isPending, setIsPending] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsPending(true);
        
        const formData = new FormData(event.currentTarget);
        const result = await savePage(formData);

        if (result.success) {
            toast({ title: 'Sucesso!', description: result.message });
            onSuccess();
        } else {
            toast({ variant: 'destructive', title: 'Erro ao salvar', description: result.message || 'Ocorreu um erro desconhecido.' });
        }
        
        setIsPending(false);
    };

    useEffect(() => {
      if (isOpen) {
        formRef.current?.reset();
      }
    }, [isOpen, page]);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{page ? 'Editar Página' : 'Adicionar Nova Página'}</DialogTitle>
                    <DialogDescription>
                        Preencha as informações abaixo. O "slug" é usado na URL (ex: /nome-do-slug).
                    </DialogDescription>
                </DialogHeader>
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                    {page?.id && <input type="hidden" name="id" value={page.id} />}
                    
                    <div className="space-y-2">
                      <Label htmlFor="title">Título da Página</Label>
                      <Input id="title" name="title" defaultValue={page?.title || ''} required />
                    </div>

                    <div className="space-y-2">
                       <Label htmlFor="slug">Slug da URL</Label>
                       <Input id="slug" name="slug" defaultValue={page?.slug || ''} placeholder="ex: minha-nova-pagina" required />
                    </div>

                    <div className="space-y-2">
                       <Label htmlFor="description">Descrição (para SEO)</Label>
                       <Textarea id="description" name="description" defaultValue={page?.description || ''} rows={3} />
                    </div>
                   
                    <DialogFooter>
                        <Button type="button" variant="secondary" onClick={() => setIsOpen(false)} disabled={isPending}>Cancelar</Button>
                        <Button type="submit" disabled={isPending}>
                            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Salvar Página
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
