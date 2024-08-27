"use client"

import React, { useEffect, useState } from 'react'
import DayWeather from './DayWeather';
import Loading from './Loader/Loading';
import { fetchHistoryWeather } from '@/api/HistoryApi';
import { fetchUserLocation } from '@/api/DefaultUserLocationApi';

type HistoryWeatherData = {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    hourly_units: {
        time: string;
        temperature_2m: string;
        precipitation: string;
        precipitation_probability: string;
    };
    hourly: {
        time: string[];
        temperature_2m: number[];
        precipitation: number[];
        precipitation_probability: number[];
    };
    daily_units: {
        time: string;
        temperature_2m_max: string;
    };
    daily: {
        time: string[];
        temperature_2m_max: number[];
    };
};


export const WeatherHistory = () => {
    
        const [HistoryWeatherData, setHistoryWeatherData] = useState<HistoryWeatherData|null>(null);
        const [location, setLocation] = useState({ city: "", state: "", country: "" });

    
        useEffect(() => {
            const Defaultuserlocation=async()=>{
                const location = await fetchUserLocation();
                setLocation(location);
                const data = await fetchHistoryWeather(location.city,location.state,location.country);
                setHistoryWeatherData(data);
            }
            Defaultuserlocation();
        }, []);
        if(!HistoryWeatherData){
            return <div><Loading/></div>
        }
        return (
            <div className="p-4 space-y-4 bg-gray-100">
            <div className="text-2xl font-bold mb-7">
                7-Days Weather History
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7">  
                {HistoryWeatherData?.daily.time.map((date, index) => {
                    return(<DayWeather
                        key={index}
                        date={date}
                        maxTemp={HistoryWeatherData.daily.temperature_2m_max[index-1]}
                    />
                )
                })}
            </div>
        </div>
  )
    }
  

