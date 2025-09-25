'use client';

import { useState, useEffect } from 'react';
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

interface UseTournamentAndWeatherReturn {
  tournamentData: TournamentEvent | null;
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
}

const defaultFallbackWeather: WeatherData = {
  type: 'Forecast',
  displayValue: 'Partly sunny',
  conditionId: '3',
  zipCode: '72758',
  temperature: 72,
  lowTemperature: 72,
  highTemperature: 72,
  precipitation: 24,
  gust: 12,
  windSpeed: 5,
  windDirection: 'WSW',
  lastUpdated: new Date().toISOString(),
};

// Shared cache for API responses
const cache = new Map<string, {
  data: any;
  timestamp: number;
  tournamentData: TournamentEvent | null;
  weatherData: WeatherData;
}>();

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const RAPIDAPI_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '517cb09524mshf243e8dc1b88e58p19efabjsne4e46b59b3c8';
const RAPIDAPI_HOST = 'live-golf-data1.p.rapidapi.com';

function parseWeatherFromAPI(apiData: any): WeatherData {
  const weatherInfo = apiData.events?.[0]?.courses?.[0]?.weather;
  
  if (weatherInfo) {
    return {
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
    };
  }
  
  return defaultFallbackWeather;
}

function parseTournamentFromAPI(apiData: any): TournamentEvent | null {
  if (!apiData.events || apiData.events.length === 0) {
    console.error('No tournament events found in API response');
    return null;
  }
  
  return apiData.events[0];
}

async function fetchTournamentAndWeatherData(eventId: string): Promise<{
  tournamentData: TournamentEvent | null;
  weatherData: WeatherData;
}> {
  // Check cache first
  const cacheKey = eventId;
  const cached = cache.get(cacheKey);
  
  if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
    console.log('Using cached tournament and weather data');
    return {
      tournamentData: cached.tournamentData,
      weatherData: cached.weatherData
    };
  }

  try {
    // Add timeout to prevent hanging
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

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
      console.error('Failed to fetch tournament data:', response.status, response.statusText);
      
      // Handle client errors (400-499) gracefully
      if (response.status >= 400 && response.status < 500) {
        console.warn(`⚠️ Client error ${response.status} for tournament data. Using fallback.`);
        return { tournament: null, weather: null }; // Return fallback data instead of throwing
      }
      
      throw new Error(`API request failed: ${response.status}`);
    }

    const apiData = await response.json();
    
    // Parse both tournament and weather data from the same response
    const tournamentData = parseTournamentFromAPI(apiData);
    const weatherData = parseWeatherFromAPI(apiData);

    // Cache the result
    cache.set(cacheKey, {
      data: apiData,
      timestamp: Date.now(),
      tournamentData,
      weatherData
    });

    console.log('Fetched and cached fresh tournament and weather data');
    
    return { tournamentData, weatherData };

  } catch (error) {
    console.error('Error fetching tournament and weather data:', error);
    
    // Return cached data if available, even if expired
    if (cached) {
      console.log('Using expired cached data as fallback');
      return {
        tournamentData: cached.tournamentData,
        weatherData: cached.weatherData
      };
    }
    
    // Final fallback
    throw error;
  }
}

export function useTournamentAndWeather(eventId: string): UseTournamentAndWeatherReturn {
  const [tournamentData, setTournamentData] = useState<TournamentEvent | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(defaultFallbackWeather);
  const [loading, setLoading] = useState(false); // Start with false for immediate display
  const [error, setError] = useState<string | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    // Don't fetch if no eventId provided (for lazy loading)
    if (!eventId) {
      return;
    }

    let isMounted = true;

    async function loadData() {
      try {
        setLoading(true);
        setError(null);
        
        const { tournamentData: tournament, weatherData } = await fetchTournamentAndWeatherData(eventId);
        
        if (isMounted) {
          setTournamentData(tournament);
          setWeather(weatherData);
          setHasLoaded(true);
        }
      } catch (err) {
        if (isMounted) {
          const errorMessage = err instanceof Error ? err.message : 'Failed to load data';
          setError(errorMessage);
          
          // Keep fallback weather data even on error
          setWeather(defaultFallbackWeather);
          setHasLoaded(true);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    // Only load data if we haven't loaded it yet
    if (!hasLoaded) {
      loadData();
    }

    return () => {
      isMounted = false;
    };
  }, [eventId, hasLoaded]);

  return { tournamentData, weather, loading, error };
}

// Utility function to clear cache (useful for testing or manual refresh)
export function clearTournamentCache() {
  cache.clear();
  console.log('Tournament and weather cache cleared');
}

// Utility function to get cache info (useful for debugging)
export function getCacheInfo() {
  const cacheEntries = Array.from(cache.entries()).map(([key, value]) => ({
    eventId: key,
    age: Date.now() - value.timestamp,
    isExpired: (Date.now() - value.timestamp) > CACHE_DURATION
  }));
  
  return {
    size: cache.size,
    entries: cacheEntries
  };
}
