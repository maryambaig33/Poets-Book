import React, { useState } from 'react';
import { analyzePoem } from '../services/geminiService';
import { PoetryAnalysis } from '../types';
import { PenTool, Loader2, Sparkles } from 'lucide-react';

export const PoetryStudio: React.FC = () => {
  const [poemText, setPoemText] = useState('');
  const [analysis, setAnalysis] = useState<PoetryAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!poemText.trim()) return;
    setIsAnalyzing(true);
    setAnalysis(null);
    try {
      const result = await analyzePoem(poemText);
      setAnalysis(result);
    } catch (e) {
      alert("Failed to analyze. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h2 className="font-display text-4xl text-ink mb-4">Poetry Studio</h2>
        <p className="font-serif text-gray-600 max-w-2xl mx-auto">
          Paste a fragment of your own work or a classic verse. Our analytical engine will deconstruct the tone, themes, and structure.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Area */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-subtle">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Input Text</label>
            <textarea
                className="w-full h-80 p-4 font-serif text-lg bg-paper border border-subtle rounded-md focus:ring-1 focus:ring-accent outline-none resize-none leading-loose"
                placeholder="I wandered lonely as a cloud..."
                value={poemText}
                onChange={(e) => setPoemText(e.target.value)}
            />
            <div className="mt-4 flex justify-end">
                <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || !poemText}
                    className="flex items-center space-x-2 bg-ink text-white px-6 py-3 rounded-md hover:bg-accent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isAnalyzing ? <Loader2 className="animate-spin" size={18}/> : <Sparkles size={18}/>}
                    <span className="font-display font-semibold">Analyze Text</span>
                </button>
            </div>
        </div>

        {/* Output Area */}
        <div className="bg-stone-50 p-6 rounded-xl border border-subtle h-full min-h-[400px] flex flex-col justify-center">
            {!analysis && !isAnalyzing && (
                <div className="text-center text-gray-400">
                    <PenTool size={48} className="mx-auto mb-4 opacity-20" />
                    <p className="font-serif italic">Analysis results will appear here.</p>
                </div>
            )}

            {isAnalyzing && (
                <div className="text-center">
                    <Loader2 size={48} className="mx-auto mb-4 text-accent animate-spin" />
                    <p className="font-serif text-ink">Deconstructing verses...</p>
                </div>
            )}

            {analysis && (
                <div className="space-y-6 animate-fade-in">
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-accent-hover mb-1">Tone</h3>
                        <p className="font-serif text-xl text-ink">{analysis.tone}</p>
                    </div>
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-accent-hover mb-1">Structure</h3>
                        <p className="font-sans text-sm text-gray-700">{analysis.structure}</p>
                    </div>
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-accent-hover mb-1">Themes</h3>
                        <div className="flex flex-wrap gap-2">
                            {analysis.themes.map((t, i) => (
                                <span key={i} className="bg-white border border-subtle px-3 py-1 rounded-full text-xs font-semibold text-gray-600">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border-l-4 border-accent shadow-sm">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Critique</h3>
                        <p className="font-serif text-sm italic text-gray-700 leading-relaxed">
                            "{analysis.critique}"
                        </p>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
