import { PageHeader } from "@/components/shared/page-header";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Cuboid, Clock } from "lucide-react";
import { format } from "date-fns";

async function getDashboardStats() {
    const supabase = createClient();

    const { count: pageCount } = await supabase
        .from('pages')
        .select('*', { count: 'exact', head: true });

    const { count: blockCount } = await supabase
        .from('blocks')
        .select('*', { count: 'exact', head: true });

    const { data: lastUpdate, error } = await supabase
        .from('blocks')
        .select('updated_at, user:users(email)')
        .order('updated_at', { ascending: false })
        .limit(1)
        .single();
        
    return {
        pageCount: pageCount ?? 0,
        blockCount: blockCount ?? 0,
        lastUpdate: lastUpdate ? {
            ...lastUpdate,
            // @ts-ignore
            userEmail: lastUpdate.user?.email || 'N/A'
        } : null,
    };
}


export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  return (
    <>
      <PageHeader title="Dashboard" subtitle="Visão geral do conteúdo do seu site." />
      <section className="py-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Páginas</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.pageCount}</div>
                    <p className="text-xs text-muted-foreground">Total de páginas gerenciáveis</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Blocos de Conteúdo</CardTitle>
                    <Cuboid className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.blockCount}</div>
                     <p className="text-xs text-muted-foreground">Total de blocos em todas as páginas</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Última Atualização</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    {stats.lastUpdate ? (
                        <>
                            <div className="text-2xl font-bold">
                                {format(new Date(stats.lastUpdate.updated_at!), "dd/MM/yyyy HH:mm")}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                por {stats.lastUpdate.userEmail}
                            </p>
                        </>
                    ) : (
                        <p className="text-sm text-muted-foreground">Nenhuma atualização registrada.</p>
                    )}
                </CardContent>
            </Card>
        </div>
      </section>
    </>
  );
}
