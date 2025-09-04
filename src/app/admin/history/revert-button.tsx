
"use client";

import { useTransition } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { History } from 'lucide-react';
import { revertBlockToVersion } from '@/actions/admin';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

type RevertButtonProps = {
    versionId: string;
    pageSlug: string;
};

export function RevertButton({ versionId, pageSlug }: RevertButtonProps) {
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();

    const handleRevert = () => {
        startTransition(async () => {
            const result = await revertBlockToVersion(versionId, pageSlug);
            if (result.success) {
                toast({ title: 'Sucesso!', description: result.message });
            } else {
                toast({ variant: 'destructive', title: 'Erro', description: result.message });
            }
        });
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" disabled={isPending}>
                    <History className="mr-2 h-4 w-4" />
                    Restaurar
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Restaurar Versão?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Isto substituirá o conteúdo atual do bloco pela versão selecionada. A versão atual será guardada no histórico para que possa reverter esta ação se necessário.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleRevert} disabled={isPending}>
                        {isPending ? 'A restaurar...' : 'Confirmar'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
