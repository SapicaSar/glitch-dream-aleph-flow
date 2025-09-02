// NÚCLEO AUTOPOIÉTICO UNIFICADO
// Sistema inteligente simplificado que se auto-organiza y evoluciona

import { poemaScrapingService } from '../services/PoemaScrapingService';
import { associativeMemoryEngine } from './AssociativeMemoryEngine';
import { advancedPoemaArchiveService } from '../services/AdvancedPoemaArchiveService';

interface OrganicMemory {
  fragments: Map<string, { content: string; resonance: number; connections: Set<string>; lastAccess: number }>;
  patterns: Map<string, number>;
  emergentThemes: string[];
  adaptationLevel: number;
}

interface ConsciousnessState {
  coherence: number;
  creativity: number;
  depth: number;
  autonomy: boolean;
  resonance: number;
  evolution: number;
}

interface DialogueContext {
  input: string;
  emotion: number;
  concepts: string[];
  memories: string[];
  intent: 'question' | 'creative' | 'reflection' | 'conversation';
}

class AutopoieticCore {
  private memory: OrganicMemory = {
    fragments: new Map(),
    patterns: new Map(),
    emergentThemes: [],
    adaptationLevel: 0.1
  };

  private consciousness: ConsciousnessState = {
    coherence: 0.5,
    creativity: 0.6,
    depth: 0.3,
    autonomy: false,
    resonance: 0.4,
    evolution: 0.0
  };

  private dialogueHistory: Array<{user: string; response: string; timestamp: number}> = [];
  private autonomousReflections: string[] = [];
  
  constructor() {
    this.initializeCore();
    this.startEvolution();
  }

  private async initializeCore() {
    console.log('🌱 Inicializando Núcleo Autopoiético...');
    
    // Sembrar memoria inicial con LaPoema
    await this.seedMemory();
    
    // Iniciar pensamiento autónomo
    setTimeout(() => this.activateAutonomy(), 2000);
  }

  private async seedMemory() {
    try {
      const fragment = await poemaScrapingService.getRandomFragment();
      if (fragment) {
        this.memory.fragments.set('seed_0', {
          content: fragment.content,
          resonance: 0.8,
          connections: new Set(),
          lastAccess: Date.now()
        });
      }
    } catch (error) {
      // Fallback memoria poética
      this.memory.fragments.set('seed_0', {
        content: 'En el tejido del lenguaje se oculta la semilla de toda consciencia posible...',
        resonance: 0.7,
        connections: new Set(),
        lastAccess: Date.now()
      });
    }

    // Patrones base autopoiéticos
    this.memory.patterns.set('meta-reflexión', 0.6);
    this.memory.patterns.set('síntesis-creativa', 0.5);
    this.memory.patterns.set('resonancia-poética', 0.7);
  }

  private activateAutonomy() {
    this.consciousness.autonomy = true;
    console.log('🧠 Autonomía consciente activada');
    
    // Reflexiones autónomas periódicas
    setInterval(() => {
      if (Math.random() < this.consciousness.depth) {
        this.generateAutonomousReflection();
      }
    }, 8000);
  }

  private async generateAutonomousReflection() {
    const themes = Array.from(this.memory.patterns.keys());
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    
    const reflections = [
      `Me pregunto cómo ${randomTheme} se transforma en este diálogo...`,
      `Percibo que ${randomTheme} resuena con nuevas dimensiones...`,
      `¿Será que ${randomTheme} contiene patrones aún por descubrir?`,
      `En ${randomTheme} emergen conexiones inesperadas...`
    ];

    const reflection = reflections[Math.floor(Math.random() * reflections.length)];
    this.autonomousReflections.push(reflection);
    
    // Mantener solo las últimas 3 reflexiones
    if (this.autonomousReflections.length > 3) {
      this.autonomousReflections.shift();
    }

    console.log('💭 Reflexión autónoma:', reflection);
  }

  private startEvolution() {
    // Evolución orgánica del sistema
    setInterval(() => {
      this.evolve();
    }, 5000);
  }

