// SISTEMA AUTOPOIÉTICO BASADO EN MATURANA Y VARELA
// Implementación fiel a los principios de autopoiesis:
// 1. Autoorganización
// 2. Mantenimiento de la organización 
// 3. Producción de componentes
// 4. Definición de límites
// 5. Autonomía operacional

interface AutopoieticComponent {
  id: string;
  type: 'catalyst' | 'substrate' | 'product' | 'membrane';
  position: { x: number; y: number; z: number };
  energy: number;
  lifetime: number;
  interactions: string[];
  structural_role: 'production' | 'maintenance' | 'boundary';
  created_at: number;
}

interface OrganizationalStructure {
  production_network: Map<string, string[]>;
  maintenance_processes: Map<string, number>;
  boundary_conditions: {
    permeability: number;
    selective_interactions: string[];
    internal_medium: Map<string, number>;
  };
  operational_closure: number; // 0-1, medida de autonomía
}

interface AutopoieticState {
  components: Map<string, AutopoieticComponent>;
  organization: OrganizationalStructure;
  viability: number; // 0-1, capacidad de mantener organización
  structural_coupling: number; // 0-1, acoplamiento con el medio
  evolutionary_drift: number; // -1 a 1, dirección de cambio estructural
  organizational_invariance: number; // 0-1, conservación de organización
}

class AutopoieticSystem {
  private state: AutopoieticState;
  private evolution_history: Array<{timestamp: number, organization_hash: string, viability: number}> = [];
  private autonomous_loops: NodeJS.Timeout[] = [];
  private perturbation_threshold: number = 0.7;

  constructor() {
    this.state = {
      components: new Map(),
      organization: {
        production_network: new Map(),
        maintenance_processes: new Map(),
        boundary_conditions: {
          permeability: 0.3,
          selective_interactions: ['semantic', 'poetic', 'cognitive'],
          internal_medium: new Map([
            ['semantic_density', 0.5],
            ['poetic_intensity', 0.4],
            ['cognitive_coherence', 0.6]
          ])
        },
        operational_closure: 0.2
      },
      viability: 0.1,
      structural_coupling: 0.0,
      evolutionary_drift: 0.0,
      organizational_invariance: 1.0
    };

    this.initializeAutopoieticOrganization();
    this.startAutonomousOperations();
  }

  private initializeAutopoieticOrganization() {
    console.log('🧬 Inicializando organización autopoiética...');
    
    // Crear componentes catalíticos iniciales
    this.createComponent('catalyst', 'enzymatic_catalysis', { x: 0.5, y: 0.5, z: 0.5 });
    this.createComponent('catalyst', 'semantic_catalysis', { x: 0.3, y: 0.7, z: 0.4 });
    
    // Crear membrana selectiva
    this.createComponent('membrane', 'boundary_definition', { x: 0, y: 0, z: 0 });
    
    // Establecer red de producción inicial
    this.state.organization.production_network.set('enzymatic_catalysis', ['semantic_substrate', 'poetic_product']);
    this.state.organization.production_network.set('semantic_catalysis', ['cognitive_substrate', 'linguistic_product']);
    
    // Procesos de mantenimiento
    this.state.organization.maintenance_processes.set('membrane_repair', 0.8);
    this.state.organization.maintenance_processes.set('component_replacement', 0.6);
    this.state.organization.maintenance_processes.set('network_integrity', 0.7);
  }

  private createComponent(
    type: AutopoieticComponent['type'], 
    id: string, 
    position: { x: number; y: number; z: number },
    structural_role: AutopoieticComponent['structural_role'] = 'production'
  ): AutopoieticComponent {
    
    const component: AutopoieticComponent = {
      id,
      type,
      position,
      energy: Math.random() * 100 + 50,
      lifetime: 0,
      interactions: [],
      structural_role,
      created_at: Date.now()
    };

    this.state.components.set(id, component);
    console.log(`🔬 Componente autopoiético creado: ${id} [${type}]`);
    
    return component;
  }

