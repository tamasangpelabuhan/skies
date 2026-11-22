import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const AdminSettingsHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
      <div>
        <h3 className="text-sm md:text-base font-bold text-zinc-950">
          Pengaturan Toko di Database Cloud
        </h3>
        <p className="text-xs text-zinc-400">
          Tersimpan langsung di Cloud Firestore & tersinkronisasi ke seluruh etalase
        </p>
      </div>
      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200/60">
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>Tersinkron Firestore</span>
      </div>
    </div>
  );
};
