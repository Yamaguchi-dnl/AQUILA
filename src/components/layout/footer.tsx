import Link from "next/link";
import { Logo } from "@/components/shared/logo";
import { fundsData, navItems } from "@/lib/data";
import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";
import { Instagram, Linkedin } from "lucide-react";
import type { NavItem } from "@/lib/types";

export function Footer() {
  const legalLinks = [
    { href: "/politica-privacidade", label: "Política de Privacidade" },
    { href: "/termos-uso", label: "Termos de Uso" },
  ];
  
  const allNavLinks: NavItem[] = navItems.flatMap(item => item.subItems ? item.subItems.map(s => ({label: s.label, href: s.href})) : ({label: item.label, href: item.href!}));

  return (
    <footer className="bg-muted text-muted-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Logo />
            <p className="mt-4 text-sm">
              Investimentos de Valor em Portugal.
            </p>
            <div className="flex gap-2 mt-4">
                <Button asChild variant="ghost" size="icon">
                    <Link href="https://www.instagram.com/aquilafcr/" target="_blank" aria-label="Instagram">
                        <Instagram className="h-5 w-5" />
                    </Link>
                </Button>
                <Button asChild variant="ghost" size="icon">
                    <Link href="https://www.linkedin.com/company/aquila-fcr/" target="_blank" aria-label="LinkedIn">
                        <Linkedin className="h-5 w-5" />
                    </Link>
                </Button>
            </div>
          </div>
          <div>
            <h4 className="font-headline text-lg font-semibold text-foreground">Navegação</h4>
            <ul className="mt-4 space-y-2">
              {allNavLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href!} className="text-sm hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-headline text-lg font-semibold text-foreground">Legal</h4>
            <ul className="mt-4 space-y-2">
              {legalLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-headline text-lg font-semibold text-foreground">Contato</h4>
            <address className="mt-4 space-y-2 text-sm not-italic">
              <p>Av. Engenheiro Duarte Pacheco, Torre 1, 15º(2)<br />1070 – 101 Lisboa, Portugal</p>
              <p><strong>Telefone:</strong> +351 21 310 36 20</p>
              <p><strong>Fax:</strong> +351 21 310 36 29</p>
              <p><strong>Email:</strong> info@aquilafund.com</p>
            </address>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="text-center text-xs space-y-2">
            <p>As informações não constituem oferta pública de valores mobiliários nem recomendação de investimento.</p>
            <p>Rentabilidade passada não é garantia de resultados futuros. Condições do Golden Visa sujeitas a alterações regulatórias.</p>
            <p className="pt-4">2025 © Áquila Fund FCR. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
