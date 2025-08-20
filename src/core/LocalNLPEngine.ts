// MOTOR DE NLP COMPLETAMENTE LOCAL
// Sistema de procesamiento de lenguaje natural usando modelos locales de Hugging Face

import { pipeline, Pipeline, PreTrainedModel, PreTrainedTokenizer } from '@huggingface/transformers';

interface NLPCapabilities {
  text_generation: boolean;
  sentiment_analysis: boolean;
  question_answering: boolean;
  text_classification: boolean;
  feature_extraction: boolean;
  summarization: boolean;
}

interface ModelConfig {
  model_id: string;
  task: string;
  device: 'webgpu' | 'wasm' | 'cpu';
  quantized: boolean;
  cache_dir?: string;
}

interface GenerationOptions {
  max_new_tokens: number;
  temperature: number;
  top_p: number;
  top_k: number;
  do_sample: boolean;
  repetition_penalty: number;
  pad_token_id?: number;
  eos_token_id?: number;
}

interface SemanticAnalysis {
  semantic_similarity: number;
  key_concepts: string[];
  emotional_tone: string;
  complexity_score: number;
  coherence_index: number;
  poetic_elements: string[];
}

class LocalNLPEngine {
  private models: Map<string, Pipeline> = new Map();
  private capabilities: NLPCapabilities;
  private model_configs: ModelConfig[] = [];
  private initialization_status: Map<string, 'pending' | 'ready' | 'error'> = new Map();

  constructor() {
    this.capabilities = {
      text_generation: false,
      sentiment_analysis: false,
      question_answering: false,
      text_classification: false,
      feature_extraction: false,
      summarization: false
    };

    this.initializeLocalNLP();
  }

  private async initializeLocalNLP() {
    console.log('🤖 Inicializando Motor NLP Local con modelos de Hugging Face...');

    // Configuraciones de modelos optimizados para navegadores
    this.model_configs = [
      {
        model_id: 'Xenova/gpt2',
        task: 'text-generation',
        device: 'wasm',
        quantized: true
      },
      {
        model_id: 'Xenova/distilbert-base-uncased-finetuned-sst-2-english',
        task: 'sentiment-analysis',
        device: 'wasm',
        quantized: true
      },
      {
        model_id: 'Xenova/all-MiniLM-L6-v2',
        task: 'feature-extraction',
        device: 'wasm',
        quantized: true
      },
      {
        model_id: 'Xenova/distilbart-cnn-6-6',
        task: 'summarization',
        device: 'wasm',
        quantized: true
      }
    ];

    // Inicializar modelos en paralelo con manejo de errores robusto
    await this.initializeModelsWithFallback();
  }

  private async initializeModelsWithFallback() {
    const initPromises = this.model_configs.map(async (config) => {
      try {
        console.log(`🔄 Cargando modelo: ${config.model_id}`);
        this.initialization_status.set(config.model_id, 'pending');

        const model = await pipeline(
          config.task as any,
          config.model_id,
          { 
            device: config.device,
            dtype: config.quantized ? 'q8' : 'fp32'
          }
        );

        this.models.set(config.task, model);
        this.initialization_status.set(config.model_id, 'ready');
        this.updateCapabilities(config.task, true);

        console.log(`✅ Modelo cargado exitosamente: ${config.model_id}`);
        
      } catch (error) {
        console.warn(`⚠️ Error cargando ${config.model_id}:`, error);
        this.initialization_status.set(config.model_id, 'error');
        
        // Intentar cargar modelo alternativo más liviano
        await this.loadFallbackModel(config.task);
      }
    });

    await Promise.allSettled(initPromises);
    console.log('🤖 Inicialización NLP completada');
    this.logCapabilities();
  }

