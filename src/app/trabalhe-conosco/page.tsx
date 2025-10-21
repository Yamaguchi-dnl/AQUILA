
import { JobApplicationForm } from "@/components/forms/job-application-form";
import { AnimatedSection } from "@/components/shared/animated-section";
import ParticlesContainer from "@/components/shared/particles-container";

export const metadata = {
  title: "Trabalhe Conosco",
  description: "Junte-se a uma equipe de alta performance. Envie sua candidatura e faça parte da história do Aquila Fund FCR.",
};

export default function TrabalheConoscoPage() {
  return (
    <>
      <section className="w-full h-[60vh] bg-primary text-primary-foreground relative flex items-center justify-center text-center overflow-hidden">
        <ParticlesContainer />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(255,255,255,0.1)_0%,_transparent_70%)]"
        />
        <div className="container relative z-20">
          <AnimatedSection>
            <p className="text-sm uppercase tracking-widest text-primary-foreground/80 font-headline">Junte-se à nossa equipa</p>
            <h1 className="font-headline text-4xl md:text-5xl text-primary-foreground uppercase mt-2">Trabalhe Conosco</h1>
            <p className="mt-4 text-lg text-primary-foreground/90 max-w-3xl mx-auto">Procuramos talentos excepcionais que partilhem da nossa paixão por excelência e inovação no mercado financeiro.</p>
          </AnimatedSection>
        </div>
      </section>
      <section className="bg-background">
        <div className="container max-w-2xl">
          <AnimatedSection direction="up">
            <div className="bg-card p-8 rounded-lg shadow-xl">
              <h2 className="text-2xl font-bold text-foreground mb-2 font-headline">Envie sua Candidatura</h2>
              <p className="text-muted-foreground mb-6">Se você é um profissional motivado e busca desafios, gostaríamos de conhecer você. </p>
              <JobApplicationForm />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
