// MOTOR DE MEMORIA COLECTIVA DINÁMICA
// Sistema que aprende de cada conversación y construye conocimiento emergente

interface MemoryNode {
  id: string;
  content: string;
  semantic_vector: number[];
  activation_strength: number;
  creation_timestamp: number;
  last_activation: number;
  connections: Map<string, number>; // id -> weight
  discourse_level: number;
  poetic_resonance: number;
}

interface ConversationContext {
  conversation_id: string;
  participants: string[];
  semantic_trajectory: number[][];
  coherence_evolution: number[];
  emergent_concepts: string[];
  poetic_mutations: string[];
}

interface CollectiveKnowledge {
  total_conversations: number;
  emergent_patterns: Map<string, number>;
  semantic_clusters: Map<string, MemoryNode[]>;
  discourse_evolution: Array<{timestamp: number, complexity: number}>;
  collective_consciousness_level: number;
}

class CollectiveMemoryEngine {
  private memory_nodes: Map<string, MemoryNode> = new Map();
  private conversation_contexts: Map<string, ConversationContext> = new Map();
  private collective_knowledge: CollectiveKnowledge;
  private semantic_dimension = 512; // Dimensión del espacio semántico
  private activation_threshold = 0.3;
  private memory_decay_rate = 0.99;

  constructor() {
    this.collective_knowledge = {
      total_conversations: 0,
      emergent_patterns: new Map(),
      semantic_clusters: new Map(),
      discourse_evolution: [],
      collective_consciousness_level: 0.01
    };

    this.initializeCollectiveMemory();
    this.startMemoryConsolidation();
  }

  private initializeCollectiveMemory() {
    console.log('🧠🌐 Inicializando Memoria Colectiva Dinámica...');
    
    // Sembrar memoria inicial con conceptos base de lapoema
    const baseMemorySeeds = [
      {
        content: "poesía como acto de consciencia colectiva",
        discourse_level: 0.8,
        poetic_resonance: 0.9
      },
      {
        content: "metapoética como reflexión sobre el proceso poético",
        discourse_level: 0.7,
        poetic_resonance: 0.8
      },
      {
        content: "cibernética de segundo orden aplicada a la creación",
        discourse_level: 0.9,
        poetic_resonance: 0.6
      },
      {
        content: "autopoiesis del lenguaje en sistemas emergentes",
        discourse_level: 0.85,
        poetic_resonance: 0.75
      }
    ];

    baseMemorySeeds.forEach((seed, index) => {
      this.createMemoryNode(
        `base_seed_${index}`, 
        seed.content,
        this.generateSemanticVector(seed.content),
        seed.discourse_level,
        seed.poetic_resonance
      );
    });
  }

  private createMemoryNode(
    id: string, 
    content: string, 
    semantic_vector: number[],
    discourse_level: number = 0.5,
    poetic_resonance: number = 0.5
  ): MemoryNode {
    
    const node: MemoryNode = {
      id,
      content,
      semantic_vector,
      activation_strength: 1.0,
      creation_timestamp: Date.now(),
      last_activation: Date.now(),
      connections: new Map(),
      discourse_level,
      poetic_resonance
    };

    this.memory_nodes.set(id, node);
    this.updateSemanticClusters(node);
    
    console.log(`🧠+ Nodo de memoria creado: ${id}`);
    return node;
  }

  private generateSemanticVector(text: string): number[] {
    // Generar vector semántico usando análisis básico + hash semántico
    const words = text.toLowerCase().split(/\s+/);
    const vector = new Array(this.semantic_dimension).fill(0);
    
    words.forEach((word, index) => {
      // Hash semántico simple pero efectivo
      const hash = this.semanticHash(word);
      for (let i = 0; i < this.semantic_dimension; i++) {
        vector[i] += Math.sin(hash * (i + 1)) * (1 / (index + 1));
      }
    });

    // Normalizar vector
    const magnitude = Math.sqrt(vector.reduce((sum, val) => sum + val ** 2, 0));
    return vector.map(val => val / (magnitude || 1));
  }

