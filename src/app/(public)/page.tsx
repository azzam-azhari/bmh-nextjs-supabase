// app/(public)/page.tsx
import FaqSection from './_landingpage/faq-section';
import NewsSection from './_landingpage/news-section';
import HeroSection from './_landingpage/hero-section';


export default function Home() {
  return (
    <main className="flex flex-col flex-1">

      {/* Hero Section */}
      <HeroSection />

      {/* Latest News Section */}
      <NewsSection />

      {/* FAQ Section */}
      <FaqSection />


    </main>
  );
}