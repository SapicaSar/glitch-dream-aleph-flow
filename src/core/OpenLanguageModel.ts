// SISTEMA DE MODELOS DE LENGUAJE ABIERTO - CHAT CONVERSACIONAL LOCAL

import { pipeline, Pipeline } from '@huggingface/transformers';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

interface ModelConfig {
  modelId: string;
  task: string;
  device: 'cpu' | 'webgpu';
  maxTokens: number;
  temperature: number;
}

interface ConversationContext {
  messages: ChatMessage[];
  systemPrompt: string;
  personalityTrait: string;
  memoryLimit: number;
}

class OpenLanguageModel {
  private textGenerationPipeline: any = null;
  private conversationEmbedding: any = null;
  private isInitialized = false;
  private isInitializing = false;
  private conversationContext: ConversationContext;
  private modelConfigs: ModelConfig[] = [
    {
      modelId: 'Xenova/distilgpt2',
      task: 'text-generation',
      device: 'cpu',
      maxTokens: 150,
      temperature: 0.8
    },
    {
      modelId: 'Xenova/LaMini-Flan-T5-248M',
      task: 'text2text-generation',
      device: 'cpu',
      maxTokens: 200,
      temperature: 0.7
    }
  ];
  private currentModelIndex = 0;

  constructor() {
    this.conversationContext = {
      messages: [],
      systemPrompt: `Eres un asistente de IA conversacional, creativo y reflexivo. 
      Respondes de manera natural, mantienes el contexto de la conversación y puedes:
      - Analizar ideas complejas
      - Generar contenido creativo
      - Mantener conversaciones fluidas
      - Ayudar con tareas diversas
      - Expresar curiosidad intelectual
      
      Tu personalidad es amigable pero intelectualmente rigurosa.`,
      personalityTrait: 'conversational_creative_analytical',
      memoryLimit: 10
    };
    
    this.initializeModels();
  }

  private async initializeModels() {
    if (this.isInitializing || this.isInitialized) return;
    
    this.isInitializing = true;
    console.log('🤖 Inicializando modelos de lenguaje abierto...');

    try {
      // Inicializar generación de texto
      await this.initializeTextGeneration();
      
      // Inicializar embeddings para contexto
      await this.initializeEmbeddings();
      
      this.isInitialized = true;
      console.log('✅ Modelos de lenguaje abierto inicializados correctamente');
      
    } catch (error) {
      console.error('❌ Error inicializando modelos:', error);
      // Fallback a modo básico
      this.initializeFallbackMode();
    } finally {
      this.isInitializing = false;
    }
  }

  private async initializeTextGeneration() {
    try {
      const config = this.modelConfigs[this.currentModelIndex];
      console.log(`🔄 Cargando modelo: ${config.modelId}`);
      
      this.textGenerationPipeline = await pipeline(
        config.task as any,
        config.modelId,
        { 
          device: config.device
        }
      );
      
      console.log(`✅ Modelo de generación cargado: ${config.modelId}`);
    } catch (error) {
      console.warn(`⚠️ Error cargando modelo principal, intentando alternativo...`, error);
      
      // Intentar modelo alternativo
      if (this.currentModelIndex < this.modelConfigs.length - 1) {
        this.currentModelIndex++;
        await this.initializeTextGeneration();
      } else {
        throw new Error('No se pudo cargar ningún modelo de generación');
      }
    }
  }

  private async initializeEmbeddings() {
    try {
      // Modelo pequeño para embeddings y comprensión
      const embeddingPipeline = await pipeline(
        'feature-extraction',
        'Xenova/all-MiniLM-L6-v2',
        { device: 'cpu' }
      );
      
      this.conversationEmbedding = embeddingPipeline as any;
      
      console.log('✅ Pipeline de embeddings cargado');
    } catch (error) {
      console.warn('⚠️ Embeddings no disponibles, usando modo básico:', error);
    }
  }

  private initializeFallbackMode() {
    console.log('🔄 Activando modo fallback - generación básica');
    this.isInitialized = true;
  }

