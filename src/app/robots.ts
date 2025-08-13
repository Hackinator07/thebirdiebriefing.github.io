import type { MetadataRoute } from 'next';
import robotsConfig from '@/data/robots.json';

export const dynamic = 'force-static';

function getBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_BASE_URL?.trim();
  return envUrl && /^https?:\/\//i.test(envUrl)
    ? envUrl.replace(/\/$/, '')
    : 'https://www.birdiebriefing.com';
}

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();

  // Merge recommended rules from JSON with base sitemap
  const rules: MetadataRoute.Robots['rules'] = robotsConfig.rules.map((rule) => ({
    userAgent: rule.userAgent,
    allow: rule.allow,
    disallow: rule.disallow,
  }));

  const sitemaps: string[] = [
    `${baseUrl}/sitemap.xml`,
    ...(robotsConfig.additionalSitemaps || []).map((path: string) =>
      /^https?:\/\//i.test(path) ? path : `${baseUrl}${path.startsWith('/') ? '' : '/'}${path}`
    ),
  ];

  return {
    rules,
    sitemap: sitemaps.length === 1 ? sitemaps[0] : sitemaps,
  };
}


