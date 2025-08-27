import { fundsData } from "@/lib/data";
import { FundCard } from "@/components/shared/fund-card";

export function FundsSummary() {
  return (
    <section id="fundos" className="bg-background">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">Nossas Soluções de Investimento</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Oferecemos um portfólio diversificado de fundos, estruturados para atender às necessidades de investidores que buscam oportunidades no promissor mercado português.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {fundsData.map((fund) => (
            <FundCard key={fund.slug} fund={fund} />
          ))}
        </div>
      </div>
    </section>
  );
}
