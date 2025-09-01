import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { TeamSummary } from "@/components/sections/team-summary";

export const metadata = {
  title: "Sobre a Aquila Fund FCR",
  description: "Conheça a história, missão e os parceiros estratégicos da Aquila Fund FCR, sua plataforma de investimentos de valor em Portugal.",
};

export default function SobrePage() {
  return (
    <>
      <PageHeader
        title="Sobre a Aquila Fund FCR"
        subtitle="Construindo um legado de confiança, transparência e excelência."
      />

      <section className="bg-background">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div className="md:col-span-2 prose prose-lg max-w-none text-muted-foreground">
              <p>
                A Aquila Fund FCR nasceu há dois anos com a visão de ser uma plataforma de investimentos diferenciada, focada em oferecer soluções inovadoras para investidores de alta renda. Desde o início, temos nos dedicado a construir um legado de confiança, transparência e excelência no mercado financeiro português.
              </p>
              <p>
                Nossa jornada é marcada pela busca incessante por oportunidades que gerem valor real e sustentável para nossos clientes, sempre com um olhar atento às dinâmicas do mercado global e às necessidades específicas de cada investidor.
              </p>
              <p>
                Nossa missão é guiar nossos clientes através do complexo cenário de investimentos, transformando desafios em oportunidades e aspirações em conquistas. Com uma equipe de especialistas altamente qualificados e uma abordagem personalizada, construímos relacionamentos duradouros baseados na confiança e no compromisso com resultados.
              </p>
            </div>
            <div className="md:col-span-1">
              <Image 
                src="https://picsum.photos/400/500"
                alt="Escritório moderno da Aquila"
                width={400}
                height={500}
                className="rounded-lg object-cover w-full h-full"
                data-ai-hint="modern office interior"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card">
        <div className="container text-center">
            <h2 className="font-headline text-3xl md:text-4xl lg:text-4xl text-primary uppercase">Nossos Parceiros</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                Colaboramos com líderes de mercado para oferecer estrutura, segurança e as melhores oportunidades para nossos investidores.
            </p>
        </div>
        <div className="container mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">FundBox</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none text-muted-foreground">
                    <p>Nossos fundos são geridos pela FundBox, empresa de investimento independente líder em Portugal que gera ativamente cerca de €420 milhões em ativos sob gestão (AUM) através de dois gestores de fundos regulados, especializados em fundos imobiliários, classes de investimento alternativo e investimentos em private equity (FundBox SCR). A FundBox oferece estruturação e execução de transações de primeira classe, livre de qualquer agenda conflitante, e com envolvimento ativo de executivos seniores ao longo de todo o processo de investimento.</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">BTG Pactual</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none text-muted-foreground">
                    <p>Para facilitar ainda mais o seu acesso aos nossos fundos, estabelecemos uma parceria exclusiva com o BTG Pactual. Isso significa que nossos clientes podem investir nos fundos Aquila mantendo seus ativos no Brasil como garantia, sem a necessidade de transferir capital para o exterior. Essa solução é ideal para quem busca diversificação internacional e as oportunidades de crescimento que nossos fundos oferecem, sem desmobilizar seus investimentos atuais no Brasil.</p>
                </CardContent>
            </Card>
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
