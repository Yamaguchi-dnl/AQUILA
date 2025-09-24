
import { cn } from "@/lib/utils";
import { AnimatedSection } from "./animated-section";
import Image from "next/image";

type PageHeaderProps = {
  pretitle?: string;
  title: string;
  subtitle?: string;
  className?: string;
  imageUrl?: string;
  imageAlt?: string;
  imageAiHint?: string;
  children?: React.ReactNode;
};

export function PageHeader({ pretitle, title, subtitle, className, imageUrl, imageAlt, imageAiHint, children }: PageHeaderProps) {
  return (
    <header className={cn(
        "w-full h-screen bg-primary text-primary-foreground relative flex items-center justify-center text-center overflow-hidden", 
        className
    )}>
       {imageUrl ? (
           <Image
                src={imageUrl}
                alt={imageAlt || title}
                fill
                className="object-cover"
                data-ai-hint={imageAiHint}
                priority
            />
       ) : (
        <div className="bg-animation">
            <div id="stars"></div>
            <div id="stars2"></div>
            <div id="stars3"></div>
        </div>
       )}
       <div className="absolute inset-0 bg-black/60 z-10"></div>
       <div className="container relative z-20">
        <AnimatedSection>
            <div className="max-w-3xl mx-auto">
                {pretitle && (
                    <p className="text-sm uppercase tracking-widest text-primary-foreground/80 font-headline mb-2">
                        {pretitle}
                    </p>
                )}
                <h1 className="font-headline text-4xl md:text-5xl text-white uppercase">
                {title}
                </h1>
                {subtitle && (
                <p className="mt-4 text-lg text-primary-foreground/90">
                    {subtitle}
                </p>
                )}
            </div>
        </AnimatedSection>
        {children && <div className="mt-6">{children}</div>}
      </div>
    </header>
  );
}
