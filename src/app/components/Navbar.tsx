"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchCitySuggestions } from "../utils/cityServiceApi"; // Import the external fetch function

export default function Navbar() {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState<{ name: string; country: string }[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;
    router.push(`/?city=${encodeURIComponent(city)}`);
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCity(value);
    if (value.trim()) {
      const cities = await fetchCitySuggestions(value); // Use the external fetch function
      setSuggestions(cities);
      setShowSuggestions(cities.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: { name: string; country: string }) => {
    const selectedCity = `${suggestion.name}${suggestion.country ? `, ${suggestion.country}` : ""}`;
    setCity(selectedCity);
    setShowSuggestions(false);
    handleSearch({ preventDefault: () => {} } as React.FormEvent); // Trigger search
  };

  return (
    <nav className="bg-blue-300 text-white p-4 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row gap-4 md:items-center">
        {/* Logo */}
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold hover:text-blue-100 transition-colors">
            WeatherApp
          </Link>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative flex-1 flex gap-2">
          <div className="relative w-full">
            <input
              type="text"
              className="flex-1 px-4 py-2 rounded-full bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
              placeholder="Buscar ciudad..."
              value={city}
              onChange={handleInputChange}
              aria-label="Ciudad para pronóstico del clima"
              onFocus={() => setShowSuggestions(suggestions.length > 0)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // Delay to allow click on suggestions
            />
            {showSuggestions && (
              <ul className="absolute z-10 bg-white text-gray-800 rounded-lg shadow-md mt-2 w-full max-h-40 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.name}
                    {suggestion.country ? `, ${suggestion.country}` : ""}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            type="submit"
            className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-blue-100 transition-colors flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            Buscar
          </button>
        </form>

        {/* Navigation Links */}
        <div className="flex justify-center md:justify-end gap-4">
          <Link href="/" className="hover:text-blue-100 transition-colors px-3 py-1 rounded-md">
            Inicio
          </Link>
          <Link href="/about" className="hover:text-blue-100 transition-colors px-3 py-1 rounded-md">
            Acerca
          </Link>
          <Link href="/contact" className="hover:text-blue-100 transition-colors px-3 py-1 rounded-md">
            Contacto
          </Link>
        </div>
      </div>
    </nav>
  );
}