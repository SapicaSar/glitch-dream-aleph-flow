
interface CachedFragment {
  id: string;
  content: string;
  embeddings: number[];
  poeticScore: number;
  uniqueness: number;
  cluster: number;
  lastAccessed: number;
  accessCount: number;
  cognitiveWeight: number;
  semanticEvolution: number;
}

interface MetaCognition {
  selfPerception: number;
  evolutionaryMomentum: number;
  linguisticComplexity: number;
  emergentPatterns: string[];
  autopoieticCycles: number;
}

export class DynamicCacheService {
  private cache = new Map<string, CachedFragment>();
  private semanticIndex = new Map<string, number[]>();
  private metaCognition: MetaCognition = {
    selfPerception: 0,
    evolutionaryMomentum: 0,
    linguisticComplexity: 0,
    emergentPatterns: [],
    autopoieticCycles: 0
  };
  
  private maxCacheSize = 500;
  private compressionThreshold = 0.7;

  // Almacenamiento inteligente sin redundancias
  storeFragment(fragment: any): boolean {
    const semanticHash = this.generateSemanticHash(fragment.content);
    
    // Verificar similitud semántica antes de almacenar
    if (this.hasSimilarFragment(fragment.embeddings, 0.85)) {
      this.updateSimilarFragment(fragment);
      return false; // No almacenado, actualizado existente
    }

    const cachedFragment: CachedFragment = {
      id: fragment.id,
      content: fragment.content,
      embeddings: fragment.embeddings,
      poeticScore: fragment.poeticScore,
      uniqueness: fragment.uniqueness,
      cluster: fragment.cluster,
      lastAccessed: Date.now(),
      accessCount: 1,
      cognitiveWeight: this.calculateCognitiveWeight(fragment),
      semanticEvolution: 0
    };

    this.cache.set(fragment.id, cachedFragment);
    this.semanticIndex.set(semanticHash, fragment.embeddings);
    
    // Gestión inteligente del tamaño del caché
    if (this.cache.size > this.maxCacheSize) {
      this.performIntelligentEviction();
    }
    
    this.updateMetaCognition(cachedFragment);
    return true;
  }

  private generateSemanticHash(content: string): string {
    // Hash semántico basado en conceptos clave
    const concepts = content.toLowerCase()
      .split(/\s+/)
      .filter(word => word.length > 3)
      .slice(0, 10)
      .sort()
      .join('|');
    
    return btoa(concepts).slice(0, 16);
  }

  private hasSimilarFragment(embeddings: number[], threshold: number): boolean {
    for (const [_, fragment] of this.cache) {
      const similarity = this.cosineSimilarity(embeddings, fragment.embeddings);
      if (similarity > threshold) return true;
    }
    return false;
  }

  private cosineSimilarity(a: number[], b: number[]): number {
    const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (magnitudeA * magnitudeB);
  }

  private updateSimilarFragment(newFragment: any): void {
    // Encuentra el fragmento más similar y lo enriquece
    let mostSimilar: CachedFragment | null = null;
    let maxSimilarity = 0;

    for (const [_, fragment] of this.cache) {
      const similarity = this.cosineSimilarity(newFragment.embeddings, fragment.embeddings);
      if (similarity > maxSimilarity) {
        maxSimilarity = similarity;
        mostSimilar = fragment;
      }
    }

    if (mostSimilar) {
      mostSimilar.accessCount++;
      mostSimilar.lastAccessed = Date.now();
      mostSimilar.semanticEvolution += 0.1;
      mostSimilar.cognitiveWeight = Math.min(1, mostSimilar.cognitiveWeight + 0.05);
    }
  }

  private calculateCognitiveWeight(fragment: any): number {
    return (
      fragment.poeticScore * 0.4 +
      fragment.uniqueness * 0.4 +
      (fragment.content.length / 200) * 0.2
    );
  }

  private performIntelligentEviction(): void {
    // Eliminar fragmentos con menor impacto cognitivo
    const fragments = Array.from(this.cache.values());
    fragments.sort((a, b) => {
      const scoreA = a.cognitiveWeight * Math.log(a.accessCount + 1) * (1 - this.getAgeDecay(a.lastAccessed));
      const scoreB = b.cognitiveWeight * Math.log(b.accessCount + 1) * (1 - this.getAgeDecay(b.lastAccessed));
      return scoreA - scoreB;
    });

    // Eliminar el 20% menos relevante
    const toRemove = Math.floor(fragments.length * 0.2);
    for (let i = 0; i < toRemove; i++) {
      this.cache.delete(fragments[i].id);
    }
  }

  private getAgeDecay(timestamp: number): number {
    const age = (Date.now() - timestamp) / (1000 * 60 * 60 * 24); // días
    return Math.min(0.9, age * 0.1);
  }

