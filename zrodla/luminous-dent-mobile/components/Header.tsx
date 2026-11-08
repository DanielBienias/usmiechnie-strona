import React from 'react';
import { CLINIC_PHONE } from '../constants';
import { Icon } from './Icon';

interface HeaderProps {
  onBack?: () => void;
  title?: string;
  onBookClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onBack, title, onBookClick }) => {
  // SUB-VIEW HEADER (Back button + Title) - Navigation mode
  if (onBack) {
    return (
      <>
        <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
          <div className="w-full max-w-lg bg-clinic-primary shadow-md px-4 py-3 flex items-center gap-4 pointer-events-auto border-b border-white/10 rounded-b-2xl">
             <button 
                onClick={onBack}
                className="p-1.5 -ml-2 rounded-full hover:bg-white/10 text-white transition-colors"
              >
                <Icon name="Back" size={20} />
              </button>
              <h1 className="font-serif font-bold text-white text-base leading-tight truncate flex-1 pt-0.5">
                {title}
              </h1>
          </div>
        </header>
        {/* Spacer for fixed header */}
        <div className="h-[60px] w-full bg-clinic-bg"></div>
      </>
    );
  }

  // HOME VIEW HEADER (Brand Left + Buttons Right)
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
        {/* Background container light theme - Increased vertical padding (py-4) for more whitespace */}
        <div className="w-full max-w-lg pointer-events-auto px-4 py-4 bg-clinic-bg/95 backdrop-blur-md shadow-sm rounded-b-2xl border-b border-white/50 flex items-center justify-between gap-2">
          
          {/* Left: Brand Name */}
          <div className="flex-shrink-0 pt-1">
            <span className="font-serif font-bold text-xl text-clinic-text tracking-tight">
              uśmiechnie
            </span>
          </div>

          {/* Right: Action Buttons (Compact) */}
          <div className="flex gap-2">
            {/* Tile 1: Online Booking */}
            <button 
              onClick={onBookClick}
              className="bg-clinic-text text-white flex flex-row items-center justify-center gap-1.5 h-10 px-2 sm:px-3 rounded-lg shadow-md hover:bg-clinic-text/90 transition-all active:scale-95 border border-white/5 cursor-pointer"
            >
               <Icon name="Calendar" size={14} className="text-clinic-primary" />
               <span className="font-sans font-bold text-[10px] uppercase tracking-wider text-center block">
                 Rezerwuj
               </span>
            </button>

            {/* Tile 2: Call */}
            <a 
              href={`tel:${CLINIC_PHONE.replace(/\s/g, '')}`}
              className="bg-clinic-primary text-white flex flex-row items-center justify-center gap-1.5 h-10 px-2 sm:px-3 rounded-lg shadow-md hover:bg-clinic-primaryDark transition-all active:scale-95 border border-white/10"
            >
               <Icon name="Phone" size={14} className="text-white" />
               <span className="font-sans font-bold text-[10px] uppercase tracking-wider text-center block">
                 Zadzwoń
               </span>
            </a>
          </div>

        </div>
      </header>
      
      {/* Spacer matched to bg-clinic-bg for the new light hero design */}
      <div className="h-[90px] w-full bg-clinic-bg"></div>
    </>
  );
};