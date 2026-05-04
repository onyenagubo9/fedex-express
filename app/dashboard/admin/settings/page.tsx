"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  User, 
  Bell, 
  ShieldCheck, 
  Truck, 
  Save, 
  ChevronRight,
  LogOut,
  Loader2
} from "lucide-react";

export default function AdminSettingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    employeeId: "FX-PENDING",
    role: "Administrator"
  });

  // Fetch real admin details on mount
  useEffect(() => {
    async function fetchAdmin() {
      try {
        const res = await fetch("/api/auth/me"); // Adjust to your actual endpoint
        if (res.ok) {
          const data = await res.json();
          setAdminData({
            name: data.name || "System Admin",
            email: data.email || "admin@fedex-clone.com",
            employeeId: data.employeeId || "FEDX-9928",
            role: data.role || "Global Superuser"
          });
        }
      } catch (err) {
        console.error("Failed to fetch admin profile", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAdmin();
  }, []);

  const handleLogout = async () => {
    // Replace with your actual logout logic (e.g., clearing cookies/tokens)
    const confirmLogout = confirm("Are you sure you want to terminate this secure session?");
    if (confirmLogout) {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/auth/login");
    }
  };

  return (
    <div className="bg-[#F7F7F7] min-h-screen font-sans">
      {/* HEADER */}
      <div className="bg-[#4D148C] text-white p-8 border-b-4 border-[#FF6200]">
        <div className="max-w-5xl mx-auto flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-black italic tracking-tighter uppercase mb-2">
              System <span className="text-[#FF6200]">Settings</span>
            </h1>
            <p className="text-purple-200 text-[10px] font-black tracking-[0.2em] uppercase opacity-80">
              Control Panel • Node ID: {adminData.employeeId}
            </p>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-[10px] font-bold uppercase text-purple-300">Logged in as</p>
            <p className="text-xs font-black uppercase italic">{adminData.name}</p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-8 pb-20">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* SIDEBAR NAVIGATION */}
          <aside className="w-full md:w-64 flex flex-col gap-2">
            <NavButton 
              active={activeTab === "profile"} 
              onClick={() => setActiveTab("profile")}
              icon={User} 
              label="Admin Profile" 
            />
            <NavButton 
              active={activeTab === "logistics"} 
              onClick={() => setActiveTab("logistics")}
              icon={Truck} 
              label="Logistics Config" 
            />
            <NavButton 
              active={activeTab === "security"} 
              onClick={() => setActiveTab("security")}
              icon={ShieldCheck} 
              label="Security & Access" 
            />
            <NavButton 
              active={activeTab === "notifications"} 
              onClick={() => setActiveTab("notifications")}
              icon={Bell} 
              label="Dispatch Alerts" 
            />

            <div className="mt-4 pt-4 border-t border-gray-200">
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 p-4 rounded-lg bg-white text-red-600 hover:bg-red-50 transition-all border border-transparent hover:border-red-100 shadow-sm"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-xs font-black uppercase tracking-widest">Terminate Session</span>
              </button>
            </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <main className="flex-1 space-y-6">
            
            {/* PROFILE SECTION */}
            {activeTab === "profile" && (
              <SettingsCard title="Administrator Identity">
                {loading ? (
                  <div className="flex justify-center py-10"><Loader2 className="animate-spin text-[#4D148C]" /></div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputGroup label="Full Name" defaultValue={adminData.name} />
                    <InputGroup label="Official Email" defaultValue={adminData.email} />
                    <InputGroup label="Employee ID" value={adminData.employeeId} disabled />
                    <InputGroup label="Access Level" value={adminData.role} disabled />
                  </div>
                )}
              </SettingsCard>
            )}

            {/* LOGISTICS CONFIG */}
            {activeTab === "logistics" && (
              <SettingsCard title="Global Delivery Parameters">
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-slate-50 border border-dashed border-gray-300 rounded-lg">
                    <div>
                      <p className="font-black text-xs uppercase text-[#4D148C]">Auto-Tracking Generation</p>
                      <p className="text-[10px] text-gray-500 font-bold uppercase">Automatically generate FX- IDs for new orders</p>
                    </div>
                    <Toggle active={true} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputGroup label="Base Shipping Rate ($)" placeholder="25.00" type="number" />
                    <InputGroup label="Fuel Surcharge (%)" placeholder="12.5" type="number" />
                  </div>
                </div>
              </SettingsCard>
            )}

            {/* SECURITY SECTION (Placeholder for more FedEx-style inputs) */}
            {activeTab === "security" && (
              <SettingsCard title="Access & Encryption">
                <div className="space-y-6">
                  <InputGroup label="New Password" type="password" placeholder="••••••••" />
                  <InputGroup label="Confirm Password" type="password" placeholder="••••••••" />
                </div>
              </SettingsCard>
            )}

            {/* SAVE BUTTON */}
            <div className="flex justify-end pt-4">
              <button className="bg-[#4D148C] hover:bg-[#3b0f6e] text-white px-10 py-4 rounded-sm font-black text-xs uppercase tracking-[0.25em] shadow-2xl flex items-center gap-3 transition-all active:scale-95">
                <Save className="w-4 h-4 text-[#FF6200]" />
                Commit Updates
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

/* ---------------- UI SUB-COMPONENTS ---------------- */

function NavButton({ icon: Icon, label, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center justify-between p-4 rounded-lg transition-all group ${
        active 
        ? "bg-white text-[#4D148C] shadow-md border-l-4 border-[#FF6200]" 
        : "text-gray-500 hover:bg-gray-100"
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon className={`w-5 h-5 ${active ? "text-[#4D148C]" : "text-gray-400 group-hover:text-gray-600"}`} />
        <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
      </div>
      <ChevronRight className={`w-4 h-4 ${active ? "text-[#FF6200]" : "opacity-0"}`} />
    </button>
  );
}

function SettingsCard({ title, children }: any) {
  return (
    <div className="bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border-t-4 border-[#4D148C] overflow-hidden">
      <div className="bg-gray-50 px-6 py-3 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{title}</h2>
        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
      </div>
      <div className="p-8">
        {children}
      </div>
    </div>
  );
}

function InputGroup({ label, placeholder, value, defaultValue, type = "text", disabled = false }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[9px] font-black uppercase text-gray-400 tracking-[0.15em]">{label}</label>
      <input 
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        className={`w-full border-b-2 p-2 font-black text-xs outline-none transition-all uppercase tracking-tighter ${
          disabled 
          ? "bg-gray-50 border-gray-100 text-gray-300 italic" 
          : "border-gray-100 focus:border-[#4D148C] text-gray-700 bg-white hover:bg-slate-50"
        }`}
      />
    </div>
  );
}

function Toggle({ active }: { active: boolean }) {
  return (
    <div className={`w-10 h-5 rounded-full p-1 transition-colors cursor-pointer ${active ? 'bg-[#FF6200]' : 'bg-gray-300'}`}>
      <div className={`w-3 h-3 bg-white rounded-full transition-transform ${active ? 'translate-x-5' : 'translate-x-0'}`} />
    </div>
  );
}