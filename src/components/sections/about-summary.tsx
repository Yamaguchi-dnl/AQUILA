import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AboutSummary() {
  return (
    <section id="sobre" className="bg-card">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div>
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">Sobre a Aquila Fund FCR</h2>
            <div className="mt-6 space-y-4 text-muted-foreground prose prose-lg max-w-none">
              <p>
                A Aquila Fund FCR nasceu com a visão de ser uma plataforma de investimentos diferenciada, focada em oferecer soluções inovadoras para investidores de alta renda. Desde o início, temos nos dedicado a construir um legado de confiança, transparência e excelência no mercado financeiro português.
              </p>
            </div>
            <Button asChild variant="link" className="px-0 mt-6 text-base">
              <Link href="/sobre">Conheça nossa história <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="bg-background p-8 rounded-lg">
            <h3 className="text-lg font-semibold text-muted-foreground uppercase tracking-wider text-center">Parceiros Estratégicos</h3>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
              <div className="text-center">
                <p className="text-4xl font-bold text-primary opacity-70">FundBox</p>
                <p className="text-sm text-muted-foreground mt-1">Gestão de Fundos</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-primary opacity-70">BTG Pactual</p>
                <p className="text-sm text-muted-foreground mt-1">Garantia de Ativos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
