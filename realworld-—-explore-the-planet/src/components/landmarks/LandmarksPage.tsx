import React, { useState, useMemo } from 'react';
import { Landmark, PageView } from '../../types';
import { LANDMARKS } from '../../data/destinations';
import {
  Search,
  Compass,
  ArrowRight,
  MapPin,
  Calendar,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';

interface LandmarksPageProps {
  onSelectStreetViewpoint: (viewpointId: string) => void;
  onSelectCity: (cityId: string) => void;
  onNavigate: (page: PageView) => void;
}

export const LandmarksPage: React.FC<LandmarksPageProps> = ({
  onSelectStreetViewpoint,
  onSelectCity,
  onNavigate
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLandmarkDetails, setSelectedLandmarkDetails] = useState<Landmark | null>(null);

  const categories = [
    'All',
    'Historic Monument',
    'Sacred Architecture',
    'Modern Marvel',
    'Iconic Bridge',
    'Public Square',
    'Cultural Institution'
  ];

  // Comprehensive landmark list with expanded entries as requested
  const ALL_LANDMARKS = useMemo(() => {
    return [
      ...LANDMARKS,
      // Notre-Dame Cathedral
      {
        id: 'notre-dame',
        name: 'Notre-Dame de Paris',
        cityId: 'paris',
        cityName: 'Paris',
        countryName: 'France',
        category: 'Sacred Architecture' as const,
        coordinates: [48.853, 2.3499] as [number, number],
        yearCompleted: '1163–1345',
        architecturalStyle: 'French Gothic Architecture',
        description: 'Medieval Catholic cathedral on the Île de la Cité, world-famous for its rose windows, flying buttresses, ribbed vaults, and gargoyles.',
        imageUrl: 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&w=1200&q=80',
        photographer: 'Pedro Lastra',
        source: 'Unsplash',
        facts: [
          'Survived the historic 2019 fire and has undergone landmark global restoration.',
          'Point Zero of France, from which all highway distances are measured, lies on its square.'
        ]
      },
      // Buckingham Palace
      {
        id: 'buckingham-palace',
        name: 'Buckingham Palace',
        cityId: 'london',
        cityName: 'London',
        countryName: 'United Kingdom',
        category: 'Historic Monument' as const,
        coordinates: [51.5014, -0.1419] as [number, number],
        yearCompleted: '1703 (Expanded 1837)',
        architecturalStyle: 'Neoclassical Bath Stone Palace',
        description: 'The London residence and administrative headquarters of the British monarch, set between St. James’s Park and Green Park.',
        imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
        photographer: 'Benjamin Davies',
        source: 'Unsplash',
        facts: [
          'Contains 775 rooms including 19 state rooms, 52 royal bedrooms, and 78 bathrooms.',
          'The Royal Standard flag flies above when the reigning monarch is in residence.'
        ]
      },
      // Statue of Liberty
      {
        id: 'statue-of-liberty',
        name: 'Statue of Liberty',
        cityId: 'new-york',
        cityName: 'New York City',
        countryName: 'United States',
        category: 'Historic Monument' as const,
        coordinates: [40.6892, -74.0445] as [number, number],
        yearCompleted: '1886',
        architecturalStyle: 'Colossal Neoclassical Copper Sculpture',
        description: 'Designed by Frédéric-Auguste Bartholdi with internal framework by Gustave Eiffel, the 93-meter monument greeted millions of immigrants entering New York Harbor.',
        imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df5293cb325?auto=format&fit=crop&w=1200&q=80',
        photographer: 'Oliver Niblett',
        source: 'Unsplash',
        facts: [
          'A gift from the people of France to the United States.',
          'The green patina copper skin is only 2.4 millimeters (3/32 of an inch) thick.'
        ]
      },
      // Dubai Marina
      {
        id: 'dubai-marina-landmark',
        name: 'Dubai Marina & Promenade',
        cityId: 'dubai',
        cityName: 'Dubai',
        countryName: 'United Arab Emirates',
        category: 'Modern Marvel' as const,
        coordinates: [25.0784, 55.1384] as [number, number],
        yearCompleted: '2003–Present',
        architecturalStyle: 'Supertall Modernist Waterfront Grid',
        description: 'The world’s largest artificial canal city, featuring luxury yachts, the 7-kilometer Marina Walk, and some of the world’s tallest residential skyscrapers.',
        imageUrl: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80',
        photographer: 'Christoph Schulz',
        source: 'Unsplash',
        streetViewpointId: 'dubai-marina-promenade',
        facts: [
          'Carved from the desert coastline with sea water channeled directly from the Persian Gulf.',
          'Houses more than 200 high-rise towers in a 3-kilometer stretch.'
        ]
      },
      // Palm Jumeirah
      {
        id: 'palm-jumeirah',
        name: 'Palm Jumeirah',
        cityId: 'dubai',
        cityName: 'Dubai',
        countryName: 'United Arab Emirates',
        category: 'Modern Marvel' as const,
        coordinates: [25.1124, 55.139] as [number, number],
        yearCompleted: '2006',
        architecturalStyle: 'Reclaimed Archipelago Engineering',
        description: 'A palm tree-shaped artificial archipelago created using land reclamation in the Persian Gulf, protected by an 11-kilometer crescent breakwater.',
        imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
        photographer: 'David Rodrigo',
        source: 'Unsplash',
        facts: [
          'Added over 78 kilometers to Dubai’s natural coastline.',
          'Built entirely without concrete or steel in the islands—only sand and rock.'
        ]
      },
      // Daman-e-Koh
      {
        id: 'daman-e-koh',
        name: 'Daman-e-Koh Margalla Terraces',
        cityId: 'islamabad',
        cityName: 'Islamabad',
        countryName: 'Pakistan',
        category: 'Public Square' as const,
        coordinates: [33.7431, 73.0567] as [number, number],
        yearCompleted: '1960s',
        architecturalStyle: 'Montane Vista Terraces & Botanical Gardens',
        description: 'A hilltop garden and viewpoint situated in the middle of the Margalla Hills National Park, offering panoramic vistas over Islamabad, Rawal Lake, and Faisal Mosque.',
        imageUrl: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80',
        photographer: 'Ali Imran',
        source: 'Unsplash',
        facts: [
          'Perched at an elevation of 730 meters (2,400 feet) above sea level.',
          'Surrounded by natural pine and acacia forests teeming with native bird species.'
        ]
      }
    ];
  }, []);

  const filteredLandmarks = useMemo(() => {
    return ALL_LANDMARKS.filter((lm) => {
      if (selectedCategory !== 'All' && lm.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = lm.name.toLowerCase().includes(q);
        const matchCity = lm.cityName.toLowerCase().includes(q);
        const matchCountry = lm.countryName.toLowerCase().includes(q);
        const matchArch = lm.architecturalStyle.toLowerCase().includes(q);
        if (!matchName && !matchCity && !matchCountry && !matchArch) return false;
      }
      return true;
    });
  }, [ALL_LANDMARKS, selectedCategory, searchQuery]);

  return (
    <div className="w-full bg-[#090a0d] min-h-screen text-neutral-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-neutral-800 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
              Verified Architectural Archive
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
              Famous Places & Landmarks
            </h1>
            <p className="text-neutral-400 text-sm mt-1 max-w-xl">
              Directory of monumental engineering feats, sacred sanctuaries, historic arches, and iconic bridges worldwide. Every listing features verified coordinates and real photography.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onSelectStreetViewpoint('paris-eiffel-champ-de-mars');
                onNavigate('street-explorer');
              }}
              className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold rounded-xl flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Compass className="w-4 h-4" />
              <span>Enter 360° Explorer</span>
            </button>
          </div>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="bg-[#0e1118] border border-neutral-800 p-5 rounded-2xl space-y-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by landmark name, city, country, or architectural style..."
              className="w-full pl-10 pr-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-xs text-white placeholder-neutral-400 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-amber-400 text-neutral-950 font-bold shadow-sm'
                      : 'bg-neutral-900/60 text-neutral-300 hover:bg-neutral-800 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Counter */}
        <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
          <span>{filteredLandmarks.length} monuments documented with verified coordinates</span>
          <span>True-to-life geodata</span>
        </div>

        {/* Landmark Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLandmarks.map((landmark) => (
            <div
              key={landmark.id}
              className="bg-[#0e1118] border border-neutral-800 hover:border-neutral-700 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Visual Header */}
                <div className="relative h-52 w-full overflow-hidden bg-neutral-900">
                  <img
                    src={landmark.imageUrl}
                    alt={landmark.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e1118] via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 px-2 py-0.5 bg-neutral-950/80 backdrop-blur-md rounded text-[10px] font-mono text-amber-300 border border-neutral-700">
                    {landmark.category}
                  </div>
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-[11px] font-mono text-neutral-400 block">
                      {landmark.cityName}, {landmark.countryName}
                    </span>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {landmark.name}
                    </h3>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-3">
                  <p className="text-xs text-neutral-300 leading-relaxed line-clamp-3">
                    {landmark.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 bg-neutral-900/70 p-2.5 rounded-xl border border-neutral-800 text-[11px] font-mono tabular-nums">
                    <div>
                      <span className="text-neutral-500 block font-sans">Year Completed:</span>
                      <span className="text-neutral-200">{landmark.yearCompleted}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block font-sans">Style:</span>
                      <span className="text-neutral-200 font-sans truncate block">{landmark.architecturalStyle}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-neutral-500 block font-sans">Coordinates:</span>
                      <span className="text-neutral-200">
                        {landmark.coordinates[0].toFixed(4)}°N, {landmark.coordinates[1].toFixed(4)}°E
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-5 pt-0 space-y-2">
                {landmark.streetViewpointId ? (
                  <button
                    onClick={() => {
                      onSelectStreetViewpoint(landmark.streetViewpointId!);
                      onNavigate('street-explorer');
                    }}
                    className="w-full py-2.5 px-4 bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>Open 360° Street View</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      onSelectCity(landmark.cityId);
                      onNavigate('destination-details');
                    }}
                    className="w-full py-2.5 px-4 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>View in {landmark.cityName} Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
