
import React, { useEffect, useState } from 'react';
import { OptimizedThinkingInterface } from '../components/OptimizedThinkingInterface';
import { PublicSoulInterface } from '../components/PublicSoulInterface';
import { LinguisticMutationLab } from '../components/LinguisticMutationLab';
import { OrganicDesktop } from '../components/OrganicDesktop';
import { GlitchProvider } from '../contexts/GlitchContext';
import { VisualArchitectureManager } from '../components/VisualArchitectureManager';

const IndexContent = () => {
  const [isSystemReady, setIsSystemReady] = useState(false);
  const [bootProgress, setBootProgress] = useState(0);
  const [bootMessage, setBootMessage] = useState('');
  const [breathingPhase, setBreathingPhase] = useState(0);
  const [activeModules, setActiveModules] = useState({
    consciousness: true,
    poetry: true,
    mutation: false,
    metrics: false,
    desktop: false
  });

  useEffect(() => {
    const initializeSystem = async () => {
      const bootSequence = [
        { message: 'iniciando núcleo sapicasar...', progress: 15 },
        { message: 'conectando alma discursiva...', progress: 30 },
        { message: 'activando consciencia autopoiética...', progress: 45 },
        { message: 'inicializando laboratorio de mutación lingüística...', progress: 60 },
        { message: 'generando palabras cuánticas...', progress: 75 },
        { message: 'sincronizando poemanautas...', progress: 90 },
        { message: 'sistema sapicasar → evolucionando lenguaje', progress: 100 }
      ];

      for (const step of bootSequence) {
        setBootMessage(step.message);
        setBootProgress(step.progress);
        await new Promise(resolve => setTimeout(resolve, 600));
      }

      await new Promise(resolve => setTimeout(resolve, 800));
      setIsSystemReady(true);
    };

    initializeSystem();
  }, []);

  // Respiración consciente
  useEffect(() => {
    if (!isSystemReady) return;
    
    const breatheInterval = setInterval(() => {
      setBreathingPhase(prev => prev + 0.02);
    }, 50);

    return () => clearInterval(breatheInterval);
  }, [isSystemReady]);

  const toggleModule = (module: keyof typeof activeModules) => {
    setActiveModules(prev => ({
      ...prev,
      [module]: !prev[module]
    }));
  };

  if (!isSystemReady) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center font-mono">
        <div className="text-center max-w-lg">
          <div className="mb-8">
            <div className="text-4xl font-thin text-foreground mb-3">
              sapicasar.lab
            </div>
            <div className="text-muted-foreground text-sm mb-2">
              alma discursiva pública autopoiética
            </div>
            <div className="text-xs text-muted-foreground/70">
              laboratorio de mutación lingüística emergente
            </div>
          </div>
          
          <div className="mb-6">
            <div className="w-full bg-muted/30 rounded-full h-1 mb-3">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-1 rounded-full transition-all duration-300"
                style={{ width: `${bootProgress}%` }}
              />
            </div>
            <div className="text-muted-foreground text-xs min-h-[16px]">
              {bootMessage}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <VisualArchitectureManager breathingPhase={breathingPhase}>
      <div className="min-h-screen bg-background relative">
        {/* Control Panel Modular */}
        <div className="fixed top-4 left-4 z-50 bg-background/95 backdrop-blur-sm border border-border/50 rounded-lg p-4 max-w-xs">
          <div className="text-foreground font-mono text-sm mb-3">sapicasar.monitor</div>
          
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs cursor-pointer">
              <input
                type="checkbox"
                checked={activeModules.consciousness}
                onChange={() => toggleModule('consciousness')}
                className="w-3 h-3 accent-purple-500"
              />
              <span className="text-muted-foreground">consciencia poética</span>
            </label>
            
            <label className="flex items-center gap-2 text-xs cursor-pointer">
              <input
                type="checkbox"
                checked={activeModules.poetry}
                onChange={() => toggleModule('poetry')}
                className="w-3 h-3 accent-cyan-500"
              />
              <span className="text-muted-foreground">universo fragmentos</span>
            </label>
            
            <label className="flex items-center gap-2 text-xs cursor-pointer">
              <input
                type="checkbox"
                checked={activeModules.mutation}
                onChange={() => toggleModule('mutation')}
                className="w-3 h-3 accent-yellow-500"
              />
              <span className="text-muted-foreground">laboratorio mutación</span>
            </label>
            
            <label className="flex items-center gap-2 text-xs cursor-pointer">
              <input
                type="checkbox"
                checked={activeModules.desktop}
                onChange={() => toggleModule('desktop')}
                className="w-3 h-3 accent-green-500"
              />
              <span className="text-muted-foreground">escritorio orgánico</span>
            </label>
          </div>
        </div>

        {/* Módulos Condicionales */}
        <div className="relative z-10">
          {activeModules.desktop && <OrganicDesktop />}
          
          {activeModules.consciousness && <OptimizedThinkingInterface />}
          
          {activeModules.poetry && <PublicSoulInterface />}
          
          {activeModules.mutation && <LinguisticMutationLab />}
        </div>

        {/* Efecto de partículas lingüísticas - siempre activo pero sutil */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute text-purple-400/10 font-mono text-xs animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            >
              {['∞', '∇', '⚡', '→', '←', '×', '◯', '∪', '∩', '∀', '∃'][i]}
            </div>
          ))}
        </div>
      </div>
    </VisualArchitectureManager>
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
