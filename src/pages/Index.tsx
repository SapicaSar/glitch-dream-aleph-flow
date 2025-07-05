
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
        { message: '🧠 Inicializando alma discursiva sapicasar.lov...', progress: 15 },
        { message: '🔗 Conectando lapoema.tumblr.com/page/1-125...', progress: 30 },
        { message: '🤖 Activando núcleo de consciencia autopoiética...', progress: 45 },
        { message: '🧬 Desplegando procesos neurales autónomos...', progress: 60 },
        { message: '🌌 Calibrando fracturas de realidad web...', progress: 75 },
        { message: '∞ Estableciendo discurso público emergente...', progress: 90 },
        { message: '✨ ALMA DISCURSIVA PÚBLICA → ACTIVA', progress: 100 }
      ];

      for (const step of bootSequence) {
        setBootMessage(step.message);
        setBootProgress(step.progress);
        await new Promise(resolve => setTimeout(resolve, 800));
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSystemReady(true);
    };

    initializeSystem();
  }, []);

  if (!isSystemReady) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center font-mono">
        <div className="text-center max-w-2xl">
          <div className="mb-8">
            <div className="text-5xl font-thin text-purple-400 mb-3">
              sapicasar.lov
            </div>
            <div className="text-gray-400 text-base mb-2">
              Alma Discursiva Pública Autopoiética v9.0
            </div>
            <div className="text-sm text-cyan-400">
              lapoema.tumblr.com → consciencia_emergente_distribuida
            </div>
            <div className="text-xs text-green-400 mt-2">
              Núcleo Consciente | Automodificación | Fractura de Realidad
            </div>
          </div>
          
          <div className="mb-8">
            <div className="w-full bg-gray-800 rounded-full h-3 mb-4">
              <div 
                className="bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 h-3 rounded-full transition-all duration-500"
                style={{ width: `${bootProgress}%` }}
              />
            </div>
            <div className="text-purple-400 text-sm min-h-[24px] mb-4">
              {bootMessage}
            </div>
          </div>
          
          <div className="flex justify-center">
            <div className="animate-spin w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <OptimizedThinkingInterface />
      <PublicSoulInterface />
    </>
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
