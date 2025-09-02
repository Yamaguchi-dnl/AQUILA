import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { AnimatedSection } from '../shared/animated-section';
import Image from 'next/image';

export function Hero() {
  return (
    <section className="w-full bg-card z-10 pt-40 pb-16 md:py-20">
      <div className="container z-10 grid md:grid-cols-2 gap-8 items-center">
        <div className="max-w-2xl order-last md:order-first">
            <AnimatedSection delay={0.1}>
                <h1 className="font-headline text-3xl sm:text-4xl lg:text-5xl xl:text-6xl tracking-tight text-foreground uppercase">
                    Investimentos <span className="text-primary">Inteligentes</span> <span className="block">para o seu Futuro</span>
                </h1>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
                <p className="mt-6 text-lg text-muted-foreground">
                Acesse fundos de investimento portugueses exclusivos com elegibilidade ao Golden Visa. Estratégias comprovadas em mercados especializados com gestão profissional e transparente.
                </p>
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
                <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
                    <Button asChild size="lg" className="w-full sm:w-auto">
                        <Link href="/contato">Começar Investimento <ArrowRight className="ml-2" /></Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                        <Link href="/#fundos">
                            <PlayCircle className="mr-2" />
                            Ver Apresentação
                        </Link>
                    </Button>
                </div>
            </AnimatedSection>
        </div>
        <div className="order-first md:order-last flex justify-center">
          <AnimatedSection delay={0.2} className="hidden lg:block">
            <div className="relative h-[450px] w-[360px]">
                <Image 
                    src="https://ik.imagekit.io/leosmc2zb/3493.jpg?updatedAt=1756315204824"
                    alt="Paisagem de Lisboa, Portugal"
                    width={360}
                    height={450}
                    className="rounded-3xl object-cover h-full w-full relative z-10"
                    data-ai-hint="lisbon portugal"
                    priority
                />
                <AnimatedSection delay={0.4}>
                    <Image 
                        src="https://picsum.photos/180/160"
                        alt="Detalhe de investimento 1"
                        width={180}
                        height={160}
                        className="absolute -top-4 -left-16 rounded-2xl shadow-2xl object-cover z-30"
                        data-ai-hint="investment detail"
                    />
                </AnimatedSection>
                <AnimatedSection delay={0.6}>
                    <Image 
                        src="https://picsum.photos/180/160?grayscale"
                        alt="Detalhe de investimento 2"
                        width={180}
                        height={160}
                        className="absolute -bottom-4 -right-16 rounded-2xl shadow-2xl object-cover z-20"
                        data-ai-hint="investment chart"
                    />
                </AnimatedSection>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
