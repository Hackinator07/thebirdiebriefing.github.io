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
2 	Minjee Lee (AUS) 	Perth, Australia 	K83 (2) 	Entered 	»»
3 	Miyu Yamashita (JPN) 	Osaka, Japan 	K83 (3) 	Entered 	»»
4 	Rio Takeda (JPN) 	Kumamoto, Japan 	K83 (4) 	Entered 	»»
5 	Angel Yin (USA) 	Arcadia, CA 	K83 (8) 	Entered 	»»
6 	Somi Lee (KOR) 	Yongin-si, Republic of Korea 	K83 (10) 	Entered 	»»
7 	Hye-Jin Choi (KOR) 	Gyeonggi-do, Republic of Korea 	K83 (11) 	Entered 	»»
8 	Jin Hee Im (KOR) 	Jeju, Republic of Korea 	K83 (14) 	Entered 	»»
9 	A Lim Kim (KOR) 	Seongnam-si, Republic of Korea 	K83 (15) 	Entered 	»»
10 	Sei Young Kim (KOR) 	Seoul, Republic of Korea 	K83 (19) 	Entered 	»»
11 	Ariya Jutanugarn (THA) 	Bangkok, Thailand 	K83 (23) 	Entered 	»»
12 	Carlota Ciganda (ESP) 	Pamplona, Spain 	K83 (25) 	Entered 	»»
13 	Ruoning Yin (CHN) 	ShangHai, People's Republic of China 	K83 (29) 	Entered 	»»
14 	Jennifer Kupcho (USA) 	Westminster, CO 	K83 (30) 	Entered 	»»
15 	Miranda Wang (CHN) 	Tianjin, People's Republic of China 	K83 (33) 	Entered 	»»
16 	Lindy Duncan (USA) 	Plantation, FL 	K83 (35) 	Entered 	»»
17 	Esther Henseleit (GER) 	Hamburg, Germany 	K83 (36) 	Entered 	»»
18 	Minami Katsu (JPN) 	Kagoshima, Japan 	K83 (38) 	Entered 	»»
19 	Auston Kim (USA) 	St. Augustine, FL 	K83 (39) 	Entered 	»»
20 	Nasa Hataoka (JPN) 	Ibaraki, Japan 	K83 (41) 	Entered 	»»
21 	Stephanie Kyriacou (AUS) 	Sydney, Australia 	K83 (43) 	Entered 	»»
22 	Sarah Schmelzel (USA) 	Phoenix, AZ 	K83 (44) 	Entered 	»»
23 	Gaby Lopez (MEX) 	Mexico City, Mexico 	K83 (45) 	Entered 	»»
24 	Nanna Koerstz Madsen (DEN) 	Smoerum, Denmark 	K83 (46) 	Entered 	»»
25 	Allisen Corpuz (USA) 	Kapolei, HI 	K83 (49) 	Entered 	»»
26 	Jenny Bae (USA) 	Suwanee, GA 	K83 (51) 	Entered 	»»
27 	Leona Maguire (IRL) 	Cavan, Ireland 	K83 (52) 	Entered 	»»
28 	Manon De Roey (BEL) 	Lint, Belgium 	K83 (54) 	Entered 	»»
29 	Patty Tavatanakit (THA) 	Bangkok, Thailand 	K83 (55) 	Entered 	»»
30 	Pajaree Anannarukarn (THA) 	Bangkok, Thailand 	K83 (56) 	Entered 	»»
31 	Wei-Ling Hsu (TPE) 	New Taipei City, Chinese Taipei 	K83 (57) 	Entered 	»»
32 	Cassie Porter (AUS) 	Peregian Springs, Australia 	K83 (58) 	Entered 	»»
33 	Yan Liu (CHN) 	Fujian, People's Republic of China 	K83 (59) 	Entered 	»»
34 	Jenny Shin (KOR) 	Seoul, Republic of Korea 	K83 (60) 	Entered 	»»
35 	Julia Lopez Ramirez (ESP) 	Benahavis, Spain 	K83 (61) 	Entered 	»»
36 	Gurleen Kaur (USA) 	Houston, TX 	K83 (62) 	Entered 	»»
37 	Kristen Gillman (USA) 	Austin, TX 	K83 (63) 	Entered 	»»
38 	Lilia Vu (USA) 	Fountain Valley, CA 	K83 (64) 	Entered 	»»
39 	Saki Baba (JPN) 	Tokyo, Japan 	K83 (65) 	Entered 	»»
40 	Gabriela Ruffels (AUS) 	Melbourne, Australia 	K83 (66) 	Entered 	»»
41 	Robyn Choi (AUS) 	Gold Coast, Australia 	K83 (67) 	Entered 	»»
42 	Lucy Li (USA) 	Redwood Shores, CA 	K83 (68) 	Entered 	»»
43 	Ilhee Lee (KOR) 	Seoul, Republic of Korea 	K83 (69) 	Entered 	»»
44 	Yuri Yoshida (JPN) 	Chiba, Japan 	K83 (70) 	Entered 	»»
45 	Brooke Matthews (USA) 	Rogers, AR 	K83 (71) 	Entered 	»»
46 	Aditi Ashok (IND) 	Bangalore, India 	K83 (72) 	Entered 	»»
47 	Nataliya Guseva (UNA) 	Miami, FL 	K83 (73) 	Entered 	»»
48 	Mary Liu (CHN) 	Xi'an, People's Republic of China 	K83 (74) 	Entered 	»»
49 	Pauline Roussin-Bouchard (FRA) 	Orcieres 1850, France 	K83 (75) 	Entered 	»»
50 	Benedetta Moresco (ITA) 	Caldogno, Italy 	K83 (76) 	Entered 	»»
51 	Karis Davidson (AUS) 	Gold Coast, Australia 	K83 (78) 	Entered 	»»
52 	Ashleigh Buhai (RSA) 	Johannesburg, South Africa 	K83 (79) 	Entered 	»»
53 	Ina Yoon (KOR) 	Seoul, Republic of Korea 	K83 (80) 	Entered 	»»
54 	Haeji Kang (KOR) 	Seoul, Republic of Korea 	K83 (81) 	Entered 	»»
55 	Gemma Dryburgh (SCO) 	Aberdeen, Scotland 	K83 (82) 	Entered 	»»
56 	Weiwei Zhang (CHN) 	Hainan, People's Republic of China 	K83 (83) 	Entered 	»»
57 	Narin An (KOR) 	Seoul, Republic of Korea 	K83 (84) 	Entered 	»»
58 	Paula Reto (RSA) 	Bloemfontein, South Africa 	K83 (85) 	Entered 	»»
59 	Celine Borge (NOR) 	Tonsberg, Norway 	K83 (88) 	Entered 	»»
60 	Albane Valenzuela (SUI) 	Geneva, Switzerland 	K83 (89) 	Entered 	»»
61 	Emily Kristine Pedersen (DEN) 	Smoerum, Denmark 	K83 (90) 	Entered 	»»
62 	Arpichaya Yubol (THA) 	Saraburi, Thailand 	K83 (91) 	Entered 	»»
63 	Muni He (CHN) 	Chengdu, People's Republic of China 	L23 (1) 	Entered 	»»
64 	Danielle Kang (USA) 	Las Vegas, NV 	L23 (2) 	Entered 	»»
65 	Chih Yen Chang (TPE) 	Kaohsiung, Chinese Taipei 	L23 (3) 	Entered 	»»
66 	Yu Yuan Jiang (CHN) (a) 	Beijing, People's Republic of China 	L23 (4) 	Entered 	»»
67 	Hira Naveed (AUS) 	Perth, Australia 	L45 (1) 	Entered 	»»
68 	Ruixin Liu (CHN) 	Guangdong, People's Republic of China 	S75 (1) 	Entered 	»»
69 	Yahui Zhang (CHN) 	Wuhan Hubei, People's Republic of China 	S75 (2) 	Entered 	»»
70 	Shuying Li (CHN) 	Jilin, People's Republic of China 	S75 (3) 	Entered 	»»
71 	Yuai Ji (CHN) 	Shenzhen, People's Republic of China 	S75 (4) 	Entered 	»»
72 	Yu Liu (CHN) 	Beijing, People's Republic of China 	S75 (5) 	Entered 	»»
73 	Xiaowen Yin (CHN) 	Tianjin, People's Republic of China 	S75 (6) 	Entered 	»»
74 	Shiyuan Zhou (CHN) (a) 	Chongqing, People's Republic of China 	S75 (7) 	Entered 	»»
75 	Ying Xu (CHN) (a) 	Zhuhai, People's Republic of China 	S75 (8) 	Entered 	»»
76 	Menghan Li (CHN) (a) 	Shandong, People's Republic of China 	S75 (9) 	Entered 	»»
77 	Zixuan Wang (CHN) 	Beijing, People's Republic of China 	S75 (10) 	Entered 	»»
78 	Yijia Ren (CHN) (a) 	Dalian, People's Republic of China 	S75 (11) 	Entered 	»»
79 	Yujie Liu (CHN) (a) 	Beijing, People's Republic of China 	S75 (12) 	Entered 	»»
80 	Zining An (CHN) (a) 	Tianjin, People's Republic of China 	S75 (13) 	Entered 	»»
81 	Runzhi Pang (CHN) 	Tianjin, People's Republic of China 	S75 (14) 	Entered 	»»
82 	Sherman Santiwiwatthanaphong (THA) 	Buengkan, Thailand 	S75 (15) 	Entered 	»»`;

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
    'SLO': 'SVN' // Slovenia
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
    tournament: 'Buick LPGA Shanghai'
  };
}
