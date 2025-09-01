
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

export function WhyPortugal() {
  return (
    <section id="why-portugal" className="bg-gradient-to-r from-black to-zinc-900 text-primary-foreground overflow-hidden">
      <div className="container">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <h2 className="font-headline text-3xl md:text-4xl text-primary-foreground uppercase">Por que investir em Portugal?</h2>
          </AnimatedSection>
          
          <AnimatedSection delay={0.2}>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-5xl mx-auto mt-12"
            >
              <CarouselContent>
                {benefits.map((benefit, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card className="bg-primary-foreground/5 border-primary-foreground/10 text-primary-foreground h-full text-center hover:bg-primary-foreground/10 transition-colors">
                          <CardContent className="p-6 flex flex-col items-center justify-center">
                              <div className="mx-auto mb-4 inline-block rounded-full bg-primary-foreground/10 p-3">
                                  <benefit.icon className="h-7 w-7" />
                              </div>
                              <h3 className="text-lg font-bold font-headline">{benefit.title}</h3>
                              <p className="mt-2 text-sm text-primary-foreground/70 h-16">{benefit.description}</p>
                          </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="text-primary-foreground" />
              <CarouselNext className="text-primary-foreground" />
            </Carousel>
          </AnimatedSection>
      </div>
    </section>
  );
}
