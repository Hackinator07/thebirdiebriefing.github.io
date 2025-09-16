'use client';

import { useState, useEffect } from 'react';
import { getStaticTournamentData, getStaticTournamentDataSync, refreshStaticTournamentData } from '@/lib/staticTournamentData';
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

interface UseStaticTournamentDataReturn {
  tournamentData: TournamentEvent | null;
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

/**
 * Hook that provides static tournament data that matches the current API response
 * Automatically captures and caches API data for perfect visual consistency
 */
export function useStaticTournamentData(eventId: string): UseStaticTournamentDataReturn {
  const [tournamentData, setTournamentData] = useState<TournamentEvent | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load static data immediately (synchronous)
  useEffect(() => {
    const staticData = getStaticTournamentDataSync(eventId);
    setTournamentData(staticData.tournamentData);
    setWeather(staticData.weatherData);
  }, [eventId]);

  // Refresh data asynchronously in background
  useEffect(() => {
    let isMounted = true;

    async function loadFreshData() {
      try {
        setLoading(true);
        setError(null);
        
        const staticData = await getStaticTournamentData(eventId);
        
        if (isMounted) {
          setTournamentData(staticData.tournamentData);
          setWeather(staticData.weatherData);
        }
      } catch (err) {
        if (isMounted) {
          const errorMessage = err instanceof Error ? err.message : 'Failed to load static data';
          setError(errorMessage);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    // Load fresh data after a short delay to prioritize initial render
    const timer = setTimeout(loadFreshData, 100);
    
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [eventId]);

  const refreshData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const staticData = await refreshStaticTournamentData(eventId);
      setTournamentData(staticData.tournamentData);
      setWeather(staticData.weatherData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to refresh data';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { tournamentData, weather, loading, error, refreshData };
}
