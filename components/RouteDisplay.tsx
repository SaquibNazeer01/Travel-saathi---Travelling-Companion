
import React, { useState } from 'react';
import { TravelData, GroundingChunk, TransportMode, RouteOption } from '../types';

interface RouteDisplayProps {
  data: TravelData;
  chunks: GroundingChunk[];
}

const getTransportIcon = (mode: TransportMode) => {
  switch (mode) {
    case TransportMode.BUS: return 'fa-bus';
    case TransportMode.CAB: return 'fa-car';
    case TransportMode.TRAIN: return 'fa-train';
    case TransportMode.FLIGHT: return 'fa-plane';
    case TransportMode.METRO: return 'fa-subway';
    case TransportMode.AUTO: return 'fa-taxi';
    case TransportMode.WALK: return 'fa-walking';
    default: return 'fa-route';
  }
};

const getTransportColor = (mode: TransportMode) => {
  switch (mode) {
    case TransportMode.BUS: return 'bg-blue-100 text-blue-600';
    case TransportMode.CAB: return 'bg-yellow-100 text-yellow-700';
    case TransportMode.TRAIN: return 'bg-indigo-100 text-indigo-600';
    case TransportMode.FLIGHT: return 'bg-sky-100 text-sky-600';
    case TransportMode.METRO: return 'bg-purple-100 text-purple-600';
    case TransportMode.AUTO: return 'bg-emerald-100 text-emerald-600';
    default: return 'bg-slate-100 text-slate-600';
  }
};

export const RouteDisplay: React.FC<RouteDisplayProps> = ({ data, chunks }) => {
  const [activeRouteId, setActiveRouteId] = useState(data.routes[0]?.id || '');
  const activeRoute = data.routes.find(r => r.id === activeRouteId) || data.routes[0];

  return (
    <div className="w-full max-w-6xl mx-auto mt-8 px-4 pb-32 space-y-8">
      {/* Comprehensive Expert Report */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <i className="fas fa-file-alt text-8xl text-indigo-600"></i>
        </div>
        <div className="relative z-10">
          <h3 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-3">
             <i className="fas fa-clipboard-check text-indigo-600"></i>
             Expert Logistics Report
          </h3>
          <p className="text-slate-600 leading-relaxed text-lg italic">
            "{data.comprehensiveReport}"
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Available Path Comparisons</h2>
          <p className="text-slate-500 mt-1">Multi-modal optimization for {data.origin} to {data.destination}</p>
        </div>
      </div>

      {/* Tabs / Route Selectors */}
      <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
        {data.routes.map(route => (
          <button
            key={route.id}
            onClick={() => setActiveRouteId(route.id)}
            className={`px-6 py-5 rounded-3xl flex-shrink-0 transition-all border-2 text-left min-w-[220px] relative ${
              activeRouteId === route.id 
                ? 'bg-indigo-600 border-indigo-600 text-white shadow-2xl shadow-indigo-200' 
                : 'bg-white border-slate-100 text-slate-600 hover:border-slate-200'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <p className={`text-[10px] font-bold uppercase tracking-widest ${activeRouteId === route.id ? 'text-indigo-200' : 'text-slate-400'}`}>
                {route.label}
              </p>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${activeRouteId === route.id ? 'bg-white/20 text-white' : 'bg-indigo-50 text-indigo-600'}`}>
                Efficiency: {route.efficiencyScore}/10
              </span>
            </div>
            <p className="font-black text-xl mb-1">{route.totalDuration}</p>
            <p className={`text-sm font-medium ${activeRouteId === route.id ? 'text-indigo-100' : 'text-slate-500'}`}>{route.totalCost}</p>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Why This Route */}
          <div className="bg-indigo-50 border border-indigo-100 rounded-[2rem] p-6">
             <h4 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
                <i className="fas fa-chart-line"></i> Why this path is efficient:
             </h4>
             <p className="text-indigo-800 text-sm leading-relaxed">{activeRoute.whyEfficient}</p>
          </div>

          {/* Segment Timeline */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
             <h3 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-2">
                <i className="fas fa-route text-indigo-500"></i> Detailed Step-by-Step Guidance
             </h3>
             <div className="relative pl-8 border-l-2 border-slate-100 space-y-12 ml-4">
                {activeRoute.segments.map((seg, idx) => (
                  <div key={idx} className="relative">
                    <div className={`absolute -left-[49px] top-0 w-10 h-10 rounded-2xl border-4 border-white shadow-lg flex items-center justify-center ${getTransportColor(seg.mode as TransportMode)}`}>
                       <i className={`fas ${getTransportIcon(seg.mode as TransportMode)}`}></i>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                         <h4 className="font-black text-slate-900 text-xl">{seg.from} <span className="text-slate-300 font-light mx-2">to</span> {seg.to}</h4>
                         <div className="flex gap-2">
                            <span className="text-xs font-bold px-3 py-1 bg-slate-100 rounded-full text-slate-600">{seg.duration}</span>
                            <span className="text-xs font-bold px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100">{seg.cost}</span>
                         </div>
                      </div>

                      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                        <p className="text-slate-700 font-medium mb-3">{seg.instructions}</p>
                        
                        {seg.transferDetails && (
                          <div className="mt-4 pt-4 border-t border-slate-200">
                            <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-2">Transition & Availability Info</p>
                            <div className="flex gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                              <i className="fas fa-exchange-alt text-indigo-400 mt-1"></i>
                              <p className="text-sm text-slate-600 leading-relaxed font-semibold">
                                {seg.transferDetails}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="relative">
                   <div className="absolute -left-[49px] top-0 w-10 h-10 rounded-full border-4 border-white shadow-lg bg-emerald-500 text-white flex items-center justify-center">
                       <i className="fas fa-check"></i>
                    </div>
                    <div className="pt-2 pl-2">
                      <h4 className="font-black text-emerald-600 text-xl tracking-tight">Destination Reached: {data.destination}</h4>
                    </div>
                </div>
             </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
             <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <i className="fas fa-sun text-amber-500"></i> Travel Conditions
             </h3>
             <div className="p-5 bg-amber-50 rounded-2xl border border-amber-100">
               <p className="text-amber-900 text-sm leading-relaxed italic">
                  {data.destinationWeatherInfo}
               </p>
             </div>
          </div>

          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full"></div>
             <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <i className="fas fa-lightbulb text-yellow-400"></i> Pro Traveler Tips
             </h3>
             <div className="space-y-4">
                {data.proTips.map((tip, i) => (
                  <div key={i} className="flex gap-4 items-start group">
                    <div className="w-6 h-6 rounded-lg bg-white/10 flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-white/60">
                      {i + 1}
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed group-hover:text-white transition-colors">{tip}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
