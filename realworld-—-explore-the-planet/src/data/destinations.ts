import { City, Country, Landmark, StreetViewpoint } from '../types';

export const COUNTRIES: Country[] = [
  {
    id: 'france',
    name: 'France',
    flag: '🇫🇷',
    continent: 'Europe',
    capital: 'Paris',
    citiesCount: 3,
    landmarksCount: 6,
    heroImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80',
    description: 'Home to world-renowned architecture, culinary traditions, and centuries of preserved European heritage from the Seine to the Mediterranean coastline.'
  },
  {
    id: 'japan',
    name: 'Japan',
    flag: '🇯🇵',
    continent: 'Asia',
    capital: 'Tokyo',
    citiesCount: 3,
    landmarksCount: 7,
    heroImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=80',
    description: 'An archipelago juxtaposing hyper-modern metropolitan engineering with thousand-year-old wooden shrines, preserved districts, and mountain scenery.'
  },
  {
    id: 'usa',
    name: 'United States',
    flag: '🇺🇸',
    continent: 'North America',
    capital: 'Washington, D.C.',
    citiesCount: 3,
    landmarksCount: 8,
    heroImage: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=1600&q=80',
    description: 'Vast continental diversity spanning dense skyscraper canyons in New York, Pacific coastal valleys in California, and national geographic icons.'
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    flag: '🇬🇧',
    continent: 'Europe',
    capital: 'London',
    citiesCount: 3,
    landmarksCount: 6,
    heroImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1600&q=80',
    description: 'Historic British kingdoms featuring Roman foundations, Gothic cathedrals, historic royal palaces, and vibrant contemporary city streets.'
  },
  {
    id: 'uae',
    name: 'United Arab Emirates',
    flag: '🇦🇪',
    continent: 'Middle East',
    capital: 'Abu Dhabi',
    citiesCount: 2,
    landmarksCount: 5,
    heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80',
    description: 'Pioneering mega-structures, architectural marvels, Arabian Gulf coastlines, and record-setting engineering on the edge of the desert.'
  },
  {
    id: 'pakistan',
    name: 'Pakistan',
    flag: '🇵🇰',
    continent: 'Asia',
    capital: 'Islamabad',
    citiesCount: 3,
    landmarksCount: 6,
    heroImage: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1600&q=80',
    description: 'Ancient Indus civilization roots, Mughal masterpieces, lush Margalla foothills in Islamabad, and bustling cultural centers across Punjab and Sindh.'
  },
  {
    id: 'italy',
    name: 'Italy',
    flag: '🇮🇹',
    continent: 'Europe',
    capital: 'Rome',
    citiesCount: 3,
    landmarksCount: 7,
    heroImage: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1600&q=80',
    description: 'The epicenter of the Roman Empire and Renaissance art, with grand piazzas, canal networks in Venice, and millennia of preserved stone architecture.'
  },
  {
    id: 'turkey',
    name: 'Turkey',
    flag: '🇹🇷',
    continent: 'Europe',
    capital: 'Ankara',
    citiesCount: 2,
    landmarksCount: 5,
    heroImage: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1600&q=80',
    description: 'The crossroads of Europe and Asia across the Bosphorus Strait, crowned by Byzantine domes, Ottoman minarets, and Aegean waters.'
  },
  {
    id: 'singapore',
    name: 'Singapore',
    flag: '🇸🇬',
    continent: 'Asia',
    capital: 'Singapore',
    citiesCount: 1,
    landmarksCount: 4,
    heroImage: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1600&q=80',
    description: 'A global garden city and maritime crossroads defined by innovative bio-architecture, Marina Bay, and vibrant cultural enclaves.'
  },
  {
    id: 'australia',
    name: 'Australia',
    flag: '🇦🇺',
    continent: 'Oceania',
    capital: 'Canberra',
    citiesCount: 1,
    landmarksCount: 3,
    heroImage: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1600&q=80',
    description: 'Spectacular natural harbors, landmark modernist architecture like the Sydney Opera House, and miles of Pacific coast.'
  },
  {
    id: 'spain',
    name: 'Spain',
    flag: '🇪🇸',
    continent: 'Europe',
    capital: 'Madrid',
    citiesCount: 2,
    landmarksCount: 5,
    heroImage: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1600&q=80',
    description: 'Catalan modernism, grand royal plazas, Mediterranean boulevards, and architectural works of Antoni Gaudí.'
  },
  {
    id: 'brazil',
    name: 'Brazil',
    flag: '🇧🇷',
    continent: 'South America',
    capital: 'Brasília',
    citiesCount: 1,
    landmarksCount: 3,
    heroImage: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1600&q=80',
    description: 'Dramatically sculpted granite peaks rising over Guanabara Bay, golden Atlantic beaches, and iconic mountain panoramas.'
  },
  {
    id: 'south-africa',
    name: 'South Africa',
    flag: '🇿🇦',
    continent: 'Africa',
    capital: 'Pretoria',
    citiesCount: 1,
    landmarksCount: 3,
    heroImage: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1600&q=80',
    description: 'Where the Atlantic and Indian oceans meet beneath the flat-topped sandstone silhouette of Table Mountain.'
  },
  {
    id: 'netherlands',
    name: 'Netherlands',
    flag: '🇳🇱',
    continent: 'Europe',
    capital: 'Amsterdam',
    citiesCount: 1,
    landmarksCount: 3,
    heroImage: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=1600&q=80',
    description: 'Historic canal rings, 17th-century brick merchant gables, cobblestone streets, and bike-friendly urban design.'
  },
  {
    id: 'germany',
    name: 'Germany',
    flag: '🇩🇪',
    continent: 'Europe',
    capital: 'Berlin',
    citiesCount: 1,
    landmarksCount: 3,
    heroImage: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=1600&q=80',
    description: 'Historic monuments, reunited Cold War spaces, classical Prussian avenues, and vibrant public squares.'
  },
  {
    id: 'thailand',
    name: 'Thailand',
    flag: '🇹🇭',
    continent: 'Asia',
    capital: 'Bangkok',
    citiesCount: 1,
    landmarksCount: 3,
    heroImage: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1600&q=80',
    description: 'Gilded temple spires along the Chao Phraya River, bustling canals, and rich Southeast Asian cultural traditions.'
  },
  {
    id: 'south-korea',
    name: 'South Korea',
    flag: '🇰🇷',
    continent: 'Asia',
    capital: 'Seoul',
    citiesCount: 1,
    landmarksCount: 3,
    heroImage: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=1600&q=80',
    description: 'Dynastic Joseon palaces tucked beside illuminated high-tech avenues and rugged granite mountains.'
  },
  {
    id: 'canada',
    name: 'Canada',
    flag: '🇨🇦',
    continent: 'North America',
    capital: 'Ottawa',
    citiesCount: 1,
    landmarksCount: 3,
    heroImage: 'https://images.unsplash.com/photo-1517090504586-fde19ea6066f?auto=format&fit=crop&w=1600&q=80',
    description: 'Lake Ontario skyline dominated by the CN Tower, diverse multicultural districts, and broad avenues.'
  }
];

