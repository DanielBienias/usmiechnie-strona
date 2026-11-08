import React from 'react';
import { 
  Stethoscope, 
  Sparkles, 
  Smile, 
  Syringe, 
  Droplets, 
  Calendar, 
  Phone, 
  MapPin, 
  Info, 
  MessageCircle, 
  CreditCard,
  Users,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Send,
  X,
  Feather,
  Shield,
  Star,
  Headphones,
  Download,
  FolderArchive,
  Check,
  FileCode
} from 'lucide-react';

// Custom Minimalist Dental Chair Icon
const DentalChairIcon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M4 18v-2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2" />
    <path d="M6 14c0-3 2-5 6-5s6 2 6 5" />
    <path d="M12 9V5a1 1 0 0 1 1-1h2" />
    <path d="M19 14h2" />
    <path d="M3 14h2" />
  </svg>
);

// Custom Minimalist 3 Women Team Icon
const TeamWomenIcon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    {/* Center Woman */}
    <circle cx="12" cy="7" r="3" />
    <path d="M12 4a1 1 0 0 1 1-1" /> {/* Bun */}
    <path d="M9 20v-4a3 3 0 0 1 6 0v4" />
    
    {/* Left Woman */}
    <circle cx="5" cy="9" r="2.5" />
    <path d="M5 6.5a1 1 0 0 1 .8-.8" /> {/* Bun */}
    <path d="M2.5 20v-3a2.5 2.5 0 0 1 5 0v3" />
    
    {/* Right Woman */}
    <circle cx="19" cy="9" r="2.5" />
    <path d="M19 6.5a1 1 0 0 0 -.8-.8" /> {/* Bun */}
    <path d="M16.5 20v-3a2.5 2.5 0 0 1 5 0v3" />
  </svg>
);

// Custom Google Icon
const GoogleIcon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    className={className}
  >
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

export const IconMap: Record<string, React.FC<any>> = {
  'Tooth': Smile, 
  'Drill': Stethoscope, 
  'Sparkles': Sparkles, 
  'Smile': Smile,
  'Syringe': Syringe,
  'Droplets': Droplets,
  'Calendar': Calendar,
  'Phone': Phone,
  'MapPin': MapPin,
  'Info': Info,
  'MessageCircle': MessageCircle,
  'CreditCard': CreditCard,
  'Users': Users,
  'Back': ChevronLeft,
  'ChevronDown': ChevronDown,
  'ChevronUp': ChevronUp,
  'Send': Send,
  'Close': X,
  'NoPain': Feather,
  'DentalChair': DentalChairIcon,
  'HygienistTeam': TeamWomenIcon,
  'Shield': Shield,
  'Star': Star,
  'Google': GoogleIcon,
  'Headphones': Headphones,
  'Download': Download,
  'FolderArchive': FolderArchive,
  'Check': Check,
  'FileCode': FileCode
};

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

export const Icon: React.FC<IconProps> = ({ name, className, size = 24 }) => {
  const IconComponent = IconMap[name] || Info;
  return <IconComponent className={className} size={size} />;
};