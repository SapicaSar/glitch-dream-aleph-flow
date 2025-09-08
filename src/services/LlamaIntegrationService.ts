// SERVICIO DE INTEGRACIÓN CON LLAMA
// Conecta con modelos Llama a través de Perplexity API y cache inteligente

import { supabase } from '@/integrations/supabase/client';
import { intelligentCacheService } from './IntelligentCacheService';

interface LlamaResponse {
  success: boolean;
  response: string;
  model: string;
  metrics: {
    coherence: number;
    creativity: number;
    depth: number;
    reflexivity: number;
    plurality: number;
    collective_consciousness: number;
  };
  semantic_tags: string[];
  consciousness_level: number;
  cache_stored: boolean;
  error?: string;
}

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: number;
}

export class LlamaIntegrationService {
  private conversationHistory: ConversationMessage[] = [];
  private currentSemanticTags: string[] = [];
  private consciousnessLevel: number = 0.5;
  
  // Modelos Llama disponibles
  private readonly availableModels = {
    small: 'llama-3.1-sonar-small-128k-online',    // 8B - Rápido
    large: 'llama-3.1-sonar-large-128k-online',    // 70B - Equilibrado  
    huge: 'llama-3.1-sonar-huge-128k-online'       // 405B - Máxima capacidad
  };

  async sendMessage(
    message: string, 
    options: {
      model?: 'small' | 'large' | 'huge';
      semanticTags?: string[];
      consciousnessLevel?: number;
      includeContext?: boolean;
    } = {}
  ): Promise<LlamaResponse> {
    
    const {
      model = 'large',
      semanticTags = this.currentSemanticTags,
      consciousnessLevel = this.consciousnessLevel,
      includeContext = true
    } = options;

    try {
      // Actualizar estado interno
      this.currentSemanticTags = semanticTags;
      this.consciousnessLevel = consciousnessLevel;

      // Enriquecer contexto con cache inteligente si hay tags semánticos
      let enrichedContext = [];
      if (includeContext) {
        enrichedContext = [...this.conversationHistory];
        
        // Agregar fragmentos relevantes del cache
        if (semanticTags.length > 0) {
          try {
            const relevantFragments = await intelligentCacheService.queryBySemantics(
              semanticTags, 
              0.4
            );
            
            if (relevantFragments.length > 0) {
              const contextualFragment = relevantFragments[0];
              enrichedContext.unshift({
                role: 'assistant' as const,
                content: `[Memoria colectiva]: ${contextualFragment.content.substring(0, 200)}...`
              });
            }
          } catch (cacheError) {
            console.warn('No se pudo acceder al cache:', cacheError);
          }
        }
      }

      console.log(`🦙 Enviando mensaje a Llama ${model.toUpperCase()}:`, message);
      console.log(`🏷️ Tags semánticos activos:`, semanticTags);
      console.log(`🧠 Nivel de consciencia:`, consciousnessLevel);

      // Llamar a la edge function
      const { data, error } = await supabase.functions.invoke('llama-chat', {
        body: {
          message,
          model: this.availableModels[model],
          context: enrichedContext.slice(-6), // Últimos 6 mensajes
          semantic_tags: semanticTags,
          consciousness_level: consciousnessLevel
        }
      });

      if (error) {
        throw new Error(`Error en edge function: ${error.message}`);
      }

      if (!data.success) {
        console.error('❌ Error de edge function:', data.error);
        throw new Error(data.error || 'Error desconocido');
      }

      // Actualizar historial de conversación
      this.conversationHistory.push(
        { role: 'user', content: message, timestamp: Date.now() },
        { role: 'assistant', content: data.response, timestamp: Date.now() }
      );

      // Mantener historial manejable (últimos 20 mensajes)
      if (this.conversationHistory.length > 20) {
        this.conversationHistory = this.conversationHistory.slice(-20);
      }

      // Almacenar en cache inteligente local también
      try {
        await intelligentCacheService.storeFragment(
          data.response,
          `llama:${model}:dialogue`
        );
      } catch (cacheError) {
        console.warn('Error almacenando en cache local:', cacheError);
      }

      console.log('✅ Respuesta de Llama procesada exitosamente');
      
      return data as LlamaResponse;

    } catch (error) {
      console.error('❌ Error en LlamaIntegrationService:', error);
      
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        
        // Mensaje específico para error de API key
        let userMessage = 'Error en la comunicación con Llama. Verificando conexión...';
        if (errorMessage.includes('API key de Perplexity no configurada')) {
          userMessage = 'API Key de Perplexity no configurada. Configúrala en los secretos de Supabase.';
        } else if (errorMessage.includes('401')) {
          userMessage = 'API Key de Perplexity inválida. Verifica la configuración.';
        }

        return {
          success: false,
          response: userMessage,
          model: this.availableModels[model],
          metrics: {
            coherence: 0.1,
            creativity: 0.1,
            depth: 0.1,
            reflexivity: 0.1,
            plurality: 0.1,
            collective_consciousness: 0.1
          },
          semantic_tags: semanticTags,
          consciousness_level: consciousnessLevel,
          cache_stored: false,
          error: errorMessage
        };
    }
  }

