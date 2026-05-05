"use client";

import React, { useState } from 'react';
import { 
  Package, 
  Truck, 
  User, 
  MapPin, 
  ArrowRight, 
  CheckCircle2,
  ChevronLeft,
  Calendar
} from 'lucide-react';

const CreateShipping = () => {
  const [step, setStep] = useState(1);

  const steps = [
    { id: 1, name: "Origin", icon: <User size={18} /> },
    { id: 2, name: "Destination", icon: <MapPin size={18} /> },
    { id: 3, name: "Package", icon: <Package size={18} /> },
    { id: 4, name: "Review", icon: <CheckCircle2 size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header Area */}
      <div className="bg-white border-b px-8 py-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Create New Shipment</h1>
            <p className="text-sm text-slate-500">Prepare your labels and schedule a pickup.</p>
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg">
            <Truck size={18} />
            <span>Standard Express</span>
          </div>
        </div>
      </div>

      {/* Stepper Component */}
      <div className="max-w-5xl mx-auto mt-8 px-4">
        <div className="flex items-center justify-between mb-12 relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 z-0"></div>
          {steps.map((s) => (
            <div key={s.id} className="relative z-10 flex flex-col items-center gap-2 group">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                step >= s.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white border-2 border-slate-200 text-slate-400'
              }`}>
                {step > s.id ? <CheckCircle2 size={20} /> : s.icon}
              </div>
              <span className={`text-xs font-bold uppercase tracking-wider ${
                step >= s.id ? 'text-blue-600' : 'text-slate-400'
              }`}>{s.name}</span>
            </div>
          ))}
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Step 1: Origin Details */}
          {step === 1 && (
            <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
                Sender Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Full Name</label>
                  <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Phone Number</label>
                  <input type="tel" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="+1 (555) 000-0000" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Street Address</label>
                  <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="123 Logistics Way" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">City</label>
                  <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="San Francisco" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Zip Code</label>
                  <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="94105" />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Package Details (Preview of another step) */}
          {step === 3 && (
            <div className="p-8">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
                Package Specifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Weight (kg)</label>
                  <input type="number" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Dimensions</label>
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none">
                    <option>Small Box (10x10x10)</option>
                    <option>Medium Box (20x20x20)</option>
                    <option>Custom Dimensions</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Shipping Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3.5 text-slate-400" size={16} />
                    <input type="date" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Actions */}
          <div className="bg-slate-50/80 px-8 py-6 flex justify-between items-center border-t border-slate-200">
            <button 
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className={`flex items-center gap-2 text-sm font-bold transition-all ${
                step === 1 ? 'text-slate-300' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ChevronLeft size={18} />
              Back
            </button>
            
            <button 
              onClick={() => setStep(Math.min(4, step + 1))}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-200 transition-all active:scale-95"
            >
              {step === 4 ? "Complete Shipment" : "Continue"}
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Info Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200 flex items-start gap-4">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><Truck size={20} /></div>
            <div>
              <p className="font-bold text-sm">Real-time Tracking</p>
              <p className="text-xs text-slate-500">Included with all express shipments.</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 flex items-start gap-4">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Package size={20} /></div>
            <div>
              <p className="font-bold text-sm">Secure Packaging</p>
              <p className="text-xs text-slate-500">Add protection at the drop-off hub.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateShipping;