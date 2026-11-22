'use client';

import React from 'react';
import { Card } from '../ui/card';
import { Input } from '../ui/input';

interface CheckoutBuyerFormProps {
  name: string;
  setName: (v: string) => void;
  whatsapp: string;
  setWhatsapp: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  notes: string;
  setNotes: (v: string) => void;
}

export const CheckoutBuyerForm: React.FC<CheckoutBuyerFormProps> = ({
  name,
  setName,
  whatsapp,
  setWhatsapp,
  email,
  setEmail,
  notes,
  setNotes,
}) => {
  return (
    <Card className="p-5 space-y-4 border-[1.5px] border-[#E7DFFB]">
      <h3 className="text-xs font-bold font-heading text-[#4A3A85] uppercase tracking-wider">
        Data Pembeli
      </h3>

      <div className="space-y-3 text-xs">
        <div>
          <label className="block text-[#2F2552] font-bold mb-1">
            Nama Lengkap <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            required
            placeholder="Contoh: Nadia Safira"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-[1.5px] border-[#E7DFFB] focus-visible:ring-[#4A3A85] rounded-xl text-[#2F2552]"
          />
        </div>

        <div>
          <label className="block text-[#2F2552] font-bold mb-1">
            Nomor WhatsApp <span className="text-red-500">*</span>
          </label>
          <Input
            type="tel"
            required
            placeholder="Contoh: 081234567890"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            className="border-[1.5px] border-[#E7DFFB] focus-visible:ring-[#4A3A85] rounded-xl text-[#2F2552]"
          />
        </div>

        <div>
          <label className="block text-[#2F2552] font-bold mb-1">
            Email Penerima <span className="text-[#7B6FA3] text-[10px] font-normal">(opsional)</span>
          </label>
          <Input
            type="email"
            placeholder="emailkamu@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-[1.5px] border-[#E7DFFB] focus-visible:ring-[#4A3A85] rounded-xl text-[#2F2552]"
          />
        </div>

        <div>
          <label className="block text-[#2F2552] font-bold mb-1">
            Catatan Tambahan <span className="text-[#7B6FA3] text-[10px] font-normal">(opsional)</span>
          </label>
          <Input
            type="text"
            placeholder="Permintaan khusus / catatan untuk admin"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="border-[1.5px] border-[#E7DFFB] focus-visible:ring-[#4A3A85] rounded-xl text-[#2F2552]"
          />
        </div>
      </div>
    </Card>
  );
};
