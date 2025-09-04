
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { InterestFormDialog } from "@/components/forms/interest-form";
import { cn } from "@/lib/utils";
import { AnimatedSection } from "@/components/shared/animated-section";
import { getPageContentBySlug, findBlock } from "@/lib/data-loader";
import type { Fund } from "@/lib/types";
import { fundsData } from "@/lib/data";

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

// Helper function to find fund data from static lib/data.ts
const getFundStaticData = (slug: string): Fund | undefined => {
    return fundsData.find(f => f.slug === slug);
}

export default async function FundosPage() {
  const blocks = await getPageContentBySlug('fundos');

  const headerBlock = findBlock(blocks, 'fundos-header');
  const fundBlocks = blocks.filter(b => b.block_type.startsWith('fund-'));

  return (
    <>
        <section className="relative bg-primary pt-32 md:pt-40 pb-20 md:pb-24">
            <div className="container relative z-10">
                <div className="text-center">
                    <p className="text-sm uppercase tracking-widest text-primary-foreground/80 font-headline">Conheça as oportunidades</p>
                    <h1 className="font-headline text-4xl md:text-5xl text-primary-foreground uppercase mt-2">{headerBlock?.title || 'Nossos Fundos'}</h1>
                    <p className="mt-4 mb-16 max-w-3xl mx-auto text-lg text-primary-foreground/90">
                        {headerBlock?.content || 'Explore nosso portfólio de fundos de investimento em Portugal, incluindo opções elegíveis para o Golden Visa.'}
                    </p>
                </div>
            </div>
        </section>
      <div className="space-y-0">
      {fundBlocks.map((block, index) => {
          const fundSlug = block.block_type.replace('fund-', '');
          const fund = getFundStaticData(fundSlug);
          if (!fund) return null;

          const isPrimarySection = index % 2 !== 0;
          const isReversed = index % 2 !== 0;
          
          return (
          <section 
              id={fund.slug} 
              key={fund.slug} 
              className={cn(
                  "scroll-mt-20 py-16 md:py-24 relative",
                  isPrimarySection ? "bg-primary text-primary-foreground" : "bg-background text-foreground",
                  'rounded-t-3xl',
                  'md:-mt-20'
              )}
              style={{ zIndex: 10 - index }}
          >
              {isPrimarySection && (
                <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[radial-gradient(30%_40%_at_95%_95%,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_100%),radial-gradient(30%_40%_at_5%_5%,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_100%)]"
                />
              )}
              <div className="container relative z-10">
                  <div className="grid lg:grid-cols-3 gap-8 lg:gap-16 items-center">
                      <AnimatedSection className={cn("lg:col-span-2", isReversed && "lg:order-last")}>
                            {fund.detalhes.elegibilidadeGoldenVisa && (
                                <Badge variant={fund.slug === 'aquila-wheels' ? 'default' : 'secondary'} className={cn("mb-2", fund.slug === 'aquila-hotel-invest' && 'bg-white/20 text-white backdrop-blur-sm border border-white/30')}>Elegível para Golden Visa</Badge>
                            )}
                            <h2 className={cn("font-headline text-3xl md:text-4xl uppercase", isPrimarySection ? "text-primary-foreground" : "text-primary")}>{block.title || fund.nome}</h2>
                            <p className={cn("mt-2 text-lg font-semibold", isPrimarySection ? "text-primary-foreground/90" : "text-foreground")}>{block.content || fund.subtitulo}</p>
                            <div className={cn("mt-6 prose prose-lg max-w-none", isPrimarySection ? "text-primary-foreground/80" : "text-muted-foreground")} dangerouslySetInnerHTML={{ __html: block.sub_content || fund.descricaoHtml }} />
                      </AnimatedSection>
                      <AnimatedSection delay={0.1}>
                          <Card className={cn("shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl", isPrimarySection && "bg-card/10 border-primary-foreground/20 text-primary-foreground")}>
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
                      </AnimatedSection>
                  </div>
                  
                  {fund.status === 'ativo' ? (
                      <>
                          {fund.beneficios.length > 0 && (
                                <AnimatedSection className="mt-12">
                                    <h4 className={cn("text-4xl font-headline text-center uppercase", isPrimarySection ? "text-primary-foreground" : "text-primary")}>Benefícios</h4>
                                    <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
                                        {fund.beneficios.map((beneficio, i) => (
                                            <Card key={i} className={cn("text-center flex flex-col", isPrimarySection && "bg-card/10 border-primary-foreground/20 text-primary-foreground")}>
                                                <CardContent className="p-6 flex-grow flex flex-col items-center justify-center">
                                                    <CheckCircle className="mx-auto h-8 w-8 text-green-500 shrink-0" />
                                                    <p className={cn("mt-4 font-medium", isPrimarySection ? "text-primary-foreground/90" : "text-muted-foreground")}>{beneficio}</p>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </AnimatedSection>
                          )}

                          {fund.hoteis && (
                              <div className="mt-12">
                                <AnimatedSection>
                                  <h4 className={cn("text-4xl font-headline text-center uppercase", isPrimarySection ? "text-primary-foreground" : "text-primary")}>Hotéis Sob Gestão</h4>
                                  <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                      {fund.hoteis.map((hotel, i) => {
                                          let imageUrl = `${hotel.imagem.src}?v=${hotel.imagem.v}`;
                                          if (hotel.nome.includes('Intercontinental')) {
                                              imageUrl = 'https://ik.imagekit.io/leosmc2zb/IC-Cascais-Estoril.jpg';
                                          } else if (hotel.nome.includes('Palácio Condes de Azevedo')) {
                                              imageUrl = 'https://ik.imagekit.io/leosmc2zb/62159451.jpg';
                                          }
                                          return (
                                            <AnimatedSection key={`${hotel.nome}-${hotel.imagem.v}`} delay={i * 0.1}>
                                                <Card className={cn("overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl h-full", isPrimarySection && "bg-card/10 border-primary-foreground/20 text-primary-foreground")}>
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
                                            </AnimatedSection>
                                          )
                                      })}
                                  </div>
                                </AnimatedSection>
                              </div>
                          )}

                          <AnimatedSection className="text-center mt-16">
                              <Button asChild size="lg" variant={isPrimarySection ? "secondary" : "default"}>
                                  <Link href="/contato">Fale com um especialista sobre o {fund.nome}</Link>
                              </Button>
                          </AnimatedSection>
                      </>
                  ) : (
                        <AnimatedSection className="text-center mt-16">
                          <Card className={cn("max-w-2xl mx-auto p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl", isPrimarySection && "bg-card/10 border-primary-foreground/20 text-primary-foreground")}>
                              <Clock className="mx-auto h-12 w-12 text-primary" />
                              <h4 className={cn("mt-4 text-4xl font-headline uppercase", isPrimarySection ? "text-primary-foreground" : "text-primary")}>Em Breve</h4>
                              <p className={cn("mt-2", isPrimarySection ? "text-primary-foreground/80" : "text-muted-foreground")}>Este fundo está em fase final de estruturação.</p>
                              <div className="mt-6">
                                  <InterestFormDialog fundName={fund.nome} buttonVariant={isPrimarySection ? "secondary" : "default"} buttonSize="lg" />
                              </div>
                          </Card>
                        </AnimatedSection>
                  )}
              </div>
          </section>
          )
      })}
      </div>
    </>
  );
}
