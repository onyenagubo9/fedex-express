"use client";

import { motion } from "framer-motion";

export default function PageLoader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-100 bg-white flex items-center justify-center"
    >
      <div className="flex flex-col items-center">
        {/* Logo Text Animation */}
        <div className="flex items-baseline mb-6">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-black tracking-tighter text-[#4D148C]"
          >
            Fedex
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl font-black tracking-tighter text-[#FF6200]"
          >
            Express
          </motion.span>
        </div>

        {/* The "Global Momentum" Bar */}
        <div className="relative w-64 h-1.5 bg-slate-100 overflow-hidden rounded-full">
          {/* Background Pulse */}
          <motion.div 
            className="absolute inset-0 bg-[#4D148C]/10"
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
          
          {/* The Kinetic "Package" Bolt */}
          <motion.div
            className="absolute top-0 left-0 h-full w-24 bg-linear-to-r from-[#4D148C] to-[#FF6200]"
            animate={{ 
              x: ["-100%", "300%"] 
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 1, 
              ease: "linear" 
            }}
          />
        </div>

        {/* Status Indicators */}
        <div className="mt-8 flex flex-col items-center gap-2">
            <motion.p 
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400"
            >
              Optimizing Route
            </motion.p>
            
            {/* Minimalist Progress Markers */}
            <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                    <motion.div 
                        key={i}
                        animate={{ scale: [1, 1.5, 1], backgroundColor: ["#cbd5e1", "#FF6200", "#cbd5e1"] }}
                        transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                        className="w-1 h-1 rounded-full"
                    />
                ))}
            </div>
        </div>
      </div>
    </motion.div>
  );
}