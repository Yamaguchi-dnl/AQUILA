import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export function Hero() {
  return (
    <section className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center text-white">
      <Image
        src="https://picsum.photos/1920/1080?grayscale"
        alt="Fundo abstrato com textura elegante"
        data-ai-hint="abstract texture"
        fill
        className="object-cover absolute inset-0 z-0"
        priority
      />
      <div className="absolute inset-0 bg-primary/85 z-10"></div>
      <div className="relative z-20 text-center container px-4 md:px-6">
        <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
          Investimentos de Valor em Portugal
        </h1>
        <p className="mt-4 md:mt-6 max-w-3xl mx-auto text-lg md:text-xl text-primary-foreground/90">
          Soluções premium para investidores de alta renda que buscam diversificação, segurança e oportunidades exclusivas no mercado europeu.
        </p>
        <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 w-full sm:w-auto">
            <Link href="/contato">Fale com um especialista</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary w-full sm:w-auto">
            <Link href="/fundos">Conheça nossos fundos</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
