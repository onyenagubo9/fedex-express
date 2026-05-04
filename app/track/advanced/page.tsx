"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Search, 
  Filter, 
  Download, 
  Truck, 
  Package, 
  ChevronRight, 
  Plus, 
  X,
  Clock,
  MapPin,
  Menu,
  Globe,
  User
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* --- REUSABLE NAVBAR COMPONENT --- */
function FedExNavbar() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link href="/" className="text-3xl font-black italic tracking-tighter flex items-center">
            <span className="text-[#4D148C]">Fed</span>
            <span className="text-[#FF6200]">Ex</span>
          </Link>

          {/* Main Links */}
          <div className="hidden md:flex items-center gap-6">
            {["Shipping", "Tracking", "Design & Print", "Locations"].map((item) => (
              <button key={item} className="text-[11px] font-black uppercase tracking-widest text-gray-700 hover:text-[#4D148C] transition-colors">
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden sm:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-600">
            <Globe className="w-4 h-4 text-[#4D148C]" /> Support
          </button>
          <div className="h-6 w-px bg-gray-200 mx-2 hidden sm:block"></div>
          <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-600">
            <User className="w-4 h-4 text-[#4D148C]" /> Sign In
          </button>
          <Menu className="md:hidden w-6 h-6 text-[#4D148C]" />
        </div>
      </div>
    </nav>
  );
}

/* --- MAIN PAGE COMPONENT --- */
export default function AdvancedTrackingPage() {
  const [trackingNumbers, setTrackingNumbers] = useState<string[]>([""]);
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<any[] | null>(null);

  const addField = () => {
    if (trackingNumbers.length < 30) setTrackingNumbers([...trackingNumbers, ""]);
  };

  const removeField = (index: number) => {
    const newNumbers = trackingNumbers.filter((_, i) => i !== index);
    setTrackingNumbers(newNumbers.length ? newNumbers : [""]);
  };

  const handleInputChange = (index: number, value: string) => {
    const newNumbers = [...trackingNumbers];
    newNumbers[index] = value;
    setTrackingNumbers(newNumbers);
  };

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setResults([
        { id: "FX-1029384756", status: "In Transit", origin: "Memphis, TN", destination: "London, UK", eta: "May 05, 2026" },
        { id: "FX-9928374650", status: "Delivered", origin: "Shanghai, CN", destination: "New York, NY", eta: "Delivered" },
      ]);
      setIsSearching(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F2F2F2] font-sans">
      <FedExNavbar />

      {/* 1. TOP HERO SECTION */}
      <div className="bg-[#4D148C] text-white pt-16 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-black italic tracking-tighter uppercase mb-2">
            Advanced <span className="text-[#FF6200]">Tracking</span>
          </h1>
          <p className="text-purple-200 text-xs font-bold uppercase tracking-[0.2em] opacity-80">
            Enterprise Logistics Management • Manifest 2.0
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 2. TRACKING INPUT CARD */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-2xl border-t-8 border-[#FF6200] p-6 rounded-sm">
              <h2 className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-6 flex items-center gap-2">
                <Search className="w-4 h-4 text-[#4D148C]" /> Input Registry
              </h2>
              
              <form onSubmit={handleTrack} className="space-y-4">
                {trackingNumbers.map((num, idx) => (
                  <div key={idx} className="relative group">
                    <input
                      type="text"
                      placeholder={`FX ID NO. ${idx + 1}`}
                      value={num}
                      onChange={(e) => handleInputChange(idx, e.target.value)}
                      className="w-full bg-slate-50 border-b-2 border-gray-100 p-3 text-sm font-black uppercase outline-none focus:border-[#4D148C] transition-all placeholder:text-gray-300"
                    />
                    {trackingNumbers.length > 1 && (
                      <button 
                        type="button"
                        onClick={() => removeField(idx)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}

                <button 
                  type="button"
                  onClick={addField}
                  className="w-full py-3 border-2 border-dashed border-gray-200 text-gray-400 hover:text-[#4D148C] hover:border-[#4D148C] transition-all flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest mt-2"
                >
                  <Plus className="w-3 h-3" /> Append Field
                </button>

                <button
                  disabled={isSearching}
                  className="w-full bg-[#4D148C] hover:bg-[#3b0f6e] text-white py-4 mt-6 font-black uppercase tracking-[0.25em] text-xs shadow-xl transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {isSearching ? <Loader2 className="w-4 h-4 animate-spin text-[#FF6200]" /> : "Initialize Tracking"}
                </button>
              </form>
            </div>
          </div>

          {/* 3. RESULTS AREA */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white p-4 flex items-center justify-between border shadow-sm rounded-sm">
              <div className="flex gap-4">
                <button className="flex items-center gap-2 text-[9px] font-black uppercase text-gray-600 hover:text-[#4D148C]">
                  <Filter className="w-3 h-3 text-[#FF6200]" /> Sort Parameters
                </button>
                <div className="w-px h-4 bg-gray-200"></div>
                <button className="flex items-center gap-2 text-[9px] font-black uppercase text-gray-600 hover:text-[#4D148C]">
                  <Download className="w-3 h-3 text-[#FF6200]" /> Export Data
                </button>
              </div>
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest italic">
                {results ? `${results.length} Units Located` : "Secure Session Active"}
              </p>
            </div>

            <AnimatePresence>
              {results ? (
                results.map((item, idx) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={idx}
                    className="bg-white border-l-8 border-[#4D148C] shadow-sm hover:shadow-md transition-all group cursor-pointer"
                  >
                    <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-[#FF6200]" />
                          <span className="text-xl font-black tracking-tighter text-gray-800 uppercase italic group-hover:text-[#4D148C] transition-colors">
                            {item.id}
                          </span>
                        </div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#FF6200]" /> {item.origin} <ChevronRight className="w-2 h-2" /> {item.destination}
                        </p>
                      </div>

                      <div className="flex items-center gap-8 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0">
                        <div className="text-right">
                          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Status</p>
                          <p className={`text-xs font-black uppercase italic ${item.status === 'Delivered' ? 'text-green-600' : 'text-[#4D148C]'}`}>
                            {item.status}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Estimated</p>
                          <p className="text-xs font-black uppercase italic text-gray-800">{item.eta}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#FF6200] group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="h-80 bg-white border-2 border-dashed border-gray-100 rounded-sm flex flex-col items-center justify-center text-gray-300">
                  <div className="relative mb-4">
                    <Truck className="w-16 h-16 opacity-10" />
                    <motion.div 
                      animate={{ x: [-20, 20, -20] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="absolute bottom-0 w-full h-1 bg-[#FF6200] opacity-20"
                    />
                  </div>
                  <p className="font-black text-[10px] uppercase tracking-[0.3em] opacity-30">Waiting for Manifest Input</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function Loader2({ className }: { className?: string }) {
  return <Clock className={`${className} animate-spin`} />;
}