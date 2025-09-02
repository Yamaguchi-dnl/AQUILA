"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSection } from "../shared/animated-section";
import Image from "next/image";

const processSteps = [
    {
        number: "1",
        title: "Consulta inicial",
        description: "Nossa equipe realiza uma análise completa do seu perfil de investidor e objetivos financeiros para recomendar o fundo mais adequado."
    },
    {
        number: "2",
        title: "Documentação e compliance",
        description: "Cuidamos de toda a documentação necessária, incluindo verificações KYC e AML, garantindo total conformidade regulatória."
    },
    {
        number: "3",
        title: "Investimento e acompanhamento",
        description: "Após o investimento, você recebe relatórios regulares e tem acesso ao nosso portal para acompanhar a performance em tempo real."
    }
];

export function InvestmentStrategy() {
  return (
    <section id="investment-strategy" className="bg-primary text-primary-foreground relative">
       <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(30%_40%_at_5%_5%,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_100%),radial-gradient(30%_40%_at_95%_95%,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_100%)]"
      />
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
                <AnimatedSection>
                    <h2 className="font-headline text-3xl md:text-4xl text-primary-foreground uppercase">Processo simples e eficiente</h2>
                    <p className="mt-4 text-primary-foreground/80 max-w-lg">Transformamos o investimento internacional numa experiência transparente e segura, com acompanhamento personalizado em cada etapa.</p>
                </AnimatedSection>
                
                <AnimatedSection delay={0.1}>
                    <div className="mt-8 space-y-6">
                        {processSteps.map((step) => (
                            <Card key={step.number} className="bg-primary-foreground/5 border-primary-foreground/10">
                                <CardContent className="p-6 flex items-start gap-6">
                                    <div className="flex-shrink-0 w-10 h-10 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                                        {step.number}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg text-primary-foreground">{step.title}</h3>
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