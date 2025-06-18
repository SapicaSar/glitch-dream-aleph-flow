
import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface PoemaNavigatorProps {
  autoNavigate: boolean;
  onToggleAuto: () => void;
  currentState: string;
  breathingPhase: number;
}

export const PoemaNavigator = ({ autoNavigate, onToggleAuto, currentState, breathingPhase }: PoemaNavigatorProps) => {
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
      <div 
        className="flex items-center gap-4 px-6 py-3 bg-black bg-opacity-80 border border-pink-400 rounded-full backdrop-blur-sm"
        style={{
          boxShadow: `0 0 ${Math.sin(breathingPhase) * 15 + 10}px rgba(255, 50, 150, 0.4)`,
          transform: `scale(${1 + Math.sin(breathingPhase) * 0.05})`
        }}
      >
        {/* Control de autonavegación */}
        <button
          onClick={onToggleAuto}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-500
            ${autoNavigate 
              ? 'bg-pink-500 text-black hover:bg-pink-400' 
              : 'bg-transparent text-pink-400 border border-pink-400 hover:bg-pink-400 hover:text-black'
            }
          `}
        >
          {autoNavigate ? <Pause size={16} /> : <Play size={16} />}
          <span className="text-xs font-mono">
            {autoNavigate ? 'navegación automática' : 'manual'}
          </span>
        </button>

        {/* Indicador de estado actual */}
        <div className="flex items-center gap-2 text-cyan-400">
          <RotateCcw 
            size={16} 
            className={autoNavigate ? 'animate-spin' : ''}
            style={{ animationDuration: '8s' }}
          />
          <span className="text-xs font-mono">{currentState}</span>
        </div>

        {/* Barra de progreso fantasmática */}
        <div className="w-24 h-1 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-pink-400 to-cyan-400 rounded-full transition-all duration-100"
            style={{
              width: `${(Math.sin(breathingPhase * 2) + 1) * 50}%`,
              opacity: autoNavigate ? 0.8 : 0.3
            }}
          />
        </div>
      </div>
    </div>
  );
};
