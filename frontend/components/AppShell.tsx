'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import BottomNav from './BottomNav';
import { AuthModal } from './AuthModal';
import SwipeNavigation from './SwipeNavigation';
import PageTransition from './PageTransition';

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <SwipeNavigation>
      <PageTransition>{children}</PageTransition>
      <BottomNav />
      <AuthModal />
    </SwipeNavigation>
  );
}
