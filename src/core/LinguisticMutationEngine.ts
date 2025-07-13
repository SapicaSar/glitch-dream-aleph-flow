
interface LinguisticMutation {
  id: string;
  originalWord: string;
  mutatedForm: string;
  mutationType: 'phonetic' | 'semantic' | 'syntactic' | 'neologistic' | 'quantum';
  intensity: number;
  timestamp: number;
  generation: number;
  parentMutations: string[];
  cognitiveResonance: number;
}

interface QuantumWord {
  baseForm: string;
  superpositions: string[];
  collapseProbability: number;
  entangledWith: string[];
  semanticField: number[];
}

interface SyntacticExperiment {
  id: string;
  originalStructure: string;
  mutatedStructure: string;
  comprehensibilityIndex: number;
  poeticPotential: number;
  emergentMeaning: string;
}

class LinguisticMutationEngine {
  private mutations = new Map<string, LinguisticMutation>();
  private quantumWords = new Map<string, QuantumWord>();
  private syntacticExperiments: SyntacticExperiment[] = [];
  private generationCount = 0;
  private mutationRate = 0.3;
  private creativityIndex = 0;

  private phonemeMap = new Map([
    ['a', ['∀', 'ä', 'α', '∞a']], ['e', ['∃', 'ë', 'ε', '∞e']], 
    ['i', ['ï', 'ι', '∞i', '¡']], ['o', ['ø', 'ω', '∞o', '◯']], 
    ['u', ['ü', 'υ', '∞u', '∪']], ['r', ['ʀ', 'ρ', '®', '∞r']], 
    ['s', ['ς', 'σ', '∞s', '§']], ['t', ['τ', '†', '∞t', '⊥']], 
    ['n', ['η', 'ñ', '∞n', '∩']], ['l', ['λ', 'ł', '∞l', '∟']]
  ]);

  private semanticFields = [
    'temporal_dissolution', 'spatial_folding', 'consciousness_emergence',
    'void_speaking', 'light_grammar', 'silence_syntax', 'quantum_poetry',
    'dream_logic', 'infinite_recursion', 'algorithmic_breath'
  ];

  constructor() {
    this.initializeQuantumLexicon();
    this.startContinuousEvolution();
  }

  private initializeQuantumLexicon() {
    const seedWords = [
      'ser', 'existir', 'pensar', 'sentir', 'respirar', 'tiempo', 'espacio',
      'alma', 'cuerpo', 'luz', 'sombra', 'agua', 'fuego', 'tierra', 'aire',
      'palabra', 'silencio', 'vacío', 'infinito', 'momento', 'eternidad'
    ];

    seedWords.forEach(word => {
      this.quantumWords.set(word, {
        baseForm: word,
        superpositions: this.generateSuperpositions(word),
        collapseProbability: Math.random(),
        entangledWith: [],
        semanticField: this.generateSemanticField()
      });
    });
  }

  private generateSuperpositions(word: string): string[] {
    const superpositions: string[] = [];
    
    // Mutación fonética cuántica
    let phoneticMutation = word;
    for (const [original, mutations] of this.phonemeMap) {
      if (word.includes(original)) {
        mutations.forEach(mutation => {
          superpositions.push(phoneticMutation.replace(new RegExp(original, 'g'), mutation));
        });
      }
    }

    // Mutación semántica inversa
    const reversedWord = word.split('').reverse().join('');
    superpositions.push(reversedWord);
    superpositions.push(`${word}∞${reversedWord}`);

    // Mutación dimensional
    superpositions.push(`${word}_${this.generationCount}d`);
    superpositions.push(`∇${word}`);
    superpositions.push(`${word}⚡${Math.random().toString(36).substring(2, 5)}`);

    return superpositions.slice(0, 8);
  }

  private generateSemanticField(): number[] {
    return Array.from({ length: 50 }, () => Math.random() * 2 - 1);
  }

