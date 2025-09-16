'use client';

import { useState, useEffect } from 'react';
import { TournamentEvent } from '@/types/tournament';
import { fetchTournamentData } from '@/lib/tournamentApi';

interface UseTournamentDataReturn {
  tournamentData: TournamentEvent | null;
  loading: boolean;
  error: string | null;
}

export function useTournamentData(eventId: string): UseTournamentDataReturn {
  const [tournamentData, setTournamentData] = useState<TournamentEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadTournamentData() {
      try {
        setLoading(true);
        setError(null);
        
        const data = await fetchTournamentData(eventId);
        
        if (isMounted) {
          if (data) {
            setTournamentData(data);
          } else {
            setError('Failed to load tournament data');
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Unknown error occurred');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadTournamentData();

    return () => {
      isMounted = false;
    };
  }, [eventId]);

  return { tournamentData, loading, error };
}