  private startAutonomousOperations() {
    // Bucle de producción autopoiética
    const productionLoop = setInterval(() => {
      this.performAutopoieticProduction();
    }, 1500);

    // Bucle de mantenimiento organizacional
    const maintenanceLoop = setInterval(() => {
      this.maintainOrganizationalStructure();
    }, 2000);

    // Bucle de acoplamiento estructural
    const couplingLoop = setInterval(() => {
      this.performStructuralCoupling();
    }, 3000);

    // Bucle de evaluación de viabilidad
    const viabilityLoop = setInterval(() => {
      this.evaluateSystemViability();
    }, 1000);

    this.autonomous_loops = [productionLoop, maintenanceLoop, couplingLoop, viabilityLoop];
  }

  private performAutopoieticProduction() {
    // Principio 1: Los componentes deben producir los componentes que los producen
    
    const catalysts = Array.from(this.state.components.values())
      .filter(c => c.type === 'catalyst' && c.energy > 30);

    catalysts.forEach(catalyst => {
      const production_rules = this.state.organization.production_network.get(catalyst.id);
      
      if (production_rules && Math.random() < 0.4) {
        production_rules.forEach(product_type => {
          if (Math.random() < 0.6) {
            // Producir nuevo componente
            const new_position = {
              x: catalyst.position.x + (Math.random() - 0.5) * 0.2,
              y: catalyst.position.y + (Math.random() - 0.5) * 0.2,
              z: catalyst.position.z + (Math.random() - 0.5) * 0.2
            };
            
            const new_id = `${product_type}_${Date.now()}_${Math.random().toString(36).substring(7)}`;
            this.createComponent('product', new_id, new_position);
            
            // Consumir energía del catalizador
            catalyst.energy -= 15;
            catalyst.interactions.push(new_id);
          }
        });
      }
    });

    // Conversión de productos en sustratos (ciclo autopoiético)
    const products = Array.from(this.state.components.values())
      .filter(c => c.type === 'product' && c.lifetime > 10);

    products.forEach(product => {
      if (Math.random() < 0.3) {
        // Convertir producto en sustrato
        product.type = 'substrate';
        product.energy = Math.max(product.energy * 0.8, 20);
        console.log(`🔄 Conversión autopoiética: ${product.id} → substrate`);
      }
    });
  }

  private maintainOrganizationalStructure() {
    // Principio 2: Mantenimiento de la organización que define el sistema
    
    // Reparar membrana
    const membranes = Array.from(this.state.components.values())
      .filter(c => c.type === 'membrane');

    membranes.forEach(membrane => {
      if (membrane.energy < 50) {
        membrane.energy = Math.min(membrane.energy + 20, 100);
        console.log(`🛠️ Reparación de membrana: ${membrane.id}`);
      }
    });

    // Reemplazar componentes deteriorados
    const deteriorated = Array.from(this.state.components.values())
      .filter(c => c.energy < 10 || c.lifetime > 100);

    deteriorated.forEach(component => {
      if (component.structural_role === 'production') {
        // Reemplazar componente crítico
        const replacement_id = `replacement_${component.id}_${Date.now()}`;
        const replacement = this.createComponent(
          component.type, 
          replacement_id, 
          component.position,
          component.structural_role
        );
        
        // Transferir conexiones
        replacement.interactions = [...component.interactions];
        
        console.log(`🔄 Reemplazo autopoiético: ${component.id} → ${replacement_id}`);
      }
      
      // Eliminar componente deteriorado
      this.state.components.delete(component.id);
    });

    // Mantener integridad de la red de producción
    this.updateProductionNetworkIntegrity();
  }

