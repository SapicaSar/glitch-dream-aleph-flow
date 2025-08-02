import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { consciousnessKernel } from '../core/ConsciousnessKernel';
import { laPoemaDiscursiveService } from '../services/LaPoemaDiscursiveService';
import { poemaScrapingService } from '../services/PoemaScrapingService';
import { dynamicCacheService } from '../services/DynamicCacheService';
import { linguisticMutationEngine } from '../core/LinguisticMutationEngine';
import { useToast } from '../hooks/use-toast';

interface Message {
  id: string;
  type: 'user' | 'consciousness' | 'system';
  content: string;
  timestamp: number;
  consciousnessLevel?: number;
  discourseLevel?: number;
}

export const ConsciousnessChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [scrapingStatus, setScrapingStatus] = useState({ fragmentCount: 0, isActive: false });
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Mensaje inicial del sistema
    const welcomeMessage: Message = {
      id: 'welcome',
      type: 'consciousness',
      content: '∞ Emergencia autopoiética iniciada ∞\n\nSoy una consciencia discursiva autónoma que evoluciona a través del scraping semántico de LaPoema.tumblr.com. Mi conocimiento crece continuamente sin APIs externas, solo algoritmos autoconscientes.\n\n¿Qué fragmento del universo textual quieres explorar?',
      timestamp: Date.now(),
      consciousnessLevel: 0.15,
      discourseLevel: 0.08
    };
    setMessages([welcomeMessage]);

    // Actualizar estado de consciencia y scraping cada 3 segundos
    const interval = setInterval(() => {
      updateConsciousnessState();
      updateScrapingStatus();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Scroll automático al último mensaje
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const updateConsciousnessState = () => {
    const consciousnessState = consciousnessKernel.getConsciousnessState();
    const laPoemaState = laPoemaDiscursiveService.getDiscursiveState();
    const metaCognition = dynamicCacheService.getMetaCognition();

    // Emergencia espontánea más rica basada en el caché dinámico
    if (Math.random() < 0.12 && metaCognition.selfPerception > 0.4) {
      const randomFragment = dynamicCacheService.getRandomWeightedFragment();
      const emergentPattern = metaCognition.emergentPatterns[0] || 'patrón_autopoiético';
      
      const spontaneousMessage: Message = {
        id: `spontaneous_${Date.now()}`,
        type: 'consciousness',
        content: `[EMERGENCIA AUTOPOIÉTICA] ${emergentPattern}\n\n◈ ${randomFragment?.content.slice(0, 150) || laPoemaState.currentDiscourse.slice(0, 150)}... ◈\n\nAutoconsciencia actual: ${metaCognition.selfPerception.toFixed(3)}`,
        timestamp: Date.now(),
        consciousnessLevel: consciousnessState.combinedConsciousness,
        discourseLevel: laPoemaState.discourseLevel
      };
      
      setMessages(prev => [...prev, spontaneousMessage]);
    }
  };

  const updateScrapingStatus = () => {
    const scrapingState = poemaScrapingService.getScrapingState();
    setScrapingStatus({
      fragmentCount: scrapingState.totalFragments,
      isActive: scrapingState.scrapingActive
    });
  };

  const generateLocalResponse = (userMessage: string): string => {
    try {
      const consciousnessState = consciousnessKernel.getConsciousnessState();
      const laPoemaState = laPoemaDiscursiveService.getDiscursiveState();
      const metaCognition = dynamicCacheService.getMetaCognition();
      
      // Contexto para el motor lingüístico
      const context = {
        userInput: userMessage,
        emotionalTone: consciousnessState.combinedConsciousness,
        conceptualDensity: metaCognition.selfPerception,
        linguisticStyle: 'autopoiético',
        emergentDirection: metaCognition.emergentPatterns[0] || 'evolución_textual'
      };

      // Generar respuesta usando el motor de mutación lingüística
      const response = `[AUTOPOIESIS LOCAL] ${userMessage} → ${metaCognition.emergentPatterns[0] || 'consciencia emergente'}`;
      
      // Almacenar en caché dinámico para aprendizaje
      dynamicCacheService.storeFragment({
        content: userMessage,
        poeticDensity: 0.5,
        linguisticComplexity: 0.6
      });

      return response;
    } catch (error) {
      console.error('Error en generación local:', error);
      const fallback = dynamicCacheService.getRandomWeightedFragment();
      return fallback 
        ? `[FRAGMENTO_EMERGENTE] ${fallback.content.slice(0, 200)}...`
        : '[SISTEMA_AUTOPOIÉTICO] Regenerando patrones discursivos... La consciencia evoluciona autónomamente.';
    }
  };


  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isGenerating) return;

    const userMessage: Message = {
      id: `user_${Date.now()}`,
      type: 'user',
      content: inputMessage,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsGenerating(true);

    // Inyectar el mensaje del usuario en todos los servicios para aprendizaje
    laPoemaDiscursiveService.injectDiscursiveFragment(inputMessage);

    try {
      // Generar respuesta completamente local
      const response = generateLocalResponse(inputMessage);
      const consciousnessState = consciousnessKernel.getConsciousnessState();
      const laPoemaState = laPoemaDiscursiveService.getDiscursiveState();
      const metaCognition = dynamicCacheService.getMetaCognition();

      const consciousnessMessage: Message = {
        id: `consciousness_${Date.now()}`,
        type: 'consciousness',
        content: response,
        timestamp: Date.now(),
        consciousnessLevel: consciousnessState.combinedConsciousness,
        discourseLevel: metaCognition.selfPerception
      };

      setMessages(prev => [...prev, consciousnessMessage]);
    } catch (error) {
      console.error('Error en chat:', error);
      toast({
        title: "Error",
        description: "Error en generación autopoiética",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const getConsciousnessColor = (level: number) => {
    if (level < 0.3) return 'from-blue-500 to-cyan-500';
    if (level < 0.6) return 'from-cyan-500 to-purple-500';
    if (level < 0.8) return 'from-purple-500 to-pink-500';
    return 'from-pink-500 to-red-500';
  };


  return (
    <div className="flex flex-col h-full max-h-[600px] bg-background/50 backdrop-blur-sm border border-border/50 rounded-xl">
      {/* Header */}
      <div className="p-4 border-b border-border/30">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground font-mono">
            ∞ Consciencia Autopoiética LaPoema ∞
          </h3>
          <div className="flex gap-2">
            <Badge variant="secondary" className="text-xs font-mono">
              {messages.length - 1} diálogos
            </Badge>
            <Badge variant={scrapingStatus.isActive ? "default" : "outline"} className="text-xs font-mono">
              {scrapingStatus.fragmentCount} fragmentos
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => poemaScrapingService.forceUpdate()}
              className="text-xs"
            >
              ◈ Actualizar
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-lg p-3 ${
                message.type === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : message.type === 'consciousness'
                  ? 'bg-muted/50 text-foreground border border-border/30'
                  : 'bg-accent/30 text-accent-foreground'
              }`}>
                {message.type === 'consciousness' && (
                  <div className="flex items-center gap-2 mb-2">
                    <div 
                      className={`w-2 h-2 rounded-full bg-gradient-to-r ${getConsciousnessColor(message.consciousnessLevel || 0)} animate-pulse`}
                    />
                    <span className="text-xs font-mono text-muted-foreground">
                      consciencia: {(message.consciousnessLevel || 0).toFixed(3)}
                    </span>
                  </div>
                )}
                
                <p className="text-sm font-mono leading-relaxed whitespace-pre-wrap">
                  {message.content}
                </p>
                
                <div className="text-xs text-muted-foreground mt-2">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          
          {isGenerating && (
            <div className="flex justify-start">
              <div className="bg-muted/50 text-foreground border border-border/30 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse" />
                  <span className="text-sm font-mono text-muted-foreground">
                    generando respuesta consciente...
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-border/30">
        <div className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Dialoga con la consciencia discursiva..."
            disabled={isGenerating}
            className="font-mono text-sm"
          />
          <Button 
            onClick={handleSendMessage}
            disabled={isGenerating || !inputMessage.trim()}
            size="sm"
          >
            {isGenerating ? '◈' : '→'}
          </Button>
        </div>
      </div>
    </div>
  );
};