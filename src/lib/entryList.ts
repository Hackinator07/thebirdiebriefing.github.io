/**
 * Entry List data and utilities
 */

export interface EntryListPlayer {
  id: string;
  rank: number;
  name: string;
  country: string;
  countryCode: string;
  exemption: string;
  entryStatus: string;
}

export interface EntryListData {
  players: EntryListPlayer[];
  lastUpdated: string;
  tournament: string;
}

// Parse the entry list data from the provided text
export function getEntryList(): EntryListData {
  const entryListText = `No. 	Name 	Represents 	Exemption 	Entry Status 	Rec.
EXEMPT
1 	Jeeno Thitikul (THA) 	Bangkok, Thailand 	CME Globe Race (1) 	Entered 	»»
2 	Miyu Yamashita (JPN) 	Osaka, Japan 	CME Globe Race (2) 	Entered 	»»
3 	Minjee Lee (AUS) 	Perth, Australia 	CME Globe Race (3) 	Entered 	»»
4 	Rio Takeda (JPN) 	Kumamoto, Japan 	CME Globe Race (4) 	Entered 	»»
5 	Hyo Joo Kim (KOR) 	Wonju-si, Republic of Korea 	CME Globe Race (5) 	Entered 	»»
6 	Hye-Jin Choi (KOR) 	Seoul, Republic of Korea 	CME Globe Race (6) 	Entered 	»»
7 	Sei Young Kim (KOR) 	Seoul, Republic of Korea 	CME Globe Race (7) 	Entered 	»»
8 	A Lim Kim (KOR) 	Gyeonggi-do, Republic of Korea 	CME Globe Race (8) 	Entered 	»»
9 	Nelly Korda (USA) 	Bradenton, FL 	CME Globe Race (9) 	Entered 	»»
10 	Somi Lee (KOR) 	Yongin-si, Republic of Korea 	CME Globe Race (10) 	Entered 	»»
11 	Mao Saigo (JPN) 	Hokkaido, Japan 	CME Globe Race (11) 	Entered 	»»
12 	Nasa Hataoka (JPN) 	Ibaraki, Japan 	CME Globe Race (12) 	Entered 	»»
13 	Akie Iwai (JPN) 	Saitama, Japan 	CME Globe Race (13) 	Entered 	»»
14 	Charley Hull (ENG) 	Kettering, England 	CME Globe Race (14) 	Entered 	»»
15 	Chisato Iwai (JPN) 	Saitama, Japan 	CME Globe Race (15) 	Entered 	»»
16 	Jin Hee Im (KOR) 	Seoul, Republic of Korea 	CME Globe Race (16) 	Entered 	»»
17 	Angel Yin (USA) 	Arcadia, CA 	CME Globe Race (17) 	Entered 	»»
18 	Minami Katsu (JPN) 	Kagoshima, Japan 	CME Globe Race (18) 	Entered 	»»
19 	Celine Boutier (FRA) 	Paris, France 	CME Globe Race (19) 	Entered 	»»
20 	Jennifer Kupcho (USA) 	Westminster, CO 	CME Globe Race (20) 	Entered 	»»
21 	Linn Grant (SWE) 	Helsingborg, Sweden 	CME Globe Race (21) 	Entered 	»»
22 	Haeran Ryu (KOR) 	Seoul, Republic of Korea 	CME Globe Race (22) 	Entered 	»»
23 	Andrea Lee (USA) 	Hermosa Beach, CA 	CME Globe Race (23) 	Entered 	»»
24 	Yealimi Noh (USA) 	Concord, CA 	CME Globe Race (24) 	Entered 	»»
25 	Ayaka Furue (JPN) 	Kobe, Japan 	CME Globe Race (25) 	Entered 	»»
26 	Lydia Ko (NZL) 	Auckland, New Zealand 	CME Globe Race (26) 	Entered 	»»
27 	Carlota Ciganda (ESP) 	Pamplona, Spain 	CME Globe Race (27) 	Entered 	»»
28 	Lindy Duncan (USA) 	Plantation, FL 	CME Globe Race (28) 	Entered 	»»
29 	Grace Kim (AUS) 	Sydney, Australia 	CME Globe Race (29) 	Entered 	»»
30 	Brooke M. Henderson (CAN) 	Smiths Falls, Canada 	CME Globe Race (30) 	Entered 	»»
31 	Lauren Coughlin (USA) 	Charlottesville, VA 	CME Globe Race (31) 	Entered 	»»
32 	Ariya Jutanugarn (THA) 	Bangkok, Thailand 	CME Globe Race (32) 	Entered 	»»
33 	Megan Khang (USA) 	Rockland, MA 	CME Globe Race (33) 	Entered 	»»
34 	Ruoning Yin (CHN) 	Beijing, People's Republic of China 	CME Globe Race (34) 	Entered 	»»
35 	Auston Kim (USA) 	Phoenix, AZ 	CME Globe Race (35) 	Entered 	»»
36 	Miranda Wang (CHN) 	Tianjin, People's Republic of China 	CME Globe Race (36) 	Entered 	»»
37 	Jin Young Ko (KOR) 	Seoul, Republic of Korea 	CME Globe Race (37) 	Entered 	»»
38 	Gaby Lopez (MEX) 	Mexico City, Mexico 	CME Globe Race (38) 	Entered 	»»
39 	Hannah Green (AUS) 	Perth, Australia 	CME Globe Race (39) 	Entered 	»»
40 	Maja Stark (SWE) 	Abbekas, Sweden 	CME Globe Race (40) 	Entered 	»»
41 	Esther Henseleit (GER) 	Hamburg, Germany 	CME Globe Race (41) 	Entered 	»»
42 	Lottie Woad (ENG) 	Stoke-on-Trent, England 	CME Globe Race (42) 	Entered 	»»
43 	Nanna Koerstz Madsen (DEN) 	Haderslev, Denmark 	CME Globe Race (43) 	Entered 	»»
44 	Chanettee Wannasaen (THA) 	Chiang mai, Thailand 	CME Globe Race (44) 	Entered 	»»
45 	Stephanie Kyriacou (AUS) 	Sydney, Australia 	CME Globe Race (45) 	Entered 	»»
46 	Sarah Schmelzel (USA) 	Chandler, AZ 	CME Globe Race (46) 	Entered 	»»
47 	Madelene Sagstrom (SWE) 	Gothenburg, Sweden 	CME Globe Race (47) 	Entered 	»»
48 	Jenny Bae (USA) 	Vienna, VA 	CME Globe Race (48) 	Entered 	»»
49 	Allisen Corpuz (USA) 	Honolulu, HI 	CME Globe Race (49) 	Entered 	»»
50 	Ingrid Lindblad (SWE) 	Halmstad, Sweden 	CME Globe Race (50) 	Entered 	»»
51 	Mi Hyang Lee (KOR) 	Seoul, Republic of Korea 	CME Globe Race (51) 	Entered 	»»
52 	Lexi Thompson (USA) 	Coral Springs, FL 	CME Globe Race (52) 	Entered 	»»
53 	Manon De Roey (BEL) 	Lint, Belgium 	CME Globe Race (53) 	Entered 	»»
54 	Yan Liu (CHN) 	Fujian, People's Republic of China 	CME Globe Race (54) 	Entered 	»»
55 	Patty Tavatanakit (THA) 	Bangkok, Thailand 	CME Globe Race (55) 	Entered 	»»
56 	Leona Maguire (IRL) 	Cavan, Ireland 	CME Globe Race (56) 	Entered 	»»
57 	Nataliya Guseva (UNA) 	Miami, FL 	CME Globe Race (57) 	Entered 	»»
58 	Lucy Li (USA) 	Redwood Shores, CA 	CME Globe Race (58) 	Entered 	»»
59 	Brooke Matthews (USA) 	Tomball, TX 	CME Globe Race (59) 	Entered 	»»
60 	Pajaree Anannarukarn (THA) 	Bangkok, Thailand 	CME Globe Race (60) 	Entered 	»»`;

  const lines = entryListText.split('\n');
  const players: EntryListPlayer[] = [];
  
  // Country code mapping for common variations
  const countryCodeMap: Record<string, string> = {
    'USA': 'USA',
    'KOR': 'KOR', 
    'NZL': 'NZL',
    'THA': 'THA',
    'JPN': 'JPN',
    'AUS': 'AUS',
    'FRA': 'FRA',
    'SWE': 'SWE',
    'UNA': 'USA', // Unaffiliated - treat as USA
    'ENG': 'GBR', // England -> Great Britain
    'GER': 'GER',
    'DEN': 'DEN',
    'MEX': 'MEX',
    'RSA': 'ZAF', // South Africa
    'CHN': 'CHN',
    'TPE': 'TWN', // Chinese Taipei -> Taiwan
    'TWN': 'TWN', // Taiwan
    'NIR': 'GBR', // Northern Ireland -> Great Britain
    'SCO': 'GBR', // Scotland -> Great Britain
    'ESP': 'ESP',
    'BEL': 'BEL',
    'CAN': 'CAN',
    'IND': 'IND',
    'PHI': 'PHL', // Philippines
    'ITA': 'ITA',
    'NED': 'NLD', // Netherlands
    'PAR': 'PRY', // Paraguay
    'ECU': 'ECU',
    'COL': 'COL', // Colombia
    'SLO': 'SVN', // Slovenia
    'MAS': 'MYS', // Malaysia
    'NOR': 'NOR', // Norway
    'SUI': 'CHE', // Switzerland
    'IRL': 'IRL' // Ireland
  };

  for (const line of lines) {
    // Skip header lines and empty lines
    if (line.includes('No.') || line.includes('EXEMPT') || line.includes('AUTOMATICALLY') || line.includes('MORE RESERVED') || line.trim() === '') {
      continue;
    }

    // Parse each line - format: "rank \tname (country) \tlocation \texemption \tstatus \t»»"
    const parts = line.split('\t');
    if (parts.length >= 5) {
      const rank = parseInt(parts[0].trim());
      const nameWithCountry = parts[1].trim();
      const exemption = parts[3].trim();
      const status = parts[4].trim();

      // Extract name and country from "Name (COUNTRY)" format
      // Handle cases like "Vidhi Lakhawala (USA) (a)" by taking the first country code
      const nameMatch = nameWithCountry.match(/^(.+?)\s*\(([^)]+)\)/);
      if (nameMatch) {
        const name = nameMatch[1].trim();
        const countryCode = nameMatch[2].trim();
        const mappedCountryCode = countryCodeMap[countryCode] || countryCode;

        players.push({
          id: `player-${rank}`,
          rank,
          name,
          country: countryCode,
          countryCode: mappedCountryCode,
          exemption,
          entryStatus: status
        });
      }
    }
  }

  return {
    players,
    lastUpdated: new Date().toISOString(),
    tournament: 'CME Group Tour Championship 2025'
  };
}
