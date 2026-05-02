'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useLang, type LangCode } from '@/lib/contexts/language-context';
import { useT } from '@/lib/hooks/useT';

const LANGS: { code: LangCode; short: string; label: string }[] = [
  { code: 'uz', short: "O'z", label: "O'zbekcha" },
  { code: 'ru', short: 'Ru',  label: 'Русский'   },
  { code: 'en', short: 'En',  label: 'English'   },
];

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();
  const tr = useT();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, []);

  function select(code: LangCode) {
    setLang(code);
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative" title={tr.lang.tooltip}>
      {/* Trigger pill */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-[#00A389]/30 transition-all duration-200 select-none"
        aria-label={tr.lang.tooltip}
        aria-expanded={open}
      >
        <Globe size={13} className="text-[#00A389] shrink-0" strokeWidth={2.2} />
        <span className="text-[11px] font-medium leading-none text-[#00A389]">
          {LANGS.find((l) => l.code === lang)?.short}
        </span>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 top-[calc(100%+8px)] w-44 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden z-50"
          >
            <div className="px-3.5 pt-3 pb-1.5">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                {tr.lang.choose}
              </p>
            </div>
            <div className="px-2 pb-2 flex flex-col gap-0.5">
              {LANGS.map((l) => {
                const active = lang === l.code;
                return (
                  <button
                    key={l.code}
                    onClick={() => select(l.code)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                      active
                        ? 'bg-[#00A389]/8 text-[#00A389]'
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                    }`}
                  >
                    <span>{l.label}</span>
                    {active && (
                      <motion.span
                        layoutId="lang-check"
                        className="w-1.5 h-1.5 rounded-full bg-[#00A389]"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
