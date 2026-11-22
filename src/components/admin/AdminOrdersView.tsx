'use client';

import React, { useState } from 'react';
import { CustomerOrder, OrderStatus } from '../../types/order';
import { Search } from 'lucide-react';
import { Input } from '../ui/input';
import { AdminOrderCard } from './AdminOrderCard';

interface AdminOrdersViewProps {
  orders: CustomerOrder[];
  onUpdateStatus: (orderId: string, status: OrderStatus) => void;
  onOpenCredentialsModal: (order: CustomerOrder) => void;
}

export const AdminOrdersView: React.FC<AdminOrdersViewProps> = ({
  orders,
  onUpdateStatus,
  onOpenCredentialsModal,
}) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | OrderStatus>('all');

  const filteredOrders = orders.filter((ord) => {
    const matchesStatus = statusFilter === 'all' || ord.status === statusFilter;
    const query = search.toLowerCase();
    const matchesSearch =
      ord.invoiceNumber.toLowerCase().includes(query) ||
      ord.customerName.toLowerCase().includes(query) ||
      (ord.customerEmail || '').toLowerCase().includes(query) ||
      ord.customerWhatsapp.toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });

  const handleWhatsAppChat = (order: CustomerOrder) => {
    const rawNumber = order.customerWhatsapp.replace(/\D/g, '');
    const cleanNumber = rawNumber.startsWith('0') ? '62' + rawNumber.slice(1) : rawNumber;
    const text = `Halo kak *${order.customerName}*! 👋\nSaya Admin Skies by Nas, ingin mengonfirmasi pesanan *#${order.invoiceNumber}*.`;
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="space-y-5">
      {/* Search & Filter Header */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <Input
            type="text"
            placeholder="Cari invoice, nama, WA, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2.5 rounded-2xl bg-white border-zinc-200 text-xs text-zinc-900 shadow-xs focus-visible:ring-zinc-950"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {(['all', 'Belum dibayar', 'Diproses', 'Selesai'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-zinc-950 text-white shadow-xs'
                  : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50'
              }`}
            >
              {st === 'all' ? 'Semua Pesanan' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-3">
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center bg-white border border-zinc-200/90 rounded-3xl text-zinc-400 text-xs shadow-xs">
            Tidak ada pesanan yang sesuai filter.
          </div>
        ) : (
          filteredOrders.map((ord) => (
            <AdminOrderCard
              key={ord.id}
              order={ord}
              onUpdateStatus={onUpdateStatus}
              onOpenCredentialsModal={onOpenCredentialsModal}
              onWhatsAppChat={handleWhatsAppChat}
            />
          ))
        )}
      </div>
    </div>
  );
};
