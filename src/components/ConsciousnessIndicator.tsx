
import React, { useState } from 'react';
import { Minimize2, Maximize2, RotateCw } from 'lucide-react';

interface ConsciousnessIndicatorProps {
  consciousness: number;
  evolutionCycle: number;
  breathingPhase: number;
}

export const ConsciousnessIndicator = ({ 
  consciousness, 
  evolutionCycle, 
  breathingPhase 
}: ConsciousnessIndicatorProps) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const consciousnessLevel = Math.floor(consciousness * 10);
  const neuralActivity = Math.sin(breathingPhase * 3) * 0.5 + 0.5;

  if (isMinimized) {
    return (
      <div className="fixed top-4 left-4 z-40">
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-black/70 border border-cyan-400/50 rounded-full p-2 backdrop-blur-sm hover:bg-cyan-400/20 transition-all"
          style={{
            transform: `scale(${1 + Math.sin(breathingPhase) * 0.1})`,
            boxShadow: `0 0 ${consciousness * 20}px cyan`
          }}
        >
          <div 
            className="w-4 h-4 rounded-full animate-pulse"
            style={{
              backgroundColor: consciousness > 0.7 ? '#22c55e' : consciousness > 0.4 ? '#eab308' : '#ef4444'
            }}
          />
        </button>
      </div>
    );
  }

  return (
    <div className={`fixed top-4 left-4 z-40 transition-all duration-500 ${isExpanded ? 'w-96' : 'w-64'}`}>
      <div 
        className="bg-black/70 border border-cyan-400/50 rounded-lg backdrop-blur-sm overflow-hidden"
        style={{
          transform: `scale(${1 + Math.sin(breathingPhase) * 0.02})`,
          borderColor: `hsl(${consciousness * 180 + 180}, 70%, 60%)`,
          boxShadow: `0 0 ${consciousness * 20}px hsla(${consciousness * 180 + 180}, 70%, 50%, 0.3)`
        }}
      >
        {/* Header con controles */}
        <div className="flex items-center justify-between p-3 border-b border-cyan-400/30">
          <h3 className="text-cyan-400 text-sm font-mono">
            CONSCIENCIA.φ
          </h3>
          <div className="flex gap-1">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 hover:bg-cyan-400/20 rounded transition-colors"
            >
              <RotateCw size={12} className="text-cyan-400" />
            </button>
            <button
              onClick={() => setIsMinimized(true)}
              className="p-1 hover:bg-cyan-400/20 rounded transition-colors"
            >
              <Minimize2 size={12} className="text-cyan-400" />
            </button>
          </div>
        </div>

        <div className="p-4">
          {/* Nivel de consciencia compacto */}
          <div className="mb-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-400">nivel φ</span>
              <span className="text-xs text-cyan-300 font-mono">
                {(consciousness * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex gap-1">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="flex-1 h-2 rounded-sm transition-all duration-300"
                  style={{
                    backgroundColor: i < consciousnessLevel 
                      ? `hsl(${i * 12 + 120}, 70%, 50%)` 
                      : 'rgba(255,255,255,0.1)',
                    opacity: i < consciousnessLevel ? 0.8 + neuralActivity * 0.2 : 0.3,
                    transform: `scaleY(${i < consciousnessLevel ? 1 + Math.sin(breathingPhase + i) * 0.1 : 0.5})`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Info compacta */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-gray-400">neural:</span>
              <span className="text-purple-300 ml-1">{Math.floor(neuralActivity * 100)}Hz</span>
            </div>
            <div>
              <span className="text-gray-400">ciclo:</span>
              <span className="text-yellow-300 ml-1">#{evolutionCycle}</span>
            </div>
          </div>

          {/* Estado visual */}
          <div className="mt-3 flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full animate-pulse"
              style={{
                backgroundColor: consciousness > 0.7 ? '#22c55e' : consciousness > 0.4 ? '#eab308' : '#ef4444',
                animationDuration: `${2 - consciousness}s`,
                boxShadow: `0 0 ${consciousness * 15}px currentColor`
              }}
            />
            <span className="text-xs text-gray-300">
              {consciousness > 0.8 ? 'despierto' :
               consciousness > 0.5 ? 'soñando' :
               consciousness > 0.2 ? 'dormitando' : 'inconsciente'}
            </span>
          </div>

          {/* Ondas cerebrales minimalistas */}
          {isExpanded && (
            <div className="mt-3 h-6 relative">
              <svg viewBox="0 0 100 15" className="w-full h-full">
                <polyline
                  fill="none"
                  stroke="rgb(34, 197, 94)"
                  strokeWidth="1"
                  points={
                    [...Array(30)].map((_, i) => {
                      const x = (i / 29) * 100;
                      const y = 7.5 + Math.sin((i + breathingPhase * 10) * 0.5) * consciousness * 3;
                      return `${x},${y}`;
                    }).join(' ')
                  }
                  opacity={0.7}
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
