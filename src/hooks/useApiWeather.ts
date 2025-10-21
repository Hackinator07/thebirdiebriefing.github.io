'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

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

interface UseApiWeatherReturn {
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
  refreshWeather: () => Promise<void>;
}

// Default fallback weather data
const defaultFallbackWeather: WeatherData = {
  type: 'Current Conditions',
  displayValue: 'Mostly sunny',
  conditionId: '2',
  zipCode: '96706',
  temperature: 76,
  lowTemperature: 72,
  highTemperature: 89,
  precipitation: 60,
  gust: 15,
  windSpeed: 6,
  windDirection: 'N',
  lastUpdated: new Date().toISOString(),
};

// Cache for API responses
const cache = new Map<string, {
  data: WeatherData;
  timestamp: number;
}>();

const CACHE_DURATION = 60 * 60 * 1000; // 60 minutes
const RAPIDAPI_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '517cb09524mshf243e8dc1b88e58p19efabjsne4e46b59b3c8';
const RAPIDAPI_HOST = 'live-golf-data1.p.rapidapi.com';

/**
 * Parses weather data from API response
 */
function parseWeatherFromAPI(apiData: any): WeatherData {
  const weatherInfo = apiData.events?.[0]?.courses?.[0]?.weather;
  
  if (weatherInfo) {
    return {
      type: weatherInfo.type || 'Current Conditions',
      displayValue: weatherInfo.displayValue || '2',
      conditionId: weatherInfo.conditionId?.toString() || 'Mostly sunny',
      zipCode: weatherInfo.zipCode || '96706',
      temperature: Math.round(weatherInfo.temperature || 76),
      lowTemperature: Math.round(weatherInfo.lowTemperature || 72),
      highTemperature: Math.round(weatherInfo.highTemperature || 89),
      precipitation: Math.round(weatherInfo.precipitation || 60),
      gust: Math.round(weatherInfo.gust || 15),
      windSpeed: Math.round(weatherInfo.windSpeed || 6),
      windDirection: weatherInfo.windDirection || 'N',
      lastUpdated: weatherInfo.lastUpdated || new Date().toISOString(),
    };
  }
  
  return defaultFallbackWeather;
}

/**
 * Fetches fresh weather data from API
 */
async function fetchWeatherFromAPI(eventId: string): Promise<WeatherData> {
  // Check cache first
  const cacheKey = eventId;
  const cached = cache.get(cacheKey);
  
  if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
    console.log('🌤️ Using cached weather data');
    return cached.data;
  }

  try {
    console.log('🌤️ Fetching fresh weather data from API...');
    
    // Add timeout to prevent hanging
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

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
      console.error('Failed to fetch weather data:', response.status, response.statusText);
      
      // Handle client errors (400-499) gracefully
      if (response.status >= 400 && response.status < 500) {
        console.warn(`⚠️ Client error ${response.status} for weather data. Using fallback.`);
        return defaultFallbackWeather;
      }
      
      throw new Error(`API request failed: ${response.status}`);
    }

    const apiData = await response.json();
    const weatherData = parseWeatherFromAPI(apiData);

    // Cache the result
    cache.set(cacheKey, {
      data: weatherData,
      timestamp: Date.now()
    });

    console.log('✅ Fresh weather data received:', weatherData.displayValue);
    return weatherData;

  } catch (error) {
    console.error('❌ Failed to fetch weather data:', error);
    return defaultFallbackWeather;
  }
}

/**
 * Hook that provides API weather data as primary source with 60-minute refresh
 */
export function useApiWeather(eventId: string = '401745905'): UseApiWeatherReturn {
  const [weather, setWeather] = useState<WeatherData | null>(defaultFallbackWeather);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  
  // Refs to track intervals and prevent duplicates
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Refreshes weather data from API
   */
  const refreshWeather = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log(`🔄 Refreshing weather for event: ${eventId}`);
      
      // Fetch fresh weather data
      const freshWeather = await fetchWeatherFromAPI(eventId);
      
      // Update state
      setWeather(freshWeather);
      setLastUpdated(freshWeather.lastUpdated);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to refresh weather data';
      console.error('❌ Weather refresh failed:', errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  /**
   * Sets up automatic refresh every 60 minutes
   */
  const setupAutoRefresh = useCallback(() => {
    // Clear existing interval
    if (refreshIntervalRef.current) {
      clearInterval(refreshIntervalRef.current);
    }

    // Set up new interval for 60 minutes
    refreshIntervalRef.current = setInterval(() => {
      console.log('⏰ Auto-refreshing weather data (60-minute interval)');
      refreshWeather();
    }, 60 * 60 * 1000); // 60 minutes

    console.log('🕐 Auto-refresh interval set for 60 minutes');
  }, [refreshWeather]);

  // Initial load and setup
  useEffect(() => {
    if (!eventId) {
      return;
    }

    // Load weather data immediately
    refreshWeather();
    
    // Set up auto-refresh
    setupAutoRefresh();

    // Cleanup function
    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
        refreshIntervalRef.current = null;
      }
    };
  }, [eventId, refreshWeather, setupAutoRefresh]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, []);

  return {
    weather,
    loading,
    error,
    lastUpdated,
    refreshWeather
  };
}

/**
 * Utility function to clear weather cache (useful for testing or manual refresh)
 */
export function clearWeatherCache() {
  cache.clear();
  console.log('🗑️ Weather cache cleared');
}
