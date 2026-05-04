"use client";

import { ArrowUp, Globe } from "lucide-react";
import { motion } from "framer-motion";

// Brand Icons
const Facebook = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
);

const TwitterX = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.494h2.039L6.486 3.24H4.298l13.311 17.407z"/></svg>
);

const Linkedin = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
);

export default function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const socialLinks = [
    { icon: Facebook, href: "#" },
    { icon: TwitterX, href: "#" },
    { icon: Linkedin, href: "#" },
  ];

  return (
    <footer className="relative bg-[#F2F2F2] text-slate-10 border-[#4D148C] pt-20 pb-8">
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand/Identity Column */}
          <div className="space-y-6">
            <h3 className="text-3xl font-black tracking-tighter text-[#4D148C]">
              Fedex<span className="text-[#FF6200]">Express</span>
            </h3>
            <p className="text-sm font-medium leading-relaxed text-slate-500">
              Providing reliable global shipping and supply chain management 
              solutions for businesses of all sizes.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <a 
                  key={i} 
                  href={social.href}
                  className="text-[#4D148C] hover:text-[#FF6200] transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Structured Link Columns */}
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-900 mb-6 border-b border-slate-300 pb-2">
              Our Company
            </h4>
            <ul className="space-y-3 text-sm font-bold">
              {["About Us", "Careers", "Sustainability", "Newsroom"].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-[#4D148C] hover:underline underline-offset-4 block">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-900 mb-6 border-b border-slate-300 pb-2">
              Customer Support
            </h4>
            <ul className="space-y-3 text-sm font-bold">
              {["Contact Us", "Shipping Tools", "Claims", "Fuel Surcharge"].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-[#4D148C] hover:underline underline-offset-4 block">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Regional/Language Selector Style */}
          <div className="bg-white p-6 shadow-sm border border-slate-200">
            <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-900 mb-4">
              Language & Region
            </h4>
            <button className="w-full flex items-center justify-between bg-slate-100 px-4 py-3 text-xs font-black uppercase tracking-wider text-[#4D148C] hover:bg-slate-200 transition-colors">
              <span className="flex items-center gap-2">
                <Globe className="w-4 h-4" /> United States
              </span>
              <span>English</span>
            </button>
            <p className="mt-4 text-[10px] text-slate-400 font-bold leading-tight">
              Access localized rates, schedules, and carrier information for your specific region.
            </p>
          </div>
        </div>

        {/* Bottom Technical Bar */}
        <div className="bg-[#4D148C] mx-6 px-6 py-4 mt-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] font-bold text-white uppercase tracking-wider">
            © Fedex Express 1998-2026
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-[10px] font-black text-white uppercase tracking-[0.15em]">
            <a href="#" className="hover:text-[#FF6200] transition-colors">Site Map</a>
            <a href="#" className="hover:text-[#FF6200] transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-[#FF6200] transition-colors">Privacy & Security</a>
          </div>
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 text-white font-black text-[10px] uppercase hover:text-[#FF6200] transition-colors"
          >
            Back to Top <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
}