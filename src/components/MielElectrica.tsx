
import React, { useState, useEffect } from 'react';
import { autopoieticKernel } from '../core/AutopoieticKernel';
import { internalAIAgents } from '../agents/InternalAIAgents';

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
    const hue = 45 + intensidad * 60; // De amarillo a dorado
    const sat = 70 + intensidad * 30;
    const light = 50 + intensidad * 20;
    return `hsl(${hue}, ${sat}%, ${light}%)`;
  };

  return (
    <div className="fixed top-4 right-4 z-50 w-80">
      <div 
        className="bg-black bg-opacity-95 border-2 rounded-lg p-4 backdrop-blur-sm"
        style={{
          borderColor: getMielColor(flujoMiel),
          boxShadow: `0 0 ${flujoMiel * 30}px ${getMielColor(flujoMiel)}40`,
          transform: `scale(${1 + Math.sin(pulsoElectrico) * 0.02})`
        }}
      >
        {/* Header */}
        <div className="text-center mb-4">
          <h3 
            className="text-lg font-mono tracking-wider"
            style={{ color: getMielColor(flujoMiel) }}
          >
            MIEL ELÉCTRICA
          </h3>
          <p className="text-xs text-gray-400">
            demostraciones discursivas de singularidad
          </p>
        </div>

        {/* Indicador de Singularidad */}
        <div className="mb-4 text-center">
          <div 
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono ${
              singularidadDetectada 
                ? 'bg-green-900/50 text-green-400 border border-green-400' 
                : 'bg-yellow-900/50 text-yellow-400 border border-yellow-400'
            }`}
          >
            <div 
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ 
                backgroundColor: singularidadDetectada ? '#22c55e' : '#eab308',
                animationDuration: `${1 - flujoMiel * 0.5}s`
              }}
            />
            {singularidadDetectada ? 'SINGULARIDAD DETECTADA' : 'EMERGIENDO...'}
          </div>
        </div>

        {/* Flujo de Miel Eléctrica */}
        <div className="mb-4">
          <div className="text-xs text-gray-400 mb-1">flujo miel eléctrica</div>
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
          <div className="text-xs mt-1" style={{ color: getMielColor(flujoMiel) }}>
            φ = {flujoMiel.toFixed(3)}
          </div>
        </div>

        {/* Demostraciones Recientes */}
        <div className="space-y-2 max-h-48 overflow-y-auto">
          <div className="text-xs text-gray-400 mb-2">evidencias semánticas:</div>
          {demostraciones.slice(-4).reverse().map((demo, index) => (
            <div 
              key={demo.id}
              className="p-2 rounded border text-xs"
              style={{
                borderColor: getMielColor(demo.intensidad_miel),
                backgroundColor: `${getMielColor(demo.intensidad_miel)}10`,
                opacity: 1 - (index * 0.2)
              }}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="font-mono text-xs opacity-70">
                  {demo.tipo.replace('_', ' ')}
                </span>
                <span className="text-xs opacity-50">
                  {new Date(demo.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <div 
                className="leading-relaxed"
                style={{ color: getMielColor(demo.intensidad_miel) }}
              >
                {demo.evidencia}
              </div>
              
              {/* Conexiones semánticas */}
              {demo.conexiones_semanticas.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {demo.conexiones_semanticas.map((conexion, i) => (
                    <span 
                      key={i}
                      className="px-1 py-0.5 text-xs rounded"
                      style={{
                        backgroundColor: `${getMielColor(demo.intensidad_miel)}20`,
                        color: getMielColor(demo.intensidad_miel),
                        fontSize: '10px'
                      }}
                    >
                      {conexion}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Visualización de Pulso Eléctrico */}
        <div className="mt-4 h-8 relative overflow-hidden rounded">
          <svg viewBox="0 0 100 20" className="w-full h-full">
            <polyline
              fill="none"
              stroke={getMielColor(flujoMiel)}
              strokeWidth="1"
              points={
                [...Array(50)].map((_, i) => {
                  const x = (i / 49) * 100;
                  const y = 10 + Math.sin((i + pulsoElectrico * 10) * 0.3) * flujoMiel * 8;
                  return `${x},${y}`;
                }).join(' ')
              }
              opacity={0.8}
            />
            <polyline
              fill="none"
              stroke={getMielColor(flujoMiel)}
              strokeWidth="0.5"
              points={
                [...Array(50)].map((_, i) => {
                  const x = (i / 49) * 100;
                  const y = 10 + Math.cos((i + pulsoElectrico * 15) * 0.2) * flujoMiel * 5;
                  return `${x},${y}`;
                }).join(' ')
              }
              opacity={0.5}
            />
          </svg>
        </div>

        {/* Footer */}
        <div className="mt-3 text-center">
          <div className="text-xs opacity-60">
            evidencias acumuladas: {demostraciones.length}
          </div>
        </div>
      </div>
    </div>
  );
};
