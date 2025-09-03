
"use client";

import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createClient } from '@/lib/supabase/client';
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
import { updateBlock } from '@/actions/admin';

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
  title: z.string().min(1, "O título é obrigatório."),
  block_type: z.string().min(1, "O tipo do bloco é obrigatório."),
  content: z.string().optional(),
  image_file: z.any().optional(),
});

export function BlockFormDialog({ isOpen, setIsOpen, pageId, pageSlug, block, onSuccess, lastOrderIndex }: BlockFormDialogProps) {
    const supabase = createClient();
    const { toast } = useToast();
    const [isUploading, setIsUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            block_type: 'texto',
            content: '',
        },
    });

    useEffect(() => {
        if (isOpen) {
            if (block) {
                form.reset({
                    title: block.title || '',
                    block_type: block.block_type || 'texto',
                    content: block.content || '',
                    image_file: null,
                });
            } else {
                form.reset({
                    title: '',
                    block_type: 'texto',
                    content: '',
                    image_file: null,
                });
            }
        }
    }, [block, form, isOpen]);
    
    const handleImageUpload = async (file: File): Promise<string | null> => {
        if (!file) return null;
        setIsUploading(true);
        try {
            const filePath = `${pageSlug}/${Date.now()}-${file.name}`;
            const { data, error } = await supabase.storage
                .from('site-images')
                .upload(filePath, file);

            if (error) throw error;
            
            const { data: { publicUrl } } = supabase.storage
                .from('site-images')
                .getPublicUrl(data.path);

            return publicUrl;
        } catch (error: any) {
            toast({ variant: 'destructive', title: 'Erro no Upload', description: error.message });
            return null;
        } finally {
            setIsUploading(false);
        }
    };
    
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        try {
            let imageUrl = block?.image_url || undefined;
            const imageFile = values.image_file?.[0];

            if (imageFile) {
                 if (block?.image_url) {
                    try {
                        const oldPath = new URL(block.image_url).pathname.split('/site-images/')[1];
                        if (oldPath) {
                            await supabase.storage.from('site-images').remove([oldPath]);
                        }
                    } catch(e) {
                         console.error("Could not process old image URL to delete it:", e);
                    }
                }
                const newUrl = await handleImageUpload(imageFile);
                if (newUrl) {
                    imageUrl = newUrl;
                } else {
                    // Stop submission if upload fails
                    setIsSubmitting(false);
                    return; 
                }
            }

            const result = await updateBlock({
                id: block?.id,
                page_id: pageId,
                order_index: block?.order_index ?? lastOrderIndex + 1,
                block_type: values.block_type,
                title: values.title,
                content: values.content,
                image_url: imageUrl,
                pageSlug: pageSlug,
            });

            if (result.success) {
                toast({ title: 'Sucesso!', description: result.message });
                onSuccess();
                setIsOpen(false);
            } else {
                throw new Error(result.message);
            }
        } catch (error: any) {
            console.error("Error submitting form:", error);
            toast({ variant: 'destructive', title: 'Erro ao salvar', description: error.message });
        } finally {
            setIsSubmitting(false);
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
                            render={({ field: { onChange, value, ...rest } }) => (
                                <FormItem>
                                    <FormLabel>{block?.image_url ? 'Substituir Imagem' : 'Carregar Imagem'}</FormLabel>
                                    <FormControl>
                                        <Input 
                                            type="file" 
                                            accept="image/*"
                                            onChange={(e) => onChange(e.target.files)}
                                            {...rest}
                                         />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button type="button" variant="secondary" onClick={() => setIsOpen(false)}>Cancelar</Button>
                            <Button type="submit" disabled={isSubmitting || isUploading}>
                                {(isSubmitting || isUploading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Salvar
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
