/**
 * Static Tournament Data Generator
 * 
 * This module automatically captures and stores the current API response
 * to use as static fallback data, ensuring perfect visual consistency
 * between static and live content.
 */

import { TournamentEvent } from '@/types/tournament';

interface WeatherData {
  type: string;
  displayValue: string;
  conditionId: string;
  zipCode: string;
  temperature: number;
  lowTemperature: number;
  highTemperature: number;
  precipitation: number;
  gust: number;
  windSpeed: number;
  windDirection: string;
  lastUpdated: string;
}

interface StaticTournamentData {
  tournamentData: TournamentEvent | null;
  weatherData: WeatherData;
  lastUpdated: string;
  eventId: string;
}

// In-memory cache for static data
const staticDataCache = new Map<string, StaticTournamentData>();

// Default fallback data (matches current API data)
const DEFAULT_STATIC_DATA: StaticTournamentData = {
  tournamentData: null,
  weatherData: {
    type: 'Forecast',
    displayValue: 'Mostly cloudy w/ showers',
    conditionId: '13',
    zipCode: '96706',
    temperature: 80,
    lowTemperature: 72,
    highTemperature: 89,
    precipitation: 55,
    gust: 12,
    windSpeed: 10,
    windDirection: 'ENE',
    lastUpdated: new Date().toISOString(),
  },
  lastUpdated: new Date().toISOString(),
  eventId: '401734786'
};

/**
 * Captures current API response and stores it as static fallback data
 */
export async function captureStaticTournamentData(eventId: string): Promise<StaticTournamentData> {
  const RAPIDAPI_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '517cb09524mshf243e8dc1b88e58p19efabjsne4e46b59b3c8';
  const RAPIDAPI_HOST = 'live-golf-data1.p.rapidapi.com';

  console.log(`🔄 Capturing static tournament data for event: ${eventId}`);
  console.log(`📱 User Agent: ${typeof window !== 'undefined' ? window.navigator.userAgent : 'Server'}`);

  // Check if we already have recent cached data to avoid unnecessary API calls
  const cached = staticDataCache.get(eventId);
  if (cached && cached.lastUpdated) {
    const cacheAge = Date.now() - new Date(cached.lastUpdated).getTime();
    const maxCacheAge = 24 * 60 * 60 * 1000; // 24 hours
    
    if (cacheAge < maxCacheAge) {
      console.log(`✅ Using cached data (age: ${Math.round(cacheAge / 1000 / 60)} minutes)`);
      return cached;
    }
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(
      `https://${RAPIDAPI_HOST}/leaderboard?league=lpga&eventId=${eventId}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': RAPIDAPI_HOST,
          'x-rapidapi-key': RAPIDAPI_KEY,
        },
        signal: controller.signal
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorMessage = `API request failed: ${response.status}`;
      
      // Try to get more detailed error information
      try {
        const errorData = await response.json();
        if (errorData.message) {
          errorMessage += ` - ${errorData.message}`;
        }
      } catch {
        // If we can't parse the error response, just use the status
      }
      
      // Log the error for debugging
      console.error('Tournament API Error:', {
        status: response.status,
        statusText: response.statusText,
        url: `https://${RAPIDAPI_HOST}/leaderboard?league=lpga&eventId=${eventId}`,
        eventId
      });
      
      // Special handling for client errors (400-499) - don't throw, use fallback
      if (response.status >= 400 && response.status < 500) {
        console.warn(`⚠️ Client error ${response.status} for event ID ${eventId}. Using fallback data.`);
        // Don't throw error for client errors, just use fallback
        const cached = staticDataCache.get(eventId);
        if (cached) {
          console.log(`Using cached static tournament data for ${response.status} error`);
          return cached;
        }
        return DEFAULT_STATIC_DATA;
      }
      
      throw new Error(errorMessage);
    }

    const apiData = await response.json();
    
    // Parse tournament data
    const tournamentData = apiData.events?.[0] || null;
    
    // Parse weather data
    const weatherInfo = apiData.events?.[0]?.courses?.[0]?.weather;
    const weatherData: WeatherData = weatherInfo ? {
      type: weatherInfo.type || 'Forecast',
      displayValue: weatherInfo.displayValue || 'Mostly sunny',
      conditionId: weatherInfo.conditionId?.toString() || '2',
      zipCode: weatherInfo.zipCode || '72758',
      temperature: Math.round(weatherInfo.temperature || 72),
      lowTemperature: Math.round(weatherInfo.lowTemperature || 65),
      highTemperature: Math.round(weatherInfo.highTemperature || 78),
      precipitation: Math.round(weatherInfo.precipitation || 20),
      gust: Math.round(weatherInfo.gust || 7),
      windSpeed: Math.round(weatherInfo.windSpeed || 4),
      windDirection: weatherInfo.windDirection || 'S',
      lastUpdated: weatherInfo.lastUpdated || new Date().toISOString(),
    } : DEFAULT_STATIC_DATA.weatherData;

    const staticData: StaticTournamentData = {
      tournamentData,
      weatherData,
      lastUpdated: new Date().toISOString(),
      eventId
    };

    // Store in cache
    staticDataCache.set(eventId, staticData);
    
    // Also store in localStorage for persistence
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(`static_tournament_data_${eventId}`, JSON.stringify(staticData));
      } catch (error) {
        console.warn('Failed to save static tournament data to localStorage:', error);
      }
    }

    console.log(`✅ Captured static tournament data for event ${eventId}`);
    return staticData;

  } catch (error) {
    console.error('Failed to capture static tournament data:', error);
    
    // Return cached data if available
    const cached = staticDataCache.get(eventId);
    if (cached) {
      console.log('Using cached static tournament data');
      return cached;
    }
    
    // Final fallback
    return DEFAULT_STATIC_DATA;
  }
}

