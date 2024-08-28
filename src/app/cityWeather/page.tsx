// app/cityWeather/page.tsx

import Forecast from '@/components/Forcast';
import Loading from '@/components/Loader/Loading';
import TodayWeather from '@/components/TodayWeather';
import { WeatherHistory } from '@/components/WeatherHistory';
import { fetchAlertsWeatherData, fetchForcastWeather, fetchHistoryWeatherData, fetchWeatherData } from '@/lib/utils';




export default async function CityWeather({ searchParams }: { searchParams: { city?: string; state?: string; country?: string } }) {
    const LocationData = {
        city: searchParams.city,
        state: searchParams.state,
        country: searchParams.country
      } as Record<string, string> | null;
     

   
  

  return (
    <div>
       
        <h1>hello</h1>
    </div>
  );
}
