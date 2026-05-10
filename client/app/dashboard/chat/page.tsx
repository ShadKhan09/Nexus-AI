"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Send, Bot, User, Loader2 } from "lucide-react";
import api from "@/lib/axios";

export default function ChatPage() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [userName, setUserName] = useState("User");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initChat = async () => {
      try {
        const userRes = await api.get("/auth/me");
        setUserName(userRes.data.name);
        const chatRes = await api.get("/chat/history");
        setMessages(Array.isArray(chatRes.data) ? chatRes.data : []);
      } catch (err) {
        router.push("/auth/login");
      } finally {
        setIsFetching(false);
      }
    };
    initChat();
  }, [router]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const onSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    const currentInput = input;
    setInput("");
    setLoading(true);
    try {
      const res = await api.post("/chat/send", { message: currentInput });
      setMessages((prev) => [...prev, { role: "assistant", content: res.data.reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Service unavailable." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    // h-[calc(100vh-64px)] mobile header ke liye jagah chhodne ke liye (agar layout mein header hai)
    <div className="flex flex-col h-[calc(100vh-4rem)] lg:h-screen bg-[#0a0a14] text-white overflow-hidden">
      
      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-3 md:p-8 space-y-4 md:space-y-6">
        {isFetching ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 opacity-40 px-6 text-center">
            <Bot className="w-12 h-12 md:w-16 md:h-16 mb-4" />
            <p className="text-lg md:text-xl font-medium leading-tight">
              Kaise ho {userName}? <br/> Main aaj aapki kya madad kar sakta hoon?
            </p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-4 md:space-y-6 pb-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex gap-2 md:gap-4 max-w-[95%] md:max-w-[85%] ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                  {/* Avatar - Mobile par chota */}
                  <div className={`flex-shrink-0 w-8 h-8 md:w-9 md:h-9 rounded-lg md:rounded-xl flex items-center justify-center ${m.role === "user" ? "bg-indigo-600" : "bg-[#1e1e30] border border-slate-700"}`}>
                    {m.role === "user" ? <User className="w-4 h-4 md:w-5 md:h-5" /> : <Bot className="w-4 h-4 md:w-5 md:h-5 text-indigo-400" />}
                  </div>
                  
                  {/* Bubble - Responsive Text & Padding */}
                  <div className={`p-3 md:p-4 rounded-2xl text-sm md:text-[15px] shadow-sm ${
                    m.role === "user" 
                    ? "bg-indigo-600 rounded-tr-none text-white" 
                    : "bg-[#16162a] border border-slate-800 rounded-tl-none text-slate-200"
                  }`}>
                    {m.content}
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="flex gap-2 md:gap-4 items-center bg-[#16162a] border border-slate-800 p-3 rounded-2xl rounded-tl-none">
                  <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
                  <span className="text-xs text-slate-400 font-medium">Nexus is thinking...</span>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>
        )}
      </div>

      {/* Input Area - Mobile Friendly */}
      <div className="p-3 md:p-6 bg-[#0a0a14] border-t border-slate-800/30">
        <div className="max-w-4xl mx-auto relative flex items-center gap-2">
          <div className="relative flex-1">
            <input 
              className="w-full bg-[#111122] border border-slate-800 rounded-xl md:rounded-2xl py-3 md:py-4 pl-4 pr-12 md:pl-6 md:pr-16 outline-none focus:border-indigo-500 transition-all text-sm md:text-base" 
              placeholder="Ask anything..." 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              onKeyDown={(e) => e.key === "Enter" && onSend()} 
            />
            <button 
              onClick={onSend} 
              disabled={loading || !input.trim()} 
              className="absolute right-1.5 top-1.5 bottom-1.5 px-3 md:px-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg md:rounded-xl transition-colors disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" /> : <Send className="w-4 h-4 md:w-5 md:h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}