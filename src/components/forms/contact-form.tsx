"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useActionState, useEffect } from "react";
import { useRouter } from 'next/navigation';

import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { submitContactForm } from "@/actions/forms";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  nome: z.string().min(2, { message: "O nome completo é obrigatório." }),
  email: z.string().email({ message: "Por favor, insira um e-mail válido." }),
  telefone: z.string().min(9, { message: "O telefone é obrigatório." }),
  paisResidencia: z.string().min(2, { message: "O país é obrigatório." }),
  valorInvestimento: z.string().min(1, { message: "Selecione um valor." }),
  interessePrincipal: z.string().min(1, { message: "Selecione um interesse." }),
  mensagem: z.string().optional(),
  consentimento: z.boolean().refine(val => val === true, { message: "O consentimento é obrigatório." }),
});

const initialState = {
  message: null,
  success: false,
};

type ContactFormProps = {
  isSummary?: boolean;
};

export function ContactForm({ isSummary = false }: ContactFormProps) {
  const [state, formAction] = useActionState(submitContactForm, initialState);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      paisResidencia: "",
      valorInvestimento: undefined,
      interessePrincipal: undefined,
      mensagem: "",
      consentimento: false,
    },
  });

  const { isSubmitting } = form.formState;

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: "Mensagem Enviada!",
          description: state.message,
        });
        form.reset();
      } else {
        toast({
          variant: "destructive",
          title: "Erro",
          description: state.message,
        });
      }
    }
  }, [state, toast, form, router]);

  return (
    <Form {...form}>
      <form action={formAction} className="space-y-4">
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome Completo</FormLabel>
              <FormControl><Input {...field} /></FormControl>
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
              <FormControl><Input type="email" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className={cn(!isSummary && "grid sm:grid-cols-2 gap-4")}>
            <FormField
            control={form.control}
            name="telefone"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Telefone (com DDI)</FormLabel>
                <FormControl><Input type="tel" {...field} /></FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            {!isSummary && (
                <FormField
                control={form.control}
                name="paisResidencia"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>País de Residência</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            )}
        </div>
        {!isSummary && (
            <>
                <FormField
                control={form.control}
                name="valorInvestimento"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Valor Estimado para Investimento</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Selecione uma faixa de valor" /></SelectTrigger></FormControl>
                        <SelectContent>
                        <SelectItem value="100k-500k">€100.000 - €499.999</SelectItem>
                        <SelectItem value="500k-1m">€500.000 - €999.999</SelectItem>
                        <SelectItem value="1m+">€1.000.000+</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />
                 <FormField
                control={form.control}
                name="interessePrincipal"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Interesse Principal</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Selecione seu principal objetivo" /></SelectTrigger></FormControl>
                        <SelectContent>
                        <SelectItem value="Diversificação">Diversificação Internacional</SelectItem>
                        <SelectItem value="Golden Visa">Golden Visa</SelectItem>
                        <SelectItem value="Proteção Patrimonial">Proteção Patrimonial</SelectItem>
                        <SelectItem value="Fundos Específicos">Fundos Específicos</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </>
        )}
        <FormField
          control={form.control}
          name="mensagem"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mensagem</FormLabel>
              <FormControl><Textarea rows={isSummary ? 2 : 4} placeholder="Como podemos ajudar?" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="consentimento"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Consentimento</FormLabel>
                <FormDescription>
                  Autorizo o tratamento dos meus dados para esta finalidade.
                </FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
        </Button>
      </form>
    </Form>
  );
}
