"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ArrowLeft, Edit3, Download, ShieldCheck, Truck, Globe } from "lucide-react";
import EditOrderModal from "@/components/admin/EditOrderModal";

export default function AdminOrderDetailsPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const router = useRouter();
  const receiptRef = useRef<HTMLDivElement>(null);

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Form States
  const [status, setStatus] = useState("in_transit");
  const [newLat, setNewLat] = useState<number>(0);
  const [newLng, setNewLng] = useState<number>(0);
  const [newAddress, setNewAddress] = useState<string>("");

  async function fetchData() {
    try {
      const snap = await getDoc(doc(db, "orders", orderId));
      if (snap.exists()) {
        const data = snap.data();
        setOrder({ ...data, id: snap.id });
        setStatus(data.status);
        setNewLat(data.tracking?.currentLocation?.lat || 0);
        setNewLng(data.tracking?.currentLocation?.lng || 0);
        setNewAddress(data.tracking?.currentLocation?.address || "");
      }
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [orderId]);

  /* ---------- FIXED PDF DOWNLOAD WITHOUT LAB ERROR ---------- */
  const downloadPDF = async () => {
    if (!receiptRef.current) return;
    setIsDownloading(true);
    try {
      const jsPDF = (await import("jspdf")).default;
      const html2canvas = (await import("html2canvas")).default;

      const canvas = await html2canvas(receiptRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff", // Force legacy color space
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save(`Waybill-${order?.trackingNumber || "shipment"}.pdf`);
    } catch (error) {
      console.error("PDF Error:", error);
      alert("Error generating PDF. Please ensure no modern CSS color functions (like lab) are used.");
    } finally {
      setIsDownloading(false);
    }
  };

  async function updateStatus() {
    if (!order) return;
    await updateDoc(doc(db, "orders", order.id), { status, updatedAt: serverTimestamp() });
    await addDoc(collection(db, "orders", order.id, "timeline"), {
      status,
      message: `Status updated to ${status}`,
      timestamp: serverTimestamp(),
    });
    alert("✅ Status Updated");
    fetchData();
  }

  async function updateLocation() {
    if (!order) return;
    await updateDoc(doc(db, "orders", order.id), {
      "tracking.currentLocation": { lat: Number(newLat), lng: Number(newLng), address: newAddress },
      "tracking.lastUpdated": serverTimestamp(),
    });
    alert("📍 Location Updated");
    fetchData();
  }

  if (loading) return <div className="p-20 text-center font-black text-[#4D148C]">ACCESSING HUB...</div>;
  if (!order) return <div className="p-20 text-center text-red-600 font-bold">MANIFEST NOT FOUND</div>;

  return (
    <main className="pb-20 bg-[#f8fafc] min-h-screen font-sans">
      {/* HEADER */}
      <div className="bg-[#4D148C] text-white py-6 px-6 sticky top-0 z-40 shadow-lg">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="p-2 bg-white/10 rounded-lg hover:bg-white/20">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-black italic uppercase tracking-tighter">Shipment Command</h1>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setIsEditModalOpen(true)} className="bg-white/10 px-4 py-2 rounded font-bold text-xs uppercase tracking-widest border border-white/20">Edit</button>
            <button onClick={downloadPDF} disabled={isDownloading} className="bg-[#FF6200] px-5 py-2 rounded font-black text-xs uppercase tracking-widest shadow-lg flex items-center gap-2">
              <Download className="w-4 h-4" /> {isDownloading ? "Generating..." : "Export Waybill"}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* CONTROLS */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-[#e2e8f0] shadow-sm">
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Globe className="w-3 h-3 text-blue-500" /> GPS Management</h2>
            <input type="text" value={newAddress} className="w-full border-b border-slate-200 p-2 text-sm font-bold mb-4 outline-none" onChange={(e) => setNewAddress(e.target.value)} placeholder="Hub Location" />
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input type="number" value={newLat} className="w-full border-b border-slate-200 p-2 text-xs font-bold outline-none" onChange={(e) => setNewLat(parseFloat(e.target.value))} />
              <input type="number" value={newLng} className="w-full border-b border-slate-200 p-2 text-xs font-bold outline-none" onChange={(e) => setNewLng(parseFloat(e.target.value))} />
            </div>
            <button onClick={updateLocation} className="w-full bg-[#4D148C] text-white py-3 rounded text-[10px] font-black uppercase tracking-widest">Update Coordinates</button>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#e2e8f0] shadow-sm">
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Truck className="w-3 h-3 text-[#FF6200]" /> Status Protocol</h2>
            <select className="w-full border-b border-slate-200 p-2 text-sm font-bold mb-4 outline-none bg-transparent" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="assigned">MANIFESTED</option>
              <option value="in_transit">IN TRANSIT</option>
              <option value="out_for_delivery">OUT FOR DELIVERY</option>
              <option value="delivered">DELIVERED</option>
            </select>
            <button onClick={updateStatus} className="w-full bg-[#FF6200] text-white py-3 rounded text-[10px] font-black uppercase tracking-widest">Push Status Update</button>
          </div>
        </div>

        {/* WAYBILL PREVIEW - USES HEX ONLY TO PREVENT ERROR */}
        <div className="lg:col-span-2">
          <div 
            ref={receiptRef}
            className="bg-white overflow-hidden shadow-2xl mx-auto"
            style={{ width: "700px", minHeight: "950px", backgroundColor: "#ffffff", color: "#000000" }}
          >
            <div className="p-12">
              {/* BRANDING */}
              <div className="flex justify-between items-start mb-12" style={{ borderBottom: "4px solid #4D148C", paddingBottom: "20px" }}>
                <div>
                  <div style={{ display: "flex", fontSize: "42px", fontWeight: "900", fontStyle: "italic", letterSpacing: "-2px" }}>
                    <span style={{ color: "#4D148C" }}>Fed</span><span style={{ color: "#FF6200" }}>Ex</span>
                  </div>
                  <span style={{ fontSize: "10px", fontWeight: "bold", letterSpacing: "4px", color: "#94a3b8", textTransform: "uppercase" }}>Global Logistics Manifest</span>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ margin: 0, fontSize: "10px", color: "#94a3b8", fontWeight: "bold", textTransform: "uppercase" }}>Airbill Tracking</p>
                  <p style={{ margin: 0, fontSize: "24px", fontWeight: "900", color: "#000000" }}>{order.trackingNumber}</p>
                </div>
              </div>

              {/* ROUTE */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", marginBottom: "40px" }}>
                <div style={{ padding: "20px", border: "1px solid #e2e8f0" }}>
                  <p style={{ fontSize: "9px", fontWeight: "900", color: "#4D148C", textTransform: "uppercase", marginBottom: "10px" }}>1. Shipper</p>
                  <p style={{ fontSize: "16px", fontWeight: "900", margin: "0 0 5px 0" }}>{order.pickup?.name}</p>
                  <p style={{ fontSize: "12px", color: "#475569", lineHeight: "1.4", margin: 0 }}>{order.pickup?.address}</p>
                  <p style={{ fontSize: "12px", fontWeight: "bold", color: "#FF6200", marginTop: "10px" }}>Ph: {order.pickup?.phone}</p>
                </div>
                <div style={{ padding: "20px", border: "1px solid #e2e8f0" }}>
                  <p style={{ fontSize: "9px", fontWeight: "900", color: "#4D148C", textTransform: "uppercase", marginBottom: "10px" }}>2. Recipient</p>
                  <p style={{ fontSize: "16px", fontWeight: "900", margin: "0 0 5px 0" }}>{order.recipient?.name}</p>
                  <p style={{ fontSize: "12px", color: "#475569", lineHeight: "1.4", margin: 0 }}>{order.recipient?.address}</p>
                  <p style={{ fontSize: "12px", fontWeight: "bold", color: "#FF6200", marginTop: "10px" }}>Ph: {order.recipient?.phone}</p>
                </div>
              </div>

              {/* PACKAGE INFO */}
              <div style={{ marginBottom: "40px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", backgroundColor: "#f1f5f9", padding: "10px 20px" }}>
                  <span style={{ fontSize: "9px", fontWeight: "900", color: "#64748b", textTransform: "uppercase" }}>Description</span>
                  <span style={{ fontSize: "9px", fontWeight: "900", color: "#64748b", textTransform: "uppercase", textAlign: "center" }}>Weight</span>
                  <span style={{ fontSize: "9px", fontWeight: "900", color: "#64748b", textTransform: "uppercase", textAlign: "right" }}>Declared Value</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", padding: "20px", borderBottom: "1px solid #e2e8f0" }}>
                  <span style={{ fontSize: "14px", fontWeight: "bold" }}>{order.package?.goodsName || "Standard Parcel"}</span>
                  <span style={{ fontSize: "14px", fontWeight: "bold", textAlign: "center" }}>{order.package?.weight} KG</span>
                  <span style={{ fontSize: "14px", fontWeight: "bold", textAlign: "right" }}>{order.payment?.currency} {order.payment?.amount}</span>
                </div>
              </div>

              {/* STATUS TRACKING */}
              <div style={{ padding: "30px", backgroundColor: "#f8fafc", border: "1px solid #e2e8f0" }}>
                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                        <p style={{ fontSize: "9px", fontWeight: "900", color: "#94a3b8", textTransform: "uppercase", margin: "0 0 5px 0" }}>Current Dispatch Position</p>
                        <p style={{ fontSize: "16px", fontWeight: "900", color: "#4D148C", margin: 0 }}>{order.tracking?.currentLocation?.address || "In Transit"}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                        <p style={{ fontSize: "9px", fontWeight: "900", color: "#94a3b8", textTransform: "uppercase", margin: "0 0 5px 0" }}>Manifest Status</p>
                        <p style={{ fontSize: "20px", fontWeight: "900", color: "#FF6200", margin: 0, textTransform: "uppercase", fontStyle: "italic" }}>{order.status}</p>
                    </div>
                 </div>
              </div>

              <div style={{ marginTop: "100px", textAlign: "center", paddingTop: "20px", borderTop: "1px solid #e2e8f0" }}>
                <p style={{ fontSize: "8px", fontWeight: "bold", color: "#cbd5e1", letterSpacing: "2px", textTransform: "uppercase" }}>
                  Security Verified Document • Global Distribution Network • {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EditOrderModal open={isEditModalOpen} order={order} onClose={() => setIsEditModalOpen(false)} onUpdated={fetchData} />
    </main>
  );
}