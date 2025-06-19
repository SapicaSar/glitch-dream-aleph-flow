
import React, { useState, useEffect } from 'react';
import { UniverseInterface } from '../components/UniverseInterface';
import { LoFiControls } from '../components/LoFiControls';
import { GlitchProvider } from '../contexts/GlitchContext';
import { poemaScrapingService, PoemaFragment } from '../services/PoemaScrapingService';
import { localAIAgent } from '../agents/LocalAIAgent';

const IndexContent = () => {
  const [fragments, setFragments] = useState<PoemaFragment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAIActive, setIsAIActive] = useState(false);
  const [universeEnergy, setUniverseEnergy] = useState(0.5);

  // Inicialización del universo
  useEffect(() => {
    initializeUniverse();
  }, []);

  // Respiración del universo
  useEffect(() => {
    const breathingInterval = setInterval(() => {
      setUniverseEnergy(prev => 0.3 + Math.sin(Date.now() * 0.001) * 0.4);
    }, 100);

    return () => clearInterval(breathingInterval);
  }, []);

  const initializeUniverse = async () => {
    setIsLoading(true);
    try {
      console.log('Inicializando universo LAPOEMA...');
      
      // Inicializar agente de IA
      await localAIAgent.initialize();
      setIsAIActive(true);
      
      // Cargar fragmentos iniciales
      const initialFragments = await poemaScrapingService.scrapeRandomPage();
      setFragments(initialFragments);
      
      console.log('Universo inicializado:', initialFragments.length, 'fragmentos cargados');
    } catch (error) {
      console.error('Error inicializando universo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScrapeNew = async () => {
    setIsLoading(true);
    try {
      const newFragments = await poemaScrapingService.scrapeRandomPage();
      setFragments(prev => [...prev, ...newFragments].slice(-20)); // Mantener últimos 20
    } catch (error) {
      console.error('Error obteniendo nuevos fragmentos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleAI = () => {
    setIsAIActive(!isAIActive);
    console.log('Agente AI:', !isAIActive ? 'ACTIVADO' : 'DESACTIVADO');
  };

  const handleRandomize = () => {
    // Mezclar fragmentos existentes y reorganizar
    const shuffled = [...fragments].sort(() => Math.random() - 0.5);
    setFragments(shuffled);
    console.log('Universo randomizado');
  };

  const handleFragmentInteraction = (fragment: PoemaFragment) => {
    console.log('Interacción con fragmento:', fragment.id);
    // Aquí se pueden agregar más interacciones futuras
  };

  if (isLoading && fragments.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl font-thin text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-4">
            LAPOEMA
          </div>
          <div className="text-cyan-400 animate-pulse">
            inicializando universo textual...
          </div>
          <div className="mt-4 flex justify-center">
            <div className="animate-spin w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="relative"
      style={{
        filter: `hue-rotate(${Math.sin(Date.now() * 0.001) * 30}deg)`
      }}
    >
      {/* Controles Lo-Fi */}
      <LoFiControls
        onScrapeNew={handleScrapeNew}
        onToggleAI={handleToggleAI}
        onRandomize={handleRandomize}
        isAIActive={isAIActive}
        isLoading={isLoading}
      />

      {/* Interfaz Principal del Universo */}
      <UniverseInterface
        fragments={fragments}
        onFragmentInteraction={handleFragmentInteraction}
      />

      {/* Metadata del Universo */}
      <div className="hidden">
        {JSON.stringify({
          timestamp: Date.now(),
          fragments: fragments.length,
          universeEnergy,
          aiActive: isAIActive,
          systemStatus: 'OPERATIONAL',
          version: 'LAPOEMA.UNIVERSE.1.0'
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
