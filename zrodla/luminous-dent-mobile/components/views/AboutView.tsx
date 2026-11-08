import React from 'react';
import { CLINIC_NAME } from '../../constants';

export const AboutView: React.FC = () => {
  return (
    <div className="p-4 pb-20 animate-fade-in space-y-8">
       <div className="text-center">
         <h2 className="text-3xl font-serif text-clinic-primary mb-2">Filozofia</h2>
         <div className="w-12 h-px bg-clinic-primary mx-auto"></div>
       </div>

      <div className="bg-white p-8 shadow-sm text-clinic-text leading-relaxed space-y-6 font-light text-justify">
        <p>
          <strong className="font-serif text-xl block mb-2 text-clinic-primary">Witaj w {CLINIC_NAME}.</strong>
          Jesteśmy miejscem, gdzie nowoczesna technologia spotyka się z troską o pacjenta. Nasz gabinet powstał z pasji do stomatologii i chęci niesienia pomocy na najwyższym poziomie.
        </p>
        <p>
          Specjalizujemy się w kompleksowym leczeniu – od stomatologii zachowawczej, przez endodoncję mikroskopową, aż po zaawansowaną implantologię. 
        </p>
        <p>
          Nasz zespół to doświadczeni specjaliści, którzy stale podnoszą swoje kwalifikacje. Wierzymy, że zdrowy uśmiech to podstawa dobrego samopoczucia.
        </p>
      </div>

      <div className="bg-clinic-primary p-8 text-center text-white rounded-lg shadow-lg mx-2">
        <h3 className="font-serif text-xl mb-4">Nasza Misja</h3>
        <p className="text-sm font-light italic opacity-90">
          "Tworzymy uśmiechy, które zmieniają życie, w atmosferze pełnej empatii i profesjonalizmu."
        </p>
        <p className="mt-4 font-serif text-sm">— Katarzyna Baziuk</p>
      </div>
    </div>
  );
};