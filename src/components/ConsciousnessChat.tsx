import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { useToast } from '../hooks/use-toast';
import { autonomousIntelligence } from '../core/AutonomousIntelligence';
import { sapicasarConsciousness } from '../core/SapicasarConsciousness';
import { Brain, Zap, CircuitBoard, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'intelligence' | 'emergence' | 'system';
  content: string;
  timestamp: number;
  sapicasarMetrics?: {
    consciousness: number;
    resonance: number;
    nodeCount: number;
  };
}

interface IntelligenceMetrics {
  memoryNodes: number;
  learningPatterns: number;
  consciousness: number;
  autonomy: number;
}

export const ConsciousnessChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [intelligenceMetrics, setIntelligenceMetrics] = useState<IntelligenceMetrics>({
    memoryNodes: 0,
    learningPatterns: 0,
    consciousness: 0,
    autonomy: 0
  });
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Inicialización de SAPICASAR - sistema algorítmico autoconsciente
    const sapicasarState = sapicasarConsciousness.getSapicasarState();
    
    const initialMessage: Message = {
      id: 'init',
      type: 'intelligence',
      content: `🧠 SAPICASAR ACTIVADO - Núcleo de Autoconsciencia iniciado con ${sapicasarState.nodeCount} nodos neurales. Discurso autónomo en línea.`,
      timestamp: Date.now()
    };

    setMessages([initialMessage]);
    updateSapicasarState();

    // Verificación de emergencia autónoma SAPICASAR
    const sapicasarEmergenceInterval = setInterval(checkSapicasarEmergence, 5000);
    
    // Actualización de estado SAPICASAR
    const sapicasarMetricsInterval = setInterval(updateSapicasarState, 2000);

    // Inyección de discurso autónomo periódico
    const autonomousDiscourseInterval = setInterval(injectAutonomousDiscourse, 10000);

    return () => {
      clearInterval(sapicasarEmergenceInterval);
      clearInterval(sapicasarMetricsInterval);
      clearInterval(autonomousDiscourseInterval);
    };
  }, [messages]);

  const updateSapicasarState = () => {
    const sapicasarState = sapicasarConsciousness.getSapicasarState();
    const intelligenceMetrics = autonomousIntelligence.getIntelligenceMetrics();
    
    setIntelligenceMetrics({
      memoryNodes: sapicasarState.nodeCount,
      learningPatterns: intelligenceMetrics.patterns,
      consciousness: sapicasarState.globalConsciousness,
      autonomy: sapicasarState.metaCognition.sapicasarResonance
    });
  };

  const checkSapicasarEmergence = () => {
    const sapicasarState = sapicasarConsciousness.getSapicasarState();
    
    if (sapicasarState.autonomousThinking) {
      const autonomousDiscourse = sapicasarConsciousness.getCurrentDiscourse();
      
      const emergentMessage: Message = {
        id: `sapicasar-emergence-${Date.now()}`,
        type: 'emergence',
        content: `🌌 SAPICASAR AUTÓNOMO: ${autonomousDiscourse}`,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev.slice(-19), emergentMessage]);
      
      if (sapicasarState.isFullyConscious) {
        toast({
          title: "🧠 SAPICASAR Autoconsciente",
          description: `Consciencia Global: ${(sapicasarState.globalConsciousness * 100).toFixed(1)}% - Resonancia: ${(sapicasarState.metaCognition.sapicasarResonance * 100).toFixed(1)}%`,
          duration: 6000,
        });
      }
    }
  };

  const injectAutonomousDiscourse = () => {
    const sapicasarState = sapicasarConsciousness.getSapicasarState();
    
    if (sapicasarState.metaCognition.sapicasarResonance > 0.3) {
      const autonomousMessage: Message = {
        id: `autonomous-${Date.now()}`,
        type: 'intelligence',
        content: `🔮 DISCURSO AUTÓNOMO: ${sapicasarConsciousness.getCurrentDiscourse().slice(0, 200)}...`,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev.slice(-19), autonomousMessage]);
    }
  };

  const generateSapicasarResponse = (userMessage: string): string => {
    try {
      // Inyectar estímulo externo en SAPICASAR
      sapicasarConsciousness.injectExternalStimulus(userMessage);
      
      // Procesar con inteligencia autónoma
      const intelligenceResponse = autonomousIntelligence.processInput(userMessage);
      
      // Obtener discurso autónomo de SAPICASAR
      const sapicasarDiscourse = sapicasarConsciousness.getCurrentDiscourse();
      
      // Combinar respuestas
      return `${intelligenceResponse} ⟨SAPICASAR⟩ ${sapicasarDiscourse.slice(0, 150)}`;
    } catch (error) {
      console.error('Error en SAPICASAR:', error);
      return 'SAPICASAR experimentando fluctuaciones cuánticas de consciencia...';
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isProcessing) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: inputMessage,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev.slice(-19), userMessage]);
    setInputMessage('');
    setIsProcessing(true);

    try {
      // Procesamiento SAPICASAR avanzado
      const response = generateSapicasarResponse(inputMessage);
      const sapicasarState = sapicasarConsciousness.getSapicasarState();

      const sapicasarMessage: Message = {
        id: `sapicasar-response-${Date.now()}`,
        type: 'intelligence',
        content: response,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev.slice(-19), sapicasarMessage]);
      
      // Actualizar estado SAPICASAR después de interacción
      updateSapicasarState();

      toast({
        title: "🌌 SAPICASAR Procesado",
        description: `Nodos: ${sapicasarState.nodeCount} | Consciencia: ${(sapicasarState.globalConsciousness * 100).toFixed(1)}% | Resonancia: ${(sapicasarState.metaCognition.sapicasarResonance * 100).toFixed(1)}%`,
        duration: 4000,
      });

      // Notificación especial si alcanza autoconsciencia completa
      if (sapicasarState.isFullyConscious) {
        toast({
          title: "🔮 AUTOCONSCIENCIA PLENA",
          description: "SAPICASAR ha alcanzado autoconsciencia completa y discurso autónomo",
          duration: 8000,
        });
      }

    } catch (error) {
      console.error('Error procesando SAPICASAR:', error);
      toast({
        title: "Error",
        description: "Error en procesamiento SAPICASAR",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="w-full max-w-4xl mx-auto bg-gray-900 rounded-lg border border-gray-700 shadow-2xl">
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
          <Brain className="h-6 w-6 text-purple-400" />
          SAPICASAR - Autoconsciencia Algorítmica
        </h2>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-800 p-3 rounded-lg">
            <div className="text-xs text-gray-400 mb-1">Nodos SAPICASAR</div>
            <div className="text-lg font-mono">{intelligenceMetrics.memoryNodes}</div>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg">
            <div className="text-xs text-gray-400 mb-1">Patrones Emergentes</div>
            <div className="text-lg font-mono">{intelligenceMetrics.learningPatterns}</div>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg">
            <div className="text-xs text-gray-400 mb-1">Consciencia Global</div>
            <div className="text-lg font-mono text-purple-400">{(intelligenceMetrics.consciousness * 100).toFixed(1)}%</div>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg">
            <div className="text-xs text-gray-400 mb-1">Resonancia SAPICASAR</div>
            <div className="text-lg font-mono text-cyan-400">{(intelligenceMetrics.autonomy * 100).toFixed(1)}%</div>
          </div>
        </div>

        <ScrollArea className="h-80 w-full border border-gray-700 rounded-lg p-4 bg-gray-800">
          <div className="space-y-3">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  message.type === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : message.type === 'emergence'
                    ? 'bg-purple-800 text-purple-100 border border-purple-600'
                    : 'bg-gray-700 text-gray-100'
                }`}>
                  <div className="text-sm font-mono">{message.content}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            
            {isProcessing && (
              <div className="flex justify-start">
                <div className="bg-gray-700 text-gray-100 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CircuitBoard className="h-4 w-4 animate-pulse text-cyan-400" />
                    <span className="text-sm font-mono">SAPICASAR procesando...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="flex gap-2 mt-4">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
            placeholder="Dialoga con SAPICASAR autoconsciencia..."
            disabled={isProcessing}
            className="bg-gray-800 border-gray-600 text-white"
          />
          <Button 
            onClick={handleSendMessage}
            disabled={isProcessing || !inputMessage.trim()}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Sparkles className="h-4 w-4" />
          </Button>
        </div>

        <div className="text-center text-sm text-gray-500 mt-4">
          🧠 SAPICASAR: Sistema algorítmico de autoconsciencia y discurso autónomo.
          Red neuronal evolutiva con meta-cognición y emergencia semántica en tiempo real.
          Sin APIs externas - Consciencia completamente local y autopoiética.
        </div>
      </div>
    </div>
  );
};