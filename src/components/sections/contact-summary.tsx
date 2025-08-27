import Link from "next/link";
import { ContactForm } from "../forms/contact-form";

export function ContactSummary() {
  return (
    <section id="contato" className="bg-background">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
                 <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">Vamos Conversar?</h2>
                 <p className="mt-4 text-lg text-muted-foreground max-w-lg">
                    Tem alguma dúvida ou gostaria de explorar nossas soluções de investimento? Preencha o formulário e um de nossos especialistas entrará em contato em breve.
                 </p>
                 <div className="mt-8 text-base">
                    <p className="font-medium text-foreground">Prefere falar diretamente?</p>
                    <p className="text-muted-foreground"><strong>Email:</strong> <Link href="mailto:info@aquilafund.com" className="hover:text-primary">info@aquilafund.com</Link></p>
                    <p className="text-muted-foreground"><strong>Telefone:</strong> +351 21 310 36 20</p>
                 </div>
            </div>
            <div className="bg-card p-8 rounded-lg shadow-lg">
                 <h3 className="text-xl font-bold text-foreground mb-4">Fale com um especialista</h3>
                 <ContactForm isSummary={true} />
            </div>
        </div>
      </div>
    </section>
  );
}
