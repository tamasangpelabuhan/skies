'use client';

import React, { useState, useEffect } from 'react';
import { X, KeyRound, MessageCircle, Check } from 'lucide-react';
import { CustomerOrder } from '../../types/order';
import { buildAdminDeliveryWhatsAppUrl } from '../../lib/admin-utils';
import { AdminCredentialsFormFields } from './AdminCredentialsFormFields';
import { Button } from '../ui/button';

interface AdminCredentialsModalProps {
  order: CustomerOrder | null;
  onClose: () => void;
  onSave: (orderId: string, credentials: NonNullable<CustomerOrder['accountDetails']>) => void;
}

export const AdminCredentialsModal: React.FC<AdminCredentialsModalProps> = ({
  order,
  onClose,
  onSave,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileName, setProfileName] = useState('');
  const [pin, setPin] = useState('');
  const [message, setMessage] = useState('Informasi akun sudah aktif dan siap digunakan.');

  useEffect(() => {
    if (order?.accountDetails) {
      setEmail(order.accountDetails.email || '');
      setPassword(order.accountDetails.password || '');
      setProfileName(order.accountDetails.profileName || '');
      setPin(order.accountDetails.pin || '');
      setMessage(order.accountDetails.message || 'Informasi akun sudah aktif dan siap digunakan.');
    } else {
      setEmail('');
      setPassword('');
      setProfileName('');
      setPin('');
      setMessage('Informasi akun sudah aktif dan siap digunakan.');
    }
  }, [order]);

  if (!order) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(order.id, { email, password, profileName, pin, message });
    onClose();
  };

  const handleSendViaWhatsApp = () => {
    const url = buildAdminDeliveryWhatsAppUrl(order, {
      email,
      password,
      profileName,
      pin,
      message,
    });
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">
        <div className="p-5 border-b border-zinc-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-zinc-950 text-white flex items-center justify-center shadow-xs">
              <KeyRound className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-950">Kirim Kredensial Akun</h3>
              <span className="text-[11px] text-zinc-400">{order.invoiceNumber} • {order.customerName}</span>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-zinc-400 hover:text-zinc-700 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs">
          <AdminCredentialsFormFields
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            profileName={profileName}
            setProfileName={setProfileName}
            pin={pin}
            setPin={setPin}
            message={message}
            setMessage={setMessage}
          />

          <div className="pt-3 border-t border-zinc-100 flex items-center gap-2.5">
            <Button
              type="submit"
              className="flex-1 py-3 rounded-2xl bg-zinc-950 hover:bg-zinc-800 text-white font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
            >
              <Check className="w-4 h-4" />
              <span>Simpan & Selesai</span>
            </Button>
            <Button
              type="button"
              onClick={handleSendViaWhatsApp}
              className="py-3 px-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Kirim ke WA</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
