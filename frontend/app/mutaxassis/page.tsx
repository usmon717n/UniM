"use client";

import React, { useState } from 'react';
import { UserCog } from 'lucide-react';
import SubPageHeader from '@/components/SubPageHeader';
import SectionTitle from '@/components/SectionTitle';
import CategoryTabs from '@/components/CategoryTabs';
import SpecialistCard from '@/components/SpecialistCard';
import BottomNav from '@/components/BottomNav';

const categories = [
  "Barchasi",
  "Tibbiyot",
  "Psixologiya",
  "Huquq",
  "Moliya",
  "Ta'lim",
  "Sport",
  "Frilans"
];

const specialists = [
  {
    name: "TopDoc",
    description: "Shifokorlar — terapevt, kardiolog, LOR",
    rating: 4.9,
    category: "Tibbiyot",
    icon: "👨‍⚕️",
    gradient: "bg-gradient-to-br from-emerald-100 to-teal-100"
  },
  {
    name: "SmileDoc",
    description: "Stomatologlar — implant, breket, tozalash",
    rating: 4.8,
    category: "Tibbiyot",
    icon: "🦷",
    gradient: "bg-gradient-to-br from-blue-100 to-teal-100"
  },
  {
    name: "MindCare",
    description: "Psixologlar va terapevtlar — onlayn",
    rating: 4.8,
    category: "Psixologiya",
    icon: "🧠",
    gradient: "bg-gradient-to-br from-slate-200 to-purple-100"
  },
  {
    name: "LegalPro",
    description: "Advokatlar va yuridik maslahat",
    rating: 4.6,
    category: "Huquq",
    icon: "⚖️",
    gradient: "bg-gradient-to-br from-emerald-100 to-emerald-200"
  },
  {
    name: "FinExpert",
    description: "Buxgalterlar va moliyaviy maslahat",
    rating: 4.5,
    category: "Moliya",
    icon: "📊",
    gradient: "bg-gradient-to-br from-orange-100 to-yellow-100"
  },
  {
    name: "EduMentor",
    description: "Repetitorlar — matematika, ingliz tili",
    rating: 4.7,
    category: "Ta'lim",
    icon: "👨‍🏫",
    gradient: "bg-gradient-to-br from-blue-100 to-purple-100"
  },
  {
    name: "FitCoach",
    description: "Shaxsiy trenerlar va dietologlar",
    rating: 4.8,
    category: "Sport",
    icon: "🏃",
    gradient: "bg-gradient-to-br from-orange-100 to-yellow-100"
  },
  {
    name: "ProWork",
    description: "Dizaynerlar, dasturchilar, SMM",
    rating: 4.6,
    category: "Frilans",
    icon: "💻",
    gradient: "bg-gradient-to-br from-purple-100 to-pink-100"
  },
  {
    name: "NotaryUz",
    description: "Notarius xizmatlari — tezkor",
    rating: 4.7,
    category: "Huquq",
    icon: "📋",
    gradient: "bg-gradient-to-br from-blue-100 to-slate-200"
  }
];

export default function MutaxassisPage() {
  const [activeCategory, setActiveCategory] = useState("Barchasi");

  const filteredSpecialists = activeCategory === "Barchasi"
    ? specialists
    : specialists.filter(s => s.category === activeCategory);

  return (
    <main className="min-h-screen bg-[#F4F6F9] pb-24">
      <div className="max-w-[1100px] mx-auto bg-[#F4F6F9] relative min-h-screen">
        {/* Header */}
        <SubPageHeader />

        {/* Page Title */}
        <SectionTitle 
          title="Mutaxassis"
          subtitle="Professionallar — shifokor, yurist, maslahatchi"
          icon={UserCog}
          iconGradient="from-[#1DD1A1] to-[#10AC84]"
        />

        {/* Categories */}
        <CategoryTabs 
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Specialist List */}
        <div className="px-5 grid grid-cols-1 md:grid-cols-2 gap-x-4">
          {filteredSpecialists.map((specialist, idx) => (
            <SpecialistCard 
              key={idx}
              {...specialist}
            />
          ))}
        </div>

        {/* Bottom Navigation */}
        <BottomNav />
      </div>
    </main>
  );
}
