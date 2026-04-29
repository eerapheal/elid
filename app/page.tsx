'use client';

import Navigation from '@/components/navigation';
import Hero from '@/components/sections/hero';
import Services from '@/components/sections/services';
import Portfolio from '@/components/sections/portfolio';
import Team from '@/components/sections/team';
import Testimonials from '@/components/sections/testimonials';
import CTA from '@/components/sections/cta';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <Services />
      <Portfolio />
      <Team />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
