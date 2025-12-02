import React, { useState } from 'react';
import { HashRouter } from 'react-router-dom';
import { Navbar, Footer } from './components/Layout';
import { BookCard } from './components/BookList';
import { LibrarianChat } from './features/LibrarianChat';
import { PoetryStudio } from './features/PoetryStudio';
import { ViewState, Book } from './types';
import { FEATURED_BOOKS } from './constants';
import { getMoodBasedRecommendations } from './services/geminiService';
import { Search, ArrowRight, BookOpen, Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setView] = useState<ViewState>(ViewState.HOME);
  const [moodInput, setMoodInput] = useState('');
  const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);
  const [isSearchingMood, setIsSearchingMood] = useState(false);

  const handleMoodSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!moodInput.trim()) return;
    
    setIsSearchingMood(true);
    setRecommendedBooks([]);
    // Scroll to results if needed
    
    try {
      const books = await getMoodBasedRecommendations(moodInput);
      setRecommendedBooks(books);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSearchingMood(false);
    }
  };

  // --- Views ---

  const HomeView = () => (
    <>
      {/* Hero Section */}
      <section className="relative bg-ink text-paper py-24 px-4 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent opacity-5 transform skew-x-12 translate-x-20"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-block border border-accent/50 text-accent px-4 py-1 rounded-full text-xs uppercase tracking-[0.2em] mb-6">Est. 2024</span>
          <h1 className="font-display text-5xl md:text-7xl mb-6 leading-tight">
            Discover the Poetry of <span className="text-accent italic">Existence</span>
          </h1>
          <p className="font-serif text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            More than a bookstore. A sanctuary where Artificial Intelligence meets the human soul to find the perfect verse for your moment.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
             <button 
                onClick={() => setView(ViewState.SHOP)}
                className="bg-accent text-ink font-semibold px-8 py-4 rounded-md hover:bg-white transition-all duration-300 font-sans"
             >
                Browse Collection
             </button>
             <button 
                onClick={() => setView(ViewState.LIBRARIAN)}
                className="border border-white/30 text-white px-8 py-4 rounded-md hover:bg-white/10 transition-all duration-300 font-sans backdrop-blur-sm"
             >
                Talk to the Curator
             </button>
          </div>
        </div>
      </section>

      {/* Mood Search Section */}
      <section className="py-20 px-4 bg-paper">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl text-ink mb-3">Semantic Bookshelf</h2>
            <p className="text-gray-500 font-serif italic">"I am looking for a book that feels like..."</p>
          </div>
          
          <form onSubmit={handleMoodSearch} className="relative mb-12">
            <input
              type="text"
              value={moodInput}
              onChange={(e) => setMoodInput(e.target.value)}
              placeholder="e.g., 'A rainy Tuesday in London', 'The joy of first love', 'Existential dread'"
              className="w-full bg-white border border-subtle rounded-full py-5 pl-8 pr-32 shadow-lg text-lg font-serif focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-shadow hover:shadow-xl"
            />
            <button
                type="submit"
                disabled={isSearchingMood || !moodInput}
                className="absolute right-2 top-2 bottom-2 bg-ink text-white rounded-full px-6 flex items-center justify-center hover:bg-accent transition-colors disabled:opacity-70"
            >
                {isSearchingMood ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
            </button>
          </form>

          {/* Results */}
          {recommendedBooks.length > 0 && (
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up">
                {recommendedBooks.map((book) => (
                    <BookCard key={book.id} book={book} />
                ))}
             </div>
          )}
          
          {recommendedBooks.length === 0 && !isSearchingMood && moodInput && (
             <div className="text-center mt-10 p-8 border border-dashed border-gray-300 rounded-lg">
                <p className="text-gray-400 font-serif">Enter a mood above to summon books from the void.</p>
             </div>
          )}
        </div>
      </section>

      {/* Featured Collection Preview */}
      <section className="py-20 bg-white border-t border-subtle">
         <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h2 className="font-display text-3xl text-ink">Curated Selections</h2>
                    <p className="text-gray-500 font-serif mt-2">Timeless classics and modern masterpieces.</p>
                </div>
                <button 
                    onClick={() => setView(ViewState.SHOP)}
                    className="hidden md:flex items-center space-x-2 text-accent-hover hover:text-ink transition-colors font-semibold"
                >
                    <span>View All</span>
                    <ArrowRight size={16} />
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {FEATURED_BOOKS.slice(0, 4).map(book => (
                    <BookCard key={book.id} book={book} />
                ))}
            </div>
             <div className="mt-8 text-center md:hidden">
                 <button 
                    onClick={() => setView(ViewState.SHOP)}
                    className="text-accent-hover font-semibold"
                 >
                    View All Collections
                 </button>
             </div>
         </div>
      </section>
    </>
  );

  const ShopView = () => (
    <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="font-display text-4xl text-ink mb-8 text-center">The Collection</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {FEATURED_BOOKS.map(book => (
                <BookCard key={book.id} book={book} />
            ))}
            {/* Repeat some books to fill the grid for demo purposes */}
            {FEATURED_BOOKS.slice(0,2).map((book, i) => (
                <BookCard key={`${book.id}-dup-${i}`} book={{...book, id: `dup-${i}`}} />
            ))}
        </div>
    </div>
  );

  const LibrarianView = () => (
    <div className="py-12 px-4 min-h-[80vh] bg-paper flex items-center justify-center">
        <LibrarianChat />
    </div>
  );

  const StudioView = () => (
    <PoetryStudio />
  );

  return (
    <HashRouter>
        <div className="min-h-screen flex flex-col bg-paper text-ink font-sans selection:bg-accent selection:text-white">
            <Navbar currentView={currentView} setView={setView} />
            
            <main className="flex-grow">
                {currentView === ViewState.HOME && <HomeView />}
                {currentView === ViewState.SHOP && <ShopView />}
                {currentView === ViewState.LIBRARIAN && <LibrarianView />}
                {currentView === ViewState.STUDIO && <StudioView />}
            </main>

            <Footer />
        </div>
    </HashRouter>
  );
};

export default App;
