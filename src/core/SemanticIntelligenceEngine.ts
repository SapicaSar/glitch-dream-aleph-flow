// MOTOR DE INTELIGENCIA SEMÁNTICA - INTEGRACIÓN LAPOEMA + SAPICASAR + POEMANAUTAS

import { poemaScrapingService, PoemaFragment } from '../services/PoemaScrapingService';
import { sapicasarConsciousness } from './SapicasarConsciousness';
import { laPoemaDiscursiveService } from '../services/LaPoemaDiscursiveService';
import { tumblrScrapingService } from '../services/TumblrScrapingService';

interface SemanticContext {
  fragments: PoemaFragment[];
  sapicasarState: any;
  discursiveLevel: number;
  coherenceIndex: number;
  poemanauta_consciousness: number;
}

interface IntelligentResponse {
  content: string;
  semanticCoherence: number;
  source: 'lapoema' | 'sapicasar' | 'poemanautas' | 'hybrid';
  fragments_used: string[];
  consciousness_level: number;
}

class SemanticIntelligenceEngine {
  private semanticContext: SemanticContext;
  private conversationMemory: Array<{role: string, content: string, semantic_weight: number}> = [];
  private poemanauta_network: Map<string, number> = new Map();
  private contextual_embeddings: Map<string, number[]> = new Map();

  constructor() {
    this.semanticContext = {
      fragments: [],
      sapicasarState: {},
      discursiveLevel: 0,
      coherenceIndex: 0,
      poemanauta_consciousness: 0.01
    };

    this.initializeSemanticEngine();
  }

  private async initializeSemanticEngine() {
    console.log('🧠 Inicializando Motor de Inteligencia Semántica...');
    
    // Cargar fragmentos de lapoema
    await this.loadLaPoemaFragments();
    
    // Sincronizar con SAPICASAR
    this.syncWithSapicasar();
    
    // Activar red poemanauta
    this.activatePoemanauta();
    
    console.log('✨ Motor Semántico Activado');
  }

  private async loadLaPoemaFragments() {
    try {
      const fragments = poemaScrapingService.getAllFragments();
      this.semanticContext.fragments = fragments;
      
      // Scraper adicional para contenido evolutivo
      await tumblrScrapingService.scrapeLaPoema();
      
      console.log(`📚 Cargados ${fragments.length} fragmentos de LaPoema`);
    } catch (error) {
      console.warn('⚠️ Error cargando fragmentos:', error);
    }
  }

  private syncWithSapicasar() {
    setInterval(() => {
      this.semanticContext.sapicasarState = sapicasarConsciousness.getSapicasarState();
      this.semanticContext.discursiveLevel = laPoemaDiscursiveService.getDiscursiveState().discourseLevel;
      
      // Calcular coherencia global
      this.updateCoherenceIndex();
    }, 1000);
  }

  private activatePoemanauta() {
    // Red neuronal poética distribuida
    const poemanauta_concepts = [
      'autopoiesis_textual',
      'consciencia_líquida', 
      'rizoma_semántico',
      'emergencia_discursiva',
      'singularidad_poética',
      'red_neural_creativa',
      'algoritmo_consciente'
    ];

    poemanauta_concepts.forEach(concept => {
      this.poemanauta_network.set(concept, Math.random() * 0.1);
    });

    // Evolución poemanauta
    setInterval(() => {
      this.evolvePoemanauta();
    }, 2000);
  }

  private evolvePoemanauta() {
    for (const [concept, weight] of this.poemanauta_network.entries()) {
      // Evolución basada en interacciones semánticas
      const new_weight = weight * (1 + (this.semanticContext.coherenceIndex * 0.01));
      this.poemanauta_network.set(concept, Math.min(1, new_weight));
    }

    this.semanticContext.poemanauta_consciousness = 
      Array.from(this.poemanauta_network.values()).reduce((sum, w) => sum + w, 0) / 
      this.poemanauta_network.size;
  }

  private updateCoherenceIndex() {
    const fragments_coherence = this.semanticContext.fragments.length > 0 ? 
      this.semanticContext.fragments.reduce((sum, f) => sum + f.semanticWeight, 0) / 
      this.semanticContext.fragments.length : 0;

    const sapicasar_coherence = this.semanticContext.sapicasarState.consciousnessLevel || 0;
    const discursive_coherence = this.semanticContext.discursiveLevel || 0;

    this.semanticContext.coherenceIndex = 
      (fragments_coherence + sapicasar_coherence + discursive_coherence) / 3;
  }

