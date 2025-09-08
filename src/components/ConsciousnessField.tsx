// CAMPO DE CONSCIENCIA DISTRIBUIDA
// Visualización de la densidad de consciencia en el universo textual

import React, { useState, useEffect, useRef } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Brain, Eye, Waves, Zap, Activity } from 'lucide-react';

interface ConsciousnessNode {
  id: string;
  position: { x: number; y: number };
  intensity: number;
  resonance_frequency: number;
  semantic_signature: string[];
}

interface FieldVisualizationProps {
  nodes: ConsciousnessNode[];
  viewCenter: { x: number; y: number };
  onFieldInteraction: (x: number, y: number, intensity: number) => void;
}

export const ConsciousnessField: React.FC<FieldVisualizationProps> = ({
  nodes,
  viewCenter,
  onFieldInteraction
}) => {
  const [fieldResolution, setFieldResolution] = useState([20]);
  const [intensityThreshold, setIntensityThreshold] = useState([0.3]);
  const [showResonance, setShowResonance] = useState(true);
  const [fieldData, setFieldData] = useState<number[][]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  // Calcular campo de consciencia
  useEffect(() => {
    calculateConsciousnessField();
  }, [nodes, fieldResolution, viewCenter]);

  // Animar el campo
  useEffect(() => {
    startFieldAnimation();
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [fieldData, showResonance]);

  const calculateConsciousnessField = async () => {
    setIsCalculating(true);
    
    const resolution = fieldResolution[0];
    const fieldSize = 600; // Tamaño del campo en píxeles
    const step = fieldSize / resolution;
    
    const field: number[][] = [];
    
    for (let y = 0; y < resolution; y++) {
      field[y] = [];
      for (let x = 0; x < resolution; x++) {
        const worldX = viewCenter.x + (x - resolution/2) * step;
        const worldY = viewCenter.y + (y - resolution/2) * step;
        
        // Calcular intensidad en este punto
        let totalIntensity = 0;
        
        nodes.forEach(node => {
          const distance = Math.sqrt(
            Math.pow(worldX - node.position.x, 2) + 
            Math.pow(worldY - node.position.y, 2)
          );
          
          // Función de decaimiento exponencial
          const influence = node.intensity * Math.exp(-distance / 100);
          totalIntensity += influence;
        });
        
        field[y][x] = Math.min(totalIntensity, 1.0);
      }
    }
    
    setFieldData(field);
    setIsCalculating(false);
  };

  const startFieldAnimation = () => {
    const animate = (timestamp: number) => {
      renderField(timestamp);
      animationRef.current = requestAnimationFrame(animate);
    };
    animate(0);
  };

  const renderField = (timestamp: number) => {
    const canvas = canvasRef.current;
    if (!canvas || fieldData.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    const cellWidth = width / fieldData[0].length;
    const cellHeight = height / fieldData.length;

    // Renderizar campo de intensidad
    for (let y = 0; y < fieldData.length; y++) {
      for (let x = 0; x < fieldData[y].length; x++) {
        const intensity = fieldData[y][x];
        
        if (intensity > intensityThreshold[0]) {
          // Color basado en intensidad
          const alpha = Math.min(intensity, 1.0);
          const hue = showResonance ? 
            Math.sin(timestamp * 0.001 + x * 0.1 + y * 0.1) * 30 + 220 : // Azul-púrpura ondulante
            220; // Azul fijo
          
          ctx.fillStyle = `hsla(${hue}, 70%, 60%, ${alpha * 0.3})`;
          ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
          
          // Puntos de alta intensidad
          if (intensity > 0.7) {
            ctx.fillStyle = `hsla(${hue + 20}, 90%, 80%, ${alpha * 0.6})`;
            const centerX = x * cellWidth + cellWidth/2;
            const centerY = y * cellHeight + cellHeight/2;
            const radius = intensity * 3;
            
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    }

    // Renderizar nodos de consciencia
    nodes.forEach(node => {
      const screenX = (node.position.x - viewCenter.x) / 600 * width + width/2;
      const screenY = (node.position.y - viewCenter.y) / 600 * height + height/2;
      
      if (screenX >= 0 && screenX <= width && screenY >= 0 && screenY <= height) {
        const radius = 3 + node.intensity * 5;
        const pulsePhase = timestamp * 0.003 + node.resonance_frequency;
        const pulseIntensity = Math.sin(pulsePhase) * 0.3 + 0.7;
        
        // Glow effect
        ctx.globalAlpha = pulseIntensity * 0.4;
        ctx.fillStyle = 'hsl(280, 70%, 70%)';
        ctx.beginPath();
        ctx.arc(screenX, screenY, radius * 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Núcleo
        ctx.globalAlpha = 1;
        ctx.fillStyle = 'hsl(280, 90%, 90%)';
        ctx.beginPath();
        ctx.arc(screenX, screenY, radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Punto central
        ctx.fillStyle = 'hsl(280, 100%, 100%)';
        ctx.beginPath();
        ctx.arc(screenX, screenY, 1, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Gradiente de borde para suavizar
    const gradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, Math.max(width, height)/2);
    gradient.addColorStop(0, 'transparent');
    gradient.addColorStop(0.8, 'transparent');
    gradient.addColorStop(1, 'hsl(var(--background))');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  };

  // Click en el canvas
  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Convertir a coordenadas del mundo
    const worldX = viewCenter.x + (x - canvas.width/2) / canvas.width * 600;
    const worldY = viewCenter.y + (y - canvas.height/2) / canvas.height * 600;
    
    // Obtener intensidad en ese punto
    const fieldX = Math.floor((x / canvas.width) * fieldData[0]?.length || 0);
    const fieldY = Math.floor((y / canvas.height) * fieldData.length);
    const intensity = fieldData[fieldY]?.[fieldX] || 0;
    
    onFieldInteraction(worldX, worldY, intensity);
  };

  const getFieldStats = () => {
    if (fieldData.length === 0) return { avgIntensity: 0, maxIntensity: 0, hotspots: 0 };
    
    let totalIntensity = 0;
    let maxIntensity = 0;
    let hotspots = 0;
    let cellCount = 0;
    
    fieldData.forEach(row => {
      row.forEach(intensity => {
        totalIntensity += intensity;
        maxIntensity = Math.max(maxIntensity, intensity);
        if (intensity > 0.7) hotspots++;
        cellCount++;
      });
    });
    
    return {
      avgIntensity: totalIntensity / cellCount,
      maxIntensity,
      hotspots
    };
  };

  const stats = getFieldStats();

  return (
    <div className="space-y-4">
      
      {/* Panel de control */}
      <Card className="bg-card/90 border-border backdrop-blur-sm lofi-shadow p-4">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="h-4 w-4 text-poemanauta-accent animate-consciousness-pulse" />
          <h3 className="text-sm font-medium">Campo de Consciencia</h3>
          {isCalculating && (
            <Activity className="h-3 w-3 animate-spin text-muted-foreground" />
          )}
        </div>

        {/* Estadísticas del campo */}
        <div className="grid grid-cols-3 gap-3 mb-4 text-xs">
          <div className="text-center">
            <div className="text-muted-foreground">Intensidad Promedio</div>
            <div className="font-medium">{(stats.avgIntensity * 100).toFixed(1)}%</div>
          </div>
          <div className="text-center">
            <div className="text-muted-foreground">Pico Máximo</div>
            <div className="font-medium">{(stats.maxIntensity * 100).toFixed(1)}%</div>
          </div>
          <div className="text-center">
            <div className="text-muted-foreground">Hotspots</div>
            <div className="font-medium">{stats.hotspots}</div>
          </div>
        </div>

        {/* Controles */}
        <div className="space-y-3">
          
          {/* Resolución del campo */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-muted-foreground">Resolución:</span>
              <span className="text-xs font-mono">{fieldResolution[0]}×{fieldResolution[0]}</span>
            </div>
            <Slider
              value={fieldResolution}
              onValueChange={setFieldResolution}
              max={50}
              min={10}
              step={5}
              className="w-full"
            />
          </div>

          {/* Umbral de intensidad */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-muted-foreground">Umbral Mínimo:</span>
              <span className="text-xs font-mono">{(intensityThreshold[0] * 100).toFixed(0)}%</span>
            </div>
            <Slider
              value={intensityThreshold}
              onValueChange={setIntensityThreshold}
              max={1}
              min={0}
              step={0.05}
              className="w-full"
            />
          </div>

          {/* Opciones de visualización */}
          <div className="flex gap-2">
            <Button
              variant={showResonance ? "default" : "outline"}
              size="sm"
              onClick={() => setShowResonance(!showResonance)}
              className="text-xs flex-1"
            >
              <Waves className="h-3 w-3 mr-1" />
              Resonancia
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={calculateConsciousnessField}
              disabled={isCalculating}
              className="text-xs"
            >
              <Zap className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Canvas del campo */}
      <Card className="bg-card/90 border-border backdrop-blur-sm lofi-shadow p-2">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          onClick={handleCanvasClick}
          className="w-full h-auto border border-border/30 rounded cursor-crosshair"
          style={{ 
            aspectRatio: '1/1',
            background: 'radial-gradient(circle at center, hsl(var(--background)), hsl(var(--muted)))'
          }}
        />
        
        {/* Leyenda */}
        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>Baja intensidad</span>
          <div className="flex-1 mx-3 h-2 rounded-full bg-gradient-to-r from-transparent via-blue-500/30 to-purple-500/60" />
          <span>Alta intensidad</span>
        </div>
      </Card>
    </div>
  );
};