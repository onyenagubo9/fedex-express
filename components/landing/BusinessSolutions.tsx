"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  PackageCheck, 
  BarChart3, 
  Plug, 
  ArrowRight, 
  CheckCircle2, 
  Globe2, 
  ShieldCheck,
  TrendingUp
} from "lucide-react";

export default function BusinessSolutions() {
  const features = [
    {
      icon: PackageCheck,
      title: "BULK & CONTRACT SHIPPING",
      text: "Enterprise-grade logistics optimized for high-volume recurring shipments with guaranteed lane capacity.",
      tags: ["Volume Pricing", "Priority Fleet"]
    },
    {
      icon: Plug,
      title: "ENTERPRISE API INTEGRATION",
      text: "Seamlessly connect our delivery engine to your existing Odoo, ERP, or POS systems for automated fulfillment.",
      tags: ["Real-time Webhooks", "Custom SDKs"]
    },
    {
      icon: BarChart3,
      title: "SUPPLY CHAIN ANALYTICS",
      text: "Actionable insights through real-time telemetry, predictive route modeling, and custom ROI dashboards.",
      tags: ["Route Optimization", "Live Telemetry"]
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Structural Accents: FedEx Industrial Geometry */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#4D148C]/2 -skew-x-12 translate-x-32 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-1.5 bg-[#4D148C]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Left Column: Solutions */}
          <div className="lg:w-1/2 w-full">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-16 border-l-8 border-[#FF6200] pl-8"
            >
              <h2 className="text-[12px] font-black tracking-[0.4em] text-[#4D148C] uppercase mb-4">
                ENTERPRISE LOGISTICS
              </h2>
              <h3 className="text-4xl md:text-6xl font-black text-slate-900 leading-[0.9] uppercase tracking-tighter mb-8">
                Solutions for <br />
                <span className="text-[#4D148C]">Global Commerce.</span>
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed max-w-xl font-medium">
                We provide the critical infrastructure for modern supply chains. Programmable, reliable, and built for 24/7 operations.
              </p>
            </motion.div>

            <div className="grid gap-px bg-gray-200 border border-gray-200 shadow-xl">
              {features.map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative p-8 bg-white hover:bg-slate-50 transition-all duration-300"
                >
                  <div className="flex gap-6">
                    <div className="w-14 h-14 flex items-center justify-center bg-slate-50 text-[#4D148C] group-hover:bg-[#4D148C] group-hover:text-white transition-all duration-500 shrink-0">
                      <item.icon className="w-7 h-7" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-slate-900 mb-2 tracking-tight">{item.title}</h4>
                      <p className="text-slate-500 text-sm leading-relaxed mb-4 font-medium">{item.text}</p>
                      <div className="flex flex-wrap gap-4">
                        {item.tags.map(tag => (
                          <span key={tag} className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-[#FF6200] transition-colors">
                            <CheckCircle2 className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Subtle Hover Slide Border */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#FF6200] scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: High-Intensity CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 w-full lg:sticky lg:top-24"
          >
            <div className="bg-[#4D148C] p-10 md:p-16 text-white relative overflow-hidden shadow-2xl">
              {/* FedEx Industrial Pattern Overlay */}
              <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none" 
                   style={{ backgroundImage: `repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)`, backgroundSize: '10px 10px' }} />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                    <div className="px-3 py-1 bg-[#FF6200] text-[10px] font-black uppercase tracking-[0.2em]">Live Status</div>
                    <div className="flex items-center gap-2 text-[10px] font-black text-purple-200 uppercase tracking-widest">
                        <Globe2 className="w-3 h-3" /> 220+ Countries
                    </div>
                </div>

                <h3 className="text-3xl md:text-5xl font-black mb-6 leading-none uppercase tracking-tighter">
                  Optimize your <br />
                  <span className="text-[#FF6200]">Supply Chain.</span>
                </h3>
                <p className="text-purple-100 text-lg mb-10 leading-relaxed font-medium">
                  Integrate our delivery engine directly into your workflow and gain absolute visibility over every shipment.
                </p>

                <div className="flex flex-col gap-4">
                  <Link
                    href="/auth/register"
                    className="group flex items-center justify-between bg-white text-[#4D148C] px-8 py-5 font-black uppercase text-xs tracking-widest hover:bg-[#FF6200] hover:text-white transition-all active:scale-95 shadow-lg"
                  >
                    Open Business Account
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-[#FF6200] group-hover:text-white" />
                  </Link>
                  <button className="w-full py-4 text-purple-300 font-black text-[11px] hover:text-white transition-colors tracking-[0.2em] uppercase border border-purple-400/30 hover:border-white">
                    Request Technical Specs
                  </button>
                </div>
                
                {/* Proof Point Grid */}
                <div className="mt-16 pt-12 border-t border-white/10 grid grid-cols-2 gap-8">
                  <div>
                    <div className="text-4xl font-black text-white flex items-baseline gap-1">
                        99<span className="text-[#FF6200] text-2xl">.9</span>
                        <span className="text-sm text-purple-300">%</span>
                    </div>
                    <div className="text-[9px] text-purple-300 uppercase font-black tracking-[0.2em] mt-2">Network Reliability</div>
                  </div>
                  <div>
                    <div className="text-4xl font-black text-white flex items-baseline gap-1">
                        &lt;15<span className="text-[#FF6200] text-2xl">m</span>
                    </div>
                    <div className="text-[9px] text-purple-300 uppercase font-black tracking-[0.2em] mt-2">API Response Time</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Trust Indicator */}
            <div className="mt-8 flex items-center justify-center gap-8 opacity-40 grayscale group-hover:grayscale-0 transition-all">
                <TrendingUp className="w-5 h-5" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Fortune 500 Trusted Partner</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}