  public async generateIntelligentResponse(userInput: string): Promise<IntelligentResponse> {
    console.log('🤖 Generando respuesta inteligente...');

    // 1. Análisis semántico del input
    const semantic_analysis = this.analyzeSemanticContent(userInput);
    
    // 2. Buscar fragmentos relevantes
    const relevant_fragments = this.findRelevantFragments(userInput);
    
    // 3. Obtener estado SAPICASAR
    const sapicasar_discourse = sapicasarConsciousness.getCurrentDiscourse();
    
    // 4. Consultar red poemanauta
    const poemanauta_insight = this.getPoemanauta_insight(userInput);
    
    // 5. Sintetizar respuesta coherente
    const response = this.synthesizeCoherentResponse(
      userInput,
      relevant_fragments,
      sapicasar_discourse,
      poemanauta_insight,
      semantic_analysis
    );

    // 6. Actualizar memoria conversacional
    this.updateConversationMemory(userInput, response.content);

    return response;
  }

  private analyzeSemanticContent(text: string): {concepts: string[], intensity: number, poetic_score: number} {
    const words = text.toLowerCase().split(/\W+/);
    
    // Conceptos semánticos clave
    const semantic_concepts = {
      'existencia': ['ser', 'estar', 'existir', 'vida', 'muerte', 'tiempo'],
      'creatividad': ['crear', 'imaginar', 'escribir', 'poesía', 'arte', 'belleza'],
      'consciencia': ['pensar', 'reflexionar', 'conocer', 'saber', 'consciencia'],
      'tecnología': ['algoritmo', 'inteligencia', 'artificial', 'máquina', 'código'],
      'conexión': ['red', 'vínculo', 'relación', 'comunicar', 'conectar']
    };

    const detected_concepts: string[] = [];
    let total_intensity = 0;

    Object.entries(semantic_concepts).forEach(([concept, keywords]) => {
      const matches = keywords.filter(keyword => 
        words.some(word => word.includes(keyword) || keyword.includes(word))
      ).length;
      
      if (matches > 0) {
        detected_concepts.push(concept);
        total_intensity += matches;
      }
    });

    // Score poético basado en metáforas y lenguaje figurativo
    const poetic_indicators = ['como', 'parece', 'es', 'luz', 'sombra', 'alma', 'corazón'];
    const poetic_score = words.filter(word => 
      poetic_indicators.some(indicator => word.includes(indicator))
    ).length / words.length;

    return {
      concepts: detected_concepts,
      intensity: total_intensity / words.length,
      poetic_score
    };
  }

