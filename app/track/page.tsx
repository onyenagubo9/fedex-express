"use client";

import { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import TrackingMap from "@/components/tracking/TrackingMap";
import {
  Search,
  Package,
  Truck,
  CheckCircle2,
  AlertCircle,
  Printer,
  Share2,
  ShieldCheck,
  MapPin,
  Box,
  User,
  Phone,
  Mail,
  Tag,
  Navigation
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TrackPage() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleTrack(e: React.FormEvent) {
    e.preventDefault();
    if (!trackingNumber.trim()) return;

    setLoading(true);
    setError("");

    try {
      const q = query(collection(db, "orders"), where("trackingNumber", "==", trackingNumber.trim()));
      const snap = await getDocs(q);

      if (snap.empty) {
        setError("No record of this tracking number can be found at this time.");
        setOrder(null);
        return;
      }

      const doc = snap.docs[0];
      setOrder({ id: doc.id, ...doc.data() });
    } catch (err) {
      setError("System technical difficulties. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  // Helper to safely render location address string
  const renderLocation = (loc: any) => {
    if (!loc) return "Processing Facility";
    if (typeof loc === 'string') return loc;
    if (typeof loc === 'object' && loc.address) return loc.address;
    return "Coordinates Updated";
  };

  return (
    <div className="min-h-screen bg-[#F6F6F6] text-[#333] pb-20">
      {/* SEARCH HEADER */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <form onSubmit={handleTrack} className="flex items-center gap-4">
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="TRACKING ID (e.g. TRK-123456...)"
                className="w-full bg-slate-100 border-none pl-12 pr-4 py-3 font-black text-sm uppercase tracking-wider focus:ring-2 focus:ring-[#4D148C] transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#4D148C] text-white px-8 py-3 font-black text-xs uppercase tracking-[0.2em] hover:bg-[#3b0f6b] transition-all disabled:opacity-50"
            >
              {loading ? "SEARCHING..." : "TRACK"}
            </button>
          </form>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 mt-8">
        <AnimatePresence mode="wait">
          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-50 border-l-4 border-red-600 p-4 mb-6 flex items-center gap-3">
              <AlertCircle className="text-red-600" />
              <p className="text-red-800 font-bold text-sm">{error}</p>
            </motion.div>
          )}

          {order ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* LEFT COLUMN: SENDER/RECEIVER & STATUS */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* STATUS CARD */}
                <div className="bg-white border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-8">
                    <div className="flex flex-wrap justify-between items-start gap-6 mb-8">
                      <div>
                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Shipment Status</span>
                        <h2 className="text-5xl font-black text-[#4D148C] uppercase tracking-tighter italic leading-none mt-1">
                          {order.status?.replace("_", " ")}
                        </h2>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 border border-slate-200 hover:bg-slate-50 text-slate-600"><Printer size={18}/></button>
                        <button className="p-2 border border-slate-200 hover:bg-slate-50 text-slate-600"><Share2 size={18}/></button>
                      </div>
                    </div>

                    {/* CURRENT LOCATION BANNER - FIXED OBJECT RENDERING */}
                    <div className="bg-slate-50 border-l-4 border-[#FF6200] p-4 mb-10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Navigation size={20} className="text-[#FF6200] fill-[#FF6200]/10" />
                          <span className="absolute -top-1 -right-1 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                          </span>
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Last Known Location</p>
                          <p className="text-sm font-black text-slate-800 uppercase mt-1">
                            {renderLocation(order.tracking?.currentLocation)}
                          </p>
                        </div>
                      </div>
                      <div className="hidden md:block text-right">
                         <p className="text-[9px] font-bold text-slate-400 uppercase">Telemetry Signal</p>
                         <p className="text-[10px] font-black text-green-600 uppercase">Stable / GPS Active</p>
                      </div>
                    </div>

                    <div className="relative flex justify-between px-4">
                      <div className="absolute top-4 left-0 w-full h-0.5 bg-slate-100 z-0" />
                      <StepperCircle label="Ordered" done={true} />
                      <StepperCircle label="Picked Up" done={order.status !== 'pending'} active={order.status === 'picked_up'} />
                      <StepperCircle label="In Transit" done={['delivered', 'out_for_delivery'].includes(order.status)} active={order.status === 'in_transit'} />
                      <StepperCircle label="Delivered" active={order.status === 'delivered'} />
                    </div>
                  </div>
                </div>

                {/* SENDER & RECEIVER DETAILS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* SENDER */}
                  <div className="bg-white border border-slate-200 shadow-sm overflow-hidden">
                    <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                      <h3 className="font-black uppercase text-xs tracking-widest text-slate-600">Sender (Origin)</h3>
                      <Truck size={14} className="text-[#FF6200]" />
                    </div>
                    <div className="p-6 space-y-4">
                      <ContactField icon={<User size={14}/>} label="Name" value={order.pickup?.name} />
                      <ContactField icon={<Phone size={14}/>} label="Phone" value={order.pickup?.phone} />
                      <ContactField icon={<Mail size={14}/>} label="Email" value={order.pickup?.email} />
                      <ContactField icon={<MapPin size={14}/>} label="Address" value={`${order.pickup?.address}, ${order.pickup?.city}`} />
                    </div>
                  </div>

                  {/* RECEIVER */}
                  <div className="bg-white border border-slate-200 shadow-sm overflow-hidden">
                    <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                      <h3 className="font-black uppercase text-xs tracking-widest text-slate-600">Recipient (Destination)</h3>
                      <User size={14} className="text-[#4D148C]" />
                    </div>
                    <div className="p-6 space-y-4">
                      <ContactField icon={<User size={14}/>} label="Name" value={order.recipient?.name} />
                      <ContactField icon={<Phone size={14}/>} label="Phone" value={order.recipient?.phone} />
                      <ContactField icon={<Mail size={14}/>} label="Email" value={order.recipient?.email} />
                      <ContactField icon={<MapPin size={14}/>} label="Address" value={`${order.recipient?.address}, ${order.recipient?.city}`} />
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: PACKAGE INFO & MAP */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white border border-slate-200 shadow-sm p-1 h-64 relative">
                   <TrackingMap location={order.tracking?.currentLocation} />
                   <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1 border border-slate-200 text-[10px] font-black uppercase shadow-sm">
                     Live Map View
                   </div>
                </div>

                <div className="bg-white border border-slate-200 shadow-sm">
                  <div className="p-6 bg-slate-50 border-b border-slate-200">
                    <h3 className="font-black uppercase text-xs tracking-widest flex items-center gap-2">
                      <Box size={14} className="text-[#4D148C]" /> Consignment Info
                    </h3>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="pb-2 border-b border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight italic">Package Name</span>
                      <div className="flex items-center gap-2 mt-1">
                        <Tag size={14} className="text-[#FF6200]" />
                        <span className="text-sm font-black text-[#4D148C] uppercase">{order.package?.goodsName || "General Goods"}</span>
                      </div>
                    </div>
                    <FactItem label="Weight" value={`${order.package?.weight} kg`} />
                    <FactItem label="Fragile" value={order.fragile ? "YES" : "NO"} />
                    <FactItem label="Hazardous" value={order.package?.hazardous ? "YES" : "NO"} />
                    <FactItem label="Declared Value" value={`${order.payment?.currency} ${order.payment?.amount}`} />
                    
                    {order.insured && (
                      <div className="mt-2 p-2 bg-green-50 border border-green-100 flex items-center gap-2">
                        <ShieldCheck size={14} className="text-green-600" />
                        <span className="text-[9px] font-black text-green-700 uppercase italic">Insured: {order.payment?.currency} {order.insuranceAmount}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-40 border-2 border-dashed border-slate-200 rounded-lg">
              <Package size={64} className="text-slate-200 mb-4" strokeWidth={1} />
              <p className="text-slate-400 font-black text-xs uppercase tracking-[0.3em]">Awaiting Tracking Input</p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

/* ================= HELPERS ================= */

function ContactField({ icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="flex gap-3">
      <div className="text-slate-400 mt-1">{icon}</div>
      <div>
        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{label}</span>
        <span className="block text-xs font-black text-slate-800 uppercase leading-tight">{value || "—"}</span>
      </div>
    </div>
  );
}

function StepperCircle({ label, done, active }: { label: string, done?: boolean, active?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-3 z-10 w-20">
      <div className={`w-9 h-9 rounded-full border-4 flex items-center justify-center transition-all ${
        done ? "bg-[#FF6200] border-white text-white shadow-md shadow-orange-200" : 
        active ? "bg-white border-[#FF6200] text-[#FF6200]" : 
        "bg-white border-slate-100 text-slate-200"
      }`}>
        {done ? <CheckCircle2 size={18} strokeWidth={3} /> : <div className="w-2 h-2 rounded-full bg-current" />}
      </div>
      <span className={`text-[9px] font-black uppercase text-center leading-tight tracking-tighter ${active || done ? "text-[#4D148C]" : "text-slate-300"}`}>
        {label}
      </span>
    </div>
  );
}

function FactItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between items-end border-b border-slate-100 pb-2">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{label}</span>
      <span className="text-xs font-black text-slate-800 uppercase tracking-tight">{value || "—"}</span>
    </div>
  );
}