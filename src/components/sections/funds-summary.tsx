
import { fundsData } from "@/lib/data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AnimatedSection } from "../shared/animated-section";
import { FundSummaryCard } from "./fund-summary-card";
import type { Block } from "@/lib/data-loader";

type Props = {
  block: Block | null;
}

const defaultContent = {
    title: 'Nossos Fundos de Investimento',
    content: 'Soluções de investimento seguras e rentáveis para investidores que buscam diversificação, proteção patrimonial e acesso ao Golden Visa em Portugal.',
}

export function FundsSummary({ block }: Props) {
    const activeFunds = fundsData.filter(f => f.status === 'ativo');
    
  return (
    <section id="fundos">
      <div className="container">
        <AnimatedSection>
        <div className="text-center max-w-3xl mx-auto">
           <h2 className="text-sm uppercase tracking-widest text-muted-foreground font-headline">
              PORTFÓLIO
          </h2>
          <h3 className="font-headline text-4xl text-primary uppercase mt-2">{block?.title || defaultContent.title}</h3>
          <p className="mt-4 text-lg text-muted-foreground">
            {block?.content || defaultContent.content}
          </p>
        </div>
        </AnimatedSection>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {activeFunds.map((fund, index) => (
            <AnimatedSection key={fund.slug} delay={index * 0.1}>
              <FundSummaryCard fund={fund} />
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center mt-12">
            <Button asChild size="lg">
                <Link href="/fundos">SAIBA MAIS SOBRE OS FUNDOS!</Link>
            </Button>
        </AnimatedSection>
      </div>
    </section>
  );
}
