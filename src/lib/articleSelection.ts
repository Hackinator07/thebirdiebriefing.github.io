import { Article } from './data';

/**
 * Selects a diverse article using multiple strategies
 * @param articles - Array of articles sorted by date (newest first)
 * @param strategies - Array of selection strategies to use
 * @returns Selected article or undefined if no articles available
 */
export function selectDiverseArticle(
  articles: Article[],
  strategies: ArticleSelectionStrategy[] = ['recent-random', 'category-rotation', 'time-based']
): Article | undefined {
  if (articles.length === 0) return undefined;

  // Try each strategy in order until we find a suitable article
  for (const strategy of strategies) {
    const article = selectArticleByStrategy(articles, strategy);
    if (article) return article;
  }

  // Fallback to most recent article
  return articles[0];
}

export type ArticleSelectionStrategy = 
  | 'recent-random' 
  | 'category-rotation' 
  | 'time-based' 
  | 'most-recent';

/**
 * Selects an article based on the specified strategy
 */
function selectArticleByStrategy(articles: Article[], strategy: ArticleSelectionStrategy): Article | undefined {
  switch (strategy) {
    case 'recent-random':
      return selectRecentRandomArticle(articles);
    
    case 'category-rotation':
      return selectCategoryRotatedArticle(articles);
    
    case 'time-based':
      return selectTimeBasedArticle(articles);
    
    case 'most-recent':
      return articles[0];
    
    default:
      return articles[0];
  }
}

/**
 * Selects a random article from the most recent articles (last 5-10)
 */
function selectRecentRandomArticle(articles: Article[]): Article | undefined {
  const recentCount = Math.min(10, Math.max(5, Math.floor(articles.length * 0.3)));
  const recentArticles = articles.slice(0, recentCount);
  
  if (recentArticles.length === 0) return undefined;
  
  const randomIndex = Math.floor(Math.random() * recentArticles.length);
  return recentArticles[randomIndex];
}

/**
 * Selects an article based on category rotation using time-based seeding
 */
function selectCategoryRotatedArticle(articles: Article[]): Article | undefined {
  // Get unique categories
  const categories = [...new Set(articles.map(article => article.category))];
  if (categories.length === 0) return undefined;

  // Use day of year to determine which category to show
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const categoryIndex = dayOfYear % categories.length;
  const targetCategory = categories[categoryIndex];

  // Find the most recent article in that category
  const categoryArticles = articles.filter(article => article.category === targetCategory);
  return categoryArticles[0];
}

/**
 * Selects an article based on time-based rotation (different article every few hours)
 */
function selectTimeBasedArticle(articles: Article[]): Article | undefined {
  // Change article every 6 hours
  const hoursPerRotation = 6;
  const currentHour = new Date().getHours();
  const rotationIndex = Math.floor(currentHour / hoursPerRotation);
  
  // Use a larger pool for time-based selection (last 20 articles)
  const poolSize = Math.min(20, articles.length);
  const articlePool = articles.slice(0, poolSize);
  
  if (articlePool.length === 0) return undefined;
  
  const articleIndex = rotationIndex % articlePool.length;
  return articlePool[articleIndex];
}

/**
 * Selects multiple diverse articles for display
 * @param articles - Array of articles sorted by date (newest first)
 * @param count - Number of articles to select (default: 2)
 * @returns Array of selected articles
 */
export function selectDiverseArticles(articles: Article[], count: number = 2): Article[] {
  if (articles.length === 0) return [];
  
  const selected: Article[] = [];
  const usedIds = new Set<string>();
  
  // First, try to get one article from each major category
  const categories = [...new Set(articles.map(article => article.category))];
  const categoriesPerArticle = Math.max(1, Math.floor(count / categories.length));
  
  for (const category of categories) {
    if (selected.length >= count) break;
    
    const categoryArticles = articles
      .filter(article => article.category === category && !usedIds.has(article.id))
      .slice(0, categoriesPerArticle);
    
    for (const article of categoryArticles) {
      if (selected.length >= count) break;
      selected.push(article);
      usedIds.add(article.id);
    }
  }
  
  // Fill remaining slots with recent random articles
  while (selected.length < count && selected.length < articles.length) {
    const remainingArticles = articles.filter(article => !usedIds.has(article.id));
    if (remainingArticles.length === 0) break;
    
    const randomIndex = Math.floor(Math.random() * remainingArticles.length);
    const selectedArticle = remainingArticles[randomIndex];
    selected.push(selectedArticle);
    usedIds.add(selectedArticle.id);
  }
  
  return selected;
}

/**
 * Gets article selection statistics for debugging
 */
export function getSelectionStats(articles: Article[]): {
  totalArticles: number;
  categories: string[];
  recentArticles: number;
  oldestArticle: string;
  newestArticle: string;
} {
  const categories = [...new Set(articles.map(article => article.category))];
  const recentCount = Math.min(10, Math.max(5, Math.floor(articles.length * 0.3)));
  
  return {
    totalArticles: articles.length,
    categories,
    recentArticles: recentCount,
    oldestArticle: articles[articles.length - 1]?.date || 'N/A',
    newestArticle: articles[0]?.date || 'N/A'
  };
}
