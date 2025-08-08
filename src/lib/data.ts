import newsData from '@/data/news.json';
import podcastsData from '@/data/podcasts.json';
import cocktailsData from '@/data/cocktails.json';
import rankingsData from '@/data/rankings.json';
import articlesData from '@/data/articles.json';

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



export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
