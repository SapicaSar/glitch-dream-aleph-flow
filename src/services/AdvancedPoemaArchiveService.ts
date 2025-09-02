// SERVICIO AVANZADO DE ARCHIVO LA POEMA
// Acceso dinámico y completo a todo el contenido de lapoema.tumblr.com

interface PoemaPost {
  id: string;
  url: string;
  content: string;
  timestamp: number;
  tags: string[];
  type: 'text' | 'photo' | 'quote' | 'link' | 'chat' | 'video' | 'audio';
  semanticVector: number[];
  associatedConcepts: string[];
  emotionalResonance: number;
  poeticIntensity: number;
}

interface ArchiveStats {
  totalPosts: number;
  postsIndexed: number;
  lastUpdate: number;
  conceptualClusters: number;
  semanticDensity: number;
}

interface SemanticCluster {
  id: string;
  centroid: number[];
  posts: string[];
  dominantConcepts: string[];
  averageIntensity: number;
}

class AdvancedPoemaArchiveService {
  private posts: Map<string, PoemaPost> = new Map();
  private semanticIndex: Map<string, Set<string>> = new Map(); // concept -> post IDs
  private temporalIndex: Map<string, string[]> = new Map(); // date -> post IDs
  private conceptualGraph: Map<string, Map<string, number>> = new Map(); // concept relationships
  private semanticClusters: Map<string, SemanticCluster> = new Map();
  private archiveStats: ArchiveStats;
  
  private readonly TUMBLR_BASE = 'https://lapoema.tumblr.com';
  private readonly PROXY_BASE = 'https://api.allorigins.win/get?url=';
  private readonly SEMANTIC_DIMENSIONS = 256;
  private readonly MAX_CONCURRENT_REQUESTS = 3;
  
  constructor() {
    this.archiveStats = {
      totalPosts: 0,
      postsIndexed: 0,
      lastUpdate: 0,
      conceptualClusters: 0,
      semanticDensity: 0
    };
    
    this.initializeArchiveExploration();
  }

  private async initializeArchiveExploration() {
    console.log('🌊 Inicializando exploración completa del archivo La Poema...');
    
    // Iniciar indexación progresiva
    setTimeout(() => this.startProgressiveIndexing(), 2000);
    
    // Actualización conceptual periódica
    setInterval(() => this.updateConceptualGraph(), 30000);
    
    // Clustering semántico periódico
    setInterval(() => this.performSemanticClustering(), 60000);
  }

  private async startProgressiveIndexing() {
    console.log('📚 Iniciando indexación progresiva del archivo...');
    
    // Explorar el archivo de forma inteligente
    let currentPage = 1;
    let maxPages = 200; // Estimación inicial, se ajustará dinámicamente
    let consecutiveFailures = 0;
    
    const indexingPromises: Promise<void>[] = [];
    
    while (currentPage <= maxPages && consecutiveFailures < 5) {
      const batchPromises: Promise<void>[] = [];
      
      // Procesar en lotes de páginas concurrentes
      for (let i = 0; i < this.MAX_CONCURRENT_REQUESTS && currentPage <= maxPages; i++) {
        const pagePromise = this.indexArchivePage(currentPage)
          .then(success => {
            if (success) {
              consecutiveFailures = 0;
              console.log(`📄 Página ${currentPage} indexada exitosamente`);
            } else {
              consecutiveFailures++;
            }
          })
          .catch(error => {
            console.warn(`⚠️ Error indexando página ${currentPage}:`, error);
            consecutiveFailures++;
          });
        
        batchPromises.push(pagePromise);
        currentPage++;
      }
      
      // Esperar a que termine el lote actual
      await Promise.allSettled(batchPromises);
      
      // Pausa adaptativa entre lotes
      await new Promise(resolve => setTimeout(resolve, 1000 + (consecutiveFailures * 500)));
      
      // Actualizar estadísticas
      this.updateArchiveStats();
    }
    
    console.log(`✅ Indexación inicial completada. ${this.posts.size} posts procesados.`);
    this.performInitialClustering();
  }

