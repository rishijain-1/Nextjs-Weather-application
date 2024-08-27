// components/Forecast.tsx
"use client";
import React, { useEffect, useState } from 'react';
import DayWeather from './DayWeather'; // Adjust the import path if necessary
import HourlyWeather from './HourlyWeather';
import CloudRainIcon from './icons/CloudRainIcon';
import CloudIcon from './icons/CloudIcon';
import Loading from './Loader/Loading';

type DailyWeatherData = {
    time: string[];
    temperature_2m_max: number[];
};


interface HourlyData {
    time: string[]; // ISO8601 formatted strings
    temperature_2m: number[]; // Temperature in °C
    precipitation_probability: number[]; // Probability in %
    precipitation: number[]; // Precipitation in mm
}

// Define an interface for the hourly units
interface HourlyUnits {
    time: string; // Units for time
    temperature_2m: string; // Units for temperature
    precipitation_probability: string; // Units for precipitation probability
    precipitation: string; // Units for precipitation
}

// Define an interface for the main weather data structure
interface ForcastWeatherData {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    hourly_units: HourlyUnits;
    hourly: HourlyData;
    daily: DailyWeatherData;
}

const Forecast: React.FC = () => {
    const [forecastWeatherData, setForecastWeatherData] = useState<ForcastWeatherData | null>(null);
    const [location, setLocation] = useState({ city: "", state: "", country: "" });

    useEffect(() => {
        const fetchData = async (city: string, state: string, country: string) => {
            try {
                const response = await fetch(`http://165.22.215.22/api/forecast`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        city,
                        state,
                        country,
                    }),
                });

                const data: ForcastWeatherData = await response.json();
                console.log(data);
                setForecastWeatherData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        const fetchLocation = () => {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                
                try {
                  const geocodeResponse = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
                  const geocodeData = await geocodeResponse.json();
                  const city = geocodeData.city;
                  const state = geocodeData.principalSubdivision;
                  const country = geocodeData.countryName;
      
                  setLocation({ city, state, country });
                  console.log(city,state,country);
                  fetchData(city, state, country);
                } catch (error) {
                  console.error("Error fetching location data:", error);
                }
              });
            } else {
              console.error("Geolocation is not supported by this browser.");
            }
          };


        fetchLocation();
    }, []);

    if (!forecastWeatherData) {
        return <div><Loading/></div>;
    }

    

    return (
        <div className="p-4 space-y-4 bg-gray-100">
            <div className="text-2xl font-bold mb-7">
                14-Day Weather Forecast
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7">  
                {forecastWeatherData.daily.time.map((date, index) => {
                    return(<DayWeather
                        key={index}
                        date={date}
                        maxTemp={forecastWeatherData.daily.temperature_2m_max[index]}
                    />
                )
                })}
            </div>
        </div>
    );
};


export default Forecast;


//for forcast daily temp
/**<div className="col-span-2 p-4 bg-white rounded-md shadow-md">
<div className="overflow-x-auto">
    <div className="flex">
        {
            forecastWeatherData.hourly.time.map((time, index) => {
                const temp = forecastWeatherData.hourly.temperature_2m[index];
                const icon = forecastWeatherData.hourly.precipitation[index] > 0 ? <CloudRainIcon className="w-8 h-8" /> : <CloudIcon className="w-8 h-8" />;
               
                return (
                    
                    <HourlyWeather
                        key={index}
                        time={time}
                        temperature={temp}
                        icon={icon}                                    
                    />
                );
            })
        }
    </div>
</div>
</div>*/