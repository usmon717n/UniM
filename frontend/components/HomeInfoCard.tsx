import React from 'react';
import { Home, Info, Phone } from 'lucide-react';

const HomeInfoCard = () => {
  return (
    <div className="px-5 mb-8">
      <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-50">
        <div className="flex items-center gap-2 mb-4 text-[#1A1C1E]">
          <Home size={20} className="text-[#2D3A5D]" />
          <h2 className="text-sm font-bold">Mening uyim</h2>
        </div>

        <div className="bg-[#F0F4F8] rounded-2xl p-4 mb-4">
          <p className="text-[#1A1C1E] text-sm font-bold mb-1">
            Toshkent sh., Yunusobod t., 4-mavze
          </p>
          <p className="text-[#8E949A] text-[11px] font-medium">
            5-qavatli bino • 32-xonadon • 78 m²
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button className="bg-[#E7F6F2] text-[#0E8388] rounded-full py-2.5 px-4 flex items-center justify-center gap-2 text-[11px] font-bold hover:bg-[#D1EBE5] transition-colors">
            <Info size={16} />
            Bino haqida
          </button>
          <button className="bg-[#E7F6F2] text-[#0E8388] rounded-full py-2.5 px-4 flex items-center justify-center gap-2 text-[11px] font-bold hover:bg-[#D1EBE5] transition-colors">
            <Phone size={16} />
            Boshqaruvchi
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeInfoCard;
