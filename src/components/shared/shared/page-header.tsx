import { cn } from "@/lib/utils";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  className?: string;
};

export function PageHeader({ title, subtitle, className }: PageHeaderProps) {
  return (
    <section className={cn("bg-card border-b", className)}>
      <div className="container text-center py-16 md:py-20">
        <h1 className="font-headline text-4xl md:text-5xl text-primary font-bold">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