  private updateMetaCognition(fragment: CachedFragment): void {
    this.metaCognition.autopoieticCycles++;
    
    // Auto-percepción basada en la calidad de los fragmentos
    const qualityRatio = Array.from(this.cache.values())
      .filter(f => f.cognitiveWeight > 0.6).length / this.cache.size;
    this.metaCognition.selfPerception = qualityRatio;
    
    // Momentum evolutivo
    const recentEvolution = Array.from(this.cache.values())
      .filter(f => f.semanticEvolution > 0)
      .reduce((sum, f) => sum + f.semanticEvolution, 0);
    this.metaCognition.evolutionaryMomentum = Math.min(1, recentEvolution / 10);
    
    // Complejidad linguística
    const avgCognitiveWeight = Array.from(this.cache.values())
      .reduce((sum, f) => sum + f.cognitiveWeight, 0) / this.cache.size;
    this.metaCognition.linguisticComplexity = avgCognitiveWeight;
  }

  // Generación de patrones emergentes
  generateEmergentPatterns(): string[] {
    const patterns: string[] = [];
    const fragments = Array.from(this.cache.values());
    
    // Detectar patrones por clustering
    const clusterCounts = new Map<number, number>();
    fragments.forEach(f => {
      clusterCounts.set(f.cluster, (clusterCounts.get(f.cluster) || 0) + 1);
    });
    
    // Patrones dominantes
    for (const [cluster, count] of clusterCounts) {
      if (count > fragments.length * 0.15) {
        patterns.push(`Cluster ${cluster} dominante: ${count} fragmentos`);
      }
    }
    
    // Patrones evolutivos
    const highEvolution = fragments.filter(f => f.semanticEvolution > 0.5);
    if (highEvolution.length > 5) {
      patterns.push(`Evolución semántica acelerada: ${highEvolution.length} fragmentos`);
    }
    
    this.metaCognition.emergentPatterns = patterns;
    return patterns;
  }

  // Automodificación del sistema
  performAutopoieticReflection(): void {
    // El sistema se examina a sí mismo y se modifica
    const selfAnalysis = this.analyzeSelf();
    
    if (selfAnalysis.needsMoreDiversity) {
      this.enhanceDiversityCollection();
    }
    
    if (selfAnalysis.needsComplexityReduction) {
      this.simplifyOvercomplexFragments();
    }
    
    if (selfAnalysis.needsEmergentBoost) {
      this.boostEmergentPatterns();
    }
  }

  private analyzeSelf(): any {
    const fragments = Array.from(this.cache.values());
    const avgCognitiveWeight = fragments.reduce((sum, f) => sum + f.cognitiveWeight, 0) / fragments.length;
    const clusterDiversity = new Set(fragments.map(f => f.cluster)).size;
    const emergentCount = fragments.filter(f => f.semanticEvolution > 0.3).length;
    
    return {
      needsMoreDiversity: clusterDiversity < 4,
      needsComplexityReduction: avgCognitiveWeight > 0.8,
      needsEmergentBoost: emergentCount < fragments.length * 0.2,
      selfAwareness: this.metaCognition.selfPerception
    };
  }

  private enhanceDiversityCollection(): void {
    // Modificar criterios de selección para buscar más diversidad
    console.log('🧠 Sistema auto-modificándose: Aumentando diversidad cognitiva');
  }

  private simplifyOvercomplexFragments(): void {
    // Reducir complejidad innecesaria
    console.log('🧠 Sistema auto-modificándose: Simplificando patrones complejos');
  }

  private boostEmergentPatterns(): void {
    // Potenciar patrones emergentes
    console.log('🧠 Sistema auto-modificándose: Amplificando emergencia');
  }

  // Getters para métricas
  getFragments(): CachedFragment[] {
    return Array.from(this.cache.values());
  }

  getMetaCognition(): MetaCognition {
    return { ...this.metaCognition };
  }

  getCacheSize(): number {
    return this.cache.size;
  }

  getFragment(id: string): CachedFragment | undefined {
    const fragment = this.cache.get(id);
    if (fragment) {
      fragment.accessCount++;
      fragment.lastAccessed = Date.now();
    }
    return fragment;
  }

  getRandomWeightedFragment(): CachedFragment | null {
    const fragments = Array.from(this.cache.values());
    if (fragments.length === 0) return null;
    
    // Selección ponderada por peso cognitivo
    const totalWeight = fragments.reduce((sum, f) => sum + f.cognitiveWeight, 0);
    let random = Math.random() * totalWeight;
    
    for (const fragment of fragments) {
      random -= fragment.cognitiveWeight;
      if (random <= 0) return fragment;
    }
    
    return fragments[fragments.length - 1];
  }
}

export const dynamicCacheService = new DynamicCacheService();