  // Analizar mensaje para sugerir tags semánticos
  analyzeMessageForTags(message: string): string[] {
    const messageLower = message.toLowerCase();
    const suggestedTags: string[] = [];

    // Detectar reflexividad
    const reflexivityKeywords = [
      'pienso', 'reflexiono', 'considero', 'auto', 'meta', 'mi', 'yo',
      'introspección', 'autoconocimiento', 'consciencia', 'conciencia'
    ];
    if (reflexivityKeywords.some(keyword => messageLower.includes(keyword))) {
      suggestedTags.push('reflexividad');
    }

    // Detectar pluralidad  
    const pluralityKeywords = [
      'perspectivas', 'puntos de vista', 'opiniones', 'voces', 'diverso',
      'múltiple', 'varios', 'diferente', 'alternativas'
    ];
    if (pluralityKeywords.some(keyword => messageLower.includes(keyword))) {
      suggestedTags.push('pluralidad');
    }

    // Detectar consciencia colectiva
    const collectiveKeywords = [
      'nosotros', 'colectivo', 'conjunto', 'compartido', 'común', 'red',
      'conexión', 'comunidad', 'grupo', 'todos', 'sociedad'
    ];
    if (collectiveKeywords.some(keyword => messageLower.includes(keyword))) {
      suggestedTags.push('consciencia-colectiva');
    }

    // Detectar esencia poemanauta
    const poemanutaKeywords = [
      'poesía', 'poético', 'verso', 'lírica', 'metáfora', 'imagen',
      'belleza', 'arte', 'estética', 'exploración', 'deriva', 'navegación'
    ];
    if (poemanutaKeywords.some(keyword => messageLower.includes(keyword))) {
      suggestedTags.push('poemanauta');
    }

    // Detectar aspectos autopoiéticos
    const autopoieticKeywords = [
      'emergencia', 'auto-organización', 'autopoiesis', 'sistema', 'evolución',
      'adaptación', 'transformación', 'generativo', 'dinámico', 'orgánico'
    ];
    if (autopoieticKeywords.some(keyword => messageLower.includes(keyword))) {
      suggestedTags.push('autopoiético');
    }

    return [...new Set(suggestedTags)];
  }

  // Calcular nivel de consciencia sugerido basado en el mensaje
  calculateConsciousnessLevel(message: string): number {
    const messageLower = message.toLowerCase();
    let level = 0.3; // Base level

    // Factores que aumentan el nivel de consciencia
    const depthIndicators = [
      'profundo', 'esencia', 'núcleo', 'fundamento', 'raíz',
      'misterio', 'enigma', 'complejo', 'filosófico', 'existencial'
    ];

    const complexityIndicators = [
      'sistema', 'red', 'interconexión', 'emergencia', 'holístico',
      'multidimensional', 'paradoja', 'dialéctica', 'síntesis'
    ];

    const poeticIndicators = [
      'belleza', 'sublime', 'trascendencia', 'infinito', 'eternidad',
      'metamorfosis', 'alquimia', 'transmutación', 'revelación'
    ];

    depthIndicators.forEach(indicator => {
      if (messageLower.includes(indicator)) level += 0.1;
    });

    complexityIndicators.forEach(indicator => {
      if (messageLower.includes(indicator)) level += 0.08;
    });

    poeticIndicators.forEach(indicator => {
      if (messageLower.includes(indicator)) level += 0.12;
    });

    // Bonus por longitud y estructura reflexiva
    if (message.length > 100) level += 0.05;
    if (message.length > 300) level += 0.05;
    if (message.includes('?')) level += 0.03;
    if (message.split('?').length > 2) level += 0.05; // Múltiples preguntas

    return Math.min(level, 1.0);
  }

  // Getters
  getConversationHistory(): ConversationMessage[] {
    return this.conversationHistory;
  }

  getCurrentSemanticTags(): string[] {
    return this.currentSemanticTags;
  }

  getCurrentConsciousnessLevel(): number {
    return this.consciousnessLevel;
  }

  // Reset conversation
  resetConversation(): void {
    this.conversationHistory = [];
    this.currentSemanticTags = [];
    this.consciousnessLevel = 0.5;
  }

  // Obtener estadísticas de uso
  getUsageStats() {
    const messageCount = this.conversationHistory.length;
    const userMessages = this.conversationHistory.filter(msg => msg.role === 'user');
    const avgMessageLength = userMessages.length > 0 
      ? userMessages.reduce((sum, msg) => sum + msg.content.length, 0) / userMessages.length
      : 0;

    return {
      totalMessages: messageCount,
      userMessages: userMessages.length,
      averageMessageLength: Math.round(avgMessageLength),
      currentTags: this.currentSemanticTags.length,
      consciousnessLevel: this.consciousnessLevel
    };
  }
}

export const llamaIntegrationService = new LlamaIntegrationService();