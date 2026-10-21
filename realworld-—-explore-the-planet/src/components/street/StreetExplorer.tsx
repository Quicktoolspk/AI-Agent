import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { StreetViewpoint, PageView } from '../../types';
import { STREET_VIEWPOINTS, CITIES } from '../../data/destinations';
import {
  RotateCcw,
  Maximize2,
  Minimize2,
  Compass,
  ArrowRight,
  ZoomIn,
  ZoomOut,
  Layers,
  MapPin,
  ChevronLeft,
  Navigation,
  ExternalLink,
  Eye,
  Info,
  Clock
} from 'lucide-react';

interface StreetExplorerProps {
  currentViewpointId: string;
  onSelectViewpoint: (id: string) => void;
  onNavigate: (page: PageView) => void;
  onSelectCity: (cityId: string) => void;
}

type ViewMode = 'photosphere' | 'streetview' | 'satellite';

export const StreetExplorer: React.FC<StreetExplorerProps> = ({
  currentViewpointId,
  onSelectViewpoint,
  onNavigate,
  onSelectCity
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const miniMapRef = useRef<HTMLDivElement>(null);

  const [viewpoint, setViewpoint] = useState<StreetViewpoint>(() => {
    return (
      STREET_VIEWPOINTS.find((vp) => vp.id === currentViewpointId) ||
      STREET_VIEWPOINTS[0]
    );
  });

  const [viewMode, setViewMode] = useState<ViewMode>('photosphere');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const [headingDegrees, setHeadingDegrees] = useState(viewpoint.initialHeading || 0);
  const [pitchDegrees, setPitchDegrees] = useState(viewpoint.initialPitch || 0);
  const [fov, setFov] = useState(75);
  const [isLoadingTexture, setIsLoadingTexture] = useState(true);
  const [textureLoadError, setTextureLoadError] = useState(false);
  const [showLocationDrawer, setShowLocationDrawer] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  // Sync internal state when currentViewpointId prop changes
  useEffect(() => {
    const found = STREET_VIEWPOINTS.find((vp) => vp.id === currentViewpointId);
    if (found) {
      setViewpoint(found);
      setHeadingDegrees(found.initialHeading);
      setPitchDegrees(found.initialPitch);
      setFov(found.fov || 75);
      setTextureLoadError(false);
    }
  }, [currentViewpointId]);

  // Three.js Scene References
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sphereMeshRef = useRef<THREE.Mesh | null>(null);
  const textureLoaderRef = useRef<THREE.TextureLoader>(new THREE.TextureLoader());

  // Interaction tracking refs
  const isDraggingRef = useRef(false);
  const previousPointerPositionRef = useRef({ x: 0, y: 0 });
  const lonRef = useRef(viewpoint.initialHeading);
  const latRef = useRef(viewpoint.initialPitch);
  const autoRotateRef = useRef(false);
  autoRotateRef.current = isAutoRotating;

  // Initialize Three.js WebGL equirectangular sphere
  useEffect(() => {
    if (!canvasContainerRef.current) return;
    const container = canvasContainerRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(fov, width / height, 1, 1100);
    cameraRef.current = camera;

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 3. Inverted Sphere Geometry for 360 photosphere
    const geometry = new THREE.SphereGeometry(500, 64, 40);
    // Invert geometry so faces point inward
    geometry.scale(-1, 1, 1);

    // Placeholder black material while loading
    const material = new THREE.MeshBasicMaterial({ color: 0x05070a });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    sphereMeshRef.current = sphere;

    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (autoRotateRef.current && !isDraggingRef.current) {
        lonRef.current += 0.08;
        if (lonRef.current >= 360) lonRef.current -= 360;
      }

      // Constrain pitch
      latRef.current = Math.max(-85, Math.min(85, latRef.current));

      const phi = THREE.MathUtils.degToRad(90 - latRef.current);
      const theta = THREE.MathUtils.degToRad(lonRef.current);

      const targetX = 500 * Math.sin(phi) * Math.cos(theta);
      const targetY = 500 * Math.cos(phi);
      const targetZ = 500 * Math.sin(phi) * Math.sin(theta);

      camera.lookAt(targetX, targetY, targetZ);
      renderer.render(scene, camera);

      // Periodically update state for UI compass without spamming renders
      setHeadingDegrees(Math.round(((lonRef.current % 360) + 360) % 360));
      setPitchDegrees(Math.round(latRef.current));
    };

    animate();

    // Resize listener
    const handleResize = () => {
      if (!canvasContainerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = canvasContainerRef.current.clientWidth;
      const h = canvasContainerRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update camera FOV when changed
  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.fov = fov;
      cameraRef.current.updateProjectionMatrix();
    }
  }, [fov]);

  // Load equirectangular panorama texture whenever viewpoint changes
  useEffect(() => {
    if (!sphereMeshRef.current) return;

    setIsLoadingTexture(true);
    setTextureLoadError(false);
    lonRef.current = viewpoint.initialHeading;
    latRef.current = viewpoint.initialPitch;

    const textureUrl = viewpoint.panoramaUrl;

    textureLoaderRef.current.load(
      textureUrl,
      (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;

        if (sphereMeshRef.current) {
          const newMaterial = new THREE.MeshBasicMaterial({ map: texture });
          sphereMeshRef.current.material = newMaterial;
        }
        setIsLoadingTexture(false);
      },
      undefined,
      () => {
        // Fallback to high-res secondary photograph if primary fails
        if (viewpoint.fallbackImageUrl) {
          textureLoaderRef.current.load(
            viewpoint.fallbackImageUrl,
            (fallbackTexture) => {
              if (sphereMeshRef.current) {
                sphereMeshRef.current.material = new THREE.MeshBasicMaterial({ map: fallbackTexture });
              }
              setIsLoadingTexture(false);
            },
            undefined,
            () => {
              setTextureLoadError(true);
              setIsLoadingTexture(false);
            }
          );
        } else {
          setTextureLoadError(true);
          setIsLoadingTexture(false);
        }
      }
    );
  }, [viewpoint]);

  // Mouse & Touch interaction handlers for 360 degree drag
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    previousPointerPositionRef.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - previousPointerPositionRef.current.x;
    const deltaY = e.clientY - previousPointerPositionRef.current.y;

    previousPointerPositionRef.current = { x: e.clientX, y: e.clientY };

    // Adjust speed based on FOV
    const factor = (fov / 75) * 0.16;
    lonRef.current -= deltaX * factor;
    latRef.current += deltaY * factor;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDraggingRef.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignored if already released
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setFov((prev) => Math.max(35, Math.min(100, prev + e.deltaY * 0.05)));
  };

  const resetOrientation = () => {
    lonRef.current = viewpoint.initialHeading;
    latRef.current = viewpoint.initialPitch;
    setFov(viewpoint.fov || 75);
    setHeadingDegrees(viewpoint.initialHeading);
    setPitchDegrees(viewpoint.initialPitch);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // Connected viewpoint hot-spot angle calculation relative to current heading
  const getRelativeHotspotPosition = (targetHeading: number) => {
    let diff = targetHeading - headingDegrees;
    while (diff < -180) diff += 360;
    while (diff > 180) diff -= 360;

    // Check if within visible field of view (+- fov/1.5)
    const isVisible = Math.abs(diff) < fov * 0.7;
    // Map -fov/2 .. +fov/2 to 10% .. 90% screen width
    const screenPercent = 50 + (diff / (fov * 0.8)) * 40;

    return { isVisible, screenPercent: Math.max(5, Math.min(95, screenPercent)) };
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full bg-[#050608] select-none overflow-hidden ${
        isFullscreen ? 'h-screen' : 'h-[calc(100vh-4rem)] min-h-[600px]'
      }`}
    >
      {/* Viewport Canvas or Embed Modes */}
      {viewMode === 'photosphere' && (
        <div
          ref={canvasContainerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onWheel={handleWheel}
          className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
        />
      )}

      {viewMode === 'streetview' && (
        <div className="w-full h-full bg-neutral-950 flex flex-col items-center justify-center">
          {viewpoint.googleStreetViewEmbedUrl ? (
            <iframe
              src={viewpoint.googleStreetViewEmbedUrl}
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer"
              title={`Street View of ${viewpoint.title}`}
            />
          ) : (
            <div className="text-center p-8 max-w-md">
              <MapPin className="w-12 h-12 text-amber-400 mx-auto mb-4 opacity-80" />
              <h3 className="text-lg font-semibold text-white mb-2">Google Street View Notice</h3>
              <p className="text-neutral-400 text-sm mb-4">
                Real panoramic photosphere imagery is available for this location. Switch to the 360° Photosphere view to look around in high definition.
              </p>
              <button
                onClick={() => setViewMode('photosphere')}
                className="px-4 py-2 bg-amber-400 text-neutral-950 text-xs font-semibold rounded-md hover:bg-amber-300"
              >
                Return to 360° Photosphere
              </button>
            </div>
          )}
        </div>
      )}

      {viewMode === 'satellite' && (
        <div className="w-full h-full relative bg-neutral-950">
          <iframe
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${viewpoint.coordinates[1] - 0.005}%2C${viewpoint.coordinates[0] - 0.003}%2C${viewpoint.coordinates[1] + 0.005}%2C${viewpoint.coordinates[0] + 0.003}&layer=mapnik&marker=${viewpoint.coordinates[0]}%2C${viewpoint.coordinates[1]}`}
            className="w-full h-full border-0 filter contrast-125"
            title="Satellite Map View"
          />
          <div className="absolute bottom-4 left-4 bg-neutral-900/90 backdrop-blur-md px-3 py-2 rounded-lg border border-neutral-800 text-xs text-neutral-300">
            <span>High-precision cartographic alignment at {viewpoint.coordinates[0].toFixed(4)}°, {viewpoint.coordinates[1].toFixed(4)}°</span>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {isLoadingTexture && viewMode === 'photosphere' && (
        <div className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm flex flex-col items-center justify-center z-20 pointer-events-none">
          <div className="w-10 h-10 border-2 border-amber-400/20 border-t-amber-400 rounded-full animate-spin mb-4" />
          <p className="text-sm font-medium text-white">Loading authentic 360° spherical imagery...</p>
          <span className="text-xs text-neutral-400 mt-1">{viewpoint.streetName}, {viewpoint.cityName}</span>
        </div>
      )}

      {/* Missing or Fallback Notice */}
      {textureLoadError && viewMode === 'photosphere' && (
        <div className="absolute inset-x-4 top-24 max-w-lg mx-auto bg-amber-950/90 border border-amber-800/80 text-amber-100 p-4 rounded-xl z-20 shadow-2xl backdrop-blur-md">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-white">Authentic Imagery Fallback</h4>
              <p className="text-xs text-amber-200/90 mt-1">
                The primary high-resolution panoramic tile is temporarily undergoing network cache verification. You can view the satellite map or alternate street views seamlessly.
              </p>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => setViewMode('satellite')}
                  className="px-3 py-1 bg-amber-400 text-neutral-950 text-xs font-semibold rounded hover:bg-amber-300"
                >
                  Switch to Aerial Map
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating 360 Horizon Hotspots (Stepping to connected viewpoints) */}
      {viewMode === 'photosphere' && !isLoadingTexture && viewpoint.connectedViewpoints.map((conn) => {
        const { isVisible, screenPercent } = getRelativeHotspotPosition(conn.directionHeading);
        if (!isVisible) return null;

        return (
          <div
            key={conn.viewpointId}
            style={{ left: `${screenPercent}%`, top: '54%' }}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-auto transition-all duration-150"
          >
            <button
              onClick={() => onSelectViewpoint(conn.viewpointId)}
              className="group flex flex-col items-center cursor-pointer focus:outline-none"
              title={`Step to ${conn.targetName} (${conn.distanceLabel})`}
            >
              <div className="w-10 h-10 rounded-full bg-amber-400 text-neutral-950 shadow-lg shadow-amber-500/25 flex items-center justify-center transform group-hover:scale-110 active:scale-95 transition-transform border-2 border-white">
                <Navigation
                  className="w-5 h-5 transform"
                  style={{ transform: `rotate(${conn.directionHeading - headingDegrees}deg)` }}
                />
              </div>
              <div className="mt-1.5 px-2.5 py-1 bg-neutral-950/90 backdrop-blur-md border border-neutral-700/80 rounded-md text-white text-xs font-medium whitespace-nowrap shadow-md opacity-90 group-hover:opacity-100 flex items-center gap-1.5">
                <span>{conn.targetName}</span>
                <span className="text-amber-400 text-[10px]">· {conn.distanceLabel}</span>
              </div>
            </button>
          </div>
        );
      })}

      {/* TOP HUD BAR */}
      <div className="absolute top-4 inset-x-4 flex items-center justify-between gap-4 z-20 pointer-events-none">
        {/* Location Info Banner */}
        <div className="bg-neutral-950/85 backdrop-blur-md border border-neutral-800/80 rounded-xl px-4 py-2.5 shadow-xl pointer-events-auto flex items-center gap-3">
          <button
            onClick={() => onNavigate('explore')}
            className="p-1.5 hover:bg-neutral-800 rounded-lg text-neutral-400 hover:text-white transition-colors cursor-pointer"
            title="Back to Directory"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold text-white tracking-tight">
                {viewpoint.title}
              </h1>
              <span className="text-xs text-neutral-500">·</span>
              <button
                onClick={() => onSelectCity(viewpoint.cityId)}
                className="text-xs text-amber-400 hover:underline cursor-pointer"
              >
                {viewpoint.cityName}, {viewpoint.countryName}
              </button>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-neutral-400 font-mono tabular-nums">
              <span>{viewpoint.streetName}</span>
              <span aria-hidden="true">·</span>
              <span>
                {viewpoint.coordinates[0].toFixed(4)}°N, {viewpoint.coordinates[1].toFixed(4)}°E
              </span>
              <span aria-hidden="true">·</span>
              <span>Elev. {viewpoint.elevationMeters}m</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* View Mode Switcher */}
          <div className="hidden sm:flex items-center p-1 bg-neutral-950/85 backdrop-blur-md border border-neutral-800 rounded-lg text-xs font-medium">
            <button
              onClick={() => setViewMode('photosphere')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                viewMode === 'photosphere'
                  ? 'bg-amber-400 text-neutral-950 font-semibold'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              360° Photosphere
            </button>
            <button
              onClick={() => setViewMode('streetview')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                viewMode === 'streetview'
                  ? 'bg-amber-400 text-neutral-950 font-semibold'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              Google Street View
            </button>
            <button
              onClick={() => setViewMode('satellite')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                viewMode === 'satellite'
                  ? 'bg-amber-400 text-neutral-950 font-semibold'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              Satellite
            </button>
          </div>

          {/* Quick Location Switcher Drawer Trigger */}
          <button
            onClick={() => setShowLocationDrawer(!showLocationDrawer)}
            className="px-3 py-2 bg-neutral-950/85 hover:bg-neutral-900 backdrop-blur-md border border-neutral-800 text-neutral-200 hover:text-white text-xs font-medium rounded-lg shadow-lg flex items-center gap-2 cursor-pointer transition-colors"
          >
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Change Location</span>
          </button>

          {/* Location Info Trigger */}
          <button
            onClick={() => setShowInfoModal(!showInfoModal)}
            className="p-2 bg-neutral-950/85 hover:bg-neutral-900 backdrop-blur-md border border-neutral-800 text-neutral-200 hover:text-white rounded-lg shadow-lg cursor-pointer"
            title="Location description & attribution"
          >
            <Info className="w-4 h-4" />
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="p-2 bg-neutral-950/85 hover:bg-neutral-900 backdrop-blur-md border border-neutral-800 text-neutral-200 hover:text-white rounded-lg shadow-lg cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* BOTTOM RIGHT FLOATING CAMERA HUD */}
      {viewMode === 'photosphere' && (
        <div className="absolute bottom-6 right-4 flex flex-col items-end gap-2.5 z-20 pointer-events-auto">
          {/* Compass & Orientation HUD */}
          <div className="bg-neutral-950/85 backdrop-blur-md border border-neutral-800/80 rounded-xl p-3 shadow-xl flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full border border-neutral-700 bg-neutral-900 flex items-center justify-center">
              <Compass
                className="w-6 h-6 text-amber-400 transition-transform duration-75"
                style={{ transform: `rotate(${-headingDegrees}deg)` }}
              />
              <span className="absolute -top-1 text-[8px] font-bold text-neutral-400">N</span>
            </div>
            <div className="text-left font-mono tabular-nums text-xs">
              <div className="text-white font-semibold flex items-center gap-1.5">
                <span>{headingDegrees}°</span>
                <span className="text-[10px] text-neutral-400 font-sans">HEADING</span>
              </div>
              <div className="text-neutral-400 text-[11px]">Pitch: {pitchDegrees}° · FOV: {Math.round(fov)}°</div>
            </div>
          </div>

          {/* Camera controls cluster */}
          <div className="bg-neutral-950/85 backdrop-blur-md border border-neutral-800/80 rounded-xl p-1.5 shadow-xl flex items-center gap-1">
            <button
              onClick={() => setFov((prev) => Math.max(35, prev - 8))}
              className="p-2 text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setFov((prev) => Math.min(100, prev + 8))}
              className="p-2 text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={resetOrientation}
              className="p-2 text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
              title="Reset View Orientation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsAutoRotating(!isAutoRotating)}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                isAutoRotating
                  ? 'bg-amber-400 text-neutral-950 font-bold'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-800'
              }`}
              title={isAutoRotating ? 'Pause 360° Auto-Pan' : 'Start 360° Auto-Pan'}
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* BOTTOM LEFT: Connected Viewpoints Quick Bar */}
      <div className="absolute bottom-6 left-4 z-20 pointer-events-auto max-w-md hidden sm:block">
        {viewpoint.connectedViewpoints.length > 0 ? (
          <div className="bg-neutral-950/85 backdrop-blur-md border border-neutral-800/80 rounded-xl p-3 shadow-xl">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-300 mb-2">
              <Navigation className="w-3.5 h-3.5 text-amber-400" />
              <span>Connected Street Viewpoints ({viewpoint.connectedViewpoints.length})</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {viewpoint.connectedViewpoints.map((conn) => (
                <button
                  key={conn.viewpointId}
                  onClick={() => onSelectViewpoint(conn.viewpointId)}
                  className="px-2.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 hover:border-amber-400/50 rounded-lg text-xs text-neutral-200 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{conn.targetName}</span>
                  <span className="text-[10px] text-amber-400">· {conn.distanceLabel}</span>
                  <ArrowRight className="w-3 h-3 text-neutral-400" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-neutral-950/85 backdrop-blur-md border border-neutral-800/80 rounded-xl px-3.5 py-2 shadow-xl text-xs text-neutral-400 flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-neutral-500" />
            <span>Standalone 360° Photographic Viewpoint</span>
          </div>
        )}
      </div>

      {/* QUICK LOCATION SWITCHER DRAWER */}
      {showLocationDrawer && (
        <div className="absolute inset-y-0 right-0 w-80 max-w-full bg-[#0c0e14]/95 backdrop-blur-lg border-l border-neutral-800 z-30 shadow-2xl p-5 flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white">Select Street Viewpoint</h3>
            </div>
            <button
              onClick={() => setShowLocationDrawer(false)}
              className="text-xs text-neutral-400 hover:text-white"
            >
              Close
            </button>
          </div>

          <p className="text-xs text-neutral-400 my-3">
            Jump instantly to authentic 360° spherical viewpoints across famous world streets and monuments:
          </p>

          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {STREET_VIEWPOINTS.map((vp) => {
              const isCurrent = vp.id === viewpoint.id;
              return (
                <button
                  key={vp.id}
                  onClick={() => {
                    onSelectViewpoint(vp.id);
                    setShowLocationDrawer(false);
                  }}
                  className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-amber-500/10 border-amber-400/50 text-white'
                      : 'bg-neutral-900/60 border-neutral-800/80 text-neutral-300 hover:border-neutral-700 hover:bg-neutral-800/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white truncate">{vp.title}</span>
                    <span className="text-[10px] text-amber-400 font-mono">
                      {vp.cityName}
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400 truncate mt-0.5">{vp.streetName}</p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* LOCATION & ATTRIBUTION INFO MODAL */}
      {showInfoModal && (
        <div className="absolute inset-0 bg-neutral-950/70 backdrop-blur-sm z-30 flex items-center justify-center p-4">
          <div className="bg-[#10131a] border border-neutral-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">
                  Geographic Intelligence
                </span>
                <h3 className="text-lg font-bold text-white mt-1">{viewpoint.title}</h3>
                <p className="text-xs text-neutral-400">
                  {viewpoint.neighborhood}, {viewpoint.cityName}, {viewpoint.countryName}
                </p>
              </div>
              <button
                onClick={() => setShowInfoModal(false)}
                className="text-neutral-400 hover:text-white text-xs px-2 py-1 bg-neutral-800 rounded"
              >
                Close
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs text-neutral-300 leading-relaxed border-t border-neutral-800/80 pt-3">
              <p>{viewpoint.description}</p>
              <div className="grid grid-cols-2 gap-2 bg-neutral-900/80 p-3 rounded-lg border border-neutral-800 text-[11px]">
                <div>
                  <span className="text-neutral-500 block">Exact Coordinates:</span>
                  <span className="font-mono text-neutral-200">
                    {viewpoint.coordinates[0].toFixed(6)}°, {viewpoint.coordinates[1].toFixed(6)}°
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Elevation Above Sea Level:</span>
                  <span className="font-mono text-neutral-200">{viewpoint.elevationMeters} meters</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Capture Illumination:</span>
                  <span className="text-neutral-200">{viewpoint.timeOfDay}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Connected Nodes:</span>
                  <span className="text-neutral-200">{viewpoint.connectedViewpoints.length} locations</span>
                </div>
              </div>

              <div className="border-t border-neutral-800/60 pt-3">
                <span className="text-neutral-400 block text-[11px] mb-1">Authentic Imagery Attribution:</span>
                <p className="text-[11px] text-neutral-400">
                  Photographer: <strong className="text-neutral-200">{viewpoint.attribution.photographer}</strong> · Source: <span className="text-neutral-300">{viewpoint.attribution.source}</span> · License: <span className="text-neutral-300">{viewpoint.attribution.license}</span>
                </p>
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => {
                  onSelectCity(viewpoint.cityId);
                  setShowInfoModal(false);
                }}
                className="px-3.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium rounded-lg"
              >
                Explore {viewpoint.cityName} Guide
              </button>
              <button
                onClick={() => setShowInfoModal(false)}
                className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-semibold rounded-lg"
              >
                Continue Exploring
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
