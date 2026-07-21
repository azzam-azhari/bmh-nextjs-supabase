'use client';

import { useAuthStore } from '@/stores/auth-store';
import { INITIAL_STATE_PROFILE } from '@/constants/auth-constant';
import { Button } from '@/components/ui/button';
import { HugeiconsIcon } from '@hugeicons/react';
import { UserIcon } from '@hugeicons/core-free-icons';
import { useRouter } from 'next/navigation'
import { logout } from '../actions';
import { useTransition } from 'react';

export default function ProfileClient() {
  const profile = useAuthStore((state) => state.profile);
  const setProfile = useAuthStore((state) => state.setProfile);
  const setUser = useAuthStore((state) => state.setUser);
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      setProfile(INITIAL_STATE_PROFILE);
      setUser(null);
      await logout();
    });
  };

  const router = useRouter()

  return (
    <section className="flex flex-1 items-center justify-center px-4 py-24">
      <div className="w-full max-w-sm rounded-2xl border bg-card p-8 shadow-sm">
        {/* Avatar */}
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <HugeiconsIcon icon={UserIcon} className="h-10 w-10 text-primary" />
          </div>
        </div>

        {/* Username */}
        <div className="mb-8 text-center">
          <p className="text-sm text-muted-foreground">Halo,</p>
          <h1 className="mt-1 text-xl font-semibold text-foreground">
            {profile.name || 'Pengguna'}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground capitalize">
            {profile.role || '-'}
          </p>
        </div>

        {/* Logout Button */}
        <Button
          variant="destructive"
          className="w-full"
          onClick={handleLogout}
          disabled={isPending}
        >
          {isPending ? 'Keluar...' : 'Keluar'}
        </Button>

        <Button
          className="w-full mt-2 bg-primary"
          onClick={() => router.back()}
        >
          Kembali
        </Button>
      </div>
    </section>
  );
}
