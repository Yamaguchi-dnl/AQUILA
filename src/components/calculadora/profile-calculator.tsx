"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { getFundRecommendation } from "@/actions/calculator";
import { RecommendationDisplay } from "./recommendation-display";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  objective: z.string({ required_error: "Selecione um objetivo." }),
  horizon: z.string({ required_error: "Selecione um horizonte." }),
  riskTolerance: z.string({ required_error: "Selecione uma tolerância." }),
  liquidity: z.string({ required_error: "Selecione uma liquidez." }),
  initialTicket: z.string({ required_error: "Selecione um valor." }),
  sector: z.string({ required_error: "Selecione um setor." }),
});

type FormData = z.infer<typeof formSchema>;

const questions = [
  { name: "objective", label: "Qual seu objetivo principal?", options: ["Diversificação", "Golden Visa", "Proteção patrimonial", "Renda"] },
  { name: "horizon", label: "Qual seu horizonte de investimento?", options: ["≤3 anos", "4–7 anos", "8+ anos"] },
  { name: "riskTolerance", label: "Qual sua tolerância a risco?", options: ["Baixa", "Moderada", "Alta"] },
  { name: "liquidity", label: "Qual sua necessidade de liquidez?", options: ["Baixa", "Média", "Alta"] },
  { name: "initialTicket", label: "Qual seu ticket de investimento inicial?", options: ["€100k - €499k", "€500k+", "€1M+"] },
  { name: "sector", label: "Qual setor de investimento mais lhe interessa?", options: ["Imobiliário", "Hotelaria", "Carros clássicos", "Agro", "Indiferente"] },
] as const;


export function ProfileCalculator() {
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<any>(null);
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(formSchema) });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setRecommendation(null);
    try {
      const result = await getFundRecommendation(data);
      setRecommendation(result);
    } catch (error) {
      console.error("Error getting recommendation:", error);
      // Handle error display
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
      return (
          <div className="flex flex-col items-center justify-center text-center p-8 min-h-[300px]">
              <Loader2 className="h-12 w-12 animate-spin text-primary"/>
              <p className="mt-4 text-muted-foreground">Analisando seu perfil...</p>
          </div>
      )
  }

  if (recommendation) {
    return <RecommendationDisplay recommendation={recommendation} onReset={() => { setRecommendation(null); }} />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
      {questions.map((q) => (
        <div key={q.name}>
          <Label className="text-lg font-semibold">{q.label}</Label>
          <Controller
            name={q.name}
            control={control}
            render={({ field }) => (
              <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                {q.options.map((option) => (
                  <div key={option} className="flex items-center">
                    <RadioGroupItem value={option} id={`${q.name}-${option}`} />
                    <Label htmlFor={`${q.name}-${option}`} className="ml-2 font-normal cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          />
          {errors[q.name] && <p className="text-sm font-medium text-destructive mt-2">{errors[q.name]?.message}</p>}
        </div>
      ))}
      <Button type="submit" size="lg" className="w-full">Ver Recomendação</Button>
    </form>
  );
}
