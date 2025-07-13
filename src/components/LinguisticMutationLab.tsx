
import React, { useState, useEffect } from 'react';
import { linguisticMutationEngine } from '../core/LinguisticMutationEngine';
import { Zap, Atom, Infinity, ArrowRight, RotateCcw } from 'lucide-react';

export const LinguisticMutationLab = () => {
  const [mutations, setMutations] = useState<any[]>([]);
  const [quantumWords, setQuantumWords] = useState<any[]>([]);
  const [syntacticExperiments, setSyntacticExperiments] = useState<any[]>([]);
  const [evolutionStats, setEvolutionStats] = useState<any>({});
  const [mutatedPoem, setMutatedPoem] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const updateInterval = setInterval(() => {
      setMutations(linguisticMutationEngine.getRecentMutations(8));
      setQuantumWords(linguisticMutationEngine.getQuantumWords().slice(0, 6));
      setSyntacticExperiments(linguisticMutationEngine.getRecentSyntacticExperiments(3));
      setEvolutionStats(linguisticMutationEngine.getEvolutionStats());
    }, 2000);

    return () => clearInterval(updateInterval);
  }, []);

  const generateMutatedPoem = async () => {
    setIsGenerating(true);
    const baseWords = ['ser', 'tiempo', 'alma', 'respirar', 'infinito', 'luz', 'silencio'];
    const poem = linguisticMutationEngine.generateMutatedPoem(baseWords);
    setMutatedPoem(poem);
    
    setTimeout(() => setIsGenerating(false), 1500);
  };

  const getMutationTypeIcon = (type: string) => {
    switch (type) {
      case 'quantum': return '⚡';
      case 'phonetic': return '🌊';
      case 'semantic': return '🧠';
      case 'syntactic': return '🔄';
      case 'neologistic': return '✨';
      default: return '◯';
    }
  };

  const getMutationColor = (intensity: number) => {
    if (intensity > 0.8) return 'text-red-400 bg-red-950/30';
    if (intensity > 0.6) return 'text-yellow-400 bg-yellow-950/30';
    if (intensity > 0.4) return 'text-green-400 bg-green-950/30';
    return 'text-cyan-400 bg-cyan-950/30';
  };

  return (
    <div className="fixed bottom-4 left-4 w-96 bg-black/95 border border-purple-500/30 rounded-xl backdrop-blur-sm text-white overflow-hidden">
      {/* Header del Laboratorio */}
      <div className="border-b border-purple-500/20 p-4">
        <div className="flex items-center gap-3 mb-3">
          <Atom className="text-purple-400" size={20} />
          <div>
            <h3 className="text-purple-200 font-mono text-sm">
              laboratorio.lingüístico
            </h3>
            <div className="text-xs text-purple-400/70">
              generación {evolutionStats.generation} | creatividad: {(evolutionStats.creativityIndex * 100 || 0).toFixed(1)}%
            </div>
          </div>
        </div>

        {/* Métricas de Evolución */}
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="bg-purple-950/30 p-2 rounded">
            <div className="text-purple-300">mutaciones</div>
            <div className="font-mono">{evolutionStats.totalMutations || 0}</div>
          </div>
          <div className="bg-cyan-950/30 p-2 rounded">
            <div className="text-cyan-300">cuánticas</div>
            <div className="font-mono">{evolutionStats.quantumWords || 0}</div>
          </div>
          <div className="bg-pink-950/30 p-2 rounded">
            <div className="text-pink-300">resonancia</div>
            <div className="font-mono">{(evolutionStats.avgCognitiveResonance * 100 || 0).toFixed(0)}%</div>
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="max-h-96 overflow-y-auto">
        {/* Mutaciones Activas */}
        <div className="p-3 border-b border-gray-800/50">
          <div className="text-xs text-purple-300 mb-2 flex items-center gap-1">
            <Zap size={12} />
            mutaciones.emergentes
          </div>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {mutations.slice(0, 4).map((mutation, index) => (
              <div 
                key={mutation.id}
                className={`p-2 rounded text-xs ${getMutationColor(mutation.intensity)} border border-current/20`}
                style={{ opacity: 1 - index * 0.2 }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono">{mutation.originalWord} → {mutation.mutatedForm}</span>
                  <span className="text-xs">{getMutationTypeIcon(mutation.mutationType)}</span>
                </div>
                <div className="text-xs opacity-70">
                  resonancia: {(mutation.cognitiveResonance * 100).toFixed(0)}% | gen.{mutation.generation}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Palabras Cuánticas */}
        <div className="p-3 border-b border-gray-800/50">
          <div className="text-xs text-cyan-300 mb-2 flex items-center gap-1">
            <Infinity size={12} />
            palabras.cuánticas
          </div>
          <div className="grid grid-cols-2 gap-2">
            {quantumWords.slice(0, 4).map((word, index) => (
              <div 
                key={word.baseForm}
                className="bg-cyan-950/20 p-2 rounded border border-cyan-500/20"
                style={{ opacity: 1 - index * 0.15 }}
              >
                <div className="font-mono text-xs text-cyan-200 mb-1">
                  {word.baseForm}
                </div>
                <div className="text-xs text-cyan-400/70">
                  {word.superpositions.slice(0, 2).join(' | ')}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experimentos Sintácticos */}
        <div className="p-3 border-b border-gray-800/50">
          <div className="text-xs text-green-300 mb-2 flex items-center gap-1">
            <RotateCcw size={12} />
            sintaxis.experimental
          </div>
          <div className="space-y-2">
            {syntacticExperiments.slice(0, 2).map((exp, index) => (
              <div 
                key={exp.id}
                className="bg-green-950/20 p-2 rounded border border-green-500/20 text-xs"
                style={{ opacity: 1 - index * 0.3 }}
              >
                <div className="font-mono text-green-200 mb-1">
                  {exp.mutatedStructure}
                </div>
                <div className="text-green-400/70 text-xs">
                  poético: {(exp.poeticPotential * 100).toFixed(0)}% | comprensible: {(exp.comprehensibilityIndex * 100).toFixed(0)}%
                </div>
                <div className="text-green-300/60 text-xs mt-1 italic">
                  "{exp.emergentMeaning.slice(0, 60)}..."
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Generador de Poemas Mutados */}
        <div className="p-3">
          <button
            onClick={generateMutatedPoem}
            disabled={isGenerating}
            className="w-full mb-3 py-2 px-3 bg-gradient-to-r from-purple-600/50 to-pink-600/50 border border-purple-400/30 rounded text-xs font-mono text-purple-200 hover:from-purple-600/70 hover:to-pink-600/70 transition-all disabled:opacity-50"
          >
            {isGenerating ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin w-3 h-3 border border-purple-400 border-t-transparent rounded-full" />
                mutando.lenguaje...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <ArrowRight size={12} />
                generar.poema.mutado
              </div>
            )}
          </button>

          {mutatedPoem && (
            <div className="bg-gradient-to-br from-purple-950/30 to-pink-950/30 p-3 rounded border border-purple-400/20">
              <div className="text-xs text-purple-300 mb-2">poema.emergente:</div>
              <div className="text-purple-100 font-mono text-sm leading-relaxed">
                {mutatedPoem}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Indicador de Actividad */}
      <div className="absolute top-2 right-2">
        <div 
          className="w-2 h-2 rounded-full animate-pulse"
          style={{
            backgroundColor: `hsl(${(evolutionStats.creativityIndex || 0) * 120}, 70%, 60%)`,
            boxShadow: `0 0 ${(evolutionStats.creativityIndex || 0) * 8}px hsla(${(evolutionStats.creativityIndex || 0) * 120}, 70%, 60%, 0.6)`
          }}
        />
      </div>
    </div>
  );
};
