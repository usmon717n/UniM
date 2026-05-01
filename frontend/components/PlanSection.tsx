'use client';

import React, { useState } from 'react';
import { ChevronRight, Pill, Droplets, Dumbbell, Check, ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const initialPlans = [
  {
    id: 1,
    title: 'Omega-3',
    time: '12:00',
    icon: Pill,
    gradient: 'from-emerald-400 to-teal-500',
    glow: 'bg-emerald-400/20',
    completed: false,
  },
  {
    id: 2,
    title: 'Suv ichish',
    time: '14:00',
    icon: Droplets,
    gradient: 'from-blue-400 to-indigo-500',
    glow: 'bg-blue-400/20',
    completed: true,
  },
  {
    id: 3,
    title: 'Mashg\'ulot',
    time: '18:00',
    icon: Dumbbell,
    gradient: 'from-purple-400 to-pink-500',
    glow: 'bg-purple-400/20',
    completed: false,
  },
  {
    id: 4,
    title: 'Vitamin D',
    time: '09:00',
    icon: Pill,
    gradient: 'from-amber-400 to-orange-500',
    glow: 'bg-amber-400/20',
    completed: false,
  },
];

const PlanSection = () => {
  const [plans, setPlans] = useState(initialPlans);

  const toggleComplete = (id: number) => {
    setPlans(plans.map(p => p.id === id ? { ...p, completed: !p.completed } : p));
  };

  const completedCount = plans.filter(p => p.completed).length;
  const progressPercent = (completedCount / plans.length) * 100;

  return (
    <div className="mb-10">
      {/* Section Header */}
      <div className="px-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-[#1A1C1E] text-lg font-black tracking-tight">
                Mening Rejam
              </h2>
              <div className="flex items-center gap-1 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-100">
                <Sparkles size={10} className="text-teal-600" />
                <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider">Bugun</span>
              </div>
            </div>
            <p className="text-[#8E949A] text-[12px] font-medium">Kundalik vazifalar va habit-treker</p>
          </div>
          <button className="flex items-center gap-1 text-teal-600 hover:text-teal-700 transition-colors group">
            <span className="text-[13px] font-bold">Barchasi</span>
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Progress Bar Container */}
        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-white shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[12px] font-bold text-gray-500">Bugungi progress</span>
            <span className="text-[12px] font-black text-teal-600">{Math.round(progressPercent)}%</span>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 transition-all duration-1000 ease-out rounded-full shadow-[0_0_10px_rgba(20,184,166,0.3)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Horizontal Carousel */}
      <div className="flex overflow-x-auto gap-4 px-5 pb-6 no-scrollbar snap-x snap-mandatory">
        {plans.map((plan) => (
          <div
            key={plan.id}
            onClick={() => toggleComplete(plan.id)}
            className={cn(
              "flex-shrink-0 w-[200px] snap-start relative group cursor-pointer",
              "bg-white/80 backdrop-blur-xl rounded-[24px] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-white",
              "hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500",
              plan.completed && "opacity-75"
            )}
          >
            <div className="flex flex-col gap-5">
              {/* Top Row: Icon & Checkbox */}
              <div className="flex items-center justify-between">
                <div className="relative">
                  <div className={cn(
                    "absolute -inset-2 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                    plan.glow
                  )} />
                  <div className={cn(
                    "relative w-11 h-11 rounded-2xl flex items-center justify-center shadow-md bg-gradient-to-br transition-transform duration-500 group-hover:scale-110",
                    plan.gradient
                  )}>
                    <plan.icon size={22} className="text-white" />
                  </div>
                </div>

                {/* Custom Checkbox */}
                <div className={cn(
                  "w-7 h-7 rounded-full border-2 transition-all duration-300 flex items-center justify-center",
                  plan.completed 
                    ? "bg-emerald-500 border-emerald-500 shadow-lg shadow-emerald-500/20 scale-110" 
                    : "border-gray-200 group-hover:border-teal-400"
                )}>
                  {plan.completed && <Check size={16} className="text-white animate-in zoom-in duration-300" />}
                </div>
              </div>

              {/* Bottom Section: Text */}
              <div className="space-y-1.5">
                <h3 className={cn(
                  "text-[#1A1C1E] text-[15px] font-bold leading-tight transition-all duration-300",
                  plan.completed && "text-gray-400 line-through decoration-emerald-500 decoration-2"
                )}>
                  {plan.title}
                </h3>
                <div className="flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-teal-500" />
                  <span className="text-[#8E949A] text-[11px] font-bold uppercase tracking-wider">
                    Bugun {plan.time}
                  </span>
                </div>
              </div>
            </div>

            {/* Completion Ripple (Visible only on hover or click) */}
            <div className="absolute inset-0 rounded-[24px] bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </div>
        ))}

        {/* Add Task Placeholder */}
        <div className="flex-shrink-0 w-[120px] snap-start border-2 border-dashed border-gray-200 rounded-[24px] flex flex-col items-center justify-center gap-2 group cursor-pointer hover:border-teal-400 hover:bg-teal-50/30 transition-all duration-300">
          <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:text-teal-500 shadow-sm transition-all">
            <span className="text-xl font-light">+</span>
          </div>
          <span className="text-[11px] font-bold text-gray-400 group-hover:text-teal-600 uppercase tracking-widest">Yangi</span>
        </div>
      </div>
    </div>
  );
};

export default PlanSection;

