'use client';

import React, { useState } from 'react';
import {
  ShoppingBag,
  Pill,
  ShoppingCart,
  Smartphone,
  Dumbbell,
  Sparkles,
  BookOpen,
  Shirt,
  Search,
  Filter,
  Package,
  HeartPulse,
  Utensils,
  Laptop
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SubPageHeader from '@/components/SubPageHeader';
import SectionTitle from '@/components/SectionTitle';
import CategoryTabs from '@/components/CategoryTabs';
import ProductCard from '@/components/ProductCard';
import BottomNav from '@/components/BottomNav';
import { cn } from '@/lib/utils';
import { useT } from '@/lib/hooks/useT';

const CATEGORY_KEYS = [
  { key: "Barchasi",   icon: ShoppingBag },
  { key: "Dorixona",   icon: Pill },
  { key: "Oziq-ovqat", icon: Utensils },
  { key: "Elektronika",icon: Laptop },
  { key: "Salomatlik", icon: HeartPulse },
  { key: "Go'zallik",  icon: Sparkles },
  { key: "Kitoblar",   icon: BookOpen },
  { key: "Kiyim",      icon: Shirt },
];

const PRODUCTS_STATIC = [
  { key: 'doriDunyo',      name: "DoriDunyo",      catKey: "Dorixona",   icon: Pill,          gradient: "bg-emerald-50", colorClass: "text-emerald-600", rating: 4.9 },
  { key: 'grandPharm',     name: "GrandPharm",     catKey: "Dorixona",   icon: Package,       gradient: "bg-blue-50",    colorClass: "text-blue-600",    rating: 4.8 },
  { key: 'freshMarket',    name: "FreshMarket",    catKey: "Oziq-ovqat", icon: Utensils,      gradient: "bg-emerald-50", colorClass: "text-emerald-600", rating: 4.8 },
  { key: 'korzinkaGo',     name: "KorzinkaGo",     catKey: "Oziq-ovqat", icon: ShoppingCart,  gradient: "bg-orange-50",  colorClass: "text-orange-600",  rating: 4.7 },
  { key: 'techUz',         name: "TechUz",         catKey: "Elektronika",icon: Smartphone,    gradient: "bg-indigo-50",  colorClass: "text-indigo-600",  rating: 4.7 },
  { key: 'sportNutrition', name: "SportNutrition", catKey: "Salomatlik", icon: Dumbbell,      gradient: "bg-rose-50",    colorClass: "text-rose-600",    rating: 4.6 },
  { key: 'beautyShop',     name: "BeautyShop",     catKey: "Go'zallik",  icon: Sparkles,      gradient: "bg-purple-50",  colorClass: "text-purple-600",  rating: 4.5 },
  { key: 'kitobPlus',      name: "KitobPlus",      catKey: "Kitoblar",   icon: BookOpen,      gradient: "bg-blue-50",    colorClass: "text-blue-600",    rating: 4.8 },
  { key: 'styleUz',        name: "StyleUz",        catKey: "Kiyim",      icon: Shirt,         gradient: "bg-pink-50",    colorClass: "text-pink-600",    rating: 4.6 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function MahsulotPage() {
  const tr = useT();
  const [activeCategory, setActiveCategory] = useState("Barchasi");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = CATEGORY_KEYS.map(({ key, icon }) => ({
    key,
    name: (tr.pages.mahsulot.cats as Record<string, string>)[key] ?? key,
    icon,
  }));

  const products = PRODUCTS_STATIC.map(p => ({
    ...p,
    category: (tr.pages.mahsulot.cats as Record<string, string>)[p.catKey] ?? p.catKey,
    description: (tr.pages.mahsulot.products as Record<string, string>)[p.key] ?? '',
  }));

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === "Barchasi" || p.catKey === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-32">
      <div className="max-w-[1200px] mx-auto relative min-h-screen">
        {/* Sticky Header */}
        <div className="sticky top-0 z-50 bg-[#F8FAFC]/80 backdrop-blur-xl border-b border-gray-100/50">
          <SubPageHeader />
        </div>

        <div className="pt-8">
          {/* Page Title */}
          <SectionTitle
            title={tr.pages.mahsulot.title}
            subtitle={tr.pages.mahsulot.subtitle}
            icon={ShoppingBag}
            iconGradient="from-teal-500 to-blue-600"
          />

          {/* Search Bar */}
          <div className="px-5 mb-8">
            <div className="relative group">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400 group-focus-within:text-teal-500 transition-colors" />
              </div>
              <input
                type="text"
                placeholder={tr.pages.mahsulot.searchPh}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 pl-14 pr-5 bg-white rounded-[24px] border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] text-sm font-bold placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/10 focus:border-teal-500 transition-all"
              />
              <div className="absolute inset-y-0 right-5 flex items-center">
                <div className="p-2 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                  <Filter size={16} className="text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Categories */}
          <CategoryTabs
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          {/* Product Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="px-5 grid grid-cols-1 md:grid-cols-2 gap-x-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.name}
                  name={product.name}
                  description={product.description}
                  rating={product.rating}
                  category={product.category}
                  icon={product.icon}
                  gradient={product.gradient}
                  colorClass={product.colorClass}
                />
              ))}
            </AnimatePresence>

            {filteredProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-20 flex flex-col items-center justify-center text-center"
              >
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-300">
                  <ShoppingBag size={40} />
                </div>
                <h3 className="text-[#1A1C1E] text-lg font-black">{tr.pages.mahsulot.notFound}</h3>
                <p className="text-gray-400 text-sm mt-1">{tr.pages.mahsulot.notFoundSub}</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
