"use client";

import { z } from "zod";

const contactSchema = z.object({
  nome: z.string().min(2),
  email: z.string().email(),
  telefone: z.string().min(9),
  paisResidencia: z.string().min(2),
  valorInvestimento: z.string().min(1),
  interessePrincipal: z.string().min(1),
  mensagem: z.string().optional(),
  consentimento: z.literal("on"),
});

export async function submitContactForm(prevState: any, formData: FormData) {
  try {
    const data = Object.fromEntries(formData);

    // This is a workaround because FormData sends checkbox value as "on" or nothing.
    const parsedData = { ...data, consentimento: data.consentimento ? "on" : "" };

    const validatedFields = contactSchema.safeParse(parsedData);
    if (!validatedFields.success) {
      console.log(validatedFields.error.flatten().fieldErrors);
      return { message: "Erro de validação. Por favor, verifique os campos.", success: false };
    }
    
    // Simulate saving to Supabase & sending email
    console.log("Saving lead to Supabase:", validatedFields.data);
    
    return { message: "Sua mensagem foi enviada. Entraremos em contato em breve.", success: true };
  } catch (e) {
    console.error(e);
    return { message: "Ocorreu um erro inesperado. Tente novamente.", success: false };
  }
}

const jobApplicationSchema = z.object({
    nome: z.string().min(2),
    email: z.string().email(),
    telefone: z.string().min(9),
    cargoInteresse: z.string().min(2),
    linkedin: z.string().url().optional().or(z.literal('')),
    cv: z.any(),
    mensagem: z.string().optional(),
    consentimento: z.literal("on"),
});

export async function submitJobApplication(prevState: any, formData: FormData) {
    try {
        const data = Object.fromEntries(formData);
        const parsedData = { ...data, consentimento: data.consentimento ? "on" : "" };
        
        // Basic validation on server, more detailed on client
        const validatedFields = jobApplicationSchema.safeParse(parsedData);
        if (!validatedFields.success) {
             console.log(validatedFields.error.flatten().fieldErrors);
            return { message: "Erro de validação. Por favor, verifique os campos.", success: false };
        }
        
        // Simulate uploading CV to Storage and saving to Supabase
        console.log("Uploading CV and saving application to Supabase:", validatedFields.data.nome);
        
        return { message: "Sua candidatura foi enviada com sucesso. Obrigado!", success: true };
    } catch (e) {
        console.error(e);
        return { message: "Ocorreu um erro inesperado. Tente novamente.", success: false };
    }
}

const interestFormSchema = z.object({
  nome: z.string().min(2, { message: "O nome é obrigatório." }),
  email: z.string().email({ message: "Por favor, insira um e-mail válido." }),
  fundName: z.string(),
});

export async function submitInterestForm(values: z.infer<typeof interestFormSchema>) {
    try {
        const validatedFields = interestFormSchema.safeParse(values);
        if (!validatedFields.success) {
            return { message: "Dados inválidos.", success: false };
        }
        
        // Simulate saving to Supabase
        console.log("Registering interest:", validatedFields.data);

        return { message: "Interesse registrado com sucesso!", success: true };

    } catch (e) {
        return { message: "Ocorreu um erro.", success: false };
    }
}
