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
    <section id="sobre" className="bg-primary text-primary-foreground overflow-hidden relative">
       <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(30%_40%_at_5%_5%,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_100%),radial-gradient(30%_40%_at_95%_95%,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_100%)]"
      />
      <div className="container relative z-20 pt-16 pb-24">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-stretch">
          <div className="order-last md:order-first">
            <AnimatedSection>
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
            <AnimatedSection>
              <h2 className="text-sm uppercase tracking-widest text-primary-foreground/60 font-headline">
                  <Link href="/sobre">QUEM SOMOS</Link>
              </h2>
              <h3 className="font-headline text-4xl text-primary-foreground mt-2 uppercase">{title}</h3>
              
            </AnimatedSection>
            <AnimatedSection className="flex-grow">
              <div 
                className="mt-8 space-y-4 text-primary-foreground/80 prose prose-lg prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </AnimatedSection>
            <AnimatedSection className="mt-8">
              <Button asChild size="lg" variant="secondary">
                <Link href="/contato">FALE COM UM ESPECIALISTA!</Link>
              </Button>
            </AnimatedSection>
          </div>
        </div>

        <AnimatedSection delay={0.2} className="mt-20">
            <StatsCard />
        </AnimatedSection>
      </div>
    </section>
  );
}
