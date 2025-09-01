import Image from "next/image";
import { AnimatedSection } from "../shared/animated-section";

export function InvestmentCycle() {
  return (
    <section id="investment-cycle" className="bg-background">
      <div className="container">
        <AnimatedSection>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl text-primary uppercase">Entenda o ciclo completo do seu investimento</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Cada fundo da Aquila Fund FCR tem duração de 8 anos, com o capital levantado durante os primeiros dois anos e o período de desinvestimento ocorrendo nos últimos dois anos da vida do fundo.
          </p>
        </div>
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
        <div className="mt-12 flex justify-center">
            <Image 
                src="https://ik.imagekit.io/leosmc2zb/Agrupar%201(1).png"
                alt="Gráfico do ciclo de investimento de 8 anos"
                width={1138}
                height={463}
                className="object-contain"
                data-ai-hint="investment cycle graph"
            />
        </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
