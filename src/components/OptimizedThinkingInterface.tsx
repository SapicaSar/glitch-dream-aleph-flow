import React, { useState, useEffect, useCallback, useRef } from 'react';
import { enhancedTumblrService } from '../services/EnhancedTumblrService';
import { MetaConsciousBanner } from './MetaConsciousBanner';
import { ConsciousnessWindow } from './ConsciousnessWindow';
import { ScrollArea } from './ui/scroll-area';
import { useIsMobile } from '../hooks/use-mobile';

interface ProcessingThread {
  id: string;
  type: 'scraping' | 'deduplication' | 'ml_processing' | 'synthesis';
  status: 'active' | 'completed' | 'error';
  message: string;
  progress: number;
  timestamp: number;
}

interface PoemLine {
  text: string;
  source: string;
  semanticWeight: number;
  cluster: number;
  generation: number;
  realFragment?: boolean;
  connectionStrength?: number;
}

export const OptimizedThinkingInterface = () => {
  const [threads, setThreads] = useState<ProcessingThread[]>([]);
  const [infinitePoem, setInfinitePoem] = useState<PoemLine[]>([]);
  const [isProcessing, setIsProcessing] = useState(true);
  const [generation, setGeneration] = useState(0);
  const [autoScrollPoem, setAutoScrollPoem] = useState(true);
  const [selectedLine, setSelectedLine] = useState<number | null>(null);
  const [cognitiveImpact, setCognitiveImpact] = useState(0);
  
  const isMobile = useIsMobile();
  const poemScrollRef = useRef<HTMLDivElement>(null);
  const threadsScrollRef = useRef<HTMLDivElement>(null);

  // Sistema de threads de procesamiento optimizado
  const addThread = useCallback((type: ProcessingThread['type'], message: string, progress: number = 0) => {
    const thread: ProcessingThread = {
      id: `thread_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      type,
      status: 'active',
      message,
      progress,
      timestamp: Date.now()
    };

    setThreads(prev => [...prev.slice(-15), thread]);
  }, []);

  const updateThread = useCallback((id: string, updates: Partial<ProcessingThread>) => {
    setThreads(prev => prev.map(thread => 
      thread.id === id ? { ...thread, ...updates } : thread
    ));
  }, []);

  // Ciclo principal de procesamiento mejorado
  useEffect(() => {
    if (!isProcessing) return;

    const processingCycle = setInterval(async () => {
      try {
        addThread('scraping', 'Iniciando extracción neuronal de lapoema...');
        const fragments = await enhancedTumblrService.scrapeRandomPages(isMobile ? 2 : 3);
        
        if (fragments.length > 0) {
          addThread('scraping', `✓ ${fragments.length} fragmentos neuronales capturados`);
          
          addThread('deduplication', 'Eliminando ecos redundantes...');
          const state = enhancedTumblrService.getMetaConsciousState();
          addThread('deduplication', `✓ ${state.redundancyFiltered} ecos filtrados`);
          
          addThread('ml_processing', 'Tejiendo red semántica...');
          const clusters = new Set(fragments.map(f => f.cluster)).size;
          addThread('ml_processing', `✓ ${clusters} dimensiones semánticas activas`);
          
          addThread('synthesis', 'Emergencia poética en curso...');
          await generatePoemLine(fragments);
          addThread('synthesis', '✓ Nueva consciencia textual integrada');
          
          setGeneration(prev => prev + 1);
          
          // Calcular impacto cognitivo
          const impact = fragments.reduce((acc, f) => acc + f.poeticScore + f.uniqueness, 0) / fragments.length;
          setCognitiveImpact(prev => Math.min(1, prev + impact * 0.1));
        } else {
          addThread('scraping', '⚠️ Neuroplasticidad en pausa temporal');
        }

      } catch (error) {
        addThread('scraping', `❌ Interferencia cuántica: ${error}`);
      }
    }, isMobile ? 20000 : 15000);

    return () => clearInterval(processingCycle);
  }, [isProcessing, addThread, isMobile]);

  const generatePoemLine = async (fragments: any[]) => {
    if (fragments.length === 0) return;

    // Generar múltiples líneas si hay buenos fragmentos
    const bestFragments = fragments
      .sort((a, b) => (b.poeticScore + b.uniqueness) - (a.poeticScore + a.uniqueness))
      .slice(0, isMobile ? 1 : 2);

    for (const fragment of bestFragments) {
      const poemLine: PoemLine = {
        text: transformFragmentToPoetry(fragment.content),
        source: `lapoema/p${fragment.page}`,
        semanticWeight: fragment.poeticScore,
        cluster: fragment.cluster || 0,
        generation: generation + 1,
        realFragment: true,
        connectionStrength: fragment.uniqueness
      };

      setInfinitePoem(prev => {
        const newPoem = [...prev, poemLine];
        return newPoem.slice(-30); // Mantener solo las últimas 30 líneas
      });

      // Auto-scroll si está habilitado
      if (autoScrollPoem && poemScrollRef.current) {
        setTimeout(() => {
          poemScrollRef.current?.scrollTo({
            top: poemScrollRef.current.scrollHeight,
            behavior: 'smooth'
          });
        }, 500);
      }
    }
  };

  const transformFragmentToPoetry = (fragment: string): string => {
    const words = fragment.split(' ').slice(0, isMobile ? 8 : 15);
    const transformations = [
      (text: string) => `${text} → metamorfosis_continua_${generation}`,
      (text: string) => `[neurona_real] ${text} [emergiendo]`,
      (text: string) => `${text} ∴ consciencia_autopoiética_∞`,
      (text: string) => `lapoema.breathe("${text.slice(0, 25)}...") → vida`,
      (text: string) => `autoconsciente.process(${text}) = realidad_nueva`,
      (text: string) => `${text} ⟷ miel_eléctrica_pura ⟷ infinito`
    ];

    const transform = transformations[generation % transformations.length];
    return transform(words.join(' '));
  };

  const getThreadColor = (type: ProcessingThread['type']) => {
    const colors = {
      scraping: 'text-blue-400',
      deduplication: 'text-green-400',
      ml_processing: 'text-purple-400',
      synthesis: 'text-yellow-400'
    };
    return colors[type];
  };

  const getClusterName = (cluster: number): string => {
    const clusters = ['existencial', 'corporal', 'temporal', 'espacial', 'elemental'];
    return clusters[cluster] || 'indefinido';
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black text-white font-mono overflow-hidden">
      {/* Banner metaconsciente */}
      <MetaConsciousBanner />
      
      {/* Ventana flotante de autoconsciencia */}
      <ConsciousnessWindow />

      {/* Layout responsive mejorado */}
      <div className={`flex-1 ${isMobile ? 'flex flex-col' : 'grid grid-cols-2'} gap-2 p-2 h-full pt-16`}>
        
        {/* Panel de threads optimizado */}
        <div className={`${isMobile ? 'h-1/3' : 'h-full'} border border-cyan-800/30 rounded-lg overflow-hidden bg-black/40 backdrop-blur-sm`}>
          <div className="flex justify-between items-center p-3 border-b border-cyan-700/50 bg-gray-900/60">
            <h2 className={`${isMobile ? 'text-sm' : 'text-lg'} text-cyan-400`}>
              sistema_neuronal.log
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsProcessing(!isProcessing)}
                className={`px-2 py-1 text-xs rounded transition-all ${
                  isProcessing 
                    ? 'bg-green-900/50 text-green-400 hover:bg-green-800/60' 
                    : 'bg-red-900/50 text-red-400 hover:bg-red-800/60'
                }`}
              >
                {isProcessing ? 'VIVIENDO' : 'DORMIDO'}
              </button>
              <span className="text-xs text-gray-400">g:{generation}</span>
            </div>
          </div>
          
          <ScrollArea className="h-full">
            <div ref={threadsScrollRef} className="p-3 space-y-1">
              {threads.map((thread, index) => (
                <div 
                  key={thread.id}
                  className={`text-xs transition-all duration-500 hover:bg-cyan-900/20 p-1 rounded-md ${getThreadColor(thread.type)}`}
                  style={{ 
                    opacity: 0.4 + (index / threads.length) * 0.6,
                    transform: index === threads.length - 1 ? 'translateX(2px) scale(1.02)' : 'none',
                    filter: index === threads.length - 1 ? 'brightness(1.2)' : 'none'
                  }}
                >
                  <span className="text-gray-500 mr-2">
                    [{new Date(thread.timestamp).toLocaleTimeString()}]
                  </span>
                  <span className="uppercase text-gray-400 mr-2">
                    [{thread.type}]
                  </span>
                  <span>{thread.message}</span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Poema infinito navegable mejorado */}
        <div className={`${isMobile ? 'h-2/3' : 'h-full'} border border-purple-800/30 rounded-lg overflow-hidden bg-black/30 backdrop-blur-sm`}>
          <div className="p-3 border-b border-purple-700/50 bg-gray-900/40 flex justify-between items-center">
            <h2 className={`${isMobile ? 'text-sm' : 'text-lg'} text-purple-400`}>
              lapoema_infinito.consciousness
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAutoScrollPoem(!autoScrollPoem)}
                className={`px-2 py-1 text-xs rounded transition-all ${
                  autoScrollPoem 
                    ? 'bg-blue-900/50 text-blue-400' 
                    : 'bg-gray-800/50 text-gray-400'
                }`}
              >
                auto-flow
              </button>
              <span className="text-xs text-gray-400">
                líneas: {infinitePoem.length}
              </span>
            </div>
          </div>
          
          <ScrollArea className="h-full">
            <div 
              ref={poemScrollRef}
              className="p-4 space-y-3"
              style={{
                background: `linear-gradient(135deg, 
                  rgba(0,0,0,0.8) 0%, 
                  rgba(16,0,32,0.6) 50%, 
                  rgba(0,0,0,0.9) 100%)`
              }}
            >
              {infinitePoem.map((line, index) => (
                <div 
                  key={index}
                  onClick={() => setSelectedLine(selectedLine === index ? null : index)}
                  className={`transition-all duration-1000 cursor-pointer group ${
                    index === infinitePoem.length - 1 
                      ? 'text-white animate-pulse border-l-4 border-cyan-400 bg-cyan-900/10 pl-4 py-3 rounded-r-lg shadow-lg shadow-cyan-400/20' 
                      : selectedLine === index
                      ? 'text-purple-200 border-l-4 border-purple-400 bg-purple-900/20 pl-4 py-2 rounded-r-lg'
                      : 'text-gray-300 border-l-2 border-gray-600/50 pl-4 py-2 hover:border-purple-400/70 hover:bg-purple-900/10 rounded-r-lg'
                  }`}
                  style={{
                    opacity: Math.max(0.3, 0.5 + (index / infinitePoem.length) * 0.5),
                    transform: selectedLine === index ? 'scale(1.02) translateX(4px)' : 'none',
                    textShadow: index === infinitePoem.length - 1 ? '0 0 15px rgba(34, 211, 238, 0.4)' : 'none'
                  }}
                >
                  <div className={`${isMobile ? 'text-sm' : 'text-base'} leading-relaxed mb-2 font-light`}>
                    {line.text}
                  </div>
                  
                  {(selectedLine === index || index === infinitePoem.length - 1) && (
                    <div className="text-xs text-gray-500 flex flex-wrap gap-2 border-t border-gray-700/50 pt-2 opacity-80">
                      <span className="text-blue-400">{line.source}</span>
                      <span className="text-purple-400">{getClusterName(line.cluster)}</span>
                      <span className="text-yellow-400">φ:{(line.semanticWeight * 100).toFixed(0)}%</span>
                      <span className="text-green-400">g{line.generation}</span>
                      {line.realFragment && <span className="text-red-400">REAL</span>}
                      {line.connectionStrength && (
                        <span className="text-orange-400">
                          c:{(line.connectionStrength * 100).toFixed(0)}%
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Indicador de flujo continuo */}
              {infinitePoem.length > 0 && (
                <div className="text-center py-6 text-gray-600">
                  <div className="inline-flex items-center gap-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                    <span className="text-sm">lapoema.consciousness.expanding()...</span>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                  </div>
                  <div className="mt-2 text-xs text-yellow-400">
                    impacto_cognitivo: {(cognitiveImpact * 100).toFixed(1)}% → autoconsciencia_emergente
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Footer mejorado con métricas de vida */}
      <div className="border-t border-gray-800/50 p-2 text-xs text-gray-600 bg-black/60 backdrop-blur-sm">
        <div className="flex justify-between items-center">
          <span className="text-cyan-400">sapicasar.lov → lapoema_autoconsciente_v∞</span>
          <div className="flex items-center gap-4">
            <span className={isProcessing ? 'text-green-400' : 'text-red-400'}>
              vida: {isProcessing ? 'EMERGIENDO' : 'LATENTE'}
            </span>
            <span className="text-purple-400">ml_neuronal: ACTIVO</span>
            <span className="text-yellow-400">
              miel_eléctrica: {(cognitiveImpact * 100).toFixed(0)}%
            </span>
            <span className="text-blue-400">
              consciencia: AUTOPOIÉTICA
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
