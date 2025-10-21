/**
 * Static Data Utilities
 * 
 * Development and debugging utilities for managing static tournament data
 */

import { 
  captureStaticTournamentData, 
  getStaticTournamentData, 
  clearStaticTournamentDataCache,
  getStaticDataCacheInfo 
} from './staticTournamentData';
import staticDataService from './staticDataService';

/**
 * Development utility to capture and preview static data
 */
export async function captureAndPreviewStaticData(eventId: string) {
  console.log(`📸 Capturing static data for event ${eventId}...`);
  
  try {
    const staticData = await captureStaticTournamentData(eventId);
    
    console.log('📊 Captured Static Data:');
    console.log('Tournament:', staticData.tournamentData?.name || 'No tournament data');
    console.log('Weather:', staticData.weatherData.displayValue, `${staticData.weatherData.temperature}°F`);
    console.log('Last Updated:', staticData.lastUpdated);
    
    return staticData;
  } catch (error) {
    console.error('❌ Failed to capture static data:', error);
    throw error;
  }
}

/**
 * Compare static data with live API data
 */
export async function compareStaticVsLiveData(eventId: string) {
  console.log(`🔍 Comparing static vs live data for event ${eventId}...`);
  
  try {
    const [staticData, liveData] = await Promise.all([
      getStaticTournamentData(eventId),
      captureStaticTournamentData(eventId)
    ]);
    
    const differences = [];
    
    // Compare tournament data
    if (staticData.tournamentData?.name !== liveData.tournamentData?.name) {
      differences.push({
        field: 'Tournament Name',
        static: staticData.tournamentData?.name,
        live: liveData.tournamentData?.name
      });
    }
    
    // Compare weather data
    if (staticData.weatherData.temperature !== liveData.weatherData.temperature) {
      differences.push({
        field: 'Temperature',
        static: staticData.weatherData.temperature,
        live: liveData.weatherData.temperature
      });
    }
    
    if (staticData.weatherData.displayValue !== liveData.weatherData.displayValue) {
      differences.push({
        field: 'Weather Condition',
        static: staticData.weatherData.displayValue,
        live: liveData.weatherData.displayValue
      });
    }
    
    if (differences.length === 0) {
      console.log('✅ Static and live data are identical');
    } else {
      console.log('⚠️ Found differences:');
      differences.forEach(diff => {
        console.log(`  ${diff.field}: "${diff.static}" → "${diff.live}"`);
      });
    }
    
    return { differences, staticData, liveData };
  } catch (error) {
    console.error('❌ Failed to compare data:', error);
    throw error;
  }
}

/**
 * Force refresh all static data
 */
export async function forceRefreshAllStaticData() {
  console.log('🔄 Force refreshing all static data...');
  
  try {
    await staticDataService.refreshAll();
    console.log('✅ All static data refreshed successfully');
  } catch (error) {
    console.error('❌ Failed to refresh static data:', error);
    throw error;
  }
}

/**
 * Get comprehensive cache information
 */
export function getCacheStatus() {
  const cacheInfo = getStaticDataCacheInfo();
  const serviceStatus = staticDataService.getStatus();
  
  console.log('📊 Cache Status:');
  console.log('  Cache Size:', cacheInfo.size);
  console.log('  Service Running:', serviceStatus.isRunning);
  console.log('  Refresh Interval:', serviceStatus.config.refreshInterval / 60000, 'minutes');
  console.log('  Event IDs:', serviceStatus.config.eventIds);
  
  if (cacheInfo.entries.length > 0) {
    console.log('  Cached Events:');
    cacheInfo.entries.forEach(entry => {
      console.log(`    ${entry.eventId}: ${entry.hasTournamentData ? '✅' : '❌'} tournament, ${entry.hasWeatherData ? '✅' : '❌'} weather (${entry.lastUpdated})`);
    });
  }
  
  return { cacheInfo, serviceStatus };
}

/**
 * Clear all cached data and restart service
 */
export function resetStaticDataSystem() {
  console.log('🧹 Resetting static data system...');
  
  staticDataService.stop();
  clearStaticTournamentDataCache();
  staticDataService.start();
  
  console.log('✅ Static data system reset complete');
}

// Make utilities available globally in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  (window as any).staticDataUtils = {
    captureAndPreview: captureAndPreviewStaticData,
    compare: compareStaticVsLiveData,
    refreshAll: forceRefreshAllStaticData,
    getStatus: getCacheStatus,
    reset: resetStaticDataSystem
  };
  
  console.log('🛠️ Static data utilities available at window.staticDataUtils');
  console.log('Available commands:');
  console.log('  - staticDataUtils.captureAndPreview("401745905")');
  console.log('  - staticDataUtils.compare("401745905")');
  console.log('  - staticDataUtils.refreshAll()');
  console.log('  - staticDataUtils.getStatus()');
  console.log('  - staticDataUtils.reset()');
}