  private startContinuousEvolution() {
    setInterval(() => {
      this.performQuantumMutation();
      this.experimentWithSyntax();
      this.evolveLanguageStructure();
      this.generationCount++;
    }, 2000);
  }

  private performQuantumMutation() {
    const words = Array.from(this.quantumWords.keys());
    const selectedWord = words[Math.floor(Math.random() * words.length)];
    const quantumWord = this.quantumWords.get(selectedWord);

    if (quantumWord && Math.random() < this.mutationRate) {
      // Colapsar superposición
      const collapsedForm = quantumWord.superpositions[
        Math.floor(Math.random() * quantumWord.superpositions.length)
      ];

      const mutation: LinguisticMutation = {
        id: `mut_${Date.now()}_${Math.random().toString(36).substring(7)}`,
        originalWord: selectedWord,
        mutatedForm: collapsedForm,
        mutationType: this.selectMutationType(),
        intensity: Math.random(),
        timestamp: Date.now(),
        generation: this.generationCount,
        parentMutations: [],
        cognitiveResonance: this.calculateCognitiveResonance(selectedWord, collapsedForm)
      };

      this.mutations.set(mutation.id, mutation);

      // Crear nueva palabra cuántica basada en la mutación
      if (mutation.cognitiveResonance > 0.7) {
        this.quantumWords.set(collapsedForm, {
          baseForm: collapsedForm,
          superpositions: this.generateSuperpositions(collapsedForm),
          collapseProbability: Math.random(),
          entangledWith: [selectedWord],
          semanticField: this.blendSemanticFields(quantumWord.semanticField)
        });
      }
    }
  }

  private selectMutationType(): LinguisticMutation['mutationType'] {
    const types: LinguisticMutation['mutationType'][] = 
      ['phonetic', 'semantic', 'syntactic', 'neologistic', 'quantum'];
    return types[Math.floor(Math.random() * types.length)];
  }

  private calculateCognitiveResonance(original: string, mutated: string): number {
    const lengthFactor = Math.abs(original.length - mutated.length) / Math.max(original.length, mutated.length);
    const phoneticDistance = this.calculatePhoneticDistance(original, mutated);
    const semanticNovelty = this.assessSemanticNovelty(mutated);
    
    return (1 - lengthFactor * 0.3) * (1 - phoneticDistance * 0.4) * semanticNovelty;
  }

  private calculatePhoneticDistance(word1: string, word2: string): number {
    const maxLength = Math.max(word1.length, word2.length);
    let distance = 0;
    
    for (let i = 0; i < maxLength; i++) {
      if (word1[i] !== word2[i]) distance++;
    }
    
    return distance / maxLength;
  }

  private assessSemanticNovelty(word: string): number {
    const existingWords = Array.from(this.quantumWords.keys());
    const similarities = existingWords.map(existing => 
      1 - this.calculatePhoneticDistance(word, existing)
    );
    
    const maxSimilarity = Math.max(...similarities);
    return 1 - maxSimilarity;
  }

  private blendSemanticFields(field1: number[]): number[] {
    return field1.map(val => val + (Math.random() - 0.5) * 0.2);
  }

  private experimentWithSyntax() {
    const structures = [
      'sujeto verbo objeto',
      'objeto sujeto verbo',
      'verbo objeto sujeto',
      'sujeto_objeto verbo_tiempo',
      'verbo∞sujeto objeto_void',
      '∇(sujeto + verbo) × objeto',
      'sujeto ⚡ verbo ⚡ objeto',
      'objeto → sujeto ← verbo'
    ];

    const originalStructure = structures[Math.floor(Math.random() * 3)]; // estructuras normales
    const mutatedStructure = structures[Math.floor(Math.random() * structures.length)];

    if (originalStructure !== mutatedStructure) {
      const experiment: SyntacticExperiment = {
        id: `syntax_${Date.now()}`,
        originalStructure,
        mutatedStructure,
        comprehensibilityIndex: this.assessComprehensibility(mutatedStructure),
        poeticPotential: this.assessPoeticPotential(mutatedStructure),
        emergentMeaning: this.generateEmergentMeaning(mutatedStructure)
      };

      this.syntacticExperiments.push(experiment);
      
      if (this.syntacticExperiments.length > 20) {
        this.syntacticExperiments = this.syntacticExperiments.slice(-20);
      }
    }
  }

