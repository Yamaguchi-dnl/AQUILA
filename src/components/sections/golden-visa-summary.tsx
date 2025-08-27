import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function GoldenVisaSummary() {
  return (
    <section id="golden-visa" className="bg-card">
      <div className="container">
        <div className="relative rounded-lg overflow-hidden p-8 md:p-12 min-h-[400px] flex items-center">
            <Image 
                src="https://picsum.photos/1200/400?grayscale"
                alt="Paisagem de Portugal"
                data-ai-hint="portugal landscape"
                fill
                className="object-cover"
            />
            <div className="absolute inset-0 bg-primary/90"></div>
            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                <div className="text-primary-foreground">
                    <h2 className="font-headline text-3xl md:text-4xl font-bold">
                        O caminho para Portugal com o Golden Visa
                    </h2>
                    <p className="mt-4 text-lg text-primary-foreground/90 max-w-lg">
                        O Golden Visa é o visto de residência em países da União Europeia por meio de investimentos. Ao investir em nossos fundos de investimentos, você e sua família podem conquistar o direito de residir em Portugal, ter acesso à educação, saúde e demais direitos de qualquer cidadão com residência permanente. Com a Aquila Fund FCR, você tem acesso a fundos elegíveis que facilitam a obtenção deste valioso documento.
                    </p>
                    <Button asChild variant="secondary" className="mt-8 text-base">
                        <Link href="/golden-visa">
                            SAIBA MAIS! <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
