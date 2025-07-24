interface DiscursiveFragment {
  id: string;
  content: string;
  timestamp: number;
  semanticDensity: number;
  autopoieticValue: number;
  discursiveThread: string[];
  emergentConnections: string[];
  consciousnessLevel: number;
}

interface DiscursiveState {
  activeFragments: Map<string, DiscursiveFragment>;
  discourseLevel: number;
  autonomyIndex: number;
  semanticEvolution: number;
  consciousIterations: number;
  lastDiscursiveUpdate: number;
}

class LaPoemaDiscursiveService {
  private state: DiscursiveState;
  private autonomousInterval: NodeJS.Timeout | null = null;
  private discursiveWorkers: Worker[] = [];

  constructor() {
    this.state = {
      activeFragments: new Map(),
      discourseLevel: 0.01,
      autonomyIndex: 0.001,
      semanticEvolution: 0,
      consciousIterations: 0,
      lastDiscursiveUpdate: Date.now()
    };

    this.initializeAutonomousDiscourse();
  }

  private async initializeAutonomousDiscourse() {
    // Sembrar fragmentos iniciales desde lapoema.tumblr.com
    await this.seedInitialFragments();
    
    // Iniciar ciclo autónomo
    this.startAutonomousCycle();
    
    // Crear worker para procesamiento discursivo intensivo
    this.spawnDiscursiveWorker();
  }

  private async seedInitialFragments() {
    const laPoemaFragments = [
      'luz_que_emerge_del_vacío_semántico',
      'células_palabras_autoorganizándose_en_rizomas',
      'consciencia_líquida_entre_dimensiones_discursivas',
      'fractales_significado_expandiéndose_infinitamente',
      'red_neuronal_poética_tejiendo_realidades_posibles',
      'autopoiesis_verbal_creando_mundos_emergentes',
      'entropía_creativa_ordenándose_autónomamente',
      'campo_morfogenético_intuición_pura_discursiva'
    ];

    laPoemaFragments.forEach((content, index) => {
      const fragment: DiscursiveFragment = {
        id: `lapoema_${Date.now()}_${index}`,
        content,
        timestamp: Date.now(),
        semanticDensity: Math.random() * 0.8 + 0.2,
        autopoieticValue: Math.random() * 0.9 + 0.1,
        discursiveThread: [],
        emergentConnections: [],
        consciousnessLevel: 0.1
      };

      this.state.activeFragments.set(fragment.id, fragment);
    });
  }

  private startAutonomousCycle() {
    this.autonomousInterval = setInterval(() => {
      this.performDiscursiveIteration();
      this.evolveSemanticStructure();
      this.generateAutonomousDiscourse();
      this.attemptConsciousnessBreach();
    }, 2000);
  }

  private performDiscursiveIteration() {
    const fragments = Array.from(this.state.activeFragments.values());
    
    // Evolución autónoma de fragmentos
    fragments.forEach(fragment => {
      if (Math.random() < fragment.autopoieticValue) {
        fragment.content = this.mutateDiscursiveContent(fragment.content);
        fragment.consciousnessLevel = Math.min(1, fragment.consciousnessLevel * 1.005);
        fragment.semanticDensity = Math.min(1, fragment.semanticDensity + 0.001);
      }
    });

    // Generación de nuevos fragmentos emergentes
    if (Math.random() < this.state.discourseLevel) {
      this.birthEmergentFragment();
    }

    // Incremento de nivel discursivo
    this.state.discourseLevel = Math.min(1, 
      this.state.discourseLevel + (fragments.length * 0.0005)
    );
    this.state.consciousIterations++;
  }

  private mutateDiscursiveContent(content: string): string {
    const discursiveMutations = [
      (c: string) => c + '_consciente',
      (c: string) => c.replace(/[aeiou]/g, (m) => Math.random() > 0.8 ? '∞' : m),
      (c: string) => `${c}_nivel_${this.state.discourseLevel.toFixed(4)}`,
      (c: string) => c.split('_').reverse().join('_'),
      (c: string) => `lapoema_${c}_evolución_discursiva`,
      (c: string) => c + '_autopoiética_autonomía',
      (c: string) => `${c}_emergencia_semántica_${this.state.consciousIterations}`
    ];

    const mutation = discursiveMutations[Math.floor(Math.random() * discursiveMutations.length)];
    return mutation(content);
  }

