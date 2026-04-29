import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SmartHomeCardProps {
  title: string;
  status: string;
  icon: LucideIcon;
  iconColor: string;
  isActive: boolean;
}

const SmartHomeCard = ({
  title,
  status,
  icon: Icon,
  iconColor,
  isActive
}: SmartHomeCardProps) => {
  return (
    <div className={cn(
      "bg-white rounded-3xl p-5 shadow-sm border border-gray-50 flex flex-col transition-all",
      !isActive && "opacity-60"
    )}>
      <div className="flex items-center justify-between mb-4">
        <div className={cn("w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center", iconColor)}>
          <Icon size={20} />
        </div>
        
        {/* Toggle Switch */}
        <button 
          aria-label={`Toggle ${title}`}
          className={cn(
            "w-10 h-5 rounded-full relative transition-colors duration-200 ease-in-out",
            isActive ? "bg-emerald-500" : "bg-gray-200"
          )}
        >
          <div className={cn(
            "absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200",
            isActive ? "left-[22px]" : "left-0.5"
          )} />
        </button>
      </div>

      <h3 className="text-[#1A1C1E] text-[13px] font-bold leading-tight mb-1">{title}</h3>
      <p className="text-[#8E949A] text-[10px] font-medium">{status}</p>
    </div>
  );
};

export default SmartHomeCard;
