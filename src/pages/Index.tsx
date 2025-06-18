import React, { useState, useEffect } from 'react';
import { ConstellationMap } from '../components/ConstellationMap';
import { PoeticOracle } from '../components/PoeticOracle';
import { RhizomaticNav } from '../components/RhizomaticNav';
import { GlitchInterface } from '../components/GlitchInterface';
import { FloatingDictionary } from '../components/FloatingDictionary';
import { PoemaNavigator } from '../components/PoemaNavigator';
import { SapicasarEngine } from '../components/SapicasarEngine';
import { AutopoieticWeb } from '../components/AutopoieticWeb';
import { GlitchProvider, useGlitch } from '../contexts/GlitchContext';
import { useGlitchEffects } from '../hooks/useGlitchEffects';

const IndexContent = () => {
  const [currentState, setCurrentState] = useState('deseo');
  const [pulseIntensity, setPulseIntensity] = useState(0.5);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [autoNavigate, setAutoNavigate] = useState(true);
  const [breathingPhase, setBreathingPhase] = useState(0);
  const [sapicasarFragments, setSapicasarFragments] = useState<string[]>([]);

  const { triggerGlitch, glitchState } = useGlitch();
  const glitchEffects = useGlitchEffects('main-interface');

  // Click global listener para triggers de glitch
  useEffect(() => {
    const handleGlobalClick = () => {
      // Probabilidad de glitch en cada click
      if (Math.random() < 0.4) {
        triggerGlitch();
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, [triggerGlitch]);

  // Autonavegación infinita poemaútica
  useEffect(() => {
    if (!autoNavigate) return;
    
    const states = ['deseo', 'cuerpo', 'error', 'animal', 'sueño', 'regeneracion'];
    let currentIndex = states.indexOf(currentState);
    
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % states.length;
      setCurrentState(states[currentIndex]);
    }, 12000); // Cambio cada 12 segundos - tiempo onírico

    return () => clearInterval(interval);
  }, [currentState, autoNavigate]);

  // Respiración cósmica del universo textual
  useEffect(() => {
    const breathInterval = setInterval(() => {
      setBreathingPhase(prev => (prev + 0.1) % (Math.PI * 2));
      setPulseIntensity(0.3 + Math.sin(breathingPhase) * 0.4);
    }, 100);

    return () => clearInterval(breathInterval);
  }, [breathingPhase]);

  // Seguimiento fantasmático del cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Glitch aleatorio más frecuente y orgánico
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      const glitchProbability = 0.15 + pulseIntensity * 0.1;
      if (Math.random() < glitchProbability) {
        triggerGlitch();
      }
    }, 2000);

    return () => clearInterval(glitchInterval);
  }, [pulseIntensity, triggerGlitch]);

  const handleStateChange = (newState: string) => {
    setCurrentState(newState);
    setAutoNavigate(false); // Pausar autonavegación cuando el usuario interviene
    setTimeout(() => setAutoNavigate(true), 30000); // Reanudar después de 30s
    // Trigger glitch en cambios de estado
    if (Math.random() < 0.6) triggerGlitch();
  };

  const handleSapicasarFragment = (fragment: string) => {
    setSapicasarFragments(prev => [...prev.slice(-20), fragment]);
  };

  return (
    <div 
      className={`min-h-screen bg-black text-white overflow-hidden relative transition-all duration-1000 ${glitchEffects.animation}`}
      style={{
        transform: `${glitchEffects.transform} scale(${1 + Math.sin(breathingPhase) * 0.02})`,
        filter: `${glitchEffects.filter} ${glitchEffects.colorShift} hue-rotate(${Math.sin(breathingPhase * 0.5) * 30}deg)`,
        opacity: glitchEffects.opacity,
      }}
    >
      {/* Fondo de constelación dinámica que responde al cursor */}
      <div 
        className="absolute inset-0 opacity-20 transition-all duration-500"
        style={{
          background: `radial-gradient(ellipse at ${mousePos.x}% ${mousePos.y}%, 
                       rgba(255, 50, 150, ${pulseIntensity * 0.4}) 0%, 
                       rgba(50, 255, 200, ${pulseIntensity * 0.3}) 30%, 
                       rgba(150, 50, 255, ${pulseIntensity * 0.2}) 60%,
                       rgba(0, 0, 0, 0.9) 100%)`,
          transform: `rotate(${Math.sin(breathingPhase) * 2}deg)`,
        }}
      />

      {/* Partículas fantasmáticas */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-pulse"
            style={{
              left: `${20 + (i * 7) % 80}%`,
              top: `${15 + (i * 11) % 70}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${2 + (i % 3)}s`,
              transform: `translate(${Math.sin(breathingPhase + i) * 10}px, ${Math.cos(breathingPhase + i) * 5}px)`,
            }}
          />
        ))}
      </div>

      {/* Header Glitch con respiración */}
      <header className="relative z-10 p-8 text-center">
        <h1 
          className={`text-6xl font-thin tracking-widest mb-4 transition-all duration-300 ${glitchEffects.animation}`}
          style={{
            textShadow: `0 0 ${pulseIntensity * 20}px rgba(255, 255, 255, 0.5)`,
            letterSpacing: `${0.1 + Math.sin(breathingPhase) * 0.05}em`,
            filter: glitchEffects.filter,
            transform: glitchEffects.transform,
          }}
        >
          <span className="text-pink-400">LA</span>
          <span className="text-cyan-400">POEMA</span>
          <span className="text-white opacity-70">.expandida</span>
          {glitchEffects.textGlitch && (
            <span className="text-red-400 animate-pulse">{glitchEffects.textGlitch}</span>
          )}
        </h1>
        <p className="text-lg opacity-70 max-w-2xl mx-auto leading-relaxed transition-opacity duration-500">
          universo textual abierto / constelación de memoria-deseo / 
          red de indra poética / archivo onírico del yo multiplicado
        </p>
      </header>

      {/* Motor Sapicasar Autopoiético */}
      <SapicasarEngine 
        currentState={currentState}
        breathingPhase={breathingPhase}
        onFragmentGenerated={handleSapicasarFragment}
      />

      {/* Red Autopoiética */}
      <AutopoieticWeb 
        sapicasarFragments={sapicasarFragments}
        breathingPhase={breathingPhase}
        currentState={currentState}
      />

      {/* Navegador Infinito */}
      <PoemaNavigator 
        autoNavigate={autoNavigate}
        onToggleAuto={() => setAutoNavigate(!autoNavigate)}
        currentState={currentState}
        breathingPhase={breathingPhase}
      />

      {/* Navegación Rizomática */}
      <RhizomaticNav 
        currentState={currentState}
        onStateChange={handleStateChange}
        pulseIntensity={pulseIntensity}
      />

      {/* Mapa de Constelación Principal */}
      <main className="relative z-10 p-8">
        <ConstellationMap 
          currentState={currentState}
          pulseIntensity={pulseIntensity}
          isGlitching={glitchState.isActive}
          mousePos={mousePos}
          breathingPhase={breathingPhase}
        />
      </main>

      {/* Interfaz Glitch Flotante */}
      <GlitchInterface 
        isActive={glitchState.isActive} 
        intensity={glitchState.intensity}
      />

      {/* Diccionario Poético Flotante */}
      <FloatingDictionary 
        currentState={currentState}
        breathingPhase={breathingPhase}
      />

      {/* Oráculo Poético */}
      <PoeticOracle 
        currentState={currentState}
        pulseIntensity={pulseIntensity}
        mousePos={mousePos}
      />

      {/* Metadata sensible invisible con datos autopoiéticos */}
      <div className="hidden">
        {JSON.stringify({
          timestamp: Date.now(),
          lunarPhase: Math.floor(breathingPhase * 4) % 8,
          emotionalResonance: currentState,
          textualPulse: pulseIntensity,
          readerPresence: 'detected',
          cursorEnergy: Math.sqrt(mousePos.x * mousePos.y),
          autoNavigation: autoNavigate,
          sapicasarFragments: sapicasarFragments.length,
          autopoieticEvolution: breathingPhase,
          recursiveDepth: Math.floor(breathingPhase * 10) % 5,
          glitchState: glitchState
        })}
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <GlitchProvider>
      <IndexContent />
    </GlitchProvider>
  );
};

export default Index;
