import React from 'react';

interface PaymentOption {
  id: string;
  name: string;
}

interface CheckoutModalPaymentMethodsProps {
  options: PaymentOption[];
  selectedMethod: string;
  onSelect: (name: string) => void;
}

export const CheckoutModalPaymentMethods: React.FC<CheckoutModalPaymentMethodsProps> = ({
  options,
  selectedMethod,
  onSelect,
}) => {
  return (
    <div>
      <label className="block text-[#2F2552] font-bold mb-1.5 font-heading">
        Pilih Metode Pembayaran
      </label>
      <div className="space-y-1.5">
        {options.map((opt) => (
          <label
            key={opt.id}
            className={`flex items-center gap-2.5 p-2.5 rounded-xl border-[2px] cursor-pointer transition-all ${
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
              className="accent-[#4A3A85]"
            />
            <span className="text-xs text-[#2F2552] font-semibold">{opt.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
