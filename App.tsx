
import React, { useState } from 'react';
import { TravelForm } from './components/TravelForm';
import { RouteDisplay } from './components/RouteDisplay';
import { getTravelSuggestions } from './services/geminiService';
import { LatLng, TravelResponse } from './types';

const APP_VERSION = "1.0.3";

const HelpModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-[2.5rem] w-full max-w-lg p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black text-slate-900">How to use TravelSaathi</h2>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors">
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 flex-shrink-0 flex items-center justify-center text-indigo-600 font-bold">1</div>
            <div>
              <h3 className="font-bold text-slate-800">Enter Your Journey</h3>
              <p className="text-sm text-slate-500">Type your origin and destination. Use the "GPS" button to quickly find your current location.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 flex-shrink-0 flex items-center justify-center text-indigo-600 font-bold">2</div>
            <div>
              <h3 className="font-bold text-slate-800">Review Efficiency</h3>
              <p className="text-sm text-slate-500">Compare different routes based on time, cost, and efficiency scores provided by our AI.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 flex-shrink-0 flex items-center justify-center text-indigo-600 font-bold">3</div>
            <div>
              <h3 className="font-bold text-slate-800">Follow Transfer Guides</h3>
              <p className="text-sm text-slate-500">Read the detailed "Transfer Details" to know exactly where to change from a cab to a train or bus.</p>
            </div>
          </div>
        </div>
        <button onClick={onClose} className="w-full mt-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-colors">Got it!</button>
      </div>
    </div>
  );
};

const SupportModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-[2.5rem] w-full max-w-md p-8 shadow-2xl animate-in fade-in zoom-in duration-200 text-center relative overflow-hidden">
        <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-600">
           <i className="fas fa-headset text-3xl"></i>
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-2">Need Support?</h2>
        <p className="text-slate-500 mb-8">We are here to help you with your travels. Reach out to our team at any time.</p>
        
        <a 
          href="mailto:domainastrill@gmail.com" 
          className="block w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-colors mb-4 flex items-center justify-center gap-3 shadow-lg shadow-indigo-100"
        >
          <i className="fas fa-envelope"></i>
          domainastrill@gmail.com
        </a>
        
        <button 
          onClick={onClose} 
          className="w-full py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-colors mb-6"
        >
          Close
        </button>

        <div className="border-t border-slate-50 pt-4 flex items-center justify-center gap-2 text-slate-300">
           <span className="text-[10px] font-black uppercase tracking-[0.2em]">TravelSaathi App Version</span>
           <span className="px-2 py-0.5 bg-slate-50 rounded-md text-[10px] font-bold text-slate-400">{APP_VERSION}</span>
        </div>
      </div>
    </div>
  );
};

const DeveloperModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-[2.5rem] w-full max-w-md p-8 shadow-2xl animate-in fade-in zoom-in duration-200 text-center">
        <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-600">
           <i className="fas fa-user-tie text-3xl"></i>
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-2">About Developer</h2>
        <p className="text-slate-500 mb-6 font-medium">This application is crafted with passion for travelers across India.</p>
        
        <div className="space-y-3 mb-8 text-left">
           <div className="p-4 bg-slate-50 rounded-2xl flex items-center gap-4 border border-slate-100">
              <i className="fas fa-user text-indigo-500"></i>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Name</p>
                <p className="font-bold text-slate-800">Saquib Nazeer</p>
              </div>
           </div>
           <a href="https://saquibnazeer.vercel.app" target="_blank" rel="noopener noreferrer" className="p-4 bg-slate-50 rounded-2xl flex items-center gap-4 border border-slate-100 hover:bg-indigo-50 transition-colors group">
              <i className="fas fa-globe text-indigo-500"></i>
              <div className="flex-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Portfolio</p>
                <p className="font-bold text-slate-800 group-hover:text-indigo-600">saquibnazeer.vercel.app</p>
              </div>
              <i className="fas fa-external-link-alt text-[10px] text-slate-300"></i>
           </a>
           <div className="p-4 bg-slate-50 rounded-2xl flex items-center gap-4 border border-slate-100">
              <i className="fas fa-phone text-indigo-500"></i>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Contact</p>
                <p className="font-bold text-slate-800">+91 8899779073</p>
              </div>
           </div>
        </div>
        
        <button 
          onClick={onClose} 
          className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TravelResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isDeveloperOpen, setIsDeveloperOpen] = useState(false);

  const handleSearch = async (origin: string, destination: string, location?: LatLng) => {
    setLoading(true);
    setError(null);
    try {
      const suggestions = await getTravelSuggestions(origin, destination, location);
      setResult(suggestions);
    } catch (err) {
      console.error(err);
      setError("We couldn't map this route. Please check if the locations are in India and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] pb-40">
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
      <SupportModal isOpen={isSupportOpen} onClose={() => setIsSupportOpen(false)} />
      <DeveloperModal isOpen={isDeveloperOpen} onClose={() => setIsDeveloperOpen(false)} />

      {/* Dynamic Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100/40 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-100/40 blur-[120px] rounded-full"></div>
      </div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl sticky top-0 z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-100 rotate-3">
              <i className="fas fa-person-walking-luggage text-lg"></i>
            </div>
            <div>
              <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-900 tracking-tighter">TravelSaathi</span>
              <p className="text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase -mt-1">Your Travel Buddy</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <button 
              onClick={() => setIsDeveloperOpen(true)}
              className="hidden sm:flex px-4 py-2.5 bg-white text-slate-600 rounded-full text-xs font-bold hover:bg-slate-50 transition-all border border-slate-200 items-center gap-2 shadow-sm"
             >
               <i className="fas fa-code text-indigo-500"></i> Developer
             </button>
             <button 
              onClick={() => setIsSupportOpen(true)}
              className="flex px-5 py-2.5 bg-indigo-600 text-white rounded-full text-xs font-bold hover:bg-indigo-700 transition-all border border-indigo-100 items-center gap-2 shadow-lg shadow-indigo-100"
             >
               <i className="fas fa-headset"></i> Support
             </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className={`transition-all duration-700 ${result ? 'pt-8 pb-4' : 'pt-20 pb-20'}`}>
        <div className="max-w-4xl mx-auto text-center px-4 mb-12">
          {!result && (
            <>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-[1.1]">
                Your Ultimate <span className="text-indigo-600">Travel</span><br/>
                Partner in <span className="text-indigo-600 underline decoration-indigo-200 underline-offset-8">India</span>.
              </h1>
              <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                India's smartest multimodal travel assistant. We coordinate trains, metros, buses, and cabs so you don't have to.
              </p>
            </>
          )}
        </div>

        <TravelForm onSearch={handleSearch} isLoading={loading} />
      </section>

      {/* Main Content Area */}
      <main className="relative">
        {error && (
          <div className="max-w-2xl mx-auto px-4 mt-8">
            <div className="p-6 bg-red-50 border border-red-100 rounded-3xl text-red-700 flex flex-col items-center text-center gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <i className="fas fa-map-marked-alt text-xl"></i>
              </div>
              <div>
                <h3 className="font-bold text-lg">Route Not Found</h3>
                <p className="text-sm opacity-80">{error}</p>
              </div>
              <button onClick={() => setError(null)} className="px-6 py-2 bg-red-600 text-white rounded-full text-sm font-bold shadow-lg shadow-red-200">Try Different Cities</button>
            </div>
          </div>
        )}

        {result && !loading && (
          <RouteDisplay data={result.data} chunks={result.chunks} />
        )}

        {/* Feature Highlights */}
        {!result && !loading && (
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 px-4 mb-12">
            {[
              { icon: 'fa-train-subway', title: 'Vande Bharat Ready', desc: 'Prioritizing India\'s fastest semi-high speed trains for your comfort.', color: 'from-indigo-500 to-indigo-700 shadow-indigo-100' },
              { icon: 'fa-car-side', title: 'Inter-modal Sync', desc: 'Seamlessly connects Rail stations to Uber/Ola/Auto drops.', color: 'from-amber-500 to-orange-600 shadow-orange-100' },
              { icon: 'fa-indian-rupee-sign', title: 'Detailed Guidance', desc: 'Step-by-step reports on where to change buses or find local transport.', color: 'from-emerald-500 to-teal-700 shadow-teal-100' }
            ].map((f, i) => (
              <div key={i} className="group p-8 bg-white rounded-[2.5rem] border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
                <div className={`w-16 h-16 rounded-3xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-6 text-white shadow-xl`}>
                  <i className={`fas ${f.icon} text-2xl`}></i>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{f.desc}</p>
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-10 transition-opacity">
                   <i className={`fas ${f.icon} text-6xl rotate-12`}></i>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer / Mobile Nav */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[95%] md:w-auto md:min-w-[500px] bg-white/80 backdrop-blur-2xl px-8 py-4 rounded-[2.5rem] border border-white shadow-2xl flex items-center justify-between md:justify-center gap-8 md:gap-20 z-50">
        <button 
          onClick={() => {
            setResult(null);
            setError(null);
            setIsDeveloperOpen(false);
          }} 
          className={`flex flex-col items-center gap-1 group transition-all ${(!result && !isHelpOpen && !isSupportOpen && !isDeveloperOpen) ? 'text-indigo-600' : 'text-slate-400 hover:text-indigo-500'}`}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${(!result && !isHelpOpen && !isSupportOpen && !isDeveloperOpen) ? 'bg-indigo-50' : 'group-hover:bg-slate-50'}`}>
            <i className="fas fa-search text-lg"></i>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest">Search</span>
        </button>

        <button 
          onClick={() => {
            setIsHelpOpen(true);
            setIsSupportOpen(false);
            setIsDeveloperOpen(false);
          }}
          className={`flex flex-col items-center gap-1 group transition-all ${isHelpOpen ? 'text-indigo-600' : 'text-slate-400 hover:text-indigo-500'}`}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isHelpOpen ? 'bg-indigo-50' : 'group-hover:bg-slate-50'}`}>
            <i className="fas fa-question-circle text-lg"></i>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest">Help</span>
        </button>

        <button 
          onClick={() => {
            setIsSupportOpen(true);
            setIsHelpOpen(false);
            setIsDeveloperOpen(false);
          }}
          className={`flex flex-col items-center gap-1 group transition-all ${isSupportOpen ? 'text-indigo-600' : 'text-slate-400 hover:text-indigo-500'}`}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isSupportOpen ? 'bg-indigo-50' : 'group-hover:bg-slate-50'}`}>
            <i className="fas fa-headset text-lg"></i>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest">Support</span>
        </button>
      </div>
    </div>
  );
};

export default App;
