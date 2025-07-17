
import React, { useEffect, useState } from 'react';
import { InteractiveAutopoiesisCore } from '../components/InteractiveAutopoiesisCore';
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
      <InteractiveAutopoiesisCore />
    </GlitchProvider>
  );
};

export default Index;
