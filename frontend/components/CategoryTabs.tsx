import React from 'react';
import { cn } from '@/lib/utils';

interface CategoryTabsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryTabs = ({ categories, activeCategory, onCategoryChange }: CategoryTabsProps) => {
  return (
    <div className="flex overflow-x-auto gap-2 px-5 mb-8 no-scrollbar scroll-smooth">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={cn(
            "flex-shrink-0 px-6 py-2.5 rounded-full text-[13px] font-bold transition-all shadow-sm",
            activeCategory === category
              ? "bg-gradient-to-r from-[#2D3A5D] to-[#0E8388] text-white shadow-md shadow-teal-500/20"
              : "bg-[#EDF1F5] text-[#5C6166] hover:bg-gray-200"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
