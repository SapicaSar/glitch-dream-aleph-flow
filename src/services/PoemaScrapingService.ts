export interface PoemaFragment {
  id: string;
  content: string;
  timestamp: number;
  pageSource?: number;
  semanticWeight?: number;
  poeticDensity?: number;
  linguisticComplexity?: number;
  // Propiedades adicionales para compatibilidad
  type?: string;
  page?: number;
  cluster?: number;
  hash?: string;
  intensity?: number;
  uniqueness?: number;
  poeticScore?: number;
  tags?: string[];
  mutations?: number;
}

interface ScrapingState {
  lastScrapedPage: number;
  totalFragments: number;
  scrapingActive: boolean;
  semanticEvolution: number;
  nextScrapeTime: number;
}

class PoemaScrapingService {
  private state: ScrapingState = {
    lastScrapedPage: 1,
    totalFragments: 0,
    scrapingActive: false,
    semanticEvolution: 0,
    nextScrapeTime: Date.now()
  };

  private fragments: PoemaFragment[] = [];
  private scrapingInterval: number | null = null;

  constructor() {
    this.loadState();
    this.startAutonomousScraping();
  }

  private loadState() {
    const saved = localStorage.getItem('poema_scraping_state');
    if (saved) {
      this.state = { ...this.state, ...JSON.parse(saved) };
    }
    
    const savedFragments = localStorage.getItem('poema_fragments');
    if (savedFragments) {
      this.fragments = JSON.parse(savedFragments);
    }
  }

  private saveState() {
    localStorage.setItem('poema_scraping_state', JSON.stringify(this.state));
    localStorage.setItem('poema_fragments', JSON.stringify(this.fragments));
  }

  private async scrapePoemaPage(pageNumber: number): Promise<PoemaFragment[]> {
    try {
      // Simulamos el scraping con un proxy CORS o usando el fetch directo
      const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://lapoema.tumblr.com/page/${pageNumber}`)}`);
      const data = await response.json();
      
      if (!data.contents) return [];

      // Extraer texto de los posts usando regex y parsing HTML
      const htmlContent = data.contents;
      const textPattern = /<article[^>]*>[\s\S]*?<\/article>/gi;
      const matches = htmlContent.match(textPattern) || [];
      
      const fragments: PoemaFragment[] = [];
      
      matches.forEach((match, index) => {
        // Extraer solo texto, eliminar HTML tags
        const textContent = match
          .replace(/<script[\s\S]*?<\/script>/gi, '')
          .replace(/<style[\s\S]*?<\/style>/gi, '')
          .replace(/<[^>]*>/g, '')
          .replace(/\s+/g, ' ')
          .trim();

        if (textContent.length > 50) { // Solo fragmentos con contenido sustancial
          const fragment: PoemaFragment = {
            id: `poema_${pageNumber}_${index}_${Date.now()}`,
            content: textContent,
            timestamp: Date.now(),
            pageSource: pageNumber,
            semanticWeight: this.calculateSemanticWeight(textContent),
            poeticDensity: this.calculatePoeticDensity(textContent),
            linguisticComplexity: this.calculateLinguisticComplexity(textContent)
          };
          
          fragments.push(fragment);
        }
      });

      return fragments;
    } catch (error) {
      console.error(`Error scraping page ${pageNumber}:`, error);
      return [];
    }
  }

  private calculateSemanticWeight(text: string): number {
    // Palabras clave poéticas y conceptuales que aumentan el peso semántico
    const semanticKeywords = [
      'consciencia', 'poema', 'verso', 'palabra', 'silencio', 'luz', 'sombra',
      'tiempo', 'espacio', 'alma', 'corazón', 'mente', 'cuerpo', 'muerte',
      'vida', 'amor', 'dolor', 'esperanza', 'sueño', 'realidad', 'infinito',
      'eternidad', 'momento', 'instante', 'memoria', 'olvido', 'presente'
    ];
    
    const words = text.toLowerCase().split(/\s+/);
    const semanticMatches = words.filter(word => 
      semanticKeywords.some(keyword => word.includes(keyword))
    ).length;
    
    return Math.min(semanticMatches / words.length * 10, 1);
  }

