/**
 * Script to update static tournament data from current API response
 * Run with: node scripts/update-static-data.js
 */

// Using built-in fetch (Node.js 18+)
const fs = require('fs');
const path = require('path');

const RAPIDAPI_KEY = '517cb09524mshf243e8dc1b88e58p19efabjsne4e46b59b3c8';
const RAPIDAPI_HOST = 'live-golf-data1.p.rapidapi.com';
const EVENT_ID = '401734780';

async function fetchCurrentTournamentData() {
  try {
    console.log('🔄 Fetching current tournament data from API...');
    
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
    
    // Extract tournament data
    const event = apiData.events?.[0];
    if (!event) {
      throw new Error('No tournament event found in API response');
    }

    const course = event.courses?.[0];
    const weather = course?.weather;

    console.log('📊 Current API Data:');
    console.log('Tournament:', event.name || 'N/A');
    console.log('Date:', event.date || 'N/A');
    console.log('End Date:', event.endDate || 'N/A');
    console.log('Course:', course?.name || 'N/A');
    console.log('Location:', course?.city || 'N/A', course?.state || '');
    console.log('Par:', course?.shotsToPar || 'N/A');
    console.log('Yardage:', course?.totalYards || 'N/A');
    console.log('Weather:', weather?.displayValue || 'N/A', weather?.temperature || 'N/A');
    
    return {
      event,
      course,
      weather,
      rawData: apiData
    };

  } catch (error) {
    console.error('❌ Failed to fetch tournament data:', error);
    throw error;
  }
}

async function updateStaticData() {
  try {
    const data = await fetchCurrentTournamentData();
    
    // Format data for component props
    const tournamentName = data.event.name || 'Tournament';
    const location = data.course ? `${data.course.city || ''}, ${data.course.state || ''}`.trim() : 'Location';
    const courseName = data.course?.name || 'Course';
    const par = data.course?.shotsToPar || 71;
    const yardage = data.course?.totalYards || 6438;
    
    // Format date
    let formattedDate = 'Date TBD';
    if (data.event.date && data.event.endDate) {
      const start = new Date(data.event.date);
      const end = new Date(data.event.endDate);
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
    
    console.log('\n✨ Formatted Data for Component:');
    console.log('tournamentName:', tournamentName);
    console.log('location:', location);
    console.log('date:', formattedDate);
    console.log('courseName:', courseName);
    console.log('par:', par);
    console.log('yardage:', yardage.toLocaleString());
    
    // Save to JSON file for reference
    const outputData = {
      lastUpdated: new Date().toISOString(),
      eventId: EVENT_ID,
      staticProps: {
        tournamentName,
        location,
        date: formattedDate,
        courseName,
        par,
        yardage
      },
      rawApiData: data.rawData
    };
    
    const outputPath = path.join(__dirname, '..', 'src', 'data', 'current-tournament-static.json');
    fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2));
    
    console.log('\n💾 Saved current data to:', outputPath);
    console.log('\n🔧 Update your TournamentComponent props with:');
    console.log(`tournamentName = "${tournamentName}"`);
    console.log(`location = "${location}"`);
    console.log(`date = "${formattedDate}"`);
    console.log(`courseName = "${courseName}"`);
    
  } catch (error) {
    console.error('❌ Script failed:', error);
    process.exit(1);
  }
}

// Run the script
updateStaticData();
