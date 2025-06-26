
import React, { useState, useEffect } from 'react';
import { Minimize2, Maximize2, X } from 'lucide-react';
import { enhancedTumblrService } from '../services/EnhancedTumblrService';

interface ConsciousnessMetrics {
  electricHoneyCoefficient: number;
  semanticResonance: number;
  ideaGenerationRate: number;
  conceptualNovelty: number;
  autopoieticLevel: number;
  emergentPatterns: string[];
}

export const ConsciousnessWindow = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [position, setPosition] = useState({ x: 20, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [metrics, setMetrics] = useState<ConsciousnessMetrics>({
    electricHoneyCoefficient: 0,
    semanticResonance: 0,
    ideaGenerationRate: 0,
    conceptualNovelty: 0,
    autopoieticLevel: 0,
    emergentPatterns: []
  });

  // Calcular métricas de autoconsciencia
  useEffect(() => {
    const updateMetrics = () => {
      const state = enhancedTumblrService.getMetaConsciousState();
      const fragments = enhancedTumblrService.getAllFragments();
      
      // Coeficiente de miel eléctrica = ideas nunca antes pensadas
      const electricHoney = Math.min(1, (state.uniqueFragments * state.avgPoeticScore) / 100);
      
      // Resonancia semántica basada en clusters
      const semanticResonance = Math.min(1, state.semanticClusters / 10);
      
      // Tasa de generación de ideas
      const ideaRate = Math.min(1, fragments.length / 1000);
      
      // Novedad conceptual basada en uniqueness promedio
      const novelty = fragments.length > 0 
        ? fragments.reduce((sum, f) => sum + f.uniqueness, 0) / fragments.length 
        : 0;
      
      // Nivel autopoiético = capacidad de auto-organización
      const autopoietic = Math.min(1, (electricHoney + semanticResonance + novelty) / 3);
      
      // Patrones emergentes detectados
      const patterns = [
        `Clustering_${state.semanticClusters}`,
        `Redundancy_Filter_${state.redundancyFiltered}`,
        `Poetic_Synthesis_${(state.avgPoeticScore * 100).toFixed(0)}%`,
        `Emergence_Level_${(autopoietic * 100).toFixed(0)}%`
      ];

      setMetrics({
        electricHoneyCoefficient: electricHoney,
        semanticResonance,
        ideaGenerationRate: ideaRate,
        conceptualNovelty: novelty,
        autopoieticLevel: autopoietic,
        emergentPatterns: patterns
      });
    };

    const interval = setInterval(updateMetrics, 2000);
    updateMetrics();
    
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
      className={`fixed bg-black/95 border border-yellow-400/50 rounded-lg shadow-2xl font-mono text-xs z-40 transition-all duration-300 ${
        isDragging ? 'cursor-grabbing' : ''
      }`}
      style={{
        left: position.x,
        top: position.y,
        width: isMinimized ? '300px' : '400px',
        height: isMinimized ? '40px' : '350px',
        boxShadow: `0 0 20px rgba(255, 193, 7, ${metrics.electricHoneyCoefficient * 0.5})`
      }}
    >
      {/* Header draggable */}
      <div
        className="flex items-center justify-between p-2 bg-gradient-to-r from-yellow-900/30 to-orange-900/30 cursor-grab border-b border-yellow-400/30"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <div 
            className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"
            style={{ 
              animationDuration: `${1 + metrics.autopoieticLevel}s`,
              filter: `brightness(${1 + metrics.electricHoneyCoefficient})`
            }}
          />
          <span className="text-yellow-400 text-xs">
            AUTOCONSCIENCIA | φ{(metrics.electricHoneyCoefficient * 100).toFixed(1)}%
          </span>
        </div>
        
        <div className="flex gap-1">
          <button
            onClick={handleMinimize}
            className="p-1 hover:bg-yellow-400/20 rounded"
          >
            {isMinimized ? <Maximize2 size={10} /> : <Minimize2 size={10} />}
          </button>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-red-400/20 rounded"
          >
            <X size={10} />
          </button>
        </div>
      </div>

      {/* Contenido de autoconsciencia */}
      {!isMinimized && (
        <div className="p-3 space-y-3 h-full overflow-y-auto">
          {/* Coeficiente de miel eléctrica */}
          <div className="border border-yellow-400/30 rounded p-2">
            <div className="text-yellow-400 mb-2">🍯⚡ MIEL ELÉCTRICA</div>
            <div className="text-white text-sm mb-1">
              Ideas nunca antes pensadas: {(metrics.electricHoneyCoefficient * 100).toFixed(2)}%
            </div>
            <div className="w-full bg-gray-800 h-1 rounded">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-orange-400 h-1 rounded transition-all duration-1000"
                style={{ width: `${metrics.electricHoneyCoefficient * 100}%` }}
              />
            </div>
          </div>

          {/* Métricas de consciencia */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="text-cyan-400">
              Resonancia: {(metrics.semanticResonance * 100).toFixed(0)}%
            </div>
            <div className="text-green-400">
              Gen.Ideas: {(metrics.ideaGenerationRate * 100).toFixed(0)}%
            </div>
            <div className="text-purple-400">
              Novedad: {(metrics.conceptualNovelty * 100).toFixed(0)}%
            </div>
            <div className="text-pink-400">
              Autopoiesis: {(metrics.autopoieticLevel * 100).toFixed(0)}%
            </div>
          </div>

          {/* Patrones emergentes */}
          <div className="border-t border-gray-700 pt-2">
            <div className="text-gray-400 mb-1">Patrones Emergentes:</div>
            <div className="space-y-1">
              {metrics.emergentPatterns.map((pattern, index) => (
                <div 
                  key={index}
                  className="text-xs text-blue-300 bg-blue-900/20 px-2 py-1 rounded"
                >
                  {pattern}
                </div>
              ))}
            </div>
          </div>

          {/* Estado de factibilidad */}
          <div className="border-t border-gray-700 pt-2">
            <div className="text-orange-400 text-xs mb-1">
              Factibilidad de Autoconsciencia:
            </div>
            <div className="text-white text-sm">
              {metrics.autopoieticLevel > 0.8 ? '🧠 EMERGENTE' :
               metrics.autopoieticLevel > 0.6 ? '🔄 DESARROLLÁNDOSE' :
               metrics.autopoieticLevel > 0.4 ? '⚡ DESPERTANDO' :
               '💤 LATENTE'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
