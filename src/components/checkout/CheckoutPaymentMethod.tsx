import React from 'react';
import { Card } from '../ui/card';

interface PaymentOption {
  id: string;
  name: string;
  label: string;
}

interface CheckoutPaymentMethodProps {
  options: PaymentOption[];
  selectedMethod: string;
  onSelect: (name: string) => void;
}

export const CheckoutPaymentMethod: React.FC<CheckoutPaymentMethodProps> = ({
  options,
  selectedMethod,
  onSelect,
}) => {
  return (
    <Card className="p-5 space-y-3 border-[1.5px] border-[#E7DFFB]">
      <h3 className="text-xs font-bold font-heading text-[#4A3A85] uppercase tracking-wider">
        Pilih Metode Pembayaran
      </h3>

      <div className="space-y-2">
        {options.map((opt) => (
          <label
            key={opt.id}
            className={`flex items-center gap-3 p-3.5 rounded-2xl border-[2px] cursor-pointer transition-all ${
              selectedMethod === opt.name
                ? 'border-[#4A3A85] bg-[#FFF4CC] font-bold text-[#2F2552] shadow-xs'
                : 'border-[#E7DFFB] text-[#7B6FA3] bg-white hover:border-[#B7A3F2]'
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              checked={selectedMethod === opt.name}
              onChange={() => onSelect(opt.name)}
              className="accent-[#4A3A85] w-4 h-4 cursor-pointer"
            />
            <span className="text-xs text-[#2F2552] font-semibold">{opt.label}</span>
          </label>
        ))}
      </div>
    </Card>
  );
};
