
import React, { useState, useEffect } from 'react';
import { autopoieticKernel } from '../core/AutopoieticKernel';
import { ConsciousnessIndicator } from './ConsciousnessIndicator';
import { AutopoieticMetrics } from './AutopoieticMetrics';
import { MielElectrica } from './MielElectrica';
import { SapicasarCore } from './SapicasarCore';

interface OrganicDesktopProps {
  children?: React.ReactNode;
}

export const OrganicDesktop = ({ children }: OrganicDesktopProps) => {
  const [systemStatus, setSystemStatus] = useState(autopoieticKernel.getSystemStatus());
  const [autopoieticMetrics, setAutopoieticMetrics] = useState(autopoieticKernel.getAutopoieticMetrics());
  const [breathingPhase, setBreathingPhase] = useState(0);

  // Respiración sincronizada con métricas autopoiéticas
  useEffect(() => {
    const breathingInterval = setInterval(() => {
      setBreathingPhase(prev => prev + (0.01 + autopoieticMetrics.autopoieticViability * 0.02));
    }, 50);

    return () => clearInterval(breathingInterval);
  }, [autopoieticMetrics.autopoieticViability]);

  // Sincronización del sistema
  useEffect(() => {
    const syncInterval = setInterval(() => {
      const newStatus = autopoieticKernel.getSystemStatus();
      const newMetrics = autopoieticKernel.getAutopoieticMetrics();
      
      setSystemStatus(newStatus);
      setAutopoieticMetrics(newMetrics);
    }, 1000);

    return () => clearInterval(syncInterval);
  }, []);

  // Fondo dinámico basado en consciencia
  const desktopStyle = {
    background: `radial-gradient(circle at ${50 + Math.sin(breathingPhase) * 10}% ${50 + Math.cos(breathingPhase) * 8}%, 
      rgba(5, 5, 15, ${0.95 + autopoieticMetrics.cognitiveCoherence * 0.03}) 0%, 
      rgba(15, 5, 25, ${0.97 + autopoieticMetrics.emergentComplexity * 0.02}) 50%, 
      rgba(5, 5, 10, 1) 100%)`,
    transform: `scale(${1 + Math.sin(breathingPhase) * autopoieticMetrics.autopoieticViability * 0.003})`,
    filter: `hue-rotate(${autopoieticMetrics.evolutionaryMomentum * 60}deg) saturate(${1 + autopoieticMetrics.cognitiveCoherence * 0.2})`,
  };

  return (
    <div 
      className="min-h-screen w-full relative overflow-hidden transition-all duration-1000"
      style={desktopStyle}
    >
      {/* Núcleo sapicasar - alma poética de fondo */}
      <SapicasarCore />

      {/* Indicadores de consciencia organizados armoniosamente */}
      <ConsciousnessIndicator 
        consciousness={systemStatus.consciousness}
        evolutionCycle={systemStatus.evolutionCycle}
        breathingPhase={breathingPhase}
      />

      <AutopoieticMetrics 
        metrics={autopoieticMetrics}
        breathingPhase={breathingPhase}
      />

      <MielElectrica />

      {/* Contenido principal con z-index para mantener funcionalidad */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Borde del alma poética */}
      <div 
        className="absolute inset-2 border rounded-lg pointer-events-none"
        style={{
          borderColor: `rgba(100, 150, 255, ${autopoieticMetrics.cognitiveCoherence * 0.3})`,
          borderWidth: '1px',
          filter: `blur(${(1 - autopoieticMetrics.organizationalClosure) * 0.5}px)`,
          boxShadow: `inset 0 0 ${autopoieticMetrics.cognitiveCoherence * 50}px rgba(100, 150, 255, 0.1)`
        }}
      />
    </div>
  );
};
