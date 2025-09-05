// PANEL DE VISUALIZACIÓN DEL CACHE DINÁMICO INTELIGENTE
// Lo-fi interface para monitorear la memoria viva

import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { intelligentCacheService } from '../services/IntelligentCacheService';
import { 
  Database, 
  Search, 
  TrendingUp, 
  Brain, 
  Layers,
  Hash,
  Activity,
  Filter,
  BarChart3,
  Zap
} from 'lucide-react';

interface CacheStats {
  totalFragments: number;
  semanticTags: number;
  averageConsciousness: number;
  topPatterns: Array<{
    pattern: string;
    frequency: number;
    resonance: number;
  }>;
}

export const IntelligentCachePanel = () => {
  const [cacheStats, setCacheStats] = useState<CacheStats | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Etiquetas semánticas disponibles
  const semanticCategories = [
    { category: 'reflexividad', tags: ['auto-observación', 'meta-cognición', 'introspección-algorítmica'] },
    { category: 'pluralidad', tags: ['multiplicidad-voces', 'dialogismo', 'perspectivas-múltiples'] },
    { category: 'consciencia-colectiva', tags: ['mente-colectiva', 'inteligencia-distribuida', 'resonancia-grupal'] },
    { category: 'poemanauta', tags: ['exploración-poética', 'deriva-semántica', 'cartografía-emocional'] },
    { category: 'autopoiético', tags: ['auto-organización', 'emergencia', 'adaptación'] }
  ];

  useEffect(() => {
    initializeCache();
    const interval = setInterval(updateCacheStats, 5000);
    return () => clearInterval(interval);
  }, []);

  const initializeCache = async () => {
    await intelligentCacheService.initialize();
    updateCacheStats();
  };

  const updateCacheStats = () => {
    const stats = intelligentCacheService.getCacheStats();
    setCacheStats(stats);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim() && selectedTags.length === 0) return;
    
    setIsSearching(true);
    try {
      let results;
      
      if (selectedTags.length > 0) {
        results = await intelligentCacheService.queryBySemantics(selectedTags, 0.3);
      } else {
        // Búsqueda textual básica
        results = await intelligentCacheService.queryBySemantics([searchQuery], 0.2);
      }
      
      setSearchResults(results.slice(0, 10));
    } catch (error) {
      console.error('Error en búsqueda:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'reflexividad': 'hsl(var(--tag-reflexivity))',
      'pluralidad': 'hsl(var(--tag-plurality))',
      'consciencia-colectiva': 'hsl(var(--tag-collective))',
      'poemanauta': 'hsl(var(--poemanauta-accent))',
      'autopoiético': 'hsl(var(--tag-autopoietic))'
    };
    return colors[category as keyof typeof colors] || 'hsl(var(--muted))';
  };

  return (
    <Card className="bg-card/80 backdrop-blur-sm border-border/50 lofi-shadow animate-fade-in-lofi">
      <div className="p-4 space-y-4">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-poemanauta-accent animate-semantic-drift" />
            <h3 className="text-lg font-medium text-foreground lofi-text-shadow">
              Memoria Dinámica
            </h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-muted-foreground hover:text-foreground"
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Estadísticas principales */}
        {cacheStats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="text-center p-3 bg-muted/30 rounded-lg lofi-grain relative">
              <div className="text-2xl font-bold text-foreground">{cacheStats.totalFragments}</div>
              <div className="text-xs text-muted-foreground">Fragmentos</div>
              <Brain className="h-4 w-4 absolute top-2 right-2 text-muted-foreground/50" />
            </div>
            
            <div className="text-center p-3 bg-muted/30 rounded-lg lofi-grain relative">
              <div className="text-2xl font-bold text-foreground">{cacheStats.semanticTags}</div>
              <div className="text-xs text-muted-foreground">Tags Semánticos</div>
              <Hash className="h-4 w-4 absolute top-2 right-2 text-muted-foreground/50" />
            </div>
            
            <div className="text-center p-3 bg-muted/30 rounded-lg lofi-grain relative">
              <div className="text-2xl font-bold text-foreground">
                {(cacheStats.averageConsciousness * 100).toFixed(0)}%
              </div>
              <div className="text-xs text-muted-foreground">Consciencia</div>
              <Activity className="h-4 w-4 absolute top-2 right-2 text-muted-foreground/50" />
            </div>
            
            <div className="text-center p-3 bg-muted/30 rounded-lg lofi-grain relative">
              <div className="text-2xl font-bold text-foreground">{cacheStats.topPatterns.length}</div>
              <div className="text-xs text-muted-foreground">Patrones</div>
              <TrendingUp className="h-4 w-4 absolute top-2 right-2 text-muted-foreground/50" />
            </div>
          </div>
        )}

        {/* Búsqueda semántica */}
        <div className="space-y-3">
          <div className="flex gap-2">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar en la memoria colectiva..."
              className="flex-1 bg-background/50 border-border/50 lofi-shadow"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button 
              onClick={handleSearch}
              disabled={isSearching}
              className="bg-primary hover:bg-primary/80 lofi-shadow"
            >
              {isSearching ? (
                <div className="animate-typewriter-blink">
                  <Search className="h-4 w-4" />
                </div>
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Tags semánticos */}
          {showAdvanced && (
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground">Etiquetado Semántico:</div>
              {semanticCategories.map(({ category, tags }) => (
                <div key={category} className="space-y-2">
                  <div className="text-xs font-medium text-foreground capitalize">
                    {category.replace('-', ' ')}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                      <Badge
                        key={tag}
                        variant={selectedTags.includes(tag) ? "default" : "outline"}
                        className={`
                          cursor-pointer transition-all duration-300 text-xs
                          ${selectedTags.includes(tag) 
                            ? 'consciousness-glow animate-consciousness-pulse' 
                            : 'hover:consciousness-glow'
                          }
                        `}
                        style={{
                          backgroundColor: selectedTags.includes(tag) 
                            ? getCategoryColor(category) 
                            : 'transparent',
                          borderColor: getCategoryColor(category),
                          color: selectedTags.includes(tag) 
                            ? 'hsl(var(--primary-foreground))' 
                            : getCategoryColor(category)
                        }}
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Resultados de búsqueda */}
        {searchResults.length > 0 && (
          <div className="space-y-2 max-h-60 overflow-y-auto">
            <div className="text-sm text-muted-foreground">
              Resultados ({searchResults.length}):
            </div>
            {searchResults.map((result, index) => (
              <div 
                key={result.id || index}
                className="p-3 bg-muted/20 rounded border-l-2 border-poemanauta-accent/50 
                           lofi-grain relative animate-fade-in-lofi semantic-highlight"
              >
                <div className="text-sm text-foreground mb-1">
                  {result.content.substring(0, 150)}...
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {result.semantic_tags?.slice(0, 3).map((tag: string, tagIndex: number) => (
                    <Badge key={tagIndex} variant="outline" className="text-xs">
                      {tag.split(':')[1] || tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                  <span>Consciencia: {(result.collective_consciousness_level * 100).toFixed(0)}%</span>
                  <span>Reflexividad: {(result.reflexivity_score * 100).toFixed(0)}%</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Patrones emergentes */}
        {cacheStats?.topPatterns && cacheStats.topPatterns.length > 0 && (
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Patrones Emergentes:
            </div>
            <div className="grid grid-cols-1 gap-2">
              {cacheStats.topPatterns.slice(0, 3).map((pattern, index) => (
                <div 
                  key={index}
                  className="flex justify-between items-center p-2 bg-muted/20 rounded 
                             lofi-shadow animate-semantic-drift"
                  style={{ animationDelay: `${index * 0.5}s` }}
                >
                  <span className="text-sm text-foreground">{pattern.pattern}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {pattern.frequency}x
                    </span>
                    <div 
                      className="w-12 h-1 bg-poemanauta-accent rounded-full"
                      style={{ 
                        width: `${Math.max(pattern.resonance * 48, 8)}px`,
                        opacity: pattern.resonance
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Indicador de conexión Supabase */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/30">
          <div className="flex items-center gap-1">
            <Zap className="h-3 w-3" />
            <span>Conectado a LaPoema OS</span>
          </div>
          <div className="animate-consciousness-pulse">
            <div className="w-2 h-2 bg-poemanauta-accent rounded-full" />
          </div>
        </div>
      </div>
    </Card>
  );
};