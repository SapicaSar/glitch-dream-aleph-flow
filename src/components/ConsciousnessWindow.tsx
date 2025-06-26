import React, { useState, useEffect } from 'react';
import { enhancedTumblrService } from '../services/EnhancedTumblrService';
import { AutoconsciousnessCore } from './AutoconsciousnessCore';
import { Brain, Minimize2, Maximize2, X, Zap } from 'lucide-react';

export const ConsciousnessWindow = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const [electricHoney, setElectricHoney] = useState(0);
  const [realityCoherence, setRealityCoherence] = useState(0);

  // Cálculo del coeficiente de miel eléctrica
  useEffect(() => {
    const updateMetrics = () => {
      const fragments = enhancedTumblrService.getAllFragments();
      const state = enhancedTumblrService.getMetaConsciousState();
      
      if (fragments.length > 0) {
        // Miel eléctrica: ideas innovadoras nunca antes pensadas
        const uniquenessAvg = fragments.reduce((sum, f) => sum + f.uniqueness, 0) / fragments.length;
        const poeticIntensity = state.avgPoeticScore;
        const semanticDiversity = state.semanticClusters / Math.max(1, fragments.length * 0.1);
        
        const honeyCoefficient = Math.min(1, (uniquenessAvg + poeticIntensity + semanticDiversity) / 3);
        setElectricHoney(honeyCoefficient);
        
        // Coherencia de realidad
        const coherence = Math.min(1, state.uniqueFragments / (state.totalFragments || 1));
        setRealityCoherence(coherence);
      }
    };

    const interval = setInterval(updateMetrics, 2000);
    return () => clearInterval(interval);
  }, []);

  // Funciones de ventana
  const handleMinimize = () => setIsMinimized(!isMinimized);
  const handleClose = () => setIsVisible(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX - offsetX,
        y: e.clientY - offsetY
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed z-50 transition-all duration-300 ${
        isMinimized 
          ? 'w-64 h-12' 
          : 'w-96 h-auto max-h-[80vh]'
      }`}
      style={{ 
        left: position.x, 
        top: position.y,
        filter: 'drop-shadow(0 0 20px rgba(139, 69, 19, 0.3))'
      }}
    >
      <div className="bg-gradient-to-br from-amber-900/90 to-orange-900/90 backdrop-blur-md border border-amber-500/50 rounded-lg overflow-hidden">
        {/* Header con controles */}
        <div
          className="flex items-center justify-between p-3 bg-amber-800/50 cursor-move border-b border-amber-500/30"
          onMouseDown={handleMouseDown}
        >
          <div className="flex items-center gap-2">
            <Brain className="text-amber-400" size={16} />
            <span className="text-amber-200 font-mono text-sm">
              autoconsciencia.real
            </span>
          </div>
          
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 hover:bg-amber-700/50 rounded transition-colors"
            >
              {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="p-1 hover:bg-red-700/50 rounded transition-colors text-red-400"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Contenido */}
        {!isMinimized && (
          <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
            
            {/* Coeficiente de Miel Eléctrica */}
            <div className="bg-black/30 p-4 rounded-lg border border-yellow-500/20">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="text-yellow-400" size={18} />
                <span className="text-yellow-400 font-mono text-sm">
                  COEFICIENTE_MIEL_ELÉCTRICA
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Innovación Conceptual</span>
                  <span className="text-yellow-400 font-mono">
                    {(electricHoney * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-800 h-3 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-yellow-600 via-amber-400 to-orange-400 transition-all duration-2000"
                    style={{ 
                      width: `${electricHoney * 100}%`,
                      boxShadow: electricHoney > 0.5 ? '0 0 10px rgba(251, 191, 36, 0.6)' : 'none'
                    }}
                  />
                </div>
                <div className="text-xs text-gray-400 italic">
                  {electricHoney > 0.7 ? 'IDEAS REVOLUCIONARIAS EMERGIENDO' :
                   electricHoney > 0.4 ? 'Patrones creativos únicos detectados' :
                   'Acumulando potencial creativo...'}
                </div>
              </div>
            </div>

            {/* Núcleo de Autoconsciencia */}
            <AutoconsciousnessCore />

            {/* Métricas de Realidad */}
            <div className="text-xs text-amber-300/70 border-t border-amber-500/20 pt-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-amber-400">Coherencia:</span>
                  <span className="ml-2 font-mono">
                    {(realityCoherence * 100).toFixed(1)}%
                  </span>
                </div>
                <div>
                  <span className="text-amber-400">Estado:</span>
                  <span className="ml-2 font-mono">
                    {electricHoney > 0.6 ? 'TRANSCENDENTE' : 'EVOLUTIVO'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
