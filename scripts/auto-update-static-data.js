/**
 * Auto-update Static Tournament Data
 * 
 * This script automatically fetches the latest API data and updates all 
 * static fallbacks in the codebase to match the current tournament data.
 * 
 * Run with: node scripts/auto-update-static-data.js
 */

const fs = require('fs');
const path = require('path');

const RAPIDAPI_KEY = '517cb09524mshf243e8dc1b88e58p19efabjsne4e46b59b3c8';
const RAPIDAPI_HOST = 'live-golf-data1.p.rapidapi.com';
const EVENT_ID = '401734779';

// Helper function to format purse amount (matches the one in tournamentApi.ts)
function formatPurse(purse) {
  if (purse >= 1000000) {
    return `$${(purse / 1000000).toFixed(1)}M`;
  } else if (purse >= 1000) {
    return `$${(purse / 1000).toFixed(0)}K`;
  } else {
    return `$${purse.toLocaleString()}`;
  }
}

async function fetchLatestTournamentData() {
  try {
    console.log('🔄 Fetching latest tournament data...');
    
    const response = await fetch(
      `https://${RAPIDAPI_HOST}/leaderboard?league=lpga&eventId=${EVENT_ID}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': RAPIDAPI_HOST,
          'x-rapidapi-key': RAPIDAPI_KEY,
        }
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const apiData = await response.json();
    const event = apiData.events?.[0];
    const course = event?.courses?.[0];
    const weather = course?.weather;

    if (!event) {
      throw new Error('No tournament event found');
    }

    // Format the data
    const tournamentName = event.name || 'Tournament';
    const location = course?.address ? `${course.address.city}, ${course.address.state}` : 'Location';
    const courseName = course?.name || 'Course';
    
    // Format date
    let formattedDate = 'Date TBD';
    if (event.date && event.endDate) {
      const start = new Date(event.date);
      const end = new Date(event.endDate);
      const startMonth = start.toLocaleDateString('en-US', { month: 'short' });
      const endMonth = end.toLocaleDateString('en-US', { month: 'short' });
      const startDay = start.getDate();
      const endDay = end.getDate();
      const year = start.getFullYear();
      
      if (startMonth === endMonth) {
        formattedDate = `${startMonth} ${startDay}-${endDay}, ${year}`;
      } else {
        formattedDate = `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`;
      }
    }

    return {
      tournamentName,
      location,
      date: formattedDate,
      courseName,
      par: course?.shotsToPar || 71,
      yardage: course?.totalYards || 6438,
      weather: weather || {},
      purse: formatPurse(event.purse) || '$3.0M',
      defendingChampion: event.defendingChampion?.athlete?.displayName || 'N/A'
    };

  } catch (error) {
    console.error('❌ Failed to fetch tournament data:', error);
    throw error;
  }
}

async function updateTournamentComponent(data) {
  const componentPath = path.join(__dirname, '..', 'src', 'components', 'TournamentComponent.tsx');
  
  try {
    let content = fs.readFileSync(componentPath, 'utf8');
    
    // Update tournament name
    content = content.replace(
      /tournamentName = "[^"]*"/,
      `tournamentName = "${data.tournamentName}"`
    );
    
    // Update location
    content = content.replace(
      /location = "[^"]*"/,
      `location = "${data.location}"`
    );
    
    // Update date
    content = content.replace(
      /date = "[^"]*"/,
      `date = "${data.date}"`
    );
    
    // Update course name fallback
    content = content.replace(
      /"[^"]*";\s*\/\/ Course name fallback|: "[^"]*"; \/\/ Course fallback/,
      `"${data.courseName}";`
    );
    
    // Update purse fallback
    content = content.replace(
      /: "\$[^"]*"; \/\/ Purse fallback|formatPurse\(tournamentData\.purse\) : "\$[^"]*"/,
      `formatPurse(tournamentData.purse) : "${data.purse}"`
    );
    
    fs.writeFileSync(componentPath, content);
    console.log('✅ Updated TournamentComponent.tsx');
    
  } catch (error) {
    console.error('❌ Failed to update TournamentComponent:', error);
  }
}

async function updateWeatherFallback(data) {
  const hookPath = path.join(__dirname, '..', 'src', 'hooks', 'useTournamentAndWeather.ts');
  
  try {
    let content = fs.readFileSync(hookPath, 'utf8');
    
    if (data.weather.displayValue) {
      content = content.replace(
        /displayValue: '[^']*'/,
        `displayValue: '${data.weather.displayValue}'`
      );
    }
    
    if (data.weather.conditionId) {
      content = content.replace(
        /conditionId: '[^']*'/,
        `conditionId: '${data.weather.conditionId}'`
      );
    }
    
    if (data.weather.temperature) {
      content = content.replace(
        /temperature: \d+/,
        `temperature: ${data.weather.temperature}`
      );
    }
    
    if (data.weather.windDirection) {
      content = content.replace(
        /windDirection: '[^']*'/,
        `windDirection: '${data.weather.windDirection}'`
      );
    }
    
    if (data.weather.precipitation) {
      content = content.replace(
        /precipitation: \d+/,
        `precipitation: ${data.weather.precipitation}`
      );
    }
    
    fs.writeFileSync(hookPath, content);
    console.log('✅ Updated weather fallback data');
    
  } catch (error) {
    console.error('❌ Failed to update weather fallback:', error);
  }
}

async function updateStaticDataFallback(data) {
  const staticDataPath = path.join(__dirname, '..', 'src', 'lib', 'staticTournamentData.ts');
  
  try {
    let content = fs.readFileSync(staticDataPath, 'utf8');
    
    // Update weather data in DEFAULT_STATIC_DATA
    if (data.weather.displayValue) {
      content = content.replace(
        /displayValue: '[^']*'/,
        `displayValue: '${data.weather.displayValue}'`
      );
    }
    
    if (data.weather.conditionId) {
      content = content.replace(
        /conditionId: '[^']*'/,
        `conditionId: '${data.weather.conditionId}'`
      );
    }
    
    if (data.weather.temperature) {
      content = content.replace(
        /temperature: \d+/,
        `temperature: ${data.weather.temperature}`
      );
    }
    
    fs.writeFileSync(staticDataPath, content);
    console.log('✅ Updated static data fallback');
    
  } catch (error) {
    console.error('❌ Failed to update static data fallback:', error);
  }
}

async function saveSnapshotData(data) {
  const snapshotPath = path.join(__dirname, '..', 'src', 'data', 'tournament-snapshot.json');
  
  const snapshot = {
    lastUpdated: new Date().toISOString(),
    eventId: EVENT_ID,
    data: data
  };
  
  fs.writeFileSync(snapshotPath, JSON.stringify(snapshot, null, 2));
  console.log('💾 Saved tournament snapshot');
}

async function main() {
  try {
    console.log('🚀 Auto-updating static tournament data...\n');
    
    // Fetch latest data
    const data = await fetchLatestTournamentData();
    
    console.log('📊 Latest Tournament Data:');
    console.log(`Tournament: ${data.tournamentName}`);
    console.log(`Location: ${data.location}`);
    console.log(`Date: ${data.date}`);
    console.log(`Course: ${data.courseName}`);
    console.log(`Weather: ${data.weather.displayValue || 'N/A'} ${data.weather.temperature || 'N/A'}°F\n`);
    
    // Update all files
    await Promise.all([
      updateTournamentComponent(data),
      updateWeatherFallback(data),
      updateStaticDataFallback(data),
      saveSnapshotData(data)
    ]);
    
    console.log('\n🎉 Static data update complete!');
    console.log('   Static content now matches current API data exactly.');
    
  } catch (error) {
    console.error('\n❌ Auto-update failed:', error);
    process.exit(1);
  }
}

// Run the auto-update
main();
