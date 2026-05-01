'use client';

import React from 'react';
import { ChevronLeft, Sparkles, Globe } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const SubPageHeader = () => {
  return (
    <header className="flex items-center justify-between px-5 pt-7 pb-4 relative z-50">
      <div className="flex items-center gap-4">
        {/* Premium Back Button */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Link href="/">
            <motion.div 
              whileHover={{ x: -3, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group w-11 h-11"
            >
              {/* Back Button Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative w-full h-full bg-white/80 backdrop-blur-md rounded-full border border-white shadow-[0_4px_15px_rgba(0,0,0,0.05)] flex items-center justify-center text-[#1A1C1E] transition-all duration-300 group-hover:border-teal-500/30 group-hover:shadow-teal-500/10">
                <ChevronLeft size={22} strokeWidth={2.5} className="group-hover:-translate-x-0.5 transition-transform" />
              </div>
            </motion.div>
          </Link>
        </motion.div>

        {/* Brand Logo Area */}
        <motion.div 
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-2.5"
        >
          <div className="relative w-9 h-9">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-blue-600 rounded-full blur-sm opacity-20" />
            <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#1A1C1E] to-[#2D3A5D] flex items-center justify-center text-white shadow-lg overflow-hidden group">
              <span className="text-sm font-black tracking-tighter">U</span>
              <motion.div 
                animate={{ x: ['-100%', '200%'] }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear", repeatDelay: 5 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[45deg]"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-[#1A1C1E] text-lg font-black tracking-tighter leading-none">UniM</span>
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-teal-600 mt-0.5">Personal Hub</span>
          </div>
        </motion.div>
      </div>

      {/* Language / Action Area */}
      <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <button className="bg-white/60 backdrop-blur-md px-3.5 py-2 rounded-2xl flex items-center gap-2 border border-white shadow-sm hover:bg-white hover:shadow-md transition-all duration-300 group active:scale-95">
          <Globe size={14} className="text-gray-400 group-hover:text-teal-600 transition-colors" />
          <span className="text-[11px] font-black text-[#1A1C1E] uppercase tracking-wider">UZ</span>
        </button>
      </motion.div>
    </header>
  );
};

export default SubPageHeader;

