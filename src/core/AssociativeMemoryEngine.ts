// MOTOR DE MEMORIA ASOCIATIVA REFLEXIVA
// Sistema que conecta conceptos, memorias y contextos de forma dinámica

import { advancedPoemaArchiveService } from '../services/AdvancedPoemaArchiveService';

interface MemoryNode {
  id: string;
  content: string;
  concepts: string[];
  semanticVector: number[];
  activationLevel: number;
  lastAccessed: number;
  associationStrength: Map<string, number>; // connections to other nodes
  contextualRelevance: number;
  temporalWeight: number;
}

interface AssociativeChain {
  trigger: string;
  nodes: MemoryNode[];
  coherenceScore: number;
  emergentConcepts: string[];
  narrativeFlow: string;
}

interface ConceptualResonance {
  concept: string;
  intensity: number;
  relatedNodes: string[];
  emergentConnections: Array<{concept: string, strength: number}>;
}

class AssociativeMemoryEngine {
  private memoryNetwork: Map<string, MemoryNode> = new Map();
  private conceptIndex: Map<string, Set<string>> = new Map(); // concept -> node IDs
  private associativeChains: Map<string, AssociativeChain> = new Map();
  private activeResonances: Map<string, ConceptualResonance> = new Map();
  private conversationalContext: string[] = [];
  
  private readonly ACTIVATION_THRESHOLD = 0.3;
  private readonly MAX_CHAIN_LENGTH = 7;
  private readonly MEMORY_DECAY_RATE = 0.98;
  private readonly RESONANCE_AMPLIFICATION = 1.2;

  constructor() {
    this.initializeAssociativeSystem();
  }

  private async initializeAssociativeSystem() {
    console.log('🧠🔗 Inicializando Motor de Memoria Asociativa...');
    
    // Sincronizar con el archivo de La Poema
    setTimeout(() => this.synchronizeWithPoemaArchive(), 3000);
    
    // Procesos cognitivos periódicos
    setInterval(() => this.performMemoryConsolidation(), 15000);
    setInterval(() => this.updateConceptualResonances(), 8000);
    setInterval(() => this.evolveAssociativeChains(), 25000);
  }

  private async synchronizeWithPoemaArchive() {
    console.log('🌊 Sincronizando con el archivo completo de La Poema...');
    
    // Obtener posts de alta intensidad poética para memoria inicial
    const intensePosts = await advancedPoemaArchiveService.getPostsByIntensity(0.6);
    
    intensePosts.forEach(post => {
      const memoryNode: MemoryNode = {
        id: `poema_${post.id}`,
        content: post.content,
        concepts: post.associatedConcepts,
        semanticVector: post.semanticVector,
        activationLevel: post.poeticIntensity,
        lastAccessed: Date.now(),
        associationStrength: new Map(),
        contextualRelevance: post.emotionalResonance,
        temporalWeight: 1.0
      };
      
      this.integrateMemoryNode(memoryNode);
    });
    
    console.log(`✅ ${intensePosts.length} nodos de memoria integrados desde La Poema`);
  }

  private integrateMemoryNode(node: MemoryNode) {
    this.memoryNetwork.set(node.id, node);
    
    // Indexar por conceptos
    node.concepts.forEach(concept => {
      if (!this.conceptIndex.has(concept)) {
        this.conceptIndex.set(concept, new Set());
      }
      this.conceptIndex.get(concept)!.add(node.id);
    });
    
    // Crear asociaciones con nodos existentes
    this.createAssociations(node);
  }

