"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import api from "@/lib/axios";
import { User, Mail, Bell, Palette, Loader2, Moon, Sun, Monitor, Check } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("appearance");
  const { theme, setTheme } = useTheme();
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fetchProfile = async () => {
      try {
        const res = await api.get("/auth/me");
        setUserData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (!mounted || loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background text-foreground">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 min-h-screen bg-background text-foreground transition-colors duration-300">
      <div>
        <h1 className="text-4xl font-bold mb-2 uppercase tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground text-sm font-medium">Manage your profile and interface preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-card p-2 rounded-2xl border border-border shadow-sm">
        <button 
          onClick={() => setActiveTab("profile")} 
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold transition-all ${activeTab === "profile" ? "bg-indigo-600 text-white shadow-lg" : "text-muted-foreground hover:bg-accent"}`}
        >
          <User className="w-4 h-4" /> Profile
        </button>
        <button 
          onClick={() => setActiveTab("notifications")} 
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold transition-all ${activeTab === "notifications" ? "bg-indigo-600 text-white shadow-lg" : "text-muted-foreground hover:bg-accent"}`}
        >
          <Bell className="w-4 h-4" /> Notifications
        </button>
        <button 
          onClick={() => setActiveTab("appearance")} 
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold transition-all ${activeTab === "appearance" ? "bg-indigo-600 text-white shadow-lg" : "text-muted-foreground hover:bg-accent"}`}
        >
          <Palette className="w-4 h-4" /> Appearance
        </button>
      </div>

      {activeTab === "profile" && (
        <div className="bg-card border border-border rounded-3xl p-8 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <h2 className="text-2xl font-bold">Public Profile</h2>
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-3xl bg-indigo-600 flex items-center justify-center text-4xl font-black text-white shadow-xl shadow-indigo-500/20">
              {userData.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-xl font-bold">{userData.name}</h3>
              <p className="text-indigo-500 font-bold text-xs uppercase tracking-widest">Nexus Core Member</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2 text-foreground">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input type="text" value={userData.name} readOnly className="w-full bg-background border border-border rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-indigo-500/50" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Email Address</label>
              <div className="relative text-foreground">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input type="email" value={userData.email} readOnly className="w-full bg-background border border-border rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-indigo-500/50" />
              </div>
            </div>
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-lg shadow-indigo-500/20 active:scale-95">Save Profile Changes</button>
        </div>
      )}

      {activeTab === "appearance" && (
        <div className="bg-card border border-border rounded-3xl p-8 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <h2 className="text-2xl font-bold">Theme & Interface</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { id: 'dark', name: 'Dark Mode', icon: Moon },
              { id: 'light', name: 'Light Mode', icon: Sun },
              { id: 'system', name: 'System Default', icon: Monitor },
            ].map((t) => (
              <div 
                key={t.id} 
                onClick={() => setTheme(t.id)}
                className={`p-6 border rounded-2xl cursor-pointer transition-all flex flex-col items-center gap-3 relative overflow-hidden ${theme === t.id ? 'border-indigo-600 bg-indigo-600/5 ring-2 ring-indigo-600/20' : 'border-border bg-background hover:border-indigo-400'}`}
              >
                {theme === t.id && <div className="absolute top-2 right-2 bg-indigo-600 text-white rounded-full p-1"><Check className="w-3 h-3" /></div>}
                <t.icon className={`w-10 h-10 ${theme === t.id ? 'text-indigo-600' : 'text-muted-foreground'}`} />
                <span className={`font-black text-[10px] uppercase tracking-widest ${theme === t.id ? 'text-indigo-600' : 'text-foreground'}`}>{t.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "notifications" && (
        <div className="bg-card border border-border rounded-3xl p-8 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <h2 className="text-2xl font-bold">Preferences</h2>
          <div className="space-y-4">
            {["Email Notifications", "Push Notifications", "Activity Alerts"].map((item) => (
              <div key={item} className="flex items-center justify-between p-5 bg-background border border-border rounded-2xl">
                <span className="font-bold text-sm text-foreground">{item}</span>
                <div className="w-12 h-6 bg-indigo-600 rounded-full relative cursor-pointer shadow-inner">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-md"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}