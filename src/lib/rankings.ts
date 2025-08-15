import rankingsData from '@/data/rankings.json';
import { Rankings } from './data';

export function getRankings(): Rankings {
  return rankingsData;
}
