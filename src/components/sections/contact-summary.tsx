import { ContactForm } from "../forms/contact-form";
import Link from "next/link";
import { Instagram, Linkedin } from "lucide-react";
import { Button } from "../ui/button";

export function ContactSummary() {
  return (
    <section id="contato" className="bg-card">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
                 <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">Pronto para investir em Portugal?</h2>
                 <p className="mt-4 text-lg text-muted-foreground max-w-lg">
                    Preencha o formulário abaixo para agendar uma reunião com nossa equipe e conhecer as oportunidades de diversificação global de investimento com foco em Golden Visa. Estamos prontos para ajudar a alcançar seus objetivos financeiros em Portugal.
                 </p>
                 <div className="mt-8 text-base space-y-2">
                    <p className="text-muted-foreground"><strong>Endereço:</strong> Avenida Engenheiro Duarte Pacheco, Torre 1, 15º(2) 1070 – 101 Lisboa, Portugal</p>
                    <p className="text-muted-foreground"><strong>Telefone:</strong> +351 21 310 36 20</p>
                    <p className="text-muted-foreground"><strong>Fax:</strong> +351 21 310 36 29</p>
                    <p className="text-muted-foreground"><strong>Email:</strong> <Link href="mailto:info@aquilafund.com" className="hover:text-primary">info@aquilafund.com</Link></p>
                 </div>
                 <div className="flex gap-4 mt-4">
                    <Button asChild variant="outline" size="icon">
                        <Link href="https://www.instagram.com/aquilafcr/" target="_blank" aria-label="Instagram">
                            <Instagram />
                        </Link>
                    </Button>
                     <Button asChild variant="outline" size="icon">
                        <Link href="https://www.linkedin.com/company/aquila-fcr/" target="_blank" aria-label="LinkedIn">
                            <Linkedin />
                        </Link>
                    </Button>
                 </div>
            </div>
            <div className="bg-background p-8 rounded-lg shadow-lg">
                 <h3 className="text-xl font-bold text-foreground mb-4">Fale com um especialista</h3>
                 <ContactForm isSummary={true} />
            </div>
        </div>
      </div>
    </section>
  );
}
