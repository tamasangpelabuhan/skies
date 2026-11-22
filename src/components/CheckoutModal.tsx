'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CheckoutModalSuccess } from './modals/CheckoutModalSuccess';
import { CheckoutModalForm } from './modals/CheckoutModalForm';

export const CheckoutModal: React.FC = () => {
  const router = useRouter();
  const {
    isCheckoutModalOpen,
    setIsCheckoutModalOpen,
    checkoutItems,
    completeOrder,
  } = useStore();

  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('QRIS (Semua E-Wallet & M-Banking)');
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdInvoice, setCreatedInvoice] = useState('');

  if (!isCheckoutModalOpen) return null;

  const totalAmount = checkoutItems.reduce(
    (sum, item) => sum + item.variant.price * item.quantity,
    0
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !whatsapp.trim()) {
      alert('Mohon isi nama dan nomor WhatsApp Anda.');
      return;
    }

    const { order, whatsappUrl } = completeOrder({
      name,
      whatsapp,
      email: email.trim() || undefined,
      notes: notes.trim() || undefined,
      paymentMethod,
    });

    setCreatedInvoice(order.invoiceNumber);
    setIsSuccess(true);

    window.open(whatsappUrl, '_blank');
  };

  const handleFinish = () => {
    setIsSuccess(false);
    setIsCheckoutModalOpen(false);
    setName('');
    setWhatsapp('');
    setEmail('');
    setNotes('');
    router.push('/pesanan');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-white rounded-t-[32px] sm:rounded-3xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom-8 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 pb-3 flex items-center justify-between border-b border-zinc-100">
          <div>
            <span className="text-[11px] font-bold tracking-wider text-emerald-600 uppercase">
              WhatsApp Checkout
            </span>
            <h3 className="text-base font-bold text-zinc-950">
              {isSuccess ? 'Pesanan Berhasil Dikirim!' : 'Konfirmasi Pesanan'}
            </h3>
          </div>
          <button
            onClick={() => {
              if (isSuccess) handleFinish();
              else setIsCheckoutModalOpen(false);
            }}
            className="p-2 rounded-full hover:bg-zinc-100 text-zinc-500 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal View Content */}
        {isSuccess ? (
          <CheckoutModalSuccess
            invoiceNumber={createdInvoice}
            onFinish={handleFinish}
          />
        ) : (
          <CheckoutModalForm
            items={checkoutItems}
            totalAmount={totalAmount}
            name={name}
            setName={setName}
            whatsapp={whatsapp}
            setWhatsapp={setWhatsapp}
            email={email}
            setEmail={setEmail}
            notes={notes}
            setNotes={setNotes}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};
