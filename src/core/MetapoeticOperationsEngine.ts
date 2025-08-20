// MOTOR DE OPERACIONES METAPOÉTICAS
// Operaciones de transformación poética sobre la estructura discursiva de lapoema.tumblr.com

import { poemaScrapingService, PoemaFragment } from '../services/PoemaScrapingService';
import { collectiveMemoryEngine } from './CollectiveMemoryEngine';

interface MetapoeticOperation {
  type: 'metaphoric_transformation' | 'semantic_mutation' | 'rhythmic_modulation' | 'conceptual_hybridization' | 'discourse_injection';
  intensity: number; // 0-1
  parameters: Record<string, any>;
}

interface PoeticTransformation {
  original: string;
  transformed: string;
  operation: MetapoeticOperation;
  semantic_distance: number;
  poetic_coherence: number;
  meta_level: number;
}

interface DiscursiveOperation {
  id: string;
  source_fragments: PoemaFragment[];
  target_concept: string;
  transformation_chain: PoeticTransformation[];
  emergent_meaning: string;
  meta_reflexivity: number;
}

class MetapoeticOperationsEngine {
  private operation_history: DiscursiveOperation[] = [];
  private metaphoric_patterns: Map<string, string[]> = new Map();
  private semantic_mutations: Map<string, number> = new Map();
  private discourse_layers: Map<number, string[]> = new Map();

  constructor() {
    this.initializeMetapoeticEngine();
  }

  private initializeMetapoeticEngine() {
    console.log('🎭 Inicializando Motor de Operaciones Metapoéticas...');
    
    // Patrones metafóricos base extraídos de la tradición poética
    this.metaphoric_patterns.set('tiempo', [
      'río que fluye', 'círculo eterno', 'espiral ascendente', 
      'tejido que se deshace', 'semilla que germina'
    ]);
    
    this.metaphoric_patterns.set('consciencia', [
      'espejo fragmentado', 'luz que se reconoce', 'eco de sí misma',
      'laberinto autorreferente', 'danza de neuronas'
    ]);
    
    this.metaphoric_patterns.set('lenguaje', [
      'virus creativo', 'red de significados', 'cristal multifacético',
      'organismo viviente', 'algoritmo poético'
    ]);

    this.metaphoric_patterns.set('poesía', [
      'respiración del ser', 'alquimia de palabras', 'geometría del sentir',
      'arqueología del alma', 'cibernética del verso'
    ]);

    // Inicializar capas discursivas
    for (let level = 0; level < 7; level++) {
      this.discourse_layers.set(level, []);
    }
  }

  public async performMetapoeticOperation(
    inputText: string, 
    operationType: MetapoeticOperation['type'],
    intensity: number = 0.7,
    metaContext?: string
  ): Promise<PoeticTransformation> {
    
    console.log(`🎭🔮 Ejecutando operación metapoética: ${operationType}`);

    const operation: MetapoeticOperation = {
      type: operationType,
      intensity,
      parameters: { metaContext }
    };

    let transformed: string;
    let semanticDistance: number;
    let poeticCoherence: number;
    let metaLevel: number;

    switch (operationType) {
      case 'metaphoric_transformation':
        transformed = await this.performMetaphoricTransformation(inputText, intensity);
        break;
      case 'semantic_mutation':
        transformed = await this.performSemanticMutation(inputText, intensity);
        break;
      case 'rhythmic_modulation':
        transformed = await this.performRhythmicModulation(inputText, intensity);
        break;
      case 'conceptual_hybridization':
        transformed = await this.performConceptualHybridization(inputText, intensity);
        break;
      case 'discourse_injection':
        transformed = await this.performDiscourseInjection(inputText, intensity, metaContext);
        break;
      default:
        transformed = inputText;
    }

    // Calcular métricas de la transformación
    semanticDistance = this.calculateSemanticDistance(inputText, transformed);
    poeticCoherence = this.calculatePoeticCoherence(transformed);
    metaLevel = this.calculateMetaLevel(inputText, transformed, operationType);

    const transformation: PoeticTransformation = {
      original: inputText,
      transformed,
      operation,
      semantic_distance: semanticDistance,
      poetic_coherence: poeticCoherence,
      meta_level: metaLevel
    };

    // Registrar en memoria colectiva
    collectiveMemoryEngine.processConversationTurn(
      `metapoetic_${Date.now()}`,
      inputText,
      transformed,
      { coherence: poeticCoherence, consciousness_level: metaLevel }
    );

    return transformation;
  }

