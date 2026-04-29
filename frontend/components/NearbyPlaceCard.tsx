import React from 'react';
import { MapPin } from 'lucide-react';

interface NearbyPlaceCardProps {
  title: string;
  subtitle: string;
  distance: string;
  emoji: string;
}

const NearbyPlaceCard = ({
  title,
  subtitle,
  distance,
  emoji
}: NearbyPlaceCardProps) => {
  return (
    <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-50 flex items-center justify-between mb-3">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-2xl shadow-inner">
          {emoji}
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
