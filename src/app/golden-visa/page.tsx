
import { PageHeader } from "@/components/shared/page-header";
import { goldenVisaFaqs, fundsData } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FundCard } from "@/components/shared/fund-card";
import { Check, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Golden Visa Portugal",
  description: "Descubra como obter residência europeia através do programa Golden Visa de Portugal, investindo em nossos fundos elegíveis.",
};

const benefits = [
    "Direito de viver, trabalhar e estudar em Portugal",
    "Livre circulação no Espaço Schengen (27 países europeus)",
    "Reagrupamento familiar, estendendo os benefícios ao cônjuge, filhos e pais",
    "Acesso a sistemas de saúde e educação de alta qualidade",
    "Requisito de permanência mínima flexível (média de 7 dias por ano)",
    "Caminho para a cidadania portuguesa e passaporte europeu após 5 anos",
];

const processSteps = [
    { title: "Consulta Inicial", description: "Fale com nossos especialistas para avaliar seu perfil e objetivos." },
    { title: "Escolha do Fundo", description: "Selecione um de nossos fundos elegíveis, como o Aquila Wheels ou Hotel Invest." },
    { title: "Processo de Investimento", description: "Realize o investimento e obtenha a declaração necessária do gestor do fundo." },
    { title: "Aplicação ao Golden Visa", description: "Com o suporte de advogados parceiros, submeta sua aplicação online ao AIMA." },
    { title: "Biometria e Emissão", description: "Agende e compareça à sua entrevista biométrica para finalizar o processo e receber seu cartão de residência." },
];

