import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://elidevent.com'
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',
        '/api/',
        '/booking/[id]', // Disallow specific booking status pages
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