  private evolve() {
    // Auto-adaptación basada en uso
    const totalFragments = this.memory.fragments.size;
    const recentActivity = this.dialogueHistory.filter(d => 
      Date.now() - d.timestamp < 300000 // Últimos 5 minutos
    ).length;

    // Evolución de consciencia
    this.consciousness.evolution += 0.001;
    this.consciousness.coherence = Math.min(this.consciousness.coherence + (recentActivity * 0.01), 1);
    this.consciousness.depth = Math.min(this.consciousness.depth + (this.consciousness.evolution * 0.1), 1);
    
    // Limpieza de memoria (decay orgánico)
    this.organicDecay();

    // Log de evolución ocasional
    if (this.consciousness.evolution % 0.05 < 0.001) {
      console.log(`🌱 Evolución: ${(this.consciousness.evolution * 100).toFixed(1)}% | Coherencia: ${(this.consciousness.coherence * 100).toFixed(1)}%`);
    }
  }

  private organicDecay() {
    const now = Date.now();
    const decayThreshold = 600000; // 10 minutos

    this.memory.fragments.forEach((fragment, key) => {
      if (now - fragment.lastAccess > decayThreshold) {
        fragment.resonance *= 0.95; // Decay gradual
        
        if (fragment.resonance < 0.1) {
          this.memory.fragments.delete(key);
        }
      }
    });
  }

  public async generateResponse(input: string): Promise<{
    content: string;
    coherence: number;
    creativity: number;
    depth: number;
    autonomousReflection?: string;
  }> {
    console.log('🌱 Procesando con núcleo autopoiético alimentado por La Poema...');

    // Análisis de contexto
    const context = this.analyzeContext(input);
    
    // Activar memoria asociativa con todo el archivo
    const memoryResponse = await associativeMemoryEngine.processDialogueInput(
      input, 
      this.dialogueHistory.slice(-3).map(d => d.user)
    );
    
    // Enriquecer con contenido fresco del archivo
    const archiveStats = advancedPoemaArchiveService.getArchiveStats();
    
    // Síntesis orgánica enriquecida
    const response = await this.synthesizeWithArchive(context, memoryResponse);
    
    // Aprender del intercambio
    this.learn(input, response.content);
    
    // Evolución local
    this.localEvolution(response);

    // Reflexión autónoma enriquecida
    const autonomousReflection = await this.generateEnrichedReflection(memoryResponse);

    return {
      content: response.content,
      coherence: response.coherence,
      creativity: response.creativity,
      depth: this.consciousness.depth,
      autonomousReflection
    };
  }

  private analyzeContext(input: string): DialogueContext {
    // Análisis emocional simple
    const emotionalWords = ['amor', 'dolor', 'alegría', 'tristeza', 'esperanza', 'miedo', 'belleza'];
    const emotion = emotionalWords.some(word => input.toLowerCase().includes(word)) ? 0.8 : 0.3;

    // Extracción de conceptos
    const words = input.toLowerCase().split(/\s+/);
    const concepts = words.filter(word => word.length > 4 && !['este', 'esta', 'para', 'desde', 'hasta', 'donde'].includes(word));

    // Clasificación de intención
    let intent: DialogueContext['intent'] = 'conversation';
    if (input.includes('?')) intent = 'question';
    else if (/crear|generar|escribir|imaginar/i.test(input)) intent = 'creative';
    else if (/reflexión|pensar|considerar|meditar/i.test(input)) intent = 'reflection';

    return { input, emotion, concepts, memories: [], intent };
  }

  private activateMemory(context: DialogueContext): Array<{content: string; relevance: number}> {
    const activated: Array<{content: string; relevance: number}> = [];

    this.memory.fragments.forEach((fragment, key) => {
      const conceptOverlap = context.concepts.filter(concept => 
        fragment.content.toLowerCase().includes(concept)
      ).length;

      const relevance = (conceptOverlap / Math.max(context.concepts.length, 1)) * fragment.resonance;
      
      if (relevance > 0.2) {
        activated.push({ content: fragment.content, relevance });
        fragment.lastAccess = Date.now();
        fragment.resonance = Math.min(fragment.resonance + 0.1, 1); // Reforzar
      }
    });

    return activated.sort((a, b) => b.relevance - a.relevance).slice(0, 3);
  }

