
"use client";

import { useEffect } from 'react';
import { useFormState } from 'react-dom';
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

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const formSchema = z.object({
  title: z.string().min(1, "O título é obrigatório."),
  block_type: z.string().min(1, "O tipo do bloco é obrigatório."),
  content: z.string().optional(),
  image_file: z
    .any()
    .refine((files) => !files || files.length === 0 || files?.[0]?.size <= MAX_FILE_SIZE, `Tamanho máximo da imagem é 5MB.`)
    .refine(
      (files) => !files || files.length === 0 || ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Apenas os formatos .jpg, .jpeg, .png e .webp são aceitos."
    ).optional(),
});

const initialState = {
  message: null,
  success: false,
};

export function BlockFormDialog({ isOpen, setIsOpen, pageId, pageSlug, block, onSuccess, lastOrderIndex }: BlockFormDialogProps) {
    const { toast } = useToast();
    const [state, formAction] = useFormState(saveBlock, initialState);
    
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

    // Reset form when dialog opens or block changes
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

    // Handle Server Action response
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

    const fileRef = form.register("image_file");

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>{block ? 'Editar Bloco' : 'Adicionar Novo Bloco'}</DialogTitle>
                    <DialogDescription>
                        Preencha as informações abaixo para gerenciar o conteúdo.
                    </DialogDescription>
                </DialogHeader>
                {/* Use a real form element that calls the action */}
                <form action={formAction} className="space-y-4">
                    {/* Hidden fields to pass necessary IDs and metadata */}
                    <input type="hidden" name="page_id" value={pageId} />
                    <input type="hidden" name="pageSlug" value={pageSlug} />
                    <input type="hidden" name="order_index" value={(block?.order_index ?? lastOrderIndex + 1).toString()} />
                    {block?.id && <input type="hidden" name="id" value={block.id} />}
                    {block?.image_url && <input type="hidden" name="current_image_url" value={block.image_url} />}
                    
                    {/* We use Form from react-hook-form for validation state, but the form itself is a standard form */}
                    <Form {...form}>
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
                                            {...fileRef}
                                         />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </Form>
                    <DialogFooter>
                        <Button type="button" variant="secondary" onClick={() => setIsOpen(false)}>Cancelar</Button>
                        <Button type="submit" aria-disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Salvar
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
