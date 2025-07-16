/**
 * Servicio de Validación Empírica Autopoiética
 * 
 * Implementa métodos de validación científica basados en:
 * - Criterios de Maturana y Varela para sistemas autopoiéticos
 * - Métricas cuantificables de autoorganización
 * - Indicadores de clausura operacional
 * - Observadores de acoplamiento estructural
 */

export interface ValidationCriteria {
  organizationalClosure: {
    threshold: number;
    measured: number;
    isValid: boolean;
  };
  structuralCoupling: {
    threshold: number;
    measured: number;
    isValid: boolean;
  };
  autonomy: {
    threshold: number;
    measured: number;
    isValid: boolean;
  };
  emergence: {
    threshold: number;
    measured: number;
    isValid: boolean;
  };
}

export interface EmpiricalEvidence {
  timestamp: number;
  observedPhenomena: string[];
  measurements: {
    [key: string]: number;
  };
  validationScore: number;
  confidence: number;
}

class AutopoieticValidationService {
  private validationHistory: EmpiricalEvidence[] = [];
  private criticalThresholds = {
    organizationalClosure: 0.3,
    structuralCoupling: 0.25,
    autonomy: 0.4,
    emergence: 0.2
  };

  /**
   * Valida si un sistema exhibe propiedades autopoiéticas empíricamente verificables
   */
  public validateAutopoieticSystem(
    components: any[], 
    networkState: any
  ): ValidationCriteria {
    const organizationalClosure = this.measureOrganizationalClosure(components, networkState);
    const structuralCoupling = this.measureStructuralCoupling(components, networkState);
    const autonomy = this.measureSystemAutonomy(components, networkState);
    const emergence = this.measureEmergentProperties(components, networkState);

    return {
      organizationalClosure: {
        threshold: this.criticalThresholds.organizationalClosure,
        measured: organizationalClosure,
        isValid: organizationalClosure >= this.criticalThresholds.organizationalClosure
      },
      structuralCoupling: {
        threshold: this.criticalThresholds.structuralCoupling,
        measured: structuralCoupling,
        isValid: structuralCoupling >= this.criticalThresholds.structuralCoupling
      },
      autonomy: {
        threshold: this.criticalThresholds.autonomy,
        measured: autonomy,
        isValid: autonomy >= this.criticalThresholds.autonomy
      },
      emergence: {
        threshold: this.criticalThresholds.emergence,
        measured: emergence,
        isValid: emergence >= this.criticalThresholds.emergence
      }
    };
  }

  /**
   * Mide la clausura organizacional según criterios de Maturana-Varela
   */
  private measureOrganizationalClosure(components: any[], networkState: any): number {
    if (components.length === 0) return 0;

    // Criterio 1: Auto-producción de componentes
    const selfProducingRatio = components.filter(c => 
      c.replication > 0.5 && c.metabolism > 0.4
    ).length / components.length;

    // Criterio 2: Mantenimiento de organización
    const organizationalConsistency = components.reduce((acc, c) => 
      acc + c.organization, 0) / components.length;

    // Criterio 3: Definición de límites sistémicos
    const boundaryDefinition = this.calculateBoundaryCoherence(components);

    // Criterio 4: Recursividad operacional
    const operationalRecursion = this.measureOperationalRecursion(networkState);

    return (selfProducingRatio + organizationalConsistency + boundaryDefinition + operationalRecursion) / 4;
  }

  /**
   * Mide el acoplamiento estructural con el entorno
   */
  private measureStructuralCoupling(components: any[], networkState: any): number {
    // Criterio 1: Respuesta a perturbaciones sin pérdida de identidad
    const perturbationStability = components.reduce((acc, c) => 
      acc + (c.structuralStability || 0.5), 0) / components.length;

    // Criterio 2: Adaptación estructural conservando organización
    const adaptiveCapacity = components.reduce((acc, c) => 
      acc + c.adaptation, 0) / components.length;

    // Criterio 3: Selectividad en las interacciones
    const interactionSelectivity = this.calculateInteractionSelectivity(components);

    // Criterio 4: Compensación homeostática
    const homeostaticBalance = this.measureHomeostaticBalance(networkState);

    return (perturbationStability + adaptiveCapacity + interactionSelectivity + homeostaticBalance) / 4;
  }

