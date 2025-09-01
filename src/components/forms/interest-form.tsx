"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { submitInterestForm } from "@/actions/forms";

const formSchema = z.object({
  nome: z.string().min(2, { message: "O nome é obrigatório." }),
  email: z.string().email({ message: "Por favor, insira um e-mail válido." }),
  fundName: z.string(),
});

type InterestFormDialogProps = {
  fundName: string;
};

export function InterestFormDialog({ fundName }: InterestFormDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      email: "",
      fundName: fundName,
    },
  });

  const { isSubmitting, isSubmitSuccessful } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        const result = await submitInterestForm(values);
        if (result.success) {
            toast({
              title: "Interesse Registrado!",
              description: "Você será notificado assim que o fundo for lançado.",
            });
            form.reset();
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        toast({
            variant: "destructive",
            title: "Erro ao enviar",
            description: (error as Error).message || "Ocorreu um problema ao registrar seu interesse. Tente novamente.",
        });
    }
  }
  
  if (isSubmitSuccessful && !isSubmitting) {
      return (
        <div className="w-full text-center p-4 bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-800 rounded-md">
            <h3 className="font-semibold text-green-800 dark:text-green-200 font-headline">Obrigado!</h3>
            <p className="text-sm text-green-700 dark:text-green-300">Seu interesse foi registrado com sucesso.</p>
             <Button variant="ghost" onClick={() => { form.reset(); setIsOpen(false); }} className="mt-2 text-xs h-auto py-1 px-2">
                Fechar
             </Button>
        </div>
      );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="w-full">Quero ser avisado</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline">Seja o primeiro a saber</DialogTitle>
          <DialogDescription>
            Registre seu interesse no fundo {fundName} e avisaremos quando estiver disponível.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="seu.email@exemplo.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">Cancelar</Button>
              </DialogClose>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Enviar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