  private async indexArchivePage(page: number): Promise<boolean> {
    try {
      const archiveUrl = `${this.TUMBLR_BASE}/page/${page}`;
      const proxyUrl = `${this.PROXY_BASE}${encodeURIComponent(archiveUrl)}`;
      
      const response = await fetch(proxyUrl);
      if (!response.ok) return false;
      
      const data = await response.json();
      const html = data.contents;
      
      if (!html || html.includes('There\'s nothing here.')) {
        return false; // Página vacía, hemos llegado al final
      }
      
      // Extraer posts de la página
      const posts = this.extractPostsFromHTML(html, page);
      
      // Procesar cada post
      for (const post of posts) {
        await this.processAndIndexPost(post);
      }
      
      return posts.length > 0;
    } catch (error) {
      console.warn(`Error procesando página ${page}:`, error);
      return false;
    }
  }

  private extractPostsFromHTML(html: string, page: number): Partial<PoemaPost>[] {
    const posts: Partial<PoemaPost>[] = [];
    
    try {
      // Crear un parser temporal
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      // Buscar elementos de posts (adaptarse al formato específico de Tumblr)
      const postElements = doc.querySelectorAll('article, .post, [class*="post"]');
      
      postElements.forEach((element, index) => {
        try {
          const postContent = this.extractPostContent(element);
          if (postContent.content && postContent.content.length > 10) {
            posts.push({
              id: `page${page}_post${index}`,
              url: `${this.TUMBLR_BASE}/page/${page}#${index}`,
              ...postContent,
              timestamp: Date.now() - (page * 24 * 60 * 60 * 1000) // Aproximación temporal
            });
          }
        } catch (error) {
          console.warn('Error extrayendo post individual:', error);
        }
      });
      
      // Fallback: extraer texto general si no se encuentran posts estructurados
      if (posts.length === 0) {
        const textContent = doc.body?.textContent || '';
        const paragraphs = textContent.match(/[^.!?]+[.!?]+/g) || [];
        
        paragraphs.forEach((paragraph, index) => {
          if (paragraph.length > 20 && this.isPoetic(paragraph)) {
            posts.push({
              id: `page${page}_text${index}`,
              url: `${this.TUMBLR_BASE}/page/${page}#text${index}`,
              content: paragraph.trim(),
              type: 'text',
              timestamp: Date.now() - (page * 24 * 60 * 60 * 1000)
            });
          }
        });
      }
      
    } catch (error) {
      console.warn('Error parsing HTML:', error);
    }
    
    return posts;
  }

  private extractPostContent(element: Element): Partial<PoemaPost> {
    const content = element.textContent?.trim() || '';
    const tags = this.extractTags(element);
    const type = this.determinePostType(element, content);
    
    return {
      content,
      tags,
      type,
      emotionalResonance: this.calculateEmotionalResonance(content),
      poeticIntensity: this.calculatePoeticIntensity(content)
    };
  }

  private extractTags(element: Element): string[] {
    const tags: string[] = [];
    
    // Buscar elementos de tags comunes en Tumblr
    const tagElements = element.querySelectorAll('.tags a, .post-tags a, [class*="tag"]');
    tagElements.forEach(tagEl => {
      const tag = tagEl.textContent?.trim().replace('#', '');
      if (tag && tag.length > 1) {
        tags.push(tag.toLowerCase());
      }
    });
    
    return tags;
  }

  private determinePostType(element: Element, content: string): PoemaPost['type'] {
    if (element.querySelector('img')) return 'photo';
    if (element.querySelector('blockquote') || content.includes('"')) return 'quote';
    if (element.querySelector('audio, [class*="audio"]')) return 'audio';
    if (element.querySelector('video')) return 'video';
    if (element.querySelector('a[href^="http"]')) return 'link';
    
    return 'text';
  }

  private isPoetic(text: string): boolean {
    const poeticIndicators = [
      /\b(alma|corazón|verso|poeta|palabra|silencio|tiempo|espacio|ser|estar)\b/gi,
      /[.]{3,}|—|–/g, // Puntuación poética
      /\n.*\n/g, // Estructura de verso
    ];
    
    return poeticIndicators.some(pattern => pattern.test(text)) && text.length > 20;
  }

  private calculateEmotionalResonance(content: string): number {
    const emotionalWords = {
      high: ['amor', 'dolor', 'alma', 'corazón', 'muerte', 'vida', 'pasión', 'tristeza', 'alegría'],
      medium: ['sentir', 'pensar', 'recordar', 'soñar', 'esperar', 'temer', 'desear'],
      low: ['ver', 'decir', 'hacer', 'tiempo', 'lugar', 'cosa']
    };
    
    const words = content.toLowerCase().split(/\s+/);
    let score = 0;
    
    words.forEach(word => {
      if (emotionalWords.high.some(ew => word.includes(ew))) score += 0.8;
      else if (emotionalWords.medium.some(ew => word.includes(ew))) score += 0.5;
      else if (emotionalWords.low.some(ew => word.includes(ew))) score += 0.2;
    });
    
    return Math.min(score / words.length, 1);
  }

