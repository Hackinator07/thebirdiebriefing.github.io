import { Article } from './data';
import { loadAllMarkdownArticles, getAllArticleSlugs } from './markdownLoader';

// Server-side functions
let cachedArticles: Article[] | null = null;

export async function getArticles(): Promise<Article[]> {
  if (cachedArticles) {
    return cachedArticles;
  }

  cachedArticles = await loadAllMarkdownArticles();
  return cachedArticles;
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  const articles = await getArticles();
  return articles.find(article => article.slug === slug);
}

export async function getLatestArticle(): Promise<Article | undefined> {
  const articles = await getArticles();
  return articles[0];
}

export async function getFeaturedArticle(): Promise<Article | undefined> {
  const articles = await getArticles();
  const { getConfig } = await import('./data');
  const config = getConfig();

  // For backward compatibility, use first featured article if available
  if (config.featuredArticles && config.featuredArticles.length > 0) {
    const featuredArticle = articles.find(article => article.id === config.featuredArticles[0]);
    if (featuredArticle) {
      return featuredArticle;
    }
  }

  // Fallback to the first article if no featured articles found
  if (articles.length > 0) {
    console.warn('No featured articles found. Using first article as fallback.');
    return articles[0];
  }

  return undefined;
}

export async function getFeaturedArticles(): Promise<Article[]> {
  const articles = await getArticles();
  const { getConfig } = await import('./data');
  const config = getConfig();

  if (!config.featuredArticles || config.featuredArticles.length === 0) {
    console.warn('No featured articles configured. Returning empty array.');
    return [];
  }

  // Find articles by the configured featured article IDs
  const featuredArticles = config.featuredArticles
    .map(id => articles.find(article => article.id === id))
    .filter((article): article is Article => article !== undefined);

  // Log warning for any missing articles
  const missingIds = config.featuredArticles.filter(id =>
    !articles.some(article => article.id === id)
  );

  if (missingIds.length > 0) {
    console.warn(`Featured articles with IDs "${missingIds.join(', ')}" not found.`);
  }

  return featuredArticles;
}

export async function getArticlesByTag(tag: string): Promise<Article[]> {
  const articles = await getArticles();
  const decodedTag = decodeURIComponent(tag);
  return articles.filter(article => 
    article.tags.some(articleTag => 
      articleTag.toLowerCase() === decodedTag.toLowerCase()
    )
  );
}

export { getAllArticleSlugs };
