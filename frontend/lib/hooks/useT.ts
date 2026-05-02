import { useLang } from '@/lib/contexts/language-context';
import t from '@/lib/translations';

export function useT() {
  const { lang } = useLang();
  return t[lang];
}
