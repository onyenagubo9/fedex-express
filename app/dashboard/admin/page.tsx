"use client";

import { useEffect, useState } from "react";
import CreateRiderModal from "@/components/dashboard/CreateRiderModal";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  Package,
  Users,
  Truck,
  Plus,
  ArrowRight,
  Search,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";

/* ---------------- TYPES ---------------- */

type Order = {
  id: string;
  status: string;
  pickup?: { country: string; city: string };
  recipient?: { country: string; city: string };
  trackingNumber?: string;
};

type Rider = {
  id: string;
  name: string;
  country: string;
  role: string;
};

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [riders, setRiders] = useState<Rider[]>([]);
  const [openRiderModal, setOpenRiderModal] = useState(false);
  const [loading, setLoading] = useState(true);

  async function fetchOrders() {
    const snap = await getDocs(collection(db, "orders"));
    setOrders(snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })));
  }

  async function fetchRiders() {
    const snap = await getDocs(collection(db, "users"));
    const data = snap.docs
      .map((d) => ({ id: d.id, ...(d.data() as any) }))
      .filter((u) => u.role === "rider");
    setRiders(data);
  }

  useEffect(() => {
    Promise.all([fetchOrders(), fetchRiders()]).finally(() => setLoading(false));
  }, []);

  async function assignRider(orderId: string, riderId: string) {
    const trackingNumber = "FX-" + Math.random().toString(36).substring(2, 10).toUpperCase();
    await updateDoc(doc(db, "orders", orderId), {
      riderId,
      trackingNumber,
      status: "assigned",
      assignedAt: serverTimestamp(),
    });
    fetchOrders();
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4D148C]"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#F7F7F7] min-h-screen p-4 md:p-8 space-y-6 font-sans">
      
      {/* TOP COMMAND BAR */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#4D148C] mb-1">
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-black uppercase tracking-tighter text-xl italic">
              Fed<span className="text-[#FF6200]">Ex</span> <span className="text-gray-400 not-italic font-medium ml-2">Administration</span>
            </span>
          </div>
          <p className="text-gray-500 text-sm font-medium">Logistics Control Center — Global Operations</p>
        </div>

        <button
          onClick={() => setOpenRiderModal(true)}
          className="bg-[#4D148C] hover:bg-[#3b0f6e] text-white px-6 py-3 rounded font-black text-xs uppercase tracking-widest flex items-center gap-2 transition-all shadow-md active:scale-95"
        >
          <Plus className="w-4 h-4 text-[#FF6200]" />
          Enroll New Rider
        </button>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Shipments" value={orders.length} icon={Package} type="primary" />
        <StatCard title="In-Transit" value={orders.filter(o => o.status === 'in_transit').length} icon={Truck} type="accent" />
        <StatCard title="Active Fleet" value={riders.length} icon={Users} type="neutral" />
      </div>

      {/* MAIN DATA TABLE */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-5 border-b flex items-center justify-between bg-gray-50">
          <h2 className="font-black text-[#4D148C] uppercase text-xs tracking-widest">Global Manifest List</h2>
          <div className="relative">
             <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
             <input type="text" placeholder="Search Tracking ID..." className="pl-9 pr-4 py-1.5 border rounded-full text-xs focus:ring-2 focus:ring-[#4D148C] outline-none w-64" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[#4D148C] text-[10px] uppercase tracking-[0.2em] font-black bg-white">
                <th className="p-4 border-b">Control ID</th>
                <th className="p-4 border-b">Logistics Route</th>
                <th className="p-4 border-b">Current Status</th>
                <th className="p-4 border-b">FedEx Tracking</th>
                <th className="p-4 border-b text-right">Dispatch Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-purple-50/30 transition-colors group">
                  <td className="p-4">
                    <Link href={`/admin/orders/${o.id}`} className="text-blue-600 hover:underline font-mono text-xs font-bold">
                      #{o.id.substring(0, 8).toUpperCase()}
                    </Link>
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-2 font-bold text-gray-700 text-xs">
                      {o.pickup?.country}
                      <ArrowRight className="w-3 h-3 text-[#FF6200]" />
                      {o.recipient?.country}
                    </div>
                  </td>

                  <td className="p-4">
                    <StatusBadge status={o.status} />
                  </td>

                  <td className="p-4">
                    <span className="font-black text-gray-900 tracking-tighter italic">
                      {o.trackingNumber || <span className="text-gray-300 not-italic font-normal">UNASSIGNED</span>}
                    </span>
                  </td>

                  <td className="p-4 text-right">
                    {o.status === "pending" ? (
                      <select
                        defaultValue=""
                        onChange={(e) => assignRider(o.id, e.target.value)}
                        className="text-xs border-2 border-gray-200 rounded p-1 font-bold focus:border-[#4D148C] outline-none"
                      >
                        <option value="" disabled>Select Courier</option>
                        {riders.map((r) => (
                          <option key={r.id} value={r.id}>
                            {r.name} ({r.country})
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className="text-[10px] font-black uppercase text-green-600 bg-green-50 px-2 py-1 rounded">
                        Securely Dispatched
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CreateRiderModal open={openRiderModal} onClose={() => setOpenRiderModal(false)} onCreated={fetchRiders} />
    </div>
  );
}

/* ---------------- REUSABLE UI COMPONENTS ---------------- */

function StatCard({ title, value, icon: Icon, type }: any) {
  const styles: any = {
    primary: "border-l-4 border-l-[#4D148C] text-[#4D148C]",
    accent: "border-l-4 border-l-[#FF6200] text-[#FF6200]",
    neutral: "border-l-4 border-l-gray-400 text-gray-600",
  };

  return (
    <div className={`bg-white p-6 rounded shadow-sm border border-gray-200 flex items-center justify-between ${styles[type]}`}>
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.15em] mb-1 opacity-70">{title}</p>
        <p className="text-3xl font-black tracking-tighter italic">{value}</p>
      </div>
      <Icon className="w-10 h-10 opacity-20" />
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const configs: any = {
    pending: "bg-gray-100 text-gray-600 border-gray-200",
    assigned: "bg-purple-50 text-[#4D148C] border-[#4D148C]/20",
    in_transit: "bg-orange-50 text-[#FF6200] border-[#FF6200]/20",
    delivered: "bg-green-50 text-green-700 border-green-200",
  };

  return (
    <span className={`px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider border ${configs[status] || configs.pending}`}>
      {status.replace("_", " ")}
    </span>
  );
}