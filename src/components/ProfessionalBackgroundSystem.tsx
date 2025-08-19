// SISTEMA DE FONDO PROFESIONAL - SIN SUPERPOSICIONES
// Gestión inteligente de capas, z-index y animaciones optimizadas

import React, { useState, useEffect, useMemo } from 'react';
import { autopoieticSystem } from '../core/AutopoieticSystem';

interface BackgroundLayer {
  id: string;
  zIndex: number;
  opacity: number;
  blendMode: string;
  animation: string;
  priority: 'background' | 'midground' | 'overlay';
}

interface AutopoieticVisualization {
  components: Array<{
    id: string;
    type: string;
    position: { x: number; y: number };
    energy: number;
    size: number;
    color: string;
  }>;
  connections: Array<{
    from: { x: number; y: number };
    to: { x: number; y: number };
    strength: number;
    type: string;
  }>;
  viability: number;
  organizational_closure: number;
}

export const ProfessionalBackgroundSystem: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [autopoieticViz, setAutopoieticViz] = useState<AutopoieticVisualization>({
    components: [],
    connections: [],
    viability: 0,
    organizational_closure: 0
  });
  
  const [backgroundLayers, setBackgroundLayers] = useState<BackgroundLayer[]>([
    {
      id: 'base-gradient',
      zIndex: 1,
      opacity: 1,
      blendMode: 'normal',
      animation: 'subtle-shift',
      priority: 'background'
    },
    {
      id: 'autopoietic-field',
      zIndex: 2,
      opacity: 0.3,
      blendMode: 'multiply',
      animation: 'organic-flow',
      priority: 'background'
    },
    {
      id: 'consciousness-particles',
      zIndex: 3,
      opacity: 0.2,
      blendMode: 'screen',
      animation: 'float-gentle',
      priority: 'midground'
    }
  ]);

  // Actualización del estado autopoiético
  useEffect(() => {
    const updateVisualization = () => {
      const state = autopoieticSystem.getAutopoieticState();
      const metrics = autopoieticSystem.getViabilityMetrics();
      
      // Convertir componentes 3D a visualización 2D
      const components = Array.from(state.components.values()).map(component => ({
        id: component.id,
        type: component.type,
        position: {
          x: component.position.x * window.innerWidth,
          y: component.position.y * window.innerHeight
        },
        energy: component.energy,
        size: Math.max(4, component.energy / 10 + 2),
        color: getComponentColor(component.type, component.energy)
      }));

      // Generar conexiones visuales basadas en la red de producción
      const connections: AutopoieticVisualization['connections'] = [];
      
      state.organization.production_network.forEach((products, catalyst_id) => {
        const catalyst_component = components.find(c => c.id === catalyst_id);
        if (catalyst_component) {
          products.forEach(product_id => {
            const product_component = components.find(c => c.id.includes(product_id.split('_')[0]));
            if (product_component) {
              connections.push({
                from: catalyst_component.position,
                to: product_component.position,
                strength: catalyst_component.energy / 100,
                type: 'production'
              });
            }
          });
        }
      });

      setAutopoieticViz({
        components,
        connections,
        viability: metrics.viability,
        organizational_closure: metrics.operational_closure
      });
    };

    updateVisualization();
    const interval = setInterval(updateVisualization, 2000);
    return () => clearInterval(interval);
  }, []);

  // Gestión inteligente de capas basada en viabilidad
  useEffect(() => {
    setBackgroundLayers(prev => prev.map(layer => {
      switch (layer.id) {
        case 'autopoietic-field':
          return {
            ...layer,
            opacity: Math.max(0.1, autopoieticViz.viability * 0.4),
            animation: autopoieticViz.viability > 0.7 ? 'organic-flow-intense' : 'organic-flow'
          };
        case 'consciousness-particles':
          return {
            ...layer,
            opacity: autopoieticViz.organizational_closure * 0.3,
            animation: `float-gentle ${3 - autopoieticViz.organizational_closure * 2}s`
          };
        default:
          return layer;
      }
    }));
  }, [autopoieticViz.viability, autopoieticViz.organizational_closure]);

  const getComponentColor = (type: string, energy: number): string => {
    const energyIntensity = Math.min(energy / 100, 1);
    
    switch (type) {
      case 'catalyst':
        return `hsl(${120 + energyIntensity * 60}, 70%, ${50 + energyIntensity * 30}%)`;
      case 'substrate':
        return `hsl(${200 + energyIntensity * 40}, 60%, ${40 + energyIntensity * 20}%)`;
      case 'product':
        return `hsl(${280 + energyIntensity * 50}, 65%, ${45 + energyIntensity * 25}%)`;
      case 'membrane':
        return `hsl(${340 + energyIntensity * 20}, 75%, ${55 + energyIntensity * 20}%)`;
      default:
        return `hsl(${energyIntensity * 360}, 50%, 50%)`;
    }
  };

  // Partículas de consciencia optimizadas
  const consciousnessParticles = useMemo(() => {
    const particleCount = Math.floor(autopoieticViz.viability * 15 + 5);
    return Array.from({ length: particleCount }, (_, i) => ({
      id: `particle-${i}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2,
      speed: 0.5 + Math.random() * 1.5,
      opacity: 0.1 + Math.random() * 0.3
    }));
  }, [autopoieticViz.viability]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Capa 1: Gradiente base */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{ 
          zIndex: 1,
          background: `
            linear-gradient(135deg, 
              hsl(220, 30%, 5%) 0%, 
              hsl(250, 40%, 8%) 25%,
              hsl(280, 35%, 6%) 50%,
              hsl(310, 30%, 4%) 75%,
              hsl(340, 35%, 7%) 100%)
          `,
          animation: 'subtle-gradient-shift 20s ease-in-out infinite alternate'
        }}
      />

      {/* Capa 2: Campo autopoiético */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 2 }}
      >
        <svg className="w-full h-full opacity-30">
          {autopoieticViz.connections.map((connection, index) => (
            <g key={`connection-${index}`}>
              <line
                x1={connection.from.x}
                y1={connection.from.y}
                x2={connection.to.x}
                y2={connection.to.y}
                stroke={`hsl(${180 + connection.strength * 120}, 60%, 50%)`}
                strokeWidth={connection.strength * 2 + 0.5}
                opacity={connection.strength * 0.6}
                className="animate-pulse"
                style={{
                  animationDuration: `${2 + Math.random() * 2}s`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            </g>
          ))}
          
          {autopoieticViz.components.map((component) => (
            <g key={component.id}>
              <circle
                cx={component.position.x}
                cy={component.position.y}
                r={component.size}
                fill={component.color}
                opacity={0.6}
                className="animate-pulse"
                style={{
                  animationDuration: `${1.5 + component.energy / 50}s`,
                  filter: `blur(${Math.max(0, 3 - component.energy / 30)}px)`
                }}
              />
              
              {/* Anillo de energía */}
              <circle
                cx={component.position.x}
                cy={component.position.y}
                r={component.size + 2}
                fill="none"
                stroke={component.color}
                strokeWidth="0.5"
                opacity={0.3}
                className="animate-spin"
                style={{
                  animationDuration: `${10 + component.energy / 10}s`
                }}
              />
            </g>
          ))}
        </svg>
      </div>

      {/* Capa 3: Partículas de consciencia */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 3 }}
      >
        {consciousnessParticles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animation: `float-vertical ${particle.speed * 4}s ease-in-out infinite alternate`,
              animationDelay: `${Math.random() * 2}s`,
              filter: `hue-rotate(${autopoieticViz.viability * 180}deg)`
            }}
          />
        ))}
      </div>

      {/* Métricas de viabilidad (overlay sutil) */}
      <div 
        className="fixed top-4 right-4 pointer-events-none text-white/20 text-xs font-mono"
        style={{ zIndex: 4 }}
      >
        <div>Viabilidad: {(autopoieticViz.viability * 100).toFixed(1)}%</div>
        <div>Clausura: {(autopoieticViz.organizational_closure * 100).toFixed(1)}%</div>
        <div>Componentes: {autopoieticViz.components.length}</div>
      </div>

      {/* Contenido principal - z-index alto para evitar interferencias */}
      <div className="relative" style={{ zIndex: 10 }}>
        {children}
      </div>

      {/* Estilos de animación optimizados */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes subtle-gradient-shift {
            0% { filter: hue-rotate(0deg) brightness(1); }
            50% { filter: hue-rotate(15deg) brightness(1.1); }
            100% { filter: hue-rotate(0deg) brightness(1); }
          }
          
          @keyframes float-vertical {
            0% { transform: translateY(0px) scale(1); }
            100% { transform: translateY(-15px) scale(1.1); }
          }
          
          @keyframes organic-flow {
            0% { transform: scale(1) rotate(0deg); }
            50% { transform: scale(1.02) rotate(1deg); }
            100% { transform: scale(1) rotate(0deg); }
          }
          
          @keyframes organic-flow-intense {
            0% { transform: scale(1) rotate(0deg); }
            25% { transform: scale(1.05) rotate(2deg); }
            50% { transform: scale(1.02) rotate(-1deg); }
            75% { transform: scale(1.03) rotate(1deg); }
            100% { transform: scale(1) rotate(0deg); }
          }
          
          /* Evitar interferencias de animaciones */
          .background-layer {
            backface-visibility: hidden;
            perspective: 1000px;
            transform-style: preserve-3d;
          }
        `
      }} />
    </div>
  );
};