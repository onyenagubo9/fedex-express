"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  User, 
  ChevronDown, 
  Menu, 
  X, 
  Globe, 
  HelpCircle, 
  ArrowRight 
} from "lucide-react";

/* ---------------- DATA ---------------- */

const navLinks = [
  { 
    name: "Shipping", 
    href: "/shipping", 
    items: [
      { label: "Create a Shipment", href: "/shipping/create" },
      { label: "Shipping Rates", href: "/shipping/rates" },
      { label: "Schedules", href: "/shipping" },
      { label: "Packing Services", href: "/shipping/packing" }
    ] 
  },
  { 
    name: "Tracking", 
    href: "/tracking", 
    items: [
      { label: "Track a Package", href: "/track" },
      { label: "Advanced Tracking", href: "/track/advanced" },
      { label: "Manage Deliveries", href: "/track/manage" }
    ] 
  },
  
  { 
    name: "Locations", 
    href: "/locations", 
    items: [
      { label: "Find a Location", href: "/locations" },
      { label: "Drop off a Package", href: "/locations/drop-off" }
    ] 
  },
];

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setActiveMenu(null);
    setIsSearchOpen(false);
  }, [pathname]);

  return (
    <header className={`fixed top-0 w-full z-100 transition-all duration-500 ${scrolled ? "shadow-lg" : ""}`}>
      
      {/* 1. TOP UTILITY BAR (Refined for Enterprise look) */}
      <div className={`bg-[#F8F8F8] border-b border-gray-200 hidden md:block transition-all duration-500 ease-in-out ${scrolled ? "h-0 opacity-0 overflow-hidden" : "h-10 opacity-100"}`}>
        <div className="max-w-7xl mx-auto px-8 h-full flex justify-end items-center gap-6 text-[10px] font-bold text-[#4D148C] uppercase tracking-[0.15em]">
          <Link href="/language" className="flex items-center gap-1.5 hover:text-[#FF6200] transition-colors">
            <Globe className="w-3 h-3" /> Language
          </Link>
          <Link href="/support" className="flex items-center gap-1.5 hover:text-[#FF6200] transition-colors">
            <HelpCircle className="w-3 h-3" /> Support
          </Link>
          <div className="h-3 w-px bg-gray-300" />
          <Link href="/register" className="text-[#FF6200] hover:text-[#4D148C] transition-colors">Open an Account</Link>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION (Added Glassmorphism on scroll) */}
      <div className={`transition-all duration-500 ${scrolled ? "bg-[#4D148C]/95 backdrop-blur-md" : "bg-[#4D148C]"} text-white`}>
        <div className={`max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between transition-all duration-500 ${scrolled ? "h-16" : "h-20"}`}>
          
          <div className="flex items-center h-full">
            {/* LOGO */}
            <Link href="/" className="flex items-center mr-10 scale-90 md:scale-100 transition-transform hover:opacity-90">
              <span className="text-3xl font-black tracking-tighter uppercase italic">Fed</span>
              <span className="text-3xl font-black tracking-tighter uppercase italic text-[#FF6200]">ex</span>
            </Link>

            {/* DESKTOP LINKS */}
            <nav className="hidden lg:flex items-center h-full">
              {navLinks.map((link) => (
                <div 
                  key={link.name}
                  className="relative h-full"
                  onMouseEnter={() => setActiveMenu(link.name)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <button
                    className={`px-5 h-full flex items-center gap-1.5 text-[12px] font-black uppercase tracking-widest transition-all relative ${
                      activeMenu === link.name || pathname.startsWith(link.href) ? "text-[#FF6200]" : "hover:text-[#FF6200]"
                    }`}
                  >
                    {link.name}
                    <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${activeMenu === link.name ? "rotate-180" : ""}`} />
                    
                    {/* Sliding Underline Indicator */}
                    {(activeMenu === link.name || pathname.startsWith(link.href)) && (
                      <motion.div layoutId="nav-line" className="absolute bottom-0 left-0 right-0 h-1 bg-[#FF6200]" />
                    )}
                  </button>

                  <AnimatePresence>
                    {activeMenu === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 w-60 bg-white shadow-2xl border-b-4 border-[#FF6200] overflow-hidden"
                      >
                        {/* Sub-headings removed for a cleaner dropdown */}
                        {link.items.map((item) => (
                          <Link 
                            key={item.label} 
                            href={item.href} 
                            className="flex items-center justify-between px-6 py-4 text-[11px] font-black uppercase text-gray-700 hover:bg-gray-50 hover:text-[#4D148C] group border-b border-gray-50 last:border-0 transition-all"
                          >
                            {item.label}
                            <ArrowRight className="w-3.5 h-3.5 text-[#FF6200] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-2">
            <Link href="/auth/login" className="hidden sm:flex items-center gap-2 px-6 py-2 text-[11px] font-black uppercase tracking-[0.15em] border border-white/30 hover:border-[#FF6200] hover:text-[#FF6200] transition-all rounded-sm">
              <User className="w-3.5 h-3.5" />
              Sign In
            </Link>
            
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-3 hover:text-[#FF6200] transition-colors"
            >
              {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
            </button>

            <button className="lg:hidden p-3" onClick={() => setIsMobileOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* SEARCH OVERLAY (Minimalist Dark Theme) */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }}
            className="bg-[#330c5f] text-white overflow-hidden shadow-inner"
          >
            <div className="max-w-4xl mx-auto py-12 px-6">
              <div className="flex gap-4 border-b-2 border-white/20 focus-within:border-[#FF6200] transition-colors">
                <input 
                  type="text" 
                  placeholder="Enter Tracking ID or Keywords..." 
                  className="bg-transparent flex-1 py-4 text-xl font-medium outline-none placeholder:text-white/30"
                  autoFocus
                />
                <button className="px-6 group">
                   <ArrowRight className="w-6 h-6 group-hover:text-[#FF6200] transition-colors" />
                </button>
              </div>
              <p className="mt-4 text-[9px] uppercase font-bold tracking-[0.4em] text-white/40">Logistics Search Engine</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div 
            initial={{ x: "100%" }} 
            animate={{ x: 0 }} 
            exit={{ x: "100%" }} 
            transition={{ type: "tween", duration: 0.4 }}
            className="fixed inset-0 bg-[#4D148C] z-200 lg:hidden flex flex-col"
          >
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <div className="italic">
                <span className="text-2xl font-black uppercase">Fed</span>
                <span className="text-2xl font-black uppercase text-[#FF6200]">ex</span>
              </div>
              <button onClick={() => setIsMobileOpen(false)} className="p-2 border border-white/20 rounded-full">
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {navLinks.map((link) => (
                <div key={link.name} className="border-b border-white/10 pb-6">
                  <p className="text-[#FF6200] text-[10px] font-black uppercase tracking-[0.2em] mb-4">{link.name}</p>
                  <div className="flex flex-col gap-5">
                    {link.items.map(item => (
                      <Link key={item.label} href={item.href} className="text-xl font-bold text-white hover:text-[#FF6200]">
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}