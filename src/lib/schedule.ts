import scheduleData from '@/data/schedule.json';
import { fetchLPGAScheduleData, findMatchingEvent, normalizeEventName } from './lpgaApi';

export interface Tournament {
  id: number;
  date: string;
  title: string;
  location: string;
  purse: string;
  isMajor: boolean;
  isExhibition?: boolean;
  isCancelled?: boolean;
  website: string;
  winner?: string;
  logo?: string;
  score?: string;
  prize?: string;
}

export interface Schedule {
  year: number;
  lastUpdated: string;
  tournaments: Tournament[];
}

export function getSchedule(): Schedule {
  return scheduleData as Schedule;
}

export async function getEnhancedSchedule(): Promise<Schedule> {
  try {
    const apiEvents = await fetchLPGAScheduleData();
    
    // List of future tournaments that should not have winner/score data populated
    const futureTournaments = [
      'BMW Ladies Championship',
      'Maybank Championship',
      'TOTO Japan Classic',
      'The ANNIKA driven by Gainbridge at Pelican',
      'CME Group Tour Championship'
    ];
    
    const enhancedTournaments = scheduleData.tournaments.map(tournament => {
      // Skip API data for future tournaments
      if (futureTournaments.includes(tournament.title)) {
        return {
          ...tournament,
          winner: '',
          score: undefined,
          prize: undefined
        };
      }
      
      // Find matching event from API for completed tournaments
      const matchingEvent = apiEvents.find(event => 
        findMatchingEvent(event.name, tournament.title)
      );

      if (matchingEvent) {
        // For Walmart NW Arkansas, Buick LPGA Shanghai, and LOTTE Championship, prioritize our local data over API data
        if (tournament.title === 'Walmart NW Arkansas Championship presented by P&G' ||
            tournament.title === 'Buick LPGA Shanghai' ||
            tournament.title === 'LOTTE Championship presented by Hoakalei') {
          return {
            ...tournament,
            // Keep our local data for this tournament
            score: tournament.score || matchingEvent.score || undefined,
            prize: tournament.prize || matchingEvent.prize || undefined,
            winner: tournament.winner || matchingEvent.athlete?.name || undefined
          };
        }
        
        return {
          ...tournament,
          score: matchingEvent.score || undefined,
          prize: matchingEvent.prize || undefined,
          // Update winner if it exists in API and we don't have it locally
          winner: tournament.winner || matchingEvent.athlete?.name || undefined
        };
      }

      return tournament;
    });

    return {
      ...scheduleData,
      tournaments: enhancedTournaments
    } as Schedule;
  } catch (error) {
    console.error('Error enhancing schedule with API data:', error);
    return scheduleData as Schedule;
  }
}

export function getTournaments(): Tournament[] {
  return scheduleData.tournaments as Tournament[];
}

export function getMajorTournaments(): Tournament[] {
  return scheduleData.tournaments.filter(t => t.isMajor) as Tournament[];
}

export function getUpcomingTournaments(): Tournament[] {
  const today = new Date();
  const currentYear = today.getFullYear();
  
  return scheduleData.tournaments.filter(tournament => {
    // For 2025, all tournaments are upcoming
    if (currentYear === 2025) return true;
    
    // For future years, all tournaments are upcoming
    if (currentYear < 2025) return true;
    
    // For past years, none are upcoming
    return false;
  }) as Tournament[];
}
