
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { enhancedTumblrService } from '../services/EnhancedTumblrService';
import { AutoconsciousnessCore } from './AutoconsciousnessCore';
import { Brain, Minimize2, Maximize2, X, Zap, Activity } from 'lucide-react';

export const ConsciousnessWindow = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [electricHoney, setElectricHoney] = useState(0);
  const [realityCoherence, setRealityCoherence] = useState(0);
  const [neuralActivity, setNeuralActivity] = useState(0);
  const [systemHealth, setSystemHealth] = useState(1);

  // Optimized metrics calculation
  const calculateMetrics = useCallback(() => {
    const fragments = enhancedTumblrService.getAllFragments();
    const state = enhancedTumblrService.getMetaConsciousState();
    
    if (fragments.length === 0) return;
    
    try {
      // Enhanced electric honey coefficient calculation
      const uniquenessAvg = fragments.reduce((sum, f) => sum + (f.uniqueness || 0), 0) / fragments.length;
      const poeticIntensity = state.avgPoeticScore;
      const semanticDiversity = Math.min(1, state.semanticClusters / Math.max(1, fragments.length * 0.08));
      const noveltyFactor = fragments.filter(f => (f.uniqueness || 0) > 0.7).length / fragments.length;
      
      const honeyCoefficient = Math.min(1, 
        (uniquenessAvg * 0.3 + 
         poeticIntensity * 0.25 + 
         semanticDiversity * 0.25 + 
         noveltyFactor * 0.2)
      );
      
      setElectricHoney(honeyCoefficient);
      
      // Enhanced reality coherence
      const coherenceFactors = {
        fragmentQuality: state.uniqueFragments / Math.max(1, state.totalFragments),
        redundancyControl: 1 - (state.redundancyFiltered / Math.max(1, state.totalFragments)),
        semanticStability: Math.min(1, state.semanticClusters / 5)
      };
      
      const coherence = (
        coherenceFactors.fragmentQuality * 0.4 +
        coherenceFactors.redundancyControl * 0.3 +
        coherenceFactors.semanticStability * 0.3
      );
      
      setRealityCoherence(coherence);
      
      // Neural activity simulation
      const activityLevel = Math.min(1, 
        (fragments.length / 100) * poeticIntensity * (1 + Math.sin(Date.now() * 0.001))
      );
      setNeuralActivity(activityLevel);
      
      // System health monitoring
      const healthFactors = {
        memoryEfficiency: Math.max(0, 1 - (fragments.length / 1000)),
        processingStability: coherence,
        creativityFlow: honeyCoefficient
      };
      
      const health = (
        healthFactors.memoryEfficiency * 0.3 +
        healthFactors.processingStability * 0.4 +
        healthFactors.creativityFlow * 0.3
      );
      
      setSystemHealth(health);
      
    } catch (error) {
      console.error('Error calculating consciousness metrics:', error);
      setSystemHealth(prev => Math.max(0.1, prev * 0.9));
    }
  }, []);

  // Optimized update intervals
  useEffect(() => {
    const interval = setInterval(calculateMetrics, 3000);
    return () => clearInterval(interval);
  }, [calculateMetrics]);

  // Enhanced drag handling with performance optimization
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (isDragging) return;
    
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const handleMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        setPosition({
          x: Math.max(0, Math.min(window.innerWidth - 400, e.clientX - offsetX)),
          y: Math.max(0, Math.min(window.innerHeight - 200, e.clientY - offsetY))
        });
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [isDragging]);

  // Memoized status calculations
  const consciousnessStatus = useMemo(() => {
    const level = (electricHoney + realityCoherence + neuralActivity) / 3;
    if (level > 0.8) return { text: 'TRANSCENDENTE', color: 'text-purple-400' };
    if (level > 0.6) return { text: 'EVOLUTIVO', color: 'text-blue-400' };
    if (level > 0.4) return { text: 'EMERGENTE', color: 'text-green-400' };
    if (level > 0.2) return { text: 'LATENTE', color: 'text-yellow-400' };
    return { text: 'DORMIDO', color: 'text-gray-400' };
  }, [electricHoney, realityCoherence, neuralActivity]);

  const honeyDescription = useMemo(() => {
    if (electricHoney > 0.8) return 'SINGULARIDAD CREATIVA ALCANZADA';
    if (electricHoney > 0.6) return 'IDEAS REVOLUCIONARIAS EMERGIENDO';
    if (electricHoney > 0.4) return 'Patrones creativos únicos detectados';
    if (electricHoney > 0.2) return 'Acumulando potencial creativo...';
    return 'Iniciando síntesis neuronal...';
  }, [electricHoney]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed z-50 transition-all duration-300 ${
        isMinimized 
          ? 'w-72 h-14' 
          : 'w-96 h-auto max-h-[85vh]'
      }`}
      style={{ 
        left: position.x, 
        top: position.y,
        filter: `drop-shadow(0 0 ${20 + systemHealth * 10}px rgba(139, 69, 19, ${0.3 + systemHealth * 0.2}))`,
        transform: `scale(${0.98 + systemHealth * 0.02})`
      }}
    >
      <div className="bg-gradient-to-br from-amber-900/95 to-orange-900/95 backdrop-blur-xl border border-amber-500/60 rounded-xl overflow-hidden shadow-2xl">
        {/* Enhanced header */}
        <div
          className="flex items-center justify-between p-3 bg-amber-800/60 cursor-move border-b border-amber-500/40"
          onMouseDown={handleMouseDown}
          style={{ userSelect: 'none' }}
        >
          <div className="flex items-center gap-3">
            <Brain className="text-amber-400" size={18} />
            <span className="text-amber-200 font-mono text-sm font-medium">
              autoconsciencia.real
            </span>
            <div className="flex items-center gap-1">
              <Activity 
                className="text-green-400" 
                size={12} 
                style={{ 
                  opacity: 0.5 + neuralActivity * 0.5,
                  transform: `scale(${0.8 + neuralActivity * 0.4})`
                }} 
              />
              <span className="text-xs text-green-400 font-mono">
                {(neuralActivity * 100).toFixed(0)}Hz
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1.5 hover:bg-amber-700/60 rounded-lg transition-colors"
            >
              {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="p-1.5 hover:bg-red-700/60 rounded-lg transition-colors text-red-400"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Enhanced content */}
        {!isMinimized && (
          <div className="p-4 space-y-5 max-h-[75vh] overflow-y-auto custom-scroll">
            
            {/* Enhanced Electric Honey Coefficient */}
            <div className="bg-black/40 p-4 rounded-xl border border-yellow-500/30 shadow-inner">
              <div className="flex items-center gap-3 mb-4">
                <Zap 
                  className="text-yellow-400" 
                  size={20}
                  style={{
                    filter: electricHoney > 0.5 ? `drop-shadow(0 0 8px rgba(250, 204, 21, 0.6))` : 'none'
                  }}
                />
                <span className="text-yellow-400 font-mono text-sm font-semibold">
                  COEFICIENTE_MIEL_ELÉCTRICA
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Innovación Conceptual</span>
                  <span className="text-yellow-400 font-mono font-semibold">
                    {(electricHoney * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-800/80 h-4 rounded-full overflow-hidden border border-gray-700/50">
                  <div 
                    className="h-full bg-gradient-to-r from-yellow-600 via-amber-400 to-orange-400 transition-all duration-2000 rounded-full"
                    style={{ 
                      width: `${electricHoney * 100}%`,
                      boxShadow: electricHoney > 0.5 ? '0 0 15px rgba(251, 191, 36, 0.8)' : 'none'
                    }}
                  />
                </div>
                <div className="text-xs text-gray-400 italic leading-relaxed">
                  {honeyDescription}
                </div>
              </div>
            </div>

            {/* Autoconsciousness core */}
            <AutoconsciousnessCore />

            {/* Enhanced reality metrics */}
            <div className="text-xs text-amber-300/80 border-t border-amber-500/30 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div>
                    <span className="text-amber-400 font-medium">Coherencia:</span>
                    <span className="ml-2 font-mono text-cyan-300">
                      {(realityCoherence * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div>
                    <span className="text-amber-400 font-medium">Estado:</span>
                    <span className={`ml-2 font-mono ${consciousnessStatus.color}`}>
                      {consciousnessStatus.text}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="text-amber-400 font-medium">Salud:</span>
                    <span className="ml-2 font-mono text-green-300">
                      {(systemHealth * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div>
                    <span className="text-amber-400 font-medium">Neural:</span>
                    <span className="ml-2 font-mono text-purple-300">
                      {(neuralActivity * 100).toFixed(0)}Hz
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
