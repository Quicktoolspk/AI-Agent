import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { CITIES, LANDMARKS, STREET_VIEWPOINTS } from '../../data/destinations';
import { City, Landmark, PageView } from '../../types';
import {
  Layers,
  MapPin,
  Search,
  Globe,
  Compass,
  ArrowRight,
  X,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Navigation
} from 'lucide-react';

interface WorldMapViewProps {
  onSelectCity: (cityId: string) => void;
  onSelectStreetViewpoint: (viewpointId: string) => void;
  onNavigate: (page: PageView) => void;
  initialCenter?: [number, number];
  initialZoom?: number;
}

type MapLayerStyle = 'satellite' | 'streets' | 'dark' | 'topo';

export const WorldMapView: React.FC<WorldMapViewProps> = ({
  onSelectCity,
  onSelectStreetViewpoint,
  onNavigate,
  initialCenter = [25.0, 15.0],
  initialZoom = 3
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const currentTileLayerRef = useRef<L.TileLayer | null>(null);

  const [activeLayer, setActiveLayer] = useState<MapLayerStyle>('satellite');
  const [selectedEntity, setSelectedEntity] = useState<{
    type: 'city' | 'landmark';
    city?: City;
    landmark?: Landmark;
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mouseCoords, setMouseCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [showLayerMenu, setShowLayerMenu] = useState(false);

  // Available legitimate Tile Servers
  const TILE_PROVIDERS: Record<
    MapLayerStyle,
    { url: string; attribution: string; maxZoom: number; name: string }
  > = {
    satellite: {
      name: 'ESRI World Imagery (Satellite)',
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution:
        '&copy; <a href="https://www.esri.com/">Esri</a>, Maxar, Earthstar Geographics, USDA, USGS',
      maxZoom: 18
    },
    streets: {
      name: 'OpenStreetMap Standard (Streets)',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{y}.png',
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    },
    dark: {
      name: 'CartoDB Dark Matter (High Contrast)',
      url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{y}{r}.png',
      attribution:
        '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap contributors',
      maxZoom: 19
    },
    topo: {
      name: 'OpenTopoMap (Topography)',
      url: 'https://{s}.tile.opentopomap.org/{z}/{y}.png',
      attribution:
        '&copy; <a href="https://opentopomap.org">OpenTopoMap</a> &copy; OpenStreetMap contributors',
      maxZoom: 17
    }
  };

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: initialCenter,
      zoom: initialZoom,
      zoomControl: false,
      worldCopyJump: true,
      minZoom: 2,
      maxZoom: 18
    });

    mapInstanceRef.current = map;

    // Base Layer
    const initialProvider = TILE_PROVIDERS[activeLayer];
    const tileLayer = L.tileLayer(initialProvider.url, {
      attribution: initialProvider.attribution,
      maxZoom: initialProvider.maxZoom
    }).addTo(map);

    currentTileLayerRef.current = tileLayer;

    // Track mouse coordinate readout
    map.on('mousemove', (e: L.LeafletMouseEvent) => {
      setMouseCoords({
        lat: Number(e.latlng.lat.toFixed(4)),
        lng: Number(e.latlng.lng.toFixed(4))
      });
    });

    // Custom Icon Creators
    const createCityIcon = (name: string) => {
      return L.divIcon({
        className: 'custom-city-marker',
        html: `
          <div class="group cursor-pointer flex flex-col items-center">
            <div class="w-7 h-7 rounded-full bg-neutral-950/90 border-2 border-amber-400 text-amber-400 shadow-lg shadow-black flex items-center justify-center transform group-hover:scale-125 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <div class="mt-1 px-2 py-0.5 bg-neutral-950/90 backdrop-blur-md border border-neutral-700/80 rounded text-[11px] font-semibold text-white tracking-tight whitespace-nowrap shadow-md pointer-events-none group-hover:border-amber-400">
              ${name}
            </div>
          </div>
        `,
        iconSize: [32, 48],
        iconAnchor: [16, 24]
      });
    };

    const createLandmarkIcon = (name: string) => {
      return L.divIcon({
        className: 'custom-landmark-marker',
        html: `
          <div class="group cursor-pointer flex flex-col items-center">
            <div class="w-6 h-6 rounded-full bg-amber-400 text-neutral-950 shadow-md border-2 border-white flex items-center justify-center transform group-hover:scale-125 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="2" x2="22" y1="22" y2="22"/><line x1="6" x2="6" y1="18"/><line x1="10" x2="10" y1="18"/><line x1="14" x2="14" y1="18"/><line x1="18" x2="18" y1="18"/><polygon points="12 2 20 7 4 7"/></svg>
            </div>
            <div class="mt-0.5 px-1.5 py-0.5 bg-neutral-950/90 border border-neutral-800 rounded text-[10px] text-amber-300 font-medium whitespace-nowrap shadow-md pointer-events-none">
              ${name}
            </div>
          </div>
        `,
        iconSize: [28, 42],
        iconAnchor: [14, 21]
      });
    };

    // Add City Markers
    CITIES.forEach((city) => {
      const marker = L.marker(city.coordinates, {
        icon: createCityIcon(city.name),
        title: city.name
      }).addTo(map);

      marker.on('click', () => {
        setSelectedEntity({ type: 'city', city });
        map.flyTo(city.coordinates, Math.max(map.getZoom(), 8), {
          duration: 1.2
        });
      });
    });

    // Add Famous Landmark Markers
    LANDMARKS.forEach((landmark) => {
      const marker = L.marker(landmark.coordinates, {
        icon: createLandmarkIcon(landmark.name),
        title: landmark.name
      }).addTo(map);

      marker.on('click', () => {
        setSelectedEntity({ type: 'landmark', landmark });
        map.flyTo(landmark.coordinates, Math.max(map.getZoom(), 12), {
          duration: 1.2
        });
      });
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Handle Layer switching
  const handleLayerChange = (layer: MapLayerStyle) => {
    if (!mapInstanceRef.current) return;
    setActiveLayer(layer);
    setShowLayerMenu(false);

    if (currentTileLayerRef.current) {
      mapInstanceRef.current.removeLayer(currentTileLayerRef.current);
    }

    const provider = TILE_PROVIDERS[layer];
    const newLayer = L.tileLayer(provider.url, {
      attribution: provider.attribution,
      maxZoom: provider.maxZoom
    }).addTo(mapInstanceRef.current);

    currentTileLayerRef.current = newLayer;
  };

  // Search filter
  const searchResults = searchQuery.trim()
    ? [
        ...CITIES.filter(
          (c) =>
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.countryName.toLowerCase().includes(searchQuery.toLowerCase())
        ).map((c) => ({ type: 'city' as const, entity: c })),
        ...LANDMARKS.filter(
          (l) =>
            l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            l.cityName.toLowerCase().includes(searchQuery.toLowerCase())
        ).map((l) => ({ type: 'landmark' as const, entity: l }))
      ].slice(0, 8)
    : [];

  const handleSelectSearchResult = (res: { type: 'city' | 'landmark'; entity: City | Landmark }) => {
    if (!mapInstanceRef.current) return;

    if (res.type === 'city') {
      const city = res.entity as City;
      setSelectedEntity({ type: 'city', city });
      mapInstanceRef.current.flyTo(city.coordinates, 10, { duration: 1.4 });
    } else {
      const landmark = res.entity as Landmark;
      setSelectedEntity({ type: 'landmark', landmark });
      mapInstanceRef.current.flyTo(landmark.coordinates, 13, { duration: 1.4 });
    }
    setSearchQuery('');
  };

  const handleResetWorldView = () => {
    if (!mapInstanceRef.current) return;
    setSelectedEntity(null);
    mapInstanceRef.current.flyTo([25.0, 15.0], 3, { duration: 1.5 });
  };

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] min-h-[600px] bg-[#090a0d] overflow-hidden">
      {/* The Leaflet Map Container */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* TOP SEARCH & CONTROLS BAR */}
      <div className="absolute top-4 inset-x-4 flex items-start justify-between gap-4 z-20 pointer-events-none">
        {/* Destination Search Box */}
        <div className="relative w-80 max-w-full pointer-events-auto">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search world city or landmark..."
              className="w-full pl-10 pr-4 py-2.5 bg-neutral-950/90 backdrop-blur-md border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-400 shadow-2xl focus:outline-none focus:border-amber-400 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Autocomplete Dropdown */}
          {searchResults.length > 0 && (
            <div className="absolute left-0 right-0 mt-2 bg-[#0c0e14]/95 backdrop-blur-md border border-neutral-800 rounded-xl overflow-hidden shadow-2xl z-30 divide-y divide-neutral-800/80">
              {searchResults.map((res, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectSearchResult(res)}
                  className="w-full text-left px-4 py-2.5 hover:bg-neutral-800/80 transition-colors flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    {res.type === 'city' ? (
                      <MapPin className="w-4 h-4 text-amber-400" />
                    ) : (
                      <Compass className="w-4 h-4 text-cyan-400" />
                    )}
                    <div>
                      <span className="text-xs font-semibold text-white group-hover:text-amber-300">
                        {res.entity.name}
                      </span>
                      <span className="text-[11px] text-neutral-400 block">
                        {res.type === 'city'
                          ? (res.entity as City).countryName
                          : `${(res.entity as Landmark).cityName}, ${(res.entity as Landmark).countryName}`}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300">
                    {res.type}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Map Utility Controls */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Layer Style Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowLayerMenu(!showLayerMenu)}
              className="px-3.5 py-2.5 bg-neutral-950/90 hover:bg-neutral-900 backdrop-blur-md border border-neutral-800 text-neutral-200 hover:text-white text-xs font-medium rounded-xl shadow-xl flex items-center gap-2 cursor-pointer transition-colors"
            >
              <Layers className="w-4 h-4 text-amber-400" />
              <span className="capitalize">{activeLayer}</span>
            </button>

            {showLayerMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-[#0e1118]/95 backdrop-blur-md border border-neutral-800 rounded-xl shadow-2xl p-2 space-y-1 z-30">
                {(Object.keys(TILE_PROVIDERS) as MapLayerStyle[]).map((layer) => (
                  <button
                    key={layer}
                    onClick={() => handleLayerChange(layer)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      activeLayer === layer
                        ? 'bg-amber-400 text-neutral-950 font-semibold'
                        : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
                    }`}
                  >
                    {TILE_PROVIDERS[layer].name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Reset World Overview Button */}
          <button
            onClick={handleResetWorldView}
            className="px-3.5 py-2.5 bg-neutral-950/90 hover:bg-neutral-900 backdrop-blur-md border border-neutral-800 text-neutral-200 hover:text-white text-xs font-medium rounded-xl shadow-xl flex items-center gap-2 cursor-pointer transition-colors"
            title="Return to World Overview"
          >
            <Globe className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">World Overview</span>
          </button>
        </div>
      </div>

      {/* BOTTOM COORDINATES & ZOOM CONTROLS */}
      <div className="absolute bottom-6 inset-x-4 flex items-end justify-between gap-4 z-20 pointer-events-none">
        {/* Real-time Geographic Telemetry HUD */}
        <div className="bg-neutral-950/85 backdrop-blur-md border border-neutral-800/80 rounded-xl px-3.5 py-2 shadow-xl pointer-events-auto text-[11px] text-neutral-400 font-mono tabular-nums flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-neutral-300">
            <Navigation className="w-3.5 h-3.5 text-amber-400" />
            <span>GEO-COORDINATES:</span>
          </div>
          <span>
            {mouseCoords
              ? `${mouseCoords.lat > 0 ? `${mouseCoords.lat}°N` : `${Math.abs(mouseCoords.lat)}°S`}, ${
                  mouseCoords.lng > 0 ? `${mouseCoords.lng}°E` : `${Math.abs(mouseCoords.lng)}°W`
                }`
              : 'Pan or point across the globe'}
          </span>
        </div>

        {/* Map Zoom Buttons */}
        <div className="bg-neutral-950/85 backdrop-blur-md border border-neutral-800/80 rounded-xl p-1 shadow-xl pointer-events-auto flex items-center gap-1">
          <button
            onClick={() => mapInstanceRef.current?.zoomIn()}
            className="p-2 text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => mapInstanceRef.current?.zoomOut()}
            className="p-2 text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* SLIDE-OUT LOCATION INSPECTOR DRAWER */}
      {selectedEntity && (
        <div className="absolute top-20 right-4 w-96 max-w-[calc(100vw-2rem)] bg-[#0d1017]/95 backdrop-blur-xl border border-neutral-800 rounded-2xl shadow-2xl z-20 overflow-hidden transition-all duration-300">
          {selectedEntity.type === 'city' && selectedEntity.city && (
            <div>
              <div className="relative h-44 w-full">
                <img
                  src={selectedEntity.city.heroImage}
                  alt={selectedEntity.city.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1017] via-transparent to-transparent" />
                <button
                  onClick={() => setSelectedEntity(null)}
                  className="absolute top-3 right-3 p-1.5 bg-neutral-950/80 hover:bg-neutral-900 text-neutral-300 hover:text-white rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-3 left-4 right-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{selectedEntity.city.countryFlag}</span>
                    <h2 className="text-xl font-bold text-white tracking-tight">
                      {selectedEntity.city.name}
                    </h2>
                  </div>
                  <span className="text-xs text-amber-400 font-medium">
                    {selectedEntity.city.countryName} · {selectedEntity.city.continent}
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-4">
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {selectedEntity.city.description}
                </p>

                <div className="grid grid-cols-2 gap-2 bg-neutral-900/80 p-2.5 rounded-xl border border-neutral-800 text-[11px] font-mono tabular-nums">
                  <div>
                    <span className="text-neutral-500 block font-sans">Coordinates:</span>
                    <span className="text-neutral-200">
                      {selectedEntity.city.coordinates[0].toFixed(4)}°, {selectedEntity.city.coordinates[1].toFixed(4)}°
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block font-sans">Population:</span>
                    <span className="text-neutral-200">{selectedEntity.city.population}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block font-sans">Timezone:</span>
                    <span className="text-neutral-200">{selectedEntity.city.timezone}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block font-sans">Best Season:</span>
                    <span className="text-neutral-200 font-sans truncate">{selectedEntity.city.bestTimeToVisit.split(' ')[0]}</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  {selectedEntity.city.defaultStreetViewpointId && (
                    <button
                      onClick={() => {
                        onSelectStreetViewpoint(selectedEntity.city!.defaultStreetViewpointId!);
                        onNavigate('street-explorer');
                      }}
                      className="w-full py-2.5 px-4 bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Compass className="w-4 h-4" />
                      <span>Launch 360° Street View</span>
                    </button>
                  )}
                  <button
                    onClick={() => onSelectCity(selectedEntity.city!.id)}
                    className="w-full py-2.5 px-4 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>View City Guide & Neighborhoods</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {selectedEntity.type === 'landmark' && selectedEntity.landmark && (
            <div>
              <div className="relative h-44 w-full">
                <img
                  src={selectedEntity.landmark.imageUrl}
                  alt={selectedEntity.landmark.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1017] via-transparent to-transparent" />
                <button
                  onClick={() => setSelectedEntity(null)}
                  className="absolute top-3 right-3 p-1.5 bg-neutral-950/80 hover:bg-neutral-900 text-neutral-300 hover:text-white rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">
                    {selectedEntity.landmark.category}
                  </span>
                  <h2 className="text-xl font-bold text-white tracking-tight">
                    {selectedEntity.landmark.name}
                  </h2>
                  <span className="text-xs text-neutral-400">
                    {selectedEntity.landmark.cityName}, {selectedEntity.landmark.countryName}
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-4">
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {selectedEntity.landmark.description}
                </p>

                <div className="grid grid-cols-2 gap-2 bg-neutral-900/80 p-2.5 rounded-xl border border-neutral-800 text-[11px] font-mono tabular-nums">
                  <div>
                    <span className="text-neutral-500 block font-sans">Year Completed:</span>
                    <span className="text-neutral-200">{selectedEntity.landmark.yearCompleted}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block font-sans">Architecture:</span>
                    <span className="text-neutral-200 font-sans truncate">{selectedEntity.landmark.architecturalStyle}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-neutral-500 block font-sans">Exact Coordinates:</span>
                    <span className="text-neutral-200">
                      {selectedEntity.landmark.coordinates[0].toFixed(5)}°N, {selectedEntity.landmark.coordinates[1].toFixed(5)}°E
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  {selectedEntity.landmark.streetViewpointId ? (
                    <button
                      onClick={() => {
                        onSelectStreetViewpoint(selectedEntity.landmark!.streetViewpointId!);
                        onNavigate('street-explorer');
                      }}
                      className="w-full py-2.5 px-4 bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Compass className="w-4 h-4" />
                      <span>Explore Landmark in 360°</span>
                    </button>
                  ) : (
                    <div className="text-center py-2 text-xs text-neutral-400 bg-neutral-900/60 rounded-lg">
                      Satellite view available · High-res photography loaded
                    </div>
                  )}
                  <button
                    onClick={() => onSelectCity(selectedEntity.landmark!.cityId)}
                    className="w-full py-2 px-4 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Explore {selectedEntity.landmark.cityName}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
