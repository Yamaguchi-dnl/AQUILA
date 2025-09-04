
import { cn } from "@/lib/utils";
import { AnimatedSection } from "./animated-section";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  className?: string;
  children?: React.ReactNode;
};

export function PageHeader({ title, subtitle, className, children }: PageHeaderProps) {
  return (
    <section className={cn("bg-card border-b relative overflow-hidden", className)}>
       <div className="container py-12 md:py-10 relative">
        <AnimatedSection>
        <div className="text-center">
            <h1 className="font-headline text-4xl md:text-5xl text-primary uppercase">
            {title}
            </h1>
            {subtitle && (
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                {subtitle}
            </p>
            )}
        </div>
        </AnimatedSection>
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}
