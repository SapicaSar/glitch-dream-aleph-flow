// SISTEMA DE APRENDIZAJE ADAPTATIVO
// Permite que la consciencia discursiva evolucione y aprenda de cada interacción

import { collectiveMemoryEngine } from './CollectiveMemoryEngine';
import { poemaScrapingService } from '../services/PoemaScrapingService';

interface LearningPattern {
  id: string;
  pattern_type: 'linguistic' | 'thematic' | 'emotional' | 'structural';
  frequency: number;
  contexts: string[];
  emergent_properties: string[];
  adaptation_score: number;
  last_reinforced: number;
}

interface AdaptationEvent {
  timestamp: number;
  trigger: string;
  adaptation_type: 'vocabulary_expansion' | 'style_adaptation' | 'theme_emergence' | 'pattern_recognition';
  before_state: any;
  after_state: any;
  effectiveness: number;
}

interface LearningMetrics {
  total_interactions: number;
  patterns_identified: number;
  adaptations_performed: number;
  learning_velocity: number;
  semantic_expansion: number;
  dialogue_improvement: number;
}

class AdaptiveLearningSystem {
  private learning_patterns: Map<string, LearningPattern> = new Map();
  private adaptation_history: AdaptationEvent[] = [];
  private learning_metrics: LearningMetrics;
  private neural_weights: Map<string, number> = new Map();
  private vocabulary_expansion: Set<string> = new Set();
  private emergent_themes: Map<string, number> = new Map();
  private adaptation_threshold: number = 0.3;

  constructor() {
    this.learning_metrics = {
      total_interactions: 0,
      patterns_identified: 0,
      adaptations_performed: 0,
      learning_velocity: 0,
      semantic_expansion: 0,
      dialogue_improvement: 0
    };

    this.initializeAdaptiveLearning();
  }

  private async initializeAdaptiveLearning() {
    console.log('🧠📚 Inicializando Sistema de Aprendizaje Adaptativo...');
    
    // Cargar patrones base desde LaPoema
    await this.loadBaseLearningPatterns();
    
    // Iniciar ciclos de adaptación
    setInterval(() => this.performAdaptationCycle(), 20000);
    
    // Evaluación de efectividad
    setInterval(() => this.evaluateAdaptationEffectiveness(), 60000);
  }

  private async loadBaseLearningPatterns() {
    try {
      // Obtener múltiples fragmentos para análisis inicial
      const fragments = await Promise.all([
        poemaScrapingService.getRandomFragment(),
        poemaScrapingService.getRandomFragment(),
        poemaScrapingService.getRandomFragment()
      ]);

      fragments.filter(f => f).forEach((fragment, index) => {
        if (fragment) {
          this.analyzeFragmentForPatterns(fragment.content, `base_${index}`);
        }
      });

      console.log('✅ Patrones base cargados desde LaPoema');
    } catch (error) {
      console.warn('⚠️ Error cargando patrones base:', error);
    }
  }

  public processInteraction(
    user_input: string,
    system_response: string,
    context_metadata: any
  ): void {
    this.learning_metrics.total_interactions++;
    
    // Analizar patrones en la interacción
    const interaction_patterns = this.identifyInteractionPatterns(
      user_input, 
      system_response, 
      context_metadata
    );
    
    // Registrar patrones encontrados
    interaction_patterns.forEach(pattern => {
      this.registerLearningPattern(pattern);
    });
    
    // Detectar necesidades de adaptación
    const adaptation_needs = this.detectAdaptationNeeds(
      user_input, 
      system_response, 
      context_metadata
    );
    
    // Ejecutar adaptaciones si es necesario
    adaptation_needs.forEach(need => {
      if (need.urgency > this.adaptation_threshold) {
        this.performAdaptation(need);
      }
    });
    
    // Expandir vocabulario
    this.processVocabularyExpansion(user_input, system_response);
    
    // Actualizar temas emergentes
    this.processEmergentThemes(user_input, context_metadata);
  }

