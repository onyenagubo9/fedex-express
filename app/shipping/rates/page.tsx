"use client";

import React, { useState } from 'react';
import { 
  Calculator, 
  Info, 
  ChevronRight, 
  Zap, 
  ShieldCheck, 
  Globe,
  DollarSign,
  TrendingUp
} from 'lucide-react';

const ShippingRates = () => {
  const [currency, setCurrency] = useState('USD');

  const rateOptions = [
    {
      title: "Priority Overnight",
      price: 84.50,
      delivery: "Tomorrow by 10:30 AM",
      description: "Next business day delivery for urgent shipments.",
      tag: "Fastest",
      tagColor: "bg-purple-100 text-purple-700",
      icon: <Zap size={20} className="text-purple-600" />
    },
    {
      title: "Standard Express",
      price: 42.25,
      delivery: "In 2 Business Days",
      description: "The perfect balance of speed and cost-efficiency.",
      tag: "Best Value",
      tagColor: "bg-blue-100 text-blue-700",
      icon: <TrendingUp size={20} className="text-blue-600" />
    },
    {
      title: "Economy Ground",
      price: 18.90,
      delivery: "In 5-7 Business Days",
      description: "Reliable shipping for non-urgent, heavier items.",
      tag: "Cheapest",
      tagColor: "bg-emerald-100 text-emerald-700",
      icon: <Globe size={20} className="text-emerald-600" />
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section / Calculator Toggle */}
      <div className="bg-slate-900 text-white py-12 px-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h1 className="text-3xl font-black tracking-tight uppercase">Rate <span className="text-blue-500">Estimator</span></h1>
            <p className="text-slate-400 mt-2 max-w-md">Get instant quotes based on weight, dimensions, and destination for your specific logistics needs.</p>
          </div>
          <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700">
            <button onClick={() => setCurrency('USD')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${currency === 'USD' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}>USD</button>
            <button onClick={() => setCurrency('EUR')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${currency === 'EUR' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}>EUR</button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 -mt-8">
        {/* Summary Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 flex flex-wrap gap-8 items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-slate-100 rounded-xl text-slate-600"><Calculator size={24} /></div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Shipment Route</p>
              <p className="text-sm font-bold text-slate-900">San Francisco, CA → New York, NY</p>
            </div>
          </div>
          <div className="h-10 w-px bg-slate-100 hidden md:block"></div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Weight / Volume</p>
            <p className="text-sm font-bold text-slate-900">5.00 kg / Small Box</p>
          </div>
          <button className="text-blue-600 text-sm font-bold hover:underline">Edit Details</button>
        </div>

        {/* Rates Grid */}
        <div className="space-y-4 mb-12">
          {rateOptions.map((rate, index) => (
            <div key={index} className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-5">
                  <div className="mt-1 p-3 bg-slate-50 rounded-xl group-hover:bg-blue-50 transition-colors">
                    {rate.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-bold text-lg text-slate-900">{rate.title}</h3>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter ${rate.tagColor}`}>
                        {rate.tag}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 max-w-sm leading-relaxed">{rate.description}</p>
                    <div className="flex items-center gap-2 mt-3 text-slate-900 font-bold text-sm">
                      <ShieldCheck size={16} className="text-emerald-500" />
                      <span>Delivery by: {rate.delivery}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-2 border-t md:border-t-0 pt-4 md:pt-0">
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Price</p>
                    <p className="text-3xl font-black text-slate-900 tracking-tight">
                      {currency === 'USD' ? '$' : '€'}{rate.price.toFixed(2)}
                    </p>
                  </div>
                  <button className="flex items-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-600 transition-all">
                    Select <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Surcharge Notice Card */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex items-start gap-4">
          <Info className="text-blue-600 shrink-0" size={20} />
          <div>
            <h4 className="font-bold text-blue-900 text-sm">Rate Information</h4>
            <p className="text-blue-700/70 text-xs mt-1 leading-relaxed">
              Estimates include fuel surcharges and baseline taxes. Final price may vary based on actual weight verification and additional services (Signature Required, Insurance, etc.) selected during checkout.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <footer className="max-w-5xl mx-auto px-8 py-12 flex flex-col md:flex-row justify-between border-t mt-12 gap-6">
        <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
          <DollarSign size={14} />
          No hidden fees or surprise surcharges.
        </div>
        <div className="flex items-center gap-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Available Carriers:</span>
            <div className="flex gap-4 grayscale opacity-50">
                <span className="font-black text-slate-900 italic">FEDEX</span>
                <span className="font-black text-slate-900 italic">UPS</span>
                <span className="font-black text-slate-900 italic">DHL</span>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default ShippingRates;