import { PageHeader } from "@/components/shared/page-header";
import { ProfileCalculator } from "@/components/calculadora/profile-calculator";
import { Lightbulb } from "lucide-react";

export const metadata = {
  title: "Calculadora de Perfil",
  description: "Descubra quais fundos da Aquila são mais adequados para seus objetivos financeiros e perfil de risco com nossa calculadora de perfil de investidor.",
};

export default function CalculadoraPage() {
  return (
    <>
      <PageHeader
        title="Calculadora de Perfil de Investidor"
        subtitle="Uma ferramenta para guiar sua decisão de investimento."
      />
      <section>
        <div className="container max-w-4xl">
            <div className="bg-card p-8 rounded-lg shadow-lg">
                <div className="flex items-start gap-4 p-4 border border-blue-200 bg-blue-50 rounded-lg mb-8 dark:bg-blue-900/50 dark:border-blue-800">
                    <Lightbulb className="h-6 w-6 text-blue-600 dark:text-blue-400 shrink-0 mt-1" />
                    <div>
                        <h4 className="font-semibold text-blue-800 dark:text-blue-200">Como funciona?</h4>
                        <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">Responda às perguntas abaixo para que nossa ferramenta de análise, com o auxílio de inteligência artificial, possa sugerir os fundos mais alinhados ao seu perfil. O resultado é uma recomendação, não um conselho de investimento.</p>
                    </div>
                </div>
                <ProfileCalculator />
            </div>
        </div>
      </section>
    </>
  );
}
