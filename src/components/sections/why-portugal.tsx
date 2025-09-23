
"use client";

import { Globe, ShieldCheck, TrendingUp, Handshake, Sun, Euro } from "lucide-react";
import { AnimatedSection } from "../shared/animated-section";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import type { Block } from "@/lib/data-loader";

const benefits = [
    { 
        icon: Globe, 
        title: "Diversificação global",
        description: "Expanda seu portfólio, reduzindo riscos e buscando novas oportunidades de crescimento."
    },
    { 
        icon: ShieldCheck, 
        title: "Proteção patrimonial",
        description: "Garanta a segurança de seus ativos em um ambiente econômico e jurídico estável."
    },
    { 
        icon: TrendingUp, 
        title: "Mercado promissor",
        description: "Participe do crescimento de um dos mercados mais dinâmicos e atraentes da Europa."
    },
    { 
        icon: Handshake, 
        title: "Passaporte europeu",
        description: "Obtenha residência e cidadania em Portugal, abrindo portas para a União Europeia e seus benefícios."
    },
    { 
        icon: Euro, 
        title: "Benefícios fiscais",
        description: "Aproveite incentivos fiscais e regimes especiais para investidores não residentes."
    },
    { 
        icon: Sun,
        title: "Qualidade de vida",
        description: "Desfrute de um país com excelente infraestrutura, segurança e cultura rica."
    }
];

type Props = {
  block: Block | null;
}

export function WhyPortugal({ block }: Props) {
  const title = block?.title || 'Por que investir<br/>em Portugal?';
  
  return (
    <section id="why-portugal" className="bg-primary text-primary-foreground overflow-hidden relative">
       <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(50,130,250,0.15)_0%,_transparent_70%)]"
      />
      <div className="container relative z-10">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <AnimatedSection>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-sm uppercase tracking-widest text-primary-foreground/60 font-headline">
                    OPORTUNIDADES
                </h2>
                <h3 
                  className="font-headline text-4xl text-primary-foreground uppercase mt-2"
                  dangerouslySetInnerHTML={{ __html: title}}
                />
              </div>
              <div className="flex gap-2">
                  <CarouselPrevious className="static -translate-y-0 text-primary-foreground bg-primary-foreground/10 hover:bg-primary-foreground/20 border-primary-foreground/20" />
                  <CarouselNext className="static -translate-y-0 text-primary-foreground bg-primary-foreground/10 hover:bg-primary-foreground/20 border-primary-foreground/20" />
              </div>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={0.2}>
            <CarouselContent className="-ml-4">
              {benefits.map((benefit, index) => (
                <CarouselItem key={index} className="pl-4 basis-auto">
                    <Card className="bg-primary-foreground/5 border-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/10 transition-colors h-[280px] w-[280px]">
                        <CardContent className="p-6 h-full flex flex-col items-center justify-center text-center">
                            <div className="flex-shrink-0 rounded-full bg-primary-foreground/10 p-3 w-fit mb-4">
                                <benefit.icon className="h-7 w-7" />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold font-headline">{benefit.title}</h3>
                              <p className="mt-2 text-sm text-primary-foreground/70">{benefit.description}</p>
                            </div>
                        </CardContent>
                    </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </AnimatedSection>
        </Carousel>
      </div>
    </section>
  );
}
