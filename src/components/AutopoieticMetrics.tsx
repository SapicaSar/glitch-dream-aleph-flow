
import React, { useState } from 'react';
import { AutopoieticMetrics as MetricsType } from '../core/AutopoieticKernel';
import { Activity, Minimize2, Maximize2, Brain } from 'lucide-react';

interface AutopoieticMetricsProps {
  metrics: MetricsType;
  breathingPhase: number;
}

export const AutopoieticMetrics = ({ metrics, breathingPhase }: AutopoieticMetricsProps) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isCompact, setIsCompact] = useState(true);

  const getMetricColor = (value: number) => {
    if (value > 0.7) return 'rgb(34, 197, 94)';
    if (value > 0.4) return 'rgb(234, 179, 8)';
    return 'rgb(239, 68, 68)';
  };

  if (isMinimized) {
    return (
      <div className="fixed top-4 right-4 z-40">
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-black/70 border border-purple-400/50 rounded-full p-2 backdrop-blur-sm hover:bg-purple-400/20 transition-all"
          style={{
            transform: `scale(${1 + Math.sin(breathingPhase * 0.7) * 0.1})`,
            boxShadow: `0 0 ${metrics.emergentComplexity * 20}px purple`
          }}
        >
          <Brain size={16} className="text-purple-400" />
        </button>
      </div>
    );
  }

  return (
    <div className={`fixed top-4 right-4 z-40 transition-all duration-500 ${isCompact ? 'w-72' : 'w-96'}`}>
      <div 
        className="bg-black/70 border border-purple-400/50 rounded-lg backdrop-blur-sm overflow-hidden"
        style={{
          transform: `scale(${1 + Math.sin(breathingPhase * 0.7) * 0.02})`,
          borderColor: `hsl(${metrics.organizationalClosure * 120 + 240}, 70%, 60%)`,
          boxShadow: `0 0 ${metrics.emergentComplexity * 30}px hsla(${metrics.organizationalClosure * 120 + 240}, 70%, 50%, 0.3)`
        }}
      >
        {/* Header con controles */}
        <div className="flex items-center justify-between p-3 border-b border-purple-400/30">
          <div className="flex items-center gap-2">
            <Brain size={14} className="text-purple-400" />
            <span className="text-purple-400 text-sm font-mono">AUTOPOIESIS</span>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setIsCompact(!isCompact)}
              className="p-1 hover:bg-purple-400/20 rounded transition-colors"
            >
              <Maximize2 size={12} className="text-purple-400" />
            </button>
            <button
              onClick={() => setIsMinimized(true)}
              className="p-1 hover:bg-purple-400/20 rounded transition-colors"
            >
              <Minimize2 size={12} className="text-purple-400" />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-3">
          {/* Métricas en grid compacto */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            {/* Clausura Organizacional */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-300">clausura</span>
                <span className="font-mono" style={{ color: getMetricColor(metrics.organizationalClosure) }}>
                  {(metrics.organizationalClosure * 100).toFixed(0)}%
                </span>
              </div>
              <div className="h-1.5 bg-gray-800 rounded overflow-hidden">
                <div 
                  className="h-full rounded transition-all duration-1000"
                  style={{
                    width: `${metrics.organizationalClosure * 100}%`,
                    backgroundColor: getMetricColor(metrics.organizationalClosure)
                  }}
                />
              </div>
            </div>

            {/* Viabilidad Autopoiética */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-300">viabilidad</span>
                <span className="font-mono" style={{ color: getMetricColor(metrics.autopoieticViability) }}>
                  {(metrics.autopoieticViability * 100).toFixed(0)}%
                </span>
              </div>
              <div className="h-1.5 bg-gray-800 rounded overflow-hidden">
                <div 
                  className="h-full rounded transition-all duration-1000"
                  style={{
                    width: `${metrics.autopoieticViability * 100}%`,
                    backgroundColor: getMetricColor(metrics.autopoieticViability)
                  }}
                />
              </div>
            </div>

            {/* Complejidad Emergente */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-300">emergencia</span>
                <span className="font-mono" style={{ color: getMetricColor(metrics.emergentComplexity) }}>
                  {(metrics.emergentComplexity * 100).toFixed(0)}%
                </span>
              </div>
              <div className="h-1.5 bg-gray-800 rounded overflow-hidden">
                <div 
                  className="h-full rounded transition-all duration-1000"
                  style={{
                    width: `${metrics.emergentComplexity * 100}%`,
                    backgroundColor: getMetricColor(metrics.emergentComplexity)
                  }}
                />
              </div>
            </div>

            {/* Coherencia Cognitiva */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-300">coherencia</span>
                <span className="font-mono" style={{ color: getMetricColor(metrics.cognitiveCoherence) }}>
                  {(metrics.cognitiveCoherence * 100).toFixed(0)}%
                </span>
              </div>
              <div className="h-1.5 bg-gray-800 rounded overflow-hidden">
                <div 
                  className="h-full rounded transition-all duration-1000"
                  style={{
                    width: `${metrics.cognitiveCoherence * 100}%`,
                    backgroundColor: getMetricColor(metrics.cognitiveCoherence)
                  }}
                />
              </div>
            </div>
          </div>

          {/* Estado Global compacto */}
          <div className="p-2 bg-gray-900/50 rounded border border-gray-700">
            <div className="text-xs text-center">
              <span className="text-gray-400">estado: </span>
              <span 
                className="font-mono"
                style={{ 
                  color: getMetricColor((Object.values(metrics) as number[]).reduce((a, b) => a + b, 0) / 5)
                }}
              >
                {(() => {
                  const avg = (Object.values(metrics) as number[]).reduce((a, b) => a + b, 0) / 5;
                  if (avg > 0.7) return 'AVANZADO';
                  if (avg > 0.5) return 'ESTABLE';
                  if (avg > 0.3) return 'BÁSICO';
                  return 'EMERGIENDO';
                })()}
              </span>
            </div>
          </div>

          {/* Visualización de ondas solo si está expandido */}
          {!isCompact && (
            <div className="h-6 relative">
              <svg viewBox="0 0 100 15" className="w-full h-full">
                <polyline
                  fill="none"
                  stroke="rgb(168, 85, 247)"
                  strokeWidth="1"
                  points={
                    [...Array(30)].map((_, i) => {
                      const x = (i / 29) * 100;
                      const y = 7.5 + Math.sin((i + breathingPhase * 10) * 0.5) * metrics.organizationalClosure * 3;
                      return `${x},${y}`;
                    }).join(' ')
                  }
                  opacity={0.8}
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
