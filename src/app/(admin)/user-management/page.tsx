// Di page.tsx (Server Component)
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/server'; // atau client supabase server Anda
import UserManagement from './_components/user-management';

export const metadata = {
  title: 'BMH | Manajemen User',
};

export default async function UserManagementPage() {
  const queryClient = new QueryClient();
  const supabase = await createClient();

  // Noted: Prefetch data sebelum halaman dikirim ke browser
  await queryClient.prefetchQuery({
    queryKey: ['users', 1, 10, ''], // Sesuaikan dengan key useQuery
    queryFn: async () => {
      const { data } = await supabase.from('profiles').select('*').range(0, 9).order('created_at', { ascending: false });
      return data;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserManagement />
    </HydrationBoundary>
  );
}