  /**
   * Mide la autonomía operacional del sistema
   */
  private measureSystemAutonomy(components: any[], networkState: any): number {
    // Criterio 1: Auto-determinación de estados
    const selfDetermination = components.reduce((acc, c) => 
      acc + (c.autonomyLevel || 0.3), 0) / components.length;

    // Criterio 2: Independencia de control externo
    const externalIndependence = this.calculateExternalIndependence(networkState);

    // Criterio 3: Capacidad de auto-modificación
    const selfModificationCapacity = networkState.creativityIndex || 0;

    // Criterio 4: Generación interna de variabilidad
    const internalVariability = this.calculateInternalVariability(components);

    return (selfDetermination + externalIndependence + selfModificationCapacity + internalVariability) / 4;
  }

  /**
   * Mide propiedades emergentes verificables
   */
  private measureEmergentProperties(components: any[], networkState: any): number {
    // Criterio 1: Propiedades no reducibles a componentes
    const nonReducibleProperties = this.identifyNonReducibleProperties(components, networkState);

    // Criterio 2: Coherencia sistémica global
    const systemicCoherence = networkState.coherenceIndex || 0;

    // Criterio 3: Capacidades colectivas nuevas
    const collectiveCapabilities = this.measureCollectiveCapabilities(components);

    // Criterio 4: Efectos sinérgicos observables
    const synergeticEffects = this.calculateSynergeticEffects(components, networkState);

    return (nonReducibleProperties + systemicCoherence + collectiveCapabilities + synergeticEffects) / 4;
  }

  /**
   * Genera evidencia empírica de fenómenos autopoiéticos
   */
  public generateEmpiricalEvidence(
    components: any[], 
    networkState: any
  ): EmpiricalEvidence {
    const validation = this.validateAutopoieticSystem(components, networkState);
    const observedPhenomena: string[] = [];

    // Identificar fenómenos observables
    if (validation.organizationalClosure.isValid) {
      observedPhenomena.push('clausura_organizacional_verificada');
    }
    if (validation.structuralCoupling.isValid) {
      observedPhenomena.push('acoplamiento_estructural_observable');
    }
    if (validation.autonomy.isValid) {
      observedPhenomena.push('autonomía_operacional_confirmada');
    }
    if (validation.emergence.isValid) {
      observedPhenomena.push('emergencia_sistémica_detectada');
    }

    // Detectar patrones específicos
    if (components.some(c => c.generation > 50)) {
      observedPhenomena.push('evolución_transgeneracional');
    }
    if (networkState.creativityIndex > 0.8) {
      observedPhenomena.push('creatividad_emergente_intensa');
    }
    if (components.length > 6) {
      observedPhenomena.push('complejidad_sistémica_aumentada');
    }

    const measurements = {
      clausura_organizacional: validation.organizationalClosure.measured,
      acoplamiento_estructural: validation.structuralCoupling.measured,
      autonomía_operacional: validation.autonomy.measured,
      emergencia_sistémica: validation.emergence.measured,
      componentes_activos: components.length,
      creatividad_índice: networkState.creativityIndex || 0,
      generación_máxima: Math.max(...components.map(c => c.generation))
    };

    const validationScore = Object.values(validation).reduce((acc, criterion) => 
      acc + (criterion.isValid ? 1 : 0), 0) / 4;

    const confidence = this.calculateConfidenceLevel(validation, observedPhenomena.length);

    const evidence: EmpiricalEvidence = {
      timestamp: Date.now(),
      observedPhenomena,
      measurements,
      validationScore,
      confidence
    };

    this.validationHistory.push(evidence);
    
    // Mantener historial limitado
    if (this.validationHistory.length > 100) {
      this.validationHistory = this.validationHistory.slice(-100);
    }

    return evidence;
  }