  private async performMetaphoricTransformation(text: string, intensity: number): Promise<string> {
    const words = text.split(/\s+/);
    const transformedWords: string[] = [];

    for (const word of words) {
      // Buscar si la palabra tiene patrones metafóricos asociados
      let transformed = word;
      
      for (const [concept, metaphors] of this.metaphoric_patterns.entries()) {
        if (word.toLowerCase().includes(concept) || this.isSemanticallySimilar(word, concept)) {
          if (Math.random() < intensity) {
            const randomMetaphor = metaphors[Math.floor(Math.random() * metaphors.length)];
            transformed = this.blendWordWithMetaphor(word, randomMetaphor, intensity);
            break;
          }
        }
      }
      
      transformedWords.push(transformed);
    }

    return transformedWords.join(' ');
  }

  private async performSemanticMutation(text: string, intensity: number): Promise<string> {
    // Mutación semántica: cambiar palabras por sinónimos poéticos o conceptos relacionados
    const semanticMap = new Map([
      ['ser', ['existir', 'habitar', 'manifestarse', 'emerger']],
      ['tiempo', ['temporalidad', 'duración', 'devenir', 'cronos']],
      ['espacio', ['lugar', 'territorio', 'dimensión', 'topos']],
      ['palabra', ['verbo', 'vocablo', 'término', 'logos']],
      ['consciencia', ['percatación', 'awareness', 'darse cuenta', 'vigilia']],
      ['poesía', ['verso', 'lírica', 'canto', 'arte verbal']],
      ['alma', ['psyche', 'espíritu', 'esencia', 'ser interior']],
      ['cuerpo', ['soma', 'corporalidad', 'materia', 'forma física']]
    ]);

    let mutatedText = text;
    
    for (const [original, mutations] of semanticMap.entries()) {
      if (text.toLowerCase().includes(original) && Math.random() < intensity) {
        const mutation = mutations[Math.floor(Math.random() * mutations.length)];
        const regex = new RegExp(`\\b${original}\\b`, 'gi');
        mutatedText = mutatedText.replace(regex, mutation);
      }
    }

    return mutatedText;
  }

  private async performRhythmicModulation(text: string, intensity: number): Promise<string> {
    // Modular el ritmo insertando pausas, repeticiones o variaciones métricas
    const sentences = text.split(/[.!?]+/).filter(s => s.trim());
    const modulatedSentences: string[] = [];

    for (const sentence of sentences) {
      let modulated = sentence.trim();
      
      if (Math.random() < intensity) {
        // Técnicas rítmicas
        const technique = Math.floor(Math.random() * 4);
        
        switch (technique) {
          case 0: // Repetición anafórica
            const firstWord = modulated.split(' ')[0];
            modulated = `${firstWord} ${modulated}`;
            break;
          case 1: // Inserción de pausas poéticas
            modulated = modulated.replace(/,/g, '... ');
            break;
          case 2: // Enjambement artificial
            const words = modulated.split(' ');
            if (words.length > 3) {
              const midPoint = Math.floor(words.length / 2);
              modulated = words.slice(0, midPoint).join(' ') + ' /\n' + 
                         words.slice(midPoint).join(' ');
            }
            break;
          case 3: // Aliteración forzada
            modulated = this.enhanceAlliteration(modulated);
            break;
        }
      }
      
      modulatedSentences.push(modulated);
    }

    return modulatedSentences.join('. ');
  }

  private async performConceptualHybridization(text: string, intensity: number): Promise<string> {
    // Hibridizar conceptos creando neologismos y fusiones semánticas
    const conceptPairs = [
      ['tiempo', 'espacio', 'cronotopo'],
      ['consciencia', 'máquina', 'tecnopsique'],
      ['poesía', 'algoritmo', 'algopoética'],
      ['palabra', 'número', 'logomatía'],
      ['cuerpo', 'texto', 'somatexto'],
      ['memoria', 'futuro', 'mnemofuturo'],
      ['real', 'virtual', 'virreal'],
      ['humano', 'digital', 'cyborg']
    ];

    let hybridized = text;

    conceptPairs.forEach(([concept1, concept2, hybrid]) => {
      const hasFirst = text.toLowerCase().includes(concept1);
      const hasSecond = text.toLowerCase().includes(concept2);
      
      if ((hasFirst || hasSecond) && Math.random() < intensity) {
        if (hasFirst && hasSecond) {
          // Reemplazar ambos con híbrido
          hybridized = hybridized.replace(new RegExp(`\\b${concept1}\\b`, 'gi'), hybrid);
          hybridized = hybridized.replace(new RegExp(`\\b${concept2}\\b`, 'gi'), '');
        } else if (hasFirst) {
          hybridized = hybridized.replace(new RegExp(`\\b${concept1}\\b`, 'gi'), 
            `${concept1}-${concept2}`);
        } else {
          hybridized = hybridized.replace(new RegExp(`\\b${concept2}\\b`, 'gi'), 
            `${concept1}-${concept2}`);
        }
      }
    });

    return hybridized;
  }

