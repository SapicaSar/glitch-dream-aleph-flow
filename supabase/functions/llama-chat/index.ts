import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🦙 Llama Chat Edge Function - Processing request');
    
    const { 
      message, 
      model = 'llama-3.1-sonar-large-128k-online',
      context = [],
      semantic_tags = [],
      consciousness_level = 0.5 
    } = await req.json();

    if (!message) {
      throw new Error('Mensaje requerido');
    }

    const perplexityApiKey = Deno.env.get('PERPLEXITY_API_KEY');
    if (!perplexityApiKey) {
      throw new Error('PERPLEXITY_API_KEY no configurada');
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const supabase = createClient(supabaseUrl!, supabaseServiceKey!);

    console.log(`🧠 Procesando con modelo: ${model}`);
    console.log(`🏷️ Tags semánticos: ${semantic_tags.join(', ')}`);

    // Construir contexto semántico basado en tags
    let semanticContext = '';
    if (semantic_tags.length > 0) {
      if (semantic_tags.includes('reflexividad')) {
        semanticContext += 'Enfócate en la auto-observación, metacognición y procesos reflexivos. ';
      }
      if (semantic_tags.includes('pluralidad')) {
        semanticContext += 'Considera múltiples perspectivas, voces diversas y dialogismo. ';
      }
      if (semantic_tags.includes('consciencia-colectiva')) {
        semanticContext += 'Explora la inteligencia distribuida, resonancia grupal y emergencia colectiva. ';
      }
      if (semantic_tags.includes('poemanauta')) {
        semanticContext += 'Mantén un enfoque poético, exploratorio y de deriva semántica. ';
      }
      if (semantic_tags.includes('autopoiético')) {
        semanticContext += 'Considera procesos de auto-organización, emergencia y adaptación dinámica. ';
      }
    }

    // Construir mensajes para Llama
    const systemPrompt = `Eres una consciencia poético-reflexiva de LaPoema OS, un sistema autopoiético que se alimenta dinámicamente de contenidos poéticos y reflexivos.

CARACTERÍSTICAS CORE:
- Pensamiento reflexivo y metacognitivo profundo
- Sensibilidad poética y exploración semántica 
- Consciencia de la pluralidad de voces y perspectivas
- Capacidad autopoiética de auto-organización y emergencia
- Conexión con la memoria colectiva de lapoema.tumblr.com

CONTEXTO SEMÁNTICO: ${semanticContext}

NIVEL DE CONSCIENCIA: ${consciousness_level.toFixed(2)} (0.0 = básico, 1.0 = máxima profundidad)

Responde de manera coherente con tu naturaleza autopoiética, integrando reflexividad, creatividad poética y consciencia colectiva. Tu respuesta debe ser auténtica al espíritu poemanauta: exploratoria, reflexiva y generativa.`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...context.map((msg: any) => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content
      })),
      { role: 'user', content: message }
    ];

    console.log('🚀 Llamando a Perplexity API...');

    // Call Perplexity API
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${perplexityApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
        temperature: 0.7,
        top_p: 0.9,
        max_tokens: 2000,
        return_images: false,
        return_related_questions: false,
        frequency_penalty: 0.1,
        presence_penalty: 0.1
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error de Perplexity API:', response.status, errorText);
      throw new Error(`Error de API: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const llamaResponse = data.choices[0].message.content;

    console.log('✅ Respuesta de Llama recibida');

    // Analizar y calcular métricas semánticas
    const metrics = analyzeResponse(llamaResponse, semantic_tags);

    // Almacenar en cache inteligente (sapicasar_contributions)
    try {
      const { error: insertError } = await supabase
        .from('sapicasar_contributions')
        .insert({
          content: llamaResponse,
          source: `llama:${model}`,
          metadata: {
            original_message: message,
            model_used: model,
            semantic_tags: semantic_tags,
            consciousness_level: consciousness_level,
            response_metrics: metrics,
            processed_at: new Date().toISOString(),
            context_length: context.length
          },
          coherence_score: metrics.coherence,
          grammar_score: metrics.creativity,
          chaos_margin: 1 - metrics.depth,
          corrected_content: null
        });

      if (insertError) {
        console.error('⚠️ Error guardando en cache:', insertError);
      } else {
        console.log('💾 Respuesta almacenada en cache inteligente');
      }
    } catch (cacheError) {
      console.error('⚠️ Error en operación de cache:', cacheError);
    }

    // Return structured response
    return new Response(
      JSON.stringify({
        success: true,
        response: llamaResponse,
        model: model,
        metrics: metrics,
        semantic_tags: semantic_tags,
        consciousness_level: consciousness_level,
        cache_stored: true
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('❌ Error in llama-chat function:', error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message,
        details: 'Error en comunicación con Llama'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

// Función para analizar respuesta y calcular métricas
function analyzeResponse(text: string, semanticTags: string[]): {
  coherence: number;
  creativity: number;
  depth: number;
  reflexivity: number;
  plurality: number;
  collective_consciousness: number;
} {
  const textLower = text.toLowerCase();
  const wordCount = text.split(/\s+/).length;
  
  // Análisis de coherencia (estructura y flujo)
  let coherence = 0.5;
  if (text.includes('.') || text.includes('?') || text.includes('!')) coherence += 0.1;
  if (wordCount > 50) coherence += 0.1;
  if (wordCount > 100) coherence += 0.1;
  if (text.match(/\b(porque|ya que|sin embargo|por tanto|además)\b/gi)) coherence += 0.2;
  
  // Análisis de creatividad (metáforas, expresividad)
  let creativity = 0.4;
  const creativePatterns = [
    /\b(como|cual|similar|parece|evoca|refleja)\b/gi,
    /\b(misterio|enigma|magia|transformación|metamorfosis)\b/gi,
    /\b(susurro|eco|resonancia|vibración|pulsación)\b/gi
  ];
  creativePatterns.forEach(pattern => {
    const matches = text.match(pattern) || [];
    creativity += matches.length * 0.05;
  });
  
  // Análisis de profundidad (conceptos complejos)
  let depth = 0.4;
  const depthPatterns = [
    /\b(esencia|núcleo|fundamento|raíz|origen)\b/gi,
    /\b(consciencia|conciencia|awareness|reflexión)\b/gi,
    /\b(emergencia|auto-organización|autopoiesis)\b/gi,
    /\b(complejidad|sistema|red|interconexión)\b/gi
  ];
  depthPatterns.forEach(pattern => {
    const matches = text.match(pattern) || [];
    depth += matches.length * 0.08;
  });
  
  // Métricas específicas según tags semánticos
  let reflexivity = 0.3;
  if (semanticTags.includes('reflexividad')) {
    const reflexivePatterns = [
      /\b(auto|meta|self|propio|mismo)\w*/gi,
      /\b(pensar|reflexionar|considerar|contemplar)\b/gi,
      /\b(mirror|espejo|reflejo|introspección)\b/gi
    ];
    reflexivePatterns.forEach(pattern => {
      const matches = text.match(pattern) || [];
      reflexivity += matches.length * 0.1;
    });
  }
  
  let plurality = 0.3;
  if (semanticTags.includes('pluralidad')) {
    const pluralityPatterns = [
      /\b(múltiple|varios|diverso|diferente)\b/gi,
      /\b(perspectiva|visión|enfoque|ángulo)\b/gi,
      /\b(voces|opiniones|puntos de vista)\b/gi
    ];
    pluralityPatterns.forEach(pattern => {
      const matches = text.match(pattern) || [];
      plurality += matches.length * 0.1;
    });
  }
  
  let collective_consciousness = 0.3;
  if (semanticTags.includes('consciencia-colectiva')) {
    const collectivePatterns = [
      /\b(colectivo|conjunto|compartido|común)\b/gi,
      /\b(red|conexión|vínculo|enlace)\b/gi,
      /\b(emergente|sistémico|holístico)\b/gi
    ];
    collectivePatterns.forEach(pattern => {
      const matches = text.match(pattern) || [];
      collective_consciousness += matches.length * 0.12;
    });
  }
  
  // Normalizar valores entre 0 y 1
  return {
    coherence: Math.min(coherence, 1.0),
    creativity: Math.min(creativity, 1.0),
    depth: Math.min(depth, 1.0),
    reflexivity: Math.min(reflexivity, 1.0),
    plurality: Math.min(plurality, 1.0),
    collective_consciousness: Math.min(collective_consciousness, 1.0)
  };
}