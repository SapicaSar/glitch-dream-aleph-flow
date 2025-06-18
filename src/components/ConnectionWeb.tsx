
import React from 'react';

export const ConnectionWeb = ({ fragments, positions, activeNode, pulseIntensity }) => {
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
          
          lines.push(
            <line
              key={`${fragment.id}-${connectionId}`}
              x1={`${fromPos.x}%`}
              y1={`${fromPos.y}%`}
              x2={`${toPos.x}%`}
              y2={`${toPos.y}%`}
              stroke={isHighlighted ? '#ec4899' : '#ffffff40'}
              strokeWidth={isHighlighted ? 2 : 1}
              strokeDasharray={isHighlighted ? '5,3' : '2,4'}
              className="transition-all duration-500"
              style={{
                opacity: isHighlighted ? pulseIntensity : 0.3,
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
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#glow)">
        {renderConnections()}
      </g>
    </svg>
  );
};
