import { MetadataRoute } from 'next'
import { getBlogs } from '@/lib/api'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || 'https://agencymail.qzz.io').replace(/\/$/, '')
  
  // Static routes
  const routes = [
    '',
    '/blog',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Dynamic blog routes
  let blogEntries: MetadataRoute.Sitemap = []
  try {
    const blogs = await getBlogs()
    if (Array.isArray(blogs)) {
      blogEntries = blogs.map((post: any) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }))
    }
  } catch (error) {
    console.error('Failed to fetch blogs for sitemap:', error)
  }

  return [...routes, ...blogEntries]
}
