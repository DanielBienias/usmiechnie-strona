import React, { useEffect, useState } from 'react';
import { CLINIC_PHONE } from '../constants';
import { Icon } from './Icon';

interface StickyCtaProps { onBookClick: () => void; }

const TEL = `tel:${CLINIC_PHONE.replace(/\s/g, '')}`;
const MAP_NAV = 'https://www.google.com/maps/dir/?api=1&destination=U%C5%9Bmiechnie+Stomatologia+Brzeg+Dolny';

const base =
  'pointer-events-auto flex-1 h-14 rounded-full flex flex-col items-center justify-center gap-1 text-[11px] font-semibold tracking-wide shadow-float active:scale-[0.98] transition-transform';

/** Dolny, przyklejony pasek: trzy równe akcje – telefon, rezerwacja, nawigacja. Pojawia się po przewinięciu hero. */
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
      <div className="w-full max-w-lg px-6 pb-[calc(1.25rem_+_env(safe-area-inset-bottom))] flex gap-3">
        <a href={TEL} className={`${base} bg-clinic-text text-white ring-1 ring-white/15`}>
          <Icon name="Phone" size={16} className="text-clinic-primary" />
          Zadzwoń
        </a>
        <button onClick={onBookClick} className={`${base} bg-white text-clinic-text`}>
          <Icon name="Calendar" size={16} className="text-clinic-primaryDark" />
          Umów wizytę
        </button>
        <a href={MAP_NAV} target="_blank" rel="noreferrer" className={`${base} bg-white text-clinic-text`}>
          <Icon name="MapPin" size={16} className="text-clinic-primaryDark" />
          Nawiguj
        </a>
      </div>
    </div>
  );
};
