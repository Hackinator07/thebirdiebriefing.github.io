import type { MetadataRoute } from 'next';
import { getArticles } from '@/lib/data';

export const dynamic = 'force-static';

function getBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_BASE_URL?.trim();
  return envUrl && /^https?:\/\//i.test(envUrl)
    ? envUrl.replace(/\/$/, '')
    : 'https://www.birdiebriefing.com';
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/news`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/about`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/contact-us`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/podcast`, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/rankings`, changeFrequency: 'weekly', priority: 0.7 },
  ];

  const articles = await getArticles();
  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}/news/${article.slug}`,
    lastModified: article.date,
    changeFrequency: 'yearly',
    priority: article.featured ? 0.9 : 0.7,
  }));

  return [...staticRoutes, ...articleRoutes];
}


