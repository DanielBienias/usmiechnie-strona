import React from 'react';
import { CLINIC_PHONE } from '../constants';
import { Icon } from './Icon';

interface HeaderProps {
  onBookClick?: () => void;
}

/** Pływające przyciski akcji nad zdjęciem – bez belki. */
export const Header: React.FC<HeaderProps> = ({ onBookClick }) => (
  <header className="fixed top-0 left-0 right-0 z-40 flex justify-center pointer-events-none safe-t">
    <div className="w-full max-w-lg px-4 pt-[calc(14vw+40px)] flex items-center justify-start gap-2">
      <button
        onClick={onBookClick}
        className="pointer-events-auto h-10 px-4 rounded-full bg-clinic-text/90 backdrop-blur-md text-white text-[11px] font-semibold tracking-[0.14em] uppercase flex items-center gap-2 shadow-float active:scale-95 transition-transform"
      >
        <Icon name="Calendar" size={14} className="text-clinic-primary" />
        Rezerwuj
      </button>
      <a
        href={`tel:${CLINIC_PHONE.replace(/\s/g, '')}`}
        aria-label="Zadzwoń"
        className="pointer-events-auto h-10 w-10 rounded-full bg-white/85 backdrop-blur-md text-clinic-text flex items-center justify-center shadow-float active:scale-95 transition-transform"
      >
        <Icon name="Phone" size={16} />
      </a>
    </div>
  </header>
);