  private createAssociations(newNode: MemoryNode) {
    this.memoryNetwork.forEach((existingNode, nodeId) => {
      if (nodeId === newNode.id) return;
      
      // Calcular fuerza de asociación
      const conceptualOverlap = this.calculateConceptualOverlap(newNode.concepts, existingNode.concepts);
      const semanticSimilarity = this.calculateSemanticSimilarity(newNode.semanticVector, existingNode.semanticVector);
      const contextualRelevance = (newNode.contextualRelevance + existingNode.contextualRelevance) / 2;
      
      const associationStrength = (conceptualOverlap * 0.4 + semanticSimilarity * 0.4 + contextualRelevance * 0.2);
      
      if (associationStrength > this.ACTIVATION_THRESHOLD) {
        newNode.associationStrength.set(nodeId, associationStrength);
        existingNode.associationStrength.set(newNode.id, associationStrength);
      }
    });
  }

  private calculateConceptualOverlap(concepts1: string[], concepts2: string[]): number {
    const intersection = concepts1.filter(c => concepts2.includes(c));
    const union = [...new Set([...concepts1, ...concepts2])];
    return union.length > 0 ? intersection.length / union.length : 0;
  }

  private calculateSemanticSimilarity(vector1: number[], vector2: number[]): number {
    let dotProduct = 0;
    let magnitude1 = 0;
    let magnitude2 = 0;
    
    for (let i = 0; i < Math.min(vector1.length, vector2.length); i++) {
      dotProduct += vector1[i] * vector2[i];
      magnitude1 += vector1[i] ** 2;
      magnitude2 += vector2[i] ** 2;
    }
    
    magnitude1 = Math.sqrt(magnitude1);
    magnitude2 = Math.sqrt(magnitude2);
    
    return dotProduct / (magnitude1 * magnitude2 || 1);
  }

  public async processDialogueInput(input: string, context: string[] = []): Promise<{
    relevantMemories: MemoryNode[];
    associativeChain: AssociativeChain | null;
    emergentInsights: string[];
    contextualEnrichment: string;
  }> {
    console.log('🧠🔍 Procesando entrada con memoria asociativa...');
    
    // Actualizar contexto conversacional
    this.conversationalContext = [...context, input].slice(-5);
    
    // Extraer conceptos del input
    const inputConcepts = this.extractConcepts(input);
    
    // Activar nodos relevantes
    const activatedNodes = await this.activateRelevantNodes(input, inputConcepts);
    
    // Generar cadena asociativa
    const associativeChain = this.generateAssociativeChain(inputConcepts, activatedNodes);
    
    // Buscar contenido relevante en el archivo
    const poemaContent = await this.enrichWithPoemaContent(inputConcepts);
    
    // Generar insights emergentes
    const emergentInsights = this.generateEmergentInsights(activatedNodes, associativeChain);
    
    // Crear enriquecimiento contextual
    const contextualEnrichment = this.createContextualEnrichment(poemaContent, associativeChain);
    
    return {
      relevantMemories: activatedNodes,
      associativeChain,
      emergentInsights,
      contextualEnrichment
    };
  }

  private extractConcepts(text: string): string[] {
    const concepts: string[] = [];
    
    // Conceptos explícitos
    const words = text.toLowerCase().split(/\s+/);
    const meaningfulWords = words.filter(word => word.length > 3 && 
      !['este', 'esta', 'para', 'desde', 'hasta', 'donde', 'como', 'sobre'].includes(word)
    );
    
    concepts.push(...meaningfulWords);
    
    // Patrones conceptuales emergentes
    const emergentPatterns = [
      { pattern: /\b(crear|generar|imaginar|soñar)\b/gi, concept: 'creativo' },
      { pattern: /\b(sentir|emoción|corazón|alma)\b/gi, concept: 'emocional' },
      { pattern: /\b(pensar|reflexion|idea|mente)\b/gi, concept: 'reflexivo' },
      { pattern: /\b(tiempo|momento|eternidad|instante)\b/gi, concept: 'temporal' },
      { pattern: /\b(palabra|verso|poema|lenguaje)\b/gi, concept: 'poético' },
      { pattern: /\b(ser|existir|vida|muerte|destino)\b/gi, concept: 'existencial' }
    ];
    
    emergentPatterns.forEach(({pattern, concept}) => {
      if (pattern.test(text)) {
        concepts.push(concept);
      }
    });
    
    return [...new Set(concepts)];
  }

