import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CalculatorCta() {
  return (
    <section id="calculadora" className="bg-background">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">Descubra seu Perfil de Investidor</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Responda a algumas perguntas rápidas e nossa ferramenta de análise indicará os fundos da Aquila mais alinhados aos seus objetivos e perfil de risco.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/calculadora-perfil">
                Começar Análise <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