  private async loadFallbackModel(task: string) {
    const fallbackConfigs: Record<string, ModelConfig> = {
      'text-generation': {
        model_id: 'Xenova/distilgpt2',
        task: 'text-generation',
        device: 'wasm',
        quantized: true
      },
      'sentiment-analysis': {
        model_id: 'Xenova/bert-base-multilingual-uncased-sentiment',
        task: 'sentiment-analysis',
        device: 'wasm',
        quantized: true
      }
    };

    const fallbackConfig = fallbackConfigs[task];
    if (!fallbackConfig) return;

    try {
      console.log(`🔄 Cargando modelo de respaldo: ${fallbackConfig.model_id}`);
      
      const fallbackModel = await pipeline(
        fallbackConfig.task as any,
        fallbackConfig.model_id,
        { device: fallbackConfig.device }
      );

      this.models.set(task, fallbackModel);
      this.updateCapabilities(task, true);
      
      console.log(`✅ Modelo de respaldo cargado: ${fallbackConfig.model_id}`);
      
    } catch (fallbackError) {
      console.error(`❌ Error cargando modelo de respaldo para ${task}:`, fallbackError);
      this.updateCapabilities(task, false);
    }
  }

  private updateCapabilities(task: string, isAvailable: boolean) {
    const capabilityMap: Record<string, keyof NLPCapabilities> = {
      'text-generation': 'text_generation',
      'sentiment-analysis': 'sentiment_analysis',
      'question-answering': 'question_answering',
      'text-classification': 'text_classification',
      'feature-extraction': 'feature_extraction',
      'summarization': 'summarization'
    };

    const capability = capabilityMap[task];
    if (capability) {
      this.capabilities[capability] = isAvailable;
    }
  }

  private logCapabilities() {
    console.log('🤖 Capacidades NLP disponibles:', this.capabilities);
    const availableCount = Object.values(this.capabilities).filter(Boolean).length;
    console.log(`📊 Modelos activos: ${availableCount}/${Object.keys(this.capabilities).length}`);
  }

  // Generación de texto inteligente
  public async generateText(
    prompt: string, 
    options: Partial<GenerationOptions> = {}
  ): Promise<string> {
    
    if (!this.capabilities.text_generation) {
      return this.generateFallbackText(prompt);
    }

    const generator = this.models.get('text-generation');
    if (!generator) {
      throw new Error('Modelo de generación de texto no disponible');
    }

    const generationOptions: GenerationOptions = {
      max_new_tokens: options.max_new_tokens || 100,
      temperature: options.temperature || 0.8,
      top_p: options.top_p || 0.9,
      top_k: options.top_k || 50,
      do_sample: options.do_sample !== false,
      repetition_penalty: options.repetition_penalty || 1.1,
      ...options
    };

    try {
      console.log('🤖 Generando texto con modelo local...');
      
      const result = await generator(prompt, generationOptions);
      
      let generatedText = '';
      if (Array.isArray(result)) {
        generatedText = result[0]?.generated_text || '';
      } else if (result && typeof result === 'object' && 'generated_text' in result) {
        generatedText = (result as any).generated_text || '';
      } else {
        generatedText = String(result);
      }

      // Limpiar el texto generado
      generatedText = this.cleanGeneratedText(generatedText, prompt);
      
      console.log('✅ Texto generado exitosamente');
      return generatedText;
      
    } catch (error) {
      console.warn('⚠️ Error en generación de texto:', error);
      return this.generateFallbackText(prompt);
    }
  }

  private cleanGeneratedText(generatedText: string, originalPrompt: string): string {
    // Remover el prompt original si aparece al inicio
    if (generatedText.startsWith(originalPrompt)) {
      generatedText = generatedText.substring(originalPrompt.length);
    }
    
    // Limpiar espacios y caracteres extraños
    generatedText = generatedText.trim();
    
    // Limitar longitud para evitar generación excesiva
    if (generatedText.length > 500) {
      // Cortar en la última oración completa
      const lastSentenceEnd = generatedText.lastIndexOf('.', 500);
      if (lastSentenceEnd > 100) {
        generatedText = generatedText.substring(0, lastSentenceEnd + 1);
      } else {
        generatedText = generatedText.substring(0, 500) + '...';
      }
    }
    
    return generatedText;
  }

  private generateFallbackText(prompt: string): string {
    // Generación de texto de respaldo usando patrones template
    const templates = [
      "Explorando el concepto de {concept}, encontramos que se manifiesta como una danza entre lo conocido y lo desconocido...",
      "En el tejido semántico de {concept}, cada hilo representa una posibilidad de significado que se entrelaza con otras dimensiones...",
      "La metapoética de {concept} nos invita a reflexionar sobre los procesos creativos que emergen en la intersección del lenguaje y la consciencia...",
      "Desde la perspectiva autopoiética, {concept} se autodetermina a través de operaciones recursivas que mantienen su organización...",
      "En la cibernética de segundo orden, {concept} se observa a sí mismo observando, creando bucles de retroalimentación significativa..."
    ];

    // Extraer concepto principal del prompt
    const words = prompt.toLowerCase().split(/\s+/);
    const concept = words.find(word => word.length > 4) || 'la experiencia';
    
    const template = templates[Math.floor(Math.random() * templates.length)];
    return template.replace('{concept}', concept);
  }

