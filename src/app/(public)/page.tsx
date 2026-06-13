// app/(public)/page.tsx
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Calendar, TrendingUp, Users, Globe } from 'lucide-react';
import FaqSection from './_landingpage/faq-section';
import NewsSection from './_landingpage/news-section';
import HeroSection from './_landingpage/hero-section';


export default function Home() {
  return (
    <main className="flex flex-col flex-1">

      {/* Hero Section */}
      <HeroSection />

      <div className=''>

        {/* Latest News Section */}
        <NewsSection />

        {/* FAQ Section */}
        <FaqSection />
      </div>

    </main>
  );
}