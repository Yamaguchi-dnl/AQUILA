"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSection } from "../shared/animated-section";
import Image from "next/image";

const processSteps = [
    {
        number: "1",
        title: "Origem e Seleção",
        description: "Nossa expertise e vasta rede de relacionamentos nos permitem identificar mercados relevantes, realizar uma análise rigorosa e selecionar as melhores oportunidades de investimento."
    },
    {
        number: "2",
        title: "Criação de valor",
        description: "Implementamos estratégias sólidas em cada subfundo para otimizar o valor dos ativos e potencializar o retorno dos investimentos."
    },
    {
        number: "3",
        title: "Exit (Saída)",
        description: "Possuímos habilidades comprovadas em transações e um histórico de múltiplas saídas bem-sucedidas, garantindo a execução no momento certo para a venda."
    },
    {
        number: "4",
        title: "Due Diligence",
        description: "Realizamos uma análise rápida e rigorosa das perspectivas de aquisição para alcançar acordos de compra e venda vinculativos em tempo hábil."
    }
];

export function InvestmentStrategy() {
  return (
    <section id="investment-strategy" className="bg-primary text-primary-foreground relative">
       <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(30%_40%_at_95%_5%,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_100%),radial-gradient(30%_40%_at_5%_95%,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_100%)]"
      />
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
                <AnimatedSection>
                    <h2 className="font-headline text-3xl md:text-4xl text-primary-foreground uppercase">Estratégia de investimento: o caminho para o sucesso</h2>
                </AnimatedSection>
                
                <AnimatedSection delay={0.1}>
                    <div className="mt-8 space-y-4">
                        {processSteps.map((step) => (
                            <Card key={step.number} className="bg-primary-foreground/5 border-primary-foreground/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                                <CardContent className="p-6 flex items-start gap-6">
                                    <div className="flex-shrink-0 w-10 h-10 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                                        {step.number}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg text-primary-foreground font-headline">{step.title}</h3>
                                        <p className="text-primary-foreground/70 mt-1">{step.description}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </AnimatedSection>
            </div>
            <AnimatedSection delay={0.2} className="hidden lg:block">
                <Image 
                    src="https://picsum.photos/600/800"
                    alt="Paisagem de Portugal"
                    width={600}
                    height={800}
                    className="rounded-3xl object-cover h-[600px] w-full"
                    data-ai-hint="portugal coastline"
                />
            </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
