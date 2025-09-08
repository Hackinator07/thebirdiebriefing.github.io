const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { URL } = require('url');

// Tournament data with their URLs
const tournaments = [
  { name: 'Hilton Grand Vacations Tournament of Champions', url: 'https://www.hgvtoc.com', filename: 'hilton-grand-vacations' },
  { name: 'Founders Cup', url: 'https://www.thefounderslpga.com', filename: 'founders-cup' },
  { name: 'Honda LPGA Thailand', url: 'https://hondalpgathailand.com', filename: 'honda-lpga-thailand' },
  { name: 'HSBC Women\'s World Championship', url: 'https://www.hsbcgolf.com/womens', filename: 'hsbc-womens-world' },
  { name: 'Blue Bay LPGA', url: 'https://www.lpga.com/tournaments/blue-bay-lpga', filename: 'blue-bay-lpga' },
  { name: 'FIR HILLS SERI PAK Championship', url: 'https://seripakchampionship.com', filename: 'seri-pak-championship' },
  { name: 'Ford Championship presented by Wild Horse Pass', url: 'https://www.fordchampionship.com', filename: 'ford-championship' },
  { name: 'T-Mobile Match Play presented by MGM Rewards', url: 'https://www.lpga.com/tournaments/t-mobile-match-play', filename: 'tmobile-match-play' },
  { name: 'JM Eagle LA Championship presented by Plastpro', url: 'https://jmeaglelachampionship.com', filename: 'jm-eagle-la' },
  { name: 'The Chevron Championship', url: 'https://www.thechevronchampionship.com', filename: 'chevron-championship' },
  { name: 'Black Desert Championship', url: 'https://blackdesertevents.com', filename: 'black-desert' },
  { name: 'Mizuho Americas Open', url: 'https://www.mizuhoamericasopen.com', filename: 'mizuho-americas' },
  { name: 'Riviera Maya Open', url: 'https://www.rivieramayaopen.com', filename: 'riviera-maya' },
  { name: 'U.S. Women\'s Open presented by Ally', url: 'https://www.uswomensopen.com', filename: 'us-womens-open' },
  { name: 'ShopRite LPGA Classic presented by Acer', url: 'https://www.shopritelpgaclassic.com', filename: 'shoprite-lpga' },
  { name: 'Meijer LPGA Classic for Simply Give', url: 'https://www.meijerlpgaclassic.com', filename: 'meijer-lpga' },
  { name: 'KPMG Women\'s PGA Championship', url: 'https://www.kpmgwomenspgachampionship.com', filename: 'kpmg-womens-pga' },
  { name: 'Dow Championship', url: 'https://dowchampionship.com', filename: 'dow-championship' },
  { name: 'Amundi Evian Championship', url: 'https://www.evianchampionship.com', filename: 'amundi-evian' },
  { name: 'ISPS Handa Women\'s Scottish Open', url: 'https://www.womensscottish.com', filename: 'isps-handa-scottish' },
  { name: 'AIG Women\'s Open', url: 'https://www.aigwomensopen.com', filename: 'aig-womens-open' },
  { name: 'The Standard Portland Classic', url: 'https://www.portlandclassic.com', filename: 'portland-classic' },
  { name: 'CPKC Women\'s Open', url: 'https://www.cpkcwomensopen.com', filename: 'cpkc-womens-open' },
  { name: 'FM Championship', url: 'https://www.fmchampionship.com', filename: 'fm-championship' },
  { name: 'Kroger Queen City Championship presented by P&G', url: 'https://queencitylpga.com', filename: 'kroger-queen-city' },
  { name: 'Walmart NW Arkansas Championship presented by P&G', url: 'https://www.nwachampionship.com', filename: 'walmart-nw-arkansas' },
  { name: 'LOTTE Championship presented by Hoakalei', url: 'https://www.lottechampionship.com', filename: 'lotte-championship' },
  { name: 'Buick LPGA Shanghai', url: 'https://buick-lpgashanghai.com', filename: 'buick-lpga-shanghai' },
  { name: 'BMW Ladies Championship', url: 'https://www.bmw.co.kr/ko/discover/bmw-golfsport/bmw-ladies-championship-english.html', filename: 'bmw-ladies' },
  { name: 'Hanwha LIFEPLUS International Crown', url: 'https://crown.lpga.com', filename: 'hanwha-crown' },
  { name: 'Maybank Championship', url: 'https://www.klgcc.com/annual-event/maybank-championship-2025', filename: 'maybank-championship' },
  { name: 'TOTO Japan Classic', url: 'https://toto-japan-classic.com/en', filename: 'toto-japan' },
  { name: 'The ANNIKA driven by Gainbridge at Pelican', url: 'https://theannika.com', filename: 'annika-pelican' },
  { name: 'CME Group Tour Championship', url: 'https://www.cmegrouptourchampionship.com', filename: 'cme-tour-championship' },
  { name: 'Grant Thornton Invitational', url: 'https://www.grantthorntoninv.com', filename: 'grant-thornton' }
];

// Ensure tournaments directory exists
const tournamentsDir = path.join(__dirname, '..', 'public', 'images', 'tournaments');
if (!fs.existsSync(tournamentsDir)) {
  fs.mkdirSync(tournamentsDir, { recursive: true });
}

