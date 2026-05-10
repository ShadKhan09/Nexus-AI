"use client";

import { ShieldCheck, Lock, Eye, EyeOff, ShieldAlert, Smartphone } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function SecurityPage() {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-10 text-white">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black flex items-center gap-3">
          <ShieldCheck className="text-blue-500 w-8 h-8" />
          Security Settings
        </h1>
        <p className="text-slate-400">Manage your account security and authentication preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#0f0f1d] border border-white/5 p-8 rounded-[2rem] shadow-xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Lock size={20} className="text-blue-400" /> 
              Change Password
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Current Password</label>
                <div className="relative">
                  <input 
                    type={showPass ? "text" : "password"}
                    className="w-full bg-[#0a0a14] border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-blue-500/50 transition-all"
                    placeholder="Enter current password"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">New Password</label>
                <div className="relative">
                  <input 
                    type={showPass ? "text" : "password"}
                    className="w-full bg-[#0a0a14] border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-blue-500/50 transition-all"
                    placeholder="Minimum 8 characters"
                  />
                  <button 
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                  >
                    {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 rounded-2xl mt-4">
                Update Password
              </Button>
            </div>
          </div>
        </div>

        {}
        <div className="space-y-6">
          <div className="bg-[#0f0f1d] border border-white/5 p-8 rounded-[2rem] shadow-xl">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Smartphone size={20} className="text-emerald-400" />
              Two-Factor
            </h3>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Add an extra layer of security to your account.
            </p>
            <div className="flex items-center justify-between p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
              <span className="text-sm font-medium text-emerald-400">Status: Disabled</span>
              <button className="text-[10px] font-black uppercase tracking-widest text-white bg-emerald-600 px-4 py-2 rounded-lg">
                Enable
              </button>
            </div>
          </div>

          <div className="bg-red-500/5 border border-red-500/10 p-8 rounded-[2rem]">
            <h3 className="text-lg font-bold text-red-400 mb-2 flex items-center gap-2">
              <ShieldAlert size={18} />
              Danger Zone
            </h3>
            <p className="text-[11px] text-slate-500 mb-4">Deleting your account is permanent.</p>
            <button className="text-xs font-bold text-red-500 hover:underline">
              Delete Nexus Account
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}