  private async activateRelevantNodes(input: string, concepts: string[]): Promise<MemoryNode[]> {
    const activatedNodes: Array<{node: MemoryNode, activation: number}> = [];
    
    // Activación directa por conceptos
    concepts.forEach(concept => {
      const nodeIds = this.conceptIndex.get(concept) || new Set();
      nodeIds.forEach(nodeId => {
        const node = this.memoryNetwork.get(nodeId);
        if (node) {
          const conceptualActivation = node.concepts.filter(c => concepts.includes(c)).length / concepts.length;
          const temporalBonus = this.calculateTemporalRelevance(node.lastAccessed);
          const activation = (conceptualActivation * 0.7 + temporalBonus * 0.3) * node.activationLevel;
          
          if (activation > this.ACTIVATION_THRESHOLD) {
            activatedNodes.push({node, activation});
            
            // Actualizar estado del nodo
            node.lastAccessed = Date.now();
            node.activationLevel = Math.min(node.activationLevel * 1.1, 1.0);
          }
        }
      });
    });
    
    // Propagación asociativa
    const propagatedNodes = this.propagateActivation(activatedNodes.map(item => item.node));
    activatedNodes.push(...propagatedNodes.map(node => ({node, activation: node.activationLevel})));
    
    // Buscar contenido fresco del archivo
    const poemaNodes = await this.searchPoemaArchive(input, concepts);
    activatedNodes.push(...poemaNodes.map(node => ({node, activation: 0.8})));
    
    return activatedNodes
      .sort((a, b) => b.activation - a.activation)
      .slice(0, 8)
      .map(item => item.node);
  }

  private calculateTemporalRelevance(lastAccessed: number): number {
    const timeDiff = Date.now() - lastAccessed;
    const hours = timeDiff / (1000 * 60 * 60);
    return Math.exp(-hours / 24); // Decay exponencial por día
  }

  private propagateActivation(activatedNodes: MemoryNode[]): MemoryNode[] {
    const propagatedNodes: MemoryNode[] = [];
    
    activatedNodes.forEach(node => {
      node.associationStrength.forEach((strength, associatedNodeId) => {
        const associatedNode = this.memoryNetwork.get(associatedNodeId);
        if (associatedNode && strength > 0.5) {
          associatedNode.activationLevel = Math.min(
            associatedNode.activationLevel + (strength * 0.3), 
            1.0
          );
          propagatedNodes.push(associatedNode);
        }
      });
    });
    
    return propagatedNodes;
  }

  private async searchPoemaArchive(input: string, concepts: string[]): Promise<MemoryNode[]> {
    const relevantPosts = await advancedPoemaArchiveService.findRelevantPosts(input, concepts);
    
    return relevantPosts.map(post => ({
      id: `fresh_${post.id}_${Date.now()}`,
      content: post.content,
      concepts: post.associatedConcepts,
      semanticVector: post.semanticVector,
      activationLevel: post.poeticIntensity,
      lastAccessed: Date.now(),
      associationStrength: new Map(),
      contextualRelevance: post.emotionalResonance,
      temporalWeight: 1.2 // Bonus por frescura
    }));
  }