// Function to fetch HTML content
function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https:') ? https : http;
    
    const request = protocol.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 15000
    }, (response) => {
      let data = '';
      
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        resolve(data);
      });
    });
    
    request.on('error', (error) => {
      reject(error);
    });
    
    request.on('timeout', () => {
      request.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

// Function to download image
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https:') ? https : http;
    
    const request = protocol.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 20000
    }, (response) => {
      if (response.statusCode === 200) {
        const file = fs.createWriteStream(filepath);
        response.pipe(file);
        
        file.on('finish', () => {
          file.close();
          resolve();
        });
        
        file.on('error', (error) => {
          fs.unlink(filepath, () => {}); // Delete the file on error
          reject(error);
        });
      } else {
        reject(new Error(`HTTP ${response.statusCode}`));
      }
    });
    
    request.on('error', (error) => {
      reject(error);
    });
    
    request.on('timeout', () => {
      request.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

// Function to extract logo URLs from HTML - focused on "logo" in filename
function extractLogoUrls(html, baseUrl) {
  const logoUrls = [];
  const base = new URL(baseUrl);
  
  // More targeted patterns for logos
  const patterns = [
    // Look for images with "logo" in the src
    /<img[^>]*src="([^"]*logo[^"]*\.(?:png|svg|jpg|jpeg|webp))"[^>]*>/gi,
    // Look for images with "logo" in class or alt
    /<img[^>]*(?:class="[^"]*logo[^"]*"|alt="[^"]*logo[^"]*")[^>]*src="([^"]+\.(?:png|svg|jpg|jpeg|webp))"/gi,
    // Look for SVG elements (often logos)
    /<svg[^>]*>[\s\S]*?<\/svg>/gi,
    // Look for background images with logo
    /background-image:\s*url\(['"]?([^'"]*logo[^'"]*\.(?:png|svg|jpg|jpeg|webp))['"]?\)/gi,
    // Look for any src with logo in path
    /src="([^"]*logo[^"]*\.(?:png|svg|jpg|jpeg|webp))"/gi
  ];
  
  patterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(html)) !== null) {
      let url = match[1] || match[0];
      
      // Skip if it's an SVG element (we'll handle those separately)
      if (url.startsWith('<svg')) continue;
      
      // Convert relative URLs to absolute
      if (url.startsWith('//')) {
        url = base.protocol + url;
      } else if (url.startsWith('/')) {
        url = base.origin + url;
      } else if (!url.startsWith('http')) {
        url = new URL(url, baseUrl).href;
      }
      
      // Only include if it has "logo" in the filename and is an image
      if (url.toLowerCase().includes('logo') && 
          url.match(/\.(png|svg|jpg|jpeg|webp)$/i)) {
        logoUrls.push(url);
      }
    }
  });
  
  return [...new Set(logoUrls)]; // Remove duplicates
}

// Function to try common logo paths
async function tryCommonLogoPaths(baseUrl, filename) {
  const commonPaths = [
    `/images/logo.png`,
    `/images/logo.svg`,
    `/assets/images/logo.png`,
    `/assets/images/logo.svg`,
    `/img/logo.png`,
    `/img/logo.svg`,
    `/static/logo.png`,
    `/static/logo.svg`,
    `/logo.png`,
    `/logo.svg`,
    `/images/${filename}-logo.png`,
    `/images/${filename}-logo.svg`,
    `/assets/logo.png`,
    `/assets/logo.svg`
  ];
  
  const base = new URL(baseUrl);
  const results = [];
  
  for (const path of commonPaths) {
    const fullUrl = base.origin + path;
    try {
      // Try to fetch the URL to see if it exists
      const response = await new Promise((resolve, reject) => {
        const protocol = fullUrl.startsWith('https:') ? https : http;
        const request = protocol.get(fullUrl, {
          method: 'HEAD',
          timeout: 5000
        }, (response) => {
          resolve(response.statusCode);
        });
        
        request.on('error', () => resolve(404));
        request.on('timeout', () => resolve(404));
      });
      
      if (response === 200) {
        results.push(fullUrl);
      }
    } catch (error) {
      // Ignore errors, continue to next path
    }
  }
  
  return results;
}

// Main harvesting function
async function harvestLogos() {
  console.log('Starting targeted logo harvest (looking for "logo" in filenames)...\n');
  
  for (const tournament of tournaments) {
    try {
      console.log(`Processing: ${tournament.name}`);
      console.log(`URL: ${tournament.url}`);
      
      // First, try to find logos in the HTML
      const html = await fetchHTML(tournament.url);
      const logoUrls = extractLogoUrls(html, tournament.url);
      
      console.log(`Found ${logoUrls.length} potential logos in HTML`);
      
      // Also try common logo paths
      const commonLogos = await tryCommonLogoPaths(tournament.url, tournament.filename);
      console.log(`Found ${commonLogos.length} common logo paths`);
      
      const allLogos = [...logoUrls, ...commonLogos];
      
      if (allLogos.length > 0) {
        // Try to download the first few logos
        for (let i = 0; i < Math.min(3, allLogos.length); i++) {
          const logoUrl = allLogos[i];
          const extension = path.extname(new URL(logoUrl).pathname) || '.png';
          const filepath = path.join(tournamentsDir, `${tournament.filename}${extension}`);
          
          try {
            console.log(`  Downloading: ${logoUrl}`);
            await downloadImage(logoUrl, filepath);
            console.log(`  ✓ Saved: ${filepath}`);
            break; // Success, move to next tournament
          } catch (error) {
            console.log(`  ✗ Failed: ${error.message}`);
          }
        }
      } else {
        console.log('  No logos found');
      }
      
      console.log(''); // Empty line for readability
      
      // Add delay to be respectful to servers
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    } catch (error) {
      console.log(`✗ Error processing ${tournament.name}: ${error.message}\n`);
    }
  }
  
  console.log('Targeted logo harvest complete!');
}

// Run the harvester
harvestLogos().catch(console.error);
