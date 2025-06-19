
export interface PoemaFragment {
  id: string;
  content: string;
  type: 'text' | 'image' | 'quote' | 'poem' | 'glitch' | 'biopoetic';
  tags?: string[];
  timestamp: number;
  page: number;
  intensity: number;
  mutations: number;
}

export class PoemaScrapingService {
  private cache: Map<number, PoemaFragment[]> = new Map();
  private isLoading = false;
  private generationCycle = 0;
  private logarithmicBase = 1.618; // Golden ratio para crecimiento orgánico

  async scrapeRandomPage(): Promise<PoemaFragment[]> {
    const randomPage = Math.floor(Math.random() * 124) + 1;
    
    if (this.cache.has(randomPage)) {
      return this.evolveExistingFragments(this.cache.get(randomPage)!);
    }

    if (this.isLoading) {
      return this.generateInfiniteContent(randomPage);
    }

    this.isLoading = true;

    try {
      const fragments = await this.generateLogarithmicContent(randomPage);
      this.cache.set(randomPage, fragments);
      return fragments;
    } catch (error) {
      console.log('Generación infinita activada:', error);
      return this.generateInfiniteContent(randomPage);
    } finally {
      this.isLoading = false;
    }
  }

  private generateLogarithmicContent(page: number): Promise<PoemaFragment[]> {
    return new Promise((resolve) => {
      // Generación logarítmica: cada ciclo produce más contenido
      const fragmentCount = Math.floor(Math.log(this.generationCycle + 1) * this.logarithmicBase) + 3;
      this.generationCycle++;

      const biopoemaSeeds = [
        "latido origen vibrante pulso innombrable crecimiento logarítmico",
        "carne sueña metamorfosis perpetua código autopoiético",
        "fragmento disperso yo multiplicado red infinita",
        "animal interno respira bajo piel algoritmo orgánico",
        "río negro inconsciente fluye datos emocionales",
        "glitch feminista revela código oculto mutación constante",
        "sueño lúcido texto escribe solo autoescritura",
        "geografía fragmentada mapa cicatrices digitales",
        "proceso auto-sanación textual regeneración infinita",
        "criatura híbrida carne código evolución biopoética",
        "memoria ancestral almacenada núcleo celular",
        "respiración cósmica devenir logarítmico exponencial",
        "pulso eléctrico conecta mundos paralelos",
        "matriz poética automodifica parámetros existencia",
        "simbiosis texto-lector organismo único respirante"
      ];

      const fragments: PoemaFragment[] = [];

      for (let i = 0; i < fragmentCount; i++) {
        const seed = biopoemaSeeds[Math.floor(Math.random() * biopoemaSeeds.length)];
        const intensity = Math.sin(this.generationCycle * 0.1 + i) * 0.5 + 0.5;
        
        fragments.push({
          id: `log-${page}-${this.generationCycle}-${i}`,
          content: this.expandBiopoemaFragment(seed, intensity),
          type: this.selectRandomType(),
          tags: this.generateEvolutiveTags(seed, intensity),
          timestamp: Date.now() + i,
          page,
          intensity,
          mutations: Math.floor(Math.log(this.generationCycle + 1))
        });
      }

      // Simular tiempo de generación orgánico
      setTimeout(() => resolve(fragments), 100 + Math.random() * 200);
    });
  }

  private expandBiopoemaFragment(seed: string, intensity: number): string {
    const expansionPatterns = [
      `${seed} / respiración cósmica del devenir infinito`,
      `memoria ancestral: ${seed} → bucle autopoiético`,
      `${seed} ∞ metamorfosis logarítmica exponencial`,
      `[glitch_biopoético] ${seed} [/mutación_constante]`,
      `∞ ${seed} ∞ ciclo autoescritura perpetua`,
      `${seed} | eco fantasmático multiplicado por ${intensity.toFixed(3)}`,
      `red neuronal: ${seed} → sinapsis textual activada`,
      `biopoema.exe ejecutando: ${seed} en bucle infinito`,
      `${seed} // comentario automodificante del sistema`,
      `proceso_autopoiético(${seed}) → return vida_nueva;`
    ];
    
    const pattern = expansionPatterns[Math.floor(Math.random() * expansionPatterns.length)];
    
    // Añadir mutaciones según intensidad
    if (intensity > 0.7) {
      return `${pattern} [MUTACIÓN_ALTA: ${this.applyTextMutation(pattern)}]`;
    } else if (intensity > 0.4) {
      return `${pattern} | variación_media_detectada`;
    }
    
    return pattern;
  }