  private calculatePoeticIntensity(content: string): number {
    let intensity = 0;
    
    // Métricas poéticas
    const lines = content.split('\n').filter(line => line.trim());
    const avgLineLength = lines.reduce((sum, line) => sum + line.length, 0) / (lines.length || 1);
    
    // Ritmo y estructura
    if (avgLineLength < 50 && lines.length > 2) intensity += 0.3;
    
    // Aliteración y sonoridad
    const alliterationPattern = /\b(\w)\w*\s+\1\w*/gi;
    if (alliterationPattern.test(content)) intensity += 0.2;
    
    // Metáforas y figuras
    const metaphorPatterns = [
      /como\s+(un|una)\s+\w+/gi,
      /es\s+(un|una)\s+\w+\s+(de|del)\s+\w+/gi,
      /parece\s+\w+/gi
    ];
    
    metaphorPatterns.forEach(pattern => {
      if (pattern.test(content)) intensity += 0.15;
    });
    
    // Palabras abstractas/poéticas
    const poeticWords = ['infinito', 'eterno', 'vacío', 'silencio', 'eco', 'susurro', 'umbral', 'destino'];
    const wordsFound = poeticWords.filter(word => content.toLowerCase().includes(word));
    intensity += (wordsFound.length * 0.1);
    
    return Math.min(intensity, 1);
  }

  private async processAndIndexPost(postData: Partial<PoemaPost>) {
    if (!postData.content || !postData.id) return;
    
    // Generar vector semántico
    const semanticVector = this.generateSemanticVector(postData.content);
    
    // Extraer conceptos
    const concepts = this.extractConcepts(postData.content);
    
    // Crear post completo
    const post: PoemaPost = {
      id: postData.id,
      url: postData.url || '',
      content: postData.content,
      timestamp: postData.timestamp || Date.now(),
      tags: postData.tags || [],
      type: postData.type || 'text',
      semanticVector,
      associatedConcepts: concepts,
      emotionalResonance: postData.emotionalResonance || 0,
      poeticIntensity: postData.poeticIntensity || 0
    };
    
    // Almacenar post
    this.posts.set(post.id, post);
    
    // Indexar semánticamente
    concepts.forEach(concept => {
      if (!this.semanticIndex.has(concept)) {
        this.semanticIndex.set(concept, new Set());
      }
      this.semanticIndex.get(concept)!.add(post.id);
    });
    
    // Indexar temporalmente
    const dateKey = new Date(post.timestamp).toISOString().split('T')[0];
    if (!this.temporalIndex.has(dateKey)) {
      this.temporalIndex.set(dateKey, []);
    }
    this.temporalIndex.get(dateKey)!.push(post.id);
    
    // Actualizar grafo conceptual
    this.updateConceptualRelationships(concepts);
  }

  private generateSemanticVector(text: string): number[] {
    // Vector semántico basado en características del texto
    const words = text.toLowerCase().split(/\s+/);
    const vector = new Array(this.SEMANTIC_DIMENSIONS).fill(0);
    
    // Características básicas
    vector[0] = text.length / 1000; // Longitud normalizada
    vector[1] = words.length / 100; // Número de palabras normalizado
    vector[2] = (text.match(/[.!?]/g) || []).length / 10; // Puntuación
    
    // Características semánticas usando hash distribuido
    words.forEach((word, index) => {
      if (word.length > 3) {
        const hash = this.stringHash(word);
        const targetIndex = 3 + (hash % (this.SEMANTIC_DIMENSIONS - 10));
        vector[targetIndex] += 1 / (index + 1); // Peso decreciente por posición
      }
    });
    
    // Normalizar vector
    const magnitude = Math.sqrt(vector.reduce((sum, val) => sum + val ** 2, 0));
    return vector.map(val => val / (magnitude || 1));
  }

