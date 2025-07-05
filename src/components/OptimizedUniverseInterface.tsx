
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { PoemaFragment } from '../services/PoemaScrapingService';
import { useGlitch } from '../contexts/GlitchContext';
import { useTypewriter } from '../hooks/useTypewriter';
import { useIsMobile } from '../hooks/use-mobile';
import { OptimizedScrollArea } from './OptimizedScrollArea';
import { PoetryChat } from './PoetryChat';
import { DraggablePoetryPanel } from './DraggablePoetryPanel';
import { BlockchainPoetryCore } from './BlockchainPoetryCore';

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
  const [showBlockchain, setShowBlockchain] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const { triggerGlitch } = useGlitch();
  const isMobile = useIsMobile();

  // Asegurar que todos los fragmentos tengan las propiedades necesarias
  const normalizedFragments = useMemo(() => {
    return fragments.map(fragment => ({
      ...fragment,
      poeticScore: fragment.poeticScore || Math.random() * 0.8 + 0.2,
      uniqueness: fragment.uniqueness || Math.random() * 0.6 + 0.4,
      cluster: fragment.cluster || Math.floor(Math.random() * 5),
      timestamp: fragment.timestamp || Date.now(),
      hash: fragment.hash || Math.random().toString(36).substring(7)
    }));
  }, [fragments]);

  // Optimized fragment rendering con virtualización mejorada
  const visibleFragments = useMemo(() => {
    return normalizedFragments
      .filter(f => f.poeticScore > poeticIntensity * 0.3)
      .sort((a, b) => (b.poeticScore + b.uniqueness) - (a.poeticScore + a.uniqueness))
      .slice(0, isMobile ? 15 : 40); // Reducido para mejor performance
  }, [normalizedFragments, poeticIntensity, isMobile]);

  const headerText = useTypewriter(
    "UNIVERSO.POÉTICO.LOVABLE", 
    { speed: 80, randomSpeed: true, cursor: true }
  );

  const handleFragmentClick = useCallback((fragment: PoemaFragment) => {
    setActiveFragment(fragment);
    onFragmentInteraction(fragment);
    triggerGlitch();
    
    // Multi-selection mejorada
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

  const handleBlockMined = useCallback((block: any) => {
    console.log('🔗 Nuevo bloque poético minado:', block);
  }, []);

  const handleScroll = useCallback((scrollTop: number, scrollHeight: number) => {
    setScrollProgress(scrollTop / scrollHeight);
  }, []);

  const FragmentCard = useCallback(({ fragment, index }: { fragment: PoemaFragment; index: number }) => {
    const isSelected = selectedFragments.has(fragment.id);
    const isActive = activeFragment?.id === fragment.id;
    
    return (
      <div
        onClick={() => handleFragmentClick(fragment)}
        className={`
          group relative p-4 rounded-xl border cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:z-10
          ${isActive 
            ? 'bg-gradient-to-br from-purple-900/60 to-cyan-900/60 border-purple-400 shadow-xl shadow-purple-400/30' 
            : isSelected
            ? 'bg-gradient-to-br from-pink-900/40 to-purple-900/40 border-pink-400 shadow-lg shadow-pink-400/20'
            : 'bg-black/40 border-gray-600/50 hover:border-cyan-400/70 hover:bg-cyan-900/20'
          }
          backdrop-blur-sm
        `}
        style={{
          animationDelay: `${index * 0.03}s`, // Reducido para mejor performance
          transform: `translateY(${Math.sin(index * 0.1 + scrollProgress * 10) * 1}px)`, // Efecto más sutil
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
                  boxShadow: `0 0 ${fragment.intensity * 4}px hsla(${fragment.intensity * 120}, 70%, 60%, 0.4)`
                }}
              />
              {fragment.cluster !== undefined && (
                <span className="text-xs text-purple-300">C{fragment.cluster}</span>
              )}
            </div>
          </div>
          
          <div className={`text-white leading-relaxed mb-3 group-hover:text-cyan-100 transition-colors ${
            isMobile ? 'text-sm' : 'text-base'
          }`}>
            {fragment.content.length > (isMobile ? 100 : 150) 
              ? `${fragment.content.slice(0, isMobile ? 100 : 150)}...` 
              : fragment.content}
          </div>

          {fragment.tags && (
            <div className="flex flex-wrap gap-1">
              {fragment.tags.slice(0, isMobile ? 2 : 4).map((tag, tagIndex) => (
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
  }, [selectedFragments, activeFragment, handleFragmentClick, isMobile, scrollProgress]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white relative overflow-hidden">
      {/* Header optimizado */}
      <header className="relative z-20 text-center py-6 px-4">
        <h1 className={`font-thin tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-cyan-400 to-yellow-400 mb-4 ${
          isMobile ? 'text-3xl' : 'text-5xl'
        }`}>
          {headerText}
        </h1>
        
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {/* Controles compactos */}
          <div className="flex bg-black/50 rounded-full p-1 backdrop-blur-sm">
            {(['grid', 'flow', 'constellation'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1 text-xs rounded-full transition-all ${
                  viewMode === mode 
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* Intensidad mejorada */}
          <div className="flex items-center gap-2 bg-black/50 rounded-full px-3 py-1 backdrop-blur-sm">
            <span className="text-xs text-gray-400">φ:</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={poeticIntensity}
              onChange={(e) => setPoeticIntensity(parseFloat(e.target.value))}
              className="w-12 accent-purple-500"
            />
            <span className="text-xs text-purple-400">{(poeticIntensity * 100).toFixed(0)}%</span>
          </div>

          {/* Botones de funcionalidad */}
          <button
            onClick={() => setShowChat(!showChat)}
            className={`px-3 py-1 text-xs rounded-full transition-all ${
              showChat 
                ? 'bg-green-600 text-white shadow-lg shadow-green-600/30' 
                : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            chat
          </button>

          <button
            onClick={() => setShowAnalytics(!showAnalytics)}
            className={`px-3 py-1 text-xs rounded-full transition-all ${
              showAnalytics 
                ? 'bg-yellow-600 text-white shadow-lg shadow-yellow-600/30' 
                : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            métricas
          </button>

          <button
            onClick={() => setShowBlockchain(!showBlockchain)}
            className={`px-3 py-1 text-xs rounded-full transition-all ${
              showBlockchain 
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30' 
                : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            blockchain
          </button>
        </div>
      </header>

      {/* Área de contenido optimizada */}
      <div className="relative z-10 px-4 pb-8">
        <OptimizedScrollArea 
          className={isMobile ? 'h-[calc(100vh-160px)]' : 'h-[calc(100vh-200px)]'}
          onScroll={handleScroll}
        >
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
        </OptimizedScrollArea>
      </div>

      {/* Panel de fragmento activo */}
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
                {activeFragment.hash && (
                  <div>Hash: {activeFragment.hash.substring(0, 12)}...</div>
                )}
              </div>
            </div>
          </div>
        </DraggablePoetryPanel>
      )}

      {/* Chat poético */}
      {showChat && <PoetryChat />}

      {/* Panel de analíticas mejorado */}
      {showAnalytics && (
        <DraggablePoetryPanel
          title="analíticas.lovable"
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
                <div className="text-2xl font-mono">{normalizedFragments.length}</div>
              </div>
              <div className="bg-cyan-900/20 p-3 rounded-lg">
                <div className="text-cyan-400 text-sm">Promedio Poético</div>
                <div className="text-2xl font-mono">
                  {normalizedFragments.length > 0 
                    ? (normalizedFragments.reduce((acc, f) => acc + f.poeticScore, 0) / normalizedFragments.length * 100).toFixed(1)
                    : 0}%
                </div>
              </div>
              <div className="bg-pink-900/20 p-3 rounded-lg">
                <div className="text-pink-400 text-sm">Singularidad Media</div>
                <div className="text-2xl font-mono">
                  {normalizedFragments.length > 0 
                    ? (normalizedFragments.reduce((acc, f) => acc + f.uniqueness, 0) / normalizedFragments.length * 100).toFixed(1)
                    : 0}%
                </div>
              </div>
              <div className="bg-yellow-900/20 p-3 rounded-lg">
                <div className="text-yellow-400 text-sm">Seleccionados</div>
                <div className="text-2xl font-mono">{selectedFragments.size}</div>
              </div>
            </div>
            
            <div className="bg-green-900/20 p-3 rounded-lg">
              <div className="text-green-400 text-sm mb-2">Progreso de Scroll</div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-green-400 h-2 rounded-full transition-all"
                  style={{ width: `${scrollProgress * 100}%` }}
                />
              </div>
            </div>
          </div>
        </DraggablePoetryPanel>
      )}

      {/* Blockchain poético */}
      {showBlockchain && (
        <BlockchainPoetryCore 
          fragments={normalizedFragments}
          onBlockMined={handleBlockMined}
        />
      )}

      {/* Efectos de fondo optimizados */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(isMobile ? 8 : 15)].map((_, i) => (
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
