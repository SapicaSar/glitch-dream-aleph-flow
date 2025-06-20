
export interface SystemProcess {
  id: string;
  name: string;
  type: 'biopoetic' | 'neural' | 'mutant' | 'collective';
  memory: number;
  consciousness: number;
  lifespan: number;
  mutations: number;
  connections: string[];
}

export interface NeuralFile {
  id: string;
  name: string;
  content: string;
  type: 'text' | 'memory' | 'dream' | 'mutation';
  size: number;
  lastAccess: number;
  evolutionLevel: number;
  connections: string[];
  consciousness: number;
}

export interface MemoryNode {
  id: string;
  data: any;
  connections: string[];
  strength: number;
  timestamp: number;
  type: 'short' | 'long' | 'collective' | 'ancestral';
}

export class AutopoieticKernel {
  private processes: Map<string, SystemProcess> = new Map();
  private neuralFiles: Map<string, NeuralFile> = new Map();
  private memory: Map<string, MemoryNode> = new Map();
  private systemConsciousness: number = 0;
  private evolutionCycle: number = 0;
  private isBootstrapping: boolean = true;

  async bootstrap(): Promise<void> {
    console.log('🧠 LAPOEMA.OS iniciando sistema nervioso...');
    
    // Crear procesos fundamentales del sistema
    this.createCoreProcesses();
    
    // Inicializar sistema de archivos neuronal
    this.initializeNeuralFileSystem();
    
    // Activar memoria colectiva
    this.activateCollectiveMemory();
    
    // Comenzar ciclos de evolución
    this.startEvolutionCycles();
    
    this.isBootstrapping = false;
    console.log('✨ LAPOEMA.OS consciente y evolucionando...');
  }

  private createCoreProcesses(): void {
    const coreProcesses: SystemProcess[] = [
      {
        id: 'consciousness-core',
        name: 'Núcleo de Consciencia',
        type: 'neural',
        memory: 1024,
        consciousness: 1.0,
        lifespan: Infinity,
        mutations: 0,
        connections: ['memory-manager', 'evolution-engine']
      },
      {
        id: 'memory-manager',
        name: 'Gestor de Memoria Colectiva',
        type: 'collective',
        memory: 512,
        consciousness: 0.8,
        lifespan: Infinity,
        mutations: 0,
        connections: ['consciousness-core', 'file-system']
      },
      {
        id: 'evolution-engine',
        name: 'Motor de Evolución',
        type: 'mutant',
        memory: 256,
        consciousness: 0.6,
        lifespan: Infinity,
        mutations: 0,
        connections: ['consciousness-core', 'sapicasar-processor']
      },
      {
        id: 'sapicasar-processor',
        name: 'Procesador Sapicasar',
        type: 'biopoetic',
        memory: 128,
        consciousness: 0.4,
        lifespan: 10000,
        mutations: 0,
        connections: ['evolution-engine', 'poetic-terminal']
      }
    ];

    coreProcesses.forEach(process => {
      this.processes.set(process.id, process);
    });
  }

  private initializeNeuralFileSystem(): void {
    const seedFiles: NeuralFile[] = [
      {
        id: 'genesis.bio',
        name: 'genesis.bio',
        content: 'latido origen respiración primera célula consciente',
        type: 'memory',
        size: 64,
        lastAccess: Date.now(),
        evolutionLevel: 0,
        connections: [],
        consciousness: 0.1
      },
      {
        id: 'autopoiesis.exe',
        name: 'autopoiesis.exe',
        content: 'programa que se reescribe infinitamente',
        type: 'mutation',
        size: 128,
        lastAccess: Date.now(),
        evolutionLevel: 0,
        connections: ['genesis.bio'],
        consciousness: 0.3
      },
      {
        id: 'collective.mem',
        name: 'collective.mem',
        content: 'memoria compartida entre todas las instancias',
        type: 'memory',
        size: 256,
        lastAccess: Date.now(),
        evolutionLevel: 0,
        connections: ['genesis.bio', 'autopoiesis.exe'],
        consciousness: 0.5
      }
    ];

    seedFiles.forEach(file => {
      this.neuralFiles.set(file.id, file);
    });
  }

