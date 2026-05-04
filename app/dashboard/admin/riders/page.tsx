"use client";

import { useEffect, useState } from "react";
import { 
  collection, 
  getDocs, 
  query, 
  where, 
  doc, 
  updateDoc 
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { 
  Users, 
  MapPin, 
  ShieldCheck, 
  Search, 
  Plus, 
  MoreVertical, 
  Mail,
  Smartphone
} from "lucide-react";
import CreateRiderModal from "@/components/dashboard/CreateRiderModal";

/* ---------------- TYPES ---------------- */

type Rider = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  country: string;
  city?: string;
  status?: "on_duty" | "off_duty";
  totalDeliveries?: number;
};

export default function RiderAdminPage() {
  const [riders, setRiders] = useState<Rider[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  async function fetchRiders() {
    setLoading(true);
    try {
      const q = query(collection(db, "users"), where("role", "==", "rider"));
      const snap = await getDocs(q);
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() } as Rider));
      setRiders(data);
    } catch (err) {
      console.error("Error fetching fleet:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRiders();
  }, []);

  const filteredRiders = riders.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-[#4D148C] border-t-[#FF6200] rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Syncing Fleet Data...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F7F7F7] pb-10 font-sans">
      
      {/* GLOBAL HEADER */}
      <div className="bg-[#4D148C] text-white p-8 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Users className="w-6 h-6 text-[#FF6200]" />
              <h1 className="text-2xl font-black italic tracking-tighter uppercase">
                Fleet <span className="text-[#FF6200]">Administration</span>
              </h1>
            </div>
            <p className="text-purple-200 text-xs font-bold tracking-widest uppercase opacity-70">
              Courier Resource Management & Global Dispatch
            </p>
          </div>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#FF6200] hover:bg-[#e55800] text-white px-8 py-4 rounded font-black text-xs uppercase tracking-[0.2em] shadow-lg flex items-center gap-2 transition-transform active:scale-95"
          >
            <Plus className="w-4 h-4" />
            Enlist New Courier
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-6 space-y-6">
        
        {/* TOP STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatBox label="Total Fleet" value={riders.length} icon={Users} color="purple" />
          <StatBox label="On Duty" value={riders.filter(r => r.status === 'on_duty').length} icon={ShieldCheck} color="green" />
          <StatBox label="Standby" value={riders.filter(r => r.status !== 'on_duty').length} icon={MapPin} color="orange" />
          
          {/* SEARCH BAR */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center gap-3">
            <Search className="w-5 h-5 text-gray-300" />
            <input 
              type="text" 
              placeholder="Filter by name or region..." 
              className="bg-transparent border-none outline-none text-sm font-bold w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* MAIN DATA TABLE */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b">
            <h2 className="text-[10px] font-black text-[#4D148C] uppercase tracking-[0.2em]">Active Courier Manifest</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white text-[10px] font-black uppercase text-gray-400 tracking-widest border-b">
                  <th className="px-6 py-4">Courier Details</th>
                  <th className="px-6 py-4">Operational Zone</th>
                  <th className="px-6 py-4">Contact</th>
                  <th className="px-6 py-4">Dispatch Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredRiders.map((rider) => (
                  <tr key={rider.id} className="hover:bg-purple-50/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#4D148C] text-white rounded flex items-center justify-center font-black italic text-lg">
                          {rider.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-black text-gray-900 text-sm uppercase leading-tight">{rider.name}</p>
                          <p className="text-[10px] font-mono text-gray-400 uppercase">ID: {rider.id.substring(0,8)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-[#FF6200]" />
                        <span className="text-xs font-bold text-gray-700 uppercase">{rider.city || rider.country}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 space-y-1">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Mail className="w-3 h-3" /> {rider.email}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Smartphone className="w-3 h-3" /> {rider.phone || "No Mobile"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={rider.status || "off_duty"} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <CreateRiderModal 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onCreated={fetchRiders} 
      />
    </div>
  );
}

/* ---------------- HELPER COMPONENTS ---------------- */

function StatBox({ label, value, icon: Icon, color }: any) {
  const colorMap: any = {
    purple: "text-[#4D148C]",
    orange: "text-[#FF6200]",
    green: "text-green-600",
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center justify-between">
      <div>
        <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">{label}</p>
        <p className={`text-2xl font-black italic tracking-tighter ${colorMap[color]}`}>{value}</p>
      </div>
      <Icon className={`w-8 h-8 opacity-20 ${colorMap[color]}`} />
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const active = status === "on_duty";
  return (
    <span className={`px-3 py-1 rounded text-[9px] font-black uppercase tracking-widest border ${
      active 
      ? "bg-green-50 text-green-700 border-green-200" 
      : "bg-gray-100 text-gray-500 border-gray-200"
    }`}>
      {active ? "On Duty" : "Standby"}
    </span>
  );
}