import fs from 'fs';
import path from 'path';

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

/**
 * Updates static JSON files with fresh weather data from API
 * This ensures the static files always have current weather information
 */
export async function updateStaticWeatherFiles(eventId: string = '401734782'): Promise<void> {
  const RAPIDAPI_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '517cb09524mshf243e8dc1b88e58p19efabjsne4e46b59b3c8';
  const RAPIDAPI_HOST = 'live-golf-data1.p.rapidapi.com';

  console.log(`🔄 Updating static weather files for event: ${eventId}`);

  try {
    // Fetch fresh weather data from API
    const response = await fetch(
      `https://${RAPIDAPI_HOST}/leaderboard?league=lpga&eventId=${eventId}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': RAPIDAPI_HOST,
          'x-rapidapi-key': RAPIDAPI_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const apiData = await response.json();
    const weatherInfo = apiData.events?.[0]?.courses?.[0]?.weather;
    
    if (!weatherInfo) {
      throw new Error('No weather data found in API response');
    }

    // Create updated weather data
    const updatedWeather: WeatherData = {
      type: weatherInfo.type || 'Forecast',
      displayValue: weatherInfo.displayValue || 'Mostly cloudy w/ showers',
      conditionId: weatherInfo.conditionId?.toString() || '13',
      zipCode: weatherInfo.zipCode || '96706',
      temperature: Math.round(weatherInfo.temperature || 80),
      lowTemperature: Math.round(weatherInfo.lowTemperature || 72),
      highTemperature: Math.round(weatherInfo.highTemperature || 89),
      precipitation: Math.round(weatherInfo.precipitation || 55),
      gust: Math.round(weatherInfo.gust || 12),
      windSpeed: Math.round(weatherInfo.windSpeed || 10),
      windDirection: weatherInfo.windDirection || 'ENE',
      lastUpdated: weatherInfo.lastUpdated || new Date().toISOString(),
    };

    console.log('✅ Fresh weather data:', updatedWeather.displayValue);

    // Update current-tournament-static.json
    await updateCurrentTournamentStaticFile(updatedWeather);
    
    // Update tournament-snapshot.json
    await updateTournamentSnapshotFile(updatedWeather);

    console.log('✅ Static weather files updated successfully');

  } catch (error) {
    console.error('❌ Failed to update static weather files:', error);
    throw error;
  }
}

/**
 * Updates the current-tournament-static.json file with fresh weather data
 */
async function updateCurrentTournamentStaticFile(weather: WeatherData): Promise<void> {
  const filePath = path.join(process.cwd(), 'src/data/current-tournament-static.json');
  
  try {
    // Read current file
    const fileContent = await fs.promises.readFile(filePath, 'utf-8');
    const data = JSON.parse(fileContent);
    
    // Update weather data
    if (data.events?.[0]?.courses?.[0]) {
      data.events[0].courses[0].weather = weather;
    }
    
    // Write updated file
    await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2));
    console.log('✅ Updated current-tournament-static.json');
    
  } catch (error) {
    console.error('❌ Failed to update current-tournament-static.json:', error);
    throw error;
  }
}

/**
 * Updates the tournament-snapshot.json file with fresh weather data
 */
async function updateTournamentSnapshotFile(weather: WeatherData): Promise<void> {
  const filePath = path.join(process.cwd(), 'src/data/tournament-snapshot.json');
  
  try {
    // Read current file
    const fileContent = await fs.promises.readFile(filePath, 'utf-8');
    const data = JSON.parse(fileContent);
    
    // Update weather data
    data.weather = weather;
    
    // Write updated file
    await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2));
    console.log('✅ Updated tournament-snapshot.json');
    
  } catch (error) {
    console.error('❌ Failed to update tournament-snapshot.json:', error);
    throw error;
  }
}

/**
 * Schedules automatic updates of static weather files every 30 minutes
 */
export function startWeatherFileAutoUpdate(eventId: string = '401734782'): void {
  // Only run on server side (Node.js environment)
  if (typeof window !== 'undefined') {
    console.warn('Weather file auto-update only runs on server side');
    return;
  }

  console.log(`🕐 Starting 30-minute auto-update for static weather files (${eventId})`);

  // Update immediately
  updateStaticWeatherFiles(eventId).catch(error => {
    console.error('Initial weather file update failed:', error);
  });

  // Then update every 30 minutes
  const interval = setInterval(() => {
    updateStaticWeatherFiles(eventId).catch(error => {
      console.error('Scheduled weather file update failed:', error);
    });
  }, 30 * 60 * 1000); // 30 minutes

  // Store interval reference for cleanup
  (global as any).weatherFileUpdateInterval = interval;
}

/**
 * Stops the automatic weather file updates
 */
export function stopWeatherFileAutoUpdate(): void {
  const interval = (global as any).weatherFileUpdateInterval;
  if (interval) {
    clearInterval(interval);
    delete (global as any).weatherFileUpdateInterval;
    console.log('🛑 Stopped automatic weather file updates');
  }
}
