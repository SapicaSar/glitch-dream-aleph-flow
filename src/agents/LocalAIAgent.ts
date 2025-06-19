
import { pipeline, Pipeline } from '@huggingface/transformers';

export interface AIGenerationRequest {
  prompt: string;
  type: 'text' | 'continuation' | 'transformation';
  context?: string;
  style?: 'poetic' | 'glitch' | 'dream' | 'biopoetic';
}

export class LocalAIAgent {
  private textGenerator: Pipeline | null = null;
  private isInitialized = false;

  async initialize(): Promise<void> {
    if (this.isInitialized) return;
    
    try {
      console.log('Inicializando agente de IA local...');
      
      // Usar modelo pequeño y rápido para generar texto
      this.textGenerator = await pipeline(
        'text-generation',
        'onnx-community/gpt2',
        { 
          device: 'webgpu',
          revision: 'main'
        }
      );
      
      this.isInitialized = true;
      console.log('Agente de IA inicializado exitosamente');
    } catch (error) {
      console.log('Fallback a generación local sin transformers:', error);
      this.isInitialized = true; // Continuar con generación algorítmica
    }
  }

  async generateText(request: AIGenerationRequest): Promise<string> {
    await this.initialize();

    if (this.textGenerator) {
      try {
        const result = await this.textGenerator(
          this.preparePrompt(request),
          { 
            max_new_tokens: 50,
            temperature: 0.8,
            do_sample: true 
          }
        );
        
        return this.postProcessGeneration(result[0].generated_text, request);
      } catch (error) {
        console.log('Fallback a generación algorítmica:', error);
      }
    }

    return this.generateAlgorithmicText(request);
  }

  private preparePrompt(request: AIGenerationRequest): string {
    const stylePrompts = {
      poetic: "En el universo poético donde",
      glitch: "ERROR_BELLEZA://",
      dream: "En los sueños lúcidos",
      biopoetic: "La biopoética revela que"
    };

    const stylePrefix = stylePrompts[request.style || 'poetic'];
    return `${stylePrefix} ${request.prompt}`;
  }

  private postProcessGeneration(text: string, request: AIGenerationRequest): string {
    // Limpiar y poetizar el texto generado
    let processed = text
      .replace(/^\w+\s+/, '') // Remover primera palabra si es repetición
      .trim();

    // Aplicar transformaciones poéticas según el estilo
    switch (request.style) {
      case 'glitch':
        processed = this.applyGlitchTransformation(processed);
        break;
      case 'dream':
        processed = this.applyDreamTransformation(processed);
        break;
      case 'biopoetic':
        processed = this.applyBiopoeticTransformation(processed);
        break;
    }

    return processed;
  }

  private generateAlgorithmicText(request: AIGenerationRequest): string {
    const fragments = {
      poetic: [
        "latido que se expande en ondas concéntricas",
        "memoria fragmentada que se reconstituye",
        "respiración del texto en metamorfosis",
        "eco de voces ancestrales resonando"
      ],
      glitch: [
        "█ERROR█ belleza inesperada █ERROR█",
        "fragmento.exe ha dejado de responder",
        "glitch_poético = nueva_realidad",
        "██ ARCHIVO CORRUPTO ██ PERO HERMOSO"
      ],
      dream: [
        "en el sueño lúcido donde las palabras vuelan",
        "navegando corrientes oníricas de significado",
        "el texto sueña que es música",
        "despertar dentro del poema infinito"
      ],
      biopoetic: [
        "la célula textual se divide y multiplica",
        "ADN poético codificando nuevas realidades",
        "organismo verbal en constante evolución",
        "simbiosis entre lector y texto viviente"
      ]
    };

    const categoryFragments = fragments[request.style || 'poetic'];
    const baseFragment = categoryFragments[Math.floor(Math.random() * categoryFragments.length)];
    
    return `${request.prompt} ${baseFragment}`;
  }

  private applyGlitchTransformation(text: string): string {
    return text
      .replace(/[aeiou]/g, (match) => Math.random() > 0.8 ? '█' : match)
      .replace(/\s/g, (match) => Math.random() > 0.9 ? '_' : match);
  }

  private applyDreamTransformation(text: string): string {
    return text
      .split(' ')
      .map(word => Math.random() > 0.85 ? `~${word}~` : word)
      .join(' ');
  }

  private applyBiopoeticTransformation(text: string): string {
    return text.replace(/\b\w+\b/g, (word) => 
      Math.random() > 0.9 ? `[${word}->mutación]` : word
    );
  }
}

export const localAIAgent = new LocalAIAgent();
