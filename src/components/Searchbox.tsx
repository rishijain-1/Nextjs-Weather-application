"use client";
import React, { useState } from 'react';
import { IoSearch } from 'react-icons/io5';

interface Suggestion {
  city: string;
  state: string;
  country: string;
  formatted: string;
}

type Props = {
  onLocationSelect: (location: { city: string; state: string; country: string }) => void;
};

export default function Searchbox({ onLocationSelect }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 2) {
      try {
        const response = await fetch(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&format=json&apiKey=07a421da47de4677978182f0c6246538`
        );
        const data = await response.json();
        setSuggestions(data.results.map((result: any) => ({
          city: result.city || result.locality,
          state: result.state || result.region,
          country: result.country,
          formatted: result.formatted,
        })));
      } catch (error) {
        console.error("Error fetching autocomplete suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (suggestion: Suggestion) => {
    setSearchQuery(suggestion.formatted);
    setSuggestions([]);
    onLocationSelect({
      city: suggestion.city,
      state: suggestion.state,
      country: suggestion.country,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      const selectedSuggestion = suggestions.find(s => s.formatted === searchQuery);
      if (selectedSuggestion) {
        onLocationSelect({
          city: selectedSuggestion.city,
          state: selectedSuggestion.state,
          country: selectedSuggestion.country,
        });
      }
    }
  };

  return (
    <div className="relative">
      <form className="flex items-center justify-center h-10" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search location..."
          value={searchQuery}
          onChange={handleInputChange}
          className="px-4 py-2 w-[230px] border border-gray-300 rounded-1-md focus:outline-none focus:border-blue-500 h-full"
        />
        <button className="px-4 py-[9px] bg-blue-500 text-white rounded-r-md focus:outline-none hover:bg-blue-600 whitespace-nowrap h-full">
          <IoSearch />
        </button>
      </form>
      {suggestions.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 z-10">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSelect(suggestion)}
            >
              {suggestion.formatted}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
