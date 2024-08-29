// app/cityWeather/page.tsx

import Footer from '@/components/footer';
import Forecast from '@/components/Forcast';
import Navbar from '@/components/Navbar';
import TodayWeather from '@/components/TodayWeather';
import { WeatherHistory } from '@/components/WeatherHistory';
import { fetchAlertsWeatherData, fetchForcastWeather, fetchHistoryWeatherData, fetchWeatherData } from '@/lib/utils';




export default async function CityWeather({ searchParams }: { searchParams: { city?: string; state?: string; country?: string } }) {
    const LocationData = {
        city: searchParams.city,
        state: searchParams.state,
        country: searchParams.country
      } as Record<string, string> | null;
     

    const weatherData = await fetchWeatherData({type: 'locality', data: LocationData});
    const forecastWeatherData = await fetchForcastWeather({type: 'locality', data: LocationData});
    const historyWeatherData= await fetchHistoryWeatherData({type: 'locality', data:LocationData})
   const alertWeatherData = await fetchAlertsWeatherData({type: 'locality',data:LocationData})
   
  

  return (
    <div>
      <Navbar/>
      <div className="p-4">
        
          {LocationData && (
              <TodayWeather 
                  weatherData={weatherData} 
                  locationData={LocationData} 
                  alertData={alertWeatherData}
              />
          )}
          <Forecast forecastWeatherData={forecastWeatherData} />
          <WeatherHistory historyWeatherData={historyWeatherData} />
          
      </div>
      <Footer/>
    </div>
  );
}
