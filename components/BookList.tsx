import React from 'react';
import { Book } from '../types';
import { ShoppingCart, Heart } from 'lucide-react';

interface BookCardProps {
  book: Book;
  onAddToCart?: (book: Book) => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, onAddToCart }) => {
  return (
    <div className="group relative bg-white rounded-none shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-subtle flex flex-col h-full">
      {/* Image Container */}
      <div className="relative aspect-[2/3] overflow-hidden bg-gray-100">
        <img
          src={book.coverUrl}
          alt={book.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 filter grayscale-[20%] group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        
        {/* Quick Actions Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white/95 backdrop-blur-sm border-t border-subtle flex justify-between items-center">
            <span className="font-display font-semibold text-ink">${book.price.toFixed(2)}</span>
            <button 
                onClick={() => onAddToCart?.(book)}
                className="bg-ink text-white p-2 rounded-full hover:bg-accent transition-colors"
            >
                <ShoppingCart size={16} />
            </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-2 flex flex-wrap gap-1">
          {book.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-[10px] uppercase tracking-wider text-accent-hover font-bold border border-subtle px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="font-display text-lg leading-tight mb-1 text-ink group-hover:text-accent-hover transition-colors">
            {book.title}
        </h3>
        <p className="font-serif text-sm italic text-gray-500 mb-3">by {book.author}</p>
        <p className="text-gray-600 text-xs leading-relaxed line-clamp-3 mb-4 flex-grow font-sans">
            {book.description}
        </p>
      </div>
    </div>
  );
};
