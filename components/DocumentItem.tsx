import React from 'react';
import { LucideIcon, EyeOff, ChevronRight } from 'lucide-react';
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
  return (
    <div className="bg-white rounded-[24px] p-4 shadow-sm border border-gray-50 flex items-center justify-between mb-3 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-center gap-4">
        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", iconBg, iconColor)}>
          <Icon size={22} />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[#1A1C1E] text-[15px] font-bold">{title}</span>
            <EyeOff size={14} className="text-gray-300" />
          </div>
          <span className="text-[#8E949A] text-[11px] font-medium">{subtitle}</span>
        </div>
      </div>

      <ChevronRight size={18} className="text-gray-300" />
    </div>
  );
};

export default DocumentItem;
