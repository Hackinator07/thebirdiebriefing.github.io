import podcastsData from '@/data/podcasts.json';
import rankingsData from '@/data/rankings.json';
import articlesData from '@/data/articles.json';
import configData from '@/data/config.json';
import biosData from '@/data/bios.json';

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

export interface ArticleSection {
  type: 'links' | 'tv-schedule' | 'field-data';
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
  data?: {
    pastChampions?: string[];
    lpga2025Winners?: string[];
    rolexTop25?: string[];
    rookies2025?: string[];
    sponsorExemptions?: string[];
    mondayQualifiers?: string[];
  };
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
  featured?: boolean;
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

interface TeamMember {
  name: string;
  title: string;
  image: string;
  imageAlt: string;
  bio: string[];
}

interface Mission {
  title: string;
  description: string;
  content: string[];
}

interface Contact {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}

interface Bios {
  team: {
    marie: TeamMember;
    george: TeamMember;
  };
  mission: Mission;
  contact: Contact;
}



export function getPodcastEpisodes(): PodcastEpisode[] {
  return podcastsData.episodes;
}

export function getArticles(): Article[] {
  const articles = articlesData.articles as Article[];
  // Return articles in the order they appear in the JSON file
  return articles;
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articlesData.articles.find(article => article.slug === slug) as Article | undefined;
}

export function getLatestArticle(): Article | undefined {
  return articlesData.articles[0] as Article | undefined;
}

export function getFeaturedArticle(): Article | undefined {
  const articles = articlesData.articles as Article[];
  return articles.find(article => article.featured === true);
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

export function getBios(): Bios {
  return biosData as Bios;
}

export function getTeamMember(memberId: 'marie' | 'george'): TeamMember | null {
  const bios = biosData as Bios;
  return bios.team[memberId] || null;
}

export function getMission(): Mission {
  const bios = biosData as Bios;
  return bios.mission;
}

export function getContact(): Contact {
  const bios = biosData as Bios;
  return bios.contact;
}
