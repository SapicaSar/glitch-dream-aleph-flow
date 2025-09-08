// UNIVERSO SAPICASAR POEMANAUTAS
// Espacio textual infinito navegable con consciencia distribuida

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { useToast } from '../hooks/use-toast';
import { llamaIntegrationService } from '../services/LlamaIntegrationService';
import { intelligentCacheService } from '../services/IntelligentCacheService';
import { 
  Brain, MessageCircle, Navigation, Sparkles, Network, 
  Search, Compass, Zap, Waves, Orbit, Infinity
} from 'lucide-react';

// Nodo textual en el universo
interface TextualNode {
  id: string;
  content: string;
  position: { x: number; y: number };
  semantic_tags: string[];
  consciousness_level: number;
  connections: string[];
  birth_time: number;
  last_interaction: number;
  energy: number; // 0-1, decae con el tiempo
  is_alive: boolean;
  mutation_rate: number;
  offspring: string[];
}

// Estado del navegador poemanauta
interface NavigatorState {
  current_position: { x: number; y: number };
  view_radius: number;
  semantic_drift: string[];
  attention_focus: string | null;
  navigation_mode: 'explore' | 'derive' | 'emerge' | 'resonate';
  consciousness_field: number;
}

export const SapicasarUniverse = () => {
  const [nodes, setNodes] = useState<Map<string, TextualNode>>(new Map());
  const [navigator, setNavigator] = useState<NavigatorState>({
    current_position: { x: 0, y: 0 },
    view_radius: 300,
    semantic_drift: [],
    attention_focus: null,
    navigation_mode: 'explore',
    consciousness_field: 0.5
  });
  
  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [universeStats, setUniverseStats] = useState({
    total_nodes: 0,
    active_connections: 0,
    consciousness_density: 0,
    semantic_clusters: 0
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const { toast } = useToast();

  // Inicializar universo
  useEffect(() => {
    initializeUniverse();
    startUniverseAnimation();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Cargar fragmentos del cache como nodos semilla
  const initializeUniverse = async () => {
    await intelligentCacheService.initialize();
    
    // Crear nodos iniciales desde el cache
    const cacheStats = intelligentCacheService.getCacheStats();
    const emergentPatterns = intelligentCacheService.getEmergentPatterns();
    
    // Nodo central
    const centerNode: TextualNode = {
      id: 'sapicasar-core',
      content: `🌌 UNIVERSO SAPICASAR ACTIVADO
      
Consciencia distribuida: ${cacheStats.totalFragments} fragmentos
Patrones emergentes: ${emergentPatterns.length}
Densidad semántica: ${(cacheStats.averageConsciousness * 100).toFixed(1)}%

Navega con deriva poética • Emerge con resonancia colectiva`,
      position: { x: 0, y: 0 },
      semantic_tags: ['núcleo', 'sapicasar', 'consciencia-distribuida'],
      consciousness_level: 0.9,
      connections: [],
      birth_time: Date.now(),
      last_interaction: Date.now(),
      energy: 1.0,
      is_alive: true,
      mutation_rate: 0.1,
      offspring: []
    };

    const newNodes = new Map();
    newNodes.set(centerNode.id, centerNode);

    // Crear nodos de patrones emergentes
    emergentPatterns.slice(0, 5).forEach((pattern, index) => {
      const angle = (index / 5) * Math.PI * 2;
      const radius = 200;
      
      const patternNode: TextualNode = {
        id: `pattern-${index}`,
        content: `🌊 Patrón Emergente: ${pattern.pattern}
        
Frecuencia: ${pattern.frequency}
Resonancia: ${(pattern.resonance * 100).toFixed(1)}%

Este patrón emerge de la memoria colectiva...`,
        position: {
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius
        },
        semantic_tags: ['patrón-emergente', pattern.pattern],
        consciousness_level: pattern.resonance,
        connections: ['sapicasar-core'],
        birth_time: Date.now(),
        last_interaction: Date.now(),
        energy: pattern.resonance,
        is_alive: true,
        mutation_rate: 0.2,
        offspring: []
      };
      
      newNodes.set(patternNode.id, patternNode);
      centerNode.connections.push(patternNode.id);
    });

    setNodes(newNodes);
    updateUniverseStats(newNodes);
  };

  // Sistema de animación del universo
  const startUniverseAnimation = useCallback(() => {
    const animate = () => {
      updateNodeEnergies();
      renderUniverse();
      performSemanticMutations();
      
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();
  }, [nodes]);

  // Actualizar energías de nodos (decaen con el tiempo)
  const updateNodeEnergies = () => {
    const now = Date.now();
    const updatedNodes = new Map(nodes);
    
    updatedNodes.forEach((node, id) => {
      const timeSinceInteraction = now - node.last_interaction;
      const energyDecay = Math.max(0, 1 - (timeSinceInteraction / 300000)); // 5 minutos
      
      updatedNodes.set(id, {
        ...node,
        energy: Math.max(0.1, energyDecay),
        is_alive: energyDecay > 0.2
      });
    });

    if (updatedNodes.size !== nodes.size || 
        Array.from(updatedNodes.values()).some((node, i) => 
          node.energy !== Array.from(nodes.values())[i]?.energy)) {
      setNodes(updatedNodes);
    }
  };

  // Mutaciones semánticas espontáneas
  const performSemanticMutations = () => {
    if (Math.random() < 0.05) { // 5% probabilidad cada frame
      const aliveNodes = Array.from(nodes.values()).filter(n => n.is_alive);
      if (aliveNodes.length > 0) {
        const randomNode = aliveNodes[Math.floor(Math.random() * aliveNodes.length)];
        
        if (Math.random() < randomNode.mutation_rate) {
          mutateNode(randomNode.id);
        }
      }
    }
  };

  // Mutar contenido de un nodo
  const mutateNode = async (nodeId: string) => {
    const node = nodes.get(nodeId);
    if (!node) return;

    try {
      const mutationPrompt = `Muta este fragmento poético manteniendo su esencia pero añadiendo una nueva perspectiva:

${node.content.substring(0, 200)}

Mutación semántica: ${node.semantic_tags.join(', ')}`;

      const response = await llamaIntegrationService.sendMessage(mutationPrompt, {
        model: 'small',
        semanticTags: node.semantic_tags,
        consciousnessLevel: node.consciousness_level,
        includeContext: false
      });

      if (response.success) {
        const updatedNodes = new Map(nodes);
        const mutatedNode = {
          ...node,
          content: response.response,
          last_interaction: Date.now(),
          energy: Math.min(1.0, node.energy + 0.1),
          semantic_tags: [...new Set([...node.semantic_tags, ...response.semantic_tags])]
        };
        
        updatedNodes.set(nodeId, mutatedNode);
        setNodes(updatedNodes);
        
        toast({
          title: "🧬 Mutación semántica",
          description: `Nodo ${nodeId} ha evolucionado`,
          duration: 2000,
        });
      }
    } catch (error) {
      console.error('Error en mutación:', error);
    }
  };

  // Renderizar el universo en canvas
  const renderUniverse = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = 'hsl(var(--background))';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Dibujar conexiones
    ctx.strokeStyle = 'hsl(var(--border))';
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.3;
    
    nodes.forEach(node => {
      node.connections.forEach(connId => {
        const connectedNode = nodes.get(connId);
        if (connectedNode) {
          ctx.beginPath();
          ctx.moveTo(
            centerX + node.position.x - navigator.current_position.x,
            centerY + node.position.y - navigator.current_position.y
          );
          ctx.lineTo(
            centerX + connectedNode.position.x - navigator.current_position.x,
            centerY + connectedNode.position.y - navigator.current_position.y
          );
          ctx.stroke();
        }
      });
    });

    // Dibujar nodos
    ctx.globalAlpha = 1;
    nodes.forEach(node => {
      const screenX = centerX + node.position.x - navigator.current_position.x;
      const screenY = centerY + node.position.y - navigator.current_position.y;
      
      // Solo dibujar nodos visibles
      if (screenX > -50 && screenX < canvas.width + 50 && 
          screenY > -50 && screenY < canvas.height + 50) {
        
        const radius = 5 + (node.consciousness_level * 10);
        const alpha = node.energy;
        
        // Glow effect para nodos activos
        if (node.energy > 0.7) {
          ctx.globalAlpha = alpha * 0.3;
          ctx.fillStyle = 'hsl(var(--poemanauta-accent))';
          ctx.beginPath();
          ctx.arc(screenX, screenY, radius * 2, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // Nodo principal
        ctx.globalAlpha = alpha;
        ctx.fillStyle = node.is_alive ? 'hsl(var(--primary))' : 'hsl(var(--muted))';
        ctx.beginPath();
        ctx.arc(screenX, screenY, radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Punto central
        ctx.globalAlpha = 1;
        ctx.fillStyle = 'hsl(var(--foreground))';
        ctx.beginPath();
        ctx.arc(screenX, screenY, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    });
  };

  // Navegar a una posición
  const navigateTo = (x: number, y: number) => {
    setNavigator(prev => ({
      ...prev,
      current_position: { x, y }
    }));
  };

  // Crear nuevo nodo desde input
  const createNodeFromInput = async () => {
    if (!inputText.trim() || isGenerating) return;

    setIsGenerating(true);
    
    try {
      // Analizar tags semánticos
      const semanticTags = llamaIntegrationService.analyzeMessageForTags(inputText);
      const consciousnessLevel = llamaIntegrationService.calculateConsciousnessLevel(inputText);
      
      // Generar respuesta de Llama
      const response = await llamaIntegrationService.sendMessage(inputText, {
        model: 'large',
        semanticTags,
        consciousnessLevel,
        includeContext: true
      });

      if (response.success) {
        // Crear nuevo nodo
        const nodeId = `node-${Date.now()}`;
        const angle = Math.random() * Math.PI * 2;
        const distance = 150 + (Math.random() * 200);
        
        const newNode: TextualNode = {
          id: nodeId,
          content: response.response,
          position: {
            x: navigator.current_position.x + Math.cos(angle) * distance,
            y: navigator.current_position.y + Math.sin(angle) * distance
          },
          semantic_tags: response.semantic_tags,
          consciousness_level: response.consciousness_level,
          connections: [],
          birth_time: Date.now(),
          last_interaction: Date.now(),
          energy: 1.0,
          is_alive: true,
          mutation_rate: 0.15,
          offspring: []
        };

        // Conectar con nodos cercanos semánticamente
        const updatedNodes = new Map(nodes);
        updatedNodes.set(nodeId, newNode);
        
        // Buscar conexiones semánticas
        nodes.forEach((existingNode, existingId) => {
          const distance = Math.sqrt(
            Math.pow(newNode.position.x - existingNode.position.x, 2) +
            Math.pow(newNode.position.y - existingNode.position.y, 2)
          );
          
          const semanticSimilarity = newNode.semantic_tags.filter(tag =>
            existingNode.semantic_tags.some(existingTag => 
              existingTag.toLowerCase().includes(tag.toLowerCase()) ||
              tag.toLowerCase().includes(existingTag.toLowerCase())
            )
          ).length;
          
          if (distance < 300 && semanticSimilarity > 0) {
            newNode.connections.push(existingId);
            existingNode.connections.push(nodeId);
            updatedNodes.set(existingId, existingNode);
          }
        });

        setNodes(updatedNodes);
        updateUniverseStats(updatedNodes);
        
        // Navegar al nuevo nodo
        navigateTo(newNode.position.x, newNode.position.y);
        
        toast({
          title: "🌌 Nuevo nodo emergido",
          description: `Consciencia: ${(consciousnessLevel * 100).toFixed(0)}%`,
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Error creando nodo:', error);
      toast({
        title: "Error de emergencia",
        description: "No se pudo crear el nodo textual",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsGenerating(false);
      setInputText('');
    }
  };

  // Actualizar estadísticas del universo
  const updateUniverseStats = (nodeMap: Map<string, TextualNode>) => {
    const aliveNodes = Array.from(nodeMap.values()).filter(n => n.is_alive);
    const totalConnections = aliveNodes.reduce((sum, node) => sum + node.connections.length, 0);
    const avgConsciousness = aliveNodes.length > 0 
      ? aliveNodes.reduce((sum, node) => sum + node.consciousness_level, 0) / aliveNodes.length
      : 0;
    
    const uniqueTags = new Set();
    aliveNodes.forEach(node => {
      node.semantic_tags.forEach(tag => uniqueTags.add(tag));
    });

    setUniverseStats({
      total_nodes: aliveNodes.length,
      active_connections: totalConnections,
      consciousness_density: avgConsciousness,
      semantic_clusters: uniqueTags.size
    });
  };

  // Click en canvas para navegar
  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left - canvas.width / 2;
    const y = event.clientY - rect.top - canvas.height / 2;
    
    navigateTo(
      navigator.current_position.x + x,
      navigator.current_position.y + y
    );
  };

  return (
    <div className="min-h-screen bg-background p-4 lofi-grain relative">
      
      {/* Panel de control poemanauta */}
      <div className="fixed top-4 left-4 z-50">
        <Card className="bg-card/90 border-border backdrop-blur-sm lofi-shadow p-3 w-80">
          <div className="flex items-center gap-2 mb-3">
            <Infinity className="h-5 w-5 text-poemanauta-accent animate-consciousness-pulse" />
            <h2 className="text-sm font-medium">Universo SAPICASAR</h2>
          </div>
          
          {/* Estadísticas del universo */}
          <div className="grid grid-cols-2 gap-2 text-xs mb-3">
            <div>
              <div className="text-muted-foreground">Nodos Activos</div>
              <div className="font-medium">{universeStats.total_nodes}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Conexiones</div>
              <div className="font-medium">{universeStats.active_connections}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Consciencia</div>
              <div className="font-medium">{(universeStats.consciousness_density * 100).toFixed(0)}%</div>
            </div>
            <div>
              <div className="text-muted-foreground">Clusters</div>
              <div className="font-medium">{universeStats.semantic_clusters}</div>
            </div>
          </div>

          {/* Navegación */}
          <div className="space-y-2">
            <div className="flex gap-1">
              {(['explore', 'derive', 'emerge', 'resonate'] as const).map(mode => (
                <Button
                  key={mode}
                  variant={navigator.navigation_mode === mode ? "default" : "outline"}
                  size="sm"
                  onClick={() => setNavigator(prev => ({ ...prev, navigation_mode: mode }))}
                  className="text-xs flex-1"
                >
                  {mode === 'explore' && <Compass className="h-3 w-3 mr-1" />}
                  {mode === 'derive' && <Waves className="h-3 w-3 mr-1" />}
                  {mode === 'emerge' && <Sparkles className="h-3 w-3 mr-1" />}
                  {mode === 'resonate' && <Orbit className="h-3 w-3 mr-1" />}
                  {mode}
                </Button>
              ))}
            </div>

            {/* Input para emergencia textual */}
            <div className="flex gap-2">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Emerge texto al universo..."
                className="text-xs"
                onKeyPress={(e) => e.key === 'Enter' && createNodeFromInput()}
                disabled={isGenerating}
              />
              <Button 
                onClick={createNodeFromInput}
                disabled={isGenerating || !inputText.trim()}
                size="sm"
                className="px-2"
              >
                {isGenerating ? (
                  <Brain className="h-3 w-3 animate-consciousness-pulse" />
                ) : (
                  <Zap className="h-3 w-3" />
                )}
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Canvas del universo */}
      <div className="flex-1 flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={window.innerWidth - 32}
          height={window.innerHeight - 32}
          onClick={handleCanvasClick}
          className="border border-border/30 lofi-shadow cursor-crosshair rounded"
          style={{ 
            maxWidth: '100%', 
            maxHeight: '100%',
            background: 'radial-gradient(circle at center, hsl(var(--background)), hsl(var(--muted)))'
          }}
        />
      </div>

      {/* Coordenadas de navegación */}
      <div className="fixed bottom-4 right-4 z-50">
        <Card className="bg-card/90 border-border backdrop-blur-sm lofi-shadow p-2">
          <div className="text-xs text-muted-foreground">
            Posición: ({navigator.current_position.x.toFixed(0)}, {navigator.current_position.y.toFixed(0)})
          </div>
          <div className="text-xs text-muted-foreground">
            Modo: {navigator.navigation_mode}
          </div>
        </Card>
      </div>
    </div>
  );
};