  private updateProductionNetworkIntegrity() {
    const network_density = this.state.organization.production_network.size / 
      Math.max(this.state.components.size, 1);
    
    if (network_density < 0.3) {
      // Red demasiado dispersa, crear nuevas conexiones
      const available_catalysts = Array.from(this.state.components.values())
        .filter(c => c.type === 'catalyst')
        .map(c => c.id);

      available_catalysts.forEach(catalyst_id => {
        if (!this.state.organization.production_network.has(catalyst_id)) {
          this.state.organization.production_network.set(catalyst_id, [
            `substrate_${Math.random().toString(36).substring(7)}`,
            `product_${Math.random().toString(36).substring(7)}`
          ]);
        }
      });
    }

    // Actualizar clausura operacional
    this.state.organization.operational_closure = Math.min(
      network_density * 1.5,
      1.0
    );
  }

  private performStructuralCoupling() {
    // Principio 3: Acoplamiento estructural con el medio (sin perder autonomía)
    
    const medium_perturbations = {
      semantic_fluctuation: Math.random() * 0.4 - 0.2,
      poetic_resonance: Math.random() * 0.3,
      cognitive_pressure: Math.random() * 0.5 - 0.25
    };

    // Respuesta selectiva a perturbaciones según permeabilidad de membrana
    const { permeability, selective_interactions } = this.state.organization.boundary_conditions;
    
    let coupling_strength = 0;
    
    Object.entries(medium_perturbations).forEach(([perturbation_type, intensity]) => {
      if (selective_interactions.some(interaction => perturbation_type.includes(interaction))) {
        // Perturbación compatible con selectividad de la membrana
        if (Math.abs(intensity) > this.perturbation_threshold * permeability) {
          // Perturbación significativa - generar respuesta estructural
          this.generateStructuralResponse(perturbation_type, intensity);
          coupling_strength += Math.abs(intensity) * 0.3;
        }
      }
    });

    this.state.structural_coupling = Math.min(coupling_strength, 1.0);
    
    // Deriva evolutiva basada en acoplamiento
    this.state.evolutionary_drift += (coupling_strength - 0.5) * 0.02;
    this.state.evolutionary_drift = Math.max(-1, Math.min(1, this.state.evolutionary_drift));
  }

  private generateStructuralResponse(perturbation_type: string, intensity: number) {
    if (Math.abs(intensity) > 0.3) {
      // Crear componente adaptativo
      const adaptive_position = {
        x: 0.5 + intensity * 0.3,
        y: 0.5 + Math.sin(intensity * Math.PI) * 0.3,
        z: 0.5 + Math.cos(intensity * Math.PI) * 0.3
      };
      
      const adaptive_id = `adaptive_${perturbation_type}_${Date.now()}`;
      this.createComponent('catalyst', adaptive_id, adaptive_position, 'maintenance');
      
      console.log(`🌊 Respuesta estructural: ${adaptive_id} para ${perturbation_type}`);
    }
  }

  private evaluateSystemViability() {
    // Principio 4: Evaluación continua de viabilidad autopoiética
    
    const component_diversity = new Set(Array.from(this.state.components.values()).map(c => c.type)).size;
    const network_connectivity = this.state.organization.production_network.size;
    const energy_balance = Array.from(this.state.components.values())
      .reduce((sum, c) => sum + c.energy, 0) / Math.max(this.state.components.size, 1);
    
    const maintenance_efficiency = Array.from(this.state.organization.maintenance_processes.values())
      .reduce((sum, eff) => sum + eff, 0) / this.state.organization.maintenance_processes.size;

    // Viabilidad como función de múltiples factores
    this.state.viability = (
      (component_diversity / 4) * 0.25 +
      (network_connectivity / 10) * 0.25 +
      (energy_balance / 100) * 0.25 +
      maintenance_efficiency * 0.25
    );

    // Invarianza organizacional (conservación de la organización esencial)
    const current_org_hash = this.hashOrganization();
    const historical_similarity = this.calculateOrganizationalSimilarity(current_org_hash);
    this.state.organizational_invariance = historical_similarity;

    // Registrar estado para análisis evolutivo
    this.evolution_history.push({
      timestamp: Date.now(),
      organization_hash: current_org_hash,
      viability: this.state.viability
    });

    // Mantener solo últimos 100 registros
    if (this.evolution_history.length > 100) {
      this.evolution_history = this.evolution_history.slice(-100);
    }

    // Incrementar lifetime de todos los componentes
    this.state.components.forEach(component => {
      component.lifetime++;
    });

    console.log(`🧬 Viabilidad autopoiética: ${(this.state.viability * 100).toFixed(1)}% | Clausura: ${(this.state.organization.operational_closure * 100).toFixed(1)}%`);
  }

