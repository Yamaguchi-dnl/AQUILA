import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { TeamSummary } from "@/components/sections/team-summary";
import { AnimatedSection } from "@/components/shared/animated-section";
import { PageHeader } from "@/components/shared/page-header";
import Image from "next/image";

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
      <PageHeader 
        title="Sobre a Aquila Fund FCR"
        subtitle="Construindo um legado de confiança, transparência e excelência."
      />

       <section className="bg-background">
        <div className="container grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
                <div className="space-y-4 text-lg text-muted-foreground">
                    <p>A Aquila Fund FCR nasceu há dois anos com a visão de ser uma <strong>plataforma de investimentos diferenciada</strong>, focada em oferecer <strong>soluções inovadoras para investidores de alta renda</strong>. Desde o início, temos nos dedicado a construir um legado de <strong>confiança, transparência e excelência</strong> no mercado financeiro português.</p>
                    <p>Nossa jornada é marcada pela busca incessante por oportunidades que gerem <strong>valor real e sustentável</strong> para nossos clientes, sempre com um olhar atento às dinâmicas do mercado global e às necessidades específicas de cada investidor.</p>
                    <p>Nossa missão é guiar nossos clientes através do complexo cenário de investimentos, transformando <strong>desafios em oportunidades e aspirações em conquistas</strong>. Com uma equipe de especialistas altamente qualificados e uma abordagem personalizada, construímos <strong>relacionamentos duradouros baseados na confiança e no compromisso com resultados</strong>.</p>
                </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
                 <Image
                    src="https://ik.imagekit.io/leosmc2zb/5573.jpg"
                    alt="Escritório moderno com vista para a cidade"
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg"
                    data-ai-hint="modern office city"
                />
            </AnimatedSection>
        </div>
       </section>

       <section className="bg-card">
        <div className="container">
          <AnimatedSection className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl text-primary uppercase">Nossa História</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                Uma jornada de crescimento e sucesso, marcada pela busca incessante por oportunidades que geram valor real e sustentável para nossos clientes.
            </p>
           </AnimatedSection>
           <div className="max-w-4xl mx-auto">
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
                    <h3 className="text-2xl font-headline card-title">FundBox</h3>
                </CardHeader>
                <CardContent className="prose max-w-none text-muted-foreground flex-grow">
                    <p>Nossos fundos são geridos pela FundBox, empresa de investimento independente líder em Portugal que gera ativamente cerca de €420 milhões em ativos sob gestão. A FundBox oferece estruturação e execução de transações de primeira classe, livre de qualquer agenda conflitante, e com envolvimento ativo de executivos seniores ao longo de todo o processo de investimento.</p>
                </CardContent>
            </Card>
            </AnimatedSection>
             <AnimatedSection delay={0.2}>
             <Card className="flex flex-col h-full hover:border-primary transition-colors">
                <CardHeader>
                    <h3 className="text-2xl font-headline card-title">BTG Pactual</h3>
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
