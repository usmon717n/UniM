"use client";

import React, { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import SubPageHeader from '@/components/SubPageHeader';
import SectionTitle from '@/components/SectionTitle';
import CategoryTabs from '@/components/CategoryTabs';
import ProductCard from '@/components/ProductCard';
import BottomNav from '@/components/BottomNav';

const categories = [
  "Barchasi",
  "Dorixona",
  "Oziq-ovqat",
  "Elektronika",
  "Salomatlik",
  "Go'zallik",
  "Kitoblar",
  "Kiyim"
];

const products = [
  {
    name: "DoriDunyo",
    description: "Dori-darmonlar onlayn — 0% komissiya",
    rating: 4.9,
    category: "Dorixona",
    icon: "💊",
    gradient: "bg-gradient-to-br from-emerald-100 to-teal-100"
  },
  {
    name: "GrandPharm",
    description: "Dorixona tarmog'i — keng assortiment",
    rating: 4.8,
    category: "Dorixona",
    icon: "🏥",
    gradient: "bg-gradient-to-br from-emerald-100 to-teal-100"
  },
  {
    name: "FreshMarket",
    description: "Oziq-ovqat va go'shtlar yetkazish",
    rating: 4.8,
    category: "Oziq-ovqat",
    icon: "🥗",
    gradient: "bg-gradient-to-br from-emerald-100 to-emerald-200"
  },
  {
    name: "KorzinkaGo",
    description: "Supermarket — uyga yetkazish",
    rating: 4.7,
    category: "Oziq-ovqat",
    icon: "🛒",
    gradient: "bg-gradient-to-br from-orange-100 to-yellow-100"
  },
  {
    name: "TechUz",
    description: "Elektronika va gadgetlar — arzon narx",
    rating: 4.7,
    category: "Elektronika",
    icon: "📱",
    gradient: "bg-gradient-to-br from-blue-100 to-slate-200"
  },
  {
    name: "SportNutrition",
    description: "Sport ozuqlanish va vitaminlar",
    rating: 4.6,
    category: "Salomatlik",
    icon: "💪",
    gradient: "bg-gradient-to-br from-orange-100 to-yellow-100"
  },
  {
    name: "BeautyShop",
    description: "Kosmetika va parhez mahsulotlari",
    rating: 4.5,
    category: "Go'zallik",
    icon: "🧴",
    gradient: "bg-gradient-to-br from-purple-100 to-pink-100"
  },
  {
    name: "KitobPlus",
    description: "Kitoblar va o'quv materiallari",
    rating: 4.8,
    category: "Kitoblar",
    icon: "📚",
    gradient: "bg-gradient-to-br from-blue-100 to-slate-200"
  },
  {
    name: "StyleUz",
    description: "Kiyim-kechak va aksessuarlar",
    rating: 4.6,
    category: "Kiyim",
    icon: "👗",
    gradient: "bg-gradient-to-br from-purple-100 to-pink-100"
  }
];

export default function MahsulotPage() {
  const [activeCategory, setActiveCategory] = useState("Barchasi");

  const filteredProducts = activeCategory === "Barchasi"
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <main className="min-h-screen bg-[#F4F6F9] pb-24">
      <div className="max-w-[1100px] mx-auto bg-[#F4F6F9] relative min-h-screen">
        {/* Header */}
        <SubPageHeader />

        {/* Page Title */}
        <SectionTitle 
          title="Mahsulot"
          subtitle="Tovarlar — 0% komissiya bilan"
          icon={ShoppingBag}
          iconGradient="from-[#FF9F43] to-[#FF6B6B]"
        />

        {/* Categories */}
        <CategoryTabs 
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Product List */}
        <div className="px-5 grid grid-cols-1 md:grid-cols-2 gap-x-4">
          {filteredProducts.map((product, idx) => (
            <ProductCard 
              key={idx}
              {...product}
            />
          ))}
        </div>

        {/* Bottom Navigation */}
        <BottomNav />
      </div>
    </main>
  );
}
