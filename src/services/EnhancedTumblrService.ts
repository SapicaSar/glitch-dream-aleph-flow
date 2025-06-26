
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
}

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

    // Procesar con ML local
    const processedFragments = await this.processWithLocalML(allFragments);
    
    // Actualizar estado metaconsciente
    this.updateMetaConsciousState(processedFragments);
    
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

  private async processWithLocalML(fragments: ScrapedFragment[]): Promise<ScrapedFragment[]> {
    // Generar embeddings locales simples
    for (const fragment of fragments) {
      fragment.embeddings = this.generateSimpleEmbeddings(fragment.content);
      fragment.cluster = this.assignCluster(fragment.embeddings);
    }
    
    return fragments;
  }

  private generateSimpleEmbeddings(text: string): number[] {
    const words = text.toLowerCase().split(/\s+/);
    const embedding = new Array(50).fill(0);
    
    words.forEach((word, index) => {
      const hash = word.split('').reduce((acc, char) => 
        acc + char.charCodeAt(0), 0
      );
      embedding[hash % 50] += 1 / (index + 1);
    });
    
    // Normalizar
    const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
    return embedding.map(val => magnitude > 0 ? val / magnitude : 0);
  }

  private assignCluster(embeddings: number[]): number {
    // Clustering simple basado en centroides
    const clusters = [
      'existencial', 'corporal', 'temporal', 'espacial', 'elemental'
    ];
    
    let bestCluster = 0;
    let maxSimilarity = 0;
    
    clusters.forEach((cluster, index) => {
      const clusterHash = cluster.split('').reduce((acc, char) => 
        acc + char.charCodeAt(0), 0
      );
      const similarity = embeddings[clusterHash % 50];
      
      if (similarity > maxSimilarity) {
        maxSimilarity = similarity;
        bestCluster = index;
      }
    });
    
    return bestCluster;
  }

  private updateMetaConsciousState(fragments: ScrapedFragment[]): void {
    this.metaState.totalFragments += fragments.length;
    this.metaState.uniqueFragments = this.fragmentCache.size;
    this.metaState.semanticClusters = new Set(
      Array.from(this.fragmentCache.values()).map(f => f.cluster)
    ).size;
    this.metaState.avgPoeticScore = 
      Array.from(this.fragmentCache.values())
        .reduce((sum, f) => sum + f.poeticScore, 0) / this.fragmentCache.size;
  }

  getRandomFragment(): ScrapedFragment | null {
    const fragments = Array.from(this.fragmentCache.values());
    if (fragments.length === 0) return null;
    
    // Preferir fragmentos con alta puntuación poética y uniqueness
    const weightedFragments = fragments.filter(f => 
      f.poeticScore > 0.3 && f.uniqueness > 0.5
    );
    
    const pool = weightedFragments.length > 0 ? weightedFragments : fragments;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  getMetaConsciousState(): MetaConsciousState {
    return { ...this.metaState };
  }

  getFragmentsByCluster(cluster: number): ScrapedFragment[] {
    return Array.from(this.fragmentCache.values())
      .filter(f => f.cluster === cluster);
  }

  getTotalUniqueFragments(): number {
    return this.fragmentCache.size;
  }

  getSemanticSimilarity(text1: string, text2: string): number {
    const emb1 = this.generateSimpleEmbeddings(text1);
    const emb2 = this.generateSimpleEmbeddings(text2);
    
    let dotProduct = 0;
    for (let i = 0; i < emb1.length; i++) {
      dotProduct += emb1[i] * emb2[i];
    }
    
    return dotProduct;
  }
}

export const enhancedTumblrService = new EnhancedTumblrService();