/**
 * Gets static tournament data for an event
 * Automatically captures fresh data if not available
 */
export async function getStaticTournamentData(eventId: string): Promise<StaticTournamentData> {
  // Check in-memory cache first
  const cached = staticDataCache.get(eventId);
  if (cached) {
    return cached;
  }

  // Check localStorage cache
  if (typeof window !== 'undefined') {
    try {
      const storedData = localStorage.getItem(`static_tournament_data_${eventId}`);
      if (storedData) {
        const parsed = JSON.parse(storedData);
        staticDataCache.set(eventId, parsed);
        return parsed;
      }
    } catch (error) {
      console.warn('Failed to read static tournament data from localStorage:', error);
    }
  }

  // Capture fresh data
  return await captureStaticTournamentData(eventId);
}

/**
 * Updates static data with fresh API response
 * Call this periodically to keep static data current
 */
export async function refreshStaticTournamentData(eventId: string): Promise<StaticTournamentData> {
  console.log(`🔄 Refreshing static tournament data for event ${eventId}`);
  return await captureStaticTournamentData(eventId);
}

/**
 * Gets static data synchronously (for immediate use)
 * Returns default data if not yet captured
 */
export function getStaticTournamentDataSync(eventId: string): StaticTournamentData {
  // Check in-memory cache first
  const cached = staticDataCache.get(eventId);
  if (cached) {
    return cached;
  }

  // Check localStorage cache
  if (typeof window !== 'undefined') {
    try {
      const storedData = localStorage.getItem(`static_tournament_data_${eventId}`);
      if (storedData) {
        const parsed = JSON.parse(storedData);
        staticDataCache.set(eventId, parsed);
        return parsed;
      }
    } catch (error) {
      console.warn('Failed to read static tournament data from localStorage:', error);
    }
  }

  // Return default data
  return DEFAULT_STATIC_DATA;
}

/**
 * Clears all static data cache
 */
export function clearStaticTournamentDataCache(): void {
  staticDataCache.clear();
  
  if (typeof window !== 'undefined') {
    try {
      // Clear all static tournament data from localStorage
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith('static_tournament_data_')) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.warn('Failed to clear static tournament data from localStorage:', error);
    }
  }
  
  console.log('🧹 Cleared all static tournament data cache');
}

/**
 * Gets cache info for debugging
 */
export function getStaticDataCacheInfo() {
  const cacheEntries = Array.from(staticDataCache.entries()).map(([key, value]) => ({
    eventId: key,
    lastUpdated: value.lastUpdated,
    hasTournamentData: !!value.tournamentData,
    hasWeatherData: !!value.weatherData
  }));
  
  return {
    size: staticDataCache.size,
    entries: cacheEntries
  };
}
