"use client";

import { motion, Variants } from "framer-motion";
import { Plane, Truck, Ship, Warehouse, ArrowRight, ExternalLink } from "lucide-react";

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
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

/* ---------------- COMPONENT ---------------- */

export default function Services() {
  const services = [
    {
      icon: Plane,
      title: "Express Shipping",
      subtitle: "TIME-DEFINITE",
      text: "Global air freight and document delivery with prioritized handling.",
      brand: "text-[#4D148C]", // FedEx Purple
      accent: "bg-[#FF6200]", // FedEx Orange
    },
    {
      icon: Truck,
      title: "Road Freight",
      subtitle: "DAY-DEFINITE",
      text: "Reliable regional ground transportation for heavy or bulky freight.",
      brand: "text-[#4D148C]",
      accent: "bg-[#4D148C]",
    },
    {
      icon: Ship,
      title: "Ocean Cargo",
      subtitle: "COST-EFFECTIVE",
      text: "Strategic sea freight solutions for high-volume international trade.",
      brand: "text-[#4D148C]",
      accent: "bg-slate-400",
    },
    {
      icon: Warehouse,
      title: "Warehousing",
      subtitle: "SUPPLY CHAIN",
      text: "Full-scale inventory management and high-velocity distribution.",
      brand: "text-[#4D148C]",
      accent: "bg-[#FF6200]",
    },
  ];

  return (
    <section className="relative py-24 bg-white overflow-hidden border-t border-gray-100">
      {/* Background: FedEx uses clean white space, not colorful blurs */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
        <div className="absolute top-10 right-10 text-[20rem] font-black tracking-tighter text-[#4D148C]">GTX</div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header: Shifted to a more corporate, bold layout */}
        <div className="border-l-8 border-[#FF6200] pl-6 mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xs font-black tracking-[0.3em] text-[#4D148C] uppercase mb-2">
              SERVICE PORTFOLIO
            </h2>
            <h3 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-none uppercase">
              Global <span className="text-[#4D148C]">Solutions.</span><br />
              Local <span className="text-[#FF6200]">Precision.</span>
            </h3>
          </motion.div>
        </div>

        {/* Services Grid: Removing rounded-3xl for a more professional rounded-sm/md */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 border border-gray-200"
        >
          {services.map(({ icon: Icon, title, subtitle, text, brand, accent }, index) => (
            <motion.div
              key={title}
              variants={cardVariants}
              className="group relative p-10 bg-white hover:bg-[#fafafa] transition-all duration-300 overflow-hidden"
            >
              {/* Category Subtitle */}
              <p className="text-[10px] font-black tracking-widest text-slate-400 mb-6 uppercase">
                {subtitle}
              </p>

              {/* Icon Container */}
              <div className="mb-8">
                <div className="relative inline-flex">
                  <Icon className={`w-12 h-12 ${brand} relative z-10`} strokeWidth={1.5} />
                  {/* Subtle background shape behind icon */}
                  <div className="absolute -top-1 -right-1 w-8 h-8 bg-gray-100 rounded-full z-0" />
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h4 className="font-bold text-2xl text-slate-900 mb-4 tracking-tight">
                  {title}
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed mb-10 min-h-15">
                  {text}
                </p>
                
                {/* FedEx Style Action Link */}
                <Link 
                  href="#" 
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#4D148C] hover:text-[#FF6200] transition-colors group/link"
                >
                  View Details
                  <ExternalLink className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </Link>
              </div>

              {/* The "FedEx Edge": Top Accent Bar */}
              <div className={`absolute top-0 left-0 w-full h-1 ${accent} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Utility Link */}
        <div className="mt-16 flex justify-center">
            <button className="bg-[#4D148C] text-white px-10 py-4 font-black uppercase text-xs tracking-widest hover:bg-[#330c5f] transition-all flex items-center gap-3">
                All Service Rates
                <ArrowRight className="w-4 h-4 text-[#FF6200]" />
            </button>
        </div>
      </div>
    </section>
  );
}

// Simple Link Wrapper if not using Next.js Link
function Link({ href, children, className }: any) {
    return <a href={href} className={className}>{children}</a>
}