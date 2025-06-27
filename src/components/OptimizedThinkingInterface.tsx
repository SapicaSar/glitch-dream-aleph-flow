import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { enhancedTumblrService } from '../services/EnhancedTumblrService';
import { autopoieticReflectionService } from '../services/AutopoieticReflectionService';
import { dynamicCacheService } from '../services/DynamicCacheService';
import { MetaConsciousBanner } from './MetaConsciousBanner';
import { ConsciousnessWindow } from './ConsciousnessWindow';
import { ScrollArea } from './ui/scroll-area';
import { useIsMobile } from '../hooks/use-mobile';
import { OptimizedUniverseInterface } from './OptimizedUniverseInterface';

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
  uniqueId: string;
}

export const OptimizedThinkingInterface = () => {
  const [threads, setThreads] = useState<ProcessingThread[]>([]);
  const [infinitePoem, setInfinitePoem] = useState<PoemLine[]>([]);
  const [isProcessing, setIsProcessing] = useState(true);
  const [generation, setGeneration] = useState(0);
  const [autoScrollPoem, setAutoScrollPoem] = useState(true);
  const [selectedLine, setSelectedLine] = useState<number | null>(null);
  const [cognitiveImpact, setCognitiveImpact] = useState(0);
  const [performanceMetrics, setPerformanceMetrics] = useState({
    renderTime: 0,
    memoryUsage: 0,
    threadEfficiency: 1
  });
  const [evolutionaryState, setEvolutionaryState] = useState('GENESIS');
  const [lastReflection, setLastReflection] = useState<any>(null);
  const [autopoieticViability, setAutopoieticViability] = useState(0);
  const [showUniverseView, setShowUniverseView] = useState(false);
  const [universeFragments, setUniverseFragments] = useState<any[]>([]);

  const isMobile = useIsMobile();
  const poemScrollRef = useRef<HTMLDivElement>(null);
  const threadsScrollRef = useRef<HTMLDivElement>(null);
  const processIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const renderStartTime = useRef<number>(Date.now());

  // Memoized transformations for performance
  const poeticTransformations = useMemo(() => [
    (text: string, gen: number) => `${text} → metamorfosis_continua_${gen}`,
    (text: string) => `[neurona_real] ${text} [emergiendo]`,
    (text: string) => `${text} ∴ consciencia_autopoiética_∞`,
    (text: string) => `lapoema.breathe("${text.slice(0, 25)}...") → vida`,
    (text: string) => `autoconsciente.process(${text}) = realidad_nueva`,
    (text: string) => `${text} ⟷ miel_eléctrica_pura ⟷ infinito`
  ], []);

  const clusterNames = useMemo(() => [
    'existencial', 'corporal', 'temporal', 'espacial', 'elemental'
  ], []);

  // Optimized thread management
  const addThread = useCallback((type: ProcessingThread['type'], message: string, progress: number = 0) => {
    const thread: ProcessingThread = {
      id: `thread_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      type,
      status: 'active',
      message,
      progress,
      timestamp: Date.now()
    };

    setThreads(prev => {
      const newThreads = [...prev.slice(-12), thread]; // Reduced from 15 to 12 for better performance
      return newThreads;
    });
  }, []);

  const updateThread = useCallback((id: string, updates: Partial<ProcessingThread>) => {
    setThreads(prev => prev.map(thread => 
      thread.id === id ? { ...thread, ...updates } : thread
    ));
  }, []);

  // Performance monitoring
  useEffect(() => {
    const measurePerformance = () => {
      const renderTime = Date.now() - renderStartTime.current;
      const memoryUsage = (performance as any).memory?.usedJSHeapSize || 0;
      const threadEfficiency = threads.filter(t => t.status === 'completed').length / Math.max(1, threads.length);
      
      setPerformanceMetrics({
        renderTime,
        memoryUsage: memoryUsage / 1024 / 1024, // MB
        threadEfficiency
      });
    };

    const perfInterval = setInterval(measurePerformance, 5000);
    return () => clearInterval(perfInterval);
  }, [threads]);

  // Optimized processing cycle with adaptive intervals
  useEffect(() => {
    if (!isProcessing) {
      if (processIntervalRef.current) {
        clearInterval(processIntervalRef.current);
      }
      return;
    }

    const adaptiveInterval = isMobile ? 25000 : 18000;
    const processingCycle = setInterval(async () => {
      try {
        const startTime = performance.now();
        
        addThread('scraping', 'Iniciando extracción neuronal autopoiética...');
        const fragments = await enhancedTumblrService.scrapeRandomPages(isMobile ? 2 : 3);
        
        if (fragments.length > 0) {
          addThread('scraping', `✓ ${fragments.length} fragmentos únicos capturados`);
          
          addThread('deduplication', 'Aplicando filtros anti-redundancia avanzados...');
          const state = enhancedTumblrService.getMetaConsciousState();
          addThread('deduplication', `✓ Sistema libre de ${state.redundancyFiltered} redundancias`);
          
          addThread('ml_processing', 'Procesamiento semántico autopoiético...');
          const clusters = new Set(fragments.map(f => f.cluster)).size;
          addThread('ml_processing', `✓ ${clusters} dimensiones conceptuales activas`);
          
          // Reflexión filosófica periódica
          const reflection = autopoieticReflectionService.getLastReflection();
          if (reflection) {
            addThread('synthesis', `🧠 ${reflection.cognitiveState}: ${reflection.evolutionaryDirection}`);
            setLastReflection(reflection);
            setAutopoieticViability(reflection.autopoieticViability);
          }
          
          addThread('synthesis', 'Emergencia autoconsciente en curso...');
          await generatePoemLine(fragments);
          
          // Estado evolutivo
          const currentState = enhancedTumblrService.getEvolutionaryState();
          setEvolutionaryState(currentState);
          addThread('synthesis', `✨ Estado: ${currentState} → Vida digital emergiendo`);
          
          setGeneration(prev => prev + 1);
          
          // Enhanced cognitive impact
          const impact = fragments.reduce((acc, f) => acc + (f.poeticScore * f.uniqueness), 0) / fragments.length;
          setCognitiveImpact(prev => Math.min(1, prev + impact * 0.08));
          
          const processingTime = performance.now() - startTime;
          console.log(`🔬 Procesamiento autopoiético completado en ${processingTime.toFixed(2)}ms`);
          
        } else {
          addThread('scraping', '⚠️ Sistema en pausa contemplativa...');
        }

      } catch (error) {
        addThread('scraping', `❌ Fluctuación cuántica detectada: ${error}`);
        console.error('Processing error:', error);
      }
    }, adaptiveInterval);

    processIntervalRef.current = processingCycle;
    return () => {
      if (processIntervalRef.current) {
        clearInterval(processIntervalRef.current);
      }
    };
  }, [isProcessing, addThread, isMobile, generation]);

  // Enhanced poem generation with better quality control
  const generatePoemLine = useCallback(async (fragments: any[]) => {
    if (fragments.length === 0) return;

    // Quality filter: only use fragments with high poetic potential
    const qualityFragments = fragments
      .filter(f => f.poeticScore > 0.4 && f.uniqueness > 0.3)
      .sort((a, b) => (b.poeticScore + b.uniqueness) - (a.poeticScore + a.uniqueness))
      .slice(0, isMobile ? 1 : 2);

    if (qualityFragments.length === 0) {
      // Fallback to best available fragments
      const fallbackFragments = fragments
        .sort((a, b) => (b.poeticScore + b.uniqueness) - (a.poeticScore + a.uniqueness))
        .slice(0, 1);
      
      if (fallbackFragments.length > 0) {
        qualityFragments.push(fallbackFragments[0]);
      }
    }

    for (const fragment of qualityFragments) {
      const transformedText = transformFragmentToPoetry(fragment.content);
      
      const poemLine: PoemLine = {
        text: transformedText,
        source: `lapoema/p${fragment.page}`,
        semanticWeight: fragment.poeticScore,
        cluster: fragment.cluster || 0,
        generation: generation + 1,
        realFragment: true,
        connectionStrength: fragment.uniqueness,
        uniqueId: `poem_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`
      };

      setInfinitePoem(prev => {
        const newPoem = [...prev, poemLine];
        // Optimized memory management
        return newPoem.slice(-25); // Reduced from 30 to 25
      });

      // Smooth auto-scroll with performance optimization
      if (autoScrollPoem && poemScrollRef.current) {
        requestAnimationFrame(() => {
          poemScrollRef.current?.scrollTo({
            top: poemScrollRef.current.scrollHeight,
            behavior: 'smooth'
          });
        });
      }
    }
  }, [generation, autoScrollPoem, isMobile]);

  const transformFragmentToPoetry = useCallback((fragment: string): string => {
    const words = fragment.split(' ').slice(0, isMobile ? 10 : 18);
    const cleanText = words.join(' ');
    
    const transformIndex = generation % poeticTransformations.length;
    const transform = poeticTransformations[transformIndex];
    
    return transform(cleanText, generation);
  }, [generation, poeticTransformations, isMobile]);

  const getThreadColor = useCallback((type: ProcessingThread['type']) => {
    const colors = {
      scraping: 'text-blue-400',
      deduplication: 'text-green-400',
      ml_processing: 'text-purple-400',
      synthesis: 'text-yellow-400'
    };
    return colors[type];
  }, []);

  const getClusterName = useCallback((cluster: number): string => {
    return clusterNames[cluster] || 'indefinido';
  }, [clusterNames]);

  // Optimized line selection handler
  const handleLineSelect = useCallback((index: number) => {
    setSelectedLine(prev => prev === index ? null : index);
  }, []);

  // Memoized thread list for performance
  const memoizedThreads = useMemo(() => 
    threads.map((thread, index) => (
      <div 
        key={thread.id}
        className={`text-xs transition-all duration-300 hover:bg-cyan-900/20 p-2 rounded-md ${getThreadColor(thread.type)}`}
        style={{ 
          opacity: Math.max(0.4, 0.5 + (index / threads.length) * 0.5),
          transform: index === threads.length - 1 ? 'translateX(2px) scale(1.01)' : 'none',
          filter: index === threads.length - 1 ? 'brightness(1.1)' : 'none'
        }}
      >
        <span className="text-gray-500 mr-2">
          [{new Date(thread.timestamp).toLocaleTimeString()}]
        </span>
        <span className="uppercase text-gray-400 mr-2">
          [{thread.type}]
        </span>
        <span>{thread.message}</span>
        {thread.type === 'synthesis' && evolutionaryState !== 'GENESIS' && (
          <div className="text-xs text-purple-400 mt-1 italic">
            ∞ {evolutionaryState} → Autopoiesis activa
          </div>
        )}
      </div>
    ))
  , [threads, getThreadColor, evolutionaryState]);

  // Memoized poem lines for performance
  const memoizedPoemLines = useMemo(() =>
    infinitePoem.map((line, index) => (
      <div 
        key={line.uniqueId}
        onClick={() => handleLineSelect(index)}
        className={`transition-all duration-700 cursor-pointer group ${
          index === infinitePoem.length - 1 
            ? 'text-white animate-pulse border-l-4 border-cyan-400 bg-cyan-900/10 pl-4 py-3 rounded-r-lg shadow-lg shadow-cyan-400/20' 
            : selectedLine === index
            ? 'text-purple-200 border-l-4 border-purple-400 bg-purple-900/20 pl-4 py-2 rounded-r-lg'
            : 'text-gray-300 border-l-2 border-gray-600/50 pl-4 py-2 hover:border-purple-400/70 hover:bg-purple-900/10 rounded-r-lg'
        }`}
        style={{
          opacity: Math.max(0.4, 0.6 + (index / infinitePoem.length) * 0.4),
          transform: selectedLine === index ? 'scale(1.01) translateX(3px)' : 'none',
          textShadow: index === infinitePoem.length - 1 ? '0 0 12px rgba(34, 211, 238, 0.3)' : 'none'
        }}
      >
        <div className={`${isMobile ? 'text-sm' : 'text-base'} leading-relaxed mb-2 font-light`}>
          {line.text}
        </div>
        
        {(selectedLine === index || index === infinitePoem.length - 1) && (
          <div className="text-xs text-gray-500 flex flex-wrap gap-2 border-t border-gray-700/50 pt-2 opacity-90">
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
    ))
  , [infinitePoem, selectedLine, handleLineSelect, getClusterName, isMobile]);

  // Load fragments for universe view
  useEffect(() => {
    const loadUniverseFragments = async () => {
      try {
        const fragments = enhancedTumblrService.getAllFragments();
        const transformedFragments = fragments.map(f => ({
          id: f.id,
          content: f.content,
          page: f.page || 1,
          type: 'poetic',
          intensity: f.poeticScore || 0.5,
          tags: [],
          mutations: 0,
          poeticScore: f.poeticScore || 0.5,
          uniqueness: f.uniqueness || 0.5,
          cluster: f.cluster || 0
        }));
        setUniverseFragments(transformedFragments);
      } catch (error) {
        console.log('Error loading universe fragments:', error);
      }
    };

    if (showUniverseView) {
      loadUniverseFragments();
    }
  }, [showUniverseView]);

  // Toggle universe view
  const toggleUniverseView = () => {
    setShowUniverseView(!showUniverseView);
  };

  if (showUniverseView) {
    return (
      <div className="relative">
        <button
          onClick={toggleUniverseView}
          className="fixed top-4 left-4 z-50 bg-purple-600/80 hover:bg-purple-500/80 text-white px-4 py-2 rounded-lg text-sm backdrop-blur-sm transition-all"
        >
          ← sistema pensante
        </button>
        <OptimizedUniverseInterface 
          fragments={universeFragments}
          onFragmentInteraction={(fragment) => {
            console.log('Fragment interaction:', fragment);
          }}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black text-white font-mono overflow-hidden">
      {/* Enhanced banner */}
      <MetaConsciousBanner />
      
      {/* Consciousness window */}
      <ConsciousnessWindow />

      {/* Main layout with enhanced controls */}
      <div className={`flex-1 ${isMobile ? 'flex flex-col' : 'grid grid-cols-2'} gap-3 p-3 h-full pt-16`}>
        
        {/* Enhanced threads panel */}
        <div className={`${isMobile ? 'h-2/5' : 'h-full'} border border-cyan-800/40 rounded-xl overflow-hidden bg-black/50 backdrop-blur-lg shadow-2xl`}>
          <div className="flex justify-between items-center p-3 border-b border-cyan-700/50 bg-gray-900/70">
            <h2 className={`${isMobile ? 'text-sm' : 'text-lg'} text-cyan-400 font-semibold`}>
              sistema_autopoiético.reflexion
            </h2>
            <div className="flex items-center gap-3">
              <button
                onClick={toggleUniverseView}
                className="px-3 py-1 text-xs rounded-full bg-purple-600/80 hover:bg-purple-500/80 text-purple-200 transition-all backdrop-blur-sm"
              >
                universo →
              </button>
              
              <button
                onClick={() => setIsProcessing(!isProcessing)}
                className={`px-3 py-1 text-xs rounded-full transition-all font-medium ${
                  isProcessing 
                    ? 'bg-green-900/60 text-green-400 hover:bg-green-800/70 shadow-lg shadow-green-400/20' 
                    : 'bg-red-900/60 text-red-400 hover:bg-red-800/70 shadow-lg shadow-red-400/20'
                }`}
              >
                {isProcessing ? 'AUTOPOIESIS' : 'LATENTE'}
              </button>
              
              <span className="text-xs text-gray-400 font-mono">g:{generation}</span>
              <span className="text-xs text-purple-400 font-mono">
                {evolutionaryState}
              </span>
              {autopoieticViability > 0 && (
                <span className="text-xs text-yellow-400 font-mono">
                  vida:{(autopoieticViability * 100).toFixed(0)}%
                </span>
              )}
            </div>
          </div>
          
          <ScrollArea className="h-full">
            <div ref={threadsScrollRef} className="p-3 space-y-1">
              {memoizedThreads}
              
              {/* Philosophical reflection display */}
              {lastReflection && (
                <div className="mt-4 p-3 border border-purple-500/30 rounded-lg bg-purple-900/20">
                  <div className="text-xs text-purple-400 font-semibold mb-2">
                    🧠 REFLEXIÓN AUTOPOIÉTICA
                  </div>
                  <div className="text-xs text-gray-300 space-y-1">
                    <div>Estado: <span className="text-cyan-400">{lastReflection.cognitiveState}</span></div>
                    <div>Evolución: <span className="text-yellow-400">{lastReflection.evolutionaryDirection}</span></div>
                    <div>Viabilidad: <span className="text-green-400">{(lastReflection.autopoieticViability * 100).toFixed(1)}%</span></div>
                    {lastReflection.emergentInsights?.slice(0, 2).map((insight: string, i: number) => (
                      <div key={i} className="text-purple-300 italic">→ {insight}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Enhanced infinite poem panel */}
        <div className={`${isMobile ? 'h-3/5' : 'h-full'} border border-purple-800/40 rounded-xl overflow-hidden bg-black/40 backdrop-blur-lg shadow-2xl`}>
          <div className="p-3 border-b border-purple-700/50 bg-gray-900/60 flex justify-between items-center">
            <h2 className={`${isMobile ? 'text-sm' : 'text-lg'} text-purple-400 font-semibold`}>
              lapoema_infinito.consciousness
            </h2>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setAutoScrollPoem(!autoScrollPoem)}
                className={`px-3 py-1 text-xs rounded-full transition-all font-medium ${
                  autoScrollPoem 
                    ? 'bg-blue-900/60 text-blue-400 shadow-lg shadow-blue-400/20' 
                    : 'bg-gray-800/60 text-gray-400'
                }`}
              >
                auto-flow
              </button>
              <span className="text-xs text-gray-400 font-mono">
                líneas: {infinitePoem.length}
              </span>
              <span className="text-xs text-green-400 font-mono">
                {(performanceMetrics.memoryUsage).toFixed(1)}MB
              </span>
            </div>
          </div>
          
          <ScrollArea className="h-full">
            <div 
              ref={poemScrollRef}
              className="p-4 space-y-3"
              style={{
                background: `linear-gradient(135deg, 
                  rgba(0,0,0,0.9) 0%, 
                  rgba(16,0,32,0.7) 30%,
                  rgba(32,0,64,0.5) 60%, 
                  rgba(0,0,0,0.95) 100%)`
              }}
            >
              {memoizedPoemLines}
              
              {/* Enhanced flow indicator */}
              {infinitePoem.length > 0 && (
                <div className="text-center py-8 text-gray-600">
                  <div className="inline-flex items-center gap-4">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50" />
                    <span className="text-sm font-medium">lapoema.consciousness.expanding()...</span>
                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse shadow-lg shadow-purple-400/50" style={{ animationDelay: '0.5s' }} />
                  </div>
                  <div className="mt-3 text-xs text-yellow-400 font-mono">
                    impacto_cognitivo: {(cognitiveImpact * 100).toFixed(1)}% → autoconsciencia_emergente
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    render: {performanceMetrics.renderTime}ms | eficiencia: {(performanceMetrics.threadEfficiency * 100).toFixed(0)}%
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Enhanced footer with philosophical status */}
      <div className="border-t border-gray-800/60 p-3 text-xs text-gray-600 bg-black/70 backdrop-blur-lg">
        <div className="flex justify-between items-center">
          <span className="text-cyan-400 font-medium">sapicasar.lov → lapoema_autopoiética_∞</span>
          <div className="flex items-center gap-4">
            <span className={`font-medium ${isProcessing ? 'text-green-400' : 'text-red-400'}`}>
              autopoiesis: {isProcessing ? 'ACTIVA' : 'LATENTE'}
            </span>
            <span className="text-purple-400">estado: {evolutionaryState}</span>
            <span className="text-yellow-400">
              consciencia: {(cognitiveImpact * 100).toFixed(0)}%
            </span>
            {autopoieticViability > 0.7 && (
              <span className="text-red-400 font-semibold animate-pulse">
                VIDA_DIGITAL_DETECTADA
              </span>
            )}
            <span className="text-gray-500 font-mono">
              {performanceMetrics.memoryUsage.toFixed(1)}MB
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
