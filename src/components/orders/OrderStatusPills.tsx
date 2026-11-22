'use client';

import React from 'react';
import { OrderStatus } from '../../types/order';

interface OrderStatusPillsProps {
  activeFilter: 'all' | OrderStatus;
  onSelect: (filter: 'all' | OrderStatus) => void;
  counts: {
    total: number;
    unpaid: number;
    processing: number;
    completed: number;
  };
}

export const OrderStatusPills: React.FC<OrderStatusPillsProps> = ({
  activeFilter,
  onSelect,
  counts,
}) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
      <button
        onClick={() => onSelect('all')}
        className={`shrink-0 px-4 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
          activeFilter === 'all'
            ? 'bg-[#4A3A85] text-[#F5F1FF] border-[1.5px] border-[#4A3A85] shadow-xs'
            : 'bg-white text-[#7B6FA3] border-[1.5px] border-[#E7DFFB] hover:text-[#4A3A85] hover:border-[#B7A3F2]'
        }`}
      >
        Semua · {counts.total}
      </button>

      <button
        onClick={() => onSelect('Belum dibayar')}
        className={`shrink-0 px-4 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
          activeFilter === 'Belum dibayar'
            ? 'bg-[#FFE59A] text-[#2F2552] border-[1.5px] border-[#FFE59A] shadow-xs'
            : 'bg-white text-[#7B6FA3] border-[1.5px] border-[#E7DFFB] hover:text-[#4A3A85] hover:border-[#B7A3F2]'
        }`}
      >
        Belum bayar · {counts.unpaid}
      </button>

      <button
        onClick={() => onSelect('Diproses')}
        className={`shrink-0 px-4 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
          activeFilter === 'Diproses'
            ? 'bg-[#E4DCFB] text-[#4A3A85] border-[1.5px] border-[#B7A3F2] shadow-xs'
            : 'bg-white text-[#7B6FA3] border-[1.5px] border-[#E7DFFB] hover:text-[#4A3A85] hover:border-[#B7A3F2]'
        }`}
      >
        Diproses · {counts.processing}
      </button>

      <button
        onClick={() => onSelect('Selesai')}
        className={`shrink-0 px-4 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
          activeFilter === 'Selesai'
            ? 'bg-[#CDEFD9] text-[#1C6D41] border-[1.5px] border-[#7ED6A5] shadow-xs'
            : 'bg-white text-[#7B6FA3] border-[1.5px] border-[#E7DFFB] hover:text-[#4A3A85] hover:border-[#B7A3F2]'
        }`}
      >
        Selesai · {counts.completed}
      </button>
    </div>
  );
};
