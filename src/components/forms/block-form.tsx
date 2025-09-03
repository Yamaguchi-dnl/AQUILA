
"use client";

import { useEffect } from 'react';
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

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const formSchema = z.object({
  title: z.string().min(1, "O título é obrigatório."),
  block_type: z.string().min(1, "O tipo do bloco é obrigatório."),
  content: z.string().optional(),
  image_file: z
    .any()
    .refine((file) => !file || file?.[0]?.size <= MAX_FILE_SIZE, `Tamanho máximo da imagem é 5MB.`)
    .refine(
      (file) => !file || !file[0] || ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type),
      "Apenas os formatos .jpg, .jpeg, .png e .webp são aceitos."
    ).optional(),
});

export function BlockFormDialog({ isOpen, setIsOpen, pageId, pageSlug, block, onSuccess, lastOrderIndex }: BlockFormDialogProps) {
    const { toast } = useToast();
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            block_type: 'texto',
            content: '',
            image_file: undefined,
        },
    });
    
    const { isSubmitting } = form.formState;

    useEffect(() => {
        if (isOpen) {
            form.reset({
                title: block?.title || '',
                block_type: block?.block_type || 'texto',
                content: block?.content || '',
                image_file: undefined,
            });
        }
    }, [block, isOpen, form]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const formData = new FormData();
        
        // Append all form data
        formData.append('title', values.title);
        formData.append('block_type', values.block_type);
        formData.append('content', values.content || '');
        formData.append('page_id', pageId);
        formData.append('pageSlug', pageSlug);
        formData.append('order_index', (block?.order_index ?? lastOrderIndex + 1).toString());

        if (block?.id) {
            formData.append('id', block.id);
        }
        if (block?.image_url) {
            formData.append('current_image_url', block.image_url);
        }

        if (values.image_file && values.image_file[0]) {
            formData.append('image_file', values.image_file[0]);
        }

        try {
            const response = await fetch('/api/admin/blocks', {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Falha ao salvar o bloco.');
            }
            
            toast({ title: 'Sucesso!', description: result.message });
            onSuccess();
            setIsOpen(false);
        } catch (error: any) {
            toast({ variant: 'destructive', title: 'Erro ao salvar', description: error.message });
        }
    }
    
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
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{block?.image_url ? 'Substituir Imagem' : 'Carregar Imagem'}</FormLabel>
                                    <FormControl>
                                        <Input 
                                            type="file" 
                                            accept="image/*"
                                            {...form.register("image_file")}
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
