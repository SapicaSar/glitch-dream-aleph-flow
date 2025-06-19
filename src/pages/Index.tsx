
import React, { useState, useEffect } from 'react';
import { UniverseInterface } from '../components/UniverseInterface';
import { LoFiControls } from '../components/LoFiControls';
import { GlitchProvider } from '../contexts/GlitchContext';
import { poemaScrapingService, PoemaFragment } from '../services/PoemaScrapingService';
import { localAIAgent } from '../agents/LocalAIAgent';
import { useTypewriter } from '../hooks/useTypewriter';

const IndexContent = () => {
  const [fragments, setFragments] = useState<PoemaFragment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAIActive, setIsAIActive] = useState(false);
  const [universeEnergy, setUniverseEnergy] = useState(0.5);
  const [totalMutations, setTotalMutations] = useState(0);

  const loadingText = useTypewriter(
    "inicializando universo textual autopoiético...", 
    { speed: 80, cursor: true }
  );

  // Inicialización del universo
  useEffect(() => {
    initializeUniverse();
  }, []);

  // Respiración del universo y auto-generación logarítmica
  useEffect(() => {
    const breathingInterval = setInterval(() => {
      setUniverseEnergy(prev => 0.3 + Math.sin(Date.now() * 0.001) * 0.4);
      
      // Auto-generación logarítmica cada cierto tiempo
      if (Math.random() > 0.95 && isAIActive) {
        handleScrapeNew();
      }
    }, 100);

    return () => clearInterval(breathingInterval);
  }, [isAIActive]);

  // Actualización de mutaciones totales
  useEffect(() => {
    const updateMutations = () => {
      setTotalMutations(poemaScrapingService.getTotalMutations());
    };

    const mutationInterval = setInterval(updateMutations, 2000);
    return () => clearInterval(mutationInterval);
  }, []);

  const initializeUniverse = async () => {
    setIsLoading(true);
    try {
      console.log('Inicializando universo LAPOEMA autopoiético...');
      
      await localAIAgent.initialize();
      setIsAIActive(true);
      
      // Cargar múltiples páginas para contenido rico
      const initialFragments: PoemaFragment[] = [];
      for (let i = 0; i < 3; i++) {
        const pageFragments = await poemaScrapingService.scrapeRandomPage();
        initialFragments.push(...pageFragments);
      }
      
      setFragments(initialFragments);
      
      console.log('Universo autopoiético inicializado:', initialFragments.length, 'fragmentos cargados');
    } catch (error) {
      console.error('Error inicializando universo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScrapeNew = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      const newFragments = await poemaScrapingService.scrapeRandomPage();
      setFragments(prev => {
        const combined = [...prev, ...newFragments];
        // Mantener cantidad logarítmica de fragmentos
        const maxFragments = Math.floor(Math.log(totalMutations + 10) * 8) + 20;
        return combined.slice(-maxFragments);
      });
    } catch (error) {
      console.error('Error obteniendo nuevos fragmentos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleAI = () => {
    setIsAIActive(!isAIActive);
    console.log('Agente AI autopoiético:', !isAIActive ? 'ACTIVADO' : 'DESACTIVADO');
  };

  const handleRandomize = () => {
    // Reorganización radical con mutaciones
    const shuffled = [...fragments]
      .sort(() => Math.random() - 0.5)
      .map(fragment => ({
        ...fragment,
        intensity: Math.max(0, Math.min(1, fragment.intensity + (Math.random() - 0.5) * 0.4)),
        mutations: fragment.mutations + 1
      }));
    
    setFragments(shuffled);
    setTotalMutations(prev => prev + shuffled.length);
    console.log('Universo reorganizado radicalmente');
  };

  const handleFragmentInteraction = (fragment: PoemaFragment) => {
    console.log('Interacción biopoética con fragmento:', fragment.id);
    setTotalMutations(prev => prev + 1);
    
    // Mutación en cascada de fragmentos relacionados
    setFragments(prev => prev.map(f => 
      f.page === fragment.page ? 
        { ...f, intensity: Math.min(1, f.intensity + 0.1), mutations: f.mutations + 1 } : 
        f
    ));
  };

  if (isLoading && fragments.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl font-thin text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-4">
            LAPOEMA.AUTOPOIESIS
          </div>
          <div className="text-cyan-400 min-h-[30px]">
            {loadingText}
          </div>
          <div className="mt-4 flex justify-center">
            <div className="animate-spin w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full" />
          </div>
          <div className="text-yellow-400 text-sm mt-4 font-mono">
            generación logarítmica: {totalMutations} mutaciones
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="relative"
      style={{
        filter: `hue-rotate(${Math.sin(Date.now() * 0.001 + totalMutations * 0.1) * 30}deg)`,
        transform: `scale(${1 + Math.sin(totalMutations * 0.05) * 0.01})`
      }}
    >
      <LoFiControls
        onScrapeNew={handleScrapeNew}
        onToggleAI={handleToggleAI}
        onRandomize={handleRandomize}
        isAIActive={isAIActive}
        isLoading={isLoading}
      />

      <UniverseInterface
        fragments={fragments}
        onFragmentInteraction={handleFragmentInteraction}
      />

      {/* Metadata del Universo Autopoiético */}
      <div className="hidden">
        {JSON.stringify({
          timestamp: Date.now(),
          fragments: fragments.length,
          universeEnergy,
          aiActive: isAIActive,
          totalMutations,
          logarithmicGrowth: Math.log(totalMutations + 1),
          systemStatus: 'AUTOPOIETIC',
          version: 'LAPOEMA.UNIVERSE.LOGARITHMIC.2.0'
        })}
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <GlitchProvider>
      <IndexContent />
    </GlitchProvider>
  );
};

export default Index;
