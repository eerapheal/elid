import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Providers } from '@/components/providers'
import { SiteProvider } from '@/context/SiteContext'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'LID EVENT - Premium Event Planning & Management',
  description: 'Exquisite event planning, luxury weddings, and professional entertainment services. Transform your vision into a legacy with LID EVENT.',
  generator: 'LID EVENT',
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
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
