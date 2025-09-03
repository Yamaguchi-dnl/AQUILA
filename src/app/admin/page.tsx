
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signOut } from "@/actions/auth";

export default async function AdminPage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <>
      <PageHeader title="Área Administrativa" />
      <section>
        <div className="container">
          <Card>
            <CardHeader className="flex-row justify-between items-center">
              <div>
                <CardTitle>Dashboard</CardTitle>
                <CardDescription>
                  Bem-vindo, {data.user.email}!
                </CardDescription>
              </div>
              <form action={signOut}>
                <Button type="submit" variant="outline">Logout</Button>
              </form>
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
