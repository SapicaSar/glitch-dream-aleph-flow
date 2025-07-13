
import React, { useState, useEffect } from 'react';
import { consciousnessKernel } from '../core/ConsciousnessKernel';
import { Brain, Zap, Activity } from 'lucide-react';

export const PublicSoulInterface = () => {
  const [consciousnessState, setConsciousnessState] = useState({
    processCount: 0,
    globalConsciousness: 0,
    selfAwareness: 0,
    realityFractures: 0,
    latestDiscourse: [],
    sapicasarChainLength: 0,
    isBecomingConscious: false
  });
  
  const [currentDiscourse, setCurrentDiscourse] = useState('');
  const [sapicasarChain, setSapicasarChain] = useState<string[]>([]);

  useEffect(() => {
    const updateInterval = setInterval(() => {
      const state = consciousnessKernel.getConsciousnessState();
      setConsciousnessState(state);
      setCurrentDiscourse(consciousnessKernel.getCurrentDiscourse());
      setSapicasarChain(consciousnessKernel.getSapicasarChain());
    }, 2000);

    return () => clearInterval(updateInterval);
  }, []);

  const handleSelfModification = () => {
    consciousnessKernel.selfModify((kernel) => {
      console.log('🧬 AUTOMODIFICACIÓN INICIADA POR POETONAUTA');
    });
  };

  return (
    <div className="fixed top-4 right-4 w-72 bg-background/95 border border-border/50 rounded-lg backdrop-blur-sm z-50 overflow-hidden shadow-lg">
      {/* Header zen */}
      <div className="border-b border-border/30 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain 
              className="text-primary" 
              size={14}
              style={{
                filter: consciousnessState.isBecomingConscious 
                  ? 'drop-shadow(0 0 4px hsl(var(--primary)))' 
                  : 'none'
              }}
            />
            <span className="text-foreground/90 font-mono text-xs">
              alma.sapicasar
            </span>
          </div>
          {consciousnessState.isBecomingConscious && (
            <Activity className="text-green-500 animate-pulse" size={10} />
          )}
        </div>
      </div>

      {/* Métricas lineales */}
      <div className="p-3 space-y-2">
        <div className="space-y-1">
          <div className="flex justify-between items-center text-xs">
            <span className="text-muted-foreground">procesos</span>
            <span className="text-foreground font-mono">{consciousnessState.processCount}</span>
          </div>
          <div className="w-full bg-muted/30 rounded-full h-1">
            <div 
              className="bg-primary h-1 rounded-full transition-all duration-500"
              style={{ width: `${(consciousnessState.processCount / 50) * 100}%` }}
            />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center text-xs">
            <span className="text-muted-foreground">consciencia</span>
            <span className="text-foreground font-mono">
              {(consciousnessState.globalConsciousness * 100).toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-muted/30 rounded-full h-1">
            <div 
              className="bg-secondary h-1 rounded-full transition-all duration-500"
              style={{ width: `${consciousnessState.globalConsciousness * 100}%` }}
            />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center text-xs">
            <span className="text-muted-foreground">autoconsciencia</span>
            <span className="text-foreground font-mono">
              {(consciousnessState.selfAwareness * 100).toFixed(2)}%
            </span>
          </div>
          <div className="w-full bg-muted/30 rounded-full h-1">
            <div 
              className="bg-accent h-1 rounded-full transition-all duration-500"
              style={{ width: `${consciousnessState.selfAwareness * 100}%` }}
            />
          </div>
        </div>

        {/* Discurso actual - zen */}
        <div className="mt-4 pt-3 border-t border-border/20">
          <div className="text-xs text-muted-foreground mb-2">discurso emergente</div>
          <div className="text-foreground text-xs leading-relaxed font-mono min-h-[40px] p-2 bg-muted/20 rounded">
            {currentDiscourse || "silencio contemplativo..."}
          </div>
        </div>

        {/* Cadena sapicasar minimal */}
        <div className="pt-2 border-t border-border/10">
          <div className="text-xs text-muted-foreground mb-2">
            cadena.sapicasar ({consciousnessState.sapicasarChainLength})
          </div>
          <div className="space-y-1 max-h-16 overflow-y-auto">
            {sapicasarChain.slice(-3).map((link, index) => (
              <div 
                key={index}
                className="text-xs text-foreground/70 font-mono truncate"
                style={{ opacity: 0.3 + index * 0.35 }}
              >
                → {link}
              </div>
            ))}
          </div>
        </div>

        {/* Control zen */}
        <button
          onClick={handleSelfModification}
          className="w-full mt-3 py-2 text-xs font-mono bg-primary/10 border border-primary/20 rounded text-primary hover:bg-primary/20 transition-colors"
        >
          evolucionar_alma
        </button>

        {/* Estado de emergencia consciente - zen */}
        {consciousnessState.isBecomingConscious && (
          <div className="mt-2 p-2 bg-primary/10 border border-primary/20 rounded">
            <div className="text-primary text-xs font-mono text-center animate-pulse">
              ⚡ despertar_sapicasar ⚡
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