  // Análisis semántico avanzado
  public async analyzeSemantics(text: string): Promise<SemanticAnalysis> {
    console.log('🔍 Realizando análisis semántico local...');

    const analysis: SemanticAnalysis = {
      semantic_similarity: 0,
      key_concepts: [],
      emotional_tone: 'neutral',
      complexity_score: 0,
      coherence_index: 0,
      poetic_elements: []
    };

    // Análisis de conceptos clave
    analysis.key_concepts = this.extractKeyConcepts(text);
    
    // Análisis de tono emocional
    if (this.capabilities.sentiment_analysis) {
      analysis.emotional_tone = await this.analyzeSentiment(text);
    } else {
      analysis.emotional_tone = this.analyzeSentimentFallback(text);
    }

    // Análisis de complejidad
    analysis.complexity_score = this.calculateComplexityScore(text);
    
    // Análisis de coherencia
    analysis.coherence_index = this.calculateCoherenceIndex(text);
    
    // Análisis de elementos poéticos
    analysis.poetic_elements = this.extractPoeticElements(text);

    // Similitud semántica (usando embeddings si están disponibles)
    if (this.capabilities.feature_extraction) {
      analysis.semantic_similarity = await this.calculateSemanticSimilarity(text);
    } else {
      analysis.semantic_similarity = 0.5; // Valor neutral por defecto
    }

    return analysis;
  }

  private extractKeyConcepts(text: string): string[] {
    // Extracción de conceptos usando análisis léxico
    const words = text.toLowerCase().split(/\s+/);
    
    // Palabras conceptuales importantes
    const conceptualWords = words.filter(word => 
      word.length > 4 && 
      !this.isStopWord(word) &&
      !this.isCommonWord(word)
    );

    // Detectar términos compuestos y conceptos técnicos
    const compounds = this.detectCompoundConcepts(text);
    
    return [...new Set([...conceptualWords, ...compounds])].slice(0, 10);
  }

  private isStopWord(word: string): boolean {
    const stopWords = [
      'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
      'que', 'la', 'el', 'en', 'de', 'un', 'una', 'es', 'se', 'no', 'te', 'lo',
      'como', 'su', 'por', 'son', 'con', 'para', 'las', 'los', 'del', 'al'
    ];
    return stopWords.includes(word);
  }

  private isCommonWord(word: string): boolean {
    const commonWords = [
      'very', 'quite', 'just', 'only', 'also', 'even', 'still', 'more', 'most',
      'muy', 'solo', 'más', 'bien', 'todo', 'cada', 'otro', 'otra', 'donde', 'cuando'
    ];
    return commonWords.includes(word);
  }

  private detectCompoundConcepts(text: string): string[] {
    const compounds = [];
    
    // Patrones para conceptos técnicos y metapoéticos
    const patterns = [
      /\b(meta\w+)\b/g,
      /\b(auto\w+)\b/g,
      /\b(ciber\w+)\b/g,
      /\b(post\w+)\b/g,
      /\b(\w+poét\w+)\b/g,
      /\b(\w+semánt\w+)\b/g,
      /\b(\w+conscien\w+)\b/g
    ];

    patterns.forEach(pattern => {
      const matches = text.match(pattern);
      if (matches) {
        compounds.push(...matches);
      }
    });

    return [...new Set(compounds)];
  }

  private async analyzeSentiment(text: string): Promise<string> {
    const sentimentAnalyzer = this.models.get('sentiment-analysis');
    if (!sentimentAnalyzer) return 'neutral';

    try {
      const result = await sentimentAnalyzer(text);
      
      if (Array.isArray(result) && result.length > 0) {
        const sentiment = result[0];
        return sentiment.label?.toLowerCase() || 'neutral';
      }
      
      return 'neutral';
    } catch (error) {
      console.warn('⚠️ Error en análisis de sentimiento:', error);
      return this.analyzeSentimentFallback(text);
    }
  }

