import React from 'react';
import { Bot, Dumbbell, Heart, Hospital, Pill, Stethoscope } from 'lucide-react';
import SubPageHeader from '@/components/SubPageHeader';
import SearchBox from '@/components/SearchBox';
import ChatCard from '@/components/ChatCard';
import BottomNav from '@/components/BottomNav';

export default function SuhbatlarPage() {
  return (
    <main className="min-h-screen bg-[#F4F6F9] pb-32">
      <div className="max-w-[1100px] mx-auto bg-[#F4F6F9] relative min-h-screen">
        {/* Header */}
        <SubPageHeader />

        {/* Page Title */}
        <div className="px-5 mb-6">
          <h1 className="text-[#1A1C1E] text-2xl font-black tracking-tight">Munosabat</h1>
        </div>

        {/* Search */}
        <SearchBox />

        {/* QADOQLANGAN SECTION */}
        <div className="px-5 mb-8">
          <h2 className="text-[#8E949A] text-[10px] font-black tracking-[0.1em] uppercase mb-4 px-1">
            QADOQLANGAN
          </h2>
          <ChatCard 
            title="Avimed AI"
            message="Salom! Qanday yordam bera olaman?"
            time="Hozir"
            unreadCount={1}
            isPinned={true}
            isPremium={true}
            bgColor="bg-amber-50/50"
            borderColor="border-amber-100"
            icon={<Bot size={28} className="text-white" />}
            iconBg="bg-gradient-to-br from-[#2D3A5D] to-[#0E8388]"
          />
          <ChatCard 
            title="Oila"
            message="Buving bosimi 130/85 — nazorat ostida"
            time="10:15"
            unreadCount={3}
            isPinned={true}
            bgColor="bg-rose-50/50"
            borderColor="border-rose-100"
            icon={<Heart size={28} className="text-rose-500 fill-rose-500" />}
            iconBg="bg-rose-100"
          />
        </div>

        {/* SHIFOKORLAR SECTION */}
        <div className="px-5 mb-8">
          <h2 className="text-[#8E949A] text-[10px] font-black tracking-[0.1em] uppercase mb-4 px-1">
            SHIFOKORLAR
          </h2>
          <ChatCard 
            title="Dr. Akmalov Rustam"
            message="Analiz natijalaringiz tayyor."
            time="14:32"
            unreadCount={2}
            icon={<Stethoscope size={26} strokeWidth={2.2} className="text-sky-600" />}
            iconBg="bg-sky-50"
          />
          <ChatCard 
            title="Dr. Karimova Nodira"
            message="Keyingi qabul 25-fevralda."
            time="Kecha"
            icon={<Stethoscope size={26} strokeWidth={2.2} className="text-teal-600" />}
            iconBg="bg-teal-50"
          />
        </div>

        {/* KLINIKALAR SECTION */}
        <div className="px-5 mb-8">
          <h2 className="text-[#8E949A] text-[10px] font-black tracking-[0.1em] uppercase mb-4 px-1">
            KLINIKALAR
          </h2>
          <ChatCard 
            title="City Med Center"
            message="Qabulga yozildingiz: 20-fevral, 10:00"
            time="18-fev"
            icon={<Hospital size={26} strokeWidth={2.2} className="text-rose-600" />}
            iconBg="bg-rose-50"
          />
        </div>

        {/* SPORT ZALLAR SECTION */}
        <div className="px-5 mb-8">
          <h2 className="text-[#8E949A] text-[10px] font-black tracking-[0.1em] uppercase mb-4 px-1">
            SPORT ZALLAR
          </h2>
          <ChatCard 
            title="FitCity Trainer"
            message="Ertangi mashg'ulot soat 7:00 da"
            time="Kecha"
            icon={<Dumbbell size={26} strokeWidth={2.2} className="text-orange-600" />}
            iconBg="bg-orange-50"
          />
        </div>

        {/* DO'RIXONALAR SECTION */}
        <div className="px-5 mb-8">
          <h2 className="text-[#8E949A] text-[10px] font-black tracking-[0.1em] uppercase mb-4 px-1">
            DO&apos;RIXONALAR
          </h2>
          <ChatCard 
            title="UniPharm Do'xona"
            message="Buyurtmangiz tayyor. Olib ketishingiz mumkin."
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
