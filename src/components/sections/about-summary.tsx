

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
  const title = block?.title || "Evite riscos desnecessários e aproveite os benefícios das estruturas internacionais";
  const content = block?.content || `<p>Você já se perguntou o que realmente aconteceria com seu patrimônio e com a tranquilidade da sua família se não estivessem devidamente protegidos? A vida é feita de incertezas, e adiar sua segurança financeira é o mesmo que se expor a riscos desnecessários.</p><p>No Aquila Fund FRC, blindamos o seu patrimônio com investimentos seguros, rentáveis e personalizados. Aqui, você diversifica seu portfólio, ganha acesso facilitado ao passaporte europeu e protege seu patrimônio em um mercado repleto de oportunidades.</p>`;
  const imageUrl = block?.image_url || "https://ik.imagekit.io/leosmc2zb/5573.jpg";

  return (
    <section id="sobre" className="bg-background text-foreground overflow-hidden relative">
      <div className="container relative z-20">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <AnimatedSection direction="left" className="order-last md:order-first">
            <Image 
                src={imageUrl}
                alt="Escritório moderno em Lisboa"
                width={600}
                height={500}
                className="rounded-lg object-cover shadow-xl w-full"
                data-ai-hint="modern office lisbon"
            />
          </AnimatedSection>
           <div className="order-first md:order-last flex flex-col justify-center">
            <AnimatedSection direction="right">
              <h3 className="font-headline text-4xl text-primary mt-2 uppercase">{title}</h3>
              
            </AnimatedSection>
            <AnimatedSection className="flex-grow" delay={0.1} direction="right">
              <div 
                className="mt-8 space-y-4 text-muted-foreground prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </AnimatedSection>
            <AnimatedSection className="mt-8" delay={0.2} direction="up">
              <Button asChild size="lg" variant="default">
                <Link href="/contato">DÊ O PRÓXIMO PASSO!</Link>
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
