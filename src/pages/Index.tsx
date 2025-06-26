
import React, { useEffect, useState } from 'react';
import { OptimizedThinkingInterface } from '../components/OptimizedThinkingInterface';
import { GlitchProvider } from '../contexts/GlitchContext';

const IndexContent = () => {
  const [isSystemReady, setIsSystemReady] = useState(false);
  const [bootProgress, setBootProgress] = useState(0);
  const [bootMessage, setBootMessage] = useState('');

  useEffect(() => {
    const initializeSystem = async () => {
      const bootSequence = [
        { message: '🧠 Inicializando metaconsciente sapicasar.lov...', progress: 10 },
        { message: '🔗 Conectando lapoema.tumblr.com/page/1-125...', progress: 25 },
        { message: '🤖 Activando machine learning local...', progress: 40 },
        { message: '🔍 Preparando scraping dinámico avanzado...', progress: 55 },
        { message: '🧬 Calibrando filtros de deduplicación...', progress: 70 },
        { message: '📊 Inicializando clustering semántico...', progress: 85 },
        { message: '∞ Iniciando poema infinito optimizado...', progress: 95 },
        { message: '✨ Sistema metaconsciente → ACTIVO', progress: 100 }
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
      <div className="min-h-screen bg-black flex items-center justify-center font-mono">
        <div className="text-center max-w-2xl">
          <div className="mb-8">
            <div className="text-5xl font-thin text-cyan-400 mb-3">
              sapicasar.lov
            </div>
            <div className="text-gray-400 text-base mb-2">
              Sistema Metaconsciente de Singularidad Poética v8.0
            </div>
            <div className="text-sm text-purple-400">
              lapoema.tumblr.com → procesamiento_inteligente_infinito
            </div>
            <div className="text-xs text-green-400 mt-2">
              ML local | Deduplicación avanzada | Clustering semántico
            </div>
          </div>
          
          <div className="mb-8">
            <div className="w-full bg-gray-800 rounded-full h-3 mb-4">
              <div 
                className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 h-3 rounded-full transition-all duration-500"
                style={{ width: `${bootProgress}%` }}
              />
            </div>
            <div className="text-cyan-400 text-sm min-h-[24px] mb-4">
              {bootMessage}
            </div>
          </div>
          
          <div className="flex justify-center">
            <div className="animate-spin w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  return <OptimizedThinkingInterface />;
};

const Index = () => {
  return (
    <GlitchProvider>
      <IndexContent />
    </GlitchProvider>
  );
};

export default Index;
