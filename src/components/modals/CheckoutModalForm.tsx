'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { CartItem } from '../../types/cart';
import { useStore } from '../../context/StoreContext';
import { Input } from '../ui/input';
import { CheckoutModalOrderSummary } from './CheckoutModalOrderSummary';
import { CheckoutModalPaymentMethods } from './CheckoutModalPaymentMethods';

interface CheckoutModalFormProps {
  items: CartItem[];
  totalAmount: number;
  name: string;
  setName: (v: string) => void;
  whatsapp: string;
  setWhatsapp: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  notes: string;
  setNotes: (v: string) => void;
  paymentMethod: string;
  setPaymentMethod: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const PAYMENT_OPTIONS = [
  { id: 'qris', name: 'QRIS (Semua E-Wallet & M-Banking)' },
  { id: 'bca', name: 'Transfer Bank BCA' },
  { id: 'mandiri', name: 'Transfer Bank Mandiri' },
  { id: 'dana', name: 'DANA / GoPay / ShopeePay' },
];

export const CheckoutModalForm: React.FC<CheckoutModalFormProps> = ({
  items,
  totalAmount,
  name,
  setName,
  whatsapp,
  setWhatsapp,
  email,
  setEmail,
  notes,
  setNotes,
  paymentMethod,
  setPaymentMethod,
  onSubmit,
}) => {
  const { settings } = useStore();

  return (
    <form onSubmit={onSubmit} className="flex flex-col flex-1 overflow-hidden">
      <div className="p-5 overflow-y-auto space-y-4 text-xs">
        <CheckoutModalOrderSummary items={items} totalAmount={totalAmount} />

        <div className="space-y-3">
          <div>
            <label className="block text-zinc-700 font-bold mb-1">
              Nama Lengkap <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              required
              placeholder="Contoh: Nadia Safira"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-zinc-700 font-bold mb-1">
              Nomor WhatsApp <span className="text-red-500">*</span>
            </label>
            <Input
              type="tel"
              required
              placeholder="Contoh: 08123456789"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-zinc-700 font-bold mb-1">
              Email Anda <span className="text-zinc-400 font-normal">(Diperlukan jika paket Invite Spotify/Canva/YouTube)</span>
            </label>
            <Input
              type="email"
              placeholder="Contoh: user@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-zinc-700 font-bold mb-1">
              Catatan Pesanan <span className="text-zinc-400 font-normal">(Opsional)</span>
            </label>
            <Input
              type="text"
              placeholder="Contoh: Mau request nama profil di Netflix 'Nadia'"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <CheckoutModalPaymentMethods
            options={PAYMENT_OPTIONS}
            selectedMethod={paymentMethod}
            onSelect={setPaymentMethod}
          />
        </div>
      </div>

      <div className="p-4 bg-white border-t border-[#E7DFFB]">
        <button
          type="submit"
          className="w-full py-3.5 rounded-full bg-[#4A3A85] hover:bg-[#3d2f70] text-[#F5F1FF] font-extrabold text-xs flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 fill-[#FFE59A] text-[#FFE59A]" />
          <span>Kirim Pesanan ke WhatsApp Admin</span>
        </button>
        <p className="text-[10px] text-[#7B6FA3] font-semibold text-center mt-2">
          Order otomatis diproses ke WhatsApp resmi {settings.name}.
        </p>
      </div>
    </form>
  );
};
