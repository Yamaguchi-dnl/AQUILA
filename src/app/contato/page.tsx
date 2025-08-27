import { PageHeader } from "@/components/shared/page-header";
import { ContactForm } from "@/components/forms/contact-form";
import { Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Contato",
  description: "Fale com um especialista da Aquila Fund FCR. Estamos disponíveis para responder às suas perguntas sobre nossos fundos de investimento.",
};

const contactDetails = [
    { icon: MapPin, text: "Av. Engenheiro Duarte Pacheco, Torre 1, 15º(2)\n1070 – 101 Lisboa, Portugal" },
    { icon: Phone, text: "+351 21 310 36 20", href: "tel:+351213103620" },
    { icon: Mail, text: "info@aquilafund.com", href: "mailto:info@aquilafund.com" },
]

export default function ContatoPage() {
  return (
    <>
      <PageHeader
        title="Contato"
        subtitle="Estamos à sua disposição para qualquer esclarecimento."
      />
      <section>
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
                <h2 className="font-headline text-3xl text-primary font-bold">Informações de Contato</h2>
                <p className="mt-4 text-muted-foreground">
                    Entre em contato conosco por telefone, e-mail ou visite nosso escritório.
                </p>
                <div className="mt-8 space-y-6">
                    {contactDetails.map((detail, index) => (
                        <div key={index} className="flex items-start gap-4">
                            <detail.icon className="h-6 w-6 text-primary mt-1 shrink-0" />
                            <div className="whitespace-pre-line">
                                {detail.href ? (
                                    <Link href={detail.href} className="hover:text-primary transition-colors">
                                        {detail.text}
                                    </Link>
                                ) : (
                                    <span>{detail.text}</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="lg:col-span-3">
              <div className="bg-card p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-foreground mb-2">Fale com um especialista</h2>
                <p className="text-muted-foreground mb-6">Preencha o formulário e nossa equipe entrará em contato para uma consulta personalizada.</p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
