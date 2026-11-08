import React from 'react';
import { Icon } from './Icon';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-clinic-text text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-clinic-primary/20 flex items-center justify-center text-clinic-primary">
              <Icon name="FolderArchive" size={20} />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg leading-tight">Pobierz całą stronę</h3>
              <p className="text-xs text-white/60 font-sans">Kompletna paczka ze zdjęciami i treścią</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
          >
            <Icon name="Close" size={18} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 overflow-y-auto space-y-5 text-clinic-text">
          {/* Status badge */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-3 flex items-start gap-3">
            <div className="text-green-600 mt-0.5">
              <Icon name="Check" size={18} />
            </div>
            <div className="text-xs text-green-900 leading-relaxed">
              <strong>Wszystkie zdjęcia zostały pobrane lokalnie!</strong> Pliki nie korzystają już z zewnętrznych hostingów – strona działa w 100% offline i jest samowystarczalna.
            </div>
          </div>

          {/* Option 1: Ready static site (Recommended for instant deployment) */}
          <div className="border-2 border-clinic-primary/40 hover:border-clinic-primary bg-clinic-sand/10 rounded-xl p-4 transition-all">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <span className="inline-block bg-clinic-primary text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-1">
                  Gotowa strona (Zalecane)
                </span>
                <h4 className="font-serif font-bold text-base text-clinic-text">
                  Paczka produkcyjna (HTML + JS + Zdjęcia)
                </h4>
                <p className="text-xs text-clinic-subtext mt-1 leading-snug">
                  Gotowa do wgrania na dowolny hosting (FTP, cPanel, Cyberfolks, Netlify itp.) lub uruchomienia bez instalacji.
                </p>
              </div>
            </div>

            <div className="mt-3">
              <a
                href="/pobierz/gabinet-stomatologiczny-gotowa-strona.zip"
                download="gabinet-stomatologiczny-gotowa-strona.zip"
                className="w-full bg-clinic-primary hover:bg-clinic-primaryDark text-white py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
              >
                <Icon name="Download" size={16} />
                <span>Pobierz gotową stronę (.ZIP ~9.5 MB)</span>
              </a>
            </div>
          </div>

          {/* Option 2: Full Source Code */}
          <div className="border border-gray-200 hover:border-clinic-primary/50 rounded-xl p-4 transition-all">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <span className="inline-block bg-gray-200 text-gray-700 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-1">
                  Kod źródłowy
                </span>
                <h4 className="font-serif font-bold text-base text-clinic-text">
                  Pełny projekt źródłowy (Vite + React)
                </h4>
                <p className="text-xs text-clinic-subtext mt-1 leading-snug">
                  Zawiera pełen kod TypeScript, komponenty, konfiguracje i folder <code className="text-[11px] bg-gray-100 px-1 py-0.5 rounded">public/images</code> do edycji.
                </p>
              </div>
            </div>

            <div className="mt-3">
              <a
                href="/pobierz/gabinet-stomatologiczny-kod-zrodlowy.zip"
                download="gabinet-stomatologiczny-kod-zrodlowy.zip"
                className="w-full bg-clinic-text hover:bg-black text-white py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
              >
                <Icon name="FileCode" size={16} />
                <span>Pobierz kod źródłowy (.ZIP ~9.4 MB)</span>
              </a>
            </div>
          </div>

          {/* Assets Checklist */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <h5 className="font-bold text-xs uppercase tracking-wider text-clinic-subtext mb-2">
              Zawartość paczki:
            </h5>
            <ul className="text-xs space-y-1.5 text-gray-600">
              <li className="flex items-center gap-2">
                <span className="text-clinic-primary font-bold">✓</span>
                <span><strong>9 pobranych zdjęć gabinetu i zespołu:</strong> hero, wnętrze, mikroskop, fotele, białe plamy, strefa relaksu oraz portrety lekarzy.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-clinic-primary font-bold">✓</span>
                <span><strong>Kompletny cennik i usługi:</strong> stomatologia zachowawcza, estetyczna, chirurgia, profilaktyka.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-clinic-primary font-bold">✓</span>
                <span><strong>Interaktywny kreator rezerwacji:</strong> 3-krokowy formularz wyboru terminu i kontaktu.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-clinic-primary font-bold">✓</span>
                <span><strong>Opinie pacjentów i blog:</strong> 4 artykuły tematyczne ze zdjęciami.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-clinic-subtext hover:bg-gray-200 transition-colors"
          >
            Zamknij
          </button>
        </div>
      </div>
    </div>
  );
};