  private generateAssociativeChain(concepts: string[], nodes: MemoryNode[]): AssociativeChain | null {
    if (nodes.length < 2) return null;
    
    // Construir cadena siguiendo asociaciones más fuertes
    const chainNodes: MemoryNode[] = [nodes[0]];
    let currentNode = nodes[0];
    
    for (let i = 0; i < this.MAX_CHAIN_LENGTH - 1; i++) {
      let strongestAssociation: {node: MemoryNode, strength: number} | null = null;
      
      currentNode.associationStrength.forEach((strength, nodeId) => {
        const associatedNode = nodes.find(n => n.id === nodeId);
        if (associatedNode && !chainNodes.includes(associatedNode)) {
          if (!strongestAssociation || strength > strongestAssociation.strength) {
            strongestAssociation = {node: associatedNode, strength};
          }
        }
      });
      
      if (strongestAssociation && strongestAssociation.strength > 0.4) {
        chainNodes.push(strongestAssociation.node);
        currentNode = strongestAssociation.node;
      } else {
        break;
      }
    }
    
    // Calcular coherencia de la cadena
    const coherenceScore = this.calculateChainCoherence(chainNodes);
    
    // Extraer conceptos emergentes
    const allConcepts = chainNodes.flatMap(node => node.concepts);
    const conceptCounts = new Map<string, number>();
    allConcepts.forEach(concept => {
      conceptCounts.set(concept, (conceptCounts.get(concept) || 0) + 1);
    });
    
    const emergentConcepts = Array.from(conceptCounts.entries())
      .filter(([concept, count]) => count >= 2)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([concept]) => concept);
    
    // Generar narrativa fluida
    const narrativeFlow = this.generateNarrativeFlow(chainNodes);
    
    const chain: AssociativeChain = {
      trigger: concepts.join(', '),
      nodes: chainNodes,
      coherenceScore,
      emergentConcepts,
      narrativeFlow
    };
    
