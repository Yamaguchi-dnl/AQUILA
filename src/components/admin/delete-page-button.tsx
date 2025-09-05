
"use client";

import { useTransition } from 'react';
import { useToast } from '@/hooks/use-toast';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Loader2, Trash2 } from 'lucide-react';
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

type DeletePageButtonProps = {
  pageId: string;
  onSuccess: () => void;
};

export function DeletePageButton({ pageId, onSuccess }: DeletePageButtonProps) {
  const supabase = createClient();
  const { toast } = useToast();
  const [isDeleting, startDeleteTransition] = useTransition();

  const handleDelete = async () => {
    startDeleteTransition(async () => {
      try {
        // Primeiro, exclui os blocos associados
        const { error: blocksError } = await supabase
          .from('blocks')
          .delete()
          .eq('page_id', pageId);
        
        if (blocksError) throw blocksError;

        // Depois, exclui a própria página
        const { error: pageError } = await supabase
          .from('pages')
          .delete()
          .eq('id', pageId);

        if (pageError) throw pageError;

        toast({ title: 'Sucesso', description: 'Página e seus blocos foram excluídos.' });
        onSuccess();
      } catch (error: any) {
        toast({ variant: 'destructive', title: 'Erro ao excluir', description: error.message });
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive-outline" size="icon" disabled={isDeleting}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. Isso excluirá permanentemente a página e TODOS os seus blocos de conteúdo.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Confirmar Exclusão
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
