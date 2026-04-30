import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Providers } from '@/components/providers'
import { SiteProvider } from '@/context/SiteContext'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://elidevent.com'),
  title: {
    default: 'LID EVENT & MORE - Premium Event Planning & Management',
    template: '%s | LID EVENT & MORE'
  },
  description: 'Exquisite event planning, luxury weddings, and professional entertainment services. Transform your vision into a legacy with LID EVENT & MORE.',
  keywords: ['event planning', 'wedding planner', 'professional dancers', 'ushers', 'modelling services', 'MC', 'Warri events', 'Nigeria events'],
  authors: [{ name: 'LID EVENT & MORE' }],
  creator: 'LID EVENT & MORE',
  publisher: 'LID EVENT & MORE',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'LID EVENT & MORE - Premium Event Planning & Management',
    description: 'Exquisite event planning, luxury weddings, and professional entertainment services.',
    url: 'https://elidevent.com',
    siteName: 'LID EVENT & MORE',
    images: [
      {
        url: '/og-image.png', // We should ensure this exists or create a placeholder
        width: 1200,
        height: 630,
        alt: 'LID EVENT & MORE & MORE',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LID EVENT & MORE - Premium Event Planning & Management',
    description: 'Exquisite event planning, luxury weddings, and professional entertainment services.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased text-foreground">
        <Providers>
          <SiteProvider>
            {children}
            {process.env.NODE_ENV === 'production' && <Analytics />}
          </SiteProvider>
        </Providers>
      </body>
    </html>
  )
}
