
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "../shared/animated-section";
import type { Block } from "@/lib/data-loader";

type Props = {
  block: Block | null;
}

const defaultContent = {
    title: 'O caminho para Portugal com o Golden Visa',
    content: 'O Golden Visa é o seu passaporte para a União Europeia. Ao investir em nossos fundos elegíveis, você e sua família garantem o direito de residir em Portugal, com acesso a todos os benefícios de um cidadão europeu, como educação e saúde de qualidade.',
    image_url: 'https://ik.imagekit.io/leosmc2zb/golden-visa-portugal-nacionalidade-portuguesa.jpeg'
}

export function GoldenVisaSummary({ block }: Props) {
  return (
    <section id="golden-visa" className="bg-card">
      <div className="container">
        <div className="relative rounded-lg overflow-hidden p-8 md:p-12 min-h-[400px] flex items-center">
            <Image 
                src={block?.image_url || defaultContent.image_url}
                alt="Golden Visa Portugal"
                data-ai-hint="passport document"
                fill
                className="object-cover"
            />
            <div className="absolute inset-0 bg-primary/80"></div>
            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                <div className="text-primary-foreground">
                    <AnimatedSection>
                    <h3 className="font-headline text-4xl uppercase mt-2">
                        {block?.title || defaultContent.title}
                    </h3>
                    </AnimatedSection>
                    <AnimatedSection delay={0.1}>
                    <p className="mt-4 text-base md:text-lg text-primary-foreground/90 max-w-lg">
                        {block?.content || defaultContent.content}
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
