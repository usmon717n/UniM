import React from 'react';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

const MaskanHeader = () => {
  return (
    <header className="flex items-center justify-between px-5 pt-6 pb-4">
      <div className="flex items-center gap-3">
        <Link 
          href="/" 
          className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-[#1A1C1E] active:scale-95 transition-transform"
          aria-label="Orqaga qaytish"
        >
          <ChevronLeft size={24} />
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#2D3A5D] flex items-center justify-center text-white font-bold text-sm">
            U
          </div>
          <span className="text-[#1A1C1E] text-lg font-black tracking-tight">UniM</span>
        </div>
      </div>

      <button className="bg-[#EDF1F5] px-3 py-1.5 rounded-full flex items-center gap-1.5 hover:bg-gray-200 transition-colors">
        <span className="text-sm">🇺🇿</span>
        <span className="text-[11px] font-bold text-[#1A1C1E]">UZ</span>
      </button>
    </header>
  );
};

export default MaskanHeader;
