'use client';

import React from 'react';
import { CustomerOrder, OrderStatus } from '../../types/order';
import { MessageCircle, KeyRound } from 'lucide-react';
import { Card } from '../ui/card';

interface AdminOrderCardProps {
  order: CustomerOrder;
  onUpdateStatus: (orderId: string, status: OrderStatus) => void;
  onOpenCredentialsModal: (order: CustomerOrder) => void;
  onWhatsAppChat: (order: CustomerOrder) => void;
}

export const AdminOrderCard: React.FC<AdminOrderCardProps> = ({
  order,
  onUpdateStatus,
  onOpenCredentialsModal,
  onWhatsAppChat,
}) => {
  return (
    <Card className="bg-white border border-zinc-200/90 rounded-3xl p-5 space-y-4 hover:border-zinc-300 transition-colors shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-zinc-100">
        <div className="flex items-center gap-2.5">
          <span className="text-xs font-extrabold text-zinc-950">
            {order.invoiceNumber}
          </span>
          <span className="text-[11px] text-zinc-400">• {order.createdAt}</span>
          <span className="text-[11px] text-zinc-500">• Bayar: {order.paymentMethod}</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`text-[10px] font-bold px-2.5 py-1 rounded-lg ${
              order.status === 'Selesai'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : order.status === 'Diproses'
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'bg-amber-50 text-amber-700 border border-amber-200'
            }`}
          >
            {order.status}
          </span>
        </div>
      </div>

      {/* Customer & Item Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div>
          <span className="text-zinc-400 text-[10px] uppercase font-bold block mb-1">
            Data Pembeli:
          </span>
          <span className="font-bold text-zinc-900 block">{order.customerName}</span>
          <span className="text-zinc-500 block">
            {order.customerWhatsapp} • {order.customerEmail}
          </span>
          {order.customerNotes && (
            <span className="text-zinc-500 italic block mt-0.5">
              Catatan: &ldquo;{order.customerNotes}&rdquo;
            </span>
          )}
        </div>

        <div>
          <span className="text-zinc-400 text-[10px] uppercase font-bold block mb-1">
            Item Pesanan:
          </span>
          <div className="space-y-1">
            {order.items.map((it, i) => (
              <div key={i} className="flex justify-between text-zinc-600">
                <span>
                  {it.productName} ({it.variantName}) x {it.quantity}
                </span>
                <span className="font-bold text-zinc-950">
                  Rp{(it.price * it.quantity).toLocaleString('id-ID')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-2 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-zinc-400 mr-1 font-medium">Ubah Status:</span>
          {(['Belum dibayar', 'Diproses', 'Selesai'] as const).map((s) => (
            <button
              key={s}
              onClick={() => onUpdateStatus(order.id, s)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                order.status === s
                  ? 'bg-zinc-950 text-white shadow-2xs'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenCredentialsModal(order)}
            className="px-3.5 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95 transition-all"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Input & Kirim Akun</span>
          </button>

          <button
            onClick={() => onWhatsAppChat(order)}
            className="px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95 transition-all"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white" />
            <span>Chat WA</span>
          </button>
        </div>
      </div>
    </Card>
  );
};
