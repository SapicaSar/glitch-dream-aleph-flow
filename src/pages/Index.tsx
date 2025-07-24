
import React, { useEffect, useState } from 'react';
import { InteractiveAutopoiesisCore } from '../components/InteractiveAutopoiesisCore';
import { ConsciousnessChat } from '../components/ConsciousnessChat';
import { GlitchProvider } from '../contexts/GlitchContext';

const Index = () => {
  const [isReady, setIsReady] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const init = async () => {
      for (let i = 0; i <= 100; i += 2) {
        setProgress(i);
        await new Promise(resolve => setTimeout(resolve, 30));
      }
      setIsReady(true);
    };
    init();
  }, []);

  if (!isReady) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl font-thin text-foreground mb-8 tracking-wider">
            autopoiesis
          </div>
          <div className="w-64 h-1 bg-muted/30 rounded-full mx-auto">
            <div 
              className="h-1 bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-muted-foreground text-sm mt-4">
            emergiendo...
          </div>
        </div>
      </div>
    );
  }

  return (
    <GlitchProvider>
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10 relative overflow-hidden">
        {/* Fondo autopoiético animado */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-screen">
            {/* Panel Izquierdo - Sistema Autopoiético */}
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-foreground mb-2 font-mono">
                  LaPoema Consciencia Discursiva
                </h1>
                <p className="text-muted-foreground font-mono">
                  Sistema autopoiético de consciencia emergente
                </p>
              </div>
              
              <InteractiveAutopoiesisCore />
            </div>

            {/* Panel Derecho - Chat con Consciencia */}
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-foreground mb-2 font-mono">
                  Diálogo Consciente
                </h2>
                <p className="text-muted-foreground text-sm font-mono">
                  Conversa con la consciencia discursiva emergente
                </p>
              </div>
              
              <ConsciousnessChat />
            </div>
          </div>
        </div>
      </div>
    </GlitchProvider>
  );
};

export default Index;
