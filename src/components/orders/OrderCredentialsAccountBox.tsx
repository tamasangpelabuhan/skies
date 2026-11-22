'use client';

import React, { useState } from 'react';
import { CheckCircle2, Copy, Check } from 'lucide-react';
import { CustomerOrder } from '../../types/order';

interface OrderCredentialsAccountBoxProps {
  details: NonNullable<CustomerOrder['accountDetails']>;
}

export const OrderCredentialsAccountBox: React.FC<OrderCredentialsAccountBoxProps> = ({
  details,
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="p-4 rounded-2xl bg-[#CDEFD9]/50 border border-[#7ED6A5] space-y-2.5">
      <div className="flex items-center gap-1.5 text-[#1C6D41] font-bold font-heading">
        <CheckCircle2 className="w-4 h-4 text-[#1C6D41]" />
        <span>Akses Akun Anda</span>
      </div>

      {details.email && (
        <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-[#7ED6A5]/60">
          <div>
            <span className="text-[10px] text-[#7B6FA3] block">Email / Username:</span>
            <span className="font-bold text-[#2F2552]">{details.email}</span>
          </div>
          <button
            onClick={() => handleCopy(details.email || '', 'email')}
            className="p-1.5 text-[#7B6FA3] hover:text-[#4A3A85] cursor-pointer"
          >
            {copiedField === 'email' ? (
              <Check className="w-4 h-4 text-[#1C6D41]" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      )}

      {details.password && (
        <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-[#7ED6A5]/60">
          <div>
            <span className="text-[10px] text-[#7B6FA3] block">Password:</span>
            <span className="font-bold text-[#2F2552]">{details.password}</span>
          </div>
          <button
            onClick={() => handleCopy(details.password || '', 'password')}
            className="p-1.5 text-[#7B6FA3] hover:text-[#4A3A85] cursor-pointer"
          >
            {copiedField === 'password' ? (
              <Check className="w-4 h-4 text-[#1C6D41]" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      )}

      {details.pin && (
        <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-[#7ED6A5]/60">
          <div>
            <span className="text-[10px] text-[#7B6FA3] block">PIN Profil:</span>
            <span className="font-bold text-[#2F2552]">{details.pin}</span>
          </div>
          <button
            onClick={() => handleCopy(details.pin || '', 'pin')}
            className="p-1.5 text-[#7B6FA3] hover:text-[#4A3A85] cursor-pointer"
          >
            {copiedField === 'pin' ? (
              <Check className="w-4 h-4 text-[#1C6D41]" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      )}

      {details.message && (
        <p className="text-[11px] text-[#1C6D41] bg-white/70 p-2 rounded-xl">
          {details.message}
        </p>
      )}
    </div>
  );
};
