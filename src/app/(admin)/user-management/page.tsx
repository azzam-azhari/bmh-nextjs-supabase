// app/admin/users/page.tsx
import { createClient } from '@/lib/supabase/server';
import { PrefetchQueries } from '@/app/_components/prefetch-query';
import UserManagement from './_components/user-management';

export const metadata = {
  title: 'BMH | Manajemen User',
};
// ISR (Indefinite Stale-while-revalidate)
export const revalidate = 3600;

export default async function UserManagementPage() {
  const supabase = await createClient();

  return (
    <PrefetchQueries
      queries={[
        {
          queryKey: ['users', 1, 10, ''],
          queryFn: async () => {
            const { data } = await supabase
              .from('profiles')
              .select('*')
              .range(0, 9)
              .order('created_at', { ascending: false });
            return data;
          },
        },
      ]}
    >
      <UserManagement />
    </PrefetchQueries>
  );
}