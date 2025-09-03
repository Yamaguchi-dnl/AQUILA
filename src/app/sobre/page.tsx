

import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { TeamSummary } from "@/components/sections/team-summary";
import { Target, TrendingUp, Handshake, Users } from "lucide-react";
import { AnimatedSection } from "@/components/shared/animated-section";

export const metadata = {
  title: "Sobre a Aquila Fund FCR",
  description: "Conheça a história, missão e os parceiros estratégicos da Aquila Fund FCR, sua plataforma de investimentos de valor em Portugal.",
};

const historyItems = [
    { year: "2022", event: "Fundação da Aquila Fund FCR com a visão de criar uma plataforma de investimentos inovadora." },
    { year: "2023", event: "Lançamento dos fundos pioneiros, Aquila Wheels e Aquila Hotel Invest, ambos elegíveis para o Golden Visa." },
    { year: "2024", event: "Expansão do portfólio com o Aquila Real Estate e consolidação de parcerias estratégicas com líderes de mercado." },
    { year: "Futuro", event: "Continuar a crescer, inovar e gerar valor sustentável para nossos investidores, com novos fundos como o Aquila Agro." },
];

export default function SobrePage() {
  return (
    <>
      <section className="bg-primary text-primary-foreground pt-16">
        <div className="container">
          <div className="text-center mb-16 pt-16">
            <h1 className="font-headline text-4xl md:text-5xl text-primary-foreground uppercase">
              Sobre a Aquila Fund FCR
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-foreground/80">
              Construindo um legado de confiança, transparência e excelência.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <Image 
                src="https://picsum.photos/600/600"
                alt="Escritório moderno da Aquila com vista para a cidade"
                width={600}
                height={600}
                className="rounded-xl object-cover w-full h-full shadow-lg"
                data-ai-hint="modern office city view"
              />
            </AnimatedSection>
            <div className="space-y-8">
               <AnimatedSection delay={0.1}>
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 bg-primary-foreground/10 text-primary-foreground rounded-lg p-3">
                           <Target className="h-6 w-6" />
                        </div>
                        <div>
                           <h3 className="text-xl font-headline font-bold text-primary-foreground">Nossa Missão</h3>
                           <p className="mt-2 text-primary-foreground/80">
                            Guiar nossos clientes através do complexo cenário de investimentos, transformando desafios em oportunidades e aspirações em conquistas, com segurança e rentabilidade.
                           </p>
                        </div>
                    </div>
               </AnimatedSection>
               <AnimatedSection delay={0.2}>
                   <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 bg-primary-foreground/10 text-primary-foreground rounded-lg p-3">
                           <TrendingUp className="h-6 w-6" />
                        </div>
                        <div>
                           <h3 className="text-xl font-headline font-bold text-primary-foreground">Nossa Visão</h3>
                            <p className="mt-2 text-primary-foreground/80">
                            Ser a plataforma de investimentos de referência em Portugal, reconhecida pela inovação, transparência e pela criação de valor sustentável para investidores de alta renda.
                           </p>
                        </div>
                    </div>
               </AnimatedSection>
                 <AnimatedSection delay={0.3}>
                   <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 bg-primary-foreground/10 text-primary-foreground rounded-lg p-3">
                           <Handshake className="h-6 w-6" />
                        </div>
                        <div>
                           <h3 className="text-xl font-headline font-bold text-primary-foreground">Nossos Valores</h3>
                            <p className="mt-2 text-primary-foreground/80">
                            Confiança, Excelência, Inovação e um profundo compromisso com os resultados e a satisfação de nossos clientes e parceiros.
                           </p>
                        </div>
                    </div>
               </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

       <section className="bg-card">
        <div className="container">
           <AnimatedSection className="text-center">
            <h2 className="font-headline text-3xl md:text-4xl text-primary uppercase">Nossa História</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                Uma jornada de crescimento e sucesso, marcada pela busca incessante por oportunidades que geram valor real e sustentável para nossos clientes.
            </p>
           </AnimatedSection>
           <div className="mt-12 max-w-4xl mx-auto">
             <div className="relative">
                {/* The vertical line */}
                <div className="absolute left-[34px] top-4 h-full w-0.5 bg-border -translate-x-1/2" aria-hidden="true"></div>
                
                <div className="space-y-8">
                    {historyItems.map((item, index) => (
                        <AnimatedSection key={index} delay={index * 0.1}>
                        <div className="relative flex items-start gap-8">
                            <div className="flex-shrink-0 flex items-center justify-center rounded-md bg-primary text-primary-foreground ring-8 ring-card font-bold text-lg px-3 h-9 z-10">
                                {item.year}
                            </div>
                            <div>
                                <p className="text-muted-foreground text-base">{item.event}</p>
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
        <div className="container text-center">
            <AnimatedSection>
            <h2 className="font-headline text-3xl md:text-4xl text-primary uppercase">Nossos Parceiros Estratégicos</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                Colaboramos com líderes de mercado para oferecer estrutura, segurança e as melhores oportunidades para nossos investidores.
            </p>
            </AnimatedSection>
        </div>
        <div className="container mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            <AnimatedSection delay={0.1}>
            <Card className="flex flex-col h-full hover:border-primary transition-colors">
                <CardHeader>
                    <CardTitle className="text-2xl font-headline">FundBox</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none text-muted-foreground flex-grow">
                    <p>Nossos fundos são geridos pela FundBox, empresa de investimento independente líder em Portugal que gera ativamente cerca de €420 milhões em ativos sob gestão. A FundBox oferece estruturação e execução de transações de primeira classe, livre de qualquer agenda conflitante, e com envolvimento ativo de executivos seniores ao longo de todo o processo de investimento.</p>
                </CardContent>
            </Card>
            </AnimatedSection>
             <AnimatedSection delay={0.2}>
             <Card className="flex flex-col h-full hover:border-primary transition-colors">
                <CardHeader>
                    <CardTitle className="text-2xl font-headline">BTG Pactual</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none text-muted-foreground flex-grow">
                    <p>Para facilitar o acesso aos nossos fundos, estabelecemos uma parceria exclusiva com o BTG Pactual. Nossos clientes podem investir mantendo seus ativos no Brasil como garantia, sem a necessidade de transferir capital para o exterior, ideal para quem busca diversificação internacional sem desmobilizar seus investimentos atuais.</p>
                </CardContent>
            </Card>
            </AnimatedSection>
        </div>
        <div className="container text-center mt-12">
             <Button asChild size="lg">
                <Link href="/contato">Fale com um especialista</Link>
            </Button>
        </div>
      </section>

      <TeamSummary />
    </>
  );
}