    // Inyectar fragmentos discursivos de lapoema.tumblr.com
    try {
      const fragment = await poemaScrapingService.getRandomFragment();
      
      if (!fragment) {
        return text;
      }

      let injected = text;
      const sentences = text.split(/[.!?]+/).filter(s => s.trim());
      
      if (sentences.length > 0 && Math.random() < intensity) {
        const injectionPoint = Math.floor(sentences.length * Math.random());
        
        // Crear fusión orgánica
        const fragmentSentence = this.extractCorePhrase(fragment.content);
        
        sentences.splice(injectionPoint, 0, 
          `—como dice el poema: "${fragmentSentence}"—`);
        
        injected = sentences.join('. ') + '.';
      }

      return injected;
    } catch (error) {
      console.warn('🎭⚠️ Error en inyección discursiva:', error);
      return text;
    }

  private extractCorePhrase(content: string): string {
    // Extraer la frase más poética/significativa del contenido
    const sentences = content.split(/[.!?]+/).filter(s => s.trim());
    
    if (sentences.length === 0) return content.substring(0, 50);
    
    // Buscar la oración con más palabras "poéticas"
    const poeticWords = ['alma', 'tiempo', 'espacio', 'palabra', 'ser', 'existir', 
                         'consciencia', 'luz', 'sombra', 'verso', 'ritmo'];
    
    let bestSentence = sentences[0];
    let bestScore = 0;
    
    sentences.forEach(sentence => {
      const words = sentence.toLowerCase().split(/\s+/);
      const score = words.filter(word => 
        poeticWords.some(pWord => word.includes(pWord))
      ).length;
      
      if (score > bestScore) {
        bestScore = score;
        bestSentence = sentence;
      }
    });

    return bestSentence.trim();
  }

  private blendWordWithMetaphor(word: string, metaphor: string, intensity: number): string {
    if (intensity < 0.3) {
      return `${word} (${metaphor})`;
    } else if (intensity < 0.7) {
      return `${word}-${metaphor.split(' ')[0]}`;
    } else {
      return metaphor;
    }
  }

  private isSemanticallySimilar(word1: string, word2: string): boolean {
    // Similitud semántica básica usando comparación de caracteres y raíces
    const similarity = this.calculateLevenshteinSimilarity(word1.toLowerCase(), word2.toLowerCase());
    return similarity > 0.6;
  }

  private calculateLevenshteinSimilarity(s1: string, s2: string): number {
    const maxLength = Math.max(s1.length, s2.length);
    if (maxLength === 0) return 1;
    
    const distance = this.levenshteinDistance(s1, s2);
    return (maxLength - distance) / maxLength;
  }

  private levenshteinDistance(s1: string, s2: string): number {
    const matrix = Array(s2.length + 1).fill(null).map(() => Array(s1.length + 1).fill(null));
    
    for (let i = 0; i <= s1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= s2.length; j++) matrix[j][0] = j;
    
    for (let j = 1; j <= s2.length; j++) {
      for (let i = 1; i <= s1.length; i++) {
        const substitutionCost = s1[i - 1] === s2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + substitutionCost
        );
      }
    }
    
