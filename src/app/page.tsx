import Forcast from "@/components/Forcast";
import Navbar from "@/components/Navbar";
import TodayWeather from "@/components/TodayWeather";
import { WeatherHistory } from "@/components/WeatherHistory";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen"> 
      <Navbar/>
      <TodayWeather/>
      <Forcast/>
      <WeatherHistory/>
    </div>
  );
}
