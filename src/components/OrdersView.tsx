'use client';

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CustomerOrder, OrderStatus } from '../types/order';
import { OrderSearchBar } from './orders/OrderSearchBar';
import { OrderStatusPills } from './orders/OrderStatusPills';
import { OrderCard } from './orders/OrderCard';
import { OrderHelpCard } from './orders/OrderHelpCard';
import { OrderCredentialsModal } from './orders/OrderCredentialsModal';

export const OrdersView: React.FC = () => {
  const { orders, settings } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | OrderStatus>('all');
  const [selectedOrder, setSelectedOrder] = useState<CustomerOrder | null>(null);

  // Status counts
  const counts = {
    total: orders.length,
    unpaid: orders.filter((o) => o.status === 'Belum dibayar').length,
    processing: orders.filter((o) => o.status === 'Diproses').length,
    completed: orders.filter((o) => o.status === 'Selesai').length,
  };

  // Filtered orders
  const filteredOrders = orders.filter((order) => {
    if (activeFilter !== 'all' && order.status !== activeFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchInvoice = order.invoiceNumber.toLowerCase().includes(q);
      const matchEmail = (order.customerEmail || '').toLowerCase().includes(q);
      const matchItem = order.items.some((item) =>
        item.productName.toLowerCase().includes(q)
      );
      return matchInvoice || matchEmail || matchItem;
    }
    return true;
  });

  const handlePayNow = (order: CustomerOrder) => {
    const text = `Halo Admin *${settings.name}*! 👋\nSaya mau konfirmasi pembayaran untuk pesanan saya:\n\n🧾 *No. Invoice:* #${order.invoiceNumber}\n💰 *Total:* Rp${order.totalAmount.toLocaleString('id-ID')}\n💳 *Metode:* ${order.paymentMethod}\n\nMohon info QRIS / Rekening pembayaran ya min. Terima kasih!`;
    const url = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleContactAdmin = () => {
    const text = `Halo Admin *${settings.name}*! 👋\nSaya butuh bantuan untuk mengecek status pesanan saya.`;
    const url = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="py-2 pb-24 space-y-5">
      {/* 1. Header */}
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-extrabold font-heading text-[#4A3A85] tracking-tight">
          Pesanan
        </h1>
        <p className="text-xs md:text-sm text-[#7B6FA3] font-semibold">
          Daftar riwayat pesanan dan status garansi akun kamu.
        </p>
      </div>

      {/* 2. Search */}
      <OrderSearchBar value={searchQuery} onChange={setSearchQuery} />

      {/* 3. Status Filters */}
      <OrderStatusPills
        activeFilter={activeFilter}
        onSelect={setActiveFilter}
        counts={counts}
      />

      {/* 4. Orders List or Empty */}
      {filteredOrders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onPayNow={handlePayNow}
              onViewDetails={setSelectedOrder}
            />
          ))}
        </div>
      ) : (
        <div className="p-8 text-center bg-white rounded-3xl border-[1.5px] border-[#E7DFFB] shadow-2xs space-y-2">
          <p className="text-xs font-bold text-[#2F2552]">Belum ada pesanan ditemukan</p>
          <p className="text-[11px] text-[#7B6FA3]">
            {searchQuery
              ? 'Coba periksa kembali nomor invoice atau email yang kamu masukkan.'
              : 'Pesanan yang telah kamu buat akan otomatis muncul di halaman ini.'}
          </p>
        </div>
      )}

      {/* 5. Help / Contact card */}
      <OrderHelpCard onContactAdmin={handleContactAdmin} />

      {/* 6. Credentials modal */}
      {selectedOrder && (
        <OrderCredentialsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};
