"use client";

import React from 'react';
import { 
  Calendar, 
  Clock, 
  MoreVertical, 
  ArrowUpRight, 
  MapPin, 
  Search, 
  Filter 
} from 'lucide-react';

const ShippingSchedule = () => {
  const scheduleData = [
    {
      date: "Today, May 5",
      shipments: [
        { id: "FX-99201", time: "09:00 AM", destination: "London, UK", status: "In Transit", priority: "Express" },
        { id: "FX-99205", time: "11:30 AM", destination: "New York, USA", status: "Scheduled", priority: "Standard" },
        { id: "FX-99210", time: "04:15 PM", destination: "Tokyo, JP", status: "Pending Pickup", priority: "Priority" },
      ]
    },
    {
      date: "Wednesday, May 6",
      shipments: [
        { id: "FX-99311", time: "10:00 AM", destination: "Sydney, AU", status: "Scheduled", priority: "Express" },
        { id: "FX-99342", time: "02:00 PM", destination: "Berlin, DE", status: "Scheduled", priority: "Economy" },
      ]
    }
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'In Transit': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Scheduled': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Pending Pickup': return 'bg-slate-50 text-slate-700 border-slate-200';
      default: return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Dynamic Header */}
      <div className="border-b bg-slate-50/50 px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Shipping <span className="text-blue-600">Schedule</span></h1>
              <p className="text-sm text-slate-500 mt-1 font-medium">Monitoring 12 active shipments for this week.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none w-64" placeholder="Search ID or destination..." />
              </div>
              <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                <Filter size={16} /> Filter
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-10">
        <div className="space-y-12">
          {scheduleData.map((group, idx) => (
            <section key={idx} className="relative">
              {/* Date Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-blue-600 p-2 rounded-lg text-white">
                  <Calendar size={20} />
                </div>
                <h2 className="text-lg font-bold text-slate-800">{group.date}</h2>
                <div className="flex-1 h-px bg-slate-100"></div>
              </div>

              {/* Table / List */}
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 text-[11px] uppercase tracking-widest text-slate-400 font-bold border-b">
                      <th className="px-6 py-4">Time / ID</th>
                      <th className="px-6 py-4">Destination</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Type</th>
                      <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {group.shipments.map((ship) => (
                      <tr key={ship.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <Clock size={16} className="text-slate-400" />
                            <div>
                              <p className="text-sm font-bold text-slate-900">{ship.time}</p>
                              <p className="text-[11px] font-mono text-slate-400 uppercase tracking-tighter">{ship.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                            <MapPin size={14} className="text-blue-500" />
                            {ship.destination}
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span className={`px-3 py-1 rounded-full text-[11px] font-bold border ${getStatusStyle(ship.status)}`}>
                            {ship.status}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <span className="text-xs font-semibold text-slate-500 italic">{ship.priority}</span>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                              <ArrowUpRight size={18} />
                            </button>
                            <button className="p-2 text-slate-400 hover:text-slate-900">
                              <MoreVertical size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShippingSchedule;