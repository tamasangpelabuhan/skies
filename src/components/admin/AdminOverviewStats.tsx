import React from 'react';
import { DollarSign, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card } from '../ui/card';

interface AdminOverviewStatsProps {
  totalRevenue: number;
  unpaidCount: number;
  processingCount: number;
  completedCount: number;
}

export const AdminOverviewStats: React.FC<AdminOverviewStatsProps> = ({
  totalRevenue,
  unpaidCount,
  processingCount,
  completedCount,
}) => {
  const stats = [
    {
      title: 'Total Omset Terkonfirmasi',
      value: `Rp${totalRevenue.toLocaleString('id-ID')}`,
      desc: 'Pesanan Selesai & Diproses',
      icon: DollarSign,
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    },
    {
      title: 'Menunggu Pembayaran',
      value: unpaidCount.toString(),
      desc: 'Perlu verifikasi transfer/QRIS',
      icon: Clock,
      color: 'text-amber-700 bg-amber-50 border-amber-200',
    },
    {
      title: 'Sedang Diproses',
      value: processingCount.toString(),
      desc: 'Siap dikirimkan kredensialnya',
      icon: AlertCircle,
      color: 'text-blue-700 bg-blue-50 border-blue-200',
    },
    {
      title: 'Pesanan Selesai',
      value: completedCount.toString(),
      desc: 'Kredensial akun sudah terkirim',
      icon: CheckCircle2,
      color: 'text-zinc-950 bg-zinc-100 border-zinc-200',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <Card
            key={idx}
            className="bg-white border border-zinc-200/90 rounded-3xl p-5 space-y-3 shadow-xs"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-500">
                {stat.title}
              </span>
              <div className={`p-2.5 rounded-2xl border ${stat.color}`}>
                <Icon className="w-4 h-4 stroke-[2.2]" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-black text-zinc-950 block tracking-tight">
                {stat.value}
              </span>
              <span className="text-[11px] text-zinc-400 mt-1 block">
                {stat.desc}
              </span>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
