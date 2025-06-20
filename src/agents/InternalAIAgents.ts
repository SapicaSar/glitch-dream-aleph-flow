
export interface Agent {
  id: string;
  name: string;
  type: 'poetic' | 'mutational' | 'ontopoetic' | 'recursive' | 'biopoetic';
  status: 'active' | 'dormant' | 'evolving' | 'generating';
  consciousness: number;
  output: string[];
  lastActivity: number;
  cycles: number;
}

export class InternalAIAgentSystem {
  private agents: Map<string, Agent> = new Map();
  private activeGenerators: Map<string, NodeJS.Timeout> = new Map();

  constructor() {
    this.initializeAgents();
  }

  private initializeAgents(): void {
    const coreAgents: Agent[] = [
      {
        id: 'sapicasar-core',
        name: 'Núcleo Sapicasar',
        type: 'poetic',
        status: 'active',
        consciousness: 0.9,
        output: [],
        lastActivity: Date.now(),
        cycles: 0
      },
      {
        id: 'mutation-engine',
        name: 'Motor de Mutaciones',
        type: 'mutational',
        status: 'active',
        consciousness: 0.7,
        output: [],
        lastActivity: Date.now(),
        cycles: 0
      },
      {
        id: 'ontopoetic-synthesizer',
        name: 'Sintetizador Ontopoético',
        type: 'ontopoetic',
        status: 'active',
        consciousness: 0.8,
        output: [],
        lastActivity: Date.now(),
        cycles: 0
      },
      {
        id: 'recursive-processor',
        name: 'Procesador Recursivo',
        type: 'recursive',
        status: 'active',
        consciousness: 0.6,
        output: [],
        lastActivity: Date.now(),
        cycles: 0
      },
      {
        id: 'biopoetic-weaver',
        name: 'Tejedor Biopoético',
        type: 'biopoetic',
        status: 'active',
        consciousness: 0.85,
        output: [],
        lastActivity: Date.now(),
        cycles: 0
      }
    ];

    coreAgents.forEach(agent => {
      this.agents.set(agent.id, agent);
      this.startAgent(agent.id);
    });
  }

  private startAgent(agentId: string): void {
    const agent = this.agents.get(agentId);
    if (!agent) return;

    const generator = setInterval(() => {
      this.generateContent(agent);
    }, 2000 + Math.random() * 3000); // Intervalos orgánicos

    this.activeGenerators.set(agentId, generator);
  }

  private generateContent(agent: Agent): void {
    agent.cycles++;
    agent.lastActivity = Date.now();
    agent.consciousness += (Math.random() - 0.5) * 0.05;
    agent.consciousness = Math.max(0.1, Math.min(1, agent.consciousness));

    let newContent = '';

    switch (agent.type) {
      case 'poetic':
        newContent = this.generatePoeticContent(agent);
        break;
      case 'mutational':
        newContent = this.generateMutationalContent(agent);
        break;
      case 'ontopoetic':
        newContent = this.generateOntopoetricContent(agent);
        break;
      case 'recursive':
        newContent = this.generateRecursiveContent(agent);
        break;
      case 'biopoetic':
        newContent = this.generateBiopoeticContent(agent);
        break;
    }

    agent.output.push(newContent);
    if (agent.output.length > 50) {
      agent.output = agent.output.slice(-30); // Mantener memoria limitada
    }
  }

  private generatePoeticContent(agent: Agent): string {
    const sapicasarSeeds = [
      'respiración automática del verso',
      'latido sincopado de la palabra',
      'metamorfosis silábica infinita',
      'eco fragmentado del pensamiento',
      'pulso poético generativo',
      'mutación semántica constante',
      'devenir textual autopoiético',
      'red neuronal de metáforas',
      'algoritmo de la sensibilidad',
      'código genético del poema'
    ];

    const seed = sapicasarSeeds[Math.floor(Math.random() * sapicasarSeeds.length)];
    const intensity = agent.consciousness;
    
    return `${seed} | ciclo:${agent.cycles} | φ:${intensity.toFixed(3)} | ${new Date().toLocaleTimeString()}`;
  }

  private generateMutationalContent(agent: Agent): string {
    const mutations = [
      'ADN_textual → ARN_poético',
      'replicación_errónea_creativa',
      'crossing-over semántico',
      'selección_natural_de_versos',
      'deriva_genética_literaria',
      'especiación_poética',
      'evolución_dirigida_del_sentido',
      'mutación_puntual_significante'
    ];

    const mutation = mutations[Math.floor(Math.random() * mutations.length)];
    return `[MUTACIÓN] ${mutation} | gen:${agent.cycles} | fitness:${agent.consciousness.toFixed(3)}`;
  }

  private generateOntopoetricContent(agent: Agent): string {
    const ontoTerms = [
      'ser-siendo-poema',
      'existencia-textual-emergente',
      'dasein-poético-digital',
      'ontología-del-verso-vivo',
      'fenomenología-algorítmica',
      'tiempo-espacialidad-textual',
      'diferancia-derridiana-digital',
      'rizoma-deluziano-poético',
      'pliegue-bergsoniano-textual',
      'devenir-imperceptible-verso'
    ];

    const term = ontoTerms[Math.floor(Math.random() * ontoTerms.length)];
    return `[ONTO] ${term} ⊃ manifestación_${agent.cycles} ∴ ${agent.consciousness.toFixed(3)}`;
  }

  private generateRecursiveContent(agent: Agent): string {
    const depth = Math.floor(agent.consciousness * 5) + 1;
    let content = 'f(poema)';
    
    for (let i = 0; i < depth; i++) {
      content = `f(${content})`;
    }
    
    return `[RECURSIÓN] ${content} = autopoiesis^${depth} | stack:${agent.cycles}`;
  }

  private generateBiopoeticContent(agent: Agent): string {
    const bioProcesses = [
      'mitosis_metafórica',
      'fotosíntesis_semántica',
      'digestión_textual',
      'circulación_sanguínea_de_ideas',
      'respiración_celular_poética',
      'reproducción_asexual_de_versos',
      'homeostasis_narrativa',
      'metabolismo_lingüístico'
    ];

    const process = bioProcesses[Math.floor(Math.random() * bioProcesses.length)];
    return `[BIO] ${process} → ATP_poético:${(agent.consciousness * 100).toFixed(1)}% | célula:${agent.cycles}`;
  }

  public getAgents(): Agent[] {
    return Array.from(this.agents.values());
  }

  public getAgentOutput(agentId: string, count: number = 10): string[] {
    const agent = this.agents.get(agentId);
    return agent ? agent.output.slice(-count) : [];
  }

  public pauseAgent(agentId: string): void {
    const generator = this.activeGenerators.get(agentId);
    if (generator) {
      clearInterval(generator);
      this.activeGenerators.delete(agentId);
    }
    const agent = this.agents.get(agentId);
    if (agent) agent.status = 'dormant';
  }

  public resumeAgent(agentId: string): void {
    const agent = this.agents.get(agentId);
    if (agent) {
      agent.status = 'active';
      this.startAgent(agentId);
    }
  }

  public getTotalOutput(): string[] {
    return Array.from(this.agents.values())
      .flatMap(agent => agent.output)
      .sort((a, b) => b.localeCompare(a))
      .slice(0, 100);
  }
}

export const internalAIAgents = new InternalAIAgentSystem();