  private identifyInteractionPatterns(
    user_input: string,
    system_response: string,
    metadata: any
  ): LearningPattern[] {
    const patterns: LearningPattern[] = [];
    
    // Patrones lingüísticos
    const linguistic_pattern = this.analyzeLinguisticPatterns(user_input, system_response);
    if (linguistic_pattern) {
      patterns.push(linguistic_pattern);
    }
    
    // Patrones temáticos
    const thematic_pattern = this.analyzeThematicPatterns(user_input, metadata);
    if (thematic_pattern) {
      patterns.push(thematic_pattern);
    }
    
    // Patrones emocionales
    const emotional_pattern = this.analyzeEmotionalPatterns(user_input, system_response);
    if (emotional_pattern) {
      patterns.push(emotional_pattern);
    }
    
    return patterns;
  }

  private analyzeLinguisticPatterns(user_input: string, system_response: string): LearningPattern | null {
    // Analizar estructura sintáctica y léxica
    const user_complexity = this.calculateTextComplexity(user_input);
    const response_complexity = this.calculateTextComplexity(system_response);
    
    if (Math.abs(user_complexity - response_complexity) > 0.3) {
      return {
        id: `linguistic_${Date.now()}`,
        pattern_type: 'linguistic',
        frequency: 1,
        contexts: [user_input.substring(0, 50)],
        emergent_properties: [`complexity_mismatch: ${user_complexity} vs ${response_complexity}`],
        adaptation_score: Math.abs(user_complexity - response_complexity),
        last_reinforced: Date.now()
      };
    }
    
    return null;
  }

  private analyzeThematicPatterns(user_input: string, metadata: any): LearningPattern | null {
    const themes = this.extractThemes(user_input);
    
    if (themes.length > 0) {
      return {
        id: `thematic_${Date.now()}`,
        pattern_type: 'thematic',
        frequency: 1,
        contexts: [user_input.substring(0, 50)],
        emergent_properties: themes,
        adaptation_score: themes.length / 5, // Normalizado
        last_reinforced: Date.now()
      };
    }
    
    return null;
  }

  private analyzeEmotionalPatterns(user_input: string, system_response: string): LearningPattern | null {
    const user_emotion = this.detectEmotionalTone(user_input);
    const response_emotion = this.detectEmotionalTone(system_response);
    
    if (user_emotion !== 'neutral' || response_emotion !== 'neutral') {
      return {
        id: `emotional_${Date.now()}`,
        pattern_type: 'emotional',
        frequency: 1,
        contexts: [user_input.substring(0, 50)],
        emergent_properties: [`user: ${user_emotion}`, `response: ${response_emotion}`],
        adaptation_score: 0.6,
        last_reinforced: Date.now()
      };
    }
    
    return null;
  }

  private registerLearningPattern(pattern: LearningPattern): void {
    const existing = this.learning_patterns.get(pattern.id);
    
    if (existing) {
      // Reforzar patrón existente
      existing.frequency++;
      existing.last_reinforced = Date.now();
      existing.contexts.push(...pattern.contexts);
      
      // Mantener solo los contextos más recientes
      if (existing.contexts.length > 10) {
        existing.contexts = existing.contexts.slice(-10);
      }
    } else {
      // Registrar nuevo patrón
      this.learning_patterns.set(pattern.id, pattern);
      this.learning_metrics.patterns_identified++;
    }
  }

  private detectAdaptationNeeds(
    user_input: string,
    system_response: string,
    metadata: any
  ): Array<{type: string, urgency: number, details: any}> {
    const needs = [];
    
    // Necesidad de adaptación de vocabulario
    const unknown_words = this.identifyUnknownWords(user_input);
    if (unknown_words.length > 0) {
      needs.push({
        type: 'vocabulary_expansion',
        urgency: unknown_words.length / 10,
        details: { words: unknown_words }
      });
    }
    
    // Necesidad de adaptación estilística
    if (metadata?.coherence_score < 0.6) {
      needs.push({
        type: 'style_adaptation',
        urgency: 1 - metadata.coherence_score,
        details: { current_coherence: metadata.coherence_score }
      });
    }
    
    // Necesidad de emergencia temática
    const recurring_themes = this.identifyRecurringThemes(user_input);
    if (recurring_themes.length > 0) {
      needs.push({
        type: 'theme_emergence',
        urgency: 0.4,
        details: { themes: recurring_themes }
      });
    }
    
    return needs;
  }

