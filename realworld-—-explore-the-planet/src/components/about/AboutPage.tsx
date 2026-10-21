import React from 'react';
import { PageView } from '../../types';
import {
  Globe,
  Compass,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Layers,
  Camera,
  Navigation,
  ArrowRight
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageView) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full bg-[#090a0d] min-h-screen text-neutral-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="border-b border-neutral-800 pb-8 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
            Project Architecture & Principles
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            About REALWORLD — Explore the Planet
          </h1>
          <p className="text-neutral-400 text-sm leading-relaxed max-w-2xl">
            A free, ultra-realistic digital portal built to explore actual cities, monuments, and streets around the globe through authentic photography, spherical photospheres, and cartography.
          </p>
        </div>

        {/* Section 1: The Core Philosophy */}
        <div className="bg-[#0e1118] border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              1. A Digital Window, Not a Video Game
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            REALWORLD was founded on a singular standard: to allow people to see the planet as it genuinely exists. We strictly reject cartoon avatars, game physics, fictitious 3D cities, low-poly procedural structures, and artificial game HUDs. When you look at an image or panorama on REALWORLD, you are seeing authentic light captured on photographic sensors at that exact location on Earth.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
            <div className="flex items-start gap-2 bg-neutral-900/60 p-3 rounded-xl border border-neutral-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span className="text-neutral-300">Verified real-world GPS coordinates for every destination and landmark.</span>
            </div>
            <div className="flex items-start gap-2 bg-neutral-900/60 p-3 rounded-xl border border-neutral-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span className="text-neutral-300">Authentic 360° spherical equirectangular photography and connected street nodes.</span>
            </div>
          </div>
        </div>

        {/* Section 2: Data Sources & Attribution */}
        <div className="bg-[#0e1118] border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              2. Data Sources & Geographic Providers
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            Our mapping and visual infrastructure is grounded in legitimate open-access and compatible licensed geographic data services:
          </p>

          <div className="space-y-3 text-xs text-neutral-300">
            <div className="p-3.5 bg-neutral-900/80 rounded-xl border border-neutral-800 space-y-1">
              <div className="flex items-center justify-between font-semibold text-white">
                <span>OpenStreetMap (OSM)</span>
                <span className="text-amber-400 font-mono text-[11px]">ODbL License</span>
              </div>
              <p className="text-neutral-400">
                Community-curated spatial street geometries, building outlines, parks, roads, and geographical landmarks worldwide.
              </p>
            </div>

            <div className="p-3.5 bg-neutral-900/80 rounded-xl border border-neutral-800 space-y-1">
              <div className="flex items-center justify-between font-semibold text-white">
                <span>Esri World Imagery & Maxar</span>
                <span className="text-amber-400 font-mono text-[11px]">High-Res Satellite Tiles</span>
              </div>
              <p className="text-neutral-400">
                Global satellite and aerial photography offering one-meter or better resolution across metropolitan centers and rural landscapes.
              </p>
            </div>

            <div className="p-3.5 bg-neutral-900/80 rounded-xl border border-neutral-800 space-y-1">
              <div className="flex items-center justify-between font-semibold text-white">
                <span>Wikimedia Commons & Verified Photographers</span>
                <span className="text-amber-400 font-mono text-[11px]">Creative Commons & Public Domain</span>
              </div>
              <p className="text-neutral-400">
                Authentic equirectangular 360° photospheres and high-resolution destination photography attributed to their original contributing photographers.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Privacy & Free Access */}
        <div className="bg-[#0e1118] border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              3. Privacy, Zero Accounts & 100% Free Access
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            REALWORLD is completely open to the public without barriers:
          </p>
          <ul className="space-y-2 text-xs text-neutral-300">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <strong>No Login or Registration:</strong> You do not need an account, password, or profile to explore any supported destination.
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <strong>No Payment or Paywalls:</strong> Zero in-app purchases, subscriptions, or locked features.
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <strong>No Mandatory Geolocation:</strong> We never force device location permissions; you search and navigate purely on your own terms.
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <strong>No Commercial Advertisements:</strong> No pop-ups, promotional banners, or tracking scripts.
            </li>
          </ul>
        </div>

        {/* Section 4: Geographic Coverage & Limitations Transparency */}
        <div className="bg-[#0e1118] border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-400/10 border border-purple-400/20 text-purple-400 flex items-center justify-center">
              <Navigation className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              4. Honest Coverage & Limitations
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            We believe in complete transparency about coverage. Not every square foot on Earth has licensed, high-resolution 360-degree street photography available in the public domain. Where continuous walking data is unavailable, we present discrete spherical panoramic viewpoints, high-resolution aerial satellite imagery, or genuine architectural photographs rather than pretending an AI-generated image represents the real location.
          </p>
        </div>

        {/* Bottom CTA */}
        <div className="pt-4 flex items-center justify-center gap-4">
          <button
            onClick={() => onNavigate('home')}
            className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
          >
            Return to Homepage
          </button>
          <button
            onClick={() => onNavigate('map')}
            className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white font-semibold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-2"
          >
            <span>Open Interactive Map</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
