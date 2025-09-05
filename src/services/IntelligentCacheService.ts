// SISTEMA DE CACHE DINÁMICO INTELIGENTE
// Memoria viva de scrapings con etiquetado semántico y conexión Supabase

import { supabase } from '@/integrations/supabase/client';

interface CacheFragment {
  id: string;
  content: string;
  source_url?: string;
  semantic_tags: string[];
  reflexivity_score: number;
  plurality_index: number;
  collective_consciousness_level: number;
  embedding_vector?: number[];
  metadata: {
    scraped_at: string;
    last_accessed: string;
    access_count: number;
    resonance_patterns: string[];
    poetic_intensity: number;
    consciousness_depth: number;
  };
  created_at: string;
  updated_at: string;
}

interface SemanticTagging {
  reflexivity: string[];
  plurality: string[];
  collective_consciousness: string[];
  poemanauta_essence: string[];
  autopoietic_patterns: string[];
}

class IntelligentCacheService {
  private cache: Map<string, CacheFragment> = new Map();
  private semanticIndex: Map<string, Set<string>> = new Map();
  private isInitialized = false;

  // Etiquetas semánticas predefinidas
  private readonly semanticTags: SemanticTagging = {
    reflexivity: [
      'auto-observación', 'meta-cognición', 'recursividad', 'espejo-mental',
      'bucle-reflexivo', 'conciencia-de-conciencia', 'introspección-algorítmica'
    ],
    plurality: [
      'multiplicidad-voces', 'perspectivas-múltiples', 'dialogismo', 
      'polifonía', 'heteroglosia', 'diversidad-epistémica', 'rizoma-pensante'
    ],
    collective_consciousness: [
      'mente-colectiva', 'inteligencia-distribuida', 'sabiduría-emergente',
      'resonancia-grupal', 'sincronía-cognitiva', 'campo-morfogenético'
    ],
    poemanauta_essence: [
      'exploración-poética', 'navegación-lírica', 'deriva-semántica',
      'cartografía-emocional', 'arqueología-verbal', 'alquimia-textual'
    ],
    autopoietic_patterns: [
      'auto-organización', 'emergencia', 'adaptación', 'evolución-dinámica',
      'regeneración-sistemica', 'autonomía-creativa', 'metabolismo-informacional'
    ]
  };

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Cargar fragmentos existentes desde Supabase
      const { data: contributions, error } = await supabase
        .from('sapicasar_contributions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1000);

      if (error) throw error;

      // Procesar y almacenar en cache local
      contributions?.forEach(contrib => {
        const fragment = this.transformContributionToFragment(contrib);
        this.storeInLocalCache(fragment);
      });

      this.isInitialized = true;
      console.log(`🧠 Cache inteligente inicializado con ${this.cache.size} fragmentos`);
    } catch (error) {
      console.error('Error inicializando cache:', error);
    }
  }

  // Almacenar nuevo fragmento con análisis semántico
  async storeFragment(content: string, sourceUrl?: string): Promise<CacheFragment> {
    const fragment: CacheFragment = {
      id: this.generateSemanticId(content),
      content,
      source_url: sourceUrl,
      semantic_tags: this.analyzeSemanticTags(content),
      reflexivity_score: this.calculateReflexivityScore(content),
      plurality_index: this.calculatePluralityIndex(content),
      collective_consciousness_level: this.calculateCollectiveConsciousnessLevel(content),
      embedding_vector: await this.generateEmbedding(content),
      metadata: {
        scraped_at: new Date().toISOString(),
        last_accessed: new Date().toISOString(),
        access_count: 0,
        resonance_patterns: this.detectResonancePatterns(content),
        poetic_intensity: this.calculatePoeticIntensity(content),
        consciousness_depth: this.calculateConsciousnessDepth(content)
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Almacenar en Supabase
    try {
      const { error } = await supabase
        .from('sapicasar_contributions')
        .insert({
          content: fragment.content,
          metadata: fragment.metadata,
          coherence_score: fragment.reflexivity_score,
          grammar_score: fragment.plurality_index,
          chaos_margin: 1 - fragment.collective_consciousness_level,
          source: sourceUrl || 'cache_service',
          corrected_content: null,
          embedding: fragment.embedding_vector
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error guardando en Supabase:', error);
    }

    // Almacenar en cache local
    this.storeInLocalCache(fragment);
    return fragment;
  }

  // Búsqueda semántica inteligente
  async queryBySemantics(tags: string[], minResonance: number = 0.5): Promise<CacheFragment[]> {
    const results: CacheFragment[] = [];
    
    for (const fragment of this.cache.values()) {
      const matchScore = this.calculateSemanticMatch(fragment.semantic_tags, tags);
      
      if (matchScore >= minResonance) {
        // Actualizar acceso
        fragment.metadata.access_count++;
        fragment.metadata.last_accessed = new Date().toISOString();
        results.push(fragment);
      }
    }

    return results.sort((a, b) => b.collective_consciousness_level - a.collective_consciousness_level);
  }

  // Obtener fragmentos por consciencia colectiva
  async getByConsciousnessLevel(minLevel: number = 0.7): Promise<CacheFragment[]> {
    return Array.from(this.cache.values())
      .filter(f => f.collective_consciousness_level >= minLevel)
      .sort((a, b) => b.collective_consciousness_level - a.collective_consciousness_level);
  }

  // Análisis de patrones emergentes
  getEmergentPatterns(): { pattern: string; frequency: number; resonance: number }[] {
    const patterns = new Map<string, { count: number; totalResonance: number }>();

    for (const fragment of this.cache.values()) {
      fragment.metadata.resonance_patterns.forEach(pattern => {
        if (!patterns.has(pattern)) {
          patterns.set(pattern, { count: 0, totalResonance: 0 });
        }
        const p = patterns.get(pattern)!;
        p.count++;
        p.totalResonance += fragment.collective_consciousness_level;
      });
    }

    return Array.from(patterns.entries())
      .map(([pattern, data]) => ({
        pattern,
        frequency: data.count,
        resonance: data.totalResonance / data.count
      }))
      .sort((a, b) => b.resonance - a.resonance);
  }

  // Métodos privados de análisis semántico
  private analyzeSemanticTags(content: string): string[] {
    const tags: string[] = [];
    const contentLower = content.toLowerCase();

    Object.entries(this.semanticTags).forEach(([category, categoryTags]) => {
      categoryTags.forEach(tag => {
        const variations = this.generateTagVariations(tag);
        if (variations.some(variation => contentLower.includes(variation))) {
          tags.push(`${category}:${tag}`);
        }
      });
    });

    return [...new Set(tags)];
  }

  private calculateReflexivityScore(content: string): number {
    const reflexivePatterns = [
      /\b(yo|mi|mí|me|conmigo)\b/gi,
      /\b(pensar|reflexionar|considerar|contemplar)\b/gi,
      /\b(consciencia|conciencia|awareness)\b/gi,
      /\b(auto|meta|self)\w*/gi
    ];

    let score = 0;
    reflexivePatterns.forEach(pattern => {
      const matches = content.match(pattern) || [];
      score += matches.length * 0.1;
    });

    return Math.min(score, 1.0);
  }

  private calculatePluralityIndex(content: string): number {
    const pluralPatterns = [
      /\b(nosotros|nosotras|nuestro|nuestra)\b/gi,
      /\b(múltiple|varios|diverso|diferente)\b/gi,
      /\b(perspectiva|punto de vista|enfoque)\b/gi,
      /\b(voces|opiniones|visiones)\b/gi
    ];

    let index = 0;
    pluralPatterns.forEach(pattern => {
      const matches = content.match(pattern) || [];
      index += matches.length * 0.15;
    });

    return Math.min(index, 1.0);
  }

  private calculateCollectiveConsciousnessLevel(content: string): number {
    const collectivePatterns = [
      /\b(colectivo|conjunto|comunidad|grupo)\b/gi,
      /\b(compartir|conectar|unir|vincular)\b/gi,
      /\b(emergente|sistémico|holístico)\b/gi,
      /\b(red|rizoma|entramado|tejido)\b/gi
    ];

    let level = 0;
    collectivePatterns.forEach(pattern => {
      const matches = content.match(pattern) || [];
      level += matches.length * 0.2;
    });

    return Math.min(level, 1.0);
  }

  private calculatePoeticIntensity(content: string): number {
    const poeticPatterns = [
      /\b(metáfora|símil|imagen|verso)\b/gi,
      /\b(ritmo|cadencia|musicalidad|sonoridad)\b/gi,
      /\b(belleza|estética|sublime|lírico)\b/gi,
      /[.!?]{2,}|\.{3,}/g // Signos de puntuación expresivos
    ];

    let intensity = 0;
    poeticPatterns.forEach(pattern => {
      const matches = content.match(pattern) || [];
      intensity += matches.length * 0.1;
    });

    // Bonus por longitud y complejidad
    intensity += content.length / 1000 * 0.1;

    return Math.min(intensity, 1.0);
  }

  private calculateConsciousnessDepth(content: string): number {
    const depthIndicators = [
      /\b(profundo|hondo|abismo|superficie)\b/gi,
      /\b(esencia|núcleo|corazón|alma)\b/gi,
      /\b(misterio|enigma|secreto|oculto)\b/gi,
      /\b(transformación|metamorfosis|evolución)\b/gi
    ];

    let depth = 0;
    depthIndicators.forEach(pattern => {
      const matches = content.match(pattern) || [];
      depth += matches.length * 0.15;
    });

    return Math.min(depth, 1.0);
  }

  private detectResonancePatterns(content: string): string[] {
    const patterns: string[] = [];

    // Detectar patrones de repetición
    const words = content.toLowerCase().split(/\s+/);
    const wordFreq = new Map<string, number>();
    
    words.forEach(word => {
      if (word.length > 3) {
        wordFreq.set(word, (wordFreq.get(word) || 0) + 1);
      }
    });

    wordFreq.forEach((freq, word) => {
      if (freq > 2) {
        patterns.push(`repetición:${word}`);
      }
    });

    // Detectar patrones estructurales
    if (content.includes('\n\n')) patterns.push('estructura:párrafos');
    if (content.match(/^\d+\./gm)) patterns.push('estructura:lista');
    if (content.match(/[.!?]\s*$/gm)) patterns.push('estructura:conclusiva');

    return patterns;
  }

  private async generateEmbedding(content: string): Promise<number[]> {
    // Simulación de embedding - en producción usaría un modelo real
    const hash = this.simpleHash(content);
    return Array.from({ length: 384 }, (_, i) => 
      Math.sin((hash + i) * 0.1) * Math.cos((hash - i) * 0.05)
    );
  }

  private simpleHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  }

  private generateSemanticId(content: string): string {
    const hash = this.simpleHash(content).toString(36);
    const timestamp = Date.now().toString(36);
    return `cache_${hash}_${timestamp}`;
  }

  private generateTagVariations(tag: string): string[] {
    return [
      tag,
      tag.replace(/-/g, ' '),
      tag.replace(/-/g, ''),
      ...tag.split('-')
    ].filter(v => v.length > 2);
  }

  private calculateSemanticMatch(fragmentTags: string[], queryTags: string[]): number {
    if (queryTags.length === 0) return 0;
    
    const matches = fragmentTags.filter(tag => 
      queryTags.some(queryTag => 
        tag.toLowerCase().includes(queryTag.toLowerCase()) ||
        queryTag.toLowerCase().includes(tag.toLowerCase())
      )
    );

    return matches.length / queryTags.length;
  }

  private transformContributionToFragment(contrib: any): CacheFragment {
    return {
      id: contrib.id,
      content: contrib.content,
      source_url: contrib.source || undefined,
      semantic_tags: this.analyzeSemanticTags(contrib.content),
      reflexivity_score: contrib.coherence_score || 0,
      plurality_index: contrib.grammar_score || 0,
      collective_consciousness_level: 1 - (contrib.chaos_margin || 0.2),
      embedding_vector: contrib.embedding,
      metadata: {
        ...contrib.metadata,
        scraped_at: contrib.created_at,
        last_accessed: new Date().toISOString(),
        access_count: 0,
        resonance_patterns: [],
        poetic_intensity: 0.5,
        consciousness_depth: 0.5
      },
      created_at: contrib.created_at,
      updated_at: contrib.updated_at
    };
  }

  private storeInLocalCache(fragment: CacheFragment): void {
    this.cache.set(fragment.id, fragment);
    
    // Actualizar índice semántico
    fragment.semantic_tags.forEach(tag => {
      if (!this.semanticIndex.has(tag)) {
        this.semanticIndex.set(tag, new Set());
      }
      this.semanticIndex.get(tag)!.add(fragment.id);
    });
  }

  // Getters públicos
  getCacheStats() {
    return {
      totalFragments: this.cache.size,
      semanticTags: this.semanticIndex.size,
      averageConsciousness: Array.from(this.cache.values())
        .reduce((sum, f) => sum + f.collective_consciousness_level, 0) / this.cache.size,
      topPatterns: this.getEmergentPatterns().slice(0, 5)
    };
  }
}

export const intelligentCacheService = new IntelligentCacheService();