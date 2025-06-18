
import React from 'react';

interface GlitchInterfaceProps {
  isActive: boolean;
  intensity: number;
}

export const GlitchInterface = ({ isActive, intensity }: GlitchInterfaceProps) => {
  if (!isActive) return null;

  return (
    <>
      {/* Overlay glitch */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-pink-500 via-transparent to-cyan-500 animate-pulse" 
          style={{ opacity: intensity * 0.3 }}
        />
        
        {/* Líneas de escaneo dinámicas */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full bg-white animate-pulse"
            style={{
              height: `${Math.random() * 3 + 1}px`,
              top: `${10 + i * 12}%`,
              opacity: intensity * 0.6,
              animationDelay: `${i * 0.15}s`,
              animationDuration: `${0.3 + i * 0.1}s`,
              transform: `translateX(${Math.sin(Date.now() * 0.01 + i) * 20}px)`,
            }}
          />
        ))}
        
        {/* Partículas glitch */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-cyan-400 animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: intensity * 0.8,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${0.5 + Math.random()}s`,
            }}
          />
        ))}
      </div>
      
      {/* Texto glitch flotante mejorado */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50">
        <div 
          className="text-4xl font-mono text-white animate-bounce"
          style={{ 
            opacity: intensity * 0.9,
            filter: `blur(${Math.sin(Date.now() * 0.01) * 2}px)`,
            textShadow: `0 0 ${intensity * 10}px rgba(255, 255, 255, 0.8)`
          }}
        >
          <span className="text-pink-400">g</span>
          <span className="text-cyan-400">l</span>
          <span className="text-white">i</span>
          <span className="text-pink-400">t</span>
          <span className="text-cyan-400">c</span>
          <span className="text-white">h</span>
        </div>
      </div>
    </>
  );
};
