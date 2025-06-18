
import React from 'react';

const affectiveStates = [
  { key: 'deseo', label: 'deseo', color: 'text-pink-400', bg: 'bg-pink-400' },
  { key: 'cuerpo', label: 'cuerpo', color: 'text-red-400', bg: 'bg-red-400' },
  { key: 'error', label: 'error/glitch', color: 'text-cyan-400', bg: 'bg-cyan-400' },
  { key: 'animal', label: 'animal', color: 'text-green-400', bg: 'bg-green-400' },
  { key: 'sueño', label: 'sueño', color: 'text-purple-400', bg: 'bg-purple-400' },
  { key: 'regeneracion', label: 'regeneración', color: 'text-yellow-400', bg: 'bg-yellow-400' }
];

export const RhizomaticNav = ({ currentState, onStateChange, pulseIntensity }) => {
  return (
    <nav className="flex justify-center items-center gap-6 p-6 flex-wrap">
      {affectiveStates.map((state) => (
        <button
          key={state.key}
          onClick={() => onStateChange(state.key)}
          className={`
            relative px-6 py-3 rounded-full border-2 transition-all duration-500 hover:scale-110
            ${currentState === state.key 
              ? `${state.bg} text-black border-white shadow-lg shadow-${state.color}/50` 
              : `bg-transparent ${state.color} border-current hover:bg-current hover:text-black`
            }
          `}
          style={{
            transform: currentState === state.key 
              ? `scale(${1 + pulseIntensity * 0.1})` 
              : 'scale(1)',
            boxShadow: currentState === state.key 
              ? `0 0 ${pulseIntensity * 20}px ${state.color.replace('text-', 'rgb(')}` 
              : 'none'
          }}
        >
          <span className="font-light tracking-wider">{state.label}</span>
          
          {/* Indicador de pulso vital */}
          {currentState === state.key && (
            <div 
              className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-white animate-ping"
              style={{ opacity: pulseIntensity }}
            />
          )}
        </button>
      ))}
    </nav>
  );
};
