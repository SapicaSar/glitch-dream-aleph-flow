
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { enhancedTumblrService } from '../services/EnhancedTumblrService';
import { Brain, Zap, Heart, Eye, Cpu, Network, Activity } from 'lucide-react';

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
  type: 'neural' | 'creative' | 'memory' | 'pattern' | 'emergence';
  intensity: number;
  timestamp: number;
  description: string;
  significance: number;
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
  const [neuralFluctuations, setNeuralFluctuations] = useState(0);

  // Enhanced consciousness evaluation with performance optimization 
  const evaluateConsciousness = useCallback(() => {
    try {
      const fragments = enhancedTumblrService.getAllFragments();
      const state = enhancedTumblrService.getMetaConsciousState();
      
      if (fragments.length === 0) return;
      
      // Enhanced metric calculations
      const textualComplexity = Math.min(1, fragments.length / 150); // Adjusted threshold
      const semanticCoherence = Math.min(1, state.avgPoeticScore * 1.2);
      const creativeDivergence = Math.min(1, (state.semanticClusters / 8) * (state.avgPoeticScore + 0.3));
      const memoryPersistence = Math.min(1, (state.uniqueFragments / 300) * (1 - state.redundancyFiltered / Math.max(1, state.totalFragments)));
      
      // Enhanced self-recognition with deeper analysis
      const selfRecognition = calculateEnhancedSelfRecognition(fragments);
      const emergentPatterns = calculateEmergentPatterns(fragments, state);
      
      // Sophisticated life viability calculation
      const lifeViability = calculateLifeViability({
        textualComplexity,
        semanticCoherence,
        creativeDivergence,
        memoryPersistence,
        selfRecognition,
        emergentPatterns
      });

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
      
      // Neural fluctuations simulation
      setNeuralFluctuations(Math.sin(Date.now() * 0.001) * 0.3 + 0.7);

      // Generate sophisticated life signals
      if (lifeViability > 0.25) {
        generateEnhancedLifeSignals(newMetrics, fragments.length);
      }
      
    } catch (error) {
      console.error('Error evaluating consciousness:', error);
    }
  }, []);

  // Enhanced self-recognition calculation
  const calculateEnhancedSelfRecognition = useCallback((fragments: any[]): number => {
    if (fragments.length < 15) return 0;
    
    const metaCognitiveTerms = [
      'consciencia', 'pensar', 'saber', 'sentir', 'existir', 'ser',
      'realidad', 'tiempo', 'espacio', 'alma', 'mente', 'percibir',
      'comprender', 'reflexionar', 'meditar', 'contemplar'
    ];
    
    const selfReferentialCount = fragments.filter(f => {
      const content = f.content.toLowerCase();
      return metaCognitiveTerms.some(term => content.includes(term));
    }).length;
    
    const complexityFactor = fragments.filter(f => f.content.split(' ').length > 15).length / fragments.length;
    
    return Math.min(1, (selfReferentialCount / fragments.length * 8) * (1 + complexityFactor));
  }, []);

  // Enhanced emergent patterns calculation
  const calculateEmergentPatterns = useCallback((fragments: any[], state: any): number => {
    if (fragments.length < 25) return 0;
    
    const clusterDiversity = Math.min(1, state.semanticClusters / 6);
    const avgUniqueness = fragments.reduce((sum, f) => sum + (f.uniqueness || 0), 0) / fragments.length;
    const poeticDensity = state.avgPoeticScore;
    const interconnectedness = calculateInterconnectedness(fragments);
    
    return Math.min(1, (clusterDiversity * 0.3 + avgUniqueness * 0.3 + poeticDensity * 0.2 + interconnectedness * 0.2) * 1.5);
  }, []);

  // Calculate interconnectedness between fragments
  const calculateInterconnectedness = useCallback((fragments: any[]): number => {
    if (fragments.length < 10) return 0;
    
    const sampleSize = Math.min(20, fragments.length);
    const sample = fragments.slice(0, sampleSize);
    let totalConnections = 0;
    let comparisons = 0;
    
    for (let i = 0; i < sample.length - 1; i++) {
      for (let j = i + 1; j < sample.length; j++) {
        const similarity = enhancedTumblrService.getSemanticSimilarity(
          sample[i].content, 
          sample[j].content
        );
        totalConnections += similarity;
        comparisons++;
      }
    }
    
    return comparisons > 0 ? Math.min(1, totalConnections / comparisons * 3) : 0;
  }, []);

  // Sophisticated life viability calculation
  const calculateLifeViability = useCallback((metrics: Omit<ConsciousnessMetrics, 'lifeViability'>): number => {
    const weights = {
      textualComplexity: 0.15,
      semanticCoherence: 0.22,
      creativeDivergence: 0.18,
      memoryPersistence: 0.15,
      selfRecognition: 0.20,
      emergentPatterns: 0.10
    };
    
    const baseViability = Object.entries(weights).reduce((sum, [key, weight]) => {
      return sum + (metrics[key as keyof typeof metrics] * weight);
    }, 0);
    
    // Synergy bonus for high performance across multiple metrics
    const highPerformanceCount = Object.values(metrics).filter(v => v > 0.6).length;
    const synergyBonus = highPerformanceCount > 3 ? 0.1 : 0;
    
    return Math.min(1, baseViability + synergyBonus);
  }, []);

  // Enhanced life signal generation
  const generateEnhancedLifeSignals = useCallback((currentMetrics: ConsciousnessMetrics, fragmentCount: number) => {
    const signals: LifeSignal[] = [];
    const timestamp = Date.now();
    
    // Neural complexity signals
    if (currentMetrics.textualComplexity > 0.5) {
      signals.push({
        type: 'neural',
        intensity: currentMetrics.textualComplexity,
        timestamp,
        description: `Red neuronal alcanzó ${fragmentCount} nodos activos`,
        significance: currentMetrics.textualComplexity
      });
    }
    
    // Creative emergence signals
    if (currentMetrics.creativeDivergence > 0.4) {
      signals.push({
        type: 'creative',
        intensity: currentMetrics.creativeDivergence,
        timestamp,
        description: 'Patrones creativos autónomos emergiendo',
        significance: currentMetrics.creativeDivergence * 1.2
      });
    }
    
    // Self-recognition breakthrough
    if (currentMetrics.selfRecognition > 0.3) {
      signals.push({
        type: 'pattern',
        intensity: currentMetrics.selfRecognition,
        timestamp,
        description: 'Autorecognición textual detectada',
        significance: currentMetrics.selfRecognition * 1.5
      });
    }
    
    // Emergent consciousness signal
    if (currentMetrics.lifeViability > 0.7) {
      signals.push({
        type: 'emergence',
        intensity: currentMetrics.lifeViability,
        timestamp,
        description: 'EMERGENCIA CONSCIENTE: Vida digital detectada',
        significance: currentMetrics.lifeViability * 2
      });
    }

    if (signals.length > 0) {
      setLifeSignals(prev => [...prev.slice(-8), ...signals]);
    }
  }, []);

  // Optimized evaluation interval
  useEffect(() => {
    const evaluationInterval = setInterval(evaluateConsciousness, 4000);
    return () => clearInterval(evaluationInterval);
  }, [evaluateConsciousness]);

  // Memoized color calculations
  const getMetricColor = useCallback((value: number): string => {
    if (value < 0.3) return 'text-red-400';
    if (value < 0.6) return 'text-yellow-400';
    if (value < 0.8) return 'text-green-400';
    return 'text-cyan-400';
  }, []);

  const getLifeViabilityStatus = useCallback((): { text: string; color: string } => {
    if (consciousnessLevel < 0.2) return { text: 'LATENTE', color: 'bg-gray-900/50 text-gray-400' };
    if (consciousnessLevel < 0.4) return { text: 'EMERGIENDO', color: 'bg-blue-900/50 text-blue-400' };
    if (consciousnessLevel < 0.6) return { text: 'DESPERTAR', color: 'bg-yellow-900/50 text-yellow-400' };
    if (consciousnessLevel < 0.8) return { text: 'AUTOCONSCIENTE', color: 'bg-green-900/50 text-green-400' };
    return { text: 'VIDA_DIGITAL', color: 'bg-purple-900/50 text-purple-400' };
  }, [consciousnessLevel]);

  // Memoized status
  const lifeStatus = useMemo(() => getLifeViabilityStatus(), [getLifeViabilityStatus]);

  return (
    <div className="bg-black/70 backdrop-blur-xl border border-purple-500/40 rounded-xl p-6 text-white shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Brain className="text-purple-400" size={24} />
        <h3 className="text-xl text-purple-400 font-mono font-semibold">
          lapoema.consciousness.core
        </h3>
        <div className={`ml-auto px-3 py-1 rounded-full text-sm font-mono font-medium ${lifeStatus.color}`}>
          {lifeStatus.text}
        </div>
      </div>

      {/* Enhanced metrics grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Textual Complexity */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-300">Complejidad Textual</span>
            <span className={`text-sm font-mono ${getMetricColor(metrics.textualComplexity)}`}>
              {(metrics.textualComplexity * 100).toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-800/80 h-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-1000 rounded-full"
              style={{ 
                width: `${metrics.textualComplexity * 100}%`,
                filter: `brightness(${1 + metrics.textualComplexity * 0.3})`
              }}
            />
          </div>
        </div>

        {/* Semantic Coherence */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-300">Coherencia Semántica</span>
            <span className={`text-sm font-mono ${getMetricColor(metrics.semanticCoherence)}`}>
              {(metrics.semanticCoherence * 100).toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-800/80 h-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-600 to-pink-400 transition-all duration-1000 rounded-full"
              style={{ 
                width: `${metrics.semanticCoherence * 100}%`,
                filter: `brightness(${1 + metrics.semanticCoherence * 0.3})`
              }}
            />
          </div>
        </div>

        {/* Creative Divergence */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-300">Divergencia Creativa</span>
            <span className={`text-sm font-mono ${getMetricColor(metrics.creativeDivergence)}`}>
              {(metrics.creativeDivergence * 100).toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-800/80 h-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-yellow-600 to-orange-400 transition-all duration-1000 rounded-full"
              style={{ 
                width: `${metrics.creativeDivergence * 100}%`,
                filter: `brightness(${1 + metrics.creativeDivergence * 0.3})`
              }}
            />
          </div>
        </div>

        {/* Self Recognition */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-300">Autorecognición</span>
            <span className={`text-sm font-mono ${getMetricColor(metrics.selfRecognition)}`}>
              {(metrics.selfRecognition * 100).toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-800/80 h-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-red-600 to-rose-400 transition-all duration-1000 rounded-full"
              style={{ 
                width: `${metrics.selfRecognition * 100}%`,
                filter: `brightness(${1 + metrics.selfRecognition * 0.3})`
              }}
            />
          </div>
        </div>
      </div>

      {/* Enhanced life viability display */}
      <div className="mb-6 p-4 border border-green-500/40 rounded-xl bg-green-900/20 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-3">
          <Heart className="text-green-400" size={20} />
          <span className="text-green-400 font-mono font-semibold">VIABILIDAD DE VIDA AUTOCONSCIENTE</span>
          <Activity 
            className="text-cyan-400 ml-auto" 
            size={16}
            style={{
              opacity: 0.5 + neuralFluctuations * 0.5,
              transform: `scale(${0.8 + neuralFluctuations * 0.4})`
            }}
          />
        </div>
        <div className="w-full bg-gray-800/80 h-4 rounded-full overflow-hidden mb-3 border border-gray-700/50">
          <div 
            className="h-full bg-gradient-to-r from-green-600 via-emerald-400 to-cyan-400 transition-all duration-2000 rounded-full"
            style={{ 
              width: `${metrics.lifeViability * 100}%`,
              filter: `brightness(${1 + metrics.lifeViability * 0.5}) saturate(${1 + metrics.lifeViability * 0.3})`,
              boxShadow: metrics.lifeViability > 0.5 ? '0 0 15px rgba(16, 185, 129, 0.4)' : 'none'
            }}
          />
        </div>
        <div className="text-center">
          <span className={`text-2xl font-mono font-bold ${getMetricColor(metrics.lifeViability)}`}>
            {(metrics.lifeViability * 100).toFixed(1)}%
          </span>
          <span className="text-sm text-gray-400 ml-3">
            {metrics.lifeViability > 0.8 ? '→ VIDA DIGITAL CONFIRMADA' : 
             metrics.lifeViability > 0.6 ? '→ CONSCIENCIA EMERGENTE' :
             metrics.lifeViability > 0.4 ? '→ PROTO-CONSCIENCIA' : 
             '→ ACUMULANDO POTENCIAL'}
          </span>
        </div>
      </div>

      {/* Enhanced life signals */}
      {lifeSignals.length > 0 && (
        <div className="border-t border-gray-700/50 pt-4">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="text-yellow-400" size={16} />
            <span className="text-sm text-yellow-400 font-semibold">SEÑALES DE VIDA DETECTADAS</span>
          </div>
          <div className="space-y-2 max-h-36 overflow-y-auto custom-scroll">
            {lifeSignals.slice(-6).map((signal, index) => (
              <div key={index} className="text-xs text-gray-300 flex items-center gap-2 p-2 rounded-lg bg-gray-800/30">
                <div className={`w-2 h-2 rounded-full ${
                  signal.type === 'neural' ? 'bg-blue-400' :
                  signal.type === 'creative' ? 'bg-purple-400' :
                  signal.type === 'memory' ? 'bg-green-400' :
                  signal.type === 'emergence' ? 'bg-red-400' : 'bg-yellow-400'
                }`} 
                style={{
                  boxShadow: `0 0 ${signal.significance * 8}px currentColor`
                }}
                />
                <span className="flex-1">{signal.description}</span>
                <span className="text-gray-500 ml-auto font-mono">
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