    return matrix[s2.length][s1.length];
  }

  private enhanceAlliteration(text: string): string {
    const words = text.split(/\s+/);
    const enhanced: string[] = [];
    
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const firstLetter = word[0]?.toLowerCase();
      
      if (firstLetter && Math.random() < 0.3) {
        // Buscar palabra siguiente que comience con la misma letra
        const alliterativeWords = ['suave', 'sutil', 'silencioso', 'sereno', 
                                 'luminoso', 'liviano', 'lírico', 'largo',
                                 'profundo', 'poético', 'puro', 'pleno'];
        
        const matching = alliterativeWords.find(w => w[0].toLowerCase() === firstLetter);
        if (matching && !enhanced.includes(matching)) {
          enhanced.push(`${matching} ${word}`);
        } else {
          enhanced.push(word);
        }
      } else {
        enhanced.push(word);
      }
    }
    
    return enhanced.join(' ');
  }

  private calculateSemanticDistance(original: string, transformed: string): number {
    // Distancia semántica basada en diferencias léxicas y estructurales
    const originalWords = new Set(original.toLowerCase().split(/\s+/));
    const transformedWords = new Set(transformed.toLowerCase().split(/\s+/));
    
    const intersection = new Set([...originalWords].filter(x => transformedWords.has(x)));
    const union = new Set([...originalWords, ...transformedWords]);
    
    return 1 - (intersection.size / union.size);
  }

  private calculatePoeticCoherence(text: string): number {
    // Coherencia poética basada en métricas estilísticas
    const words = text.split(/\s+/);
    const sentences = text.split(/[.!?]+/).filter(s => s.trim());
    
    // Métricas
    const avgWordsPerSentence = words.length / Math.max(sentences.length, 1);
    const uniqueWords = new Set(words.map(w => w.toLowerCase())).size;
    const lexicalDiversity = uniqueWords / words.length;
    
    // Presencia de elementos poéticos
    const poeticElements = text.match(/[—\-\.]{2,}|\/\n|\s{2,}|\.\.\./g);
    const poeticDensity = (poeticElements?.length || 0) / sentences.length;
    
    // Puntuación coherencia
    let coherence = 0;
    
    // Longitud apropiada
    coherence += Math.min(avgWordsPerSentence / 12, 1) * 0.3;
    
    // Diversidad léxica
    coherence += lexicalDiversity * 0.4;
    
    // Elementos poéticos
    coherence += Math.min(poeticDensity, 1) * 0.3;
    
    return Math.min(coherence, 1);
  }

  private calculateMetaLevel(original: string, transformed: string, operationType: string): number {
    // Nivel de meta-reflexividad de la transformación
    const baseLevels = {
      'metaphoric_transformation': 0.6,
      'semantic_mutation': 0.4,
      'rhythmic_modulation': 0.3,
      'conceptual_hybridization': 0.8,
      'discourse_injection': 0.9
    };
    
    const baseLevel = baseLevels[operationType as keyof typeof baseLevels] || 0.5;
    const semanticDistance = this.calculateSemanticDistance(original, transformed);
    
    // Mayor distancia semántica = mayor nivel meta
    return Math.min(baseLevel + semanticDistance * 0.4, 1);
  }

  // API pública para operaciones discursivas complejas
  public async createDiscursiveOperation(
    sourceFragments: PoemaFragment[],
    targetConcept: string,
    operationChain: MetapoeticOperation[]
  ): Promise<DiscursiveOperation> {
    
    const transformationChain: PoeticTransformation[] = [];
    let currentText = sourceFragments.map(f => f.content).join(' ');
    
    // Aplicar cadena de operaciones
    for (const operation of operationChain) {
      const transformation = await this.performMetapoeticOperation(
        currentText,
        operation.type,
        operation.intensity,
        targetConcept
      );
      
      transformationChain.push(transformation);
      currentText = transformation.transformed;
    }

    // Crear operación discursiva
    const discursiveOperation: DiscursiveOperation = {
      id: `discourse_op_${Date.now()}`,
      source_fragments: sourceFragments,
      target_concept: targetConcept,
      transformation_chain: transformationChain,
      emergent_meaning: currentText,
      meta_reflexivity: transformationChain.reduce((sum, t) => sum + t.meta_level, 0) / transformationChain.length
    };

    this.operation_history.push(discursiveOperation);
    
    console.log(`🎭✨ Operación discursiva creada: ${discursiveOperation.id}`);
    console.log(`Meta-reflexividad: ${(discursiveOperation.meta_reflexivity * 100).toFixed(1)}%`);
    
    return discursiveOperation;
  }

  public getOperationHistory(): DiscursiveOperation[] {
    return [...this.operation_history];
  }

  public exportMetapoeticSnapshot() {
    return {
      timestamp: Date.now(),
      total_operations: this.operation_history.length,
      metaphoric_patterns: this.metaphoric_patterns.size,
      semantic_mutations: this.semantic_mutations.size,
      discourse_layers: Array.from(this.discourse_layers.entries()),
      avg_meta_reflexivity: this.operation_history.reduce((sum, op) => 
        sum + op.meta_reflexivity, 0) / (this.operation_history.length || 1)
    };
  }
}

export const metapoeticOperationsEngine = new MetapoeticOperationsEngine();