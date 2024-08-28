export interface WeatherCondition {
    text: string;
    icon: string;
    code: number;
  }
  
  
  // types/weather.ts
  
  export interface HourlyWeather {
    time: string; // ISO 8601 format
    temperature: number;
    humidity: number;
    precipitation_probability: number;
    precipitation: number;
    visibility: number;
    wind_speed_10m: number;
    wind_speed_80m: number;
  }
  
  export interface DailyWeather {
    date: string; // ISO 8601 format
    max_temperature: number;
    min_temperature: number;
    sunrise: string; // ISO 8601 format
    sunset: string; // ISO 8601 format
    uv_index_max: number;
  }
  
  export interface WeatherData {
    latitude: number;
    longitude: number;
    timezone: string;
    elevation: number;
    hourly: HourlyWeather[];
    daily: DailyWeather;
  }
  
  