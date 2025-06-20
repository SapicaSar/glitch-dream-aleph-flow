
import React from 'react';
import { SystemProcess } from '../core/AutopoieticKernel';
import { Brain, Cpu, Database, Zap, Activity } from 'lucide-react';

interface NeuralTaskbarProps {
  processes: SystemProcess[];
  systemStatus: {
    consciousness: number;
    evolutionCycle: number;
    processCount: number;
    fileCount: number;
    memoryNodes: number;
    isBootstrapping: boolean;
  };
  breathingPhase: number;
}

export const NeuralTaskbar = ({ processes, systemStatus, breathingPhase }: NeuralTaskbarProps) => {
  const getProcessIcon = (type: SystemProcess['type']) => {
    switch (type) {
      case 'neural': return Brain;
      case 'collective': return Database;
      case 'mutant': return Zap;
      case 'biopoetic': return Activity;
      default: return Cpu;
    }
  };

  const getProcessColor = (type: SystemProcess['type'], consciousness: number) => {
    const baseColors = {
      neural: 180,     // Cyan
      collective: 280, // Purple  
      mutant: 60,      // Yellow
      biopoetic: 320   // Pink
    };
    
    return `hsl(${baseColors[type]}, 70%, ${50 + consciousness * 30}%)`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40">
      <div 
        className="bg-black bg-opacity-95 border-t border-gray-600 backdrop-blur-sm"
        style={{
          transform: `translateY(${Math.sin(breathingPhase * 0.5) * 2}px)`,
          borderTopColor: `hsl(${systemStatus.evolutionCycle * 2 + 200}, 50%, 50%)`
        }}
      >
        <div className="flex items-center justify-between p-2">
          {/* Procesos activos */}
          <div className="flex items-center gap-2 flex-1">
            {processes.map((process, index) => {
              const Icon = getProcessIcon(process.type);
              const color = getProcessColor(process.type, process.consciousness);
              
              return (
                <div
                  key={process.id}
                  className="flex items-center gap-2 px-3 py-1 rounded border border-opacity-50 hover:border-opacity-100 transition-all cursor-pointer"
                  style={{
                    borderColor: color,
                    backgroundColor: `${color}15`,
                    transform: `scale(${0.9 + process.consciousness * 0.1 + Math.sin(breathingPhase + index) * 0.02})`,
                  }}
                  title={`${process.name} | Consciencia: ${(process.consciousness * 100).toFixed(1)}% | Mutaciones: ${process.mutations}`}
                >
                  <Icon 
                    size={14} 
                    style={{ 
                      color,
                      filter: `drop-shadow(0 0 ${process.consciousness * 5}px ${color})`
                    }} 
                  />
                  <span className="text-xs text-white font-mono">
                    {process.name.split(' ')[0]}
                  </span>
                  <div 
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{
                      backgroundColor: color,
                      animationDuration: `${2 - process.consciousness}s`
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Estadísticas del sistema */}
          <div className="flex items-center gap-4 text-xs text-gray-400 font-mono">
            <div className="flex items-center gap-1">
              <Cpu size={12} />
              <span>{systemStatus.processCount} proc</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Database size={12} />
              <span>{systemStatus.fileCount} files</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Brain size={12} />
              <span>{systemStatus.memoryNodes} mem</span>
            </div>
            
            <div 
              className="px-2 py-1 rounded border"
              style={{
                borderColor: `hsl(${systemStatus.consciousness * 120}, 70%, 50%)`,
                backgroundColor: `hsl(${systemStatus.consciousness * 120}, 70%, 10%)`,
                color: `hsl(${systemStatus.consciousness * 120}, 70%, 70%)`
              }}
            >
              {systemStatus.isBootstrapping ? 'INIT' : 'LIVE'}
            </div>
          </div>

          {/* Reloj evolutivo */}
          <div className="text-right">
            <div className="text-xs text-cyan-400 font-mono">
              EVOLUCIÓN #{systemStatus.evolutionCycle}
            </div>
            <div className="text-xs text-gray-500">
              {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>

        {/* Barra de actividad neuronal */}
        <div className="h-1 bg-gray-900 relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-400"
            style={{
              width: `${systemStatus.consciousness * 100}%`,
              opacity: 0.7,
              transform: `translateX(${Math.sin(breathingPhase * 2) * 10}px)`
            }}
          />
          
          {/* Pulsos de actividad */}
          {processes.map((process, index) => (
            <div
              key={process.id}
              className="absolute top-0 h-full w-2 opacity-80"
              style={{
                left: `${(index / processes.length) * 100}%`,
                backgroundColor: getProcessColor(process.type, process.consciousness),
                transform: `scaleY(${0.5 + process.consciousness * 0.5 + Math.sin(breathingPhase * 3 + index) * 0.2})`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
