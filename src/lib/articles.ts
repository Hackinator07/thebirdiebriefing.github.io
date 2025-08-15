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

  // Find article by the configured featured article ID
  const featuredArticle = articles.find(article => article.id === config.featuredArticleId);

  // Fallback to the first article if configured article is not found
  if (!featuredArticle && articles.length > 0) {
    console.warn(`Featured article with ID "${config.featuredArticleId}" not found. Using first article as fallback.`);
    return articles[0];
  }

  return featuredArticle;
}

export { getAllArticleSlugs };
