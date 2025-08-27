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
        <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl tracking-tight">
          Sua estratégia de sucesso para investir no exterior
        </h1>
        <p className="mt-4 md:mt-6 max-w-3xl mx-auto text-lg md:text-xl text-primary-foreground/90">
          Uma forma inteligente de diversificar seu patrimônio, proteger seu capital e ainda conquistar residência em Portugal.
        </p>
        <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 w-full sm:w-auto">
            <Link href="/contato">FALE COM UM ESPECIALISTA!</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
