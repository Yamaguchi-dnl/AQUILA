
import { PageHeader } from "@/components/shared/page-header";
import { createClientForServerComponent } from "@/lib/supabase/server";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

async function getChangeHistory() {
    const supabase = createClientForServerComponent();
    
    const { data, error } = await supabase
        .from('blocks')
        .select(`
            id,
            updated_at,
            title,
            block_type,
            page:pages (
                slug,
                title
            ),
            user:users (
                email
            )
        `)
        .order('updated_at', { ascending: false })
        .limit(50);
        
    if (error) {
        console.error("Error fetching history:", error);
        return [];
    }

    return data.map(item => ({
        ...item,
        // @ts-ignore
        pageTitle: item.page?.title || 'N/A',
        // @ts-ignore
        userEmail: item.user?.email || 'Sistema'
    }));
}

export default async function HistoryPage() {
    const history = await getChangeHistory();
    
    return (
        <>
            <PageHeader
                title="Histórico de Alterações"
                subtitle="Veja as últimas atualizações de conteúdo feitas no site."
            />
            <section className="py-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Últimas 50 Alterações</CardTitle>
                        <CardDescription>
                            Lista de blocos de conteúdo que foram criados ou atualizados recentemente.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Bloco</TableHead>
                                    <TableHead>Página</TableHead>
                                    <TableHead>Usuário</TableHead>
                                    <TableHead className="text-right">Data</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {history.length > 0 ? (
                                    history.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>
                                                <div className="font-medium">{item.title}</div>
                                                <div className="text-sm text-muted-foreground">{item.block_type}</div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline">{item.pageTitle}</Badge>
                                            </TableCell>
                                            <TableCell>{item.userEmail}</TableCell>
                                            <TableCell className="text-right">
                                                <div title={format(new Date(item.updated_at!), "dd/MM/yyyy 'às' HH:mm:ss")}>
                                                     {formatDistanceToNow(new Date(item.updated_at!), { addSuffix: true, locale: ptBR })}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center">
                                            Nenhum histórico de alterações encontrado.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </section>
        </>
    );
}
