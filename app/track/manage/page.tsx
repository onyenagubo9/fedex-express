"use client";

import { useState } from "react";
import { 
  Calendar, 
  MapPin, 
  User, 
  Bell, 
  Clock, 
  ChevronRight, 
  Truck, 
  AlertCircle,
  Home,
  Building2,
  ShieldCheck,
  Smartphone
} from "lucide-react";
import { motion } from "framer-motion";

export default function ManageDeliveryPage() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const deliveryOptions = [
    {
      id: "reschedule",
      title: "Reschedule Delivery",
      description: "Select a different date or time window that works best for you.",
      icon: <Calendar className="w-6 h-6" />,
      color: "bg-blue-50 text-blue-600",
    },
    {
      id: "hold",
      title: "Hold at Location",
      description: "Redirect your package to a secure pickup point or FedEx office.",
      icon: <Building2 className="w-6 h-6" />,
      color: "bg-purple-50 text-[#4D148C]",
    },
    {
      id: "neighbor",
      title: "Leave with Neighbor",
      description: "Specify a trusted nearby address for drop-off if you aren't home.",
      icon: <Home className="w-6 h-6" />,
      color: "bg-orange-50 text-[#FF6200]",
    },
    {
      id: "instructions",
      title: "Delivery Instructions",
      description: "Add gate codes, porch directions, or specific drop-off spots.",
      icon: <User className="w-6 h-6" />,
      color: "bg-green-50 text-green-600",
    }
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-20">
      {/* 1. STATUS HEADER */}
      <section className="bg-white border-b border-gray-200 pt-10 pb-8 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-[#FF6200] text-white text-[10px] font-black uppercase px-2 py-1 rounded">In Transit</span>
                <span className="text-gray-400 text-xs font-bold tracking-widest uppercase">ID: FX-1029384756</span>
              </div>
              <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter italic">
                Manage <span className="text-[#4D148C]">Delivery</span>
              </h1>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center">
                <Truck className="w-5 h-5 text-[#4D148C]" />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase">Current ETA</p>
                <p className="text-sm font-black text-gray-900 uppercase">Tomorrow, May 05 by 8:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 2. MAIN OPTIONS (Left 2 Columns) */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Modification Services</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {deliveryOptions.map((option) => (
                <motion.button
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  key={option.id}
                  onClick={() => setSelectedOption(option.id)}
                  className={`text-left p-6 rounded-2xl border-2 transition-all bg-white shadow-sm ${
                    selectedOption === option.id 
                    ? "border-[#4D148C] ring-4 ring-[#4D148C]/5" 
                    : "border-transparent hover:border-gray-200"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${option.color}`}>
                    {option.icon}
                  </div>
                  <h3 className="font-black text-gray-900 uppercase tracking-tight mb-2">{option.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{option.description}</p>
                </motion.button>
              ))}
            </div>

            {/* NOTIFICATION PREFERENCES */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 mt-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-black text-gray-900 uppercase tracking-tight flex items-center gap-2">
                  <Bell className="w-5 h-5 text-[#FF6200]" /> Notification Settings
                </h3>
              </div>
              <div className="space-y-4">
                {[
                  { label: "SMS Status Updates", icon: <Smartphone className="w-4 h-4" /> },
                  { label: "Delivery Exception Alerts", icon: <AlertCircle className="w-4 h-4" /> },
                  { label: "Final Drop-off Confirmation", icon: <ShieldCheck className="w-4 h-4" /> }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="text-gray-400">{item.icon}</div>
                      <span className="text-sm font-bold text-gray-700">{item.label}</span>
                    </div>
                    <div className="w-10 h-5 bg-gray-200 rounded-full relative cursor-pointer">
                      <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3. SIDEBAR SUMMARY (Right 1 Column) */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-[#4D148C] rounded-2xl p-6 text-white shadow-xl shadow-[#4D148C]/20">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-300 mb-6">Shipment Details</h3>
              
              <div className="space-y-6 relative">
                {/* Visual Timeline Decorator */}
                <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-purple-400/30"></div>
                
                <div className="relative pl-8">
                  <div className="absolute left-0 top-1 w-5 h-5 bg-purple-400 rounded-full border-4 border-[#4D148C]"></div>
                  <p className="text-[10px] font-black uppercase text-purple-300">From</p>
                  <p className="text-sm font-bold">Memphis, TN, US</p>
                </div>

                <div className="relative pl-8">
                  <div className="absolute left-0 top-1 w-5 h-5 bg-[#FF6200] rounded-full border-4 border-[#4D148C]"></div>
                  <p className="text-[10px] font-black uppercase text-purple-300">To</p>
                  <p className="text-sm font-bold">London, UK</p>
                  <p className="text-[11px] text-purple-200 mt-1 opacity-70">241 Baker Street, NW1 6XE</p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase text-purple-300">Service</span>
                  <span className="text-xs font-bold italic">International Priority</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase text-purple-300">Weight</span>
                  <span className="text-xs font-bold">2.40 kg / 5.29 lbs</span>
                </div>
              </div>

              <button className="w-full bg-[#FF6200] hover:bg-[#e65900] text-white py-4 mt-8 rounded-xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2">
                Confirm Changes <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 text-amber-600 mb-2">
                <Clock className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-wider">Deadline</span>
              </div>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                Changes must be submitted by <span className="font-black text-gray-900">Today, 11:59 PM</span> to ensure they are processed before dispatch.
              </p>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}