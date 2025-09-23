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
1 	Nelly Korda (USA) 	Bradenton, FL 	L01 (1) 	Entered 	»»
2 	Brooke M. Henderson (CAN) 	Smiths Falls, Ontario 	L01 (13) 	Entered 	»»
3 	Hye-Jin Choi (KOR) 	Gyeonggi-do, Republic of Korea 	L01 (16) 	Entered 	»»
4 	Yuka Saso (JPN) 	Tokyo, Japan 	L01 (19) 	Entered 	»»
5 	Patty Tavatanakit (THA) 	Bangkok, Thailand 	L01 (20) 	Entered 	»»
6 	Jin Hee Im (KOR) 	Jeju, Republic of Korea 	L01 (22) 	Entered 	»»
7 	Jennifer Kupcho (USA) 	Westminster, CO 	L01 (23) 	Entered 	»»
8 	Megan Khang (USA) 	Rockland, MA 	L01 (24) 	Entered 	»»
9 	Narin An (KOR) 	Seoul, Republic of Korea 	L01 (25) 	Entered 	»»
10 	Nataliya Guseva (UNA) 	Miami, FL 	L01 (26) 	Entered 	»»
11 	A Lim Kim (KOR) 	Seongnam-si, Republic of Korea 	L01 (28) 	Entered 	»»
12 	Nasa Hataoka (JPN) 	Ibaraki, Japan 	L01 (30) 	Entered 	»»
13 	Charley Hull (ENG) 	Woburn, England 	L01 (31) 	Entered 	»»
14 	Gabriela Ruffels (AUS) 	Melbourne, Australia 	L01 (32) 	Entered 	»»
15 	Lucy Li (USA) 	Redwood Shores, CA 	L01 (34) 	Entered 	»»
16 	Amy Yang (KOR) 	Seoul, Republic of Korea 	L01 (36) 	Entered 	»»
17 	Sarah Schmelzel (USA) 	Phoenix, AZ 	L01 (37) 	Entered 	»»
18 	Jasmine Suwannapura (THA) 	Bangkok, Thailand 	L01 (43) 	Entered 	»»
19 	Andrea Lee (USA) 	Hermosa Beach, CA 	L01 (44) 	Entered 	»»
20 	Jenny Shin (KOR) 	Seoul, Republic of Korea 	L01 (45) 	Entered 	»»
21 	Allisen Corpuz (USA) 	Kapolei, HI 	L01 (46) 	Entered 	»»
22 	Pajaree Anannarukarn (THA) 	Bangkok, Thailand 	L01 (51) 	Entered 	»»
23 	Bailey Tardy (USA) 	Norcross, GA 	L01 (54) 	Entered 	»»
24 	Madelene Sagstrom (SWE) 	Enkoping, Sweden 	L01 (56) 	Entered 	»»
25 	Arpichaya Yubol (THA) 	Saraburi, Thailand 	L01 (57) 	Entered 	»»
26 	Mi Hyang Lee (KOR) 	Seoul, Republic of Korea 	L01 (59) 	Entered 	»»
27 	Linnea Strom (SWE) 	Hovas, Sweden 	L01 (60) 	Entered 	»»
28 	Ryann O'Toole (USA) 	San Clemente, CA 	L01 (61) 	Entered 	»»
29 	Leona Maguire (IRL) 	Cavan, Ireland 	L01 (62) 	Entered 	»»
30 	Hyo Joo Kim (KOR) 	Wonju, Republic of Korea 	L01 (63) 	Entered 	»»
31 	Auston Kim (USA) 	St. Augustine, FL 	L01 (67) 	Entered 	»»
32 	Hinako Shibuno (JPN) 	Okayama, Japan 	L01 (68) 	Entered 	»»
33 	Alexa Pano (USA) 	Westborough, MA 	L01 (69) 	Entered 	»»
34 	Alison Lee (USA) 	Los Angeles, CA 	L01 (71) 	Entered 	»»
35 	Brittany Altomare (USA) 	Shrewsbury, MA 	L01 (72) 	Entered 	»»
36 	Ruixin Liu (CHN) 	Guangdong, People's Republic of China 	L01 (73) 	Entered 	»»
37 	Yuna Nishimura (JPN) 	Osaka, Japan 	L01 (74) 	Entered 	»»
38 	Peiyun Chien (TPE) 	Pingtung, Chinese Taipei 	L01 (75) 	Entered 	»»
39 	Somi Lee (KOR) 	Yongin-si, Republic of Korea 	L01 (76) 	Entered 	»»
40 	Stephanie Meadow (NIR) 	Jordanstown, Northern Ireland 	L01 (78) 	Entered 	»»
41 	Hira Naveed (AUS) 	Perth, Australia 	L01 (79) 	Entered 	»»
42 	Anna Nordqvist (SWE) 	Eskilstuna, Sweden 	L01 (80) 	Entered 	»»
43 	Paula Reto (RSA) 	Bloemfontein, South Africa 	L01 (82) 	Entered 	»»
44 	Minami Katsu (JPN) 	Kagoshima, Japan 	L01 (85) 	Entered 	»»
45 	Kristen Gillman (USA) 	Austin, TX 	L01 (88) 	Entered 	»»
46 	Stacy Lewis (USA) 	The Woodlands, TX 	L02 (1) 	Entered 	»»
47 	In Gee Chun (KOR) 	Seoul, Republic of Korea 	L03 (1) 	Entered 	»»
48 	Sung Hyun Park (KOR) 	Seoul, Republic of Korea 	L03 (3) 	Entered 	»»
49 	Jeongeun Lee6 (KOR) 	Gyeonggi-Do, Republic of Korea 	L03 (4) 	Entered 	»»
50 	Miyu Yamashita (JPN) 	Osaka, Japan 	L03 (5) 	Entered 	»»
51 	Rio Takeda (JPN) 	Kumamoto, Japan 	L04 (1) 	Entered 	»»
52 	Elizabeth Szokol (USA) 	Chicago, IL 	L04 (3) 	Entered 	»»
53 	Ingrid Lindblad (SWE) 	Halmstad, Sweden 	L04 (4) 	Entered 	»»
54 	Chisato Iwai (JPN) 	Saitama, Japan 	L04 (5) 	Entered 	»»
55 	Akie Iwai (JPN) 	Saitama, Japan 	L04 (7) 	Entered 	»»
56 	Lindy Duncan (USA) 	Plantation, FL 	L08 (1) 	Entered 	»»
57 	Jenny Bae (USA) 	Suwanee, GA 	L08 (2) 	Entered 	»»
58 	Ilhee Lee (KOR) 	Seoul, Republic of Korea 	L08 (5) 	Entered 	»»
59 	Cassie Porter (AUS) 	Peregian Springs, Australia 	L08 (6) 	Entered 	»»
60 	Saki Baba (JPN) 	Tokyo, Japan 	L08 (8) 	Entered 	»»
61 	Pauline Roussin-Bouchard (FRA) 	Orcieres 1850, France 	L08 (9) 	Entered 	»»
62 	Yuri Yoshida (JPN) 	Chiba, Japan 	L08 (10) 	Entered 	»»
63 	Ina Yoon (KOR) 	Seoul, Republic of Korea 	L08 (14) 	Entered 	»»
64 	Lauren Morris (USA) 	Houston, TX 	L09 (1) 	Entered 	»»
65 	Yahui Zhang (CHN) 	Wuhan Hubei, People's Republic of China 	L09 (2) 	Entered 	»»
66 	Jessica Porvasnik (USA) 	Hinckley, OH 	L09 (4) 	Entered 	»»
67 	Brooke Matthews (USA) 	Rogers, AR 	L09 (5) 	Entered 	»»
68 	Madison Young (USA) 	Canton, GA 	L09 (8) 	Entered 	»»
69 	Emily Kristine Pedersen (DEN) 	Smoerum, Denmark 	L11 (1) 	Entered 	»»
70 	Lauren Hartlage (USA) 	Elizabethtown, KY 	L11 (2) 	Entered 	»»
71 	Hyo Joon Jang (KOR) 	Seoul, Republic of Korea 	L11 (3) 	Entered 	»»
72 	Frida Kinhult (SWE) 	Skafto, Sweden 	L11 (7) 	Entered 	»»
73 	Bianca Pagdanganan (PHI) 	Mandaluyong City, Philippines 	L11 (8) 	Entered 	»»
74 	Xiaowen Yin (CHN) 	Tianjin, People's Republic of China 	L11 (9) 	Entered 	»»
75 	Jodi Ewart Shadoff (ENG) 	North Yorkshire, England 	L11 (10) 	Entered 	»»
76 	Morgane Metraux (SUI) 	Lausanne, Switzerland 	L11 (12) 	Entered 	»»
77 	Savannah Grewal (CAN) 	Mississauga, Ontario 	L11 (14) 	Entered 	»»
78 	Jiwon Jeon (KOR) 	Daegu, Republic of Korea 	L11 (15) 	Entered 	»»
79 	Celine Borge (NOR) 	Tonsberg, Norway 	L11 (16) 	Entered 	»»
80 	Caroline Inglis (USA) 	Eugene, OR 	L11 (17) 	Entered 	»»
81 	Danielle Kang (USA) 	Las Vegas, NV 	L14 (2) 	Entered 	»»
82 	Aline Krauter (GER) 	Stuttgart, Germany 	L15 (3) 	Entered 	»»
83 	Dewi Weber (NED) 	Groningen, Netherlands 	L15 (4) 	Entered 	»»
84 	Soo Bin Joo (KOR) 	Seoul, Republic of Korea 	L15 (5) 	Entered 	»»
85 	Robyn Choi (AUS) 	Gold Coast, Australia 	L15 (6) 	Entered 	»»
86 	Azahara Munoz (ESP) 	San Pedro de Alcantara, Spain 	L15 (7) 	Entered 	»»
87 	Jeongeun Lee5 (KOR) 	Seoul, Republic of Korea 	L15 (8) 	Entered 	»»
88 	Brianna Do (USA) 	Lakewood, CA 	L15 (10) 	Entered 	»»
89 	Kumkang Park (KOR) 	Seoul, Republic of Korea 	L15 (11) 	Entered 	»»
90 	Gigi Stoll (USA) 	Beaverton, OR 	L15 (13) 	Entered 	»»
91 	Pornanong Phatlum (THA) 	Chaiyaphum, Thailand 	L15 (14) 	Entered 	»»
92 	Perrine Delacour (FRA) 	Laon, France 	L15 (16) 	Entered 	»»
93 	Caroline Masson (GER) 	Gladbeck, Germany 	L15 (17) 	Entered 	»»
94 	Kate Smith-Stroh (USA) 	Detroit Lakes, MN 	L15 (18) 	Entered 	»»
95 	Mariel Galdiano (USA) 	Pearl City, HI 	L15 (19) 	Entered 	»»
96 	Amanda Doherty (USA) 	Atlanta, GA 	L15 (20) 	Entered 	»»
97 	Caley Mcginty (ENG) 	Bristol, England 	L15 (21) 	Entered 	»»
98 	Yu Liu (CHN) 	Beijing, People's Republic of China 	L15 (22) 	Entered 	»»
99 	Sofia Garcia (PAR) 	Asuncion, Paraguay 	L15 (23) 	Entered 	»»
100 	Jaravee Boonchant (THA) 	Bangkok, Thailand 	L15 (24) 	Entered 	»»
101 	Adela Cernousek (FRA) 	Antibes, France 	L15 (25) 	Entered 	»»
102 	Daniela Darquea (ECU) 	Quito, Ecuador 	L15 (27) 	Entered 	»»
103 	Sophia Popov (GER) 	Heidelberg, Germany 	L15 (28) 	Entered 	»»
104 	Olivia Cowan (GER) 	Steinwenden, Germany 	L15 (29) 	Entered 	»»
105 	Ana Belac (SLO) 	Portoroz, Slovenia 	L15 (31) 	Entered 	»»
106 	Alena Sharp (CAN) 	Hamilton, Ontario 	L15 (32) 	Entered 	»»
107 	Pernilla Lindberg (SWE) 	Bollnas, Sweden 	L15 (34) 	Entered 	»»
108 	Kaitlyn Papp Budde (USA) 	Austin, TX 	L15 (35) 	Entered 	»»
109 	Polly Mack (GER) 	Berlin, Germany 	L15 (36) 	Entered 	»»
110 	Mina Kreiter (USA) 	Gilbert, AZ 	L15 (37) 	Entered 	»»
111 	Dani Holmqvist (SWE) 	Stockholm, Sweden 	L15 (38) 	Entered 	»»
112 	Sarah Kemp (AUS) 	Sydney, Australia 	L15 (39) 	Entered 	»»
113 	Maude-Aimee Leblanc (CAN) 	Sherbrooke, Quebec 	L15 (40) 	Entered 	»»
114 	Youmin Hwang (KOR) 	Uiwang, Republic of Korea 	L23 (1) 	Entered 	»»
115 	Soyoung Lee (KOR) 	Gyeonggido, Republic of Korea 	L23 (2) 	Entered 	»»`;

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
    tournament: 'Walmart NW Arkansas Championship presented by P&G'
  };
}
