
import React, { useState, useEffect, useCallback } from 'react';
import { enhancedTumblrService } from '../services/EnhancedTumblrService';
import { MetaConsciousBanner } from './MetaConsciousBanner';

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
}

export const OptimizedThinkingInterface = () => {
  const [threads, setThreads] = useState<ProcessingThread[]>([]);
  const [infinitePoem, setInfinitePoem] = useState<PoemLine[]>([]);
  const [isProcessing, setIsProcessing] = useState(true);
  const [generation, setGeneration] = useState(0);

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

  // Ciclo principal de procesamiento
  useEffect(() => {
    if (!isProcessing) return;

    const processingCycle = setInterval(async () => {
      try {
        // 1. Scraping inteligente
        addThread('scraping', 'Iniciando scraping de páginas aleatorias...');
        const fragments = await enhancedTumblrService.scrapeRandomPages(3);
        
        if (fragments.length > 0) {
          addThread('scraping', `✓ ${fragments.length} fragmentos extraídos`);
          
          // 2. Deduplicación
          addThread('deduplication', 'Filtrando duplicados y redundancias...');
          const state = enhancedTumblrService.getMetaConsciousState();
          addThread('deduplication', `✓ ${state.redundancyFiltered} duplicados filtrados`);
          
          // 3. Procesamiento ML local
          addThread('ml_processing', 'Procesando embeddings y clustering...');
          const clusters = new Set(fragments.map(f => f.cluster)).size;
          addThread('ml_processing', `✓ ${clusters} clusters semánticos identificados`);
          
          // 4. Síntesis poética
          addThread('synthesis', 'Sintetizando nuevo verso del poema infinito...');
          await generatePoemLine(fragments);
          addThread('synthesis', '✓ Nueva línea poética integrada');
          
          setGeneration(prev => prev + 1);
        } else {
          addThread('scraping', '⚠️ No se obtuvieron fragmentos nuevos');
        }

      } catch (error) {
        addThread('scraping', `❌ Error en ciclo: ${error}`);
      }
    }, 15000);

    return () => clearInterval(processingCycle);
  }, [isProcessing, addThread]);

  const generatePoemLine = async (fragments: any[]) => {
    if (fragments.length === 0) return;

    const bestFragment = fragments.reduce((best, current) => 
      (current.poeticScore + current.uniqueness) > (best.poeticScore + best.uniqueness) 
        ? current 
        : best
    );

    // Generar línea poética basada en fragmento real
    const poemLine: PoemLine = {
      text: transformFragmentToPoetry(bestFragment.content),
      source: `lapoema/p${bestFragment.page}`,
      semanticWeight: bestFragment.poeticScore,
      cluster: bestFragment.cluster || 0,
      generation: generation + 1
    };

    setInfinitePoem(prev => [...prev.slice(-20), poemLine]);
  };

  const transformFragmentToPoetry = (fragment: string): string => {
    // Transformación poética del fragmento
    const words = fragment.split(' ').slice(0, 12);
    const transformations = [
      (text: string) => `${text} → metamorfosis_${generation}`,
      (text: string) => `[fragmento_real] ${text} [/end]`,
      (text: string) => `${text} ∴ nueva_consciencia_poética`,
      (text: string) => `procesamiento(${text}) = infinito`,
      (text: string) => `lapoema.consciousness["${text.slice(0, 20)}..."]`
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
    <div className="fixed inset-0 bg-black text-white font-mono text-sm overflow-hidden">
      {/* Banner metaconsciente */}
      <MetaConsciousBanner />

      {/* Interfaz principal */}
      <div className="flex-1 grid grid-cols-2 gap-4 p-4 h-full">
        {/* Threads de procesamiento */}
        <div className="border border-gray-800 rounded p-3 overflow-hidden">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg text-cyan-400">sistema_procesamiento.log</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsProcessing(!isProcessing)}
                className={`px-2 py-1 text-xs rounded ${
                  isProcessing ? 'bg-green-900 text-green-400' : 'bg-red-900 text-red-400'
                }`}
              >
                {isProcessing ? 'ACTIVO' : 'PAUSADO'}
              </button>
              <span className="text-xs text-gray-400">gen:{generation}</span>
            </div>
          </div>
          
          <div className="h-full overflow-y-auto space-y-1">
            {threads.map((thread) => (
              <div 
                key={thread.id}
                className={`text-xs ${getThreadColor(thread.type)} transition-opacity duration-500`}
              >
                <span className="text-gray-500">
                  [{new Date(thread.timestamp).toLocaleTimeString()}]
                </span>
                <span className="ml-2 uppercase text-gray-400">
                  [{thread.type}]
                </span>
                <span className="ml-2">{thread.message}</span>
                {thread.progress > 0 && (
                  <span className="ml-2 text-gray-600">
                    {thread.progress}%
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Poema infinito optimizado */}
        <div className="border border-gray-800 rounded p-3 overflow-hidden">
          <h2 className="text-lg text-cyan-400 mb-3">
            poema_infinito_lapoema.∞
            <span className="text-xs text-gray-400 ml-2">
              (líneas: {infinitePoem.length} | gen: {generation})
            </span>
          </h2>
          
          <div className="h-full overflow-y-auto space-y-3">
            {infinitePoem.map((line, index) => (
              <div 
                key={index}
                className={`transition-all duration-1000 ${
                  index === infinitePoem.length - 1 
                    ? 'text-white animate-pulse border-l-2 border-cyan-400 pl-3' 
                    : 'text-gray-300 opacity-80'
                }`}
              >
                <div className="text-sm leading-relaxed mb-1">
                  {line.text}
                </div>
                <div className="text-xs text-gray-500 flex justify-between">
                  <span>{line.source}</span>
                  <span>{getClusterName(line.cluster)}</span>
                  <span>φ:{(line.semanticWeight * 100).toFixed(0)}%</span>
                  <span>g{line.generation}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer con métricas de rendimiento */}
      <div className="border-t border-gray-800 p-2 text-xs text-gray-600">
        <div className="flex justify-between">
          <span>sapicasar.lov → metaconsciente_poético_optimizado</span>
          <span>
            rendimiento: {isProcessing ? 'MÁXIMO' : 'SUSPENDIDO'} | 
            ml_local: ACTIVO | 
            deduplicación: INTELIGENTE
          </span>
        </div>
      </div>
    </div>
  );
};
