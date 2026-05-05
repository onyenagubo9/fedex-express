"use client";

import { useState } from "react";
import { 
  Search, 
  Filter, 
  Download, 
  Truck, 
  Package, 
  ChevronRight, 
  Plus, 
  X,
  MapPin,
  Clock,
  ShieldCheck,
  FileText
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    // Simulate API Call
    setTimeout(() => {
      setResults([
        { id: "FX-1029384756", status: "In Transit", origin: "Memphis, TN", destination: "London, UK", eta: "May 05, 2026", type: "Priority Overnight" },
        { id: "FX-9928374650", status: "Delivered", origin: "Shanghai, CN", destination: "New York, NY", eta: "Delivered", type: "International Economy" },
      ]);
      setIsSearching(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-20">
      
      {/* 1. HEADER SECTION */}
      <section className="bg-white border-b border-gray-200 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[#4D148C]/10 text-[#4D148C] text-[10px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider">
                  Enterprise Portal
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tighter italic">
                Advanced <span className="text-[#FF6200]">Tracking</span>
              </h1>
              <p className="text-gray-500 text-sm mt-1 font-medium">Manage up to 30 shipments simultaneously with real-time manifest updates.</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Security Status</p>
                <p className="text-xs font-black text-green-600 uppercase flex items-center gap-1 justify-end">
                  <ShieldCheck className="w-3 h-3" /> Encrypted Session
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* 2. TRACKING SIDEBAR (3 Cols) */}
          <aside className="lg:col-span-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-32">
              <div className="bg-[#4D148C] p-4 flex items-center justify-between">
                <h2 className="text-white text-[11px] font-black uppercase tracking-widest flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#FF6200]" /> Input Manifest
                </h2>
                <span className="text-white/50 text-[10px] font-bold">{trackingNumbers.length}/30</span>
              </div>

              <form onSubmit={handleTrack} className="p-6 space-y-4">
                <div className="space-y-3 max-h-100 overflow-y-auto pr-2 custom-scrollbar">
                  {trackingNumbers.map((num, idx) => (
                    <div key={idx} className="relative group">
                      <input
                        type="text"
                        placeholder={`Tracking ID #${idx + 1}`}
                        value={num}
                        onChange={(e) => handleInputChange(idx, e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3.5 text-sm font-bold uppercase outline-none focus:ring-2 focus:ring-[#4D148C]/20 focus:border-[#4D148C] transition-all placeholder:text-gray-400"
                      />
                      {trackingNumbers.length > 1 && (
                        <button 
                          type="button"
                          onClick={() => removeField(idx)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-red-500 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <button 
                  type="button"
                  onClick={addField}
                  className="w-full py-3 border-2 border-dashed border-gray-200 rounded-lg text-gray-400 hover:text-[#4D148C] hover:border-[#4D148C] transition-all flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest"
                >
                  <Plus className="w-3 h-3" /> Add Tracking Number
                </button>

                <button
                  disabled={isSearching}
                  className="w-full bg-[#FF6200] hover:bg-[#e65900] text-white py-4 mt-4 rounded-lg font-black uppercase tracking-widest text-xs shadow-lg shadow-[#FF6200]/20 transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-3"
                >
                  {isSearching ? <Clock className="w-4 h-4 animate-spin" /> : <><Search className="w-4 h-4" /> Retrieve Data</>}
                </button>
              </form>
            </div>
          </aside>

          {/* 3. RESULTS DASHBOARD (8 Cols) */}
          <main className="lg:col-span-8 space-y-6">
            
            {/* UTILITY BAR */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-6">
                <button className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-500 hover:text-[#4D148C] transition-colors">
                  <Filter className="w-3.5 h-3.5" /> Filter
                </button>
                <div className="w-px h-4 bg-gray-200"></div>
                <button className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-500 hover:text-[#4D148C] transition-colors">
                  <Download className="w-3.5 h-3.5" /> Export PDF
                </button>
              </div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                {results ? `Showing ${results.length} results` : "Ready for Query"}
              </p>
            </div>

            <AnimatePresence mode="wait">
              {results ? (
                <div className="space-y-4">
                  {results.map((item, idx) => (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      key={item.id}
                      className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-[#4D148C]/30 transition-all group cursor-pointer overflow-hidden"
                    >
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row justify-between gap-6">
                          <div className="flex gap-4">
                            <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center group-hover:bg-[#4D148C]/5 transition-colors">
                              <Package className="w-6 h-6 text-[#4D148C]" />
                            </div>
                            <div>
                              <p className="text-[10px] font-black text-[#FF6200] uppercase tracking-widest mb-0.5">{item.type}</p>
                              <h3 className="text-xl font-black text-gray-900 tracking-tighter">{item.id}</h3>
                              <div className="flex items-center gap-2 mt-1 text-gray-500">
                                <span className="text-[11px] font-bold uppercase">{item.origin}</span>
                                <ChevronRight className="w-3 h-3" />
                                <span className="text-[11px] font-bold uppercase">{item.destination}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-10 border-t md:border-t-0 pt-4 md:pt-0">
                            <div className="text-right">
                              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Status</p>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                                item.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                              }`}>
                                {item.status}
                              </span>
                            </div>
                            <div className="text-right">
                              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Delivery</p>
                              <p className="text-xs font-black text-gray-900 uppercase">{item.eta}</p>
                            </div>
                            <button className="p-2 rounded-full hover:bg-gray-50 text-gray-300 group-hover:text-[#4D148C] transition-all">
                              <ChevronRight className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Status Progress Bar */}
                      <div className="h-1 w-full bg-gray-100">
                        <div 
                          className={`h-full transition-all duration-1000 ${item.status === 'Delivered' ? 'w-full bg-green-500' : 'w-2/3 bg-[#4D148C]'}`}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white border-2 border-dashed border-gray-200 rounded-2xl h-125 flex flex-col items-center justify-center text-center p-10"
                >
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                    <Truck className="w-10 h-10 text-gray-200" />
                  </div>
                  <h3 className="text-lg font-black text-gray-400 uppercase tracking-tighter">No Active Manifest</h3>
                  <p className="text-gray-400 text-sm max-w-xs mt-2">Enter your tracking numbers in the input registry to retrieve real-time logistics data.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}