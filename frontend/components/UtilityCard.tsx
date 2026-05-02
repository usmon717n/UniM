'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useT } from '@/lib/hooks/useT';

interface UtilityCardProps {
  title: string;
  subtitle: string;
  status: 'paid' | 'debt';
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  showPayButton?: boolean;
}

const UtilityCard = ({
  title,
  subtitle,
  status,
  icon: Icon,
  iconBg,
  iconColor,
  showPayButton
}: UtilityCardProps) => {
  const tr = useT();

  return (
    <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-50 flex items-center justify-between mb-3">
      <div className="flex items-center gap-4">
        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", iconBg, iconColor)}>
          <Icon size={24} />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[#1A1C1E] text-[15px] font-bold">{title}</span>
            <span className={cn(
              "text-[9px] font-bold px-2 py-0.5 rounded-full",
              status === 'paid' ? "bg-emerald-50 text-emerald-500" : "bg-red-50 text-red-500"
            )}>
              {status === 'paid' ? tr.common.paid : tr.common.debt}
            </span>
          </div>
          <span className="text-[#8E949A] text-[11px] font-medium">{subtitle}</span>
        </div>
      </div>

      {showPayButton && (
        <button className="bg-gradient-to-r from-[#2D3A5D] to-[#0E8388] text-white text-[11px] font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-teal-500/10 active:scale-95 transition-transform">
          {tr.common.pay}
        </button>
      )}
    </div>
  );
};

export default UtilityCard;
