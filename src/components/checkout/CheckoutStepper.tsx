import React from 'react';

interface CheckoutStepperProps {
  currentStep: 2 | 3;
}

export const CheckoutStepper: React.FC<CheckoutStepperProps> = ({ currentStep }) => {
  return (
    <div className="flex items-center justify-center gap-3 py-2 text-xs font-heading">
      {/* Step 1: Paket */}
      <div className="flex items-center gap-1.5 text-[#7B6FA3] font-semibold">
        <div className="w-5 h-5 rounded-full bg-[#CDEFD9] text-[#1C6D41] flex items-center justify-center text-[10px] font-bold">
          ✓
        </div>
        <span>Paket</span>
      </div>

      <div className="w-6 h-px bg-[#E7DFFB]" />

      {/* Step 2: Checkout */}
      <div
        className={`flex items-center gap-1.5 font-bold ${
          currentStep === 2 ? 'text-[#4A3A85]' : 'text-[#7B6FA3]'
        }`}
      >
        <div
          className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
            currentStep === 2 ? 'bg-[#4A3A85] text-white' : 'bg-[#E4DCFB] text-[#4A3A85]'
          }`}
        >
          {currentStep > 2 ? '✓' : '2'}
        </div>
        <span>Checkout</span>
      </div>

      <div className="w-6 h-px bg-[#E7DFFB]" />

      {/* Step 3: Bayar */}
      <div
        className={`flex items-center gap-1.5 font-semibold ${
          currentStep === 3 ? 'text-[#4A3A85] font-bold' : 'text-[#7B6FA3]'
        }`}
      >
        <div
          className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
            currentStep === 3 ? 'bg-[#FFE59A] text-[#2F2552]' : 'bg-[#E7DFFB] text-[#7B6FA3]'
          }`}
        >
          3
        </div>
        <span>Bayar</span>
      </div>
    </div>
  );
};
