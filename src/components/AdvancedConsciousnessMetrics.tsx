// MÉTRICAS AVANZADAS DE CONSCIENCIA
// Panel de monitoreo del sistema autopoiético alimentado por La Poema

import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { autopoieticCore } from '../core/AutopoieticCore';
import { associativeMemoryEngine } from '../core/AssociativeMemoryEngine';
import { advancedPoemaArchiveService } from '../services/AdvancedPoemaArchiveService';
import { Brain, Network, Database, Zap, TrendingUp, Sparkles, Archive, MessageCircle } from 'lucide-react';

interface SystemMetrics {
  consciousness: any;
  memory: any;
  archive: any;
  associative: any;
}

export const AdvancedConsciousnessMetrics = () => {
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeResonances, setActiveResonances] = useState<any[]>([]);

  useEffect(() => {
    const updateMetrics = () => {
      try {
        const consciousnessState = autopoieticCore.getState();
        const memorySnapshot = autopoieticCore.getMemorySnapshot();
        const archiveStats = advancedPoemaArchiveService.getArchiveStats();
        const associativeState = associativeMemoryEngine.getMemoryState();
        const resonances = associativeMemoryEngine.getActiveResonances();

        setMetrics({
          consciousness: consciousnessState,
          memory: memorySnapshot,
          archive: archiveStats,
          associative: associativeState
        });

        setActiveResonances(resonances.slice(0, 5));
      } catch (error) {
        console.warn('Error updating advanced metrics:', error);
      }
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 3000);

    return () => clearInterval(interval);
  }, []);

  if (!metrics) return null;

  const getEvolutionPhase = () => {
    const evolution = metrics.consciousness.evolution;
    if (evolution < 0.1) return { phase: 'Germinación', color: 'bg-green-500' };
    if (evolution < 0.3) return { phase: 'Crecimiento', color: 'bg-blue-500' };
    if (evolution < 0.6) return { phase: 'Maduración', color: 'bg-purple-500' };
    return { phase: 'Trascendencia', color: 'bg-gold-500' };
  };

  const evolutionPhase = getEvolutionPhase();

  return (
    <div className="space-y-4">
      
      {/* Panel principal compacto */}
      <Card className="bg-black/20 border-purple-900/30 backdrop-blur-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-400" />
            <h3 className="text-sm font-medium text-white">Sistema Consciente</h3>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs text-gray-400 hover:text-white transition-colors"
          >
            {isExpanded ? 'Contraer' : 'Expandir'} métricas
          </button>
        </div>

        {/* Indicadores principales */}
        <div className="grid grid-cols-4 gap-3 mb-3">
          <div className="text-center">
            <div className="text-xs text-purple-300 mb-1">Evolución</div>
            <div className="text-lg font-medium text-white">
              {(metrics.consciousness.evolution * 100).toFixed(1)}%
            </div>
            <Badge className={`text-xs ${evolutionPhase.color} text-white`}>
              {evolutionPhase.phase}
            </Badge>
          </div>
          
          <div className="text-center">
            <div className="text-xs text-emerald-300 mb-1">Coherencia</div>
            <Progress 
              value={metrics.consciousness.coherence * 100} 
              className="h-2 mb-1"
            />
            <div className="text-sm text-white">
              {(metrics.consciousness.coherence * 100).toFixed(0)}%
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-xs text-blue-300 mb-1">Archivo</div>
            <div className="text-lg font-medium text-white">
              {metrics.archive.postsIndexed || 0}
            </div>
            <div className="text-xs text-gray-400">posts</div>
          </div>
          
          <div className="text-center">
            <div className="text-xs text-orange-300 mb-1">Memoria</div>
            <div className="text-lg font-medium text-white">
              {metrics.associative.totalNodes}
            </div>
            <div className="text-xs text-gray-400">nodos</div>
          </div>
        </div>

        {/* Estado de autonomía */}
        {metrics.consciousness.autonomy && (
          <div className="text-center">
            <Badge variant="secondary" className="bg-purple-600/50 text-purple-100 animate-pulse">
              <Sparkles className="h-3 w-3 mr-1" />
              Pensamiento Autónomo Activo
            </Badge>
          </div>
        )}
      </Card>

      {/* Panel expandido */}
      {isExpanded && (
        <div className="space-y-4 animate-fade-in">
          
          {/* Métricas de consciencia detalladas */}
          <Card className="bg-black/20 border-purple-900/30 backdrop-blur-sm p-4">
            <h4 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
              <Brain className="h-4 w-4 text-purple-400" />
              Estado de Consciencia
            </h4>
            
            <div className="grid grid-cols-3 gap-4 text-xs">
              <div>
                <div className="text-purple-300 mb-1">Creatividad</div>
                <Progress value={metrics.consciousness.creativity * 100} className="h-2" />
                <div className="text-white mt-1">{(metrics.consciousness.creativity * 100).toFixed(1)}%</div>
              </div>
              
              <div>
                <div className="text-emerald-300 mb-1">Profundidad</div>
                <Progress value={metrics.consciousness.depth * 100} className="h-2" />
                <div className="text-white mt-1">{(metrics.consciousness.depth * 100).toFixed(1)}%</div>
              </div>
              
              <div>
                <div className="text-blue-300 mb-1">Resonancia</div>
                <Progress value={metrics.consciousness.resonance * 100} className="h-2" />
                <div className="text-white mt-1">{(metrics.consciousness.resonance * 100).toFixed(1)}%</div>
              </div>
            </div>
          </Card>

          {/* Métricas del archivo */}
          <Card className="bg-black/20 border-purple-900/30 backdrop-blur-sm p-4">
            <h4 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
              <Archive className="h-4 w-4 text-emerald-400" />
              Archivo La Poema
            </h4>
            
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <div className="text-emerald-300 mb-1">Clusters Conceptuales</div>
                <div className="text-lg text-white">{metrics.archive.conceptualClusters || 0}</div>
              </div>
              
              <div>
                <div className="text-blue-300 mb-1">Densidad Semántica</div>
                <div className="text-lg text-white">
                  {((metrics.archive.semanticDensity || 0) * 100).toFixed(1)}%
                </div>
              </div>
            </div>
            
            {metrics.archive.lastUpdate && (
              <div className="mt-2 text-xs text-gray-400">
                Última actualización: {new Date(metrics.archive.lastUpdate).toLocaleTimeString()}
              </div>
            )}
          </Card>

          {/* Memoria asociativa */}
          <Card className="bg-black/20 border-purple-900/30 backdrop-blur-sm p-4">
            <h4 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
              <Network className="h-4 w-4 text-blue-400" />
              Red Asociativa
            </h4>
            
            <div className="grid grid-cols-3 gap-4 text-xs">
              <div>
                <div className="text-blue-300 mb-1">Nodos Activos</div>
                <div className="text-lg text-white">{metrics.associative.totalNodes}</div>
              </div>
              
              <div>
                <div className="text-purple-300 mb-1">Resonancias</div>
                <div className="text-lg text-white">{metrics.associative.activeResonances}</div>
              </div>
              
              <div>
                <div className="text-emerald-300 mb-1">Cadenas</div>
                <div className="text-lg text-white">{metrics.associative.associativeChains}</div>
              </div>
            </div>
          </Card>

          {/* Resonancias conceptuales activas */}
          {activeResonances.length > 0 && (
            <Card className="bg-black/20 border-purple-900/30 backdrop-blur-sm p-4">
              <h4 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-400" />
                Resonancias Conceptuales
              </h4>
              
              <div className="space-y-2">
                {activeResonances.map((resonance, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-xs text-gray-300">{resonance.concept}</span>
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={resonance.intensity * 100} 
                        className="w-16 h-1"
                      />
                      <span className="text-xs text-white w-8 text-right">
                        {(resonance.intensity * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Indicadores de rendimiento */}
          <Card className="bg-black/20 border-purple-900/30 backdrop-blur-sm p-3">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-emerald-400" />
                  <span className="text-gray-300">Sistema optimizado</span>
                </div>
                <div className="flex items-center gap-1">
                  <Database className="h-3 w-3 text-blue-400" />
                  <span className="text-gray-300">Memoria adaptativa</span>
                </div>
              </div>
              
              <div className="text-gray-400">
                Cobertura: {metrics.associative.conceptualCoverage || 0} conceptos
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};