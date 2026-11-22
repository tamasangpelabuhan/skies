import React from 'react';
import { Database } from 'lucide-react';
import { Card } from '../../ui/card';

export const AdminSettingsInfoCard: React.FC = () => {
  return (
    <Card className="bg-white border border-zinc-200/90 rounded-3xl p-6 space-y-2 shadow-xs">
      <div className="flex items-center gap-2 text-zinc-900 font-bold text-xs">
        <Database className="w-4 h-4 text-zinc-700" />
        <span>Status Cloud Firestore: Terkoneksi Real-time</span>
      </div>
      <p className="text-xs text-zinc-500 leading-relaxed">
        Semua perubahan pengaturan toko tersimpan secara permanen pada dokumen{' '}
        <code className="bg-zinc-100 px-1 py-0.5 rounded text-zinc-800">settings/store_config</code> di Firebase Firestore.
      </p>
    </Card>
  );
};
