
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FundCard } from "@/components/shared/fund-card";
import { Check, ShieldAlert, BadgeCheck, Landmark, Euro, LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { AnimatedSection } from "@/components/shared/animated-section";
import type { Block } from "@/lib/data-loader";
import type { Fund, FaqItem } from "@/lib/types";
import ParticlesContainer from "@/components/shared/particles-container";

type ProcessStep = {
    title: string;
    description: string;
};

type GoldenVisaClientProps = {
    headerBlock: Block | null;
    benefitsBlock: Block | null;
    processBlock: Block | null;
    eligibleFundsBlock: Block | null;
    faqBlock: Block | null;
    eligibleFunds: Fund[];
    benefits: string[];
    processSteps: ProcessStep[];
    faqs: FaqItem[];
};

export default function GoldenVisaClient({
    headerBlock,
    benefitsBlock,
    processBlock,
    eligibleFundsBlock,
    faqBlock,
    eligibleFunds,
    benefits,
    processSteps,
    faqs
}: GoldenVisaClientProps) {
    const introText = "O Golden Visa é um programa de residência por investimento para não-europeus, que concede autorização de residência em Portugal através de um investimento qualificado. É uma via estratégica para diversificação global e acesso a um mercado promissor.";

    return (
        <>
            <section className="w-full min-h-[70vh] bg-primary text-primary-foreground relative flex items-center justify-center text-center overflow-hidden">
                <ParticlesContainer />
                <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(255,255,255,0.1)_0%,_transparent_70%)]"
                />
                <div className="container relative z-20">
                    <AnimatedSection>
                        <h1 className="font-headline text-4xl md:text-5xl text-primary-foreground uppercase mt-2">
                            {headerBlock?.title || (
                                <>
                                    Golden Visa:
                                    <span className="block">sua porta de entrada para a Europa</span>
                                </>
                            )}
                        </h1>
                    </AnimatedSection>
                </div>
            </section>
            
            <div className="relative z-10 bg-background">
                <section className="bg-background text-foreground relative z-10">
                    <div className="container relative z-10">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <AnimatedSection className="hidden lg:block" direction="left">
                                <Image 
                                    src={"https://ik.imagekit.io/leosmc2zb/VB_blog_golden_visa.jpg"}
                                    alt="Passaporte europeu sobre um mapa"
                                    width={600}
                                    height={400}
                                    className="rounded-lg shadow-xl h-full w-full object-cover"
                                    data-ai-hint="passport map"
                                />
                            </AnimatedSection>
                            <div>
                                <AnimatedSection delay={0.1} direction="right">
                                    <h2 className="font-headline text-3xl md:text-4xl text-primary uppercase">{benefitsBlock?.title || "Benefícios Exclusivos"}</h2>
                                    <p className="mt-4 text-lg text-muted-foreground">{introText}</p>
                                </AnimatedSection>
                                <ul className="mt-6 space-y-3">
                                {benefits.map((benefit, i) => (
                                    <AnimatedSection key={i} delay={0.2 + i * 0.05} direction="up">
                                    <li className="flex items-start">
                                        <Check className="h-5 w-5 text-green-500 mr-3 mt-1 shrink-0" />
                                        <span className="text-muted-foreground">{benefit}</span>
                                    </li>
                                    </AnimatedSection>
                                ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-primary text-primary-foreground relative">
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(255,255,255,0.15)_0%,_transparent_70%)]"
                    />
                    <div className="container">
                        <AnimatedSection>
                        <h3 className="font-headline text-3xl md:text-4xl text-center uppercase text-primary-foreground">{processBlock?.title || "Como obter o Golden Visa?"}</h3>
                         <p className="mt-4 text-lg text-primary-foreground/80 max-w-3xl mx-auto text-center">
                            {processBlock?.content || "O processo para obtenção do Golden Visa através de investimento em fundos do Aquila Fund FCR é estruturado e transparente, garantindo segurança e eficiência:"}
                         </p>
                        </AnimatedSection>
                        <div className="mt-12">
                            <div className="hidden md:grid grid-cols-5">
                                {processSteps.map((step, index) => (
                                    <AnimatedSection key={index} delay={0.1 + index * 0.1} direction="up">
                                    <div className="relative flex flex-col items-center">
                                        <div className={cn("flex flex-col items-center w-full", index % 2 === 0 ? "justify-end" : "justify-start")}>
                                            {index % 2 === 0 && (
                                                <div className="order-1 mb-4">
                                                    <Card className="bg-card/10 border-primary-foreground/20 text-primary-foreground transition-all duration-300 hover:scale-[1.02] hover:shadow-xl w-[220px]">
                                                        <CardHeader className="p-4"><h4 className="font-headline text-lg text-primary-foreground">{step.title}</h4></CardHeader>
                                                        <CardContent className="p-4 pt-0"><p className="text-primary-foreground/80 mt-2 text-sm">{step.description}</p></CardContent>
                                                    </Card>
                                                </div>
                                            )}
                                            <div className="h-10 w-px bg-primary-foreground/30 order-2"></div>
                                            <div className="order-3 relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground ring-4 ring-primary font-bold text-lg shrink-0">{index + 1}</div>
                                            <div className={cn("h-10 w-px bg-primary-foreground/30 order-4", index % 2 !== 0 ? "block" : "hidden")}></div>
                                            {index % 2 !== 0 && (
                                                <div className="order-5 mt-4">
                                                    <Card className="bg-card/10 border-primary-foreground/20 text-primary-foreground transition-all duration-300 hover:scale-[1.02] hover:shadow-xl w-[220px]">
                                                        <CardHeader className="p-4"><h4 className="font-headline text-lg text-primary-foreground">{step.title}</h4></CardHeader>
                                                        <CardContent className="p-4 pt-0"><p className="text-primary-foreground/80 mt-2 text-sm">{step.description}</p></CardContent>
                                                    </Card>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    </AnimatedSection>
                                ))}
                            </div>
                            <div className="md:hidden mt-12 relative flow-root">
                                <div className="absolute left-5 top-2 h-full w-px bg-primary-foreground/20" aria-hidden="true"></div>
                                <div className="space-y-12">
                                    {processSteps.map((step, index) => (
                                        <AnimatedSection key={index} delay={index * 0.1} direction="up">
                                        <div className="relative pl-12">
                                            <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground ring-4 ring-primary font-bold text-lg">{index + 1}</div>
                                            <div className="ml-4">
                                                <h4 className="font-headline text-lg text-primary-foreground">{step.title}</h4>
                                                <p className="text-primary-foreground/80 mt-1 text-sm">{step.description}</p>
                                            </div>
                                        </div>
                                        </AnimatedSection>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-background">
                     <div className="container">
                        <AnimatedSection>
                        <Card className="max-w-4xl mx-auto p-8 md:p-12 shadow-xl bg-card">
                            <div className="text-center">
                                <h2 className="font-headline text-4xl text-primary uppercase">Conquiste o Golden Visa sem desmobilizar seu atual investimento</h2>
                            </div>
                            <div className="grid md:grid-cols-2 gap-8 mt-8 text-center">
                                <div className="flex flex-col items-center">
                                    <BadgeCheck className="h-10 w-10 text-primary" />
                                    <h4 className="font-semibold mt-2">Colateral no Brasil como garantia</h4>
                                </div>
                                <div className="flex flex-col items-center">
                                    <Landmark className="h-10 w-10 text-primary" />
                                    <h4 className="font-semibold mt-2">Financiamento via Luxemburgo a taxas europeias</h4>
                                </div>
                                <div className="flex flex-col items-center">
                                    <Euro className="h-10 w-10 text-primary" />
                                    <h4 className="font-semibold mt-2">Golden Visa com custo zero</h4>
                                </div>
                                <div className="flex flex-col items-center">
                                    <LinkIcon className="h-10 w-10 text-primary" />
                                    <h4 className="font-semibold mt-2">Em parceria com instituições de referência</h4>
                                </div>
                            </div>
                        </Card>
                        </AnimatedSection>
                    </div>
                </section>
                
                <section className="bg-background pt-0">
                    <div className="container">
                        <AnimatedSection className="text-center max-w-3xl mx-auto">
                            <h2 className="font-headline text-4xl text-primary uppercase">{eligibleFundsBlock?.title || "Fundos Elegíveis"}</h2>
                            <p className="mt-4 text-lg text-muted-foreground">{eligibleFundsBlock?.content || "O Aquila Fund FCR oferece fundos de investimento que são elegíveis para o programa Golden Visa, permitindo que você combine seus objetivos financeiros com a obtenção da residência europeia. Nossos fundos elegíveis são:"}</p>
                        </AnimatedSection>
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {eligibleFunds.map((fund, index) => (
                                <AnimatedSection key={fund.slug} delay={0.1 + index * 0.1} direction="up">
                                    <Card className="flex flex-col h-full overflow-hidden">
                                        <CardHeader className="p-0">
                                            {fund.imagemResumo && (
                                                <div className="aspect-video relative">
                                                    <Image
                                                        src={fund.imagemResumo}
                                                        alt={`Imagem do fundo ${fund.nome}`}
                                                        fill
                                                        className="object-cover"
                                                        data-ai-hint="investment theme"
                                                    />
                                                </div>
                                            )}
                                            <div className="p-6">
                                                <CardTitle className="font-headline text-2xl">{fund.nome}</CardTitle>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="flex-grow">
                                            <p className="text-muted-foreground text-sm">{fund.slug === 'aquila-wheels' ? 'Fundo focado em carros clássicos, que oferece não apenas retornos financeiros, mas também a elegibilidade para o Golden Visa.' : 'Fundo de capital de risco que investe no promissor setor hoteleiro português, proporcionando rentabilidade e qualificação para o Golden Visa.'}</p>
                                        </CardContent>
                                        <CardFooter>
                                            <Button asChild variant="secondary" className="w-full"><Link href={`/fundos#${fund.slug}`}>Saber Mais</Link></Button>
                                        </CardFooter>
                                    </Card>
                                </AnimatedSection>
                            ))}
                        </div>
                        <AnimatedSection className="text-center mt-12" direction="up">
                            <Button asChild size="lg"><Link href="/contato">Fale com um especialista</Link></Button>
                        </AnimatedSection>
                    </div>
                </section>

                <section className="bg-card pt-12 pb-20">
                    <div className="container">
                        <AnimatedSection direction="up">
                            <div className="flex items-start gap-4 p-4 mt-12 border border-amber-500/20 rounded-lg bg-amber-500/5 max-w-4xl mx-auto">
                                <ShieldAlert className="h-6 w-6 text-amber-600 shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-semibold text-foreground font-headline">Aviso Legal</h4>
                                    <p className="text-sm text-muted-foreground mt-1">As informações nesta página são para fins informativos e não constituem aconselhamento jurídico ou fiscal. As condições e regulamentos do programa Golden Visa estão sujeitos a alterações pelo governo português. Recomendamos consultar um advogado de imigração para obter aconselhamento específico à sua situação.</p>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </section>
            </div>
        </>
    );
}

    