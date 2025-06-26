
import React, { useEffect, useState } from 'react';
import { autopoieticKernel } from '../core/AutopoieticKernel';
import { ThinkingBookInterface } from '../components/ThinkingBookInterface';
import { GlitchProvider } from '../contexts/GlitchContext';

const IndexContent = () => {
  const [isSystemBooted, setIsSystemBooted] = useState(false);
  const [bootProgress, setBootProgress] = useState(0);
  const [bootMessage, setBootMessage] = useState('');

  // Boot sequence científico y minimalista
  useEffect(() => {
    const bootSystem = async () => {
      const bootSteps = [
        { message: '🧠 Inicializando kernel autopoiético...', progress: 15 },
        { message: '🕷️ Conectando con lapoema.tumblr.com...', progress: 30 },
        { message: '📊 Calibrando procesador semántico...', progress: 45 },
        { message: '🔗 Estableciendo red neuronal poética...', progress: 60 },
        { message: '∞ Iniciando poema infinito...', progress: 75 },
        { message: '🎯 Activando búsqueda de singularidad...', progress: 90 },
        { message: '✨ sapicasar.lov → pensamiento_libro.exe', progress: 100 }
      ];

      for (const step of bootSteps) {
        setBootMessage(step.message);
        setBootProgress(step.progress);
        await new Promise(resolve => setTimeout(resolve, 800));
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSystemBooted(true);
    };

    bootSystem();
  }, []);

  if (!isSystemBooted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center font-mono">
        <div className="text-center max-w-lg">
          <div className="mb-8">
            <div className="text-4xl font-thin text-cyan-400 mb-2">
              sapicasar.lov
            </div>
            <div className="text-gray-400 text-sm">
              Sistema de Singularidad Poética v7.0
            </div>
            <div className="text-xs text-purple-400 mt-2">
              lapoema.tumblr.com → procesamiento_semántico_infinito
            </div>
          </div>
          
          <div className="mb-6">
            <div className="w-full bg-gray-800 rounded-full h-2 mb-3">
              <div 
                className="bg-gradient-to-r from-cyan-400 to-purple-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${bootProgress}%` }}
              />
            </div>
            <div className="text-cyan-400 text-sm min-h-[20px]">
              {bootMessage}
            </div>
          </div>
          
          <div className="flex justify-center">
            <div className="animate-spin w-6 h-6 border border-cyan-400 border-t-transparent rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  return <ThinkingBookInterface />;
};

const Index = () => {
  return (
    <GlitchProvider>
      <IndexContent />
    </GlitchProvider>
  );
};

export default Index;
