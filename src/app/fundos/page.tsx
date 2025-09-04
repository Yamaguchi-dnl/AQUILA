

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
import { PageHeader } from "@/components/shared/page-header";

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
      <PageHeader 
        title="Nossos Fundos"
        subtitle="Explore nosso portfólio de fundos de investimento em Portugal, incluindo opções elegíveis para o Golden Visa."
      />
      <div className="space-y-0">
      {fundsData.map((fund, index) => {
          const isPrimarySection = index % 2 === 1;
          return (
          <section 
              id={fund.slug} 
              key={fund.slug} 
              className={cn(
                  "scroll-mt-20 py-16 md:py-24 relative",
                  isPrimarySection ? "bg-primary text-primary-foreground" : "bg-background text-foreground",
              )}
          >
              {isPrimarySection && (
                <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[radial-gradient(30%_40%_at_95%_95%,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_100%),radial-gradient(30%_40%_at_5%_5%,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_100%)]"
                />
              )}
              <div className="container relative z-10">
                  <div className="grid lg:grid-cols-3 gap-8 lg:gap-16 items-center">
                      <div className="lg:col-span-2">
                            <h2 className={cn("font-headline text-3xl md:text-4xl uppercase", isPrimarySection ? "text-primary-foreground" : "text-primary")}>{fund.nome}</h2>
                            {fund.detalhes.elegibilidadeGoldenVisa && <Badge variant="destructive" className="mt-2">Elegível para Golden Visa</Badge>}
                            <h3 className={cn("mt-2 text-xl font-headline", isPrimarySection ? "text-primary-foreground/80" : "text-muted-foreground")}>{fund.subtitulo}</h3>
                            <div className={cn("mt-6 prose prose-lg max-w-none", isPrimarySection ? "text-primary-foreground/80" : "text-muted-foreground")} dangerouslySetInnerHTML={{ __html: fund.descricaoHtml }} />
                      </div>
                      <div>
                          <Card className={cn("shadow-lg", isPrimarySection && "bg-card/10 border-primary-foreground/20 text-primary-foreground")}>
                              <CardHeader><CardTitle className={cn("font-headline", isPrimarySection && "text-primary-foreground")}>Detalhes do Fundo</CardTitle></CardHeader>
                              <CardContent>
                                  <dl>
                                      <FundDetail label="Tipo" value={fund.detalhes.tipo} isPrimary={isPrimarySection} />
                                      <FundDetail label="Dimensão do fundo" value={fund.detalhes.dimensao} isPrimary={isPrimarySection} />
                                      <FundDetail label="Prazo de investimento" value={fund.detalhes.prazo} isPrimary={isPrimarySection} />
                                      <FundDetail label="Investimento inicial" value={fund.detalhes.investimentoInicial} isPrimary={isPrimarySection} />
                                      <FundDetail label="Movimentação mínima" value={fund.detalhes.movimentacaoMinima} isPrimary={isPrimarySection} />
                                      {fund.detalhes.retornoEsperado && <FundDetail label="Retorno esperado" value={fund.detalhes.retornoEsperado} isPrimary={isPrimarySection} />}
                                  </dl>
                              </CardContent>
                          </Card>
                      </div>
                  </div>
                  
                  {fund.status === 'ativo' ? (
                      <>
                          {fund.beneficios.length > 0 && (
                              <div className="mt-12">
                                  <h4 className={cn("text-2xl font-headline text-center uppercase", isPrimarySection ? "text-primary-foreground" : "text-primary")}>Benefícios</h4>
                                  <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                      {fund.beneficios.map((beneficio, i) => (
                                          <Card key={i} className={cn("bg-card", isPrimarySection && "bg-card/10 border-primary-foreground/20 text-primary-foreground")}>
                                              <CardContent className="p-6 flex items-center gap-4 text-center justify-center">
                                                  <CheckCircle className="h-8 w-8 text-green-600 shrink-0" />
                                                  <p className={cn(isPrimarySection ? "text-primary-foreground" : "text-foreground")}>{beneficio}</p>
                                              </CardContent>
                                          </Card>
                                      ))}
                                  </div>
                              </div>
                          )}

                          {fund.hoteis && (
                              <div className="mt-12">
                                  <h4 className={cn("text-2xl font-headline text-center uppercase", isPrimarySection ? "text-primary-foreground" : "text-primary")}>Hotéis Sob Gestão</h4>
                                  <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                      {fund.hoteis.map((hotel, i) => {
                                          let imageUrl = `${hotel.imagem.src}?v=${hotel.imagem.v}`;
                                          if (hotel.nome.includes('Intercontinental')) {
                                              imageUrl = 'https://ik.imagekit.io/leosmc2zb/IC-Cascais-Estoril.jpg';
                                          } else if (hotel.nome.includes('Palácio Condes de Azevedo')) {
                                              imageUrl = 'https://ik.imagekit.io/leosmc2zb/62159451.jpg';
                                          }
                                          return (
                                          <Card key={`${hotel.nome}-${hotel.imagem.v}`} className={cn("overflow-hidden", isPrimarySection && "bg-card/10 border-primary-foreground/20 text-primary-foreground")}>
                                              <Image 
                                                src={imageUrl} 
                                                alt={hotel.nome} 
                                                width={600} 
                                                height={400} 
                                                className={cn(
                                                    "w-full h-48 object-cover",
                                                    hotel.nome.includes('Seteais') && 'object-bottom'
                                                )} 
                                                data-ai-hint={hotel.dataAiHint} 
                                               />
                                              <CardContent className="p-4">
                                                  <p className={cn("font-semibold", isPrimarySection ? "text-primary-foreground" : "text-foreground")}>{hotel.nome}</p>
                                                  <p className={cn("text-sm", isPrimarySection ? "text-primary-foreground/80" : "text-muted-foreground")}>{hotel.localizacao}</p>
                                              </CardContent>
                                          </Card>
                                          )
                                      })}
                                  </div>
                              </div>
                          )}

                          <div className="text-center mt-16">
                              <Button asChild size="lg" variant={isPrimarySection ? "secondary" : "default"}>
                                  <Link href="/contato">Fale com um especialista sobre o {fund.nome}</Link>
                              </Button>
                          </div>
                      </>
                  ) : (
                        <div className="text-center mt-16">
                          <Card className={cn("max-w-2xl mx-auto p-8", isPrimarySection && "bg-card/10 border-primary-foreground/20 text-primary-foreground")}>
                              <Clock className="mx-auto h-12 w-12 text-primary" />
                              <h4 className={cn("mt-4 text-2xl font-headline uppercase", isPrimarySection ? "text-primary-foreground" : "text-primary")}>Em Breve</h4>
                              <p className={cn("mt-2", isPrimarySection ? "text-primary-foreground/80" : "text-muted-foreground")}>Este fundo está em fase final de estruturação.</p>
                              <div className="mt-6">
                                  <InterestFormDialog fundName={fund.nome} buttonVariant={isPrimarySection ? "secondary" : "default"} />
                              </div>
                          </Card>
                        </div>
                  )}
              </div>
          </section>
          )
      })}
      </div>
    </>
  );
}
