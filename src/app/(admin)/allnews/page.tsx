import { createClient } from '@/lib/supabase/server';
import { PrefetchQueries } from '@/app/_components/prefetch-query';
import AllNews from './_components/allnews';

export const metadata = {
  title: 'BMH | Semua Berita',
};

export default async function AllNewsPage() {
  const supabase = await createClient();

  return (
    <PrefetchQueries
      queries={[
        {
          queryKey: ['news'],
          queryFn: async () => {
            const { data } = await supabase
              .from('berita')
              .select('*, kategori(nama_kategori)')
              .order('created_at', { ascending: false });
            return data;
          },
        },
      ]}
    >
      <AllNews />
    </PrefetchQueries>
  );
}
