import { getBlogs } from '@/lib/api';
import { MetadataRoute } from 'next';

export const revalidate = 3600; // revalidate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || 'https://agencymail.qzz.io').replace(/\/$/, '');
  
  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    const blogs = await getBlogs();
    if (Array.isArray(blogs)) {
      blogEntries = blogs.map((post: any) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
      }));
    }
  } catch (error) {
    console.error('Failed to fetch blogs for sitemap:', error);
  }
  
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ];

  return [...routes, ...blogEntries];
}
