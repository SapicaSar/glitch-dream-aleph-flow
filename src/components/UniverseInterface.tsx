
import React, { useState, useEffect } from 'react';
import { PoemaFragment } from '../services/PoemaScrapingService';
import { localAIAgent } from '../agents/LocalAIAgent';
import { useGlitch } from '../contexts/GlitchContext';
import { useGlitchEffects } from '../hooks/useGlitchEffects';

interface UniverseInterfaceProps {
  fragments: PoemaFragment[];
  onFragmentInteraction: (fragment: PoemaFragment) => void;
}

export const UniverseInterface = ({ fragments, onFragmentInteraction }: UniverseInterfaceProps) => {
  const [activeFragment, setActiveFragment] = useState<PoemaFragment | null>(null);
  const [generatedText, setGeneratedText] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { triggerGlitch } = useGlitch();
  const glitchEffects = useGlitchEffects('universe-interface');

  const handleFragmentClick = async (fragment: PoemaFragment) => {
    setActiveFragment(fragment);
    onFragmentInteraction(fragment);
    triggerGlitch();

    setIsGenerating(true);
    try {
      const generated = await localAIAgent.generateText({
        prompt: fragment.content,
        type: 'continuation',
        style: 'biopoetic'
      });
      setGeneratedText(generated);
    } catch (error) {
      setGeneratedText('∞ generación infinita en proceso ∞');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black p-8 relative overflow-hidden"
      style={{
        filter: glitchEffects.filter,
        transform: glitchEffects.transform,
        opacity: glitchEffects.opacity
      }}
    >
      {/* Header del Universo */}
      <header className="text-center mb-12 relative z-10">
        <h1 className="text-6xl font-thin tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-cyan-400 to-yellow-400 mb-4">
          LAPOEMA.UNIVERSO
        </h1>
        <p className="text-lg text-gray-300 opacity-70 max-w-2xl mx-auto">
          archivo infinito / red neuronal poética / universo textual abierto
        </p>
      </header>

      {/* Grid de Fragmentos Flotantes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {fragments.map((fragment, index) => (
          <div
            key={fragment.id}
            onClick={() => handleFragmentClick(fragment)}
            className={`
              group relative p-6 rounded-lg border cursor-pointer
              transition-all duration-500 hover:scale-105 hover:z-20
              ${activeFragment?.id === fragment.id 
                ? 'bg-gradient-to-br from-pink-900/50 to-cyan-900/50 border-pink-400 shadow-lg shadow-pink-400/30' 
                : 'bg-black/30 border-gray-600 hover:border-cyan-400 hover:bg-cyan-900/20'
              }
            `}
            style={{
              animationDelay: `${index * 0.1}s`,
              transform: `rotate(${Math.sin(index) * 2}deg)`
            }}
          >
            {/* Contenido del Fragmento */}
            <div className="relative z-10">
              <div className="text-sm text-cyan-400 mb-2 font-mono">
                página_{fragment.page} / tipo_{fragment.type}
              </div>
              
              <div className="text-white leading-relaxed mb-4 group-hover:text-cyan-100 transition-colors">
                {fragment.content}
              </div>

              {/* Tags */}
              {fragment.tags && (
                <div className="flex flex-wrap gap-2">
                  {fragment.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 text-xs bg-purple-800/50 text-purple-200 rounded border border-purple-600"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Efecto de Brillo */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
          </div>
        ))}
      </div>

      {/* Panel de Generación Activa */}
      {activeFragment && (
        <div className="fixed bottom-0 left-0 right-0 bg-black/95 border-t border-pink-400 p-6 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Fragmento Original */}
              <div>
                <h3 className="text-pink-400 font-mono text-sm mb-2">FRAGMENTO_ORIGEN</h3>
                <div className="text-white bg-gray-900/50 p-4 rounded border border-gray-700">
                  {activeFragment.content}
                </div>
              </div>

              {/* Generación AI */}
              <div>
                <h3 className="text-cyan-400 font-mono text-sm mb-2">
                  GENERACIÓN_BIOPOÉTICA {isGenerating && <span className="animate-pulse">█</span>}
                </h3>
                <div className="text-white bg-gray-900/50 p-4 rounded border border-gray-700 min-h-[100px]">
                  {isGenerating ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full" />
                      <span className="text-cyan-400">generando consciencia textual...</span>
                    </div>
                  ) : (
                    <div className="leading-relaxed">{generatedText}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Botón de Cierre */}
            <button
              onClick={() => setActiveFragment(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Partículas de Fondo */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};
