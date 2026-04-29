'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, User, Mail, Lock, Loader2 } from 'lucide-react';
import { z } from 'zod';
import { apiRegister } from '@/lib/api/auth';
import { useAuth } from '@/lib/contexts/auth-context';

const schema = z.object({
  name: z.string().min(2, 'Ism kamida 2 ta belgidan iborat bo\'lishi kerak').max(50),
  email: z.string().email('Email manzili noto\'g\'ri'),
  password: z
    .string()
    .min(8, 'Parol kamida 8 ta belgidan iborat bo\'lishi kerak')
    .regex(/[a-zA-Z]/, 'Parolda kamida bitta harf bo\'lishi kerak')
    .regex(/\d/, 'Parolda kamida bitta raqam bo\'lishi kerak'),
});

type Fields = z.infer<typeof schema>;
type FieldErrors = Partial<Record<keyof Fields, string>>;

export default function RegisterPage() {
  const router = useRouter();
  const { setAuth } = useAuth();
  const [isPending, startTransition] = useTransition();

  const [values, setValues] = useState<Fields>({ name: '', email: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    setFieldErrors((e) => ({ ...e, [name]: undefined }));
    setServerError('');
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = schema.safeParse(values);
    if (!result.success) {
      const errs: FieldErrors = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof Fields;
        if (!errs[key]) errs[key] = issue.message;
      });
      setFieldErrors(errs);
      return;
    }

    startTransition(async () => {
      try {
        const data = await apiRegister(values);
        setAuth(data.accessToken, data.user);
        router.push('/');
      } catch (err) {
        setServerError(err instanceof Error ? err.message : 'Xatolik yuz berdi');
      }
    });
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 mb-4">
            <span className="text-white text-2xl font-bold">U</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Ro'yxatdan o'tish</h1>
          <p className="text-sm text-gray-500 mt-1">UniM ga xush kelibsiz</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
          {serverError && (
            <div className="bg-red-50 text-red-600 text-sm rounded-xl px-4 py-3">
              {serverError}
            </div>
          )}

          {/* Name */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Ism</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Ismingizni kiriting"
                value={values.name}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition-colors
                  ${fieldErrors.name
                    ? 'border-red-400 focus:border-red-500 bg-red-50'
                    : 'border-gray-200 focus:border-blue-500 bg-gray-50 focus:bg-white'
                  }`}
              />
            </div>
            {fieldErrors.name && (
              <p className="text-xs text-red-500">{fieldErrors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                name="email"
                type="email"
                autoComplete="email"
                placeholder="email@example.com"
                value={values.email}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition-colors
                  ${fieldErrors.email
                    ? 'border-red-400 focus:border-red-500 bg-red-50'
                    : 'border-gray-200 focus:border-blue-500 bg-gray-50 focus:bg-white'
                  }`}
              />
            </div>
            {fieldErrors.email && (
              <p className="text-xs text-red-500">{fieldErrors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Parol</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="Kamida 8 ta belgi"
                value={values.password}
                onChange={handleChange}
                className={`w-full pl-10 pr-10 py-3 rounded-xl border text-sm outline-none transition-colors
                  ${fieldErrors.password
                    ? 'border-red-400 focus:border-red-500 bg-red-50'
                    : 'border-gray-200 focus:border-blue-500 bg-gray-50 focus:bg-white'
                  }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {fieldErrors.password ? (
              <p className="text-xs text-red-500">{fieldErrors.password}</p>
            ) : (
              <p className="text-xs text-gray-400">Harf va raqam bo'lishi shart</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold
              hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed
              flex items-center justify-center gap-2 mt-2"
          >
            {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
            {isPending ? 'Ro\'yxatdan o\'tilmoqda...' : 'Ro\'yxatdan o\'tish'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Hisobingiz bormi?{' '}
          <Link href="/login" className="text-blue-600 font-medium hover:underline">
            Kirish
          </Link>
        </p>
      </div>
    </div>
  );
}
