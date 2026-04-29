import React from 'react';
import { QrCode } from 'lucide-react';

const UnimPassCard = () => {
  return (
    <div className="px-5 mb-4">
      <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-50 flex flex-col items-center">
        <div className="w-full flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 text-[#1A1C1E]">
            <QrCode size={20} className="text-[#2D3A5D]" />
            <span className="text-sm font-bold">UniM Pass</span>
          </div>
          <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-bold">
            Raqamli ID
          </span>
        </div>

        <div className="w-40 h-40 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2.5rem] flex items-center justify-center mb-6">
          <QrCode size={80} className="text-slate-300 stroke-[1.5]" />
        </div>

        <p className="text-[#8E949A] text-[11px] font-medium text-center leading-relaxed max-w-[200px]">
          Tez tibbiy yordam uchun QR kodni ko&apos;rsating
        </p>
      </div>
    </div>
  );
};

export default UnimPassCard;
