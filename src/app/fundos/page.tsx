import { fundsData } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { InterestFormDialog } from "@/components/forms/interest-form";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Fundos de Investimento",
  description: "Explore nosso portfólio de fundos de investimento em Portugal, incluindo opções elegíveis para o Golden Visa nos setores de carros clássicos, hotelaria e imobiliário.",
};

const FundDetail = ({ label, value, isPrimary }: { label: string; value: string | undefined, isPrimary?: boolean }) => (
    <div className="flex justify-between py-2 border-b">
        <dt className={cn(isPrimary ? "text-primary-foreground/80" : "text-muted-foreground")}>{label}</dt>
        <dd className={cn("font-medium", isPrimary ? "text-primary-foreground" : "text-foreground")}>{value || 'N/A'}</dd>
    </div>
);

export default function FundosPage() {
  return (
    <>
      <div className="bg-background pt-32">
        <div className="container pb-12 md:pb-24 space-y-12">
            <div className="text-center max-w-4xl mx-auto">
                <h1 className="font-headline text-4xl md:text-5xl text-primary uppercase">Nossos Fundos</h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Na Aquila Fund FCR, oferecemos um portfólio diversificado de fundos de investimento, estruturados para atender às necessidades de investidores que buscam oportunidades no promissor mercado português.
                </p>
            </div>

            <div className="space-y-24">
            {fundsData.map((fund, index) => {
                const isRealEstate = fund.slug === 'aquila-real-estate';
                return (
                <section 
                    id={fund.slug} 
                    key={fund.slug} 
                    className={cn(
                        "scroll-mt-20 pt-12",
                        isRealEstate && "bg-primary text-primary-foreground rounded-3xl py-12 -mx-8 px-8"
                    )}
                >
                    <div className="grid lg:grid-cols-3 gap-8 lg:gap-16">
                        <div className="lg:col-span-2">
                             <h2 className={cn("font-headline text-3xl md:text-4xl uppercase", isRealEstate ? "text-primary-foreground" : "text-primary")}>{fund.nome}</h2>
                             {fund.detalhes.elegibilidadeGoldenVisa && <Badge variant="destructive" className="mt-2">Elegível para Golden Visa</Badge>}
                             <h3 className={cn("mt-2 text-xl font-headline", isRealEstate ? "text-primary-foreground/80" : "text-muted-foreground")}>{fund.subtitulo}</h3>
                             <div className={cn("mt-6 prose prose-lg max-w-none", isRealEstate ? "text-primary-foreground/80" : "text-muted-foreground")} dangerouslySetInnerHTML={{ __html: fund.descricaoHtml }} />
                        </div>
                        <div>
                            <Card className={cn(isRealEstate && "bg-card/10 border-primary-foreground/20 text-primary-foreground")}>
                                <CardHeader><CardTitle className={cn("font-headline", isRealEstate && "text-primary-foreground")}>Detalhes do Fundo</CardTitle></CardHeader>
                                <CardContent>
                                    <dl>
                                        <FundDetail label="Tipo" value={fund.detalhes.tipo} isPrimary={isRealEstate} />
                                        <FundDetail label="Dimensão do fundo" value={fund.detalhes.dimensao} isPrimary={isRealEstate} />
                                        <FundDetail label="Prazo de investimento" value={fund.detalhes.prazo} isPrimary={isRealEstate} />
                                        <FundDetail label="Investimento inicial" value={fund.detalhes.investimentoInicial} isPrimary={isRealEstate} />
                                        <FundDetail label="Movimentação mínima" value={fund.detalhes.movimentacaoMinima} isPrimary={isRealEstate} />
                                        {fund.detalhes.retornoEsperado && <FundDetail label="Retorno esperado" value={fund.detalhes.retornoEsperado} isPrimary={isRealEstate} />}
                                    </dl>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    
                    {fund.status === 'ativo' ? (
                        <>
                            {fund.beneficios.length > 0 && (
                                <div className="mt-12">
                                    <h4 className={cn("text-2xl font-headline text-center uppercase", isRealEstate ? "text-primary-foreground" : "text-primary")}>Benefícios</h4>
                                    <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                        {fund.beneficios.map((beneficio, i) => (
                                            <Card key={i} className={cn("bg-card", isRealEstate && "bg-card/10 border-primary-foreground/20 text-primary-foreground")}>
                                                <CardContent className="p-6 flex items-center gap-4">
                                                    <CheckCircle className="h-8 w-8 text-green-600 shrink-0" />
                                                    <p className={cn(isRealEstate ? "text-primary-foreground" : "text-foreground")}>{beneficio}</p>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {fund.hoteis && (
                                <div className="mt-12">
                                    <h4 className={cn("text-2xl font-headline text-center uppercase", isRealEstate ? "text-primary-foreground" : "text-primary")}>Hotéis Sob Gestão</h4>
                                    <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {fund.hoteis.map((hotel, i) => (
                                            <Card key={i} className={cn("overflow-hidden", isRealEstate && "bg-card/10 border-primary-foreground/20 text-primary-foreground")}>
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
                                <Button asChild size="lg" variant={isRealEstate ? "secondary" : "default"}>
                                    <Link href="/contato">Fale com um especialista sobre o {fund.nome}</Link>
                                </Button>
                            </div>
                        </>
                    ) : (
                         <div className="text-center mt-16">
                            <Card className={cn("max-w-2xl mx-auto p-8", isRealEstate && "bg-card/10 border-primary-foreground/20 text-primary-foreground")}>
                                <Clock className="mx-auto h-12 w-12 text-primary" />
                                <h4 className={cn("mt-4 text-2xl font-headline uppercase", isRealEstate ? "text-primary-foreground" : "text-primary")}>Em Breve</h4>
                                <p className={cn("mt-2", isRealEstate ? "text-primary-foreground/80" : "text-muted-foreground")}>Este fundo está em fase final de estruturação.</p>
                                <div className="mt-6">
                                    <InterestFormDialog fundName={fund.nome} buttonVariant={isRealEstate ? "secondary" : "default"} />
                                </div>
                            </Card>
                         </div>
                    )}
                    {index < fundsData.length - 1 && <Separator className={cn("mt-24", isRealEstate && "bg-primary-foreground/20")} />}
                </section>
                )
            })}
            </div>
        </div>
      </div>
    </>
  );
}
