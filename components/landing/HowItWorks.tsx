"use client";

import { motion, Variants } from "framer-motion";
import { PackagePlus, Truck, MapPin, CheckCircle, ArrowRight } from "lucide-react";

/* ---------------- ANIMATION VARIANTS ---------------- */

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const stepVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

/* ---------------- COMPONENT ---------------- */

export default function HowItWorks() {
  const steps = [
    {
      icon: PackagePlus,
      title: "CREATE SHIPMENT",
      text: "Enter shipment details and generate a tracking number instantly.",
    },
    {
      icon: Truck,
      title: "PICKUP & TRANSIT",
      text: "Our global logistics network collects and moves your package.",
    },
    {
      icon: MapPin,
      title: "REAL-TIME TRACKING",
      text: "Monitor every mile of the journey with live status updates.",
    },
    {
      icon: CheckCircle,
      title: "SECURE DELIVERY",
      text: "Your package arrives safely at its final destination.",
    },
  ];

  return (
    <section className="relative py-24 bg-slate-50 overflow-hidden">
      {/* Background Decorative Element: Subtle and Professional */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#4D148C]/2 -skew-x-12 translate-x-20" />

      <div className="relative z-20 max-w-7xl mx-auto px-6">
        {/* Header: FedEx Style - Bold and Informative */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 border-b border-gray-200 pb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="text-[12px] font-black tracking-[0.3em] text-[#FF6200] uppercase mb-4">
              PROCESS OVERVIEW
            </h2>
            <h3 className="text-4xl md:text-5xl font-black text-[#4D148C] leading-none uppercase tracking-tighter">
              The Journey of <br />
              <span className="text-slate-900">Your Shipment.</span>
            </h3>
          </motion.div>
          <div className="hidden md:block text-right">
            <p className="text-sm font-bold text-slate-500 max-w-xs">
              Streamlined logistics for maximum speed and total visibility.
            </p>
          </div>
        </div>

        {/* Steps Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          {steps.map(({ icon: Icon, title, text }, index) => (
            <motion.div
              key={title}
              variants={stepVariants}
              className="relative bg-white border border-gray-200 p-8 flex flex-col items-start hover:shadow-xl transition-shadow duration-300 group"
            >
              {/* Step Numbering - FedEx "tab" style */}
              <div className="absolute top-0 right-0 bg-[#f2f2f2] group-hover:bg-[#FF6200] group-hover:text-white transition-colors px-4 py-1 text-[10px] font-black text-slate-400">
                STEP 0{index + 1}
              </div>

              {/* Icon - Using FedEx Purple */}
              <div className="mb-8 p-4 bg-slate-50 rounded-lg group-hover:bg-[#4D148C]/5 transition-colors">
                <Icon className="w-10 h-10 text-[#4D148C]" strokeWidth={1.5} />
              </div>

              {/* Content */}
              <h4 className="font-black text-lg text-slate-900 mb-3 tracking-tight group-hover:text-[#4D148C] transition-colors">
                {title}
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                {text}
              </p>

              {/* Connector Arrow (Desktop Only) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute -right-6 top-1/2 -translate-y-1/2 z-30">
                  <div className="bg-white p-1 rounded-full border border-gray-100 shadow-sm">
                    <ArrowRight className="w-4 h-4 text-[#FF6200]" />
                  </div>
                </div>
              )}
              
              {/* Hover Bottom Accent Bar */}
              <div className="absolute bottom-0 left-0 h-1 bg-[#FF6200] w-0 group-hover:w-full transition-all duration-300" />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA Button */}
        <div className="mt-16 flex justify-center">
            <button className="flex items-center gap-4 bg-[#4D148C] text-white px-8 py-4 font-black uppercase text-xs tracking-widest hover:bg-[#330c5f] transition-all shadow-lg">
                Start Shipping Now
                <ArrowRight className="w-4 h-4 text-[#FF6200]" />
            </button>
        </div>
      </div>
    </section>
  );
}