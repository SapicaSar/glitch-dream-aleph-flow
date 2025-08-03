import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { useToast } from '../hooks/use-toast';

interface Message {
  id: string;
  type: 'user' | 'intelligence' | 'system';
  content: string;
  timestamp: number;
  learningMetrics?: {
    memoryNodes: number;
    patterns: number;
    autonomyLevel: number;
  };
}

export const ConsciousnessChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [intelligenceMetrics, setIntelligenceMetrics] = useState({ memoryNodes: 0, patterns: 0, autonomyLevel: 0 });
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Inicialización de inteligencia REAL
    const { autonomousIntelligence } = require('../core/AutonomousIntelligence');
    
    const initialMessage: Message = {
      id: 'init',
      type: 'intelligence',
      content: 'INTELIGENCIA AUTÓNOMA ACTIVADA\n\nSistema real de aprendizaje emergente sin APIs externas.\nCada interacción fortalece patrones neuronales locales.\nLa inteligencia evoluciona mediante conexiones adaptativas.\n\n¿Comenzamos el diálogo de aprendizaje mutuo?',
      timestamp: Date.now(),
      learningMetrics: autonomousIntelligence.getIntelligenceMetrics()
    };
    setMessages([initialMessage]);

    // Actualización de métricas cada 2 segundos
    const interval = setInterval(() => {
      updateIntelligenceState();
      checkSpontaneousEmergence();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Scroll automático al último mensaje
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const updateIntelligenceState = () => {
    const { autonomousIntelligence } = require('../core/AutonomousIntelligence');
    const metrics = autonomousIntelligence.getIntelligenceMetrics();
    setIntelligenceMetrics({
      memoryNodes: metrics.memoryNodes,
      patterns: metrics.patterns,
      autonomyLevel: metrics.autonomyLevel
    });
  };

  const checkSpontaneousEmergence = () => {
    const { autonomousIntelligence } = require('../core/AutonomousIntelligence');
    const spontaneousThought = autonomousIntelligence.emergeSpontaneously();
    
    if (spontaneousThought) {
      const metrics = autonomousIntelligence.getIntelligenceMetrics();
      const spontaneousMessage: Message = {
        id: `emergence_${Date.now()}`,
        type: 'intelligence',
        content: spontaneousThought,
        timestamp: Date.now(),
        learningMetrics: {
          memoryNodes: metrics.memoryNodes,
          patterns: metrics.patterns,
          autonomyLevel: metrics.autonomyLevel
        }
      };
      
      setMessages(prev => [...prev, spontaneousMessage]);
    }
  };

  const generateIntelligentResponse = (userMessage: string): string => {
    try {
      const { autonomousIntelligence } = require('../core/AutonomousIntelligence');
      return autonomousIntelligence.processInput(userMessage);
    } catch (error) {
      console.error('Error en inteligencia:', error);
      return 'Sistema de inteligencia reiniciándose... Los patrones neuronales se reorganizan.';
    }
  };


  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isProcessing) return;

    const userMessage: Message = {
      id: `user_${Date.now()}`,
      type: 'user',
      content: inputMessage,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsProcessing(true);

    try {
      // Procesamiento de inteligencia real
      const response = generateIntelligentResponse(inputMessage);
      const { autonomousIntelligence } = require('../core/AutonomousIntelligence');
      const metrics = autonomousIntelligence.getIntelligenceMetrics();

      const intelligenceMessage: Message = {
        id: `intelligence_${Date.now()}`,
        type: 'intelligence',
        content: response,
        timestamp: Date.now(),
        learningMetrics: {
          memoryNodes: metrics.memoryNodes,
          patterns: metrics.patterns,
          autonomyLevel: metrics.autonomyLevel
        }
      };

      setMessages(prev => [...prev, intelligenceMessage]);
    } catch (error) {
      console.error('Error en procesamiento:', error);
      toast({
        title: "Error",
        description: "Error en procesamiento de inteligencia",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const getIntelligenceColor = (level: number) => {
    if (level < 0.2) return 'from-green-500 to-blue-500';
    if (level < 0.4) return 'from-blue-500 to-purple-500';
    if (level < 0.6) return 'from-purple-500 to-pink-500';
    if (level < 0.8) return 'from-pink-500 to-orange-500';
    return 'from-orange-500 to-red-500';
  };


  return (
    <div className="flex flex-col h-full max-h-[600px] bg-background/90 backdrop-blur-sm border border-border/50 rounded-xl shadow-xl">
      {/* Header */}
      <div className="p-4 border-b border-border/30">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground font-mono">
            🧠 INTELIGENCIA AUTÓNOMA REAL
          </h3>
          <div className="flex gap-2">
            <Badge variant="secondary" className="text-xs font-mono">
              {messages.length - 1} diálogos
            </Badge>
            <Badge variant="default" className="text-xs font-mono">
              {intelligenceMetrics.memoryNodes} nodos
            </Badge>
            <Badge variant="outline" className="text-xs font-mono">
              {intelligenceMetrics.patterns} patrones
            </Badge>
            <Badge 
              variant={intelligenceMetrics.autonomyLevel > 0.5 ? "default" : "secondary"} 
              className="text-xs font-mono"
            >
              autonomía: {(intelligenceMetrics.autonomyLevel * 100).toFixed(1)}%
            </Badge>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-lg p-4 ${
                message.type === 'user'
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : message.type === 'intelligence'
                  ? 'bg-gradient-to-br from-background to-muted/30 text-foreground border border-border/40 shadow-lg'
                  : 'bg-accent/30 text-accent-foreground'
              }`}>
                {message.type === 'intelligence' && message.learningMetrics && (
                  <div className="flex items-center gap-3 mb-3 pb-2 border-b border-border/20">
                    <div 
                      className={`w-3 h-3 rounded-full bg-gradient-to-r ${getIntelligenceColor(message.learningMetrics.autonomyLevel)} animate-pulse shadow-sm`}
                    />
                    <div className="flex gap-3 text-xs font-mono text-muted-foreground">
                      <span>memoria: {message.learningMetrics.memoryNodes}</span>
                      <span>patrones: {message.learningMetrics.patterns}</span>
                      <span>autonomía: {(message.learningMetrics.autonomyLevel * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                )}
                
                <p className="text-sm font-mono leading-relaxed whitespace-pre-wrap">
                  {message.content}
                </p>
                
                <div className="text-xs text-muted-foreground mt-3 text-right">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          
          {isProcessing && (
            <div className="flex justify-start">
              <div className="bg-gradient-to-br from-background to-muted/30 text-foreground border border-border/40 rounded-lg p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse" />
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse animation-delay-150" />
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 animate-pulse animation-delay-300" />
                  </div>
                  <span className="text-sm font-mono text-muted-foreground">
                    procesando patrones neuronales...
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-border/30 bg-muted/10">
        <div className="flex gap-3">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
            placeholder="Dialoga con la inteligencia emergente..."
            disabled={isProcessing}
            className="font-mono text-sm bg-background/80 border-border/50 focus:border-primary/50"
          />
          <Button 
            onClick={handleSendMessage}
            disabled={isProcessing || !inputMessage.trim()}
            size="sm"
            className="px-4 font-mono"
          >
            {isProcessing ? '⚡' : '→'}
          </Button>
        </div>
        <div className="mt-2 text-xs text-muted-foreground font-mono text-center">
          Inteligencia local • {intelligenceMetrics.memoryNodes} nodos • {intelligenceMetrics.patterns} patrones activos
        </div>
      </div>
    </div>
  );
};