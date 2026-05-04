"use client";

import { motion, Variants } from "framer-motion";
import { ShieldCheck, Clock, Globe, Headphones, ArrowRight } from "lucide-react";

/* ---------------- ANIMATION VARIANTS ---------------- */

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

/* ---------------- COMPONENT ---------------- */

export default function WhyChooseUs() {
  const reasons = [
    { 
      icon: ShieldCheck, 
      title: "SECURE HANDLING", 
      desc: "Advanced security protocols and full-value protection for peace of mind." 
    },
    { 
      icon: Clock, 
      title: "ON-TIME PRECISION", 
      desc: "Industry-leading punctuality backed by our global logistics network." 
    },
    { 
      icon: Globe, 
      title: "GLOBAL COVERAGE", 
      desc: "Seamless door-to-door delivery across 220+ countries and territories." 
    },
    { 
      icon: Headphones, 
      title: "EXPERT SUPPORT", 
      desc: "24/7 dedicated assistance from logistics professionals worldwide." 
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden border-t border-gray-100">
      {/* Structural Accent - FedEx Style */}
      <div className="absolute top-0 left-0 w-full h-2 bg-[#4D148C]" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header - Bold, Left-Aligned, and Corporate */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8 border-l-8 border-[#FF6200] pl-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="text-[12px] font-black tracking-[0.3em] text-[#4D148C] uppercase mb-3">
              THE GOTEX ADVANTAGE
            </h2>
            <h3 className="text-4xl md:text-6xl font-black text-slate-900 leading-[0.9] uppercase tracking-tighter">
              Reliability <br />
              <span className="text-[#4D148C]">Delivered.</span>
            </h3>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-slate-500 max-w-xs font-bold text-sm leading-relaxed"
          >
            Setting the global standard in logistics through innovation, speed, and absolute protection.
          </motion.p>
        </div>

        {/* Reasons Grid - Minimal & High Contrast */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 border border-gray-200 shadow-2xl"
        >
          {reasons.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={cardVariants}
              className="group relative p-10 bg-white hover:bg-slate-50 transition-all duration-300 overflow-hidden"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-[#FF6200] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              {/* Icon - FedEx Purple */}
              <div className="relative mb-8">
                <div className="w-14 h-14 flex items-center justify-center bg-slate-50 rounded-lg group-hover:bg-[#4D148C]/5 transition-colors">
                  <Icon className="w-8 h-8 text-[#4D148C]" strokeWidth={1.5} />
                </div>
              </div>

              {/* Text Content */}
              <h3 className="font-black text-lg text-slate-900 mb-4 tracking-tight group-hover:text-[#4D148C] transition-colors">
                {title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-8">
                {desc}
              </p>

              {/* FedEx Style Action Link */}
              <div className="flex items-center gap-2 text-[11px] font-black text-[#4D148C] uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                Learn More <ArrowRight className="w-3.5 h-3.5 text-[#FF6200]" />
              </div>
              
              {/* Corner Watermark */}
              <div className="absolute -bottom-4 -right-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                <Icon className="w-24 h-24 text-[#4D148C]" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Support Footer */}
        <div className="mt-16 text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
            Trusted by over 1.2M businesses worldwide
          </p>
        </div>
      </div>
    </section>
  );
}