import fs from 'fs';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://my-app-backend-lyart.vercel.app/api';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://agencymail.qzz.io';

async function getBlogs() {
  try {
    const response = await axios.get(`${API_BASE_URL}/blog`);
    return response.data || [];
  } catch (error) {
    console.error('Failed to fetch blogs for sitemap generation:', error);
    return [];
  }
}

async function generateSitemap() {
  const blogs = await getBlogs();

  const staticPages = [
    '',
    '/blog',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
  ].map(route => {
    const url = `${BASE_URL}${route}`;
    return `<url><loc>${url}</loc><lastmod>${new Date().toISOString().split('T')[0]}</lastmod><changefreq>daily</changefreq><priority>${route === '' ? '1.0' : '0.8'}</priority></url>`;
  });

  const blogPages = blogs.map(post => {
    const url = `${BASE_URL}/blog/${post.slug}`;
    return `<url><loc>${url}</loc><lastmod>${new Date().toISOString().split('T')[0]}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>`;
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${[...staticPages, ...blogPages].join('\n  ')}
</urlset>`;

  fs.writeFileSync('public/sitemap.xml', sitemap);
  console.log('Sitemap generated successfully!');
}

generateSitemap();
