
import { ContactForm } from "@/components/forms/contact-form";
import { Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import { AnimatedSection } from "@/components/shared/animated-section";
import ParticlesContainer from "@/components/shared/particles-container";

export const metadata = {
  title: "Contato",
  description: "Fale com um especialista do Aquila Fund FCR. Estamos disponíveis para responder às suas perguntas sobre nossos fundos de investimento.",
};

const contactDetails = [
    { icon: MapPin, text: "Av. Engenheiro Duarte Pacheco, Torre 1, 15º(2)\n1070 – 101 Lisboa, Portugal" },
    { icon: Phone, text: "+351 21 310 36 20", href: "tel:+351213103620" },
    { icon: Mail, text: "info@aquilafund.com", href: "mailto:info@aquilafund.com" },
]

export default function ContatoPage() {
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
                    <p className="text-sm uppercase tracking-widest text-primary-foreground/80 font-headline">FALE CONOSCO</p>
                    <h1 className="font-headline text-4xl md:text-5xl text-primary-foreground uppercase mt-2">Contato</h1>
                    <p className="mt-4 text-lg text-primary-foreground/90 max-w-3xl mx-auto">Estamos à sua disposição para qualquer esclarecimento.</p>
                </AnimatedSection>
            </div>
        </section>
      <section className="bg-background text-foreground relative z-10">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-12">
            <AnimatedSection className="lg:col-span-2" direction="right">
                <h2 className="font-headline text-3xl text-primary font-bold">Informações de Contato</h2>
                <p className="mt-4 text-muted-foreground">
                    Entre em contato conosco por telefone, e-mail ou visite nosso escritório.
                </p>
                <div className="mt-8 space-y-6">
                    {contactDetails.map((detail, index) => (
                         <AnimatedSection key={index} delay={0.1 + index * 0.1} direction="up">
                        <div className="flex items-start gap-4">
                            <detail.icon className="h-6 w-6 text-primary mt-1 shrink-0" />
                            <div className="whitespace-pre-line text-muted-foreground">
                                {detail.href ? (
                                    <Link href={detail.href} className="hover:text-primary transition-colors">
                                        {detail.text}
                                    </Link>
                                ) : (
                                    <span>{detail.text}</span>
                                )}
                            </div>
                        </div>
                        </AnimatedSection>
                    ))}
                </div>
            </AnimatedSection>
            <AnimatedSection className="lg:col-span-3" delay={0.1} direction="left">
              <div className="bg-card p-8 rounded-lg shadow-xl text-card-foreground">
                <h2 className="text-2xl font-bold font-headline text-primary mb-2">Fale com um especialista</h2>
                <p className="text-muted-foreground mb-6">Preencha o formulário e nossa equipe entrará em contato para uma consulta personalizada.</p>
                <ContactForm />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
