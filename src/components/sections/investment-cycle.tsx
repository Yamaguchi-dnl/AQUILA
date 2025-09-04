
import { AnimatedSection } from "../shared/animated-section";

const timelineData = {
    years: Array.from({ length: 9 }, (_, i) => i),
    phases: [
        { name: "Período de Inscrição", start: 1, span: 2, top: "8rem" },
        { name: "Investimento", period: "Período de 6 anos", start: 1, span: 6, top: "12rem" },
        { name: "Retenção e Desinvestimento", period: "Período 2 anos", start: 7, span: 2, top: "12rem" }
    ]
};

const mobileTimelineData = [
    {
        title: "Período de Inscrição",
        duration: "Anos 0-2",
        description: "Fase inicial para entrada de novos investidores no fundo."
    },
    {
        title: "Período de Investimento",
        duration: "Anos 2-7",
        description: "Alocação de capital e gestão ativa dos ativos para maximizar o valor."
    },
    {
        title: "Retenção e Desinvestimento",
        duration: "Anos 7-8",
        description: "Fase final de maturação e venda dos ativos para realizar os lucros."
    }
];

export function InvestmentCycle() {
  return (
    <section id="investment-cycle" className="bg-transparent text-primary-foreground relative pt-16 md:pt-24 lg:pt-28">
      <div className="container relative z-10">
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
        {/* Desktop Timeline */}
        <div className="mt-20 hidden md:block">
            <div className="relative">
                {/* Top Row: Subscription Period */}
                <div className="mb-4">
                    <div className="w-[22.22%] bg-timeline-fg/20 p-2 rounded text-center">
                         <p className="font-semibold text-primary-foreground">Período de Inscrição</p>
                    </div>
                </div>

                {/* Year Markers */}
                <div className="flex text-center text-timeline-fg">
                    {timelineData.years.map(year => (
                        <div key={year} className="relative flex-1 border-l border-timeline-fg/30 first:border-l-0 px-2 py-4">
                            <p className="text-sm">Ano</p>
                            <p className="text-6xl font-light">{year}</p>
                        </div>
                    ))}
                </div>

                {/* Bottom Row: Investment & Divestment */}
                <div className="flex mt-4 gap-2">
                    <div className="w-[77.77%] bg-timeline-bg p-3 rounded text-center">
                         <p className="font-semibold text-primary-foreground">Investimento</p>
                        <p className="text-sm text-primary-foreground/80">Período de 6 anos</p>
                    </div>
                    <div className="flex-1 bg-timeline-bg p-3 rounded text-center">
                         <p className="font-semibold text-primary-foreground">Retenção e Desinvestimento</p>
                        <p className="text-sm text-primary-foreground/80">Período 2 anos</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Mobile Timeline */}
        <div className="mt-16 block md:hidden">
            <div className="relative flow-root">
                <div className="absolute left-5 top-2 h-full w-px bg-primary-foreground/20" aria-hidden="true"></div>
                
                <div className="space-y-12">
                    {mobileTimelineData.map((item, index) => (
                        <div key={index} className="relative pl-12">
                            <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground ring-4 ring-primary font-bold text-lg">
                                {index + 1}
                            </div>
                            <div className="ml-4">
                                <h4 className="font-headline text-lg text-primary-foreground">{item.title}</h4>
                                <p className="text-sm text-primary-foreground/60 mb-2">{item.duration}</p>
                                <p className="text-primary-foreground/80 text-sm">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
