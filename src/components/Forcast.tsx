import React from 'react';
import DayWeather from './DayWeather';
import HourlyWeather from './HourlyWeather';
import CloudRainIcon from './icons/CloudRainIcon';
import CloudIcon from './icons/CloudIcon';

type ForecastWeatherData = {
  latitude: number;
  longitude: number;
  timezone: string;
  hourly: HourlyWeather[];
  daily: DailyWeather[];
};

type HourlyWeather = {
  time: string; // ISO 8601 format date-time string
  temprature_2m: number;
  precipitation_probability: number;
  precipitation: number;
};

type DailyWeather = {
  time: string; // Date string in format 'YYYY-MM-DD'
  temprature_2m: number;
};


type Props = {
  forecastWeatherData: ForecastWeatherData;
};

const Forecast = ({ forecastWeatherData }: Props) => {
  // Function to group hourly data by date
  const groupHourlyDataByDate = () => {
    const groupedData: { [date: string]: { time: string; temperature: number; precipitation: number }[] } = {};

    forecastWeatherData.hourly.forEach((hourData) => {
      const date = hourData.time.split('T')[0];
      const time = hourData.time.split('T')[1].split('+')[0];
      const temperature = hourData.temprature_2m;
      const precipitation = hourData.precipitation;

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
      <div className="text-2xl font-bold mb-7">14-Day Weather Forecast</div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2">
        {forecastWeatherData.daily.map((day, index) => {
          const hourlyDataForDay = groupedHourlyData[day.time] || [];

          return (
            <div key={index}>
              <DayWeather date={day.time} maxTemp={day.temprature_2m} />
              <div className="col-span-2 p-4 bg-yellow-200 rounded-md shadow-md">
                <div className="overflow-x-auto">
                  <div className="flex">
                    {hourlyDataForDay.map((hourData, hourIndex) => {
                      const icon =
                        hourData.precipitation > 0 ? (
                          <CloudRainIcon className="w-8 h-8" />
                        ) : (
                          <CloudIcon className="w-8 h-8" />
                        );

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
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;
