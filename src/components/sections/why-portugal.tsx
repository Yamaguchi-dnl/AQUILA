"use client";

import { Globe, ShieldCheck, TrendingUp, Handshake, Sun, Euro } from "lucide-react";
import { AnimatedSection } from "../shared/animated-section";
import { BenefitsCarousel } from "../shared/benefits-carousel";

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
        <AnimatedSection>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary-foreground">Por que investir em Portugal?</h2>
        </div>
        </AnimatedSection>
        <div className="mt-12">
            <BenefitsCarousel items={benefits} />
        </div>
      </div>
    </section>
  );
}
