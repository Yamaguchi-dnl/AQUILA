import { PageHeader } from "@/components/shared/page-header";
import { Lock } from "lucide-react";

export default function AdminPage() {
  return (
    <>
      <PageHeader title="Área Administrativa" />
      <section>
        <div className="container text-center max-w-md">
            <div className="bg-card p-8 rounded-lg">
                <Lock className="mx-auto h-12 w-12 text-primary" />
                <h2 className="mt-4 text-2xl font-bold">Acesso Restrito</h2>
                <p className="mt-2 text-muted-foreground">
                    Esta área é reservada para administradores do sistema. Por favor, realize a autenticação para continuar.
                </p>
            </div>
        </div>
      </section>
    </>
  );
}
