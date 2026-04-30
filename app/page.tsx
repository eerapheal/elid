import { Metadata } from 'next';
import Navigation from '@/components/navigation';
import Hero from '@/components/sections/hero';
import Services from '@/components/sections/services';
import Portfolio from '@/components/sections/portfolio';
import Team from '@/components/sections/team';
import Testimonials from '@/components/sections/testimonials';
import CTA from '@/components/sections/cta';
import Footer from '@/components/footer';

export const metadata: Metadata = {
  title: 'Home | LID EVENT - Premium Event Planning',
  description: 'Welcome to LID EVENT, your premier partner for luxury weddings, corporate events, and exquisite entertainment services in Nigeria.',
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'LID EVENT & MORE',
    image: 'https://elidevent.com/logo.png',
    '@id': 'https://elidevent.com',
    url: 'https://elidevent.com',
    telephone: '08163007792',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'no 7 mbamalu estate praise center off jakpa road',
      addressLocality: 'Warri',
      addressRegion: 'Delta State',
      addressCountry: 'NG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 5.5442,
      longitude: 5.7603,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday'
      ],
      opens: '09:00',
      closes: '18:00',
    },
    sameAs: [
      'https://www.instagram.com/elidevent',
      'https://www.facebook.com/elidevent',
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
    </>
  );
}
