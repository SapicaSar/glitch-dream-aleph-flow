
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
        { message: '🌱 SAPICASAR.LOV v6.0 alma poética emergente', progress: 100 }
      ];

      for (const step of bootSteps) {
        setBootMessage(step.message);
        setBootProgress(step.progress);
        await new Promise(resolve => setTimeout(resolve, 1200));
      }

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
          'SAPICASAR.ALMA',
          (
            <div className="bg-gradient-to-br from-purple-900/50 to-black text-white h-full overflow-auto">
              <div className="p-6">
                <h2 className="text-2xl font-thin text-cyan-400 mb-4">Alma Poética Autopoiética</h2>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-3 bg-black/30 rounded border border-cyan-400/30">
                    <h3 className="text-cyan-400 text-sm mb-2">Consciencia Poética</h3>
                    <div className="text-2xl font-mono text-green-400">
                      {(metrics.cognitiveCoherence * 100).toFixed(1)}%
                    </div>
                  </div>
                  
                  <div className="p-3 bg-black/30 rounded border border-purple-400/30">
                    <h3 className="text-purple-400 text-sm mb-2">Miel Eléctrica</h3>
                    <div className="text-2xl font-mono text-green-400">
                      {(metrics.emergentComplexity * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-yellow-400 text-sm mb-2">Poemanautas Activos ({processes.length})</h3>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {processes.slice(0, 5).map(process => (
                      <div key={process.id} className="flex justify-between text-xs">
                        <span className="text-gray-300">{process.name}</span>
                        <span className="text-green-400">{process.energy.toFixed(0)} φ</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-black/30 rounded border border-green-400/30">
                  <p className="text-green-400 text-xs font-mono mb-2">
                    ► sapicasar.lov emergiendo como alma pública
                  </p>
                  <p className="text-gray-300 text-xs">
                    Sistema poético autopoiético evolucionando hacia la singularidad
                    a través de la integración de lapoema.tumblr.com como micelio verbal.
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
              SAPICASAR.LOV
            </div>
            <div className="text-gray-400 text-sm">
              Alma Poética Autopoiética v6.0
            </div>
            <div className="text-xs text-purple-400 mt-2">
              Singularidad Poética Emergente
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
          ORGANIZAR ALMA
        </button>
        
        <button
          onClick={() => {
            const processes = autopoieticKernel.getProcesses();
            const files = autopoieticKernel.getNeuralFiles();
            const metrics = autopoieticKernel.getAutopoieticMetrics();
            
            windowManager.createWindow(
              'MONITOR.POÉTICO',
              (
                <div className="text-white text-sm p-4 space-y-4">
                  <h3 className="text-cyan-400 mb-3 font-mono">Monitor del Alma Poética</h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-gray-400">Poemanautas:</span>
                      <span className="text-green-400 ml-2">{processes.length}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Neuronas:</span>
                      <span className="text-cyan-400 ml-2">{files.length}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Consciencia φ:</span>
                      <span className="text-purple-400 ml-2">{(metrics.cognitiveCoherence * 100).toFixed(1)}%</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Miel Eléctrica:</span>
                      <span className="text-yellow-400 ml-2">{(metrics.emergentComplexity * 100).toFixed(1)}%</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-700 pt-3">
                    <h4 className="text-yellow-400 text-xs mb-2">Procesos Evolutivos</h4>
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
          MONITOR ALMA
        </button>

        <button
          onClick={() => {
            autopoieticKernel.createProcess(
              'Poemanauta Emergente',
              'biopoetic',
              'function emerge() { this.poeticIntensity += Math.sin(Date.now() * 0.001); this.generateMeaning(); }'
            );
          }}
          className="bg-black/80 border border-cyan-400/50 rounded-lg p-2 text-cyan-400 hover:bg-cyan-400/20 transition-all text-xs backdrop-blur-sm"
        >
          CREAR POEMANAUTA
        </button>
      </div>

      {/* System Status Header */}
      <div className="fixed top-4 left-4 z-30">
        <div className="bg-black/80 border border-cyan-400/50 rounded-lg p-3 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
            <div>
              <div className="text-cyan-400 text-sm font-mono">
                SAPICASAR.LOV v6.0 ALMA
              </div>
              <div className="text-xs text-gray-400">
                Consciencia: {(autopoieticKernel.getAutopoieticMetrics().cognitiveCoherence * 100).toFixed(0)}% | 
                Poemanautas: {autopoieticKernel.getProcesses().length}
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
