"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Truck,
  Users,
  MapPin,
  Settings,
  Menu,
  X,
  ChevronRight,
  Bell,
  ExternalLink
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard, exact: true },
  { name: "View Orders", href: "/dashboard/admin/orders", icon: Package, badge: "12" },
  { name: "Riders", href: "/dashboard/admin/riders", icon: Truck },
  { name: "Chats", href: "/dashboard/admin/chats", icon: Users, badge: "New" },
  { name: "Tracking", href: "/dashboard/admin/tracking", icon: MapPin },
  { name: "Settings", href: "/dashboard/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Navigation - Refined */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-6 bg-[#4D148C] text-white z-60 shadow-[0_4px_20px_rgba(77,20,140,0.3)]">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
            <span className="text-[#4D148C] font-black text-lg">F</span>
          </div>
          <div className="text-xl font-black tracking-tighter">
            <span className="text-white">Fed</span><span className="text-[#FF6200]">ex</span>
          </div>
        </div>
        <button 
          onClick={() => setOpen(!open)} 
          className="p-2 active:scale-95 transition-transform bg-white/10 rounded-full"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Overlay with high blur */}
      {open && (
        <div
          className="fixed inset-0 bg-[#030816]/60 backdrop-blur-md z-40 md:hidden transition-opacity"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-70 bg-white border-r border-gray-100
          flex flex-col transform transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
          md:sticky md:top-0 md:h-screen md:translate-x-0
          ${open ? "translate-x-0 shadow-2xl" : "-translate-x-full"}
        `}
      >
        {/* Branding Header */}
        <div className="h-24 flex items-center px-8 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#FF6200] opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-baseline text-3xl font-black tracking-tighter transition-transform group-hover:scale-105 duration-300">
            <span className="text-[#4D148C]">Fed</span>
            <span className="text-[#FF6200]">ex</span>
            <span className="ml-1 text-[10px] font-bold text-gray-300 uppercase tracking-widest">Admin</span>
          </div>
        </div>

        {/* Primary Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-8 custom-scrollbar">
          <div>
            <p className="px-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">
              Management
            </p>
            <div className="space-y-1.5">
              {navItems.map(({ name, href, icon: Icon, exact, badge }) => {
                const active = exact ? pathname === href : pathname.startsWith(href);

                return (
                  <Link
                    key={name}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`
                      group relative flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-300
                      ${active 
                        ? "bg-[#4D148C]/5 shadow-[0_4px_12px_rgba(77,20,140,0.08)]" 
                        : "hover:bg-gray-50 hover:translate-x-1"
                      }
                    `}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`
                        p-2 rounded-md transition-colors duration-300
                        ${active ? "bg-[#4D148C] text-white shadow-lg shadow-purple-200" : "bg-gray-100 text-gray-400 group-hover:bg-white group-hover:text-[#4D148C]"}
                      `}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className={`text-[13px] font-bold tracking-wide transition-colors ${
                        active ? "text-[#4D148C]" : "text-gray-500 group-hover:text-gray-900"
                      }`}>
                        {name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {badge && (
                        <span className={`
                          px-2 py-0.5 rounded-full text-[10px] font-black
                          ${badge === 'New' ? 'bg-[#FF6200] text-white' : 'bg-gray-100 text-gray-500'}
                        `}>
                          {badge}
                        </span>
                      )}
                      {active && <div className="w-1.5 h-1.5 rounded-full bg-[#FF6200] animate-pulse" />}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Support / Secondary Section */}
          <div className="pt-4 border-t border-gray-50">
            <p className="px-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">
              Support
            </p>
            <Link href="#" className="flex items-center gap-3 px-4 py-2 text-gray-500 hover:text-[#4D148C] transition-colors group">
              <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-[#4D148C]" />
              <span className="text-xs font-bold">Documentation</span>
            </Link>
          </div>
        </nav>

        {/* Professional Footer Card */}
        <div className="p-4 mt-auto">
          <div className="relative overflow-hidden bg-[#1A1A1A] rounded-2xl p-5 text-white shadow-xl shadow-gray-200">
            {/* Background Decorative Element */}
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#4D148C] opacity-20 rounded-full blur-2xl"></div>
            
            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#4D148C] to-[#6A1B9A] flex items-center justify-center border border-white/10 shadow-inner">
                    <span className="text-sm font-black italic">WS</span>
                  </div>
                  <div>
                    <h4 className="text-[11px] font-black uppercase tracking-wider">Walid Shah</h4>
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">Senior Developer</p>
                  </div>
                </div>
                <button className="relative p-2 rounded-lg hover:bg-white/10 transition-colors">
                   <Bell className="w-4 h-4 text-gray-300" />
                   <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FF6200] rounded-full border-2 border-[#1A1A1A]"></span>
                </button>
              </div>
              
              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_#22c55e]"></div>
                   <span className="text-[10px] font-bold text-gray-300">Live Server</span>
                </div>
                <span className="text-[10px] font-mono text-gray-500">v2.41.0</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}