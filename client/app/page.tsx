import React from 'react';
import Link from 'next/link';
import { Cpu, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-[#0a0a14] h-screen flex flex-col items-center justify-center text-white">
      <div className="relative flex items-center justify-center">
        <div className="absolute w-20 h-20 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
        <Cpu className="w-10 h-10 text-blue-500 animate-pulse" />
      </div>
      
      <div className="mt-8 flex flex-col items-center">
        <h1 className="text-2xl font-black tracking-[0.3em] uppercase">
          NEXUS <span className="text-blue-500">AI</span>
        </h1>
        <p className="text-gray-500 text-sm mt-2 tracking-widest uppercase">The Future of Intelligence</p>
        
        <Link 
          href="/auth/login"
          className="mt-10 group relative px-8 py-3 bg-blue-600 rounded-full font-bold overflow-hidden transition-all hover:bg-blue-700"
        >
          <span className="relative z-10 flex items-center gap-2">
            GET STARTED <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>
      </div>
    </div>
  );
}