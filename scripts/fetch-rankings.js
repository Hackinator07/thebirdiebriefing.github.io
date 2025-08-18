const fs = require('fs');
const axios = require('axios');
const path = require('path');

async function fetchRankings() {
  try {
    console.log('Fetching LPGA rankings from Rolex Rankings API...');

    const response = await axios.get('https://www.rolexrankings.com/core/rankings/list', {
      headers: {
        'User-Agent': 'BirdieBriefing/1.0 (https://birdiebriefing.com)',
        'Accept': 'application/json'
      }
    });

    const data = response.data;

    // Extract the rankings data
    const rankings = {
      lastUpdated: new Date().toISOString(),
      week: data.week,
      players: data.list.items.map(player => ({
        id: player.id,
        rank: player.rank,
        rankDelta: player.rank_delta,
        nameFirst: player.name_first,
        nameLast: player.name_last,
        fullName: `${player.name_first} ${player.name_last}`,
        countryCode: player.country_code,
        pointsAverage: player.points_average,
        pointsTotal: player.points_total,
        tournamentCount: player.tournament_count
      }))
    };

    // Create the data directory if it doesn't exist
    const dataDir = path.join(__dirname, '..', 'src', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Write to rankings.json
    const rankingsPath = path.join(dataDir, 'rankings.json');
    fs.writeFileSync(rankingsPath, JSON.stringify(rankings, null, 2));

    console.log(`✅ Successfully updated rankings!`);
    console.log(`📊 Total players: ${rankings.players.length}`);
    console.log(`📅 Week: ${data.week.start_date} to ${data.week.end_date}`);
    console.log(`🏆 #1: ${rankings.players[0].fullName} (${rankings.players[0].countryCode})`);
    console.log(`📁 Saved to: ${rankingsPath}`);

  } catch (error) {
    console.error('❌ Error fetching rankings:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.code) {
      console.error('Error code:', error.code);
    }
    console.error('Full error:', error);
    process.exit(1);
  }
}

// Run the script
fetchRankings();
