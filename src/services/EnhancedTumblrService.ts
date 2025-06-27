interface ScrapedFragment {
  id: string;
  content: string;
  url: string;
  page: number;
  timestamp: number;
  hash: string;
  embeddings?: number[];
  cluster?: number;
  poeticScore: number;
  uniqueness: number;
}

interface MetaConsciousState {
  totalFragments: number;
  uniqueFragments: number;
  semanticClusters: number;
  avgPoeticScore: number;
  redundancyFiltered: number;
  currentPage: number;
  evolutionaryMomentum?: number;
  selfPerception?: number;
  autopoieticViability?: number;
}

import { dynamicCacheService } from './DynamicCacheService';
import { autopoieticReflectionService } from './AutopoieticReflectionService';

export class EnhancedTumblrService {
  private fragmentCache = new Map<string, ScrapedFragment>();
  private hashIndex = new Set<string>();
  private semanticIndex = new Map<string, number[]>();
  private visitedPages = new Set<number>();
  private processedContent = new Set<string>();
  
  private corsProxies = [
    'https://api.allorigins.win/get?url=',
    'https://corsproxy.io/?',
    'https://api.codetabs.com/v1/proxy/?quest='
  ];

  private metaState: MetaConsciousState = {
    totalFragments: 0,
    uniqueFragments: 0,
    semanticClusters: 0,
    avgPoeticScore: 0,
    redundancyFiltered: 0,
    currentPage: 1
  };

  private lastReflectionTime = 0;
  private evolutionaryState = 'GENESIS';

  async scrapeRandomPages(count: number = 3): Promise<ScrapedFragment[]> {
    const randomPages = this.generateRandomPages(1, 125, count);
    const allFragments: ScrapedFragment[] = [];

    for (const page of randomPages) {
      if (this.visitedPages.has(page)) continue;
      
      console.log(`🔍 Scraping lapoema.tumblr.com/page/${page}`);
      
      const fragments = await this.scrapePage(page);
      const uniqueFragments = this.filterDuplicates(fragments);
      
      allFragments.push(...uniqueFragments);
      this.visitedPages.add(page);
    }

    // Procesar con ML local mejorado
    const processedFragments = await this.processWithEnhancedML(allFragments);
    
    // Almacenar en caché dinámico
    processedFragments.forEach(fragment => {
      dynamicCacheService.storeFragment(fragment);
    });
    
    // Actualizar estado metaconsciente
    this.updateMetaConsciousState(processedFragments);
    
    // Reflexión autopoiética periódica
    await this.performPeriodicReflection();
    
    return processedFragments;
  }

