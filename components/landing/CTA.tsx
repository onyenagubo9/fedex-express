"use client";

import { motion } from "framer-motion";
import { ArrowRight, Search, Calculator } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative py-24 overflow-hidden bg-white">
      {/* Industrial Accent: The FedEx Slant */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#4D148C] -skew-x-12 translate-x-32 z-0" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-[#FF6200] z-20" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Left Side: Messaging */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-xl text-left"
          >
            <h2 className="text-[12px] font-black tracking-[0.4em] text-[#4D148C] uppercase mb-4">
              TAKE CONTROL OF YOUR SHIPMENTS
            </h2>
            <h3 className="text-4xl md:text-6xl font-black text-slate-900 leading-[0.9] uppercase tracking-tighter mb-6">
              READY TO SHIP <br />
              <span className="text-[#FF6200]">WITH PRECISION?</span>
            </h3>

            <p className="text-lg text-slate-600 mb-8 font-medium leading-relaxed">
              Experience the speed of a global network optimized for the modern world. 
              Join thousands of businesses moving faster with our 24/7 logistics engine.
            </p>

            <div className="flex flex-wrap gap-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#FF6200] rounded-full" /> No Hidden Fees
                </span>
                <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#FF6200] rounded-full" /> Real-Time Telemetry
                </span>
                <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#FF6200] rounded-full" /> Global 24/7 Support
                </span>
            </div>
          </motion.div>

          {/* Right Side: Action Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-100 bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-t-8 border-[#4D148C]"
          >
            <div className="space-y-4">
              {/* Primary Action */}
              <button className="group w-full flex items-center justify-between bg-[#4D148C] text-white px-6 py-5 font-black uppercase text-xs tracking-[0.2em] hover:bg-[#330c5f] transition-all">
                <span className="flex items-center gap-3">
                  <Search className="w-4 h-4 text-[#FF6200]" />
                  Track Shipment
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary Action */}
              <button className="group w-full flex items-center justify-between bg-white border-2 border-slate-200 text-slate-900 px-6 py-5 font-black uppercase text-xs tracking-[0.2em] hover:border-[#FF6200] transition-all">
                <span className="flex items-center gap-3">
                  <Calculator className="w-4 h-4 text-[#4D148C]" />
                  Calculate Rate
                </span>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#FF6200]" />
              </button>
              
              <div className="pt-6 border-t border-gray-100">
                <p className="text-[10px] text-center font-bold text-slate-400 uppercase tracking-widest">
                  Integrated with Odoo & Next.js ERP
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}