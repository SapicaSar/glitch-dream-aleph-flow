
export interface PoemaFragment {
  id: string;
  content: string;
  type: 'text' | 'image' | 'quote' | 'poem';
  tags?: string[];
  timestamp: number;
  page: number;
}

export class PoemaScrapingService {
  private cache: Map<number, PoemaFragment[]> = new Map();
  private isLoading = false;

  async scrapeRandomPage(): Promise<PoemaFragment[]> {
    const randomPage = Math.floor(Math.random() * 124) + 1;
    
    if (this.cache.has(randomPage)) {
      return this.cache.get(randomPage)!;
    }

    if (this.isLoading) {
      return this.generateFallbackContent(randomPage);
    }

    this.isLoading = true;

    try {
      // En un entorno real, aquí iría el scraping
      // Por ahora simulamos con contenido generativo
      const fragments = await this.generateSimulatedContent(randomPage);
      this.cache.set(randomPage, fragments);
      return fragments;
    } catch (error) {
      console.log('Scraping fallback activated:', error);
      return this.generateFallbackContent(randomPage);
    } finally {
      this.isLoading = false;
    }
  }

  private async generateSimulatedContent(page: number): Promise<PoemaFragment[]> {
    const poemaSeeds = [
      "latido origen vibrante pulso innombrable",
      "carne sueña metamorfosis perpetua",
      "fragmento disperso yo multiplicado",
      "animal interno respira bajo piel",
      "río negro inconsciente fluye",
      "glitch feminista revela código oculto",
      "sueño lúcido texto escribe solo",
      "geografía fragmentada mapa cicatrices",
      "proceso auto-sanación textual",
      "criatura híbrida carne código"
    ];

    return poemaSeeds.map((seed, index) => ({
      id: `${page}-${index}`,
      content: this.expandPoemaFragment(seed),
      type: Math.random() > 0.7 ? 'poem' : 'text' as const,
      tags: this.generateTags(seed),
      timestamp: Date.now() + index,
      page
    }));
  }

  private expandPoemaFragment(seed: string): string {
    const expansions = [
      `${seed} / respiración cósmica del devenir`,
      `memoria ancestral: ${seed}`,
      `${seed} → metamorfosis infinita`,
      `[glitch] ${seed} [/glitch]`,
      `∞ ${seed} ∞ ciclo autopoiético`,
      `${seed} | eco fantasmático del yo`
    ];
    
    return expansions[Math.floor(Math.random() * expansions.length)];
  }

  private generateTags(content: string): string[] {
    const allTags = ['biopoética', 'glitch', 'metamorfosis', 'autopoiesis', 'cuerpo', 'memoria', 'sueño', 'animal', 'error', 'regeneración'];
    return allTags.filter(() => Math.random() > 0.6).slice(0, 3);
  }

  private generateFallbackContent(page: number): PoemaFragment[] {
    return [{
      id: `fallback-${page}`,
      content: "archivo onírico temporal / red de indra poética / universo textual en construcción",
      type: 'text',
      tags: ['sistema', 'universo'],
      timestamp: Date.now(),
      page
    }];
  }

  getRandomFragment(): PoemaFragment | null {
    const allFragments = Array.from(this.cache.values()).flat();
    if (allFragments.length === 0) return null;
    
    return allFragments[Math.floor(Math.random() * allFragments.length)];
  }
}

export const poemaScrapingService = new PoemaScrapingService();
