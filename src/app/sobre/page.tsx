
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { TeamSummary } from "@/components/sections/team-summary";
import { AnimatedSection } from "@/components/shared/animated-section";
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
       <section className="bg-background pt-28 md:pt-32 relative overflow-hidden">
        <div className="bg-animation z-0 hidden md:block">
            <div id='stars'></div>
            <div id='stars2'></div>
            <div id='stars3'></div>
        </div>
        <div className="container relative z-10">
            <AnimatedSection>
                <div className="text-center">
                    <p className="text-sm uppercase tracking-widest text-muted-foreground font-headline">Nossa Essência</p>
                    <h1 className="font-headline text-4xl md:text-5xl text-primary uppercase mt-2">Sobre a Aquila Fund FCR</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">Construindo um legado de confiança, transparência e excelência.</p>
                </div>
            </AnimatedSection>
            <div className="mt-12 grid lg:grid-cols-2 gap-12 items-center">
                <AnimatedSection>
                    <div className="space-y-4 text-base text-muted-foreground text-justify">
                        <p>A Aquila Fund FCR nasceu há dois anos com a visão de ser uma <strong>plataforma de investimentos diferenciada</strong>, focada em oferecer <strong>soluções inovadoras para investidores de alta renda</strong>. Desde o início, temos nos dedicado a construir um legado de <strong>confiança, transparência e excelência</strong> no mercado financeiro português.</p>
                        <p>Nossa jornada é marcada pela busca incessante por oportunidades que gerem <strong>valor real e sustentável</strong> para nossos clientes, sempre com um olhar atento às dinâmicas do mercado global e às necessidades específicas de cada investidor.</p>
                        <p>Nossa missão é guiar nossos clientes através do complexo cenário de investimentos, transformando desafios em oportunidades e aspirações em conquistas. Com uma equipe de especialistas altamente qualificados e uma abordagem personalizada, construímos relacionamentos duradouros baseados na confiança e no compromisso com resultados.</p>
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
        </div>
       </section>

      <section className="bg-primary text-primary-foreground rounded-t-3xl">
        <div className="container text-center">
            <AnimatedSection>
            <h2 className="font-headline text-3xl md:text-4xl uppercase">Nossos Parceiros Estratégicos</h2>
            <p className="mt-4 text-lg text-primary-foreground/80 max-w-3xl mx-auto">
                Colaboramos com líderes de mercado para oferecer estrutura, segurança e as melhores oportunidades para nossos investidores.
            </p>
            </AnimatedSection>
        </div>
        <div className="container mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            <AnimatedSection delay={0.1}>
            <Card className="flex flex-col h-full bg-card/10 border-primary-foreground/20 text-primary-foreground transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                <CardHeader>
                    <h3 className="text-2xl font-headline card-title text-primary-foreground">FundBox</h3>
                </CardHeader>
                <CardContent className="prose max-w-none text-primary-foreground/80 flex-grow">
                    <p>Nossos fundos são geridos pela FundBox, empresa de investimento independente líder em Portugal que gera ativamente cerca de €420 milhões em ativos sob gestão. A FundBox oferece estruturação e execução de transações de primeira classe, livre de qualquer agenda conflitante, e com envolvimento ativo de executivos senhores ao longo de todo o processo de investimento.</p>
                </CardContent>
            </Card>
            </AnimatedSection>
             <AnimatedSection delay={0.2}>
             <Card className="flex flex-col h-full bg-card/10 border-primary-foreground/20 text-primary-foreground transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                <CardHeader>
                    <h3 className="text-2xl font-headline card-title text-primary-foreground">BTG Pactual</h3>
                </CardHeader>
                <CardContent className="prose max-w-none text-primary-foreground/80 flex-grow">
                    <p>Para facilitar o acesso aos nossos fundos, estabelecemos uma parceria exclusiva com o BTG Pactual. Nossos clientes podem investir mantendo seus ativos no Brasil como garantia, sem a necessidade de transferir capital para o exterior, ideal para quem busca diversificação internacional sem desmobilizar seus investimentos atuais.</p>
                </CardContent>
            </Card>
            </AnimatedSection>
        </div>
        <div className="container text-center mt-12">
             <Button asChild size="lg" variant="secondary">
                <Link href="/contato">Fale com um especialista</Link>
            </Button>
        </div>
      </section>

      <TeamSummary />
    </>
  );
}
