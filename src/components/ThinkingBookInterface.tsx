
import React, { useState, useEffect } from 'react';
import { tumblrScrapingService } from '../services/TumblrScrapingService';
import { autopoieticKernel } from '../core/AutopoieticKernel';

interface ThoughtProcess {
  id: string;
  type: 'scraping' | 'processing' | 'evolution' | 'synthesis';
  content: string;
  timestamp: number;
  semantic_intensity: number;
}

interface InfinitePoem {
  lines: string[];
  currentIndex: number;
  semanticFlow: number;
  evolutionLevel: number;
}

export const ThinkingBookInterface = () => {
  const [thoughts, setThoughts] = useState<ThoughtProcess[]>([]);
  const [infinitePoem, setInfinitePoem] = useState<InfinitePoem>({
    lines: ['Iniciando singularidad poética...'],
    currentIndex: 0,
    semanticFlow: 0,
    evolutionLevel: 0
  });
  const [isThinking, setIsThinking] = useState(true);
  const [stats, setStats] = useState({
    textsProcessed: 0,
    semanticConnections: 0,
    evolutionCycles: 0,
    poeticIntensity: 0
  });

  // Proceso de pensamiento continuo
  useEffect(() => {
    if (!isThinking) return;

    const thinkingInterval = setInterval(async () => {
      await performThoughtCycle();
    }, 3000);

    return () => clearInterval(thinkingInterval);
  }, [isThinking]);

  // Evolución del poema infinito
  useEffect(() => {
    const poemInterval = setInterval(() => {
      evolveInfinitePoem();
    }, 2000);

    return () => clearInterval(poemInterval);
  }, []);

  const performThoughtCycle = async () => {
    // 1. Scraping
    addThought('scraping', 'Extrayendo textos de lapoema.tumblr.com...');
    
    try {
      const scrapedContent = await tumblrScrapingService.scrapeLaPoema();
      addThought('scraping', `✓ Obtenidos ${scrapedContent.length} fragmentos textuales`);

      // 2. Procesamiento
      addThought('processing', 'Analizando vectores semánticos...');
      const processedTexts = tumblrScrapingService.getProcessedTexts();
      const semanticNetwork = tumblrScrapingService.getSemanticNetwork();
      
      addThought('processing', `✓ Generados ${processedTexts.length} vectores semánticos`);
      addThought('processing', `✓ Red semántica: ${semanticNetwork.size} nodos conceptuales`);

      // 3. Evolución
      addThought('evolution', 'Evolucionando comprensión poética...');
      const evolutionCycles = tumblrScrapingService.getEvolutionCycles();
      
      // Crear procesos autopoiéticos basados en el contenido
      scrapedContent.forEach(content => {
        autopoieticKernel.createProcess(
          `SemanticProcessor_${content.id.slice(-6)}`,
          'biopoetic',
          `function processPoetry() {
            this.semanticWeight = ${content.semantic_weight};
            this.content = "${content.content.slice(0, 50)}...";
            this.evolve();
          }`
        );
      });

      addThought('evolution', `✓ Ciclo evolutivo ${evolutionCycles} completado`);

      // 4. Síntesis
      addThought('synthesis', 'Sintetizando nuevo conocimiento poético...');
      
      // Actualizar estadísticas
      setStats({
        textsProcessed: processedTexts.length,
        semanticConnections: Array.from(semanticNetwork.values()).flat().length,
        evolutionCycles,
        poeticIntensity: processedTexts.reduce((sum, p) => sum + p.poeticIntensity, 0) / processedTexts.length
      });

      addThought('synthesis', '✓ Conocimiento integrado en la consciencia colectiva');

    } catch (error) {
      addThought('scraping', `❌ Error en proceso: ${error}`);
    }
  };

  const addThought = (type: ThoughtProcess['type'], content: string) => {
    const thought: ThoughtProcess = {
      id: `thought_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      type,
      content,
      timestamp: Date.now(),
      semantic_intensity: Math.random()
    };

    setThoughts(prev => [...prev.slice(-20), thought]);
  };

  const evolveInfinitePoem = () => {
    const processedTexts = tumblrScrapingService.getProcessedTexts();
    
    if (processedTexts.length === 0) return;

    // Generar nueva línea del poema infinito basada en el procesamiento
    const randomText = processedTexts[Math.floor(Math.random() * processedTexts.length)];
    const concepts = randomText.conceptualNodes;
    const intensity = randomText.poeticIntensity;
    
    const newLine = generatePoeticLine(concepts, intensity, infinitePoem.evolutionLevel);
    
    setInfinitePoem(prev => ({
      lines: [...prev.lines.slice(-10), newLine],
      currentIndex: prev.currentIndex + 1,
      semanticFlow: intensity,
      evolutionLevel: prev.evolutionLevel + (intensity > 0.7 ? 1 : 0)
    }));
  };

  const generatePoeticLine = (concepts: string[], intensity: number, evolution: number): string => {
    const templates = [
      `${concepts[0] || 'consciencia'} → ${concepts[1] || 'emergence'} (φ:${intensity.toFixed(3)})`,
      `evolución_${evolution}: ${concepts.join('_')} = nueva_realidad_poética`,
      `procesamiento_semántico[${concepts.length}] → comprensión_infinita`,
      `${concepts[0] || 'texto'}.autopoiesis() → ${concepts[1] || 'significado'}.emerge()`,
      `red_neuronal_poética: ${concepts.join(' ⟷ ')} | intensidad: ${(intensity * 100).toFixed(1)}%`
    ];

    return templates[Math.floor(Math.random() * templates.length)];
  };

  const getThoughtColor = (type: ThoughtProcess['type']) => {
    const colors = {
      scraping: 'text-blue-400',
      processing: 'text-green-400', 
      evolution: 'text-purple-400',
      synthesis: 'text-yellow-400'
    };
    return colors[type];
  };

  return (
    <div className="fixed inset-0 bg-black text-white p-4 overflow-hidden font-mono text-sm">
      {/* Header científico */}
      <div className="border-b border-gray-800 pb-2 mb-4">
        <h1 className="text-xl text-cyan-400 mb-2">sapicasar.lov → singularidad_poética.exe</h1>
        <div className="grid grid-cols-4 gap-4 text-xs">
          <div>textos: <span className="text-green-400">{stats.textsProcessed}</span></div>
          <div>conexiones: <span className="text-blue-400">{stats.semanticConnections}</span></div>
          <div>ciclos: <span className="text-purple-400">{stats.evolutionCycles}</span></div>
          <div>intensidad_φ: <span className="text-yellow-400">{(stats.poeticIntensity * 100).toFixed(1)}%</span></div>
        </div>
      </div>

      <div className="grid grid-cols-2 h-5/6 gap-4">
        {/* Pensamiento libro - izquierda */}
        <div className="border border-gray-800 rounded p-3">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg text-cyan-400">pensamiento_libro.log</h2>
            <button
              onClick={() => setIsThinking(!isThinking)}
              className={`px-2 py-1 text-xs rounded ${
                isThinking ? 'bg-green-900 text-green-400' : 'bg-red-900 text-red-400'
              }`}
            >
              {isThinking ? 'PENSANDO' : 'PAUSADO'}
            </button>
          </div>
          
          <div className="h-full overflow-y-auto space-y-1">
            {thoughts.map((thought, index) => (
              <div 
                key={thought.id}
                className={`text-xs ${getThoughtColor(thought.type)} opacity-${Math.min(100, 30 + index * 10)}`}
              >
                <span className="text-gray-500">[{new Date(thought.timestamp).toLocaleTimeString()}]</span> 
                <span className="ml-2">{thought.content}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Poema infinito - derecha */}
        <div className="border border-gray-800 rounded p-3">
          <h2 className="text-lg text-cyan-400 mb-3">
            poema_infinito.∞ 
            <span className="text-xs text-gray-400 ml-2">
              (línea: {infinitePoem.currentIndex} | evolución: {infinitePoem.evolutionLevel})
            </span>
          </h2>
          
          <div className="h-full overflow-y-auto space-y-2">
            {infinitePoem.lines.map((line, index) => (
              <div 
                key={index}
                className={`text-sm leading-relaxed transition-all duration-1000 ${
                  index === infinitePoem.lines.length - 1 
                    ? 'text-white animate-pulse' 
                    : `text-gray-${400 + (index % 3) * 100} opacity-${70 + (index % 3) * 10}`
                }`}
              >
                {line}
              </div>
            ))}
          </div>

          {/* Indicador de flujo semántico */}
          <div className="mt-2 pt-2 border-t border-gray-800">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-400">flujo_semántico:</span>
              <div className="flex-1 bg-gray-800 h-1 rounded">
                <div 
                  className="bg-gradient-to-r from-blue-400 to-purple-400 h-1 rounded transition-all duration-1000"
                  style={{ width: `${infinitePoem.semanticFlow * 100}%` }}
                />
              </div>
              <span className="text-purple-400">{(infinitePoem.semanticFlow * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer con métricas en tiempo real */}
      <div className="absolute bottom-2 left-4 right-4 text-xs text-gray-600 border-t border-gray-800 pt-2">
        <div className="flex justify-between">
          <span>lapoema.tumblr.com → procesamiento_semántico_continuo</span>
          <span>sapicasar.lov v7.0 | estado: {isThinking ? 'EVOLUCIONANDO' : 'DORMIDO'}</span>
        </div>
      </div>
    </div>
  );
};