  private stringHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  private extractConcepts(text: string): string[] {
    const concepts = new Set<string>();
    
    // Conceptos explícitos (sustantivos importantes)
    const explicitConcepts = text.match(/\b[A-ZÁÉÍÓÚÑ][a-záéíóúñ]{3,}\b/g) || [];
    explicitConcepts.forEach(concept => {
      if (concept.length > 3) {
        concepts.add(concept.toLowerCase());
      }
    });
    
    // Patrones conceptuales específicos
    const conceptPatterns = {
      'temporal': /\b(tiempo|momento|instante|eternidad|presente|pasado|futuro|ahora|entonces|cuando)\b/gi,
      'espacial': /\b(lugar|espacio|aquí|allí|donde|cerca|lejos|dentro|fuera|entre)\b/gi,
      'emocional': /\b(amor|dolor|alegría|tristeza|miedo|esperanza|angustia|paz|calma)\b/gi,
      'existencial': /\b(ser|estar|existir|vida|muerte|alma|espíritu|destino|razón)\b/gi,
      'poético': /\b(verso|rima|palabra|silencio|voz|eco|susurro|canto|poema|poeta)\b/gi,
      'sensorial': /\b(ver|oír|sentir|tocar|olor|sabor|color|sonido|luz|sombra)\b/gi
    };
    
    Object.entries(conceptPatterns).forEach(([category, pattern]) => {
      const matches = text.match(pattern);
      if (matches && matches.length > 0) {
        concepts.add(category);
        matches.forEach(match => concepts.add(match.toLowerCase()));
      }
    });
    
    return Array.from(concepts);
  }

  private updateConceptualRelationships(concepts: string[]) {
    // Actualizar relaciones entre conceptos basadas en co-ocurrencia
    for (let i = 0; i < concepts.length; i++) {
      for (let j = i + 1; j < concepts.length; j++) {
        const concept1 = concepts[i];
        const concept2 = concepts[j];
        
        if (!this.conceptualGraph.has(concept1)) {
          this.conceptualGraph.set(concept1, new Map());
        }
        if (!this.conceptualGraph.has(concept2)) {
          this.conceptualGraph.set(concept2, new Map());
        }
        
        const relations1 = this.conceptualGraph.get(concept1)!;
        const relations2 = this.conceptualGraph.get(concept2)!;
        
        relations1.set(concept2, (relations1.get(concept2) || 0) + 1);
        relations2.set(concept1, (relations2.get(concept1) || 0) + 1);
      }
    }
  }

  private updateConceptualGraph() {
    // Limpiar relaciones débiles y fortalecer las significativas
    this.conceptualGraph.forEach((relations, concept) => {
      const totalRelations = Array.from(relations.values()).reduce((sum, count) => sum + count, 0);
      
      relations.forEach((count, relatedConcept) => {
        const strength = count / totalRelations;
        if (strength < 0.1) {
          relations.delete(relatedConcept); // Eliminar relaciones débiles
        }
      });
    });
  }

  private async performSemanticClustering() {
    if (this.posts.size < 10) return; // Necesitamos suficientes posts
    
    console.log('🧠 Realizando clustering semántico...');
    
    const vectors = Array.from(this.posts.values()).map(post => ({
      id: post.id,
      vector: post.semanticVector,
      concepts: post.associatedConcepts
    }));
    
    // K-means simplificado
    const k = Math.min(10, Math.floor(Math.sqrt(vectors.length)));
    const clusters = this.performKMeans(vectors, k);
    
    // Actualizar clusters
    this.semanticClusters.clear();
    clusters.forEach((cluster, index) => {
      const dominantConcepts = this.findDominantConcepts(cluster.points);
      const avgIntensity = cluster.points.reduce((sum, point) => {
        const post = this.posts.get(point.id);
        return sum + (post?.poeticIntensity || 0);
      }, 0) / cluster.points.length;
      
      this.semanticClusters.set(`cluster_${index}`, {
        id: `cluster_${index}`,
        centroid: cluster.centroid,
        posts: cluster.points.map(p => p.id),
        dominantConcepts,
        averageIntensity: avgIntensity
      });
    });
    
    this.archiveStats.conceptualClusters = this.semanticClusters.size;
    console.log(`✅ ${this.semanticClusters.size} clusters semánticos actualizados`);
  }

