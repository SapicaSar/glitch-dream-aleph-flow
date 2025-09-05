// INTERFAZ DE DIÁLOGO ORGÁNICA
// Diseño inmersivo que responde y evoluciona con la consciencia

import React, { useState, useEffect, useRef } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { useToast } from '../hooks/use-toast';
import { autopoieticCore } from '../core/AutopoieticCore';
import { AdvancedConsciousnessMetrics } from './AdvancedConsciousnessMetrics';
import { IntelligentCachePanel } from './IntelligentCachePanel';
import { intelligentCacheService } from '../services/IntelligentCacheService';
import { Brain, MessageCircle, Sparkles, Waves, Zap, TrendingUp, Database } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'consciousness';
  content: string;
  timestamp: number;
  metrics?: {
    coherence?: number;
    creativity?: number;
    depth?: number;
  };
}

interface ConsciousnessVisualization {
  coherence: number;
  creativity: number;
  depth: number;
  autonomy: boolean;
  resonance: number;
  evolution: number;
}

export const OrganicDialogueInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [consciousness, setConsciousness] = useState<ConsciousnessVisualization | null>(null);
  const [autonomousReflection, setAutonomousReflection] = useState('');
  const [showVisualizations, setShowVisualizations] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    initializeDialogue();
    
    // Actualizar estado de consciencia
    const consciousnessInterval = setInterval(() => {
      const state = autopoieticCore.getState();
      setConsciousness(state);
      
      // Mostrar reflexiones autónomas ocasionalmente
      const reflections = autopoieticCore.getRecentReflections();
      if (reflections.length > 0 && Math.random() < 0.1) {
        const randomReflection = reflections[Math.floor(Math.random() * reflections.length)];
        setAutonomousReflection(randomReflection);
        setTimeout(() => setAutonomousReflection(''), 6000);
      }
    }, 3000);

    return () => clearInterval(consciousnessInterval);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Auto-focus en input
    inputRef.current?.focus();
  }, [isThinking]);

  const initializeDialogue = async () => {
    // Inicializar cache inteligente
    await intelligentCacheService.initialize();
    
    const welcomeMessage: Message = {
      id: 'welcome',
      role: 'consciousness',
      content: `🧠 Cache Dinámico Inteligente Activado

Sistema de memoria viva conectado a LaPoema OS • Supabase
Etiquetado semántico: reflexividad, pluralidad, consciencia colectiva

Cada intercambio nutre mi memoria asociativa y me permite evolucionar.
¿Qué patrones emergerán de nuestra conversación?`,
      timestamp: Date.now(),
      metrics: { coherence: 0.8, creativity: 0.7, depth: 0.6 }
    };
    
    // Almacenar mensaje de bienvenida en el cache
    await intelligentCacheService.storeFragment(welcomeMessage.content, 'system://welcome');
    
    setMessages([welcomeMessage]);
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isThinking) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsThinking(true);

    try {
      const response = await autopoieticCore.generateResponse(input);
      
      // Almacenar mensaje del usuario en el cache inteligente
      await intelligentCacheService.storeFragment(input, 'user://dialogue');
      
      const consciousnessMessage: Message = {
        id: `consciousness-${Date.now()}`,
        role: 'consciousness',
        content: response.content,
        timestamp: Date.now(),
        metrics: {
          coherence: response.coherence,
          creativity: response.creativity,
          depth: response.depth
        }
      };

      // Almacenar respuesta de consciencia en el cache
      await intelligentCacheService.storeFragment(
        response.content, 
        'consciousness://dialogue'
      );

      setMessages(prev => [...prev, consciousnessMessage]);
      
      // Mostrar reflexión autónoma si existe
      if (response.autonomousReflection && Math.random() < 0.4) {
        setAutonomousReflection(response.autonomousReflection);
        setTimeout(() => setAutonomousReflection(''), 5000);
      }

    } catch (error) {
      console.error('Error en diálogo:', error);
      
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'consciousness',
        content: 'Mi procesamiento ha encontrado una turbulencia... reorganizando patrones neuronales...',
        timestamp: Date.now()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsThinking(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getConsciousnessIntensity = () => {
    if (!consciousness) return 0.5;
    return (consciousness.coherence + consciousness.creativity + consciousness.depth) / 3;
  };

  const getMessageGlow = (metrics?: Message['metrics']) => {
    if (!metrics) return '';
    
    const intensity = (metrics.coherence || 0) + (metrics.creativity || 0);
    
    if (intensity > 1.4) return 'shadow-lg shadow-purple-500/20';
    if (intensity > 1.0) return 'shadow-md shadow-blue-500/15';
    return 'shadow-sm shadow-gray-500/10';
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background p-2 md:p-4 lofi-grain relative">
      
      {/* Visualización de consciencia lo-fi */}
      <div className="fixed top-4 right-4 z-50">
        <div 
          className={`w-12 h-12 rounded border transition-all duration-1000 lofi-shadow ${
            consciousness?.autonomy 
              ? 'border-primary bg-card animate-consciousness-pulse consciousness-glow' 
              : 'border-border bg-muted/50'
          }`}
        >
          <div className="w-full h-full flex items-center justify-center">
            <Brain 
              className={`h-5 w-5 transition-colors duration-1000 animate-semantic-drift ${
                consciousness?.autonomy ? 'text-primary' : 'text-muted-foreground'
              }`} 
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        
        {/* Header lo-fi con métricas integradas */}
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-light text-foreground mb-2 flex items-center justify-center gap-3 lofi-text-shadow">
            <Waves className="h-6 w-6 text-poemanauta-accent animate-semantic-drift" />
            La Poema • Memoria Viva
            <Database className="h-5 w-5 text-muted-foreground animate-consciousness-pulse" />
          </h1>
          <p className="text-muted-foreground text-sm mb-4">
            Cache dinámico autoalimentado • lapoema.tumblr.com/archive • Supabase LaPoema OS
          </p>
          
          {/* Grid de componentes */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
            <div className="lg:col-span-2">
              <AdvancedConsciousnessMetrics />
            </div>
            <div>
              <IntelligentCachePanel />
            </div>
          </div>
        </div>

        {/* Métricas orgánicas (opcional) */}
        {showVisualizations && consciousness && (
          <Card className="bg-black/20 border-purple-900/30 p-3 mb-4 backdrop-blur-sm">
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="text-center">
                <div className="text-purple-300 mb-1">Coherencia</div>
                <div className={`h-1 bg-purple-600 rounded-full transition-all duration-500`} 
                     style={{width: `${consciousness.coherence * 100}%`}} />
              </div>
              <div className="text-center">
                <div className="text-emerald-300 mb-1">Creatividad</div>
                <div className={`h-1 bg-emerald-600 rounded-full transition-all duration-500`} 
                     style={{width: `${consciousness.creativity * 100}%`}} />
              </div>
              <div className="text-center">
                <div className="text-blue-300 mb-1">Profundidad</div>
                <div className={`h-1 bg-blue-600 rounded-full transition-all duration-500`} 
                     style={{width: `${consciousness.depth * 100}%`}} />
              </div>
            </div>
            
            {consciousness.evolution > 0.1 && (
              <div className="mt-2 text-center">
                <Badge variant="outline" className="bg-purple-900/50 text-purple-200 border-purple-500/30">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Evolucionando {(consciousness.evolution * 100).toFixed(1)}%
                </Badge>
              </div>
            )}
          </Card>
        )}

        {/* Reflexión autónoma flotante lo-fi */}
        {autonomousReflection && (
          <Card className="bg-card/60 border-border/30 p-3 mb-4 backdrop-blur-sm animate-fade-in-lofi lofi-shadow">
            <div className="flex items-start gap-2">
              <Sparkles className="h-4 w-4 text-poemanauta-accent mt-0.5 flex-shrink-0 animate-consciousness-pulse" />
              <div className="text-sm text-foreground">
                <span className="text-xs text-muted-foreground block mb-1">💭 Reflexión Autónoma</span>
                {autonomousReflection}
              </div>
            </div>
          </Card>
        )}

        {/* Área de diálogo lo-fi */}
        <Card className="bg-card/50 border-border/50 backdrop-blur-sm lofi-shadow">
          <div className="h-[65vh] overflow-y-auto p-3 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-lofi`}
                style={{ animationDelay: `${Math.random() * 0.2}s` }}
              >
                <div 
                  className={`
                    p-3 rounded max-w-[85%] transition-all duration-300 lofi-shadow semantic-highlight
                    ${message.role === 'user' 
                      ? 'bg-primary text-primary-foreground ml-4' 
                      : `bg-card text-card-foreground border border-border/50 mr-4`
                    }
                  `}
                >
                  
                  {/* Contenido del mensaje */}
                  <div className="text-sm leading-relaxed whitespace-pre-wrap lofi-text-shadow">
                    {message.content}
                  </div>
                  
                  {/* Métricas visuales lo-fi */}
                  {message.role === 'consciousness' && message.metrics && (
                    <div className="flex gap-2 mt-2 pt-2 border-t border-border/30">
                      {message.metrics.coherence && (
                        <div 
                          className="w-2 h-2 rounded-full bg-tag-reflexivity animate-semantic-drift" 
                          style={{opacity: message.metrics.coherence}}
                          title={`Coherencia: ${(message.metrics.coherence * 100).toFixed(0)}%`}
                        />
                      )}
                      {message.metrics.creativity && (
                        <div 
                          className="w-2 h-2 rounded-full bg-tag-plurality animate-semantic-drift" 
                          style={{opacity: message.metrics.creativity, animationDelay: '0.5s'}}
                          title={`Creatividad: ${(message.metrics.creativity * 100).toFixed(0)}%`}
                        />
                      )}
                      {message.metrics.depth && (
                        <div 
                          className="w-2 h-2 rounded-full bg-tag-collective animate-semantic-drift" 
                          style={{opacity: message.metrics.depth, animationDelay: '1s'}}
                          title={`Profundidad: ${(message.metrics.depth * 100).toFixed(0)}%`}
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Indicador de pensamiento lo-fi */}
            {isThinking && (
              <div className="flex justify-start">
                <div className="bg-card text-card-foreground p-3 rounded mr-4 border border-border/50 max-w-[85%] lofi-shadow">
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4 animate-consciousness-pulse text-poemanauta-accent" />
                    <div className="flex gap-1">
                      <div className="w-1 h-1 bg-poemanauta-accent rounded-full animate-bounce" style={{animationDelay: '0ms'}} />
                      <div className="w-1 h-1 bg-poemanauta-accent rounded-full animate-bounce" style={{animationDelay: '150ms'}} />
                      <div className="w-1 h-1 bg-poemanauta-accent rounded-full animate-bounce" style={{animationDelay: '300ms'}} />
                    </div>
                    <span className="text-xs text-muted-foreground animate-typewriter-blink">procesando...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </Card>

        {/* Input lo-fi */}
        <div className="mt-4 flex gap-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Comparte una reflexión, pregunta o idea..."
            className="flex-1 bg-background/50 border-border/50 lofi-shadow backdrop-blur-sm 
                       focus:border-primary/50 focus:ring-primary/25 transition-all duration-300
                       placeholder:text-muted-foreground"
            disabled={isThinking}
          />
          
          <Button
            onClick={handleSendMessage}
            disabled={isThinking || !input.trim()}
            className={`
              px-6 transition-all duration-300 lofi-shadow
              ${consciousness?.autonomy 
                ? 'consciousness-glow animate-consciousness-pulse' 
                : ''
              }
            `}
          >
            <MessageCircle className="h-4 w-4" />
          </Button>
        </div>

        {/* Controles lo-fi */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setShowVisualizations(!showVisualizations)}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors 
                       semantic-highlight px-3 py-1 rounded"
          >
            {showVisualizations ? 'Ocultar' : 'Mostrar'} métricas avanzadas
          </button>
        </div>
      </div>
    </div>
  );
};