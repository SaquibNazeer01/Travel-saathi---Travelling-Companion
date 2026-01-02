
import React, { useState } from 'react';
import { LatLng } from '../types';

const POPULAR_CITIES = [
  "New Delhi", "Mumbai", "Bangalore", "Hyderabad", "Chennai", 
  "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Lucknow", "Goa"
];

interface TravelFormProps {
  onSearch: (origin: string, destination: string, location?: LatLng) => void;
  isLoading: boolean;
}

export const TravelForm: React.FC<TravelFormProps> = ({ onSearch, isLoading }) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [useCurrentLoc, setUseCurrentLoc] = useState(false);
  const [showOriginSuggestions, setShowOriginSuggestions] = useState(false);
  const [showDestSuggestions, setShowDestSuggestions] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (useCurrentLoc) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = { latitude: pos.coords.latitude, longitude: pos.coords.longitude };
          onSearch('My Current Location', destination, coords);
        },
        () => onSearch(origin, destination)
      );
    } else {
      onSearch(origin, destination);
    }
  };

  const swapPlaces = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-3xl shadow-xl border border-slate-100 relative">
        <div className="space-y-2 relative">
          <label className="text-xs font-bold text-slate-400 uppercase ml-2 tracking-wider">From</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-indigo-500">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <input
              type="text"
              placeholder="Enter city or current location"
              className="w-full pl-11 pr-24 py-4 rounded-2xl border-2 border-slate-50 focus:border-indigo-500 bg-slate-50 focus:bg-white outline-none transition-all"
              value={useCurrentLoc ? '📍 My Current Location' : origin}
              onChange={(e) => { setOrigin(e.target.value); setShowOriginSuggestions(true); }}
              onFocus={() => setShowOriginSuggestions(true)}
              onBlur={() => setTimeout(() => setShowOriginSuggestions(false), 200)}
              disabled={useCurrentLoc || isLoading}
              required={!useCurrentLoc}
            />
            <button
              type="button"
              onClick={() => setUseCurrentLoc(!useCurrentLoc)}
              className={`absolute inset-y-0 right-0 px-4 text-xs font-bold transition-colors ${useCurrentLoc ? 'text-indigo-600' : 'text-slate-400 hover:text-indigo-500'}`}
            >
              {useCurrentLoc ? 'CHANGE' : 'USE GPS'}
            </button>
            {showOriginSuggestions && !useCurrentLoc && (
              <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden">
                {POPULAR_CITIES.filter(c => c.toLowerCase().includes(origin.toLowerCase())).map(city => (
                  <button key={city} type="button" onMouseDown={() => setOrigin(city)} className="w-full text-left px-4 py-3 hover:bg-slate-50 text-slate-700 font-medium border-b border-slate-50 last:border-0">{city}</button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center -my-3 relative z-10">
          <button 
            type="button" 
            onClick={swapPlaces}
            className="w-10 h-10 bg-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center hover:rotate-180 transition-all duration-300 active:scale-90"
          >
            <i className="fas fa-exchange-alt rotate-90"></i>
          </button>
        </div>

        <div className="space-y-2 relative">
          <label className="text-xs font-bold text-slate-400 uppercase ml-2 tracking-wider">To</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-emerald-500">
              <i className="fas fa-location-arrow"></i>
            </div>
            <input
              type="text"
              placeholder="Destination city"
              className="w-full pl-11 pr-4 py-4 rounded-2xl border-2 border-slate-50 focus:border-emerald-500 bg-slate-50 focus:bg-white outline-none transition-all"
              value={destination}
              onChange={(e) => { setDestination(e.target.value); setShowDestSuggestions(true); }}
              onFocus={() => setShowDestSuggestions(true)}
              onBlur={() => setTimeout(() => setShowDestSuggestions(false), 200)}
              disabled={isLoading}
              required
            />
            {showDestSuggestions && (
              <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden">
                {POPULAR_CITIES.filter(c => c.toLowerCase().includes(destination.toLowerCase())).map(city => (
                  <button key={city} type="button" onMouseDown={() => setDestination(city)} className="w-full text-left px-4 py-3 hover:bg-slate-50 text-slate-700 font-medium border-b border-slate-50 last:border-0">{city}</button>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-5 bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white font-extrabold rounded-2xl shadow-xl shadow-indigo-100 transition-all flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          {isLoading ? (
            <><i className="fas fa-compass fa-spin text-2xl"></i> <span>TRAVELSAATHI IS PLANNING YOUR TRIP...</span></>
          ) : (
            <>
              <span>FIND BEST ROUTES</span>
              <i className="fas fa-chevron-right group-hover:translate-x-1 transition-transform"></i>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
