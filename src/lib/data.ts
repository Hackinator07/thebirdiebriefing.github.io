import newsData from '@/data/news.json';
import podcastsData from '@/data/podcasts.json';
import cocktailsData from '@/data/cocktails.json';
import rankingsData from '@/data/rankings.json';
import articlesData from '@/data/articles.json';
import configData from '@/data/config.json';

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  author: string;
  image?: string;
}

export interface PodcastEpisode {
  id: string;
  title: string;
  description: string;
  duration: string;
  date: string;
  platforms: {
    spotify?: string;
    apple?: string;
    google?: string;
    amazon?: string;
  };
}



export interface Cocktail {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  garnish: string;
  image?: string;
}



export interface Article {
  id: string;
  slug: string;
  title: string;
  author: string;
  authorId?: string;
  date: string;
  category: string;
  excerpt: string;
  content: string[];
  image: {
    src: string;
    alt: string;
    caption: string;
    courtesy: string;
  };
  callout?: string;
  calloutType?: string;
  tags: string[];
}

export interface RankingPlayer {
  id: number;
  rank: number;
  rankDelta: number;
  nameFirst: string;
  nameLast: string;
  fullName: string;
  countryCode: string;
  pointsAverage: number;
  pointsTotal: number;
  tournamentCount: number;
}

export interface RankingsWeek {
  id: number;
  start_date: string;
  end_date: string;
  publish_date: string;
  updated_datetime: string;
  prev_id: number;
  next_id: number | null;
  prev_date: string;
  next_date: string | null;
}

export interface Rankings {
  lastUpdated: string;
  week: RankingsWeek;
  players: RankingPlayer[];
}

interface Author {
  name: string;
  email: string;
  callouts: Record<string, string>;
}



export function getNewsArticles(): NewsArticle[] {
  return newsData.articles;
}

export function getNewsArticle(slug: string): NewsArticle | undefined {
  return newsData.articles.find(article => article.slug === slug);
}

export function getPodcastEpisodes(): PodcastEpisode[] {
  return podcastsData.episodes;
}



export function getCocktails(): Cocktail[] {
  return cocktailsData.cocktails;
}



export function getArticles(): Article[] {
  return articlesData.articles;
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articlesData.articles.find(article => article.slug === slug);
}

export function getLatestArticle(): Article | undefined {
  return articlesData.articles[0];
}



export function getRankings(): Rankings {
  return rankingsData;
}

export function getConfig() {
  return configData;
}

export function getAuthor(authorId: string): Author | null {
  const authors = configData.authors as Record<string, Author>;
  return authors[authorId] || null;
}

export function getAuthorCallout(authorId: string, calloutType: string = 'author'): string {
  const author = getAuthor(authorId);
  if (!author) {
    // Fallback to default author if author not found
    const defaultAuthor = getAuthor('george-hack');
    return defaultAuthor?.callouts[calloutType] || 'Contact us for more information.';
  }
  return author.callouts[calloutType] || author.callouts.author || 'Contact us for more information.';
}

export function getCallout(type: string = 'author'): string {
  // Legacy function - now uses default author
  return getAuthorCallout('george-hack', type);
}

export function getAllAuthors(): Record<string, Author> {
  return configData.authors as Record<string, Author>;
}

export function getAllCallouts(): Record<string, string> {
  // Legacy function - returns default author's callouts
  const defaultAuthor = getAuthor('george-hack');
  return defaultAuthor?.callouts || {};
}

export function updateCallout(authorId: string, type: string, newMessage: string): void {
  // This function can be used to update callout messages
  // In a real application, you might want to persist this to a database
  console.log(`Callout "${type}" for author "${authorId}" updated to: ${newMessage}`);
}


export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function calculateReadTime(content: string[]): number {
  // Average reading speed is 200-250 words per minute
  // We'll use 225 words per minute as a reasonable average
  const wordsPerMinute = 225;

  // Count total words across all content paragraphs
  const totalWords = content.reduce((count, paragraph) => {
    return count + paragraph.split(' ').length;
  }, 0);

  // Calculate reading time in minutes
  const readTimeMinutes = Math.ceil(totalWords / wordsPerMinute);

  return readTimeMinutes;
}