  // Métodos auxiliares para cálculos específicos
  private calculateBoundaryCoherence(components: any[]): number {
    const typeDistribution = new Map();
    components.forEach(c => {
      typeDistribution.set(c.type, (typeDistribution.get(c.type) || 0) + 1);
    });
    return Math.min(1, typeDistribution.size / 4); // Diversidad óptima
  }

  private measureOperationalRecursion(networkState: any): number {
    return Math.min(1, (networkState.evolutionaryStage || 1) / 10);
  }

  private calculateInteractionSelectivity(components: any[]): number {
    return components.reduce((acc, c) => 
      acc + (c.cognitiveResonance || 0.3), 0) / components.length;
  }

  private measureHomeostaticBalance(networkState: any): number {
    return Math.min(1, (networkState.resilience || 0.5));
  }

  private calculateExternalIndependence(networkState: any): number {
    return Math.max(0, 1 - (networkState.environmentalCoupling || 0.5));
  }

  private calculateInternalVariability(components: any[]): number {
    if (components.length < 2) return 0;
    const fitnessValues = components.map(c => 
      (c.metabolism + c.replication + c.adaptation + c.organization) / 4
    );
    const mean = fitnessValues.reduce((a, b) => a + b, 0) / fitnessValues.length;
    const variance = fitnessValues.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / fitnessValues.length;
    return Math.min(1, variance * 4); // Normalizado
  }

  private identifyNonReducibleProperties(components: any[], networkState: any): number {
    const individualSum = components.reduce((acc, c) => acc + c.cognitiveResonance, 0);
    const collectiveResonance = networkState.creativityIndex || 0;
    return Math.max(0, collectiveResonance - (individualSum / components.length));
  }

  private measureCollectiveCapabilities(components: any[]): number {
    const avgIndividualCapability = components.reduce((acc, c) => 
      acc + (c.viabilityIndex || 0.5), 0) / components.length;
    const networkEffect = Math.log(components.length + 1) / Math.log(10); // Efecto de red
    return Math.min(1, avgIndividualCapability * networkEffect);
  }

  private calculateSynergeticEffects(components: any[], networkState: any): number {
    const componentComplexity = components.length / 10;
    const organizationalSynergy = networkState.organizationalClosure || 0;
    return Math.min(1, componentComplexity * organizationalSynergy);
  }

  private calculateConfidenceLevel(validation: ValidationCriteria, phenomenaCount: number): number {
    const validCriteria = Object.values(validation).filter(c => c.isValid).length;
    const criteriaConfidence = validCriteria / 4;
    const phenomenaConfidence = Math.min(1, phenomenaCount / 5);
    return (criteriaConfidence + phenomenaConfidence) / 2;
  }

  // API pública
  public getValidationHistory(): EmpiricalEvidence[] {
    return this.validationHistory.slice(-20);
  }

  public getCurrentValidationStatus(components: any[], networkState: any): {
    isAutopoietic: boolean;
    confidence: number;
    criteria: ValidationCriteria;
    evidence: EmpiricalEvidence;
  } {
    const criteria = this.validateAutopoieticSystem(components, networkState);
    const evidence = this.generateEmpiricalEvidence(components, networkState);
    
    const validCriteria = Object.values(criteria).filter(c => c.isValid).length;
    const isAutopoietic = validCriteria >= 3; // Mínimo 3 de 4 criterios

    return {
      isAutopoietic,
      confidence: evidence.confidence,
      criteria,
      evidence
    };
  }

  public getSystemHealthMetrics(components: any[], networkState: any): {
    viability: number;
    resilience: number;
    adaptability: number;
    coherence: number;
    overall: number;
  } {
    const viability = components.reduce((acc, c) => acc + (c.viabilityIndex || 0.5), 0) / components.length;
    const resilience = networkState.resilience || 0.5;
    const adaptability = components.reduce((acc, c) => acc + c.adaptation, 0) / components.length;
    const coherence = networkState.coherenceIndex || 0;
    const overall = (viability + resilience + adaptability + coherence) / 4;

    return {
      viability,
      resilience,
      adaptability,
      coherence,
      overall
    };
  }
}

export const autopoieticValidationService = new AutopoieticValidationService();