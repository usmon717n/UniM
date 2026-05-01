'use client';

import React from 'react';
import { LucideIcon, EyeOff, ChevronRight, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface DocumentItemProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

const DocumentItem = ({
  title,
  subtitle,
  icon: Icon,
  iconBg,
  iconColor
}: DocumentItemProps) => {
  // Extract category and date from subtitle (format: "Category • Date")
  const [category, date] = subtitle.split(' • ');

  return (
    <motion.div 
      whileHover={{ x: 6, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className="group bg-white/70 backdrop-blur-md rounded-[24px] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-white hover:bg-white hover:shadow-xl transition-all duration-300 cursor-pointer mb-3 flex items-center justify-between"
    >
      <div className="flex items-center gap-4 flex-1 min-w-0">
        {/* Premium Icon Container */}
        <div className={cn(
          "relative w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm group-hover:shadow-lg group-hover:scale-110 transition-all duration-500",
          iconBg, iconColor
        )}>
          <div className="absolute inset-0 bg-white/20 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
          <Icon size={22} strokeWidth={2.5} className="relative z-10" />
        </div>

        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[#1A1C1E] text-[15px] font-black tracking-tight truncate">{title}</span>
            <EyeOff size={12} className="text-gray-300 opacity-60" />
          </div>
          
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            {/* Category Tag */}
            <div className="px-2 py-0.5 bg-gray-100/50 rounded-md border border-gray-200/30">
              <span className="text-[9px] font-black uppercase tracking-wider text-gray-500">{category}</span>
            </div>
            
            {/* Date Info */}
            <div className="flex items-center gap-1 opacity-50">
              <Calendar size={10} className="text-gray-400" />
              <span className="text-[10px] font-bold text-gray-400">{date}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors">
          <ChevronRight size={16} strokeWidth={3} className="transform group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
};

export default DocumentItem;

