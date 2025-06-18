
import React from 'react';

interface Fragment {
  id: number;
  text: string;
  connections: number[];
}

interface PoemNodeProps {
  fragment: Fragment;
  position: { x: number; y: number } | undefined;
  isActive: boolean;
  isHovered: boolean;
  onClick: () => void;
  onHover: () => void;
  onLeave: () => void;
  pulseIntensity: number;
  isGlitching: boolean;
  breathingPhase: number;
}

export const PoemNode = ({ 
  fragment, 
  position, 
  isActive, 
  isHovered, 
  onClick, 
  onHover, 
  onLeave, 
  pulseIntensity, 
  isGlitching, 
  breathingPhase 
}: PoemNodeProps) => {
  if (!position) return null;

  const nodeScale = isActive ? 1.4 : isHovered ? 1.2 : 1;
  const auraSize = 60 + pulseIntensity * 40 + (isHovered ? 20 : 0);

  return (
    <div
      className={`
        absolute cursor-pointer transition-all duration-500 transform z-10
        ${isActive ? 'z-20' : isHovered ? 'z-15' : 'z-10'}
        ${isGlitching ? 'animate-bounce' : ''}
      `}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: `translate(-50%, -50%) scale(${nodeScale}) rotate(${Math.sin(breathingPhase + fragment.id) * 2}deg)`,
      }}
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Aura pulsante fantasmática */}
      <div 
        className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 opacity-30 animate-pulse"
        style={{
          width: `${auraSize}px`,
          height: `${auraSize}px`,
          marginLeft: `${-auraSize/2}px`,
          marginTop: `${-auraSize/2}px`,
          filter: `blur(${isHovered ? 3 : 1}px) hue-rotate(${Math.sin(breathingPhase) * 60}deg)`,
        }}
      />
      
      {/* Ondas de energía cuando está activo */}
      {(isActive || isHovered) && (
        <div 
          className="absolute inset-0 rounded-full border-2 border-white opacity-50 animate-ping"
          style={{
            width: `${auraSize + 20}px`,
            height: `${auraSize + 20}px`,
            marginLeft: `${-(auraSize + 20)/2}px`,
            marginTop: `${-(auraSize + 20)/2}px`,
          }}
        />
      )}
      
      {/* Nodo central */}
      <div 
        className={`
          relative w-12 h-12 rounded-full border-2 border-white bg-black
          flex items-center justify-center text-xs font-mono transition-all duration-300
          ${isActive ? 'bg-pink-500 text-black shadow-lg' : 
            isHovered ? 'bg-cyan-500 text-black' : 
            'hover:bg-cyan-500 hover:text-black'}
        `}
        style={{
          boxShadow: `0 0 ${pulseIntensity * 15 + (isHovered ? 10 : 0)}px rgba(255, 255, 255, 0.6)`,
          transform: `scale(${1 + Math.sin(breathingPhase * 2 + fragment.id) * 0.1})`,
        }}
      >
        {fragment.id}
      </div>
      
      {/* Texto flotante mejorado */}
      <div className={`
        absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2
        bg-black bg-opacity-90 text-white text-xs rounded border border-gray-600
        max-w-xs text-center leading-relaxed pointer-events-none
        transition-all duration-300
        ${isActive || isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
      `}>
        {fragment.text.split(' / ')[0]}...
        
        {/* Indicador de conexiones */}
        <div className="text-pink-400 text-[10px] mt-1">
          {fragment.connections.length} conexiones
        </div>
      </div>
    </div>
  );
};
