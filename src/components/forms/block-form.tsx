
"use client";

import { useState, useEffect, useActionState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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

const formSchema = z.object({
  id: z.string().optional(),
  page_id: z.string(),
  pageSlug: z.string(),
  order_index: z.number(),
  title: z.string().min(1, "O título é obrigatório."),
  block_type: z.string().min(1, "O tipo do bloco é obrigatório."),
  content: z.string().optional(),
  image_file: z.any().optional(),
  current_image_url: z.string().optional(),
});

const initialState = {
  message: "",
  success: false,
};

export function BlockFormDialog({ isOpen, setIsOpen, pageId, pageSlug, block, onSuccess, lastOrderIndex }: BlockFormDialogProps) {
    const { toast } = useToast();
    const [state, formAction] = useActionState(saveBlock, initialState);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            block_type: 'texto',
            content: '',
        },
    });
    
    const { isSubmitting } = form.formState;

    useEffect(() => {
        if (isOpen) {
            form.reset({
                id: block?.id,
                page_id: pageId,
                pageSlug: pageSlug,
                order_index: block?.order_index ?? lastOrderIndex + 1,
                title: block?.title || '',
                block_type: block?.block_type || 'texto',
                content: block?.content || '',
                image_file: undefined,
                current_image_url: block?.image_url || undefined,
            });
        }
    }, [block, pageId, pageSlug, lastOrderIndex, isOpen, form]);

    useEffect(() => {
        if (state.message) {
            if (state.success) {
                toast({ title: 'Sucesso!', description: state.message });
                onSuccess();
                setIsOpen(false);
            } else {
                toast({ variant: 'destructive', title: 'Erro ao salvar', description: state.message });
            }
        }
    }, [state, toast, onSuccess, setIsOpen]);
    
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>{block ? 'Editar Bloco' : 'Adicionar Novo Bloco'}</DialogTitle>
                    <DialogDescription>
                        Preencha as informações abaixo para gerenciar o conteúdo.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form 
                        action={(formData) => {
                            // Attach hidden fields to formData
                            formData.append('id', block?.id || '');
                            formData.append('page_id', pageId);
                            formData.append('pageSlug', pageSlug);
                            formData.append('order_index', (block?.order_index ?? lastOrderIndex + 1).toString());
                            formData.append('current_image_url', block?.image_url || '');
                            formAction(formData);
                        }}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Título do Bloco</FormLabel>
                                    <FormControl><Input {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="block_type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tipo do Bloco</FormLabel>
                                    <FormControl><Input {...field} placeholder="Ex: hero, texto, card, etc."/></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Conteúdo (HTML permitido)</FormLabel>
                                    <FormControl><Textarea rows={8} {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {block?.image_url && (
                            <div className="space-y-2">
                                <Label>Imagem Atual</Label>
                                <Image src={block.image_url} alt="Imagem atual" width={200} height={100} className="rounded-md object-cover" />
                            </div>
                        )}
                        
                        <FormField
                            control={form.control}
                            name="image_file"
                            render={({ field: { onChange, value, ...rest } }) => (
                                <FormItem>
                                    <FormLabel>{block?.image_url ? 'Substituir Imagem' : 'Carregar Imagem'}</FormLabel>
                                    <FormControl>
                                        <Input 
                                            type="file" 
                                            accept="image/*"
                                            onChange={(e) => onChange(e.target.files?.[0])}
                                            {...rest}
                                         />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button type="button" variant="secondary" onClick={() => setIsOpen(false)}>Cancelar</Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Salvar
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
