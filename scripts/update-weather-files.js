#!/usr/bin/env node

/**
 * Script to update static weather files with fresh data from the API
 * Run with: node scripts/update-weather-files.js
 */

const fs = require('fs');
const path = require('path');

// Configuration
const RAPIDAPI_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '517cb09524mshf243e8dc1b88e58p19efabjsne4e46b59b3c8';
const RAPIDAPI_HOST = 'live-golf-data1.p.rapidapi.com';
const EVENT_ID = '401734783';

async function fetchFreshWeatherData() {
  console.log(`🔄 Fetching fresh weather data for event: ${EVENT_ID}`);
  
  try {
    const response = await fetch(
      `https://${RAPIDAPI_HOST}/leaderboard?league=lpga&eventId=${EVENT_ID}`,
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
    const updatedWeather = {
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
    return updatedWeather;

  } catch (error) {
    console.error('❌ Failed to fetch weather data:', error);
    throw error;
  }
}

async function updateCurrentTournamentStaticFile(weather) {
  const filePath = path.join(process.cwd(), 'src/data/current-tournament-static.json');
  
  try {
    // Read current file
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileContent);
    
    // Update weather data
    if (data.events?.[0]?.courses?.[0]) {
      data.events[0].courses[0].weather = weather;
    }
    
    // Write updated file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log('✅ Updated current-tournament-static.json');
    
  } catch (error) {
    console.error('❌ Failed to update current-tournament-static.json:', error);
    throw error;
  }
}

async function updateTournamentSnapshotFile(weather) {
  const filePath = path.join(process.cwd(), 'src/data/tournament-snapshot.json');
  
  try {
    // Read current file
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileContent);
    
    // Update weather data
    data.weather = weather;
    
    // Write updated file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log('✅ Updated tournament-snapshot.json');
    
  } catch (error) {
    console.error('❌ Failed to update tournament-snapshot.json:', error);
    throw error;
  }
}

async function main() {
  try {
    console.log('🚀 Starting weather files update...');
    
    // Fetch fresh weather data
    const freshWeather = await fetchFreshWeatherData();
    
    // Update both static files
    await updateCurrentTournamentStaticFile(freshWeather);
    await updateTournamentSnapshotFile(freshWeather);
    
    console.log('🎉 Weather files updated successfully!');
    console.log(`📊 Current weather: ${freshWeather.displayValue}`);
    console.log(`🌡️ Temperature: ${freshWeather.lowTemperature}°-${freshWeather.highTemperature}°F`);
    console.log(`💨 Wind: ${freshWeather.windSpeed} mph ${freshWeather.windDirection}`);
    console.log(`🌧️ Precipitation: ${freshWeather.precipitation}%`);
    
  } catch (error) {
    console.error('💥 Failed to update weather files:', error);
    process.exit(1);
  }
}

// Run the script
main();
