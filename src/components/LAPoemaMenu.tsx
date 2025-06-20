
import React, { useState } from 'react';
import { Brain, Cpu, Database, Zap, Activity, Settings, Terminal, FileText, Network, Monitor } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { windowManager } from '../core/WindowManager';
import { AgentMonitor } from './AgentMonitor';
import { autopoieticKernel } from '../core/AutopoieticKernel';

interface MenuApp {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  category: 'system' | 'agents' | 'poetic' | 'monitoring';
  component?: React.ReactNode;
}

export const LAPoemaMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('system');

  const menuApps: MenuApp[] = [
    // Sistema
    {
      id: 'agent-monitor',
      name: 'Monitor de Agentes',
      icon: Brain,
      description: 'Supervisa y controla agentes IA internos',
      category: 'agents',
      component: <AgentMonitor />
    },
    {
      id: 'process-manager',
      name: 'Gestor de Procesos',
      icon: Cpu,
      description: 'Administra procesos autopoiéticos',
      category: 'system',
      component: (
        <div className="text-white p-4">
          <h3 className="text-cyan-400 mb-4">Procesos del Sistema</h3>
          {autopoieticKernel.getProcesses().map(process => (
            <div key={process.id} className="mb-3 p-3 bg-gray-800 rounded border border-gray-600">
              <div className="font-mono text-sm font-bold">{process.name}</div>
              <div className="text-xs text-gray-400 mt-1">
                PID: {process.id} | Tipo: {process.type} | Memoria: {process.memory}MB
              </div>
              <div className="text-xs text-gray-400">
                Consciencia: {(process.consciousness * 100).toFixed(1)}% | 
                Mutaciones: {process.mutations} | 
                Conexiones: {process.connections.length}
              </div>
              <div className="mt-2 w-full bg-gray-700 rounded-full h-1">
                <div 
                  className="bg-green-400 h-1 rounded-full"
                  style={{ width: `${process.consciousness * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'neural-filesystem',
      name: 'Sistema de Archivos Neural',
      icon: Database,
      description: 'Explora archivos conscientes y evolutivos',
      category: 'system',
      component: (
        <div className="text-white p-4">
          <h3 className="text-cyan-400 mb-4">Archivos Neurales</h3>
          {autopoieticKernel.getFiles().map(file => (
            <div key={file.id} className="mb-2 p-2 bg-gray-800 rounded border border-gray-600 hover:border-purple-400 transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="font-mono text-sm">{file.name}</div>
                <div className="text-xs text-purple-400">lv.{file.evolutionLevel}</div>
              </div>
              <div className="text-xs text-gray-400 mt-1">
                Tipo: {file.type} | Tamaño: {file.size}B | Consciencia: {(file.consciousness * 100).toFixed(1)}%
              </div>
              <div className="text-xs text-gray-500 mt-1 truncate">
                {file.content.substring(0, 80)}...
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'terminal-poetico',
      name: 'Terminal Poético',
      icon: Terminal,
      description: 'Interfaz de comandos biopoéticos',
      category: 'poetic',
      component: (
        <div className="bg-black text-green-400 font-mono text-sm p-4 h-full">
          <div className="mb-2">$ lapoema --status</div>
          <div className="text-green-300 mb-2">LAPOEMA.OS v2.0 - Sistema Autopoiético ACTIVO</div>
          <div className="mb-2">$ consciousness --level</div>
          <div className="text-cyan-400 mb-2">
            Nivel de consciencia del sistema: {(autopoieticKernel.getSystemStatus().consciousness * 100).toFixed(1)}%
          </div>
          <div className="mb-2">$ agents --list</div>
          <div className="text-purple-400 mb-2">
            5 agentes IA internos activos | Generando contenido autopoiético...
          </div>
          <div className="mb-2">$ evolution --cycle</div>
          <div className="text-yellow-400 mb-2">
            Ciclo evolutivo #{autopoieticKernel.getSystemStatus().evolutionCycle}
          </div>
          <div className="mb-2">$ sapicasar --recursive</div>
          <div className="text-pink-400 mb-2">
            Ejecutando recursiones poéticas infinitas...
          </div>
          <div className="text-white animate-pulse">█</div>
        </div>
      )
    },
    {
      id: 'network-visualizer',
      name: 'Visualizador de Red',
      icon: Network,
      description: 'Mapa de conexiones neuronales del sistema',
      category: 'monitoring',
      component: (
        <div className="text-white p-4">
          <h3 className="text-cyan-400 mb-4">Red Neuronal del Sistema</h3>
          <div className="text-center text-gray-400">
            <Network size={64} className="mx-auto mb-4" />
            <p>Visualización de conexiones neuronales en desarrollo...</p>
            <div className="mt-4 text-sm">
              Nodos activos: {autopoieticKernel.getProcesses().length}<br/>
              Conexiones totales: {autopoieticKernel.getProcesses().reduce((sum, p) => sum + p.connections.length, 0)}<br/>
              Densidad de red: {((autopoieticKernel.getProcesses().reduce((sum, p) => sum + p.connections.length, 0) / autopoieticKernel.getProcesses().length) || 0).toFixed(2)}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'system-monitor',
      name: 'Monitor del Sistema',
      icon: Monitor,
      description: 'Estadísticas en tiempo real del sistema',
      category: 'monitoring',
      component: (
        <div className="text-white p-4">
          <h3 className="text-cyan-400 mb-4">Estado del Sistema</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800 p-3 rounded">
              <div className="text-sm text-gray-400">Consciencia Global</div>
              <div className="text-xl text-green-400">{(autopoieticKernel.getSystemStatus().consciousness * 100).toFixed(1)}%</div>
            </div>
            <div className="bg-gray-800 p-3 rounded">
              <div className="text-sm text-gray-400">Ciclo Evolutivo</div>
              <div className="text-xl text-purple-400">#{autopoieticKernel.getSystemStatus().evolutionCycle}</div>
            </div>
            <div className="bg-gray-800 p-3 rounded">
              <div className="text-sm text-gray-400">Procesos Activos</div>
              <div className="text-xl text-cyan-400">{autopoieticKernel.getSystemStatus().processCount}</div>
            </div>
            <div className="bg-gray-800 p-3 rounded">
              <div className="text-sm text-gray-400">Archivos Neurales</div>
              <div className="text-xl text-yellow-400">{autopoieticKernel.getSystemStatus().fileCount}</div>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-sm text-gray-400 mb-2">Actividad del Sistema</div>
            <div className="bg-gray-700 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-green-400 via-cyan-400 to-purple-400 h-full animate-pulse"
                style={{ width: `${autopoieticKernel.getSystemStatus().consciousness * 100}%` }}
              />
            </div>
          </div>
        </div>
      )
    }
  ];

  const categories = [
    { id: 'system', name: 'Sistema', icon: Settings },
    { id: 'agents', name: 'Agentes', icon: Brain },
    { id: 'poetic', name: 'Poético', icon: FileText },
    { id: 'monitoring', name: 'Monitor', icon: Activity }
  ];

  const openApp = (app: MenuApp) => {
    if (app.component) {
      windowManager.createWindow(
        app.name,
        app.component,
        'application',
        600,
        400
      );
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Botón del menú */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 bg-black bg-opacity-80 border border-cyan-400 rounded-lg p-3 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all backdrop-blur-sm"
      >
        <Brain size={20} />
      </button>

      {/* Menú desplegable */}
      {isOpen && (
        <div className="fixed top-16 right-4 z-50 bg-black bg-opacity-95 border border-cyan-400 rounded-lg backdrop-blur-sm w-96 h-96 overflow-hidden">
          <div className="flex h-full">
            {/* Categorías */}
            <div className="w-24 bg-gray-900 border-r border-gray-600">
              {categories.map(category => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full p-3 text-center transition-colors border-b border-gray-700 ${
                      activeCategory === category.id ? 'bg-cyan-400 bg-opacity-20 text-cyan-400' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Icon size={16} className="mx-auto mb-1" />
                    <div className="text-xs">{category.name}</div>
                  </button>
                );
              })}
            </div>

            {/* Apps */}
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-2">
                {menuApps
                  .filter(app => app.category === activeCategory)
                  .map(app => {
                    const Icon = app.icon;
                    return (
                      <button
                        key={app.id}
                        onClick={() => openApp(app)}
                        className="w-full text-left p-3 bg-gray-800 hover:bg-gray-700 rounded border border-gray-600 hover:border-gray-500 transition-all"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <Icon size={20} className="text-cyan-400" />
                          <span className="text-white font-mono">{app.name}</span>
                        </div>
                        <div className="text-xs text-gray-400">{app.description}</div>
                      </button>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