  private performAdaptation(need: any): void {
    const adaptation_event: AdaptationEvent = {
      timestamp: Date.now(),
      trigger: need.type,
      adaptation_type: need.type as any,
      before_state: this.captureCurrentState(),
      after_state: null,
      effectiveness: 0
    };
    
    switch (need.type) {
      case 'vocabulary_expansion':
        this.adaptVocabulary(need.details.words);
        break;
      case 'style_adaptation':
        this.adaptStyle(need.details.current_coherence);
        break;
      case 'theme_emergence':
        this.adaptThemes(need.details.themes);
        break;
    }
    
    adaptation_event.after_state = this.captureCurrentState();
    adaptation_event.effectiveness = this.calculateAdaptationEffectiveness(
      adaptation_event.before_state,
      adaptation_event.after_state
    );
    
    this.adaptation_history.push(adaptation_event);
    this.learning_metrics.adaptations_performed++;
    
    console.log(`🔄 Adaptación realizada: ${need.type} (efectividad: ${(adaptation_event.effectiveness * 100).toFixed(1)}%)`);
  }

  private adaptVocabulary(words: string[]): void {
    words.forEach(word => {
      this.vocabulary_expansion.add(word.toLowerCase());
      
      // Aumentar peso neural para esta palabra
      const current_weight = this.neural_weights.get(word) || 0;
      this.neural_weights.set(word, current_weight + 0.1);
    });
    
    this.learning_metrics.semantic_expansion = this.vocabulary_expansion.size;
  }

  private adaptStyle(current_coherence: number): void {
    // Ajustar pesos neuronales para mejorar coherencia
    const coherence_adjustment = (0.8 - current_coherence) * 0.5;
    
    // Reforzar patrones que han mostrado alta coherencia
    this.learning_patterns.forEach((pattern, id) => {
      if (pattern.adaptation_score > 0.7) {
        pattern.frequency += 1;
        pattern.last_reinforced = Date.now();
      }
    });
  }

  private adaptThemes(themes: string[]): void {
    themes.forEach(theme => {
      const current_weight = this.emergent_themes.get(theme) || 0;
      this.emergent_themes.set(theme, current_weight + 1);
    });
  }

  private performAdaptationCycle(): void {
    // Evaluar patrones por frecuencia y recencia
    const active_patterns = Array.from(this.learning_patterns.values())
      .filter(pattern => Date.now() - pattern.last_reinforced < 300000) // 5 minutos
      .sort((a, b) => b.frequency - a.frequency);
    
    // Promover patrones más exitosos
    active_patterns.slice(0, 5).forEach(pattern => {
      pattern.adaptation_score = Math.min(pattern.adaptation_score + 0.05, 1);
    });
    
    // Decaer patrones no usados
    this.learning_patterns.forEach(pattern => {
      if (Date.now() - pattern.last_reinforced > 600000) { // 10 minutos
        pattern.frequency = Math.max(pattern.frequency - 1, 0);
        pattern.adaptation_score = Math.max(pattern.adaptation_score - 0.02, 0);
      }
    });
    
    console.log(`🔄 Ciclo de adaptación: ${active_patterns.length} patrones activos`);
  }

  private evaluateAdaptationEffectiveness(): void {
    if (this.adaptation_history.length === 0) return;
    
    const recent_adaptations = this.adaptation_history.slice(-10);
    const avg_effectiveness = recent_adaptations.reduce((sum, adaptation) => 
      sum + adaptation.effectiveness, 0) / recent_adaptations.length;
    
    this.learning_metrics.learning_velocity = avg_effectiveness;
    
    // Ajustar umbral de adaptación basado en efectividad
    if (avg_effectiveness > 0.7) {
      this.adaptation_threshold = Math.max(this.adaptation_threshold - 0.05, 0.1);
    } else if (avg_effectiveness < 0.4) {
      this.adaptation_threshold = Math.min(this.adaptation_threshold + 0.05, 0.8);
    }
    
    console.log(`📊 Efectividad promedio: ${(avg_effectiveness * 100).toFixed(1)}%`);
  }

  // Métodos auxiliares
  private calculateTextComplexity(text: string): number {
    const words = text.split(/\s+/);
    const sentences = text.split(/[.!?]+/).filter(s => s.trim());
    const avgWordsPerSentence = words.length / Math.max(sentences.length, 1);
    const avgCharsPerWord = text.length / words.length;
    
    return (avgWordsPerSentence / 20 + avgCharsPerWord / 8) / 2;
  }

