"use client";

import { useState } from "react";
import { 
  MapPin, 
  Search, 
  Clock, 
  Navigation, 
  Phone, 
  Globe, 
  CheckCircle2, 
  ChevronRight,
  Filter,
  Package,
  Printer,
  ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FindLocationPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Mock Data for Locations
  const locations = [
    {
      id: 1,
      name: "FedEx Ship Center - Downtown",
      address: "152 West 57th St, New York, NY 10019",
      distance: "0.4 miles",
      status: "Open",
      closes: "8:00 PM",
      services: ["Shipping", "Drop-off", "Printing", "Packaging"],
    },
    {
      id: 2,
      name: "FedEx Office Print & Ship Center",
      address: "477 Madison Ave, New York, NY 10022",
      distance: "0.9 miles",
      status: "Open",
      closes: "10:00 PM",
      services: ["24-Hour Drop-off", "Direct Mail", "Passport Photos"],
    },
    {
      id: 3,
      name: "Walgreens - FedEx Drop Box",
      address: "20 Astor Pl, New York, NY 10003",
      distance: "1.2 miles",
      status: "Closing Soon",
      closes: "5:30 PM",
      services: ["Drop-off Only"],
    }
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      
      {/* 1. SEARCH HEADER */}
      <section className="bg-[#4D148C] py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-4">
            Find <span className="text-[#FF6200]">Locations</span>
          </h1>
          <p className="text-purple-200 text-sm font-medium mb-8">Ship, drop off, or pick up at over 60,000 locations worldwide.</p>
          
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <MapPin className="w-5 h-5" />
            </div>
            <input 
              type="text" 
              placeholder="City, State, or Zip Code"
              className="w-full bg-white rounded-full py-5 px-12 text-gray-900 font-bold shadow-2xl outline-none focus:ring-4 focus:ring-[#FF6200]/20 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#FF6200] hover:bg-[#e65900] text-white px-6 py-3 rounded-full font-black uppercase text-xs transition-all flex items-center gap-2">
              <Search className="w-4 h-4" /> Search
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* 2. FILTERS SIDEBAR (3 Cols) */}
          <aside className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-black text-gray-900 uppercase tracking-tight text-sm">Refine Search</h3>
                <Filter className="w-4 h-4 text-gray-400" />
              </div>

              <div className="space-y-4">
                <div className="pb-4 border-b border-gray-50">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Service Type</p>
                  {[
                    { label: "Pack & Ship", icon: <Package className="w-3.5 h-3.5" /> },
                    { label: "Copy & Print", icon: <Printer className="w-3.5 h-3.5" /> },
                    { label: "Dangerous Goods", icon: <AlertCircleIcon /> }
                  ].map((service, i) => (
                    <label key={i} className="flex items-center gap-3 py-2 cursor-pointer group">
                      <div className="w-5 h-5 border-2 border-gray-200 rounded flex items-center justify-center group-hover:border-[#4D148C] transition-colors">
                        <div className="w-2.5 h-2.5 bg-[#4D148C] rounded-sm opacity-0 group-hover:opacity-10 transition-opacity"></div>
                      </div>
                      <span className="text-xs font-bold text-gray-600">{service.label}</span>
                    </label>
                  ))}
                </div>

                <div className="pt-2">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Operating Hours</p>
                  <div className="flex items-center justify-between text-xs font-bold text-gray-600">
                    <span>Open Now</span>
                    <div className="w-10 h-5 bg-[#4D148C] rounded-full relative">
                      <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* 3. LOCATION RESULTS (9 Cols) */}
          <main className="lg:col-span-9 space-y-4">
            <div className="flex items-center justify-between px-2">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Showing {locations.length} Locations near New York
              </p>
              <button className="flex items-center gap-2 text-[10px] font-black uppercase text-[#4D148C]">
                Sort by Distance <ChevronDown className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {locations.map((loc) => (
                <motion.div 
                  key={loc.id}
                  whileHover={{ x: 4 }}
                  className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md hover:border-[#4D148C]/20 transition-all group cursor-pointer"
                >
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-xl font-black text-gray-900 tracking-tighter uppercase italic">{loc.name}</h2>
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase ${
                          loc.status === 'Open' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {loc.status}
                        </span>
                      </div>
                      
                      <div className="flex items-start gap-2 text-gray-500 mb-4">
                        <MapPin className="w-4 h-4 mt-0.5 text-[#FF6200]" />
                        <p className="text-sm font-medium">{loc.address}</p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {loc.services.map((s, i) => (
                          <span key={i} className="text-[10px] font-bold bg-gray-50 text-gray-500 px-3 py-1 rounded-full border border-gray-100">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col md:items-end justify-between border-t md:border-t-0 pt-4 md:pt-0 gap-4">
                      <div className="md:text-right">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Distance</p>
                        <p className="text-sm font-black text-[#4D148C]">{loc.distance}</p>
                      </div>

                      <div className="flex gap-2">
                        <button className="p-3 bg-gray-50 rounded-xl text-gray-600 hover:bg-[#4D148C] hover:text-white transition-all">
                          <Phone className="w-4 h-4" />
                        </button>
                        <button className="flex items-center gap-2 bg-[#4D148C] text-white px-5 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all hover:bg-[#3b0f6e]">
                          <Navigation className="w-3.5 h-3.5" /> Directions
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* MAP PLACEHOLDER */}
            <div className="mt-8 rounded-2xl overflow-hidden border-4 border-white shadow-xl h-100 bg-gray-100 relative">
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-[#FF6200] mx-auto mb-2 animate-bounce" />
                    <p className="text-xs font-black uppercase text-gray-400 tracking-widest">Interactive Map Loading...</p>
                  </div>
               </div>
               {/* In a real app, you'd insert Google Maps or Mapbox here */}
               <div className="w-full h-full bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-74.006,40.7128,12/1200x400?access_token=YOUR_TOKEN')] bg-cover"></div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function AlertCircleIcon() {
  return (
    <div className="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[8px] font-bold">!</div>
  );
}