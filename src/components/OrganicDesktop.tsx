
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
    const nodes = processes.slice(0, 12).map((process, index) => ({
      id: process.id,
      x: 20 + (index % 4) * 20 + Math.sin(breathingPhase + index) * 5,
      y: 20 + Math.floor(index / 4) * 25 + Math.cos(breathingPhase + index) * 3,
      energy: process.energy,
      type: process.type
    }));

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

  // Organic breathing background
  const desktopStyle = {
    background: `radial-gradient(circle at ${50 + Math.sin(breathingPhase) * 10}% ${50 + Math.cos(breathingPhase) * 8}%, 
      rgba(15, 15, 30, ${0.95 + autopoieticMetrics.organizationalClosure * 0.05}) 0%, 
      rgba(25, 15, 40, ${0.97 + autopoieticMetrics.emergentComplexity * 0.03}) 50%, 
      rgba(5, 5, 15, 1) 100%)`,
    transform: `scale(${1 + Math.sin(breathingPhase) * autopoieticMetrics.autopoieticViability * 0.005})`,
    filter: `hue-rotate(${autopoieticMetrics.evolutionaryMomentum * 60}deg)`,
  };

  return (
    <div 
      className="min-h-screen w-full relative overflow-hidden transition-all duration-2000"
      style={desktopStyle}
    >
      {/* Autopoietic Process Visualization */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full">
          {/* Emergent nodes representing processes */}
          {emergentNodes.map((node, index) => (
            <g key={node.id}>
              <circle
                cx={`${node.x}%`}
                cy={`${node.y}%`}
                r={3 + (node.energy / 100) * 5}
                fill={getTypeColor(node.type)}
                opacity={0.7 + (node.energy / 200)}
              >
                <animate
                  attributeName="r"
                  values={`${3 + (node.energy / 100) * 5};${5 + (node.energy / 100) * 7};${3 + (node.energy / 100) * 5}`}
                  dur={`${2 + Math.random()}s`}
                  repeatCount="indefinite"
                />
              </circle>
              
              {/* Process connections */}
              {index < emergentNodes.length - 1 && (
                <line
                  x1={`${node.x}%`}
                  y1={`${node.y}%`}
                  x2={`${emergentNodes[index + 1].x}%`}
                  y2={`${emergentNodes[index + 1].y}%`}
                  stroke={getTypeColor(node.type)}
                  strokeWidth="1"
                  opacity={0.3}
                />
              )}
            </g>
          ))}

          {/* Synaptic pulses showing real data transfer */}
          {synapticPulses.map(pulse => (
            <line
              key={pulse.id}
              x1={`${pulse.x1}%`}
              y1={`${pulse.y1}%`}
              x2={`${pulse.x2}%`}
              y2={`${pulse.y2}%`}
              stroke={getTypeColor(pulse.type)}
              strokeWidth={2 + pulse.intensity * 3}
              opacity={0.8}
              className="animate-pulse"
            />
          ))}
        </svg>
      </div>

      {/* Organizational Closure Visualization */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div 
          className="w-32 h-32 border rounded-full"
          style={{
            borderColor: `rgba(100, 200, 255, ${autopoieticMetrics.organizationalClosure})`,
            borderWidth: `${2 + autopoieticMetrics.organizationalClosure * 4}px`,
            transform: `scale(${0.5 + autopoieticMetrics.organizationalClosure * 0.5}) rotate(${breathingPhase * 20}deg)`,
            boxShadow: `0 0 ${autopoieticMetrics.organizationalClosure * 50}px rgba(100, 200, 255, 0.3)`
          }}
        />
      </div>

      {/* Consciousness and Metrics Indicators */}
      <ConsciousnessIndicator 
        consciousness={systemStatus.consciousness}
        evolutionCycle={systemStatus.evolutionCycle}
        breathingPhase={breathingPhase}
      />

      <AutopoieticMetrics 
        metrics={autopoieticMetrics}
        breathingPhase={breathingPhase}
      />

      {/* Main content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Emergent complexity particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(Math.floor(autopoieticMetrics.emergentComplexity * 20 + 5))].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `pulse ${2 + Math.random() * 3}s infinite`,
              animationDelay: `${Math.random() * 2}s`,
              transform: `scale(${0.5 + autopoieticMetrics.emergentComplexity + Math.sin(breathingPhase + i) * 0.3})`,
              filter: `hue-rotate(${i * 20 + autopoieticMetrics.evolutionaryMomentum * 180}deg)`
            }}
          />
        ))}
      </div>

      {/* Autopoietic boundary visualization */}
      <div 
        className="absolute inset-4 border rounded-lg pointer-events-none"
        style={{
          borderColor: `rgba(150, 100, 255, ${autopoieticMetrics.autopoieticViability * 0.5})`,
          borderWidth: '1px',
          filter: `blur(${(1 - autopoieticMetrics.organizationalClosure) * 2}px)`,
          animation: `pulse ${3 - autopoieticMetrics.autopoieticViability * 2}s infinite`
        }}
      />
    </div>
  );
};