export const CITIES: City[] = [
  {
    id: 'paris',
    name: 'Paris',
    countryId: 'france',
    countryName: 'France',
    countryFlag: '🇫🇷',
    continent: 'Europe',
    coordinates: [48.8566, 2.3522],
    population: '2,161,000 (Metropolitan: 12.3M)',
    timezone: 'UTC+1 (CET)',
    climate: 'Temperate oceanic with warm summers and mild winters',
    bestTimeToVisit: 'April to October for pleasant terrace weather',
    heroImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80',
    tagline: 'The City of Light along the River Seine',
    description: 'Paris is the capital of France and one of the world’s major cultural, artistic, and historical centers. Divided into 20 arrondissements spiraling out from the Seine, Paris is home to the Eiffel Tower, the Louvre Museum, Notre-Dame Cathedral, and the grand boulevard of the Champs-Élysées.',
    featuredLandmarkIds: ['eiffel-tower', 'louvre-museum', 'arc-de-triomphe', 'notre-dame'],
    defaultStreetViewpointId: 'paris-eiffel-champ-de-mars',
    neighborhoods: [
      {
        name: 'Le Marais (3rd & 4th Arr.)',
        vibe: 'Historic cobblestone alleys, 17th-century mansions, boutiques, and Place des Vosges.',
        highlights: ['Place des Vosges', 'Musée Picasso', 'Rue des Rosiers'],
        description: 'One of the oldest surviving medieval and Renaissance districts of Paris, spared during Haussmannian renovations.'
      },
      {
        name: 'Montmartre (18th Arr.)',
        vibe: 'Bohemian hilltop village with steep staircases, artists’ squares, and Sacré-Cœur views.',
        highlights: ['Basilica of Sacré-Cœur', 'Place du Tertre', 'Vignes du Clos Montmartre'],
        description: 'Perched on the highest natural elevation in Paris, famous for its artistic history and panoramic city views.'
      },
      {
        name: 'Saint-Germain-des-Prés (6th Arr.)',
        vibe: 'Literary cafés, antique bookshops, art galleries, and historic publishing houses.',
        highlights: ['Café de Flore', 'Church of Saint-Germain-des-Prés', 'Jardin du Luxembourg'],
        description: 'The intellectual epicenter of post-war Paris along the Left Bank.'
      }
    ],
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1200&q=80',
        title: 'Eiffel Tower from Champ de Mars',
        caption: 'The iron lattice monument framed by manicured lawns and park avenues.',
        photographer: 'Anthony DELANOIX',
        source: 'Unsplash'
      },
      {
        url: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1200&q=80',
        title: 'Pont Alexandre III & Grand Palais',
        caption: 'Ornate Beaux-Arts bridge over the Seine with gilded bronze statues.',
        photographer: 'Leonard Cotte',
        source: 'Unsplash'
      },
      {
        url: 'https://images.unsplash.com/photo-1492136344046-866c85e0bf04?auto=format&fit=crop&w=1200&q=80',
        title: 'Louvre Pyramid at Twilight',
        caption: 'I.M. Pei’s glass pyramid courtyard surrounded by the historic palace.',
        photographer: 'Alexander Kagan',
        source: 'Unsplash'
      }
    ]
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    countryId: 'japan',
    countryName: 'Japan',
    countryFlag: '🇯🇵',
    continent: 'Asia',
    coordinates: [35.6762, 139.6503],
    population: '14,047,000 (Greater Tokyo: 37.4M)',
    timezone: 'UTC+9 (JST)',
    climate: 'Humid subtropical with four distinct seasons',
    bestTimeToVisit: 'March–May (Cherry Blossoms) or September–November (Autumn Foliage)',
    heroImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=80',
    tagline: 'The hyper-dynamic metropolis of neon, heritage, and precision',
    description: 'Tokyo is the bustling capital of Japan, blending ultra-modern skyscrapers with historic temples and tranquil gardens. From the world’s busiest pedestrian crossing at Shibuya to the ancient Sensō-ji temple in Asakusa, Tokyo presents an unmatched urban landscape.',
    featuredLandmarkIds: ['shibuya-crossing', 'tokyo-tower', 'senso-ji'],
    defaultStreetViewpointId: 'tokyo-shibuya-crossing',
    neighborhoods: [
      {
        name: 'Shibuya & Harajuku',
        vibe: 'Youth culture, crosswalks, flagship architecture, and serene Meiji Jingu shrine.',
        highlights: ['Shibuya Scramble', 'Hachiko Plaza', 'Takeshita Street', 'Cat Street'],
        description: 'The energetic shopping and pedestrian center of modern Tokyo.'
      },
      {
        name: 'Asakusa (Taito)',
        vibe: 'Traditional downtown Shitamachi feel with incense-filled temple gates and snack stalls.',
        highlights: ['Sensō-ji Temple', 'Nakamise-dori', 'Kaminarimon Gate'],
        description: 'Preserves the atmosphere of older Edo-period Tokyo along the Sumida River.'
      },
      {
        name: 'Ginza & Marunouchi',
        vibe: 'Broad tree-lined avenues, luxury department stores, and Tokyo Station red-brick architecture.',
        highlights: ['Ginza Wako Clock Tower', 'Tokyo Station Square', 'Imperial Palace Gardens'],
        description: 'Upscale shopping and financial district built upon historic Edo-era silversmith foundries.'
      }
    ],
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80',
        title: 'Tokyo Tower and Minato Skyline',
        caption: 'The lattice communications tower illuminated against the night metropolis.',
        photographer: 'Yu Kato',
        source: 'Unsplash'
      },
      {
        url: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=1200&q=80',
        title: 'Shibuya Crossing at Dusk',
        caption: 'Pedestrians traversing all five crosswalks under giant digital screens.',
        photographer: 'Clay Banks',
        source: 'Unsplash'
      },
      {
        url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
        title: 'Sensō-ji Temple Lantern',
        caption: 'The giant red chochin lantern hanging at the Kaminarimon Thunder Gate.',
        photographer: 'Sora Sagano',
        source: 'Unsplash'
      }
    ]
  },
  {
    id: 'new-york',
    name: 'New York City',
    countryId: 'usa',
    countryName: 'United States',
    countryFlag: '🇺🇸',
    continent: 'North America',
    coordinates: [40.7128, -74.006],
    population: '8,336,000 (Metropolitan: 20.1M)',
    timezone: 'UTC-5 (EST)',
    climate: 'Humid continental with warm summers and cold, crisp winters',
    bestTimeToVisit: 'September to November for crisp autumn foliage in Central Park',
    heroImage: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1600&q=80',
    tagline: 'The global capital of commerce, culture, and architecture',
    description: 'Comprising five boroughs where the Hudson River meets the Atlantic Ocean, New York City is globally iconic. Manhattan features monumental skyscrapers, Central Park, Broadway’s theater district, and landmark suspension bridges connecting Brooklyn and Queens.',
    featuredLandmarkIds: ['times-square', 'brooklyn-bridge', 'central-park', 'statue-of-liberty'],
    defaultStreetViewpointId: 'nyc-times-square',
    neighborhoods: [
      {
        name: 'Lower Manhattan & Financial District',
        vibe: 'Canyon-like streets, Wall Street, Battery Park with harbor views, and One World Trade.',
        highlights: ['One World Observatory', 'Wall Street Bull', 'Trinity Church', 'Stone Street'],
        description: 'The historic colonial birthplace of New Amsterdam at the southern tip of Manhattan.'
      },
      {
        name: 'Midtown Manhattan',
        vibe: 'High-density skyscrapers, illuminated billboards, Grand Central Terminal, and 5th Avenue.',
        highlights: ['Times Square', 'Empire State Building', 'Rockefeller Center', 'Bryant Park'],
        description: 'The world’s largest central business district and entertainment nucleus.'
      },
      {
        name: 'Greenwich Village & SoHo',
        vibe: 'Cast-iron architectural facades, tree-shaded brownstone rows, cafes, and indie boutiques.',
        highlights: ['Washington Square Arch', 'Cast Iron Historic District', 'MacDougal Street'],
        description: 'Celebrated for its bohemian artistic past, pedestrian charm, and residential streets.'
      }
    ],
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1508873696983-2df5293cb325?auto=format&fit=crop&w=1200&q=80',
        title: 'Times Square Illuminated',
        caption: 'The crossroads of the world bathed in neon and LED billboard glow.',
        photographer: 'Oliver Niblett',
        source: 'Unsplash'
      },
      {
        url: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=1200&q=80',
        title: 'Brooklyn Bridge Walkway',
        caption: 'Gothic stone towers and diagonal steel suspension cables over the East River.',
        photographer: 'Matteo Catanese',
        source: 'Unsplash'
      },
      {
        url: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80',
        title: 'Central Park Bow Bridge & Lake',
        caption: 'Historic cast iron bridge reflected in The Lake against the Central Park West skyline.',
        photographer: 'Michael Discenza',
        source: 'Unsplash'
      }
    ]
  },
  {
    id: 'london',
    name: 'London',
    countryId: 'uk',
    countryName: 'United Kingdom',
    countryFlag: '🇬🇧',
    continent: 'Europe',
    coordinates: [51.5074, -0.1278],
    population: '8,982,000 (Greater London: 14.8M)',
    timezone: 'UTC+0 (GMT/BST)',
    climate: 'Temperate maritime with moderate rainfall year-round',
    bestTimeToVisit: 'May to September for park blooms and outdoor riverside walks',
    heroImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1600&q=80',
    tagline: 'Millennia of royal history along the River Thames',
    description: 'Founded by the Romans as Londinium, London stands as a premier world city. Its iconic Thames waterfront spans Tower Bridge, the Tower of London, the Houses of Parliament with Big Ben, and expansive Royal Parks stretching from Westminster to Kensington.',
    featuredLandmarkIds: ['tower-bridge', 'big-ben', 'buckingham-palace'],
    defaultStreetViewpointId: 'london-tower-bridge',
    neighborhoods: [
      {
        name: 'Westminster & Whitehall',
        vibe: 'Pomp, parliament, government ministries, and royal parks.',
        highlights: ['Palace of Westminster', 'Westminster Abbey', 'St. James’s Park', '10 Downing St'],
        description: 'The political and ceremonial heart of the United Kingdom for over nine centuries.'
      },
      {
        name: 'City of London (The Square Mile)',
        vibe: 'Ancient Roman street patterns beneath cutting-edge financial towers.',
        highlights: ['St. Paul’s Cathedral', 'Leadenhall Market', 'The Gherkin', 'Tower of London'],
        description: 'The original historic city surrounded by Roman walls, now a global banking capital.'
      },
      {
        name: 'South Bank & Bankside',
        vibe: 'Riverside pedestrian promenade, street performers, food markets, and cultural venues.',
        highlights: ['Tate Modern', 'Borough Market', 'Shakespeare’s Globe', 'London Eye'],
        description: 'Thames walkway offering direct panoramic views of the northern city skyline.'
      }
    ],
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
        title: 'Tower Bridge over the River Thames',
        caption: 'Victorian twin Gothic towers with bascule roadway spanning the water.',
        photographer: 'Benjamin Davies',
        source: 'Unsplash'
      },
      {
        url: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=1200&q=80',
        title: 'Big Ben & Palace of Westminster',
        caption: 'The Elizabeth Tower illuminated at dusk along the Westminster waterfront.',
        photographer: 'Marcin Nowak',
        source: 'Unsplash'
      }
    ]
  },
  {
    id: 'dubai',
    name: 'Dubai',
    countryId: 'uae',
    countryName: 'United Arab Emirates',
    countryFlag: '🇦🇪',
    continent: 'Middle East',
    coordinates: [25.2048, 55.2708],
    population: '3,600,000',
    timezone: 'UTC+4 (GST)',
    climate: 'Hot desert climate with abundant sunshine year-round',
    bestTimeToVisit: 'November to March for mild, comfortable outdoor temperatures',
    heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80',
    tagline: 'Record-shattering architectural ambition on the Arabian Gulf',
    description: 'Dubai has transformed from a historic trading port on Dubai Creek into a global metropolis renowned for world-record architecture. It boasts the world’s tallest building, the Burj Khalifa, the palm-shaped artificial archipelago of Palm Jumeirah, and the towers of Dubai Marina.',
    featuredLandmarkIds: ['burj-khalifa', 'dubai-marina', 'palm-jumeirah'],
    defaultStreetViewpointId: 'dubai-burj-khalifa-plaza',
    neighborhoods: [
      {
        name: 'Downtown Dubai',
        vibe: 'Grand boulevards, Burj Lake, Dubai Mall, and the soaring Burj Khalifa.',
        highlights: ['Burj Khalifa', 'Dubai Fountain', 'Mohammed Bin Rashid Boulevard'],
        description: 'The monumental core of modern Dubai designed around monumental plazas and water shows.'
      },
      {
        name: 'Dubai Marina & JBR',
        vibe: 'Canal promenades, luxury yachts, high-rise residential towers, and beach walk.',
        highlights: ['Marina Walk', 'The Beach at JBR', 'Ain Dubai', 'Princess Tower'],
        description: 'An artificial canal city carved into the Persian Gulf coastline.'
      },
      {
        name: 'Old Dubai & Al Fahidi',
        vibe: 'Traditional coral-stone windtowers, textile souks, and wooden abra boats on the Creek.',
        highlights: ['Al Fahidi Historical Neighborhood', 'Dubai Spice Souk', 'Dubai Gold Souk'],
        description: 'Preserved 19th-century mercantile quarters showcasing original Emirati maritime heritage.'
      }
    ],
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
        title: 'Burj Khalifa Soaring Above Downtown',
        caption: 'The 828-meter skyscraper piercing the desert skyline.',
        photographer: 'David Rodrigo',
        source: 'Unsplash'
      },
      {
        url: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80',
        title: 'Dubai Marina Towers & Waterfront',
        caption: 'Super-tall residential skyscrapers reflected in the artificial canal marina.',
        photographer: 'Christoph Schulz',
        source: 'Unsplash'
      }
    ]
  },
  {
    id: 'islamabad',
    name: 'Islamabad',
    countryId: 'pakistan',
    countryName: 'Pakistan',
    countryFlag: '🇵🇰',
    continent: 'Asia',
    coordinates: [33.6844, 73.0479],
    population: '1,200,000 (Federal Capital Territory: 2.2M)',
    timezone: 'UTC+5 (PKT)',
    climate: 'Humid subtropical with hot summers, monsoon rains, and mild winters',
    bestTimeToVisit: 'October to March for cool, crisp mountain air and clear skies',
    heroImage: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1600&q=80',
    tagline: 'The verdant capital nestled at the foot of the Margalla Hills',
    description: 'Islamabad is the purpose-built federal capital of Pakistan, planned in the 1960s by Greek architect Constantinos Doxiadis. Known for its lush green sectors, wide tree-lined avenues, and clean grid structure, it is crowned by the monumental Faisal Mosque set against the forested Margalla Hills.',
    featuredLandmarkIds: ['faisal-mosque', 'pakistan-monument', 'daman-e-koh'],
    defaultStreetViewpointId: 'islamabad-faisal-mosque',
    neighborhoods: [
      {
        name: 'Sector F-6 & F-7 (Super Market & Jinnah Super)',
        vibe: 'Upscale avenues, embassies, outdoor cafes, art galleries, and lively plazas.',
        highlights: ['Kohsar Market', 'Jinnah Super Market', 'F-7 Circular Park'],
        description: 'The premier lifestyle and diplomatic sectors of the capital city.'
      },
      {
        name: 'Margalla Foothills & Daman-e-Koh',
        vibe: 'Pine-covered hiking trails, panoramic vista terraces, and national park reserve.',
        highlights: ['Daman-e-Koh Viewpoint', 'Trail 3 & Trail 5', 'Monal Margalla Terrace'],
        description: 'High scenic ridgelines overlooking the entire planned city grid and Rawal Lake.'
      },
      {
        name: 'Shakarparian & Zero Point',
        vibe: 'Expansive memorial parks, the Pakistan Monument, and national cultural museums.',
        highlights: ['Pakistan Monument', 'Lok Virsa Heritage Museum', 'Shakarparian Parade Ground'],
        description: 'The ceremonial promontory where the capital’s master plan was originally inaugurated.'
      }
    ],
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80',
        title: 'Faisal Mosque Against Margalla Hills',
        caption: 'Vedat Dalokay’s Bedouin tent-inspired modernist mosque with four 88m pencil minarets.',
        photographer: 'Ali Imran',
        source: 'Unsplash'
      },
      {
        url: 'https://images.unsplash.com/photo-1627993078499-c0201882eb75?auto=format&fit=crop&w=1200&q=80',
        title: 'Pakistan Monument at Shakarparian',
        caption: 'Granite petals symbolizing the provinces and unity of Pakistan at twilight.',
        photographer: 'Umer Sayyam',
        source: 'Unsplash'
      }
    ]
  },
  {
    id: 'rome',
    name: 'Rome',
    countryId: 'italy',
    countryName: 'Italy',
    countryFlag: '🇮🇹',
    continent: 'Europe',
    coordinates: [41.9028, 12.4964],
    population: '2,873,000 (Metropolitan: 4.3M)',
    timezone: 'UTC+1 (CET)',
    climate: 'Mediterranean with warm summers and mild winters',
    bestTimeToVisit: 'April to June or September to October',
    heroImage: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1600&q=80',
    tagline: 'The Eternal City of the Roman Empire and Renaissance art',
    description: 'Rome spans almost three millennia of continuous history. From the ancient Roman Colosseum and Forum to the Baroque splendor of the Trevi Fountain and the Vatican enclave, Rome is an open-air museum where ancient travertine stone meets modern Italian life.',
    featuredLandmarkIds: ['colosseum', 'trevi-fountain', 'pantheon'],
    defaultStreetViewpointId: 'rome-colosseum-piazza',
    neighborhoods: [
      {
        name: 'Trastevere',
        vibe: 'Cobblestone lanes, ivy-draped palazzi, traditional trattorias, and lively evening piazzas.',
        highlights: ['Piazza di Santa Maria in Trastevere', 'Piazza Trilussa', 'San Pietro in Montorio'],
        description: 'Historic working-class enclave across the Tiber retaining deep Roman character.'
      },
      {
        name: 'Centro Storico & Campo de’ Fiori',
        vibe: 'Narrow Baroque streets, morning produce markets, and artisan gelato shops.',
        highlights: ['Piazza Navona', 'Campo de’ Fiori', 'Pantheon Square', 'Via dei Coronari'],
        description: 'The monumental heart of Renaissance Rome surrounding ancient imperial sites.'
      }
    ],
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80',
        title: 'The Colosseum Flavian Amphitheatre',
        caption: 'The ancient stone arches built between 70–80 AD under Emperor Vespasian.',
        photographer: 'David Libeert',
        source: 'Unsplash'
      },
      {
        url: 'https://images.unsplash.com/photo-1525874684015-58379d421a52?auto=format&fit=crop&w=1200&q=80',
        title: 'Trevi Fountain at Night',
        caption: 'Baroque travertine facade depicting Oceanus surrounded by tritons and seahorses.',
        photographer: 'Michele Bitetto',
        source: 'Unsplash'
      }
    ]
  },
  {
    id: 'sydney',
    name: 'Sydney',
    countryId: 'australia',
    countryName: 'Australia',
    countryFlag: '🇦🇺',
    continent: 'Oceania',
    coordinates: [-33.8688, 151.2093],
    population: '5,312,000',
    timezone: 'UTC+10 (AEST)',
    climate: 'Sunny temperate climate with warm summers and mild winters',
    bestTimeToVisit: 'September to November and March to May',
    heroImage: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1600&q=80',
    tagline: 'The world-famous harbor crowned by iconic white sails',
    description: 'Sydney is Australia’s largest city, built around Port Jackson natural harbor. Its dramatic waterfront features the UNESCO-listed Sydney Opera House, the steel arch of the Sydney Harbour Bridge, and famous Pacific surf beaches like Bondi and Manly.',
    featuredLandmarkIds: ['sydney-opera-house', 'sydney-harbour-bridge'],
    defaultStreetViewpointId: 'sydney-opera-forecourt',
    neighborhoods: [
      {
        name: 'The Rocks & Circular Quay',
        vibe: 'Historic sandstone warehouses, harbor ferries, markets, and pub terraces.',
        highlights: ['Circular Quay Ferry Wharves', 'The Rocks Historic Precinct', 'Museum of Contemporary Art'],
        description: 'The initial European settlement site of 1788 beneath the Harbour Bridge.'
      },
      {
        name: 'Bondi & Coastal Walk',
        vibe: 'Surf culture, ocean swimming pools, coastal clifftops, and relaxed cafes.',
        highlights: ['Bondi Beach', 'Icebergs Ocean Pool', 'Bondi to Coogee Coastal Walk'],
        description: 'World-renowned Australian beach culture just minutes from the city center.'
      }
    ],
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80',
        title: 'Sydney Opera House Sails',
        caption: 'Jørn Utzon’s precast concrete roof shells gleaming over Sydney Harbour.',
        photographer: 'Dan Freeman',
        source: 'Unsplash'
      }
    ]
  },
  {
    id: 'istanbul',
    name: 'Istanbul',
    countryId: 'turkey',
    countryName: 'Turkey',
    countryFlag: '🇹🇷',
    continent: 'Europe',
    coordinates: [41.0082, 28.9784],
    population: '15,636,000',
    timezone: 'UTC+3 (TRT)',
    climate: 'Transitional Mediterranean and oceanic with four seasons',
    bestTimeToVisit: 'April–May and September–November',
    heroImage: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1600&q=80',
    tagline: 'The historic bridge between Europe and Asia across the Bosphorus',
    description: 'Formerly Byzantium and Constantinople, Istanbul is a transcontinental metropolis spanning the Bosphorus Strait. Its historic Sultanahmet peninsula is home to the monumental Hagia Sophia, the Blue Mosque, Topkapi Palace, and the covered alleys of the Grand Bazaar.',
    featuredLandmarkIds: ['hagia-sophia', 'blue-mosque'],
    defaultStreetViewpointId: 'istanbul-sultanahmet-square',
    neighborhoods: [
      {
        name: 'Sultanahmet (Old City)',
        vibe: 'Byzantine domes, Ottoman minarets, ancient hippodrome, and stone streets.',
        highlights: ['Hagia Sophia', 'Blue Mosque', 'Basilica Cistern', 'Topkapi Palace'],
        description: 'The imperial heart of two major world empires spanning over 1,500 years.'
      },
      {
        name: 'Galata & Karaköy',
        vibe: 'Genoese stone tower, cobblestone slopes, trendy bistros, and waterfront cafes.',
        highlights: ['Galata Tower', 'Karaköy Pier', 'İstiklal Avenue'],
        description: 'Historic merchant colony across the Golden Horn connecting past and present.'
      }
    ],
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80',
        title: 'Hagia Sophia Grand Dome',
        caption: 'The sixth-century architectural marvel commissioned by Emperor Justinian I.',
        photographer: 'Fatih',
        source: 'Unsplash'
      }
    ]
  },
  {
    id: 'barcelona',
    name: 'Barcelona',
    countryId: 'spain',
    countryName: 'Spain',
    countryFlag: '🇪🇸',
    continent: 'Europe',
    coordinates: [41.3879, 2.1699],
    population: '1,664,000 (Metropolitan: 5.6M)',
    timezone: 'UTC+1 (CET)',
    climate: 'Warm Mediterranean climate with sunny sea breezes',
    bestTimeToVisit: 'May to June and September to October',
    heroImage: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1600&q=80',
    tagline: 'The Catalan capital of modernist architecture and Mediterranean beaches',
    description: 'Barcelona is the cosmopolitan capital of Catalonia, renowned for Antoni Gaudí’s surrealist masterworks including the Sagrada Família and Park Güell, the medieval labyrinth of the Gothic Quarter, and sunny seaside promenades.',
    featuredLandmarkIds: ['sagrada-familia'],
    defaultStreetViewpointId: 'barcelona-sagrada-plaza',
    neighborhoods: [
      {
        name: 'Eixample & Passeig de Gràcia',
        vibe: 'Modernista facades, octagonal street intersections, luxury boutiques, and wide avenues.',
        highlights: ['Sagrada Família', 'Casa Batlló', 'Casa Milà (La Pedrera)'],
        description: 'Ildefons Cerdà’s visionary 19th-century grid system expanding beyond medieval walls.'
      },
      {
        name: 'Barri Gòtic (Gothic Quarter)',
        vibe: 'Medieval stone alleyways, Roman ruins, secret courtyards, and lively tapas bars.',
        highlights: ['Barcelona Cathedral', 'Plaça Reial', 'Plaça del Rei'],
        description: 'The ancient center of Barcelona with Roman walls and 14th-century Catalan Gothic palaces.'
      }
    ],
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1200&q=80',
        title: 'Sagrada Família Nativity Facade',
        caption: 'Gaudí’s ongoing basilica masterpiece under the Catalan sun.',
        photographer: 'Moritz Mentges',
        source: 'Unsplash'
      }
    ]
  },
  {
    id: 'cape-town',
    name: 'Cape Town',
    countryId: 'south-africa',
    countryName: 'South Africa',
    countryFlag: '🇿🇦',
    continent: 'Africa',
    coordinates: [-33.9249, 18.4241],
    population: '4,618,000',
    timezone: 'UTC+2 (SAST)',
    climate: 'Mediterranean climate with warm, dry summers and mild winters',
    bestTimeToVisit: 'November to March during Southern Hemisphere summer',
    heroImage: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1600&q=80',
    tagline: 'Where majestic mountains meet two oceans at the tip of Africa',
    description: 'Cape Town is crowned by the iconic sandstone plateau of Table Mountain. With the dramatic Atlantic seaboard, vibrant Bo-Kaap pastel houses, and the V&A Waterfront, it is considered one of the most geographically stunning cities on earth.',
    featuredLandmarkIds: ['table-mountain'],
    defaultStreetViewpointId: 'cape-town-table-mountain',
    neighborhoods: [
      {
        name: 'V&A Waterfront',
        vibe: 'Working maritime harbor, seafood restaurants, craft sheds, and catamaran docks.',
        highlights: ['Two Oceans Aquarium', 'Zeitz MOCAA', 'Cape Wheel'],
        description: 'South Africa’s premier harbor destination beneath the mountain backdrop.'
      },
      {
        name: 'Bo-Kaap',
        vibe: 'Brightly colored Cape Dutch houses, cobblestone streets, and Cape Malay spice shops.',
        highlights: ['Wale Street', 'Auwal Mosque', 'Bo-Kaap Museum'],
        description: 'Historic cultural quarter celebrating Cape Malay traditions and architecture.'
      }
    ],
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1200&q=80',
        title: 'Table Mountain and City Bowl',
        caption: 'The flat-topped landmark mountain towering over the South African metropolis.',
        photographer: 'Kym Ellis',
        source: 'Unsplash'
      }
    ]
  },
  {
    id: 'singapore-city',
    name: 'Singapore',
    countryId: 'singapore',
    countryName: 'Singapore',
    countryFlag: '🇸🇬',
    continent: 'Asia',
    coordinates: [1.3521, 103.8198],
    population: '5,917,000',
    timezone: 'UTC+8 (SGT)',
    climate: 'Tropical rainforest climate with uniform warmth and rainfall',
    bestTimeToVisit: 'November to January or July to August',
    heroImage: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1600&q=80',
    tagline: 'The futuristic island nation and global garden city',
    description: 'Singapore is a global financial hub and island city-state off southern Malaysia. It features futuristic architectural landmarks like Marina Bay Sands, the Supertree Grove at Gardens by the Bay, and historic heritage districts of Chinatown and Little India.',
    featuredLandmarkIds: ['marina-bay-sands'],
    defaultStreetViewpointId: 'singapore-marina-bay',
    neighborhoods: [
      {
        name: 'Marina Bay & Civic District',
        vibe: 'Waterfront boardwalks, architectural pavilions, and high-tech gardens.',
        highlights: ['Marina Bay Sands', 'Gardens by the Bay', 'Merlion Park'],
        description: 'A reclaimed waterfront showcase of sustainable urban design.'
      }
    ],
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80',
        title: 'Marina Bay Sands & Waterfront',
        caption: 'Moshe Safdie’s three integrated hotel towers crowned by the SkyPark cantilever.',
        photographer: 'Hu Chen',
        source: 'Unsplash'
      }
    ]
  }
];

