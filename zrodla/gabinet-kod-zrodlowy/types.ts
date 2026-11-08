export enum ViewState {
  HOME = 'HOME',
  SERVICES = 'SERVICES',
  TEAM = 'TEAM',
  CONTACT = 'CONTACT',
  ABOUT = 'ABOUT'
}

export interface ServiceItem {
  id: string;
  category: string;
  title: string;
  price: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  bio: string;
  guiltyPleasure: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  content: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}