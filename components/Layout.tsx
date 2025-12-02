import React, { useState } from 'react';
import { ViewState } from '../types';
import { BookOpen, Feather, MessageCircle, Home, ShoppingBag, Menu, X } from 'lucide-react';

interface NavProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

export const Navbar: React.FC<NavProps> = ({ currentView, setView }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavItem = ({ view, label, icon: Icon }: { view: ViewState; label: string; icon: any }) => (
    <button
      onClick={() => {
        setView(view);
        setIsMobileMenuOpen(false);
      }}
      className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
        currentView === view
          ? 'bg-ink text-white shadow-md'
          : 'text-ink-light hover:bg-subtle hover:text-ink'
      }`}
    >
      <Icon size={18} />
      <span className="font-serif tracking-wide">{label}</span>
    </button>
  );

  return (
    <nav className="sticky top-0 z-50 bg-paper/90 backdrop-blur-md border-b border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => setView(ViewState.HOME)}
          >
            <div className="bg-ink text-paper p-2 rounded-lg group-hover:bg-accent transition-colors duration-500">
              <Feather size={24} />
            </div>
            <div>
              <h1 className="font-display text-2xl text-ink font-semibold tracking-tighter">Poets & Pages</h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-accent-hover hidden sm:block">Literary Sanctuary</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-2">
            <NavItem view={ViewState.HOME} label="Sanctuary" icon={Home} />
            <NavItem view={ViewState.SHOP} label="Collection" icon={ShoppingBag} />
            <NavItem view={ViewState.STUDIO} label="Poem Studio" icon={BookOpen} />
            <NavItem view={ViewState.LIBRARIAN} label="The Curator" icon={MessageCircle} />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-ink p-2 hover:bg-subtle rounded-md"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-paper border-b border-subtle">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-start">
            <NavItem view={ViewState.HOME} label="Sanctuary" icon={Home} />
            <NavItem view={ViewState.SHOP} label="Collection" icon={ShoppingBag} />
            <NavItem view={ViewState.STUDIO} label="Poem Studio" icon={BookOpen} />
            <NavItem view={ViewState.LIBRARIAN} label="The Curator" icon={MessageCircle} />
          </div>
        </div>
      )}
    </nav>
  );
};

export const Footer: React.FC = () => (
  <footer className="bg-ink text-paper py-12 mt-auto">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
      <div>
        <h3 className="font-display text-xl mb-4 text-accent">Poets & Pages</h3>
        <p className="text-sm text-gray-400 leading-relaxed font-serif">
          Where technology meets the soul of literature.<br/>
          Curating emotions through the written word.
        </p>
      </div>
      <div>
        <h4 className="font-display text-lg mb-4">Visit Us</h4>
        <p className="text-sm text-gray-400 font-serif">
          123 Verse Lane<br/>
          Literary District<br/>
          New York, NY 10012
        </p>
      </div>
      <div>
        <h4 className="font-display text-lg mb-4">Connect</h4>
        <div className="flex justify-center md:justify-start space-x-4 text-gray-400">
           <span className="hover:text-accent cursor-pointer">Instagram</span>
           <span className="hover:text-accent cursor-pointer">Twitter</span>
           <span className="hover:text-accent cursor-pointer">Email</span>
        </div>
      </div>
    </div>
    <div className="mt-12 text-center text-xs text-gray-600 font-sans border-t border-gray-800 pt-6">
      © {new Date().getFullYear()} Poets & Pages. Powered by Google Gemini.
    </div>
  </footer>
);
