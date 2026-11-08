import React from 'react';
import { SERVICES } from '../../constants';

export const ServicesView: React.FC = () => {
  // Group services by category
  const categories = Array.from(new Set(SERVICES.map(s => s.category)));

  return (
    <div className="p-4 pb-20 animate-fade-in space-y-8">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-serif text-clinic-primary">Cennik</h2>
        <div className="w-10 h-0.5 bg-clinic-primary mx-auto mt-3 mb-2"></div>
        <p className="text-xs text-clinic-subtext font-sans">Ceny mają charakter informacyjny.</p>
      </div>

      {categories.map(category => (
        <div key={category} className="bg-white rounded-none shadow-sm border-t-2 border-clinic-primary">
          <div className="bg-clinic-sand px-4 py-3">
            <h3 className="font-serif text-lg text-clinic-text">{category}</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {SERVICES.filter(s => s.category === category).map((service) => (
              <div 
                key={service.id} 
                className="flex justify-between items-baseline p-4 hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm font-medium text-gray-700 font-sans">{service.title}</span>
                <span className="text-sm font-bold text-clinic-primary whitespace-nowrap ml-4 font-sans">{service.price}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};