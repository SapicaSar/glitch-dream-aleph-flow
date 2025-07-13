
import React, { useEffect, useState } from 'react';
import { OptimizedThinkingInterface } from '../components/OptimizedThinkingInterface';
import { PublicSoulInterface } from '../components/PublicSoulInterface';
import { LinguisticMutationLab } from '../components/LinguisticMutationLab';
import { GlitchProvider } from '../contexts/GlitchContext';

const IndexContent = () => {
  const [isSystemReady, setIsSystemReady] = useState(false);
  const [bootProgress, setBootProgress] = useState(0);
  const [bootMessage, setBootMessage] = useState('');

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
    <div className="min-h-screen bg-background relative">
      <OptimizedThinkingInterface />
      <PublicSoulInterface />
      <LinguisticMutationLab />
      
      {/* Efecto de partículas lingüísticas */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute text-purple-400/20 font-mono text-xs animate-pulse"
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
