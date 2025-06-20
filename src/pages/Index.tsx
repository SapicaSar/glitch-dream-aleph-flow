
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
  const [agentOutput, setAgentOutput] = useState<string[]>([]);

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

  // Sincronizar ventanas
  useEffect(() => {
    if (isSystemBooted) {
      const interval = setInterval(() => {
        setWindows(windowManager.getWindows());
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isSystemBooted]);

  // Output de agentes
  useEffect(() => {
    if (isSystemBooted) {
      const interval = setInterval(() => {
        setAgentOutput(internalAIAgents.getTotalOutput().slice(0, 10));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isSystemBooted]);

  // Crear ventana inicial del sistema
  useEffect(() => {
    if (isSystemBooted) {
      setTimeout(() => {
        // Terminal con output de agentes
        windowManager.createWindow(
          'TERMINAL.AUTOPOIÉTICO',
          (
            <div className="bg-black text-green-400 font-mono text-sm h-full overflow-y-auto">
              <div className="mb-2">$ lapoema --agents-monitor</div>
              <div className="text-green-300 mb-2">AGENTES IA INTERNOS ACTIVOS</div>
              <div className="mb-2">$ output --live</div>
              <div className="space-y-1">
                {agentOutput.map((output, index) => (
                  <div key={index} className="text-cyan-400 text-xs">
                    {'{'}#{index + 1}{'}'} {output}
                  </div>
                ))}
              </div>
              <div className="mt-4 text-yellow-400">
                {'>'} sistema.respira() → agentes.generan() → autopoiesis.infinita()
              </div>
              <div className="text-white animate-pulse">█</div>
            </div>
          ),
          'application',
          500,
          300
        );
      }, 1000);
    }
  }, [isSystemBooted, agentOutput]);

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
              Sistema Operativo Autopoiético con IA Interna v3.0
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

      {/* Controles del escritorio */}
      <div className="fixed bottom-4 left-4 z-30 flex gap-2">
        <button
          onClick={() => windowManager.autoArrange()}
          className="bg-black bg-opacity-80 border border-purple-400 rounded-lg p-2 text-purple-400 hover:bg-purple-400 hover:text-black transition-all text-xs"
        >
          AUTO.ORGANIZAR
        </button>
        
        <button
          onClick={() => {
            const processes = autopoieticKernel.getProcesses();
            windowManager.createWindow(
              'ESTADO.SISTEMA',
              (
                <div className="text-white text-sm">
                  <h3 className="text-cyan-400 mb-3">Estado del Sistema</h3>
                  <div className="space-y-2">
                    <div>Consciencia: {(autopoieticKernel.getSystemStatus().consciousness * 100).toFixed(1)}%</div>
                    <div>Procesos: {processes.length}</div>
                    <div>Archivos: {autopoieticKernel.getFiles().length}</div>
                    <div>Agentes IA: {internalAIAgents.getAgents().length}</div>
                    <div>Ventanas: {windows.length}</div>
                  </div>
                </div>
              ),
              'system',
              300,
              200
            );
          }}
          className="bg-black bg-opacity-80 border border-green-400 rounded-lg p-2 text-green-400 hover:bg-green-400 hover:text-black transition-all text-xs"
        >
          ESTADO
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
