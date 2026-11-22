'use client';

import React from 'react';
import { Product } from '../../../types/product';
import { AlertTriangle } from 'lucide-react';
import { Button } from '../../ui/button';

interface AdminDeleteProductDialogProps {
  product: Product | null;
  onClose: () => void;
  onConfirm: (productId: string) => void;
}

export const AdminDeleteProductDialog: React.FC<AdminDeleteProductDialogProps> = ({
  product,
  onClose,
  onConfirm,
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-white border border-zinc-200 rounded-3xl p-6 shadow-2xl space-y-4 text-center">
        <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-6 h-6 stroke-[2.2]" />
        </div>

        <div>
          <h3 className="text-base font-bold text-zinc-950">
            Hapus {product.name}?
          </h3>
          <p className="text-xs text-zinc-500 mt-1">
            Produk ini dan seluruh variannya akan dihapus dari katalog toko.
          </p>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 rounded-2xl border-zinc-200 text-xs font-bold"
          >
            Batal
          </Button>
          <Button
            onClick={() => onConfirm(product.id)}
            className="flex-1 rounded-2xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs cursor-pointer active:scale-95"
          >
            Ya, Hapus
          </Button>
        </div>
      </div>
    </div>
  );
};