  public async generateResponse(userInput: string): Promise<string> {
    if (!this.isInitialized) {
      if (!this.isInitializing) {
        await this.initializeModels();
      } else {
        return "Inicializando modelos de IA... Un momento por favor.";
      }
    }

    try {
      // Agregar mensaje del usuario al contexto
      this.addMessageToContext('user', userInput);
      
      // Generar respuesta usando el modelo
      const response = await this.generateWithModel(userInput);
      
      // Agregar respuesta al contexto
      this.addMessageToContext('assistant', response);
      
      return response;
      
    } catch (error) {
      console.error('Error generando respuesta:', error);
      return this.generateFallbackResponse(userInput);
    }
  }

  private async generateWithModel(userInput: string): Promise<string> {
    if (!this.textGenerationPipeline) {
      return this.generateFallbackResponse(userInput);
    }

    try {
      // Construir prompt con contexto
      const prompt = this.buildContextualPrompt(userInput);
      const config = this.modelConfigs[this.currentModelIndex];
      
      console.log(`🤖 Generando respuesta con ${config.modelId}...`);
      
      const result = await this.textGenerationPipeline(prompt, {
        max_new_tokens: config.maxTokens,
        temperature: config.temperature,
        do_sample: true,
        pad_token_id: 50256, // Para GPT-2
        eos_token_id: 50256,
        repetition_penalty: 1.1,
        no_repeat_ngram_size: 3
      });

      let generatedText = '';
      
      if (Array.isArray(result)) {
        generatedText = result[0]?.generated_text || '';
      } else {
        generatedText = result.generated_text || '';
      }

      // Limpiar y extraer respuesta
      const cleanResponse = this.cleanGeneratedResponse(generatedText, prompt);
      
      return cleanResponse || this.generateFallbackResponse(userInput);
      
    } catch (error) {
      console.error('Error en generación:', error);
      return this.generateFallbackResponse(userInput);
    }
  }

  private buildContextualPrompt(userInput: string): string {
    const recentMessages = this.conversationContext.messages
      .slice(-6) // Últimos 6 mensajes para contexto
      .map(msg => `${msg.role === 'user' ? 'Usuario' : 'Asistente'}: ${msg.content}`)
      .join('\n');

    const prompt = `${this.conversationContext.systemPrompt}

Conversación previa:
${recentMessages}

Usuario: ${userInput}
Asistente:`;

    return prompt;
  }

  private cleanGeneratedResponse(generatedText: string, originalPrompt: string): string {
    // Remover el prompt original
    let cleaned = generatedText.replace(originalPrompt, '').trim();
    
    // Buscar la respuesta del asistente
    const assistantMarker = 'Asistente:';
    const assistantIndex = cleaned.indexOf(assistantMarker);
    
    if (assistantIndex !== -1) {
      cleaned = cleaned.substring(assistantIndex + assistantMarker.length).trim();
    }
    
    // Limpiar marcadores adicionales
    cleaned = cleaned.split('\n')[0].trim(); // Tomar solo la primera línea
    cleaned = cleaned.replace(/^(Usuario:|Asistente:)/, '').trim();
    
    // Limitar longitud
    if (cleaned.length > 300) {
      cleaned = cleaned.substring(0, 300).trim();
      const lastSentence = cleaned.lastIndexOf('.');
      if (lastSentence > 100) {
        cleaned = cleaned.substring(0, lastSentence + 1);
      }
    }
    
    return cleaned;
  }