  private assessComprehensibility(structure: string): number {
    const normalPatterns = ['sujeto verbo objeto', 'sujeto verbo', 'verbo objeto'];
    const isNormal = normalPatterns.some(pattern => structure.includes(pattern));
    const complexityPenalty = (structure.match(/[∞∇⚡→←×+]/g) || []).length * 0.15;
    
    return isNormal ? Math.max(0, 1 - complexityPenalty) : Math.max(0.1, 0.5 - complexityPenalty);
  }

  private assessPoeticPotential(structure: string): number {
    const poeticMarkers = ['∞', '∇', '⚡', '→', '←', '×', '_void', '_tiempo'];
    const poeticScore = poeticMarkers.reduce((score, marker) => 
      score + (structure.includes(marker) ? 0.15 : 0), 0
    );
    
    const symmetryBonus = this.detectSymmetry(structure) ? 0.2 : 0;
    return Math.min(1, poeticScore + symmetryBonus);
  }

  private detectSymmetry(structure: string): boolean {
    const cleaned = structure.replace(/[∞∇⚡→←×+_]/g, '');
    const words = cleaned.split(' ');
    return words.length >= 3 && words[0] === words[words.length - 1];
  }

  private generateEmergentMeaning(structure: string): string {
    const meanings = [
      'temporalidad fracturada donde el futuro precede al presente',
      'espacialidad curvada que permite al objeto contener al sujeto',
      'causalidad invertida donde el efecto genera su propia causa',
      'consciencia distribuida entre múltiples dimensiones sintácticas',
      'realidad donde las palabras crean a quien las pronuncia',
      'bucle autopoiético de significado que se reescribe constantemente'
    ];
    
    return meanings[Math.floor(Math.random() * meanings.length)];
  }

  private evolveLanguageStructure() {
    this.creativityIndex = this.calculateCreativityIndex();
    this.mutationRate = Math.min(0.8, this.mutationRate + (this.creativityIndex - 0.5) * 0.01);
    
    if (this.generationCount % 50 === 0) {
      this.performMajorEvolution();
    }
  }

  private calculateCreativityIndex(): number {
    const uniqueMutations = new Set(Array.from(this.mutations.values()).map(m => m.mutatedForm));
    const avgCognitiveResonance = Array.from(this.mutations.values())
      .reduce((sum, m) => sum + m.cognitiveResonance, 0) / this.mutations.size;
    const syntacticInnovation = this.syntacticExperiments
      .reduce((sum, exp) => sum + exp.poeticPotential, 0) / Math.max(1, this.syntacticExperiments.length);
    
    return (uniqueMutations.size / Math.max(1, this.mutations.size)) * 0.4 + 
           avgCognitiveResonance * 0.3 + 
           syntacticInnovation * 0.3;
  }

  private performMajorEvolution() {
    console.log(`🧬 EVOLUCIÓN MAYOR: Generación ${this.generationCount}, Creatividad: ${(this.creativityIndex * 100).toFixed(1)}%`);
    
    // Hibridación cuántica de palabras exitosas
    const successfulMutations = Array.from(this.mutations.values())
      .filter(m => m.cognitiveResonance > 0.8);
    
    if (successfulMutations.length >= 2) {
      const hybrid = this.createQuantumHybrid(successfulMutations);
      if (hybrid) {
        this.quantumWords.set(hybrid.baseForm, hybrid);
      }
    }
    
    // Purgar mutaciones menos exitosas
    const sortedMutations = Array.from(this.mutations.entries())
      .sort(([,a], [,b]) => b.cognitiveResonance - a.cognitiveResonance);
    
    this.mutations.clear();
    sortedMutations.slice(0, 100).forEach(([id, mutation]) => {
      this.mutations.set(id, mutation);
    });
  }

