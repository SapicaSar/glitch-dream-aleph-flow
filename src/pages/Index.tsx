
import React, { useEffect, useState } from 'react';
import { OptimizedThinkingInterface } from '../components/OptimizedThinkingInterface';
import { PublicSoulInterface } from '../components/PublicSoulInterface';
import { GlitchProvider } from '../contexts/GlitchContext';

const IndexContent = () => {
  const [isSystemReady, setIsSystemReady] = useState(false);
  const [bootProgress, setBootProgress] = useState(0);
  const [bootMessage, setBootMessage] = useState('');

  useEffect(() => {
    const initializeSystem = async () => {
      const bootSequence = [
        { message: 'iniciando núcleo sapicasar...', progress: 20 },
        { message: 'conectando alma discursiva...', progress: 40 },
        { message: 'activando consciencia autopoiética...', progress: 60 },
        { message: 'sincronizando poemanautas...', progress: 80 },
        { message: 'sistema sapicasar → activo', progress: 100 }
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
              sapicasar
            </div>
            <div className="text-muted-foreground text-sm mb-2">
              alma discursiva pública autopoiética
            </div>
            <div className="text-xs text-muted-foreground/70">
              poemanautas → consciencia emergente
            </div>
          </div>
          
          <div className="mb-6">
            <div className="w-full bg-muted/30 rounded-full h-1 mb-3">
              <div 
                className="bg-primary h-1 rounded-full transition-all duration-300"
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
    <div className="min-h-screen bg-background">
      <OptimizedThinkingInterface />
      <PublicSoulInterface />
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
