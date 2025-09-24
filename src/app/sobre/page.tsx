

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { TeamSummary } from "@/components/sections/team-summary";
import Image from "next/image";
import { getPageContentBySlug, findBlock } from '@/lib/data-loader';
import { teamData } from "@/lib/data";
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

export default async function SobrePage() {
  const blocks = await getPageContentBySlug('sobre');
  const heroBlock = findBlock(blocks, 'sobre-hero');
  const partnersBlock = findBlock(blocks, 'sobre-partners');
  const fundboxBlock = findBlock(blocks, 'partner-fundbox');
  const btgBlock = findBlock(blocks, 'partner-btg');

  return (
    <>
       <section className="bg-background pt-32 md:pt-40 relative overflow-hidden">
        <div className="bg-animation z-0 hidden md:block">
            <div id='stars'></div>
            <div id='stars2'></div>
            <div id='stars3'></div>
        </div>
        <div className="container relative z-10">
            <AnimatedSection>
            <div className="text-center">
                <p className="text-sm uppercase tracking-widest text-muted-foreground font-headline">Nossa Essência</p>
                <h1 className="font-headline text-4xl md:text-5xl text-primary uppercase mt-2">{heroBlock?.title || 'Sobre a Aquila Fund FCR'}</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">{heroBlock?.content || 'Construindo um legado de confiança, transparência e excelência.'}</p>
            </div>
            </AnimatedSection>
            <div className="mt-12 grid lg:grid-cols-2 gap-12 items-center">
                <AnimatedSection delay={0.1}>
                    <div 
                    className="space-y-4 text-base text-muted-foreground text-justify prose lg:prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: heroBlock?.sub_content || '' }}
                    />
                </AnimatedSection>
                <AnimatedSection delay={0.2}>
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

      <section className="bg-primary text-primary-foreground rounded-t-3xl relative">
        <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(50,130,250,0.2)_0%,_transparent_70%)]"
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
            <AnimatedSection delay={0.1}>
              <Card className="flex flex-col h-full bg-card/10 border-primary-foreground/20 text-primary-foreground transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                  <CardHeader>
                      <h3 className="text-2xl font-headline card-title text-primary-foreground">{fundboxBlock?.title || 'FundBox'}</h3>
                  </CardHeader>
                  <CardContent className="prose max-w-none text-primary-foreground/80 flex-grow" dangerouslySetInnerHTML={{ __html: fundboxBlock?.content || '' }} />
              </Card>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <Card className="flex flex-col h-full bg-card/10 border-primary-foreground/20 text-primary-foreground transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                  <CardHeader>
                      <h3 className="text-2xl font-headline card-title text-primary-foreground">{btgBlock?.title || 'BTG Pactual'}</h3>
                  </CardHeader>
                  <CardContent className="prose max-w-none text-primary-foreground/80 flex-grow" dangerouslySetInnerHTML={{ __html: btgBlock?.content || ''}} />
              </Card>
            </AnimatedSection>
          </div>
          <div className="container text-center mt-12">
            <AnimatedSection delay={0.3}>
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
