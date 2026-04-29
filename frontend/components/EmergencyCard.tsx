import React from 'react';
import { BellRing, Phone } from 'lucide-react';

const EmergencyCard = () => {
  return (
    <div className="px-5 mb-24">
      <div className="bg-gradient-to-br from-red-50/50 to-white rounded-[32px] p-6 border border-red-100 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-500">
            <BellRing size={20} />
          </div>
          <h2 className="text-[#1A1C1E] text-base font-black">Favqulodda raqamlar</h2>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {[
            { num: '101', text: 'Yong\'in xavfsizligi' },
            { num: '102', text: 'Militsiya' },
            { num: '103', text: 'Tez tibbiy yordam' }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between bg-white/60 p-3 rounded-2xl border border-red-50">
              <div className="flex items-center gap-3">
                <span className="text-red-500 font-black text-lg w-8">{item.num}</span>
                <span className="text-[#1A1C1E] text-sm font-bold">{item.text}</span>
              </div>
              <button className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-500 hover:bg-red-100 transition-colors">
                <Phone size={16} fill="currentColor" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmergencyCard;
