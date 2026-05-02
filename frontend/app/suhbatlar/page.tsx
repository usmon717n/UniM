'use client';

import React from 'react';
import { Bot, Dumbbell, Heart, Hospital, Pill, Stethoscope } from 'lucide-react';
import SubPageHeader from '@/components/SubPageHeader';
import SearchBox from '@/components/SearchBox';
import ChatCard from '@/components/ChatCard';
import BottomNav from '@/components/BottomNav';
import { useT } from '@/lib/hooks/useT';

export default function SuhbatlarPage() {
  const tr = useT();
  const s = tr.pages.suhbatlar;

  return (
    <main className="min-h-screen bg-[#F4F6F9] pb-32">
      <div className="max-w-[1100px] mx-auto bg-[#F4F6F9] relative min-h-screen">
        {/* Header */}
        <SubPageHeader />

        {/* Page Title */}
        <div className="px-5 mb-6">
          <h1 className="text-[#1A1C1E] text-2xl font-black tracking-tight">{s.title}</h1>
        </div>

        {/* Search */}
        <SearchBox />

        {/* PINNED SECTION */}
        <div className="px-5 mb-8">
          <h2 className="text-[#8E949A] text-[10px] font-black tracking-[0.1em] uppercase mb-4 px-1">
            {s.pinned}
          </h2>
          <ChatCard
            title="Avimed AI"
            message={s.aiGreeting}
            time={s.now}
            unreadCount={1}
            isPinned={true}
            isPremium={true}
            bgColor="bg-amber-50/50"
            borderColor="border-amber-100"
            icon={<Bot size={28} className="text-white" />}
            iconBg="bg-gradient-to-br from-[#2D3A5D] to-[#0E8388]"
          />
          <ChatCard
            title={s.familyTitle}
            message={s.familyMsg}
            time="10:15"
            unreadCount={3}
            isPinned={true}
            bgColor="bg-rose-50/50"
            borderColor="border-rose-100"
            icon={<Heart size={28} className="text-rose-500 fill-rose-500" />}
            iconBg="bg-rose-100"
          />
        </div>

        {/* DOCTORS SECTION */}
        <div className="px-5 mb-8">
          <h2 className="text-[#8E949A] text-[10px] font-black tracking-[0.1em] uppercase mb-4 px-1">
            {s.doctors}
          </h2>
          <ChatCard
            title="Dr. Akmalov Rustam"
            message={s.drAkmalovMsg}
            time="14:32"
            unreadCount={2}
            icon={<Stethoscope size={26} strokeWidth={2.2} className="text-sky-600" />}
            iconBg="bg-sky-50"
          />
          <ChatCard
            title="Dr. Karimova Nodira"
            message={s.drKarimovaMsg}
            time={s.yesterday}
            icon={<Stethoscope size={26} strokeWidth={2.2} className="text-teal-600" />}
            iconBg="bg-teal-50"
          />
        </div>

        {/* CLINICS SECTION */}
        <div className="px-5 mb-8">
          <h2 className="text-[#8E949A] text-[10px] font-black tracking-[0.1em] uppercase mb-4 px-1">
            {s.clinics}
          </h2>
          <ChatCard
            title="City Med Center"
            message={s.clinicMsg}
            time="18-fev"
            icon={<Hospital size={26} strokeWidth={2.2} className="text-rose-600" />}
            iconBg="bg-rose-50"
          />
        </div>

        {/* GYMS SECTION */}
        <div className="px-5 mb-8">
          <h2 className="text-[#8E949A] text-[10px] font-black tracking-[0.1em] uppercase mb-4 px-1">
            {s.gyms}
          </h2>
          <ChatCard
            title="FitCity Trainer"
            message={s.fitMsg}
            time={s.yesterday}
            icon={<Dumbbell size={26} strokeWidth={2.2} className="text-orange-600" />}
            iconBg="bg-orange-50"
          />
        </div>

        {/* PHARMACIES SECTION */}
        <div className="px-5 mb-8">
          <h2 className="text-[#8E949A] text-[10px] font-black tracking-[0.1em] uppercase mb-4 px-1">
            {s.pharmacies}
          </h2>
          <ChatCard
            title="UniPharm"
            message={s.pharmMsg}
            time="17-fev"
            icon={<Pill size={26} strokeWidth={2.2} className="text-emerald-600" />}
            iconBg="bg-emerald-50"
          />
        </div>

        {/* Bottom Navigation */}
        <BottomNav />
      </div>
    </main>
  );
}
