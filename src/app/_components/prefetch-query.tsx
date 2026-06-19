// app/_components/prefetch-query.tsx      untuk optimasi data supabase
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

interface PrefetchQueriesProps {
    queries: Array<{
        queryKey: any[];
        queryFn: () => Promise<any>;
    }>;
    children: React.ReactNode;
}

export async function PrefetchQueries({ queries, children }: PrefetchQueriesProps) {
    const queryClient = new QueryClient();

    // Prefetch semua query secara paralel untuk performa maksimal
    await Promise.all(
        queries.map(({ queryKey, queryFn }) =>
            queryClient.prefetchQuery({ queryKey, queryFn })
        )
    );

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            {children}
        </HydrationBoundary>
    );
}