const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://shindesh.example.com'

export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/', '/checkout', '/cart', '/order/', '/_next/'] },
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  }
}