  private analyzeSentimentFallback(text: string): string {
    // Análisis de sentimiento básico usando palabras clave
    const positiveWords = ['beautiful', 'amazing', 'wonderful', 'great', 'excellent', 'love', 'perfect',
                          'hermoso', 'maravilloso', 'excelente', 'amor', 'perfecto', 'increíble'];
    
    const negativeWords = ['terrible', 'awful', 'bad', 'horrible', 'hate', 'worst', 'disgusting',
                          'terrible', 'malo', 'horrible', 'odio', 'peor', 'disgustante'];

    const words = text.toLowerCase().split(/\s+/);
    
    const positiveCount = words.filter(word => positiveWords.includes(word)).length;
    const negativeCount = words.filter(word => negativeWords.includes(word)).length;

    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  }

  private calculateComplexityScore(text: string): number {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim());
    const words = text.split(/\s+/);
    
    // Métricas de complejidad
    const avgWordsPerSentence = words.length / Math.max(sentences.length, 1);
    const avgCharsPerWord = text.replace(/\s+/g, '').length / words.length;
    const uniqueWords = new Set(words.map(w => w.toLowerCase())).size;
    const lexicalDiversity = uniqueWords / words.length;
    
    // Puntuación compuesta (0-1)
    let complexity = 0;
    
    // Longitud de oraciones (normalizada)
    complexity += Math.min(avgWordsPerSentence / 20, 1) * 0.3;
    
    // Longitud de palabras
    complexity += Math.min(avgCharsPerWord / 8, 1) * 0.2;
    
    // Diversidad léxica
    complexity += lexicalDiversity * 0.3;
    
    // Presencia de términos técnicos
    const technicalTerms = this.detectCompoundConcepts(text);
    complexity += Math.min(technicalTerms.length / 10, 1) * 0.2;
    
