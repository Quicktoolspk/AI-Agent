import React, { useState } from 'react';
import { City, PageView } from '../../types';
import { CITIES, LANDMARKS, STREET_VIEWPOINTS } from '../../data/destinations';
import {
  MapPin,
  Compass,
  ArrowRight,
  Globe,
  Clock,
  Sun,
  Users,
  Navigation,
  ExternalLink,
  ChevronLeft,
  X,
  Camera
} from 'lucide-react';

interface DestinationDetailsPageProps {
  cityId: string;
  onSelectCity: (cityId: string) => void;
  onSelectStreetViewpoint: (viewpointId: string) => void;
  onNavigate: (page: PageView) => void;
}

export const DestinationDetailsPage: React.FC<DestinationDetailsPageProps> = ({
  cityId,
  onSelectCity,
  onSelectStreetViewpoint,
  onNavigate
}) => {
  const city: City =
    CITIES.find((c) => c.id === cityId) || CITIES[0];

  const cityLandmarks = LANDMARKS.filter((l) => l.cityId === city.id);
  const cityStreetViewpoints = STREET_VIEWPOINTS.filter((vp) => vp.cityId === city.id);

  const [activePhotoModal, setActivePhotoModal] = useState<{
    url: string;
    title: string;
    caption: string;
    photographer: string;
    source: string;
  } | null>(null);

  return (
    <div className="w-full bg-[#090a0d] min-h-screen text-neutral-100 pb-20">
      {/* HERO SECTION */}
      <section className="relative h-[65vh] min-h-[460px] w-full overflow-hidden">
        <img
          src={city.heroImage}
          alt={city.name}
          className="w-full h-full object-cover filter brightness-[0.6] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090a0d] via-transparent to-black/60" />

        {/* Top breadcrumb & back action */}
        <div className="absolute top-6 left-4 sm:left-8 z-10">
          <button
            onClick={() => onNavigate('explore')}
            className="px-3.5 py-1.5 bg-neutral-950/80 hover:bg-neutral-900 border border-neutral-700/80 rounded-lg text-xs font-medium text-neutral-200 hover:text-white backdrop-blur-md flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Explorer</span>
          </button>
        </div>

        {/* Hero Title & Identity */}
        <div className="absolute bottom-8 inset-x-4 sm:inset-x-8 max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-amber-400">
              <span className="text-2xl">{city.countryFlag}</span>
              <span>{city.countryName}</span>
              <span className="text-neutral-500">·</span>
              <span className="text-neutral-300 font-mono text-xs">{city.continent}</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-none">
              {city.name}
            </h1>
            <p className="text-base text-neutral-300 max-w-2xl font-medium">
              {city.tagline}
            </p>
          </div>

          {/* Quick 360 Action */}
          {city.defaultStreetViewpointId && (
            <div className="shrink-0">
              <button
                onClick={() => {
                  onSelectStreetViewpoint(city.defaultStreetViewpointId!);
                  onNavigate('street-explorer');
                }}
                className="px-5 py-3.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs rounded-xl shadow-xl flex items-center gap-2 cursor-pointer transition-transform active:scale-95"
              >
                <Compass className="w-4 h-4" />
                <span>Launch 360° Street View</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* MAIN CONTENT BODY */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-14">
        {/* GEOGRAPHIC & DEMOGRAPHIC METRICS BAR */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-[#0e1118] border border-neutral-800 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-400">
              <Navigation className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-neutral-500 font-mono uppercase block">Coordinates</span>
              <span className="text-xs font-semibold text-white font-mono tabular-nums">
                {city.coordinates[0].toFixed(4)}°N, {city.coordinates[1].toFixed(4)}°E
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-400">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-neutral-500 font-mono uppercase block">Population</span>
              <span className="text-xs font-semibold text-white font-mono tabular-nums">
                {city.population.split(' ')[0]}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-neutral-500 font-mono uppercase block">Timezone</span>
              <span className="text-xs font-semibold text-white">{city.timezone}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-400">
              <Sun className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-neutral-500 font-mono uppercase block">Best Season</span>
              <span className="text-xs font-semibold text-white truncate max-w-[120px] block">
                {city.bestTimeToVisit.split(' for ')[0]}
              </span>
            </div>
          </div>
        </div>

        {/* OVERVIEW & MAP SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
              Destination Overview
            </span>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              About {city.name}
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {city.description}
            </p>
            <div className="p-4 bg-[#0e1118] border border-neutral-800 rounded-xl space-y-2 text-xs">
              <span className="text-neutral-400 font-semibold block">Climate & Meteorological Context:</span>
              <p className="text-neutral-300">{city.climate}</p>
              <p className="text-neutral-400 pt-1">Recommended Travel Period: {city.bestTimeToVisit}</p>
            </div>
          </div>

          {/* Interactive City Mini-Map */}
          <div className="bg-[#0e1118] border border-neutral-800 rounded-2xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-amber-400" />
                  <span>Cartographic Placement</span>
                </span>
                <span className="text-[11px] font-mono text-neutral-400">OSM Layer</span>
              </div>
              <div className="h-48 w-full rounded-xl overflow-hidden border border-neutral-800 relative">
                <iframe
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${city.coordinates[1] - 0.04}%2C${city.coordinates[0] - 0.03}%2C${city.coordinates[1] + 0.04}%2C${city.coordinates[0] + 0.03}&layer=mapnik&marker=${city.coordinates[0]}%2C${city.coordinates[1]}`}
                  className="w-full h-full border-0 filter contrast-125 brightness-90"
                  title={`${city.name} Map`}
                  loading="lazy"
                />
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-800">
              <button
                onClick={() => onNavigate('map')}
                className="w-full py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-semibold text-neutral-200 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>View in Fullscreen World Map</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* STREET VIEWPOINTS AVAILABLE IN THIS CITY */}
        {cityStreetViewpoints.length > 0 && (
          <section className="space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
                Connected Pavements
              </span>
              <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
                Authentic 360° Street Viewpoints
              </h2>
              <p className="text-xs text-neutral-400 mt-1">
                Click any viewpoint below to immediately open the full 360-degree interactive camera.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cityStreetViewpoints.map((vp) => (
                <div
                  key={vp.id}
                  className="bg-[#0e1118] border border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-700 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-44 w-full">
                      <img
                        src={vp.fallbackImageUrl || vp.panoramaUrl}
                        alt={vp.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0e1118] via-transparent to-transparent" />
                      <div className="absolute top-3 left-3 px-2 py-0.5 bg-neutral-950/80 backdrop-blur-md rounded text-[10px] font-mono text-amber-300">
                        {vp.timeOfDay} Illumination
                      </div>
                    </div>
                    <div className="p-4 space-y-2">
                      <h3 className="text-sm font-bold text-white">{vp.title}</h3>
                      <p className="text-xs text-neutral-400 font-mono">{vp.streetName}</p>
                      <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                        {vp.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <button
                      onClick={() => {
                        onSelectStreetViewpoint(vp.id);
                        onNavigate('street-explorer');
                      }}
                      className="w-full py-2.5 px-3 bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Compass className="w-4 h-4" />
                      <span>Enter 360° Viewpoint</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FAMOUS CITY LANDMARKS */}
        {cityLandmarks.length > 0 && (
          <section className="space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
                Architectural Records
              </span>
              <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
                Monuments & Historic Sites
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cityLandmarks.map((lm) => (
                <div
                  key={lm.id}
                  className="bg-[#0e1118] border border-neutral-800 rounded-2xl p-5 flex flex-col sm:flex-row gap-5 items-start"
                >
                  <img
                    src={lm.imageUrl}
                    alt={lm.name}
                    className="w-full sm:w-40 h-40 object-cover rounded-xl shrink-0"
                    loading="lazy"
                  />
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-amber-400 uppercase">
                        {lm.category}
                      </span>
                      <span className="text-[11px] font-mono text-neutral-400">
                        Built {lm.yearCompleted}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white">{lm.name}</h3>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      {lm.description}
                    </p>
                    <div className="pt-2 flex items-center gap-2">
                      {lm.streetViewpointId ? (
                        <button
                          onClick={() => {
                            onSelectStreetViewpoint(lm.streetViewpointId!);
                            onNavigate('street-explorer');
                          }}
                          className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer"
                        >
                          <Compass className="w-3.5 h-3.5" />
                          <span>360° Street View</span>
                        </button>
                      ) : (
                        <span className="text-[11px] text-neutral-400">
                          {lm.coordinates[0].toFixed(4)}°, {lm.coordinates[1].toFixed(4)}°
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* POPULAR NEIGHBORHOODS */}
        {city.neighborhoods && city.neighborhoods.length > 0 && (
          <section className="space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
                Urban Fabric
              </span>
              <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
                Districts & Walking Quarters
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {city.neighborhoods.map((nh, idx) => (
                <div
                  key={idx}
                  className="bg-[#0e1118] border border-neutral-800 rounded-2xl p-5 space-y-3"
                >
                  <h3 className="text-base font-bold text-white">{nh.name}</h3>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {nh.description}
                  </p>
                  <div className="pt-2 border-t border-neutral-800/80">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase block mb-1.5">
                      Notable Highlights:
                    </span>
                    <ul className="text-xs text-neutral-400 space-y-1 list-disc list-inside">
                      {nh.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* HIGH RESOLUTION AUTHENTIC PHOTO GALLERY */}
        {city.gallery && city.gallery.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
                  Visual Archive
                </span>
                <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
                  Verified Destination Photography
                </h2>
              </div>
              <span className="text-xs font-mono text-neutral-400">
                {city.gallery.length} Licensed Photographs
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {city.gallery.map((photo, index) => (
                <div
                  key={index}
                  onClick={() => setActivePhotoModal(photo)}
                  className="group relative h-64 rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 cursor-pointer"
                >
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-4 inset-x-4 space-y-1">
                    <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                      {photo.title}
                    </h4>
                    <p className="text-[11px] text-neutral-300 line-clamp-1">{photo.caption}</p>
                    <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono pt-1">
                      <span>Photo: {photo.photographer}</span>
                      <span>Source: {photo.source}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* FULL-SIZE PHOTO MODAL */}
      {activePhotoModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-[#0d1017] border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setActivePhotoModal(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-neutral-900/80 hover:bg-neutral-800 text-white rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={activePhotoModal.url}
              alt={activePhotoModal.title}
              className="w-full max-h-[70vh] object-contain bg-black"
            />
            <div className="p-6 bg-[#0e1118] border-t border-neutral-800">
              <h3 className="text-lg font-bold text-white">{activePhotoModal.title}</h3>
              <p className="text-xs text-neutral-300 mt-1">{activePhotoModal.caption}</p>
              <div className="mt-3 text-[11px] font-mono text-neutral-400 flex items-center justify-between">
                <span>Credit: {activePhotoModal.photographer}</span>
                <span>Archive: {activePhotoModal.source}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
