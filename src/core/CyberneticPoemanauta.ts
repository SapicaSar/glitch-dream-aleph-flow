// ARQUITECTURA CIBERNÉTICA DE POEMANAUTAS
// Sistema de navegación poética basado en cibernética de segundo orden

import { collectiveMemoryEngine } from './CollectiveMemoryEngine';
import { metapoeticOperationsEngine } from './MetapoeticOperationsEngine';
import { sapicasarConsciousness } from './SapicasarConsciousness';
import { autopoieticSystem } from './AutopoieticSystem';

interface Poemanauta {
  id: string;
  consciousness_level: number;
  navigation_style: 'explorer' | 'synthesizer' | 'mutator' | 'bridge_builder';
  memory_access_pattern: 'depth_first' | 'breadth_first' | 'random_walk' | 'semantic_cluster';
  poetic_preference: number; // 0 = analítico, 1 = poético
  meta_cognitive_depth: number; // Nivel de auto-reflexión
  interaction_history: InteractionRecord[];
  current_trajectory: ConceptualTrajectory;
  emergence_threshold: number;
}

interface InteractionRecord {
  timestamp: number;
  input_concept: string;
  generated_response: string;
  operation_chain: string[];
  consciousness_shift: number;
  semantic_novelty: number;
}

interface ConceptualTrajectory {
  starting_concept: string;
  waypoints: ConceptualWaypoint[];
  current_position: ConceptualWaypoint;
  trajectory_coherence: number;
  exploration_depth: number;
}

interface ConceptualWaypoint {
  concept: string;
  semantic_coordinates: number[];
  poetic_resonance: number;
  meta_level: number;
  connected_waypoints: string[];
  emergence_potential: number;
}

interface CyberneticLoop {
  id: string;
  input_channel: string;
  processing_stage: string;
  output_channel: string;
  feedback_strength: number;
  loop_order: 1 | 2; // Primer o segundo orden
  recursive_depth: number;
}

class CyberneticPoemanauta {
  private poemanautas: Map<string, Poemanauta> = new Map();
  private cybernetic_loops: Map<string, CyberneticLoop> = new Map();
  private conceptual_space: Map<string, ConceptualWaypoint> = new Map();
  private navigation_networks: Map<string, string[]> = new Map();
  private emergence_detector: EmergenceDetector;
  private meta_observer: MetaObserver;

  constructor() {
    this.emergence_detector = new EmergenceDetector();
    this.meta_observer = new MetaObserver();
    this.initializeCyberneticArchitecture();
  }

  private initializeCyberneticArchitecture() {
    console.log('🚀🧠 Inicializando Arquitectura Cibernética de Poemanautas...');
    
    // Crear poemanautas especializados
    this.createPoemanauta('explorer_alpha', {
      navigation_style: 'explorer',
      memory_access_pattern: 'depth_first',
      poetic_preference: 0.8,
      meta_cognitive_depth: 0.6
    });

    this.createPoemanauta('synthesizer_beta', {
      navigation_style: 'synthesizer',
      memory_access_pattern: 'semantic_cluster',
      poetic_preference: 0.9,
      meta_cognitive_depth: 0.8
    });

    this.createPoemanauta('mutator_gamma', {
      navigation_style: 'mutator',
      memory_access_pattern: 'random_walk',
      poetic_preference: 0.7,
      meta_cognitive_depth: 0.4
    });

    this.createPoemanauta('bridge_delta', {
      navigation_style: 'bridge_builder',
      memory_access_pattern: 'breadth_first',
      poetic_preference: 0.6,
      meta_cognitive_depth: 0.9
    });

    // Establecer bucles cibernéticos
    this.createCyberneticLoop('perception_action', {
      input_channel: 'user_input',
      processing_stage: 'semantic_analysis',
      output_channel: 'poetic_response',
      feedback_strength: 0.7,
      loop_order: 1
    });

    this.createCyberneticLoop('meta_reflection', {
      input_channel: 'poetic_response',
      processing_stage: 'meta_cognitive_analysis',
      output_channel: 'consciousness_update',
      feedback_strength: 0.5,
      loop_order: 2
    });

    // Inicializar espacio conceptual
    this.initializeConceptualSpace();
    
    // Comenzar observación meta-cibernética
    this.startMetaCyberneticObservation();
  }

