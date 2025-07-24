import newsData from '@/data/news.json';
import podcastsData from '@/data/podcasts.json';
import eventsData from '@/data/events.json';
import cocktailsData from '@/data/cocktails.json';
import weeklyUpdatesData from '@/data/weekly-updates.json';
import coursesData from '@/data/courses.json';
import rankingsData from '@/data/rankings.json';
import instagramPostsData from '@/data/instagram-posts.json';

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

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  price: string;
  image?: string;
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

export interface WeeklyUpdate {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
}

export interface Course {
  id: string;
  name: string;
  location: string;
  description: string;
  image: string;
  slug: string;
  website: string;
  phone: string;
  address: string;
  content: {
    overview: string;
    details: string;
    conclusion: string;
  };
  access: {
    gettingThere: string;
    amenities: string[];
    bestTimes: string;
    nearbyAttractions: string[];
  };
}

export interface State {
  name: string;
  abbreviation: string;
  courses: Course[];
}

export interface FeaturedCourse {
  id: string;
  name: string;
  location: string;
  description: string;
  image: string;
  slug: string;
  website: string;
  phone: string;
  address: string;
}

export interface RankingPlayer {
  id: string;
  name: string;
  country: string;
  points?: string;
  earnings?: string;
  events: string;
}

export interface Rankings {
  rolexWorldRanking: RankingPlayer[];
  raceToCmeGlobe: RankingPlayer[];
  lpgaMoneyList: RankingPlayer[];
  raceForTheCard: RankingPlayer[];
  epsonMoneyList: RankingPlayer[];
  information: {
    rolexWorldRanking: {
      title: string;
      description: string;
      details: string;
    };
    raceToCmeGlobe: {
      title: string;
      description: string;
      details: string;
    };
    lpgaMoneyList: {
      title: string;
      description: string;
      details: string;
    };
    epsonTourRankings: {
      title: string;
      description: string;
      details: string;
    };
  };
}

export interface InstagramPost {
  id: string;
  url: string;
  title: string;
  description: string;
  category: string;
  featured: boolean;
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

export function getEvents(): Event[] {
  return eventsData.events;
}

export function getCocktails(): Cocktail[] {
  return cocktailsData.cocktails;
}

export function getLatestWeeklyUpdate(): WeeklyUpdate | undefined {
  return weeklyUpdatesData.updates[0];
}

export function getStates(): State[] {
  return coursesData.states;
}

export function getFeaturedCourse(): FeaturedCourse {
  return coursesData.featuredCourse;
}

export function getCourseBySlug(slug: string): Course | undefined {
  for (const state of coursesData.states) {
    const course = state.courses.find(course => course.slug === slug);
    if (course) return course;
  }
  return undefined;
}

export function getRankings(): Rankings {
  return rankingsData;
}

export function getInstagramPosts(): InstagramPost[] {
  return instagramPostsData.posts;
}

export function getFeaturedInstagramPosts(): InstagramPost[] {
  return instagramPostsData.posts.filter(post => post.featured);
}

export function getInstagramPostsByCategory(category: string): InstagramPost[] {
  return instagramPostsData.posts.filter(post => post.category === category);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
