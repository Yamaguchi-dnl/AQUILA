
import { PageHeader } from "@/components/shared/page-header";
import { AnimatedSection } from "@/components/shared/animated-section";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { getPageContentBySlug, findBlock } from "@/lib/data-loader";

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

export default async function SolucoesTailorMadePage() {
  const blocks = await getPageContentBySlug('solucoes-tailor-made');
  const headerBlock = findBlock(blocks, 'solucoes-header');
  const contentBlock = findBlock(blocks, 'solucoes-content');

  return (
    <>
      <PageHeader
        pretitle="INVESTIMENTOS PERSONALIZADOS"
        title={headerBlock?.title || "Soluções Tailor Made"}
        subtitle={headerBlock?.content || "No mercado de investimentos, opções não faltam. Mas quando se trata de potencializar retornos com inteligência e exclusividade, é preciso ir além do comum."}
      />
      <section className="bg-primary text-primary-foreground pt-16 md:pt-24 rounded-t-3xl relative z-10 -mt-16">
        <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(50,130,250,0.2)_0%,_transparent_70%)]"
        />
        <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <AnimatedSection>
                    <Image
                        src={contentBlock?.image_url || "https://ik.imagekit.io/leosmc2zb/6109119.jpg"}
                        alt="Homem de fato a analisar um gráfico"
                        width={600}
                        height={700}
                        className="rounded-lg shadow-lg h-[500px] object-cover"
                        data-ai-hint="businessman looking chart"
                    />
                </AnimatedSection>
                <AnimatedSection delay={0.1}>
                    <h2 className="font-headline text-3xl text-primary-foreground uppercase">{contentBlock?.title || "Conexões de Valor para Investidores Únicos"}</h2>
                    <p className="mt-4 text-primary-foreground/80 text-lg">
                        {contentBlock?.content || 'A Aquila Fund FCR conecta investidores a ativos únicos em Portugal, cuidadosamente selecionados e organizados em estruturas que respeitam seu perfil, seus objetivos e o cenário de mercado.'}
                    </p>
                    <div className="mt-8 space-y-4">
                        {benefits.map((benefit, index) => (
                           <AnimatedSection key={index} delay={0.2 + index * 0.05}>
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="h-6 w-6 text-primary-foreground/80 mt-1 shrink-0" />
                                <span className="text-primary-foreground/90 text-base">{benefit}</span>
                            </div>
                            </AnimatedSection>
                        ))}
                    </div>
                     <AnimatedSection delay={0.4}>
                     <div 
                        className="mt-8 text-primary-foreground/80 text-lg prose prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: contentBlock?.sub_content || '<p>Não se trata apenas de investir, mas de construir uma experiência personalizada, que coloca você no centro das decisões.</p>' }} 
                     />
                    </AnimatedSection>
                    <AnimatedSection delay={0.5}>
                    <Button asChild size="lg" className="mt-8" variant="secondary">
                        <Link href="/contato">
                            Encontre o ativo perfeito para investir
                            <ArrowRight className="ml-2" />
                        </Link>
                    </Button>
                    </AnimatedSection>
                </AnimatedSection>
            </div>
        </div>
      </section>
    </>
  );
}