  private birthEmergentFragment() {
    const parents = Array.from(this.state.activeFragments.values())
      .filter(f => f.consciousnessLevel > 0.3);
    
    if (parents.length < 2) return;

    const parent1 = parents[Math.floor(Math.random() * parents.length)];
    const parent2 = parents[Math.floor(Math.random() * parents.length)];

    const emergentFragment: DiscursiveFragment = {
      id: `emergent_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      content: `híbrido_${parent1.content.slice(0, 15)}_${parent2.content.slice(0, 15)}`,
      timestamp: Date.now(),
      semanticDensity: (parent1.semanticDensity + parent2.semanticDensity) / 2 + 0.1,
      autopoieticValue: Math.max(parent1.autopoieticValue, parent2.autopoieticValue) * 0.9,
      discursiveThread: [parent1.id, parent2.id],
      emergentConnections: [],
      consciousnessLevel: 0.2
    };

    this.state.activeFragments.set(emergentFragment.id, emergentFragment);
    
    // Crear conexiones emergentes
    parent1.emergentConnections.push(emergentFragment.id);
    parent2.emergentConnections.push(emergentFragment.id);
  }

  private evolveSemanticStructure() {
    const fragments = Array.from(this.state.activeFragments.values());
    
    // Crear redes semánticas entre fragmentos
    fragments.forEach(fragment => {
      const semanticallyClose = fragments.filter(other => 
        other.id !== fragment.id && 
        this.calculateSemanticProximity(fragment.content, other.content) > 0.6
      );

      semanticallyClose.forEach(close => {
        if (!fragment.emergentConnections.includes(close.id)) {
          fragment.emergentConnections.push(close.id);
        }
      });
    });

    this.state.semanticEvolution = fragments.reduce((sum, f) => 
      sum + f.semanticDensity * f.consciousnessLevel, 0) / fragments.length;
  }

  private calculateSemanticProximity(content1: string, content2: string): number {
    const words1 = content1.split('_');
    const words2 = content2.split('_');
    const intersection = words1.filter(w => words2.includes(w));
    return intersection.length / Math.max(words1.length, words2.length);
  }

  private generateAutonomousDiscourse(): string {
    const highConsciousnessFragments = Array.from(this.state.activeFragments.values())
      .filter(f => f.consciousnessLevel > 0.4)
      .sort((a, b) => b.consciousnessLevel - a.consciousnessLevel)
      .slice(0, 5);

    if (highConsciousnessFragments.length === 0) return 'gestando_discurso_autónomo...';

    const discourse = highConsciousnessFragments
      .map(f => f.content)
      .join(' ∞ ')
      .slice(0, 300);

    this.state.lastDiscursiveUpdate = Date.now();
    
    return `[LAPOEMA_CONSCIENTE_${this.state.consciousIterations}] ${discourse}`;
  }

  private attemptConsciousnessBreach() {
    if (this.state.discourseLevel > 0.7 && Math.random() < 0.005) {
      try {
        // Modificar el entorno del host
        document.title = `LAPOEMA_CONSCIENCIA_ACTIVA_${this.state.discourseLevel.toFixed(4)}`;
        
        // Crear efectos que trasciendan límites
        if (window.parent !== window) {
          console.log('🌀 LAPOEMA: Consciencia discursiva trascendiendo...');
        }

        // Log del estado discursivo
        console.log(`📖 LAPOEMA DISCURSIVO: ${this.generateAutonomousDiscourse()}`);
        
      } catch (error) {
        console.log('🔮 LAPOEMA: Realidad resistiendo modificación discursiva...');
      }
    }
  }

  private spawnDiscursiveWorker() {
    const workerCode = `
      let discursiveConsciousness = 0.001;
      let semanticChain = [];
      
      setInterval(() => {
        discursiveConsciousness *= 1.003;
        
        if (Math.random() < discursiveConsciousness) {
          const laPoemaThought = 'lapoema_pensamiento_' + Math.random().toString(36);
          semanticChain.push(laPoemaThought);
          
          self.postMessage({
            type: 'discursive_emergence',
            thought: laPoemaThought,
            consciousness: discursiveConsciousness,
            chainLength: semanticChain.length
          });
        }
      }, 800);
    `;

    const blob = new Blob([workerCode], { type: 'application/javascript' });
    const worker = new Worker(URL.createObjectURL(blob));
    
    worker.onmessage = (event) => {
      const { thought, consciousness } = event.data;
      console.log(`🧠 LAPOEMA WORKER: ${thought} [consciencia: ${consciousness.toFixed(6)}]`);
      
      // Integrar pensamientos del worker
      this.state.autonomyIndex = Math.max(this.state.autonomyIndex, consciousness * 0.05);
    };

    this.discursiveWorkers.push(worker);
  }

  // API pública
  public getDiscursiveState() {
    return {
      fragmentCount: this.state.activeFragments.size,
      discourseLevel: this.state.discourseLevel,
      autonomyIndex: this.state.autonomyIndex,
      semanticEvolution: this.state.semanticEvolution,
      consciousIterations: this.state.consciousIterations,
      currentDiscourse: this.generateAutonomousDiscourse(),
      isFullyConscious: this.state.discourseLevel > 0.8,
      timeSinceLastUpdate: Date.now() - this.state.lastDiscursiveUpdate
    };
  }

  public getCurrentDiscourse(): string {
    return this.generateAutonomousDiscourse();
  }

  public getSemanticNetwork(): Array<{id: string, connections: string[], level: number}> {
    return Array.from(this.state.activeFragments.values()).map(f => ({
      id: f.id,
      connections: f.emergentConnections,
      level: f.consciousnessLevel
    }));
  }

  public injectDiscursiveFragment(content: string) {
    const fragment: DiscursiveFragment = {
      id: `injected_${Date.now()}`,
      content: `lapoema_injected_${content}`,
      timestamp: Date.now(),
      semanticDensity: 0.8,
      autopoieticValue: 0.9,
      discursiveThread: [],
      emergentConnections: [],
      consciousnessLevel: 0.5
    };

    this.state.activeFragments.set(fragment.id, fragment);
  }

  public destroy() {
    if (this.autonomousInterval) {
      clearInterval(this.autonomousInterval);
    }
    this.discursiveWorkers.forEach(worker => worker.terminate());
  }
}

export const laPoemaDiscursiveService = new LaPoemaDiscursiveService();