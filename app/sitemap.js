const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://shindeshahi.example.com'

export default function sitemap() {
  const now = new Date().toISOString()
  const routes = ['', '/menu', '/about', '/gallery', '/reviews', '/reservation', '/contact', '/cart', '/checkout']
  return routes.map((r) => ({
    url: `${base}${r}`,
    lastModified: now,
    changeFrequency: r === '' ? 'weekly' : 'monthly',
    priority: r === '' ? 1 : r === '/menu' ? 0.9 : 0.7,
  }))
}
