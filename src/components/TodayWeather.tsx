"use client";
import React, { useEffect, useState } from "react";
import HourlyWeather from "./HourlyWeather";

type Props = {};

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://oo7nkv35fx.sharedwithexpose.com/api/location", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            city: "jaipur",
            state: "Rajasthan",
            country: "India",
          }),
        });

        const data = await response.json();
        console.log(data);
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!weatherData) return <div>Loading...</div>;

  const currentTemperature = weatherData.hourly.temperature_2m[0];
  const minTemperature = weatherData.daily.temperature_2m_min[0];
  const maxTemperature = weatherData.daily.temperature_2m_max[0];
  const weatherDescription = "Partly Cloudy"; // Placeholder; replace with actual weather description if available

  return (
    <div className="p-4 space-y-4 bg-gray-100">
      <div className="text-2xl font-bold mb-7">
        <span className="border-b-4 border-black">Today Weather</span>
      </div>
      <div className="text-2xl font-bold">
        Monday <span className="text-lg font-normal">(26.08.2024)</span>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 items-center">
        <div className="p-3 bg-white rounded-md shadow-md flex flex-col justify-center items-center">
          <div className="text-5xl font-bold">{currentTemperature}°</div>
          <div className="text-sm">Feels like {currentTemperature}°</div>
          <div className="text-sm">
            {minTemperature}° ↓ {maxTemperature}° ↑
          </div>
        </div>
        <div className="col-span-2 p-4 bg-white rounded-md shadow-md">
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
          <div className="text-lg font-bold">{weatherDescription}</div>
          <CloudIcon className="w-16 h-16 mx-auto" />
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
              <div>1013 hPa</div> {/* Placeholder for air pressure */}
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

  function CloudIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
      </svg>
    );
  }

  function CloudRainIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
        <path d="M16 14v6" />
        <path d="M8 14v6" />
        <path d="M12 16v6" />
      </svg>
    );
  }

  function DropletIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
      </svg>
    );
  }

  function EyeIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M21 12c-2.5 4-5.5 6-9 6s-6.5-2-9-6 4.5-6 9-6 6.5 2 9 6z" />
      </svg>
    );
  }

  function WindIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17.2 10.8a2.6 2.6 0 0 0-5.2 0c0 2.6 3.9 2.6 3.9 5.2s-3.9 2.6-3.9 0M6.1 12H17M6.1 8h9.1" />
      </svg>
    );
  }

  function GaugeIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 21C7 21 2.5 18.5 1 14 2.5 9.5 7 7 12 7s9.5 2.5 11 7c-1.5 4.5-6 7-11 7z" />
        <path d="M12 7v14M12 7l-6 6M12 7l6 6" />
      </svg>
    );
  }

  function SunsetIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 18h18M12 2v7m5-3l-5 5-5-5m-6 8h18M3 22h18" />
      </svg>
    );
  }
}
