'use client';

import { useState, useTransition, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, Mail, Lock, User, Eye, EyeOff, Loader2, Sparkles } from 'lucide-react';
import { z } from 'zod';
import { apiLogin, apiRegister, type AuthUser } from '@/lib/api/auth';
import { useAuth } from '@/lib/contexts/auth-context';
import { useAuthModal } from '@/lib/contexts/auth-modal-context';

const loginSchema = z.object({
  email: z.string().email('Email noto\'g\'ri'),
  password: z.string().min(1, 'Parol kiritilishi shart'),
});

const registerSchema = z.object({
  name: z.string().min(2, 'Ism kamida 2 ta belgi'),
  email: z.string().email('Email noto\'g\'ri'),
  password: z
    .string()
    .min(8, 'Kamida 8 ta belgi')
    .regex(/[a-zA-Z]/, 'Harf bo\'lishi shart')
    .regex(/\d/, 'Raqam bo\'lishi shart'),
});

type FieldErrors = Record<string, string | undefined>;

export function AuthModal() {
  const { isOpen, from, initialTab, closeModal } = useAuthModal();
  const { setAuth } = useAuth();
  const router = useRouter();

  const [tab, setTab] = useState<'login' | 'register'>('login');

  useEffect(() => {
    if (isOpen) setTab(initialTab);
  }, [isOpen, initialTab]);
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const [loginValues, setLoginValues] = useState({ email: '', password: '' });
  const [registerValues, setRegisterValues] = useState({ name: '', email: '', password: '' });

  if (!isOpen) return null;

  function switchTab(t: 'login' | 'register') {
    setTab(t);
    setFieldErrors({});
    setServerError('');
  }

  function onSuccess(token: string, user: AuthUser) {
    setAuth(token, user);
    closeModal();
    router.push(from);
  }

  function handleLoginSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = loginSchema.safeParse(loginValues);
    if (!result.success) {
      const errs: FieldErrors = {};
      result.error.issues.forEach((i) => { if (!errs[String(i.path[0])]) errs[String(i.path[0])] = i.message; });
      setFieldErrors(errs);
      return;
    }
    startTransition(async () => {
      try {
        const data = await apiLogin(loginValues);
        onSuccess(data.accessToken, data.user);
      } catch (err) {
        setServerError(err instanceof Error ? err.message : 'Xatolik yuz berdi');
      }
    });
  }

  function handleRegisterSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = registerSchema.safeParse(registerValues);
    if (!result.success) {
      const errs: FieldErrors = {};
      result.error.issues.forEach((i) => { if (!errs[String(i.path[0])]) errs[String(i.path[0])] = i.message; });
      setFieldErrors(errs);
      return;
    }
    startTransition(async () => {
      try {
        const data = await apiRegister(registerValues);
        onSuccess(data.accessToken, data.user);
      } catch (err) {
        setServerError(err instanceof Error ? err.message : 'Xatolik yuz berdi');
      }
    });
  }

  const inputCls = (field: string) =>
    `w-full h-12 pl-11 pr-4 rounded-2xl border text-sm font-medium text-[#1A1A1A] placeholder-gray-400 outline-none transition-all duration-300 ${
      fieldErrors[field]
        ? 'border-red-200 bg-red-50/30 focus:border-red-400 focus:ring-4 focus:ring-red-500/10'
        : 'border-gray-100 bg-gray-50/50 focus:border-teal-500/50 focus:ring-4 focus:ring-teal-500/10 focus:bg-white'
    }`;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#1A1C1E]/60 backdrop-blur-md animate-in fade-in duration-500"
        onClick={closeModal}
      />

      {/* Modal card */}
      <div className="relative w-full max-w-sm bg-white rounded-[32px] shadow-[0_24px_48px_rgba(0,0,0,0.15)] border border-white overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-500">
        {/* Header */}
        <div className="px-8 pt-8 pb-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-tr from-teal-500 to-emerald-500 rounded-2xl blur-sm opacity-20"></div>
                <div className="relative w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg border border-white/20">
                  <span className="text-white font-black text-lg leading-none">U</span>
                </div>
              </div>
              <div>
                <span className="block font-black text-[#1A1A1A] text-xl leading-none">UniM</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Shu yerda va Hozir</span>
              </div>
            </div>
            <button
              onClick={closeModal}
              className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all duration-300 active:scale-90"
            >
              <X size={18} />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex bg-gray-50/80 rounded-2xl p-1 gap-1 border border-gray-100/50 relative">
             <div 
               className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-xl shadow-sm border border-gray-100/50 transition-all duration-500 ease-out ${tab === 'register' ? 'translate-x-full' : 'translate-x-0'}`}
             />
            {(['login', 'register'] as const).map((t) => (
              <button
                key={t}
                onClick={() => switchTab(t)}
                className={`relative flex-1 py-2.5 text-[13px] font-bold transition-all duration-300 z-10 ${
                  tab === t ? 'text-teal-600' : 'text-gray-400 hover:text-gray-500'
                }`}
              >
                {t === 'login' ? 'Kirish' : 'Ro\'yxatdan o\'tish'}
              </button>
            ))}
          </div>
        </div>

        {/* Form body */}
        <div className="px-8 pb-8 pt-2">
          {serverError && (
            <div className="bg-red-50 text-red-600 text-xs font-semibold rounded-2xl px-4 py-3 mb-4 border border-red-100 animate-in shake duration-500">
              {serverError}
            </div>
          )}

          {tab === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {/* Email */}
              <div className="group">
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-teal-500 transition-colors" />
                  <input
                    type="email"
                    placeholder="Email manzilingiz"
                    value={loginValues.email}
                    onChange={(e) => {
                      setLoginValues((v) => ({ ...v, email: e.target.value }));
                      setFieldErrors((x) => ({ ...x, email: undefined }));
                      setServerError('');
                    }}
                    className={inputCls('email')}
                  />
                </div>
                {fieldErrors.email && <p className="text-[11px] font-bold text-red-500 mt-1.5 ml-1">{fieldErrors.email}</p>}
              </div>

              {/* Password */}
              <div className="group">
                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-teal-500 transition-colors" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Parol"
                    value={loginValues.password}
                    onChange={(e) => {
                      setLoginValues((v) => ({ ...v, password: e.target.value }));
                      setFieldErrors((x) => ({ ...x, password: undefined }));
                      setServerError('');
                    }}
                    className={`${inputCls('password')} pr-12`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-teal-500 transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {fieldErrors.password && <p className="text-[11px] font-bold text-red-500 mt-1.5 ml-1">{fieldErrors.password}</p>}
              </div>

              <div className="flex justify-end pt-1">
                <button type="button" className="text-[12px] font-bold text-teal-600 hover:text-teal-700 transition-colors">Parolni unutdingizmi?</button>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="group relative w-full h-12 rounded-[20px] bg-gradient-to-r from-teal-500 to-emerald-600 text-white text-[14px] font-bold hover:shadow-lg hover:shadow-teal-500/25 active:scale-[0.97] transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-2 mt-2 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                {isPending ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <>
                    <span>Kirish</span>
                    <Sparkles size={14} className="opacity-70" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              {/* Name */}
              <div className="group">
                <div className="relative">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-teal-500 transition-colors" />
                  <input
                    type="text"
                    placeholder="To'liq ismingiz"
                    value={registerValues.name}
                    onChange={(e) => {
                      setRegisterValues((v) => ({ ...v, name: e.target.value }));
                      setFieldErrors((x) => ({ ...x, name: undefined }));
                      setServerError('');
                    }}
                    className={inputCls('name')}
                  />
                </div>
                {fieldErrors.name && <p className="text-[11px] font-bold text-red-500 mt-1.5 ml-1">{fieldErrors.name}</p>}
              </div>

              {/* Email */}
              <div className="group">
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-teal-500 transition-colors" />
                  <input
                    type="email"
                    placeholder="Email manzilingiz"
                    value={registerValues.email}
                    onChange={(e) => {
                      setRegisterValues((v) => ({ ...v, email: e.target.value }));
                      setFieldErrors((x) => ({ ...x, email: undefined }));
                      setServerError('');
                    }}
                    className={inputCls('email')}
                  />
                </div>
                {fieldErrors.email && <p className="text-[11px] font-bold text-red-500 mt-1.5 ml-1">{fieldErrors.email}</p>}
              </div>

              {/* Password */}
              <div className="group">
                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-teal-500 transition-colors" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Parol yarating"
                    value={registerValues.password}
                    onChange={(e) => {
                      setRegisterValues((v) => ({ ...v, password: e.target.value }));
                      setFieldErrors((x) => ({ ...x, password: undefined }));
                      setServerError('');
                    }}
                    className={`${inputCls('password')} pr-12`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-teal-500 transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {fieldErrors.password && <p className="text-[11px] font-bold text-red-500 mt-1.5 ml-1">{fieldErrors.password}</p>}
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="group relative w-full h-12 rounded-[20px] bg-gradient-to-r from-teal-500 to-emerald-600 text-white text-[14px] font-bold hover:shadow-lg hover:shadow-teal-500/25 active:scale-[0.97] transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-2 mt-2 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                {isPending ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <>
                    <span>Ro'yxatdan o'tish</span>
                    <Sparkles size={14} className="opacity-70" />
                  </>
                )}
              </button>
            </form>
          )}
          
          <p className="text-center text-[12px] text-gray-400 mt-6 font-medium">
            Tizimdan foydalanib, siz <button className="text-teal-600 hover:underline">Shartlarimizga</button> rozilik bildirasiz.
          </p>
        </div>
      </div>
    </div>
  );
}

