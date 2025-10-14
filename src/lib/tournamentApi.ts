import { TournamentApiResponse, TournamentEvent } from '@/types/tournament';

const RAPIDAPI_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '517cb09524mshf243e8dc1b88e58p19efabjsne4e46b59b3c8';
const RAPIDAPI_HOST = 'live-golf-data1.p.rapidapi.com';

export async function fetchTournamentData(eventId: string): Promise<TournamentEvent | null> {
  try {
    const response = await fetch(
      `https://${RAPIDAPI_HOST}/leaderboard?league=lpga&eventId=${eventId}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': RAPIDAPI_HOST,
          'x-rapidapi-key': RAPIDAPI_KEY,
        },
        // Cache for 5 minutes to avoid excessive API calls
        next: { revalidate: 300 }
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch tournament data:', response.status, response.statusText);
      return null;
    }

    const data: TournamentApiResponse = await response.json();
    
    if (!data.events || data.events.length === 0) {
      console.error('No tournament events found in API response');
      return null;
    }

    return data.events[0]; // Return the first (and typically only) event
  } catch (error) {
    console.error('Error fetching tournament data:', error);
    return null;
  }
}

// Helper function to format purse amount
export function formatPurse(purse: number): string {
  if (purse >= 1000000) {
    return `$${(purse / 1000000).toFixed(1)}M`;
  } else if (purse >= 1000) {
    return `$${(purse / 1000).toFixed(0)}K`;
  } else {
    return `$${purse.toLocaleString()}`;
  }
}

// Helper function to format location
export function formatLocation(course: any): string {
  if (course?.address) {
    const city = course.address.city;
    const state = course.address.state;
    const country = course.address.country;
    
    // If state exists, use it (for US locations)
    if (state) {
      return `${city}, ${state}`;
    }
    // If no state but has country, use country (for international locations)
    if (country) {
      return `${city}, ${country}`;
    }
    // Fallback to just city
    return city || 'Location TBD';
  }
  return 'Location TBD';
}

// Helper function to get course name
export function getCourseName(courses: any[]): string {
  const hostCourse = courses?.find(course => course.host);
  return hostCourse?.name || 'Course TBD';
}
