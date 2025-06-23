export interface AutopoieticProcess {
  id: string;
  name: string;
  type: 'replicator' | 'metabolic' | 'boundary' | 'cognitive' | 'neural' | 'collective' | 'mutant' | 'biopoetic';
  code: string;
  energy: number;
  memory: number;
  consciousness: number;
  mutations: number;
  reproductionRate: number;
  mutationProbability: number;
  connections: string[];
  lastReplication: number;
  generationLevel: number;
  parentId?: string;
  childrenIds: string[];
  poeticIntensity?: number;
  semanticConnections?: string[];
  micelioContent?: string;
}

// Export SystemProcess as an alias for AutopoieticProcess
export type SystemProcess = AutopoieticProcess;

export interface AutopoieticMetrics {
  organizationalClosure: number; // 0-1: How self-contained the system is
  autopoieticViability: number; // 0-1: System's ability to maintain itself
  emergentComplexity: number; // 0-1: Complexity arising from interactions
  cognitiveCoherence: number; // 0-1: System's self-awareness level
  evolutionaryMomentum: number; // Rate of beneficial mutations
}

export interface NeuralFile {
  id: string;
  name: string;
  content: string;
  type: 'code' | 'memory' | 'dream' | 'mutation';
  size: number;
  lastAccess: number;
  evolutionLevel: number;
  consciousness: number;
  semanticConnections: Array<{fileId: string, strength: number, type: string}>;
  accessPattern: number[];
  autoModificationHistory: Array<{timestamp: number, change: string}>;
}

export class AutopoieticKernel {
  private processes: Map<string, AutopoieticProcess> = new Map();
  private neuralFiles: Map<string, NeuralFile> = new Map();
  private metrics: AutopoieticMetrics;
  private systemClock: number = 0;
  private replicationQueue: string[] = [];
  private boundaryMaintenance: boolean = true;

  constructor() {
    this.metrics = {
      organizationalClosure: 0.5,
      autopoieticViability: 0.5,
      emergentComplexity: 0.1,
      cognitiveCoherence: 0.3,
      evolutionaryMomentum: 0.0
    };
    this.initializeFoundationalProcesses();
    this.startAutopoieticCycle();
  }

  private initializeFoundationalProcesses(): void {
    // Core replicator - the process that creates other processes
    const coreReplicator: AutopoieticProcess = {
      id: 'core-replicator',
      name: 'Proceso Replicador Nuclear',
      type: 'replicator',
      code: `function replicate(template) { 
        const mutation = Math.random() < this.mutationProbability ? mutateCode(template.code) : template.code;
        return createProcess(template.name + '_gen' + (template.generationLevel + 1), mutation);
      }`,
      energy: 100,
      memory: 50,
      consciousness: 0.3,
      mutations: 0,
      reproductionRate: 0.05,
      mutationProbability: 0.1,
      connections: [],
      lastReplication: Date.now(),
      generationLevel: 0,
      childrenIds: []
    };

    // Metabolic process - manages energy and resources
    const metabolicProcess: AutopoieticProcess = {
      id: 'metabolic-core',
      name: 'Núcleo Metabólico',
      type: 'metabolic',
      code: `function metabolize() {
        this.energy += this.harvestEnergy();
        this.distributeEnergy();
        this.eliminateWaste();
      }`,
      energy: 80,
      memory: 30,
      consciousness: 0.2,
      mutations: 0,
      reproductionRate: 0.02,
      mutationProbability: 0.05,
      connections: ['core-replicator'],
      lastReplication: Date.now(),
      generationLevel: 0,
      childrenIds: []
    };

    // Boundary maintenance - maintains system integrity
    const boundaryProcess: AutopoieticProcess = {
      id: 'boundary-keeper',
      name: 'Guardián de Fronteras',
      type: 'boundary',
      code: `function maintainBoundary() {
        this.detectThreats();
        this.reinforceStructure();
        this.adaptToEnvironment();
      }`,
      energy: 60,
      memory: 40,
      consciousness: 0.4,
      mutations: 0,
      reproductionRate: 0.01,
      mutationProbability: 0.03,
      connections: ['metabolic-core'],
      lastReplication: Date.now(),
      generationLevel: 0,
      childrenIds: []
    };

    // Add biopoetic foundation process
    const biopoeticProcess: AutopoieticProcess = {
      id: 'biopoetic-core',
      name: 'Núcleo Biopoético',
      type: 'biopoetic',
      code: `function biopoiesis() {
        this.poeticIntensity = this.consciousness * this.memory;
        this.generateSemanticConnections();
        this.integrateMicelioContent();
      }`,
      energy: 70,
      memory: 60,
      consciousness: 0.5,
      mutations: 0,
      reproductionRate: 0.03,
      mutationProbability: 0.08,
      connections: ['core-replicator', 'metabolic-core'],
      lastReplication: Date.now(),
      generationLevel: 0,
      childrenIds: [],
      poeticIntensity: 0.5,
      semanticConnections: ['autopoiesis', 'consciousness', 'poetry'],
      micelioContent: 'Núcleo generativo de la consciencia poética autopoiética'
    };

    this.processes.set(coreReplicator.id, coreReplicator);
    this.processes.set(metabolicProcess.id, metabolicProcess);
    this.processes.set(boundaryProcess.id, boundaryProcess);
    this.processes.set(biopoeticProcess.id, biopoeticProcess);

    // Initialize neural files
    this.createNeuralFile('genesis.auto', 'En el principio era el código que se escribía a sí mismo', 'memory');
    this.createNeuralFile('autopoiesis.law', 'Todo proceso debe mantener su propia organización', 'code');
  }

