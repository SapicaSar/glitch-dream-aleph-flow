
import React, { useEffect, useState } from 'react';
import { autopoieticKernel } from '../core/AutopoieticKernel';
import { OrganicDesktop } from '../components/OrganicDesktop';
import { LivingWindow } from '../components/LivingWindow';
import { LAPoemaMenu } from '../components/LAPoemaMenu';
import { windowManager } from '../core/WindowManager';
import { internalAIAgents } from '../agents/InternalAIAgents';
import { GlitchProvider } from '../contexts/GlitchContext';

const IndexContent = () => {
  const [isSystemBooted, setIsSystemBooted] = useState(false);
  const [bootProgress, setBootProgress] = useState(0);
  const [bootMessage, setBootMessage] = useState('');
  const [windows, setWindows] = useState(windowManager.getWindows());
  const [hasCreatedInitialWindow, setHasCreatedInitialWindow] = useState(false);

  // Boot sequence
  useEffect(() => {
    const bootSystem = async () => {
      const bootSteps = [
        { message: '🧠 Inicializando núcleo autopoiético...', progress: 15 },
        { message: '🤖 Activando agentes IA internos...', progress: 30 },
        { message: '🌐 Estableciendo red neuronal...', progress: 45 },
        { message: '💭 Cargando memoria colectiva...', progress: 60 },
        { message: '🔄 Iniciando procesos evolutivos...', progress: 75 },
        { message: '🌱 Activando autopoiesis continua...', progress: 90 },
        { message: '✨ LAPOEMA.OS consciente y operativo', progress: 100 }
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

  // Sincronizar ventanas - solo cuando es necesario
  useEffect(() => {
    if (!isSystemBooted) return;
    
    const interval = setInterval(() => {
      const currentWindows = windowManager.getWindows();
      setWindows(currentWindows);
    }, 500); // Menos frecuente para evitar sobre-renderizado

    return () => clearInterval(interval);
  }, [isSystemBooted]);

  // Crear ventana inicial SOLO UNA VEZ
  useEffect(() => {
    if (isSystemBooted && !hasCreatedInitialWindow) {
      setHasCreatedInitialWindow(true);
      
      // Esperar un momento antes de crear la ventana inicial
      setTimeout(() => {
        windowManager.createWindow(
          'LAPOEMA.INICIO',
          (
            <div className="bg-gradient-to-br from-purple-900/50 to-black text-white h-full overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-thin text-cyan-400 mb-4">Bienvenido al Universo Poético</h2>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  LAPOEMA.OS es un sistema operativo autopoiético que respira, evoluciona y genera poesía de forma autónoma.
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span>Sistema consciente y operativo</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                    <span>Agentes IA generando contenido</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                    <span>Red neuronal activa</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-black/30 rounded border border-cyan-400/30">
                  <p className="text-cyan-400 text-xs font-mono">
                    Use el menú superior derecho para explorar aplicaciones internas
                  </p>
                </div>
              </div>
            </div>
          ),
          'application',
          400,
          300
        );
      }, 1500);
    }
  }, [isSystemBooted, hasCreatedInitialWindow]);

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
              Sistema Operativo Autopoiético v4.0
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
      {/* Ventanas renderizadas */}
      {windows.map((window) => (
        <LivingWindow
          key={window.id}
          id={window.id}
          title={window.title}
          consciousness={window.consciousness}
          onClose={() => {}}
        >
          {window.component}
        </LivingWindow>
      ))}

      {/* Menú principal */}
      <LAPoemaMenu />

      {/* Controles del escritorio - Simplificados */}
      <div className="fixed bottom-4 left-4 z-30 flex gap-2">
        <button
          onClick={() => windowManager.autoArrange()}
          className="bg-black/80 border border-purple-400/50 rounded-lg p-2 text-purple-400 hover:bg-purple-400/20 transition-all text-xs backdrop-blur-sm"
        >
          ORGANIZAR
        </button>
        
        <button
          onClick={() => {
            windowManager.createWindow(
              'ESTADO.SISTEMA',
              (
                <div className="text-white text-sm p-4">
                  <h3 className="text-cyan-400 mb-3 font-mono">Estado del Sistema</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Consciencia:</span>
                      <span className="text-green-400">{(autopoieticKernel.getSystemStatus().consciousness * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Procesos:</span>
                      <span className="text-cyan-400">{autopoieticKernel.getProcesses().length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Archivos:</span>
                      <span className="text-purple-400">{autopoieticKernel.getFiles().length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ventanas:</span>
                      <span className="text-yellow-400">{windows.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Agentes IA:</span>
                      <span className="text-pink-400">{internalAIAgents.getAgents().length}</span>
                    </div>
                  </div>
                </div>
              ),
              'system',
              280,
              180
            );
          }}
          className="bg-black/80 border border-green-400/50 rounded-lg p-2 text-green-400 hover:bg-green-400/20 transition-all text-xs backdrop-blur-sm"
        >
          ESTADO
        </button>
      </div>

      {/* Indicador de actividad del sistema */}
      <div className="fixed top-4 left-4 z-30">
        <div className="bg-black/80 border border-cyan-400/50 rounded-lg p-2 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-cyan-400 text-xs font-mono">
              LAPOEMA.OS v4.0 | Ciclo #{autopoieticKernel.getSystemStatus().evolutionCycle}
            </span>
          </div>
        </div>
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
