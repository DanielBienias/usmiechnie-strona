import React, { useEffect } from 'react';
import { Icon } from './Icon';

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  eyebrow?: string;
  children: React.ReactNode;
  tone?: 'light' | 'dark';
}

/**
 * Arkusz dolny (bottom sheet) – natywny wzorzec mobilny.
 * Zamyka się po tapnięciu w tło, w uchwyt lub w X.
 */
export const BottomSheet: React.FC<BottomSheetProps> = ({ open, onClose, title, eyebrow, children, tone = 'light' }) => {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [open, onClose]);

  if (!open) return null;

  const dark = tone === 'dark';

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-clinic-text/40 backdrop-blur-sm animate-fade" onClick={onClose} />
      <div
        className={`relative w-full max-w-lg max-h-[92vh] rounded-t-4xl shadow-float animate-sheet flex flex-col ${dark ? 'bg-clinic-text text-white' : 'bg-clinic-paper text-clinic-text'}`}
      >
        {/* uchwyt */}
        <button onClick={onClose} aria-label="Zamknij" className="pt-3 pb-2 flex justify-center w-full">
          <span className={`h-1.5 w-10 rounded-full ${dark ? 'bg-white/30' : 'bg-clinic-text/20'}`} />
        </button>

        {(title || eyebrow) && (
          <div className="px-6 pt-2 pb-6 flex items-start justify-between gap-4">
            <div>
              {eyebrow && <span className={`block text-[11px] font-semibold tracking-[0.18em] uppercase mb-1 ${dark ? 'text-clinic-primary' : 'text-clinic-primaryDark'}`}>{eyebrow}</span>}
              {title && <h3 className="font-serif text-2xl leading-tight">{title}</h3>}
            </div>
            <button onClick={onClose} aria-label="Zamknij" className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${dark ? 'bg-white/10 text-white' : 'bg-clinic-sand text-clinic-text'}`}>
              <Icon name="Close" size={16} />
            </button>
          </div>
        )}

        <div className="overflow-y-auto no-scrollbar px-6 pb-10 safe-b">
          {children}
        </div>
      </div>
    </div>
  );
};
