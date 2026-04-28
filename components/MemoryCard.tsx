import React from 'react';
import { FileText, Image as ImageIcon, Folder, Upload } from 'lucide-react';

const MemoryCard = () => {
  const stats = [
    { label: 'Hujjatlar', value: 12, icon: FileText, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Rasmlar', value: 34, icon: ImageIcon, color: 'text-rose-500', bg: 'bg-rose-50' },
    { label: 'Tahlillar', value: 8, icon: Folder, color: 'text-emerald-500', bg: 'bg-emerald-50' }
  ];

  return (
    <div className="px-5 mb-8">
      <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-50">
        <h2 className="text-[#1A1C1E] text-base font-bold mb-6">Shaxsiy xotira</h2>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-3 shadow-sm`}>
                <stat.icon size={20} />
              </div>
              <span className="text-[#1A1C1E] text-lg font-black leading-none mb-1">{stat.value}</span>
              <span className="text-[#8E949A] text-[10px] font-medium uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>

        <button className="w-full bg-[#EDF1F5] hover:bg-gray-200 text-[#1A1C1E] py-4 rounded-2xl flex items-center justify-center gap-2 text-[13px] font-bold transition-colors active:scale-[0.98]">
          <Upload size={18} />
          Fayl yuklash
        </button>
      </div>
    </div>
  );
};

export default MemoryCard;
