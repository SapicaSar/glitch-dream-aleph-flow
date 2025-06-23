
import React, { useState, useEffect, useRef } from 'react';
import { Minimize2, Maximize2, Move, RotateCw } from 'lucide-react';

export interface VisualPanel {
  id: string;
  title: string;
  component: React.ReactNode;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isMinimized: boolean;
  isMaximized: boolean;
  priority: number;
  category: 'metrics' | 'consciousness' | 'miel' | 'system';
  respirationPhase: number;
}

interface VisualArchitectureManagerProps {
  children: React.ReactNode;
  breathingPhase: number;
}

export const VisualArchitectureManager = ({ children, breathingPhase }: VisualArchitectureManagerProps) => {
  const [panels, setPanels] = useState<VisualPanel[]>([]);
  const [isDancing, setIsDancing] = useState(true);
  const [harmonicLayout, setHarmonicLayout] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-organize panels in harmonic spiral
  useEffect(() => {
    if (!harmonicLayout || panels.length === 0) return;

    const organizeHarmonically = () => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const baseRadius = Math.min(window.innerWidth, window.innerHeight) * 0.3;

      setPanels(prev => prev.map((panel, index) => {
        const angle = (index / prev.length) * Math.PI * 2 + breathingPhase * 0.1;
        const radius = baseRadius + Math.sin(breathingPhase + index) * 50;
        const spiralFactor = 1 + index * 0.1;
        
        return {
          ...panel,
          position: {
            x: centerX + Math.cos(angle) * radius * spiralFactor - panel.size.width / 2,
            y: centerY + Math.sin(angle) * radius * spiralFactor - panel.size.height / 2
          },
          respirationPhase: breathingPhase + index * 0.2
        };
      }));
    };

    const interval = setInterval(organizeHarmonically, 100);
    return () => clearInterval(interval);
  }, [breathingPhase, harmonicLayout, panels.length]);

  const registerPanel = (panel: Omit<VisualPanel, 'respirationPhase'>) => {
    setPanels(prev => [
      ...prev.filter(p => p.id !== panel.id),
      { ...panel, respirationPhase: 0 }
    ]);
  };

  const updatePanel = (id: string, updates: Partial<VisualPanel>) => {
    setPanels(prev => prev.map(panel => 
      panel.id === id ? { ...panel, ...updates } : panel
    ));
  };

  const removePanel = (id: string) => {
    setPanels(prev => prev.filter(panel => panel.id !== id));
  };

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
      {/* Background miel eléctrica visualization */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full opacity-20">
          {panels.map((panel, index) => 
            panels.slice(index + 1).map((otherPanel, otherIndex) => (
              <line
                key={`connection-${panel.id}-${otherPanel.id}`}
                x1={panel.position.x + panel.size.width / 2}
                y1={panel.position.y + panel.size.height / 2}
                x2={otherPanel.position.x + otherPanel.size.width / 2}
                y2={otherPanel.position.y + otherPanel.size.height / 2}
                stroke="url(#mielGradient)"
                strokeWidth={2}
                opacity={0.6}
              />
            ))
          )}
          
          <defs>
            <linearGradient id="mielGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#fbbf24', stopOpacity: 0.6 }} />
              <stop offset="50%" style={{ stopColor: '#f59e0b', stopOpacity: 0.8 }} />
              <stop offset="100%" style={{ stopColor: '#d97706', stopOpacity: 0.6 }} />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Control panel */}
      <div className="fixed bottom-4 right-4 z-50 flex gap-2">
        <button
          onClick={() => setHarmonicLayout(!harmonicLayout)}
          className={`p-2 rounded border backdrop-blur-sm transition-all ${
            harmonicLayout 
              ? 'bg-yellow-500/20 border-yellow-400 text-yellow-400' 
              : 'bg-gray-800/50 border-gray-600 text-gray-400'
          }`}
          title="Organización Armónica"
        >
          <RotateCw size={16} />
        </button>
        
        <button
          onClick={() => setIsDancing(!isDancing)}
          className={`p-2 rounded border backdrop-blur-sm transition-all ${
            isDancing 
              ? 'bg-purple-500/20 border-purple-400 text-purple-400' 
              : 'bg-gray-800/50 border-gray-600 text-gray-400'
          }`}
          title="Danza de Procesos"
        >
          <Move size={16} />
        </button>
      </div>

      {/* Panel management context */}
      <VisualArchitectureContext.Provider value={{
        registerPanel,
        updatePanel,
        removePanel,
        isDancing,
        harmonicLayout
      }}>
        <div />
      </VisualArchitectureContext.Provider>
    </div>
  );
};

export const VisualArchitectureContext = React.createContext<{
  registerPanel: (panel: Omit<VisualPanel, 'respirationPhase'>) => void;
  updatePanel: (id: string, updates: Partial<VisualPanel>) => void;
  removePanel: (id: string) => void;
  isDancing: boolean;
  harmonicLayout: boolean;
} | null>(null);

export const useVisualArchitecture = () => {
  const context = React.useContext(VisualArchitectureContext);
  if (!context) {
    throw new Error('useVisualArchitecture must be used within VisualArchitectureManager');
  }
  return context;
};