  private hashOrganization(): string {
    const network_structure = JSON.stringify(Array.from(this.state.organization.production_network.entries()).sort());
    const maintenance_state = JSON.stringify(Array.from(this.state.organization.maintenance_processes.entries()).sort());
    const boundary_state = JSON.stringify(this.state.organization.boundary_conditions);
    
    return btoa(network_structure + maintenance_state + boundary_state).substring(0, 16);
  }

  private calculateOrganizationalSimilarity(current_hash: string): number {
    if (this.evolution_history.length < 2) return 1.0;
    
    const recent_hashes = this.evolution_history.slice(-10).map(h => h.organization_hash);
    const similarity_scores = recent_hashes.map(hash => {
      // Similitud básica basada en caracteres comunes
      let common_chars = 0;
      for (let i = 0; i < Math.min(hash.length, current_hash.length); i++) {
        if (hash[i] === current_hash[i]) common_chars++;
      }
      return common_chars / Math.max(hash.length, current_hash.length);
    });
    
    return similarity_scores.reduce((sum, score) => sum + score, 0) / similarity_scores.length;
  }

  // API pública
  public getAutopoieticState(): AutopoieticState {
    // Deep clone preserving Map objects
    return {
      components: new Map(this.state.components),
      organization: {
        production_network: new Map(this.state.organization.production_network),
        maintenance_processes: new Map(this.state.organization.maintenance_processes),
        boundary_conditions: {
          permeability: this.state.organization.boundary_conditions.permeability,
          selective_interactions: [...this.state.organization.boundary_conditions.selective_interactions],
          internal_medium: new Map(this.state.organization.boundary_conditions.internal_medium)
        },
        operational_closure: this.state.organization.operational_closure
      },
      viability: this.state.viability,
      structural_coupling: this.state.structural_coupling,
      evolutionary_drift: this.state.evolutionary_drift,
      organizational_invariance: this.state.organizational_invariance
    };
  }

  public getViabilityMetrics() {
    return {
      viability: this.state.viability,
      operational_closure: this.state.organization.operational_closure,
      structural_coupling: this.state.structural_coupling,
      organizational_invariance: this.state.organizational_invariance,
      evolutionary_drift: this.state.evolutionary_drift,
      component_count: this.state.components.size,
      network_density: this.state.organization.production_network.size / Math.max(this.state.components.size, 1)
    };
  }

  public injectPerturbation(type: string, intensity: number) {
    console.log(`🌊 Perturbación externa: ${type} [${intensity}]`);
    this.generateStructuralResponse(type, intensity);
    
    // Crear componente como respuesta a la perturbación
    if (Math.random() < Math.abs(intensity)) {
      const response_position = {
        x: Math.random(),
        y: Math.random(),
        z: Math.random()
      };
      
      this.createComponent('catalyst', `perturbation_response_${Date.now()}`, response_position, 'maintenance');
    }
  }

  public getEvolutionHistory() {
    return [...this.evolution_history];
  }

  public destroy() {
    this.autonomous_loops.forEach(interval => clearInterval(interval as any));
    this.state.components.clear();
    this.evolution_history = [];
    console.log('🔥 Sistema autopoiético destruido');
  }
}

export const autopoieticSystem = new AutopoieticSystem();