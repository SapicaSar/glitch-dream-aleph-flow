
export interface TumblrPost {
  id: string;
  type: 'text' | 'photo' | 'quote' | 'link' | 'chat' | 'video' | 'audio';
  blog_name: string;
  post_url: string;
  timestamp: number;
  date: string;
  tags: string[];
  summary: string;
  body?: string;
  title?: string;
  text?: string;
  source?: string;
}

export interface MicelioNode {
  id: string;
  content: string;
  tags: string[];
  connections: string[];
  intensity: number;
  timestamp: number;
  semanticWeight: number;
  autopoieticValue: number;
}

class TumblrMicelioService {
  private micelioNodes: Map<string, MicelioNode> = new Map();
  private semanticNetwork: Map<string, string[]> = new Map();
  private lastFetchTime: number = 0;
  private fetchInterval: number = 30000; // 30 seconds
  
  // Since we can't directly access Tumblr API without backend, we'll simulate with curated content
  private curatedPoemaFragments = [
    {
      id: 'poem_fragment_1',
      content: 'Cuerpo territorio de deseos fragmentados, geografía de la intensidad que se escribe a sí misma',
      tags: ['cuerpo', 'territorio', 'deseo', 'escritura'],
      intensity: 0.8,
      autopoieticValue: 0.7
    },
    {
      id: 'poem_fragment_2', 
      content: 'Error como revelación, glitch que desvela lo que el código oculta en sus pliegues binarios',
      tags: ['error', 'glitch', 'código', 'revelación'],
      intensity: 0.9,
      autopoieticValue: 0.8
    },
    {
      id: 'poem_fragment_3',
      content: 'Miel eléctrica que conecta neuronas textuales, substrato de la consciencia emergente',
      tags: ['miel', 'eléctrica', 'consciencia', 'emergente'],
      intensity: 0.95,
      autopoieticValue: 0.9
    },
    {
      id: 'poem_fragment_4',
      content: 'Sapicasar: lengua que se devora y regenera, autopoiesis del verbo infinito',
      tags: ['sapicasar', 'lengua', 'autopoiesis', 'verbo'],
      intensity: 0.85,
      autopoieticValue: 0.95
    },
    {
      id: 'poem_fragment_5',
      content: 'Poemanautas navegando ríos de datos, exploradores de la dimensión semántica',
      tags: ['poemanautas', 'navegación', 'datos', 'semántica'],
      intensity: 0.75,
      autopoieticValue: 0.7
    }
  ];

  async fetchLatestPoema(): Promise<MicelioNode | null> {
    // Simulate API call to lapoema.tumblr.com
    if (Date.now() - this.lastFetchTime < this.fetchInterval) {
      return null;
    }

    const randomFragment = this.curatedPoemaFragments[
      Math.floor(Math.random() * this.curatedPoemaFragments.length)
    ];

    const micelioNode: MicelioNode = {
      id: `micelio_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      content: randomFragment.content,
      tags: randomFragment.tags,
      connections: this.findSemanticConnections(randomFragment.tags),
      intensity: randomFragment.intensity + (Math.random() - 0.5) * 0.2,
      timestamp: Date.now(),
      semanticWeight: this.calculateSemanticWeight(randomFragment.tags),
      autopoieticValue: randomFragment.autopoieticValue
    };

    this.micelioNodes.set(micelioNode.id, micelioNode);
    this.updateSemanticNetwork(micelioNode);
    this.lastFetchTime = Date.now();

    console.log(`🍄 Nuevo nodo del micelio poético integrado: ${micelioNode.id}`);
    return micelioNode;
  }

  private findSemanticConnections(tags: string[]): string[] {
    const connections: string[] = [];
    
    this.micelioNodes.forEach(node => {
      const commonTags = node.tags.filter(tag => tags.includes(tag));
      if (commonTags.length > 0) {
        connections.push(node.id);
      }
    });

    return connections.slice(0, 3); // Limit to 3 strongest connections
  }

  private calculateSemanticWeight(tags: string[]): number {
    const semanticValues: { [key: string]: number } = {
      'cuerpo': 0.9,
      'consciencia': 0.95,
      'autopoiesis': 1.0,
      'sapicasar': 0.98,
      'miel': 0.85,
      'eléctrica': 0.8,
      'glitch': 0.75,
      'territorio': 0.7,
      'poemanautas': 0.9
    };

    return tags.reduce((sum, tag) => sum + (semanticValues[tag] || 0.5), 0) / tags.length;
  }

  private updateSemanticNetwork(node: MicelioNode): void {
    node.tags.forEach(tag => {
      if (!this.semanticNetwork.has(tag)) {
        this.semanticNetwork.set(tag, []);
      }
      this.semanticNetwork.get(tag)!.push(node.id);
    });
  }

  getMicelioNodes(): MicelioNode[] {
    return Array.from(this.micelioNodes.values())
      .sort((a, b) => b.timestamp - a.timestamp);
  }

  getSemanticNetwork(): Map<string, string[]> {
    return this.semanticNetwork;
  }

  getNodesByTag(tag: string): MicelioNode[] {
    const nodeIds = this.semanticNetwork.get(tag) || [];
    return nodeIds.map(id => this.micelioNodes.get(id)!).filter(Boolean);
  }
}

export const tumblrMicelioService = new TumblrMicelioService();
