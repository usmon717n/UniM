import React from 'react';
import { ChevronRight, Pill, Droplets, Dumbbell, Circle } from 'lucide-react';

const plans = [
  {
    id: 1,
    title: 'Omega-3',
    time: '12:00',
    icon: Pill,
    bgColor: 'bg-emerald-50',
    iconColor: 'text-emerald-500',
  },
  {
    id: 2,
    title: 'Suv ichish',
    time: '14:00',
    icon: Droplets,
    bgColor: 'bg-teal-50',
    iconColor: 'text-teal-500',
  },
  {
    id: 3,
    title: 'Mashg\'ulot',
    time: '18:00',
    icon: Dumbbell,
    bgColor: 'bg-emerald-50',
    iconColor: 'text-emerald-500',
  },
];

const PlanSection = () => {
  return (
    <div className="mb-8">
      <div className="px-5 flex items-center justify-between mb-4">
        <h2 className="text-[#1A1C1E] text-xs font-black tracking-widest uppercase">
          MENING REJAM
        </h2>
        <ChevronRight size={18} className="text-[#8E949A]" />
      </div>

      <div className="flex overflow-x-auto gap-4 px-5 pb-2 no-scrollbar">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="flex-shrink-0 w-[160px] bg-white rounded-3xl p-4 shadow-sm border border-gray-50 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl ${plan.bgColor} flex items-center justify-center ${plan.iconColor}`}>
                <plan.icon size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-[#1A1C1E] text-[13px] font-bold leading-none mb-1">
                  {plan.title}
                </span>
                <span className="text-[#8E949A] text-[11px] font-medium">
                  {plan.time}
                </span>
              </div>
            </div>
            <Circle size={20} className="text-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanSection;
