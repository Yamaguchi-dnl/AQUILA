import { PageHeader } from "@/components/shared/page-header";
import { fundsData } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { InterestFormDialog } from "@/components/forms/interest-form";

export const metadata = {
  title: "Fundos de Investimento",
  description: "Explore nosso portfólio de fundos de investimento em Portugal, incluindo opções elegíveis para o Golden Visa nos setores de carros clássicos, hotelaria e imobiliário.",
};

const FundDetail = ({ label, value }: { label: string; value: string | undefined }) => (
    <div className="flex justify-between py-2 border-b border-border/50">
        <dt className="text-muted-foreground">{label}</dt>
        <dd className="font-medium text-foreground">{value || 'N/A'}</dd>
    </div>
);

export default function FundosPage() {
  return (
    <>
      <PageHeader
        title="Nossos Fundos"
        subtitle="Na Aquila Fund FCR, oferecemos um portfólio diversificado de fundos de investimento, estruturados para atender às necessidades de investidores que buscam oportunidades no promissor mercado português."
      />

      <div className="bg-background">
        <div className="container py-12 md:py-24 space-y-24">
            {fundsData.map((fund, index) => (
                <section id={fund.slug} key={fund.slug} className="scroll-mt-20">
                    <div className="grid lg:grid-cols-3 gap-8 lg:gap-16">
                        <div className="lg:col-span-2">
                             <h2 className="font-headline text-3xl md:text-4xl text-primary font-bold">{fund.nome}</h2>
                             {fund.detalhes.elegibilidadeGoldenVisa && <Badge variant="destructive" className="mt-2">Elegível para Golden Visa</Badge>}
                             <h3 className="mt-2 text-xl text-muted-foreground">{fund.subtitulo}</h3>
                             <div className="mt-6 prose prose-lg max-w-none text-muted-foreground" dangerouslySetInnerHTML={{ __html: fund.descricaoHtml }} />
                        </div>
                        <div>
                            <Card>
                                <CardHeader><CardTitle>Detalhes do Fundo</CardTitle></CardHeader>
                                <CardContent>
                                    <dl>
                                        <FundDetail label="Tipo" value={fund.detalhes.tipo} />
                                        <FundDetail label="Dimensão do fundo" value={fund.detalhes.dimensao} />
                                        <FundDetail label="Prazo de investimento" value={fund.detalhes.prazo} />
                                        <FundDetail label="Investimento inicial" value={fund.detalhes.investimentoInicial} />
                                        <FundDetail label="Movimentação mínima" value={fund.detalhes.movimentacaoMinima} />
                                        {fund.detalhes.retornoEsperado && <FundDetail label="Retorno esperado" value={fund.detalhes.retornoEsperado} />}
                                    </dl>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    
                    {fund.status === 'ativo' ? (
                        <>
                            {fund.beneficios.length > 0 && (
                                <div className="mt-12">
                                    <h4 className="text-2xl font-bold font-headline text-center text-primary">Benefícios</h4>
                                    <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                        {fund.beneficios.map((beneficio, i) => (
                                            <Card key={i} className="bg-card">
                                                <CardContent className="p-6 flex items-center gap-4">
                                                    <CheckCircle className="h-8 w-8 text-green-600 shrink-0" />
                                                    <p className="text-foreground">{beneficio}</p>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {fund.hoteis && (
                                <div className="mt-12">
                                    <h4 className="text-2xl font-bold font-headline text-center text-primary">Hotéis Sob Gestão</h4>
                                    <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {fund.hoteis.map((hotel, i) => (
                                            <Card key={i} className="overflow-hidden">
                                                <Image src={hotel.imagem} alt={hotel.nome} width={600} height={400} className="w-full h-48 object-cover" data-ai-hint={hotel.dataAiHint} />
                                                <CardContent className="p-4">
                                                    <p className="font-semibold text-foreground">{hotel.nome}</p>
                                                    <p className="text-sm text-muted-foreground">{hotel.localizacao}</p>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="text-center mt-16">
                                <Button asChild size="lg">
                                    <Link href="/contato">Fale com um especialista sobre o {fund.nome}</Link>
                                </Button>
                            </div>
                        </>
                    ) : (
                         <div className="text-center mt-16">
                            <Card className="max-w-2xl mx-auto p-8">
                                <Clock className="mx-auto h-12 w-12 text-primary" />
                                <h4 className="mt-4 text-2xl font-bold font-headline text-primary">Em Breve</h4>
                                <p className="mt-2 text-muted-foreground">Este fundo está em fase final de estruturação.</p>
                                <div className="mt-6">
                                    <InterestFormDialog fundName={fund.nome} />
                                </div>
                            </Card>
                         </div>
                    )}
                    {index < fundsData.length - 1 && <Separator className="mt-24" />}
                </section>
            ))}
        </div>
      </div>
    </>
  );
}
