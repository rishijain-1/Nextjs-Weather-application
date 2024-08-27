// components/Forecast.tsx
"use client";
import React, { useEffect, useState } from 'react';
import DayWeather from './DayWeather'; // Adjust the import path if necessary
import HourlyWeather from './HourlyWeather';
import CloudRainIcon from './icons/CloudRainIcon';
import CloudIcon from './icons/CloudIcon';
import Loading from './Loader/Loading';
import { fetchForecastWeather } from '@/api/ForcastApi';
import { fetchUserLocation } from '@/api/DefaultUserLocationApi';

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
        const fetchuserLocation = async()=>{
            const location = await fetchUserLocation();
            setLocation(location);
            const data = await fetchForecastWeather(location.city,location.state,location.country);
            setForecastWeatherData(data);
        }

        fetchuserLocation();
    }, []);

    if (!forecastWeatherData) {
        return <div><Loading/></div>;
    }

    // function to group hourly data by date
    const groupHourlyDataByDate = () => {
        const groupedData: { [date: string]: { time: string; temperature: number; precipitation: number }[] } = {};

        forecastWeatherData.hourly.time.forEach((time, index) => {
            const date = time.split("T")[0]; // Extract the date part (YYYY-MM-DD)
            const temperature = forecastWeatherData.hourly.temperature_2m[index];
            const precipitation = forecastWeatherData.hourly.precipitation[index];

            if (!groupedData[date]) {
                groupedData[date] = [];
            }

            groupedData[date].push({
                time,
                temperature,
                precipitation,
            });
        });

        return groupedData;
    };

    const groupedHourlyData = groupHourlyDataByDate();

    return (
        <div className="p-4 space-y-4 bg-gray-100">
            <div className="text-2xl font-bold mb-7">
                14-Day Weather Forecast
            </div>
            <div className="grid grid-col-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2">
                {forecastWeatherData.daily.time.map((date, index) => (
                    <div key={index}>
                        <DayWeather
                            date={date}
                            maxTemp={forecastWeatherData.daily.temperature_2m_max[index]}
                        />
                        <div className="col-span-2 p-4 bg-yellow-200 rounded-md shadow-md">
                            <div className="overflow-x-auto">
                                <div className="flex">
                                    {groupedHourlyData[date]?.map((hourData, hourIndex) => {
                                        const icon = hourData.precipitation > 0
                                            ? <CloudRainIcon className="w-8 h-8" />
                                            : <CloudIcon className="w-8 h-8" />;
                                        
                                        return (
                                            <HourlyWeather
                                                key={hourIndex}
                                                time={hourData.time}
                                                temperature={hourData.temperature}
                                                icon={icon}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Forecast;
