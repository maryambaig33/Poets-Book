export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  coverUrl: string;
  description: string;
  tags: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isError?: boolean;
}

export enum ViewState {
  HOME = 'HOME',
  SHOP = 'SHOP',
  LIBRARIAN = 'LIBRARIAN',
  STUDIO = 'STUDIO',
}

export interface PoetryAnalysis {
  tone: string;
  themes: string[];
  structure: string;
  critique: string;
}
