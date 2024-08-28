// app/components/Footer.tsx

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-xl font-bold">WeatherApp</h2>
          <p className="text-sm mt-1">Your go-to source for weather updates.</p>
        </div>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
          
            <a className="text-gray-300 hover:text-gray-100">About Us</a>
         
            <a className="text-gray-300 hover:text-gray-100">Contact</a>
          
          
            <a className="text-gray-300 hover:text-gray-100">Privacy Policy</a>
       
          <a href="https://twitter.com/yourhandle" className="text-gray-300 hover:text-gray-100" target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
          <a href="https://facebook.com/yourhandle" className="text-gray-300 hover:text-gray-100" target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
        </div>
      </div>
      <div className="bg-gray-900 py-1 text-center text-xs mt-8">
        <p>© {new Date().getFullYear()} WeatherApp. All rights reserved.</p>
      </div>
    </footer>
  );
}
