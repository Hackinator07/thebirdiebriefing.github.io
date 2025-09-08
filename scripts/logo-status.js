const fs = require('fs');
const path = require('path');

// Tournament data with their expected logo filenames
const tournaments = [
  { name: 'Hilton Grand Vacations Tournament of Champions', filename: 'hilton-grand-vacations.png' },
  { name: 'Founders Cup', filename: 'founders-cup.png' },
  { name: 'Honda LPGA Thailand', filename: 'honda-lpga-thailand.png' },
  { name: 'HSBC Women\'s World Championship', filename: 'hsbc-womens-world.png' },
  { name: 'Blue Bay LPGA', filename: 'blue-bay-lpga.svg' },
  { name: 'FIR HILLS SERI PAK Championship', filename: 'seri-pak-championship.webp' },
  { name: 'Ford Championship presented by Wild Horse Pass', filename: 'ford-championship.png' },
  { name: 'T-Mobile Match Play presented by MGM Rewards', filename: 'tmobile-match-play.png' },
  { name: 'JM Eagle LA Championship presented by Plastpro', filename: 'jm-eagle-la.webp' },
  { name: 'The Chevron Championship', filename: 'chevron-championship.png' },
  { name: 'Black Desert Championship', filename: 'black-desert-championship.png' },
  { name: 'Mizuho Americas Open', filename: 'mizuho-americas.png' },
  { name: 'Riviera Maya Open', filename: 'riviera-maya.png' },
  { name: 'U.S. Women\'s Open presented by Ally', filename: 'us-womens-open.png' },
  { name: 'ShopRite LPGA Classic presented by Acer', filename: 'shoprite-lpga.png' },
  { name: 'Meijer LPGA Classic for Simply Give', filename: 'meijer-lpga.webp' },
  { name: 'KPMG Women\'s PGA Championship', filename: 'kpmg-womens-pga.png' },
  { name: 'Dow Championship', filename: 'dow-championship.webp' },
  { name: 'Amundi Evian Championship', filename: 'amundi-evian.png' },
  { name: 'ISPS Handa Women\'s Scottish Open', filename: 'isps-handa-scottish.svg' },
  { name: 'AIG Women\'s Open', filename: 'aig-womens-open.png' },
  { name: 'The Standard Portland Classic', filename: 'portland-classic.png' },
  { name: 'CPKC Women\'s Open', filename: 'cpkc-womens-open.svg' },
  { name: 'FM Championship', filename: 'fm-championship.png' },
  { name: 'Kroger Queen City Championship presented by P&G', filename: 'kroger-queen-city.png' },
  { name: 'Walmart NW Arkansas Championship presented by P&G', filename: 'walmart-nw-arkansas.webp' },
  { name: 'LOTTE Championship presented by Hoakalei', filename: 'lotte-championship.png' },
  { name: 'Buick LPGA Shanghai', filename: 'buick-lpga-shanghai.png' },
  { name: 'BMW Ladies Championship', filename: 'bmw-ladies.svg' },
  { name: 'Hanwha LIFEPLUS International Crown', filename: 'hanwha-crown-new.svg' },
  { name: 'Maybank Championship', filename: 'maybank-championship.jpg' },
  { name: 'TOTO Japan Classic', filename: 'toto-japan.webp' },
  { name: 'The ANNIKA driven by Gainbridge at Pelican', filename: 'annika-pelican.webp' },
  { name: 'CME Group Tour Championship', filename: 'cme-tour-championship.png' },
  { name: 'Grant Thornton Invitational', filename: 'grant-thornton.svg' }
];

const tournamentsDir = path.join(__dirname, '..', 'public', 'images', 'tournaments');

console.log('Tournament Logo Status Report\n');
console.log('='.repeat(80));

let hasLogo = 0;
let missingLogo = 0;

tournaments.forEach(tournament => {
  const filepath = path.join(tournamentsDir, tournament.filename);
  const exists = fs.existsSync(filepath);
  
  if (exists) {
    const stats = fs.statSync(filepath);
    const sizeKB = Math.round(stats.size / 1024);
    console.log(`✓ ${tournament.name}`);
    console.log(`  File: ${tournament.filename} (${sizeKB}KB)`);
    hasLogo++;
  } else {
    console.log(`✗ ${tournament.name}`);
    console.log(`  Missing: ${tournament.filename}`);
    missingLogo++;
  }
  console.log('');
});

console.log('='.repeat(80));
console.log(`Summary: ${hasLogo} logos found, ${missingLogo} missing`);
console.log(`Coverage: ${Math.round((hasLogo / tournaments.length) * 100)}%`);

if (missingLogo > 0) {
  console.log('\nMissing logos:');
  tournaments.forEach(tournament => {
    const filepath = path.join(tournamentsDir, tournament.filename);
    if (!fs.existsSync(filepath)) {
      console.log(`- ${tournament.filename}`);
    }
  });
}
