export type PageView =
  | 'home'
  | 'explore'
  | 'map'
  | 'street-explorer'
  | 'destination-details'
  | 'landmarks'
  | 'about';

export type Continent =
  | 'All'
  | 'Europe'
  | 'Asia'
  | 'North America'
  | 'South America'
  | 'Middle East'
  | 'Africa'
  | 'Oceania';

export interface ConnectedViewpoint {
  viewpointId: string;
  targetName: string;
  directionHeading: number; // degrees 0-360
  pitchOffset?: number;
  distanceLabel: string; // e.g. "40m forward", "North tower"
}

export interface StreetViewpoint {
  id: string;
  title: string;
  streetName: string;
  neighborhood: string;
  cityName: string;
  countryName: string;
  cityId: string;
  coordinates: [number, number]; // [lat, lng]
  elevationMeters: number;
  initialHeading: number;
  initialPitch: number;
  fov?: number;
  panoramaUrl: string;
  fallbackImageUrl: string;
  googleStreetViewEmbedUrl?: string;
  connectedViewpoints: ConnectedViewpoint[];
  timeOfDay: 'Daylight' | 'Golden Hour' | 'Twilight' | 'Night';
  attribution: {
    photographer: string;
    source: string;
    license: string;
  };
  description: string;
}

export interface Landmark {
  id: string;
  name: string;
  cityId: string;
  cityName: string;
  countryName: string;
  category:
    | 'Historic Monument'
    | 'Sacred Architecture'
    | 'Modern Marvel'
    | 'Iconic Bridge'
    | 'Public Square'
    | 'Cultural Institution'
    | 'Natural Landmark';
  coordinates: [number, number];
  yearCompleted: string;
  architecturalStyle: string;
  description: string;
  imageUrl: string;
  photographer: string;
  source: string;
  streetViewpointId?: string;
  facts: string[];
}

export interface Neighborhood {
  name: string;
  vibe: string;
  highlights: string[];
  description: string;
}

export interface GalleryPhoto {
  url: string;
  title: string;
  caption: string;
  photographer: string;
  source: string;
}

export interface City {
  id: string;
  name: string;
  countryId: string;
  countryName: string;
  countryFlag: string;
  continent: Continent;
  coordinates: [number, number]; // [lat, lng]
  population: string;
  timezone: string;
  climate: string;
  bestTimeToVisit: string;
  heroImage: string;
  tagline: string;
  description: string;
  featuredLandmarkIds: string[];
  neighborhoods: Neighborhood[];
  gallery: GalleryPhoto[];
  defaultStreetViewpointId?: string;
}

export interface Country {
  id: string;
  name: string;
  flag: string;
  continent: Continent;
  capital: string;
  citiesCount: number;
  landmarksCount: number;
  heroImage: string;
  description: string;
}
