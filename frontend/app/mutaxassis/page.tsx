"use client";

import React, { useState } from 'react';
import {
  UserCog,
  Stethoscope,
  Activity,
  Brain,
  Gavel,
  BarChart3,
  GraduationCap,
  Dumbbell,
  Laptop,
  FileCheck
} from 'lucide-react';
import SubPageHeader from '@/components/SubPageHeader';
import SectionTitle from '@/components/SectionTitle';
import CategoryTabs from '@/components/CategoryTabs';
import SpecialistCard from '@/components/SpecialistCard';
import BottomNav from '@/components/BottomNav';
import { useT } from '@/lib/hooks/useT';

const CATEGORY_KEYS = ["Barchasi", "Tibbiyot", "Psixologiya", "Huquq", "Moliya", "Ta'lim", "Sport", "Frilans"];

const SPECIALISTS_STATIC = [
  { key: 'topDoc',    name: "TopDoc",    catKey: "Tibbiyot",    icon: Stethoscope,   gradient: "bg-emerald-50", colorClass: "text-emerald-600", rating: 4.9 },
  { key: 'smileDoc',  name: "SmileDoc",  catKey: "Tibbiyot",    icon: Activity,      gradient: "bg-blue-50",    colorClass: "text-blue-600",    rating: 4.8 },
  { key: 'mindCare',  name: "MindCare",  catKey: "Psixologiya", icon: Brain,         gradient: "bg-indigo-50",  colorClass: "text-indigo-600",  rating: 4.8 },
  { key: 'legalPro',  name: "LegalPro",  catKey: "Huquq",       icon: Gavel,         gradient: "bg-slate-50",   colorClass: "text-slate-600",   rating: 4.6 },
  { key: 'finExpert', name: "FinExpert", catKey: "Moliya",      icon: BarChart3,     gradient: "bg-orange-50",  colorClass: "text-orange-600",  rating: 4.5 },
  { key: 'eduMentor', name: "EduMentor", catKey: "Ta'lim",      icon: GraduationCap, gradient: "bg-blue-50",    colorClass: "text-blue-600",    rating: 4.7 },
  { key: 'fitCoach',  name: "FitCoach",  catKey: "Sport",       icon: Dumbbell,      gradient: "bg-rose-50",    colorClass: "text-rose-600",    rating: 4.8 },
  { key: 'proWork',   name: "ProWork",   catKey: "Frilans",     icon: Laptop,        gradient: "bg-purple-50",  colorClass: "text-purple-600",  rating: 4.6 },
  { key: 'notaryUz',  name: "NotaryUz",  catKey: "Huquq",       icon: FileCheck,     gradient: "bg-teal-50",    colorClass: "text-teal-600",    rating: 4.7 },
];

export default function MutaxassisPage() {
  const tr = useT();
  const [activeCategory, setActiveCategory] = useState("Barchasi");

  const categories = CATEGORY_KEYS.map(key => ({
    key,
    name: (tr.pages.mutaxassis.cats as Record<string, string>)[key] ?? key,
  }));

  const specialists = SPECIALISTS_STATIC.map(s => ({
    ...s,
    category: (tr.pages.mutaxassis.cats as Record<string, string>)[s.catKey] ?? s.catKey,
    description: (tr.pages.mutaxassis.specialists as Record<string, string>)[s.key] ?? '',
  }));

  const filteredSpecialists = activeCategory === "Barchasi"
    ? specialists
    : specialists.filter(s => s.catKey === activeCategory);

  return (
    <main className="min-h-screen bg-[#F4F6F9] pb-24">
      <div className="max-w-[1100px] mx-auto bg-[#F4F6F9] relative min-h-screen">
        {/* Header */}
        <SubPageHeader />

        {/* Page Title */}
        <SectionTitle
          title={tr.pages.mutaxassis.title}
          subtitle={tr.pages.mutaxassis.subtitle}
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
        <div className="px-5 grid grid-cols-1 md:grid-cols-2 gap-x-4 pb-28">
          {filteredSpecialists.map((specialist, idx) => (
            <SpecialistCard
              key={idx}
              name={specialist.name}
              description={specialist.description}
              rating={specialist.rating}
              category={specialist.category}
              icon={specialist.icon}
              gradient={specialist.gradient}
              colorClass={specialist.colorClass}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
