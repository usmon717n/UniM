'use client';

type LanguageCode = 'uz' | 'ru' | 'en';

interface LanguageFlagProps {
  code: LanguageCode;
  className?: string;
}

export default function LanguageFlag({ code, className }: LanguageFlagProps) {
  if (code === 'uz') {
    return (
      <svg viewBox="0 0 32 22" className={className} aria-hidden="true">
        <rect width="32" height="22" rx="5" fill="#fff" />
        <rect width="32" height="7" rx="5" fill="#1EB6D8" />
        <rect y="15" width="32" height="7" rx="5" fill="#1F9D55" />
        <rect y="7" width="32" height="1" fill="#CE1126" />
        <rect y="14" width="32" height="1" fill="#CE1126" />
        <circle cx="6.2" cy="3.5" r="1.8" fill="#fff" />
      </svg>
    );
  }

  if (code === 'ru') {
    return (
      <svg viewBox="0 0 32 22" className={className} aria-hidden="true">
        <rect width="32" height="22" rx="5" fill="#fff" />
        <rect y="7.33" width="32" height="7.34" fill="#1C57A5" />
        <rect y="14.67" width="32" height="7.33" rx="5" fill="#D52B1E" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 32 22" className={className} aria-hidden="true">
      <rect width="32" height="22" rx="5" fill="#B22234" />
      <path d="M0 2.4h32M0 5.8h32M0 9.2h32M0 12.6h32M0 16h32M0 19.4h32" stroke="#fff" strokeWidth="1.6" />
      <rect width="14.5" height="10.8" rx="4" fill="#3C3B6E" />
    </svg>
  );
}
