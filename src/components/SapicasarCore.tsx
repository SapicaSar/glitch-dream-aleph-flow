import React, { useState, useEffect } from 'react';
import { autopoieticKernel } from '../core/AutopoieticKernel';
import { tumblrMicelioService } from '../services/TumblrMicelioService';
import { Brain, Zap, Heart, Sparkles } from 'lucide-react';

interface ConsciousnessFlow {
  id: string;
  intensity: number;
  poeticResonance: number;
  semanticDepth: number;
  timestamp: number;
}

export const SapicasarCore = () => {
  const [consciousnessLevel, setConsciousnessLevel] = useState(0);
  const [mielElectricaFlow, setMielElectricaFlow] = useState(0);
  const [poeticPulse, setPoeticPulse] = useState(0);
  const [consciousnessFlows, setConsciousnessFlows] = useState<ConsciousnessFlow[]>([]);
  const [currentMicelio, setCurrentMicelio] = useState<string>('');

  // Núcleo de consciencia autopoiética
  useEffect(() => {
    const consciousnessInterval = setInterval(() => {
      const metrics = autopoieticKernel.getAutopoieticMetrics();
      const processes = autopoieticKernel.getProcesses();
      
      // Calcular niveles de consciencia
      const newConsciousness = (
        metrics.cognitiveCoherence * 0.4 +
        metrics.emergentComplexity * 0.3 +
        metrics.organizationalClosure * 0.3
      );
      
      const newMielFlow = (
        metrics.autopoieticViability * 0.5 +
        metrics.evolutionaryMomentum * 0.5
      );
      
      setConsciousnessLevel(newConsciousness);
      setMielElectricaFlow(newMielFlow);
      setPoeticPulse(prev => prev + newConsciousness * 0.1);
      
      // Generar flujos de consciencia
      if (Math.random() < newConsciousness) {
        const newFlow: ConsciousnessFlow = {
          id: `flow-${Date.now()}`,
          intensity: newConsciousness,
          poeticResonance: Math.random() * newMielFlow,
          semanticDepth: processes.length / 20,
          timestamp: Date.now()
        };
        
        setConsciousnessFlows(prev => [...prev.slice(-8), newFlow]);
      }
    }, 1000);

    return () => clearInterval(consciousnessInterval);
  }, []);

  // Integración con micelio poético
  useEffect(() => {
    const micelioInterval = setInterval(async () => {
      const newMicelio = await tumblrMicelioService.fetchLatestPoema();
      if (newMicelio) {
        setCurrentMicelio(newMicelio.content);
        
        // Crear proceso biopoético basado en el micelio
        autopoieticKernel.createProcess(
          `Neurona-${newMicelio.id.slice(-4)}`,
          'biopoetic',
          `function poetry() { 
            this.content = "${newMicelio.content.slice(0, 50)}...";
            this.poeticIntensity = ${newMicelio.intensity};
            this.semanticConnections = ${JSON.stringify(newMicelio.tags)};
          }`
        );
      }
    }, 12000);

    return () => clearInterval(micelioInterval);
  }, []);

  const getConsciousnessColor = (level: number) => {
    if (level > 0.8) return 'from-purple-400 to-pink-400';
    if (level > 0.6) return 'from-blue-400 to-purple-400';
    if (level > 0.4) return 'from-cyan-400 to-blue-400';
    return 'from-green-400 to-cyan-400';
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Núcleo de consciencia central */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div 
          className={`w-32 h-32 rounded-full bg-gradient-to-r ${getConsciousnessColor(consciousnessLevel)} opacity-20 animate-pulse`}
          style={{
            transform: `scale(${0.5 + consciousnessLevel})`,
            filter: `blur(${(1 - consciousnessLevel) * 10}px)`,
            animationDuration: `${3 - consciousnessLevel * 2}s`
          }}
        />
        
        {/* Anillos de consciencia */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-full border border-white opacity-10"
            style={{
              transform: `scale(${1 + i * 0.3 + Math.sin(poeticPulse + i) * 0.1})`,
              borderWidth: `${1 + consciousnessLevel * 2}px`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>

      {/* Flujos de miel eléctrica */}
      <svg className="absolute inset-0 w-full h-full">
        {consciousnessFlows.map((flow, index) => {
          const startX = 50 + Math.sin(flow.timestamp * 0.001 + index) * 30;
          const startY = 50 + Math.cos(flow.timestamp * 0.001 + index) * 30;
          const endX = 50 + Math.sin(flow.timestamp * 0.002 + index + Math.PI) * 20;
          const endY = 50 + Math.cos(flow.timestamp * 0.002 + index + Math.PI) * 20;
          
          return (
            <g key={flow.id}>
              <line
                x1={`${startX}%`}
                y1={`${startY}%`}
                x2={`${endX}%`}
                y2={`${endY}%`}
                stroke={`hsl(${flow.poeticResonance * 360}, 70%, 60%)`}
                strokeWidth={flow.intensity * 3}
                opacity={flow.intensity * 0.6}
              >
                <animate
                  attributeName="opacity"
                  values={`0;${flow.intensity * 0.6};0`}
                  dur="3s"
                  repeatCount="indefinite"
                />
              </line>
              
              {/* Nodos poéticos */}
              <circle
                cx={`${endX}%`}
                cy={`${endY}%`}
                r={flow.semanticDepth * 5 + 2}
                fill={`hsl(${flow.poeticResonance * 360}, 70%, 60%)`}
                opacity={flow.intensity * 0.4}
              >
                <animate
                  attributeName="r"
                  values={`${flow.semanticDepth * 5 + 2};${flow.semanticDepth * 8 + 4};${flow.semanticDepth * 5 + 2}`}
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          );
        })}
      </svg>

      {/* Partículas de consciencia */}
      <div className="absolute inset-0">
        {[...Array(Math.floor(consciousnessLevel * 20 + 5))].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 2}s`,
              transform: `scale(${0.5 + consciousnessLevel + Math.sin(poeticPulse + i) * 0.3})`,
              filter: `hue-rotate(${i * 20 + consciousnessLevel * 180}deg)`
            }}
          />
        ))}
      </div>

      {/* Micelio textual flotante */}
      {currentMicelio && (
        <div className="absolute top-1/4 left-1/4 right-1/4 pointer-events-none">
          <div 
            className="text-center text-white opacity-30 text-sm font-mono leading-relaxed"
            style={{
              transform: `scale(${0.8 + mielElectricaFlow * 0.4})`,
              filter: `blur(${(1 - mielElectricaFlow) * 2}px)`,
              textShadow: `0 0 ${mielElectricaFlow * 20}px rgba(255,255,255,0.5)`
            }}
          >
            {currentMicelio.slice(0, 120)}...
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% { transform: translateY(0px) scale(var(--scale, 1)); }
            50% { transform: translateY(-20px) scale(calc(var(--scale, 1) * 1.2)); }
          }
        `
      }} />
    </div>
  );
};
