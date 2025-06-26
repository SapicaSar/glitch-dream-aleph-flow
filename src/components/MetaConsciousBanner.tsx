
import React, { useState, useEffect } from 'react';
import { enhancedTumblrService } from '../services/EnhancedTumblrService';

interface MetaFragment {
  content: string;
  source: string;
  poeticScore: number;
  uniqueness: number;
  cluster: number;
  timestamp: number;
}

export const MetaConsciousBanner = () => {
  const [currentFragment, setCurrentFragment] = useState<MetaFragment | null>(null);
  const [metaState, setMetaState] = useState({
    totalFragments: 0,
    uniqueFragments: 0,
    semanticClusters: 0,
    avgPoeticScore: 0,
    redundancyFiltered: 0
  });
  const [isScanning, setIsScanning] = useState(false);

  // Actualizar fragmento cada 4 segundos
  useEffect(() => {
    const fragmentInterval = setInterval(() => {
      const fragment = enhancedTumblrService.getRandomFragment();
      if (fragment) {
        setCurrentFragment({
          content: fragment.content,
          source: `página ${fragment.page}`,
          poeticScore: fragment.poeticScore,
          uniqueness: fragment.uniqueness,
          cluster: fragment.cluster || 0,
          timestamp: fragment.timestamp
        });
      }
    }, 4000);

    return () => clearInterval(fragmentInterval);
  }, []);

  // Actualizar métricas cada 10 segundos
  useEffect(() => {
    const metricsInterval = setInterval(() => {
      const state = enhancedTumblrService.getMetaConsciousState();
      setMetaState(state);
    }, 10000);

    return () => clearInterval(metricsInterval);
  }, []);

  // Scraping automático cada 30 segundos
  useEffect(() => {
    const scrapingInterval = setInterval(async () => {
      setIsScanning(true);
      try {
        await enhancedTumblrService.scrapeRandomPages(2);
        console.log('🧠 Metaconsciente: nuevos fragmentos integrados');
      } catch (error) {
        console.log('❌ Error en scraping metaconsciente:', error);
      } finally {
        setIsScanning(false);
      }
    }, 30000);

    return () => clearInterval(scrapingInterval);
  }, []);

  const getClusterName = (cluster: number): string => {
    const clusters = ['existencial', 'corporal', 'temporal', 'espacial', 'elemental'];
    return clusters[cluster] || 'indefinido';
  };

  return (
    <div className="border-b border-gray-800 bg-black text-white font-mono">
      {/* Header metaconsciente */}
      <div className="px-4 py-2 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
        <div className="flex justify-between items-center text-xs">
          <div className="flex items-center gap-4">
            <span className="text-cyan-400">METACONSCIENTE</span>
            <span className="text-gray-400">lapoema.tumblr.com/page/1-125</span>
            {isScanning && (
              <span className="text-yellow-400 animate-pulse">🔍 SCANNING</span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-green-400">
              fragmentos únicos: {metaState.uniqueFragments}
            </span>
            <span className="text-blue-400">
              clusters: {metaState.semanticClusters}
            </span>
            <span className="text-purple-400">
              poético: {(metaState.avgPoeticScore * 100).toFixed(1)}%
            </span>
            <span className="text-red-400">
              filtrado: {metaState.redundancyFiltered}
            </span>
          </div>
        </div>
      </div>

      {/* Fragmento actual */}
      {currentFragment && (
        <div className="px-4 py-3 border-b border-gray-800">
          <div className="flex items-start gap-3">
            <div className="text-gray-500 text-xs min-w-[120px]">
              <div>{currentFragment.source}</div>
              <div>φ:{(currentFragment.poeticScore * 100).toFixed(0)}%</div>
              <div>⊕:{(currentFragment.uniqueness * 100).toFixed(0)}%</div>
              <div className="text-purple-400">
                {getClusterName(currentFragment.cluster)}
              </div>
            </div>
            <div className="flex-1 text-sm leading-relaxed">
              <span 
                className="text-white"
                style={{
                  textShadow: `0 0 ${currentFragment.poeticScore * 10}px rgba(255,255,255,0.3)`
                }}
              >
                {currentFragment.content}
              </span>
            </div>
            <div className="text-xs text-gray-600 min-w-[80px] text-right">
              {new Date(currentFragment.timestamp).toLocaleTimeString()}
            </div>
          </div>
        </div>
      )}

      {/* Barra de progreso semántico */}
      <div className="px-4 py-1 bg-gray-900/50">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-gray-400">procesamiento semántico:</span>
          <div className="flex-1 bg-gray-800 h-1 rounded overflow-hidden">
            <div 
              className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 h-1 transition-all duration-1000"
              style={{ 
                width: `${Math.min(100, (metaState.uniqueFragments / 1000) * 100)}%`,
                filter: `brightness(${1 + metaState.avgPoeticScore})`
              }}
            />
          </div>
          <span className="text-cyan-400">
            {Math.min(100, Math.floor((metaState.uniqueFragments / 1000) * 100))}%
          </span>
        </div>
      </div>
    </div>
  );
};