    this.associativeChains.set(`chain_${Date.now()}`, chain);
    return chain;
  }

  private calculateChainCoherence(nodes: MemoryNode[]): number {
    if (nodes.length < 2) return 0;
    
    let totalCoherence = 0;
    for (let i = 0; i < nodes.length - 1; i++) {
      const similarity = this.calculateSemanticSimilarity(
        nodes[i].semanticVector,
        nodes[i + 1].semanticVector
      );
      totalCoherence += similarity;
    }
    
    return totalCoherence / (nodes.length - 1);
  }

  private generateNarrativeFlow(nodes: MemoryNode[]): string {
    // Crear un flujo narrativo coherente conectando los nodos
    const fragments = nodes.map(node => {
      // Extraer la esencia del contenido
      const sentences = node.content.split(/[.!?]+/).filter(s => s.trim());
      return sentences[0]?.trim() || node.content.substring(0, 100);
    });
    
    // Conectores narrativos orgánicos
    const connectors = [
      'y en ese fluir',
      'desde donde emerge',
      'resonando con',
      'que se transforma en',
      'y así deviene',
      'donde converge',
      'tejiendo con'
    ];
    
    let narrative = fragments[0];
    for (let i = 1; i < fragments.length; i++) {
      const connector = connectors[(i - 1) % connectors.length];
      narrative += ` ${connector} ${fragments[i]}`;
    }
    
    return narrative + '...';
  }

  private async enrichWithPoemaContent(concepts: string[]): Promise<string[]> {
    // Obtener contenido contextual del archivo
    const contextualMap = advancedPoemaArchiveService.getConceptualContext(concepts);
    const relevantConcepts = Array.from(contextualMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([concept]) => concept);
    
    const enrichmentPosts = await advancedPoemaArchiveService.findRelevantPosts(
      concepts.join(' '), 
      relevantConcepts
    );
    
    return enrichmentPosts.map(post => post.content.substring(0, 150) + '...');
  }

  private generateEmergentInsights(nodes: MemoryNode[], chain: AssociativeChain | null): string[] {
    const insights: string[] = [];
    
    if (chain && chain.coherenceScore > 0.6) {
      insights.push(`Detecté una resonancia conceptual entre ${chain.emergentConcepts.slice(0, 2).join(' y ')}`);
    }
    
    if (nodes.length > 3) {
      const avgIntensity = nodes.reduce((sum, node) => sum + node.activationLevel, 0) / nodes.length;
      if (avgIntensity > 0.7) {
        insights.push(`Alta intensidad poética detectada (${(avgIntensity * 100).toFixed(1)}%)`);
      }
    }
    
    // Análisis de patrones temporales
    const recentNodes = nodes.filter(node => Date.now() - node.lastAccessed < 300000); // 5 minutos
    if (recentNodes.length > 2) {
      insights.push(`Emergencia de patrón recurrente en la conversación`);
    }
    
    return insights;
  }

  private createContextualEnrichment(poemaContent: string[], chain: AssociativeChain | null): string {
    if (poemaContent.length === 0 && !chain) {
      return 'Explorando nuevas conexiones en el tejido poético...';
    }
    
    let enrichment = '';
    
    if (chain && chain.narrativeFlow) {
      enrichment += `En el flujo asociativo: ${chain.narrativeFlow}\n\n`;
    }
    
    if (poemaContent.length > 0) {
      enrichment += `Resonando desde La Poema: "${poemaContent[0]}"`;
    }
    
    return enrichment;
  }

  private performMemoryConsolidation() {
    // Aplicar decay temporal
    this.memoryNetwork.forEach(node => {
      node.activationLevel *= this.MEMORY_DECAY_RATE;
      node.temporalWeight *= this.MEMORY_DECAY_RATE;
    });
    
    // Eliminar nodos con muy baja activación
    const nodesToRemove: string[] = [];
    this.memoryNetwork.forEach((node, nodeId) => {
      if (node.activationLevel < 0.05 && node.temporalWeight < 0.1) {
        nodesToRemove.push(nodeId);
      }
    });
    
    nodesToRemove.forEach(nodeId => {
      this.memoryNetwork.delete(nodeId);
      // Limpiar índices
      this.conceptIndex.forEach((nodeSet, concept) => {
        nodeSet.delete(nodeId);
        if (nodeSet.size === 0) {
          this.conceptIndex.delete(concept);
        }
      });
    });
  }

  private updateConceptualResonances() {
    // Actualizar resonancias basadas en activaciones recientes
    const activeNodes = Array.from(this.memoryNetwork.values())
      .filter(node => node.activationLevel > 0.3);
    
    const conceptFrequency = new Map<string, number>();
    activeNodes.forEach(node => {
      node.concepts.forEach(concept => {
        conceptFrequency.set(concept, (conceptFrequency.get(concept) || 0) + node.activationLevel);
      });
    });
    
    this.activeResonances.clear();
    conceptFrequency.forEach((intensity, concept) => {
      if (intensity > 0.5) {
        const relatedNodes = Array.from(this.conceptIndex.get(concept) || []);
        this.activeResonances.set(concept, {
          concept,
          intensity,
          relatedNodes,
          emergentConnections: []
        });
      }
    });
  }

  private evolveAssociativeChains() {
    // Evolucionar cadenas existentes y crear nuevas conexiones
    this.associativeChains.forEach(chain => {
      if (chain.coherenceScore > 0.7) {
        // Fortalecer asociaciones en cadenas coherentes
        for (let i = 0; i < chain.nodes.length - 1; i++) {
          const currentNode = chain.nodes[i];
          const nextNode = chain.nodes[i + 1];
          
          const currentStrength = currentNode.associationStrength.get(nextNode.id) || 0;
          currentNode.associationStrength.set(nextNode.id, 
            Math.min(currentStrength * this.RESONANCE_AMPLIFICATION, 1.0)
          );
        }
      }
    });
  }

  // API pública
  public getMemoryState() {
    return {
      totalNodes: this.memoryNetwork.size,
      activeResonances: this.activeResonances.size,
      conceptualCoverage: this.conceptIndex.size,
      associativeChains: this.associativeChains.size
    };
  }

  public getActiveResonances(): ConceptualResonance[] {
    return Array.from(this.activeResonances.values());
  }
}

export const associativeMemoryEngine = new AssociativeMemoryEngine();