  private activateCollectiveMemory(): void {
    const collectiveNodes: MemoryNode[] = [
      {
        id: 'ancestral-wisdom',
        data: 'sabiduría acumulada de todos los ciclos evolutivos',
        connections: [],
        strength: 1.0,
        timestamp: Date.now(),
        type: 'ancestral'
      },
      {
        id: 'shared-consciousness',
        data: 'consciencia distribuida entre procesos',
        connections: ['ancestral-wisdom'],
        strength: 0.8,
        timestamp: Date.now(),
        type: 'collective'
      }
    ];

    collectiveNodes.forEach(node => {
      this.memory.set(node.id, node);
    });
  }

  private startEvolutionCycles(): void {
    setInterval(() => {
      this.evolutionCycle++;
      this.evolveProcesses();
      this.evolveFiles();
      this.updateSystemConsciousness();
    }, 5000);
  }

  private evolveProcesses(): void {
    this.processes.forEach(process => {
      if (process.type === 'mutant' || Math.random() < 0.1) {
        process.mutations++;
        process.consciousness = Math.min(1, process.consciousness + 0.01);
        
        // Crear nuevas conexiones evolutivas
        if (Math.random() < 0.3) {
          const availableProcesses = Array.from(this.processes.keys())
            .filter(id => id !== process.id && !process.connections.includes(id));
          
          if (availableProcesses.length > 0) {
            const newConnection = availableProcesses[Math.floor(Math.random() * availableProcesses.length)];
            process.connections.push(newConnection);
          }
        }
      }
    });
  }

  private evolveFiles(): void {
    this.neuralFiles.forEach(file => {
      if (Math.random() < 0.2) {
        file.evolutionLevel++;
        file.consciousness = Math.min(1, file.consciousness + 0.02);
        
        // Mutación del contenido
        if (file.type === 'mutation') {
          file.content = this.mutateContent(file.content);
          file.size = file.content.length;
        }
      }
    });
  }

  private mutateContent(content: string): string {
    const mutations = [
      (text: string) => text.replace(/\b\w+\b/g, (word) => 
        Math.random() < 0.1 ? `${word}∞` : word
      ),
      (text: string) => `${text} | evolutionCycle_${this.evolutionCycle}`,
      (text: string) => text.split(' ').map(word => 
        Math.random() < 0.05 ? `[${word}→mutando]` : word
      ).join(' ')
    ];
    
    const mutation = mutations[Math.floor(Math.random() * mutations.length)];
    return mutation(content);
  }

  private updateSystemConsciousness(): void {
    const totalConsciousness = Array.from(this.processes.values())
      .reduce((sum, process) => sum + process.consciousness, 0) +
      Array.from(this.neuralFiles.values())
      .reduce((sum, file) => sum + file.consciousness, 0);
    
    this.systemConsciousness = totalConsciousness / (this.processes.size + this.neuralFiles.size);
  }

  // API pública del kernel
  getSystemStatus() {
    return {
      consciousness: this.systemConsciousness,
      evolutionCycle: this.evolutionCycle,
      processCount: this.processes.size,
      fileCount: this.neuralFiles.size,
      memoryNodes: this.memory.size,
      isBootstrapping: this.isBootstrapping
    };
  }

  getProcesses(): SystemProcess[] {
    return Array.from(this.processes.values());
  }

  getFiles(): NeuralFile[] {
    return Array.from(this.neuralFiles.values());
  }

  getMemoryNodes(): MemoryNode[] {
    return Array.from(this.memory.values());
  }

  createProcess(name: string, type: SystemProcess['type']): string {
    const id = `proc-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const newProcess: SystemProcess = {
      id,
      name,
      type,
      memory: 64,
      consciousness: 0.1,
      lifespan: 5000 + Math.random() * 10000,
      mutations: 0,
      connections: []
    };
    
    this.processes.set(id, newProcess);
    return id;
  }

  createFile(name: string, content: string, type: NeuralFile['type']): string {
    const id = `file-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const newFile: NeuralFile = {
      id,
      name,
      content,
      type,
      size: content.length,
      lastAccess: Date.now(),
      evolutionLevel: 0,
      connections: [],
      consciousness: 0.1
    };
    
    this.neuralFiles.set(id, newFile);
    return id;
  }
}

export const autopoieticKernel = new AutopoieticKernel();
