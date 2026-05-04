"use client";

import { Package, Calculator, Building2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ActionCards() {
  const cards = [
    {
      icon: Package,
      title: "SHIP",
      subtitle: "CREATE A SHIPMENT",
      text: "Send parcels locally or internationally with trusted logistics partners.",
      color: "#4D148C", // FedEx Purple
    },
    {
      icon: Calculator,
      title: "RATE & SHIP",
      subtitle: "GET A QUOTE",
      text: "Calculate delivery costs instantly with transparent pricing and speed.",
    },
    {
      icon: Building2,
      title: "BUSINESS",
      subtitle: "ENTERPRISE SOLUTIONS",
      text: "Logistics solutions tailored for growing businesses and global enterprises.",
    },
  ];

  return (
    <section className="-mt-16 max-w-7xl mx-auto px-4 md:px-8 relative z-20">
      <div className="grid md:grid-cols-3 gap-0 shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
        {cards.map(({ icon: Icon, title, subtitle, text }, index) => (
          <motion.div
            key={title}
            whileHover="hover"
            initial="rest"
            className="group relative bg-white p-10 flex flex-col items-start border-r border-gray-100 last:border-none cursor-pointer transition-all duration-300"
          >
            {/* Top Label (The FedEx 'Category' feel) */}
            <span className="text-[10px] font-black tracking-[0.2em] text-[#4D148C] mb-2 opacity-70">
              {title}
            </span>

            <div className="flex items-start gap-5 mb-6">
              <div className="p-3 bg-gray-50 rounded-lg group-hover:bg-[#4D148C]/5 transition-colors">
                <Icon className="w-10 h-10 text-[#4D148C]" strokeWidth={1.5} />
              </div>
            </div>

            <h3 className="font-black text-xl text-gray-900 mb-3 tracking-tight group-hover:text-[#4D148C] transition-colors">
              {subtitle}
            </h3>

            <p className="text-[14px] text-gray-600 leading-relaxed mb-8">
              {text}
            </p>

            {/* Action Link */}
            <div className="mt-auto flex items-center gap-2 text-[#4D148C] font-bold text-sm">
              <span>Get Started</span>
              <motion.div
                variants={{
                  rest: { x: 0 },
                  hover: { x: 5 }
                }}
              >
                <ArrowRight className="w-4 h-4 text-[#FF6200]" />
              </motion.div>
            </div>

            {/* The Signature FedEx Orange Bottom Bar */}
            <motion.div 
              variants={{
                rest: { scaleX: 0 },
                hover: { scaleX: 1 }
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#FF6200] origin-left"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}