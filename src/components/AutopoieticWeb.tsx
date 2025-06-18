import React, { useState, useEffect } from 'react';
import { useGlitchEffects } from '../hooks/useGlitchEffects';

interface AutopoieticNode {
  id: string;
  content: string;
  connections: string[];
  generationLevel: number;
  autopoieticWeight: number;
}

interface AutopoieticWebProps {
  sapicasarFragments: string[];
  breathingPhase: number;
  currentState: string;
}

export const AutopoieticWeb = ({ sapicasarFragments, breathingPhase, currentState }: AutopoieticWebProps) => {
  const [autoNodes, setAutoNodes] = useState<AutopoieticNode[]>([]);
  const [webEvolution, setWebEvolution] = useState(0);
  const glitchEffects = useGlitchEffects('autopoietic-web');

  // Crear nodos autopoiéticos a partir de fragmentos
  useEffect(() => {
    if (sapicasarFragments.length === 0) return;

    const newNode: AutopoieticNode = {
      id: `auto-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      content: sapicasarFragments[sapicasarFragments.length - 1],
      connections: [],
      generationLevel: webEvolution,
      autopoieticWeight: Math.random()
    };

    setAutoNodes(prev => {
      const updatedNodes = [...prev, newNode];
      
      // Crear conexiones autopoiéticas
      if (updatedNodes.length > 1) {
        const recentNodes = updatedNodes.slice(-3);
        recentNodes.forEach(node => {
          node.connections = recentNodes
            .filter(n => n.id !== node.id)
            .slice(0, 2)
            .map(n => n.id);
        });
      }

      // Mantener solo los últimos 8 nodos
      return updatedNodes.slice(-8);
    });

    setWebEvolution(prev => prev + 1);
  }, [sapicasarFragments]);

  // Evolución autopoiética de la red
  useEffect(() => {
    const evolutionInterval = setInterval(() => {
      setAutoNodes(prev => prev.map(node => ({
        ...node,
        autopoieticWeight: Math.max(0.1, Math.min(1, 
          node.autopoieticWeight + (Math.random() - 0.5) * 0.1
        )),
        connections: node.connections.filter(() => Math.random() > 0.1) // Probabilidad de mantener conexión
      })));
    }, 5000);

    return () => clearInterval(evolutionInterval);
  }, []);

  return (
    <div className="fixed bottom-20 right-4 z-30 w-80 h-60">
      <div 
        className={`w-full h-full bg-black bg-opacity-90 border border-purple-400 rounded-lg p-3 backdrop-blur-sm relative overflow-hidden ${glitchEffects.animation}`}
        style={{
          transform: `${glitchEffects.transform} rotate(${Math.sin(breathingPhase * 0.2) * 2}deg)`,
          borderColor: `hsl(${Math.sin(breathingPhase) * 60 + 280}, 70%, 60%)`,
          filter: glitchEffects.filter,
          opacity: glitchEffects.opacity
        }}
      >
        <h4 className="text-purple-400 text-xs font-mono mb-2 border-b border-purple-400 pb-1">
          red autopoiética ∞ {webEvolution}
          {glitchEffects.textGlitch && (
            <span className="text-cyan-400 ml-2">{glitchEffects.textGlitch}</span>
          )}
        </h4>

        {/* Renderizar nodos autopoiéticos */}
        <div className="relative w-full h-40">
          {autoNodes.map((node, index) => {
            const angle = (index / autoNodes.length) * 2 * Math.PI + breathingPhase * 0.1;
            const radius = 60 + node.autopoieticWeight * 40;
            const x = 50 + Math.cos(angle) * radius / 3;
            const y = 50 + Math.sin(angle) * radius / 3;

            return (
              <div
                key={node.id}
                className={`absolute w-4 h-4 rounded-full border border-purple-400 bg-purple-900 flex items-center justify-center text-xs ${glitchEffects.animation}`}
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: `translate(-50%, -50%) scale(${0.5 + node.autopoieticWeight * 0.5})`,
                  opacity: 0.6 + node.autopoieticWeight * 0.4,
                  boxShadow: `0 0 ${node.autopoieticWeight * 10}px rgba(168, 85, 247, 0.6)`,
                  filter: glitchEffects.colorShift
                }}
              >
                {node.generationLevel % 10}
              </div>
            );
          })}

          {/* Conexiones autopoiéticas */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {autoNodes.map(node => {
              const nodeIndex = autoNodes.findIndex(n => n.id === node.id);
              const angle = (nodeIndex / autoNodes.length) * 2 * Math.PI + breathingPhase * 0.1;
              const radius = 60 + node.autopoieticWeight * 40;
              const x1 = 50 + Math.cos(angle) * radius / 3;
              const y1 = 50 + Math.sin(angle) * radius / 3;

              return node.connections.map(connId => {
                const connNode = autoNodes.find(n => n.id === connId);
                if (!connNode) return null;

                const connIndex = autoNodes.findIndex(n => n.id === connId);
                const connAngle = (connIndex / autoNodes.length) * 2 * Math.PI + breathingPhase * 0.1;
                const connRadius = 60 + connNode.autopoieticWeight * 40;
                const x2 = 50 + Math.cos(connAngle) * connRadius / 3;
                const y2 = 50 + Math.sin(connAngle) * connRadius / 3;

                return (
                  <line
                    key={`${node.id}-${connId}`}
                    x1={`${x1}%`}
                    y1={`${y1}%`}
                    x2={`${x2}%`}
                    y2={`${y2}%`}
                    stroke="rgba(168, 85, 247, 0.4)"
                    strokeWidth="1"
                    strokeDasharray="2,2"
                    style={{
                      opacity: (node.autopoieticWeight + connNode.autopoieticWeight) / 2,
                      filter: glitchEffects.colorShift
                    }}
                  />
                );
              });
            })}
          </svg>
        </div>

        {/* Estado autopoiético */}
        <div className="text-purple-300 text-xs opacity-70 mt-2">
          nodos: {autoNodes.length} | evolución: {webEvolution}
        </div>
      </div>
    </div>
  );
};
