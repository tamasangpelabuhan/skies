'use client';

import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { MessageSquare, Clock, Store, Save, Check, Tag } from 'lucide-react';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { AdminSettingsHeader } from './settings/AdminSettingsHeader';
import { AdminSettingsInfoCard } from './settings/AdminSettingsInfoCard';

export const AdminSettingsView: React.FC = () => {
  const { settings, updateSettings } = useStore();
  const [name, setName] = useState(settings.name);
  const [waDisplay, setWaDisplay] = useState(settings.whatsappDisplay);
  const [hours, setHours] = useState(settings.operationalHours);
  const [status, setStatus] = useState(settings.status);
  const [tagline, setTagline] = useState(settings.tagline);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setName(settings.name);
    setWaDisplay(settings.whatsappDisplay);
    setHours(settings.operationalHours);
    setStatus(settings.status);
    setTagline(settings.tagline);
  }, [settings]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const cleanDigits = waDisplay.replace(/\D/g, '');

    await updateSettings({
      name,
      whatsappDisplay: waDisplay,
      whatsappNumber: cleanDigits,
      operationalHours: hours,
      status: status as 'Buka / Online' | 'Istirahat' | 'Tutup',
      tagline,
    });

    setIsSaving(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="max-w-2xl space-y-5">
      <Card className="bg-white border border-zinc-200/90 rounded-3xl p-6 space-y-4 shadow-xs">
        <AdminSettingsHeader />

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block text-xs font-bold text-zinc-800 mb-1.5 flex items-center gap-2">
              <Store className="w-3.5 h-3.5 text-zinc-700" />
              <span>Nama Toko</span>
            </label>
            <Input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-zinc-200 text-xs text-zinc-900 focus-visible:ring-zinc-950 font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-800 mb-1.5 flex items-center gap-2">
              <MessageSquare className="w-3.5 h-3.5 text-zinc-700" />
              <span>Nomor WhatsApp Admin (Penerima Checkout)</span>
            </label>
            <Input
              type="text"
              required
              value={waDisplay}
              onChange={(e) => setWaDisplay(e.target.value)}
              className="border-zinc-200 text-xs text-zinc-900 focus-visible:ring-zinc-950 font-bold"
            />
            <span className="text-[11px] text-zinc-400 block mt-1">
              Contoh: +62 877-8928-7807 (Semua tombol pesan WhatsApp toko akan otomatis mengarah ke nomor ini).
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-800 mb-1.5 flex items-center gap-2">
              <Tag className="w-3.5 h-3.5 text-zinc-700" />
              <span>Slogan / Tagline Toko</span>
            </label>
            <Input
              type="text"
              required
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="border-zinc-200 text-xs text-zinc-900 focus-visible:ring-zinc-950"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-zinc-800 mb-1.5 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-zinc-700" />
                <span>Jam Operasional</span>
              </label>
              <Input
                type="text"
                required
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="border-zinc-200 text-xs text-zinc-900 focus-visible:ring-zinc-950"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-800 mb-1.5 flex items-center gap-2">
                <Store className="w-3.5 h-3.5 text-zinc-700" />
                <span>Status Toko</span>
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'Buka / Online' | 'Istirahat' | 'Tutup')}
                className="w-full p-2.5 rounded-2xl bg-white border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-950"
              >
                <option value="Buka / Online">Buka / Online (Siap terima pesanan)</option>
                <option value="Istirahat">Istirahat (Slow response)</option>
                <option value="Tutup">Tutup Sementara</option>
              </select>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSaving}
            className="w-full py-3.5 rounded-2xl bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs flex items-center justify-center gap-2 active:scale-98 transition-all shadow-md cursor-pointer mt-2"
          >
            {isSaved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>{isSaving ? 'Menyimpan ke Cloud...' : isSaved ? 'Pengaturan Berhasil Disimpan ke Firestore!' : 'Simpan Pengaturan ke Database'}</span>
          </Button>
        </form>
      </Card>

      <AdminSettingsInfoCard />
    </div>
  );
};
