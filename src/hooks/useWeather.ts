import { useState, useEffect } from 'react';

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

const defaultFallbackWeather: WeatherData = {
  type: 'Forecast',
  displayValue: 'Mostly sunny',
  conditionId: '2',
  zipCode: '72758',
  temperature: 72,
  lowTemperature: 65,
  highTemperature: 78,
  precipitation: 20,
  gust: 7,
  windSpeed: 4,
  windDirection: 'S',
  lastUpdated: new Date().toISOString(),
};

// Smart fallback that gets updated with real data every hour
function getSmartFallbackWeather(eventId: string): WeatherData {
  // Return default fallback during SSR
  if (typeof window === 'undefined') {
    return defaultFallbackWeather;
  }
  
  try {
    const fallbackKey = `weather_fallback_${eventId}`;
    const stored = localStorage.getItem(fallbackKey);
    
    if (stored) {
      const fallbackData = JSON.parse(stored);
      const fallbackAge = Date.now() - new Date(fallbackData.lastUpdated).getTime();
      
      // If fallback data is less than 1 hour old, use it
      if (fallbackAge < 60 * 60 * 1000) {
        return fallbackData.weather;
      }
    }
  } catch (e) {
    console.warn('Failed to get smart fallback weather:', e);
  }
  
  // Return default fallback if no stored data or data is too old
  return defaultFallbackWeather;
}

// Update the smart fallback with fresh weather data
function updateSmartFallback(eventId: string, weatherData: WeatherData) {
  // Skip during SSR
  if (typeof window === 'undefined') {
    return;
  }
  
  try {
    const fallbackKey = `weather_fallback_${eventId}`;
    localStorage.setItem(fallbackKey, JSON.stringify({
      weather: weatherData,
      lastUpdated: new Date().toISOString()
    }));
    console.log('Updated smart fallback weather data');
  } catch (e) {
    console.warn('Failed to update smart fallback weather:', e);
  }
}

