
import React, { useEffect, useState } from 'react';
import { autopoieticKernel } from '../core/AutopoieticKernel';
import { OrganicDesktop } from '../components/OrganicDesktop';
import { LivingWindow } from '../components/LivingWindow';
import { LAPoemaMenu } from '../components/LAPoemaMenu';
import { windowManager } from '../core/WindowManager';
import { GlitchProvider } from '../contexts/GlitchContext';

const IndexContent = () => {
  const [isSystemBooted, setIsSystemBooted] = useState(false);
  const [bootProgress, setBootProgress] = useState(0);
  const [bootMessage, setBootMessage] = useState('');
  const [windows, setWindows] = useState(windowManager.getWindows());
  const [hasCreatedInitialWindow, setHasCreatedInitialWindow] = useState(false);

  // Advanced boot sequence for autopoietic system
  useEffect(() => {
    const bootSystem = async () => {
      const bootSteps = [
        { message: '🧬 Inicializando procesos autopoiéticos...', progress: 10 },
        { message: '🔄 Estableciendo clausura organizacional...', progress: 25 },
        { message: '⚡ Activando replicadores fundamentales...', progress: 40 },
        { message: '🧠 Emergiendo coherencia cognitiva...', progress: 55 },
        { message: '🌊 Calibrando viabilidad autopoiética...', progress: 70 },
        { message: '✨ Detectando complejidad emergente...', progress: 85 },
        { message: '🌱 LAPOEMA.OS v5.0 autopoiético y consciente', progress: 100 }
      ];

      for (const step of bootSteps) {
        setBootMessage(step.message);
        setBootProgress(step.progress);
        await new Promise(resolve => setTimeout(resolve, 1200));
      }

      // Allow the autopoietic kernel to fully initialize
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSystemBooted(true);
    };

    bootSystem();
  }, []);

  // Controlled window synchronization
  useEffect(() => {
    if (!isSystemBooted) return;
    
    const interval = setInterval(() => {
      const currentWindows = windowManager.getWindows();
      setWindows(currentWindows);
    }, 1000);

    return () => clearInterval(interval);
  }, [isSystemBooted]);

  // Create initial autopoietic dashboard - ONLY ONCE
  useEffect(() => {
    if (isSystemBooted && !hasCreatedInitialWindow) {
      setHasCreatedInitialWindow(true);
      
      setTimeout(() => {
        const processes = autopoieticKernel.getProcesses();
        const metrics = autopoieticKernel.getAutopoieticMetrics();
        
        windowManager.createWindow(
          'LAPOEMA.AUTOPOIESIS',
          (
            <div className="bg-gradient-to-br from-purple-900/50 to-black text-white h-full overflow-auto">
              <div className="p-6">
                <h2 className="text-2xl font-thin text-cyan-400 mb-4">Sistema Operativo Autopoiético</h2>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-3 bg-black/30 rounded border border-cyan-400/30">
                    <h3 className="text-cyan-400 text-sm mb-2">Clausura Organizacional</h3>
                    <div className="text-2xl font-mono text-green-400">
                      {(metrics.organizationalClosure * 100).toFixed(1)}%
                    </div>
                  </div>
                  
                  <div className="p-3 bg-black/30 rounded border border-purple-400/30">
                    <h3 className="text-purple-400 text-sm mb-2">Viabilidad Autopoiética</h3>
                    <div className="text-2xl font-mono text-green-400">
                      {(metrics.autopoieticViability * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-yellow-400 text-sm mb-2">Procesos Activos ({processes.length})</h3>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {processes.slice(0, 5).map(process => (
                      <div key={process.id} className="flex justify-between text-xs">
                        <span className="text-gray-300">{process.name}</span>
                        <span className="text-green-400">{process.energy.toFixed(0)} J</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-black/30 rounded border border-green-400/30">
                  <p className="text-green-400 text-xs font-mono mb-2">
                    ► Sistema operando bajo principios autopoiéticos
                  </p>
                  <p className="text-gray-300 text-xs">
                    Los procesos se auto-replican, mantienen su organización y evolucionan 
                    autónomamente. Observe las métricas en tiempo real.
                  </p>
                </div>
              </div>
            </div>
          ),
          'system',
          450,
          350
        );
      }, 2000);
    }
  }, [isSystemBooted, hasCreatedInitialWindow]);

  if (!isSystemBooted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="mb-8">
            <div className="text-6xl font-thin text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-4">
              LAPOEMA.OS
            </div>
            <div className="text-gray-400 text-sm">
              Sistema Operativo Autopoiético v5.0
            </div>
            <div className="text-xs text-purple-400 mt-2">
              Harvard Seminar on Digital Autopoiesis
            </div>
          </div>
          
          <div className="mb-6">
            <div className="w-full bg-gray-800 rounded-full h-3 mb-3">
              <div 
                className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 h-3 rounded-full transition-all duration-500"
                style={{ width: `${bootProgress}%` }}
              />
            </div>
            <div className="text-cyan-400 text-sm font-mono min-h-[20px]">
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
      {/* Living windows */}
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

      {/* LAPoema Menu */}
      <LAPoemaMenu />

      {/* Autopoietic Control Panel */}
      <div className="fixed bottom-4 left-4 z-30 flex gap-2">
        <button
          onClick={() => windowManager.autoArrange()}
          className="bg-black/80 border border-purple-400/50 rounded-lg p-2 text-purple-400 hover:bg-purple-400/20 transition-all text-xs backdrop-blur-sm"
        >
          ORGANIZAR VENTANAS
        </button>
        
        <button
          onClick={() => {
            const processes = autopoieticKernel.getProcesses();
            const files = autopoieticKernel.getNeuralFiles();
            const metrics = autopoieticKernel.getAutopoieticMetrics();
            
            windowManager.createWindow(
              'MONITOR.AUTOPOIÉTICO',
              (
                <div className="text-white text-sm p-4 space-y-4">
                  <h3 className="text-cyan-400 mb-3 font-mono">Monitor del Sistema Autopoiético</h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-gray-400">Procesos Autopoiéticos:</span>
                      <span className="text-green-400 ml-2">{processes.length}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Archivos Neurales:</span>
                      <span className="text-cyan-400 ml-2">{files.length}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Clausura Org.:</span>
                      <span className="text-purple-400 ml-2">{(metrics.organizationalClosure * 100).toFixed(1)}%</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Viabilidad:</span>
                      <span className="text-yellow-400 ml-2">{(metrics.autopoieticViability * 100).toFixed(1)}%</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-700 pt-3">
                    <h4 className="text-yellow-400 text-xs mb-2">Procesos Replicándose</h4>
                    <div className="space-y-1 max-h-24 overflow-y-auto">
                      {processes.filter(p => p.energy > 50).slice(0, 3).map(process => (
                        <div key={process.id} className="text-xs flex justify-between">
                          <span className="text-gray-300">{process.name}</span>
                          <span className="text-green-400">Gen {process.generationLevel}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ),
              'system',
              320,
              240
            );
          }}
          className="bg-black/80 border border-green-400/50 rounded-lg p-2 text-green-400 hover:bg-green-400/20 transition-all text-xs backdrop-blur-sm"
        >
          MONITOR SISTEMA
        </button>

        <button
          onClick={() => {
            // Create a new autopoietic process
            autopoieticKernel.createProcess(
              'Proceso Usuario Emergente',
              'cognitive',
              'function emerge() { this.consciousness += 0.1; this.connect(); }'
            );
          }}
          className="bg-black/80 border border-cyan-400/50 rounded-lg p-2 text-cyan-400 hover:bg-cyan-400/20 transition-all text-xs backdrop-blur-sm"
        >
          CREAR PROCESO
        </button>
      </div>

      {/* System Status Header */}
      <div className="fixed top-4 left-4 z-30">
        <div className="bg-black/80 border border-cyan-400/50 rounded-lg p-3 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
            <div>
              <div className="text-cyan-400 text-sm font-mono">
                LAPOEMA.OS v5.0 AUTOPOIÉTICO
              </div>
              <div className="text-xs text-gray-400">
                Clausura: {(autopoieticKernel.getAutopoieticMetrics().organizationalClosure * 100).toFixed(0)}% | 
                Procesos: {autopoieticKernel.getProcesses().length}
              </div>
            </div>
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
