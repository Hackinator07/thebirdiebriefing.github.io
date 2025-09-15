import { Article } from './data';

/**
 * Find related articles based on multiple similarity factors
 */
export function getRelatedArticles(
  currentArticle: Article,
  allArticles: Article[],
  maxResults: number = 3
): Article[] {
  // Exclude the current article
  const otherArticles = allArticles.filter(article => article.id !== currentArticle.id);
  
  if (otherArticles.length === 0) return [];

  // Calculate similarity scores for each article
  const scoredArticles = otherArticles.map(article => ({
    article,
    score: calculateSimilarityScore(currentArticle, article)
  }));

  // Sort by score (highest first) and return top results
  return scoredArticles
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
    .map(item => item.article);
}

/**
 * Calculate similarity score between two articles
 */
function calculateSimilarityScore(article1: Article, article2: Article): number {
  let score = 0;

  // Same category gets high weight (40 points)
  if (article1.category === article2.category) {
    score += 40;
  }

  // Common tags (5 points per shared tag)
  const commonTags = article1.tags.filter(tag => 
    article2.tags.some(otherTag => 
      otherTag.toLowerCase() === tag.toLowerCase()
    )
  );
  score += commonTags.length * 5;

  // Same author (15 points)
  if (article1.author === article2.author) {
    score += 15;
  }

  // Recent articles get slight preference (up to 10 points based on recency)
  const daysDiff = Math.abs(
    (new Date(article1.date).getTime() - new Date(article2.date).getTime()) / (1000 * 60 * 60 * 24)
  );
  const recencyScore = Math.max(0, 10 - (daysDiff / 30)); // Decay over 30 days
  score += recencyScore;

  // Title/content similarity (basic keyword matching)
  const titleSimilarity = calculateTextSimilarity(article1.title, article2.title);
  const excerptSimilarity = calculateTextSimilarity(article1.excerpt, article2.excerpt);
  score += (titleSimilarity + excerptSimilarity) * 2;

  return score;
}

/**
 * Calculate basic text similarity using common words
 */
function calculateTextSimilarity(text1: string, text2: string): number {
  const words1 = text1.toLowerCase().split(/\W+/).filter(word => word.length > 3);
  const words2 = text2.toLowerCase().split(/\W+/).filter(word => word.length > 3);
  
  const commonWords = words1.filter(word => words2.includes(word));
  const totalWords = new Set([...words1, ...words2]).size;
  
  return totalWords > 0 ? (commonWords.length / totalWords) * 10 : 0;
}

/**
 * Get articles from the same category
 */
export function getArticlesByCategory(
  category: string,
  allArticles: Article[],
  excludeId?: string,
  limit: number = 5
): Article[] {
  return allArticles
    .filter(article => 
      article.category === category && 
      article.id !== excludeId
    )
    .slice(0, limit);
}

/**
 * Get trending articles (most recent + popular tags)
 */
export function getTrendingArticles(
  allArticles: Article[],
  excludeId?: string,
  limit: number = 3
): Article[] {
  // Get articles from last 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const recentArticles = allArticles.filter(article => {
    const articleDate = new Date(article.date);
    return articleDate >= thirtyDaysAgo && article.id !== excludeId;
  });

  // If not enough recent articles, fall back to all articles
  const candidateArticles = recentArticles.length >= limit ? recentArticles : 
    allArticles.filter(article => article.id !== excludeId);

  // Score by recency and popular categories
  const popularCategories = ['Tournament Preview', 'LPGA Analysis', 'Tournament Golf'];
  
  const scoredArticles = candidateArticles.map(article => {
    let score = 0;
    
    // Recency score (newer = higher)
    const daysSincePublished = Math.max(0, 
      (Date.now() - new Date(article.date).getTime()) / (1000 * 60 * 60 * 24)
    );
    score += Math.max(0, 30 - daysSincePublished); // Up to 30 points for newest
    
    // Popular category bonus
    if (popularCategories.includes(article.category)) {
      score += 10;
    }
    
    return { article, score };
  });

  return scoredArticles
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.article);
}

/**
 * Get "Continue Reading" suggestions (similar content + recent)
 */
export function getContinueReadingSuggestions(
  currentArticle: Article,
  allArticles: Article[],
  limit: number = 4
): {
  related: Article[];
  trending: Article[];
  category: Article[];
} {
  return {
    related: getRelatedArticles(currentArticle, allArticles, Math.ceil(limit / 2)),
    trending: getTrendingArticles(allArticles, currentArticle.id, Math.ceil(limit / 3)),
    category: getArticlesByCategory(currentArticle.category, allArticles, currentArticle.id, Math.ceil(limit / 3))
  };
}
