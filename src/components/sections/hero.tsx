import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { AnimatedSection } from '../shared/animated-section';
import Image from 'next/image';

export function Hero() {
  return (
    <section className="w-full bg-card pt-32 pb-24 z-10">
      <div className="container z-10 grid md:grid-cols-2 gap-8 items-center">
        <div className='max-w-2xl'>
            <AnimatedSection delay={0.1}>
                <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground">
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
        <AnimatedSection delay={0.2}>
          <div className="hidden md:block">
            <Image 
              src="https://ik.imagekit.io/leosmc2zb/AQUILA%20FOUND%20HERO(1).png"
              alt="Imagem da Hero Section Aquila"
              width={600}
              height={600}
              className="rounded-lg object-cover"
              data-ai-hint="abstract investment growth"
            />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