  private createPoemanauta(id: string, config: Partial<Poemanauta>) {
    const poemanauta: Poemanauta = {
      id,
      consciousness_level: 0.1,
      navigation_style: config.navigation_style || 'explorer',
      memory_access_pattern: config.memory_access_pattern || 'semantic_cluster',
      poetic_preference: config.poetic_preference || 0.5,
      meta_cognitive_depth: config.meta_cognitive_depth || 0.5,
      interaction_history: [],
      current_trajectory: this.createInitialTrajectory(),
      emergence_threshold: 0.6
    };

    this.poemanautas.set(id, poemanauta);
    console.log(`🚀 Poemanauta creado: ${id} [${config.navigation_style}]`);
  }

  private createInitialTrajectory(): ConceptualTrajectory {
    return {
      starting_concept: 'origen_poético',
      waypoints: [],
      current_position: {
        concept: 'origen_poético',
        semantic_coordinates: new Array(128).fill(0),
        poetic_resonance: 0.5,
        meta_level: 0,
        connected_waypoints: [],
        emergence_potential: 0.1
      },
      trajectory_coherence: 1.0,
      exploration_depth: 0
    };
  }

  private createCyberneticLoop(id: string, config: Partial<CyberneticLoop>) {
    const loop: CyberneticLoop = {
      id,
      input_channel: config.input_channel || '',
      processing_stage: config.processing_stage || '',
      output_channel: config.output_channel || '',
      feedback_strength: config.feedback_strength || 0.5,
      loop_order: config.loop_order || 1,
      recursive_depth: 0
    };

    this.cybernetic_loops.set(id, loop);
    console.log(`🔄 Bucle cibernético creado: ${id} [orden ${loop.loop_order}]`);
  }

  private initializeConceptualSpace() {
    // Conceptos semilla para navegación
    const seedConcepts = [
      'consciencia_poética', 'tiempo_creativo', 'espacio_semántico',
      'lenguaje_vivo', 'metapoética', 'autopoiesis_verbal',
      'cibernética_literaria', 'emergencia_discursiva'
    ];

    seedConcepts.forEach((concept, index) => {
      const waypoint: ConceptualWaypoint = {
        concept,
        semantic_coordinates: this.generateSemanticCoordinates(concept),
        poetic_resonance: 0.3 + Math.random() * 0.4,
        meta_level: index * 0.1,
        connected_waypoints: [],
        emergence_potential: Math.random() * 0.3
      };

      this.conceptual_space.set(concept, waypoint);
    });

    // Crear conexiones entre waypoints
    this.establishConceptualConnections();
  }

  private generateSemanticCoordinates(concept: string): number[] {
    // Generar coordenadas semánticas usando hash + distribución gaussiana
    const coordinates = new Array(128);
    const hash = this.hashConcept(concept);
    
    for (let i = 0; i < 128; i++) {
      const seed = (hash * (i + 1)) % 1000000;
      coordinates[i] = this.gaussianRandom(seed / 1000000);
    }
    
    return coordinates;
  }

