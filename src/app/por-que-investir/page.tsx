
import { AnimatedSection } from "@/components/shared/animated-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ParticlesContainer from "@/components/shared/particles-container";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Por que investir em Portugal?",
  description: "Descubra as vantagens de investir em Portugal: diversificação, segurança, e um caminho para a cidadania europeia.",
};

const risks = [
    "Patrimônio exposto aos riscos econômicos e jurídicos do Brasil;",
    "Falta de liquidez e acesso a mercados internacionais;",
    "Carga fiscal pesada e imprevisível;",
    "Custos sucessórios elevados;",
    "Risco pessoal para empresários devido à legislação trabalhista;",
    "Proteção patrimonial inadequada.",
];

const taxBenefits = [
    "Isenção de impostos sobre ganhos de capital para não residentes fiscais;",
    "Isenção de impostos sobre remessas internacionais;",
    "Sem retenção na fonte para rendimentos enviados a outros países;",
    "Isenção sobre renda global obtida fora de Portugal;",
    "Possibilidade de redução de impostos por até 10 anos para quem adere ao regime de Residente Não Habitual (NHR).",
]

const inheritanceBenefits = [
    "Heranças entre pais e filhos são isentas de tributação;",
    "Doações entre descendentes diretos não sofrem cobrança de imposto;",
    "Estrutura legal que permite planejamento sucessório eficiente e previsível, sem custos excessivos.",
]

export default function PorQueInvestirPage() {
    const title = 'Por que o Aquila é essencial para você?';
    const subtitle = 'Já pensou em como seu patrimônio está exposto no Brasil?';

  return (
    <>
       <section className="w-full h-[70vh] bg-primary text-primary-foreground relative flex items-center justify-center text-center overflow-hidden">
             <ParticlesContainer />
             <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(255,255,255,0.1)_0%,_transparent_70%)]"
            />
            <div className="container relative z-20">
                <AnimatedSection>
                    <h1 className="font-headline text-4xl md:text-5xl text-primary-foreground uppercase mt-2">{title}</h1>
                    <p className="mt-4 text-lg text-primary-foreground/90 max-w-3xl mx-auto">{subtitle}</p>
                </AnimatedSection>
            </div>
        </section>
      
        <section className="bg-background text-foreground relative">
            <div className="container">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <AnimatedSection direction="left">
                        <h2 className="font-headline text-3xl md:text-4xl text-primary uppercase">A proteção que seu patrimônio merece</h2>
                        <div className="mt-6 space-y-4 text-muted-foreground prose prose-lg max-w-none">
                            <p>A alta carga tributária, as mudanças constantes nas regras fiscais e até um simples processo trabalhista podem colocar seu patrimônio em risco.</p>
                            <p>Por isso, cada vez mais investidores estão buscando alternativas fora do país — não apenas para diversificar, mas para proteger e planejar o futuro do seu patrimônio com segurança e estabilidade.</p>
                        </div>
                    </AnimatedSection>
                    <AnimatedSection direction="right" delay={0.1}>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <ShieldAlert className="h-6 w-6 text-destructive" />
                                    Riscos de não diversificar
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    {risks.map((risk, index) => (
                                        <li key={index} className="flex items-start">
                                            <ShieldAlert className="h-5 w-5 text-destructive mr-3 mt-1 shrink-0" />
                                            <span className="text-muted-foreground">{risk}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </AnimatedSection>
                </div>
            </div>
        </section>
        <section className="bg-primary text-primary-foreground relative">
             <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(255,255,255,0.15)_0%,_transparent_70%)]"
            />
            <div className="container relative z-10">
                <AnimatedSection className="max-w-4xl mx-auto text-center">
                    <h2 className="font-headline text-3xl md:text-4xl text-primary-foreground uppercase">Quais os benefícios de investir em Portugal?</h2>
                    <p className="mt-4 text-lg text-primary-foreground/80">Investir em Portugal é uma forma inteligente de otimizar seus rendimentos e proteger o patrimônio familiar. O país oferece um ambiente econômico estável, com uma das legislações fiscais mais atrativas da Europa para investidores estrangeiros.</p>
                </AnimatedSection>

                <div className="mt-12 grid md:grid-cols-2 gap-8 items-start">
                    <AnimatedSection direction="up" delay={0.1}>
                         <Card className="h-full bg-card/10 border-primary-foreground/20 text-primary-foreground">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-primary-foreground">
                                    <ShieldCheck className="h-6 w-6 text-green-500" />
                                    Tributação dos Fundos
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    {taxBenefits.map((item, index) => (
                                        <li key={index} className="flex items-start">
                                            <ShieldCheck className="h-5 w-5 text-green-500 mr-3 mt-1 shrink-0" />
                                            <span className="text-primary-foreground/80">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </AnimatedSection>
                     <AnimatedSection direction="up" delay={0.2}>
                         <Card className="h-full bg-card/10 border-primary-foreground/20 text-primary-foreground">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-primary-foreground">
                                    <ShieldCheck className="h-6 w-6 text-green-500" />
                                    Imposto sobre Herança e Doação
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    {inheritanceBenefits.map((item, index) => (
                                        <li key={index} className="flex items-start">
                                            <ShieldCheck className="h-5 w-5 text-green-500 mr-3 mt-1 shrink-0" />
                                            <span className="text-primary-foreground/80">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    </>
  );
}
