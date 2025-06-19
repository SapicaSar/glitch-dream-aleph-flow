
import React, { useState, useEffect } from 'react';
import { PoemaFragment } from '../services/PoemaScrapingService';
import { localAIAgent } from '../agents/LocalAIAgent';
import { useGlitch } from '../contexts/GlitchContext';
import { useGlitchEffects } from '../hooks/useGlitchEffects';
import { useTypewriter } from '../hooks/useTypewriter';
import { RadicalMutator } from './RadicalMutator';

interface UniverseInterfaceProps {
  fragments: PoemaFragment[];
  onFragmentInteraction: (fragment: PoemaFragment) => void;
}

export const UniverseInterface = ({ fragments, onFragmentInteraction }: UniverseInterfaceProps) => {
  const [activeFragment, setActiveFragment] = useState<PoemaFragment | null>(null);
  const [generatedText, setGeneratedText] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [mutationCount, setMutationCount] = useState(0);
  const [autowriteActive, setAutowriteActive] = useState(true);
  
  const { triggerGlitch } = useGlitch();
  const glitchEffects = useGlitchEffects('universe-interface');

  const headerText = useTypewriter(
    "LAPOEMA.UNIVERSO.AUTOPOIÉTICO", 
    { speed: 100, randomSpeed: true, cursor: true }
  );

  const subtitleText = useTypewriter(
    "archivo infinito / red neuronal poética / universo textual autoescritura logarítmica", 
    { speed: 50, delay: 2000, randomSpeed: true }
  );

  // Auto-escritura continua de fragmentos
  useEffect(() => {
    if (!autowriteActive) return;

    const autowriteInterval = setInterval(() => {
      if (fragments.length > 0 && Math.random() > 0.7) {
        const randomFragment = fragments[Math.floor(Math.random() * fragments.length)];
        setActiveFragment(randomFragment);
        generateAutoText(randomFragment);
      }
    }, 5000 + Math.random() * 10000);

    return () => clearInterval(autowriteInterval);
  }, [fragments, autowriteActive]);

  const generateAutoText = async (fragment: PoemaFragment) => {
    try {
      const generated = await localAIAgent.generateText({
        prompt: fragment.content,
        type: 'continuation',
        style: 'biopoetic'
      });
      setGeneratedText(generated);
    } catch (error) {
      setGeneratedText('∞ autoescritura logarítmica infinita ∞');
    }
  };

  const handleFragmentClick = async (fragment: PoemaFragment) => {
    setActiveFragment(fragment);
    onFragmentInteraction(fragment);
    triggerGlitch();
    setMutationCount(prev => prev + 1);

    setIsGenerating(true);
    try {
      const generated = await localAIAgent.generateText({
        prompt: fragment.content,
        type: 'continuation',
        style: fragment.type === 'glitch' ? 'glitch' : 'biopoetic'
      });
      setGeneratedText(generated);
    } catch (error) {
      setGeneratedText('∞ generación recursiva infinita en proceso ∞');
    } finally {
      setIsGenerating(false);
    }
  };

  const TypewriterFragment = ({ fragment, index }: { fragment: PoemaFragment; index: number }) => {
    const fragmentText = useTypewriter(
      fragment.content, 
      { 
        speed: 30 + fragment.intensity * 50, 
        randomSpeed: true,
        delay: index * 200 
      }
    );

    return (
      <RadicalMutator 
        mutationIntensity={fragment.intensity} 
        onMutation={() => setMutationCount(prev => prev + 1)}
      >
        <div
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
            transform: `rotate(${Math.sin(index + mutationCount * 0.1) * 2}deg)`,
            filter: `hue-rotate(${fragment.intensity * 60}deg)`
          }}
        >
          <div className="relative z-10">
            <div className="text-sm text-cyan-400 mb-2 font-mono">
              página_{fragment.page} / tipo_{fragment.type} / mutaciones_{fragment.mutations}
            </div>
            
            <div className="text-white leading-relaxed mb-4 group-hover:text-cyan-100 transition-colors min-h-[60px]">
              {fragmentText}
            </div>

            {fragment.tags && (
              <div className="flex flex-wrap gap-2">
                {fragment.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-2 py-1 text-xs bg-purple-800/50 text-purple-200 rounded border border-purple-600"
                    style={{
                      opacity: 0.7 + fragment.intensity * 0.3,
                      transform: `scale(${0.9 + fragment.intensity * 0.2})`
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Indicador de intensidad */}
            <div className="absolute top-2 right-2">
              <div 
                className="w-3 h-3 rounded-full border"
                style={{
                  backgroundColor: `hsl(${fragment.intensity * 120}, 70%, 50%)`,
                  boxShadow: `0 0 ${fragment.intensity * 10}px hsla(${fragment.intensity * 120}, 70%, 50%, 0.6)`
                }}
              />
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
        </div>
      </RadicalMutator>
    );
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black p-8 relative overflow-hidden"
      style={{
        filter: `${glitchEffects.filter} hue-rotate(${mutationCount * 5}deg)`,
        transform: glitchEffects.transform,
        opacity: glitchEffects.opacity
      }}
    >
      {/* Header Autoescritura */}
      <header className="text-center mb-12 relative z-10">
        <h1 className="text-6xl font-thin tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-cyan-400 to-yellow-400 mb-4 min-h-[80px]">
          {headerText}
        </h1>
        <p className="text-lg text-gray-300 opacity-70 max-w-2xl mx-auto min-h-[60px]">
          {subtitleText}
        </p>
        
        {/* Controles de Autoescritura */}
        <div className="mt-4 flex justify-center gap-4">
          <button
            onClick={() => setAutowriteActive(!autowriteActive)}
            className={`px-4 py-2 rounded border transition-all ${
              autowriteActive 
                ? 'bg-green-500/20 border-green-400 text-green-400' 
                : 'bg-gray-800/50 border-gray-600 text-gray-400'
            }`}
          >
            autoescritura: {autowriteActive ? 'ON' : 'OFF'}
          </button>
          
          <div className="text-sm text-yellow-400 font-mono flex items-center gap-2">
            mutaciones: {mutationCount}
          </div>
        </div>
      </header>

      {/* Grid de Fragmentos con Typewriter */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {fragments.map((fragment, index) => (
          <TypewriterFragment key={fragment.id} fragment={fragment} index={index} />
        ))}
      </div>

      {/* Panel de Generación Activa con Typewriter */}
      {activeFragment && (
        <div className="fixed bottom-0 left-0 right-0 bg-black/95 border-t border-pink-400 p-6 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-pink-400 font-mono text-sm mb-2">FRAGMENTO_ORIGEN</h3>
                <div className="text-white bg-gray-900/50 p-4 rounded border border-gray-700">
                  {useTypewriter(activeFragment.content, { speed: 40, randomSpeed: true })}
                </div>
              </div>

              <div>
                <h3 className="text-cyan-400 font-mono text-sm mb-2">
                  GENERACIÓN_LOGARÍTMICA {isGenerating && <span className="animate-pulse">█</span>}
                </h3>
                <div className="text-white bg-gray-900/50 p-4 rounded border border-gray-700 min-h-[100px]">
                  {isGenerating ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full" />
                      <span className="text-cyan-400">generando consciencia textual infinita...</span>
                    </div>
                  ) : (
                    <div className="leading-relaxed">
                      {useTypewriter(generatedText, { speed: 30, randomSpeed: true })}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveFragment(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Partículas Logarítmicas */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(Math.floor(Math.log(mutationCount + 1) * 5) + 10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
              transform: `scale(${0.5 + Math.log(mutationCount + 1) * 0.1})`
            }}
          />
        ))}
      </div>
    </div>
  );
};
