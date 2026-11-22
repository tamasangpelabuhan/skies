'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useStore } from '../context/StoreContext';
import { CheckoutHeader } from './checkout/CheckoutHeader';
import { CheckoutStepper } from './checkout/CheckoutStepper';
import { CheckoutSummary } from './checkout/CheckoutSummary';
import { CheckoutBuyerForm } from './checkout/CheckoutBuyerForm';
import { CheckoutPaymentMethod } from './checkout/CheckoutPaymentMethod';
import { CheckoutSuccessView } from './checkout/CheckoutSuccessView';
import { CheckoutStickyBar } from './checkout/CheckoutStickyBar';
import { CheckoutEmptyState } from './checkout/CheckoutEmptyState';

const PAYMENT_OPTIONS = [
  { id: 'qris', name: 'QRIS', label: 'QRIS (Semua E-Wallet & M-Banking)' },
  { id: 'bca', name: 'BCA', label: 'Transfer Bank BCA' },
  { id: 'mandiri', name: 'Mandiri', label: 'Transfer Bank Mandiri' },
  { id: 'dana', name: 'DANA', label: 'DANA / GoPay / ShopeePay' },
];

function CheckoutContent() {
  const searchParams = useSearchParams();
  const { checkoutItems, completeOrder, products } = useStore();

  const slug = searchParams.get('slug');
  const variantId = searchParams.get('variant');
  const qtyParam = searchParams.get('qty');

  const currentProducts = products || [];
  const targetProduct =
    currentProducts.find((p) => p.slug === slug || p.id === slug) ||
    checkoutItems[0]?.product;

  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('QRIS');
  const [currentStep, setCurrentStep] = useState<2 | 3>(2);
  const [createdInvoice, setCreatedInvoice] = useState('');

  if (!targetProduct) {
    return <CheckoutEmptyState />;
  }

  const targetVariant =
    targetProduct.variants.find((v) => v.id === variantId) ||
    checkoutItems[0]?.variant ||
    targetProduct.variants[0] || {
      id: 'default',
      name: 'Standar',
      duration: '1 Bulan',
      type: 'Sharing',
      price: targetProduct.price,
      description: 'Paket langganan',
    };

  const quantity = qtyParam ? parseInt(qtyParam, 10) : (checkoutItems[0]?.quantity || 1);
  const totalPrice = targetVariant.price * quantity;

  const handlePayNow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !whatsapp.trim()) {
      alert('Mohon isi nama lengkap dan nomor WhatsApp Anda.');
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
    setCurrentStep(3);

    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F5F1FF] pb-36">
      <CheckoutHeader />

      <div className="max-w-2xl mx-auto space-y-6 pt-4 px-4 sm:px-0">
        <CheckoutStepper currentStep={currentStep} />

        {currentStep === 3 ? (
          <CheckoutSuccessView invoiceNumber={createdInvoice} />
        ) : (
          <form onSubmit={handlePayNow} className="space-y-6">
            <CheckoutSummary
              product={targetProduct}
              variant={targetVariant}
              totalPrice={totalPrice}
            />

            <CheckoutBuyerForm
              name={name}
              setName={setName}
              whatsapp={whatsapp}
              setWhatsapp={setWhatsapp}
              email={email}
              setEmail={setEmail}
              notes={notes}
              setNotes={setNotes}
            />

            <CheckoutPaymentMethod
              options={PAYMENT_OPTIONS}
              selectedMethod={paymentMethod}
              onSelect={setPaymentMethod}
            />

            <CheckoutStickyBar
              totalPrice={totalPrice}
              paymentMethod={paymentMethod}
            />
          </form>
        )}
      </div>
    </div>
  );
}

export const CheckoutView: React.FC = () => {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F5F1FF] flex items-center justify-center">Memuat checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
};
