"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { InterestFormDialog } from "@/components/forms/interest-form";
import { cn } from "@/lib/utils";
import { AnimatedSection } from "@/components/shared/animated-section";
import type { Block } from "@/lib/data-loader";
import type { Fund } from "@/lib/types";

const FundDetail = ({ label, value, isPrimary }: { label: string; value: string | undefined, isPrimary?: boolean }) => (
    <div className="flex justify-between py-2 border-b">
        <dt className={cn(isPrimary ? "text-primary-foreground/80" : "text-muted-foreground")}>{label}</dt>
        <dd className={cn("font-medium", isPrimary ? "text-primary-foreground" : "text-foreground")}>{value || 'N/A'}</dd>
    </div>
);

// Helper to find a specific block from the array
function findBlock(blocks: Block[], blockType: string): Block | null {
    return blocks.find(b => b.block_type === blockType) || null;
}

type FundosClientProps = {
    headerBlock: Block | null;
    allBlocks: Block[];
    fundsData: Fund[];
}

export default function FundosClient({ headerBlock, allBlocks, fundsData }: FundosClientProps) {
  const availableFunds = fundsData;

  return (
    <>
        <section className="w-full h-screen bg-primary text-primary-foreground relative flex items-center justify-center text-center overflow-hidden">
             <Image
                src="https://ik.imagekit.io/leosmc2zb/143069.jpg"
                alt="Fundo da seção de fundos"
                fill
                className="object-cover"
                priority
             />
            <div className="container relative z-20">
                <AnimatedSection>
                    <p className="text-sm uppercase tracking-widest text-primary-foreground/80 font-headline">Conheça as oportunidades</p>
                    <h1 className="font-headline text-4xl md:text-5xl text-primary-foreground uppercase mt-2">{headerBlock?.title || 'Nossos Fundos'}</h1>
                </AnimatedSection>
            </div>
        </section>

      <div className="space-y-0">
      {availableFunds.map((fund, index) => {
          const block = findBlock(allBlocks, `fund-${fund.slug}`);
          
          if (!fund || !block) return null;

          const isPrimarySection = index % 2 !== 0;
          const isReversed = index % 2 !== 0;
          
          return (
          <section 
              id={fund.slug} 
              key={fund.slug} 
              className={cn(
                  "scroll-mt-20 py-16 md:py-24 relative",
                  isPrimarySection ? "bg-primary text-primary-foreground" : "bg-background text-foreground"
              )}
          >
              {isPrimarySection && (
                <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(255,255,255,0.15)_0%,_transparent_70%)]"
                />
              )}
              <div className="container relative z-10">
                  <div className="grid lg:grid-cols-3 gap-8 lg:gap-16 items-center">
                      <AnimatedSection className={cn("lg:col-span-2", isReversed && "lg:order-last")} direction={isReversed ? 'right' : 'left'}>
                            {fund.detalhes.elegibilidadeGoldenVisa && (
                                <Badge variant={fund.slug === 'aquila-wheels' ? 'default' : 'secondary'} className={cn("mb-2", fund.slug === 'aquila-hotel-invest' && 'bg-white/20 text-white backdrop-blur-sm border border-white/30')}>Elegível para Golden Visa</Badge>
                            )}
                            <h2 className={cn("font-headline text-3xl md:text-4xl uppercase", isPrimarySection ? "text-primary-foreground" : "text-primary")}>{block.title}</h2>
                            {block.content && <p className={cn("mt-2 text-lg font-semibold", isPrimarySection ? "text-primary-foreground/90" : "text-foreground")}>{block.content}</p>}
                            {block.sub_content && <div className={cn("mt-6 prose prose-lg max-w-none", isPrimarySection ? "text-primary-foreground/80" : "text-muted-foreground")} dangerouslySetInnerHTML={{ __html: block.sub_content }} />}
                      </AnimatedSection>
                      <AnimatedSection delay={0.1} direction={isReversed ? 'left' : 'right'}>
                          <Card className={cn("shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl", isPrimarySection && "bg-card/10 border-primary-foreground/20 text-primary-foreground")}>
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
                                <div className="mt-12">
                                    <AnimatedSection>
                                      <h4 className={cn("text-4xl font-headline text-center uppercase", isPrimarySection ? "text-primary-foreground" : "text-primary")}>Benefícios</h4>
                                    </AnimatedSection>
                                    <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
                                        {fund.beneficios.map((beneficio, i) => (
                                            <AnimatedSection key={i} delay={0.1 + i * 0.1} direction="up">
                                            <Card className={cn("text-center flex flex-col h-full shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl", isPrimarySection && "bg-card/10 border-primary-foreground/20 text-primary-foreground")}>
                                                <CardContent className="p-6 flex-grow flex flex-col items-center justify-center">
                                                    <CheckCircle className="mx-auto h-8 w-8 text-green-500 shrink-0" />
                                                    <p className={cn("mt-4 font-medium", isPrimarySection ? "text-primary-foreground/90" : "text-muted-foreground")}>{beneficio}</p>
                                                </CardContent>
                                            </Card>
                                            </AnimatedSection>
                                        ))}
                                    </div>
                                </div>
                          )}

                          {fund.hoteis && (
                              <div className="mt-12">
                                <AnimatedSection>
                                  <h4 className={cn("text-4xl font-headline text-center uppercase", isPrimarySection ? "text-primary-foreground" : "text-primary")}>Hotéis Sob Gestão</h4>
                                </AnimatedSection>
                                  <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                      {fund.hoteis.map((hotel, i) => {
                                          let imageUrl = `${hotel.imagem.src}?v=${hotel.imagem.v}`;
                                          if (hotel.nome.includes('Intercontinental')) {
                                              imageUrl = 'https://ik.imagekit.io/leosmc2zb/IC-Cascais-Estoril.jpg';
                                          } else if (hotel.nome.includes('Palácio Condes de Azevedo')) {
                                              imageUrl = 'https://ik.imagekit.io/leosmc2zb/62159451.jpg';
                                          }
                                          return (
                                            <AnimatedSection key={`${hotel.nome}-${hotel.imagem.v}`} delay={0.1 + i * 0.1} direction="up">
                                                <Card className={cn("overflow-hidden shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl h-full", isPrimarySection && "bg-card/10 border-primary-foreground/20 text-primary-foreground")}>
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
                              </div>
                          )}

                          <AnimatedSection className="mt-16" direction="up">
                            <div className="flex justify-center">
                              <Button asChild size="lg" variant={isPrimarySection ? "secondary" : "default"}>
                                  <Link href="/contato">Fale com um especialista sobre o {fund.nome}</Link>
                              </Button>
                            </div>
                          </AnimatedSection>
                      </>
                  ) : (
                        <AnimatedSection className="text-center mt-16" direction="up">
                          <Card className={cn("max-w-2xl mx-auto p-8 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl", isPrimarySection && "bg-card/10 border-primary-foreground/20 text-primary-foreground")}>
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
