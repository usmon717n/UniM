import React from 'react';
import { MapPin, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NearbyPlaceCardProps {
  title: string;
  subtitle: string;
  distance: string;
  icon: LucideIcon;
  iconBg?: string;
  iconColor?: string;
}

const NearbyPlaceCard = ({
  title,
  subtitle,
  distance,
  icon: Icon,
  iconBg = 'bg-gray-50',
  iconColor = 'text-gray-500'
}: NearbyPlaceCardProps) => {
  return (
    <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-50 flex items-center justify-between mb-3">
      <div className="flex items-center gap-4">
        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner", iconBg)}>
          <Icon size={24} strokeWidth={2.2} className={iconColor} />
        </div>
        <div className="flex flex-col">
          <span className="text-[#1A1C1E] text-[15px] font-bold">{title}</span>
          <span className="text-[#8E949A] text-[11px] font-medium">{subtitle}</span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-xl">
        <MapPin size={12} className="text-gray-400" />
        <span className="text-[#8E949A] text-[10px] font-bold tracking-tighter">{distance} km</span>
      </div>
    </div>
  );
};

export default NearbyPlaceCard;
