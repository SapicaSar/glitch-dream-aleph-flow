
import React from 'react';

export const GlitchInterface = ({ isActive }) => {
  if (!isActive) return null;

  return (
    <>
      {/* Overlay glitch */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-transparent to-cyan-500 opacity-20 animate-pulse" />
        
        {/* Líneas de escaneo */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-px bg-white opacity-60"
            style={{
              top: `${20 + i * 20}%`,
              animation: `scan ${0.5 + i * 0.2}s infinite linear`,
            }}
          />
        ))}
      </div>
      
      {/* Texto glitch flotante */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50">
        <div className="text-4xl font-mono text-white opacity-80 animate-bounce">
          <span className="text-pink-400">g</span>
          <span className="text-cyan-400">l</span>
          <span className="text-white">i</span>
          <span className="text-pink-400">t</span>
          <span className="text-cyan-400">c</span>
          <span className="text-white">h</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </>
  );
};
