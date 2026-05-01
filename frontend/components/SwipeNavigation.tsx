'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';

const TABS = ['/', '/mutaxassis', '/mahsulot', '/suhbatlar', '/akkaunt'];

export default function SwipeNavigation({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [direction, setDirection] = useState(0); // 1 for next, -1 for prev
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const currentIndex = TABS.indexOf(pathname);

  // Only enable swipe for main tab pages
  const isTabPage = currentIndex !== -1;

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isTabPage) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isTabPage || touchStartX.current === null || touchStartY.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const diffX = touchEndX - touchStartX.current;
    const diffY = touchEndY - touchStartY.current;

    // Check if horizontal swipe is dominant and exceeds threshold
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      if (diffX > 0 && currentIndex > 0) {
        // Swipe Right -> Prev
        setDirection(-1);
        router.push(TABS[currentIndex - 1]);
      } else if (diffX < 0 && currentIndex < TABS.length - 1) {
        // Swipe Left -> Next
        setDirection(1);
        router.push(TABS[currentIndex + 1]);
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  const variants: Variants = {
    initial: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95
    }),
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 }
      }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 }
      }
    })
  };

  return (
    <div 
      className="relative w-full h-full overflow-x-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={pathname}
          custom={direction}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full min-h-screen bg-transparent"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
