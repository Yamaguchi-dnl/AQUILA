
"use client";

import { AnimatedSection } from "@/components/shared/animated-section";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Building, Gem, Briefcase } from "lucide-react";
import type { Block } from "@/lib/data-loader";
import { cn } from "@/lib/utils";

const assetTypes = [
    { icon: Building, text: "Imobiliários" },
    { icon: Briefcase, text: "Private Equity e funding internacional" },
    { icon: Gem, text: "Outros bens patrimoniais" },
];

const benefits = [
    "Aproveitar ativos exclusivos, fora do alcance do investidor tradicional.",
    "Moldar sua estratégia de acordo com sua realidade.",
    "Garantir que seu patrimônio esteja em sintonia com seus objetivos de longo prazo.",
    "Acessar investimentos sólidos no mercado europeu, com benefícios únicos."
]

type SolucoesTailorMadeClientProps = {
  contentBlock: Block | null;
};

export default function SolucoesTailorMadeClient({ contentBlock }: SolucoesTailorMadeClientProps) {
  const introText = contentBlock?.content || 'No mercado de investimentos, opções não faltam. Mas quando se trata de potencializar retornos com inteligência e exclusividade, é preciso ir além do comum.';
  const outroText = contentBlock?.sub_content || '<p>Não se trata apenas de investir, mas de construir uma experiência personalizada, que coloca você no centro das decisões.</p>'

  return (
    <>
      <section className="bg-primary text-primary-foreground relative z-10">
        <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.1)_0%,_transparent_70%)]"
        />
        <div className="container relative z-10 text-center">
            <AnimatedSection direction="up">
                <h2 className="font-headline text-3xl text-primary-foreground uppercase">{"Conexões de Valor para Investidores Únicos"}</h2>
                <p className="mt-4 text-primary-foreground/80 text-lg max-w-3xl mx-auto">{introText}</p>
            </AnimatedSection>
            
            <div className="mt-8 grid sm:grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {assetTypes.map((asset, index) => (
                    <AnimatedSection key={index} delay={0.1 + index * 0.1} direction="up">
                        <div className="flex flex-col items-center gap-3 p-4 rounded-lg">
                            <asset.icon className="h-8 w-8 text-primary-foreground" />
                            <span className="text-primary-foreground font-semibold mt-2">{asset.text}</span>
                        </div>
                    </AnimatedSection>
                ))}
            </div>
        </div>
      </section>
      
      <section className="bg-primary text-primary-foreground relative">
         <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(255,255,255,0.15)_0%,_transparent_70%)]"
        />
        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
              <AnimatedSection direction="left" className="flex">
                  <Image
                      src={contentBlock?.image_url || "https://ik.imagekit.io/leosmc2zb/6109119.jpg"}
                      alt="Homem de fato a analisar um gráfico"
                      width={600}
                      height={700}
                      className="rounded-lg shadow-lg object-cover w-full h-[500px]"
                      data-ai-hint="businessman looking chart"
                  />
              </AnimatedSection>
              <AnimatedSection delay={0.1} direction="right" className="flex flex-col">
                  <div>
                      <h2 className="font-headline text-3xl text-primary-foreground uppercase">Oportunidades Únicas Para Você</h2>
                      <p className="mt-4 text-primary-foreground/90 font-semibold">Com nossas soluções tailor made, você tem a oportunidade de:</p>
                      <div className="mt-4 space-y-4">
                          {benefits.map((benefit, index) => (
                          <AnimatedSection key={index} delay={0.2 + index * 0.05} direction="up">
                              <div className="flex items-start gap-3">
                                  <CheckCircle2 className="h-6 w-6 text-secondary mt-1 shrink-0" />
                                  <span className="text-primary-foreground/90 text-base">{benefit}</span>
                              </div>
                              </AnimatedSection>
                          ))}
                      </div>
                      <AnimatedSection delay={0.4} direction="up">
                      <div 
                          className="mt-8 text-primary-foreground/80 text-lg prose max-w-none prose-p:text-primary-foreground/80"
                          dangerouslySetInnerHTML={{ __html: outroText }} 
                      />
                      </AnimatedSection>
                  </div>
                  <AnimatedSection delay={0.5} direction="up" className="mt-auto pt-8">
                      <Button asChild size="lg" className="w-full md:w-auto" variant="secondary">
                          <Link href="/contato">
                              Encontre o ativo perfeito para investir
                              <ArrowRight className="ml-2" />
                          </Link>
                      </Button>
                  </AnimatedSection>
              </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
