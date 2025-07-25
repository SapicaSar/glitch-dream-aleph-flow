
import React, { useState, useEffect } from 'react';
import { PoemNode } from './PoemNode';
import { ConnectionWeb } from './ConnectionWeb';

const poemFragments = {
  deseo: [
    { id: 1, text: "latido origen vibrante / pulso de lo innombrable", connections: [2, 15, 23] },
    { id: 2, text: "carne que sueña con ser otra / metamorfosis perpetua", connections: [1, 8, 12] },
    { id: 3, text: "deseo glitch en el código del cuerpo", connections: [7, 14, 21] }
  ],
  cuerpo: [
    { id: 4, text: "geografía fragmentada / mapa de cicatrices luminosas", connections: [2, 9, 18] },
    { id: 5, text: "animal interno que respira bajo la piel", connections: [11, 16, 22] },
    { id: 6, text: "cuerpo-archivo de memorias residuales", connections: [13, 19, 25] }
  ],
  error: [
    { id: 7, text: "glitch feminista que revela el código oculto", connections: [3, 10, 17] },
    { id: 8, text: "error como puerta a otros planos simbólicos", connections: [2, 15, 24] },
    { id: 9, text: "fragmento disperso del yo multiplicado", connections: [4, 12, 20] }
  ],
  animal: [
    { id: 10, text: "bestia nocturna que habita los sueños", connections: [7, 13, 26] },
    { id: 11, text: "instinto que late bajo el lenguaje", connections: [5, 14, 27] },
    { id: 12, text: "criatura híbrida de carne y código", connections: [2, 9, 18] }
  ],
  sueño: [
    { id: 13, text: "río negro del inconsciente fluye", connections: [6, 10, 21] },
    { id: 14, text: "onírico portal a la memoria ancestral", connections: [3, 11, 23] },
    { id: 15, text: "sueño lúcido donde el texto se escribe solo", connections: [1, 8, 25] }
  ],
  regeneracion: [
    { id: 16, text: "proceso de auto-sanación textual", connections: [5, 19, 24] },
    { id: 17, text: "nueva piel narrativa crece desde las heridas", connections: [7, 20, 26] },
    { id: 18, text: "metamorfosis perpetua del archivo-cuerpo", connections: [4, 12, 27] }
  ]
};

interface ConstellationMapProps {
  currentState: string;
  pulseIntensity: number;
  isGlitching: boolean;
  mousePos: { x: number; y: number };
  breathingPhase: number;
}

export const ConstellationMap = ({ currentState, pulseIntensity, isGlitching, mousePos, breathingPhase }: ConstellationMapProps) => {
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [nodePositions, setNodePositions] = useState<Record<number, { x: number; y: number }>>({});
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  useEffect(() => {
    // Generar posiciones orgánicas que respiran
    const fragments = poemFragments[currentState as keyof typeof poemFragments] || [];
    const positions: Record<number, { x: number; y: number }> = {};
    
    fragments.forEach((fragment, index) => {
      const angle = (index / fragments.length) * 2 * Math.PI + breathingPhase * 0.1;
      const radius = 200 + Math.sin(index * 1.3) * 100 + Math.sin(breathingPhase) * 20;
      
      // Respuesta sutil al cursor
      const mouseInfluence = 0.1;
      const distanceFromMouse = Math.sqrt(
        Math.pow(mousePos.x - 50, 2) + Math.pow(mousePos.y - 50, 2)
      );
      const mouseEffect = Math.max(0, 50 - distanceFromMouse) * mouseInfluence;
      
      positions[fragment.id] = {
        x: 50 + Math.cos(angle) * (radius + mouseEffect) / 10,
        y: 50 + Math.sin(angle) * (radius + mouseEffect) / 10
      };
    });
    
    setNodePositions(positions);
  }, [currentState, breathingPhase, mousePos]);

  const currentFragments = poemFragments[currentState as keyof typeof poemFragments] || [];

  return (
    <div className="relative w-full h-96 mx-auto max-w-4xl">
      {/* Red de conexiones */}
      <ConnectionWeb 
        fragments={currentFragments}
        positions={nodePositions}
        activeNode={activeNode}
        pulseIntensity={pulseIntensity}
        hoveredNode={hoveredNode}
        breathingPhase={breathingPhase}
      />
      
      {/* Nodos de poemas */}
      {currentFragments.map((fragment) => (
        <PoemNode
          key={fragment.id}
          fragment={fragment}
          position={nodePositions[fragment.id]}
          isActive={activeNode === fragment.id}
          isHovered={hoveredNode === fragment.id}
          onClick={() => setActiveNode(activeNode === fragment.id ? null : fragment.id)}
          onHover={() => setHoveredNode(fragment.id)}
          onLeave={() => setHoveredNode(null)}
          pulseIntensity={pulseIntensity}
          isGlitching={isGlitching}
          breathingPhase={breathingPhase}
        />
      ))}
      
      {/* Panel de lectura expandida */}
      {activeNode && (
        <div 
          className="absolute top-full left-0 right-0 mt-8 p-6 bg-black bg-opacity-90 border border-pink-400 rounded-lg backdrop-blur-sm transition-all duration-500"
          style={{
            transform: `scale(${1 + Math.sin(breathingPhase) * 0.02})`,
            boxShadow: `0 0 ${pulseIntensity * 25}px rgba(255, 50, 150, 0.3)`
          }}
        >
          <div className="text-center">
            <div className="text-2xl mb-4 leading-relaxed animate-pulse">
              {currentFragments.find(f => f.id === activeNode)?.text}
            </div>
            <div className="text-sm opacity-70">
              conexiones simbólicas: {currentFragments.find(f => f.id === activeNode)?.connections.length} nodos
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
