import type { MetadataRoute } from 'next';
import { getArticles } from '@/lib/data';
import { getConfig } from '@/lib/data';

export const dynamic = 'force-static';

function getBaseUrl(): string {
  // For GitHub Pages deployment, use the correct base URL
  // This should match your GitHub Pages domain
  const envUrl = process.env.NEXT_PUBLIC_BASE_URL?.trim();
  
  if (envUrl && /^https?:\/\//i.test(envUrl)) {
    return envUrl.replace(/\/$/, '');
  }
  
  // Use the custom domain from CNAME file
  return 'https://www.birdiebriefing.com';
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();
  const config = getConfig();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/news`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/about`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/contact-us`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/podcast`, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/rankings`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/schedule`, changeFrequency: 'monthly', priority: 0.6 },
  ];

  const articles = await getArticles();
  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}/news/${article.slug}`,
    lastModified: article.date,
    changeFrequency: 'yearly',
    priority: article.id === config.featuredArticleId ? 0.9 : 0.7,
  }));

  return [...staticRoutes, ...articleRoutes];
}


