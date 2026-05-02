'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

export type LangCode = 'uz' | 'ru' | 'en';

interface LanguageContextValue {
  lang: LangCode;
  setLang: (lang: LangCode) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = 'avimed_lang';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'uz' || stored === 'ru' || stored === 'en') return stored;
    }
    return 'uz';
  });

  function setLang(next: LangCode) {
    localStorage.setItem(STORAGE_KEY, next);
    setLangState(next);
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider');
  return ctx;
}
