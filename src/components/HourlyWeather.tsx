
import React from 'react';

interface HourlyWeatherProps {
  time: string;
  temperature: number;
  icon: React.ReactNode;
}

const HourlyWeather: React.FC<HourlyWeatherProps> = ({ time, temperature, icon }) => {
  const date = new Date(time);

  // Extract the hour part and format it (e.g., 2 PM)
  const hours = date.getHours();
  const formattedTime = hours > 12 ? `${hours - 12} PM` : `${hours} AM`;

  return (
    <div className="flex flex-col justify-center items-center md:px-7">
      <div className="text-sm w-16 text-center ">{formattedTime}</div>
      <div className="w-8 h-8 md:w-10 md:h-10">{icon}</div>
      <div className="text-sm ">{temperature}°</div>
    </div>
  );
};


export default HourlyWeather;
