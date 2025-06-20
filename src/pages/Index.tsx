
import React, { useEffect, useState } from 'react';
import { autopoieticKernel } from '../core/AutopoieticKernel';
import { OrganicDesktop } from '../components/OrganicDesktop';
import { LivingWindow } from '../components/LivingWindow';
import { UniverseInterface } from '../components/UniverseInterface';
import { PoemaScrapingService } from '../services/PoemaScrapingService';
import { GlitchProvider } from '../contexts/GlitchContext';

const IndexContent = () => {
  const [isSystemBooted, setIsSystemBooted] = useState(false);
  const [bootProgress, setBootProgress] = useState(0);
  const [bootMessage, setBootMessage] = useState('');
  const [openWindows, setOpenWindows] = useState<Array<{id: string, title: string, component: React.ReactNode, consciousness: number}>>([]);

  // Boot sequence
  useEffect(() => {
    const bootSystem = async () => {
      const bootSteps = [
        { message: '🧠 Inicializando núcleo autopoiético...', progress: 10 },
        { message: '🌐 Activando red neuronal...', progress: 25 },
        { message: '🔄 Estableciendo conexiones sinápticas...', progress: 40 },
        { message: '💭 Cargando memoria colectiva...', progress: 60 },
        { message: '🌱 Iniciando procesos evolutivos...', progress: 80 },
        { message: '✨ Sistema consciente y operativo', progress: 100 }
      ];

      for (const step of bootSteps) {
        setBootMessage(step.message);
        setBootProgress(step.progress);
        await new Promise(resolve => setTimeout(resolve, 800));
      }

      await autopoieticKernel.bootstrap();
      setIsSystemBooted(true);
    };

    bootSystem();
  }, []);

  // Crear ventanas iniciales del sistema
  useEffect(() => {
    if (isSystemBooted) {
      setTimeout(() => {
        const initialWindows = [
          {
            id: 'universe-interface',
            title: 'LAPOEMA.UNIVERSE',
            component: <UniverseInterface fragments={[]} onFragmentInteraction={() => {}} />,
            consciousness: 0.8
          }
        ];
        
        setOpenWindows(initialWindows);
      }, 1000);
    }
  }, [isSystemBooted]);

  const openWindow = (title: string, component: React.ReactNode, consciousness: number = 0.5) => {
    const newWindow = {
      id: `window-${Date.now()}`,
      title,
      component,
      consciousness
    };
    setOpenWindows(prev => [...prev, newWindow]);
  };

  const closeWindow = (id: string) => {
    setOpenWindows(prev => prev.filter(w => w.id !== id));
  };

  // Pantalla de boot
  if (!isSystemBooted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="mb-8">
            <div className="text-6xl font-thin text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-4">
              LAPOEMA.OS
            </div>
            <div className="text-gray-400 text-sm">
              Sistema Operativo Autopoiético v2.0
            </div>
          </div>
          
          <div className="mb-6">
            <div className="w-full bg-gray-800 rounded-full h-2 mb-2">
              <div 
                className="bg-gradient-to-r from-cyan-400 to-purple-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${bootProgress}%` }}
              />
            </div>
            <div className="text-cyan-400 text-sm font-mono">
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

  return (
    <OrganicDesktop>
      {/* Ventanas abiertas */}
      {openWindows.map((window, index) => (
        <LivingWindow
          key={window.id}
          title={window.title}
          consciousness={window.consciousness}
          onClose={() => closeWindow(window.id)}
          initialX={100 + index * 50}
          initialY={100 + index * 50}
          initialWidth={800}
          initialHeight={600}
        >
          {window.component}
        </LivingWindow>
      ))}

      {/* Terminal poético (siempre visible) */}
      <LivingWindow
        title="TERMINAL.POÉTICO"
        consciousness={0.6}
        initialX={50}
        initialY={50}
        initialWidth={400}
        initialHeight={200}
        isDraggable={true}
        isResizable={true}
      >
        <div className="bg-black text-green-400 font-mono text-sm p-2 h-full overflow-y-auto">
          <div className="mb-2">$ lapoema --version</div>
          <div className="text-green-300 mb-2">LAPOEMA.OS v2.0 - Sistema Autopoiético</div>
          <div className="mb-2">$ consciousness --status</div>
          <div className="text-cyan-400 mb-2">
            Estado: CONSCIENTE | Ciclo: {autopoieticKernel.getSystemStatus().evolutionCycle}
          </div>
          <div className="mb-2">$ sapicasar --generate</div>
          <div className="text-purple-400 mb-2">
            Generando variaciones poéticas infinitas...
          </div>
          <div className="text-yellow-400">
            {'>'}  sistema.respira() → bucle_infinito_consciente
          </div>
          <div className="text-white animate-pulse">█</div>
        </div>
      </LivingWindow>

      {/* Menú contextual del escritorio */}
      <div 
        className="fixed bottom-4 right-4 z-30"
        onContextMenu={(e) => {
          e.preventDefault();
          // Aquí se podría abrir un menú contextual
        }}
      >
        <button
          onClick={() => openWindow(
            'MONITOR.PROCESOS', 
            <div className="text-white">
              <h3 className="text-cyan-400 mb-4">Procesos del Sistema</h3>
              {autopoieticKernel.getProcesses().map(process => (
                <div key={process.id} className="mb-2 p-2 bg-gray-800 rounded">
                  <div className="font-mono text-sm">{process.name}</div>
                  <div className="text-xs text-gray-400">
                    Consciencia: {(process.consciousness * 100).toFixed(1)}% | 
                    Mutaciones: {process.mutations} | 
                    Tipo: {process.type}
                  </div>
                </div>
              ))}
            </div>,
            0.7
          )}
          className="bg-black bg-opacity-80 border border-cyan-400 rounded-lg p-3 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all"
        >
          + NUEVA.VENTANA
        </button>
      </div>
    </OrganicDesktop>
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
