"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Target, TrendingUp, Award } from "lucide-react";
import { AnimatedSection } from "../shared/animated-section";

const strategySteps = [
    {
        icon: Lightbulb,
        title: "Origem de negócios",
        description: "Nossa expertise e nossa vasta rede de relacionamentos nos permitem identificar mercados relevantes e oportunidades atraentes de investimentos."
    },
    {
        icon: Target,
        title: "Seleção e Due Diligence",
        description: "Realizamos uma análise rigorosa e rápida das perspectivas de aquisição para alcançar acordos de compra e venda vinculativos em tempo hábil."
    },
    {
        icon: TrendingUp,
        title: "Criação de valor",
        description: "Implementamos estratégias sólidas em cada subfundo para otimizar o valor dos ativos e potencializar o retorno dos investimentos."
    },
    {
        icon: Award,
        title: "Exit",
        description: "Possuímos habilidades comprovadas em transações e um histórico de múltiplas saídas bem-sucedidas, garantindo que o momento certo para a venda seja identificado e executado."
    }
];

export function InvestmentStrategy() {
  return (
    <section id="investment-strategy" className="bg-primary text-primary-foreground pb-24 relative">
       <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(15%_15%_at_5%_95%,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_100%),radial-gradient(15%_15%_at_95%_5%,rgba(25_255,255,0.1)_0%,rgba(255,255,255,0)_100%)]"
      />
      <div className="container relative z-10">
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-headline text-3xl md:text-4xl text-primary-foreground uppercase">Estratégia de investimento: o caminho para o sucesso</h2>
          </div>
        </AnimatedSection>
        <div className="mt-24 flex items-center justify-center">
            <div className="strategy-cards-container">
                {strategySteps.map((step, index) => (
                    <div key={index} className="strategy-card rounded-lg border border-transparent transition-colors hover:border-primary">
                        <div className="bg-card rounded-lg h-full p-6 flex flex-col justify-center text-center">
                            <step.icon className="h-10 w-10 text-primary mb-4 mx-auto" />
                            <h3 className="text-xl text-primary font-headline uppercase">{step.title}</h3>
                            <p className="text-card-foreground/80 mt-2 text-sm">{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}
