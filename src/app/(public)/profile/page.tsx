import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import ProfileClient from './_components/profile-client';

export const metadata = {
  title: 'Profil',
};

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Belum login -> redirect ke login
  if (!user) {
    redirect('/login');
  }

  // Cek role dari cookie / DB
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  // Hanya role "user" yang boleh akses halaman ini
  if (profile?.role?.toLowerCase() !== 'user') {
    redirect('/dashboard');
  }

  return <ProfileClient />;
}
