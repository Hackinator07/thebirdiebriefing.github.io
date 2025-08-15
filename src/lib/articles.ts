import { Article } from './data';

// Server-side functions
let cachedArticles: Article[] | null = null;

export async function getArticles(): Promise<Article[]> {
  if (cachedArticles) {
    return cachedArticles;
  }

  // Dynamic import to avoid bundling fs in client
  const { loadAllMarkdownArticles } = await import('./markdownLoader');
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
  return articles.find(article => article.featured === true);
}

export function getAllArticleSlugs(): Promise<string[]> {
  // Dynamic import to avoid bundling fs in client
  return import('./markdownLoader').then(({ getAllArticleSlugs }) => getAllArticleSlugs());
}
