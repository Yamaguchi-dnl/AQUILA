
"use client";

import { useEffect, useRef, useState, useTransition } from 'react';
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
import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import { Label } from '../ui/label';
import { saveBlock } from '@/actions/admin';

type Block = {
  id: string;
  order_index: number;
  block_type: string;
  title: string | null;
  content: string | null;
  image_url: string | null;
};

type BlockFormDialogProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  pageId: string;
  pageSlug: string;
  block: Block | null;
  onSuccess: () => void;
  lastOrderIndex: number;
};

const initialState = {
  message: '',
  success: false,
};

export function BlockFormDialog({ isOpen, setIsOpen, pageId, pageSlug, block, onSuccess, lastOrderIndex }: BlockFormDialogProps) {
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);
    const [isPending, startTransition] = useTransition();

    const handleSubmit = (formData: FormData) => {
      startTransition(async () => {
        const result = await saveBlock(null, formData);

        if (result.success) {
            toast({ title: 'Sucesso!', description: result.message });
            onSuccess();
            setIsOpen(false);
        } else {
            toast({ variant: 'destructive', title: 'Erro ao salvar', description: result.message || 'Ocorreu um erro desconhecido.' });
        }
      });
    };

    // Reset form fields when dialog opens or block changes
    useEffect(() => {
      if (isOpen) {
        formRef.current?.reset();
      }
    }, [isOpen, block]);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>{block ? 'Editar Bloco' : 'Adicionar Novo Bloco'}</DialogTitle>
                    <DialogDescription>
                        Preencha as informações abaixo para gerenciar o conteúdo.
                    </DialogDescription>
                </DialogHeader>
                <form ref={formRef} action={handleSubmit} className="space-y-4">
                    <input type="hidden" name="page_id" value={pageId} />
                    <input type="hidden" name="pageSlug" value={pageSlug} />
                    <input type="hidden" name="order_index" value={(block?.order_index ?? lastOrderIndex + 1).toString()} />
                    {block?.id && <input type="hidden" name="id" value={block.id} />}
                    {block?.image_url && <input type="hidden" name="current_image_url" value={block.image_url} />}
                    
                    <div className="space-y-2">
                      <Label htmlFor="title">Título do Bloco</Label>
                      <Input id="title" name="title" defaultValue={block?.title || ''} required />
                    </div>

                    <div className="space-y-2">
                       <Label htmlFor="block_type">Tipo do Bloco</Label>
                       <Input id="block_type" name="block_type" defaultValue={block?.block_type || 'texto'} placeholder="Ex: hero, texto, card, etc." required />
                    </div>

                    <div className="space-y-2">
                       <Label htmlFor="content">Conteúdo (HTML permitido)</Label>
                       <Textarea id="content" name="content" defaultValue={block?.content || ''} rows={8} />
                    </div>

                    {block?.image_url && (
                        <div className="space-y-2">
                            <Label>Imagem Atual</Label>
                            <Image src={block.image_url} alt="Imagem atual" width={200} height={100} className="rounded-md object-cover border" />
                        </div>
                    )}
                    
                    <div className="space-y-2">
                      <Label htmlFor="image_file">{block?.image_url ? 'Substituir Imagem' : 'Carregar Imagem'}</Label>
                      <Input id="image_file" name="image_file" type="file" accept="image/*" />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="secondary" onClick={() => setIsOpen(false)} disabled={isPending}>Cancelar</Button>
                        <Button type="submit" disabled={isPending}>
                            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Salvar
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
