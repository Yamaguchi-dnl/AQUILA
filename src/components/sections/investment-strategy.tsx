

"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSection } from "../shared/animated-section";
import Image from "next/image";
import type { Block } from "@/lib/data-loader";

const processSteps = [
    {
        number: "1",
        title: "Origem de negócios",
        description: "Nossa expertise e nossa vasta rede de relacionamentos nos permitem identificar mercados relevantes e oportunidades atraentes de investimentos."
    },
    {
        number: "2",
        title: "Seleção e Due Diligence",
        description: "Realizamos uma análise rigorosa e rápida das perspectivas de aquisição para alcançar acordos de compra e venda vinculativos em tempo hábil."
    },
    {
        number: "3",
        title: "Criação de valor",
        description: "Implementamos estratégias sólidas em cada subfundo para otimizar o valor dos ativos e potencializar o retorno dos investimentos."
    },
    {
        number: "4",
        title: "Exit",
        description: "Possuímos habilidades comprovadas em transações e um histórico de múltiplas saídas bem-sucedidas, garantindo que o momento certo para a venda seja identificado e executado."
    }
];

type Props = {
  block: Block | null;
}

export function InvestmentStrategy({ block }: Props) {
  const title = block?.title || 'Estratégia de investimento: o caminho para o sucesso';
  const imageUrl1 = block?.image_url || 'https://ik.imagekit.io/leosmc2zb/3550%20(1).jpg?updatedAt=1756312096783&tr=w-1200';
  const imageUrl2 = block?.sub_content || 'https://ik.imagekit.io/leosmc2zb/golden-visa-portugal-nacionalidade-portuguesa.jpeg';

  return (
    <section id="investment-strategy" className="bg-transparent text-primary-foreground relative pt-0 pb-20 md:pb-28 lg:pb-32">
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
                <AnimatedSection direction="left">
                    <h3 className="font-headline text-4xl text-primary-foreground uppercase mt-2">{title}</h3>
                </AnimatedSection>
                
                <div className="mt-12 relative">
                    {processSteps.map((step, index) => (
                       <AnimatedSection key={step.number} delay={0.2 + index * 0.1} direction="up">
                       <div className="relative pl-16 pb-12 last:pb-0">
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
                       </AnimatedSection>
                    ))}
                </div>
            </div>
            <div className="hidden lg:block">
            <AnimatedSection delay={0.2} direction="right">
                <div className="relative">
                    <Image 
                        src={imageUrl1}
                        alt="Paisagem de Portugal"
                        width={800}
                        height={1000}
                        priority
                        className="rounded-3xl object-cover h-[600px] w-full"
                        data-ai-hint="portugal lisbon"
                        
                    />
                     <AnimatedSection delay={0.5} direction="up">
                        <Image 
                            src={imageUrl2}
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
      </div>
    </section>
  );
}
