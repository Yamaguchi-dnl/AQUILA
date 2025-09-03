
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
    <section id="investment-strategy" className="bg-transparent text-primary-foreground relative pt-0 md:pt-16 lg:pt-28 pb-16 md:pb-24 lg:pb-28">
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
                <AnimatedSection>
                    <h2 className="text-sm uppercase tracking-widest text-primary-foreground/60 font-headline">
                        NOSSA ABORDAGEM
                    </h2>
                    <h3 className="font-headline text-3xl md:text-4xl text-primary-foreground uppercase mt-2">Estratégia de investimento: o caminho para o sucesso</h3>
                </AnimatedSection>
                
                <AnimatedSection delay={0.1}>
                    <div className="mt-12 relative">
                        {processSteps.map((step, index) => (
                           <div key={step.number} className="relative pl-16 pb-12 last:pb-0">
                               {index !== processSteps.length - 1 && (
                                <div className="absolute left-[22px] top-5 h-full w-px bg-primary-foreground/20" />
                               )}
                               <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground ring-4 ring-primary font-bold text-lg z-10">
                                   {step.number}
                               </div>
                               <Card className="ml-4 bg-primary-foreground/5 border-primary-foreground/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                                   <CardContent className="p-4">
                                       <h3 className="font-headline text-lg text-primary-foreground">{step.title}</h3>
                                       <p className="text-primary-foreground/70 mt-2 text-sm">{step.description}</p>
                                   </CardContent>
                               </Card>
                           </div>
                        ))}
                    </div>
                </AnimatedSection>
            </div>
            <AnimatedSection delay={0.2} className="hidden lg:block">
                <div className="relative">
                    <Image 
                        src="https://ik.imagekit.io/leosmc2zb/3550%20(1).jpg?updatedAt=1756312096783"
                        alt="Paisagem de Portugal"
                        width={600}
                        height={800}
                        className="rounded-3xl object-cover h-[600px] w-full"
                        data-ai-hint="portugal lisbon"
                        
                    />
                    <AnimatedSection delay={0.4}>
                        <Image 
                            src="https://ik.imagekit.io/leosmc2zb/golden-visa-portugal-nacionalidade-portuguesa.jpeg"
                            alt="Passaporte e documentos Golden Visa"
                            width={250}
                            height={160}
                            className="absolute -bottom-8 -left-12 rounded-2xl shadow-2xl object-cover"
                            data-ai-hint="passport document"
                        />
                    </AnimatedSection>
                </div>
            </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
