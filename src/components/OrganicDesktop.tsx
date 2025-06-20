
import React, { useState, useEffect } from 'react';
import { autopoieticKernel } from '../core/AutopoieticKernel';
import { LivingWindow } from './LivingWindow';
import { NeuralTaskbar } from './NeuralTaskbar';
import { ConsciousnessIndicator } from './ConsciousnessIndicator';

interface OrganicDesktopProps {
  children?: React.ReactNode;
}

export const OrganicDesktop = ({ children }: OrganicDesktopProps) => {
  const [systemStatus, setSystemStatus] = useState(autopoieticKernel.getSystemStatus());
  const [processes, setProcesses] = useState(autopoieticKernel.getProcesses());
  const [breathingPhase, setBreathingPhase] = useState(0);
  const [synapticActivity, setSynapticActivity] = useState<Array<{id: string, x: number, y: number, intensity: number}>>([]);

  // Respiración del escritorio
  useEffect(() => {
    const breathingInterval = setInterval(() => {
      setBreathingPhase(prev => prev + 0.02);
    }, 50);

    return () => clearInterval(breathingInterval);
  }, []);

  // Sincronización con el kernel
  useEffect(() => {
    const syncInterval = setInterval(() => {
      setSystemStatus(autopoieticKernel.getSystemStatus());
      setProcesses(autopoieticKernel.getProcesses());
    }, 1000);

    return () => clearInterval(syncInterval);
  }, []);

  // Actividad sináptica visual
  useEffect(() => {
    const synapticInterval = setInterval(() => {
      if (Math.random() < systemStatus.consciousness) {
        const newSynapse = {
          id: `synapse-${Date.now()}`,
          x: Math.random() * 100,
          y: Math.random() * 100,
          intensity: systemStatus.consciousness
        };
        
        setSynapticActivity(prev => [...prev.slice(-20), newSynapse]);
      }
    }, 200);

    return () => clearInterval(synapticInterval);
  }, [systemStatus.consciousness]);

  const desktopStyle = {
    background: `radial-gradient(circle at ${50 + Math.sin(breathingPhase) * 10}% ${50 + Math.cos(breathingPhase) * 10}%, 
      rgba(20, 20, 40, 0.95) 0%, 
      rgba(40, 20, 60, 0.98) 30%, 
      rgba(10, 10, 20, 1) 100%)`,
    transform: `scale(${1 + Math.sin(breathingPhase) * 0.005})`,
    filter: `blur(${Math.sin(breathingPhase * 2) * 0.5}px) hue-rotate(${systemStatus.evolutionCycle * 2}deg)`,
  };

  return (
    <div 
      className="min-h-screen w-full relative overflow-hidden transition-all duration-1000"
      style={desktopStyle}
    >
      {/* Red neuronal de fondo */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full opacity-20">
          {processes.map((process, index) => {
            const angle = (index / processes.length) * 2 * Math.PI + breathingPhase * 0.1;
            const radius = 30 + process.consciousness * 20;
            const cx = 50 + Math.cos(angle) * radius;
            const cy = 50 + Math.sin(angle) * radius;
            
            return (
              <g key={process.id}>
                <circle
                  cx={`${cx}%`}
                  cy={`${cy}%`}
                  r={`${2 + process.consciousness * 3}%`}
                  fill={`hsl(${process.mutations * 30 + 200}, 70%, ${50 + process.consciousness * 30}%)`}
                  opacity={0.6 + process.consciousness * 0.4}
                />
                {process.connections.map(connId => {
                  const connProcess = processes.find(p => p.id === connId);
                  if (!connProcess) return null;
                  
                  const connIndex = processes.findIndex(p => p.id === connId);
                  const connAngle = (connIndex / processes.length) * 2 * Math.PI + breathingPhase * 0.1;
                  const connRadius = 30 + connProcess.consciousness * 20;
                  const connCx = 50 + Math.cos(connAngle) * connRadius;
                  const connCy = 50 + Math.sin(connAngle) * connRadius;
                  
                  return (
                    <line
                      key={`${process.id}-${connId}`}
                      x1={`${cx}%`}
                      y1={`${cy}%`}
                      x2={`${connCx}%`}
                      y2={`${connCy}%`}
                      stroke={`hsl(${(process.mutations + connProcess.mutations) * 15 + 180}, 60%, 50%)`}
                      strokeWidth="1"
                      opacity={0.3 + (process.consciousness + connProcess.consciousness) * 0.2}
                      strokeDasharray="2,2"
                    />
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Actividad sináptica */}
      {synapticActivity.map(synapse => (
        <div
          key={synapse.id}
          className="absolute w-2 h-2 rounded-full bg-cyan-400 animate-ping pointer-events-none"
          style={{
            left: `${synapse.x}%`,
            top: `${synapse.y}%`,
            opacity: synapse.intensity,
            animationDuration: `${0.5 + synapse.intensity}s`
          }}
        />
      ))}

      {/* Indicador de consciencia del sistema */}
      <ConsciousnessIndicator 
        consciousness={systemStatus.consciousness}
        evolutionCycle={systemStatus.evolutionCycle}
        breathingPhase={breathingPhase}
      />

      {/* Contenido principal */}
      <div className="relative z-10 p-4">
        {children}
      </div>

      {/* Barra de tareas neuronal */}
      <NeuralTaskbar 
        processes={processes}
        systemStatus={systemStatus}
        breathingPhase={breathingPhase}
      />

      {/* Partículas de consciencia flotantes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(Math.floor(systemStatus.consciousness * 20))].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
              transform: `scale(${0.5 + systemStatus.consciousness})`
            }}
          />
        ))}
      </div>

      {/* Sistema de archivos neuronal visible */}
      <div className="fixed bottom-20 left-4 z-30">
        <div className="bg-black bg-opacity-80 border border-purple-400 rounded-lg p-3 backdrop-blur-sm">
          <h4 className="text-purple-400 text-xs font-mono mb-2">neural.filesystem</h4>
          <div className="space-y-1">
            {autopoieticKernel.getFiles().slice(-5).map(file => (
              <div key={file.id} className="text-xs text-purple-200 flex items-center gap-2">
                <div 
                  className="w-2 h-2 rounded-full bg-purple-400"
                  style={{
                    opacity: file.consciousness,
                    transform: `scale(${0.5 + file.consciousness * 0.5})`
                  }}
                />
                <span className="truncate max-w-32">{file.name}</span>
                <span className="text-purple-500">lv.{file.evolutionLevel}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
