import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { AnimatedSection } from '../shared/animated-section';

export function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[650px] flex items-center p-0">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://ik.imagekit.io/leosmc2zb/3493.jpg"
          alt="Paisagem de Portugal"
          data-ai-hint="portugal landscape"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/70 to-transparent"></div>
      </div>
      <div className="relative z-10 container text-primary-foreground">
        <div className='max-w-2xl'>
            <AnimatedSection delay={0.1}>
                <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                    Investimentos <span className="text-highlight">Inteligentes</span> <span className="block">para o seu Futuro</span>
                </h1>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
                <p className="mt-6 text-base text-primary-foreground/80">
                Acesse fundos de investimento portugueses exclusivos com elegibilidade ao Golden Visa. Estratégias comprovadas em mercados especializados com gestão profissional e transparente.
                </p>
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
                <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
                    <Button asChild size="lg" className="w-full sm:w-auto" variant="highlight">
                        <Link href="/contato">Começar Investimento <ArrowRight className="ml-2" /></Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="bg-white/10 border-white/20 backdrop-blur-md text-white hover:bg-white/20 w-full sm:w-auto">
                        <Link href="/#fundos">
                            <PlayCircle className="mr-2" />
                            Ver Apresentação
                        </Link>
                    </Button>
                </div>
            </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
