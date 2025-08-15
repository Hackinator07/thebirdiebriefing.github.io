import { Article } from './data';
import fs from 'fs';
import path from 'path';

// Server-side functions
let cachedArticles: Article[] | null = null;
let lastLoadTime: number = 0;



export async function getArticles(): Promise<Article[]> {
  const articlesDirectory = path.join(process.cwd(), 'src/data/articles');

  try {
    // Check if any markdown files have been modified since last load
    const fileNames = fs.readdirSync(articlesDirectory);
    const mdFiles = fileNames.filter(fileName => fileName.endsWith('.md'));

    const currentTime = Date.now();
    let shouldReload = false;

    for (const fileName of mdFiles) {
      const filePath = path.join(articlesDirectory, fileName);
      const stats = fs.statSync(filePath);
      if (stats.mtime.getTime() > lastLoadTime) {
        shouldReload = true;
        break;
      }
    }

    if (cachedArticles && !shouldReload) {
      return cachedArticles;
    }

    // Dynamic import to avoid bundling fs in client
    const { loadAllMarkdownArticles } = await import('./markdownLoader');
    cachedArticles = await loadAllMarkdownArticles();
    lastLoadTime = currentTime;
    return cachedArticles;
  } catch (error) {
    console.error('Error checking file modifications:', error);
    // Fallback to cached version if available
    if (cachedArticles) {
      return cachedArticles;
    }
    // Dynamic import to avoid bundling fs in client
    const { loadAllMarkdownArticles } = await import('./markdownLoader');
    cachedArticles = await loadAllMarkdownArticles();
    lastLoadTime = Date.now();
    return cachedArticles;
  }
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
