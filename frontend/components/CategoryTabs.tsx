'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Category {
  name: string;
  icon?: LucideIcon;
}

interface CategoryTabsProps {
  categories: (string | Category)[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryTabs = ({ categories, activeCategory, onCategoryChange }: CategoryTabsProps) => {
  return (
    <div className="flex overflow-x-auto gap-3 px-5 mb-10 no-scrollbar scroll-smooth">
      {categories.map((cat, idx) => {
        const name = typeof cat === 'string' ? cat : cat.name;
        const Icon = typeof cat === 'string' ? null : cat.icon;
        const isActive = activeCategory === name;

        return (
          <motion.button
            key={name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onCategoryChange(name)}
            className={cn(
              "flex-shrink-0 flex items-center gap-2.5 px-6 py-3 rounded-full text-[11px] font-black uppercase tracking-wider transition-all duration-300 border",
              isActive
                ? "bg-[#1A1C1E] text-white border-[#1A1C1E] shadow-xl shadow-teal-500/10"
                : "bg-white text-gray-400 border-gray-100 hover:border-gray-300"
            )}
          >
            {Icon && (
              <Icon 
                size={14} 
                strokeWidth={isActive ? 3 : 2.5} 
                className={cn("transition-colors", isActive ? "text-teal-400" : "text-gray-300")} 
              />
            )}
            <span>{name}</span>
            
            {isActive && (
              <motion.div 
                layoutId="active-pill"
                className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-blue-500/10 rounded-full -z-10"
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

export default CategoryTabs;

