import React from 'react';
import { ShieldCheck, Zap, Headphones } from 'lucide-react';

export const FooterGuarantees: React.FC = () => {
  return (
    <div className="space-y-2.5">
      <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
        Jaminan Pelayanan
      </h4>
      <div className="space-y-2 text-xs text-zinc-600">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>100% Full Garansi 30 Hari</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-500 shrink-0" />
          <span>Proses Cepat 5-15 Menit</span>
        </div>
        <div className="flex items-center gap-2">
          <Headphones className="w-4 h-4 text-blue-600 shrink-0" />
          <span>Bantuan Admin 24/7 Ramah</span>
        </div>
      </div>
    </div>
  );
};
