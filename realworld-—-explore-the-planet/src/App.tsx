import React, { useState, useEffect } from 'react';
import { PageView } from './types';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { HomePage } from './components/home/HomePage';
import { ExplorePage } from './components/explore/ExplorePage';
import { WorldMapView } from './components/map/WorldMapView';
import { StreetExplorer } from './components/street/StreetExplorer';
import { DestinationDetailsPage } from './components/destination/DestinationDetailsPage';
import { LandmarksPage } from './components/landmarks/LandmarksPage';
import { AboutPage } from './components/about/AboutPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedCityId, setSelectedCityId] = useState<string>('paris');
  const [selectedStreetViewpointId, setSelectedStreetViewpointId] = useState<string>(
    'paris-eiffel-champ-de-mars'
  );

  // Sync with browser hash for intuitive bookmarking and back/forward navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('destination/')) {
        const cityId = hash.replace('destination/', '');
        setSelectedCityId(cityId);
        setCurrentPage('destination-details');
      } else if (hash.startsWith('street/')) {
        const vpId = hash.replace('street/', '');
        setSelectedStreetViewpointId(vpId);
        setCurrentPage('street-explorer');
      } else if (
        ['home', 'explore', 'map', 'street-explorer', 'destination-details', 'landmarks', 'about'].includes(
          hash
        )
      ) {
        setCurrentPage(hash as PageView);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: PageView) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCity = (cityId: string) => {
    setSelectedCityId(cityId);
    setCurrentPage('destination-details');
    window.location.hash = `destination/${cityId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectStreetViewpoint = (viewpointId: string) => {
    setSelectedStreetViewpointId(viewpointId);
    setCurrentPage('street-explorer');
    window.location.hash = `street/${viewpointId}`;
  };

  return (
    <div className="min-h-screen bg-[#090a0d] text-neutral-100 flex flex-col font-sans selection:bg-amber-400 selection:text-neutral-950">
      {/* Top Navigation Bar */}
      <Header
        currentPage={currentPage}
        onNavigate={navigateTo}
        onSelectStreetViewpoint={handleSelectStreetViewpoint}
      />

      {/* Main Page Area */}
      <main className="flex-1 w-full">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={navigateTo}
            onSelectCity={handleSelectCity}
            onSelectStreetViewpoint={handleSelectStreetViewpoint}
          />
        )}

        {currentPage === 'explore' && (
          <ExplorePage
            onSelectCity={handleSelectCity}
            onSelectStreetViewpoint={handleSelectStreetViewpoint}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'map' && (
          <WorldMapView
            onSelectCity={handleSelectCity}
            onSelectStreetViewpoint={handleSelectStreetViewpoint}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'street-explorer' && (
          <StreetExplorer
            currentViewpointId={selectedStreetViewpointId}
            onSelectViewpoint={handleSelectStreetViewpoint}
            onNavigate={navigateTo}
            onSelectCity={handleSelectCity}
          />
        )}

        {currentPage === 'destination-details' && (
          <DestinationDetailsPage
            cityId={selectedCityId}
            onSelectCity={handleSelectCity}
            onSelectStreetViewpoint={handleSelectStreetViewpoint}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'landmarks' && (
          <LandmarksPage
            onSelectStreetViewpoint={handleSelectStreetViewpoint}
            onSelectCity={handleSelectCity}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'about' && <AboutPage onNavigate={navigateTo} />}
      </main>

      {/* Footer (Rendered on non-immersive pages for maximum viewport area in map & street explorer) */}
      {currentPage !== 'street-explorer' && currentPage !== 'map' && (
        <Footer onNavigate={navigateTo} />
      )}
    </div>
  );
}
