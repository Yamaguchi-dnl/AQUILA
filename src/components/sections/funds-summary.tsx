

import { fundsData } from "@/lib/data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AnimatedSection } from "../shared/animated-section";
import { FundSummaryCard } from "./fund-summary-card";
import type { Block } from "@/lib/data-loader";

type Props = {
  block: Block | null;
}

export function FundsSummary({ block }: Props) {
    const activeFunds = fundsData.filter(f => f.status === 'ativo');
    const title = block?.title || 'SOLUÇÕES ESTRUTURADAS EM PORTUGAL E NA EUROPA';
    const content = block?.content || 'Soluções de investimento seguras e rentáveis para investidores que buscam diversificação, proteção patrimonial e acesso ao Golden Visa em Portugal.';
    
  return (
    <section id="fundos">
      <div className="container">
        <AnimatedSection direction="up">
        <div className="text-center max-w-3xl mx-auto">
          <h3 className="font-headline text-4xl text-primary uppercase mt-2">{title}</h3>
        </div>
        </AnimatedSection>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {activeFunds.map((fund, index) => (
            <AnimatedSection key={fund.slug} delay={0.1 + index * 0.1} direction={index % 2 === 0 ? "left" : "right"}>
              <FundSummaryCard fund={fund} />
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center mt-12" delay={0.3} direction="up">
            <Button asChild size="lg">
                <Link href="/fundos">SAIBA MAIS SOBRE OS FUNDOS!</Link>
            </Button>
        </AnimatedSection>
      </div>
    </section>
  );
}
