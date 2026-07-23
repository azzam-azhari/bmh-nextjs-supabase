
'use client';

import { createClient } from '@/lib/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { SectionCardsNewsFix } from './section-cards-news';
import DataTableNewsFix from './data-table-news';
import { toast } from 'sonner';
import { News } from '@/types/general';

export default function AllNews() {
    const supabase = createClient();

    const { data: news, isLoading } = useQuery({
        queryKey: ['news'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('berita')
                .select('*, kategori(id, nama_kategori)')
                .order('created_at', { ascending: false });

            if (error) {
                toast.error('Gagal mengambil data berita', {
                    description: error.message,
                });
                return [];
            }

            return data as News[];
        },
        staleTime: 1000 * 60 * 5,
    });

    return (
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    {/* Tetap mempertahankan section cards dan chart area */}
                    <SectionCardsNewsFix news={news} isLoading={isLoading} />

                    {/* Menggunakan komponen DataTableNews yang baru */}
                    <DataTableNewsFix data={news || []} isLoading={isLoading} />
                </div>
            </div>
        </div>
    );
}
