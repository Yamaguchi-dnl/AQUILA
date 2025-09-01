import { PageHeader } from "@/components/shared/page-header";
import { JobApplicationForm } from "@/components/forms/job-application-form";

export const metadata = {
  title: "Trabalhe Conosco",
  description: "Junte-se a uma equipe de alta performance. Envie sua candidatura e faça parte da história da Aquila Fund FCR.",
};

export default function TrabalheConoscoPage() {
  return (
    <>
      <PageHeader
        title="Trabalhe Conosco"
        subtitle="Procuramos talentos excepcionais que partilhem da nossa paixão por excelência e inovação no mercado financeiro."
      />
      <section>
        <div className="container max-w-2xl">
          <div className="bg-card p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-foreground mb-2 font-headline">Envie sua Candidatura</h2>
            <p className="text-muted-foreground mb-6">Se você é um profissional motivado e busca desafios, gostaríamos de conhecer você. </p>
            <JobApplicationForm />
          </div>
        </div>
      </section>
    </>
  );
}