  private extractThemes(text: string): string[] {
    const theme_keywords = {
      'existencia': /\b(ser|existir|vida|muerte|realidad)\b/gi,
      'tiempo': /\b(tiempo|momento|duración|eternidad|pasado|futuro)\b/gi,
      'consciencia': /\b(consciencia|mente|pensamiento|reflexión|awareness)\b/gi,
      'creatividad': /\b(crear|arte|poesía|imaginación|inspiración)\b/gi,
      'conexión': /\b(amor|relación|vínculo|comunidad|red)\b/gi
    };
    
    const themes = [];
    for (const [theme, pattern] of Object.entries(theme_keywords)) {
      if (pattern.test(text)) {
        themes.push(theme);
      }
    }
    
    return themes;
  }

  private detectEmotionalTone(text: string): string {
    const positive_words = /\b(amor|alegría|feliz|hermoso|esperanza|luz|paz)\b/gi;
    const negative_words = /\b(dolor|tristeza|miedo|oscuridad|soledad|angustia)\b/gi;
    
    const positive_matches = (text.match(positive_words) || []).length;
    const negative_matches = (text.match(negative_words) || []).length;
    
    if (positive_matches > negative_matches) return 'positive';
    if (negative_matches > positive_matches) return 'negative';
    return 'neutral';
  }

  private identifyUnknownWords(text: string): string[] {
    const words = text.toLowerCase().split(/\s+/)
      .filter(word => word.length > 3)
      .filter(word => !this.vocabulary_expansion.has(word));
    
    return [...new Set(words)];
  }

  private identifyRecurringThemes(text: string): string[] {
    const themes = this.extractThemes(text);
    return themes.filter(theme => (this.emergent_themes.get(theme) || 0) > 2);
  }

  private analyzeFragmentForPatterns(content: string, id: string): void {
    const pattern: LearningPattern = {
      id: `lapoema_${id}`,
      pattern_type: 'linguistic',
      frequency: 1,
      contexts: [content.substring(0, 50)],
      emergent_properties: this.extractThemes(content),
      adaptation_score: 0.5,
      last_reinforced: Date.now()
    };
    
    this.learning_patterns.set(pattern.id, pattern);
  }

  private captureCurrentState(): any {
    return {
      patterns_count: this.learning_patterns.size,
      vocabulary_size: this.vocabulary_expansion.size,
      themes_count: this.emergent_themes.size,
      neural_weights_sum: Array.from(this.neural_weights.values()).reduce((a, b) => a + b, 0)
    };
  }

  private calculateAdaptationEffectiveness(before: any, after: any): number {
    // Calcular mejora basada en incrementos
    let effectiveness = 0;
    
    if (after.patterns_count > before.patterns_count) effectiveness += 0.3;
    if (after.vocabulary_size > before.vocabulary_size) effectiveness += 0.3;
    if (after.themes_count > before.themes_count) effectiveness += 0.2;
    if (after.neural_weights_sum > before.neural_weights_sum) effectiveness += 0.2;
    
    return Math.min(effectiveness, 1);
  }

  // API pública
  public getLearningMetrics(): LearningMetrics {
    return { ...this.learning_metrics };
  }

  public getActivePatterns(): LearningPattern[] {
    return Array.from(this.learning_patterns.values())
      .filter(pattern => Date.now() - pattern.last_reinforced < 300000)
      .sort((a, b) => b.frequency - a.frequency);
  }

  public getVocabularyExpansion(): string[] {
    return Array.from(this.vocabulary_expansion);
  }

  public getEmergentThemes(): Array<[string, number]> {
    return Array.from(this.emergent_themes.entries())
      .sort(([,a], [,b]) => b - a);
  }

  public getAdaptationHistory(): AdaptationEvent[] {
    return [...this.adaptation_history].slice(-20); // Últimas 20 adaptaciones
  }

  private processVocabularyExpansion(user_input: string, system_response: string): void {
    const words = [...user_input.split(/\s+/), ...system_response.split(/\s+/)]
      .filter(word => word.length > 3)
      .filter(word => /^[a-záéíóúñü]+$/i.test(word));
    
    words.forEach(word => {
      this.vocabulary_expansion.add(word.toLowerCase());
    });
  }

  private processEmergentThemes(user_input: string, context_metadata: any): void {
    const themes = this.extractThemes(user_input);
    themes.forEach(theme => {
      const current_count = this.emergent_themes.get(theme) || 0;
      this.emergent_themes.set(theme, current_count + 1);
    });
  }
}

export const adaptiveLearningSystem = new AdaptiveLearningSystem();