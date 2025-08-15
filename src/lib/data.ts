
import configData from '@/data/config.json';

export interface SiteConfig {
  siteName: string;
  featuredArticleId: string;
}

export interface ArticleSection {
  type: 'links' | 'tv-schedule' | 'field-data' | 'field-table';
  title: string;
  links?: Array<{
    text: string;
    url: string;
    description: string;
  }>;
  schedule?: Array<{
    day: string;
    times: string[];
  }>;
  data?: Record<string, string[]>;
  headers?: string[];
  tableData?: string[][];
  backgroundColor?: string;
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
  sections?: ArticleSection[];
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







// Re-export article functions from the articles module
export { getArticles, getArticleBySlug, getLatestArticle, getFeaturedArticle } from './articles';

// Re-export rankings function from the rankings module
export { getRankings } from './rankings';

export function getConfig(): SiteConfig {
  return configData as SiteConfig;
}

// Re-export callout functions from the callouts module
export { getAuthor, getAuthorCallout, getAllAuthors, getAllCallouts, updateCallout } from './callouts';

// Legacy function for backward compatibility
export async function getCallout(type: string = 'author'): Promise<string> {
  const { getAuthorCallout } = await import('./callouts');
  return getAuthorCallout('george-hack', type);
}

export function formatDate(dateString: string): string {
  // Expecting an ISO date without time (YYYY-MM-DD). Parse as a pure calendar date
  // to avoid timezone shifts that can move the date back a day locally.
  const parts = dateString.split('-');

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  if (parts.length === 3) {
    const year = Number(parts[0]);
    const monthIndex = Number(parts[1]) - 1; // 0-based
    const day = Number(parts[2]);

    if (
      Number.isFinite(year) &&
      Number.isFinite(monthIndex) &&
      monthIndex >= 0 && monthIndex <= 11 &&
      Number.isFinite(day)
    ) {
      return `${months[monthIndex]} ${day}, ${year}`;
    }
  }

  // Fallback: try Date parsing and use UTC getters to avoid local TZ skew
  const date = new Date(dateString);
  const month = months[date.getUTCMonth()] ?? '';
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  return `${month} ${day}, ${year}`;
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

// Re-export bios functions from the bios module
export { getBios, getTeamMember, getMission, getContact } from './bios';
