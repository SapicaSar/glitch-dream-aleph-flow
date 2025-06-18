
import React, { useState, useEffect } from 'react';

const oracleResponses = {
  deseo: [
    "el deseo es un glitch en el código del tiempo / lo que late bajo la superficie",
    "tu pulso resuena con el latido primordial / carne que sueña con ser otra",
    "en el umbral del deseo habita la metamorfosis / ¿qué quieres devenir?"
  ],
  cuerpo: [
    "tu cuerpo es un archivo de memorias que no recuerdas / geografía fragmentada",
    "animal interno respira bajo tu piel / instinto que late en código binario",
    "carne-mapa de cicatrices luminosas / cada marca una puerta a otro plano"
  ],
  error: [
    "el error revela lo que el sistema oculta / glitch feminista que libera",
    "en la falla encuentras la verdad / bug que devora las normas impuestas",
    "error como puerta dimensional / fragmento disperso del yo multiplicado"
  ],
  sueño: [
    "sueñas el texto que se escribe solo / río negro fluye por tu inconsciente",
    "onírico portal donde habitas múltiple / memoria ancestral que late",
    "en el sueño lúcido eres el texto / vigilia intermedia entre mundos"
  ]
};

interface PoeticOracleProps {
  currentState: string;
  pulseIntensity: number;
  mousePos: { x: number; y: number };
}

export const PoeticOracle = ({ currentState, pulseIntensity, mousePos }: PoeticOracleProps) => {
  const [isActive, setIsActive] = useState(false);
  const [currentResponse, setCurrentResponse] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const consultOracle = () => {
    const responses = oracleResponses[currentState as keyof typeof oracleResponses] || oracleResponses.deseo;
    const response = responses[Math.floor(Math.random() * responses.length)];
    
    setIsActive(true);
    setIsTyping(true);
    setCurrentResponse('');
    
    // Efecto de escritura con variación según posición del cursor
    let i = 0;
    const baseSpeed = 50;
    const cursorInfluence = Math.sqrt(mousePos.x * mousePos.y) / 100;
    const typeSpeed = baseSpeed + cursorInfluence * 30;
    
    const typeInterval = setInterval(() => {
      setCurrentResponse(response.substring(0, i));
      i++;
      if (i > response.length) {
        clearInterval(typeInterval);
        setIsTyping(false);
      }
    }, typeSpeed);
  };

  return (
    <div className="fixed bottom-6 left-6 z-30">
      <button
        onClick={consultOracle}
        className={`
          relative px-6 py-3 rounded-full bg-gradient-to-r from-black via-purple-900 to-black 
          border-2 border-purple-400 text-purple-200 hover:text-white
          hover:scale-105 transition-all duration-300
          ${isTyping ? 'animate-pulse' : ''}
        `}
        style={{
          boxShadow: `0 0 ${pulseIntensity * 20}px rgba(168, 85, 247, 0.4)`,
          transform: `scale(${1 + Math.sin(mousePos.x * 0.01) * 0.02})`
        }}
      >
        <span className="font-mono text-sm">oráculo glitch-amoroso</span>
        {isTyping && (
          <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-purple-400 animate-ping" />
        )}
      </button>
      
      {isActive && currentResponse && (
        <div 
          className="absolute bottom-full left-0 mb-4 w-96 p-4 bg-black bg-opacity-95 border border-purple-400 rounded-lg backdrop-blur-sm"
          style={{
            transform: `translateY(${Math.sin(mousePos.y * 0.01) * 5}px)`,
            opacity: 0.9 + Math.sin(pulseIntensity * 3) * 0.1
          }}
        >
          <div className="text-purple-200 text-sm leading-relaxed">
            {currentResponse}
            {isTyping && <span className="animate-pulse">|</span>}
          </div>
          
          <button
            onClick={() => setIsActive(false)}
            className="absolute top-2 right-2 text-purple-400 hover:text-white text-xs"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};
