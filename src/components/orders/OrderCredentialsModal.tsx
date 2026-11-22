'use client';

import React from 'react';
import { X, ShieldCheck, MessageCircle } from 'lucide-react';
import { CustomerOrder, OrderStatus } from '../../types/order';
import { useStore } from '../../context/StoreContext';
import { OrderCredentialsAccountBox } from './OrderCredentialsAccountBox';

interface OrderCredentialsModalProps {
  order: CustomerOrder | null;
  onClose: () => void;
}

export const OrderCredentialsModal: React.FC<OrderCredentialsModalProps> = ({
  order,
  onClose,
}) => {
  const { settings } = useStore();
  if (!order) return null;

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

  const handleAdminHelp = () => {
    const text = `Halo Admin *${settings.name}*! 👋\nSaya mau tanya seputar pesanan #${order.invoiceNumber}`;
    window.open(`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#2F2552]/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-white rounded-t-[32px] sm:rounded-3xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom-8 duration-300 border-[1.5px] border-[#E7DFFB]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 pb-3 flex items-center justify-between border-b border-[#E7DFFB]/60">
          <div>
            <span className="text-[10px] font-bold text-[#7B6FA3] block uppercase">
              Rincian Pesanan
            </span>
            <h3 className="text-base font-bold font-heading text-[#4A3A85]">
              #{order.invoiceNumber}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            {getStatusBadge(order.status)}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-[#F5F1FF] text-[#7B6FA3] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          {/* Order Items */}
          <div className="space-y-2">
            <span className="font-bold font-heading text-[#4A3A85] block">Aplikasi:</span>
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-2xl bg-[#F5F1FF] border border-[#E7DFFB]"
              >
                <div>
                  <h4 className="font-bold text-[#2F2552]">{item.productName}</h4>
                  <span className="text-[11px] text-[#7B6FA3] block">
                    {item.variantName} x {item.quantity}
                  </span>
                </div>
                <span className="font-extrabold text-[#4A3A85]">
                  Rp{(item.price * item.quantity).toLocaleString('id-ID')}
                </span>
              </div>
            ))}
          </div>

          {/* Account Credentials / Message */}
          {order.accountDetails && <OrderCredentialsAccountBox details={order.accountDetails} />}

          {/* Total Row */}
          <div className="p-3.5 rounded-2xl bg-[#F5F1FF] border border-[#E7DFFB] flex justify-between items-center font-extrabold font-heading text-sm text-[#4A3A85]">
            <span>Total Pembayaran:</span>
            <span>Rp{order.totalAmount.toLocaleString('id-ID')}</span>
          </div>

          {/* Buyer info */}
          <div className="p-3.5 rounded-2xl bg-white border border-[#E7DFFB] space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-[#7B6FA3] font-semibold">Nama:</span>
              <span className="font-bold text-[#2F2552]">{order.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#7B6FA3] font-semibold">WhatsApp:</span>
              <span className="font-bold text-[#2F2552]">{order.customerWhatsapp}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#7B6FA3] font-semibold">Metode:</span>
              <span className="font-bold text-[#2F2552]">{order.paymentMethod}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-[#E7DFFB] flex items-center gap-2">
          <button
            onClick={handleAdminHelp}
            className="flex-1 py-3 px-4 rounded-full bg-[#FFF4CC] border border-[#FFE59A] hover:bg-[#ffe082] text-[#2F2552] font-extrabold text-xs flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer shadow-xs"
          >
            <MessageCircle className="w-4 h-4 fill-[#2F2552]" />
            <span>Tanya Admin</span>
          </button>
          <button
            onClick={onClose}
            className="py-3 px-5 rounded-full bg-[#4A3A85] hover:bg-[#3d2f70] text-white font-extrabold text-xs active:scale-95 transition-all cursor-pointer shadow-xs"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
