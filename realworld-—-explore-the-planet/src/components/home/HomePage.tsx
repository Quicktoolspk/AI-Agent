import React, { useState } from 'react';
import { PageView } from '../../types';
import { CITIES, COUNTRIES, LANDMARKS, STREET_VIEWPOINTS } from '../../data/destinations';
import {
  Compass,
  Globe,
  MapPin,
  Search,
  ArrowRight,
  Eye,
  Camera,
  Layers,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageView) => void;
  onSelectCity: (cityId: string) => void;
  onSelectStreetViewpoint: (viewpointId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectCity,
  onSelectStreetViewpoint
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Search results calculation
  const searchResults = searchQuery.trim()
    ? [
        ...CITIES.filter(
          (c) =>
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.countryName.toLowerCase().includes(searchQuery.toLowerCase())
        ).map((c) => ({ type: 'city' as const, id: c.id, name: c.name, sub: c.countryName })),
        ...LANDMARKS.filter(
          (l) =>
            l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            l.cityName.toLowerCase().includes(searchQuery.toLowerCase())
        ).map((l) => ({ type: 'landmark' as const, id: l.id, name: l.name, sub: `${l.cityName}, ${l.countryName}` })),
        ...COUNTRIES.filter((co) =>
          co.name.toLowerCase().includes(searchQuery.toLowerCase())
        ).map((co) => ({ type: 'country' as const, id: co.id, name: co.name, sub: co.continent }))
      ].slice(0, 6)
    : [];

  const handleSelectSearch = (item: { type: 'city' | 'landmark' | 'country'; id: string }) => {
    if (item.type === 'city') {
      onSelectCity(item.id);
      onNavigate('destination-details');
    } else if (item.type === 'landmark') {
      const lm = LANDMARKS.find((l) => l.id === item.id);
      if (lm && lm.streetViewpointId) {
        onSelectStreetViewpoint(lm.streetViewpointId);
        onNavigate('street-explorer');
      } else {
        onNavigate('landmarks');
      }
    } else {
      onNavigate('explore');
    }
    setSearchQuery('');
  };

  // Marquee cities
  const featuredCities = CITIES.slice(0, 8);

  return (
    <div className="w-full bg-[#090a0d] text-neutral-100 min-h-screen">
      {/* HERO SECTION — Cinematic Real Photography & Clean Typography */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-20">
        {/* Authentic Background Photograph */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=2560&q=85"
            alt="Authentic Paris cityscape overlooking Eiffel Tower and the Seine"
            className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.05]"
          />
          {/* Measured Scrim Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#090a0d] via-transparent to-[#090a0d]/70" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#090a0d]/40 to-[#090a0d]" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-900/80 backdrop-blur-md border border-neutral-700/80 rounded-full text-xs text-neutral-300">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span>Ultra-Realistic Digital Window Onto Earth</span>
          </div>

          {/* Prominent Required Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight text-balance leading-none">
            Explore the World Like You&apos;re There.
          </h1>

          {/* Required Subtitle */}
          <p className="text-base sm:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed text-balance">
            Discover real cities, walk through familiar streets, and explore extraordinary places around the planet.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto pt-4">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search any country, city, street, or landmark..."
                className="w-full pl-12 pr-4 py-4 bg-neutral-950/90 backdrop-blur-xl border border-neutral-700 rounded-2xl text-sm sm:text-base text-white placeholder-neutral-400 shadow-2xl focus:outline-none focus:border-amber-400 transition-all"
              />
            </div>

            {/* Autocomplete Dropdown */}
            {searchResults.length > 0 && (
              <div className="absolute left-0 right-0 mt-2 bg-[#0d1017]/95 backdrop-blur-xl border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl z-30 divide-y divide-neutral-800 text-left">
                {searchResults.map((res, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectSearch(res)}
                    className="w-full px-5 py-3 hover:bg-neutral-800/80 transition-colors flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <span className="text-sm font-semibold text-white group-hover:text-amber-400">
                        {res.name}
                      </span>
                      <span className="text-xs text-neutral-400 block">{res.sub}</span>
                    </div>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                      {res.type}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Required Primary & Secondary Action Buttons */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('explore')}
              className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-sm rounded-xl transition-all shadow-lg shadow-amber-500/20 active:scale-[0.98] cursor-pointer flex items-center gap-2"
            >
              <Compass className="w-4 h-4" />
              <span>Explore the World</span>
            </button>
            <button
              onClick={() => onNavigate('map')}
              className="px-6 py-3.5 bg-neutral-900/90 hover:bg-neutral-800/90 text-white font-semibold text-sm rounded-xl border border-neutral-700 backdrop-blur-md transition-all active:scale-[0.98] cursor-pointer flex items-center gap-2"
            >
              <Globe className="w-4 h-4 text-amber-400" />
              <span>Open World Map</span>
            </button>
            <button
              onClick={() => {
                onSelectStreetViewpoint('nyc-times-square');
                onNavigate('street-explorer');
              }}
              className="px-5 py-3.5 bg-neutral-900/50 hover:bg-neutral-800/80 text-neutral-300 hover:text-white font-medium text-sm rounded-xl border border-neutral-800 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Eye className="w-4 h-4 text-amber-400" />
              <span>Times Square 360°</span>
            </button>
          </div>

          {/* Authentic Quick Destinations Badges */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-neutral-400">
            <span className="text-neutral-500">Suggested:</span>
            {['Paris', 'Tokyo', 'New York', 'London', 'Dubai', 'Islamabad', 'Rome', 'Sydney'].map((name) => {
              const city = CITIES.find((c) => c.name.toLowerCase().includes(name.toLowerCase()));
              return (
                <button
                  key={name}
                  onClick={() => {
                    if (city) {
                      onSelectCity(city.id);
                      onNavigate('destination-details');
                    }
                  }}
                  className="px-2.5 py-1 bg-neutral-900/60 hover:bg-neutral-800 border border-neutral-800 rounded-md text-neutral-300 hover:text-white transition-colors cursor-pointer"
                >
                  {name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* THREE CORE DIGITAL WINDOW CAPABILITIES */}
      <section className="py-20 border-t border-neutral-800/80 bg-[#090b0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
              Photorealistic Foundations
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              An Authentic Digital Portal to Real Earth
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              No gaming avatars, cartoon physics, or artificial approximations. Every view is built upon real-world geographic coordinates, spherical photography, and orbital imaging.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1: 360 Spherical Panoramas */}
            <div className="bg-[#0e1118] border border-neutral-800 rounded-2xl p-6 space-y-4 hover:border-neutral-700 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                360° Spherical Street View
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Step onto real avenues and historic plazas. Pan, tilt, zoom, and follow connected viewpoint arrows across continuous real-world street corridors.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    onSelectStreetViewpoint('paris-eiffel-champ-de-mars');
                    onNavigate('street-explorer');
                  }}
                  className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Experience Eiffel Tower 360°</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Feature 2: High-Resolution Satellite & GIS */}
            <div className="bg-[#0e1118] border border-neutral-800 rounded-2xl p-6 space-y-4 hover:border-neutral-700 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Genuine Satellite Imagery
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Switch between high-resolution ESRI World Imagery orbital photography, OpenStreetMap street vectors, and topographic elevation contours.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('map')}
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Launch Interactive Map</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Feature 3: Verified Architecture & Photography */}
            <div className="bg-[#0e1118] border border-neutral-800 rounded-2xl p-6 space-y-4 hover:border-neutral-700 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-purple-400/10 border border-purple-400/20 text-purple-400 flex items-center justify-center">
                <Camera className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Accurate Architecture Directory
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Examine world-famous monuments, historical construction dates, architectural specifications, and exact GPS coordinates with zero fabricated trivia.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('landmarks')}
                  className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Browse Famous Places</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED DESTINATIONS GRID */}
      <section className="py-20 border-t border-neutral-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
                World Cities Directory
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
                Curated Metropolises
              </h2>
              <p className="text-neutral-400 text-sm mt-1">
                Select any city to inspect genuine photography, neighborhoods, and street-level viewpoints.
              </p>
            </div>
            <button
              onClick={() => onNavigate('explore')}
              className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
            >
              <span>View All 18+ Countries & Cities</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCities.map((city) => (
              <div
                key={city.id}
                onClick={() => {
                  onSelectCity(city.id);
                  onNavigate('destination-details');
                }}
                className="group relative bg-[#0e1118] border border-neutral-800 hover:border-neutral-700 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                {/* Photo Thumbnail */}
                <div className="relative h-52 w-full overflow-hidden bg-neutral-900">
                  <img
                    src={city.heroImage}
                    alt={city.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e1118] via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 px-2 py-1 bg-neutral-950/80 backdrop-blur-md rounded-md text-xs font-medium text-white flex items-center gap-1.5">
                    <span>{city.countryFlag}</span>
                    <span>{city.countryName}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                      {city.name}
                    </h3>
                    <span className="text-[11px] font-mono text-neutral-400">
                      {city.continent}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                    {city.tagline}
                  </p>

                  <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between text-xs">
                    <span className="text-neutral-400 font-mono text-[11px]">
                      {city.coordinates[0].toFixed(2)}°, {city.coordinates[1].toFixed(2)}°
                    </span>
                    <span className="text-amber-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAMOUS LANDMARK SPOTLIGHT PREVIEW */}
      <section className="py-20 border-t border-neutral-800/80 bg-[#090b0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
              Architectural Wonders
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Famous Real-World Landmarks
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              From Paris to Islamabad, Dubai to Tokyo. Step straight onto the pavements surrounding Earth&apos;s most celebrated structures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LANDMARKS.slice(0, 6).map((landmark) => (
              <div
                key={landmark.id}
                className="bg-[#0e1118] border border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 w-full">
                    <img
                      src={landmark.imageUrl}
                      alt={landmark.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e1118] via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-neutral-950/80 backdrop-blur-md rounded-md text-[10px] font-mono text-amber-300">
                      {landmark.category}
                    </div>
                  </div>
                  <div className="p-5 space-y-2">
                    <h3 className="text-base font-bold text-white">{landmark.name}</h3>
                    <p className="text-xs text-neutral-400 font-medium">
                      {landmark.cityName}, {landmark.countryName} · Built {landmark.yearCompleted}
                    </p>
                    <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed pt-1">
                      {landmark.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  {landmark.streetViewpointId ? (
                    <button
                      onClick={() => {
                        onSelectStreetViewpoint(landmark.streetViewpointId!);
                        onNavigate('street-explorer');
                      }}
                      className="w-full py-2.5 px-4 bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View in 360° Street Explorer</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => onNavigate('landmarks')}
                      className="w-full py-2.5 px-4 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Examine Architectural Record</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => onNavigate('landmarks')}
              className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              View Full Directory of Famous Places
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
