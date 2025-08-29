import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { AnimatedSection } from "../shared/animated-section";
import { StatsCard } from "./stats-card";

export function AboutSummary() {
  return (
    <section id="sobre" className="bg-primary text-primary-foreground geometric-clip -mt-32 pt-48 pb-24">
      <div className="container">
        <StatsCard />
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center mt-24">
          <div>
            <AnimatedSection>
              <h2 className="text-sm uppercase tracking-widest text-primary-foreground/60">
                  <Link href="/sobre">Sobre Nós</Link>
              </h2>
              <h3 className="font-headline text-3xl md:text-4xl text-primary-foreground font-bold mt-2">Seu capital, nossa expertise</h3>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="mt-6 space-y-4 text-primary-foreground/80 prose prose-lg max-w-none">
                <p>
                  A Aquila Fund FCR é uma plataforma de investimentos portuguesa, com quatro fundos de investimento totalmente independentes e registrados na Comissão do Mercado de Valores Mobiliários (CMVM).
                </p>
                <p>
                  Com uma equipe experiente e altamente qualificada, oferecemos soluções seguras e rentáveis para investidores brasileiros, através de nossos fundos - Wheels, Agro, Hotel Invest e Real State.
                </p>
                <p>
                  Com estas soluções, você diversifica seu portfólio, ganha acesso facilitado ao passaporte europeu e protege seu patrimônio em um mercado estável e repleto de oportunidades.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <Button asChild size="lg" className="mt-8" variant="secondary">
                <Link href="/contato">FALE COM UM ESPECIALISTA!</Link>
              </Button>
            </AnimatedSection>
          </div>
          <div className="hidden md:block">
            <AnimatedSection delay={0.1}>
            <Image 
                src="https://picsum.photos/600/400"
                alt="Escritório moderno"
                width={600}
                height={400}
                className="rounded-lg object-cover shadow-xl"
                data-ai-hint="modern office"
            />
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