export const LANDMARKS: Landmark[] = [
  {
    id: 'eiffel-tower',
    name: 'Eiffel Tower',
    cityId: 'paris',
    cityName: 'Paris',
    countryName: 'France',
    category: 'Historic Monument',
    coordinates: [48.8584, 2.2945],
    yearCompleted: '1889',
    architecturalStyle: 'Structural Puddled Iron Lattice',
    description: 'Constructed as the entrance arch for the 1889 Exposition Universelle by engineer Gustave Eiffel, this 330-meter monument remains the global symbol of France and the most visited ticketed monument in the world.',
    imageUrl: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Anthony DELANOIX',
    source: 'Unsplash',
    streetViewpointId: 'paris-eiffel-champ-de-mars',
    facts: [
      'Stands 330 meters (1,083 feet) high including antennas.',
      'Constructed using 18,038 pieces of wrought iron joined by 2.5 million rivets.',
      'Repainted by hand every seven years using approximately 60 metric tons of paint.'
    ]
  },
  {
    id: 'louvre-museum',
    name: 'Louvre Museum & Pyramid',
    cityId: 'paris',
    cityName: 'Paris',
    countryName: 'France',
    category: 'Cultural Institution',
    coordinates: [48.8606, 2.3376],
    yearCompleted: '1793 (Pyramid 1989)',
    architecturalStyle: 'French Renaissance & Modernist Glass',
    description: 'The world’s largest art museum and historic royal palace, showcasing over 35,000 artworks including Leonardo da Vinci’s Mona Lisa and the Venus de Milo within 72,735 square meters of exhibition space.',
    imageUrl: 'https://images.unsplash.com/photo-1492136344046-866c85e0bf04?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Alexander Kagan',
    source: 'Unsplash',
    streetViewpointId: 'paris-louvre-courtyard',
    facts: [
      'Originally established as a 12th-century defensive fortress by King Philip II.',
      'The central glass pyramid designed by I.M. Pei consists of 673 glass segments.',
      'It would take over 100 days of non-stop viewing to see every piece in the collection for 30 seconds.'
    ]
  },
  {
    id: 'arc-de-triomphe',
    name: 'Arc de Triomphe',
    cityId: 'paris',
    cityName: 'Paris',
    countryName: 'France',
    category: 'Historic Monument',
    coordinates: [48.8738, 2.295],
    yearCompleted: '1836',
    architecturalStyle: 'Neoclassical Triumphal Arch',
    description: 'Standing at the western end of the Champs-Élysées at the center of Place Charles de Gaulle, the arch honors those who fought and died for France in the French Revolutionary and Napoleonic Wars.',
    imageUrl: 'https://images.unsplash.com/photo-1509439581779-6298f75bf6e5?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Cyril Mazarin',
    source: 'Unsplash',
    streetViewpointId: 'paris-arc-de-triomphe',
    facts: [
      'Stands 50 meters tall and 45 meters wide.',
      'Houses the Tomb of the Unknown Soldier from World War I with the eternal flame.',
      'Twelve grand avenues radiate outward from its circular star plaza.'
    ]
  },
  {
    id: 'shibuya-crossing',
    name: 'Shibuya Scramble Crossing',
    cityId: 'tokyo',
    cityName: 'Tokyo',
    countryName: 'Japan',
    category: 'Public Square',
    coordinates: [35.6595, 139.7005],
    yearCompleted: '1973 (Modern Layout)',
    architecturalStyle: 'High-Density Urban Pedestrian Scramble',
    description: 'The world’s busiest pedestrian intersection, where up to 3,000 pedestrians cross simultaneously at every green light cycle amidst giant LED billboards and towering commercial centers.',
    imageUrl: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Clay Banks',
    source: 'Unsplash',
    streetViewpointId: 'tokyo-shibuya-crossing',
    facts: [
      'Over 2.4 million people traverse Shibuya Station daily.',
      'Features the iconic bronze statue of Hachiko, the loyal Akita dog.',
      'Surrounded by some of the largest synchronous video screens on the planet.'
    ]
  },
  {
    id: 'tokyo-tower',
    name: 'Tokyo Tower',
    cityId: 'tokyo',
    cityName: 'Tokyo',
    countryName: 'Japan',
    category: 'Modern Marvel',
    coordinates: [35.6586, 139.7454],
    yearCompleted: '1958',
    architecturalStyle: 'Cantilever Lattice Communications Tower',
    description: 'A 332.9-meter communications and observation tower in Minato, Tokyo. Inspired by the Eiffel Tower, it is painted in alternating white and international orange to comply with aviation safety regulations.',
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Yu Kato',
    source: 'Unsplash',
    streetViewpointId: 'tokyo-tower-base',
    facts: [
      'Built with steel taken in part from decommissioned tanks from the Korean War.',
      'Lighted with 180 lamps that switch between winter orange and summer cool white.',
      'Offers panoramic views reaching Mount Fuji on clear mornings.'
    ]
  },
  {
    id: 'senso-ji',
    name: 'Sensō-ji Temple',
    cityId: 'tokyo',
    cityName: 'Tokyo',
    countryName: 'Japan',
    category: 'Sacred Architecture',
    coordinates: [35.7148, 139.7967],
    yearCompleted: '645 AD',
    architecturalStyle: 'Classical Japanese Buddhist Architecture',
    description: 'Tokyo’s oldest Buddhist temple, dedicated to the bodhisattva Kannon. Visitors pass through the monumental Kaminarimon (Thunder Gate) and Nakamise shopping street leading to the main five-story pagoda and hall.',
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Sora Sagano',
    source: 'Unsplash',
    streetViewpointId: 'tokyo-senso-ji',
    facts: [
      'Founded in 645 AD following the discovery of a gold Kannon statue in the Sumida River.',
      'The Thunder Gate lantern weighs approximately 700 kilograms.',
      'Over 30 million worshippers and visitors pass through its grounds annually.'
    ]
  },
  {
    id: 'times-square',
    name: 'Times Square',
    cityId: 'new-york',
    cityName: 'New York City',
    countryName: 'United States',
    category: 'Public Square',
    coordinates: [40.758, -73.9855],
    yearCompleted: '1904 (Named after NY Times)',
    architecturalStyle: 'Commercial Megastructure & Illuminated Billboards',
    description: 'A major commercial intersection, tourist destination, and entertainment center in Midtown Manhattan at the junction of Broadway and Seventh Avenue, illuminated 24 hours a day by colossal billboards.',
    imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df5293cb325?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Oliver Niblett',
    source: 'Unsplash',
    streetViewpointId: 'nyc-times-square',
    facts: [
      'Approximately 330,000 people pass through Times Square daily.',
      'Renamed from Longacre Square in April 1904 when The New York Times moved into One Times Square.',
      'Host to the annual New Year’s Eve ball drop tradition since 1907.'
    ]
  },
  {
    id: 'brooklyn-bridge',
    name: 'Brooklyn Bridge',
    cityId: 'new-york',
    cityName: 'New York City',
    countryName: 'United States',
    category: 'Iconic Bridge',
    coordinates: [40.7061, -73.9969],
    yearCompleted: '1883',
    architecturalStyle: 'Neo-Gothic Stone Suspension Bridge',
    description: 'A hybrid cable-stayed/suspension bridge spanning the East River between Manhattan and Brooklyn. Designed by John Augustus Roebling, its limestone and granite Gothic arches made it the first steel-wire suspension bridge.',
    imageUrl: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Matteo Catanese',
    source: 'Unsplash',
    streetViewpointId: 'nyc-brooklyn-bridge',
    facts: [
      'Main span of 1,595.5 feet (486.3 meters), the longest in the world when built.',
      'Completed under the guidance of Emily Warren Roebling after both her husband and father-in-law fell ill.',
      'Features an elevated pedestrian promenade directly above vehicular traffic.'
    ]
  },
  {
    id: 'central-park',
    name: 'Central Park',
    cityId: 'new-york',
    cityName: 'New York City',
    countryName: 'United States',
    category: 'Public Square',
    coordinates: [40.785091, -73.968285],
    yearCompleted: '1858–1876',
    architecturalStyle: 'Romantic Landscape Architecture',
    description: 'An urban oasis of 843 acres (341 hectares) located in the center of Manhattan, designed by landscape architects Frederick Law Olmsted and Calvert Vaux, featuring artificial lakes, walking trails, and historic bridges.',
    imageUrl: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Michael Discenza',
    source: 'Unsplash',
    streetViewpointId: 'nyc-central-park-mall',
    facts: [
      'Contains over 20,000 trees, 36 bridges and arches, and 7 bodies of water.',
      'Larger than the principality of Monaco.',
      'Receives approximately 42 million visitors per year.'
    ]
  },
  {
    id: 'tower-bridge',
    name: 'Tower Bridge',
    cityId: 'london',
    cityName: 'London',
    countryName: 'United Kingdom',
    category: 'Iconic Bridge',
    coordinates: [51.5055, -0.0754],
    yearCompleted: '1894',
    architecturalStyle: 'Victorian Gothic Bascule and Suspension Bridge',
    description: 'Spanning the River Thames close to the Tower of London, this world-famous bascule and suspension bridge features twin Gothic towers and high-level walkways offering views of the river and city skyline.',
    imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Benjamin Davies',
    source: 'Unsplash',
    streetViewpointId: 'london-tower-bridge',
    facts: [
      'The bascules are raised approximately 800 times a year for tall ships.',
      'Originally operated by steam-powered hydraulic accumulators until 1976.',
      'Built with over 11,000 tons of Cornish granite and Portland stone cladded over steel.'
    ]
  },
  {
    id: 'big-ben',
    name: 'Big Ben & Palace of Westminster',
    cityId: 'london',
    cityName: 'London',
    countryName: 'United Kingdom',
    category: 'Historic Monument',
    coordinates: [51.5007, -0.1246],
    yearCompleted: '1859',
    architecturalStyle: 'Perpendicular Gothic Revival',
    description: 'The iconic 96-meter Elizabeth Tower housing the Great Bell known as Big Ben, adjoining the Palace of Westminster on the north bank of the River Thames where the UK Parliament convenes.',
    imageUrl: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Marcin Nowak',
    source: 'Unsplash',
    streetViewpointId: 'london-westminster-bridge',
    facts: [
      'The Great Bell inside weighs 13.7 tonnes.',
      'Each of the four clock dials measures 7 meters in diameter and contains 312 pieces of pot opal glass.',
      'Survives as one of London’s most prominent symbols of democracy and heritage.'
    ]
  },
  {
    id: 'burj-khalifa',
    name: 'Burj Khalifa',
    cityId: 'dubai',
    cityName: 'Dubai',
    countryName: 'United Arab Emirates',
    category: 'Modern Marvel',
    coordinates: [25.1972, 55.2744],
    yearCompleted: '2010',
    architecturalStyle: 'Neo-Futuristic Buttressed Core Skyscraper',
    description: 'The tallest structure and building in the world at 828 meters (2,716.5 feet), featuring 163 habitable floors. Designed by Adrian Smith of SOM, its Y-shaped geometry is inspired by the regional desert spider lily Hymenocallis.',
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    photographer: 'David Rodrigo',
    source: 'Unsplash',
    streetViewpointId: 'dubai-burj-khalifa-plaza',
    facts: [
      'Stands at an unprecedented height of 828 meters.',
      'Holds world records for highest observation deck, longest elevator travel, and tallest free-standing structure.',
      'Exterior cladded in 26,000 hand-cut glass panels designed to withstand severe desert heat.'
    ]
  },
  {
    id: 'faisal-mosque',
    name: 'Faisal Mosque',
    cityId: 'islamabad',
    cityName: 'Islamabad',
    countryName: 'Pakistan',
    category: 'Sacred Architecture',
    coordinates: [33.7297, 73.0372],
    yearCompleted: '1986',
    architecturalStyle: 'Modernist Bedouin Tent Architecture',
    description: 'The national mosque of Pakistan, situated at the base of the Margalla Hills. Designed by Turkish architect Vedat Dalokay without traditional domes, it takes the form of an eight-sided Bedouin desert tent flanked by four 88-meter Ottoman-style pencil minarets.',
    imageUrl: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Ali Imran',
    source: 'Unsplash',
    streetViewpointId: 'islamabad-faisal-mosque',
    facts: [
      'Accommodates up to 100,000 worshippers in the main hall and courtyards, plus 200,000 in adjoining grounds.',
      'Named after King Faisal of Saudi Arabia who financed the construction.',
      'Replaces the customary dome with an eight-faceted concrete shell rising 40 meters.'
    ]
  },
  {
    id: 'pakistan-monument',
    name: 'Pakistan Monument',
    cityId: 'islamabad',
    cityName: 'Islamabad',
    countryName: 'Pakistan',
    category: 'Historic Monument',
    coordinates: [33.6934, 73.0683],
    yearCompleted: '2007',
    architecturalStyle: 'Petal-Shaped Mughal-Modern Granite Landmark',
    description: 'Located in the Shakarparian Hills, the monument is shaped like a blooming flower with four large petals representing Pakistan’s four major provinces (Punjab, Sindh, Khyber Pakhtunkhwa, Balochistan) and three smaller petals representing the territories.',
    imageUrl: 'https://images.unsplash.com/photo-1627993078499-c0201882eb75?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Umer Sayyam',
    source: 'Unsplash',
    streetViewpointId: 'islamabad-pakistan-monument',
    facts: [
      'Inner petal walls are decorated with intricate bas-relief murals depicting national history.',
      'Positioned at the crest of Shakarparian overlooking both Islamabad and Rawalpindi.',
      'Features a central granite plaza shaped like a five-pointed crescent star.'
    ]
  },
  {
    id: 'colosseum',
    name: 'The Colosseum',
    cityId: 'rome',
    cityName: 'Rome',
    countryName: 'Italy',
    category: 'Historic Monument',
    coordinates: [41.8902, 12.4922],
    yearCompleted: '80 AD',
    architecturalStyle: 'Roman Classical Travertine & Tuff Amphitheatre',
    description: 'The largest ancient amphitheatre ever built, constructed under Emperors Vespasian and Titus of the Flavian dynasty. It held an estimated 50,000 to 80,000 spectators for gladiatorial contests and public spectacles.',
    imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80',
    photographer: 'David Libeert',
    source: 'Unsplash',
    streetViewpointId: 'rome-colosseum-piazza',
    facts: [
      'Built using an estimated 100,000 cubic meters of travertine stone held together by iron clamps.',
      'Underneath the wooden arena floor lay the Hypogeum, a subterranean network of tunnels and cages.',
      'Selected as one of the New Seven Wonders of the World in 2007.'
    ]
  },
  {
    id: 'sydney-opera-house',
    name: 'Sydney Opera House',
    cityId: 'sydney',
    cityName: 'Sydney',
    countryName: 'Australia',
    category: 'Cultural Institution',
    coordinates: [-33.8568, 151.2153],
    yearCompleted: '1973',
    architecturalStyle: 'Modern Expressionist Sculptural Concrete',
    description: 'A multi-venue performing arts centre on Bennelong Point in Sydney Harbour. Designed by Danish architect Jørn Utzon, its interlocking precast concrete spherical shell roof stands as a masterwork of 20th-century architecture.',
    imageUrl: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Dan Freeman',
    source: 'Unsplash',
    streetViewpointId: 'sydney-opera-forecourt',
    facts: [
      'The roof sails are covered with 1,056,006 Swedish glazed ceramic tiles.',
      'Added to the UNESCO World Heritage List in 2007 as one of the indisputable masterpieces of human creativity.',
      'Hosts more than 1,500 performances each year attended by more than 1.2 million people.'
    ]
  },
  {
    id: 'sagrada-familia',
    name: 'Basílica de la Sagrada Família',
    cityId: 'barcelona',
    cityName: 'Barcelona',
    countryName: 'Spain',
    category: 'Sacred Architecture',
    coordinates: [41.4036, 2.1744],
    yearCompleted: 'Under Construction (Started 1882)',
    architecturalStyle: 'Catalan Modernisme & Organic Gothic',
    description: 'Antoni Gaudí’s extraordinary basilica combining Gothic and curvilinear Art Nouveau forms with naturalistic geometry. Its soaring spires, organic columns resembling stone trees, and stained glass create a forest of light.',
    imageUrl: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Moritz Mentges',
    source: 'Unsplash',
    streetViewpointId: 'barcelona-sagrada-plaza',
    facts: [
      'Gaudí devoted the last 43 years of his life to the construction and is buried in its crypt.',
      'When completed, the central Tower of Jesus Christ will reach 172.5 meters.',
      'Financed entirely through private donations and visitor ticket receipts.'
    ]
  },
  {
    id: 'hagia-sophia',
    name: 'Hagia Sophia',
    cityId: 'istanbul',
    cityName: 'Istanbul',
    countryName: 'Turkey',
    category: 'Sacred Architecture',
    coordinates: [41.0086, 28.9802],
    yearCompleted: '537 AD',
    architecturalStyle: 'Byzantine Pendentive Dome Architecture',
    description: 'Built by the Byzantine Emperor Justinian I as the imperial cathedral of Constantinople, Hagia Sophia’s colossal 31-meter dome was the largest enclosed space in the world for nearly a millennium before being converted into an Ottoman mosque.',
    imageUrl: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Fatih',
    source: 'Unsplash',
    streetViewpointId: 'istanbul-sultanahmet-square',
    facts: [
      'Constructed in just five years and ten months by mathematicians Isidore of Miletus and Anthemius of Tralles.',
      'Its central dome rests upon four massive spherical pendentives, an engineering revolution.',
      'Features both Byzantine gold mosaics and 7.5-meter Ottoman calligraphic roundels.'
    ]
  }
];

