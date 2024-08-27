"use client";
import React, { useEffect, useState } from "react";
import HourlyWeather from "./HourlyWeather";
import Loading from "./Loader/Loading";
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


interface WeatherData {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  hourly_units: HourlyUnits;
  hourly: HourlyData;
  daily_units: DailyUnits;
  daily: DailyData;
}

interface HourlyUnits {
  time: string;
  temperature_2m: string;
  relative_humidity_2m: string;
  precipitation_probability: string;
  precipitation: string;
  visibility: string;
  wind_speed_10m: string;
  wind_speed_80m: string;
}

interface HourlyData {
  time: string[];
  temperature_2m: number[];
  relative_humidity_2m: number[];
  precipitation_probability: number[];
  precipitation: number[];
  visibility: number[];
  wind_speed_10m: number[];
  wind_speed_80m: number[];
}

interface DailyUnits {
  time: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
  sunrise: string;
  sunset: string;
  uv_index_max: string;
}

interface DailyData {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  sunrise: string[];
  sunset: string[];
  uv_index_max: number[];
}


export default function TodayWeather({}: Props) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState({ city: "", state: "", country: "" });
  const [Alertupdate,setAlertupdate] = useState<WeatherCondition|null>(null);

    useEffect(() => {
      const loadLocationAndWeather = async () => {
        try {
          const locationData = await fetchUserLocation();
          setLocation(locationData);
          const data = await fetchWeatherData(locationData.city, locationData.state, locationData.country);
          setWeatherData(data);
          const message = await fetchWeatherAlert(locationData.city, locationData.state, locationData.country);
          console.log(message);
          setAlertupdate(message);
        } catch (error) {
          console.error(error);
        }
      };
  
      loadLocationAndWeather();
    }, []);

    if (!weatherData)  return <div className="flex justify-center items-center h-screen"><Loading/></div>;

  const currentTemperature = weatherData.hourly.temperature_2m[0];
  const minTemperature = weatherData.daily.temperature_2m_min[0];
  const maxTemperature = weatherData.daily.temperature_2m_max[0];
  const currentDate=weatherData.daily.time[0];
  const weatherDescription = "Partly Cloudy"; 

  return (
    <div className="p-4 space-y-4 bg-gray-100">
      <div className="text-2xl font-bold mb-7">
        <span className="border-b-4 border-black">Today <span className="text-yellow-400">{location.city}</span> Weather</span>
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
              {weatherData.hourly.time.map((time, index) => {
                const temp = weatherData.hourly.temperature_2m[index];
                const icon = weatherData.hourly.precipitation[index] > 0 ? <CloudRainIcon className="w-8 h-8" /> : <CloudIcon className="w-8 h-8" />;
                return (
                  <HourlyWeather key={index} time={time} temperature={temp} icon={icon} />
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="p-4 bg-white rounded-md shadow-md">
          <div className="text-lg text-white bg-red-600 text-center rounded-md">Alert</div>
          <div className="text-lg font-bold text-center mb-2">{Alertupdate?.text}</div>
          {Alertupdate?.icon && (
              <img
                src={`https:${Alertupdate.icon}`} 
                alt={Alertupdate?.text}
                className="w-16 h-16 mx-auto"
              />
            )}
        </div>
        <div className="col-span-2 p-4 bg-yellow-300 rounded-md shadow-md">
          <div className="grid grid-cols-6 text-center">
            <div>
              <div className="text-sm">Visibility</div>
              <EyeIcon className="w-8 h-8 mx-auto" />
              <div>{weatherData.hourly.visibility[0] / 1000} km</div>
            </div>
            <div>
              <div className="text-sm">Humidity</div>
              <DropletIcon className="w-8 h-8 mx-auto" />
              <div>{weatherData.hourly.relative_humidity_2m[0]}%</div>
            </div>
            <div>
              <div className="text-sm">Wind speed</div>
              <WindIcon className="w-8 h-8 mx-auto" />
              <div>{weatherData.hourly.wind_speed_10m[0]} km/h</div>
            </div>
            <div>
              <div className="text-sm">Air Pressure</div>
              <GaugeIcon className="w-8 h-8 mx-auto" />
              <div>1013 hPa</div> 
            </div>
            <div>
              <div className="text-sm">Sunrise</div>
              <SunsetIcon className="w-8 h-8 mx-auto" />
              <div>{weatherData.daily.sunrise[0]}</div>
            </div>
            <div>
              <div className="text-sm">Sunset</div>
              <SunsetIcon className="w-8 h-8 mx-auto" />
              <div>{weatherData.daily.sunset[0]}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}
