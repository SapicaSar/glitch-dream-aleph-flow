
import React from 'react';

export const PoemNode = ({ fragment, position, isActive, onClick, pulseIntensity, isGlitching }) => {
  if (!position) return null;

  return (
    <div
      className={`
        absolute cursor-pointer transition-all duration-500 transform
        ${isActive ? 'scale-125 z-20' : 'hover:scale-110 z-10'}
        ${isGlitching ? 'animate-bounce' : ''}
      `}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: `translate(-50%, -50%) scale(${isActive ? 1.25 : 1})`,
      }}
      onClick={onClick}
    >
      {/* Aura pulsante */}
      <div 
        className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400 to-cyan-400 opacity-30 animate-pulse"
        style={{
          width: `${60 + pulseIntensity * 40}px`,
          height: `${60 + pulseIntensity * 40}px`,
          marginLeft: `${-(30 + pulseIntensity * 20)}px`,
          marginTop: `${-(30 + pulseIntensity * 20)}px`,
        }}
      />
      
      {/* Nodo central */}
      <div 
        className={`
          relative w-12 h-12 rounded-full border-2 border-white bg-black
          flex items-center justify-center text-xs font-mono
          ${isActive ? 'bg-pink-500 text-black' : 'hover:bg-cyan-500 hover:text-black'}
        `}
        style={{
          boxShadow: `0 0 ${pulseIntensity * 15}px rgba(255, 255, 255, 0.5)`,
        }}
      >
        {fragment.id}
      </div>
      
      {/* Texto flotante al hacer hover */}
      <div className={`
        absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2
        bg-black bg-opacity-90 text-white text-xs rounded border border-gray-600
        max-w-xs text-center leading-relaxed pointer-events-none
        transition-opacity duration-300
        ${isActive ? 'opacity-100' : 'opacity-0 hover:opacity-100'}
      `}>
        {fragment.text.split(' / ')[0]}...
      </div>
    </div>
  );
};