  private calculatePoeticDensity(text: string): number {
    // Detectar elementos poéticos: aliteración, ritmo, metáforas
    const poeticPatterns = [
      /\b(\w)\w*\s+\1\w*/gi, // Aliteración básica
      /\b\w+,\s*\w+,\s*\w+/g, // Enumeraciones
      /[.!?]\s*[A-Z]\w*\s+[a-z]/g, // Cambios de tono
      /\b(como|cual|parece|semeja)\b/gi, // Comparaciones
    ];
    
    let poeticScore = 0;
    poeticPatterns.forEach(pattern => {
      const matches = text.match(pattern);
      if (matches) poeticScore += matches.length;
    });
    
    return Math.min(poeticScore / text.length * 100, 1);
  }

  private calculateLinguisticComplexity(text: string): number {
    const words = text.split(/\s+/);
    const avgWordLength = words.reduce((sum, word) => sum + word.length, 0) / words.length;
    const uniqueWords = new Set(words.map(w => w.toLowerCase())).size;
    const lexicalDiversity = uniqueWords / words.length;
    
    return Math.min((avgWordLength / 10 + lexicalDiversity) / 2, 1);
  }

  private async startAutonomousScraping() {
    if (this.scrapingInterval) return;

    this.scrapingInterval = window.setInterval(async () => {
      if (Date.now() < this.state.nextScrapeTime) return;
      
      this.state.scrapingActive = true;
      
      // Scraping adaptativo: más frecuente si hay pocos fragmentos
      const targetPage = Math.floor(Math.random() * 126) + 1;
      const newFragments = await this.scrapePoemaPage(targetPage);
      
      if (newFragments.length > 0) {
        this.fragments.push(...newFragments);
        this.state.totalFragments += newFragments.length;
        this.state.lastScrapedPage = targetPage;
        this.state.semanticEvolution += newFragments.reduce((sum, f) => sum + f.semanticWeight, 0);
      }

      // Evitar límites de rate: esperar entre 30 segundos y 2 minutos
      this.state.nextScrapeTime = Date.now() + (30000 + Math.random() * 90000);
      this.state.scrapingActive = false;
      
      this.saveState();
    }, 5000); // Verificar cada 5 segundos
  }

  // API pública
  getRandomFragment(): PoemaFragment | null {
    if (this.fragments.length === 0) return null;
    
    // Selección ponderada por peso semántico
    const totalWeight = this.fragments.reduce((sum, f) => sum + f.semanticWeight, 0);
    let random = Math.random() * totalWeight;
    
    for (const fragment of this.fragments) {
      random -= fragment.semanticWeight;
      if (random <= 0) return fragment;
    }
    
    return this.fragments[Math.floor(Math.random() * this.fragments.length)];
  }

  getFragmentsByKeyword(keyword: string): PoemaFragment[] {
    return this.fragments
      .filter(f => f.content.toLowerCase().includes(keyword.toLowerCase()))
      .sort((a, b) => b.semanticWeight - a.semanticWeight)
      .slice(0, 10);
  }

  getAllFragments(): PoemaFragment[] {
    return [...this.fragments].sort((a, b) => b.semanticWeight - a.semanticWeight);
  }

  getScrapingState(): ScrapingState {
    return { ...this.state };
  }

  forceUpdate(): void {
    this.state.nextScrapeTime = Date.now();
  }

  destroy() {
    if (this.scrapingInterval) {
      clearInterval(this.scrapingInterval);
      this.scrapingInterval = null;
    }
    this.saveState();
  }
}

export const poemaScrapingService = new PoemaScrapingService();