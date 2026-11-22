'use client';

import React from 'react';
import { X, Bell, Sparkles, Tag, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const NotificationsModal: React.FC = () => {
  const { isNotificationsOpen, setIsNotificationsOpen } = useStore();

  if (!isNotificationsOpen) return null;

  const notifications = [
    {
      id: 1,
      title: 'Promo Spesial Awal Bulan 🎉',
      desc: 'Dapatkan diskon hingga 50% untuk langganan Netflix & Spotify 3 bulan.',
      time: 'Baru saja',
      icon: Tag,
      color: 'bg-[#FFF4CC] text-[#2F2552] border border-[#FFE59A]',
    },
    {
      id: 2,
      title: 'Update Server & Garansi Cepat ⚡',
      desc: 'Semua proses invite family kini otomatis ready dalam 5-10 menit setelah konfirmasi transfer.',
      time: '1 jam lalu',
      icon: Sparkles,
      color: 'bg-[#E4DCFB] text-[#4A3A85] border border-[#B7A3F2]',
    },
    {
      id: 3,
      title: 'Garansi 100% Anti Hold',
      desc: 'Tenang, semua akun di Skies by Nas bergaransi penggantian akun jika terjadi screen limit.',
      time: 'Kemarin',
      icon: ShieldCheck,
      color: 'bg-[#CDEFD9] text-[#1C6D41] border border-[#7ED6A5]',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#2F2552]/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-white rounded-t-[32px] sm:rounded-3xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom-8 duration-300 border-[1.5px] border-[#E7DFFB]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 pb-3 flex items-center justify-between border-b border-[#E7DFFB]/60">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#4A3A85]" />
            <h3 className="text-base font-bold font-heading text-[#4A3A85]">Notifikasi & Promo</h3>
          </div>
          <button
            onClick={() => setIsNotificationsOpen(false)}
            className="p-2 rounded-full hover:bg-[#F5F1FF] text-[#7B6FA3] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-3">
          {notifications.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border-[1.5px] border-[#E7DFFB]"
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold font-heading text-[#2F2552]">
                      {item.title}
                    </h4>
                    <span className="text-[10px] text-[#7B6FA3] font-semibold">{item.time}</span>
                  </div>
                  <p className="text-xs text-[#7B6FA3] mt-0.5 leading-relaxed font-semibold">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
