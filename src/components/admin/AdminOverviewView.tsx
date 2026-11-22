'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CustomerOrder } from '../../types/order';
import { ArrowUpRight } from 'lucide-react';
import { Card } from '../ui/card';
import { AdminOverviewStats } from './AdminOverviewStats';

interface AdminOverviewViewProps {
  orders: CustomerOrder[];
}

export const AdminOverviewView: React.FC<AdminOverviewViewProps> = ({ orders }) => {
  const router = useRouter();

  const totalRevenue = orders
    .filter((o) => o.status === 'Selesai' || o.status === 'Diproses')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const unpaidCount = orders.filter((o) => o.status === 'Belum dibayar').length;
  const processingCount = orders.filter((o) => o.status === 'Diproses').length;
  const completedCount = orders.filter((o) => o.status === 'Selesai').length;

  return (
    <div className="space-y-6">
      <AdminOverviewStats
        totalRevenue={totalRevenue}
        unpaidCount={unpaidCount}
        processingCount={processingCount}
        completedCount={completedCount}
      />

      {/* Recent Orders Section */}
      <Card className="bg-white border border-zinc-200/90 rounded-3xl p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm md:text-base font-bold text-zinc-950">
              Pesanan Terbaru Masuk
            </h3>
            <p className="text-xs text-zinc-400">
              Transaksi paling baru dari pelanggan.
            </p>
          </div>
          <Link
            href="/admin/pesanan"
            className="text-xs font-bold text-zinc-950 hover:text-zinc-700 flex items-center gap-1 cursor-pointer"
          >
            <span>Lihat Semua Pesanan</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="divide-y divide-zinc-100 overflow-x-auto">
          {orders.slice(0, 5).map((ord) => (
            <div
              key={ord.id}
              onClick={() => router.push('/admin/pesanan')}
              className="py-3.5 flex items-center justify-between gap-4 hover:bg-zinc-50 px-2.5 rounded-2xl transition-colors cursor-pointer group"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-zinc-900 group-hover:text-black">
                    {ord.invoiceNumber}
                  </span>
                  <span className="text-[11px] text-zinc-400">• {ord.customerName}</span>
                </div>
                <span className="text-[11px] text-zinc-500 truncate block mt-0.5">
                  {ord.items.map((i) => `${i.productName} (${i.variantName})`).join(', ')}
                </span>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xs font-extrabold text-zinc-950 block">
                  Rp{ord.totalAmount.toLocaleString('id-ID')}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-lg inline-block mt-1 ${
                    ord.status === 'Selesai'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : ord.status === 'Diproses'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}
                >
                  {ord.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
