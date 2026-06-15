'use client';

import { createClient } from '@/lib/supabase/client';
import { useAuthStore } from '@/stores/auth-store';
import { Profile } from '@/types/auth';
import { ReactNode, useEffect } from 'react';

export default function AuthStoreProvider({
    children,
    profile,
}: {
    children: ReactNode;
    profile: Profile;
}) {
    useEffect(() => {
        const supabase = createClient();
        supabase.auth.getUser().then(({ data: { user } }) => {
            useAuthStore.getState().setUser(user);
            useAuthStore.getState().setProfile(profile);
        });

        if (!profile?.id) return;

        const subscription = supabase
            .channel(`public:profiles:${profile.id}`)
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'profiles',
                    filter: `id=eq.${profile.id}`,
                },
                (payload) => {
                    useAuthStore.getState().setProfile(payload.new as Profile);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, [profile.id]);

    return <>{children}</>;
}