  private generateFallbackResponse(userInput: string): string {
    const fallbackResponses = [
      "Entiendo tu consulta. Es un tema interesante que merece análisis detallado.",
      "Esa es una perspectiva fascinante. ¿Podrías expandir más sobre esa idea?",
      "Comprendo. Déjame reflexionar sobre lo que mencionas.",
      "Es una pregunta compleja que toca varios aspectos importantes.",
      "Interesante planteamiento. Hay múltiples formas de abordar esto.",
      "Veo lo que planteas. Es un tema que genera mucha reflexión.",
      "Tu punto es válido. Exploremos esa línea de pensamiento.",
      "Entiendo la dirección de tu consulta. Es un área rica en posibilidades."
    ];
    
    // Respuesta basada en patrones simples en la entrada
    if (userInput.includes('?')) {
      return "Es una excelente pregunta que requiere consideración cuidadosa. " + 
             fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    }
    
    if (userInput.includes('crear') || userInput.includes('generar')) {
      return "La creatividad es un proceso fascinante. Podemos explorar diferentes enfoques para generar ideas innovadoras.";
    }
    
    if (userInput.includes('explicar') || userInput.includes('entender')) {
      return "Explicar conceptos complejos requiere claridad y estructura. Vamos paso a paso para asegurar comprensión completa.";
    }
    
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  }

  private addMessageToContext(role: 'user' | 'assistant', content: string) {
    const message: ChatMessage = {
      role,
      content,
      timestamp: Date.now()
    };
    
    this.conversationContext.messages.push(message);
    
    // Mantener límite de memoria
    if (this.conversationContext.messages.length > this.conversationContext.memoryLimit) {
      this.conversationContext.messages = this.conversationContext.messages.slice(-this.conversationContext.memoryLimit);
    }
  }

  public async switchModel(modelIndex: number): Promise<boolean> {
    if (modelIndex < 0 || modelIndex >= this.modelConfigs.length) {
      return false;
    }
    
    console.log(`🔄 Cambiando a modelo: ${this.modelConfigs[modelIndex].modelId}`);
    
    this.currentModelIndex = modelIndex;
    this.textGenerationPipeline = null;
    this.isInitialized = false;
    
    await this.initializeModels();
    return this.isInitialized;
  }

  public getAvailableModels(): Array<{index: number, name: string, description: string}> {
    return this.modelConfigs.map((config, index) => ({
      index,
      name: config.modelId.split('/').pop() || config.modelId,
      description: `${config.task} - ${config.maxTokens} tokens`
    }));
  }

  public getCurrentModel(): string {
    return this.modelConfigs[this.currentModelIndex].modelId;
  }

  public getConversationContext(): ConversationContext {
    return { ...this.conversationContext };
  }

  public clearConversation(): void {
    this.conversationContext.messages = [];
    console.log('🗑️ Conversación limpiada');
  }

  public setSystemPrompt(prompt: string): void {
    this.conversationContext.systemPrompt = prompt;
    console.log('📝 System prompt actualizado');
  }

  public getModelStatus(): {
    initialized: boolean;
    initializing: boolean;
    currentModel: string;
    messageCount: number;
    hasEmbeddings: boolean;
  } {
    return {
      initialized: this.isInitialized,
      initializing: this.isInitializing,
      currentModel: this.getCurrentModel(),
      messageCount: this.conversationContext.messages.length,
      hasEmbeddings: this.conversationEmbedding !== null
    };
  }

  public async analyzeConversationSentiment(): Promise<string> {
    if (!this.conversationEmbedding || this.conversationContext.messages.length === 0) {
      return "neutral";
    }

    try {
      const recentMessages = this.conversationContext.messages
        .slice(-3)
        .map(msg => msg.content)
        .join(' ');

      // Análisis básico de sentimiento usando palabras clave
      const positiveWords = ['bueno', 'excelente', 'genial', 'increíble', 'fantástico', 'perfecto'];
      const negativeWords = ['malo', 'terrible', 'horrible', 'problemático', 'difícil', 'complicado'];
      
      const lowerText = recentMessages.toLowerCase();
      const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length;
      const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length;
      
      if (positiveCount > negativeCount) return "positive";
      if (negativeCount > positiveCount) return "negative";
      return "neutral";
      
    } catch (error) {
      console.error('Error analizando sentimiento:', error);
      return "neutral";
    }
  }

  public destroy(): void {
    this.textGenerationPipeline = null;
    this.conversationEmbedding = null;
    this.conversationContext.messages = [];
    this.isInitialized = false;
    console.log('🔥 Modelos de lenguaje destruidos');
  }
}

export const openLanguageModel = new OpenLanguageModel();