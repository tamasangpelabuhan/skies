import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CheckoutStickyBarProps {
  totalPrice: number;
  paymentMethod: string;
}

export const CheckoutStickyBar: React.FC<CheckoutStickyBarProps> = ({
  totalPrice,
  paymentMethod,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-[#E7DFFB] shadow-xl pb-3 pt-3">
      <div className="max-w-2xl mx-auto px-4 space-y-2.5">
        {/* Total Pembayaran row */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] text-[#7B6FA3] block font-semibold">
              Total pembayaran
            </span>
            <span className="text-xs text-[#2F2552] font-bold block">
              1 paket • {paymentMethod}
            </span>
          </div>

          <div className="text-right">
            <span className="text-lg md:text-xl font-extrabold font-heading text-[#4A3A85] block leading-tight">
              Rp{totalPrice.toLocaleString('id-ID')}
            </span>
          </div>
        </div>

        {/* Bayar sekarang button */}
        <button
          type="submit"
          className="w-full py-3.5 rounded-full bg-[#4A3A85] hover:bg-[#3d2f70] text-[#F5F1FF] font-extrabold text-xs md:text-sm flex items-center justify-center gap-2 active:scale-98 transition-all shadow-md group cursor-pointer"
        >
          <span>Bayar sekarang</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* iPhone Home Indicator bar */}
        <div className="w-32 h-1 bg-[#4A3A85]/20 rounded-full mx-auto mt-2" />
      </div>
    </div>
  );
};
