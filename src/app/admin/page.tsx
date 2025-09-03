import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AdminPage() {
  return (
    <>
      <PageHeader title="Área Administrativa" />
      <section>
        <div className="container">
          <Card>
            <CardHeader>
              <CardTitle>Dashboard</CardTitle>
              <CardDescription>
                Bem-vindo ao painel de gerenciamento de conteúdo.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>O conteúdo do gerenciador de páginas será exibido aqui.</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