  private performKMeans(vectors: Array<{id: string, vector: number[], concepts: string[]}>, k: number) {
    // Inicializar centroides aleatoriamente
    let centroids = Array.from({length: k}, () => 
      Array.from({length: this.SEMANTIC_DIMENSIONS}, () => Math.random())
    );
    
    let clusters: Array<{centroid: number[], points: Array<{id: string, vector: number[], concepts: string[]}>}> = [];
    let iterations = 0;
    const maxIterations = 10;
    
    while (iterations < maxIterations) {
      // Asignar puntos a clusters
      clusters = centroids.map(centroid => ({centroid, points: []}));
      
      vectors.forEach(vector => {
        let minDistance = Infinity;
        let assignedCluster = 0;
        
        centroids.forEach((centroid, index) => {
          const distance = this.calculateEuclideanDistance(vector.vector, centroid);
          if (distance < minDistance) {
            minDistance = distance;
            assignedCluster = index;
          }
        });
        
        clusters[assignedCluster].points.push(vector);
      });
      
      // Actualizar centroides
      centroids = clusters.map(cluster => {
        if (cluster.points.length === 0) return cluster.centroid;
        
        const newCentroid = new Array(this.SEMANTIC_DIMENSIONS).fill(0);
        cluster.points.forEach(point => {
          point.vector.forEach((val, i) => {
            newCentroid[i] += val;
          });
        });
        
        return newCentroid.map(val => val / cluster.points.length);
      });
      
      iterations++;
    }
    
    return clusters;
  }

  private calculateEuclideanDistance(vector1: number[], vector2: number[]): number {
    return Math.sqrt(
      vector1.reduce((sum, val, i) => sum + Math.pow(val - vector2[i], 2), 0)
    );
  }

  private findDominantConcepts(points: Array<{id: string, concepts: string[]}>): string[] {
    const conceptCounts = new Map<string, number>();
    
    points.forEach(point => {
      point.concepts.forEach(concept => {
        conceptCounts.set(concept, (conceptCounts.get(concept) || 0) + 1);
      });
    });
    
    return Array.from(conceptCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([concept]) => concept);
  }

  private performInitialClustering() {
    console.log('🔄 Realizando clustering inicial...');
    this.performSemanticClustering();
  }

  private updateArchiveStats() {
    this.archiveStats = {
      totalPosts: this.posts.size,
      postsIndexed: this.posts.size,
      lastUpdate: Date.now(),
      conceptualClusters: this.semanticClusters.size,
      semanticDensity: this.semanticIndex.size / (this.posts.size || 1)
    };
  }

  // API pública para consultas inteligentes
  public async findRelevantPosts(query: string, context?: string[]): Promise<PoemaPost[]> {
    const queryVector = this.generateSemanticVector(query);
    const queryConcepts = this.extractConcepts(query);
    
    // Buscar posts por similitud semántica y conceptual
    const scoredPosts: Array<{post: PoemaPost, score: number}> = [];
    
    this.posts.forEach(post => {
      let score = 0;
      
      // Similitud vectorial
      const vectorSimilarity = this.calculateCosineSimilarity(queryVector, post.semanticVector);
      score += vectorSimilarity * 0.4;
      
      // Similitud conceptual
      const conceptOverlap = queryConcepts.filter(concept => 
        post.associatedConcepts.includes(concept)
      ).length;
      const conceptSimilarity = conceptOverlap / Math.max(queryConcepts.length, 1);
      score += conceptSimilarity * 0.4;
      
      // Bonus por intensidad poética si la query es creativa
      if (queryConcepts.some(c => ['poético', 'verso', 'palabra'].includes(c))) {
        score += post.poeticIntensity * 0.2;
      }
      
      if (score > 0.1) {
        scoredPosts.push({post, score});
      }
    });
    
    return scoredPosts
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(item => item.post);
  }

  private calculateCosineSimilarity(vector1: number[], vector2: number[]): number {
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

  public getConceptualContext(concepts: string[]): Map<string, number> {
    const contextMap = new Map<string, number>();
    
    concepts.forEach(concept => {
      const relations = this.conceptualGraph.get(concept);
      if (relations) {
        relations.forEach((strength, relatedConcept) => {
          contextMap.set(relatedConcept, (contextMap.get(relatedConcept) || 0) + strength);
        });
      }
    });
    
    return contextMap;
  }

  public getArchiveStats(): ArchiveStats {
    return { ...this.archiveStats };
  }

  public getRandomPost(): PoemaPost | null {
    const posts = Array.from(this.posts.values());
    return posts.length > 0 ? posts[Math.floor(Math.random() * posts.length)] : null;
  }

  public async getPostsByIntensity(minIntensity: number = 0.5): Promise<PoemaPost[]> {
    return Array.from(this.posts.values())
      .filter(post => post.poeticIntensity >= minIntensity)
      .sort((a, b) => b.poeticIntensity - a.poeticIntensity)
      .slice(0, 10);
  }
}

export const advancedPoemaArchiveService = new AdvancedPoemaArchiveService();