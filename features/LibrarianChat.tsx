import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Sparkles, Loader2 } from 'lucide-react';
import { chatWithLibrarian } from '../services/geminiService';
import { ChatMessage } from '../types';

export const LibrarianChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Greetings. I am the Curator. Whether you seek a poem for a broken heart or a verse to celebrate a triumph, I am here to guide you through our stacks. What is on your mind today?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, text: m.text }));
      const responseText = await chatWithLibrarian(history, userMsg.text);

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText || "I'm having trouble finding the right words...",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "I apologize, but I seem to have lost my train of thought. Perhaps we can try again?",
        timestamp: new Date(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-4xl mx-auto bg-white shadow-2xl rounded-xl border border-subtle overflow-hidden">
      {/* Header */}
      <div className="bg-ink p-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
            <div className="relative">
                <div className="w-12 h-12 rounded-full bg-paper flex items-center justify-center border-2 border-accent">
                    <Sparkles className="text-accent-hover" size={24} />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-ink rounded-full"></span>
            </div>
            <div>
                <h2 className="text-paper font-display text-xl">The Curator</h2>
                <p className="text-accent text-xs font-sans tracking-wider uppercase">AI Literary Guide</p>
            </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-stone-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-5 shadow-sm ${
                msg.role === 'user'
                  ? 'bg-ink text-paper rounded-br-none'
                  : 'bg-white text-ink border border-subtle rounded-bl-none'
              }`}
            >
              <div className="flex items-center space-x-2 mb-2 opacity-70">
                 {msg.role === 'user' ? <User size={12}/> : <Bot size={12}/>}
                 <span className="text-[10px] uppercase tracking-wide font-bold">
                    {msg.role === 'user' ? 'You' : 'Curator'}
                 </span>
              </div>
              <p className={`font-serif leading-relaxed whitespace-pre-wrap ${msg.role === 'model' ? 'text-base' : 'text-sm'}`}>
                {msg.text}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl rounded-bl-none border border-subtle flex items-center space-x-2">
                    <Loader2 className="animate-spin text-accent" size={16} />
                    <span className="text-xs text-gray-500 font-serif italic">Consulting the archives...</span>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-subtle">
        <div className="relative flex items-end space-x-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask about a poem, a feeling, or a poet..."
            className="w-full bg-stone-50 border border-subtle rounded-xl p-4 pr-12 focus:ring-1 focus:ring-accent focus:border-accent outline-none resize-none font-serif text-ink placeholder:text-gray-400 min-h-[60px] max-h-[120px]"
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`absolute right-3 bottom-3 p-2 rounded-full transition-colors ${
              !input.trim() || isLoading
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-ink text-white hover:bg-accent'
            }`}
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-[10px] text-center mt-2 text-gray-400">
            The Curator may occasionally hallucinate literary facts. Always verify with original texts.
        </p>
      </div>
    </div>
  );
};
