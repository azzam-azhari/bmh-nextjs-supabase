
import { SectionCards } from '@/app/(admin)/dashboard/_components/section-cards';
import { DataTableNews } from '@/components/data-table-news';
import dummyNewsData from '../data-dummy-news.json';

export default function AllNews() {
    return (
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    {/* Tetap mempertahankan section cards dan chart area */}
                    <SectionCards />

                    {/* Menggunakan komponen DataTableNews yang baru */}
                    <DataTableNews data={dummyNewsData} />
                </div>
            </div>
        </div>
    );
}
