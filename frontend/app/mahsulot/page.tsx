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

const categories = [
  { name: "Barchasi", icon: ShoppingBag },
  { name: "Dorixona", icon: Pill },
  { name: "Oziq-ovqat", icon: Utensils },
  { name: "Elektronika", icon: Laptop },
  { name: "Salomatlik", icon: HeartPulse },
  { name: "Go'zallik", icon: Sparkles },
  { name: "Kitoblar", icon: BookOpen },
  { name: "Kiyim", icon: Shirt }
];

const products = [
  {
    name: "DoriDunyo",
    description: "Dori-darmonlar onlayn. 0% komissiya va uyingizga tezkor yetkazib berish xizmati.",
    rating: 4.9,
    category: "Dorixona",
    icon: Pill,
    gradient: "bg-emerald-50",
    colorClass: "text-emerald-600"
  },
  {
    name: "GrandPharm",
    description: "Dorixona tarmog'i. Keng turdagi assortiment va mutaxassis maslahati bepul.",
    rating: 4.8,
    category: "Dorixona",
    icon: Package,
    gradient: "bg-blue-50",
    colorClass: "text-blue-600"
  },
  {
    name: "FreshMarket",
    description: "Sarxil mevalar, sabzavotlar va go'sht mahsulotlarini uyingizga yetkazib beramiz.",
    rating: 4.8,
    category: "Oziq-ovqat",
    icon: Utensils,
    gradient: "bg-emerald-50",
    colorClass: "text-emerald-600"
  },
  {
    name: "KorzinkaGo",
    description: "Sevimli supermarketining rasmiy yetkazib berish xizmati. Sifat va tezlik.",
    rating: 4.7,
    category: "Oziq-ovqat",
    icon: ShoppingCart,
    gradient: "bg-orange-50",
    colorClass: "text-orange-600"
  },
  {
    name: "TechUz",
    description: "Eng so'nggi rusumdagi gadjetlar va maishiy texnika vositalari kafolati bilan.",
    rating: 4.7,
    category: "Elektronika",
    icon: Smartphone,
    gradient: "bg-indigo-50",
    colorClass: "text-indigo-600"
  },
  {
    name: "SportNutrition",
    description: "Sportchilar uchun sifatli vitaminlar va ozuqaviy qo'shimchalar toplami.",
    rating: 4.6,
    category: "Salomatlik",
    icon: Dumbbell,
    gradient: "bg-rose-50",
    colorClass: "text-rose-600"
  },
  {
    name: "BeautyShop",
    description: "Professional kosmetika va terini parvarish qilish uchun maxsus vositalar.",
    rating: 4.5,
    category: "Go'zallik",
    icon: Sparkles,
    gradient: "bg-purple-50",
    colorClass: "text-purple-600"
  },
  {
    name: "KitobPlus",
    description: "O'zbek va jahon adabiyoti durdonalari. Badiiy va ilmiy kitoblar olami.",
    rating: 4.8,
    category: "Kitoblar",
    icon: BookOpen,
    gradient: "bg-blue-50",
    colorClass: "text-blue-600"
  },
  {
    name: "StyleUz",
    description: "Zamonaviy kiyim-kechaklar va eksklyuziv aksessuarlar kolleksiyasi.",
    rating: 4.6,
    category: "Kiyim",
    icon: Shirt,
    gradient: "bg-pink-50",
    colorClass: "text-pink-600"
  }
];

export default function MahsulotPage() {
  const [activeCategory, setActiveCategory] = useState("Barchasi");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === "Barchasi" || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

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
            title="Mahsulotlar"
            subtitle="0% komissiya bilan xavfsiz savdo"
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
                placeholder="Mahsulot yoki do'kon qidirish..."
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
                  {...product}
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
                <h3 className="text-[#1A1C1E] text-lg font-black">Hech narsa topilmadi</h3>
                <p className="text-gray-400 text-sm mt-1">Qidiruv so'rovini o'zgartirib ko'ring</p>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Bottom Navigation */}
        <BottomNav />
      </div>
    </main>
  );
}