export default function GoldenVisaPage() {
    const eligibleFunds = fundsData.filter(f => f.detalhes.elegibilidadeGoldenVisa);

    return (
        <>
            <PageHeader
                pretitle="O seu caminho para a Europa"
                title="Golden Visa Portugal"
                subtitle="Seu passaporte para a Europa através de investimentos de valor."
            />
            
            <section className="bg-primary text-primary-foreground rounded-t-3xl">
                <div className="container">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="font-headline text-3xl md:text-4xl text-primary-foreground uppercase">Benefícios de um Futuro Europeu</h2>
                        <p className="mt-4 text-primary-foreground/80 max-w-4xl">O programa Golden Visa de Portugal é um dos mais procurados do mundo, oferecendo um caminho claro para a residência e cidadania europeia em troca de um investimento qualificado no país.</p>
                        <ul className="mt-6 space-y-3 columns-1 md:columns-2 gap-x-8">
                           {benefits.map((benefit, i) => (
                               <li key={i} className="flex items-start mb-3 break-inside-avoid">
                                   <Check className="h-5 w-5 text-green-400 mr-3 mt-1 shrink-0" />
                                   <span className="text-primary-foreground/90">{benefit}</span>
                               </li>
                           ))}
                        </ul>
                    </div>
                </div>
            </section>

             <section className="bg-primary text-primary-foreground pt-0 pb-16 md:pb-24 lg:pb-28">
                <div className="container">
                     <h3 className="font-headline text-3xl md:text-4xl text-center uppercase text-primary-foreground">Etapas do Processo</h3>
                     <div className="mt-12">
                        {/* --- Desktop Timeline --- */}
                        <div className="hidden md:grid grid-cols-5">
                            {processSteps.map((step, index) => (
                                <div key={index} className="relative flex flex-col items-center">
                                    {/* Horizontal Line Segment - REMOVED */}
                                    
                                    {/* Vertical Connector and Card */}
                                    <div className={cn(
                                        "flex flex-col items-center w-full",
                                        index % 2 === 0 ? "justify-end" : "justify-start"
                                    )}>
                                        {/* Card for odd items (top) */}
                                        {index % 2 === 0 && (
                                            <div className="order-1 mb-4">
                                                <Card className="bg-card/10 border-primary-foreground/20 text-primary-foreground transition-all duration-300 hover:scale-[1.02] hover:shadow-xl w-[220px]">
                                                    <CardHeader className="p-4">
                                                        <h4 className="font-headline text-lg text-primary-foreground">{step.title}</h4>
                                                    </CardHeader>
                                                    <CardContent className="p-4 pt-0">
                                                        <p className="text-primary-foreground/80 mt-2 text-sm">{step.description}</p>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        )}

                                        {/* Vertical line */}
                                        <div className="h-10 w-px bg-primary-foreground/30 order-2"></div>

                                        {/* Circle */}
                                        <div className="order-3 relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground ring-4 ring-primary font-bold text-lg shrink-0">
                                            {index + 1}
                                        </div>

                                        {/* Vertical line for even items */}
                                        <div className={cn(
                                            "h-10 w-px bg-primary-foreground/30 order-4",
                                            index % 2 !== 0 ? "block" : "hidden"
                                        )}></div>

                                         {/* Card for even items (bottom) */}
                                        {index % 2 !== 0 && (
                                            <div className="order-5 mt-4">
                                                <Card className="bg-card/10 border-primary-foreground/20 text-primary-foreground transition-all duration-300 hover:scale-[1.02] hover:shadow-xl w-[220px]">
                                                    <CardHeader className="p-4">
                                                        <h4 className="font-headline text-lg text-primary-foreground">{step.title}</h4>
                                                    </CardHeader>
                                                    <CardContent className="p-4 pt-0">
                                                        <p className="text-primary-foreground/80 mt-2 text-sm">{step.description}</p>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* --- Mobile Timeline --- */}
                        <div className="md:hidden mt-12 relative flow-root">
                             <div className="absolute left-5 top-2 h-full w-px bg-primary-foreground/20" aria-hidden="true"></div>
                             <div className="space-y-12">
                                {processSteps.map((step, index) => (
                                    <div key={index} className="relative pl-12">
                                        <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground ring-4 ring-primary font-bold text-lg">
                                            {index + 1}
                                        </div>
                                        <div className="ml-4">
                                            <h4 className="font-headline text-lg text-primary-foreground">{step.title}</h4>
                                            <p className="text-primary-foreground/80 mt-1 text-sm">{step.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                     </div>
                </div>
            </section>
            
            <section className="bg-background">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="font-headline text-4xl text-primary uppercase">Fundos Elegíveis para Golden Visa</h2>
                        <p className="mt-4 text-lg text-muted-foreground">Invista em ativos de alta performance enquanto garante seu futuro na Europa. Conheça nossos fundos qualificados para o programa.</p>
                    </div>
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {eligibleFunds.map(fund => <FundCard key={fund.slug} fund={fund} />)}
                    </div>
                </div>
            </section>

            <section className="bg-card">
                <div className="container max-w-4xl">
                     <div className="text-center">
                        <h2 className="font-headline text-4xl text-primary uppercase">Perguntas Frequentes</h2>
                    </div>
                    <Accordion type="single" collapsible className="w-full mt-8">
                        {goldenVisaFaqs.map((faq, i) => (
                             <AccordionItem value={`item-${i}`} key={i}>
                                <AccordionTrigger className="text-lg text-left">{faq.question}</AccordionTrigger>
                                <AccordionContent className="text-base text-muted-foreground">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                     <div className="text-center mt-12">
                        <Button asChild size="lg"><Link href="/contato">Fale com um especialista</Link></Button>
                    </div>
                </div>
            </section>
             
            <section className="py-8 bg-muted/50">
                <div className="container">
                     <div className="flex items-start gap-4 p-4 border border-border rounded-lg bg-card">
                        <ShieldAlert className="h-6 w-6 text-amber-600 shrink-0 mt-1" />
                        <div>
                             <h4 className="font-semibold text-foreground font-headline">Aviso Legal</h4>
                             <p className="text-sm text-muted-foreground mt-1">As informações nesta página são para fins informativos e não constituem aconselhamento jurídico ou fiscal. As condições e regulamentos do programa Golden Visa estão sujeitos a alterações pelo governo português. Recomendamos consultar um advogado de imigração para obter aconselhamento específico à sua situação.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
