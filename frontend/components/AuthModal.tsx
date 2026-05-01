'use client';

import { useState, useTransition, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, Mail, Lock, User, Eye, EyeOff, Loader2 } from 'lucide-react';
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
    `w-full h-11 pl-10 pr-4 rounded-xl border text-sm font-medium text-[#1A1A1A] placeholder-gray-300 outline-none transition-all bg-gray-50 ${
      fieldErrors[field]
        ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
        : 'border-gray-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 focus:bg-white'
    }`;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={closeModal}
      />

      {/* Modal card */}
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-white font-black text-sm leading-none">U</span>
            </div>
            <span className="font-black text-[#1A1A1A] text-lg">UniM</span>
          </div>
          <button
            onClick={closeModal}
            className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-all"
          >
            <X size={15} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex mx-6 mt-5 bg-gray-100 rounded-xl p-1 gap-1">
          {(['login', 'register'] as const).map((t) => (
            <button
              key={t}
              onClick={() => switchTab(t)}
              className={`flex-1 py-2 text-[13px] font-bold rounded-lg transition-all ${
                tab === t ? 'bg-white text-[#1A1A1A] shadow-sm' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {t === 'login' ? 'Kirish' : 'Ro\'yxatdan o\'tish'}
            </button>
          ))}
        </div>

        {/* Form body */}
        <div className="px-6 pt-4 pb-6">
          {serverError && (
            <div className="bg-red-50 text-red-600 text-xs font-medium rounded-xl px-4 py-2.5 mb-4 border border-red-100">
              {serverError}
            </div>
          )}

          {tab === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-3">
              {/* Email */}
              <div>
                <div className="relative">
                  <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Email"
                    value={loginValues.email}
                    onChange={(e) => {
                      setLoginValues((v) => ({ ...v, email: e.target.value }));
                      setFieldErrors((x) => ({ ...x, email: undefined }));
                      setServerError('');
                    }}
                    className={inputCls('email')}
                  />
                </div>
                {fieldErrors.email && <p className="text-xs text-red-500 mt-1">{fieldErrors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <div className="relative">
                  <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Parol"
                    value={loginValues.password}
                    onChange={(e) => {
                      setLoginValues((v) => ({ ...v, password: e.target.value }));
                      setFieldErrors((x) => ({ ...x, password: undefined }));
                      setServerError('');
                    }}
                    className={`${inputCls('password')} pr-10`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
                {fieldErrors.password && <p className="text-xs text-red-500 mt-1">{fieldErrors.password}</p>}
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full h-11 rounded-xl bg-teal-600 text-white text-[13px] font-bold hover:bg-teal-700 active:scale-[0.98] transition-all disabled:opacity-60 flex items-center justify-center gap-2 shadow-md shadow-teal-100 mt-1"
              >
                {isPending && <Loader2 size={14} className="animate-spin" />}
                {isPending ? 'Kirilmoqda...' : 'Kirish'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              {/* Name */}
              <div>
                <div className="relative">
                  <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Ismingiz"
                    value={registerValues.name}
                    onChange={(e) => {
                      setRegisterValues((v) => ({ ...v, name: e.target.value }));
                      setFieldErrors((x) => ({ ...x, name: undefined }));
                      setServerError('');
                    }}
                    className={inputCls('name')}
                  />
                </div>
                {fieldErrors.name && <p className="text-xs text-red-500 mt-1">{fieldErrors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <div className="relative">
                  <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Email"
                    value={registerValues.email}
                    onChange={(e) => {
                      setRegisterValues((v) => ({ ...v, email: e.target.value }));
                      setFieldErrors((x) => ({ ...x, email: undefined }));
                      setServerError('');
                    }}
                    className={inputCls('email')}
                  />
                </div>
                {fieldErrors.email && <p className="text-xs text-red-500 mt-1">{fieldErrors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <div className="relative">
                  <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Parol (kamida 8 ta belgi)"
                    value={registerValues.password}
                    onChange={(e) => {
                      setRegisterValues((v) => ({ ...v, password: e.target.value }));
                      setFieldErrors((x) => ({ ...x, password: undefined }));
                      setServerError('');
                    }}
                    className={`${inputCls('password')} pr-10`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
                {fieldErrors.password && <p className="text-xs text-red-500 mt-1">{fieldErrors.password}</p>}
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full h-11 rounded-xl bg-teal-600 text-white text-[13px] font-bold hover:bg-teal-700 active:scale-[0.98] transition-all disabled:opacity-60 flex items-center justify-center gap-2 shadow-md shadow-teal-100 mt-1"
              >
                {isPending && <Loader2 size={14} className="animate-spin" />}
                {isPending ? 'Ro\'yxatdan o\'tilmoqda...' : 'Ro\'yxatdan o\'tish'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
