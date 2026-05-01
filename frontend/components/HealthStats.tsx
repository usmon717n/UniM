'use client';

import React from 'react';
import { Heart, Footprints, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

const HealthStats = () => {
  return (
    <div className="px-5 mb-8">
      <div className="bg-[#FDFDFD] rounded-[32px] p-6 sm:p-7 shadow-[0_12px_40px_rgba(0,0,0,0.03)] border border-white/80 flex items-center justify-between relative overflow-hidden">
        
        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-50/30 blur-[60px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-rose-50/30 blur-[60px] pointer-events-none" />

        {/* Heart Rate */}
        <div className="flex flex-col items-center flex-1 group cursor-pointer">
          <div className="relative mb-3">
            <div className="w-12 h-12 rounded-full bg-[#FFF5F5] flex items-center justify-center text-[#E31E24] shadow-inner transition-transform duration-500 group-hover:scale-110">
              <Heart size={22} fill="currentColor" className="drop-shadow-[0_2px_4px_rgba(227,30,36,0.2)]" />
              
              {/* Microscopic light refraction effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 via-transparent to-transparent pointer-events-none" />
            </div>
            
            {/* Blue Pulse Dot */}
            <motion.div 
              animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-blue-400 rounded-full border-2 border-[#FDFDFD] shadow-[0_0_8px_rgba(96,165,250,0.6)]"
            />
          </div>
          <div className="text-center">
            <p className="text-[10px] sm:text-[11px] text-[#94A3B8] font-semibold uppercase tracking-wider mb-1 opacity-80">Yurak urishi</p>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-[#334155] text-xl sm:text-2xl font-black tracking-tight">72</span>
              <span className="text-[10px] sm:text-[11px] text-[#94A3B8] font-bold">bpm</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-[1px] h-10 bg-gradient-to-b from-transparent via-gray-100/60 to-transparent mx-1" />

        {/* Steps */}
        <div className="flex flex-col items-center flex-1 group cursor-pointer">
          <div className="relative mb-3">
            <div className="w-12 h-12 rounded-full bg-[#F0FDF4] flex items-center justify-center text-[#10B981] shadow-inner transition-transform duration-500 group-hover:scale-110">
              <Footprints size={22} className="drop-shadow-[0_2px_4px_rgba(16,185,129,0.2)]" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
          <div className="text-center">
            <p className="text-[10px] sm:text-[11px] text-[#94A3B8] font-semibold uppercase tracking-wider mb-1 opacity-80">Qadamlar</p>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-[#334155] text-xl sm:text-2xl font-black tracking-tight">6,842</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-[1px] h-10 bg-gradient-to-b from-transparent via-gray-100/60 to-transparent mx-1" />

        {/* Sleep */}
        <div className="flex flex-col items-center flex-1 group cursor-pointer">
          <div className="relative mb-3">
            <div className="w-12 h-12 rounded-full bg-[#F5F3FF] flex items-center justify-center text-[#8B5CF6] shadow-inner transition-transform duration-500 group-hover:scale-110">
              <Moon size={22} fill="currentColor" className="drop-shadow-[0_2px_4px_rgba(139,92,246,0.2)]" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
          <div className="text-center">
            <p className="text-[10px] sm:text-[11px] text-[#94A3B8] font-semibold uppercase tracking-wider mb-1 opacity-80">Uyqu</p>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-[#334155] text-xl sm:text-2xl font-black tracking-tight">7.2</span>
              <span className="text-[10px] sm:text-[11px] text-[#94A3B8] font-bold">h</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthStats;

