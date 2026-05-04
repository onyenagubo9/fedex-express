"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Truck,
  Users,
  Mail,
  Settings,
  Menu,
  X,
  ShieldCheck
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard, exact: true },
  { name: "Shipments", href: "/dashboard/admin/orders", icon: Package },
  { name: "Fleet Management", href: "/dashboard/admin/riders", icon: Truck },
  { name: "Support Center", href: "/dashboard/admin/chats", icon: Users },
  { name: "Communications", href: "/dashboard/admin/send-mail", icon: Mail },
  { name: "System Settings", href: "/dashboard/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Bar (Remains at top) */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-[#4D148C] text-white shadow-lg sticky top-0 z-50">
        <button onClick={() => setOpen(true)} className="p-1 hover:bg-white/10 rounded">
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-1 font-black text-lg tracking-tighter">
          <span className="text-white">Fed</span>
          <span className="text-[#FF6200]">Ex</span>
        </div>
      </div>

      {/* Overlay for Mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar - NOW STICKY */}
      <aside
        className={`
          fixed md:sticky top-0 z-50 inset-y-0 left-0 w-72 h-screen
          bg-white border-r border-slate-200 text-slate-700 flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Header */}
        <div className="px-8 py-8 border-b border-slate-100 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-0 text-3xl font-black tracking-tighter">
            <span className="text-[#4D148C]">Fed</span>
            <span className="text-[#FF6200]">Ex</span>
            <span className="ml-2 text-[10px] uppercase tracking-widest text-slate-400 font-bold self-end mb-1">
              Admin
            </span>
          </div>
          <button className="md:hidden p-1 hover:bg-slate-100 rounded" onClick={() => setOpen(false)}>
            <X className="w-6 h-6 text-slate-500" />
          </button>
        </div>

        {/* Navigation - Scrollable if items exceed height */}
        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto custom-scrollbar">
          {navItems.map(({ name, href, icon: Icon, exact }) => {
            const active = exact
              ? pathname === href
              : pathname.startsWith(href);

            return (
              <Link
                key={name}
                href={href}
                onClick={() => setOpen(false)}
                className={`
                  flex items-center gap-4 px-4 py-3.5 rounded-lg transition-all duration-200 group
                  ${
                    active
                      ? "bg-[#4D148C] text-white font-bold shadow-md shadow-purple-200"
                      : "hover:bg-slate-50 hover:text-[#4D148C] text-slate-500 font-medium"
                  }
                `}
              >
                <Icon className={`w-5 h-5 transition-colors ${active ? "text-[#FF6200]" : "group-hover:text-[#FF6200]"}`} />
                <span className="tracking-tight">{name}</span>
                {active && (
                   <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#FF6200]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-6 py-6 bg-slate-50 border-t border-slate-200 shrink-0">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-[#4D148C] flex items-center justify-center text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-black uppercase text-slate-800 tracking-wider">Secure Session</p>
              <p className="text-[10px] text-slate-500">Node ID: FDX-7729</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}