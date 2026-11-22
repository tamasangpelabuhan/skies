'use client';

import React from 'react';

interface ProductModalQuantityProps {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
}

export const ProductModalQuantity: React.FC<ProductModalQuantityProps> = ({
  quantity,
  onDecrease,
  onIncrease,
}) => {
  return (
    <div className="flex items-center justify-between p-3 rounded-2xl bg-zinc-100/80">
      <div>
        <span className="text-xs font-bold text-zinc-900 block">Jumlah Akun</span>
        <span className="text-[10px] text-zinc-500">Pesan beberapa akun sekaligus</span>
      </div>
      <div className="flex items-center gap-2 bg-white rounded-xl p-1 border border-zinc-200">
        <button
          type="button"
          onClick={onDecrease}
          className="w-7 h-7 rounded-lg bg-zinc-100 text-zinc-800 font-bold flex items-center justify-center hover:bg-zinc-200 active:scale-95 cursor-pointer"
        >
          -
        </button>
        <span className="w-8 text-center text-xs font-bold">{quantity}</span>
        <button
          type="button"
          onClick={onIncrease}
          className="w-7 h-7 rounded-lg bg-zinc-100 text-zinc-800 font-bold flex items-center justify-center hover:bg-zinc-200 active:scale-95 cursor-pointer"
        >
          +
        </button>
      </div>
    </div>
  );
};
