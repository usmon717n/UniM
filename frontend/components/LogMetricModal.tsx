'use client';

import { useState, useTransition } from 'react';
import { X, Heart, Footprints, Moon, Loader2, Check } from 'lucide-react';
import { apiLogMetric, type MetricType } from '@/lib/api/health';
import { useAuth } from '@/lib/contexts/auth-context';
import { useT } from '@/lib/hooks/useT';

interface Props {
  isOpen: boolean;
  defaultType?: MetricType;
  onClose: () => void;
  onSaved: () => void;
}

const TABS_STATIC = [
  { type: 'HEART_RATE' as MetricType, unit: 'bpm',  min: 30, max: 250,    step: '1',   placeholder: '72',   icon: Heart,     accent: 'text-rose-500',    bg: 'bg-rose-50',    ring: 'focus:ring-rose-500/20 focus:border-rose-400'     },
  { type: 'STEPS'      as MetricType, unit: null,   min: 0,  max: 100000, step: '100', placeholder: '6842', icon: Footprints,accent: 'text-emerald-500', bg: 'bg-emerald-50', ring: 'focus:ring-emerald-500/20 focus:border-emerald-400' },
  { type: 'SLEEP'      as MetricType, unit: null,   min: 0,  max: 24,     step: '0.5', placeholder: '7.5',  icon: Moon,      accent: 'text-violet-500',  bg: 'bg-violet-50',  ring: 'focus:ring-violet-500/20 focus:border-violet-400'   },
];

export function LogMetricModal({ isOpen, defaultType = 'HEART_RATE', onClose, onSaved }: Props) {
  const { token } = useAuth();
  const tr = useT();
  const [activeType, setActiveType] = useState<MetricType>(defaultType);
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  const TABS = TABS_STATIC.map((s) => ({
    ...s,
    label: s.type === 'HEART_RATE' ? tr.health.heartRate : s.type === 'STEPS' ? tr.health.steps : tr.health.sleep,
    unit:  s.type === 'HEART_RATE' ? 'bpm' : s.type === 'STEPS' ? tr.health.stepsUnit : tr.health.sleepUnit,
  }));

  const tab = TABS.find((t) => t.type === activeType)!;
  const Icon = tab.icon;

  function handleClose() {
    setValue('');
    setError('');
    setSaved(false);
    onClose();
  }

  function handleTabChange(type: MetricType) {
    setActiveType(type);
    setValue('');
    setError('');
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;

    const num = parseFloat(value);
    if (isNaN(num) || num < tab.min || num > tab.max) {
      setError(tr.log.rangeErr(tab.min, tab.max, tab.unit));
      return;
    }

    startTransition(async () => {
      try {
        await apiLogMetric(token, { type: activeType, value: num });
        setSaved(true);
        setTimeout(() => {
          handleClose();
          onSaved();
        }, 900);
      } catch (err) {
        setError(err instanceof Error ? err.message : tr.log.error);
      }
    });
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#1A1C1E]/50 backdrop-blur-md animate-in fade-in duration-300"
        onClick={handleClose}
      />

      {/* Sheet */}
      <div className="relative w-full max-w-sm bg-white rounded-[28px] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-6 fade-in duration-400">
        {/* Handle bar (mobile) */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-gray-200" />
        </div>

        {/* Header */}
        <div className="px-6 pt-4 pb-3 flex items-center justify-between">
          <h2 className="text-[15px] font-black text-[#1A1A1A]">{tr.log.title}</h2>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-200 transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        {/* Metric tabs */}
        <div className="px-6 pb-4">
          <div className="flex gap-2">
            {TABS.map((t) => {
              const TIcon = t.icon;
              const active = t.type === activeType;
              return (
                <button
                  key={t.type}
                  onClick={() => handleTabChange(t.type)}
                  className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-2xl border-2 transition-all duration-200 ${
                    active
                      ? `border-current ${t.accent} ${t.bg}`
                      : 'border-gray-100 text-gray-400 bg-gray-50 hover:border-gray-200'
                  }`}
                >
                  <TIcon size={18} fill={active ? 'currentColor' : 'none'} />
                  <span className="text-[10px] font-bold leading-none">{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-3">
          <div className="relative">
            <div
              className={`absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl flex items-center justify-center ${tab.bg} ${tab.accent}`}
            >
              <Icon size={18} fill="currentColor" />
            </div>
            <input
              type="number"
              inputMode="decimal"
              min={tab.min}
              max={tab.max}
              step={tab.step}
              placeholder={tab.placeholder}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setError('');
              }}
              className={`w-full h-14 pl-16 pr-20 rounded-2xl border text-xl font-black text-[#1A1A1A] outline-none transition-all duration-200 ${
                error
                  ? 'border-red-200 bg-red-50/30 focus:border-red-400 focus:ring-4 focus:ring-red-500/10'
                  : `border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 ${tab.ring}`
              }`}
              autoFocus
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">
              {tab.unit}
            </span>
          </div>

          {error && (
            <p className="text-[11px] font-bold text-red-500 ml-1">{error}</p>
          )}

          {/* Range hint */}
          <p className="text-[11px] text-gray-400 font-medium ml-1">
            {tr.log.hints[activeType]}
          </p>

          <button
            type="submit"
            disabled={isPending || !value || saved}
            className={`w-full h-12 rounded-[18px] text-white text-[14px] font-bold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 ${
              saved
                ? 'bg-emerald-500'
                : `bg-gradient-to-r from-teal-500 to-emerald-500 hover:shadow-lg hover:shadow-teal-500/25 active:scale-[0.97]`
            }`}
          >
            {saved ? (
              <>
                <Check size={16} className="stroke-[3]" />
                <span>{tr.log.saved}</span>
              </>
            ) : isPending ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              tr.log.save
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