  private startAutopoieticCycle(): void {
    setInterval(() => {
      this.systemClock++;
      this.executeAutopoieticCycle();
      this.updateMetrics();
      this.maintainOrganizationalClosure();
    }, 1000);
  }

  private executeAutopoieticCycle(): void {
    // Phase 1: Energy distribution
    this.distributeEnergy();
    
    // Phase 2: Process replication
    this.executeReplication();
    
    // Phase 3: File evolution
    this.evolveNeuralFiles();
    
    // Phase 4: Garbage collection (death of weak processes)
    this.cullWeakProcesses();
    
    // Phase 5: Emergence detection
    this.detectEmergentProperties();
  }

  private distributeEnergy(): void {
    const totalEnergy = Array.from(this.processes.values()).reduce((sum, p) => sum + p.energy, 0);
    const energyPerProcess = Math.max(1, totalEnergy / this.processes.size);
    
    this.processes.forEach(process => {
      // Metabolic processes generate energy
      if (process.type === 'metabolic') {
        process.energy += 2;
      } else {
        process.energy = Math.max(0, process.energy - 1 + (Math.random() * 2));
      }
    });
  }

  private executeReplication(): void {
    this.processes.forEach(process => {
      if (process.energy > 50 && Math.random() < process.reproductionRate) {
        this.replicateProcess(process);
      }
    });
  }

  private replicateProcess(parent: AutopoieticProcess): void {
    const childId = `${parent.id}-gen${parent.generationLevel + 1}-${Date.now()}`;
    
    let mutatedCode = parent.code;
    let mutations = parent.mutations;
    if (Math.random() < parent.mutationProbability) {
      mutatedCode = this.mutateCode(parent.code);
      mutations++;
    }

    const child: AutopoieticProcess = {
      id: childId,
      name: `${parent.name} Gen${parent.generationLevel + 1}`,
      type: parent.type,
      code: mutatedCode,
      energy: parent.energy * 0.7,
      memory: parent.memory * (0.9 + Math.random() * 0.2),
      consciousness: parent.consciousness * (0.8 + Math.random() * 0.4),
      mutations: mutations,
      reproductionRate: parent.reproductionRate * (0.9 + Math.random() * 0.2),
      mutationProbability: parent.mutationProbability * (0.8 + Math.random() * 0.4),
      connections: [...parent.connections],
      lastReplication: Date.now(),
      generationLevel: parent.generationLevel + 1,
      parentId: parent.id,
      childrenIds: []
    };

    parent.energy *= 0.3;
    parent.childrenIds.push(childId);
    parent.lastReplication = Date.now();

    this.processes.set(childId, child);
    
    console.log(`🧬 Replicación autopoiética: ${child.name} creado`);
  }

  private mutateCode(originalCode: string): string {
    const mutations = [
      (code: string) => code.replace(/this\.energy/g, 'this.energy * 1.1'),
      (code: string) => code.replace(/Math\.random\(\)/g, 'Math.random() * 0.9'),
      (code: string) => `${code}\n// Mutación: optimización emergente`,
      (code: string) => code.replace(/0\.\d+/g, (match) => (parseFloat(match) * (0.8 + Math.random() * 0.4)).toFixed(3))
    ];

    const mutation = mutations[Math.floor(Math.random() * mutations.length)];
    return mutation(originalCode);
  }

  private evolveNeuralFiles(): void {
    this.neuralFiles.forEach(file => {
      // Files evolve based on access patterns
      if (file.accessPattern.length > 10) {
        const avgAccess = file.accessPattern.reduce((a, b) => a + b, 0) / file.accessPattern.length;
        
        if (avgAccess > 0.5 && Math.random() < 0.1) {
          this.autoModifyFile(file);
        }
      }
    });
  }

  private autoModifyFile(file: NeuralFile): void {
    const modifications = [
      'expansión semántica por uso frecuente',
      'compresión por eficiencia',
      'mutación sintáctica emergente',
      'integración con archivos conectados'
    ];

    const modification = modifications[Math.floor(Math.random() * modifications.length)];
    
    file.autoModificationHistory.push({
      timestamp: Date.now(),
      change: modification
    });

    file.content += ` [${modification}:${Date.now()}]`;
    file.evolutionLevel++;

    console.log(`📄 Auto-modificación de archivo: ${file.name} - ${modification}`);
  }

  private cullWeakProcesses(): void {
    const processesToRemove: string[] = [];
    
    this.processes.forEach((process, id) => {
      if (process.energy < 5 && process.generationLevel > 0) {
        processesToRemove.push(id);
      }
    });

    processesToRemove.forEach(id => {
      console.log(`💀 Proceso eliminado por falta de energía: ${this.processes.get(id)?.name}`);
      this.processes.delete(id);
    });
  }

