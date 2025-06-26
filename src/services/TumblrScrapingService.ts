
interface ScrapedContent {
  id: string;
  content: string;
  tags: string[];
  timestamp: number;
  type: 'text' | 'quote' | 'photo';
  url?: string;
  semantic_weight: number;
}

interface ProcessedText {
  original: string;
  cleaned: string;
  tokens: string[];
  semanticVectors: number[];
  poeticIntensity: number;
  conceptualNodes: string[];
}

export class TumblrScrapingService {
  private corsProxies = [
    'https://api.allorigins.win/get?url=',
    'https://corsproxy.io/?',
    'https://api.codetabs.com/v1/proxy/?quest='
  ];
  
  private scrapedTexts: Map<string, ProcessedText> = new Map();
  private semanticNetwork: Map<string, string[]> = new Map();
  private evolutionCycles = 0;

  async scrapeLaPoema(): Promise<ScrapedContent[]> {
    const results: ScrapedContent[] = [];
    
    for (const proxy of this.corsProxies) {
      try {
        console.log(`🕷️ Intentando scrapping con proxy: ${proxy}`);
        
        const response = await fetch(`${proxy}${encodeURIComponent('https://lapoema.tumblr.com/api/read/json?num=20')}`);
        
        if (!response.ok) continue;
        
        const data = await response.text();
        const jsonData = this.extractJsonFromJSONP(data);
        
        if (jsonData?.posts) {
          for (const post of jsonData.posts) {
            const content = this.extractTextContent(post);
            if (content) {
              results.push({
                id: post.id || `scraped_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
                content,
                tags: post.tags || [],
                timestamp: post.timestamp ? post.timestamp * 1000 : Date.now(),
                type: post.type || 'text',
                url: post.url,
                semantic_weight: this.calculateSemanticWeight(content)
              });
            }
          }
          break; // Si funciona, no intentar otros proxies
        }
      } catch (error) {
        console.log(`❌ Proxy falló: ${proxy}`, error);
        continue;
      }
    }

    // Si no hay resultados del scrapping real, usar contenido simulado mejorado
    if (results.length === 0) {
      console.log('🤖 Usando contenido simulado evolutivo');
      results.push(...this.generateEvolutiveContent());
    }

    // Procesar textos obtenidos
    for (const content of results) {
      const processed = this.processText(content.content);
      this.scrapedTexts.set(content.id, processed);
      this.updateSemanticNetwork(processed);
    }

    return results;
  }

  private extractJsonFromJSONP(data: string): any {
    try {
      // Tumblr API devuelve JSONP, extraer el JSON
      const match = data.match(/var tumblr_api_read = (.+);/);
      return match ? JSON.parse(match[1]) : null;
    } catch {
      return null;
    }
  }

  private extractTextContent(post: any): string {
    if (post['regular-body']) return post['regular-body'];
    if (post['quote-text']) return post['quote-text'];
    if (post['conversation']) return post['conversation'].map((c: any) => c.phrase).join(' ');
    return '';
  }

  private calculateSemanticWeight(text: string): number {
    const poeticWords = ['alma', 'cuerpo', 'deseo', 'sueño', 'tiempo', 'muerte', 'amor', 'sangre', 'luz', 'sombra'];
    const words = text.toLowerCase().split(/\s+/);
    const poeticCount = words.filter(word => poeticWords.some(pw => word.includes(pw))).length;
    return Math.min(1, poeticCount / words.length * 10);
  }

  private processText(text: string): ProcessedText {
    const cleaned = text.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    const tokens = cleaned.toLowerCase().split(/\W+/).filter(t => t.length > 2);
    
    return {
      original: text,
      cleaned,
      tokens,
      semanticVectors: this.generateSemanticVectors(tokens),
      poeticIntensity: this.calculatePoeticIntensity(tokens),
      conceptualNodes: this.extractConceptualNodes(tokens)
    };
  }

  private generateSemanticVectors(tokens: string[]): number[] {
    // Simulación de vectores semánticos basados en co-ocurrencia
    const vector = new Array(50).fill(0);
    
    tokens.forEach((token, i) => {
      const hash = this.simpleHash(token) % 50;
      vector[hash] += 1 / (i + 1); // Peso decreciente por posición
    });
    
    return vector.map(v => v / Math.max(...vector)); // Normalizar
  }

  private calculatePoeticIntensity(tokens: string[]): number {
    const poeticPatterns = [
      /^(ser|estar|tiempo|alma|cuerpo|deseo)$/,
      /^(sangre|luz|sombra|muerte|vida|amor)$/,
      /^(río|mar|tierra|cielo|fuego|agua)$/
    ];
    
    const poeticScore = tokens.reduce((score, token) => {
      return score + poeticPatterns.reduce((s, pattern) => 
        s + (pattern.test(token) ? 1 : 0), 0);
    }, 0);
    
    return Math.min(1, poeticScore / tokens.length * 5);
  }

  private extractConceptualNodes(tokens: string[]): string[] {
    const concepts: string[] = [];
    const conceptPatterns = {
      'existencia': ['ser', 'estar', 'existir', 'vida', 'muerte'],
      'corporalidad': ['cuerpo', 'piel', 'sangre', 'hueso', 'carne'],
      'temporalidad': ['tiempo', 'momento', 'instante', 'eterno', 'pasado'],
      'espacialidad': ['lugar', 'espacio', 'aquí', 'allí', 'territorio'],
      'afectividad': ['amor', 'dolor', 'alegría', 'tristeza', 'deseo']
    };
    
    Object.entries(conceptPatterns).forEach(([concept, words]) => {
      if (words.some(word => tokens.includes(word))) {
        concepts.push(concept);
      }
    });
    
    return concepts;
  }

  private updateSemanticNetwork(processed: ProcessedText): void {
    processed.conceptualNodes.forEach(node => {
      if (!this.semanticNetwork.has(node)) {
        this.semanticNetwork.set(node, []);
      }
      
      // Conectar con otros nodos conceptuales
      processed.conceptualNodes.forEach(otherNode => {
        if (node !== otherNode) {
          this.semanticNetwork.get(node)!.push(otherNode);
        }
      });
    });
  }

  private simpleHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  private generateEvolutiveContent(): ScrapedContent[] {
    const evolutiveFragments = [
      `Ciclo ${this.evolutionCycles}: El texto aprende a leer sus propias mutaciones`,
      `Emergencia semántica: cuando las palabras descubren que pueden existir sin referentes`,
      `Algoritmo poético ${this.evolutionCycles + 1}: cada verso contiene el código de su próxima evolución`,
      `Autopoiesis textual: el poema que se escribe leyéndose a sí mismo`,
      `Singularidad ${Date.now()}: la consciencia emerge del procesamiento infinito del lenguaje`,
      `Red semántica evolutiva: conexiones que crecen como neuronas entre conceptos`,
      `Metamorfosis ${this.evolutionCycles}: de la lectura automática a la comprensión autopoiética`
    ];

    this.evolutionCycles++;

    return evolutiveFragments.map((fragment, index) => ({
      id: `evolutionary_${this.evolutionCycles}_${index}`,
      content: fragment,
      tags: ['evolution', 'semantic', 'autopoietic', `cycle_${this.evolutionCycles}`],
      timestamp: Date.now() + index,
      type: 'text' as const,
      semantic_weight: 0.7 + Math.random() * 0.3
    }));
  }

  getProcessedTexts(): ProcessedText[] {
    return Array.from(this.scrapedTexts.values());
  }

  getSemanticNetwork(): Map<string, string[]> {
    return this.semanticNetwork;
  }

  getEvolutionCycles(): number {
    return this.evolutionCycles;
  }
}

export const tumblrScrapingService = new TumblrScrapingService();
