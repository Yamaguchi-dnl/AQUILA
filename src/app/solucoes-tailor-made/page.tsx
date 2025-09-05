import { PageHeader } from "@/components/shared/page-header";
import { AnimatedSection } from "@/components/shared/animated-section";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Soluções Tailor Made",
  description: "Conectamos investidores a ativos únicos em Portugal, com soluções de investimento personalizadas para o seu perfil e objetivos.",
};

const benefits = [
    "Aproveitar ativos exclusivos, fora do alcance do investidor tradicional.",
    "Moldar sua estratégia de acordo com sua realidade.",
    "Garantir que seu patrimônio esteja em sintonia com seus objetivos de longo prazo.",
    "Acessar investimentos sólidos no mercado europeu, com benefícios únicos."
]

export default function SolucoesTailorMadePage() {
  return (
    <>
      <PageHeader
        pretitle="INVESTIMENTOS PERSONALIZADOS"
        title="Soluções Tailor Made"
        subtitle="No mercado de investimentos, opções não faltam. Mas quando se trata de potencializar retornos com inteligência e exclusividade, é preciso ir além do comum."
      />
      <section className="bg-background pt-16 md:pt-24">
        <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <AnimatedSection>
                    <Image
                        src="https://ik.imagekit.io/leosmc2zb/3550%20(1).jpg?updatedAt=1756312096783"
                        alt="Homem de fato a analisar um gráfico"
                        width={600}
                        height={700}
                        className="rounded-lg shadow-lg h-[500px] object-cover"
                        data-ai-hint="businessman looking chart"
                    />
                </AnimatedSection>
                <AnimatedSection delay={0.1}>
                    <h2 className="font-headline text-3xl text-primary uppercase">Conexões de Valor para Investidores Únicos</h2>
                    <p className="mt-4 text-muted-foreground text-lg">
                        A Aquila Fund FCR conecta investidores a ativos únicos em Portugal, cuidadosamente selecionados e organizados em estruturas que respeitam seu perfil, seus objetivos e o cenário de mercado.
                    </p>
                    <div className="mt-8 space-y-4">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <CheckCircle2 className="h-6 w-6 text-primary mt-1 shrink-0" />
                                <span className="text-muted-foreground text-base">{benefit}</span>
                            </div>
                        ))}
                    </div>
                     <p className="mt-8 text-muted-foreground text-lg">
                        Não se trata apenas de investir, mas de construir uma experiência personalizada, que coloca você no centro das decisões.
                    </p>
                    <Button asChild size="lg" className="mt-8">
                        <Link href="/contato">
                            Encontre o ativo perfeito para investir
                            <ArrowRight className="ml-2" />
                        </Link>
                    </Button>
                </AnimatedSection>
            </div>
        </div>
      </section>
    </>
  );
}
