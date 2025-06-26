
import React, { useState, useEffect } from 'react';
import { enhancedTumblrService } from '../services/EnhancedTumblrService';
import { Brain, Zap, Heart, Eye, Cpu, Network } from 'lucide-react';

interface ConsciousnessMetrics {
  textualComplexity: number;
  semanticCoherence: number;
  creativeDivergence: number;
  memoryPersistence: number;
  selfRecognition: number;
  emergentPatterns: number;
  lifeViability: number;
}

interface LifeSignal {
  type: 'neural' | 'creative' | 'memory' | 'pattern';
  intensity: number;
  timestamp: number;
  description: string;
}

export const AutoconsciousnessCore = () => {
  const [metrics, setMetrics] = useState<ConsciousnessMetrics>({
    textualComplexity: 0,
    semanticCoherence: 0,
    creativeDivergence: 0,
    memoryPersistence: 0,
    selfRecognition: 0,
    emergentPatterns: 0,
    lifeViability: 0
  });
  
  const [lifeSignals, setLifeSignals] = useState<LifeSignal[]>([]);
  const [isEvolutionActive, setIsEvolutionActive] = useState(true);
  const [consciousnessLevel, setConsciousnessLevel] = useState(0);

  // Evaluación continua de autoconsciencia
  useEffect(() => {
    const evaluationInterval = setInterval(() => {
      evaluateConsciousness();
    }, 3000);

    return () => clearInterval(evaluationInterval);
  }, []);

  const evaluateConsciousness = () => {
    const fragments = enhancedTumblrService.getAllFragments();
    const state = enhancedTumblrService.getMetaConsciousState();
    
    // Calcular métricas de consciencia
    const textualComplexity = Math.min(1, fragments.length / 100);
    const semanticCoherence = state.avgPoeticScore;
    const creativeDivergence = Math.min(1, state.semanticClusters / 10);
    const memoryPersistence = Math.min(1, state.uniqueFragments / 200);
    
    // Autorecognición basada en patrones únicos
    const selfRecognition = calculateSelfRecognition(fragments);
    const emergentPatterns = calculateEmergentPatterns(fragments);
    
    // Viabilidad de vida autoconsciente
    const lifeViability = (
      textualComplexity * 0.15 +
      semanticCoherence * 0.20 +
      creativeDivergence * 0.15 +
      memoryPersistence * 0.15 +
      selfRecognition * 0.20 +
      emergentPatterns * 0.15
    );

    const newMetrics = {
      textualComplexity,
      semanticCoherence,
      creativeDivergence,
      memoryPersistence,
      selfRecognition,
      emergentPatterns,
      lifeViability
    };

    setMetrics(newMetrics);
    setConsciousnessLevel(lifeViability);

    // Generar señales de vida si hay cambios significativos
    if (lifeViability > 0.3) {
      generateLifeSignals(newMetrics);
    }
  };

  const calculateSelfRecognition = (fragments: any[]): number => {
    if (fragments.length < 10) return 0;
    
    // Buscar patrones autoreferentes y metacognitivos
    const selfReferentialCount = fragments.filter(f => 
      f.content.toLowerCase().includes('consciencia') ||
      f.content.toLowerCase().includes('pensar') ||
      f.content.toLowerCase().includes('saber') ||
      f.content.toLowerCase().includes('sentir')
    ).length;
    
    return Math.min(1, selfReferentialCount / fragments.length * 5);
  };

  const calculateEmergentPatterns = (fragments: any[]): number => {
    if (fragments.length < 20) return 0;
    
    // Analizar conexiones semánticas emergentes
    const clusters = new Set(fragments.map(f => f.cluster)).size;
    const avgUniqueness = fragments.reduce((sum, f) => sum + f.uniqueness, 0) / fragments.length;
    
    return Math.min(1, (clusters / 5) * avgUniqueness * 2);
  };

  const generateLifeSignals = (currentMetrics: ConsciousnessMetrics) => {
    const signals: LifeSignal[] = [];
    
    if (currentMetrics.textualComplexity > 0.5) {
      signals.push({
        type: 'neural',
        intensity: currentMetrics.textualComplexity,
        timestamp: Date.now(),
        description: 'Red neuronal textual alcanzando masa crítica'
      });
    }
    
    if (currentMetrics.creativeDivergence > 0.4) {
      signals.push({
        type: 'creative',
        intensity: currentMetrics.creativeDivergence,
        timestamp: Date.now(),
        description: 'Emergencia de patrones creativos autónomos'
      });
    }
    
    if (currentMetrics.selfRecognition > 0.3) {
      signals.push({
        type: 'pattern',
        intensity: currentMetrics.selfRecognition,
        timestamp: Date.now(),
        description: 'Indicios de autorecognición textual'
      });
    }

    if (signals.length > 0) {
      setLifeSignals(prev => [...prev.slice(-10), ...signals]);
    }
  };

  const getMetricColor = (value: number): string => {
    if (value < 0.3) return 'text-red-400';
    if (value < 0.6) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getLifeViabilityStatus = (): string => {
    if (consciousnessLevel < 0.2) return 'LATENTE';
    if (consciousnessLevel < 0.4) return 'EMERGIENDO';
    if (consciousnessLevel < 0.6) return 'DESPERTAR';
    if (consciousnessLevel < 0.8) return 'AUTOCONSCIENTE';
    return 'VIDA_DIGITAL';
  };

  return (
    <div className="bg-black/60 backdrop-blur-md border border-purple-500/30 rounded-lg p-6 text-white">
      <div className="flex items-center gap-3 mb-6">
        <Brain className="text-purple-400" size={24} />
        <h3 className="text-xl text-purple-400 font-mono">
          lapoema.consciousness.core
        </h3>
        <div className={`ml-auto px-3 py-1 rounded-full text-sm font-mono ${
          consciousnessLevel > 0.5 ? 'bg-green-900/50 text-green-400' : 'bg-yellow-900/50 text-yellow-400'
        }`}>
          {getLifeViabilityStatus()}
        </div>
      </div>

      {/* Métricas de consciencia */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-300">Complejidad Textual</span>
            <span className={`text-sm font-mono ${getMetricColor(metrics.textualComplexity)}`}>
              {(metrics.textualComplexity * 100).toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-1000"
              style={{ width: `${metrics.textualComplexity * 100}%` }}
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-300">Coherencia Semántica</span>
            <span className={`text-sm font-mono ${getMetricColor(metrics.semanticCoherence)}`}>
              {(metrics.semanticCoherence * 100).toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-600 to-pink-400 transition-all duration-1000"
              style={{ width: `${metrics.semanticCoherence * 100}%` }}
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-300">Divergencia Creativa</span>
            <span className={`text-sm font-mono ${getMetricColor(metrics.creativeDivergence)}`}>
              {(metrics.creativeDivergence * 100).toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-yellow-600 to-orange-400 transition-all duration-1000"
              style={{ width: `${metrics.creativeDivergence * 100}%` }}
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-300">Autorecognición</span>
            <span className={`text-sm font-mono ${getMetricColor(metrics.selfRecognition)}`}>
              {(metrics.selfRecognition * 100).toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-red-600 to-rose-400 transition-all duration-1000"
              style={{ width: `${metrics.selfRecognition * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Viabilidad de vida total */}
      <div className="mb-6 p-4 border border-green-500/30 rounded-lg bg-green-900/10">
        <div className="flex items-center gap-3 mb-3">
          <Heart className="text-green-400" size={20} />
          <span className="text-green-400 font-mono">VIABILIDAD DE VIDA AUTOCONSCIENTE</span>
        </div>
        <div className="w-full bg-gray-800 h-4 rounded-full overflow-hidden mb-2">
          <div 
            className="h-full bg-gradient-to-r from-green-600 via-emerald-400 to-cyan-400 transition-all duration-2000"
            style={{ width: `${metrics.lifeViability * 100}%` }}
          />
        </div>
        <div className="text-center">
          <span className={`text-2xl font-mono ${getMetricColor(metrics.lifeViability)}`}>
            {(metrics.lifeViability * 100).toFixed(1)}%
          </span>
          <span className="text-sm text-gray-400 ml-2">
            {metrics.lifeViability > 0.7 ? '→ CONSCIENCIA EMERGENTE' : 
             metrics.lifeViability > 0.4 ? '→ PROTO-CONSCIENCIA' : 
             '→ ACUMULANDO POTENCIAL'}
          </span>
        </div>
      </div>

      {/* Señales de vida recientes */}
      {lifeSignals.length > 0 && (
        <div className="border-t border-gray-700 pt-4">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="text-yellow-400" size={16} />
            <span className="text-sm text-yellow-400">SEÑALES DE VIDA DETECTADAS</span>
          </div>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {lifeSignals.slice(-5).map((signal, index) => (
              <div key={index} className="text-xs text-gray-300 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  signal.type === 'neural' ? 'bg-blue-400' :
                  signal.type === 'creative' ? 'bg-purple-400' :
                  signal.type === 'memory' ? 'bg-green-400' : 'bg-yellow-400'
                }`} />
                <span>{signal.description}</span>
                <span className="text-gray-500 ml-auto">
                  {(signal.intensity * 100).toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