export function useWeather(eventId: string = '401734779') {
  const [weather, setWeather] = useState<WeatherData | null>(defaultFallbackWeather);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Handle hydration and smart fallback loading
  useEffect(() => {
    setIsHydrated(true);
    
    // Only after hydration, check for smart fallback
    if (typeof window !== 'undefined') {
      const smartFallback = getSmartFallbackWeather(eventId);
      setWeather(smartFallback);
    }
  }, [eventId]);

  useEffect(() => {
    // Only fetch weather after hydration
    if (!isHydrated) return;
    const fetchWeather = async () => {
      try {
        // Check cache first (5 minute cache)
        const cacheKey = `weather_${eventId}`;
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          try {
            const cachedData = JSON.parse(cached);
            const cacheAge = Date.now() - new Date(cachedData.cacheTime).getTime();
            if (cacheAge < 5 * 60 * 1000) { // 5 minutes
              setWeather(cachedData.data);
              setLoading(false);
              return;
            }
          } catch (e) {
            // Clear invalid cache
            localStorage.removeItem(cacheKey);
          }
        }

        setLoading(true);
        setError(null);
        
        // Add timeout to prevent hanging
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout
        
        // Call RapidAPI directly like TournamentScoresWidget
        const response = await fetch(`https://live-golf-data1.p.rapidapi.com/leaderboard?league=lpga&eventId=${eventId}`, {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'live-golf-data1.p.rapidapi.com',
            'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '517cb09524mshf243e8dc1b88e58p19efabjsne4e46b59b3c8'
          },
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        // Always try to parse the response, even if status is not ok
        // The API might return fallback data
        let data;
        try {
          const responseText = await response.text();
          
          try {
            const apiData = JSON.parse(responseText);
            
            // Extract weather data from the correct location: events[0].courses[0].weather
            const event = apiData.events?.[0];
            const course = event?.courses?.[0];
            const weatherInfo = course?.weather;
            
            if (weatherInfo) {
              // Use the weather data from the API
              data = {
                type: weatherInfo.type || 'Forecast',
                displayValue: weatherInfo.displayValue || 'Unknown',
                conditionId: weatherInfo.conditionId?.toString() || '0',
                zipCode: weatherInfo.zipCode || '72758',
                temperature: Math.round(weatherInfo.temperature || 72),
                lowTemperature: Math.round(weatherInfo.lowTemperature || 65),
                highTemperature: Math.round(weatherInfo.highTemperature || 78),
                precipitation: Math.round(weatherInfo.precipitation || 0),
                gust: Math.round(weatherInfo.gust || 0),
                windSpeed: Math.round(weatherInfo.windSpeed || 0),
                windDirection: weatherInfo.windDirection || 'S',
                lastUpdated: weatherInfo.lastUpdated || new Date().toISOString(),
              };
              console.log('Using live weather data from API:', data);
              
              // Update smart fallback with fresh live data
              updateSmartFallback(eventId, data);
            } else {
              console.warn('No weather data found in API response, using fallback data');
              // Use fallback data if no weather found
              data = {
                type: 'Forecast',
                displayValue: 'Mostly sunny',
                conditionId: '2',
                zipCode: '72758',
                temperature: 72,
                lowTemperature: 72,
                highTemperature: 72,
                precipitation: 37,
                gust: 7,
                windSpeed: 4,
                windDirection: 'S',
                lastUpdated: '2025-09-15T08:59Z',
              };
            }
          } catch (jsonError) {
            console.warn('Weather API returned non-JSON response, using fallback data');
            
            // Use fallback data if JSON parsing fails
            data = {
              type: 'Forecast',
              displayValue: 'Mostly sunny',
              conditionId: '2',
              zipCode: '72758',
              temperature: 72,
              lowTemperature: 72,
              highTemperature: 72,
              precipitation: 37,
              gust: 7,
              windSpeed: 4,
              windDirection: 'S',
              lastUpdated: '2025-09-15T08:59Z',
            };
          }
        } catch (textError) {
          console.error('Failed to read response as text:', textError);
          // Use fallback data if we can't even read the response
          data = {
            type: 'Forecast',
            displayValue: 'Mostly sunny',
            conditionId: '2',
            zipCode: '72758',
            temperature: 72,
            lowTemperature: 72,
            highTemperature: 72,
            precipitation: 37,
            gust: 7,
            windSpeed: 4,
            windDirection: 'S',
            lastUpdated: '2025-09-15T08:59Z',
          };
        }
        
        if (!response.ok) {
          console.warn(`Weather API returned ${response.status}, but got data:`, data);
        }
        
        setWeather(data);
        
        // Cache the successful response
        try {
          localStorage.setItem(cacheKey, JSON.stringify({
            data,
            cacheTime: new Date().toISOString()
          }));
        } catch (e) {
          // Ignore cache storage errors
          console.warn('Failed to cache weather data:', e);
        }
      } catch (err) {
        console.error('Weather fetch error:', err);
        
        // If it's an abort error (timeout), set fallback data
        if (err instanceof Error && err.name === 'AbortError') {
          console.log('Weather API timeout, using fallback data');
          setWeather({
            type: 'Forecast',
            displayValue: 'Mostly sunny',
            conditionId: '2',
            zipCode: '72758',
            temperature: 72,
            lowTemperature: 72,
            highTemperature: 72,
            precipitation: 37,
            gust: 7,
            windSpeed: 4,
            windDirection: 'S',
            lastUpdated: '2025-09-15T08:59Z',
          });
        } else {
          setError(err instanceof Error ? err.message : 'Failed to fetch weather');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    
    // Refresh weather data every 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [eventId, isHydrated]);

  return { weather, loading, error };
}

// Background service to keep smart fallback fresh
class WeatherFallbackService {
  private static instance: WeatherFallbackService;
  private intervalId: NodeJS.Timeout | null = null;
  private isRunning = false;

  static getInstance(): WeatherFallbackService {
    if (!WeatherFallbackService.instance) {
      WeatherFallbackService.instance = new WeatherFallbackService();
    }
    return WeatherFallbackService.instance;
  }

  start(eventId: string = '401734779') {
    if (this.isRunning) return;
    
    this.isRunning = true;
    console.log('Starting weather fallback service for event:', eventId);
    
    // Update immediately if fallback is stale
    this.updateFallbackIfStale(eventId);
    
    // Then update every hour
    this.intervalId = setInterval(() => {
      this.updateFallbackIfStale(eventId);
    }, 60 * 60 * 1000); // 1 hour
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isRunning = false;
    console.log('Stopped weather fallback service');
  }

  private async updateFallbackIfStale(eventId: string) {
    // Skip during SSR
    if (typeof window === 'undefined') {
      return;
    }
    
    try {
      const fallbackKey = `weather_fallback_${eventId}`;
      const stored = localStorage.getItem(fallbackKey);
      
      let shouldUpdate = true;
      if (stored) {
        const fallbackData = JSON.parse(stored);
        const fallbackAge = Date.now() - new Date(fallbackData.lastUpdated).getTime();
        // Only update if fallback is older than 1 hour
        shouldUpdate = fallbackAge >= 60 * 60 * 1000;
      }
      
      if (!shouldUpdate) {
        console.log('Smart fallback is still fresh, skipping update');
        return;
      }
      
      console.log('Updating stale smart fallback weather data...');
      
      // Fetch fresh weather data silently
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout for background
      
      const response = await fetch(`https://live-golf-data1.p.rapidapi.com/leaderboard?league=lpga&eventId=${eventId}`, {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'live-golf-data1.p.rapidapi.com',
          'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '517cb09524mshf243e8dc1b88e58p19efabjsne4e46b59b3c8'
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        const apiData = await response.json();
        const weatherInfo = apiData.events?.[0]?.courses?.[0]?.weather;
        
        if (weatherInfo) {
          const freshWeatherData: WeatherData = {
            type: weatherInfo.type || 'Forecast',
            displayValue: weatherInfo.displayValue || 'Unknown',
            conditionId: weatherInfo.conditionId?.toString() || '0',
            zipCode: weatherInfo.zipCode || '72758',
            temperature: Math.round(weatherInfo.temperature || 72),
            lowTemperature: Math.round(weatherInfo.lowTemperature || 65),
            highTemperature: Math.round(weatherInfo.highTemperature || 78),
            precipitation: Math.round(weatherInfo.precipitation || 0),
            gust: Math.round(weatherInfo.gust || 0),
            windSpeed: Math.round(weatherInfo.windSpeed || 0),
            windDirection: weatherInfo.windDirection || 'S',
            lastUpdated: weatherInfo.lastUpdated || new Date().toISOString(),
          };
          
          updateSmartFallback(eventId, freshWeatherData);
          console.log('Smart fallback updated successfully in background');
        }
      }
    } catch (error) {
      console.warn('Background weather fallback update failed:', error);
    }
  }
}

// Auto-start the service when the module loads (only in browser)
if (typeof window !== 'undefined') {
  const service = WeatherFallbackService.getInstance();
  
  // Start service when page loads
  if (document.readyState === 'complete') {
    service.start();
  } else {
    window.addEventListener('load', () => service.start());
  }
  
  // Stop service when page unloads
  window.addEventListener('beforeunload', () => service.stop());
}

// Export the service for manual control if needed
export { WeatherFallbackService };

// Utility function to manually refresh fallback data
export function refreshWeatherFallback(eventId: string = '401734779') {
  const service = WeatherFallbackService.getInstance();
  service.stop();
  service.start(eventId);
  console.log('Manually triggered weather fallback refresh');
}
