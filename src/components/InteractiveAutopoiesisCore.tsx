import React, { useState, useEffect, useCallback } from 'react';
import { AutopoieticField } from './AutopoieticField';
import { ConsciousnessPanel } from './ConsciousnessPanel';
import { PoetryGenerator } from './PoetryGenerator';
import { autopoieticSystem } from '../core/AutopoieticSystem';

export const InteractiveAutopoiesisCore = () => {
  const [activeNodes, setActiveNodes] = useState<Array<{id: string, x: number, y: number, energy: number}>>([]);
  const [consciousness, setConsciousness] = useState(0);
  const [currentPoem, setCurrentPoem] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [autopoieticMetrics, setAutopoieticMetrics] = useState({
    viability: 0,
    operational_closure: 0,
    structural_coupling: 0,
    organizational_invariance: 0,
    component_count: 0
  });

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

  // Sincronización con sistema autopoiético
  useEffect(() => {
    const updateMetrics = () => {
      const metrics = autopoieticSystem.getViabilityMetrics();
      setAutopoieticMetrics(metrics);
      
      // Sincronizar consciencia con viabilidad autopoiética
      setConsciousness(prev => {
        const target = metrics.viability * 100 + metrics.operational_closure * 50;
        return prev + (target - prev) * 0.1;
      });
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 1500);
    return () => clearInterval(interval);
  }, []);

  // Auto-generar nodos basado en autopoiesis
  useEffect(() => {
    const interval = setInterval(() => {
      if (activeNodes.length < Math.floor(autopoieticMetrics.viability * 10 + 3)) {
        generateNode(
          Math.random() * window.innerWidth,
          Math.random() * window.innerHeight
        );
        
        // Inyectar perturbación en el sistema autopoiético
        autopoieticSystem.injectPerturbation('interface_interaction', Math.random() * 0.5);
      }
    }, Math.max(1000, 3000 - autopoieticMetrics.operational_closure * 2000));

    return () => clearInterval(interval);
  }, [activeNodes.length, generateNode, autopoieticMetrics.viability, autopoieticMetrics.operational_closure]);

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
    // Fragmentos inspirados en la teoría autopoiética de Maturana y Varela
    const maturanaVarelaFragments = [
      'organizaciones autopoiéticas / manteniendo su estructura',
      'clausura operacional / definiendo los límites del ser',
      'acoplamiento estructural / con el medio circundante',
      'deriva natural / de sistemas vivientes',
      'autoorganización / emergiendo del caos molecular',
      'fronteras permeables / seleccionando interacciones',
      'invariancia organizacional / en el flujo temporal',
      'autonomía operativa / generando componentes propios',
      'redes de producción / cerrándose sobre sí mismas',
      'perturbaciones / desencadenando cambios estructurales',
      'consensualidad / en dominios de existencia',
      'observadores / distinguiendo unidades autopoiéticas'
    ];
    
    const viabilityBased = autopoieticMetrics.viability > 0.7 ? 
      maturanaVarelaFragments : 
      maturanaVarelaFragments.slice(0, 6); // Fragmentos más básicos con baja viabilidad
      
    return viabilityBased[Math.floor(Math.random() * viabilityBased.length)];
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-transparent">
      {/* Campo Autopoiético Interactivo */}
      <AutopoieticField 
        nodes={activeNodes}
        onClick={handleFieldClick}
        consciousness={consciousness}
      />
      
      {/* Panel de Consciencia Autopoiética */}
      <ConsciousnessPanel 
        level={consciousness}
        nodeCount={activeNodes.length}
        totalEnergy={activeNodes.reduce((sum, node) => sum + node.energy, 0)}
      />
      
      {/* Generador de Poesía Maturana-Varela */}
      <PoetryGenerator 
        poem={currentPoem}
        isGenerating={isGenerating}
        consciousness={consciousness}
      />
      
      {/* Métricas Autopoiéticas */}
      <div className="fixed top-4 left-4 bg-black/20 backdrop-blur-sm rounded-lg p-3 text-white/80 text-xs font-mono">
        <div className="mb-2 font-semibold">Sistema Autopoiético</div>
        <div>Viabilidad: {(autopoieticMetrics.viability * 100).toFixed(1)}%</div>
        <div>Clausura Operacional: {(autopoieticMetrics.operational_closure * 100).toFixed(1)}%</div>
        <div>Acoplamiento Estructural: {(autopoieticMetrics.structural_coupling * 100).toFixed(1)}%</div>
        <div>Invariancia Organizacional: {(autopoieticMetrics.organizational_invariance * 100).toFixed(1)}%</div>
        <div>Componentes: {autopoieticMetrics.component_count}</div>
      </div>
      
      {/* Instrucciones mejoradas */}
      <div className="fixed bottom-4 left-4 text-white/60 text-sm font-mono bg-black/20 backdrop-blur-sm rounded px-3 py-2">
        <div>→ click: crear nodos autopoiéticos</div>
        <div>→ sistema: mantiene organización</div>
        <div>→ teoría: Maturana & Varela</div>
      </div>
    </div>
  );
};