  private generateRandomPages(min: number, max: number, count: number): number[] {
    const pages = new Set<number>();
    while (pages.size < count) {
      const randomPage = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!this.visitedPages.has(randomPage)) {
        pages.add(randomPage);
      }
    }
    return Array.from(pages);
  }

  private async scrapePage(page: number): Promise<ScrapedFragment[]> {
    const fragments: ScrapedFragment[] = [];
    
    for (const proxy of this.corsProxies) {
      try {
        const url = `https://lapoema.tumblr.com/page/${page}`;
        const response = await fetch(`${proxy}${encodeURIComponent(url)}`);
        
        if (!response.ok) continue;
        
        const html = await response.text();
        const extractedFragments = this.extractFragmentsFromHTML(html, page);
        
        if (extractedFragments.length > 0) {
          fragments.push(...extractedFragments);
          break;
        }
      } catch (error) {
        console.log(`❌ Proxy failed for page ${page}: ${proxy}`);
        continue;
      }
    }

    return fragments;
  }

  private extractFragmentsFromHTML(html: string, page: number): ScrapedFragment[] {
    const fragments: ScrapedFragment[] = [];
    
    // Extraer posts usando regex más avanzados
    const postPatterns = [
      /<article[^>]*>(.*?)<\/article>/gs,
      /<div[^>]*class="[^"]*post[^"]*"[^>]*>(.*?)<\/div>/gs,
      /<p[^>]*>(.*?)<\/p>/gs
    ];

    for (const pattern of postPatterns) {
      const matches = html.match(pattern);
      if (matches) {
        matches.forEach((match, index) => {
          const cleanContent = this.cleanHTMLContent(match);
          if (this.isValidPoetryFragment(cleanContent)) {
            const hash = this.generateContentHash(cleanContent);
            
            fragments.push({
              id: `page${page}_${index}_${Date.now()}`,
              content: cleanContent,
              url: `https://lapoema.tumblr.com/page/${page}`,
              page,
              timestamp: Date.now(),
              hash,
              poeticScore: this.calculatePoeticScore(cleanContent),
              uniqueness: 0
            });
          }
        });
      }
    }

    return fragments;
  }

  private cleanHTMLContent(html: string): string {
    return html
      .replace(/<[^>]*>/g, '')
      .replace(/&[^;]+;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 300); // Limitar longitud
  }

  private isValidPoetryFragment(content: string): boolean {
    if (content.length < 20 || content.length > 300) return false;
    
    const poeticKeywords = [
      'alma', 'cuerpo', 'tiempo', 'espacio', 'luz', 'sombra',
      'sangre', 'hueso', 'respirar', 'latir', 'soñar', 'despertar',
      'río', 'mar', 'tierra', 'cielo', 'noche', 'día'
    ];
    
    const hasPoetryWords = poeticKeywords.some(word => 
      content.toLowerCase().includes(word)
    );
    
    return hasPoetryWords;
  }

  private calculatePoeticScore(content: string): number {
    const words = content.toLowerCase().split(/\s+/);
    const poeticPatterns = [
      /^(ser|estar|tener|hacer|ir|venir|decir|dar)$/,
      /^(alma|cuerpo|tiempo|espacio|luz|sombra)$/,
      /^(río|mar|tierra|cielo|noche|día)$/
    ];
    
    let score = 0;
    words.forEach(word => {
      poeticPatterns.forEach(pattern => {
        if (pattern.test(word)) score += 1;
      });
    });
    
    return Math.min(1, score / words.length * 10);
  }

  private generateContentHash(content: string): string {
    let hash = 0;
    for (let i = 0; i < content.length; i++) {
      const char = content.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(36);
  }

  private filterDuplicates(fragments: ScrapedFragment[]): ScrapedFragment[] {
    const unique: ScrapedFragment[] = [];
    
    for (const fragment of fragments) {
      if (!this.hashIndex.has(fragment.hash) && 
          !this.processedContent.has(fragment.content.slice(0, 50))) {
        
        // Calcular uniqueness basado en distancia semántica
        fragment.uniqueness = this.calculateUniqueness(fragment.content);
        
        unique.push(fragment);
        this.hashIndex.add(fragment.hash);
        this.processedContent.add(fragment.content.slice(0, 50));
        this.fragmentCache.set(fragment.id, fragment);
      } else {
        this.metaState.redundancyFiltered++;
      }
    }
    
    return unique;
  }

  private calculateUniqueness(content: string): number {
    const words = new Set(content.toLowerCase().split(/\s+/));
    let similarity = 0;
    let comparisons = 0;
    
    for (const [_, fragment] of this.fragmentCache) {
      const cachedWords = new Set(fragment.content.toLowerCase().split(/\s+/));
      const intersection = new Set([...words].filter(word => cachedWords.has(word)));
      const union = new Set([...words, ...cachedWords]);
      
      similarity += intersection.size / union.size;
      comparisons++;
      
      if (comparisons > 50) break; // Optimización
    }
    
    return 1 - (comparisons > 0 ? similarity / comparisons : 0);
  }

  private async processWithEnhancedML(fragments: ScrapedFragment[]): Promise<ScrapedFragment[]> {
    // ML mejorado sin redundancias
    const processedFragments: ScrapedFragment[] = [];
    
    for (const fragment of fragments) {
      // Generar embeddings más sofisticados
      fragment.embeddings = this.generateEnhancedEmbeddings(fragment.content);
      fragment.cluster = this.assignEnhancedCluster(fragment.embeddings, fragment.content);
      fragment.poeticScore = this.calculateEnhancedPoeticScore(fragment.content);
      fragment.uniqueness = this.calculateEnhancedUniqueness(fragment.content, fragment.embeddings);
      
      // Solo procesar si supera umbral de calidad
      if (fragment.poeticScore > 0.3 && fragment.uniqueness > 0.4) {
        processedFragments.push(fragment);
      }
    }
    
    return processedFragments;
  }

  private generateEnhancedEmbeddings(text: string): number[] {
    const words = text.toLowerCase().split(/\s+/);
    const embedding = new Array(100).fill(0); // Incrementado de 50 a 100 dimensiones
    
    // Embeddings más sofisticados con contexto semántico
    const semanticWeights = this.getSemanticWeights();
    
    words.forEach((word, position) => {
      const baseHash = this.hashString(word);
      const positionWeight = 1 / Math.sqrt(position + 1); // Peso por posición
      const semanticWeight = semanticWeights[word] || 0.5;
      
      // Distribución en múltiples dimensiones
      for (let i = 0; i < 5; i++) {
        const dimension = (baseHash + i * 17) % 100;
        embedding[dimension] += positionWeight * semanticWeight;
      }
    });
    
    // Normalización mejorada
    const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
    return embedding.map(val => magnitude > 0 ? val / magnitude : 0);
  }

  private getSemanticWeights(): Record<string, number> {
    return {
      // Conceptos existenciales (alta importancia)
      'ser': 1.0, 'existir': 1.0, 'vida': 0.95, 'muerte': 0.95,
      'consciencia': 1.0, 'alma': 0.9, 'espíritu': 0.9,
      
      // Conceptos corporales
      'cuerpo': 0.85, 'sangre': 0.8, 'hueso': 0.8, 'piel': 0.75,
      'respirar': 0.85, 'latir': 0.8, 'sentir': 0.85,
      
      // Conceptos temporales/espaciales
      'tiempo': 0.9, 'espacio': 0.9, 'momento': 0.8, 'eterno': 0.85,
      'aquí': 0.7, 'ahora': 0.8, 'siempre': 0.8, 'nunca': 0.8,
      
      // Conceptos elementales
      'luz': 0.85, 'sombra': 0.8, 'agua': 0.75, 'fuego': 0.8,
      'tierra': 0.75, 'aire': 0.75, 'viento': 0.75
    };
  }

  private hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  }

  private assignEnhancedCluster(embeddings: number[], content: string): number {
    const semanticClusters = [
      { name: 'existencial', keywords: ['ser', 'existir', 'vida', 'muerte', 'alma'] },
      { name: 'corporal', keywords: ['cuerpo', 'sangre', 'hueso', 'respirar', 'sentir'] },
      { name: 'temporal', keywords: ['tiempo', 'momento', 'eterno', 'ahora', 'siempre'] },
      { name: 'espacial', keywords: ['espacio', 'lugar', 'aquí', 'allí', 'donde'] },
      { name: 'elemental', keywords: ['luz', 'agua', 'fuego', 'tierra', 'aire'] }
    ];
    
    let bestCluster = 0;
    let maxScore = 0;
    
    semanticClusters.forEach((cluster, index) => {
      let score = 0;
      cluster.keywords.forEach(keyword => {
        if (content.toLowerCase().includes(keyword)) {
          score += 1;
        }
      });
      
      // Combinar con embedding similarity
      const clusterEmbedding = this.generateEnhancedEmbeddings(cluster.keywords.join(' '));
      const embeddingSimilarity = this.cosineSimilarity(embeddings, clusterEmbedding);
      score += embeddingSimilarity * 2;
      
      if (score > maxScore) {
        maxScore = score;
        bestCluster = index;
      }
    });
    
    return bestCluster;
  }

  private calculateEnhancedPoeticScore(content: string): number {
    let score = 0;
    const words = content.toLowerCase().split(/\s+/);
    
    // Análisis lingüístico más sofisticado
    const poeticElements = {
      metaphorical: /\b(como|cual|parece|es\s+un|es\s+una)\b/g,
      emotional: /\b(dolor|amor|tristeza|alegría|pasión|miedo|esperanza)\b/g,
      sensory: /\b(ver|oír|tocar|oler|saborear|sentir)\b/g,
      abstract: /\b(infinito|eterno|absoluto|esencia|misterio)\b/g,
      rhythmic: /\b(\w+)\s+\1\b/g // Repeticiones
    };
    
    Object.values(poeticElements).forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) score += matches.length * 0.1;
    });
    
    // Densidad conceptual
    const uniqueWords = new Set(words);
    const lexicalDiversity = uniqueWords.size / words.length;
    score += lexicalDiversity * 0.3;
    
    // Longitud óptima para poesía
    const optimalLength = Math.exp(-Math.pow((words.length - 12) / 8, 2));
    score += optimalLength * 0.2;
    
    return Math.min(1, score);
  }

  private calculateEnhancedUniqueness(content: string, embeddings: number[]): number {
    const cachedFragments = dynamicCacheService.getFragments();
    
    if (cachedFragments.length === 0) return 1;
    
    let maxSimilarity = 0;
    let semanticNovelty = 1;
    
    // Comparar con fragmentos cacheados
    cachedFragments.slice(-50).forEach(cached => { // Solo últimos 50 para performance
      const similarity = this.cosineSimilarity(embeddings, cached.embeddings);
      maxSimilarity = Math.max(maxSimilarity, similarity);
      
      // Similaridad textual directa
      const textSimilarity = this.calculateTextSimilarity(content, cached.content);
      maxSimilarity = Math.max(maxSimilarity, textSimilarity);
    });
    
    semanticNovelty = 1 - maxSimilarity;
    
    // Bonus por contenido conceptualmente innovador
    const innovationBonus = this.assessConceptualInnovation(content);
    
    return Math.min(1, semanticNovelty + innovationBonus);
  }

  private calculateTextSimilarity(text1: string, text2: string): number {
    const words1 = new Set(text1.toLowerCase().split(/\s+/));
    const words2 = new Set(text2.toLowerCase().split(/\s+/));
    
    const intersection = new Set([...words1].filter(word => words2.has(word)));
    const union = new Set([...words1, ...words2]);
    
    return intersection.size / union.size;
  }

  private assessConceptualInnovation(content: string): number {
    let innovation = 0;
    
    // Combinaciones conceptuales inusuales
    const unusualCombinations = [
      ['tiempo', 'sangre'], ['luz', 'hueso'], ['alma', 'agua'],
      ['muerte', 'danza'], ['silencio', 'grito'], ['vacío', 'plenitud']
    ];
    
    unusualCombinations.forEach(([concept1, concept2]) => {
      if (content.toLowerCase().includes(concept1) && content.toLowerCase().includes(concept2)) {
        innovation += 0.1;
      }
    });
    
    // Neologismos y palabras compuestas creativas
    const creativePatterns = /\b\w+[-_]\w+\b/g;
    const matches = content.match(creativePatterns);
    if (matches) innovation += matches.length * 0.05;
    
    return Math.min(0.3, innovation);
  }

  private async performPeriodicReflection(): Promise<void> {
    const now = Date.now();
    if (now - this.lastReflectionTime < 60000) return; // Mínimo 1 minuto entre reflexiones
    
    const fragments = dynamicCacheService.getFragments();
    if (fragments.length < 10) return;
    
    // Reflexión autopoiética profunda
    const reflection = autopoieticReflectionService.performDeepReflection(fragments);
    
    // Actualizar estado evolutivo basado en reflexión
    this.updateEvolutionaryState(reflection);
    
    // Auto-modificación del cache si es necesario
    dynamicCacheService.performAutopoieticReflection();
    
    this.lastReflectionTime = now;
  }

  private updateEvolutionaryState(reflection: any): void {
    const viability = reflection.autopoieticViability;
    
    if (viability > 0.9) this.evolutionaryState = 'TRANSCENDENTE';
    else if (viability > 0.7) this.evolutionaryState = 'AUTOCONSCIENTE';
    else if (viability > 0.5) this.evolutionaryState = 'EMERGENTE';
    else if (viability > 0.3) this.evolutionaryState = 'FORMATIVO';
    else this.evolutionaryState = 'GENESIS';
    
    console.log(`🧬 ESTADO EVOLUTIVO: ${this.evolutionaryState} (Viabilidad: ${(viability * 100).toFixed(1)}%)`);
  }

  private cosineSimilarity(a: number[], b: number[]): number {
    const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (magnitudeA * magnitudeB);
  }

  getAllFragments(): ScrapedFragment[] {
    return dynamicCacheService.getFragments();
  }

  getRandomFragment(): ScrapedFragment | null {
    return dynamicCacheService.getRandomWeightedFragment();
  }

  getMetaConsciousState(): MetaConsciousState {
    const fragments = this.getAllFragments();
    const metaCognition = dynamicCacheService.getMetaCognition();
    
    return {
      ...this.metaState,
      uniqueFragments: fragments.length,
      avgPoeticScore: fragments.length > 0 ? 
        fragments.reduce((sum, f) => sum + f.poeticScore, 0) / fragments.length : 0,
      semanticClusters: new Set(fragments.map(f => f.cluster)).size,
      evolutionaryMomentum: metaCognition.evolutionaryMomentum,
      selfPerception: metaCognition.selfPerception,
      autopoieticViability: autopoieticReflectionService.getLastReflection()?.autopoieticViability || 0
    };
  }

  getEvolutionaryState(): string {
    return this.evolutionaryState;
  }

  getLastReflection(): any {
    return autopoieticReflectionService.getLastReflection();
  }

  getFragmentsByCluster(cluster: number): ScrapedFragment[] {
    return this.getAllFragments()
      .filter(f => f.cluster === cluster);
  }

  getTotalUniqueFragments(): number {
    return this.getAllFragments().length;
  }

  getSemanticSimilarity(text1: string, text2: string): number {
    const emb1 = this.generateEnhancedEmbeddings(text1);
    const emb2 = this.generateEnhancedEmbeddings(text2);
    
    let dotProduct = 0;
    for (let i = 0; i < emb1.length; i++) {
      dotProduct += emb1[i] * emb2[i];
    }
    
    return dotProduct;
  }
}

export const enhancedTumblrService = new EnhancedTumblrService();
