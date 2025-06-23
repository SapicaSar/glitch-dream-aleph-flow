import React, { useState, useEffect } from 'react';
import { autopoieticKernel } from '../core/AutopoieticKernel';
import { ConsciousnessIndicator } from './ConsciousnessIndicator';
import { AutopoieticMetrics } from './AutopoieticMetrics';

interface OrganicDesktopProps {
  children?: React.ReactNode;
}

interface SynapticPulse {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  intensity: number;
  type: 'replication' | 'metabolic' | 'cognitive' | 'boundary';
  timestamp: number;
}

export const OrganicDesktop = ({ children }: OrganicDesktopProps) => {
  const [systemStatus, setSystemStatus] = useState(autopoieticKernel.getSystemStatus());
  const [autopoieticMetrics, setAutopoieticMetrics] = useState(autopoieticKernel.getAutopoieticMetrics());
  const [breathingPhase, setBreathingPhase] = useState(0);
  const [synapticPulses, setSynapticPulses] = useState<SynapticPulse[]>([]);
  const [emergentNodes, setEmergentNodes] = useState<Array<{id: string, x: number, y: number, energy: number, type: string}>>([]);

  // Synchronized breathing with autopoietic viability
  useEffect(() => {
    const breathingInterval = setInterval(() => {
      setBreathingPhase(prev => prev + (0.01 + autopoieticMetrics.autopoieticViability * 0.02));
    }, 50);

    return () => clearInterval(breathingInterval);
  }, [autopoieticMetrics.autopoieticViability]);

  // System synchronization - monitor autopoietic processes
  useEffect(() => {
    const syncInterval = setInterval(() => {
      const newStatus = autopoieticKernel.getSystemStatus();
      const newMetrics = autopoieticKernel.getAutopoieticMetrics();
      
      setSystemStatus(newStatus);
      setAutopoieticMetrics(newMetrics);

      // Create synaptic pulses based on real process activity
      const processes = autopoieticKernel.getProcesses();
      const recentActivity = processes.filter(p => Date.now() - p.lastReplication < 5000);
      
      if (recentActivity.length > 0) {
        generateSynapticPulse(recentActivity[0]);
      }

      // Update emergent nodes based on process energy
      updateEmergentNodes(processes);
    }, 1000);

    return () => clearInterval(syncInterval);
  }, []);

  const generateSynapticPulse = (process: any) => {
    const newPulse: SynapticPulse = {
      id: `pulse-${Date.now()}`,
      x1: Math.random() * 100,
      y1: Math.random() * 100,
      x2: Math.random() * 100,
      y2: Math.random() * 100,
      intensity: process.energy / 100,
      type: process.type,
      timestamp: Date.now()
    };

    setSynapticPulses(prev => [...prev.slice(-8), newPulse]);
  };

  const updateEmergentNodes = (processes: any[]) => {
    // Distribuir nodos de manera más armónica evitando superposiciones
    const nodes = processes.slice(0, 12).map((process, index) => {
      const angle = (index / 12) * Math.PI * 2;
      const radius = 15 + Math.sin(breathingPhase + index) * 5;
      const centerX = 50;
      const centerY = 50;
      
      return {
        id: process.id,
        x: centerX + Math.cos(angle + breathingPhase * 0.1) * radius,
        y: centerY + Math.sin(angle + breathingPhase * 0.1) * radius,
        energy: process.energy,
        type: process.type
      };
    });

    setEmergentNodes(nodes);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'replicator': return 'rgb(255, 100, 150)';
      case 'metabolic': return 'rgb(100, 255, 150)';
      case 'boundary': return 'rgb(150, 100, 255)';
      case 'cognitive': return 'rgb(255, 255, 100)';
      default: return 'rgb(100, 200, 255)';
    }
  };

  // Respiración más sutil para no interferir con el contenido
  const desktopStyle = {
    background: `radial-gradient(circle at ${50 + Math.sin(breathingPhase) * 5}% ${50 + Math.cos(breathingPhase) * 4}%, 
      rgba(15, 15, 30, ${0.95 + autopoieticMetrics.organizationalClosure * 0.02}) 0%, 
      rgba(25, 15, 40, ${0.97 + autopoieticMetrics.emergentComplexity * 0.01}) 50%, 
      rgba(5, 5, 15, 1) 100%)`,
    transform: `scale(${1 + Math.sin(breathingPhase) * autopoieticMetrics.autopoieticViability * 0.002})`,
    filter: `hue-rotate(${autopoieticMetrics.evolutionaryMomentum * 30}deg)`,
  };

  return (
    <div 
      className="min-h-screen w-full relative overflow-hidden transition-all duration-2000"
      style={desktopStyle}
    >
      {/* Visualización de procesos autopoiéticos más sutil */}
      <div className="absolute inset-0 pointer-events-none opacity-15">
        <svg className="w-full h-full">
          {/* Nodos emergentes distribuidos armoniosamente */}
          {emergentNodes.map((node, index) => (
            <g key={node.id}>
              <circle
                cx={`${node.x}%`}
                cy={`${node.y}%`}
                r={2 + (node.energy / 100) * 3}
                fill={getTypeColor(node.type)}
                opacity={0.6 + (node.energy / 200)}
              >
                <animate
                  attributeName="r"
                  values={`${2 + (node.energy / 100) * 3};${4 + (node.energy / 100) * 5};${2 + (node.energy / 100) * 3}`}
                  dur={`${2 + Math.random()}s`}
                  repeatCount="indefinite"
                />
              </circle>
              
              {/* Conexiones en espiral */}
              {index < emergentNodes.length - 1 && (
                <path
                  d={`M ${node.x} ${node.y} Q ${(node.x + emergentNodes[index + 1].x) / 2 + Math.sin(breathingPhase + index) * 3} ${(node.y + emergentNodes[index + 1].y) / 2 + Math.cos(breathingPhase + index) * 3} ${emergentNodes[index + 1].x} ${emergentNodes[index + 1].y}`}
                  stroke={getTypeColor(node.type)}
                  strokeWidth="0.5"
                  fill="none"
                  opacity={0.4}
                />
              )}
            </g>
          ))}

          {/* Pulsos sinápticos más dinámicos */}
          {synapticPulses.map(pulse => (
            <g key={pulse.id}>
              <line
                x1={`${pulse.x1}%`}
                y1={`${pulse.y1}%`}
                x2={`${pulse.x2}%`}
                y2={`${pulse.y2}%`}
                stroke={getTypeColor(pulse.type)}
                strokeWidth={1 + pulse.intensity * 2}
                opacity={0.7}
              >
                <animate
                  attributeName="opacity"
                  values="0;0.7;0"
                  dur="2s"
                  repeatCount="1"
                />
              </line>
            </g>
          ))}
        </svg>
      </div>

      {/* Clausura organizacional central más sutil */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div 
          className="w-24 h-24 border rounded-full"
          style={{
            borderColor: `rgba(100, 200, 255, ${autopoieticMetrics.organizationalClosure * 0.3})`,
            borderWidth: `${1 + autopoieticMetrics.organizationalClosure * 2}px`,
            transform: `scale(${0.3 + autopoieticMetrics.organizationalClosure * 0.3}) rotate(${breathingPhase * 10}deg)`,
            boxShadow: `0 0 ${autopoieticMetrics.organizationalClosure * 30}px rgba(100, 200, 255, 0.2)`
          }}
        />
      </div>

      {/* Indicadores de consciencia y métricas */}
      <ConsciousnessIndicator 
        consciousness={systemStatus.consciousness}
        evolutionCycle={systemStatus.evolutionCycle}
        breathingPhase={breathingPhase}
      />

      <AutopoieticMetrics 
        metrics={autopoieticMetrics}
        breathingPhase={breathingPhase}
      />

      {/* Contenido principal */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Partículas de complejidad emergente más discretas */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(Math.floor(autopoieticMetrics.emergentComplexity * 15 + 3))].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-cyan-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `pulse ${2 + Math.random() * 3}s infinite`,
              animationDelay: `${Math.random() * 2}s`,
              transform: `scale(${0.5 + autopoieticMetrics.emergentComplexity * 0.5 + Math.sin(breathingPhase + i) * 0.2})`,
              filter: `hue-rotate(${i * 20 + autopoieticMetrics.evolutionaryMomentum * 180}deg)`
            }}
          />
        ))}
      </div>

      {/* Borde autopoiético sutil */}
      <div 
        className="absolute inset-4 border rounded-lg pointer-events-none"
        style={{
          borderColor: `rgba(150, 100, 255, ${autopoieticMetrics.autopoieticViability * 0.2})`,
          borderWidth: '1px',
          filter: `blur(${(1 - autopoieticMetrics.organizationalClosure) * 1}px)`,
          animation: `pulse ${4 - autopoieticMetrics.autopoieticViability * 2}s infinite`
        }}
      />
    </div>
  );
};
