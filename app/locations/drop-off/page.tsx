"use client";

import React, { useState } from 'react';
import { 
  MapPin, 
  Search, 
  Clock, 
  ChevronRight, 
  Filter, 
  Package, 
  Info, 
  Navigation 
} from 'lucide-react';

const ProfessionalDropOff = () => {
  const [activeLocation, setActiveLocation] = useState(1);

  const locations = [
    { 
      id: 1, 
      name: "Global Logistics Hub - Sector 4", 
      address: "882 Terminal Way, San Francisco, CA", 
      status: "Open", 
      closing: "10:00 PM", 
      dist: "0.8 mi", 
      features: ["QR Returns", "Freight"] 
    },
    { 
      id: 2, 
      name: "Downtown Business Center", 
      address: "101 Market St, San Francisco, CA", 
      status: "Closing Soon", 
      closing: "5:30 PM", 
      dist: "1.2 mi", 
      features: ["Self-Service"] 
    },
    { 
      id: 3, 
      name: "Retail Annex @ Stationery Plus", 
      address: "554 Mission St, San Francisco, CA", 
      status: "Open", 
      closing: "8:00 PM", 
      dist: "2.4 mi", 
      features: ["Packing Services"] 
    },
  ];

  return (
    <div className="flex flex-col h-screen bg-white text-slate-900 font-sans">
      {/* Top Navigation Bar */}
      <nav className="h-16 border-b flex items-center justify-between px-8 bg-white z-10 shrink-0">
        <div className="flex items-center gap-8">
          <span className="font-black text-xl tracking-tight uppercase">
            Logistics<span className="text-blue-600">Pro</span>
          </span>
          <div className="hidden md:flex gap-6 text-sm font-medium text-slate-500">
            <span className="text-blue-600 border-b-2 border-blue-600 h-16 flex items-center">Find Locations</span>
            <span className="h-16 flex items-center hover:text-slate-900 cursor-pointer transition-colors">Shipments</span>
            <span className="h-16 flex items-center hover:text-slate-900 cursor-pointer transition-colors">Tracking</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <Info size={20} className="text-slate-400" />
          </button>
          <div className="h-8 w-8 rounded-full bg-slate-200 border border-slate-300"></div>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Advanced Search Sidebar */}
        <aside className="w-full md:w-105 border-r flex flex-col bg-slate-50/50 shrink-0">
          <div className="p-6 bg-white border-b shadow-sm">
            <h2 className="text-xl font-bold mb-4">Find a Drop-off Point</h2>
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                className="w-full bg-slate-100 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500 rounded-lg py-2.5 pl-10 pr-4 transition-all outline-none"
                placeholder="Address, City, or Zip Code"
              />
            </div>
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              <span>Filter by Service</span>
              <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors">
                <Filter size={14} /> Refine
              </button>
            </div>
          </div>

          {/* Results List */}
          <div className="flex-1 overflow-y-auto">
            {locations.map((loc) => (
              <div 
                key={loc.id}
                onClick={() => setActiveLocation(loc.id)}
                className={`p-6 cursor-pointer border-b transition-all relative ${
                  activeLocation === loc.id 
                    ? 'bg-white shadow-[inset_4px_0_0_0_#2563eb]' 
                    : 'hover:bg-slate-100'
                }`}
              >
                <div className="flex justify-between mb-1">
                  <span className="text-[10px] font-bold bg-slate-200 px-2 py-0.5 rounded text-slate-600 uppercase">
                    {loc.dist} away
                  </span>
                  <div className="flex items-center gap-1">
                    <span className={`h-2 w-2 rounded-full ${
                      loc.status === 'Open' ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}></span>
                    <span className="text-xs font-medium text-slate-500">{loc.status}</span>
                  </div>
                </div>
                <h3 className="font-bold text-slate-800 leading-tight mb-1">{loc.name}</h3>
                <p className="text-sm text-slate-500 mb-3">{loc.address}</p>
                
                <div className="flex flex-wrap gap-2">
                  {loc.features.map(f => (
                    <span key={f} className="text-[11px] flex items-center gap-1 text-slate-600 bg-white border border-slate-200 px-2 py-1 rounded shadow-sm">
                      <Package size={12} /> {f}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Map Area */}
        <main className="hidden md:block flex-1 bg-slate-200 relative">
          {/* Subtle Map Overlay Card */}
          <div className="absolute top-6 right-6 z-20 bg-white p-5 rounded-xl shadow-2xl border border-slate-100 w-72">
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-widest">Selected Location</p>
            <h4 className="font-bold text-base text-slate-900 leading-tight">
              {locations.find(l => l.id === activeLocation)?.name}
            </h4>
            <p className="text-sm text-slate-500 mt-1 mb-4">
              {locations.find(l => l.id === activeLocation)?.address}
            </p>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2">
              <Navigation size={16} />
              Get Directions
            </button>
          </div>
          
          {/* Simulated Map Background */}
          <div className="absolute inset-0 bg-[#e5e7eb] overflow-hidden flex items-center justify-center">
             {/* Map Placeholder Content */}
             <div className="relative w-full h-full bg-[url('https://www.google.com/maps/vt/pb=!1m4!1m3!1i12!2i653!3i1581!2m3!1e0!2sm!3i605151528!3m8!2sen!3sus!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!1sfsy!2sh131072')] bg-cover opacity-60 grayscale-[0.5]">
                {/* Simulated Marker */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-blue-500/20 rounded-full animate-ping"></div>
                    <MapPin size={40} className="text-blue-600 drop-shadow-lg relative z-10" fill="currentColor" fillOpacity={0.2} />
                  </div>
                </div>
             </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfessionalDropOff;