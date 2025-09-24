
import { cn } from "@/lib/utils";
import { AnimatedSection } from "./animated-section";

type PageHeaderProps = {
  pretitle?: string;
  title: string;
  subtitle?: string;
  className?: string;
  children?: React.ReactNode;
};

export function PageHeader({ pretitle, title, subtitle, className, children }: PageHeaderProps) {
  return (
    <div className={cn("bg-card relative overflow-hidden pt-32 md:pt-40", className)}>
       <div className="container pt-12 pb-8 md:pb-12 relative">
        <AnimatedSection>
        <div className="text-center">
            {pretitle && (
                 <p className="text-sm uppercase tracking-widest text-muted-foreground font-headline mb-2">
                    {pretitle}
                </p>
            )}
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
    </div>
  );
}
