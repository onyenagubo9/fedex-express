"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import { loginUser } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const role = await loginUser(email, password);
      if (role === "admin") router.replace("/dashboard/admin");
      else if (role === "rider") router.replace("/dashboard/rider");
      else router.replace("/dashboard/customer");
    } catch (err: any) {
      setError(err.message || "The login information you entered is incorrect.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F2F2F2] flex flex-col font-sans">
      
      {/* 1. FedEx Mini Header */}
      <div className="bg-[#4D148C] w-full py-4 px-6 md:px-12 flex justify-between items-center shadow-md">
        <div className="flex items-center">
          <span className="text-3xl font-black tracking-tighter text-white uppercase italic">Fed</span>
          <span className="text-3xl font-black tracking-tighter text-[#FF6200] uppercase italic">ex</span>
        </div>
        <div className="hidden md:block text-white/60 text-[10px] font-bold uppercase tracking-widest">
          Global Security Portal
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-105 bg-white shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] border-t-4 border-[#FF6200]">
          
          <div className="p-8 md:p-10">
            <h2 className="text-2xl font-black text-[#4D148C] uppercase italic tracking-tighter mb-2">
              Login
            </h2>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-8">
              Access your shipping and fleet account
            </p>

            {/* Error Message */}
            {error && (
              <div className="bg-[#FFF1F0] border-l-4 border-[#D93025] p-3 text-[#D93025] text-xs font-bold mb-6 flex items-center gap-2">
                <span className="text-lg">!</span> {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    className="w-full border-2 border-gray-100 p-3 text-sm font-bold outline-none focus:border-[#4D148C] transition-colors"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                    Password
                  </label>
                  <a href="#" className="text-[10px] text-[#4D148C] font-black uppercase hover:underline">Forgot?</a>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    className="w-full border-2 border-gray-100 p-3 text-sm font-bold outline-none focus:border-[#4D148C] transition-colors"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#4D148C] hover:bg-[#3b0f6e] text-white py-4 font-black uppercase tracking-[0.2em] text-xs shadow-lg transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    Login
                    <ArrowRight className="w-4 h-4 text-[#FF6200]" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">
                Need a corporate account?{" "}
                <a href="/auth/register" className="text-[#FF6200] hover:underline">
                  Sign up now
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. FedEx Legal Footer */}
      <div className="bg-white border-t py-6 px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-green-600">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Encrypted SSL Connection</span>
          </div>
          <p className="text-[10px] text-gray-400 font-medium">
            © FedEx 1995-2026. This system is for authorized use only.
          </p>
        </div>
      </div>
    </div>
  );
}