import Image from "next/image";

export function InvestmentCycle() {
  return (
    <section id="investment-cycle" className="bg-background">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl md:text-4xl text-primary">Entenda o ciclo completo do seu investimento</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Cada fundo da Aquila Fund FCR tem duração de 8 anos, com o capital levantado durante os primeiros dois anos e o período de desinvestimento ocorrendo nos últimos dois anos da vida do fundo.
          </p>
        </div>
        <div className="mt-12 flex justify-center">
            <Image 
                src="https://picsum.photos/1000/400"
                alt="Gráfico do ciclo de investimento de 8 anos"
                width={1000}
                height={400}
                className="rounded-lg object-cover"
                data-ai-hint="investment cycle graph"
            />
        </div>
      </div>
    </section>
  );
}
