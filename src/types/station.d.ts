export interface Station {
  name: string;
  latitude: number;
  longitude: number;
  daily_passengers: number;
  attractions: Attraction[];
}

export interface Attraction {
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  distance: number;
  image_url: string;
}

export interface GreetingType {
  greeting: string;
  recommendations: Recommendation[];
  suggested_questions: string[];
}

export interface Recommendation {
  name: string;
  description: string;
  image_url: string;
  distance: number;
  time: number;
}
