import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  className,
  maxWidth = 'lg',
}) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClass = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  }[maxWidth];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className={cn(
          'w-full bg-white rounded-t-[32px] sm:rounded-3xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200',
          maxWidthClass,
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        {(title || subtitle) && (
          <div className="p-5 pb-3 flex items-center justify-between border-b border-zinc-100">
            <div>
              {subtitle && (
                <span className="text-[11px] font-bold tracking-wider text-emerald-600 uppercase block">
                  {subtitle}
                </span>
              )}
              {title && (
                <h3 className="text-base font-bold text-zinc-950">
                  {title}
                </h3>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-zinc-100 text-zinc-500 hover:text-zinc-950 active:scale-95 transition-all"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};
