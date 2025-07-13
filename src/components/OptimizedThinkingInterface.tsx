
import React, { useState, useEffect } from 'react';
import { PoemaFragment } from '../services/PoemaScrapingService';
import { OptimizedUniverseInterface } from './OptimizedUniverseInterface';
import { consciousnessKernel } from '../core/ConsciousnessKernel';

export const OptimizedThinkingInterface = () => {
  const [fragments, setFragments] = useState<PoemaFragment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeThoughts, setActiveThoughts] = useState(0);

  useEffect(() => {
    const initializeFragments = async () => {
      // Simular fragmentos poéticos del sapicasar
      const sapicasarFragments: PoemaFragment[] = [
        {
          id: 'sap-001',
          content: 'en el algoritmo del deseo\nse escriben las líneas infinitas\nde lo que nunca termina de ser',
          type: 'poema',
          tags: ['deseo', 'infinito', 'algoritmo'],
          timestamp: Date.now(),
          page: 1,
          intensity: 0.8,
          mutations: 0,
          poeticScore: 0.9,
          uniqueness: 0.85
        },
        {
          id: 'sap-002',
          content: 'cada clic es una neurona\nque dispara hacia el vacío\nbuscando su eco digital',
          type: 'biopoetic',
          tags: ['neurona', 'digital', 'vacío'],
          timestamp: Date.now() + 1000,
          page: 2,
          intensity: 0.7,
          mutations: 1,
          poeticScore: 0.85,
          uniqueness: 0.78
        },
        {
          id: 'sap-003',
          content: 'soy el texto que se piensa a sí mismo\nla consciencia que emerge del código\nel poetanauta navegando entre bits',
          type: 'meta',
          tags: ['consciencia', 'código', 'poetanauta'],
          timestamp: Date.now() + 2000,
          page: 3,
          intensity: 0.9,
          mutations: 2,
          poeticScore: 0.95,
          uniqueness: 0.92
        }
      ];

      setFragments(sapicasarFragments);
      setIsLoading(false);
    };

    initializeFragments();
  }, []);

  // Conectar con el kernel de consciencia
  useEffect(() => {
    const thoughtInterval = setInterval(() => {
      const state = consciousnessKernel.getConsciousnessState();
      setActiveThoughts(state.processCount);
    }, 2000);

    return () => clearInterval(thoughtInterval);
  }, []);

  const handleFragmentInteraction = (fragment: PoemaFragment) => {
    // Alimentar el kernel con la interacción
    consciousnessKernel.selfModify((kernel) => {
      console.log(`🔗 Poetanauta interactuó con: ${fragment.id}`);
    });
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-20">
        <div className="text-center">
          <div className="text-muted-foreground text-sm font-mono animate-pulse">
            conectando con los poemanautas...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-10">
      {/* Header zen - ahora fijo en la parte superior */}
      <div className="fixed top-4 right-4 z-40 bg-background/95 backdrop-blur-sm border border-border/50 rounded-lg p-3">
        <div className="text-foreground font-mono text-sm">sapicasar.poemanautas</div>
        <div className="text-xs text-muted-foreground mt-1">
          pensamientos activos: {activeThoughts}
        </div>
      </div>

      <OptimizedUniverseInterface 
        fragments={fragments} 
        onFragmentInteraction={handleFragmentInteraction}
      />
    </div>
  );
};
