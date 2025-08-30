import rankingsData from '@/data/rankings.json';
import cmeGlobeData from '@/data/cme-globe-rankings.json';
import { Rankings } from './data';

export interface CmeGlobePlayer {
  id: number;
  rank: number;
  fullName: string;
  countryCode: string;
  points: number;
  events: number;
}

export interface CmeGlobeRankings {
  lastUpdated: string;
  type: string;
  players: CmeGlobePlayer[];
  week: {
    start_date: string;
    end_date: string;
  };
}

export function getRankings(): Rankings {
  return rankingsData;
}

export function getCmeGlobeRankings(): CmeGlobeRankings {
  return cmeGlobeData;
}
