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
           <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
            <AnimatedSection>
               <div className="flex justify-between items-center mb-8">
                <h2 className="font-headline text-3xl md:text-4xl text-primary-foreground uppercase">Por que investir em Portugal?</h2>
                <div className="hidden md:flex gap-2">
                    <CarouselPrevious className="static -translate-y-0 text-primary-foreground bg-primary-foreground/10 hover:bg-primary-foreground/20 border-primary-foreground/20" />
                    <CarouselNext className="static -translate-y-0 text-primary-foreground bg-primary-foreground/10 hover:bg-primary-foreground/20 border-primary-foreground/20" />
                </div>
              </div>
            </AnimatedSection>
          
          <AnimatedSection delay={0.2}>
              <CarouselContent className="-ml-4">
                {benefits.map((benefit, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                      <Card className="bg-primary-foreground/5 border-primary-foreground/10 text-primary-foreground h-full hover:bg-primary-foreground/10 transition-colors">
                          <CardContent className="p-6 flex items-start gap-4 text-left">
                              <div className="flex-shrink-0 rounded-full bg-primary-foreground/10 p-3 mt-1">
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
               <div className="flex md:hidden gap-2 mt-8 justify-center">
                    <CarouselPrevious className="static -translate-y-0 text-primary-foreground bg-primary-foreground/10 hover:bg-primary-foreground/20 border-primary-foreground/20" />
                    <CarouselNext className="static -translate-y-0 text-primary-foreground bg-primary-foreground/10 hover:bg-primary-foreground/20 border-primary-foreground/20" />
                </div>
            </Carousel>
          </AnimatedSection>
      </div>
    </section>
  );
}
