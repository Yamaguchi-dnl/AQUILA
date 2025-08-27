import { PageHeader } from "@/components/shared/page-header";
import { goldenVisaFaqs, fundsData } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FundCard } from "@/components/shared/fund-card";
import { Check, ShieldAlert } from "lucide-react";

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
                title="Golden Visa Portugal"
                subtitle="Seu passaporte para a Europa através de investimentos de valor."
            />
            
            <section className="bg-background">
                <div className="container grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="font-headline text-3xl text-primary">Benefícios de um Futuro Europeu</h2>
                        <p className="mt-4 text-muted-foreground">O programa Golden Visa de Portugal é um dos mais procurados do mundo, oferecendo um caminho claro para a residência e cidadania europeia em troca de um investimento qualificado no país.</p>
                        <ul className="mt-6 space-y-3">
                           {benefits.map((benefit, i) => (
                               <li key={i} className="flex items-start">
                                   <Check className="h-5 w-5 text-green-600 mr-3 mt-1 shrink-0" />
                                   <span>{benefit}</span>
                               </li>
                           ))}
                        </ul>
                    </div>
                    <div className="bg-card p-8 rounded-lg">
                        <h3 className="font-headline text-2xl text-center text-primary">Etapas do Processo</h3>
                         <div className="relative mt-8">
                             {processSteps.map((step, index) => (
                                <div key={index} className="flex items-start mb-8 last:mb-0">
                                    <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg z-10">
                                        {index + 1}
                                    </div>
                                    <div className="ml-6">
                                        <h4 className="font-semibold text-lg text-foreground">{step.title}</h4>
                                        <p className="text-muted-foreground mt-1">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            
            <section className="bg-card">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="font-headline text-3xl md:text-4xl text-primary">Fundos Elegíveis para Golden Visa</h2>
                        <p className="mt-4 text-lg text-muted-foreground">Invista em ativos de alta performance enquanto garante seu futuro na Europa. Conheça nossos fundos qualificados para o programa.</p>
                    </div>
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {eligibleFunds.map(fund => <FundCard key={fund.slug} fund={fund} />)}
                    </div>
                </div>
            </section>

            <section className="bg-background">
                <div className="container max-w-4xl">
                     <div className="text-center">
                        <h2 className="font-headline text-3xl text-primary">Perguntas Frequentes</h2>
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
                             <h4 className="font-semibold text-foreground">Aviso Legal</h4>
                             <p className="text-sm text-muted-foreground mt-1">As informações nesta página são para fins informativos e não constituem aconselhamento jurídico ou fiscal. As condições e regulamentos do programa Golden Visa estão sujeitos a alterações pelo governo português. Recomendamos consultar um advogado de imigração para obter aconselhamento específico à sua situação.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
