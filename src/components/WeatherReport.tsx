import { headers } from 'next/headers';
import { fetchWeatherData,fetchForcastWeather, fetchHistoryWeatherData,fetchAlertsWeatherData } from '@/lib/utils';
import TodayWeather from './TodayWeather'; 
import Forecast from './Forcast';
import { WeatherHistory } from './WeatherHistory';

export default async function WeatherReport() {
    const headerList = headers();
    const ip = headerList.get('x-forwarded-for') || ':1'
    const isIpLocal = ['::1', ':1'].includes(ip)
   
    let locationData: Record<string, string>|null = null;

    if (!isIpLocal) {
        const response = await fetch(`https://ipinfo.io/${ip}?token=${process.env.IPINFO_API_KEY}`);
        const data = await response.json();
        locationData = {
            city: data.city,
            state: data.region,
            country: data.country,
            loc: data.loc,
        };
    }

    const weatherData = await fetchWeatherData({type: 'locality', data: locationData});
    const forecastWeatherData = await fetchForcastWeather({type: 'locality', data: locationData});
    const historyWeatherData= await fetchHistoryWeatherData({type: 'locality', data:locationData})
   const alertWeatherData = await fetchAlertsWeatherData({type: 'locality',data:locationData})

    return !isIpLocal ? (
        <div>
            {locationData && <TodayWeather weatherData={weatherData} locationData={locationData} alertData={alertWeatherData}/>}
            <Forecast forecastWeatherData={forecastWeatherData} />
            <WeatherHistory HistoryWeatherData={historyWeatherData}/>
        </div>
    ) : null;
}