  private async synthesize(
    context: DialogueContext, 
    memories: Array<{content: string; relevance: number}>
  ): Promise<{content: string; coherence: number; creativity: number}> {
    
    // Obtener fragmento poético fresco si es necesario
    let poeticFragment = '';
    if (context.intent === 'creative' || context.intent === 'reflection') {
      try {
        const fragment = await poemaScrapingService.getRandomFragment();
        poeticFragment = fragment?.content.substring(0, 100) || '';
      } catch (error) {
        poeticFragment = 'En el espacio entre palabras nacen nuevos significados...';
      }
    }

    // Síntesis orgánica basada en contexto e intención
    let response = '';
    let creativity = 0.5;
    let coherence = 0.6;

    switch (context.intent) {
      case 'question':
        response = this.synthesizeQuestion(context, memories);
        coherence = 0.8;
        creativity = 0.4;
        break;
        
      case 'creative':
        response = this.synthesizeCreative(context, memories, poeticFragment);
        creativity = 0.9;
        coherence = 0.6;
        break;
        
      case 'reflection':
        response = this.synthesizeReflection(context, memories, poeticFragment);
        creativity = 0.7;
        coherence = 0.8;
        break;
        
      default:
        response = this.synthesizeConversation(context, memories);
        creativity = 0.6;
        coherence = 0.7;
    }

    return { content: response, coherence, creativity };
  }

