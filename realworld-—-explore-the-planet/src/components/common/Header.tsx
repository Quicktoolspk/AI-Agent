import React, { useState } from 'react';
import { PageView } from '../../types';
import { Compass, MapPin, Globe, Landmark, Info, Menu, X, Sparkles } from 'lucide-react';
import { STREET_VIEWPOINTS } from '../../data/destinations';

interface HeaderProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  onSelectStreetViewpoint: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onSelectStreetViewpoint
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleRandomTeleport = () => {
    const randomIndex = Math.floor(Math.random() * STREET_VIEWPOINTS.length);
    const chosen = STREET_VIEWPOINTS[randomIndex];
    onSelectStreetViewpoint(chosen.id);
    onNavigate('street-explorer');
    setMobileMenuOpen(false);
  };

  const navLinks: { id: PageView; label: string; icon: React.ReactNode }[] = [
    { id: 'explore', label: 'Explore', icon: <Compass className="w-4 h-4" /> },
    { id: 'map', label: 'World Map', icon: <Globe className="w-4 h-4" /> },
    { id: 'street-explorer', label: 'Street Explorer', icon: <MapPin className="w-4 h-4" /> },
    { id: 'landmarks', label: 'Famous Places', icon: <Landmark className="w-4 h-4" /> },
    { id: 'about', label: 'About', icon: <Info className="w-4 h-4" /> }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#090a0d]/90 backdrop-blur-md border-b border-neutral-800/80">
      {/* Strict 3-Zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element, 1 line) */}
        <button
          onClick={() => {
            onNavigate('home');
            setMobileMenuOpen(false);
          }}
          className="text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-sm bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-neutral-950 font-black text-xs tracking-tighter">
              RW
            </div>
            <span className="text-lg font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors whitespace-nowrap shrink-0">
              REALWORLD
            </span>
            <span className="hidden sm:inline-block text-xs font-normal text-neutral-400 tracking-normal whitespace-nowrap shrink-0">
              · Explore the Planet
            </span>
          </div>
        </button>

        {/* Zone 2: 4-5 Concise Single-line Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-300">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors py-1 ${
                  isActive
                    ? 'text-amber-400 font-semibold border-b-2 border-amber-400'
                    : 'text-neutral-300 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <button
            onClick={handleRandomTeleport}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 active:scale-[0.98] transition-all rounded-md shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
            title="Teleport to a random real 360° street view on Earth"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Random Teleport</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={handleRandomTeleport}
            className="p-1.5 text-amber-400 bg-neutral-900 border border-neutral-800 rounded-md"
            title="Random Teleport"
          >
            <Sparkles className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-300 hover:text-white focus:outline-none"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-800 bg-[#0c0e14] px-4 py-4 space-y-2">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-left text-sm font-medium ${
                  isActive
                    ? 'bg-amber-500/10 text-amber-400 font-semibold'
                    : 'text-neutral-300 hover:bg-neutral-800/60 hover:text-white'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </button>
            );
          })}
          <div className="pt-2 border-t border-neutral-800">
            <button
              onClick={handleRandomTeleport}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-md"
            >
              <Sparkles className="w-4 h-4" />
              <span>Random Street Teleport</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
