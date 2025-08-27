"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useActionState, useEffect } from "react";

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
import { useToast } from "@/hooks/use-toast";
import { submitJobApplication } from "@/actions/forms";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_FILE_TYPES = ["application/pdf"];

const formSchema = z.object({
  nome: z.string().min(2, { message: "O nome completo é obrigatório." }),
  email: z.string().email({ message: "Por favor, insira um e-mail válido." }),
  telefone: z.string().min(9, { message: "O telefone é obrigatório." }),
  cargoInteresse: z.string().min(2, { message: "O cargo de interesse é obrigatório." }),
  linkedin: z.string().url({ message: "Por favor, insira uma URL válida." }).optional().or(z.literal('')),
  cv: z
    .any()
    .refine((files) => files?.length == 1, "O CV é obrigatório.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `O tamanho máximo do ficheiro é 10MB.`)
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
      "Apenas ficheiros .pdf são aceites."
    ),
  mensagem: z.string().optional(),
  consentimento: z.boolean().refine(val => val === true, { message: "O consentimento é obrigatório." }),
});

const initialState = {
  message: null,
  success: false,
};

export function JobApplicationForm() {
  const [state, formAction] = useActionState(submitJobApplication, initialState);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      cargoInteresse: "",
      linkedin: "",
      mensagem: "",
      consentimento: false,
    },
  });

  const { isSubmitting } = form.formState;
  
  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: "Sucesso!",
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
  }, [state, toast, form]);

  return (
    <Form {...form}>
      <form action={formAction} className="space-y-6">
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
        <div className="grid sm:grid-cols-2 gap-6">
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
        </div>
        <FormField
          control={form.control}
          name="cargoInteresse"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cargo de Interesse</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="linkedin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LinkedIn (URL)</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="cv"
          render={({ field: { onChange, value, ...rest } }) => (
            <FormItem>
              <FormLabel>Upload de CV (PDF, máx 10MB)</FormLabel>
              <FormControl>
                <Input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => {
                        onChange(e.target.files)
                    }}
                    {...rest}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mensagem"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mensagem (Opcional)</FormLabel>
              <FormControl><Textarea rows={4} {...field} /></FormControl>
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
                <FormLabel>Consentimento de Dados</FormLabel>
                <FormDescription>
                  Autorizo o tratamento dos meus dados pessoais para fins de recrutamento, de acordo com a nossa política de privacidade.
                </FormDescription>
                 <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Enviar Candidatura"}
        </Button>
      </form>
    </Form>
  );
}
