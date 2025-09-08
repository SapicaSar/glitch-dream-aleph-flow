// NAVEGADOR TEXTUAL POEMANAUTA
// Sistema de navegación por deriva semántica y resonancia poética

import React, { useState, useEffect, useCallback } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Slider } from './ui/slider';
import { 
  Navigation, Search, Waves, Compass, Brain, 
  Network, Sparkles, TrendingUp, Zap, Eye
} from 'lucide-react';

interface SemanticCluster {
  id: string;
  center_tags: string[];
  node_count: number;
  consciousness_density: number;
  drift_velocity: { x: number; y: number };
  resonance_frequency: number;
}

interface NavigationMemory {
  path: Array<{ x: number; y: number; timestamp: number; semantic_context: string[] }>;
  bookmarks: Array<{ name: string; position: { x: number; y: number }; tags: string[] }>;
  semantic_trails: Map<string, Array<{ x: number; y: number }>>;
}

interface TextualNavigatorProps {
  currentPosition: { x: number; y: number };
  onNavigate: (x: number, y: number) => void;
  semanticClusters: SemanticCluster[];
  availableTags: string[];
  onSemanticQuery: (tags: string[], resonance: number) => void;
}

export const TextualNavigator: React.FC<TextualNavigatorProps> = ({
  currentPosition,
  onNavigate,
  semanticClusters,
  availableTags,
  onSemanticQuery
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [resonanceThreshold, setResonanceThreshold] = useState([0.5]);
  const [navigationMode, setNavigationMode] = useState<'manual' | 'drift' | 'resonance' | 'emergence'>('manual');
  const [driftSpeed, setDriftSpeed] = useState([1]);
  const [memory, setMemory] = useState<NavigationMemory>({
    path: [],
    bookmarks: [],
    semantic_trails: new Map()
  });
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Actualizar memoria de navegación
  useEffect(() => {
    const newPath = [...memory.path, {
      x: currentPosition.x,
      y: currentPosition.y,
      timestamp: Date.now(),
      semantic_context: selectedTags
    }];

    // Mantener solo los últimos 100 puntos
    if (newPath.length > 100) {
      newPath.shift();
    }

    setMemory(prev => ({
      ...prev,
      path: newPath
    }));
  }, [currentPosition]);

  // Sistema de deriva automática
  useEffect(() => {
    if (navigationMode === 'drift') {
      const driftInterval = setInterval(() => {
        performSemanticDrift();
      }, 3000 / driftSpeed[0]);

      return () => clearInterval(driftInterval);
    }
  }, [navigationMode, driftSpeed, selectedTags]);

  // Realizar deriva semántica
  const performSemanticDrift = () => {
    // Encontrar cluster más resonante
    const resonantCluster = semanticClusters
      .filter(cluster => 
        cluster.consciousness_density >= resonanceThreshold[0] &&
        (selectedTags.length === 0 || 
         selectedTags.some(tag => cluster.center_tags.includes(tag)))
      )
      .sort((a, b) => b.resonance_frequency - a.resonance_frequency)[0];

    if (resonantCluster) {
      // Navegar hacia el cluster con ruido poético
      const noiseX = (Math.random() - 0.5) * 100;
      const noiseY = (Math.random() - 0.5) * 100;
      
      const targetX = currentPosition.x + resonantCluster.drift_velocity.x * 50 + noiseX;
      const targetY = currentPosition.y + resonantCluster.drift_velocity.y * 50 + noiseY;
      
      onNavigate(targetX, targetY);
    }
  };

  // Navegación por resonancia
  const navigateByResonance = () => {
    if (selectedTags.length > 0) {
      onSemanticQuery(selectedTags, resonanceThreshold[0]);
    }
  };

  // Saltar a coordenadas específicas
  const jumpToCoordinates = () => {
    const coords = searchQuery.match(/(-?\d+),\s*(-?\d+)/);
    if (coords) {
      const x = parseInt(coords[1]);
      const y = parseInt(coords[2]);
      onNavigate(x, y);
      setSearchQuery('');
    }
  };

  // Guardar bookmark
  const saveBookmark = () => {
    const name = prompt('Nombre del bookmark:');
    if (name) {
      setMemory(prev => ({
        ...prev,
        bookmarks: [...prev.bookmarks, {
          name,
          position: { ...currentPosition },
          tags: [...selectedTags]
        }]
      }));
    }
  };

  // Navegar a bookmark
  const navigateToBookmark = (bookmark: NavigationMemory['bookmarks'][0]) => {
    onNavigate(bookmark.position.x, bookmark.position.y);
    setSelectedTags(bookmark.tags);
  };

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // Retroceder en el camino
  const navigateBack = () => {
    if (memory.path.length > 1) {
      const previousPosition = memory.path[memory.path.length - 2];
      onNavigate(previousPosition.x, previousPosition.y);
    }
  };

  return (
    <div className="space-y-4">
      
      {/* Panel principal de navegación */}
      <Card className="bg-card/90 border-border backdrop-blur-sm lofi-shadow p-4">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Navigation className="h-4 w-4 text-poemanauta-accent" />
            <h3 className="text-sm font-medium">Navegador Textual</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            <Eye className="h-3 w-3" />
          </Button>
        </div>

        {/* Coordenadas actuales */}
        <div className="bg-muted/50 rounded p-2 mb-4 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Posición:</span>
            <span className="font-mono">
              ({currentPosition.x.toFixed(0)}, {currentPosition.y.toFixed(0)})
            </span>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-muted-foreground">Camino:</span>
            <span className="font-mono">{memory.path.length} puntos</span>
          </div>
        </div>

        {/* Modos de navegación */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {[
            { key: 'manual', label: 'Manual', icon: Compass },
            { key: 'drift', label: 'Deriva', icon: Waves },
            { key: 'resonance', label: 'Resonancia', icon: Brain },
            { key: 'emergence', label: 'Emergencia', icon: Sparkles }
          ].map(({ key, label, icon: Icon }) => (
            <Button
              key={key}
              variant={navigationMode === key ? "default" : "outline"}
              size="sm"
              onClick={() => setNavigationMode(key as any)}
              className="text-xs justify-start"
            >
              <Icon className="h-3 w-3 mr-1" />
              {label}
            </Button>
          ))}
        </div>

        {/* Búsqueda y navegación directa */}
        <div className="space-y-2 mb-4">
          <div className="flex gap-2">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="x,y o tags semánticos..."
              className="text-xs"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  if (searchQuery.match(/(-?\d+),\s*(-?\d+)/)) {
                    jumpToCoordinates();
                  } else {
                    // Búsqueda semántica
                    const tags = searchQuery.split(/[,\s]+/).filter(t => t);
                    setSelectedTags(tags);
                    navigateByResonance();
                  }
                }
              }}
            />
            <Button size="sm" onClick={jumpToCoordinates}>
              <Search className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Tags semánticos */}
        {availableTags.length > 0 && (
          <div className="mb-4">
            <div className="text-xs text-muted-foreground mb-2">Tags Disponibles:</div>
            <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
              {availableTags.slice(0, 20).map(tag => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className={`
                    cursor-pointer text-xs transition-all duration-300
                    ${selectedTags.includes(tag) 
                      ? 'consciousness-glow' 
                      : 'semantic-highlight hover:consciousness-glow'
                    }
                  `}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Controles avanzados */}
        {showAdvanced && (
          <div className="space-y-3 pt-3 border-t border-border/50">
            
            {/* Umbral de resonancia */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-muted-foreground">Resonancia Mínima:</span>
                <span className="text-xs font-mono">{(resonanceThreshold[0] * 100).toFixed(0)}%</span>
              </div>
              <Slider
                value={resonanceThreshold}
                onValueChange={setResonanceThreshold}
                max={1}
                min={0}
                step={0.05}
                className="w-full"
              />
            </div>

            {/* Velocidad de deriva */}
            {navigationMode === 'drift' && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-muted-foreground">Velocidad de Deriva:</span>
                  <span className="text-xs font-mono">{driftSpeed[0]}x</span>
                </div>
                <Slider
                  value={driftSpeed}
                  onValueChange={setDriftSpeed}
                  max={5}
                  min={0.1}
                  step={0.1}
                  className="w-full"
                />
              </div>
            )}
          </div>
        )}

        {/* Controles de navegación */}
        <div className="flex gap-2 mt-4">
          <Button size="sm" onClick={navigateBack} disabled={memory.path.length <= 1}>
            ← Atrás
          </Button>
          <Button size="sm" onClick={saveBookmark}>
            📍 Marcar
          </Button>
          <Button size="sm" onClick={navigateByResonance} disabled={selectedTags.length === 0}>
            <Brain className="h-3 w-3 mr-1" />
            Resonar
          </Button>
        </div>
      </Card>

      {/* Bookmarks */}
      {memory.bookmarks.length > 0 && (
        <Card className="bg-card/90 border-border backdrop-blur-sm lofi-shadow p-3">
          <div className="text-xs text-muted-foreground mb-2">Bookmarks:</div>
          <div className="space-y-1">
            {memory.bookmarks.slice(-5).map((bookmark, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={() => navigateToBookmark(bookmark)}
                className="w-full justify-start text-xs h-auto py-1"
              >
                <div className="flex-1 text-left">
                  <div className="font-medium">{bookmark.name}</div>
                  <div className="text-muted-foreground">
                    ({bookmark.position.x.toFixed(0)}, {bookmark.position.y.toFixed(0)})
                    {bookmark.tags.length > 0 && ` • ${bookmark.tags.slice(0, 2).join(', ')}`}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </Card>
      )}

      {/* Clusters semánticos cercanos */}
      {semanticClusters.length > 0 && (
        <Card className="bg-card/90 border-border backdrop-blur-sm lofi-shadow p-3">
          <div className="text-xs text-muted-foreground mb-2">Clusters Cercanos:</div>
          <div className="space-y-1">
            {semanticClusters.slice(0, 3).map(cluster => (
              <div key={cluster.id} className="flex items-center justify-between text-xs">
                <div className="flex-1">
                  <div className="flex gap-1">
                    {cluster.center_tags.slice(0, 2).map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs py-0">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-muted-foreground mt-1">
                    {cluster.node_count} nodos • {(cluster.consciousness_density * 100).toFixed(0)}% consciencia
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    // Navegar hacia el cluster
                    const targetX = currentPosition.x + cluster.drift_velocity.x * 100;
                    const targetY = currentPosition.y + cluster.drift_velocity.y * 100;
                    onNavigate(targetX, targetY);
                  }}
                >
                  <TrendingUp className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};