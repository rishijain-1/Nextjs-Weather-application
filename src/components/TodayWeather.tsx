import React from "react";
import HourlyWeather from "./HourlyWeather";
import CloudIcon from "./icons/CloudIcon";
import CloudRainIcon from "./icons/CloudRainIcon";
import DropletIcon from "./icons/DropletIcon";
import EyeIcon from "./icons/EyeIcon";
import GaugeIcon from "./icons/GaugeIcon";
import SunsetIcon from "./icons/SunsetIcon";
import WindIcon from "./icons/WindIcon";

type Props = {
    weatherData: WeatherData;
    locationData: Record<string, string>;
    alertData: alertData;
};

type alertData = {
    message: string;
};

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

export default function TodayWeather({ weatherData, locationData, alertData }: Props) {
    if (!weatherData) {
        return <div className="flex justify-center items-center h-screen"><h1>No data Found</h1></div>;
    }

    const currentTemperature = weatherData.hourly[0].temperature;
    const minTemperature = weatherData.daily.min_temperature;
    const maxTemperature = weatherData.daily.max_temperature;
    const currentDate = weatherData.daily.date;
    const sunrise = weatherData.daily.sunrise.split('T')[1];
    const sunset = weatherData.daily.sunset.split('T')[1];

    return (
        <div className="p-4 space-y-4 bg-gray-100">
            {alertData.message && alertData.message !== 'No alert found' && (
                <div className="p-4 bg-red-200 text-red-800 border border-red-300 rounded-md">
                    {alertData.message}
                </div>
            )}
            <div className="text-2xl flex flex-col md:flex-row font-bold text-center md:text-left">
                <span className="">{new Date(currentDate).toLocaleDateString('en-US', { weekday: 'long' })}</span>
                <div className="text-lg mt-1 md:mt-0 md:px-2">{new Date(currentDate).toLocaleDateString('en-US')}</div>
            </div>
            <div className="text-2xl font-bold mb-7 text-center md:text-left">
                <span className="border-b-4 border-black">Today <span className="text-yellow-400">{locationData.city}</span> Weather</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 items-center">
                <div className="p-5 bg-white rounded-md shadow-md flex flex-col justify-center items-center">
                    <div className="text-5xl font-bold">{currentTemperature}°</div>
                    <div className="text-sm">Feels like {currentTemperature}°</div>
                    <div className="text-sm">
                        {minTemperature}° ↓ {maxTemperature}° ↑
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-yellow-300 rounded-md shadow-md">
                    <div className="col-span-2 w-full md:col-span-7 p-4">
                        <div className="grid grid-cols-3 md:grid-cols-6 text-center gap-2">
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
                                <div>{sunrise}</div>
                            </div>
                            <div>
                                <div className="text-sm">Sunset</div>
                                <SunsetIcon className="w-8 h-8 mx-auto" />
                                <div>{sunset}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-2 p-2 bg-white rounded-md shadow-md">
                <div className="overflow-x-auto">
                    <div className="flex">
                        {weatherData.hourly.map((hour, index) => {
                            const time = hour.time;
                            const temp = hour.temperature;
                            const icon = hour.precipitation > 0 
                                ? <CloudRainIcon className="w-8 h-8" /> 
                                : <CloudIcon className="w-8 h-8" />;

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
    );
}
