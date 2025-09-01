
import { fundsData } from "@/lib/data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "../shared/animated-section";

export function FundsSummary() {
    const activeFunds = fundsData.filter(f => f.status === 'ativo');
    const comingSoonFunds = fundsData.filter(f => f.status === 'em_breve');

  return (
    <section id="fundos">
      <div className="container">
        <AnimatedSection>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl text-primary uppercase">Nossos Fundos de Investimento</h2>
        </div>
        </AnimatedSection>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {activeFunds.map((fund, index) => (
            <AnimatedSection key={fund.slug} delay={index * 0.1} className="h-full">
            <Card className="flex flex-col bg-card h-full">
                <CardHeader>
                    <CardTitle className="text-2xl">{fund.nome}</CardTitle>
                    <CardDescription>{fund.subtitulo}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-2">
                    {fund.detalhes.elegibilidadeGoldenVisa && <Badge variant="destructive">Elegível ao Golden Visa</Badge>}
                    {fund.detalhes.retornoEsperado && <p className="text-sm text-muted-foreground">Retorno de {fund.detalhes.retornoEsperado}</p>}
                    {fund.detalhes.parceria && <p className="text-sm text-muted-foreground">{fund.detalhes.parceria}</p>}
                </CardContent>
                 <CardFooter>
                    <Button asChild className="w-full">
                        <Link href={`/fundos#${fund.slug}`}>Saiba Mais</Link>
                    </Button>
                </CardFooter>
            </Card>
            </AnimatedSection>
          ))}
           {comingSoonFunds.map((fund, index) => (
            <AnimatedSection key={fund.slug} delay={(activeFunds.length + index) * 0.1} className="h-full">
            <Card className="flex flex-col bg-muted/50 border-dashed hover:shadow-none h-full">
                <CardHeader>
                    <CardTitle className="text-2xl">{fund.nome}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                    <p className="text-muted-foreground">(Aguardando informações)</p>
                </CardContent>
            </Card>
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
