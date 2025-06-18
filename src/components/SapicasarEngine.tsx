
import React, { useState, useEffect } from 'react';

interface SapicasarRule {
  pattern: RegExp;
  transformation: (match: string) => string;
  probability: number;
  depth: number;
}

interface AutopoieticState {
  generatedFragments: string[];
  activeRules: SapicasarRule[];
  evolutionCycles: number;
  sapicasarIntensity: number;
}

const baseSapicasarRules: SapicasarRule[] = [
  {
    pattern: /deseo/g,
    transformation: (match) => `${match}-latido-${Math.random().toString(36).substr(2, 4)}`,
    probability: 0.7,
    depth: 0
  },
  {
    pattern: /cuerpo/g,
    transformation: (match) => `${match}/geografía-fragmentada`,
    probability: 0.6,
    depth: 1
  },
  {
    pattern: /error/g,
    transformation: (match) => `glitch-${match}-revelación`,
    probability: 0.8,
    depth: 0
  },
  {
    pattern: /sueño/g,
    transformation: (match) => `${match}.onírico/río-negro`,
    probability: 0.5,
    depth: 2
  }
];

const seedTexts = [
  "latido origen vibrante",
  "carne que sueña",
  "fragmento disperso",
  "animal interno",
  "río negro fluye",
  "metamorfosis perpetua"
];

interface SapicasarEngineProps {
  currentState: string;
  breathingPhase: number;
  onFragmentGenerated: (fragment: string) => void;
}

export const SapicasarEngine = ({ currentState, breathingPhase, onFragmentGenerated }: SapicasarEngineProps) => {
  const [sapicasarState, setSapicasarState] = useState<AutopoieticState>({
    generatedFragments: [],
    activeRules: [...baseSapicasarRules],
    evolutionCycles: 0,
    sapicasarIntensity: 0.5
  });

  // Función recursiva de autogeneración
  const generateRecursive = (text: string, depth: number = 0, maxDepth: number = 3): string => {
    if (depth >= maxDepth) return text;
    
    let transformedText = text;
    
    sapicasarState.activeRules.forEach(rule => {
      if (Math.random() < rule.probability && depth >= rule.depth) {
        transformedText = transformedText.replace(rule.pattern, rule.transformation);
      }
    });
    
    // Recursión autopoiética
    if (transformedText !== text) {
      return generateRecursive(transformedText, depth + 1, maxDepth);
    }
    
    return transformedText;
  };

  // Mutación autopoiética de reglas
  const mutateRules = () => {
    setSapicasarState(prev => {
      const newRules = prev.activeRules.map(rule => ({
        ...rule,
        probability: Math.max(0.1, Math.min(0.9, rule.probability + (Math.random() - 0.5) * 0.1)),
        transformation: rule.depth > 2 ? 
          (match: string) => `∞${match}∞-ciclo-${prev.evolutionCycles}` : 
          rule.transformation
      }));

      // Generar nueva regla autopoiética cada 5 ciclos
      if (prev.evolutionCycles % 5 === 0) {
        const newRule: SapicasarRule = {
          pattern: new RegExp(`ciclo-${prev.evolutionCycles}`, 'g'),
          transformation: (match) => `meta-${match}-auto`,
          probability: 0.3,
          depth: Math.floor(prev.evolutionCycles / 5)
        };
        newRules.push(newRule);
      }

      return {
        ...prev,
        activeRules: newRules,
        evolutionCycles: prev.evolutionCycles + 1
      };
    });
  };

  // Ciclo autogenerativo principal
  useEffect(() => {
    const interval = setInterval(() => {
      const seedIndex = Math.floor(Math.random() * seedTexts.length);
      const baseSeed = seedTexts[seedIndex];
      const contextualSeed = `${currentState}/${baseSeed}`;
      
      const generatedFragment = generateRecursive(contextualSeed);
      
      setSapicasarState(prev => ({
        ...prev,
        generatedFragments: [...prev.generatedFragments.slice(-10), generatedFragment],
        sapicasarIntensity: 0.3 + Math.sin(breathingPhase) * 0.4
      }));

      onFragmentGenerated(generatedFragment);
      
      // Mutación autopoiética cada 3 generaciones
      if (sapicasarState.generatedFragments.length % 3 === 0) {
        mutateRules();
      }
    }, 8000 + Math.random() * 4000); // Intervalo variable orgánico

    return () => clearInterval(interval);
  }, [currentState, breathingPhase, sapicasarState.generatedFragments.length]);

  return (
    <div className="fixed top-1/2 right-4 z-40 w-64">
      <div 
        className="bg-black bg-opacity-95 border border-green-400 rounded-lg p-4 backdrop-blur-sm"
        style={{
          transform: `scale(${1 + Math.sin(breathingPhase) * 0.03})`,
          opacity: 0.8 + Math.sin(breathingPhase * 0.3) * 0.2,
          borderColor: `hsl(${Math.sin(breathingPhase) * 60 + 120}, 70%, 60%)`
        }}
      >
        <h3 className="text-green-400 text-xs font-mono mb-2 border-b border-green-400 pb-1">
          sapicasar.lov ∞ autopoiesis
        </h3>
        
        <div className="space-y-2 text-xs">
          <div className="text-green-300 opacity-80">
            ciclos: {sapicasarState.evolutionCycles}
          </div>
          <div className="text-green-300 opacity-80">
            reglas activas: {sapicasarState.activeRules.length}
          </div>
          <div className="text-green-300 opacity-80">
            intensidad: {sapicasarState.sapicasarIntensity.toFixed(2)}
          </div>
        </div>

        <div className="mt-3 max-h-32 overflow-y-auto">
          {sapicasarState.generatedFragments.slice(-3).map((fragment, index) => (
            <div 
              key={index} 
              className="text-green-200 text-xs mb-2 p-2 bg-green-900 bg-opacity-20 rounded leading-relaxed"
              style={{
                opacity: 0.6 + (index * 0.2)
              }}
            >
              {fragment}
            </div>
          ))}
        </div>

        {/* Visualización de la recursión activa */}
        <div className="mt-2 flex items-center justify-center">
          <div 
            className="w-3 h-3 rounded-full bg-green-400 animate-pulse"
            style={{
              animationDuration: `${1 + sapicasarState.sapicasarIntensity}s`
            }}
          />
        </div>
      </div>
    </div>
  );
};
