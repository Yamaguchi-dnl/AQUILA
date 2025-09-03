import { AnimatedSection } from "../shared/animated-section";

const timelineData = {
    years: Array.from({ length: 9 }, (_, i) => i),
    phases: [
        { name: "Período de Inscrição", start: 1, span: 2, top: "8rem" },
        { name: "Investimento", period: "Período de 6 anos", start: 1, span: 6, top: "12rem" },
        { name: "Retenção e Desinvestimento", period: "Período 2 anos", start: 7, span: 2, top: "12rem" }
    ]
};

export function InvestmentCycle() {
  return (
    <section id="investment-cycle" className="bg-primary text-primary-foreground">
      <div className="container">
        <AnimatedSection>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-sm uppercase tracking-widest text-primary-foreground/60 font-headline">
            COMO FUNCIONA
          </h2>
          <h3 className="font-headline text-4xl text-primary-foreground uppercase mt-2">Entenda o ciclo completo do seu investimento</h3>
          <p className="mt-4 text-lg text-primary-foreground/80">
            Cada fundo da Aquila Fund FCR tem duração de 8 anos, com o capital levantado durante os primeiros dois anos e o período de desinvestimento ocorrendo nos últimos dois anos da vida do fundo.
          </p>
        </div>
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
        <div className="mt-20">
            <div className="relative">
                {/* Year Markers */}
                <div className="grid grid-cols-9 text-center text-timeline-fg">
                    {timelineData.years.map(year => (
                        <div key={year} className="relative border-l border-timeline-fg/30 first:border-l-0 px-2 py-4">
                            <p className="text-sm">Ano</p>
                            <p className="text-6xl font-light">{year}</p>
                        </div>
                    ))}
                </div>

                {/* Phase Blocks */}
                <div className="relative mt-4 h-48">
                   <div className="absolute top-0 w-full">
                       <div className="grid grid-cols-9">
                           {/* Phase 1 */}
                           <div className="col-start-1 col-span-2 bg-timeline-fg/20 p-2 rounded text-center">
                               <p className="font-semibold text-primary-foreground">Período de Inscrição</p>
                           </div>
                       </div>
                   </div>
                   <div className="absolute top-16 w-full">
                       <div className="grid grid-cols-9">
                           {/* Phase 2 */}
                           <div className="col-start-1 col-span-6 bg-timeline-bg p-3 rounded text-center">
                               <p className="font-semibold text-primary-foreground">Investimento</p>
                               <p className="text-sm text-primary-foreground/80">Período de 6 anos</p>
                           </div>
                            {/* Phase 3 */}
                           <div className="col-start-7 col-span-2 bg-timeline-bg p-3 rounded text-center ml-2">
                               <p className="font-semibold text-primary-foreground">Retenção e Desinvestimento</p>
                               <p className="text-sm text-primary-foreground/80">Período 2 anos</p>
                           </div>
                       </div>
                   </div>
                </div>
            </div>
        </div>
        </AnimatedSection>
      </div>
    </section>
  );
}