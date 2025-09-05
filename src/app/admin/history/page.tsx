
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
import { RevertButton } from "./revert-button";

async function getChangeHistory() {
    const supabase = createClientForServerComponent();
    
    const { data, error } = await supabase
        .from('block_versions')
        .select(`
            version_id,
            version_timestamp,
            title,
            block_type,
            page:pages (
                slug,
                title
            )
        `)
        .order('version_timestamp', { ascending: false })
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
        pageSlug: item.page?.slug || '',
    }));
}

export default async function HistoryPage() {
    const history = await getChangeHistory();
    
    return (
        <>
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Histórico de Alterações</h1>
                <p className="text-muted-foreground">Veja as últimas atualizações de conteúdo feitas no site e restaure versões anteriores se necessário.</p>
            </div>
            <section className="py-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Últimas 50 Versões Guardadas</CardTitle>
                        <CardDescription>
                            Lista de versões de blocos de conteúdo que foram guardadas.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Bloco</TableHead>
                                    <TableHead>Página</TableHead>
                                    <TableHead>Data da Versão</TableHead>
                                    <TableHead className="text-right">Ações</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {history.length > 0 ? (
                                    history.map((item) => (
                                        <TableRow key={item.version_id}>
                                            <TableCell>
                                                <div className="font-medium">{item.title}</div>
                                                <div className="text-sm text-muted-foreground">{item.block_type}</div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline">{item.pageTitle}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div title={format(new Date(item.version_timestamp!), "dd/MM/yyyy 'às' HH:mm:ss")}>
                                                     {formatDistanceToNow(new Date(item.version_timestamp!), { addSuffix: true, locale: ptBR })}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                               <RevertButton versionId={item.version_id} pageSlug={item.pageSlug} />
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
