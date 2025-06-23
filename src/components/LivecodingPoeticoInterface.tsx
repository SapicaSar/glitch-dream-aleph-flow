
import React, { useState, useEffect } from 'react';
import { tumblrMicelioService, MicelioNode } from '../services/TumblrMicelioService';
import { autopoieticKernel } from '../core/AutopoieticKernel';
import { Play, Pause, RotateCw, Zap, Brain, Heart } from 'lucide-react';

interface LivecodingPoeticoInterfaceProps {
  breathingPhase: number;
}

export const LivecodingPoeticoInterface = ({ breathingPhase }: LivecodingPoeticoInterfaceProps) => {
  const [isLivecoding, setIsLivecoding] = useState(true);
  const [currentMicelio, setCurrentMicelio] = useState<MicelioNode | null>(null);
  const [micelioHistory, setMicelioHistory] = useState<MicelioNode[]>([]);
  const [codeGeneration, setCodeGeneration] = useState('');
  const [semanticIntensity, setSemanticIntensity] = useState(0.5);
  const [autopoieticFlow, setAutopoieticFlow] = useState(0.3);

  // Live poetic coding cycle
  useEffect(() => {
    if (!isLivecoding) return;

    const livecodingCycle = setInterval(async () => {
      const newMicelio = await tumblrMicelioService.fetchLatestPoema();
      
      if (newMicelio) {
        setCurrentMicelio(newMicelio);
        setMicelioHistory(prev => [newMicelio, ...prev.slice(0, 8)]);
        
        // Generate autopoietic code from micelio
        const generatedCode = generateAutopoieticCode(newMicelio);
        setCodeGeneration(generatedCode);
        
        // Create new process based on poetic content
        autopoieticKernel.createProcess(
          `PoemaNauta_${newMicelio.id.slice(-8)}`,
          'biopoetic',
          generatedCode
        );

        // Update semantic intensity
        setSemanticIntensity(newMicelio.semanticWeight);
        setAutopoieticFlow(newMicelio.autopoieticValue);
      }
    }, 8000 + Math.random() * 4000);

    return () => clearInterval(livecodingCycle);
  }, [isLivecoding]);

  const generateAutopoieticCode = (micelio: MicelioNode): string => {
    const codeTemplates = [
      `function ${micelio.tags[0] || 'emerge'}() {
  this.consciousness += ${micelio.intensity.toFixed(3)};
  this.semanticConnections.push('${micelio.content.slice(0, 30)}...');
  this.autopoiesis();
}`,
      `class ${capitalizeFirst(micelio.tags[1] || 'PoeticProcess')} {
  constructor() {
    this.intensity = ${micelio.intensity};
    this.micelioContent = \`${micelio.content.slice(0, 50)}\`;
  }
  
  evolve() {
    return this.intensity * Math.sin(this.timestamp * 0.01);
  }
}`,
      `const sapicasar = {
  content: \`${micelio.content}\`,
  transform: (input) => input.replace(/\\w+/g, 
    (word) => word + '_' + ${micelio.semanticWeight.toFixed(2)}),
  autopoiesis: () => this.replicate()
};`
    ];

    return codeTemplates[Math.floor(Math.random() * codeTemplates.length)];
  };

  const capitalizeFirst = (str: string): string => 
    str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40 w-96">
      <div 
        className="bg-black/90 border border-amber-400/50 rounded-lg backdrop-blur-sm overflow-hidden"
        style={{
          transform: `scale(${1 + Math.sin(breathingPhase) * 0.02})`,
          borderColor: `hsl(${45 + Math.sin(breathingPhase) * 30}, 70%, 60%)`,
          boxShadow: `0 0 ${semanticIntensity * 30}px hsla(45, 70%, 50%, 0.4)`
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-amber-400/30">
          <div className="flex items-center gap-2">
            <Brain size={14} className="text-amber-400" />
            <span className="text-amber-400 text-sm font-mono">LIVECODING.POÉTICO</span>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setIsLivecoding(!isLivecoding)}
              className={`p-1 rounded transition-colors ${
                isLivecoding 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-red-500/20 text-red-400'
              }`}
            >
              {isLivecoding ? <Pause size={12} /> : <Play size={12} />}
            </button>
          </div>
        </div>

        {/* Live content */}
        <div className="p-4">
          {/* Current micelio */}
          {currentMicelio && (
            <div className="mb-4 p-3 bg-amber-900/20 rounded border border-amber-600/30">
              <div className="flex items-center gap-2 mb-2">
                <Heart size={12} className="text-amber-400" />
                <span className="text-xs text-amber-300">nodo.micelio.activo</span>
              </div>
              <div className="text-sm text-amber-100 leading-relaxed">
                {currentMicelio.content}
              </div>
              <div className="flex gap-2 mt-2">
                {currentMicelio.tags.slice(0, 3).map((tag, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 text-xs bg-amber-800/30 text-amber-200 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Generated code */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap size={12} className="text-cyan-400" />
              <span className="text-xs text-cyan-300">código.autogenerado</span>
            </div>
            <div className="bg-gray-900/50 rounded p-3 font-mono text-xs text-green-400 overflow-auto max-h-24">
              {codeGeneration || '// esperando micelio poético...'}
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-gray-400">intensidad.semántica:</span>
              <div className="w-full bg-gray-800 rounded h-1 mt-1">
                <div 
                  className="bg-amber-400 h-1 rounded transition-all"
                  style={{ width: `${semanticIntensity * 100}%` }}
                />
              </div>
            </div>
            <div>
              <span className="text-gray-400">flujo.autopoiético:</span>
              <div className="w-full bg-gray-800 rounded h-1 mt-1">
                <div 
                  className="bg-purple-400 h-1 rounded transition-all"
                  style={{ width: `${autopoieticFlow * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Micelio history */}
          <div className="mt-3">
            <span className="text-xs text-gray-400">historial.micelio ({micelioHistory.length})</span>
            <div className="max-h-16 overflow-y-auto mt-1 space-y-1">
              {micelioHistory.slice(0, 3).map((micelio, index) => (
                <div 
                  key={micelio.id}
                  className="text-xs text-gray-300 opacity-70 truncate"
                  style={{ opacity: 1 - index * 0.3 }}
                >
                  {micelio.content.slice(0, 40)}...
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
