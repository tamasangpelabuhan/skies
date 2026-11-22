import React from 'react';
import { CartItem } from '../../types/cart';

interface CheckoutModalOrderSummaryProps {
  items: CartItem[];
  totalAmount: number;
}

export const CheckoutModalOrderSummary: React.FC<CheckoutModalOrderSummaryProps> = ({
  items,
  totalAmount,
}) => {
  return (
    <div className="bg-[#F5F1FF] rounded-2xl p-3.5 border border-[#E7DFFB]">
      <span className="font-bold font-heading text-[#4A3A85] block mb-2">Item yang dipesan:</span>
      <div className="space-y-2">
        {items.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center text-xs">
            <div>
              <span className="font-bold text-[#2F2552]">{item.product.name}</span>
              <span className="text-[11px] text-[#7B6FA3] font-semibold block">
                {item.variant.name} ({item.variant.duration}) x {item.quantity}
              </span>
            </div>
            <span className="font-bold text-[#4A3A85]">
              Rp{(item.variant.price * item.quantity).toLocaleString('id-ID')}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 pt-2 border-t border-[#E7DFFB] flex justify-between font-extrabold font-heading text-sm text-[#4A3A85]">
        <span>Total Tagihan:</span>
        <span>Rp{totalAmount.toLocaleString('id-ID')}</span>
      </div>
    </div>
  );
};
