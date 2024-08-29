'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HeroSection() {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const router = useRouter();

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setQuery(query);

        if (query.length > 2) { 
            const response = await fetch(
                `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&format=json&apiKey=07a421da47de4677978182f0c6246538`
            );
            const data = await response.json();
            const filteredSuggestions = data.results.filter(
                (result: any) => result.country === 'India'
            );
            setSuggestions(filteredSuggestions || []);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion: any) => {
        const { city, state, country } = suggestion;
        router.push(`/cityWeather?city=${city}&state=${state || suggestion.county}&country=${country}`);
    };

    return (
        <div className="w-full h-1/2 pb-9 bg-cover bg-center">
            <div className="text-2xl font-bold p-3 text-center">Weather App</div>
            <div className="flex items-center justify-center h-full">
                <div className="bg-yellow-300 p-9 rounded-lg shadow-lg max-w-2xl w-full">
                    <input
                        type="search"
                        placeholder="Search Location.."
                        value={query}
                        onChange={handleSearch}
                        className="w-full p-4 border border-gray-300 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {suggestions.length > 0 && (
                        <ul className="bg-white border border-gray-300 rounded-lg mt-2 max-h-40 overflow-y-auto">
                            {suggestions.map((suggestion: any, index: number) => (
                                <li 
                                    key={index} 
                                    className="p-2 cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSuggestionClick(suggestion)}
                                >
                                    {suggestion.city}, {suggestion.state || suggestion.county}, {suggestion.country}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
