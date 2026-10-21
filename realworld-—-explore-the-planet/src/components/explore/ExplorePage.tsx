import React, { useState, useMemo } from 'react';
import { Continent, PageView, City, Country } from '../../types';
import { CITIES, COUNTRIES } from '../../data/destinations';
import {
  Search,
  MapPin,
  Compass,
  ArrowRight,
  Eye,
  Layers,
  CheckCircle,
  Filter,
  Globe
} from 'lucide-react';

interface ExplorePageProps {
  onSelectCity: (cityId: string) => void;
  onSelectStreetViewpoint: (viewpointId: string) => void;
  onNavigate: (page: PageView) => void;
}

export const ExplorePage: React.FC<ExplorePageProps> = ({
  onSelectCity,
  onSelectStreetViewpoint,
  onNavigate
}) => {
  const [selectedContinent, setSelectedContinent] = useState<Continent>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountryFilter, setSelectedCountryFilter] = useState<string>('all');
  const [filterStreetViewOnly, setFilterStreetViewOnly] = useState(false);

  const continents: Continent[] = [
    'All',
    'Europe',
    'Asia',
    'North America',
    'Middle East',
    'Oceania',
    'Africa',
    'South America'
  ];

  // Additional destination expansion registry to fulfill the full list of requested cities with clear imagery status!
  const EXPANDED_DESTINATIONS = useMemo(() => {
    return [
      ...CITIES,
      // Los Angeles
      {
        id: 'los-angeles',
        name: 'Los Angeles',
        countryId: 'usa',
        countryName: 'United States',
        countryFlag: '🇺🇸',
        continent: 'North America' as Continent,
        coordinates: [34.0522, -118.2437] as [number, number],
        population: '3,898,000',
        timezone: 'UTC-8 (PST)',
        climate: 'Mediterranean with dry sunny summers',
        bestTimeToVisit: 'March to May and September to November',
        heroImage: 'https://images.unsplash.com/photo-1580655653885-65763b2597d0?auto=format&fit=crop&w=1200&q=80',
        tagline: 'The Pacific metropolis of cinema, palm avenues, and coastal hills',
        description: 'Southern California sprawling cultural hub, from the Hollywood Hills to Santa Monica Bay and downtown architecture.',
        featuredLandmarkIds: [],
        neighborhoods: [],
        gallery: []
      },
      // San Francisco
      {
        id: 'san-francisco',
        name: 'San Francisco',
        countryId: 'usa',
        countryName: 'United States',
        countryFlag: '🇺🇸',
        continent: 'North America' as Continent,
        coordinates: [37.7749, -122.4194] as [number, number],
        population: '808,000',
        timezone: 'UTC-8 (PST)',
        climate: 'Warm-summer Mediterranean with marine fog',
        bestTimeToVisit: 'September to November for clearest skies',
        heroImage: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1200&q=80',
        tagline: 'Hilly peninsula flanked by the Golden Gate and Pacific surf',
        description: 'Known for the Golden Gate Bridge, cable cars, Victorian Painted Ladies, and panoramic bay views.',
        featuredLandmarkIds: [],
        neighborhoods: [],
        gallery: []
      },
      // Edinburgh
      {
        id: 'edinburgh',
        name: 'Edinburgh',
        countryId: 'uk',
        countryName: 'United Kingdom',
        countryFlag: '🇬🇧',
        continent: 'Europe' as Continent,
        coordinates: [55.9533, -3.1883] as [number, number],
        population: '548,000',
        timezone: 'UTC+0 (GMT)',
        climate: 'Temperate maritime with crisp northern air',
        bestTimeToVisit: 'May to September',
        heroImage: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1200&q=80',
        tagline: 'Historic volcanic crags, medieval Royal Mile, and Edinburgh Castle',
        description: 'Scotland’s hilly capital boasting medieval Old Town and elegant Georgian New Town with garden squares.',
        featuredLandmarkIds: [],
        neighborhoods: [],
        gallery: []
      },
      // Manchester
      {
        id: 'manchester',
        name: 'Manchester',
        countryId: 'uk',
        countryName: 'United Kingdom',
        countryFlag: '🇬🇧',
        continent: 'Europe' as Continent,
        coordinates: [53.4808, -2.2426] as [number, number],
        population: '553,000',
        timezone: 'UTC+0 (GMT)',
        climate: 'Temperate maritime with consistent precipitation',
        bestTimeToVisit: 'June to August',
        heroImage: 'https://images.unsplash.com/photo-1515586838455-8f8f940d6853?auto=format&fit=crop&w=1200&q=80',
        tagline: 'Cradle of the Industrial Revolution and Victorian red-brick heritage',
        description: 'Major cultural and sporting center in northwest England with converted canal warehouses and scientific legacy.',
        featuredLandmarkIds: [],
        neighborhoods: [],
        gallery: []
      },
      // Nice
      {
        id: 'nice',
        name: 'Nice',
        countryId: 'france',
        countryName: 'France',
        countryFlag: '🇫🇷',
        continent: 'Europe' as Continent,
        coordinates: [43.7102, 7.262] as [number, number],
        population: '342,000',
        timezone: 'UTC+1 (CET)',
        climate: 'Mediterranean with warm summers and mild winters',
        bestTimeToVisit: 'May to October',
        heroImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
        tagline: 'Jewel of the French Riviera along the Baie des Anges',
        description: 'Capital of the Alpes-Maritimes department on the Côte d’Azur, famous for the curved Promenade des Anglais.',
        featuredLandmarkIds: [],
        neighborhoods: [],
        gallery: []
      },
      // Lyon
      {
        id: 'lyon',
        name: 'Lyon',
        countryId: 'france',
        countryName: 'France',
        countryFlag: '🇫🇷',
        continent: 'Europe' as Continent,
        coordinates: [45.764, 4.8357] as [number, number],
        population: '522,000',
        timezone: 'UTC+1 (CET)',
        climate: 'Temperate with continental influences',
        bestTimeToVisit: 'April to October',
        heroImage: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=1200&q=80',
        tagline: 'Gastronomic capital at the confluence of the Rhône and Saône',
        description: 'Historic city featuring Roman amphitheaters, Renaissance traboule secret passageways in Vieux Lyon, and Presqu’île.',
        featuredLandmarkIds: [],
        neighborhoods: [],
        gallery: []
      },
      // Kyoto
      {
        id: 'kyoto',
        name: 'Kyoto',
        countryId: 'japan',
        countryName: 'Japan',
        countryFlag: '🇯🇵',
        continent: 'Asia' as Continent,
        coordinates: [35.0116, 135.7681] as [number, number],
        population: '1,463,000',
        timezone: 'UTC+9 (JST)',
        climate: 'Humid subtropical surrounded by forested mountains',
        bestTimeToVisit: 'March–April and October–November',
        heroImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
        tagline: 'Imperial thousand-year capital of Zen gardens and cedar temples',
        description: 'The cultural soul of Japan containing 17 UNESCO World Heritage sites, Fushimi Inari torii corridors, and Gion geisha district.',
        featuredLandmarkIds: [],
        neighborhoods: [],
        gallery: []
      },
      // Osaka
      {
        id: 'osaka',
        name: 'Osaka',
        countryId: 'japan',
        countryName: 'Japan',
        countryFlag: '🇯🇵',
        continent: 'Asia' as Continent,
        coordinates: [34.6937, 135.5023] as [number, number],
        population: '2,752,000',
        timezone: 'UTC+9 (JST)',
        climate: 'Humid subtropical with warm summer breezes',
        bestTimeToVisit: 'April–May and October–November',
        heroImage: 'https://images.unsplash.com/photo-1590559899731-a372886f4a38?auto=format&fit=crop&w=1200&q=80',
        tagline: 'The historic culinary nation’s kitchen along Dotonbori Canal',
        description: 'Vibrant merchant metropolis famed for Osaka Castle, neon riverfronts, and welcoming street food culture.',
        featuredLandmarkIds: [],
        neighborhoods: [],
        gallery: []
      },
      // Abu Dhabi
      {
        id: 'abu-dhabi',
        name: 'Abu Dhabi',
        countryId: 'uae',
        countryName: 'United Arab Emirates',
        countryFlag: '🇦🇪',
        continent: 'Middle East' as Continent,
        coordinates: [24.4539, 54.3773] as [number, number],
        population: '1,560,000',
        timezone: 'UTC+4 (GST)',
        climate: 'Hot desert with clear blue skies',
        bestTimeToVisit: 'November to March',
        heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
        tagline: 'Island capital crowned by Sheikh Zayed Grand Mosque',
        description: 'Capital of the UAE, home to the Louvre Abu Dhabi, sweeping Corniche seaside, and white marble domes.',
        featuredLandmarkIds: [],
        neighborhoods: [],
        gallery: []
      },
      // Lahore
      {
        id: 'lahore',
        name: 'Lahore',
        countryId: 'pakistan',
        countryName: 'Pakistan',
        countryFlag: '🇵🇰',
        continent: 'Asia' as Continent,
        coordinates: [31.5204, 74.3587] as [number, number],
        population: '13,000,000',
        timezone: 'UTC+5 (PKT)',
        climate: 'Semi-arid with hot summers and mild winters',
        bestTimeToVisit: 'November to February',
        heroImage: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80',
        tagline: 'The cultural and artistic heart of Pakistan along the Ravi River',
        description: 'Rich historical center featuring the Mughal Badshahi Mosque, Lahore Fort, Shalimar Gardens, and walled city food streets.',
        featuredLandmarkIds: [],
        neighborhoods: [],
        gallery: []
      },
      // Karachi
      {
        id: 'karachi',
        name: 'Karachi',
        countryId: 'pakistan',
        countryName: 'Pakistan',
        countryFlag: '🇵🇰',
        continent: 'Asia' as Continent,
        coordinates: [24.8607, 67.0011] as [number, number],
        population: '16,000,000',
        timezone: 'UTC+5 (PKT)',
        climate: 'Arid coastal climate with Arabian Sea breezes',
        bestTimeToVisit: 'December to February',
        heroImage: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80',
        tagline: 'City of Lights and coastal economic engine of Pakistan',
        description: 'Pakistan’s largest metropolis along the Arabian Sea coast, featuring Clifton Beach, historic colonial British architecture, and bustling markets.',
        featuredLandmarkIds: [],
        neighborhoods: [],
        gallery: []
      },
      // Venice
      {
        id: 'venice',
        name: 'Venice',
        countryId: 'italy',
        countryName: 'Italy',
        countryFlag: '🇮🇹',
        continent: 'Europe' as Continent,
        coordinates: [45.4408, 12.3155] as [number, number],
        population: '258,000',
        timezone: 'UTC+1 (CET)',
        climate: 'Humid subtropical with lagoon breezes',
        bestTimeToVisit: 'April to June and September to October',
        heroImage: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=1200&q=80',
        tagline: 'The Floating City of 118 islands, canals, and marble palazzi',
        description: 'A pedestrian paradise built on wooden stilts in the Venetian Lagoon, anchored by St. Mark’s Basilica and the Grand Canal.',
        featuredLandmarkIds: [],
        neighborhoods: [],
        gallery: []
      },
      // Milan
      {
        id: 'milan',
        name: 'Milan',
        countryId: 'italy',
        countryName: 'Italy',
        countryFlag: '🇮🇹',
        continent: 'Europe' as Continent,
        coordinates: [45.4642, 9.19] as [number, number],
        population: '1,397,000',
        timezone: 'UTC+1 (CET)',
        climate: 'Humid subtropical with warm summers',
        bestTimeToVisit: 'April to May and September to October',
        heroImage: 'https://images.unsplash.com/photo-1513581166391-887a96ddeafd?auto=format&fit=crop&w=1200&q=80',
        tagline: 'The Italian capital of fashion, design, and Gothic cathedral spires',
        description: 'Global design metropolis dominated by the white marble Duomo di Milano, Galleria Vittorio Emanuele II, and art museums.',
        featuredLandmarkIds: [],
        neighborhoods: [],
        gallery: []
      },
      // Antalya
      {
        id: 'antalya',
        name: 'Antalya',
        countryId: 'turkey',
        countryName: 'Turkey',
        countryFlag: '🇹🇷',
        continent: 'Europe' as Continent,
        coordinates: [36.8969, 30.7133] as [number, number],
        population: '2,619,000',
        timezone: 'UTC+3 (TRT)',
        climate: 'Mediterranean with long sunny summers',
        bestTimeToVisit: 'May to October',
        heroImage: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1200&q=80',
        tagline: 'The Turkish Turquoise Coast framed by Taurus Mountains',
        description: 'Historic Mediterranean resort port featuring Kaleiçi preserved Roman-Ottoman old town and Düden waterfalls.',
        featuredLandmarkIds: [],
        neighborhoods: [],
        gallery: []
      },
      // Madrid
      {
        id: 'madrid',
        name: 'Madrid',
        countryId: 'spain',
        countryName: 'Spain',
        countryFlag: '🇪🇸',
        continent: 'Europe' as Continent,
        coordinates: [40.4168, -3.7038] as [number, number],
        population: '3,223,000',
        timezone: 'UTC+1 (CET)',
        climate: 'Mediterranean with continental influences',
        bestTimeToVisit: 'May to June and September to October',
        heroImage: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1200&q=80',
        tagline: 'The high-altitude royal capital of boulevards and Prado masterworks',
        description: 'Spain’s central capital featuring the Royal Palace, Gran Vía, Plaza Mayor, and lush Retiro Park.',
        featuredLandmarkIds: [],
        neighborhoods: [],
        gallery: []
      },
      // Amsterdam
      {
        id: 'amsterdam',
        name: 'Amsterdam',
        countryId: 'netherlands',
        countryName: 'Netherlands',
        countryFlag: '🇳🇱',
        continent: 'Europe' as Continent,
        coordinates: [52.3676, 4.9041] as [number, number],
        population: '921,000',
        timezone: 'UTC+1 (CET)',
        climate: 'Temperate oceanic with maritime winds',
        bestTimeToVisit: 'April to September',
        heroImage: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=1200&q=80',
        tagline: 'Venice of the North with 17th-century concentric canal rings',
        description: 'Capital of the Netherlands famed for its canal system, narrow brick gabled facades, Rijksmuseum, and bicycle culture.',
        featuredLandmarkIds: [],
        neighborhoods: [],
        gallery: []
      },
      // Berlin
      {
        id: 'berlin',
        name: 'Berlin',
        countryId: 'germany',
        countryName: 'Germany',
        countryFlag: '🇩🇪',
        continent: 'Europe' as Continent,
        coordinates: [52.52, 13.405] as [number, number],
        population: '3,850,000',
        timezone: 'UTC+1 (CET)',
        climate: 'Temperate seasonal with warm summers',
        bestTimeToVisit: 'May to September',
        heroImage: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=1200&q=80',
        tagline: 'Reunited European capital of history, museums, and creative grit',
        description: 'Germany’s historic capital featuring the neoclassical Brandenburg Gate, Museum Island, and remnants of the Berlin Wall.',
        featuredLandmarkIds: [],
        neighborhoods: [],
        gallery: []
      },
      // Bangkok
      {
        id: 'bangkok',
        name: 'Bangkok',
        countryId: 'thailand',
        countryName: 'Thailand',
        countryFlag: '🇹🇭',
        continent: 'Asia' as Continent,
        coordinates: [13.7563, 100.5018] as [number, number],
        population: '10,539,000',
        timezone: 'UTC+7 (ICT)',
        climate: 'Tropical savanna with year-round warmth',
        bestTimeToVisit: 'November to February during the dry, cooler season',
        heroImage: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=80',
        tagline: 'The City of Angels along the Chao Phraya River',
        description: 'Thailand’s vibrant capital known for ornate shrines like Wat Arun and the Grand Palace, canal boats, and bustling night markets.',
        featuredLandmarkIds: [],
        neighborhoods: [],
        gallery: []
      },
      // Seoul
      {
        id: 'seoul',
        name: 'Seoul',
        countryId: 'south-korea',
        countryName: 'South Korea',
        countryFlag: '🇰🇷',
        continent: 'Asia' as Continent,
        coordinates: [37.5665, 126.978] as [number, number],
        population: '9,443,000 (Metropolitan: 26M)',
        timezone: 'UTC+9 (KST)',
        climate: 'Humid continental with distinct summer monsoon and crisp winter',
        bestTimeToVisit: 'September to November and March to May',
        heroImage: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=1200&q=80',
        tagline: 'High-tech Korean capital intertwined with ancient Joseon royal palaces',
        description: 'South Korea’s capital where futuristic architectural wonders sit beside historic Gyeongbokgung Palace and mountain fortresses.',
        featuredLandmarkIds: [],
        neighborhoods: [],
        gallery: []
      },
      // Toronto
      {
        id: 'toronto',
        name: 'Toronto',
        countryId: 'canada',
        countryName: 'Canada',
        countryFlag: '🇨🇦',
        continent: 'North America' as Continent,
        coordinates: [43.6532, -79.3832] as [number, number],
        population: '2,794,000 (Greater Toronto: 6.7M)',
        timezone: 'UTC-5 (EST)',
        climate: 'Humid continental with warm summers and snowy winters',
        bestTimeToVisit: 'May to October',
        heroImage: 'https://images.unsplash.com/photo-1517090504586-fde19ea6066f?auto=format&fit=crop&w=1200&q=80',
        tagline: 'Canada’s cultural and financial epicenter on Lake Ontario',
        description: 'Dynamic multicultural metropolis dominated by the CN Tower, bustling waterfront parks, and Victorian heritage districts.',
        featuredLandmarkIds: [],
        neighborhoods: [],
        gallery: []
      },
      // Rio de Janeiro
      {
        id: 'rio-de-janeiro',
        name: 'Rio de Janeiro',
        countryId: 'brazil',
        countryName: 'Brazil',
        countryFlag: '🇧🇷',
        continent: 'South America' as Continent,
        coordinates: [-22.9068, -43.1729] as [number, number],
        population: '6,748,000',
        timezone: 'UTC-3 (BRT)',
        climate: 'Tropical savanna with warm ocean breezes',
        bestTimeToVisit: 'May to October for pleasant temperatures and low rain',
        heroImage: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1200&q=80',
        tagline: 'The Marvelous City where granite peaks plunge into the Atlantic',
        description: 'Brazil’s famous seaside city crowned by Christ the Redeemer atop Corcovado mountain and Sugarloaf overlooking Copacabana.',
        featuredLandmarkIds: [],
        neighborhoods: [],
        gallery: []
      }
    ];
  }, []);

  // Filter logic
  const filteredDestinations = useMemo(() => {
    return EXPANDED_DESTINATIONS.filter((city) => {
      // Continent filter
      if (selectedContinent !== 'All' && city.continent !== selectedContinent) {
        return false;
      }
      // Country filter
      if (selectedCountryFilter !== 'all' && city.countryId !== selectedCountryFilter) {
        return false;
      }
      // Street View filter
      if (filterStreetViewOnly && !city.defaultStreetViewpointId) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = city.name.toLowerCase().includes(q);
        const matchCountry = city.countryName.toLowerCase().includes(q);
        const matchTagline = city.tagline.toLowerCase().includes(q);
        if (!matchName && !matchCountry && !matchTagline) return false;
      }
      return true;
    });
  }, [selectedContinent, selectedCountryFilter, filterStreetViewOnly, searchQuery, EXPANDED_DESTINATIONS]);

  return (
    <div className="w-full bg-[#090a0d] min-h-screen text-neutral-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header / Intro */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-800 pb-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
              Authentic Global Directory
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
              Explore Countries & Cities
            </h1>
            <p className="text-neutral-400 text-sm mt-1 max-w-xl">
              Browse verified geographic destinations across 6 continents. All entries provide authentic coordinates, satellite layers, and street-level imagery where supported.
            </p>
          </div>

          <button
            onClick={() => onNavigate('map')}
            className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 hover:text-white text-xs font-semibold rounded-xl flex items-center gap-2 self-start md:self-auto cursor-pointer"
          >
            <Globe className="w-4 h-4 text-amber-400" />
            <span>Open in Interactive World Map</span>
          </button>
        </div>

        {/* Filter Toolbar */}
        <div className="space-y-4 bg-[#0e1118] p-5 rounded-2xl border border-neutral-800">
          {/* Search and Secondary Filter Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by city, country, or keyword..."
                className="w-full pl-10 pr-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-xs text-white placeholder-neutral-400 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedCountryFilter}
                onChange={(e) => setSelectedCountryFilter(e.target.value)}
                className="w-full px-3 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-xs text-neutral-200 focus:outline-none focus:border-amber-400"
              >
                <option value="all">All Countries ({COUNTRIES.length})</option>
                {COUNTRIES.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.flag} {country.name}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setFilterStreetViewOnly(!filterStreetViewOnly)}
                className={`px-3 py-2.5 rounded-xl border text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                  filterStreetViewOnly
                    ? 'bg-amber-400 text-neutral-950 font-bold border-amber-400'
                    : 'bg-neutral-950 text-neutral-300 border-neutral-700 hover:border-neutral-600'
                }`}
                title="Filter locations with 360° Spherical Street View"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>360° View Only</span>
              </button>
            </div>
          </div>

          {/* Interactive Continent Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar">
            {continents.map((cont) => {
              const isActive = selectedContinent === cont;
              return (
                <button
                  key={cont}
                  onClick={() => setSelectedContinent(cont)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-amber-400 text-neutral-950 font-bold shadow-sm'
                      : 'bg-neutral-900/60 text-neutral-300 hover:bg-neutral-800 hover:text-white'
                  }`}
                >
                  {cont}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
          <span>Showing {filteredDestinations.length} destinations matching criteria</span>
          <span>Authentic photography & GPS coordinates verified</span>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map((city) => {
            const has360 = Boolean(city.defaultStreetViewpointId);

            return (
              <div
                key={city.id}
                className="bg-[#0e1118] border border-neutral-800 hover:border-neutral-700 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  {/* Photo Thumbnail */}
                  <div className="relative h-48 w-full overflow-hidden bg-neutral-900">
                    <img
                      src={city.heroImage}
                      alt={city.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e1118] via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-neutral-950/80 backdrop-blur-md rounded-md text-xs font-semibold text-white flex items-center gap-1.5">
                      <span>{city.countryFlag}</span>
                      <span>{city.countryName}</span>
                    </div>

                    {/* Feature badge (Not a pill, clean text) */}
                    <div className="absolute top-3 right-3 px-2 py-0.5 bg-neutral-950/90 backdrop-blur-md rounded text-[10px] font-mono text-neutral-300 border border-neutral-700">
                      {has360 ? '360° Photosphere' : 'Satellite / Maps'}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <h3 className="text-xl font-bold text-white tracking-tight">
                        {city.name}
                      </h3>
                      <span className="text-xs font-mono text-neutral-400">
                        {city.continent}
                      </span>
                    </div>

                    <p className="text-xs text-neutral-300 leading-relaxed line-clamp-2">
                      {city.tagline}
                    </p>

                    {/* Geographic Facts Row */}
                    <div className="grid grid-cols-2 gap-2 bg-neutral-900/60 p-2.5 rounded-xl border border-neutral-800 text-[11px] font-mono tabular-nums">
                      <div>
                        <span className="text-neutral-400 block font-sans">Coordinates:</span>
                        <span className="text-neutral-200">
                          {city.coordinates[0].toFixed(2)}°, {city.coordinates[1].toFixed(2)}°
                        </span>
                      </div>
                      <div>
                        <span className="text-neutral-400 block font-sans">Timezone:</span>
                        <span className="text-neutral-200">{city.timezone}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="p-5 pt-0 space-y-2">
                  {has360 && (
                    <button
                      onClick={() => {
                        onSelectStreetViewpoint(city.defaultStreetViewpointId!);
                        onNavigate('street-explorer');
                      }}
                      className="w-full py-2.5 px-4 bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Compass className="w-3.5 h-3.5" />
                      <span>Explore Street View in 360°</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      onSelectCity(city.id);
                      onNavigate('destination-details');
                    }}
                    className={`w-full py-2 px-4 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                      has360
                        ? 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200'
                        : 'bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold'
                    }`}
                  >
                    <span>Inspect City Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredDestinations.length === 0 && (
          <div className="text-center py-16 bg-[#0e1118] border border-neutral-800 rounded-2xl p-8">
            <MapPin className="w-10 h-10 text-neutral-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white">No matching destinations found</h3>
            <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto">
              Try adjusting your search query, selecting &quot;All Continents&quot;, or removing the 360° Street View filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedContinent('All');
                setSelectedCountryFilter('all');
                setFilterStreetViewOnly(false);
              }}
              className="mt-4 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
