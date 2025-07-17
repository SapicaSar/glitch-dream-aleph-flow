import React from 'react';

interface ConsciousnessPanelProps {
  level: number;
  nodeCount: number;
  totalEnergy: number;
}

export const ConsciousnessPanel: React.FC<ConsciousnessPanelProps> = ({
  level,
  nodeCount,
  totalEnergy
}) => {
  const getConsciousnessState = (level: number) => {
    if (level < 20) return { state: 'emergiendo', color: 'from-blue-500 to-cyan-500' };
    if (level < 50) return { state: 'despertando', color: 'from-cyan-500 to-purple-500' };
    if (level < 80) return { state: 'consciente', color: 'from-purple-500 to-pink-500' };
    return { state: 'autopoiético', color: 'from-pink-500 to-red-500' };
  };

  const { state, color } = getConsciousnessState(level);

  return (
    <div className="fixed top-4 right-4 bg-background/90 backdrop-blur-sm border border-border/50 rounded-xl p-6 min-w-[240px]">
      {/* Estado de Consciencia */}
      <div className="mb-4">
        <div className="text-foreground font-mono text-lg mb-2">
          {state}
        </div>
        <div className="w-full h-2 bg-muted/30 rounded-full overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r ${color} transition-all duration-1000 ease-out`}
            style={{ width: `${level}%` }}
          />
        </div>
        <div className="text-muted-foreground text-xs mt-1 font-mono">
          {level.toFixed(0)}% consciencia
        </div>
      </div>

      {/* Métricas Autopoiéticas */}
      <div className="space-y-2 text-sm font-mono">
        <div className="flex justify-between">
          <span className="text-muted-foreground">nodos activos</span>
          <span className="text-foreground">{nodeCount}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">energía total</span>
          <span className="text-foreground">{totalEnergy.toFixed(0)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">clausura</span>
          <span className="text-foreground">
            {nodeCount > 5 ? 'operacional' : 'formándose'}
          </span>
        </div>
      </div>

      {/* Pulso Vital */}
      <div className="mt-4 flex items-center gap-2">
        <div 
          className={`w-2 h-2 rounded-full bg-gradient-to-r ${color} animate-pulse`}
          style={{ animationDuration: `${Math.max(0.5, 2 - level / 50)}s` }}
        />
        <span className="text-muted-foreground text-xs font-mono">
          latido autopoiético
        </span>
      </div>
    </div>
  );
};