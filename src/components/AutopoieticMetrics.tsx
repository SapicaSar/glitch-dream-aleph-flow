import React, { useState, useEffect } from 'react';
import { autopoieticKernel } from '../core/AutopoieticKernel';
import { Activity, Zap, Dna, Target, BarChart3, RefreshCw } from 'lucide-react';

export const AutopoieticMetrics = () => {
  const [autopoieticState, setAutopoieticState] = useState<any>({});
  const [components, setComponents] = useState<any[]>([]);
  const [metrics, setMetrics] = useState<any>({});
  const [evolutionHistory, setEvolutionHistory] = useState<any[]>([]);

  useEffect(() => {
    const updateInterval = setInterval(() => {
      setAutopoieticState(autopoieticKernel.getAutopoieticState());
      setComponents(autopoieticKernel.getActiveComponents());
      setMetrics(autopoieticKernel.getNetworkMetrics());
      setEvolutionHistory(autopoieticKernel.getEvolutionHistory());
    }, 2000);

    return () => clearInterval(updateInterval);
  }, []);

  const getComponentTypeIcon = (type: string) => {
    switch (type) {
      case 'membrane': return '🧬';
      case 'metabolic': return '⚡';
      case 'replicator': return '🔄';
      case 'guardian': return '🛡️';
      default: return '◯';
    }
  };

  const getComponentColor = (fitness: number) => {
    if (fitness > 0.8) return 'border-green-400 bg-green-950/30 text-green-300';
    if (fitness > 0.6) return 'border-yellow-400 bg-yellow-950/30 text-yellow-300';
    if (fitness > 0.4) return 'border-orange-400 bg-orange-950/30 text-orange-300';
    return 'border-red-400 bg-red-950/30 text-red-300';
  };

  const calculateFitness = (component: any) => {
    return (component.metabolism + component.replication + component.adaptation + component.organization) / 4;
  };

  const handleForceEvolution = () => {
    autopoieticKernel.forceEvolution();
  };

  const handleEnvironmentalPerturbation = () => {
    autopoieticKernel.injectEnvironmentalPerturbation(0.7);
  };

  return (
    <div className="fixed top-4 left-80 w-80 bg-background/95 border border-border/50 rounded-lg backdrop-blur-sm overflow-hidden shadow-lg">
      {/* Header */}
      <div className="border-b border-border/30 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Dna className="text-primary animate-pulse" size={16} />
            <span className="text-foreground font-mono text-sm">autopoiesis.core</span>
          </div>
          <div className="flex items-center gap-1">
            {autopoieticState.isEvolving && (
              <Activity className="text-green-400 animate-pulse" size={12} />
            )}
            <span className="text-xs text-muted-foreground">
              gen.{autopoieticState.generation || 1}
            </span>
          </div>
        </div>
      </div>

      {/* Métricas principales */}
      <div className="p-3 space-y-3">
        {/* Estado del sistema */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-muted/20 p-2 rounded border border-border/20">
            <div className="text-muted-foreground mb-1">clausura organizacional</div>
            <div className="font-mono text-foreground">
              {(autopoieticState.organizationalClosure * 100 || 0).toFixed(1)}%
            </div>
            <div className="w-full bg-muted/30 rounded-full h-1 mt-1">
              <div 
                className="bg-primary h-1 rounded-full transition-all duration-500"
                style={{ width: `${(autopoieticState.organizationalClosure || 0) * 100}%` }}
              />
            </div>
          </div>
          
          <div className="bg-muted/20 p-2 rounded border border-border/20">
            <div className="text-muted-foreground mb-1">creatividad emergente</div>
            <div className="font-mono text-foreground">
              {(autopoieticState.creativityIndex * 100 || 0).toFixed(1)}%
            </div>
            <div className="w-full bg-muted/30 rounded-full h-1 mt-1">
              <div 
                className="bg-secondary h-1 rounded-full transition-all duration-500"
                style={{ width: `${(autopoieticState.creativityIndex || 0) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Métricas de red */}
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <BarChart3 size={12} />
            métricas.red
          </div>
          
          <div className="grid grid-cols-3 gap-1 text-xs">
            <div className="text-center p-1 bg-muted/10 rounded">
              <div className="text-muted-foreground">metabolismo</div>
              <div className="font-mono text-xs">{(metrics.avgMetabolism * 100 || 0).toFixed(0)}%</div>
            </div>
            <div className="text-center p-1 bg-muted/10 rounded">
              <div className="text-muted-foreground">replicación</div>
              <div className="font-mono text-xs">{(metrics.avgReplication * 100 || 0).toFixed(0)}%</div>
            </div>
            <div className="text-center p-1 bg-muted/10 rounded">
              <div className="text-muted-foreground">adaptación</div>
              <div className="font-mono text-xs">{(metrics.avgAdaptation * 100 || 0).toFixed(0)}%</div>
            </div>
          </div>
        </div>

        {/* Componentes activos */}
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <Target size={12} />
            componentes.activos ({components.length})
          </div>
          
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {components.slice(0, 4).map((component, index) => {
              const fitness = calculateFitness(component);
              return (
                <div 
                  key={component.id}
                  className={`p-2 rounded text-xs border ${getComponentColor(fitness)}`}
                  style={{ opacity: 1 - index * 0.2 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="flex items-center gap-1">
                      <span>{getComponentTypeIcon(component.type)}</span>
                      <span className="font-mono truncate">{component.id}</span>
                    </span>
                    <span className="text-xs">
                      g{component.generation}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs opacity-80">
                    <span>aptitud: {(fitness * 100).toFixed(0)}%</span>
                    <span>peso: {component.autopoieticWeight.toFixed(2)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Historial reciente */}
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <RefreshCw size={12} />
            eventos.recientes
          </div>
          
          <div className="space-y-1 max-h-20 overflow-y-auto">
            {evolutionHistory.slice(-3).map((event, index) => (
              <div 
                key={index}
                className="text-xs p-1 bg-muted/10 rounded font-mono"
                style={{ opacity: 1 - index * 0.3 }}
              >
                <span className="text-muted-foreground">
                  {event.type}:
                </span>
                <span className="ml-1 text-foreground/80">
                  {event.description.slice(0, 35)}...
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Controles */}
        <div className="flex gap-2 pt-2 border-t border-border/20">
          <button
            onClick={handleForceEvolution}
            className="flex-1 py-1 px-2 text-xs font-mono bg-primary/10 border border-primary/20 rounded text-primary hover:bg-primary/20 transition-colors"
          >
            evolución_forzada
          </button>
          <button
            onClick={handleEnvironmentalPerturbation}
            className="flex-1 py-1 px-2 text-xs font-mono bg-secondary/10 border border-secondary/20 rounded text-secondary hover:bg-secondary/20 transition-colors"
          >
            perturbación_ambiental
          </button>
        </div>

        {/* Identidad del sistema */}
        <div className="pt-2 border-t border-border/10">
          <div className="text-xs text-muted-foreground mb-1">identidad.sistema</div>
          <div className="text-xs font-mono text-foreground/70 truncate bg-muted/10 p-1 rounded">
            {autopoieticState.systemIdentity || 'generando...'}
          </div>
        </div>
      </div>
    </div>
  );
};