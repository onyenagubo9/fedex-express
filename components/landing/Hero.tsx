"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MapPin, PackageSearch, ArrowRight } from "lucide-react";

export default function Hero() {
  const [tracking, setTracking] = useState("");
  const router = useRouter();

  function handleTrack() {
    if (!tracking.trim()) return;
    router.push(`/track?code=${tracking}`);
  }

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white">
      {/* BACKGROUND IMAGE - FedEx Cargo Plane */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url(https://images.unsplash.com/photo-1566633806327-68e152aaf26d?q=80&w=2070&auto=format&fit=crop)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* FedEx Gradient Overlay (Purple to Transparent) */}
        <div className="absolute inset-0 bg-linear-to-r from-[#4D148C]/90 via-[#4D148C]/40 to-transparent" />
      </div>

      {/* DYNAMIC ROUTE LINE (Orange Dash) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        viewBox="0 0 1000 400"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M 50 350 C 250 150, 650 150, 950 350"
          fill="none"
          stroke="#FF6200"
          strokeWidth="4"
          strokeDasharray="12 12"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        />
      </svg>

      {/* GEOGRAPHIC MARKERS */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute left-[5%] bottom-[12%]"
        >
          <div className="bg-[#FF6200] p-2 rounded-full shadow-lg shadow-orange-500/50">
            <MapPin className="w-5 h-5 text-white" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.2 }}
          className="absolute right-[5%] bottom-[12%]"
        >
          <div className="bg-[#4D148C] p-2 rounded-full shadow-lg shadow-purple-500/50">
            <MapPin className="w-5 h-5 text-white" />
          </div>
        </motion.div>
      </div>

      {/* CONTENT BLOCK */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1 bg-[#FF6200] text-white text-xs font-black uppercase tracking-[0.3em] mb-6">
              Global Express Delivery
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-[0.9] uppercase tracking-tighter mb-6">
              Track Your <br />
              <span className="text-[#FF6200]">Shipment.</span>
            </h1>
            <p className="text-xl text-purple-50 mb-10 max-w-lg font-medium leading-relaxed">
              Experience the world's most reliable logistics network. Real-time telemetry from origin to destination.
            </p>
          </motion.div>

          {/* TRACKING INPUT - FedEx Industrial Style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row bg-white p-2 shadow-2xl border-b-4 border-[#FF6200]"
          >
            <div className="flex items-center px-4 text-[#4D148C]">
              <PackageSearch className="w-6 h-6" />
            </div>

            <input
              placeholder="TRACKING ID (e.g. 123456789)"
              className="flex-1 px-2 py-5 text-slate-900 outline-none font-black placeholder:text-slate-400 placeholder:font-bold"
              value={tracking}
              onChange={(e) => setTracking(e.target.value)}
            />

            <button
              onClick={handleTrack}
              className="bg-[#4D148C] hover:bg-[#3b0f6b] px-10 py-5 text-white font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all group"
            >
              Track 
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
          
          <div className="mt-6 flex gap-8">
            <div className="text-white/60 text-[10px] font-black uppercase tracking-widest">
              Standard Express
            </div>
            <div className="text-white/60 text-[10px] font-black uppercase tracking-widest">
              Freight Services
            </div>
            <div className="text-white/60 text-[10px] font-black uppercase tracking-widest">
              Priority Overnight
            </div>
          </div>
        </div>
      </div>

      {/* Industrial Accents */}
      <div className="absolute top-0 right-0 w-24 h-full bg-linear-to-l from-white/10 to-transparent pointer-events-none" />
    </section>
  );
}