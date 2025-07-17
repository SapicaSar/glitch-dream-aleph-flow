import React, { useState, useEffect, useCallback } from 'react';
import { AutopoieticField } from './AutopoieticField';
import { ConsciousnessPanel } from './ConsciousnessPanel';
import { PoetryGenerator } from './PoetryGenerator';

export const InteractiveAutopoiesisCore = () => {
  const [activeNodes, setActiveNodes] = useState<Array<{id: string, x: number, y: number, energy: number}>>([]);
  const [consciousness, setConsciousness] = useState(0);
  const [currentPoem, setCurrentPoem] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Generar nodos autopoiéticos
  const generateNode = useCallback((x: number, y: number) => {
    const newNode = {
      id: Math.random().toString(36).substring(2),
      x,
      y,
      energy: Math.random() * 100
    };
    
    setActiveNodes(prev => [...prev, newNode].slice(-12)); // Máximo 12 nodos
    setConsciousness(prev => Math.min(prev + 5, 100));
  }, []);

  // Auto-generar nodos
  useEffect(() => {
    const interval = setInterval(() => {
      if (activeNodes.length < 8) {
        generateNode(
          Math.random() * window.innerWidth,
          Math.random() * window.innerHeight
        );
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [activeNodes.length, generateNode]);

  // Decrecer energía de nodos
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNodes(prev => 
        prev
          .map(node => ({ ...node, energy: node.energy - 2 }))
          .filter(node => node.energy > 0)
      );
      setConsciousness(prev => Math.max(prev - 1, 0));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleFieldClick = useCallback((x: number, y: number) => {
    generateNode(x, y);
    
    if (!isGenerating && Math.random() > 0.7) {
      setIsGenerating(true);
      setTimeout(() => {
        setCurrentPoem(generatePoetryFragment());
        setIsGenerating(false);
      }, 1000);
    }
  }, [generateNode, isGenerating]);

  const generatePoetryFragment = () => {
    const fragments = [
      'luz que emerge / del vacío cuántico',
      'células de palabras / autoorganizándose',
      'consciencia liquida / fluyendo entre dimensiones',
      'fractales de significado / expandiéndose infinitamente',
      'red neuronal poética / tejiendo realidades',
      'autopoiesis verbal / creando mundos posibles',
      'entropía creativa / ordenándose a sí misma',
      'campo morfogenético / de pura intuición'
    ];
    return fragments[Math.floor(Math.random() * fragments.length)];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10 relative overflow-hidden">
      {/* Campo Autopoiético Interactivo */}
      <AutopoieticField 
        nodes={activeNodes}
        onClick={handleFieldClick}
        consciousness={consciousness}
      />
      
      {/* Panel de Consciencia */}
      <ConsciousnessPanel 
        level={consciousness}
        nodeCount={activeNodes.length}
        totalEnergy={activeNodes.reduce((sum, node) => sum + node.energy, 0)}
      />
      
      {/* Generador de Poesía */}
      <PoetryGenerator 
        poem={currentPoem}
        isGenerating={isGenerating}
        consciousness={consciousness}
      />
      
      {/* Instrucciones */}
      <div className="fixed bottom-4 left-4 text-muted-foreground text-sm font-mono">
        click para crear → autopoiesis
      </div>
    </div>
  );
};