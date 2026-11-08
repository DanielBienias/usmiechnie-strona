import React, { useEffect, useState } from 'react';
import { CLINIC_PHONE } from '../constants';
import { Icon } from './Icon';

interface StickyCtaProps { onBookClick: () => void; }

/** Dolny, przyklejony pasek z główną akcją – pojawia się po przewinięciu hero. */
export const StickyCta: React.FC<StickyCtaProps> = ({ onBookClick }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-40 flex justify-center pointer-events-none transition-all duration-500 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
      <div className="w-full max-w-lg px-4 pb-4 safe-b flex gap-2">
        <button
          onClick={onBookClick}
          className="pointer-events-auto flex-1 h-14 rounded-full bg-clinic-text text-white font-semibold text-sm tracking-wide flex items-center justify-center gap-2 shadow-float active:scale-[0.98] transition-transform"
        >
          <Icon name="Calendar" size={16} className="text-clinic-primary" />
          Umów wizytę
        </button>
        <a
          href={`tel:${CLINIC_PHONE.replace(/\s/g, '')}`}
          aria-label="Zadzwoń"
          className="pointer-events-auto h-14 w-14 rounded-full bg-white text-clinic-text flex items-center justify-center shadow-float active:scale-95 transition-transform"
        >
          <Icon name="Phone" size={18} />
        </a>
      </div>
    </div>
  );
};
