"use server"

import React, { useEffect, useState } from "react";
import HourlyWeather from "./HourlyWeather";
import CloudIcon from "./icons/CloudIcon";
import CloudRainIcon from "./icons/CloudRainIcon";
import DropletIcon from "./icons/DropletIcon";
import EyeIcon from "./icons/EyeIcon";
import GaugeIcon from "./icons/GaugeIcon";
import SunsetIcon from "./icons/SunsetIcon";
import WindIcon from "./icons/WindIcon";
import { fetchWeatherData } from "@/api/TodayWeatherApi";
import { fetchUserLocation } from "@/api/DefaultUserLocationApi";
import { fetchWeatherAlert } from "@/api/AlertApi";


type Props = {};

interface WeatherCondition {
  text: string;
  icon: string;
  code: number;
}

type WeatherData = {
  latitude: number;
  longitude: number;
  timezone: string;
  elevation: number;
  hourly: {
      time: string;
      temperature: number;
      humidity: number;
      precipitation_probability: number;
      precipitation: number;
      visibility: number;
      wind_speed_10m: number;
      wind_speed_80m: number;
  }[];
  daily: {
      date: string;
      max_temperature: number;
      min_temperature: number;
      sunrise: string;
      sunset: string;
      uv_index_max: number;
  };
};

export default async function TodayWeather({}: Props) {
  let loading:boolean = false;
  const locationData = await fetchUserLocation();
  loading = true;
  const weatherData = await fetchWeatherData(locationData.city, locationData.state, locationData.country);
  const alertUpdate = await fetchWeatherAlert(locationData.city, locationData.state, locationData.country);

  if (!weatherData)  return <div className="flex justify-center items-center h-screen"><h1>No data Found</h1></div>;

  const currentTemperature = weatherData.hourly[0].temperature;
  const minTemperature = weatherData.daily.min_temperature;
  const maxTemperature = weatherData.daily.max_temperature;
  const currentDate=weatherData.hourly[0].temperature;
  const weatherDescription = "Partly Cloudy"; 

  return (
    <div className="p-4 space-y-4 bg-gray-100">
      <div className="text-2xl font-bold mb-7">
        <span className="border-b-4 border-black">Today <span className="text-yellow-400">{locationData.city}</span> Weather</span>
      </div>
      <div className="text-2xl flex flex-row font-bold">
        <span className="text-2xl ">{new Date(currentDate).toLocaleDateString('en-US', { weekday: 'long' })}</span>
        <div className="text-lg mt-1 px-2">{new Date(currentDate).toLocaleDateString('en-US')}</div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 items-center">
        <div className="p-5 bg-white rounded-md shadow-md flex flex-col justify-center items-center">
          <div className="text-5xl font-bold">{currentTemperature}°</div>
          <div className="text-sm">Feels like {currentTemperature}°</div>
          <div className="text-sm">
            {minTemperature}° ↓ {maxTemperature}° ↑
          </div>
        </div>
        <div className="col-span-2 p-2 bg-white rounded-md shadow-md">
          <div className="overflow-x-auto">
            <div className="flex">
                            {weatherData.hourly.map((hour: { time: string; temperature: number; precipitation: number; }, index: React.Key | null | undefined) => {
                    const time = hour.time; // Extract the time for the current hour
                    const temp = hour.temperature; // Extract the temperature for the current hour
                    const icon = hour.precipitation > 0 
                        ? <CloudRainIcon className="w-8 h-8" /> 
                        : <CloudIcon className="w-8 h-8" />; // Determine the icon based on precipitation

                    return (
                        <HourlyWeather 
                            key={index} 
                            time={time} 
                            temperature={temp} 
                            icon={icon} 
                        />
                    );
                })}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        
        <div className="col-span-2 p-4 bg-yellow-300 rounded-md shadow-md">
          <div className="grid grid-cols-6 text-center">
            <div>
              <div className="text-sm">Visibility</div>
              <EyeIcon className="w-8 h-8 mx-auto" />
              <div>{weatherData.hourly[0].visibility / 1000} km</div>
            </div>
            <div>
              <div className="text-sm">Humidity</div>
              <DropletIcon className="w-8 h-8 mx-auto" />
              <div>{weatherData.hourly[0].humidity}%</div>
            </div>
            <div>
              <div className="text-sm">Wind speed</div>
              <WindIcon className="w-8 h-8 mx-auto" />
              <div>{weatherData.hourly[0].wind_speed_10m} km/h</div>
            </div>
            <div>
              <div className="text-sm">Air Pressure</div>
              <GaugeIcon className="w-8 h-8 mx-auto" />
              <div>1013 hPa</div> 
            </div>
            <div>
              <div className="text-sm">Sunrise</div>
              <SunsetIcon className="w-8 h-8 mx-auto" />
              <div>{weatherData.daily.sunrise}</div>
            </div>
            <div>
              <div className="text-sm">Sunset</div>
              <SunsetIcon className="w-8 h-8 mx-auto" />
              <div>{weatherData.daily.sunset}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}