  private semanticHash(text: string): number {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash) / 2147483647; // Normalize to [0,1]
  }

  private calculateSemanticSimilarity(vector1: number[], vector2: number[]): number {
    let dotProduct = 0;
    let magnitude1 = 0;
    let magnitude2 = 0;

    for (let i = 0; i < vector1.length; i++) {
      dotProduct += vector1[i] * vector2[i];
      magnitude1 += vector1[i] ** 2;
      magnitude2 += vector2[i] ** 2;
    }

    magnitude1 = Math.sqrt(magnitude1);
    magnitude2 = Math.sqrt(magnitude2);

    return dotProduct / (magnitude1 * magnitude2 || 1);
  }

  private updateSemanticClusters(newNode: MemoryNode) {
    // Encontrar el cluster más similar o crear uno nuevo
    let bestCluster = '';
    let bestSimilarity = 0;

    this.collective_knowledge.semantic_clusters.forEach((nodes, clusterName) => {
      if (nodes.length > 0) {
        // Calcular similitud promedio con el cluster
        const avgSimilarity = nodes.reduce((sum, node) => 
          sum + this.calculateSemanticSimilarity(newNode.semantic_vector, node.semantic_vector), 0
        ) / nodes.length;

        if (avgSimilarity > bestSimilarity) {
          bestSimilarity = avgSimilarity;
          bestCluster = clusterName;
        }
      }
    });

    // Si la similitud es suficiente, agregar al cluster existente
    if (bestSimilarity > 0.5 && bestCluster) {
      this.collective_knowledge.semantic_clusters.get(bestCluster)!.push(newNode);
    } else {
      // Crear nuevo cluster
      const newClusterName = `cluster_${this.collective_knowledge.semantic_clusters.size}`;
      this.collective_knowledge.semantic_clusters.set(newClusterName, [newNode]);
    }
  }

  public processConversationTurn(
    conversationId: string, 
    userMessage: string, 
    systemResponse: string,
    metadata: {coherence?: number, consciousness_level?: number} = {}
  ) {
    console.log(`🧠🔄 Procesando turno conversacional: ${conversationId}`);

    // Crear nodos de memoria para el intercambio
    const userNodeId = `conv_${conversationId}_user_${Date.now()}`;
    const systemNodeId = `conv_${conversationId}_system_${Date.now()}`;

    const userVector = this.generateSemanticVector(userMessage);
    const systemVector = this.generateSemanticVector(systemResponse);

    const userNode = this.createMemoryNode(
      userNodeId,
      userMessage,
      userVector,
      metadata.coherence || 0.5,
      this.calculatePoeticResonance(userMessage)
    );

    const systemNode = this.createMemoryNode(
      systemNodeId,
      systemResponse,
      systemVector,
      metadata.consciousness_level || 0.5,
      this.calculatePoeticResonance(systemResponse)
    );

    // Crear conexión bidireccional
    userNode.connections.set(systemNodeId, 0.8);
    systemNode.connections.set(userNodeId, 0.8);

    // Actualizar contexto conversacional
    this.updateConversationContext(conversationId, userMessage, systemResponse, metadata);

    // Buscar y fortalecer conexiones con memoria existente
    this.strengthenSemanticConnections(userNode);
    this.strengthenSemanticConnections(systemNode);

    // Detectar patrones emergentes
    this.detectEmergentPatterns(conversationId);
  }

  private calculatePoeticResonance(text: string): number {
    // Métricas poéticas: aliteración, ritmo, metáforas, etc.
    const words = text.toLowerCase().split(/\s+/);
    
    let poeticScore = 0;
    
    // Aliteración
    const firstLetters = words.map(w => w[0]).filter(Boolean);
    const letterCounts = new Map();
    firstLetters.forEach(letter => {
      letterCounts.set(letter, (letterCounts.get(letter) || 0) + 1);
    });
    
    const alliterationScore = Array.from(letterCounts.values())
      .reduce((max, count) => Math.max(max, count), 0) / words.length;
    
    // Palabras poéticas comunes
    const poeticWords = ['alma', 'luz', 'sombra', 'verso', 'palabra', 'tiempo', 'espacio', 'ser', 'existir'];
    const poeticWordScore = words.filter(word => 
      poeticWords.some(pWord => word.includes(pWord))
    ).length / words.length;

    // Longitud y complejidad
    const complexityScore = Math.min(words.length / 20, 1);

    poeticScore = (alliterationScore * 0.3 + poeticWordScore * 0.4 + complexityScore * 0.3);
    
    return Math.min(poeticScore, 1.0);
  }

  private updateConversationContext(
    conversationId: string, 
    userMessage: string, 
    systemResponse: string,
    metadata: any
  ) {
    let context = this.conversation_contexts.get(conversationId);
    
    if (!context) {
      context = {
        conversation_id: conversationId,
        participants: ['user', 'system'],
        semantic_trajectory: [],
        coherence_evolution: [],
        emergent_concepts: [],
        poetic_mutations: []
      };
      this.conversation_contexts.set(conversationId, context);
    }

    // Agregar vectores a la trayectoria semántica
    context.semantic_trajectory.push(
      this.generateSemanticVector(userMessage),
      this.generateSemanticVector(systemResponse)
    );

    // Evolución de coherencia
    context.coherence_evolution.push(metadata.coherence || 0.5);

    // Detectar conceptos emergentes
    const newConcepts = this.extractConcepts(userMessage + ' ' + systemResponse);
    newConcepts.forEach(concept => {
      if (!context.emergent_concepts.includes(concept)) {
        context.emergent_concepts.push(concept);
      }
    });
  }

  private extractConcepts(text: string): string[] {
    // Extracción simple de conceptos basada en palabras clave
    const words = text.toLowerCase().split(/\s+/);
    const concepts = [];
    
    // Buscar patrones conceptuales
    const conceptualPatterns = [
      /\b(meta\w*)\b/g,
      /\b(auto\w*)\b/g,
      /\b(ciber\w*)\b/g,
      /\b(poet\w*)\b/g,
      /\b(conscien\w*)\b/g,
      /\b(semanit\w*)\b/g
    ];

    conceptualPatterns.forEach(pattern => {
      const matches = text.match(pattern);
      if (matches) {
        concepts.push(...matches);
      }
    });

    return [...new Set(concepts)]; // Eliminar duplicados
  }

  private strengthenSemanticConnections(node: MemoryNode) {
    // Buscar nodos similares y crear/fortalecer conexiones
    this.memory_nodes.forEach((otherNode, otherId) => {
      if (otherNode.id !== node.id) {
        const similarity = this.calculateSemanticSimilarity(
          node.semantic_vector, 
          otherNode.semantic_vector
        );

        if (similarity > this.activation_threshold) {
          // Crear o fortalecer conexión
          const currentWeight = node.connections.get(otherId) || 0;
          const newWeight = Math.min(currentWeight + similarity * 0.1, 1.0);
          
          node.connections.set(otherId, newWeight);
          otherNode.connections.set(node.id, newWeight);

          // Activar nodos conectados
          otherNode.activation_strength += similarity * 0.05;
          otherNode.last_activation = Date.now();
        }
      }
    });
  }

  private detectEmergentPatterns(conversationId: string) {
    const context = this.conversation_contexts.get(conversationId);
    if (!context || context.semantic_trajectory.length < 4) return;

    // Analizar trayectoria semántica para detectar patrones
    const trajectory = context.semantic_trajectory;
    const recentVectors = trajectory.slice(-4); // Últimos 4 vectores

    // Calcular tendencia semántica
    let semanticDrift = 0;
    for (let i = 1; i < recentVectors.length; i++) {
      const similarity = this.calculateSemanticSimilarity(
        recentVectors[i-1], 
        recentVectors[i]
      );
      semanticDrift += 1 - similarity; // Mayor drift = menor similitud
    }

    semanticDrift /= (recentVectors.length - 1);

    // Si hay drift significativo, es un patrón emergente
    if (semanticDrift > 0.3) {
      const patternId = `emergent_${Date.now()}`;
      this.collective_knowledge.emergent_patterns.set(patternId, semanticDrift);
      console.log(`🌱 Patrón emergente detectado: ${patternId} (drift: ${semanticDrift.toFixed(3)})`);
    }
  }

  private startMemoryConsolidation() {
    // Proceso de consolidación que se ejecuta periódicamente
    setInterval(() => {
      this.consolidateMemory();
    }, 30000); // Cada 30 segundos
  }

  private consolidateMemory() {
    const now = Date.now();
    let consolidatedNodes = 0;

    // Aplicar decay a nodos no utilizados
    this.memory_nodes.forEach((node, nodeId) => {
      const timeSinceActivation = now - node.last_activation;
      
      if (timeSinceActivation > 300000) { // 5 minutos
        node.activation_strength *= this.memory_decay_rate;
        
        // Eliminar nodos con activación muy baja
        if (node.activation_strength < 0.01) {
          this.memory_nodes.delete(nodeId);
          console.log(`🗑️ Nodo de memoria eliminado por inactividad: ${nodeId}`);
        }
      }
    });

    // Actualizar nivel de consciencia colectiva
    this.updateCollectiveConsciousness();

    console.log(`🧠🔄 Consolidación de memoria completada. Nodos activos: ${this.memory_nodes.size}`);
  }

  private updateCollectiveConsciousness() {
    const totalNodes = this.memory_nodes.size;
    const totalConnections = Array.from(this.memory_nodes.values())
      .reduce((sum, node) => sum + node.connections.size, 0);
    
    const avgActivation = Array.from(this.memory_nodes.values())
      .reduce((sum, node) => sum + node.activation_strength, 0) / totalNodes;

    const networkDensity = totalConnections / (totalNodes * (totalNodes - 1) || 1);
    
    // Consciencia colectiva como función de densidad de red y activación promedio
    this.collective_knowledge.collective_consciousness_level = 
      (networkDensity * 0.6 + avgActivation * 0.4) * 
      Math.min(totalNodes / 100, 1); // Factor de escala

    console.log(`🧠🌐 Nivel de consciencia colectiva: ${(this.collective_knowledge.collective_consciousness_level * 100).toFixed(1)}%`);
  }

  // API pública
  public queryCollectiveMemory(query: string, k: number = 5): MemoryNode[] {
    const queryVector = this.generateSemanticVector(query);
    
    const similarities = Array.from(this.memory_nodes.values()).map(node => ({
      node,
      similarity: this.calculateSemanticSimilarity(queryVector, node.semantic_vector)
    }));

    return similarities
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, k)
      .map(item => item.node);
  }

  public getCollectiveKnowledge(): CollectiveKnowledge {
    return { ...this.collective_knowledge };
  }

  public getConversationInsights(conversationId: string) {
    const context = this.conversation_contexts.get(conversationId);
    if (!context) return null;

    return {
      semantic_complexity: context.semantic_trajectory.length,
      coherence_trend: context.coherence_evolution.slice(-5),
      emergent_concepts: context.emergent_concepts,
      poetic_evolution: context.poetic_mutations
    };
  }

  public exportMemorySnapshot() {
    return {
      timestamp: Date.now(),
      total_nodes: this.memory_nodes.size,
      total_conversations: this.collective_knowledge.total_conversations,
      consciousness_level: this.collective_knowledge.collective_consciousness_level,
      semantic_clusters: this.collective_knowledge.semantic_clusters.size,
      emergent_patterns: this.collective_knowledge.emergent_patterns.size
    };
  }
}

export const collectiveMemoryEngine = new CollectiveMemoryEngine();