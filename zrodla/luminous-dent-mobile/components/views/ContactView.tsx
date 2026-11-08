import React from 'react';
import { CLINIC_ADDRESS, CLINIC_PHONE, CLINIC_EMAIL } from '../../constants';
import { Icon } from '../Icon';

export const ContactView: React.FC = () => {
  return (
    <div className="p-4 space-y-8 pb-20 animate-fade-in">
      <div className="text-center">
        <h2 className="text-3xl font-serif text-clinic-primary">Kontakt</h2>
      </div>

      <div className="bg-white p-6 shadow-sm border-t-4 border-clinic-primary rounded-xl">
        {/* Map Preview */}
        <div className="w-full h-64 bg-gray-100 rounded-lg overflow-hidden mb-8 shadow-inner border border-gray-200 group">
             <iframe 
                width="100%" 
                height="100%" 
                src="https://maps.google.com/maps?q=U%C5%9Bmiechnie%20Stomatologia%20Katarzyna%20Baziuk%20ul.%20Boles%C5%82awa%20Le%C5%9Bmiana%20U1/A1%20Brzeg%20Dolny&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                frameBorder="0" 
                scrolling="no" 
                className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
                title="Mapa dojazdu"
             ></iframe>
        </div>

        <ul className="space-y-8">
          <li className="flex flex-col items-center text-center gap-2 text-clinic-text">
            <div className="text-clinic-primary mb-1">
               <Icon name="MapPin" size={28} />
            </div>
            <div>
              <span className="block font-serif text-lg mb-1">Adres</span>
              <span className="text-sm font-light">{CLINIC_ADDRESS}</span>
            </div>
          </li>
          <li className="flex flex-col items-center text-center gap-2 text-clinic-text">
             <div className="text-clinic-primary mb-1">
               <Icon name="Phone" size={28} />
            </div>
            <div>
              <span className="block font-serif text-lg mb-1">Telefon</span>
              <a href={`tel:${CLINIC_PHONE.replace(/\s/g, '')}`} className="text-lg font-light hover:text-clinic-primary transition-colors">
                {CLINIC_PHONE}
              </a>
            </div>
          </li>
          <li className="flex flex-col items-center text-center gap-2 text-clinic-text">
             <div className="text-clinic-primary mb-1">
               <Icon name="MessageCircle" size={28} />
            </div>
            <div>
              <span className="block font-serif text-lg mb-1">Email</span>
              <a href={`mailto:${CLINIC_EMAIL}`} className="text-sm font-light hover:text-clinic-primary transition-colors">
                {CLINIC_EMAIL}
              </a>
            </div>
          </li>
          <li className="flex flex-col items-center text-center gap-2 text-clinic-text">
             <div className="text-clinic-primary mb-1">
               <Icon name="Calendar" size={28} />
            </div>
             <div>
              <span className="block font-serif text-lg mb-1">Godziny otwarcia</span>
              <span className="text-sm block font-light">wtorek 9:00-19:00</span>
              <span className="text-sm block font-light">środa 9:00-17:00</span>
              <span className="text-sm block font-light">piątek 9:00-19:00</span>
              <span className="text-xs block font-light italic mt-1">(prosimy o kontakt telefoniczny)</span>
            </div>
          </li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 gap-4">
        <a href={`tel:${CLINIC_PHONE.replace(/\s/g, '')}`} className="bg-clinic-primary hover:bg-clinic-primaryDark text-white p-4 rounded-full flex items-center justify-center gap-3 shadow-md transition-colors font-bold tracking-wide text-sm uppercase">
          <Icon name="Phone" size={18} />
          <span>Zadzwoń teraz</span>
        </a>
        <a href="https://maps.google.com/maps?q=U%C5%9Bmiechnie%20Stomatologia%20Katarzyna%20Baziuk%20ul.%20Boles%C5%82awa%20Le%C5%9Bmiana%20U1/A1%20Brzeg%20Dolny" target="_blank" rel="noreferrer" className="bg-white hover:bg-gray-50 text-clinic-text border border-gray-300 p-4 rounded-full flex items-center justify-center gap-3 shadow-sm transition-colors font-bold tracking-wide text-sm uppercase">
          <Icon name="MapPin" size={18} />
          <span>Jak dojechać?</span>
        </a>
      </div>
    </div>
  );
};