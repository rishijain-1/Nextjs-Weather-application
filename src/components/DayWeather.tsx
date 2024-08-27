// components/DayWeather.tsx
"use client";
import React from 'react';
import HourlyWeather from './HourlyWeather';

type DayWeatherProps = {
    date: string;
    maxTemp: number;
};

const DayWeather: React.FC<DayWeatherProps> = ({ date, maxTemp}) => {
    return (
        <div className="p-4 bg-white rounded-md shadow-md flex flex-col justify-center items-center">
            <div className="text-lg font-bold">{new Date(date).toLocaleDateString('en-US', { weekday: 'long' })}</div>
            <div className="text-sm mb-2">{new Date(date).toLocaleDateString('en-US')}</div>
            <div className="text-3xl font-bold">{maxTemp}°</div>
            
        </div>
    );
};

export default DayWeather;