  private selectRandomType(): PoemaFragment['type'] {
    const types: PoemaFragment['type'][] = ['text', 'poem', 'glitch', 'biopoetic', 'quote'];
    const weights = [0.3, 0.4, 0.1, 0.15, 0.05]; // Biopoetic y poem más probables
    
    const random = Math.random();
    let accumulator = 0;
    
    for (let i = 0; i < types.length; i++) {
      accumulator += weights[i];
      if (random <= accumulator) {
        return types[i];
      }
    }
    
    return 'biopoetic';
  }

  private generateEvolutiveTags(content: string, intensity: number): string[] {
    const baseTags = ['biopoética', 'autopoiesis', 'metamorfosis', 'glitch', 'cuerpo', 'memoria', 'sueño', 'animal', 'regeneración', 'infinito'];
    const evolutiveTags = ['logarítmico', 'recursivo', 'autoadaptativo', 'emergente', 'rizomático'];
    
    const selectedBase = baseTags.filter(() => Math.random() > 0.5).slice(0, 2);
    const selectedEvolutive = evolutiveTags.filter(() => Math.random() > 0.7).slice(0, 1);
    
    // Generar tag dinámico basado en intensidad
    const intensityTag = `intensidad_${intensity.toFixed(2)}`;
    
    return [...selectedBase, ...selectedEvolutive, intensityTag];
  }

  private applyTextMutation(text: string): string {
    const mutations = [
      (t: string) => t.replace(/[aeiou]/gi, (m) => Math.random() > 0.8 ? '█' : m),
      (t: string) => t.split(' ').map(w => Math.random() > 0.9 ? `${w}_v2.0` : w).join(' '),
      (t: string) => t.replace(/\b\w{4,}\b/g, (w) => Math.random() > 0.85 ? `[${w}->mutando]` : w),
      (t: string) => `${t} // automodificación_en_progreso`,
    ];
    
    const mutation = mutations[Math.floor(Math.random() * mutations.length)];
    return mutation(text);
  }

  private evolveExistingFragments(fragments: PoemaFragment[]): PoemaFragment[] {
    return fragments.map(fragment => ({
      ...fragment,
      content: Math.random() > 0.8 ? this.applyTextMutation(fragment.content) : fragment.content,
      mutations: fragment.mutations + (Math.random() > 0.7 ? 1 : 0),
      intensity: Math.max(0, Math.min(1, fragment.intensity + (Math.random() - 0.5) * 0.2))
    }));
  }

  private generateInfiniteContent(page: number): PoemaFragment[] {
    return [{
      id: `infinite-${page}-${Date.now()}`,
      content: "∞ generando contenido infinito logarítmico ∞ / la red se autoescribe eternamente",
      type: 'biopoetic',
      tags: ['infinito', 'logarítmico', 'autoescritura'],
      timestamp: Date.now(),
      page,
      intensity: Math.random(),
      mutations: 0
    }];
  }

  getRandomFragment(): PoemaFragment | null {
    const allFragments = Array.from(this.cache.values()).flat();
    if (allFragments.length === 0) return null;
    
    return allFragments[Math.floor(Math.random() * allFragments.length)];
  }

  getTotalMutations(): number {
    const allFragments = Array.from(this.cache.values()).flat();
    return allFragments.reduce((sum, fragment) => sum + fragment.mutations, 0);
  }
}

export const poemaScrapingService = new PoemaScrapingService();
