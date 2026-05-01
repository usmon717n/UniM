'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

interface AuthModalContextValue {
  isOpen: boolean;
  from: string;
  initialTab: 'login' | 'register';
  openModal: (from?: string, tab?: 'login' | 'register') => void;
  closeModal: () => void;
}

const AuthModalContext = createContext<AuthModalContextValue | null>(null);

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [from, setFrom] = useState('/');
  const [initialTab, setInitialTab] = useState<'login' | 'register'>('login');

  const openModal = (destination = '/', tab: 'login' | 'register' = 'login') => {
    setFrom(destination);
    setInitialTab(tab);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  return (
    <AuthModalContext.Provider value={{ isOpen, from, initialTab, openModal, closeModal }}>
      {children}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal(): AuthModalContextValue {
  const ctx = useContext(AuthModalContext);
  if (!ctx) throw new Error('useAuthModal must be used inside AuthModalProvider');
  return ctx;
}
