'use client';

import React from 'react';
import { CustomerOrder, OrderStatus } from '../../types/order';
import { Card } from '../ui/card';
import { AppLogo } from '../AppLogo';

interface OrderCardProps {
  order: CustomerOrder;
  onPayNow: (order: CustomerOrder) => void;
  onViewDetails: (order: CustomerOrder) => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({
  order,
  onPayNow,
  onViewDetails,
}) => {
  const firstItem = order.items[0];
  const logo =
    firstItem?.logoType ||
    (firstItem?.productName.toLowerCase().includes('spotify')
      ? 'spotify'
      : firstItem?.productName.toLowerCase().includes('canva')
      ? 'canva'
      : 'netflix');

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Belum dibayar':
        return (
          <span className="px-2.5 py-1 rounded-full bg-[#FFE59A] text-[#2F2552] text-[10px] font-extrabold">
            Belum dibayar
          </span>
        );
      case 'Diproses':
        return (
          <span className="px-2.5 py-1 rounded-full bg-[#E4DCFB] text-[#4A3A85] text-[10px] font-extrabold">
            Diproses
          </span>
        );
      case 'Selesai':
        return (
          <span className="px-2.5 py-1 rounded-full bg-[#CDEFD9] text-[#1C6D41] text-[10px] font-extrabold">
            Selesai
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="p-4 md:p-5 space-y-3 flex flex-col justify-between border-[1.5px] border-[#E7DFFB]">
      <div>
        {/* Card Top Row: Invoice & Status */}
        <div className="flex items-center justify-between pb-2 border-b border-[#E7DFFB]/60">
          <span className="text-xs font-bold text-[#7B6FA3]">
            {order.invoiceNumber}
          </span>
          {getStatusBadge(order.status)}
        </div>

        {/* Middle: Product Logo + Info */}
        <div className="flex items-center gap-3.5 py-2.5">
          <AppLogo
            type={logo}
            size="sm"
            className="w-12 h-12 rounded-2xl shrink-0"
          />
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-bold font-heading text-[#2F2552] truncate">
              {firstItem?.productName || 'Aplikasi Premium'}
            </h3>
            <p className="text-xs text-[#7B6FA3] font-semibold truncate mt-0.5">
              {firstItem?.variantName || '1 bulan • Paket'}
            </p>
            <span className="text-xs md:text-sm font-extrabold text-[#4A3A85] block mt-1">
              Rp{order.totalAmount.toLocaleString('id-ID')}
            </span>
          </div>
        </div>

        {/* Message note */}
        <p className="text-xs text-[#7B6FA3]">
          {order.accountDetails?.message ||
            (order.status === 'Belum dibayar'
              ? 'Selesaikan pembayaran untuk diproses.'
              : order.status === 'Diproses'
              ? 'Pesanan sedang disiapkan oleh admin.'
              : 'Akun telah aktif. Klik lihat akun untuk informasi kredensial.')}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="pt-2 flex items-center gap-2">
        {order.status === 'Belum dibayar' && (
          <button
            onClick={() => onPayNow(order)}
            className="flex-1 py-2 px-3 rounded-full bg-[#4A3A85] text-[#F5F1FF] hover:bg-[#3d2f70] text-xs font-extrabold active:scale-95 transition-all cursor-pointer shadow-xs"
          >
            Bayar sekarang
          </button>
        )}

        <button
          onClick={() => onViewDetails(order)}
          className="flex-1 py-2 px-3 rounded-full bg-[#F5F1FF] text-[#4A3A85] border border-[#E7DFFB] hover:bg-[#E4DCFB] text-xs font-bold active:scale-95 transition-all cursor-pointer"
        >
          Lihat akun
        </button>
      </div>
    </Card>
  );
};
