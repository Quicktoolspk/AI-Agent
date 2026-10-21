import React from 'react';
import { PageView } from '../../types';
import { Globe, MapPin, Compass, Landmark } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-[#07080a] border-t border-neutral-800 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Column 1: Brand & Philosophy */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-sm bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-neutral-950 font-black text-xs">
                RW
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                REALWORLD
              </span>
              <span className="text-neutral-500 text-xs">· Explore the Planet</span>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-md">
              A free digital window onto the actual Earth. Explore real cities, walk through authentic streets via 360° panoramas, and examine geographic landmarks with zero game mechanics, fictional avatars, or account walls.
            </p>
            <div className="pt-2 text-neutral-400 text-xs flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>100% Free · No Sign-Up · No Ads · Genuine Geodata</span>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">
              Explore Pages
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('explore')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Countries & Cities</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('map')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Interactive World Map</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('street-explorer')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>360° Street Explorer</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('landmarks')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <Landmark className="w-3.5 h-3.5" />
                  <span>Famous Monuments</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Geographic Data Sources & Licenses */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">
              Data & Licensing
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <span className="text-neutral-300 font-medium">Cartography:</span> OpenStreetMap (ODbL)
              </li>
              <li>
                <span className="text-neutral-300 font-medium">Satellite Tiles:</span> Esri, Maxar, Earthstar Geographics
              </li>
              <li>
                <span className="text-neutral-300 font-medium">Panoramas:</span> Wikimedia Commons (CC-BY/SA)
              </li>
              <li>
                <span className="text-neutral-300 font-medium">Photography:</span> Wikimedia & Unsplash verified authors
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-400">
          <p>© {new Date().getFullYear()} REALWORLD Platform. All geographic coordinates and imagery reflect actual locations on Earth.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('about')}
              className="hover:text-neutral-300 transition-colors"
            >
              Ethics & Sources
            </button>
            <span aria-hidden="true">·</span>
            <span>No Cookies / No Telemetry</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
