import scheduleData from '@/data/schedule.json';

export interface Tournament {
  id: number;
  date: string;
  title: string;
  location: string;
  purse: string;
  isMajor: boolean;
  isExhibition?: boolean;
  website: string;
}

export interface Schedule {
  year: number;
  lastUpdated: string;
  tournaments: Tournament[];
}

export function getSchedule(): Schedule {
  return scheduleData as Schedule;
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