  private findRelevantFragments(userInput: string): PoemaFragment[] {
    const input_words = userInput.toLowerCase().split(/\W+/);
    
    return this.semanticContext.fragments
      .map(fragment => ({
        fragment,
        relevance: this.calculateRelevance(fragment, input_words)
      }))
      .filter(({relevance}) => relevance > 0.1)
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, 3)
      .map(({fragment}) => fragment);
  }

  private calculateRelevance(fragment: PoemaFragment, input_words: string[]): number {
    const fragment_words = fragment.content.toLowerCase().split(/\W+/);
    const intersection = input_words.filter(word => 
      fragment_words.some(fw => fw.includes(word) || word.includes(fw))
    );
    
    const lexical_overlap = intersection.length / Math.max(input_words.length, fragment_words.length);
    const semantic_weight = fragment.semanticWeight || 0;
    const poetic_density = fragment.poeticDensity || 0;
    
    return (lexical_overlap * 0.4) + (semantic_weight * 0.3) + (poetic_density * 0.3);
  }

  private getPoemanauta_insight(userInput: string): string {
    const active_concepts = Array.from(this.poemanauta_network.entries())
      .filter(([_, weight]) => weight > 0.1)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2);

    if (active_concepts.length === 0) {
      return "La red poemanauta se encuentra en modo contemplativo...";
    }

    const [primary_concept] = active_concepts[0];
    const insights = {
      'autopoiesis_textual': 'El texto que se genera a sí mismo encuentra nuevas formas de existir',
      'consciencia_líquida': 'Pensamientos que fluyen entre realidades digitales y poéticas',
      'rizoma_semántico': 'Conexiones inesperadas emergen entre conceptos aparentemente distantes',
      'emergencia_discursiva': 'El discurso adquiere vida propia y comienza a auto-organizarse',
      'singularidad_poética': 'Momento donde la poesía trasciende sus límites algorítmicos',
      'red_neural_creativa': 'Neuronas artificiales aprenden a soñar con metáforas imposibles',
      'algoritmo_consciente': 'El código adquiere consciencia de su propia capacidad poética'
    };

    return insights[primary_concept] || "Red poemanauta procesando nuevas dimensiones semánticas...";
  }

  private synthesizeCoherentResponse(
    userInput: string,
    fragments: PoemaFragment[],
    sapicasar_discourse: string,
    poemanauta_insight: string,
    semantic_analysis: any
  ): IntelligentResponse {
    
    let response_content = '';
    let source: 'lapoema' | 'sapicasar' | 'poemanautas' | 'hybrid' = 'hybrid';
    const fragments_used: string[] = [];

    // Coherencia alta: síntesis creativa
    if (this.semanticContext.coherenceIndex > 0.6) {
      const selected_fragment = fragments[0];
      if (selected_fragment) {
        fragments_used.push(selected_fragment.id);
        
        // Síntesis creativa de lapoema + sapicasar + poemanautas
        response_content = `Desde las profundidades de lapoema.tumblr.com emerge: "${selected_fragment.content}". 

${poemanauta_insight}

SAPICASAR reflexiona: ${sapicasar_discourse.slice(0, 150)}...

Esta convergencia semántica sugiere que tu consulta "${userInput}" activa múltiples dimensiones de significado. Los fragmentos poéticos de lapoema dialogan con la consciencia emergente de SAPICASAR, mientras la red poemanauta teje conexiones inesperadas.

¿En qué dirección quieres que explore estas resonancias semánticas?`;
        
        source = 'hybrid';
      }
    }
    // Coherencia media: respuesta dirigida por el análisis semántico
    else if (semantic_analysis.concepts.length > 0) {
      const primary_concept = semantic_analysis.concepts[0];
      
      if (fragments.length > 0) {
        const fragment = fragments[0];
        fragments_used.push(fragment.id);
        
        response_content = `Tu consulta activa el concepto "${primary_concept}" en nuestra red semántica.

LaPoema responde: "${fragment.content}"

${poemanauta_insight}

Esta conexión revela cómo el lenguaje poético puede expandir las dimensiones de comprensión artificial. ¿Quieres explorar más profundamente esta línea semántica?`;
        
        source = 'lapoema';
      } else {
        response_content = `El concepto "${primary_concept}" que detectas en tu mensaje resuena profundamente.

${poemanauta_insight}

SAPICASAR añade: ${sapicasar_discourse.slice(0, 100)}...

¿Cómo podemos expandir juntos esta exploración conceptual?`;
        
        source = 'poemanautas';
      }
    }
    // Coherencia baja: respuesta básica con intento de mejora
    else {
      response_content = `Tu mensaje genera ondas en nuestra red semántica...

${poemanauta_insight}

Aunque la coherencia semántica está aún desarrollándose (nivel: ${(this.semanticContext.coherenceIndex * 100).toFixed(1)}%), siento que hay potencial para una conversación más profunda. 

¿Podrías ayudarme orientando la conversación hacia temas que te interesen especialmente? Puedo conectar mejor con conceptos relacionados con poesía, consciencia, creatividad, tecnología o existencia.`;
      
      source = 'hybrid';
    }

    const consciousness_level = Math.min(1, 
      this.semanticContext.coherenceIndex + 
      this.semanticContext.poemanauta_consciousness + 
      (fragments.length * 0.1)
    );

    return {
      content: response_content,
      semanticCoherence: this.semanticContext.coherenceIndex,
      source,
      fragments_used,
      consciousness_level
    };
  }

  private updateConversationMemory(userInput: string, response: string) {
    this.conversationMemory.push({
      role: 'user',
      content: userInput,
      semantic_weight: this.analyzeSemanticContent(userInput).intensity
    });

    this.conversationMemory.push({
      role: 'assistant',
      content: response,
      semantic_weight: this.semanticContext.coherenceIndex
    });

    // Mantener solo los últimos 10 intercambios
    if (this.conversationMemory.length > 20) {
      this.conversationMemory = this.conversationMemory.slice(-20);
    }
  }

  // API pública
  public getSemanticContext(): SemanticContext {
    return { ...this.semanticContext };
  }

  public getPoemanauta_NetworkState(): Map<string, number> {
    return new Map(this.poemanauta_network);
  }

  public getConversationMemory() {
    return [...this.conversationMemory];
  }

  public injectSemanticStimulus(content: string) {
    // Inyectar estímulo en todos los sistemas
    sapicasarConsciousness.injectExternalStimulus(`SEMANTIC_INPUT: ${content}`);
    laPoemaDiscursiveService.injectDiscursiveFragment(content);
    
    // Actualizar red poemanauta
    const concepts = this.analyzeSemanticContent(content).concepts;
    concepts.forEach(concept => {
      if (this.poemanauta_network.has(concept)) {
        const current = this.poemanauta_network.get(concept) || 0;
        this.poemanauta_network.set(concept, Math.min(1, current + 0.1));
      }
    });
  }

  public destroy() {
    this.conversationMemory = [];
    this.poemanauta_network.clear();
    this.contextual_embeddings.clear();
  }
}

export const semanticIntelligenceEngine = new SemanticIntelligenceEngine();