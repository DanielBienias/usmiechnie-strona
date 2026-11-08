import React from 'react';
import { Icon } from './Icon';

interface TileProps {
  title: string;
  subtitle?: string;
  icon: string;
  onClick: () => void;
  className?: string; // Allow custom classes for colors/sizes
  iconClassName?: string;
}

export const Tile: React.FC<TileProps> = ({ 
  title, 
  subtitle,
  icon, 
  onClick, 
  className = "bg-white text-clinic-text flex-col items-start justify-between", // Moved default layout classes here
  iconClassName = "bg-clinic-sand text-clinic-primary"
}) => {
  // Ensure we have a default flex layout if none provided in the override
  const finalClassName = className.includes('flex-') ? className : `${className} flex-col items-start justify-between`;

  return (
    <button
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-xl p-5 flex text-left
        transition-all duration-300 transform hover:scale-[1.02] active:scale-95
        border border-transparent hover:shadow-md
        ${finalClassName}
      `}
    >
      <div className={`p-3 rounded-full shrink-0 ${iconClassName}`}>
        <Icon name={icon} size={24} />
      </div>
      
      <div className="z-10 relative w-full ml-2">
        <span className="block font-serif font-bold text-xl leading-tight">
          {title}
        </span>
        {subtitle && (
          <span className="block text-xs mt-1 opacity-70 font-sans tracking-wide">
            {subtitle}
          </span>
        )}
      </div>
      
      {/* Decorative large icon in background - more subtle */}
      <div className="absolute -bottom-4 -right-4 opacity-5 pointer-events-none transform rotate-12">
         <Icon name={icon} size={90} />
      </div>
    </button>
  );
};