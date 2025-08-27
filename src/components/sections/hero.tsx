import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, PlayCircle } from 'lucide-react';

const stats = [
    { value: '€420M', label: 'Ativos sob gestão' },
    { value: '4', label: 'Fundos especializados' },
    { value: '12%', label: 'Retorno médio anual' },
]

export function Hero() {
  return (
    <section className="relative w-full h-[100vh] min-h-[700px] flex items-center p-0">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://picsum.photos/1920/1080?blur=5"
          alt="Paisagem da costa portuguesa"
          data-ai-hint="portugal coastline cliff"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/80"></div>
      </div>
      <div className="relative z-10 container text-primary-foreground">
        <div className='max-w-2xl'>
            <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight">
                Investimentos <span className="text-highlight">Inteligentes</span> para o seu Futuro
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/80">
              Acesse fundos de investimento portugueses exclusivos com elegibilidade ao Golden Visa. Estratégias comprovadas em mercados especializados com gestão profissional e transparente.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-4 text-center">
                {stats.map(stat => (
                    <div key={stat.label}>
                        <p className="text-3xl font-bold text-highlight">{stat.value}</p>
                        <p className="text-xs uppercase tracking-wider text-primary-foreground/70">{stat.label}</p>
                    </div>
                ))}
            </div>
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <Button asChild size="lg" className="bg-gradient-to-r from-highlight to-highlight/80 hover:from-highlight/90 hover:to-highlight/70 text-black w-full sm:w-auto">
                <Link href="/contato">Começar Investimento <ArrowRight className="ml-2" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/10 border-white/20 backdrop-blur-md text-white hover:bg-white/20 w-full sm:w-auto">
                <Link href="/#fundos">
                    <PlayCircle className="mr-2" />
                    Ver Apresentação
                </Link>
            </Button>
            </div>
        </div>
      </div>
    </section>
  );
}
