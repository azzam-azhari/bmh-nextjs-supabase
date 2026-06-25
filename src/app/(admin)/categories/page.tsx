// app/admin/categories/page.tsx
import { createClient } from '@/lib/supabase/server';
import { PrefetchQueries } from '@/app/_components/prefetch-query';
import CategoryManagement from './_components/categories';

export const metadata = {
    title: 'BMH | Kategori Berita',
};
// ISR (Indefinite Stale-while-revalidate)
export const revalidate = 3600;

export default async function CategoryManagementPage() {
    const supabase = await createClient();

    return (
        // <PrefetchQueries
        //     queries={[
        //         {
        //             queryKey: ['categories', 1, 10, ''],
        //             queryFn: async () => {
        //                 const { data } = await supabase
        //                     .from('kategori')
        //                     .select('*')
        //                     .range(0, 9)
        //                     .order('created_at', { ascending: false });
        //                 return data;
        //             },
        //         },
        //     ]}
        // >
        <CategoryManagement />
        // </PrefetchQueries>
    );
}