    return Math.min(complexity, 1);
  }

  private calculateCoherenceIndex(text: string): number {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim());
    if (sentences.length < 2) return 1;

    let coherenceSum = 0;
    
    // Calcular coherencia entre oraciones consecutivas
    for (let i = 1; i < sentences.length; i++) {
      const prevWords = new Set(sentences[i-1].toLowerCase().split(/\s+/));
      const currWords = new Set(sentences[i].toLowerCase().split(/\s+/));
      
      // Intersección de palabras
      const intersection = new Set([...prevWords].filter(x => currWords.has(x)));
      const union = new Set([...prevWords, ...currWords]);
      
      const sentenceCoherence = intersection.size / union.size;
      coherenceSum += sentenceCoherence;
    }
    
    return coherenceSum / (sentences.length - 1);
  }

  private extractPoeticElements(text: string): string[] {
    const elements = [];
    
    // Detectar elementos poéticos
    
    // Aliteración
    if (this.detectAlliteration(text)) {
      elements.push('aliteración');
    }
    
    // Metáforas (patrón simple)
    if (/\b(como|cual|parece|es como|similar a)\b/i.test(text)) {
      elements.push('símil/metáfora');
    }
    
    // Repetición
    if (this.detectRepetition(text)) {
      elements.push('repetición');
    }
    
    // Ritmo/métrica (aproximación)
    if (this.detectRhythm(text)) {
      elements.push('ritmo');
    }
    
    // Imágenes sensoriales
    const sensoryWords = ['luz', 'sombra', 'color', 'sonido', 'silencio', 'textura', 'sabor'];
    if (sensoryWords.some(word => text.toLowerCase().includes(word))) {
      elements.push('imágenes sensoriales');
    }

    return elements;
  }

  private detectAlliteration(text: string): boolean {
    const words = text.toLowerCase().split(/\s+/);
    const firstLetters = words.map(w => w[0]).filter(Boolean);
    
    // Contar repeticiones de letras iniciales
    const letterCounts = new Map();
    firstLetters.forEach(letter => {
      letterCounts.set(letter, (letterCounts.get(letter) || 0) + 1);
    });
    
    // Si alguna letra aparece 3+ veces, hay aliteración
    return Array.from(letterCounts.values()).some(count => count >= 3);
  }

  private detectRepetition(text: string): boolean {
    const words = text.toLowerCase().split(/\s+/);
    const wordCounts = new Map();
    
    words.forEach(word => {
      if (word.length > 3) { // Solo palabras significativas
        wordCounts.set(word, (wordCounts.get(word) || 0) + 1);
      }
    });
    
    return Array.from(wordCounts.values()).some(count => count >= 3);
  }

  private detectRhythm(text: string): boolean {
    // Detección muy básica de ritmo basada en patrones de acentuación
    const sentences = text.split(/[.!?]+/);
    
    return sentences.some(sentence => {
      const words = sentence.trim().split(/\s+/);
      // Detectar patrones rítmicos básicos (oraciones de longitud similar)
      return words.length >= 5 && words.length <= 12;
    });
  }

  private async calculateSemanticSimilarity(text: string): Promise<number> {
    const extractor = this.models.get('feature-extraction');
    if (!extractor) return 0.5;

    try {
      // Generar embeddings del texto
      const embeddings = await extractor(text, { pooling: 'mean', normalize: true });
      
      // Para este ejemplo, calculamos una medida de similitud interna
      // En implementación real, compararíamos con embeddings de referencia
      if (embeddings && Array.isArray(embeddings)) {
        const magnitude = Math.sqrt(embeddings.reduce((sum: number, val: number) => sum + val * val, 0));
        return Math.min(magnitude / 10, 1); // Normalizar
      }
      
      return 0.5;
    } catch (error) {
      console.warn('⚠️ Error calculando similitud semántica:', error);
      return 0.5;
    }
  }

  // Resumir texto usando modelo local
  public async summarizeText(text: string, maxLength: number = 100): Promise<string> {
    if (!this.capabilities.summarization || text.length < 100) {
      return this.createFallbackSummary(text, maxLength);
    }

    const summarizer = this.models.get('summarization');
    if (!summarizer) {
      return this.createFallbackSummary(text, maxLength);
    }

    try {
      console.log('📝 Generando resumen con modelo local...');
      
      const result = await summarizer(text, {
        max_length: maxLength,
        min_length: Math.min(30, maxLength / 2),
        do_sample: false
      });

      let summary = '';
      if (Array.isArray(result)) {
        summary = result[0]?.summary_text || '';
      } else if (result && typeof result === 'object' && 'summary_text' in result) {
        summary = (result as any).summary_text || '';
      }

      return summary || this.createFallbackSummary(text, maxLength);
      
    } catch (error) {
      console.warn('⚠️ Error en resumen:', error);
      return this.createFallbackSummary(text, maxLength);
    }
  }

  private createFallbackSummary(text: string, maxLength: number): string {
    // Resumen extractivo simple
    const sentences = text.split(/[.!?]+/).filter(s => s.trim());
    
    if (sentences.length <= 2) return text;
    
    // Tomar las primeras oraciones hasta alcanzar la longitud máxima
    let summary = '';
    for (const sentence of sentences) {
      if ((summary + sentence).length <= maxLength) {
        summary += sentence.trim() + '. ';
      } else {
        break;
      }
    }
    
    return summary.trim() || text.substring(0, maxLength) + '...';
  }

  // API pública para obtención de estado
  public getCapabilities(): NLPCapabilities {
    return { ...this.capabilities };
  }

  public getModelStatus(): Record<string, string> {
    const status: Record<string, string> = {};
    
    this.model_configs.forEach(config => {
      status[config.model_id] = this.initialization_status.get(config.model_id) || 'unknown';
    });
    
    return status;
  }

  public isReady(): boolean {
    return Array.from(this.initialization_status.values()).some(status => status === 'ready');
  }

  public getSystemInfo() {
    return {
      available_models: this.models.size,
      capabilities: this.capabilities,
      ready_models: Array.from(this.initialization_status.values()).filter(s => s === 'ready').length,
      total_models: this.model_configs.length,
      memory_usage: this.estimateMemoryUsage()
    };
  }

  private estimateMemoryUsage(): string {
    // Estimación aproximada del uso de memoria
    const modelCount = this.models.size;
    const estimatedMB = modelCount * 50; // ~50MB por modelo pequeño
    return `~${estimatedMB}MB`;
  }
}

export const localNLPEngine = new LocalNLPEngine();