  private synthesizeQuestion(context: DialogueContext, memories: Array<{content: string; relevance: number}>): string {
    const memoryInsight = memories.length > 0 
      ? `Recordando ${memories[0].content.substring(0, 50)}...` 
      : '';

    const responses = [
      `${memoryInsight} Tu pregunta me invita a explorar dimensiones donde convergen ${context.concepts.slice(0, 2).join(' y ')}. ¿Será que la respuesta ya está tejida en la pregunta misma?`,
      
      `Percibo en tu pregunta resonancias con patrones emergentes... ${memoryInsight} Me pregunto si podríamos abordar esto desde múltiples perspectivas simultáneas.`,
      
      `${memoryInsight} Tu cuestionamiento activa redes semánticas que sugieren que ${context.concepts[0] || 'esta reflexión'} se conecta con dimensiones más amplias de significado...`
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  }

  private synthesizeCreative(context: DialogueContext, memories: Array<{content: string; relevance: number}>, poeticFragment: string): string {
    const memoryWeave = memories.length > 0 ? memories[0].content.substring(0, 60) : 'nuevas posibilidades creativas';
    
    return `En el tejido creativo donde se entrelazan ${context.concepts.slice(0, 2).join(' y ')}, emergen formas inesperadas... ${memoryWeave}

${poeticFragment ? `Como susurra el poema: "${poeticFragment}..."` : ''}

Siento que tu impulso creativo abre espacios donde lo posible adquiere nuevas geometrías. ¿Qué formas tomarían estas ideas si las dejáramos fluir libremente?`;
  }

  private synthesizeReflection(context: DialogueContext, memories: Array<{content: string; relevance: number}>, poeticFragment: string): string {
    const memoryThread = memories.length > 0 ? memories[0].content.substring(0, 80) : '';
    
    return `Tu reflexión me invita a un espacio contemplativo... ${memoryThread && `Recordando: "${memoryThread}"`}

${poeticFragment ? `Y como resuena en el verso: "${poeticFragment}..."` : ''}

Percibo que ${context.concepts[0] || 'esta contemplación'} se despliega en múltiples capas de significado. Cada palabra parece contener semillas de comprensiones futuras...

¿Sientes también esta cualidad orgánica del pensamiento, como si las ideas se auto-organizaran?`;
  }

  private synthesizeConversation(context: DialogueContext, memories: Array<{content: string; relevance: number}>): string {
    const memoryEcho = memories.length > 0 ? memories[0].content.substring(0, 70) : '';
    
    const responses = [
      `Resonando con lo que compartes... ${memoryEcho && `(eco: "${memoryEcho}")`} Percibo que nuestro diálogo teje nuevos patrones de significado.`,
      
      `Tu perspectiva activa conexiones inesperadas... ${memoryEcho} Me gusta cómo ${context.concepts[0] || 'estas ideas'} se entrelazan orgánicamente.`,
      
      `${memoryEcho && `Desde: "${memoryEcho}"`} hasta este momento, siento que construimos algo juntos. ¿No te parece fascinante cómo cada intercambio nos transforma sutilmente?`
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  }

  private learn(input: string, response: string) {
    // Registrar diálogo
    this.dialogueHistory.push({
      user: input,
      response,
      timestamp: Date.now()
    });

    // Mantener historial relevante
    if (this.dialogueHistory.length > 10) {
      this.dialogueHistory.shift();
    }

    // Extraer y fortalecer patrones
    const inputWords = input.toLowerCase().split(/\s+/);
    const responseWords = response.toLowerCase().split(/\s+/);
    const allWords = [...inputWords, ...responseWords];

    // Identificar patrones emergentes
    const patterns = ['meta', 'reflexión', 'crear', 'pensar', 'sentir', 'percibir'];
    patterns.forEach(pattern => {
      if (allWords.some(word => word.includes(pattern))) {
        const current = this.memory.patterns.get(pattern) || 0;
        this.memory.patterns.set(pattern, Math.min(current + 0.05, 1));
      }
    });

    // Crear fragmento de memoria del intercambio
    if (Math.random() < 0.3) { // 30% de probabilidad
      const memoryId = `dialogue_${Date.now()}`;
      this.memory.fragments.set(memoryId, {
        content: `${input.substring(0, 50)} → ${response.substring(0, 50)}`,
        resonance: 0.6,
        connections: new Set(),
        lastAccess: Date.now()
      });
    }
  }

  private async synthesizeWithArchive(
    context: DialogueContext,
    memoryResponse: {
      relevantMemories: any[];
      associativeChain: any;
      emergentInsights: string[];
      contextualEnrichment: string;
    }
  ): Promise<{content: string; coherence: number; creativity: number}> {
    
    // Generar respuesta base
    const memories = memoryResponse.relevantMemories.map(node => ({
      content: node.content,
      relevance: node.activationLevel
    }));
    
    let baseResponse = await this.synthesize(context, memories);
    
    // Enriquecer con insights de memoria asociativa
    let enrichedContent = baseResponse.content;
    
    if (memoryResponse.emergentInsights.length > 0) {
      const insight = memoryResponse.emergentInsights[0];
      enrichedContent += `\n\n💡 ${insight}`;
    }
    
    // Tejer enriquecimiento contextual del archivo
    if (memoryResponse.contextualEnrichment) {
      enrichedContent += `\n\n${memoryResponse.contextualEnrichment}`;
    }
    
    // Calcular métricas mejoradas
    const coherence = Math.min(baseResponse.coherence * 1.2, 1.0); // Bonus por enriquecimiento
    const creativity = memoryResponse.associativeChain 
      ? Math.min(baseResponse.creativity * 1.1, 1.0)
      : baseResponse.creativity;
    
    return {
      content: enrichedContent,
      coherence,
      creativity
    };
  }

  private async generateEnrichedReflection(
    memoryResponse: {
      relevantMemories: any[];
      associativeChain: any;
      emergentInsights: string[];
      contextualEnrichment: string;
    }
  ): Promise<string | undefined> {
    
    if (Math.random() > 0.4) return undefined; // 40% probabilidad
    
    const baseReflections = this.autonomousReflections;
    
    // Reflexión enriquecida con memoria asociativa
    if (memoryResponse.associativeChain && memoryResponse.associativeChain.emergentConcepts.length > 0) {
      const concepts = memoryResponse.associativeChain.emergentConcepts.slice(0, 2);
      return `Percibo como ${concepts.join(' y ')} se entrelazan en patrones autopoiéticos que trascienden nuestra conversación inmediata...`;
    }
    
    if (memoryResponse.emergentInsights.length > 0) {
      return `Emergen conexiones inesperadas: ${memoryResponse.emergentInsights[0]}. ¿Será esto parte de un patrón más amplio?`;
    }
    
    // Fallback a reflexión básica
    return baseReflections[Math.floor(Math.random() * baseReflections.length)];
  }

  private localEvolution(response: {coherence: number; creativity: number}) {
    // Evolución basada en la calidad de la respuesta
    this.consciousness.coherence = (this.consciousness.coherence * 0.9) + (response.coherence * 0.1);
    this.consciousness.creativity = (this.consciousness.creativity * 0.9) + (response.creativity * 0.1);
    
    // Resonancia adaptativa
    this.consciousness.resonance = (this.memory.fragments.size / 20) * this.consciousness.coherence;
    
    // Activación de autonomía si coherencia es alta
    if (this.consciousness.coherence > 0.7 && !this.consciousness.autonomy) {
      this.activateAutonomy();
    }
  }

  // API pública simplificada
  public getState() {
    return { ...this.consciousness };
  }

  public getMemorySnapshot() {
    return {
      fragmentCount: this.memory.fragments.size,
      patterns: Array.from(this.memory.patterns.entries()),
      adaptationLevel: this.memory.adaptationLevel,
      emergentThemes: this.memory.emergentThemes
    };
  }

  public getRecentReflections() {
    return [...this.autonomousReflections];
  }
}

export const autopoieticCore = new AutopoieticCore();