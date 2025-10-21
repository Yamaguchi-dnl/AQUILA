

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { TeamSummary } from "@/components/sections/team-summary";
import Image from "next/image";
import { teamData } from "@/lib/data";
import { AnimatedSection } from "@/components/shared/animated-section";
import ParticlesContainer from "@/components/shared/particles-container";

export const metadata = {
  title: "Sobre o Aquila Fund FCR",
  description: "Conheça a história, missão e os parceiros estratégicos do Aquila Fund FCR, sua plataforma de investimentos de valor em Portugal.",
};

export default async function SobrePage() {
  const heroBlock = null;
  const partnersBlock = null;
  const fundboxBlock = null;
  const btgBlock = null;

  const heroSubContent = `
    <p>O Aquila Fund FCR nasceu há dois anos com a visão de ser uma plataforma de investimentos diferenciada, focada em oferecer soluções inovadoras para investidores de alta renda. Desde o início, temos nos dedicado a construir um legado de confiança, transparência e excelência no mercado financeiro português.</p>
    <p>Nossa jornada é marcada pela busca incessante por oportunidades que gerem valor real e sustentável para nossos clientes, sempre com um olhar atento às dinâmicas do mercado global e às necessidades específicas de cada investidor.</p>
    <p>Nossa missão é guiar nossos clientes através do complexo cenário de investimentos, transformando desafios em oportunidades e aspirações em conquistas. Com uma equipe de especialistas altamente qualificados e uma abordagem personalizada, construímos relacionamentos duradouros baseados na confiança e no compromisso com resultados.</p>
  `;

  const fundboxContent = `
    <p>Nossos fundos são geridos pela FundBox, empresa de investimento independente líder em Portugal que gera ativamente cerca de €420 milhões em ativos sob gestão (AUM) através de dois gestores de fundos regulados, especializados em fundos imobiliários, classes de investimento alternativo e investimentos em private equity (FundBox SCR).</p>
    <p>A FundBox oferece estruturação e execução de transações de primeira classe, livre de qualquer agenda conflitante, e com envolvimento ativo de executivos seniores ao longo de todo o processo de investimento.</p>
  `;

  const btgContent = `
    <p>Para facilitar ainda mais o seu acesso aos nossos fundos, estabelecemos uma parceria exclusiva com o BTG Pactual. Isso significa que nossos clientes podem investir nos fundos Aquila mantendo seus ativos no Brasil como garantia, sem a necessidade de transferir capital para o exterior.</p>
    <p>Essa solução é ideal para quem busca diversificação internacional e as oportunidades de crescimento que nossos fundos oferecem, sem desmobilizar seus investimentos atuais no Brasil.</p>
  `;

  return (
    <>
       <section className="w-full h-[60vh] bg-primary text-primary-foreground relative flex items-center justify-center text-center overflow-hidden">
             <ParticlesContainer />
             <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(255,255,255,0.1)_0%,_transparent_70%)]"
            />
            <div className="container relative z-20">
                <AnimatedSection>
                    <p className="text-sm uppercase tracking-widest text-primary-foreground/80 font-headline">Nossa Essência</p>
                    <h1 className="font-headline text-4xl md:text-5xl text-primary-foreground uppercase mt-2">{heroBlock?.title || 'Sobre o Aquila Fund FCR'}</h1>
                </AnimatedSection>
            </div>
        </section>

       <section className="bg-background text-foreground relative">
        <div className="container relative z-10">
            <div className="mt-12 grid lg:grid-cols-2 gap-12 items-center">
                <AnimatedSection delay={0.1} direction="left">
                    <div 
                    className="space-y-4 text-base text-muted-foreground text-justify prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: heroBlock?.sub_content || heroSubContent }}
                    />
                </AnimatedSection>
                <AnimatedSection delay={0.2} direction="right">
                <Image
                    src={heroBlock?.image_url || "https://ik.imagekit.io/leosmc2zb/5573.jpg"}
                    alt="Escritório moderno com vista para a cidade"
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg"
                    data-ai-hint="modern office city"
                />
                </AnimatedSection>
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
            <div className="text-center">
              <h2 className="font-headline text-4xl uppercase">{partnersBlock?.title || 'Nossos Parceiros Estratégicos'}</h2>
              <p className="mt-4 text-lg text-primary-foreground/80 max-w-3xl mx-auto">
                  {partnersBlock?.content || 'Colaboramos com líderes de mercado para oferecer estrutura, segurança e as melhores oportunidades para nossos investidores.'}
              </p>
            </div>
            </AnimatedSection>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            <AnimatedSection delay={0.1} direction="up">
              <Card className="flex flex-col h-full bg-card/10 border-primary-foreground/20 text-primary-foreground">
                  <CardHeader>
                      <h3 className="text-2xl font-headline card-title text-primary-foreground">{fundboxBlock?.title || 'FundBox'}</h3>
                  </CardHeader>
                  <CardContent className="prose max-w-none text-primary-foreground/80 flex-grow" dangerouslySetInnerHTML={{ __html: fundboxBlock?.content || fundboxContent }} />
              </Card>
            </AnimatedSection>
            <AnimatedSection delay={0.2} direction="up">
              <Card className="flex flex-col h-full bg-card/10 border-primary-foreground/20 text-primary-foreground">
                  <CardHeader>
                      <h3 className="text-2xl font-headline card-title text-primary-foreground">{btgBlock?.title || 'BTG Pactual'}</h3>
                  </CardHeader>
                  <CardContent className="prose max-w-none text-primary-foreground/80 flex-grow" dangerouslySetInnerHTML={{ __html: btgBlock?.content || btgContent}} />
              </Card>
            </AnimatedSection>
          </div>
          <div className="container text-center mt-12">
            <AnimatedSection delay={0.3} direction="up">
              <Button asChild size="lg" variant="secondary">
                  <Link href="/contato">Fale com um especialista</Link>
              </Button>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <TeamSummary team={teamData} />
    </>
  );
}
