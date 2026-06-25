'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { HugeiconsIcon } from '@hugeicons/react';
import { ChartUpIcon, ChartDownIcon } from '@hugeicons/core-free-icons';
import { News } from '@/types/general';
import { Skeleton } from '@/components/ui/skeleton';

export interface SectionCardsNewsFixProps {
  news?: News[];
  isLoading?: boolean;
}

export function SectionCardsNewsFix({ news = [], isLoading = false }: SectionCardsNewsFixProps) {
  // 1. Published posts
  const publishedPosts = news.filter((item) => item.status === 'published');
  const publishedCount = publishedPosts.length;

  // 2. Pending drafts
  const pendingDraftsCount = news.filter((item) => item.status === 'draft').length;

  // 3. Simulated/calculated page views (Since views aren't in the schema, we simulate based on ID)
  const getViewsForArticle = (id: number) => {
    return ((id * 7919) % 1500) + 120;
  };
  const totalViews = publishedPosts.reduce((sum, item) => sum + getViewsForArticle(item.id), 0);
  const formattedViews = totalViews >= 1000 
    ? `${(totalViews / 1000).toFixed(1)}K` 
    : totalViews.toString();

  // 4. Avg. Read Time calculation based on content word count (assuming 200 words per minute reading speed)
  const getReadTimeForArticle = (content: string | null) => {
    if (!content) return 0;
    const words = content.trim().split(/\s+/).length;
    return Math.max(1, words / 200); // in minutes
  };
  const totalReadTime = publishedPosts.reduce((sum, item) => sum + getReadTimeForArticle(item.isi_berita), 0);
  const avgReadTimeMinutes = publishedCount > 0 ? totalReadTime / publishedCount : 0;
  const min = Math.floor(avgReadTimeMinutes);
  const sec = Math.round((avgReadTimeMinutes - min) * 60);
  const formattedReadTime = publishedCount > 0 
    ? (min > 0 ? `${min}m ${sec}s` : `${sec}s`)
    : '0m';

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="@container/card">
            <CardHeader>
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-8 w-1/3 my-2" />
              <CardAction>
                <Skeleton className="h-6 w-16" />
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-3 w-3/4" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Tayangan (Page Views)</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{formattedViews}</CardTitle>
          <CardAction>
            <Badge variant="outline">
              <HugeiconsIcon icon={ChartUpIcon} strokeWidth={2} />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Tren naik bulan ini <HugeiconsIcon icon={ChartUpIcon} strokeWidth={2} className="size-4" />
          </div>
          <div className="text-muted-foreground">Pengunjung dalam 6 bulan terakhir</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Berita Diterbitkan (Published Posts)</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{publishedCount}</CardTitle>
          <CardAction>
            <Badge variant="outline">
              <HugeiconsIcon icon={ChartUpIcon} strokeWidth={2} />
              Aktif
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Telah dipublikasi ke pembaca <HugeiconsIcon icon={ChartUpIcon} strokeWidth={2} className="size-4" />
          </div>
          <div className="text-muted-foreground">Jumlah artikel berita yang online</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Menunggu Persetujuan (Pending Drafts)</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{pendingDraftsCount}</CardTitle>
          <CardAction>
            <Badge variant="outline" className={pendingDraftsCount > 0 ? "text-yellow-600 border-yellow-300 dark:text-yellow-400 dark:border-yellow-900" : ""}>
              <HugeiconsIcon icon={pendingDraftsCount > 0 ? ChartUpIcon : ChartDownIcon} strokeWidth={2} />
              {pendingDraftsCount > 0 ? 'Perlu Review' : 'Selesai'}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {pendingDraftsCount > 0 ? 'Butuh review persetujuan' : 'Semua draf selesai di-review'}
          </div>
          <div className="text-muted-foreground">Draft yang menunggu dipublikasi</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Rata-rata Waktu Baca (Avg. Read Time)</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{formattedReadTime}</CardTitle>
          <CardAction>
            <Badge variant="outline">
              <HugeiconsIcon icon={ChartUpIcon} strokeWidth={2} />
              Stabil
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Peningkatan performa stabil <HugeiconsIcon icon={ChartUpIcon} strokeWidth={2} className="size-4" />
          </div>
          <div className="text-muted-foreground">Dihitung otomatis dari panjang konten</div>
        </CardFooter>
      </Card>
    </div>
  );
}
