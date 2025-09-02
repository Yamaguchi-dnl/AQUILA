import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "../shared/animated-section";

export function GoldenVisaSummary() {
  return (
    <section id="golden-visa" className="bg-card">
      <div className="container">
        <div className="relative rounded-lg overflow-hidden p-8 md:p-12 min-h-[400px] flex items-center">
            <Image 
                src="https://ik.imagekit.io/leosmc2zb/3550%20(1).jpg?updatedAt=1756312096783"
                alt="Paisagem de Portugal"
                data-ai-hint="portugal landscape"
                fill
                className="object-cover"
            />
            <div className="absolute inset-0 bg-primary/80"></div>
            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                <div className="text-primary-foreground">
                    <AnimatedSection>
                    <h2 className="font-headline text-3xl md:text-4xl lg:text-[2.75rem] lg:leading-[1.1] uppercase">
                        O caminho para Portugal com o Golden Visa
                    </h2>
                    </AnimatedSection>
                    <AnimatedSection delay={0.1}>
                    <p className="mt-4 text-base md:text-lg text-primary-foreground/90 max-w-lg">
                        O Golden Visa é o seu passaporte para a União Europeia. Ao investir em nossos fundos elegíveis, você e sua família garantem o direito de residir em Portugal, com acesso a todos os benefícios de um cidadão europeu, como educação e saúde de qualidade.
                    </p>
                    </AnimatedSection>
                    <AnimatedSection delay={0.2}>
                    <Button asChild variant="secondary" className="mt-8 text-base">
                        <Link href="/golden-visa">
                            SAIBA MAIS! <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                    </AnimatedSection>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
