
import { createClientForServerComponent } from '@/lib/supabase/server';
import { PageClientContent } from '@/components/admin/page-client-content';

type Page = {
  id: string;
  slug: string;
  title: string | null;
  description: string | null;
  created_at: string;
};

async function getPages(): Promise<Page[]> {
    const supabase = createClientForServerComponent();
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .order('title', { ascending: true });

    if (error) {
      console.error("Error fetching pages:", error);
      return [];
    }
    return data || [];
}

export default async function AdminPagesListPage() {
  const pages = await getPages();

  return (
    <>
      <PageClientContent initialPages={pages} />
    </>
  );
}
