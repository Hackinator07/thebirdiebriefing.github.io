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
1 	Minjee Lee (AUS) 	Perth, Australia 	K83 (2) 	Entered 	»»
2 	Miyu Yamashita (JPN) 	Osaka, Japan 	K83 (3) 	Entered 	»»
3 	Rio Takeda (JPN) 	Kumamoto, Japan 	K83 (4) 	Entered 	»»
4 	Somi Lee (KOR) 	Yongin-si, Republic of Korea 	K83 (10) 	Entered 	»»
5 	Akie Iwai (JPN) 	Saitama, Japan 	K83 (12) 	Entered 	»»
6 	Chisato Iwai (JPN) 	Saitama, Japan 	K83 (13) 	Entered 	»»
7 	Ayaka Furue (JPN) 	Kobe, Japan 	K83 (22) 	Entered 	»»
8 	Ariya Jutanugarn (THA) 	Bangkok, Thailand 	K83 (23) 	Entered 	»»
9 	Miranda Wang (CHN) 	Tianjin, People's Republic of China 	K83 (33) 	Entered 	»»
10 	Chanettee Wannasaen (THA) 	Chiang mai, Thailand 	K83 (37) 	Entered 	»»
11 	Minami Katsu (JPN) 	Kagoshima, Japan 	K83 (38) 	Entered 	»»
12 	Nasa Hataoka (JPN) 	Ibaraki, Japan 	K83 (41) 	Entered 	»»
13 	Manon De Roey (BEL) 	Lint, Belgium 	K83 (54) 	Entered 	»»
14 	Patty Tavatanakit (THA) 	Bangkok, Thailand 	K83 (55) 	Entered 	»»
15 	Pajaree Anannarukarn (THA) 	Bangkok, Thailand 	K83 (56) 	Entered 	»»
16 	Wei-Ling Hsu (TPE) 	New Taipei City, Chinese Taipei 	K83 (57) 	Entered 	»»
17 	Yan Liu (CHN) 	Fujian, People's Republic of China 	K83 (59) 	Entered 	»»
18 	Julia Lopez Ramirez (ESP) 	Benahavis, Spain 	K83 (61) 	Entered 	»»
19 	Gurleen Kaur (USA) 	Houston, TX 	K83 (62) 	Entered 	»»
20 	Kristen Gillman (USA) 	Austin, TX 	K83 (63) 	Entered 	»»
21 	Saki Baba (JPN) 	Tokyo, Japan 	K83 (65) 	Entered 	»»
22 	Robyn Choi (AUS) 	Gold Coast, Australia 	K83 (67) 	Entered 	»»
23 	Lucy Li (USA) 	Redwood Shores, CA 	K83 (68) 	Entered 	»»
24 	Ilhee Lee (KOR) 	Seoul, Republic of Korea 	K83 (69) 	Entered 	»»
25 	Yuri Yoshida (JPN) 	Chiba, Japan 	K83 (70) 	Entered 	»»
26 	Aditi Ashok (IND) 	Bangalore, India 	K83 (72) 	Entered 	»»
27 	Nataliya Guseva (UNA) 	Miami, FL 	K83 (73) 	Entered 	»»
28 	Mary Liu (CHN) 	Xi'an, People's Republic of China 	K83 (74) 	Entered 	»»
29 	Pauline Roussin-Bouchard (FRA) 	Orcieres 1850, France 	K83 (75) 	Entered 	»»
30 	Benedetta Moresco (ITA) 	Caldogno, Italy 	K83 (76) 	Entered 	»»
31 	Karis Davidson (AUS) 	Gold Coast, Australia 	K83 (78) 	Entered 	»»
32 	Ina Yoon (KOR) 	Seoul, Republic of Korea 	K83 (80) 	Entered 	»»
33 	Haeji Kang (KOR) 	Seoul, Republic of Korea 	K83 (81) 	Entered 	»»
34 	Gemma Dryburgh (SCO) 	Aberdeen, Scotland 	K83 (82) 	Entered 	»»
35 	Weiwei Zhang (CHN) 	Hainan, People's Republic of China 	K83 (83) 	Entered 	»»
36 	Paula Reto (RSA) 	Bloemfontein, South Africa 	K83 (85) 	Entered 	»»
37 	Celine Borge (NOR) 	Tonsberg, Norway 	K83 (88) 	Entered 	»»
38 	Emily Kristine Pedersen (DEN) 	Smoerum, Denmark 	K83 (90) 	Entered 	»»
39 	Arpichaya Yubol (THA) 	Saraburi, Thailand 	K83 (91) 	Entered 	»»
40 	Dewi Weber (NED) 	Groningen, Netherlands 	K83 (92) 	Entered 	»»
41 	Jeongeun Lee5 (KOR) 	Seoul, Republic of Korea 	K83 (94) 	Entered 	»»
42 	Kumkang Park (KOR) 	Seoul, Republic of Korea 	K83 (95) 	Entered 	»»
43 	Aline Krauter (GER) 	Stuttgart, Germany 	K83 (96) 	Entered 	»»
STEP UP TOUR
44 	Shuri Sakuma (JPN) 	Kawagoe, Japan 	S70 (1) 	Entered 	»»
45 	Sora Kamiya (JPN) 	Gifu, Japan 	S70 (2) 	Entered 	»»
46 	Yui Kawamoto (JPN) 	Ehime, Japan 	S70 (3) 	Entered 	»»
47 	Fuka Suga (JPN) 	Miyazaki, Japan 	S70 (4) 	Entered 	»»
48 	Sayaka Takahashi (JPN) 	Niigata, Japan 	S70 (5) 	Entered 	»»
49 	Shina Kanazawa (JPN) 	Ibaraki, Japan 	S70 (6) 	Entered 	»»
50 	Shiho Kuwaki (JPN) 	Okayama, Japan 	S70 (7) 	Entered 	»»
51 	Yuna Araki (JPN) 	Tamana, Japan 	S70 (8) 	Entered 	»»
52 	Ai Suzuki (JPN) 	Tokushima, Japan 	S70 (9) 	Entered 	»»
53 	Jiyai Shin (KOR) 	Gyeonggi-do, Republic of Korea 	S70 (10) 	Entered 	»»
54 	Ayako Kimura (JPN) 	Osaka, Japan 	S70 (11) 	Entered 	»»
55 	Saki Nagamine (JPN) 	Miyazaki, Japan 	S70 (12) 	Entered 	»»
56 	Mitsuki Kobayashi (JPN) 	Tsuyama City, Japan 	S70 (13) 	Entered 	»»
57 	Kotone Hori (JPN) 	Tokushima, Japan 	S70 (14) 	Entered 	»»
58 	Saiki Fujita (JPN) 	Shizuoka, Japan 	S70 (15) 	Entered 	»»
59 	MinYoung Lee (KOR) 	Gyeonggi, Republic of Korea 	S70 (16) 	Entered 	»»
60 	Miyu Sato (JPN) 	Tokyo, Japan 	S70 (17) 	Entered 	»»
61 	Hibiki Iriya (JPN) 	Aichi, Japan 	S70 (18) 	Entered 	»»
62 	Lala Anai (JPN) 	Okazaki, Japan 	S70 (19) 	Entered 	»»
63 	Chia Yen Wu (TPE) 	Hsinchu, Chinese Taipei 	S70 (20) 	Entered 	»»
64 	Asuka Kashiwabara (JPN) 	Miyazaki, Japan 	S70 (21) 	Entered 	»»
65 	Ayaka Watanabe (JPN) 	Atami, Japan 	S70 (22) 	Entered 	»»
66 	Kano Nakamura (JPN) 	Kyoto, Japan 	S70 (23) 	Entered 	»»
67 	Kotoko Uchida (JPN) 	Sapporo, Japan 	S70 (24) 	Entered 	»»
68 	Yuka Yasuda (JPN) 	Kobe, Japan 	S70 (25) 	Entered 	»»
69 	Nana Yamashiro (JPN) 	Okinawa, Japan 	S70 (26) 	Entered 	»»
70 	Eri Okayama (JPN) 	Osaka, Japan 	S70 (27) 	Entered 	»»
71 	Aihi Takano (JPN) 	Tokyo, Japan 	S70 (28) 	Entered 	»»
72 	Kana Nagai (JPN) 	Tokyo, Japan 	S70 (29) 	Entered 	»»
73 	Karen Tsuruoka (JPN) 	Yokohama City, Japan 	S70 (30) 	Entered 	»»
74 	Nanako Inagaki (JPN) 	Saitama, Japan 	S70 (31) 	Entered 	»»
75 	Mi Jeong Jeon (KOR) 	Daejeon, Republic of Korea 	S70 (32) 	Entered 	»»
76 	Seonwoo Bae (KOR) 	Gyeonggi-do, Republic of Korea 	S70 (33) 	Entered 	»»
77 	Nana Suganuma (JPN) 	Tokyo, Japan 	S70 (34) 	Entered 	»»
78 	Serena Aoki (JPN) 	Gunma, Japan 	S70 (35) 	Entered 	»»`;

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