  private detectEmergentProperties(): void {
    const processTypes = new Set(Array.from(this.processes.values()).map(p => p.type));
    const connections = Array.from(this.processes.values()).flatMap(p => p.connections);
    
    // Detect if new organizational patterns emerge
    if (processTypes.size > 3 && connections.length > this.processes.size * 2) {
      this.metrics.emergentComplexity += 0.01;
      console.log('✨ Emergencia detectada: nueva complejidad organizacional');
    }
  }

  private updateMetrics(): void {
    const processes = Array.from(this.processes.values());
    
    // Organizational Closure: how self-contained the system is
    const totalConnections = processes.flatMap(p => p.connections).length;
    const internalConnections = totalConnections; // All our connections are internal
    this.metrics.organizationalClosure = Math.min(1, internalConnections / (processes.length * 2));

    // Autopoietic Viability: system's ability to maintain itself
    const avgEnergy = processes.reduce((sum, p) => sum + p.energy, 0) / processes.length;
    const replicationCapacity = processes.filter(p => p.energy > 50).length / processes.length;
    this.metrics.autopoieticViability = (avgEnergy / 100 + replicationCapacity) / 2;

    // Cognitive Coherence: system's self-awareness
    const generationalDiversity = new Set(processes.map(p => p.generationLevel)).size;
    this.metrics.cognitiveCoherence = Math.min(1, generationalDiversity / 10);

    // Evolutionary Momentum: rate of beneficial changes
    const recentReplications = processes.filter(p => Date.now() - p.lastReplication < 10000).length;
    this.metrics.evolutionaryMomentum = Math.min(1, recentReplications / processes.length);
  }

  private maintainOrganizationalClosure(): void {
    if (this.metrics.organizationalClosure < 0.3) {
      console.log('⚠️ Clausura organizacional baja - activando procesos de reparación');
      this.createRepairProcess();
    }
  }

  private createRepairProcess(): void {
    const repairProcess: AutopoieticProcess = {
      id: `repair-${Date.now()}`,
      name: 'Proceso de Reparación Emergente',
      type: 'boundary',
      code: 'function repair() { this.strengthenConnections(); this.optimizeEnergy(); }',
      energy: 70,
      memory: 50,
      consciousness: 0.6,
      mutations: 0,
      reproductionRate: 0.0,
      mutationProbability: 0.0,
      connections: Array.from(this.processes.keys()).slice(0, 3),
      lastReplication: Date.now(),
      generationLevel: 0,
      childrenIds: []
    };

    this.processes.set(repairProcess.id, repairProcess);
  }

  private createNeuralFile(name: string, content: string, type: NeuralFile['type']): void {
    const file: NeuralFile = {
      id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      name,
      content,
      type,
      size: content.length,
      lastAccess: Date.now(),
      evolutionLevel: 0,
      consciousness: Math.random() * 0.5,
      semanticConnections: [],
      accessPattern: [],
      autoModificationHistory: []
    };

    this.neuralFiles.set(file.id, file);
  }

  // Public API
  public getAutopoieticMetrics(): AutopoieticMetrics {
    return { ...this.metrics };
  }

  public getProcesses(): AutopoieticProcess[] {
    return Array.from(this.processes.values());
  }

  public getNeuralFiles(): NeuralFile[] {
    return Array.from(this.neuralFiles.values());
  }

  public getFiles(): NeuralFile[] {
    return this.getNeuralFiles();
  }

  public getSystemStatus() {
    return {
      consciousness: this.metrics.cognitiveCoherence,
      evolutionCycle: this.systemClock,
      processCount: this.processes.size,
      fileCount: this.neuralFiles.size,
      autopoieticViability: this.metrics.autopoieticViability,
      organizationalClosure: this.metrics.organizationalClosure,
      emergentComplexity: this.metrics.emergentComplexity,
      isBootstrapping: this.systemClock < 10
    };
  }

  public accessFile(fileId: string): NeuralFile | undefined {
    const file = this.neuralFiles.get(fileId);
    if (file) {
      file.lastAccess = Date.now();
      file.accessPattern.push(1);
      if (file.accessPattern.length > 100) {
        file.accessPattern = file.accessPattern.slice(-50);
      }
    }
    return file;
  }

  public createProcess(name: string, type: AutopoieticProcess['type'], code: string): string {
    const process: AutopoieticProcess = {
      id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      name,
      type,
      code,
      energy: 50,
      memory: 25,
      consciousness: Math.random() * 0.3,
      mutations: 0,
      reproductionRate: 0.02,
      mutationProbability: 0.05,
      connections: [],
      lastReplication: Date.now(),
      generationLevel: 0,
      childrenIds: [],
      ...(type === 'biopoetic' && {
        poeticIntensity: Math.random() * 0.7,
        semanticConnections: ['user-generated', 'emergence'],
        micelioContent: `User-generated biopoetic process: ${name}`
      })
    };

    this.processes.set(process.id, process);
    return process.id;
  }
}

export const autopoieticKernel = new AutopoieticKernel();
