import rankingsData from '@/data/rankings.json';
import cmeGlobeData from '@/data/cme-globe-rankings.json';
import moneyListData from '@/data/money-list-rankings.json';
import aonRiskRewardData from '@/data/aon-risk-reward-rankings.json';
import usSolheimCupData from '@/data/us-solheim-cup-rankings.json';
import europeSolheimCupData from '@/data/europe-solheim-cup-rankings.json';
import { Rankings, UsSolheimCupRankings, SolheimCupRankings, SolheimCupPlayer } from './data';

// Re-export for convenience
export type { SolheimCupPlayer };

export interface CmeGlobePlayer {
  id: number;
  rank: number;
  fullName: string;
  countryCode: string;
  points: number;
  events: number;
}

export interface MoneyListPlayer {
  id: number;
  rank: number;
  fullName: string;
  countryCode: string;
  earnings: number;
  events: number;
}

export interface AonRiskRewardPlayer {
  id: number;
  rank: number;
  fullName: string;
  countryCode: string;
  points: number;
  arrcHolesPlayed: number;
  roundsToGo: number;
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

export interface MoneyListRankings {
  lastUpdated: string;
  type: string;
  players: MoneyListPlayer[];
  week: {
    start_date: string;
    end_date: string;
  };
}

export interface AonRiskRewardRankings {
  lastUpdated: string;
  type: string;
  players: AonRiskRewardPlayer[];
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

export function getMoneyListRankings(): MoneyListRankings {
  return moneyListData;
}

export function getAonRiskRewardRankings(): AonRiskRewardRankings {
  return aonRiskRewardData;
}

export function getUsSolheimCupRankings(): UsSolheimCupRankings {
  return usSolheimCupData as UsSolheimCupRankings;
}

export function getEuropeSolheimCupRankings(): SolheimCupRankings {
  return europeSolheimCupData as SolheimCupRankings;
}
