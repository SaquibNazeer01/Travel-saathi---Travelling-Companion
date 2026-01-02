
export interface LatLng {
  latitude: number;
  longitude: number;
}

export interface GroundingChunk {
  maps?: {
    uri: string;
    title: string;
  };
  web?: {
    uri: string;
    title: string;
  };
}

export enum TransportMode {
  BUS = 'Bus',
  CAB = 'Cab',
  TRAIN = 'Train',
  FLIGHT = 'Flight',
  METRO = 'Metro',
  AUTO = 'Auto',
  WALK = 'Walk'
}

export interface JourneySegment {
  mode: TransportMode;
  from: string;
  to: string;
  duration: string;
  cost: string;
  instructions: string;
  transferDetails?: string; // Specific location details for changes
}

export interface RouteOption {
  id: string;
  label: string; 
  totalDuration: string;
  totalCost: string;
  segments: JourneySegment[];
  summary: string;
  efficiencyScore: number; // 1-10 rating
  whyEfficient: string;    // Narrative on why this path is better
}

export interface TravelData {
  origin: string;
  destination: string;
  routes: RouteOption[];
  comprehensiveReport: string; // Detailed narrative analysis
  proTips: string[];
  destinationWeatherInfo: string;
}

export interface TravelResponse {
  data: TravelData;
  chunks: GroundingChunk[];
}
