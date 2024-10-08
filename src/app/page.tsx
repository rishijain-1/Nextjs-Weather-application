import Navbar from "@/components/Navbar";
import HeroSection from '@/components/HeroSection'
import WeatherReport from '@/components/WeatherReport'
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar/>
      <HeroSection/>
      <WeatherReport />
      <Footer />
    </div>
  );
}
