"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Plus, Package, MapPin, ClipboardList, ArrowRight, Truck } from "lucide-react";
import CreateOrderModal from "@/components/admin/CreateOrderModal";

/* ---------------- TYPES ---------------- */

type Order = {
  id: string;
  status: string;
  pickup?: { country?: string; city?: string };
  recipient?: { country?: string; city?: string };
  trackingNumber?: string;
  package?: { goodsName?: string };
};

type Rider = {
  id: string;
  name: string;
  country: string;
  role: string;
};

/* ---------------- PAGE ---------------- */

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [riders, setRiders] = useState<Rider[]>([]);
  const [loading, setLoading] = useState(true);
  const [openCreateOrder, setOpenCreateOrder] = useState(false);

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
    const trackingNumber = "FDX-" + Math.random().toString(36).substring(2, 10).toUpperCase();
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
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4D148C]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      {/* HEADER SECTION */}
      <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#4D148C] tracking-tighter uppercase italic">
            Global Shipments
          </h1>
          <p className="text-slate-500 font-medium text-sm flex items-center gap-2">
            <ClipboardList size={16} className="text-[#FF6200]" />
            Central Logistics Management System
          </p>
        </div>

        <button
          onClick={() => setOpenCreateOrder(true)}
          className="bg-[#FF6200] hover:bg-[#e55800] text-white font-black text-xs uppercase tracking-widest px-6 py-3.5 rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-orange-200 transition-all active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Create New Shipment
        </button>
      </div>

      {/* TABLE SECTION */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-black uppercase text-[11px] tracking-[0.2em] text-slate-500">
            Active Inventory
          </h3>
          <span className="bg-white border border-slate-200 text-[#4D148C] px-3 py-1 rounded text-[10px] font-black">
            {orders.length} TOTAL
          </span>
        </div>

        <div className="overflow-x-auto">
          {orders.length === 0 ? (
            <div className="p-20 text-center">
              <Package size={48} className="mx-auto text-slate-200 mb-4" />
              <p className="text-slate-400 font-bold">No shipments found in current manifest.</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-white text-slate-400 text-[10px] uppercase tracking-widest border-b border-slate-100">
                  <th className="px-6 py-4 text-left font-black">Tracking & ID</th>
                  <th className="px-6 py-4 text-left font-black">Route</th>
                  <th className="px-6 py-4 text-left font-black">Status</th>
                  <th className="px-6 py-4 text-left font-black">Assign Logistics</th>
                  <th className="px-6 py-4 text-right font-black">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-50">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-[#4D148C] font-black text-sm tracking-tight">
                          {o.trackingNumber || "PENDING ASSIGNMENT"}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">ID: {o.id.substring(0, 8)}...</span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                        <div className="flex flex-col">
                          <span className="uppercase">{o.pickup?.country || "—"}</span>
                          <span className="text-[9px] text-slate-400 font-normal italic">{o.pickup?.city}</span>
                        </div>
                        <ArrowRight size={14} className="text-[#FF6200]" />
                        <div className="flex flex-col">
                          <span className="uppercase">{o.recipient?.country || "—"}</span>
                          <span className="text-[9px] text-slate-400 font-normal italic">{o.recipient?.city}</span>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <StatusBadge status={o.status} />
                    </td>

                    <td className="px-6 py-4">
                      {o.status === "pending" ? (
                        <div className="relative max-w-45">
                          <select
                            defaultValue=""
                            onChange={(e) => assignRider(o.id, e.target.value)}
                            className="appearance-none w-full bg-white border border-slate-200 text-[11px] font-bold uppercase rounded-md px-3 py-2 pr-8 focus:ring-2 focus:ring-[#4D148C] outline-none transition-all cursor-pointer"
                          >
                            <option value="" disabled>Select Courier</option>
                            {riders.map((r) => (
                              <option key={r.id} value={r.id}>
                                {r.name} ({r.country})
                              </option>
                            ))}
                          </select>
                          <Truck size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-green-600 font-black text-[10px] uppercase tracking-tighter">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                          Logistics Active
                        </div>
                      )}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/dashboard/admin/orders/${o.id}`}
                        className="inline-flex items-center justify-center bg-slate-100 hover:bg-[#4D148C] hover:text-white text-slate-600 px-4 py-2 rounded font-black text-[10px] uppercase transition-all"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <CreateOrderModal
        open={openCreateOrder}
        onClose={() => setOpenCreateOrder(false)}
        onCreated={fetchOrders}
      />
    </div>
  );
}

/* ---------------- UI COMPONENTS ---------------- */

function StatusBadge({ status }: { status: string }) {
  const styles: any = {
    pending: "bg-slate-100 text-slate-500 border-slate-200",
    assigned: "bg-purple-50 text-[#4D148C] border-purple-100",
    in_transit: "bg-blue-50 text-blue-600 border-blue-100",
    delivered: "bg-green-50 text-green-700 border-green-100",
    out_for_delivery: "bg-orange-50 text-[#FF6200] border-orange-100",
  };

  return (
    <span className={`px-2.5 py-1 rounded border text-[10px] font-black uppercase tracking-wider ${styles[status] || styles.pending}`}>
      {status.replace("_", " ")}
    </span>
  );
}