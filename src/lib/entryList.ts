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
3 	Lydia Ko (NZL) 	Auckland, New Zealand 	L01 (3) 	Entered 	»»
4 	Jeeno Thitikul (THA) 	Bangkok, Thailand 	L01 (4) 	Entered 	»»
5 	Ayaka Furue (JPN) 	Kobe, Japan 	L01 (6) 	Entered 	»»
6 	Hannah Green (AUS) 	Perth, Australia 	L01 (7) 	Entered 	»»
7 	Mao Saigo (JPN) 	Chiba, Japan 	L01 (9) 	Entered 	»»
8 	Sei Young Kim (KOR) 	Seoul, Republic of Korea 	L01 (10) 	Entered 	»»
9 	Lilia Vu (USA) 	Fountain Valley, CA 	L01 (11) 	Entered 	»»
10 	Jin Young Ko (KOR) 	Seoul, Republic of Korea 	L01 (12) 	Entered 	»»
11 	Celine Boutier (FRA) 	Montrouge, France 	L01 (15) 	Entered 	»»
12 	Hye-Jin Choi (KOR) 	Gyeonggi-do, Republic of Korea 	L01 (16) 	Entered 	»»
13 	Chanettee Wannasaen (THA) 	Chiang mai, Thailand 	L01 (17) 	Entered 	»»
14 	Maja Stark (SWE) 	Abbekas, Sweden 	L01 (18) 	Entered 	»»
15 	Yuka Saso (JPN) 	Tokyo, Japan 	L01 (19) 	Entered 	»»
16 	Patty Tavatanakit (THA) 	Bangkok, Thailand 	L01 (20) 	Entered 	»»
17 	Rose Zhang (USA) 	Irvine, CA 	L01 (21) 	Entered 	»»
18 	Jin Hee Im (KOR) 	Jeju, Republic of Korea 	L01 (22) 	Entered 	»»
19 	Jennifer Kupcho (USA) 	Westminster, CO 	L01 (23) 	Entered 	»»
20 	Megan Khang (USA) 	Rockland, MA 	L01 (24) 	Entered 	»»
21 	Narin An (KOR) 	Seoul, Republic of Korea 	L01 (25) 	Entered 	»»
22 	Nataliya Guseva (UNA) 	Miami, FL 	L01 (26) 	Entered 	»»
23 	A Lim Kim (KOR) 	Seongnam-si, Republic of Korea 	L01 (28) 	Entered 	»»
24 	Nasa Hataoka (JPN) 	Ibaraki, Japan 	L01 (30) 	Entered 	»»
25 	Charley Hull (ENG) 	Woburn, England 	L01 (31) 	Entered 	»»
26 	Gabriela Ruffels (AUS) 	Melbourne, Australia 	L01 (32) 	Entered 	»»
27 	Lucy Li (USA) 	Redwood Shores, CA 	L01 (34) 	Entered 	»»
28 	Amy Yang (KOR) 	Seoul, Republic of Korea 	L01 (36) 	Entered 	»»
29 	Yealimi Noh (USA) 	San Francisco, CA 	L01 (39) 	Entered 	»»
30 	Esther Henseleit (GER) 	Hamburg, Germany 	L01 (41) 	Entered 	»»
31 	Nanna Koerstz Madsen (DEN) 	Smoerum, Denmark 	L01 (42) 	Entered 	»»
32 	Jasmine Suwannapura (THA) 	Bangkok, Thailand 	L01 (43) 	Entered 	»»
33 	Andrea Lee (USA) 	Hermosa Beach, CA 	L01 (44) 	Entered 	»»
34 	Jenny Shin (KOR) 	Seoul, Republic of Korea 	L01 (45) 	Entered 	»»
35 	Allisen Corpuz (USA) 	Kapolei, HI 	L01 (46) 	Entered 	»»
36 	Grace Kim (AUS) 	Sydney, Australia 	L01 (48) 	Entered 	»»
37 	Lexi Thompson (USA) 	Delray Beach, FL 	L01 (53) 	Entered 	»»
38 	Bailey Tardy (USA) 	Norcross, GA 	L01 (54) 	Entered 	»»
39 	Madelene Sagstrom (SWE) 	Enkoping, Sweden 	L01 (56) 	Entered 	»»
40 	Arpichaya Yubol (THA) 	Saraburi, Thailand 	L01 (57) 	Entered 	»»
41 	Minjee Lee (AUS) 	Perth, Australia 	L01 (58) 	Entered 	»»
42 	Mi Hyang Lee (KOR) 	Seoul, Republic of Korea 	L01 (59) 	Entered 	»»
43 	Linnea Strom (SWE) 	Hovas, Sweden 	L01 (60) 	Entered 	»»
44 	Ryann O'Toole (USA) 	San Clemente, CA 	L01 (61) 	Entered 	»»
45 	Hyo Joo Kim (KOR) 	Wonju, Republic of Korea 	L01 (63) 	Entered 	»»
46 	Gaby Lopez (MEX) 	Mexico City, Mexico 	L01 (65) 	Entered 	»»
47 	Stephanie Kyriacou (AUS) 	Sydney, Australia 	L01 (66) 	Entered 	»»
48 	Hinako Shibuno (JPN) 	Okayama, Japan 	L01 (68) 	Entered 	»»
49 	Alexa Pano (USA) 	Westborough, MA 	L01 (69) 	Entered 	»»
50 	Ashleigh Buhai (RSA) 	Johannesburg, South Africa 	L01 (70) 	Entered 	»»
51 	Alison Lee (USA) 	Los Angeles, CA 	L01 (71) 	Entered 	»»
52 	Brittany Altomare (USA) 	Shrewsbury, MA 	L01 (72) 	Entered 	»»
53 	Ruixin Liu (CHN) 	Guangdong, People's Republic of China 	L01 (73) 	Entered 	»»
54 	Yuna Nishimura (JPN) 	Osaka, Japan 	L01 (74) 	Entered 	»»
55 	Peiyun Chien (TPE) 	Pingtung, Chinese Taipei 	L01 (75) 	Entered 	»»
56 	Somi Lee (KOR) 	Yongin-si, Republic of Korea 	L01 (76) 	Entered 	»»
57 	Stephanie Meadow (NIR) 	Jordanstown, Northern Ireland 	L01 (78) 	Entered 	»»
58 	Hira Naveed (AUS) 	Perth, Australia 	L01 (79) 	Entered 	»»
59 	Anna Nordqvist (SWE) 	Eskilstuna, Sweden 	L01 (80) 	Entered 	»»
60 	Paula Reto (RSA) 	Bloemfontein, South Africa 	L01 (82) 	Entered 	»»
61 	Wei-Ling Hsu (TPE) 	New Taipei City, Chinese Taipei 	L01 (83) 	Entered 	»»
62 	Wichanee Meechai (THA) 	Bangkok, Thailand 	L01 (84) 	Entered 	»»
63 	Minami Katsu (JPN) 	Kagoshima, Japan 	L01 (85) 	Entered 	»»
64 	Gemma Dryburgh (SCO) 	Aberdeen, Scotland 	L01 (86) 	Entered 	»»
65 	Kristen Gillman (USA) 	Austin, TX 	L01 (88) 	Entered 	»»
66 	Stacy Lewis (USA) 	The Woodlands, TX 	L02 (1) 	Entered 	»»
67 	Mirim Lee (KOR) 	Gwangju, Republic of Korea 	L03 (2) 	Entered 	»»
68 	Jeongeun Lee6 (KOR) 	Gyeonggi-Do, Republic of Korea 	L03 (4) 	Entered 	»»
69 	Miyu Yamashita (JPN) 	Osaka, Japan 	L03 (5) 	Entered 	»»
70 	Rio Takeda (JPN) 	Kumamoto, Japan 	L04 (1) 	Entered 	»»
71 	Elizabeth Szokol (USA) 	Chicago, IL 	L04 (3) 	Entered 	»»
72 	Ingrid Lindblad (SWE) 	Halmstad, Sweden 	L04 (4) 	Entered 	»»
73 	Chisato Iwai (JPN) 	Saitama, Japan 	L04 (5) 	Entered 	»»
74 	Lottie Woad (ENG) 	Farnham, England 	L04 (6) 	Entered 	»»
75 	Akie Iwai (JPN) 	Saitama, Japan 	L04 (7) 	Entered 	»»
76 	Miranda Wang (CHN) 	Tianjin, People's Republic of China 	L04 (8) 	Entered 	»»
77 	Lindy Duncan (USA) 	Plantation, FL 	L08 (1) 	Entered 	»»
78 	Jenny Bae (USA) 	Suwanee, GA 	L08 (2) 	Entered 	»»
79 	Yan Liu (CHN) 	Fujian, People's Republic of China 	L08 (3) 	Entered 	»»
80 	Julia Lopez Ramirez (ESP) 	Benahavis, Spain 	L08 (4) 	Entered 	»»
81 	Ilhee Lee (KOR) 	Seoul, Republic of Korea 	L08 (5) 	Entered 	»»
82 	Cassie Porter (AUS) 	Peregian Springs, Australia 	L08 (6) 	Entered 	»»
83 	Manon De Roey (BEL) 	Lint, Belgium 	L08 (7) 	Entered 	»»
84 	Saki Baba (JPN) 	Tokyo, Japan 	L08 (8) 	Entered 	»»
85 	Yuri Yoshida (JPN) 	Chiba, Japan 	L08 (10) 	Entered 	»»
86 	Karis Davidson (AUS) 	Gold Coast, Australia 	L08 (11) 	Entered 	»»
87 	Haeji Kang (KOR) 	Seoul, Republic of Korea 	L08 (12) 	Entered 	»»
88 	Weiwei Zhang (CHN) 	Hainan, People's Republic of China 	L08 (13) 	Entered 	»»
89 	Ina Yoon (KOR) 	Seoul, Republic of Korea 	L08 (14) 	Entered 	»»
90 	Lauren Morris (USA) 	Houston, TX 	L09 (1) 	Entered 	»»
91 	Yahui Zhang (CHN) 	Wuhan Hubei, People's Republic of China 	L09 (2) 	Entered 	»»
92 	Jessica Porvasnik (USA) 	Hinckley, OH 	L09 (4) 	Entered 	»»
93 	Brooke Matthews (USA) 	Rogers, AR 	L09 (5) 	Entered 	»»
94 	Fiona Xu (NZL) 	Auckland, New Zealand 	L09 (7) 	Entered 	»»
95 	Madison Young (USA) 	Canton, GA 	L09 (8) 	Entered 	»»
96 	Emily Kristine Pedersen (DEN) 	Smoerum, Denmark 	L11 (1) 	Entered 	»»
97 	Lauren Hartlage (USA) 	Elizabethtown, KY 	L11 (2) 	Entered 	»»
98 	Hyo Joon Jang (KOR) 	Seoul, Republic of Korea 	L11 (3) 	Entered 	»»
99 	Aditi Ashok (IND) 	Bangalore, India 	L11 (4) 	Entered 	»»
100 	Ssu-Chia Cheng (TPE) 	Taipei, Chinese Taipei 	L11 (5) 	Entered 	»»
101 	Frida Kinhult (SWE) 	Skafto, Sweden 	L11 (7) 	Entered 	»»
102 	Bianca Pagdanganan (PHI) 	Mandaluyong City, Philippines 	L11 (8) 	Entered 	»»
103 	Xiaowen Yin (CHN) 	Tianjin, People's Republic of China 	L11 (9) 	Entered 	»»
104 	Jodi Ewart Shadoff (ENG) 	North Yorkshire, England 	L11 (10) 	Entered 	»»
105 	Morgane Metraux (SUI) 	Lausanne, Switzerland 	L11 (12) 	Entered 	»»
106 	Savannah Grewal (CAN) 	Mississauga, Ontario 	L11 (14) 	Entered 	»»
107 	Jiwon Jeon (KOR) 	Daegu, Republic of Korea 	L11 (15) 	Entered 	»»
108 	Celine Borge (NOR) 	Tonsberg, Norway 	L11 (16) 	Entered 	»»
109 	Caroline Inglis (USA) 	Eugene, OR 	L11 (17) 	Entered 	»»
110 	Eun-Hee Ji (KOR) 	Gapyung, Republic of Korea 	L14 (1) 	Entered 	»»
111 	Danielle Kang (USA) 	Las Vegas, NV 	L14 (2) 	Entered 	»»
112 	Benedetta Moresco (ITA) 	Caldogno, Italy 	L15 (1) 	Entered 	»»
113 	Mary Liu (CHN) 	Xi'an, People's Republic of China 	L15 (2) 	Entered 	»»
114 	Aline Krauter (GER) 	Stuttgart, Germany 	L15 (3) 	Entered 	»»
115 	Dewi Weber (NED) 	Groningen, Netherlands 	L15 (4) 	Entered 	»»
116 	Soo Bin Joo (KOR) 	Seoul, Republic of Korea 	L15 (5) 	Entered 	»»
117 	Robyn Choi (AUS) 	Gold Coast, Australia 	L15 (6) 	Entered 	»»
118 	Azahara Munoz (ESP) 	San Pedro de Alcantara, Spain 	L15 (7) 	Entered 	»»
119 	Jeongeun Lee5 (KOR) 	Seoul, Republic of Korea 	L15 (8) 	Entered 	»»
120 	Brianna Do (USA) 	Lakewood, CA 	L15 (10) 	Entered 	»»
121 	Kumkang Park (KOR) 	Seoul, Republic of Korea 	L15 (11) 	Entered 	»»
122 	Bronte Law (ENG) 	Stockport, England 	L15 (12) 	Entered 	»»
123 	Gigi Stoll (USA) 	Beaverton, OR 	L15 (13) 	Entered 	»»
124 	Pornanong Phatlum (THA) 	Chaiyaphum, Thailand 	L15 (14) 	Entered 	»»
125 	Muni He (CHN) 	Chengdu, People's Republic of China 	L15 (15) 	Entered 	»»
126 	Perrine Delacour (FRA) 	Laon, France 	L15 (16) 	Entered 	»»
127 	Caroline Masson (GER) 	Gladbeck, Germany 	L15 (17) 	Entered 	»»
128 	Kate Smith-Stroh (USA) 	Detroit Lakes, MN 	L15 (18) 	Entered 	»»
129 	Mariel Galdiano (USA) 	Pearl City, HI 	L15 (19) 	Entered 	»»
130 	Amanda Doherty (USA) 	Atlanta, GA 	L15 (20) 	Entered 	»»
131 	Caley Mcginty (ENG) 	Bristol, England 	L15 (21) 	Entered 	»»
132 	Yu Liu (CHN) 	Beijing, People's Republic of China 	L15 (22) 	Entered 	»»
133 	Sofia Garcia (PAR) 	Asuncion, Paraguay 	L15 (23) 	Entered 	»»
134 	Jaravee Boonchant (THA) 	Bangkok, Thailand 	L15 (24) 	Entered 	»»
135 	Adela Cernousek (FRA) 	Antibes, France 	L15 (25) 	Entered 	»»
136 	Gurleen Kaur (USA) 	Houston, TX 	L15 (26) 	Entered 	»»
137 	Daniela Darquea (ECU) 	Quito, Ecuador 	L15 (27) 	Entered 	»»
138 	Sophia Popov (GER) 	Heidelberg, Germany 	L15 (28) 	Entered 	»»
139 	Olivia Cowan (GER) 	Steinwenden, Germany 	L15 (29) 	Entered 	»»
140 	Ana Belac (SLO) 	Portoroz, Slovenia 	L15 (31) 	Entered 	»»
141 	Heather Lin (TPE) 	Hsinchu City, Chinese Taipei 	L22 (1) 	Qualifier 	»»
142 	Polly Mack (GER) 	Berlin, Germany 	L22 (2) 	Qualifier 	»»
142 AUTOMATICALLY EXEMPT PLACES
2 MORE RESERVED FOR INVITES
2 MORE FOR QUALIFIERS
143 	Vidhi Lakhawala (USA) (a) 	Kendall Park, NJ 	L23 (1) 	Entered 	»»
144 	Maria Fassi (MEX) 	Pachuca, Mexico 	L23 (2) 	Entered 	»»`;

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
    tournament: 'Kroger Queen City Championship'
  };
}
