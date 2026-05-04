"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Globe, Package, Clock, Headphones, ArrowUpRight } from "lucide-react";

/* ---------------- COUNT UP COMPONENT ---------------- */

function CountUp({
  value,
  suffix = "",
  duration = 2000,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const incrementTime = 16;
    const totalSteps = duration / incrementTime;
    const increment = end / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return (
    <>
      {count.toLocaleString()}
      {suffix}
    </>
  );
}

/* ---------------- COMPONENT ---------------- */

export default function GlobalCoverage() {
  const stats = [
    {
      icon: Globe,
      value: 220,
      suffix: "+",
      label: "COUNTRIES & TERRITORIES",
      description: "Unmatched global reach across every continent."
    },
    {
      icon: Package,
      value: 15,
      suffix: "M+",
      label: "SHIPMENTS DAILY",
      description: "High-velocity throughput powered by automation."
    },
    {
      icon: Clock,
      value: 99,
      suffix: ".9%",
      label: "RELIABILITY RATE",
      description: "Commitment to time-definite delivery excellence."
    },
    {
      icon: Headphones,
      value: 24,
      suffix: "/7",
      label: "GLOBAL SUPPORT",
      description: "Dedicated assistance in over 30 languages."
    },
  ];

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* FedEx Accent Header Background */}
      <div className="absolute top-0 left-0 w-full h-100 bg-[#4D148C] z-0" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header: Left Aligned & Industrial */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl"
          >
            <h2 className="text-[12px] font-black tracking-[0.4em] text-[#FF6200] uppercase mb-4">
              NETWORK SCALE
            </h2>
            <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none mb-6">
              Moving the world <br />
              <span className="text-[#FF6200]">at the speed of now.</span>
            </h3>
            <p className="text-xl text-purple-100 max-w-2xl leading-relaxed">
              Our infrastructure is built for scale, precision, and absolute transparency. 
              From local routes to global air freight, we are where your business needs to be.
            </p>
          </motion.div>
        </div>

        {/* Stats Grid: Integrated Card Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 shadow-2xl">
          {stats.map(({ icon: Icon, value, suffix, label, description }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="group bg-white p-10 flex flex-col items-start transition-all duration-300 hover:bg-[#fafafa]"
            >
              {/* Icon - Minimal FedEx Style */}
              <div className="mb-10">
                <Icon className="w-8 h-8 text-[#4D148C]" strokeWidth={1.5} />
              </div>

              {/* Number: Using the iconic Orange for the primary metric */}
              <div className="text-4xl md:text-5xl font-black text-[#FF6200] mb-2 tracking-tighter">
                <CountUp value={value} suffix={suffix} />
              </div>

              {/* Label: Small-caps and Bold */}
              <p className="text-xs font-black text-[#4D148C] tracking-widest uppercase mb-4">
                {label}
              </p>
              
              <div className="h-0.5 w-10 bg-gray-200 group-hover:w-full group-hover:bg-[#FF6200] transition-all duration-500 mb-4" />

              <p className="text-sm text-gray-500 leading-relaxed">
                {description}
              </p>

              {/* Action affordance */}
              <button className="mt-8 flex items-center gap-2 text-[10px] font-bold text-gray-400 group-hover:text-[#4D148C] transition-colors uppercase tracking-widest">
                Network Data <ArrowUpRight className="w-3 h-3" />
              </button>
            </motion.div>
          ))}
        </div>
        
        {/* Bottom Proof Point */}
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-16 flex items-center gap-4 text-slate-400"
        >
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-[10px] font-bold uppercase tracking-widest italic">Live Operations Data 2026</span>
            <div className="h-px flex-1 bg-gray-200" />
        </motion.div>
      </div>
    </section>
  );
}