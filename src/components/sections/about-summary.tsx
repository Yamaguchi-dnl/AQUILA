import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export function AboutSummary() {
  return (
    <section id="sobre">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div>
            <h2 className="font-headline text-3xl md:text-4xl text-primary font-bold">Seu capital, nossa expertise</h2>
            <div className="mt-6 space-y-4 text-muted-foreground prose prose-lg max-w-none">
              <p>
                A Aquila Fund FCR é uma plataforma de investimentos portuguesa, com quatro fundos de investimento totalmente independentes e registrados na Comissão do Mercado de Valores Mobiliários (CMVM).
              </p>
              <p>
                Com uma equipe experiente e altamente qualificada, oferecemos soluções seguras e rentáveis para investidores brasileiros, através de nossos fundos - Wheels, Agro, Hotel Invest e Real State.
              </p>
              <p>
                Com estas soluções, você diversifica seu portfólio, ganha acesso facilitado ao passaporte europeu e protege seu patrimônio em um mercado estável e repleto de oportunidades.
              </p>
            </div>
            <Button asChild size="lg" className="mt-8">
              <Link href="/contato">FALE COM UM ESPECIALISTA!</Link>
            </Button>
          </div>
          <div className="hidden md:block">
             <Image 
                src="https://picsum.photos/600/400"
                alt="Escritório moderno"
                width={600}
                height={400}
                className="rounded-lg object-cover shadow-xl"
                data-ai-hint="modern office"
             />
          </div>
        </div>
      </div>
    </section>
  );
}
