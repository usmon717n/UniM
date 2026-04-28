import React from 'react';
import { Home, ShieldAlert } from 'lucide-react';

const BottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center md:hidden">
      <div className="w-full max-w-[1100px] bg-white/80 backdrop-blur-xl border-t border-gray-100 px-8 py-3 flex items-center justify-between pb-6">
        {/* Bosh sahifa */}
        <button className="flex flex-col items-center gap-1 text-[#2D3A5D]">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mb-0.5">
            <Home size={20} />
          </div>
          <span className="text-[10px] font-bold">Bosh sahifa</span>
        </button>

        {/* SOS Button */}
        <div className="relative -top-6">
          <button className="relative group">
            {/* Outer Ring/Glow */}
            <div className="absolute -inset-2 bg-red-500/20 rounded-full blur-xl group-hover:bg-red-500/30 transition-all" />
            
            {/* Main Button */}
            <div className="relative w-16 h-16 bg-[#FF3B30] rounded-full border-[6px] border-white flex items-center justify-center text-white shadow-xl group-active:scale-95 transition-transform">
              <ShieldAlert size={32} />
            </div>
            
            {/* Label */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
              <span className="text-[#FF3B30] text-[11px] font-black tracking-wider uppercase">SOS</span>
            </div>
          </button>
        </div>

        {/* Empty space to balance the layout */}
        <div className="w-8" />
      </div>
    </div>
  );
};

export default BottomNav;
