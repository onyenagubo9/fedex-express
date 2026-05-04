"use client";

import { useState } from "react";
import { Mail, Send, Hash, User, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export default function SendTrackingMailPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [trackingCode, setTrackingCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setStatus("idle");

    try {
      const res = await fetch("/api/admin/send-tracking-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, trackingCode }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to dispatch notification");

      setStatus("success");
      setMessage("Electronic notification dispatched successfully.");
      setEmail("");
      setName("");
      setTrackingCode("");
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-125 bg-white shadow-2xl overflow-hidden border-t-8 border-[#FF6200]">
        
        {/* HEADER SECTION */}
        <div className="bg-[#4D148C] p-6 text-white">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-black italic tracking-tighter uppercase">
              Dispatch <span className="text-[#FF6200]">Alert</span>
            </h1>
            <Send className="w-5 h-5 text-[#FF6200]" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">
            Internal Communications • Automated Mailer
          </p>
        </div>

        {/* FORM SECTION */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          
          {/* USER NAME */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
              Recipient Name
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="EX: JOHN DOE"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border-b-2 border-gray-100 p-3 text-sm font-bold outline-none focus:border-[#4D148C] bg-slate-50 transition-colors uppercase"
                required
              />
              <User className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
            </div>
          </div>

          {/* EMAIL ADDRESS */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
              Destination Email
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="RECIPIENT@DOMAIN.COM"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-b-2 border-gray-100 p-3 text-sm font-bold outline-none focus:border-[#4D148C] bg-slate-50 transition-colors"
                required
              />
              <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
            </div>
          </div>

          {/* TRACKING CODE */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
              Assigned Tracking ID
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="FX-4492-XXXX"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                className="w-full border-b-2 border-gray-100 p-3 text-sm font-bold outline-none focus:border-[#4D148C] bg-slate-50 transition-colors uppercase"
                required
              />
              <Hash className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
            </div>
          </div>

          {/* STATUS MESSAGE */}
          {message && (
            <div className={`flex items-center gap-3 p-4 text-xs font-black uppercase tracking-widest rounded transition-all ${
              status === "success" 
                ? "bg-green-50 text-green-700 border border-green-200" 
                : "bg-red-50 text-red-700 border border-red-200"
            }`}>
              {status === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              {message}
            </div>
          )}

          {/* ACTION BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#4D148C] hover:bg-[#3b0f6e] text-white py-4 font-black uppercase tracking-[0.25em] text-xs shadow-xl transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-3 group"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing Dispatch...
              </>
            ) : (
              <>
                Confirm & Send Email
                <Send className="w-4 h-4 text-[#FF6200] group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* FOOTER */}
        <div className="bg-gray-50 p-4 border-t border-gray-100 flex justify-center">
          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest text-center">
            Authorized Personnel Only • FedEx Admin Services
          </p>
        </div>
      </div>
    </div>
  );
}