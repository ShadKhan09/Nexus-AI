"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, 
  MessageSquare, 
  Image as ImageIcon, 
  BarChart3, 
  ShieldCheck, 
  Settings, 
  LogOut,
  User as UserIcon
} from "lucide-react";
import api from "@/lib/axios";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data);
      } catch (err) {
        router.push("/auth/login");
      }
    };
    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      router.push("/auth/login");
    } catch (err) {
      console.error(err);
    }
  };

  if (!mounted) return null;

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Chat AI", icon: MessageSquare, path: "/dashboard/chat" },
    { name: "Image Gen", icon: ImageIcon, path: "/dashboard/image" },
    { name: "Analytics", icon: BarChart3, path: "/dashboard/analytics" },
    { name: "Security", icon: ShieldCheck, path: "/dashboard/security" },
    { name: "Settings", icon: Settings, path: "/dashboard/settings" },
  ];

  return (
    <div className="flex h-screen bg-background text-foreground transition-colors duration-300">
      <aside className="w-64 border-r border-border flex flex-col bg-card">
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <span className="text-white font-black text-xl">N</span>
            </div>
            <span className="text-xl font-bold tracking-tight">NEXUS<span className="text-indigo-500">AI</span></span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                pathname === item.path 
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20" 
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-bold text-sm uppercase tracking-wide">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 mt-auto space-y-4">
          <div className="bg-background border border-border rounded-2xl p-4 flex items-center gap-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20">
              {user ? user.name.charAt(0).toUpperCase() : <UserIcon className="w-5 h-5" />}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate">{user ? user.name : "Loading..."}</p>
              <p className="text-[10px] text-indigo-500 font-black uppercase tracking-widest">Pro Member</p>
            </div>
          </div>

          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-500/5 rounded-xl transition-all group font-bold text-sm uppercase tracking-wider"
          >
            <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Logout Account</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-background">
        {children}
      </main>
    </div>
  );
}