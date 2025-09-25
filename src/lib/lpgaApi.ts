interface LPGAEvent {
  name: string;
  startDate: string;
  endDate: string;
  date: string;
  status: string;
  athlete?: {
    name: string;
    flag: string;
    citizenship: string;
    link: string;
  };
  locations: Array<{
    venue: {
      fullName: string;
      skipCityOrNameValidation: boolean;
    };
  }>;
  purse?: string;
  score?: string;
  prize?: string;
  isPostponedOrCanceled: boolean;
  isMajor?: boolean;
}

interface LPGAApiResponse {
  events: LPGAEvent[];
}

export async function fetchLPGAScheduleData(): Promise<LPGAEvent[]> {
  try {
    const response = await fetch('https://live-golf-data1.p.rapidapi.com/schedule?season=2025&league=lpga', {
      headers: {
        'x-rapidapi-host': 'live-golf-data1.p.rapidapi.com',
        'x-rapidapi-key': '517cb09524mshf243e8dc1b88e58p19efabjsne4e46b59b3c8'
      }
    });

    if (!response.ok) {
      // Handle client errors (400-499) gracefully
      if (response.status >= 400 && response.status < 500) {
        console.warn(`⚠️ Client error ${response.status} for LPGA schedule data. Using fallback.`);
        return []; // Return empty array for client errors instead of throwing
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: LPGAApiResponse = await response.json();
    return data.events || [];
  } catch (error) {
    console.error('Error fetching LPGA schedule data:', error);
    return [];
  }
}

export function normalizeEventName(name: string): string {
  // Normalize event names to match our local data
  return name
    .replace(/pres\. by/g, 'presented by')
    .replace(/pres\./g, 'presented')
    .trim();
}

export function findMatchingEvent(eventName: string, localTitle: string): boolean {
  const normalizedApiName = normalizeEventName(eventName).toLowerCase();
  const normalizedLocalName = localTitle.toLowerCase();
  
  // Check if the titles contain the same key words
  const apiWords = normalizedApiName.split(' ').filter(word => word.length > 2);
  const localWords = normalizedLocalName.split(' ').filter(word => word.length > 2);
  
  // Calculate how many words match
  const matchingWords = apiWords.filter(word => 
    localWords.some(localWord => localWord.includes(word) || word.includes(localWord))
  );
  
  // Consider it a match if at least 60% of words match
  return matchingWords.length >= Math.min(apiWords.length, localWords.length) * 0.6;
}
