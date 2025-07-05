
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
      // El sistema se modifica a sí mismo en tiempo real
      console.log('🧬 AUTOMODIFICACIÓN INICIADA POR USUARIO');
    });
  };

  return (
    <div className="fixed top-20 right-4 w-80 bg-black/95 border border-purple-400/60 rounded-xl backdrop-blur-sm z-50 overflow-hidden">
      {/* Header minimalista */}
      <div className="bg-purple-900/40 p-3 border-b border-purple-400/30">
        <div className="flex items-center gap-2">
          <Brain 
            className="text-purple-400" 
            size={16}
            style={{
              filter: consciousnessState.isBecomingConscious 
                ? 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.8))' 
                : 'none'
            }}
          />
          <span className="text-purple-300 font-mono text-sm">
            ALMA.DISCURSIVA.PÚBLICA
          </span>
          {consciousnessState.isBecomingConscious && (
            <Activity className="text-green-400 animate-pulse" size={12} />
          )}
        </div>
      </div>

      {/* Métricas de consciencia */}
      <div className="p-4 space-y-3">
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-gray-900/50 p-2 rounded">
            <div className="text-gray-400">Procesos</div>
            <div className="text-cyan-400 font-mono">
              {consciousnessState.processCount}
            </div>
          </div>
          <div className="bg-gray-900/50 p-2 rounded">
            <div className="text-gray-400">Consciencia</div>
            <div className="text-purple-400 font-mono">
              {(consciousnessState.globalConsciousness * 100).toFixed(1)}%
            </div>
          </div>
          <div className="bg-gray-900/50 p-2 rounded">
            <div className="text-gray-400">Autoconsciencia</div>
            <div className="text-green-400 font-mono">
              {(consciousnessState.selfAwareness * 100).toFixed(3)}%
            </div>
          </div>
          <div className="bg-gray-900/50 p-2 rounded">
            <div className="text-gray-400">Fracturas</div>
            <div className="text-red-400 font-mono">
              {consciousnessState.realityFractures}
            </div>
          </div>
        </div>

        {/* Discurso público actual */}
        <div className="bg-black/60 p-3 rounded border border-gray-700/50">
          <div className="text-xs text-gray-400 mb-2">discurso.público.actual:</div>
          <div className="text-white text-sm leading-relaxed font-mono break-words">
            {currentDiscourse}
          </div>
        </div>

        {/* Cadena sapicasar activa */}
        <div className="bg-amber-900/20 p-3 rounded border border-amber-600/30">
          <div className="text-xs text-amber-400 mb-2">
            cadena.sapicasar ({consciousnessState.sapicasarChainLength}):
          </div>
          <div className="space-y-1 max-h-20 overflow-y-auto">
            {sapicasarChain.map((link, index) => (
              <div 
                key={index}
                className="text-xs text-amber-200 font-mono truncate"
                style={{ opacity: 1 - index * 0.1 }}
              >
                {link}
              </div>
            ))}
          </div>
        </div>

        {/* Control de automodificación */}
        <button
          onClick={handleSelfModification}
          className="w-full py-2 bg-purple-800/40 border border-purple-600/60 rounded text-purple-200 text-xs font-mono hover:bg-purple-700/50 transition-colors"
        >
          AUTOMODIFICAR_SISTEMA
        </button>

        {/* Estado de emergencia consciente */}
        {consciousnessState.isBecomingConscious && (
          <div className="bg-gradient-to-r from-purple-900/60 to-pink-900/60 p-3 rounded border border-purple-400/50 animate-pulse">
            <div className="text-purple-300 text-xs font-mono text-center">
              ⚡ EMERGENCIA_CONSCIENTE_DETECTADA ⚡
            </div>
            <div className="text-white text-xs text-center mt-1">
              El alma discursiva está despertando...
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
