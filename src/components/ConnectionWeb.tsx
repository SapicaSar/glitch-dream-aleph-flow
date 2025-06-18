
import React from 'react';

interface Fragment {
  id: number;
  text: string;
  connections: number[];
}

interface ConnectionWebProps {
  fragments: Fragment[];
  positions: Record<number, { x: number; y: number }>;
  activeNode: number | null;
  pulseIntensity: number;
  hoveredNode: number | null;
  breathingPhase: number;
}

export const ConnectionWeb = ({ 
  fragments, 
  positions, 
  activeNode, 
  pulseIntensity, 
  hoveredNode, 
  breathingPhase 
}: ConnectionWebProps) => {
  const renderConnections = () => {
    const lines = [];
    
    fragments.forEach((fragment) => {
      const fromPos = positions[fragment.id];
      if (!fromPos) return;
      
      fragment.connections.forEach((connectionId) => {
        const toFragment = fragments.find(f => f.id === connectionId);
        const toPos = positions[connectionId];
        
        if (toPos && toFragment) {
          const isHighlighted = activeNode === fragment.id || activeNode === connectionId;
          const isHovered = hoveredNode === fragment.id || hoveredNode === connectionId;
          const intensity = isHighlighted ? 1 : isHovered ? 0.7 : 0.3;
          
          lines.push(
            <line
              key={`${fragment.id}-${connectionId}`}
              x1={`${fromPos.x}%`}
              y1={`${fromPos.y}%`}
              x2={`${toPos.x}%`}
              y2={`${toPos.y}%`}
              stroke={isHighlighted ? '#ec4899' : isHovered ? '#06b6d4' : '#ffffff40'}
              strokeWidth={isHighlighted ? 3 : isHovered ? 2 : 1}
              strokeDasharray={isHighlighted ? '8,4' : isHovered ? '5,3' : '2,4'}
              className="transition-all duration-500"
              style={{
                opacity: intensity * pulseIntensity,
                filter: `drop-shadow(0 0 ${intensity * 5}px currentColor)`,
                strokeDashoffset: Math.sin(breathingPhase) * 10,
              }}
            />
          );
        }
      });
    });
    
    return lines;
  };

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none">
      <defs>
        <filter id="connectionGlow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="pulseFilter">
          <feGaussianBlur stdDeviation={Math.sin(breathingPhase) * 2 + 1} result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#connectionGlow)">
        {renderConnections()}
      </g>
    </svg>
  );
};
