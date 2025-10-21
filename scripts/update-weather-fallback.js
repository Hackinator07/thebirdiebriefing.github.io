#!/usr/bin/env node

/**
 * Weather Fallback Update Script
 * 
 * This script simulates the weather fallback update that normally runs in the browser.
 * Since the actual localStorage-based system only works in the browser, this script
 * shows how the update process works and can be used for testing.
 */

const https = require('https');

// Default event ID for Walmart NW Arkansas Championship
const DEFAULT_EVENT_ID = '401745905';

// API configuration
const RAPIDAPI_HOST = 'live-golf-data1.p.rapidapi.com';
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || '517cb09524mshf243e8dc1b88e58p19efabjsne4e46b59b3c8';

/**
 * Fetch weather data from the LPGA API
 */
function fetchWeatherData(eventId) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: RAPIDAPI_HOST,
      path: `/leaderboard?league=lpga&eventId=${eventId}`,
      method: 'GET',
      headers: {
        'x-rapidapi-host': RAPIDAPI_HOST,
        'x-rapidapi-key': RAPIDAPI_KEY
      },
      timeout: 5000
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const apiData = JSON.parse(data);
          const weatherInfo = apiData.events?.[0]?.courses?.[0]?.weather;

          if (weatherInfo) {
            const weatherData = {
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
            resolve(weatherData);
          } else {
            reject(new Error('No weather data found in API response'));
          }
        } catch (error) {
          reject(new Error(`Failed to parse API response: ${error.message}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(new Error(`Request failed: ${error.message}`));
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.end();
  });
}

/**
 * Main function to update weather fallback
 */
async function updateWeatherFallback(eventId = DEFAULT_EVENT_ID) {
  console.log(`🌤️  Updating weather fallback for event: ${eventId}`);
  console.log('⏳ Fetching latest weather data...\n');

  try {
    const weatherData = await fetchWeatherData(eventId);
    
    console.log('✅ Successfully fetched weather data:');
    console.log('┌─────────────────────────────────────────┐');
    console.log(`│ Condition: ${weatherData.displayValue.padEnd(27)} │`);
    console.log(`│ Temperature: ${weatherData.temperature}°F (${weatherData.lowTemperature}°-${weatherData.highTemperature}°F)${' '.repeat(Math.max(0, 15 - `${weatherData.temperature}°F (${weatherData.lowTemperature}°-${weatherData.highTemperature}°F)`.length))} │`);
    console.log(`│ Wind: ${weatherData.windSpeed} mph ${weatherData.windDirection}${' '.repeat(Math.max(0, 25 - `${weatherData.windSpeed} mph ${weatherData.windDirection}`.length))} │`);
    console.log(`│ Precipitation: ${weatherData.precipitation}%${' '.repeat(Math.max(0, 22 - `${weatherData.precipitation}%`.length))} │`);
    console.log(`│ Last Updated: ${new Date(weatherData.lastUpdated).toLocaleString().padEnd(18)} │`);
    console.log('└─────────────────────────────────────────┘');
    
    console.log('\n📝 Fallback data structure:');
    console.log(JSON.stringify(weatherData, null, 2));
    
    console.log('\n💾 In the browser, this data would be stored as:');
    console.log(`localStorage.setItem('weather_fallback_${eventId}', JSON.stringify({`);
    console.log('  weather: weatherData,');
    console.log('  lastUpdated: new Date().toISOString()');
    console.log('}));');
    
    console.log('\n🎯 To manually trigger this update in the browser console:');
    console.log('import { refreshWeatherFallback } from "@/hooks/useWeather";');
    console.log(`refreshWeatherFallback("${eventId}");`);
    
    return weatherData;
    
  } catch (error) {
    console.error('❌ Failed to update weather fallback:', error.message);
    
    console.log('\n🔄 Using default fallback data:');
    const defaultFallback = {
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
    
    console.log(JSON.stringify(defaultFallback, null, 2));
    return defaultFallback;
  }
}

// Run the script if called directly
if (require.main === module) {
  const eventId = process.argv[2] || DEFAULT_EVENT_ID;
  
  console.log('🚀 Weather Fallback Update Script');
  console.log('==================================\n');
  
  updateWeatherFallback(eventId)
    .then(() => {
      console.log('\n✨ Weather fallback update completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Script failed:', error.message);
      process.exit(1);
    });
}

module.exports = { updateWeatherFallback };
