'use client';

import React, { useRef, useState } from 'react';
import { UploadCloud, Image as ImageIcon, X, Loader2 } from 'lucide-react';
import { AppLogo } from '../../AppLogo';
import { Skeleton } from '../../ui/skeleton';
import { compressImageFile } from '../../../lib/image-compress';

interface AdminProductImageUploaderProps {
  value: string;
  onChange: (val: string) => void;
}

export const AdminProductImageUploader: React.FC<AdminProductImageUploaderProps> = ({
  value,
  onChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setIsProcessing(true);
        // Otomatis kompres gambar ke WebP ringan (~20KB) agar hemat dan muat di Firestore
        const compressed = await compressImageFile(file, 360, 0.82);
        onChange(compressed);
      } catch (err) {
        console.error('Image processing fallback:', err);
        const reader = new FileReader();
        reader.onload = (ev) => {
          if (ev.target?.result) onChange(ev.target.result as string);
        };
        reader.readAsDataURL(file);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const hasImage = Boolean(value && value.trim());

  return (
    <div className="space-y-2">
      <label className="block text-zinc-700 font-bold text-xs">
        Logo / Gambar Aplikasi (Import File) *
      </label>

      <div className="flex items-center gap-3">
        {/* Preview / Skeleton Container */}
        <div className="relative w-14 h-14 rounded-2xl bg-zinc-100 border border-zinc-200 overflow-hidden flex items-center justify-center shrink-0 shadow-xs">
          {isProcessing ? (
            <div className="w-full h-full flex items-center justify-center bg-zinc-100">
              <Loader2 className="w-5 h-5 animate-spin text-zinc-700" />
            </div>
          ) : hasImage ? (
            <>
              <AppLogo type={value} size="md" className="w-14 h-14 rounded-2xl" />
              <button
                type="button"
                onClick={() => onChange('')}
                className="absolute top-1 right-1 p-0.5 bg-zinc-950/80 hover:bg-red-600 text-white rounded-full shadow-xs cursor-pointer transition-colors"
                title="Hapus gambar"
              >
                <X className="w-3 h-3" />
              </button>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center relative">
              <Skeleton className="w-full h-full rounded-2xl" />
              <ImageIcon className="w-5 h-5 text-zinc-400 absolute pointer-events-none" />
            </div>
          )}
        </div>

        {/* Upload Trigger Area */}
        <div
          onClick={() => !isProcessing && fileInputRef.current?.click()}
          className="flex-1 p-3 rounded-2xl border-2 border-dashed border-zinc-200 hover:border-zinc-950 bg-zinc-50/50 hover:bg-zinc-50 flex items-center gap-2.5 cursor-pointer transition-all"
        >
          <div className="w-8 h-8 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-zinc-700 shrink-0">
            {isProcessing ? <Loader2 className="w-4 h-4 animate-spin text-zinc-700" /> : <UploadCloud className="w-4 h-4" />}
          </div>
          <div className="min-w-0">
            <span className="text-xs font-bold text-zinc-950 block truncate">
              {isProcessing ? 'Mengoptimalkan Gambar...' : hasImage ? 'Ganti File Gambar' : 'Pilih File Gambar dari Komputer'}
            </span>
            <span className="text-[10px] text-zinc-400 block">
              PNG, JPG, SVG, WebP (Otomatis Dikompresi & Disimpan di Cloud)
            </span>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            disabled={isProcessing}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
};
