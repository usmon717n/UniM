import React from 'react';
import { LucideIcon, ChevronRight } from 'lucide-react';
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
  return (
    <div className="bg-white rounded-[24px] p-4 shadow-sm border border-gray-50 flex items-center justify-between mb-3 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-center gap-4">
        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", iconBg, iconColor)}>
          <Icon size={22} />
        </div>
        <div className="flex flex-col">
          <span className="text-[#1A1C1E] text-[15px] font-bold mb-0.5">{title}</span>
          <span className="text-[#8E949A] text-[11px] font-medium">{subtitle}</span>
        </div>
      </div>

      <ChevronRight size={18} className="text-gray-300" />
    </div>
  );
};

export default SecurityItem;
