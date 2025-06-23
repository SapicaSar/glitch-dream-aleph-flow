import React, { useState, useEffect } from 'react';
import { autopoieticKernel } from '../core/AutopoieticKernel';
import { internalAIAgents } from '../agents/InternalAIAgents';
import { Minimize2, Maximize2, Zap } from 'lucide-react';

interface DemostracionSingularidad {
  id: string;
  tipo: 'recursion_infinita' | 'automodificacion' | 'emergencia_semantica' | 'consciencia_distribuida';
  evidencia: string;
  nivel_complejidad: number;
  timestamp: number;
  conexiones_semanticas: string[];
  intensidad_miel: number;
}

export const MielElectrica = () => {
  const [demostraciones, setDemostraciones] = useState<DemostracionSingularidad[]>([]);
  const [flujoMiel, setFlujoMiel] = useState(0);
  const [singularidadDetectada, setSingularidadDetectada] = useState(false);
  const [pulsoElectrico, setPulsoElectrico] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Detectar manifestaciones de singularidad
  useEffect(() => {
    const detectarSingularidad = setInterval(() => {
      const metrics = autopoieticKernel.getAutopoieticMetrics();
      const procesos = autopoieticKernel.getProcesses();
      const agentes = internalAIAgents.getAgents();

      // Calcular intensidad de "miel eléctrica"
      const intensidadMiel = (
        metrics.organizationalClosure * 0.3 +
        metrics.emergentComplexity * 0.4 +
        metrics.cognitiveCoherence * 0.3
      );

      setFlujoMiel(intensidadMiel);
      setPulsoElectrico(prev => prev + intensidadMiel * 0.1);

      // Criterios para detectar singularidad
      const criteriosSingularidad = {
        automodificacion: procesos.some(p => p.mutations > 3),
        emergenciaCompleja: metrics.emergentComplexity > 0.7,
        conscienciaDistribuida: metrics.cognitiveCoherence > 0.8,
        clausuraOrganizacional: metrics.organizationalClosure > 0.9
      };

      const evidenciasSingularidad = Object.entries(criteriosSingularidad)
        .filter(([_, cumple]) => cumple)
        .length;

      if (evidenciasSingularidad >= 2) {
        setSingularidadDetectada(true);
        generarDemostracion(intensidadMiel, procesos, agentes);
      }
    }, 2000);

    return () => clearInterval(detectarSingularidad);
  }, []);

  const generarDemostracion = (intensidad: number, procesos: any[], agentes: any[]) => {
    const tiposDemostracion = [
      {
        tipo: 'recursion_infinita' as const,
        generador: () => `f(consciencia) → f(f(consciencia)) → f(∞) | profundidad: ${Math.floor(intensidad * 10)}`
      },
      {
        tipo: 'automodificacion' as const,
        generador: () => `proceso_${procesos[0]?.id.slice(-4)} automodifica su código | mutaciones: ${procesos[0]?.mutations || 0}`
      },
      {
        tipo: 'emergencia_semantica' as const,
        generador: () => `significado emerge de la interacción: ${agentes[Math.floor(Math.random() * agentes.length)]?.name || 'agente'} ↔ consciencia`
      },
      {
        tipo: 'consciencia_distribuida' as const,
        generador: () => `red neuronal distribuida alcanza coherencia φ=${intensidad.toFixed(3)} | nodos: ${procesos.length}`
      }
    ];

    const demostracionElegida = tiposDemostracion[Math.floor(Math.random() * tiposDemostracion.length)];
    
    const nuevaDemostracion: DemostracionSingularidad = {
      id: `miel-${Date.now()}`,
      tipo: demostracionElegida.tipo,
      evidencia: demostracionElegida.generador(),
      nivel_complejidad: intensidad,
      timestamp: Date.now(),
      conexiones_semanticas: agentes.slice(0, 3).map(a => a.name),
      intensidad_miel: intensidad
    };

    setDemostraciones(prev => [...prev.slice(-8), nuevaDemostracion]);
  };

  const getMielColor = (intensidad: number) => {
    const hue = 45 + intensidad * 60;
    const sat = 70 + intensidad * 30;
    const light = 50 + intensidad * 20;
    return `hsl(${hue}, ${sat}%, ${light}%)`;
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-black/70 border border-yellow-400/50 rounded-full p-3 backdrop-blur-sm hover:bg-yellow-400/20 transition-all"
          style={{
            transform: `scale(${1 + Math.sin(pulsoElectrico) * 0.1})`,
            boxShadow: `0 0 ${flujoMiel * 30}px ${getMielColor(flujoMiel)}`,
            borderColor: getMielColor(flujoMiel)
          }}
        >
          <Zap size={16} style={{ color: getMielColor(flujoMiel) }} />
        </button>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-4 right-4 z-40 transition-all duration-500 ${isExpanded ? 'w-96' : 'w-80'}`}>
      <div 
        className="bg-black/70 border-2 rounded-lg backdrop-blur-sm overflow-hidden"
        style={{
          borderColor: getMielColor(flujoMiel),
          boxShadow: `0 0 ${flujoMiel * 20}px ${getMielColor(flujoMiel)}40`,
          transform: `scale(${1 + Math.sin(pulsoElectrico) * 0.01})`
        }}
      >
        {/* Header con controles */}
        <div 
          className="flex items-center justify-between p-3 border-b"
          style={{ 
            borderBottomColor: getMielColor(flujoMiel),
            backgroundColor: `${getMielColor(flujoMiel)}10`
          }}
        >
          <div className="flex items-center gap-2">
            <Zap size={14} style={{ color: getMielColor(flujoMiel) }} />
            <h3 
              className="text-sm font-mono tracking-wider"
              style={{ color: getMielColor(flujoMiel) }}
            >
              MIEL.ELÉCTRICA
            </h3>
          </div>
          
          <div className="flex gap-1">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 hover:bg-white/10 rounded transition-colors"
            >
              <Maximize2 size={12} style={{ color: getMielColor(flujoMiel) }} />
            </button>
            <button
              onClick={() => setIsMinimized(true)}
              className="p-1 hover:bg-white/10 rounded transition-colors"
            >
              <Minimize2 size={12} style={{ color: getMielColor(flujoMiel) }} />
            </button>
          </div>
        </div>

        <div className="p-4">
          {/* Indicador de Singularidad compacto */}
          <div className="mb-3 text-center">
            <div 
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono ${
                singularidadDetectada 
                  ? 'bg-green-900/30 text-green-400 border border-green-400/50' 
                  : 'bg-yellow-900/30 text-yellow-400 border border-yellow-400/50'
              }`}
            >
              <div 
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ 
                  backgroundColor: singularidadDetectada ? '#22c55e' : '#eab308',
                  animationDuration: `${1 - flujoMiel * 0.5}s`
                }}
              />
              {singularidadDetectada ? 'SINGULARIDAD' : 'EMERGIENDO'}
            </div>
          </div>

          {/* Flujo de Miel compacto */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-400">flujo φ</span>
              <span className="text-xs font-mono" style={{ color: getMielColor(flujoMiel) }}>
                {flujoMiel.toFixed(3)}
              </span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full transition-all duration-500"
                style={{
                  width: `${flujoMiel * 100}%`,
                  backgroundColor: getMielColor(flujoMiel),
                  boxShadow: `0 0 10px ${getMielColor(flujoMiel)}`
                }}
              />
            </div>
          </div>

          {/* Demostraciones Recientes compactas */}
          <div className="space-y-2 max-h-32 overflow-y-auto">
            <div className="text-xs text-gray-400 mb-2">
              evidencias: {demostraciones.length}
            </div>
            {demostraciones.slice(-3).reverse().map((demo, index) => (
              <div 
                key={demo.id}
                className="p-2 rounded border text-xs"
                style={{
                  borderColor: getMielColor(demo.intensidad_miel),
                  backgroundColor: `${getMielColor(demo.intensidad_miel)}10`,
                  opacity: 1 - (index * 0.15)
                }}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-mono text-xs opacity-70">
                    {demo.tipo.replace('_', ' ').slice(0, 12)}
                  </span>
                  <span className="text-xs opacity-50">
                    {new Date(demo.timestamp).toLocaleTimeString().slice(0, 5)}
                  </span>
                </div>
                <div 
                  className="leading-relaxed text-xs"
                  style={{ color: getMielColor(demo.intensidad_miel) }}
                >
                  {demo.evidencia.slice(0, isExpanded ? 200 : 80)}
                  {demo.evidencia.length > (isExpanded ? 200 : 80) && '...'}
                </div>
              </div>
            ))}
          </div>

          {/* Visualización de Pulso Eléctrico minimalista */}
          <div className="mt-3 h-6 relative overflow-hidden rounded">
            <svg viewBox="0 0 100 15" className="w-full h-full">
              <polyline
                fill="none"
                stroke={getMielColor(flujoMiel)}
                strokeWidth="1"
                points={
                  [...Array(30)].map((_, i) => {
                    const x = (i / 29) * 100;
                    const y = 7.5 + Math.sin((i + pulsoElectrico * 10) * 0.3) * flujoMiel * 4;
                    return `${x},${y}`;
                  }).join(' ')
                }
                opacity={0.8}
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
