

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { AnimatedSection } from "../shared/animated-section";
import { StatsCard } from "./stats-card";
import type { Block } from "@/lib/data-loader";

type AboutSummaryProps = {
  block: Block | null;
}

export function AboutSummary({ block }: AboutSummaryProps) {
  const title = block?.title || "Seu capital, nossa expertise";
  const content = block?.content || `<p>A Aquila Fund FCR é uma plataforma de investimentos portuguesa, com quatro fundos de investimento totalmente independentes e registrados na Comissão do Mercado de Valores Mobiliários (CMVM).</p><p>Com uma equipe experiente e altamente qualificada, oferecemos soluções seguras e rentáveis para investidores brasileiros, através de nossos fundos - Wheels, Agro, Hotel Invest e Real State.</p><p>Com estas soluções, você diversifica seu portfólio, ganha acesso facilitado ao passaporte europeu e protege seu patrimônio em um mercado estável e repleto de oportunidades.</p>`;
  const imageUrl = block?.image_url || "https://ik.imagekit.io/leosmc2zb/5573.jpg";

  return (
    <section id="sobre" className="bg-background text-foreground overflow-hidden relative">
      <div className="container relative z-20">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-stretch">
          <div className="order-last md:order-first">
            <AnimatedSection direction="left">
            <Image 
                src={imageUrl}
                alt="Escritório moderno em Lisboa"
                width={600}
                height={500}
                className="rounded-lg object-cover shadow-xl w-full"
                data-ai-hint="modern office lisbon"
            />
            </AnimatedSection>
          </div>
           <div className="order-first md:order-last flex flex-col">
            <AnimatedSection direction="right">
              <h2 className="text-sm uppercase tracking-widest text-muted-foreground font-headline">
                  <Link href="/sobre">QUEM SOMOS</Link>
              </h2>
              <h3 className="font-headline text-4xl text-primary mt-2 uppercase">{title}</h3>
              
            </AnimatedSection>
            <AnimatedSection className="flex-grow" delay={0.1} direction="right">
              <div 
                className="mt-8 space-y-4 text-muted-foreground prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </AnimatedSection>
            <AnimatedSection className="mt-8" delay={0.2} direction="right">
              <Button asChild size="lg" variant="default">
                <Link href="/contato">FALE COM UM ESPECIALISTA!</Link>
              </Button>
            </AnimatedSection>
          </div>
        </div>

        <AnimatedSection delay={0.2} className="mt-20" direction="up">
            <StatsCard />
        </AnimatedSection>
      </div>
    </section>
  );
}
