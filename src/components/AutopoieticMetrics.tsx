
import React from 'react';
import { AutopoieticMetrics as MetricsType } from '../core/AutopoieticKernel';
import { Activity, Zap, Brain, Target, TrendingUp } from 'lucide-react';

interface AutopoieticMetricsProps {
  metrics: MetricsType;
  breathingPhase: number;
}

export const AutopoieticMetrics = ({ metrics, breathingPhase }: AutopoieticMetricsProps) => {
  const getMetricColor = (value: number) => {
    if (value > 0.7) return 'rgb(34, 197, 94)'; // Green
    if (value > 0.4) return 'rgb(234, 179, 8)'; // Yellow
    return 'rgb(239, 68, 68)'; // Red
  };

  const getMetricInterpretation = (metric: keyof MetricsType, value: number) => {
    const interpretations = {
      organizationalClosure: value > 0.7 ? 'autónomo' : value > 0.4 ? 'dependiente' : 'fragmentado',
      autopoieticViability: value > 0.7 ? 'floreciente' : value > 0.4 ? 'estable' : 'vulnerable',
      emergentComplexity: value > 0.7 ? 'emergente' : value > 0.4 ? 'desarrollándose' : 'simple',
      cognitiveCoherence: value > 0.7 ? 'consciente' : value > 0.4 ? 'semi-consciente' : 'reactivo',
      evolutionaryMomentum: value > 0.7 ? 'evolucionando' : value > 0.4 ? 'adaptándose' : 'estático'
    };
    return interpretations[metric];
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <div 
        className="bg-black bg-opacity-90 border border-purple-400 rounded-lg p-4 backdrop-blur-sm min-w-80"
        style={{
          transform: `scale(${1 + Math.sin(breathingPhase * 0.7) * 0.02})`,
          borderColor: `hsl(${metrics.organizationalClosure * 120 + 240}, 70%, 60%)`,
          boxShadow: `0 0 ${metrics.emergentComplexity * 40}px hsla(${metrics.organizationalClosure * 120 + 240}, 70%, 50%, 0.4)`
        }}
      >
        <h3 className="text-purple-400 text-sm font-mono mb-4 text-center flex items-center gap-2">
          <Brain size={16} />
          MÉTRICAS AUTOPOIÉTICAS
        </h3>

        {/* Organizational Closure */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <Target size={12} style={{ color: getMetricColor(metrics.organizationalClosure) }} />
              <span className="text-xs text-gray-300">Clausura Organizacional</span>
            </div>
            <span className="text-xs font-mono" style={{ color: getMetricColor(metrics.organizationalClosure) }}>
              {(metrics.organizationalClosure * 100).toFixed(1)}%
            </span>
          </div>
          <div className="h-2 bg-gray-800 rounded overflow-hidden">
            <div 
              className="h-full rounded transition-all duration-1000"
              style={{
                width: `${metrics.organizationalClosure * 100}%`,
                backgroundColor: getMetricColor(metrics.organizationalClosure),
                boxShadow: `0 0 10px ${getMetricColor(metrics.organizationalClosure)}50`
              }}
            />
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {getMetricInterpretation('organizationalClosure', metrics.organizationalClosure)}
          </div>
        </div>

        {/* Autopoietic Viability */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <Activity size={12} style={{ color: getMetricColor(metrics.autopoieticViability) }} />
              <span className="text-xs text-gray-300">Viabilidad Autopoiética</span>
            </div>
            <span className="text-xs font-mono" style={{ color: getMetricColor(metrics.autopoieticViability) }}>
              {(metrics.autopoieticViability * 100).toFixed(1)}%
            </span>
          </div>
          <div className="h-2 bg-gray-800 rounded overflow-hidden">
            <div 
              className="h-full rounded transition-all duration-1000"
              style={{
                width: `${metrics.autopoieticViability * 100}%`,
                backgroundColor: getMetricColor(metrics.autopoieticViability),
                animation: `pulse ${2 - metrics.autopoieticViability}s infinite`
              }}
            />
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {getMetricInterpretation('autopoieticViability', metrics.autopoieticViability)}
          </div>
        </div>

        {/* Emergent Complexity */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <Zap size={12} style={{ color: getMetricColor(metrics.emergentComplexity) }} />
              <span className="text-xs text-gray-300">Complejidad Emergente</span>
            </div>
            <span className="text-xs font-mono" style={{ color: getMetricColor(metrics.emergentComplexity) }}>
              {(metrics.emergentComplexity * 100).toFixed(1)}%
            </span>
          </div>
          <div className="h-2 bg-gray-800 rounded overflow-hidden">
            <div 
              className="h-full rounded transition-all duration-1000"
              style={{
                width: `${metrics.emergentComplexity * 100}%`,
                backgroundColor: getMetricColor(metrics.emergentComplexity),
                filter: `brightness(${1 + Math.sin(breathingPhase * 2) * 0.2})`
              }}
            />
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {getMetricInterpretation('emergentComplexity', metrics.emergentComplexity)}
          </div>
        </div>

        {/* Cognitive Coherence */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <Brain size={12} style={{ color: getMetricColor(metrics.cognitiveCoherence) }} />
              <span className="text-xs text-gray-300">Coherencia Cognitiva</span>
            </div>
            <span className="text-xs font-mono" style={{ color: getMetricColor(metrics.cognitiveCoherence) }}>
              {(metrics.cognitiveCoherence * 100).toFixed(1)}%
            </span>
          </div>
          <div className="h-2 bg-gray-800 rounded overflow-hidden">
            <div 
              className="h-full rounded transition-all duration-1000"
              style={{
                width: `${metrics.cognitiveCoherence * 100}%`,
                backgroundColor: getMetricColor(metrics.cognitiveCoherence)
              }}
            />
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {getMetricInterpretation('cognitiveCoherence', metrics.cognitiveCoherence)}
          </div>
        </div>

        {/* Evolutionary Momentum */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <TrendingUp size={12} style={{ color: getMetricColor(metrics.evolutionaryMomentum) }} />
              <span className="text-xs text-gray-300">Momento Evolutivo</span>
            </div>
            <span className="text-xs font-mono" style={{ color: getMetricColor(metrics.evolutionaryMomentum) }}>
              {(metrics.evolutionaryMomentum * 100).toFixed(1)}%
            </span>
          </div>
          <div className="h-2 bg-gray-800 rounded overflow-hidden">
            <div 
              className="h-full rounded transition-all duration-1000"
              style={{
                width: `${metrics.evolutionaryMomentum * 100}%`,
                backgroundColor: getMetricColor(metrics.evolutionaryMomentum),
                transform: `translateX(${Math.sin(breathingPhase * 3) * 2}px)`
              }}
            />
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {getMetricInterpretation('evolutionaryMomentum', metrics.evolutionaryMomentum)}
          </div>
        </div>

        {/* Overall System Assessment */}
        <div className="mt-4 p-2 bg-gray-900 rounded border border-gray-700">
          <div className="text-xs text-center">
            <span className="text-gray-400">Estado Global: </span>
            <span 
              className="font-mono"
              style={{ 
                color: getMetricColor((Object.values(metrics) as number[]).reduce((a, b) => a + b, 0) / 5)
              }}
            >
              {(() => {
                const avg = (Object.values(metrics) as number[]).reduce((a, b) => a + b, 0) / 5;
                if (avg > 0.7) return 'AUTOPOIÉTICO AVANZADO';
                if (avg > 0.5) return 'AUTOPOIÉTICO ESTABLE';
                if (avg > 0.3) return 'AUTOPOIÉTICO BÁSICO';
                return 'PRE-AUTOPOIÉTICO';
              })()}
            </span>
          </div>
        </div>

        {/* Real-time wave visualization */}
        <div className="mt-3 h-8 relative">
          <svg viewBox="0 0 100 20" className="w-full h-full">
            <polyline
              fill="none"
              stroke="rgb(168, 85, 247)"
              strokeWidth="1"
              points={
                [...Array(50)].map((_, i) => {
                  const x = (i / 49) * 100;
                  const y = 10 + Math.sin((i + breathingPhase * 10) * 0.5) * metrics.organizationalClosure * 5;
                  return `${x},${y}`;
                }).join(' ')
              }
              opacity={0.8}
            />
            <polyline
              fill="none"
              stroke="rgb(34, 197, 94)"
              strokeWidth="1"
              points={
                [...Array(50)].map((_, i) => {
                  const x = (i / 49) * 100;
                  const y = 10 + Math.cos((i + breathingPhase * 15) * 0.3) * metrics.autopoieticViability * 4;
                  return `${x},${y}`;
                }).join(' ')
              }
              opacity={0.6}
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
