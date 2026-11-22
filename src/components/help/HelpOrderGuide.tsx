import React from 'react';
import { Card } from '../ui/card';

export interface OrderStep {
  step: string;
  title: string;
  desc: string;
}

const DEFAULT_STEPS: OrderStep[] = [
  {
    step: '01',
    title: 'Pilih aplikasi',
    desc: 'Buka Katalog, lalu pilih produk dan durasi.',
  },
  {
    step: '02',
    title: 'Lengkapi data',
    desc: 'Isi email aktif dan cek detail pesanan.',
  },
  {
    step: '03',
    title: 'Lakukan pembayaran',
    desc: 'Pilih metode bayar, lalu ikuti instruksinya.',
  },
  {
    step: '04',
    title: 'Terima pesanan',
    desc: 'Cek email dan detail akun di menu Pesanan.',
  },
];

export const HelpOrderGuide: React.FC = () => {
  return (
    <div id="cara-order-section" className="space-y-3">
      <h2 className="text-base md:text-lg font-bold text-zinc-950 tracking-tight">
        Cara order
      </h2>

      <Card className="rounded-[26px] md:rounded-[32px] p-4 md:p-5 space-y-3.5">
        {DEFAULT_STEPS.map((item, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-zinc-100 flex items-center justify-center font-bold text-xs text-zinc-800 shrink-0">
              {item.step}
            </div>
            <div>
              <h3 className="text-xs md:text-sm font-bold text-zinc-900">
                {item.title}
              </h3>
              <p className="text-[11px] md:text-xs text-zinc-500 mt-0.5 leading-snug">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
};
