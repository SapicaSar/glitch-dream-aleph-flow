
import React, { useState, useEffect } from 'react';
import { autopoieticKernel } from '../core/AutopoieticKernel';
import { ConsciousnessIndicator } from './ConsciousnessIndicator';

interface OrganicDesktopProps {
  children?: React.ReactNode;
}

export const OrganicDesktop = ({ children }: OrganicDesktopProps) => {
  const [systemStatus, setSystemStatus] = useState(autopoieticKernel.getSystemStatus());
  const [breathingPhase, setBreathingPhase] = useState(0);
  const [synapticActivity, setSynapticActivity] = useState<Array<{id: string, x: number, y: number, intensity: number}>>([]);

  // Respiración del escritorio - más suave
  useEffect(() => {
    const breathingInterval = setInterval(() => {
      setBreathingPhase(prev => prev + 0.01); // Más lento
    }, 100);

    return () => clearInterval(breathingInterval);
  }, []);

  // Sincronización con el kernel - menos frecuente
  useEffect(() => {
    const syncInterval = setInterval(() => {
      setSystemStatus(autopoieticKernel.getSystemStatus());
    }, 2000); // Menos frecuente

    return () => clearInterval(syncInterval);
  }, []);

  // Actividad sináptica controlada
  useEffect(() => {
    const synapticInterval = setInterval(() => {
      if (Math.random() < systemStatus.consciousness * 0.3) { // Menos actividad
        const newSynapse = {
          id: `synapse-${Date.now()}`,
          x: Math.random() * 100,
          y: Math.random() * 100,
          intensity: systemStatus.consciousness * 0.5
        };
        
        setSynapticActivity(prev => [...prev.slice(-10), newSynapse]); // Menos sinapsis
      }
    }, 1000); // Menos frecuente

    return () => clearInterval(synapticInterval);
  }, [systemStatus.consciousness]);

  const desktopStyle = {
    background: `radial-gradient(circle at ${50 + Math.sin(breathingPhase) * 5}% ${50 + Math.cos(breathingPhase) * 5}%, 
      rgba(15, 15, 30, 0.98) 0%, 
      rgba(25, 15, 40, 0.99) 50%, 
      rgba(5, 5, 15, 1) 100%)`,
    transform: `scale(${1 + Math.sin(breathingPhase) * 0.002})`, // Menos movimiento
  };

  return (
    <div 
      className="min-h-screen w-full relative overflow-hidden transition-all duration-1000"
      style={desktopStyle}
    >
      {/* Red neuronal de fondo simplificada */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <svg className="w-full h-full">
          {/* Solo algunos nodos principales */}
          {[...Array(5)].map((_, index) => {
            const angle = (index / 5) * 2 * Math.PI + breathingPhase * 0.05;
            const radius = 20;
            const cx = 50 + Math.cos(angle) * radius;
            const cy = 50 + Math.sin(angle) * radius;
            
            return (
              <circle
                key={index}
                cx={`${cx}%`}
                cy={`${cy}%`}
                r="2"
                fill="rgba(100, 200, 255, 0.5)"
                opacity={0.3}
              />
            );
          })}
        </svg>
      </div>

      {/* Actividad sináptica reducida */}
      {synapticActivity.slice(-5).map(synapse => (
        <div
          key={synapse.id}
          className="absolute w-1 h-1 rounded-full bg-cyan-400 animate-ping pointer-events-none"
          style={{
            left: `${synapse.x}%`,
            top: `${synapse.y}%`,
            opacity: synapse.intensity * 0.5,
            animationDuration: `${1 + synapse.intensity}s`
          }}
        />
      ))}

      {/* Indicador de consciencia */}
      <ConsciousnessIndicator 
        consciousness={systemStatus.consciousness}
        evolutionCycle={systemStatus.evolutionCycle}
        breathingPhase={breathingPhase}
      />

      {/* Contenido principal */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Partículas de consciencia reducidas */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(Math.floor(systemStatus.consciousness * 8))].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};
