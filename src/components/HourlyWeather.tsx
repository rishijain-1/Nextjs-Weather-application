
import React from 'react';

interface HourlyWeatherProps {
  time: string;
  temperature: number;
  icon: React.ReactNode;
}

const HourlyWeather: React.FC<HourlyWeatherProps> = ({ time, temperature, icon }) => {
  return (
    <div className="flex flex-col items-center p-2">
      <div className="text-sm">{time}</div>
      <div className="w-8 h-8">{icon}</div>
      <div className="text-sm">{temperature}°</div>
    </div>
  );
};

export default HourlyWeather;
