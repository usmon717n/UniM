'use client';

import React, { useState } from 'react';
import { LucideIcon, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SecurityItemProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

const SecurityItem = ({
  title,
  subtitle,
  icon: Icon,
  iconBg,
  iconColor
}: SecurityItemProps) => {
  const [isOn, setIsOn] = useState(false);

  return (
    <motion.div 
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className="group bg-white/70 backdrop-blur-md rounded-[24px] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-white hover:bg-white hover:shadow-xl transition-all duration-300 cursor-pointer mb-3 flex items-center justify-between"
    >
      <div className="flex items-center gap-4">
        {/* Premium Icon Container */}
        <div className={cn(
          "w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500",
          iconBg, iconColor
        )}>
          <Icon size={22} strokeWidth={2.5} />
        </div>
        <div className="flex flex-col">
          <span className="text-[#1A1C1E] text-[15px] font-black tracking-tight mb-0.5">{title}</span>
          <span className="text-[#8E949A] text-[10px] font-black uppercase tracking-wider opacity-60">{subtitle}</span>
        </div>
      </div>

      {/* Custom Animated Toggle Switch */}
      <div className="flex items-center gap-3">
        <motion.div 
          onClick={(e) => { e.stopPropagation(); setIsOn(!isOn); }}
          animate={{ backgroundColor: isOn ? '#10B981' : '#E5E7EB' }}
          className="relative w-11 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300"
        >
          <motion.div 
            animate={{ x: isOn ? 20 : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="w-4 h-4 bg-white rounded-full shadow-md"
          />
        </motion.div>
        
        <ChevronRight size={16} strokeWidth={3} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
      </div>

      {/* Subtle Interaction Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/0 via-teal-500/0 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[24px] pointer-events-none" />
    </motion.div>
  );
};

export default SecurityItem;