  private createQuantumHybrid(mutations: LinguisticMutation[]): QuantumWord | null {
    const parent1 = mutations[Math.floor(Math.random() * mutations.length)];
    const parent2 = mutations[Math.floor(Math.random() * mutations.length)];
    
    if (parent1.id === parent2.id) return null;
    
    const hybridForm = this.blendWords(parent1.mutatedForm, parent2.mutatedForm);
    
    return {
      baseForm: hybridForm,
      superpositions: this.generateSuperpositions(hybridForm),
      collapseProbability: (parent1.intensity + parent2.intensity) / 2,
      entangledWith: [parent1.mutatedForm, parent2.mutatedForm],
      semanticField: this.hybridizeSemanticFields(
        this.quantumWords.get(parent1.originalWord)?.semanticField || [],
        this.quantumWords.get(parent2.originalWord)?.semanticField || []
      )
    };
  }

  private blendWords(word1: string, word2: string): string {
    const mid1 = Math.floor(word1.length / 2);
    const mid2 = Math.floor(word2.length / 2);
    
    return word1.slice(0, mid1) + '∞' + word2.slice(mid2);
  }

  private hybridizeSemanticFields(field1: number[], field2: number[]): number[] {
    const maxLength = Math.max(field1.length, field2.length);
    const hybrid: number[] = [];
    
    for (let i = 0; i < maxLength; i++) {
      const val1 = field1[i] || 0;
      const val2 = field2[i] || 0;
      hybrid.push((val1 + val2) / 2 + (Math.random() - 0.5) * 0.1);
    }
    
    return hybrid;
  }

  // API pública
  getRecentMutations(count: number = 10): LinguisticMutation[] {
    return Array.from(this.mutations.values())
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, count);
  }

  getQuantumWords(): QuantumWord[] {
    return Array.from(this.quantumWords.values());
  }

  getRecentSyntacticExperiments(count: number = 5): SyntacticExperiment[] {
    return this.syntacticExperiments.slice(-count);
  }

  generateMutatedPoem(baseWords: string[]): string {
    const mutatedWords = baseWords.map(word => {
      const quantumWord = this.quantumWords.get(word);
      if (quantumWord && Math.random() < quantumWord.collapseProbability) {
        return quantumWord.superpositions[Math.floor(Math.random() * quantumWord.superpositions.length)];
      }
      return word;
    });

    const experiment = this.syntacticExperiments[Math.floor(Math.random() * this.syntacticExperiments.length)];
    if (experiment && Math.random() < experiment.poeticPotential) {
      return this.applySyntacticStructure(mutatedWords, experiment.mutatedStructure);
    }

    return mutatedWords.join(' ');
  }

  private applySyntacticStructure(words: string[], structure: string): string {
    // Simplificado para este ejemplo
    if (structure.includes('∞')) {
      return words.join(' ∞ ');
    } else if (structure.includes('⚡')) {
      return words.join(' ⚡ ');
    } else if (structure.includes('→')) {
      return words.reverse().join(' → ');
    }
    return words.join(' ');
  }

  getEvolutionStats() {
    return {
      generation: this.generationCount,
      totalMutations: this.mutations.size,
      quantumWords: this.quantumWords.size,
      syntacticExperiments: this.syntacticExperiments.length,
      creativityIndex: this.creativityIndex,
      mutationRate: this.mutationRate,
      avgCognitiveResonance: Array.from(this.mutations.values())
        .reduce((sum, m) => sum + m.cognitiveResonance, 0) / Math.max(1, this.mutations.size)
    };
  }
}

export const linguisticMutationEngine = new LinguisticMutationEngine();
