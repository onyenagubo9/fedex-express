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
  Package, 
  Truck, 
  MapPin, 
  ArrowRight 
} from "lucide-react";

/* ---------------- TYPES & DATA ---------------- */

const navLinks = [
  { 
    name: "Shipping", 
    href: "/shipping", 
    items: [
      { label: "Create a Shipment", href: "/shipping/create" },
      { label: "Shipping Rates", href: "/shipping/rates" },
      { label: "Schedules", href: "/shipping/schedules" },
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
    name: "Design & Print", 
    href: "/design-print", 
    items: [
      { label: "Business Printing", href: "/design-print/business" },
      { label: "Signs & Banners", href: "/design-print/signs" },
      { label: "Marketing Materials", href: "/design-print/marketing" }
    ] 
  },
  { 
    name: "Locations", 
    href: "/locations", 
    items: [
      { label: "Find a Location", href: "/locations/find" },
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

  // Handle scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileOpen(false);
    setActiveMenu(null);
    setIsSearchOpen(false);
  }, [pathname]);

  return (
    <header className={`fixed top-0 w-full z-[100] font-sans transition-all duration-300 ${scrolled ? "shadow-2xl" : ""}`}>
      
      {/* 1. TOP UTILITY BAR */}
      <div className="bg-[#F2F2F2] border-b border-gray-300 hidden md:block overflow-hidden transition-all duration-300" style={{ height: scrolled ? '0px' : '40px' }}>
        <div className="max-w-7xl mx-auto px-8 h-10 flex justify-end items-center gap-8 text-[11px] font-black text-[#4D148C] uppercase tracking-widest">
          <Link href="/language" className="flex items-center gap-1.5 hover:text-[#FF6200] transition-colors">
            <Globe className="w-3.5 h-3.5" /> English
          </Link>
          <Link href="/support" className="flex items-center gap-1.5 hover:text-[#FF6200] transition-colors">
            <HelpCircle className="w-3.5 h-3.5" /> Support
          </Link>
          <Link href="/register" className="text-[#FF6200] hover:underline">Open an Account</Link>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION */}
      <div className="bg-[#4D148C] text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          
          <div className="flex items-center h-full gap-4">
            {/* LOGO */}
            <Link href="/" className="flex items-center group mr-6">
              <span className="text-3xl font-black tracking-tighter uppercase transition-transform group-hover:scale-105">Fed</span>
              <span className="text-3xl font-black tracking-tighter uppercase text-[#FF6200] transition-transform group-hover:scale-105">ex</span>
            </Link>

            {/* DESKTOP LINKS */}
            <nav className="hidden lg:flex items-center h-full">
              {navLinks.map((link) => (
                <div 
                  key={link.name}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => setActiveMenu(link.name)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <Link
                    href={link.href}
                    className={`px-6 h-full flex items-center gap-1 text-[13px] font-black uppercase tracking-wider transition-all ${
                      activeMenu === link.name || pathname.startsWith(link.href) ? "bg-[#330c5f] text-[#FF6200]" : "hover:bg-[#330c5f]"
                    }`}
                  >
                    {link.name}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeMenu === link.name ? "rotate-180" : ""}`} />
                  </Link>

                  {/* MEGA MENU DROPDOWN */}
                  <AnimatePresence>
                    {activeMenu === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 15 }}
                        className="absolute top-20 left-0 w-[280px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-t-4 border-[#FF6200] py-4"
                      >
                        <div className="px-6 mb-2">
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{link.name} Services</p>
                        </div>
                        {link.items.map((item) => (
                          <Link 
                            key={item.label} 
                            href={item.href} 
                            className="flex items-center justify-between px-6 py-4 text-[13px] font-black uppercase text-gray-800 hover:bg-gray-50 hover:text-[#4D148C] group transition-all"
                          >
                            {item.label}
                            <ArrowRight className="w-4 h-4 text-[#FF6200] opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
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
          <div className="flex items-center gap-1">
            <Link href="/auth/login" className="hidden md:flex items-center gap-2 px-5 py-2 text-[12px] font-black uppercase tracking-widest hover:bg-[#330c5f] rounded-full border border-white/20 transition-all">
              <User className="w-4 h-4 text-[#FF6200]" />
              Sign In
            </Link>
            <div className="h-6 w-px bg-white/20 hidden md:block mx-3" />
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-3 hover:bg-[#330c5f] rounded-full transition-all relative"
            >
              {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
            </button>
            <button className="lg:hidden p-3 hover:bg-[#330c5f] rounded-full transition-all" onClick={() => setIsMobileOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* SEARCH OVERLAY */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }}
            className="bg-white border-b border-gray-200 overflow-hidden"
          >
            <div className="max-w-4xl mx-auto py-10 px-6 flex gap-4">
              <input 
                type="text" 
                placeholder="Track, Ship, Search..." 
                className="flex-1 border-b-2 border-[#4D148C] py-4 text-2xl font-bold outline-none text-gray-800 placeholder:text-gray-300"
                autoFocus
              />
              <button className="bg-[#4D148C] text-white px-10 py-4 font-black uppercase tracking-widest hover:bg-[#FF6200] transition-colors">Search</button>
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
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-[#4D148C] z-[200] lg:hidden flex flex-col"
          >
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <div className="flex items-center">
                <span className="text-2xl font-black tracking-tighter uppercase">Fed</span>
                <span className="text-2xl font-black tracking-tighter uppercase text-[#FF6200]">ex</span>
              </div>
              <button onClick={() => setIsMobileOpen(false)} className="p-2 bg-white/10 rounded-full"><X className="w-8 h-8 text-white" /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-10">
              {navLinks.map((link) => (
                <div key={link.name}>
                  <Link href={link.href} className="text-[#FF6200] text-xs font-black uppercase tracking-[0.3em] mb-6 block">{link.name}</Link>
                  <div className="grid grid-cols-1 gap-6 pl-4 border-l-2 border-white/10">
                    {link.items.map(item => (
                      <Link key={item.label} href={item.href} className="text-2xl font-bold hover:text-[#FF6200] transition-colors flex items-center gap-3">
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-8 bg-[#330c5f] flex flex-col gap-4">
              <Link href="/auth/login" className="bg-[#FF6200] text-white text-center py-5 rounded-md font-black uppercase tracking-[0.2em] shadow-xl">Sign In / Register</Link>
              <div className="flex justify-center gap-8 py-4">
                <Link href="/locations" className="text-white/60 flex flex-col items-center gap-1 font-bold text-[10px] uppercase"><MapPin className="w-5 h-5"/> Locations</Link>
                <Link href="/tracking" className="text-white/60 flex flex-col items-center gap-1 font-bold text-[10px] uppercase"><Truck className="w-5 h-5"/> Track</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}