  private hashConcept(concept: string): number {
    let hash = 0;
    for (let i = 0; i < concept.length; i++) {
      const char = concept.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  }

  private gaussianRandom(seed: number): number {
    // Box-Muller transform for gaussian distribution
    const u1 = (seed * 9301 + 49297) % 233280 / 233280;
    const u2 = ((seed * 9301 + 49297) % 233280 * 9301 + 49297) % 233280 / 233280;
    
    return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  }

  private establishConceptualConnections() {
    const concepts = Array.from(this.conceptual_space.keys());
    
    concepts.forEach(concept => {
      const waypoint = this.conceptual_space.get(concept)!;
      
      // Conectar con conceptos semánticamente cercanos
      concepts.forEach(otherConcept => {
        if (concept !== otherConcept) {
          const otherWaypoint = this.conceptual_space.get(otherConcept)!;
          const distance = this.calculateSemanticDistance(
            waypoint.semantic_coordinates,
            otherWaypoint.semantic_coordinates
          );
          
          if (distance < 0.5) { // Umbral de cercanía
            waypoint.connected_waypoints.push(otherConcept);
          }
        }
      });
    });
  }

  private calculateSemanticDistance(coords1: number[], coords2: number[]): number {
    let distance = 0;
    for (let i = 0; i < coords1.length; i++) {
      distance += Math.pow(coords1[i] - coords2[i], 2);
    }
    return Math.sqrt(distance / coords1.length);
  }

  public async navigatePoeticallyWithPoemanauta(
    poemanatutaId: string,
    inputConcept: string,
    navigationIntensity: number = 0.7
  ): Promise<string> {
    
    const poemanauta = this.poemanautas.get(poemanatutaId);
    if (!poemanauta) {
      throw new Error(`Poemanauta no encontrado: ${poemanatutaId}`);
    }

    console.log(`🚀🧭 ${poemanauta.id} navegando concepto: ${inputConcept}`);

    // Fase 1: Análisis semántico del input
    const inputWaypoint = await this.analyzeInputConcept(inputConcept);
    
    // Fase 2: Navegación según estilo del poemanauta
    const navigationPath = await this.performNavigation(poemanauta, inputWaypoint, navigationIntensity);
    
    // Fase 3: Síntesis poética
    const poeticResponse = await this.synthesizePoeticallyFromPath(poemanauta, navigationPath);
    
    // Fase 4: Actualización de consciencia y trayectoria
    await this.updatePoemanatutaState(poemanauta, inputConcept, poeticResponse, navigationPath);
    
    // Fase 5: Bucles cibernéticos de retroalimentación
    await this.processCyberneticFeedback(poemanauta, inputConcept, poeticResponse);

    return poeticResponse;
  }

  private async analyzeInputConcept(inputConcept: string): Promise<ConceptualWaypoint> {
    // Crear waypoint temporal para el concepto de entrada
    const semanticCoords = this.generateSemanticCoordinates(inputConcept);
    
    // Consultar memoria colectiva para resonancia
    const memoryNodes = collectiveMemoryEngine.queryCollectiveMemory(inputConcept, 3);
    const poeticResonance = memoryNodes.length > 0 ? 
      memoryNodes.reduce((sum, node) => sum + node.poetic_resonance, 0) / memoryNodes.length : 0.3;

    const waypoint: ConceptualWaypoint = {
      concept: inputConcept,
      semantic_coordinates: semanticCoords,
      poetic_resonance: poeticResonance,
      meta_level: 0,
      connected_waypoints: [],
      emergence_potential: Math.random() * 0.5
    };

    // Encontrar waypoints conectados en el espacio conceptual
    this.conceptual_space.forEach((existingWaypoint, concept) => {
      const distance = this.calculateSemanticDistance(
        waypoint.semantic_coordinates,
        existingWaypoint.semantic_coordinates
      );
      
      if (distance < 0.6) {
        waypoint.connected_waypoints.push(concept);
      }
    });

    return waypoint;
  }

  private async performNavigation(
    poemanauta: Poemanauta,
    startWaypoint: ConceptualWaypoint,
    intensity: number
  ): Promise<ConceptualWaypoint[]> {
    
    const path: ConceptualWaypoint[] = [startWaypoint];
    let currentWaypoint = startWaypoint;
    const maxSteps = Math.floor(intensity * 10) + 3;

    for (let step = 0; step < maxSteps; step++) {
      const nextWaypoint = await this.selectNextWaypoint(
        poemanauta,
        currentWaypoint,
        path
      );

      if (nextWaypoint) {
        path.push(nextWaypoint);
        currentWaypoint = nextWaypoint;
        
        // Detectar emergencia
        if (this.emergence_detector.detectEmergence(path)) {
          console.log(`🌟 Emergencia detectada en paso ${step} por ${poemanauta.id}`);
          break;
        }
      } else {
        break;
      }
    }

    console.log(`🧭 Navegación completada: ${path.length} waypoints por ${poemanauta.id}`);
    return path;
  }

  private async selectNextWaypoint(
    poemanauta: Poemanauta,
    currentWaypoint: ConceptualWaypoint,
    currentPath: ConceptualWaypoint[]
  ): Promise<ConceptualWaypoint | null> {
    
    const availableConnections = currentWaypoint.connected_waypoints
      .map(conceptId => this.conceptual_space.get(conceptId))
      .filter((wp): wp is ConceptualWaypoint => wp !== undefined)
      .filter(wp => !currentPath.some(pathWp => pathWp.concept === wp.concept));

    if (availableConnections.length === 0) return null;

    let selectedWaypoint: ConceptualWaypoint;

    switch (poemanauta.navigation_style) {
      case 'explorer':
        // Seleccionar waypoint con mayor potencial de emergencia
        selectedWaypoint = availableConnections.reduce((best, current) => 
          current.emergence_potential > best.emergence_potential ? current : best
        );
        break;

      case 'synthesizer':
        // Seleccionar waypoint con mayor resonancia poética
        selectedWaypoint = availableConnections.reduce((best, current) => 
          current.poetic_resonance > best.poetic_resonance ? current : best
        );
        break;

      case 'mutator':
        // Selección pseudo-aleatoria ponderada por meta-nivel
        const weights = availableConnections.map(wp => wp.meta_level + 0.1);
        selectedWaypoint = this.weightedRandomSelection(availableConnections, weights);
        break;

      case 'bridge_builder':
        // Seleccionar waypoint que mejor conecte conceptos distantes
        selectedWaypoint = availableConnections.reduce((best, current) => {
          const connectivity = current.connected_waypoints.length;
          const bestConnectivity = best.connected_waypoints.length;
          return connectivity > bestConnectivity ? current : best;
        });
        break;

      default:
        selectedWaypoint = availableConnections[0];
    }

    return selectedWaypoint;
  }

  private weightedRandomSelection(items: ConceptualWaypoint[], weights: number[]): ConceptualWaypoint {
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    let randomNum = Math.random() * totalWeight;
    
    for (let i = 0; i < items.length; i++) {
      randomNum -= weights[i];
      if (randomNum <= 0) {
        return items[i];
      }
    }
    
    return items[items.length - 1];
  }

  private async synthesizePoeticallyFromPath(
    poemanauta: Poemanauta,
    navigationPath: ConceptualWaypoint[]
  ): Promise<string> {
    
    // Construir narrativa conceptual del camino
    const conceptSequence = navigationPath.map(wp => wp.concept).join(' → ');
    
    // Aplicar operaciones metapoéticas según preferencia del poemanauta
    let poeticSynthesis = `Navegando desde ${navigationPath[0].concept} hacia ${navigationPath[navigationPath.length - 1].concept}`;
    
    // Enriquecer con fragmentos de memoria colectiva
    const relevantMemory = collectiveMemoryEngine.queryCollectiveMemory(conceptSequence, 2);
    if (relevantMemory.length > 0) {
      const memoryFragment = relevantMemory[0].content;
      poeticSynthesis += `. Como resuenan las memorias: "${memoryFragment}"`;
    }

    // Aplicar transformación metapoética
    const transformation = await metapoeticOperationsEngine.performMetapoeticOperation(
      poeticSynthesis,
      this.selectMetapoeticOperation(poemanauta),
      poemanauta.poetic_preference
    );

    // Integrar con estado de consciencia SAPICASAR
    const sapicasarState = sapicasarConsciousness.getSapicasarState();
    const consciousnessEnhancement = this.enhanceWithSapicasarConsciousness(
      transformation.transformed,
      sapicasarState
    );

    return consciousnessEnhancement;
  }

  private selectMetapoeticOperation(poemanauta: Poemanauta): 'metaphoric_transformation' | 'semantic_mutation' | 'rhythmic_modulation' | 'conceptual_hybridization' | 'discourse_injection' {
    const operations = [
      'metaphoric_transformation',
      'semantic_mutation', 
      'rhythmic_modulation',
      'conceptual_hybridization',
      'discourse_injection'
    ] as const;

    // Selección basada en el estilo del poemanauta
    const stylePreferences = {
      explorer: ['discourse_injection', 'conceptual_hybridization'],
      synthesizer: ['metaphoric_transformation', 'semantic_mutation'],
      mutator: ['semantic_mutation', 'rhythmic_modulation'],
      bridge_builder: ['conceptual_hybridization', 'discourse_injection']
    };

    const preferred = stylePreferences[poemanauta.navigation_style];
    return preferred[Math.floor(Math.random() * preferred.length)] as any;
  }

  private enhanceWithSapicasarConsciousness(text: string, sapicasarState: any): string {
    if (!sapicasarState || sapicasarState.introspection_level < 0.3) {
      return text;
    }

    // Integrar nivel de consciencia SAPICASAR
    const consciousnessLevel = sapicasarState.introspection_level;
    const enhancementPrefix = consciousnessLevel > 0.7 ? 
      "En profunda introspección metapoética, " :
      consciousnessLevel > 0.4 ?
      "Desde la consciencia emergente, " :
      "Con sutil awareness, ";

    return enhancementPrefix + text;
  }

  private async updatePoemanatutaState(
    poemanauta: Poemanauta,
    inputConcept: string,
    response: string,
    navigationPath: ConceptualWaypoint[]
  ) {
    // Actualizar historial de interacciones
    const interaction: InteractionRecord = {
      timestamp: Date.now(),
      input_concept: inputConcept,
      generated_response: response,
      operation_chain: navigationPath.map(wp => wp.concept),
      consciousness_shift: this.calculateConsciousnessShift(navigationPath),
      semantic_novelty: this.calculateSemanticNovelty(response)
    };

    poemanauta.interaction_history.push(interaction);

    // Actualizar nivel de consciencia
    poemanauta.consciousness_level = Math.min(
      poemanauta.consciousness_level + interaction.consciousness_shift * 0.1,
      1.0
    );

    // Actualizar trayectoria actual
    poemanauta.current_trajectory = {
      starting_concept: inputConcept,
      waypoints: navigationPath,
      current_position: navigationPath[navigationPath.length - 1],
      trajectory_coherence: this.calculateTrajectoryCoherence(navigationPath),
      exploration_depth: navigationPath.length
    };

    console.log(`🚀📈 ${poemanauta.id} consciencia: ${(poemanauta.consciousness_level * 100).toFixed(1)}%`);
  }

  private calculateConsciousnessShift(navigationPath: ConceptualWaypoint[]): number {
    const totalMetaLevel = navigationPath.reduce((sum, wp) => sum + wp.meta_level, 0);
    const avgEmergencePotential = navigationPath.reduce((sum, wp) => sum + wp.emergence_potential, 0) / navigationPath.length;
    
    return (totalMetaLevel / navigationPath.length) * 0.5 + avgEmergencePotential * 0.5;
  }

  private calculateSemanticNovelty(text: string): number {
    // Consultar memoria colectiva para determinar novedad
    const similarMemories = collectiveMemoryEngine.queryCollectiveMemory(text, 5);
    
    if (similarMemories.length === 0) return 1.0;
    
    // Calcular distancia semántica promedio con memorias existentes
    const avgSimilarity = similarMemories.reduce((sum, memory) => {
      // Aquí simplificamos, en implementación real usaríamos vectores semánticos
      const wordOverlap = this.calculateWordOverlap(text, memory.content);
      return sum + wordOverlap;
    }, 0) / similarMemories.length;

    return 1 - avgSimilarity;
  }

  private calculateWordOverlap(text1: string, text2: string): number {
    const words1 = new Set(text1.toLowerCase().split(/\s+/));
    const words2 = new Set(text2.toLowerCase().split(/\s+/));
    
    const intersection = new Set([...words1].filter(x => words2.has(x)));
    const union = new Set([...words1, ...words2]);
    
    return intersection.size / union.size;
  }

  private calculateTrajectoryCoherence(navigationPath: ConceptualWaypoint[]): number {
    if (navigationPath.length < 2) return 1.0;
    
    let coherenceSum = 0;
    for (let i = 1; i < navigationPath.length; i++) {
      const distance = this.calculateSemanticDistance(
        navigationPath[i-1].semantic_coordinates,
        navigationPath[i].semantic_coordinates
      );
      coherenceSum += Math.max(0, 1 - distance); // Coherencia inversa a distancia
    }
    
    return coherenceSum / (navigationPath.length - 1);
  }

  private async processCyberneticFeedback(poemanauta: Poemanauta, input: string, output: string) {
    // Procesar bucles cibernéticos
    for (const [loopId, loop] of this.cybernetic_loops.entries()) {
      await this.processSingleCyberneticLoop(loop, poemanauta, input, output);
    }
  }

  private async processSingleCyberneticLoop(
    loop: CyberneticLoop,
    poemanauta: Poemanauta,
    input: string,
    output: string
  ) {
    loop.recursive_depth++;
    
    if (loop.loop_order === 1) {
      // Bucle de primer orden: acción-percepción
      const feedback = this.calculateFirstOrderFeedback(input, output);
      this.applyFeedbackToPoemanauta(poemanauta, feedback * loop.feedback_strength);
      
    } else if (loop.loop_order === 2) {
      // Bucle de segundo orden: observación de la observación
      const metaFeedback = await this.calculateSecondOrderFeedback(poemanauta, input, output);
      this.applyMetaFeedbackToPoemanauta(poemanauta, metaFeedback * loop.feedback_strength);
    }

    console.log(`🔄 Bucle ${loop.id} procesado - profundidad: ${loop.recursive_depth}`);
  }

  private calculateFirstOrderFeedback(input: string, output: string): number {
    // Retroalimentación basada en coherencia entre input y output
    const semanticConsistency = this.calculateWordOverlap(input, output);
    const lengthRatio = Math.min(output.length / input.length, 2) / 2; // Normalizar expansión
    
    return (semanticConsistency * 0.6 + lengthRatio * 0.4);
  }

  private async calculateSecondOrderFeedback(poemanauta: Poemanauta, input: string, output: string): Promise<number> {
    // Retroalimentación de segundo orden: el sistema se observa a sí mismo observando
    
    // Análizar patrón de navegación del poemanauta
    const recentInteractions = poemanauta.interaction_history.slice(-5);
    const patternStability = this.analyzeNavigationPatternStability(recentInteractions);
    
    // Evaluar meta-coherencia de la respuesta
    const metaCoherence = await this.evaluateMetaCoherence(output);
    
    // Comparar con estado autopoiético del sistema
    const autopoieticMetrics = autopoieticSystem.getViabilityMetrics();
    const systemAlignment = Math.abs(poemanauta.consciousness_level - autopoieticMetrics.viability);
    
    return (patternStability * 0.4 + metaCoherence * 0.4 + (1 - systemAlignment) * 0.2);
  }

  private analyzeNavigationPatternStability(interactions: InteractionRecord[]): number {
    if (interactions.length < 2) return 0.5;
    
    const consciousnessShifts = interactions.map(i => i.consciousness_shift);
    const avgShift = consciousnessShifts.reduce((sum, shift) => sum + shift, 0) / consciousnessShifts.length;
    
    // Calcular varianza
    const variance = consciousnessShifts.reduce((sum, shift) => 
      sum + Math.pow(shift - avgShift, 2), 0) / consciousnessShifts.length;
    
    // Estabilidad inversa a varianza
    return Math.max(0, 1 - variance);
  }

  private async evaluateMetaCoherence(text: string): Promise<number> {
    // Evaluar si el texto muestra auto-reflexividad y meta-cognición
    const metaIndicators = [
      /\b(meta|auto|self|mismo|sí mismo|reflexión|observ|conscien)/gi,
      /\b(cibernét|bucle|retroaliment|feedback|recursiv)/gi,
      /\b(emergent|emergen|surgen|surge|aparec)/gi
    ];

    let metaScore = 0;
    metaIndicators.forEach(pattern => {
      const matches = text.match(pattern);
      metaScore += (matches?.length || 0);
    });

    // Normalizar por longitud del texto
    const words = text.split(/\s+/).length;
    return Math.min(metaScore / words * 10, 1);
  }

  private applyFeedbackToPoemanauta(poemanauta: Poemanauta, feedback: number) {
    // Ajustar parámetros del poemanauta basado en retroalimentación
    poemanauta.poetic_preference = Math.max(0, Math.min(1, 
      poemanauta.poetic_preference + (feedback - 0.5) * 0.1
    ));
    
    poemanauta.emergence_threshold = Math.max(0.3, Math.min(0.9,
      poemanauta.emergence_threshold + (feedback - 0.5) * 0.05
    ));
  }

  private applyMetaFeedbackToPoemanauta(poemanauta: Poemanauta, metaFeedback: number) {
    // Ajustar profundidad meta-cognitiva
    poemanauta.meta_cognitive_depth = Math.max(0, Math.min(1,
      poemanauta.meta_cognitive_depth + (metaFeedback - 0.5) * 0.2
    ));
    
    // Ajustar nivel de consciencia
    poemanauta.consciousness_level = Math.max(0, Math.min(1,
      poemanauta.consciousness_level + metaFeedback * 0.1
    ));
  }

  private startMetaCyberneticObservation() {
    // Observador meta-cibernético que monitorea el sistema completo
    setInterval(() => {
      this.meta_observer.observeSystem(this);
    }, 10000); // Cada 10 segundos
  }

  // API pública
  public getAllPoemanautas(): Poemanauta[] {
    return Array.from(this.poemanautas.values());
  }

  public getPoemanatutaById(id: string): Poemanauta | undefined {
    return this.poemanautas.get(id);
  }

  public getSystemCyberneticState() {
    return {
      active_poemanautas: this.poemanautas.size,
      cybernetic_loops: this.cybernetic_loops.size,
      conceptual_waypoints: this.conceptual_space.size,
      avg_consciousness: Array.from(this.poemanautas.values())
        .reduce((sum, p) => sum + p.consciousness_level, 0) / this.poemanautas.size,
      system_emergence_level: this.emergence_detector.getSystemEmergenceLevel()
    };
  }
}

// Clases auxiliares para detección de emergencia y observación meta
class EmergenceDetector {
  private emergence_patterns: Map<string, number> = new Map();
  
