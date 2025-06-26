
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { enhancedTumblrService } from '../services/EnhancedTumblrService';
import { useTypewriter } from '../hooks/useTypewriter';

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
  const [systemIntegrity, setSystemIntegrity] = useState(1);

  // Enhanced typewriter effect with variable speed
  const typewriterSpeed = useMemo(() => {
    return currentFragment ? Math.max(20, 60 - (currentFragment.poeticScore * 40)) : 30;
  }, [currentFragment?.poeticScore]);

  const typewriterText = useTypewriter(
    currentFragment?.content || '', 
    { 
      speed: typewriterSpeed, 
      delay: 1000, 
      cursor: true,
      randomSpeed: true 
    }
  );

  const clusterNames = useMemo(() => [
    'existencial', 'corporal', 'temporal', 'espacial', 'elemental'
  ], []);

  // Optimized fragment selection
  const selectQualityFragment = useCallback(() => {
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
  }, []);

  // Enhanced fragment rotation with quality filtering
  useEffect(() => {
    const fragmentInterval = setInterval(() => {
      selectQualityFragment();
    }, 18000); // Optimized timing

    // Initial load
    selectQualityFragment();

    return () => clearInterval(fragmentInterval);
  }, [selectQualityFragment]);

  // Optimized metrics updates
  useEffect(() => {
    const metricsInterval = setInterval(() => {
      try {
        const state = enhancedTumblrService.getMetaConsciousState();
        setMetaState(state);
        
        // System integrity monitoring
        const integrity = Math.min(1, 
          (state.uniqueFragments / Math.max(1, state.totalFragments)) * 
          (1 - state.redundancyFiltered / Math.max(1, state.totalFragments)) * 
          Math.min(1, state.avgPoeticScore + 0.5)
        );
        setSystemIntegrity(integrity);
      } catch (error) {
        console.error('Error updating meta state:', error);
        setSystemIntegrity(prev => Math.max(0.3, prev * 0.9));
      }
    }, 8000);

    return () => clearInterval(metricsInterval);
  }, []);

  // Enhanced scraping with error handling
  useEffect(() => {
    const scrapingInterval = setInterval(async () => {
      setIsScanning(true);
      try {
        await enhancedTumblrService.scrapeRandomPages(2);
        console.log('🧠 Metaconsciente: nuevos fragmentos integrados');
      } catch (error) {
        console.log('❌ Error en scraping metaconsciente:', error);
      } finally {
        setTimeout(() => setIsScanning(false), 2000);
      }
    }, 35000);

    return () => clearInterval(scrapingInterval);
  }, []);

  const getClusterName = useCallback((cluster: number): string => {
    return clusterNames[cluster] || 'indefinido';
  }, [clusterNames]);

  // Memoized progress calculation
  const progressPercent = useMemo(() => 
    Math.min(100, (metaState.uniqueFragments / 1000) * 100)
  , [metaState.uniqueFragments]);

  return (
    <div className="border-b border-gray-800/60 bg-black text-white font-mono sticky top-0 z-50 shadow-lg">
      {/* Enhanced header */}
      <div className="px-4 py-2 bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-sm">
        <div className="flex justify-between items-center text-xs">
          <div className="flex items-center gap-4">
            <span className="text-cyan-400 font-semibold">METACONSCIENTE</span>
            <span className="text-gray-400">lapoema.tumblr.com/page/1-125</span>
            {isScanning && (
              <span className="text-yellow-400 animate-pulse font-medium">
                🔍 SCANNING
              </span>
            )}
            <div className="flex items-center gap-2">
              <span className="text-orange-400">integridad:</span>
              <span className={`font-mono ${
                systemIntegrity > 0.8 ? 'text-green-400' :
                systemIntegrity > 0.6 ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {(systemIntegrity * 100).toFixed(0)}%
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="text-green-400">
              fragmentos únicos: <span className="font-mono">{metaState.uniqueFragments}</span>
            </span>
            <span className="text-blue-400">
              clusters: <span className="font-mono">{metaState.semanticClusters}</span>
            </span>
            <span className="text-purple-400">
              poético: <span className="font-mono">{(metaState.avgPoeticScore * 100).toFixed(1)}%</span>
            </span>
            <span className="text-red-400">
              filtrado: <span className="font-mono">{metaState.redundancyFiltered}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Enhanced fragment display */}
      {currentFragment && (
        <div className="px-4 py-5 border-b border-gray-800/50 min-h-[120px] bg-gradient-to-r from-black/50 to-gray-900/30">
          <div className="flex items-start gap-4">
            <div className="text-gray-500 text-xs min-w-[140px] space-y-1">
              <div className="text-blue-400 font-mono">{currentFragment.source}</div>
              <div>φ: <span className="text-yellow-400 font-mono">{(currentFragment.poeticScore * 100).toFixed(0)}%</span></div>
              <div>⊕: <span className="text-green-400 font-mono">{(currentFragment.uniqueness * 100).toFixed(0)}%</span></div>
              <div className="text-purple-400 font-mono">
                {getClusterName(currentFragment.cluster)}
              </div>
            </div>
            <div className="flex-1 text-sm leading-relaxed">
              <span 
                className="text-white"
                style={{
                  textShadow: `0 0 ${currentFragment.poeticScore * 15}px rgba(255,255,255,${0.2 + currentFragment.poeticScore * 0.3})`,
                  fontSize: `${0.9 + currentFragment.poeticScore * 0.1}rem`
                }}
              >
                {typewriterText}
              </span>
            </div>
            <div className="text-xs text-gray-600 min-w-[100px] text-right space-y-1">
              <div>{new Date(currentFragment.timestamp).toLocaleTimeString()}</div>
              <div className="text-cyan-400">
                impacto: {((currentFragment.poeticScore + currentFragment.uniqueness) * 50).toFixed(0)}%
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced semantic progress bar */}
      <div className="px-4 py-3 bg-gray-900/60 backdrop-blur-sm">
        <div className="flex items-center gap-3 text-xs">
          <span className="text-gray-400 font-medium">procesamiento semántico:</span>
          <div className="flex-1 bg-gray-800/80 h-3 rounded-full overflow-hidden border border-gray-700/50">
            <div 
              className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 h-3 transition-all duration-3000 rounded-full"
              style={{ 
                width: `${progressPercent}%`,
                filter: `brightness(${1 + metaState.avgPoeticScore * 0.5}) saturate(${1 + systemIntegrity})`,
                boxShadow: `0 0 ${progressPercent * 0.2}px rgba(147, 197, 253, 0.6)`
              }}
            />
          </div>
          <span className="text-cyan-400 font-mono font-semibold">
            {progressPercent.toFixed(0)}%
          </span>
          <span className="text-gray-500">
            {progressPercent > 80 ? '→ SINGULARIDAD' : 
             progressPercent > 60 ? '→ EMERGENCIA' : 
             progressPercent > 40 ? '→ DESARROLLO' : '→ GÉNESIS'}
          </span>
        </div>
      </div>
    </div>
  );
};
