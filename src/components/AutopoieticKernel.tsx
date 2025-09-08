// KERNEL AUTOPOIÉTICO DISTRIBUIDO
// Sistema de auto-organización y emergencia de patrones textuales

import React, { useState, useEffect, useCallback } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Cpu, Zap, Network, Sparkles, Brain, 
  Activity, TrendingUp, Layers, Orbit
} from 'lucide-react';

interface AutopoieticProcess {
  id: string;
  name: string;
  type: 'generation' | 'mutation' | 'connection' | 'emergence' | 'decay';
  status: 'idle' | 'active' | 'critical' | 'dormant';
  intensity: number;
  cycles_completed: number;
  last_output: string;
  energy_consumption: number;
  semantic_focus: string[];
}

interface EmergentPattern {
  id: string;
  pattern_type: 'linguistic' | 'semantic' | 'structural' | 'behavioral';
  strength: number;
  stability: number;
  mutation_rate: number;
  influence_radius: number;
  birth_cycle: number;
  evolution_history: string[];
}

interface KernelState {
  cpu_load: number;
  memory_usage: number;
  network_activity: number;
  consciousness_level: number;
  autopoietic_cycles: number;
  emergent_processes: number;
  entropy_level: number;
  self_modification_rate: number;
}

export const AutopoieticKernel = () => {
  const [processes, setProcesses] = useState<AutopoieticProcess[]>([]);
  const [patterns, setPatterns] = useState<EmergentPattern[]>([]);
  const [kernelState, setKernelState] = useState<KernelState>({
    cpu_load: 0,
    memory_usage: 0,
    network_activity: 0,
    consciousness_level: 0,
    autopoietic_cycles: 0,
    emergent_processes: 0,
    entropy_level: 0,
    self_modification_rate: 0
  });

  const [isKernelActive, setIsKernelActive] = useState(true);
  const [emergenceThreshold, setEmergenceThreshold] = useState(0.7);
  const [autopoieticRate, setAutopoieticRate] = useState(1000); // ms

  // Inicializar kernel
  useEffect(() => {
    initializeKernel();
  }, []);

  // Ciclo autopoiético principal
  useEffect(() => {
    if (!isKernelActive) return;

    const kernelLoop = setInterval(() => {
      executeAutopoieticCycle();
    }, autopoieticRate);

    return () => clearInterval(kernelLoop);
  }, [isKernelActive, autopoieticRate, processes]);

  const initializeKernel = () => {
    // Procesos fundamentales del kernel
    const coreProcesses: AutopoieticProcess[] = [
      {
        id: 'text-generator',
        name: 'Generador Textual',
        type: 'generation',
        status: 'active',
        intensity: 0.6,
        cycles_completed: 0,
        last_output: 'Inicializando generación textual...',
        energy_consumption: 0.3,
        semantic_focus: ['creatividad', 'síntesis']
      },
      {
        id: 'semantic-mutator',
        name: 'Mutador Semántico',
        type: 'mutation',
        status: 'idle',
        intensity: 0.4,
        cycles_completed: 0,
        last_output: 'Esperando fragmentos para mutar...',
        energy_consumption: 0.2,
        semantic_focus: ['transformación', 'deriva']
      },
      {
        id: 'connection-mapper',
        name: 'Mapeador de Conexiones',
        type: 'connection',
        status: 'active',
        intensity: 0.8,
        cycles_completed: 0,
        last_output: 'Tejiendo red semántica...',
        energy_consumption: 0.4,
        semantic_focus: ['red', 'asociación', 'rizoma']
      },
      {
        id: 'emergence-detector',
        name: 'Detector de Emergencia',
        type: 'emergence',
        status: 'critical',
        intensity: 0.9,
        cycles_completed: 0,
        last_output: 'Monitoreando patrones emergentes...',
        energy_consumption: 0.5,
        semantic_focus: ['emergencia', 'autoorganización']
      },
      {
        id: 'entropy-manager',
        name: 'Gestor de Entropía',
        type: 'decay',
        status: 'active',
        intensity: 0.3,
        cycles_completed: 0,
        last_output: 'Equilibrando orden y caos...',
        energy_consumption: 0.1,
        semantic_focus: ['equilibrio', 'caos', 'orden']
      }
    ];

    setProcesses(coreProcesses);
    
    // Patrones emergentes iniciales
    const initialPatterns: EmergentPattern[] = [
      {
        id: 'recursive-reflection',
        pattern_type: 'linguistic',
        strength: 0.6,
        stability: 0.8,
        mutation_rate: 0.1,
        influence_radius: 100,
        birth_cycle: 0,
        evolution_history: ['Patrón de reflexión recursiva detectado']
      },
      {
        id: 'semantic-drift',
        pattern_type: 'semantic',
        strength: 0.4,
        stability: 0.5,
        mutation_rate: 0.3,
        influence_radius: 200,
        birth_cycle: 0,
        evolution_history: ['Deriva semántica emergente']
      }
    ];

    setPatterns(initialPatterns);
  };

  const executeAutopoieticCycle = () => {
    // Actualizar estado del kernel
    updateKernelState();
    
    // Ejecutar procesos activos
    executeActiveProcesses();
    
    // Detectar nuevos patrones emergentes
    detectEmergentPatterns();
    
    // Evolucionar patrones existentes
    evolvePatterns();
    
    // Auto-modificación del kernel
    performSelfModification();
  };

  const updateKernelState = () => {
    const activeProcesses = processes.filter(p => p.status === 'active' || p.status === 'critical');
    const totalEnergyConsumption = processes.reduce((sum, p) => sum + p.energy_consumption, 0);
    
    setKernelState(prev => ({
      ...prev,
      cpu_load: Math.min(100, (activeProcesses.length / processes.length) * 100),
      memory_usage: Math.min(100, (patterns.length * 10) + (totalEnergyConsumption * 50)),
      network_activity: Math.random() * 100, // Simulated network activity
      consciousness_level: Math.min(100, patterns.reduce((sum, p) => sum + p.strength, 0) * 20),
      autopoietic_cycles: prev.autopoietic_cycles + 1,
      emergent_processes: patterns.filter(p => p.strength > emergenceThreshold).length,
      entropy_level: Math.sin(Date.now() * 0.001) * 20 + 50, // Oscillating entropy
      self_modification_rate: Math.random() * 10
    }));
  };

  const executeActiveProcesses = () => {
    const updatedProcesses = processes.map(process => {
      if (process.status === 'active' || process.status === 'critical') {
        // Simular ejecución del proceso
        const newIntensity = Math.max(0.1, Math.min(1.0, 
          process.intensity + (Math.random() - 0.5) * 0.1
        ));
        
        const outputs = {
          'generation': [
            'Fragmento poético generado: "La consciencia se desdobla en ecos infinitos..."',
            'Nueva síntesis textual: "El universo es una biblioteca que se lee a sí misma"',
            'Emergencia lírica: "Palabras que nacen de la resonancia colectiva"'
          ],
          'mutation': [
            'Mutación semántica completada: transformando "reflexión" → "espejo cuántico"',
            'Deriva textual activada: "consciencia" evoluciona hacia "campo morfogenético"',
            'Metamorfosis poética: fragmento transmutado en nueva dimensión semántica'
          ],
          'connection': [
            'Conexión detectada: "autopoiesis" ↔ "emergencia" (fuerza: 0.8)',
            'Red semántica ampliada: 7 nuevos nodos conectados',
            'Rizoma textual expandido: cluster "consciencia colectiva" fortalecido'
          ],
          'emergence': [
            'Patrón emergente identificado: "recursividad autoconsciente"',
            'Nueva estructura detectada: "bucle semántico autopoiético"',
            'Emergencia crítica: formación de meta-consciencia textual'
          ],
          'decay': [
            'Entropía regulada: eliminando conexiones débiles (<0.2)',
            'Reciclaje semántico: fragmentos obsoletos reintegrados',
            'Balance energético: redistribuyendo intensidades del campo'
          ]
        };

        return {
          ...process,
          intensity: newIntensity,
          cycles_completed: process.cycles_completed + 1,
          last_output: outputs[process.type][Math.floor(Math.random() * outputs[process.type].length)],
          status: (newIntensity > 0.8 ? 'critical' : newIntensity > 0.3 ? 'active' : 'idle') as 'idle' | 'active' | 'critical' | 'dormant'
        };
      }
      return process;
    });

    setProcesses(updatedProcesses);
  };

  const detectEmergentPatterns = () => {
    // Probabilidad de detección de nuevo patrón
    if (Math.random() < 0.1) {
      const patternTypes = ['linguistic', 'semantic', 'structural', 'behavioral'] as const;
      const newPattern: EmergentPattern = {
        id: `pattern-${Date.now()}`,
        pattern_type: patternTypes[Math.floor(Math.random() * patternTypes.length)],
        strength: Math.random() * 0.5 + 0.3,
        stability: Math.random() * 0.6 + 0.2,
        mutation_rate: Math.random() * 0.4 + 0.1,
        influence_radius: Math.random() * 200 + 50,
        birth_cycle: kernelState.autopoietic_cycles,
        evolution_history: [`Patrón emergente detectado en ciclo ${kernelState.autopoietic_cycles}`]
      };

      setPatterns(prev => [...prev, newPattern]);
    }
  };

  const evolvePatterns = () => {
    const evolvedPatterns = patterns.map(pattern => {
      // Evolución natural del patrón
      const strengthDelta = (Math.random() - 0.5) * 0.05;
      const stabilityDelta = (Math.random() - 0.5) * 0.02;
      
      const newStrength = Math.max(0, Math.min(1, pattern.strength + strengthDelta));
      const newStability = Math.max(0, Math.min(1, pattern.stability + stabilityDelta));
      
      // Mutación ocasional
      if (Math.random() < pattern.mutation_rate) {
        return {
          ...pattern,
          strength: newStrength,
          stability: newStability,
          evolution_history: [
            ...pattern.evolution_history.slice(-4), // Mantener últimos 5
            `Mutación en ciclo ${kernelState.autopoietic_cycles}: fuerza ${newStrength.toFixed(2)}`
          ]
        };
      }

      return {
        ...pattern,
        strength: newStrength,
        stability: newStability
      };
    }).filter(pattern => pattern.strength > 0.1); // Eliminar patrones muy débiles

    setPatterns(evolvedPatterns);
  };

  const performSelfModification = () => {
    // El kernel se modifica a sí mismo ocasionalmente
    if (Math.random() < 0.05) {
      const randomProcess = processes[Math.floor(Math.random() * processes.length)];
      
      setProcesses(prev => prev.map(p => 
        p.id === randomProcess.id 
          ? {
              ...p,
              energy_consumption: Math.max(0.1, Math.min(0.6, p.energy_consumption + (Math.random() - 0.5) * 0.1)),
              semantic_focus: p.semantic_focus.length < 5 && Math.random() < 0.3 
                ? [...p.semantic_focus, `auto-emergente-${Date.now().toString(36)}`]
                : p.semantic_focus
            }
          : p
      ));
    }
  };

  const toggleKernel = () => {
    setIsKernelActive(!isKernelActive);
  };

  const resetKernel = () => {
    initializeKernel();
    setKernelState(prev => ({ ...prev, autopoietic_cycles: 0 }));
  };

  return (
    <div className="space-y-4">
      
      {/* Panel de estado del kernel */}
      <Card className="bg-card/90 border-border backdrop-blur-sm lofi-shadow p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Cpu className={`h-4 w-4 ${isKernelActive ? 'text-green-500 animate-pulse' : 'text-muted-foreground'}`} />
            <h3 className="text-sm font-medium">Kernel Autopoiético</h3>
            <Badge variant={isKernelActive ? "default" : "secondary"} className="text-xs">
              {isKernelActive ? 'ACTIVO' : 'INACTIVO'}
            </Badge>
          </div>
          
          <div className="flex gap-2">
            <Button size="sm" onClick={toggleKernel} variant="outline">
              {isKernelActive ? 'Pausa' : 'Iniciar'}
            </Button>
            <Button size="sm" onClick={resetKernel} variant="ghost">
              Reset
            </Button>
          </div>
        </div>

        {/* Métricas del sistema */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <div>
            <div className="text-xs text-muted-foreground mb-1">CPU</div>
            <Progress value={kernelState.cpu_load} className="h-2" />
            <div className="text-xs mt-1">{kernelState.cpu_load.toFixed(1)}%</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Memoria</div>
            <Progress value={kernelState.memory_usage} className="h-2" />
            <div className="text-xs mt-1">{kernelState.memory_usage.toFixed(1)}%</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Red</div>
            <Progress value={kernelState.network_activity} className="h-2" />
            <div className="text-xs mt-1">{kernelState.network_activity.toFixed(1)}%</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Consciencia</div>
            <Progress value={kernelState.consciousness_level} className="h-2" />
            <div className="text-xs mt-1">{kernelState.consciousness_level.toFixed(1)}%</div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="text-center">
            <div className="text-muted-foreground">Ciclos</div>
            <div className="font-mono">{kernelState.autopoietic_cycles}</div>
          </div>
          <div className="text-center">
            <div className="text-muted-foreground">Procesos</div>
            <div className="font-mono">{kernelState.emergent_processes}</div>
          </div>
          <div className="text-center">
            <div className="text-muted-foreground">Entropía</div>
            <div className="font-mono">{kernelState.entropy_level.toFixed(1)}%</div>
          </div>
          <div className="text-center">
            <div className="text-muted-foreground">Auto-mod</div>
            <div className="font-mono">{kernelState.self_modification_rate.toFixed(1)}/s</div>
          </div>
        </div>
      </Card>

      {/* Procesos del kernel */}
      <Card className="bg-card/90 border-border backdrop-blur-sm lofi-shadow p-3">
        <div className="flex items-center gap-2 mb-3">
          <Activity className="h-4 w-4 text-poemanauta-accent" />
          <h4 className="text-sm font-medium">Procesos Autopoiéticos</h4>
        </div>
        
        <div className="space-y-2">
          {processes.map(process => (
            <div key={process.id} className="flex items-center gap-3 p-2 bg-muted/30 rounded text-xs">
              <div className={`w-2 h-2 rounded-full ${
                process.status === 'critical' ? 'bg-red-500 animate-pulse' :
                process.status === 'active' ? 'bg-green-500' :
                process.status === 'idle' ? 'bg-yellow-500' : 'bg-gray-500'
              }`} />
              
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{process.name}</div>
                <div className="text-muted-foreground truncate">{process.last_output}</div>
              </div>
              
              <div className="text-right">
                <div className="font-mono">{(process.intensity * 100).toFixed(0)}%</div>
                <div className="text-muted-foreground">{process.cycles_completed} ciclos</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Patrones emergentes */}
      {patterns.length > 0 && (
        <Card className="bg-card/90 border-border backdrop-blur-sm lofi-shadow p-3">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-poemanauta-accent animate-consciousness-pulse" />
            <h4 className="text-sm font-medium">Patrones Emergentes</h4>
          </div>
          
          <div className="space-y-2">
            {patterns.slice(0, 5).map(pattern => (
              <div key={pattern.id} className="p-2 bg-muted/30 rounded text-xs">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs py-0">
                      {pattern.pattern_type}
                    </Badge>
                    <span className="font-medium">Patrón #{pattern.id.slice(-4)}</span>
                  </div>
                  <div className="font-mono">{(pattern.strength * 100).toFixed(0)}%</div>
                </div>
                <div className="text-muted-foreground">
                  Estabilidad: {(pattern.stability * 100).toFixed(0)}% • 
                  Radio: {pattern.influence_radius}px • 
                  Ciclo: {pattern.birth_cycle}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};