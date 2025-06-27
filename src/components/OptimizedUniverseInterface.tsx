
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { PoemaFragment } from '../services/PoemaScrapingService';
import { useGlitch } from '../contexts/GlitchContext';
import { useTypewriter } from '../hooks/useTypewriter';
import { useIsMobile } from '../hooks/use-mobile';
import { ScrollArea } from './ui/scroll-area';
import { PoetryChat } from './PoetryChat';
import { DraggablePoetryPanel } from './DraggablePoetryPanel';

interface OptimizedUniverseInterfaceProps {
  fragments: PoemaFragment[];
  onFragmentInteraction: (fragment: PoemaFragment) => void;
}

export const OptimizedUniverseInterface = ({ 
  fragments, 
  onFragmentInteraction 
}: OptimizedUniverseInterfaceProps) => {
  const [activeFragment, setActiveFragment] = useState<PoemaFragment | null>(null);
  const [selectedFragments, setSelectedFragments] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'grid' | 'flow' | 'constellation'>('flow');
  const [poeticIntensity, setPoeticIntensity] = useState(0.5);
  const [showChat, setShowChat] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  
  const { triggerGlitch } = useGlitch();
  const isMobile = useIsMobile();

  // Optimized fragment rendering with virtualization for large datasets
  const visibleFragments = useMemo(() => {
    return fragments
      .filter(f => f.poeticScore > poeticIntensity * 0.3)
      .sort((a, b) => (b.poeticScore + b.uniqueness) - (a.poeticScore + a.uniqueness))
      .slice(0, isMobile ? 20 : 50);
  }, [fragments, poeticIntensity, isMobile]);

  const headerText = useTypewriter(
    "UNIVERSO.POÉTICO.OPTIMIZADO", 
    { speed: 80, randomSpeed: true, cursor: true }
  );

  const handleFragmentClick = useCallback((fragment: PoemaFragment) => {
    setActiveFragment(fragment);
    onFragmentInteraction(fragment);
    triggerGlitch();
    
    // Multi-selection with Ctrl/Cmd
    if (window.event && (window.event as KeyboardEvent).ctrlKey) {
      setSelectedFragments(prev => {
        const newSet = new Set(prev);
        if (newSet.has(fragment.id)) {
          newSet.delete(fragment.id);
        } else {
          newSet.add(fragment.id);
        }
        return newSet;
      });
    }
  }, [onFragmentInteraction, triggerGlitch]);

  const FragmentCard = useCallback(({ fragment, index }: { fragment: PoemaFragment; index: number }) => {
    const isSelected = selectedFragments.has(fragment.id);
    const isActive = activeFragment?.id === fragment.id;
    
    return (
      <div
        onClick={() => handleFragmentClick(fragment)}
        className={`
          group relative p-4 rounded-xl border cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:z-10
          ${isActive 
            ? 'bg-gradient-to-br from-purple-900/60 to-cyan-900/60 border-purple-400 shadow-xl shadow-purple-400/30' 
            : isSelected
            ? 'bg-gradient-to-br from-pink-900/40 to-purple-900/40 border-pink-400 shadow-lg shadow-pink-400/20'
            : 'bg-black/40 border-gray-600/50 hover:border-cyan-400/70 hover:bg-cyan-900/20'
          }
          backdrop-blur-sm
        `}
        style={{
          animationDelay: `${index * 0.05}s`,
          transform: `translateY(${Math.sin(index * 0.1) * 2}px)`,
        }}
      >
        <div className="relative z-10">
          <div className="text-xs text-cyan-400 mb-2 font-mono flex justify-between items-center">
            <span>φ:{(fragment.poeticScore * 100).toFixed(0)}% | ξ:{(fragment.uniqueness * 100).toFixed(0)}%</span>
            <div className="flex gap-1">
              <div 
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: `hsl(${fragment.intensity * 120}, 70%, 60%)`,
                  boxShadow: `0 0 ${fragment.intensity * 6}px hsla(${fragment.intensity * 120}, 70%, 60%, 0.6)`
                }}
              />
            </div>
          </div>
          
          <div className={`text-white leading-relaxed mb-3 group-hover:text-cyan-100 transition-colors ${
            isMobile ? 'text-sm' : 'text-base'
          }`}>
            {fragment.content.length > (isMobile ? 120 : 180) 
              ? `${fragment.content.slice(0, isMobile ? 120 : 180)}...` 
              : fragment.content}
          </div>

          {fragment.tags && (
            <div className="flex flex-wrap gap-1">
              {fragment.tags.slice(0, isMobile ? 3 : 5).map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-2 py-1 text-xs bg-purple-800/40 text-purple-200 rounded-full border border-purple-600/30"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
      </div>
    );
  }, [selectedFragments, activeFragment, handleFragmentClick, isMobile]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white relative overflow-hidden">
      {/* Optimized Header */}
      <header className="relative z-20 text-center py-8 px-4">
        <h1 className={`font-thin tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-cyan-400 to-yellow-400 mb-4 ${
          isMobile ? 'text-4xl' : 'text-6xl'
        }`}>
          {headerText}
        </h1>
        
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {/* View Mode Selector */}
          <div className="flex bg-black/50 rounded-full p-1 backdrop-blur-sm">
            {(['grid', 'flow', 'constellation'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-4 py-2 text-xs rounded-full transition-all ${
                  viewMode === mode 
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* Intensity Slider */}
          <div className="flex items-center gap-2 bg-black/50 rounded-full px-4 py-2 backdrop-blur-sm">
            <span className="text-xs text-gray-400">intensidad:</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={poeticIntensity}
              onChange={(e) => setPoeticIntensity(parseFloat(e.target.value))}
              className="w-16 accent-purple-500"
            />
            <span className="text-xs text-purple-400">{(poeticIntensity * 100).toFixed(0)}%</span>
          </div>

          {/* Action Buttons */}
          <button
            onClick={() => setShowChat(!showChat)}
            className={`px-4 py-2 text-xs rounded-full transition-all ${
              showChat 
                ? 'bg-green-600 text-white shadow-lg shadow-green-600/30' 
                : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            chat poético
          </button>

          <button
            onClick={() => setShowAnalytics(!showAnalytics)}
            className={`px-4 py-2 text-xs rounded-full transition-all ${
              showAnalytics 
                ? 'bg-yellow-600 text-white shadow-lg shadow-yellow-600/30' 
                : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            analíticas
          </button>
        </div>
      </header>

      {/* Optimized Content Area */}
      <div className="relative z-10 px-4 pb-8">
        <ScrollArea className={isMobile ? 'h-[calc(100vh-200px)]' : 'h-[calc(100vh-250px)]'}>
          <div className={`
            ${viewMode === 'grid' 
              ? `grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`
              : viewMode === 'flow'
              ? 'space-y-4'
              : 'space-y-6'
            }
          `}>
            {visibleFragments.map((fragment, index) => (
              <FragmentCard key={fragment.id} fragment={fragment} index={index} />
            ))}
          </div>
          
          {visibleFragments.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <div className="text-2xl mb-2">∅</div>
              <div>Ajusta la intensidad poética para ver más fragmentos</div>
            </div>
          )}
        </ScrollArea>
      </div>

      {/* Active Fragment Panel */}
      {activeFragment && (
        <DraggablePoetryPanel
          title={`fragmento.${activeFragment.page}`}
          defaultPosition={{ x: 50, y: 150 }}
          minWidth={350}
          minHeight={250}
          resizable
          onClose={() => setActiveFragment(null)}
        >
          <div className="p-4 h-full overflow-y-auto">
            <div className="mb-4">
              <div className="text-sm text-cyan-400 mb-2">
                Página {activeFragment.page} | Cluster: {activeFragment.cluster} | Mutaciones: {activeFragment.mutations}
              </div>
              <div className="text-white leading-relaxed mb-4">
                {activeFragment.content}
              </div>
              <div className="text-xs text-gray-400 space-y-1">
                <div>Puntuación poética: {(activeFragment.poeticScore * 100).toFixed(1)}%</div>
                <div>Singularidad: {(activeFragment.uniqueness * 100).toFixed(1)}%</div>
                <div>Intensidad: {(activeFragment.intensity * 100).toFixed(1)}%</div>
              </div>
            </div>
          </div>
        </DraggablePoetryPanel>
      )}

      {/* Poetry Chat */}
      {showChat && <PoetryChat />}

      {/* Analytics Panel */}
      {showAnalytics && (
        <DraggablePoetryPanel
          title="analíticas.poéticas"
          defaultPosition={{ x: 100, y: 100 }}
          minWidth={400}
          minHeight={300}
          resizable
          onClose={() => setShowAnalytics(false)}
        >
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-purple-900/20 p-3 rounded-lg">
                <div className="text-purple-400 text-sm">Total Fragmentos</div>
                <div className="text-2xl font-mono">{fragments.length}</div>
              </div>
              <div className="bg-cyan-900/20 p-3 rounded-lg">
                <div className="text-cyan-400 text-sm">Promedio Poético</div>
                <div className="text-2xl font-mono">
                  {fragments.length > 0 
                    ? (fragments.reduce((acc, f) => acc + f.poeticScore, 0) / fragments.length * 100).toFixed(1)
                    : 0}%
                </div>
              </div>
              <div className="bg-pink-900/20 p-3 rounded-lg">
                <div className="text-pink-400 text-sm">Singularidad Media</div>
                <div className="text-2xl font-mono">
                  {fragments.length > 0 
                    ? (fragments.reduce((acc, f) => acc + f.uniqueness, 0) / fragments.length * 100).toFixed(1)
                    : 0}%
                </div>
              </div>
              <div className="bg-yellow-900/20 p-3 rounded-lg">
                <div className="text-yellow-400 text-sm">Seleccionados</div>
                <div className="text-2xl font-mono">{selectedFragments.size}</div>
              </div>
            </div>
          </div>
        </DraggablePoetryPanel>
      )}

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(isMobile ? 15 : 30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};
