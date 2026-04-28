import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  iconGradient?: string;
  className?: string;
}

const SectionTitle = ({ 
  title, 
  subtitle, 
  icon: Icon, 
  iconGradient = "from-[#48D1CC] to-[#2D3A5D]",
  className 
}: SectionTitleProps) => {
  return (
    <div className={cn("flex items-center gap-4 px-5 mb-6", className)}>
      <div className={cn(
        "w-12 h-12 rounded-2xl bg-gradient-to-br flex items-center justify-center text-white shadow-lg shadow-teal-500/10",
        iconGradient
      )}>
        <Icon size={24} />
      </div>
      <div className="flex flex-col">
        <h1 className="text-[#1A1C1E] text-xl font-bold leading-tight">{title}</h1>
        <p className="text-[#8E949A] text-xs font-medium leading-tight">{subtitle}</p>
      </div>
    </div>
  );
};

export default SectionTitle;
