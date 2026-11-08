import React from 'react';
import { TEAM } from '../../constants';

export const TeamView: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-8 p-4 pb-20 animate-fade-in">
       <div className="text-center">
         <h2 className="text-3xl font-serif text-clinic-primary mb-2">Zespół</h2>
         <p className="text-sm text-clinic-subtext font-light">Eksperci w dziedzinie stomatologii</p>
       </div>
       
      {TEAM.map((member) => (
        <div key={member.id} className="bg-white p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
           <div className="w-28 h-28 rounded-full p-1 border border-clinic-primary/30 mb-4">
              <img 
                src={member.imageUrl} 
                alt={member.name} 
                className="w-full h-full rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
           </div>
           
            <h3 className="font-serif font-bold text-xl text-clinic-text mb-1">{member.name}</h3>
            <p className="text-xs uppercase tracking-widest text-clinic-primary font-bold mb-3">{member.role}</p>
            <p className="text-sm text-gray-500 leading-relaxed font-light">
              Doświadczony specjalista dbający o komfort pacjenta i najwyższą jakość leczenia.
            </p>
        </div>
      ))}
    </div>
  );
};