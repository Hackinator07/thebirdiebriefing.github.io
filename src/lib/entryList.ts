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
1 	Jeeno Thitikul (THA) 	Bangkok, Thailand 	K83 (1) 	Entered 	»»
2 	Miyu Yamashita (JPN) 	Osaka, Japan 	K83 (3) 	Entered 	»»
3 	Rio Takeda (JPN) 	Kumamoto, Japan 	K83 (4) 	Entered 	»»
4 	Angel Yin (USA) 	Arcadia, CA 	K83 (8) 	Entered 	»»
5 	Somi Lee (KOR) 	Yongin-si, Republic of Korea 	K83 (10) 	Entered 	»»
6 	Hye-Jin Choi (KOR) 	Gyeonggi-do, Republic of Korea 	K83 (11) 	Entered 	»»
7 	Akie Iwai (JPN) 	Saitama, Japan 	K83 (12) 	Entered 	»»
8 	Chisato Iwai (JPN) 	Saitama, Japan 	K83 (13) 	Entered 	»»
9 	Jin Hee Im (KOR) 	Jeju, Republic of Korea 	K83 (14) 	Entered 	»»
10 	A Lim Kim (KOR) 	Seongnam-si, Republic of Korea 	K83 (15) 	Entered 	»»
11 	Lydia Ko (NZL) 	Auckland, New Zealand 	K83 (16) 	Entered 	»»
12 	Andrea Lee (USA) 	Hermosa Beach, CA 	K83 (17) 	Entered 	»»
13 	Haeran Ryu (KOR) 	Suwon, Republic of Korea 	K83 (18) 	Entered 	»»
14 	Sei Young Kim (KOR) 	Seoul, Republic of Korea 	K83 (19) 	Entered 	»»
15 	Celine Boutier (FRA) 	Montrouge, France 	K83 (20) 	Entered 	»»
16 	Yealimi Noh (USA) 	San Francisco, CA 	K83 (21) 	Entered 	»»
17 	Ayaka Furue (JPN) 	Kobe, Japan 	K83 (22) 	Entered 	»»
18 	Carlota Ciganda (ESP) 	Pamplona, Spain 	K83 (25) 	Entered 	»»
19 	Grace Kim (AUS) 	Sydney, Australia 	K83 (26) 	Entered 	»»
20 	Brooke M. Henderson (CAN) 	Smiths Falls, Ontario 	K83 (28) 	Entered 	»»
21 	Ruoning Yin (CHN) 	ShangHai, People's Republic of China 	K83 (29) 	Entered 	»»
22 	Miranda Wang (CHN) 	Tianjin, People's Republic of China 	K83 (33) 	Entered 	»»
23 	Lottie Woad (ENG) 	Farnham, England 	K83 (34) 	Entered 	»»
24 	Lindy Duncan (USA) 	Plantation, FL 	K83 (35) 	Entered 	»»
25 	Chanettee Wannasaen (THA) 	Chiang mai, Thailand 	K83 (37) 	Entered 	»»
26 	Minami Katsu (JPN) 	Kagoshima, Japan 	K83 (38) 	Entered 	»»
27 	Auston Kim (USA) 	St. Augustine, FL 	K83 (39) 	Entered 	»»
28 	Linn Grant (SWE) 	Viken, Sweden 	K83 (40) 	Entered 	»»
29 	Nasa Hataoka (JPN) 	Ibaraki, Japan 	K83 (41) 	Entered 	»»
30 	Gaby Lopez (MEX) 	Mexico City, Mexico 	K83 (45) 	Entered 	»»
31 	Nanna Koerstz Madsen (DEN) 	Smoerum, Denmark 	K83 (46) 	Entered 	»»
32 	Mi Hyang Lee (KOR) 	Seoul, Republic of Korea 	K83 (47) 	Entered 	»»
33 	Ingrid Lindblad (SWE) 	Halmstad, Sweden 	K83 (48) 	Entered 	»»
34 	Jenny Bae (USA) 	Suwanee, GA 	K83 (51) 	Entered 	»»
35 	Leona Maguire (IRL) 	Cavan, Ireland 	K83 (52) 	Entered 	»»
36 	Hannah Green (AUS) 	Perth, Australia 	K83 (53) 	Entered 	»»
37 	Manon De Roey (BEL) 	Lint, Belgium 	K83 (54) 	Entered 	»»
38 	Patty Tavatanakit (THA) 	Bangkok, Thailand 	K83 (55) 	Entered 	»»
39 	Pajaree Anannarukarn (THA) 	Bangkok, Thailand 	K83 (56) 	Entered 	»»
40 	Wei-Ling Hsu (TPE) 	New Taipei City, Chinese Taipei 	K83 (57) 	Entered 	»»
41 	Cassie Porter (AUS) 	Peregian Springs, Australia 	K83 (58) 	Entered 	»»
42 	Yan Liu (CHN) 	Fujian, People's Republic of China 	K83 (59) 	Entered 	»»
43 	Julia Lopez Ramirez (ESP) 	Benahavis, Spain 	K83 (61) 	Entered 	»»
44 	Gurleen Kaur (USA) 	Houston, TX 	K83 (62) 	Entered 	»»
45 	Kristen Gillman (USA) 	Austin, TX 	K83 (63) 	Entered 	»»
46 	Lilia Vu (USA) 	Fountain Valley, CA 	K83 (64) 	Entered 	»»
47 	Saki Baba (JPN) 	Tokyo, Japan 	K83 (65) 	Entered 	»»
48 	Robyn Choi (AUS) 	Gold Coast, Australia 	K83 (67) 	Entered 	»»
49 	Lucy Li (USA) 	Redwood Shores, CA 	K83 (68) 	Entered 	»»
50 	Ilhee Lee (KOR) 	Seoul, Republic of Korea 	K83 (69) 	Entered 	»»
51 	Yuri Yoshida (JPN) 	Chiba, Japan 	K83 (70) 	Entered 	»»
52 	Aditi Ashok (IND) 	Bangalore, India 	K83 (72) 	Entered 	»»
53 	Nataliya Guseva (UNA) 	Miami, FL 	K83 (73) 	Entered 	»»
54 	Mary Liu (CHN) 	Xi'an, People's Republic of China 	K83 (74) 	Entered 	»»
55 	Pauline Roussin-Bouchard (FRA) 	Orcieres 1850, France 	K83 (75) 	Entered 	»»
56 	Benedetta Moresco (ITA) 	Caldogno, Italy 	K83 (76) 	Entered 	»»
57 	Karis Davidson (AUS) 	Gold Coast, Australia 	K83 (78) 	Entered 	»»
58 	Ashleigh Buhai (RSA) 	Johannesburg, South Africa 	K83 (79) 	Entered 	»»
59 	Ina Yoon (KOR) 	Seoul, Republic of Korea 	K83 (80) 	Entered 	»»
60 	Haeji Kang (KOR) 	Seoul, Republic of Korea 	K83 (81) 	Entered 	»»
61 	Gemma Dryburgh (SCO) 	Aberdeen, Scotland 	K83 (82) 	Entered 	»»
62 	Weiwei Zhang (CHN) 	Hainan, People's Republic of China 	K83 (83) 	Entered 	»»
63 	Paula Reto (RSA) 	Bloemfontein, South Africa 	K83 (85) 	Entered 	»»
64 	Elizabeth Szokol (USA) 	Chicago, IL 	K83 (86) 	Entered 	»»
65 	Celine Borge (NOR) 	Tonsberg, Norway 	K83 (88) 	Entered 	»»
66 	Albane Valenzuela (SUI) 	Geneva, Switzerland 	K83 (89) 	Entered 	»»
67 	Emily Kristine Pedersen (DEN) 	Smoerum, Denmark 	K83 (90) 	Entered 	»»
68 	Arpichaya Yubol (THA) 	Saraburi, Thailand 	K83 (91) 	Entered 	»»
68 AUTOMATICALLY EXEMPT PLACES
69 	Ashley Lau (MAS) 	Bintulu, Malaysia 	L23 (1) 	Entered 	»»
70 	Mirabel Ting (MAS) 	Miri, Malaysia 	L23 (2) 	Entered 	»»
71 	Liyana Durisic (MAS) 	Selangor, Malaysia 	L23 (3) 	Entered 	»»
72 	Genevieve Ling (MAS) 	Selangor, Malaysia 	L23 (4) 	Entered 	»»
73 	Kelly Tan (MAS) 	Batu Pahat, Malaysia 	L23 (5) 	Entered 	»»
74 	Kritchanya Kaopattanaskul (THA) (a) 	Pattaya City, Thailand 	L23 (6) 	Entered 	»»
75 	Achiraya Sriwong (THA) (a) 	Loei, Thailand 	L23 (7) 	Entered 	»»
76 	Namo Luangnitikul (THA) (a) 	Phuket, Thailand 	L23 (8) 	Entered 	»»
77 	Cholcheva Wongras (THA) 	Chiangmai, Thailand 	L23 (9) 	Entered 	»»
78 	Kan Bunnabodee (THA) 	Chonburi, Thailand 	L23 (10) 	Entered 	»»`;

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
    tournament: 'Maybank Championship 2025'
  };
}