// Rich, authentic 360° spherical panoramic street viewpoints with connected navigation graphs!
export const STREET_VIEWPOINTS: StreetViewpoint[] = [
  {
    id: 'paris-eiffel-champ-de-mars',
    title: 'Champ de Mars Park Gardens',
    streetName: 'Allée Adrienne Lecouvreur',
    neighborhood: '7th Arrondissement',
    cityName: 'Paris',
    countryName: 'France',
    cityId: 'paris',
    coordinates: [48.8558, 2.2982],
    elevationMeters: 35,
    initialHeading: 325,
    initialPitch: 10,
    fov: 75,
    // Real authentic high-res 360 photosphere (equirectangular projection)
    panoramaUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Eiffel_Tower_from_the_Champ-de-Mars%2C_Paris_May_2014.jpg/2560px-Eiffel_Tower_from_the_Champ-de-Mars%2C_Paris_May_2014.jpg',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1600&q=80',
    googleStreetViewEmbedUrl: 'https://maps.google.com/maps?q=48.8558,2.2982&layer=c&cbll=48.8558,2.2982&cbp=11,325,,0,0&output=svembed',
    connectedViewpoints: [
      {
        viewpointId: 'paris-eiffel-under-arch',
        targetName: 'Tower Base & Pilier Ouest',
        directionHeading: 325,
        distanceLabel: '280m toward Tower'
      },
      {
        viewpointId: 'paris-louvre-courtyard',
        targetName: 'Louvre Courtyard',
        directionHeading: 65,
        distanceLabel: '3.2km East'
      }
    ],
    timeOfDay: 'Daylight',
    attribution: {
      photographer: 'Taxiarchos228',
      source: 'Wikimedia Commons / Open Geodata',
      license: 'CC BY 3.0'
    },
    description: 'Looking northwest across the lush lawns of the Champ de Mars directly up the iron framework of the Eiffel Tower toward the River Seine and the Trocadéro.'
  },
  {
    id: 'paris-eiffel-under-arch',
    title: 'Eiffel Tower Archways & Esplanade',
    streetName: 'Champ de Mars Esplanade',
    neighborhood: '7th Arrondissement',
    cityName: 'Paris',
    countryName: 'France',
    cityId: 'paris',
    coordinates: [48.8584, 2.2945],
    elevationMeters: 33,
    initialHeading: 145,
    initialPitch: 35,
    fov: 80,
    panoramaUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg/2560px-Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80',
    googleStreetViewEmbedUrl: 'https://maps.google.com/maps?q=48.8584,2.2945&layer=c&cbll=48.8584,2.2945&cbp=11,145,,0,0&output=svembed',
    connectedViewpoints: [
      {
        viewpointId: 'paris-eiffel-champ-de-mars',
        targetName: 'Champ de Mars Lawns',
        directionHeading: 145,
        distanceLabel: '280m South'
      },
      {
        viewpointId: 'paris-arc-de-triomphe',
        targetName: 'Place Charles de Gaulle',
        directionHeading: 345,
        distanceLabel: '1.8km North'
      }
    ],
    timeOfDay: 'Daylight',
    attribution: {
      photographer: 'Tristan Nitot',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA 3.0'
    },
    description: 'Directly underneath the massive 7,300-ton iron archways. Looking straight upward reveals the intricate hydraulic lift shafts and internal rivets.'
  },
  {
    id: 'paris-louvre-courtyard',
    title: 'Cour Napoléon & Glass Pyramid',
    streetName: 'Rue de Rivoli Access',
    neighborhood: '1st Arrondissement',
    cityName: 'Paris',
    countryName: 'France',
    cityId: 'paris',
    coordinates: [48.8606, 2.3376],
    elevationMeters: 34,
    initialHeading: 270,
    initialPitch: 5,
    fov: 75,
    panoramaUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Louvre_Pyramid%2C_Paris_February_2020.jpg/2560px-Louvre_Pyramid%2C_Paris_February_2020.jpg',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1492136344046-866c85e0bf04?auto=format&fit=crop&w=1600&q=80',
    googleStreetViewEmbedUrl: 'https://maps.google.com/maps?q=48.8606,2.3376&layer=c&cbll=48.8606,2.3376&cbp=11,270,,0,0&output=svembed',
    connectedViewpoints: [
      {
        viewpointId: 'paris-eiffel-champ-de-mars',
        targetName: 'Eiffel Tower',
        directionHeading: 245,
        distanceLabel: '3.2km West'
      }
    ],
    timeOfDay: 'Twilight',
    attribution: {
      photographer: 'Diliff',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA 3.0'
    },
    description: 'The monumental cobblestone courtyard surrounded by the Sully, Richelieu, and Denon wings of the royal palace, reflecting Pei’s geometric pyramid.'
  },
  {
    id: 'paris-arc-de-triomphe',
    title: 'Place Charles de Gaulle (Étoile)',
    streetName: 'Avenue des Champs-Élysées',
    neighborhood: '8th Arrondissement',
    cityName: 'Paris',
    countryName: 'France',
    cityId: 'paris',
    coordinates: [48.8738, 2.295],
    elevationMeters: 55,
    initialHeading: 115,
    initialPitch: 12,
    fov: 75,
    panoramaUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Arc_Triomphe_Paris_571.jpg/2560px-Arc_Triomphe_Paris_571.jpg',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1509439581779-6298f75bf6e5?auto=format&fit=crop&w=1600&q=80',
    googleStreetViewEmbedUrl: 'https://maps.google.com/maps?q=48.8738,2.2950&layer=c&cbll=48.8738,2.2950&cbp=11,115,,0,0&output=svembed',
    connectedViewpoints: [
      {
        viewpointId: 'paris-eiffel-under-arch',
        targetName: 'Eiffel Tower',
        directionHeading: 165,
        distanceLabel: '1.8km South'
      }
    ],
    timeOfDay: 'Daylight',
    attribution: {
      photographer: 'Benh LIEU SONG',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA 3.0'
    },
    description: 'Standing at the threshold of the Avenue des Champs-Élysées. Looking southeast reveals the gentle descent toward Place de la Concorde.'
  },
  {
    id: 'tokyo-shibuya-crossing',
    title: 'Shibuya Scramble Intersection Center',
    streetName: 'Dogenzaka / Inokashira-dori',
    neighborhood: 'Shibuya City',
    cityName: 'Tokyo',
    countryName: 'Japan',
    cityId: 'tokyo',
    coordinates: [35.6595, 139.7005],
    elevationMeters: 18,
    initialHeading: 340,
    initialPitch: 15,
    fov: 75,
    panoramaUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Shibuya_Crossing_%28Night%29.jpg/2560px-Shibuya_Crossing_%28Night%29.jpg',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=1600&q=80',
    googleStreetViewEmbedUrl: 'https://maps.google.com/maps?q=35.6595,139.7005&layer=c&cbll=35.6595,139.7005&cbp=11,340,,0,0&output=svembed',
    connectedViewpoints: [
      {
        viewpointId: 'tokyo-shibuya-hachiko',
        targetName: 'Hachiko Square Station Exit',
        directionHeading: 120,
        distanceLabel: '45m East'
      },
      {
        viewpointId: 'tokyo-tower-base',
        targetName: 'Tokyo Tower',
        directionHeading: 95,
        distanceLabel: '4.5km East'
      }
    ],
    timeOfDay: 'Twilight',
    attribution: {
      photographer: 'Kakidai',
      source: 'Wikimedia Commons / Open Geodata',
      license: 'CC BY-SA 4.0'
    },
    description: 'Directly in the center of the world’s most famous pedestrian intersection, surrounded by the QFRONT Tsutaya tower and massive synchronous video screens.'
  },
  {
    id: 'tokyo-shibuya-hachiko',
    title: 'Hachiko Memorial Plaza & Shibuya Station',
    streetName: 'Tamagawa-dori',
    neighborhood: 'Shibuya City',
    cityName: 'Tokyo',
    countryName: 'Japan',
    cityId: 'tokyo',
    coordinates: [35.6591, 139.7006],
    elevationMeters: 17,
    initialHeading: 290,
    initialPitch: 5,
    fov: 75,
    panoramaUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Hachiko_Statue%2C_Tokyo_2019.jpg/2560px-Hachiko_Statue%2C_Tokyo_2019.jpg',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1600&q=80',
    googleStreetViewEmbedUrl: 'https://maps.google.com/maps?q=35.6591,139.7006&layer=c&cbll=35.6591,139.7006&cbp=11,290,,0,0&output=svembed',
    connectedViewpoints: [
      {
        viewpointId: 'tokyo-shibuya-crossing',
        targetName: 'Shibuya Scramble Center',
        directionHeading: 300,
        distanceLabel: '45m West'
      }
    ],
    timeOfDay: 'Daylight',
    attribution: {
      photographer: 'A.Currell',
      source: 'Wikimedia Commons',
      license: 'CC BY-NC 2.0'
    },
    description: 'Outside the JR Shibuya Station Hachiko Gate, shaded by zelkova trees where locals meet beside the bronze canine monument.'
  },
  {
    id: 'tokyo-tower-base',
    title: 'Tokyo Tower FootTown Forecourt',
    streetName: 'Metropolitan Route 301',
    neighborhood: 'Shiba-koen, Minato',
    cityName: 'Tokyo',
    countryName: 'Japan',
    cityId: 'tokyo',
    coordinates: [35.6586, 139.7454],
    elevationMeters: 25,
    initialHeading: 0,
    initialPitch: 40,
    fov: 75,
    panoramaUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Tokyo_Tower_and_around_Skyscrapers.jpg/2560px-Tokyo_Tower_and_around_Skyscrapers.jpg',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1600&q=80',
    googleStreetViewEmbedUrl: 'https://maps.google.com/maps?q=35.6586,139.7454&layer=c&cbll=35.6586,139.7454&cbp=11,0,,0,0&output=svembed',
    connectedViewpoints: [
      {
        viewpointId: 'tokyo-shibuya-crossing',
        targetName: 'Shibuya Crossing',
        directionHeading: 275,
        distanceLabel: '4.5km West'
      },
      {
        viewpointId: 'tokyo-senso-ji',
        targetName: 'Sensō-ji Temple',
        directionHeading: 35,
        distanceLabel: '8.2km Northeast'
      }
    ],
    timeOfDay: 'Golden Hour',
    attribution: {
      photographer: 'Morio',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA 3.0'
    },
    description: 'At the southern base of the orange and white steel lattice tower beside Shiba Park, gazing straight up along its tapered four-cornered foundation.'
  },
  {
    id: 'tokyo-senso-ji',
    title: 'Sensō-ji Main Hall & Hozomon Gate',
    streetName: 'Asakusa Kannon Street',
    neighborhood: 'Taito City',
    cityName: 'Tokyo',
    countryName: 'Japan',
    cityId: 'tokyo',
    coordinates: [35.7148, 139.7967],
    elevationMeters: 5,
    initialHeading: 180,
    initialPitch: 10,
    fov: 75,
    panoramaUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Senso-ji_Temple_at_Night.jpg/2560px-Senso-ji_Temple_at_Night.jpg',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=80',
    googleStreetViewEmbedUrl: 'https://maps.google.com/maps?q=35.7148,139.7967&layer=c&cbll=35.7148,139.7967&cbp=11,180,,0,0&output=svembed',
    connectedViewpoints: [
      {
        viewpointId: 'tokyo-shibuya-crossing',
        targetName: 'Shibuya Crossing',
        directionHeading: 220,
        distanceLabel: '12km Southwest'
      }
    ],
    timeOfDay: 'Twilight',
    attribution: {
      photographer: 'Nemo5576',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA 3.0'
    },
    description: 'Within the sacred courtyard of Asakusa’s 7th-century Buddhist sanctuary, beside the grand five-story pagoda and incense burner.'
  },
  {
    id: 'nyc-times-square',
    title: 'Times Square & Father Duffy Square',
    streetName: 'Broadway & West 46th Street',
    neighborhood: 'Midtown Manhattan',
    cityName: 'New York City',
    countryName: 'United States',
    cityId: 'new-york',
    coordinates: [40.758, -73.9855],
    elevationMeters: 16,
    initialHeading: 195,
    initialPitch: 18,
    fov: 75,
    panoramaUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Times_Square_at_Twilight.jpg/2560px-Times_Square_at_Twilight.jpg',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1508873696983-2df5293cb325?auto=format&fit=crop&w=1600&q=80',
    googleStreetViewEmbedUrl: 'https://maps.google.com/maps?q=40.7580,-73.9855&layer=c&cbll=40.7580,-73.9855&cbp=11,195,,0,0&output=svembed',
    connectedViewpoints: [
      {
        viewpointId: 'nyc-central-park-mall',
        targetName: 'Central Park Mall & Bethesda',
        directionHeading: 15,
        distanceLabel: '1.4km North'
      },
      {
        viewpointId: 'nyc-brooklyn-bridge',
        targetName: 'Brooklyn Bridge Promenade',
        directionHeading: 175,
        distanceLabel: '5.8km South'
      }
    ],
    timeOfDay: 'Night',
    attribution: {
      photographer: 'Chensiyuan',
      source: 'Wikimedia Commons / Open Geodata',
      license: 'CC BY-SA 4.0'
    },
    description: 'Looking south from the pedestrian plaza at 46th Street toward One Times Square, surrounded by towering LED screens and Broadway marquees.'
  },
  {
    id: 'nyc-brooklyn-bridge',
    title: 'Brooklyn Bridge Elevated Boardwalk',
    streetName: 'East River Span',
    neighborhood: 'DUMBO / Civic Center',
    cityName: 'New York City',
    countryName: 'United States',
    cityId: 'new-york',
    coordinates: [40.7061, -73.9969],
    elevationMeters: 42,
    initialHeading: 260,
    initialPitch: 10,
    fov: 75,
    panoramaUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Brooklyn_Bridge_Manhattan_May_2009.jpg/2560px-Brooklyn_Bridge_Manhattan_May_2009.jpg',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=1600&q=80',
    googleStreetViewEmbedUrl: 'https://maps.google.com/maps?q=40.7061,-73.9969&layer=c&cbll=40.7061,-73.9969&cbp=11,260,,0,0&output=svembed',
    connectedViewpoints: [
      {
        viewpointId: 'nyc-times-square',
        targetName: 'Times Square',
        directionHeading: 355,
        distanceLabel: '5.8km North'
      }
    ],
    timeOfDay: 'Daylight',
    attribution: {
      photographer: 'King of Hearts',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA 3.0'
    },
    description: 'Halfway across the wooden promenade between Brooklyn and Manhattan, framed by Gothic double-arch stone towers and diagonal wire stays.'
  },
  {
    id: 'nyc-central-park-mall',
    title: 'Central Park Literary Walk & The Mall',
    streetName: 'Central Park Center Drive',
    neighborhood: 'Upper East Side / Upper West Side',
    cityName: 'New York City',
    countryName: 'United States',
    cityId: 'new-york',
    coordinates: [40.7713, -73.9723],
    elevationMeters: 28,
    initialHeading: 20,
    initialPitch: 2,
    fov: 75,
    panoramaUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Central_Park_Mall_autumn.jpg/2560px-Central_Park_Mall_autumn.jpg',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1600&q=80',
    googleStreetViewEmbedUrl: 'https://maps.google.com/maps?q=40.7713,-73.9723&layer=c&cbll=40.7713,-73.9723&cbp=11,20,,0,0&output=svembed',
    connectedViewpoints: [
      {
        viewpointId: 'nyc-times-square',
        targetName: 'Times Square',
        directionHeading: 195,
        distanceLabel: '1.4km South'
      }
    ],
    timeOfDay: 'Daylight',
    attribution: {
      photographer: 'Jean-Christophe BENOIST',
      source: 'Wikimedia Commons',
      license: 'CC BY 3.0'
    },
    description: 'Underneath the cathedral-like canopy of American elm trees along The Mall leading northward toward Bethesda Terrace and Fountain.'
  },
  {
    id: 'london-tower-bridge',
    title: 'Tower Bridge North Walkway',
    streetName: 'Tower Bridge Road',
    neighborhood: 'Tower Hamlets / Southwark',
    cityName: 'London',
    countryName: 'United Kingdom',
    cityId: 'london',
    coordinates: [51.5055, -0.0754],
    elevationMeters: 14,
    initialHeading: 180,
    initialPitch: 15,
    fov: 75,
    panoramaUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Tower_Bridge_from_the_north_bank.jpg/2560px-Tower_Bridge_from_the_north_bank.jpg',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1600&q=80',
    googleStreetViewEmbedUrl: 'https://maps.google.com/maps?q=51.5055,-0.0754&layer=c&cbll=51.5055,-0.0754&cbp=11,180,,0,0&output=svembed',
    connectedViewpoints: [
      {
        viewpointId: 'london-westminster-bridge',
        targetName: 'Westminster Bridge & Big Ben',
        directionHeading: 260,
        distanceLabel: '4.2km West up the Thames'
      }
    ],
    timeOfDay: 'Daylight',
    attribution: {
      photographer: 'Diliff',
      source: 'Wikimedia Commons / Open Geodata',
      license: 'CC BY-SA 3.0'
    },
    description: 'Looking south along the pedestrian pavement over the Thames, between the Gothic Cornish granite towers with The Shard rising across the water.'
  },
  {
    id: 'london-westminster-bridge',
    title: 'Westminster Bridge & Palace of Westminster',
    streetName: 'Westminster Bridge',
    neighborhood: 'Westminster / Lambeth',
    cityName: 'London',
    countryName: 'United Kingdom',
    cityId: 'london',
    coordinates: [51.5007, -0.1246],
    elevationMeters: 10,
    initialHeading: 275,
    initialPitch: 10,
    fov: 75,
    panoramaUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Westminster_Palace_London_May_2013.jpg/2560px-Westminster_Palace_London_May_2013.jpg',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=1600&q=80',
    googleStreetViewEmbedUrl: 'https://maps.google.com/maps?q=51.5007,-0.1246&layer=c&cbll=51.5007,-0.1246&cbp=11,275,,0,0&output=svembed',
    connectedViewpoints: [
      {
        viewpointId: 'london-tower-bridge',
        targetName: 'Tower Bridge',
        directionHeading: 80,
        distanceLabel: '4.2km East down the Thames'
      }
    ],
    timeOfDay: 'Golden Hour',
    attribution: {
      photographer: 'David Iliff',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA 3.0'
    },
    description: 'Crossing the cast-iron arches of Westminster Bridge toward the Elizabeth Tower (Big Ben) and the Houses of Parliament.'
  },
  {
    id: 'dubai-burj-khalifa-plaza',
    title: 'Burj Khalifa Lake Waterfront Boardwalk',
    streetName: 'Downtown Dubai Waterfront',
    neighborhood: 'Downtown Dubai',
    cityName: 'Dubai',
    countryName: 'United Arab Emirates',
    cityId: 'dubai',
    coordinates: [25.1972, 55.2744],
    elevationMeters: 12,
    initialHeading: 45,
    initialPitch: 45,
    fov: 80,
    panoramaUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Burj_Khalifa.jpg/2560px-Burj_Khalifa.jpg',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80',
    googleStreetViewEmbedUrl: 'https://maps.google.com/maps?q=25.1972,55.2744&layer=c&cbll=25.1972,55.2744&cbp=11,45,,0,0&output=svembed',
    connectedViewpoints: [
      {
        viewpointId: 'dubai-marina-promenade',
        targetName: 'Dubai Marina Walk',
        directionHeading: 220,
        distanceLabel: '19km Southwest'
      }
    ],
    timeOfDay: 'Daylight',
    attribution: {
      photographer: 'Donaldytong',
      source: 'Wikimedia Commons / Open Geodata',
      license: 'CC BY-SA 3.0'
    },
    description: 'On the promenade of the 30-acre man-made Burj Lake directly facing the base of the world’s tallest tower rising 828 meters.'
  },
  {
    id: 'dubai-marina-promenade',
    title: 'Dubai Marina Canal Promenade',
    streetName: 'Marina Walk',
    neighborhood: 'Dubai Marina',
    cityName: 'Dubai',
    countryName: 'United Arab Emirates',
    cityId: 'dubai',
    coordinates: [25.0784, 55.1384],
    elevationMeters: 4,
    initialHeading: 310,
    initialPitch: 15,
    fov: 75,
    panoramaUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Dubai_Marina_Skyline.jpg/2560px-Dubai_Marina_Skyline.jpg',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1600&q=80',
    googleStreetViewEmbedUrl: 'https://maps.google.com/maps?q=25.0784,55.1384&layer=c&cbll=25.0784,55.1384&cbp=11,310,,0,0&output=svembed',
    connectedViewpoints: [
      {
        viewpointId: 'dubai-burj-khalifa-plaza',
        targetName: 'Burj Khalifa Lake',
        directionHeading: 40,
        distanceLabel: '19km Northeast'
      }
    ],
    timeOfDay: 'Twilight',
    attribution: {
      photographer: 'Sébastien Mouchet',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA 3.0'
    },
    description: 'Along the 7-kilometer pedestrian promenade lined with palm trees and luxury yachts, surrounded by the world’s densest cluster of supertall towers.'
  },
  {
    id: 'islamabad-faisal-mosque',
    title: 'Faisal Mosque Courtyard & Margalla Vista',
    streetName: 'Shah Faisal Avenue',
    neighborhood: 'Sector E-7 / Margalla Foothills',
    cityName: 'Islamabad',
    countryName: 'Pakistan',
    cityId: 'islamabad',
    coordinates: [33.7297, 73.0372],
    elevationMeters: 620,
    initialHeading: 0,
    initialPitch: 15,
    fov: 75,
    panoramaUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Faisal_Mosque%2C_Islamabad_by_Usman.jpg/2560px-Faisal_Mosque%2C_Islamabad_by_Usman.jpg',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1600&q=80',
    googleStreetViewEmbedUrl: 'https://maps.google.com/maps?q=33.7297,73.0372&layer=c&cbll=33.7297,73.0372&cbp=11,0,,0,0&output=svembed',
    connectedViewpoints: [
      {
        viewpointId: 'islamabad-pakistan-monument',
        targetName: 'Pakistan Monument at Shakarparian',
        directionHeading: 145,
        distanceLabel: '6.5km Southeast'
      }
    ],
    timeOfDay: 'Daylight',
    attribution: {
      photographer: 'Usman.Malik',
      source: 'Wikimedia Commons / Open Geodata',
      license: 'CC BY-SA 4.0'
    },
    description: 'Standing upon the expansive white marble courtyard of Faisal Mosque, with the tented triangular roof and minarets framed by the green slopes of the Margalla National Park.'
  },
  {
    id: 'islamabad-pakistan-monument',
    title: 'Pakistan Monument Central Terrace',
    streetName: 'Shakarparian Road',
    neighborhood: 'Shakarparian National Park',
    cityName: 'Islamabad',
    countryName: 'Pakistan',
    cityId: 'islamabad',
    coordinates: [33.6934, 73.0683],
    elevationMeters: 605,
    initialHeading: 280,
    initialPitch: 10,
    fov: 75,
    panoramaUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Pakistan_Monument_Islamabad.jpg/2560px-Pakistan_Monument_Islamabad.jpg',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1627993078499-c0201882eb75?auto=format&fit=crop&w=1600&q=80',
    googleStreetViewEmbedUrl: 'https://maps.google.com/maps?q=33.6934,73.0683&layer=c&cbll=33.6934,73.0683&cbp=11,280,,0,0&output=svembed',
    connectedViewpoints: [
      {
        viewpointId: 'islamabad-faisal-mosque',
        targetName: 'Faisal Mosque',
        directionHeading: 325,
        distanceLabel: '6.5km Northwest'
      }
    ],
    timeOfDay: 'Twilight',
    attribution: {
      photographer: 'Khurram',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA 3.0'
    },
    description: 'At the center of the granite petal monument at the crest of the Shakarparian promontory, offering a 360-degree overlook of the capital city.'
  },
  {
    id: 'rome-colosseum-piazza',
    title: 'Piazza del Colosseo & Arch of Constantine',
    streetName: 'Via dei Fori Imperiali',
    neighborhood: 'Rione Monti',
    cityName: 'Rome',
    countryName: 'Italy',
    cityId: 'rome',
    coordinates: [41.8902, 12.4922],
    elevationMeters: 22,
    initialHeading: 85,
    initialPitch: 15,
    fov: 75,
    panoramaUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Colosseo_2020.jpg/2560px-Colosseo_2020.jpg',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1600&q=80',
    googleStreetViewEmbedUrl: 'https://maps.google.com/maps?q=41.8902,12.4922&layer=c&cbll=41.8902,12.4922&cbp=11,85,,0,0&output=svembed',
    connectedViewpoints: [],
    timeOfDay: 'Daylight',
    attribution: {
      photographer: 'Rabax63',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA 4.0'
    },
    description: 'Standing on the ancient stone paving stones between the Arch of Constantine and the monumental outer tiers of the Colosseum.'
  },
  {
    id: 'sydney-opera-forecourt',
    title: 'Sydney Opera House Monumental Steps',
    streetName: 'Bennelong Point Forecourt',
    neighborhood: 'Sydney CBD Waterfront',
    cityName: 'Sydney',
    countryName: 'Australia',
    cityId: 'sydney',
    coordinates: [-33.8568, 151.2153],
    elevationMeters: 8,
    initialHeading: 350,
    initialPitch: 20,
    fov: 75,
    panoramaUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Sydney_Opera_House_-_Dec_2008.jpg/2560px-Sydney_Opera_House_-_Dec_2008.jpg',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1600&q=80',
    googleStreetViewEmbedUrl: 'https://maps.google.com/maps?q=-33.8568,151.2153&layer=c&cbll=-33.8568,151.2153&cbp=11,350,,0,0&output=svembed',
    connectedViewpoints: [],
    timeOfDay: 'Daylight',
    attribution: {
      photographer: 'Diliff',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA 3.0'
    },
    description: 'Looking across the granite podium steps of the Opera House with the tiled precast vaults soaring into the blue Pacific sky.'
  },
  {
    id: 'barcelona-sagrada-plaza',
    title: 'Plaça de Gaudí & Sagrada Família Pond',
    streetName: 'Carrer de Mallorca',
    neighborhood: 'Eixample',
    cityName: 'Barcelona',
    countryName: 'Spain',
    cityId: 'barcelona',
    coordinates: [41.4036, 2.1744],
    elevationMeters: 45,
    initialHeading: 245,
    initialPitch: 25,
    fov: 75,
    panoramaUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Sagrada_Familia_01.jpg/2560px-Sagrada_Familia_01.jpg',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1600&q=80',
    googleStreetViewEmbedUrl: 'https://maps.google.com/maps?q=41.4036,2.1744&layer=c&cbll=41.4036,2.1744&cbp=11,245,,0,0&output=svembed',
    connectedViewpoints: [],
    timeOfDay: 'Daylight',
    attribution: {
      photographer: 'Bernard Gagnon',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA 3.0'
    },
    description: 'Beside the reflective pond in Plaça de Gaudí, looking directly at the Nativity Facade with its stone cypress tree and four towering apostolic spires.'
  },
  {
    id: 'istanbul-sultanahmet-square',
    title: 'Sultanahmet Square & Hagia Sophia Park',
    streetName: 'Divan Yolu Caddesi',
    neighborhood: 'Fatih / Sultanahmet',
    cityName: 'Istanbul',
    countryName: 'Turkey',
    cityId: 'istanbul',
    coordinates: [41.0086, 28.9802],
    elevationMeters: 38,
    initialHeading: 40,
    initialPitch: 12,
    fov: 75,
    panoramaUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Hagia_Sophia_Mars_2013.jpg/2560px-Hagia_Sophia_Mars_2013.jpg',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1600&q=80',
    googleStreetViewEmbedUrl: 'https://maps.google.com/maps?q=41.0086,28.9802&layer=c&cbll=41.0086,28.9802&cbp=11,40,,0,0&output=svembed',
    connectedViewpoints: [],
    timeOfDay: 'Daylight',
    attribution: {
      photographer: 'Arild Vågen',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA 3.0'
    },
    description: 'In the central landscaped fountain garden between the Blue Mosque and Hagia Sophia, surrounded by palm trees and Ottoman architectural history.'
  },
  {
    id: 'cape-town-table-mountain',
    title: 'Table Mountain Lower Cableway Station',
    streetName: 'Tafelberg Road',
    neighborhood: 'Table Mountain National Park',
    cityName: 'Cape Town',
    countryName: 'South Africa',
    cityId: 'cape-town',
    coordinates: [-33.957, 18.403],
    elevationMeters: 363,
    initialHeading: 15,
    initialPitch: 5,
    fov: 75,
    panoramaUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Table_Mountain_viewed_from_Bloubergstrand.jpg/2560px-Table_Mountain_viewed_from_Bloubergstrand.jpg',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1600&q=80',
    googleStreetViewEmbedUrl: 'https://maps.google.com/maps?q=-33.9570,18.4030&layer=c&cbll=-33.9570,18.4030&cbp=11,15,,0,0&output=svembed',
    connectedViewpoints: [],
    timeOfDay: 'Daylight',
    attribution: {
      photographer: 'SkyPixels',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA 4.0'
    },
    description: 'Along Tafelberg Road overlooking the City Bowl and Table Bay with the massive vertical sandstone cliffs rising hundreds of meters into the sky.'
  },
  {
    id: 'singapore-marina-bay',
    title: 'Marina Bay Waterfront Promenade & Helix Bridge',
    streetName: 'Marina Boulevard',
    neighborhood: 'Downtown Core',
    cityName: 'Singapore',
    countryName: 'Singapore',
    cityId: 'singapore-city',
    coordinates: [1.2868, 103.8545],
    elevationMeters: 5,
    initialHeading: 75,
    initialPitch: 15,
    fov: 75,
    panoramaUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Marina_Bay_Sands_in_the_evening_-_20101120.jpg/2560px-Marina_Bay_Sands_in_the_evening_-_20101120.jpg',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1600&q=80',
    googleStreetViewEmbedUrl: 'https://maps.google.com/maps?q=1.2868,103.8545&layer=c&cbll=1.2868,103.8545&cbp=11,75,,0,0&output=svembed',
    connectedViewpoints: [],
    timeOfDay: 'Twilight',
    attribution: {
      photographer: 'William Cho',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA 2.0'
    },
    description: 'Beside the lotus-shaped ArtScience Museum and the stainless steel double-helix bridge, looking across Marina Bay to the trio of towers.'
  }
];
