
import React, { useState, useEffect } from 'react';
import { ConstellationMap } from '../components/ConstellationMap';
import { PoeticOracle } from '../components/PoeticOracle';
import { RhizomaticNav } from '../components/RhizomaticNav';
import { GlitchInterface } from '../components/GlitchInterface';
import { FloatingDictionary } from '../components/FloatingDictionary';

const Index = () => {
  const [currentState, setCurrentState] = useState('deseo');
  const [pulseIntensity, setPulseIntensity] = useState(0.5);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    // Pulso vital del texto
    const interval = setInterval(() => {
      setPulseIntensity(Math.random() * 0.8 + 0.2);
    }, 2000);

    // Glitch aleatorio
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.85) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 300);
      }
    }, 5000);

    return () => {
      clearInterval(interval);
      clearInterval(glitchInterval);
    };
  }, []);

  return (
    <div className={`min-h-screen bg-black text-white overflow-hidden relative ${isGlitching ? 'animate-pulse' : ''}`}>
      {/* Fondo de constelación dinámica */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(ellipse at ${50 + Math.sin(Date.now() * 0.001) * 20}% ${50 + Math.cos(Date.now() * 0.001) * 20}%, 
                       rgba(255, 50, 150, ${pulseIntensity * 0.3}) 0%, 
                       rgba(50, 255, 200, ${pulseIntensity * 0.2}) 40%, 
                       rgba(0, 0, 0, 0.9) 70%)`
        }}
      />

      {/* Header Glitch */}
      <header className="relative z-10 p-8 text-center">
        <h1 className={`text-6xl font-thin tracking-widest mb-4 ${isGlitching ? 'animate-bounce' : ''}`}>
          <span className="text-pink-400">LA</span>
          <span className="text-cyan-400">POEMA</span>
          <span className="text-white opacity-70">.expandida</span>
        </h1>
        <p className="text-lg opacity-70 max-w-2xl mx-auto leading-relaxed">
          universo textual abierto / constelación de memoria-deseo / 
          red de indra poética / archivo onírico del yo multiplicado
        </p>
      </header>

      {/* Navegación Rizomática */}
      <RhizomaticNav 
        currentState={currentState}
        onStateChange={setCurrentState}
        pulseIntensity={pulseIntensity}
      />

      {/* Mapa de Constelación Principal */}
      <main className="relative z-10 p-8">
        <ConstellationMap 
          currentState={currentState}
          pulseIntensity={pulseIntensity}
          isGlitching={isGlitching}
        />
      </main>

      {/* Interfaz Glitch Flotante */}
      <GlitchInterface isActive={isGlitching} />

      {/* Diccionario Poético Flotante */}
      <FloatingDictionary currentState={currentState} />

      {/* Oráculo Poético */}
      <PoeticOracle 
        currentState={currentState}
        pulseIntensity={pulseIntensity}
      />

      {/* Metadata sensible invisible */}
      <div className="hidden">
        {JSON.stringify({
          timestamp: Date.now(),
          lunarPhase: Math.floor(Math.random() * 8),
          emotionalResonance: currentState,
          textualPulse: pulseIntensity,
          readerPresence: 'detected'
        })}
      </div>
    </div>
  );
};

export default Index;
