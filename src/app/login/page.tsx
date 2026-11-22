'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, Mail, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { STORE_INFO } from '../../data/store-info';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, login, isLoading } = useAdminAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace('/admin');
    }
  }, [isAuthenticated, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    const result = await login(email, password);
    if (result.success) {
      router.push('/admin');
    } else {
      setErrorMsg(result.error || 'Akses ditolak. Periksa email dan password.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col justify-center items-center px-4 py-12 relative">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-zinc-950 text-white flex items-center justify-center mx-auto shadow-md">
            <ShieldCheck className="w-7 h-7 text-white stroke-[2.2]" />
          </div>
          <h1 className="text-2xl font-black text-zinc-950 tracking-tight">
            {STORE_INFO.name}
          </h1>
          <p className="text-xs text-zinc-500 font-medium">
            Portal Khusus Administrator Toko
          </p>
        </div>

        <Card className="rounded-3xl p-6 sm:p-8 shadow-xl border-zinc-200/90 bg-white">
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && (
              <div className="p-3 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-xs text-center font-medium">
                {errorMsg}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-zinc-800">
                Email Administrator
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <Input
                  type="email"
                  required
                  placeholder="admin@skies.id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 pr-4 py-2.5 rounded-2xl border-zinc-200 text-xs text-zinc-900 focus-visible:ring-zinc-950"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-zinc-800">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-11 py-2.5 rounded-2xl border-zinc-200 text-xs text-zinc-900 focus-visible:ring-zinc-950"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-3.5 rounded-2xl bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs flex items-center justify-center gap-2 active:scale-98 transition-all shadow-md cursor-pointer"
            >
              <span>{isSubmitting ? 'Memverifikasi Akses...' : 'Masuk ke Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>
        </Card>

        <p className="text-[11px] text-zinc-400 text-center">
          &copy; 2026 {STORE_INFO.name} • Internal Admin System
        </p>
      </div>
    </div>
  );
}
