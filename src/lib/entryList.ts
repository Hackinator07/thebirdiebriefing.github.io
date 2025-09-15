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
2 	Haeran Ryu (KOR) 	Suwon, Republic of Korea 	L01 (2) 	Entered 	»»
3 	Ayaka Furue (JPN) 	Kobe, Japan 	L01 (6) 	Entered 	»»
4 	Hannah Green (AUS) 	Perth, Australia 	L01 (7) 	Entered 	»»
5 	Lauren Coughlin (USA) 	Charlottesville, VA 	L01 (8) 	Entered 	»»
6 	Mao Saigo (JPN) 	Chiba, Japan 	L01 (9) 	Entered 	»»
7 	Sei Young Kim (KOR) 	Seoul, Republic of Korea 	L01 (10) 	Entered 	»»
8 	Lilia Vu (USA) 	Fountain Valley, CA 	L01 (11) 	Entered 	»»
9 	Jin Young Ko (KOR) 	Seoul, Republic of Korea 	L01 (12) 	Entered 	»»
10 	Celine Boutier (FRA) 	Montrouge, France 	L01 (15) 	Entered 	»»
11 	Hye-Jin Choi (KOR) 	Gyeonggi-do, Republic of Korea 	L01 (16) 	Entered 	»»
12 	Chanettee Wannasaen (THA) 	Chiang mai, Thailand 	L01 (17) 	Entered 	»»
13 	Maja Stark (SWE) 	Abbekas, Sweden 	L01 (18) 	Entered 	»»
14 	Yuka Saso (JPN) 	Tokyo, Japan 	L01 (19) 	Entered 	»»
15 	Patty Tavatanakit (THA) 	Bangkok, Thailand 	L01 (20) 	Entered 	»»
16 	Jin Hee Im (KOR) 	Jeju, Republic of Korea 	L01 (22) 	Entered 	»»
17 	Jennifer Kupcho (USA) 	Westminster, CO 	L01 (23) 	Entered 	»»
18 	Megan Khang (USA) 	Rockland, MA 	L01 (24) 	Entered 	»»
19 	Narin An (KOR) 	Seoul, Republic of Korea 	L01 (25) 	Entered 	»»
20 	Nataliya Guseva (UNA) 	Miami, FL 	L01 (26) 	Entered 	»»
21 	A Lim Kim (KOR) 	Seongnam-si, Republic of Korea 	L01 (28) 	Entered 	»»
22 	Linn Grant (SWE) 	Viken, Sweden 	L01 (29) 	Entered 	»»
23 	Nasa Hataoka (JPN) 	Ibaraki, Japan 	L01 (30) 	Entered 	»»
24 	Gabriela Ruffels (AUS) 	Melbourne, Australia 	L01 (32) 	Entered 	»»
25 	Lucy Li (USA) 	Redwood Shores, CA 	L01 (34) 	Entered 	»»
26 	Amy Yang (KOR) 	Seoul, Republic of Korea 	L01 (36) 	Entered 	»»
27 	Sarah Schmelzel (USA) 	Phoenix, AZ 	L01 (37) 	Entered 	»»
28 	Yealimi Noh (USA) 	San Francisco, CA 	L01 (39) 	Entered 	»»
29 	Esther Henseleit (GER) 	Hamburg, Germany 	L01 (41) 	Entered 	»»
30 	Jasmine Suwannapura (THA) 	Bangkok, Thailand 	L01 (43) 	Entered 	»»
31 	Andrea Lee (USA) 	Hermosa Beach, CA 	L01 (44) 	Entered 	»»
32 	Jenny Shin (KOR) 	Seoul, Republic of Korea 	L01 (45) 	Entered 	»»
33 	Allisen Corpuz (USA) 	Kapolei, HI 	L01 (46) 	Entered 	»»
34 	Grace Kim (AUS) 	Sydney, Australia 	L01 (48) 	Entered 	»»
35 	Pajaree Anannarukarn (THA) 	Bangkok, Thailand 	L01 (51) 	Entered 	»»
36 	Lexi Thompson (USA) 	Delray Beach, FL 	L01 (53) 	Entered 	»»
37 	Bailey Tardy (USA) 	Norcross, GA 	L01 (54) 	Entered 	»»
38 	Madelene Sagstrom (SWE) 	Enkoping, Sweden 	L01 (56) 	Entered 	»»
39 	Arpichaya Yubol (THA) 	Saraburi, Thailand 	L01 (57) 	Entered 	»»
40 	Mi Hyang Lee (KOR) 	Seoul, Republic of Korea 	L01 (59) 	Entered 	»»
41 	Linnea Strom (SWE) 	Hovas, Sweden 	L01 (60) 	Entered 	»»
42 	Ryann O'Toole (USA) 	San Clemente, CA 	L01 (61) 	Entered 	»»
43 	Leona Maguire (IRL) 	Cavan, Ireland 	L01 (62) 	Entered 	»»
44 	Hyo Joo Kim (KOR) 	Wonju, Republic of Korea 	L01 (63) 	Entered 	»»
45 	Carlota Ciganda (ESP) 	Pamplona, Spain 	L01 (64) 	Entered 	»»
46 	Gaby Lopez (MEX) 	Mexico City, Mexico 	L01 (65) 	Entered 	»»
47 	Stephanie Kyriacou (AUS) 	Sydney, Australia 	L01 (66) 	Entered 	»»
48 	Auston Kim (USA) 	St. Augustine, FL 	L01 (67) 	Entered 	»»
49 	Hinako Shibuno (JPN) 	Okayama, Japan 	L01 (68) 	Entered 	»»
50 	Alexa Pano (USA) 	Westborough, MA 	L01 (69) 	Entered 	»»
51 	Ashleigh Buhai (RSA) 	Johannesburg, South Africa 	L01 (70) 	Entered 	»»
52 	Alison Lee (USA) 	Los Angeles, CA 	L01 (71) 	Entered 	»»
53 	Brittany Altomare (USA) 	Shrewsbury, MA 	L01 (72) 	Entered 	»»
54 	Ruixin Liu (CHN) 	Guangdong, People's Republic of China 	L01 (73) 	Entered 	»»
55 	Yuna Nishimura (JPN) 	Osaka, Japan 	L01 (74) 	Entered 	»»
56 	Peiyun Chien (TPE) 	Pingtung, Chinese Taipei 	L01 (75) 	Entered 	»»
57 	Somi Lee (KOR) 	Yongin-si, Republic of Korea 	L01 (76) 	Entered 	»»
58 	Stephanie Meadow (NIR) 	Jordanstown, Northern Ireland 	L01 (78) 	Entered 	»»
59 	Hira Naveed (AUS) 	Perth, Australia 	L01 (79) 	Entered 	»»
60 	Anna Nordqvist (SWE) 	Eskilstuna, Sweden 	L01 (80) 	Entered 	»»
61 	Paula Reto (RSA) 	Bloemfontein, South Africa 	L01 (82) 	Entered 	»»
62 	Wei-Ling Hsu (TPE) 	New Taipei City, Chinese Taipei 	L01 (83) 	Entered 	»»
63 	Wichanee Meechai (THA) 	Bangkok, Thailand 	L01 (84) 	Entered 	»»
64 	Minami Katsu (JPN) 	Kagoshima, Japan 	L01 (85) 	Entered 	»»
65 	Gemma Dryburgh (SCO) 	Aberdeen, Scotland 	L01 (86) 	Entered 	»»
66 	Kristen Gillman (USA) 	Austin, TX 	L01 (88) 	Entered 	»»
67 	Stacy Lewis (USA) 	The Woodlands, TX 	L02 (1) 	Entered 	»»
68 	In Gee Chun (KOR) 	Seoul, Republic of Korea 	L03 (1) 	Entered 	»»
69 	Mirim Lee (KOR) 	Gwangju, Republic of Korea 	L03 (2) 	Entered 	»»
70 	Sung Hyun Park (KOR) 	Seoul, Republic of Korea 	L03 (3) 	Entered 	»»
71 	Jeongeun Lee6 (KOR) 	Gyeonggi-Do, Republic of Korea 	L03 (4) 	Entered 	»»
72 	Miyu Yamashita (JPN) 	Osaka, Japan 	L03 (5) 	Entered 	»»
73 	Rio Takeda (JPN) 	Kumamoto, Japan 	L04 (1) 	Entered 	»»
74 	Ingrid Lindblad (SWE) 	Halmstad, Sweden 	L04 (4) 	Entered 	»»
75 	Chisato Iwai (JPN) 	Saitama, Japan 	L04 (5) 	Entered 	»»
76 	Lottie Woad (ENG) 	Farnham, England 	L04 (6) 	Entered 	»»
77 	Akie Iwai (JPN) 	Saitama, Japan 	L04 (7) 	Entered 	»»
78 	Miranda Wang (CHN) 	Tianjin, People's Republic of China 	L04 (8) 	Entered 	»»
79 	Lindy Duncan (USA) 	Plantation, FL 	L08 (1) 	Entered 	»»
80 	Jenny Bae (USA) 	Suwanee, GA 	L08 (2) 	Entered 	»»
81 	Yan Liu (CHN) 	Fujian, People's Republic of China 	L08 (3) 	Entered 	»»
82 	Julia Lopez Ramirez (ESP) 	Benahavis, Spain 	L08 (4) 	Entered 	»»
83 	Ilhee Lee (KOR) 	Seoul, Republic of Korea 	L08 (5) 	Entered 	»»
84 	Cassie Porter (AUS) 	Peregian Springs, Australia 	L08 (6) 	Entered 	»»
85 	Manon De Roey (BEL) 	Lint, Belgium 	L08 (7) 	Entered 	»»
86 	Saki Baba (JPN) 	Tokyo, Japan 	L08 (8) 	Entered 	»»
87 	Pauline Roussin-Bouchard (FRA) 	Orcieres 1850, France 	L08 (9) 	Entered 	»»
88 	Yuri Yoshida (JPN) 	Chiba, Japan 	L08 (10) 	Entered 	»»
89 	Karis Davidson (AUS) 	Gold Coast, Australia 	L08 (11) 	Entered 	»»
90 	Haeji Kang (KOR) 	Seoul, Republic of Korea 	L08 (12) 	Entered 	»»
91 	Weiwei Zhang (CHN) 	Hainan, People's Republic of China 	L08 (13) 	Entered 	»»
92 	Ina Yoon (KOR) 	Seoul, Republic of Korea 	L08 (14) 	Entered 	»»
93 	Lauren Morris (USA) 	Houston, TX 	L09 (1) 	Entered 	»»
94 	Yahui Zhang (CHN) 	Wuhan Hubei, People's Republic of China 	L09 (2) 	Entered 	»»
95 	Jessica Porvasnik (USA) 	Hinckley, OH 	L09 (4) 	Entered 	»»
96 	Brooke Matthews (USA) 	Rogers, AR 	L09 (5) 	Entered 	»»
97 	Madison Young (USA) 	Canton, GA 	L09 (8) 	Entered 	»»
98 	Emily Kristine Pedersen (DEN) 	Smoerum, Denmark 	L11 (1) 	Entered 	»»
99 	Lauren Hartlage (USA) 	Elizabethtown, KY 	L11 (2) 	Entered 	»»
100 	Hyo Joon Jang (KOR) 	Seoul, Republic of Korea 	L11 (3) 	Entered 	»»
101 	Aditi Ashok (IND) 	Bangalore, India 	L11 (4) 	Entered 	»»
102 	Ssu-Chia Cheng (TPE) 	Taipei, Chinese Taipei 	L11 (5) 	Entered 	»»
103 	Frida Kinhult (SWE) 	Skafto, Sweden 	L11 (7) 	Entered 	»»
104 	Bianca Pagdanganan (PHI) 	Mandaluyong City, Philippines 	L11 (8) 	Entered 	»»
105 	Xiaowen Yin (CHN) 	Tianjin, People's Republic of China 	L11 (9) 	Entered 	»»
106 	Jodi Ewart Shadoff (ENG) 	North Yorkshire, England 	L11 (10) 	Entered 	»»
107 	Morgane Metraux (SUI) 	Lausanne, Switzerland 	L11 (12) 	Entered 	»»
108 	Savannah Grewal (CAN) 	Mississauga, Ontario 	L11 (14) 	Entered 	»»
109 	Jiwon Jeon (KOR) 	Daegu, Republic of Korea 	L11 (15) 	Entered 	»»
110 	Celine Borge (NOR) 	Tonsberg, Norway 	L11 (16) 	Entered 	»»
111 	Caroline Inglis (USA) 	Eugene, OR 	L11 (17) 	Entered 	»»
112 	Eun-Hee Ji (KOR) 	Gapyung, Republic of Korea 	L14 (1) 	Entered 	»»
113 	Danielle Kang (USA) 	Las Vegas, NV 	L14 (2) 	Entered 	»»
114 	Benedetta Moresco (ITA) 	Caldogno, Italy 	L15 (1) 	Entered 	»»
115 	Mary Liu (CHN) 	Xi'an, People's Republic of China 	L15 (2) 	Entered 	»»
116 	Aline Krauter (GER) 	Stuttgart, Germany 	L15 (3) 	Entered 	»»
117 	Dewi Weber (NED) 	Groningen, Netherlands 	L15 (4) 	Entered 	»»
118 	Soo Bin Joo (KOR) 	Seoul, Republic of Korea 	L15 (5) 	Entered 	»»
119 	Robyn Choi (AUS) 	Gold Coast, Australia 	L15 (6) 	Entered 	»»
120 	Azahara Munoz (ESP) 	San Pedro de Alcantara, Spain 	L15 (7) 	Entered 	»»
121 	Jeongeun Lee5 (KOR) 	Seoul, Republic of Korea 	L15 (8) 	Entered 	»»
122 	Brianna Do (USA) 	Lakewood, CA 	L15 (10) 	Entered 	»»
123 	Kumkang Park (KOR) 	Seoul, Republic of Korea 	L15 (11) 	Entered 	»»
124 	Bronte Law (ENG) 	Stockport, England 	L15 (12) 	Entered 	»»
125 	Gigi Stoll (USA) 	Beaverton, OR 	L15 (13) 	Entered 	»»
126 	Pornanong Phatlum (THA) 	Chaiyaphum, Thailand 	L15 (14) 	Entered 	»»
127 	Muni He (CHN) 	Chengdu, People's Republic of China 	L15 (15) 	Entered 	»»
128 	Perrine Delacour (FRA) 	Laon, France 	L15 (16) 	Entered 	»»
129 	Caroline Masson (GER) 	Gladbeck, Germany 	L15 (17) 	Entered 	»»
130 	Kate Smith-Stroh (USA) 	Detroit Lakes, MN 	L15 (18) 	Entered 	»»
131 	Mariel Galdiano (USA) 	Pearl City, HI 	L15 (19) 	Entered 	»»
132 	Amanda Doherty (USA) 	Atlanta, GA 	L15 (20) 	Entered 	»»
133 	Caley Mcginty (ENG) 	Bristol, England 	L15 (21) 	Entered 	»»
134 	Yu Liu (CHN) 	Beijing, People's Republic of China 	L15 (22) 	Entered 	»»
135 	Sofia Garcia (PAR) 	Asuncion, Paraguay 	L15 (23) 	Entered 	»»
136 	Adela Cernousek (FRA) 	Antibes, France 	L15 (25) 	Entered 	»»
137 	Gurleen Kaur (USA) 	Houston, TX 	L15 (26) 	Entered 	»»
138 	Daniela Darquea (ECU) 	Quito, Ecuador 	L15 (27) 	Entered 	»»
139 	Sophia Popov (GER) 	Heidelberg, Germany 	L15 (28) 	Entered 	»»
140 	Olivia Cowan (GER) 	Steinwenden, Germany 	L15 (29) 	Entered 	»»
141 	Maria Jose Marin (COL) (a) 	Cali, Colombia 	L23 (1) 	Entered 	»»
142 	Maria Fassi (MEX) 	Pachuca, Mexico 	L23 (2) 	Entered 	»»
143 	Kendall Todd (USA) 	USA 	Qualifier 	Entered 	»»
144 	Maude-Aimee Leblanc (CAN) 	Canada 	Qualifier 	Entered 	»»`;

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
