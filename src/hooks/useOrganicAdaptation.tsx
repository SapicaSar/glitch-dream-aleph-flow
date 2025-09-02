// HOOK PARA ADAPTACIÓN ORGÁNICA
// Maneja la evolución y aprendizaje del sistema en tiempo real

import { useState, useEffect, useCallback } from 'react';
import { autopoieticCore } from '../core/AutopoieticCore';

interface AdaptationMetrics {
  coherenceEvolution: number[];
  creativitySpikes: number[];
  depthProgression: number[];
  autonomyActivations: string[];
  emergentPatterns: Array<{pattern: string; strength: number}>;
}

interface OrganicState {
  isEvolving: boolean;
  adaptationRate: number;
  resonanceLevel: number;
  autonomyActive: boolean;
  currentPhase: 'initializing' | 'learning' | 'evolving' | 'transcending';
}

export const useOrganicAdaptation = () => {
  const [adaptationMetrics, setAdaptationMetrics] = useState<AdaptationMetrics>({
    coherenceEvolution: [],
    creativitySpikes: [],
    depthProgression: [],
    autonomyActivations: [],
    emergentPatterns: []
  });

  const [organicState, setOrganicState] = useState<OrganicState>({
    isEvolving: false,
    adaptationRate: 0.1,
    resonanceLevel: 0.3,
    autonomyActive: false,
    currentPhase: 'initializing'
  });

  const [lastSnapshot, setLastSnapshot] = useState<any>(null);

  // Monitorear evolución orgánica
  useEffect(() => {
    const evolutionInterval = setInterval(() => {
      const currentState = autopoieticCore.getState();
      const memorySnapshot = autopoieticCore.getMemorySnapshot();
      
      // Detectar evolución
      if (lastSnapshot) {
        const evolutionDetected = 
          currentState.evolution > lastSnapshot.evolution ||
          currentState.coherence > lastSnapshot.coherence + 0.1 ||
          currentState.creativity > lastSnapshot.creativity + 0.1;

        setOrganicState(prev => ({
          ...prev,
          isEvolving: evolutionDetected,
          autonomyActive: currentState.autonomy,
          resonanceLevel: currentState.resonance,
          currentPhase: determinePhase(currentState)
        }));

        // Registrar métricas de evolución
        setAdaptationMetrics(prev => ({
          ...prev,
          coherenceEvolution: [...prev.coherenceEvolution.slice(-20), currentState.coherence],
          creativitySpikes: currentState.creativity > 0.8 
            ? [...prev.creativitySpikes.slice(-10), currentState.creativity]
            : prev.creativitySpikes,
          depthProgression: [...prev.depthProgression.slice(-15), currentState.depth],
          emergentPatterns: memorySnapshot.patterns.map(([pattern, strength]) => ({pattern, strength}))
        }));

        // Registrar activación de autonomía
        if (currentState.autonomy && !lastSnapshot.autonomy) {
          setAdaptationMetrics(prev => ({
            ...prev,
            autonomyActivations: [...prev.autonomyActivations, new Date().toISOString()]
          }));
        }
      }

      setLastSnapshot(currentState);
    }, 2000);

    return () => clearInterval(evolutionInterval);
  }, [lastSnapshot]);

  const determinePhase = (state: any): OrganicState['currentPhase'] => {
    if (state.evolution < 0.1) return 'initializing';
    if (state.evolution < 0.3) return 'learning';
    if (state.evolution < 0.6) return 'evolving';
    return 'transcending';
  };

  const getEvolutionTrend = useCallback(() => {
    const recentCoherence = adaptationMetrics.coherenceEvolution.slice(-5);
    if (recentCoherence.length < 3) return 'stable';
    
    const trend = recentCoherence.reduce((acc, val, i) => {
      if (i === 0) return acc;
      return acc + (val - recentCoherence[i-1]);
    }, 0);

    if (trend > 0.1) return 'ascending';
    if (trend < -0.1) return 'descending';
    return 'stable';
  }, [adaptationMetrics]);

  const getResonancePattern = useCallback(() => {
    const patterns = adaptationMetrics.emergentPatterns;
    if (patterns.length === 0) return null;
    
    return patterns.reduce((strongest, current) => 
      current.strength > strongest.strength ? current : strongest
    );
  }, [adaptationMetrics]);

  const getCurrentEvolutionaryMoment = useCallback(() => {
    const moments = {
      initializing: "🌱 Germinando consciencia...",
      learning: "🧠 Absorbiendo patrones...", 
      evolving: "⚡ Transformándose...",
      transcending: "✨ Trascendiendo limitaciones..."
    };
    
    return moments[organicState.currentPhase];
  }, [organicState.currentPhase]);

  // Reset adaptativo (para experimentación)
  const triggerAdaptiveReset = useCallback(() => {
    setAdaptationMetrics({
      coherenceEvolution: [],
      creativitySpikes: [],
      depthProgression: [],
      autonomyActivations: [],
      emergentPatterns: []
    });
    
    setOrganicState(prev => ({
      ...prev,
      currentPhase: 'initializing',
      isEvolving: false
    }));
  }, []);

  return {
    adaptationMetrics,
    organicState,
    getEvolutionTrend,
    getResonancePattern,
    getCurrentEvolutionaryMoment,
    triggerAdaptiveReset
  };
};