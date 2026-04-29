import React from 'react';
import { Star, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  name: string;
  description: string;
  rating: number;
  category: string;
  icon: string;
  gradient: string;
}

const ProductCard = ({
  name,
  description,
  rating,
  category,
  icon,
  gradient
}: ProductCardProps) => {
  return (
    <div className="bg-white rounded-[32px] p-5 shadow-sm border border-gray-50 flex items-center justify-between hover:shadow-md transition-shadow mb-4">
      <div className="flex items-center gap-4 flex-1">
        <div className={cn(
          "w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-inner",
          gradient
        )}>
          {icon}
        </div>
        
        <div className="flex flex-col flex-1">
          <h3 className="text-[#1A1C1E] text-base font-bold mb-0.5 leading-tight">{name}</h3>
          <p className="text-[#8E949A] text-[11px] font-medium leading-tight mb-2 pr-4">{description}</p>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Star size={14} className="text-amber-400 fill-amber-400" />
              <span className="text-[#1A1C1E] text-[11px] font-bold">{rating}</span>
            </div>
            <span className="text-[#8E949A] text-[11px] font-medium">{category}</span>
          </div>
        </div>
      </div>

      <button 
        aria-label={`Ochish ${name}`}
        className="bg-gradient-to-r from-[#2D3A5D] to-[#0E8388] text-white px-5 py-2.5 rounded-full flex items-center gap-2 text-[11px] font-bold shadow-lg shadow-teal-500/10 active:scale-95 transition-transform"
      >
        Ochish
        <ExternalLink size={14} />
      </button>
    </div>
  );
};

export default ProductCard;
