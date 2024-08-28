import React from 'react';
import DayWeather from './DayWeather';

// Define the type for hourly weather data
interface HourlyWeatherData {
    time: string;
    temprature_2m: number;
    precipitation_probability: number;
    precipitation: number;
  }
  
  // Define the type for daily weather data
  interface DailyWeatherData {
    time: string;
    temprature_2m: number;
  }
  
  // Define the type for the overall weather object
  interface WeatherData {
    latitude: number;
    longitude: number;
    timezone: string;
    hourly: HourlyWeatherData[];
    daily: DailyWeatherData[];
  }
  
type Props = {
    HistoryWeatherData: WeatherData;
};

export const WeatherHistory = ({ HistoryWeatherData }: Props) => {
    return (
        <div className="p-4 space-y-4 bg-gray-100">
            <div className="text-2xl font-bold mb-7">
                7-Days Weather History
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7">
           { HistoryWeatherData.daily.map((date,index) => {
                    return(<DayWeather
                        key={index}
                        date={date.time}
                        maxTemp={date.temprature_2m} // Updated to match the corrected data property name
                    />)
})}
            </div>
        </div>
    );
};