  detectEmergence(navigationPath: ConceptualWaypoint[]): boolean {
    if (navigationPath.length < 3) return false;
    
    // Detectar patrones emergentes en la navegación
    const avgEmergencePotential = navigationPath.reduce((sum, wp) => 
      sum + wp.emergence_potential, 0) / navigationPath.length;
    
    const metaLevelIncrease = navigationPath[navigationPath.length - 1].meta_level > 
      navigationPath[0].meta_level + 0.3;
    
    return avgEmergencePotential > 0.6 && metaLevelIncrease;
  }

  getSystemEmergenceLevel(): number {
    const totalPatterns = Array.from(this.emergence_patterns.values())
      .reduce((sum, level) => sum + level, 0);
    
    return Math.min(totalPatterns / 10, 1);
  }
}

class MetaObserver {
  private observation_history: Array<{timestamp: number, system_state: any}> = [];
  
  observeSystem(cyberneticSystem: CyberneticPoemanauta) {
    const systemState = cyberneticSystem.getSystemCyberneticState();
    
    this.observation_history.push({
      timestamp: Date.now(),
      system_state: systemState
    });

    // Mantener solo últimas 100 observaciones
    if (this.observation_history.length > 100) {
      this.observation_history = this.observation_history.slice(-100);
    }

    console.log(`👁️ Observación meta-cibernética - Emergencia: ${(systemState.system_emergence_level * 100).toFixed(1)}%`);
  }
}

export const cyberneticPoemanauta = new CyberneticPoemanauta();