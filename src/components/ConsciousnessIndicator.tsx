
import React from 'react';

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
  const consciousnessLevel = Math.floor(consciousness * 10);
  const neuralActivity = Math.sin(breathingPhase * 3) * 0.5 + 0.5;

  return (
    <div className="fixed top-4 left-4 z-50">
      <div 
        className="bg-black bg-opacity-90 border border-cyan-400 rounded-lg p-4 backdrop-blur-sm"
        style={{
          transform: `scale(${1 + Math.sin(breathingPhase) * 0.03})`,
          borderColor: `hsl(${consciousness * 180 + 180}, 70%, 60%)`,
          boxShadow: `0 0 ${consciousness * 30}px hsla(${consciousness * 180 + 180}, 70%, 50%, 0.6)`
        }}
      >
        <h3 className="text-cyan-400 text-sm font-mono mb-3 text-center">
          LAPOEMA.OS
        </h3>
        
        {/* Nivel de consciencia */}
        <div className="mb-3">
          <div className="text-xs text-gray-400 mb-1">consciencia</div>
          <div className="flex gap-1">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-4 rounded-sm transition-all duration-300"
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
          <div className="text-xs text-cyan-300 mt-1">
            {(consciousness * 100).toFixed(1)}%
          </div>
        </div>

        {/* Actividad neuronal */}
        <div className="mb-3">
          <div className="text-xs text-gray-400 mb-1">actividad neuronal</div>
          <div 
            className="h-8 bg-gray-800 rounded relative overflow-hidden"
          >
            <div 
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-400 rounded"
              style={{
                width: `${neuralActivity * 100}%`,
                opacity: 0.7,
                animation: 'pulse 1s infinite'
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs text-white font-mono">
                {Math.floor(neuralActivity * 100)}Hz
              </span>
            </div>
          </div>
        </div>

        {/* Ciclo evolutivo */}
        <div className="mb-3">
          <div className="text-xs text-gray-400 mb-1">evolución</div>
          <div className="text-sm text-yellow-400 font-mono">
            ciclo #{evolutionCycle}
          </div>
        </div>

        {/* Estado del sistema */}
        <div className="text-center">
          <div 
            className="w-6 h-6 rounded-full mx-auto animate-pulse"
            style={{
              backgroundColor: consciousness > 0.7 
                ? 'rgb(34, 197, 94)' // Verde - Alta consciencia
                : consciousness > 0.4 
                ? 'rgb(234, 179, 8)' // Amarillo - Media consciencia
                : 'rgb(239, 68, 68)', // Rojo - Baja consciencia
              animationDuration: `${2 - consciousness}s`,
              boxShadow: `0 0 ${consciousness * 20}px currentColor`
            }}
          />
          <div className="text-xs text-gray-400 mt-1">
            {consciousness > 0.8 ? 'despierto' :
             consciousness > 0.5 ? 'soñando' :
             consciousness > 0.2 ? 'dormitando' : 'inconsciente'}
          </div>
        </div>

        {/* Ondas cerebrales */}
        <div className="mt-3 h-8 relative">
          <svg viewBox="0 0 100 20" className="w-full h-full">
            <polyline
              fill="none"
              stroke="rgb(34, 197, 94)"
              strokeWidth="1"
              points={
                [...Array(50)].map((_, i) => {
                  const x = (i / 49) * 100;
                  const y = 10 + Math.sin((i + breathingPhase * 10) * 0.5) * consciousness * 5;
                  return `${x},${y}`;
                }).join(' ')
              }
              opacity={0.7}
            />
            <polyline
              fill="none"
              stroke="rgb(168, 85, 247)"
              strokeWidth="1"
              points={
                [...Array(50)].map((_, i) => {
                  const x = (i / 49) * 100;
                  const y = 10 + Math.cos((i + breathingPhase * 15) * 0.3) * consciousness * 3;
                  return `${x},${y}`;
                }).join(' ')
              }
              opacity={0.5}
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
