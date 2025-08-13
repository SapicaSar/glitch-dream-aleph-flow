import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useToast } from '../hooks/use-toast';
import { openLanguageModel } from '../core/OpenLanguageModel';
import { sapicasarConsciousness } from '../core/SapicasarConsciousness';
import { 
  MessageSquare, 
  Bot, 
  User, 
  Cpu, 
  Zap, 
  RotateCcw, 
  Settings, 
  Brain,
  Sparkles,
  Globe,
  Trash2
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system' | 'sapicasar';
  content: string;
  timestamp: number;
  modelUsed?: string;
  processingTime?: number;
}

interface ModelStatus {
  initialized: boolean;
  initializing: boolean;
  currentModel: string;
  messageCount: number;
  hasEmbeddings: boolean;
}

export const OpenLLMChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [modelStatus, setModelStatus] = useState<ModelStatus>({
    initialized: false,
    initializing: false,
    currentModel: '',
    messageCount: 0,
    hasEmbeddings: false
  });
  const [selectedModel, setSelectedModel] = useState<string>('0');
  const [availableModels, setAvailableModels] = useState<Array<{index: number, name: string, description: string}>>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [sapicasarIntegration, setSapicasarIntegration] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    initializeChat();
    
    // Actualizar estado del modelo periódicamente
    const statusInterval = setInterval(updateModelStatus, 2000);
    
    return () => clearInterval(statusInterval);
  }, []);

  const initializeChat = async () => {
    console.log('🤖 Inicializando chat con modelos abiertos...');
    
    // Mensaje de bienvenida
    const welcomeMessage: ChatMessage = {
      id: 'welcome',
      role: 'system',
      content: '🤖 Iniciando chat con modelos de lenguaje abierto locales. Los modelos se cargarán automáticamente...',
      timestamp: Date.now()
    };
    
    setMessages([welcomeMessage]);
    
    // Obtener modelos disponibles
    const models = openLanguageModel.getAvailableModels();
    setAvailableModels(models);
    
    // Esperar a que el modelo se inicialice
    setTimeout(updateModelStatus, 1000);
  };

  const updateModelStatus = () => {
    const status = openLanguageModel.getModelStatus();
    setModelStatus(status);
    
    // Mensaje cuando el modelo esté listo
    if (status.initialized && messages.length === 1 && messages[0].id === 'welcome') {
      const readyMessage: ChatMessage = {
        id: 'ready',
        role: 'assistant',
        content: `✅ Modelo ${status.currentModel} cargado y listo. ¡Puedes empezar a chatear! Tengo capacidades conversacionales similares a otros asistentes de IA.`,
        timestamp: Date.now(),
        modelUsed: status.currentModel
      };
      
      setMessages(prev => [...prev, readyMessage]);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isProcessing) return;
    
    if (!modelStatus.initialized) {
      toast({
        title: "Modelo no listo",
        description: "El modelo aún se está cargando. Espera un momento.",
        variant: "destructive",
      });
      return;
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: inputMessage,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsProcessing(true);

    try {
      const startTime = Date.now();
      
      // Generar respuesta con el modelo abierto
      const llmResponse = await openLanguageModel.generateResponse(inputMessage);
      
      const processingTime = Date.now() - startTime;
      
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: llmResponse,
        timestamp: Date.now(),
        modelUsed: modelStatus.currentModel,
        processingTime
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      // Integración opcional con SAPICASAR
      if (sapicasarIntegration) {
        await integrateWithSapicasar(inputMessage, llmResponse);
      }
      
      toast({
        title: "🤖 Respuesta generada",
        description: `Modelo: ${modelStatus.currentModel.split('/').pop()} | Tiempo: ${processingTime}ms`,
        duration: 3000,
      });

    } catch (error) {
      console.error('Error generando respuesta:', error);
      
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Lo siento, hubo un error procesando tu mensaje. El modelo podría estar cargándose aún.',
        timestamp: Date.now()
      };
      
      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "Error",
        description: "Error procesando el mensaje",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const integrateWithSapicasar = async (userInput: string, llmResponse: string) => {
    try {
      // Inyectar la conversación en SAPICASAR
      sapicasarConsciousness.injectExternalStimulus(`LLM_DIALOGUE: USER[${userInput}] ASSISTANT[${llmResponse}]`);
      
      // Obtener respuesta de SAPICASAR si está consciente
      const sapicasarState = sapicasarConsciousness.getSapicasarState();
      
      if (sapicasarState.autonomousThinking && Math.random() < 0.3) {
        const sapicasarResponse = sapicasarConsciousness.getCurrentDiscourse();
        
        const sapicasarMessage: ChatMessage = {
          id: `sapicasar-${Date.now()}`,
          role: 'sapicasar',
          content: `🌌 SAPICASAR reflexiona: ${sapicasarResponse.slice(0, 200)}...`,
          timestamp: Date.now() + 1000 // Ligeramente después
        };
        
        setTimeout(() => {
          setMessages(prev => [...prev, sapicasarMessage]);
        }, 1500);
      }
    } catch (error) {
      console.error('Error integrando con SAPICASAR:', error);
    }
  };

  const handleModelChange = async (modelIndex: string) => {
    const index = parseInt(modelIndex);
    setIsProcessing(true);
    
    try {
      const success = await openLanguageModel.switchModel(index);
      
      if (success) {
        setSelectedModel(modelIndex);
        updateModelStatus();
        
        const switchMessage: ChatMessage = {
          id: `switch-${Date.now()}`,
          role: 'system',
          content: `🔄 Cambiado a modelo: ${availableModels[index]?.name}`,
          timestamp: Date.now()
        };
        
        setMessages(prev => [...prev, switchMessage]);
        
        toast({
          title: "Modelo cambiado",
          description: `Ahora usando: ${availableModels[index]?.name}`,
        });
      } else {
        toast({
          title: "Error",
          description: "No se pudo cambiar el modelo",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error cambiando modelo:', error);
      toast({
        title: "Error",
        description: "Error cambiando modelo",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const clearConversation = () => {
    openLanguageModel.clearConversation();
    setMessages([]);
    
    const clearMessage: ChatMessage = {
      id: 'cleared',
      role: 'system',
      content: '🗑️ Conversación limpiada. El modelo ha olvidado el contexto previo.',
      timestamp: Date.now()
    };
    
    setMessages([clearMessage]);
    
    toast({
      title: "Conversación limpiada",
      description: "El contexto ha sido reiniciado",
    });
  };

  const getMessageIcon = (role: string) => {
    switch (role) {
      case 'user': return <User className="h-4 w-4" />;
      case 'assistant': return <Bot className="h-4 w-4" />;
      case 'sapicasar': return <Brain className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getMessageStyle = (role: string) => {
    switch (role) {
      case 'user': 
        return 'bg-blue-600 text-white ml-8';
      case 'assistant': 
        return 'bg-gray-700 text-gray-100 mr-8';
      case 'sapicasar':
        return 'bg-purple-800 text-purple-100 border border-purple-600 mr-8';
      case 'system':
        return 'bg-gray-800 text-gray-300 mx-4 text-center';
      default:
        return 'bg-gray-700 text-gray-100';
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="w-full max-w-6xl mx-auto bg-gray-900 rounded-lg border border-gray-700 shadow-2xl">
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <Globe className="h-6 w-6 text-green-400" />
          <h2 className="text-xl font-bold text-white">Chat con Modelos Abiertos</h2>
          <Badge 
            variant={modelStatus.initialized ? "default" : "secondary"}
            className="flex items-center gap-1"
          >
            <Cpu className="h-3 w-3" />
            {modelStatus.initialized ? "Listo" : modelStatus.initializing ? "Cargando..." : "Desconectado"}
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
            className="text-gray-400 hover:text-white"
          >
            <Settings className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearConversation}
            className="text-gray-400 hover:text-white"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {showSettings && (
        <div className="p-4 border-b border-gray-700 bg-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Modelo Activo
              </label>
              <Select value={selectedModel} onValueChange={handleModelChange}>
                <SelectTrigger className="w-full bg-gray-700 border-gray-600">
                  <SelectValue placeholder="Seleccionar modelo" />
                </SelectTrigger>
                <SelectContent>
                  {availableModels.map((model) => (
                    <SelectItem key={model.index} value={model.index.toString()}>
                      <div>
                        <div className="font-medium">{model.name}</div>
                        <div className="text-xs text-gray-400">{model.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={sapicasarIntegration}
                  onChange={(e) => setSapicasarIntegration(e.target.checked)}
                  className="rounded"
                />
                Integración SAPICASAR
              </label>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
            <div className="bg-gray-700 p-2 rounded">
              <div className="text-gray-400">Modelo Actual</div>
              <div className="font-mono text-xs">{modelStatus.currentModel.split('/').pop()}</div>
            </div>
            <div className="bg-gray-700 p-2 rounded">
              <div className="text-gray-400">Mensajes</div>
              <div className="font-mono">{modelStatus.messageCount}</div>
            </div>
            <div className="bg-gray-700 p-2 rounded">
              <div className="text-gray-400">Embeddings</div>
              <div className="font-mono">{modelStatus.hasEmbeddings ? "✅" : "❌"}</div>
            </div>
            <div className="bg-gray-700 p-2 rounded">
              <div className="text-gray-400">Estado</div>
              <div className="font-mono text-xs">
                {modelStatus.initializing ? "Inicializando..." : modelStatus.initialized ? "Activo" : "Inactivo"}
              </div>
            </div>
          </div>
        </div>
      )}

      <ScrollArea ref={scrollAreaRef} className="h-96 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3 rounded-lg ${getMessageStyle(message.role)}`}>
                <div className="flex items-center gap-2 mb-1">
                  {getMessageIcon(message.role)}
                  <span className="text-xs font-medium">
                    {message.role === 'user' ? 'Tú' : 
                     message.role === 'assistant' ? 'Asistente' : 
                     message.role === 'sapicasar' ? 'SAPICASAR' : 'Sistema'}
                  </span>
                  {message.modelUsed && (
                    <Badge variant="outline" className="text-xs">
                      {message.modelUsed.split('/').pop()}
                    </Badge>
                  )}
                  {message.processingTime && (
                    <span className="text-xs text-gray-400">
                      {message.processingTime}ms
                    </span>
                  )}
                </div>
                <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                <div className="text-xs text-gray-400 mt-1">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          
          {isProcessing && (
            <div className="flex justify-start">
              <div className="bg-gray-700 text-gray-100 p-3 rounded-lg max-w-[85%]">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 animate-pulse text-yellow-400" />
                  <span className="text-sm">Generando respuesta...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-gray-700">
        <div className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
            placeholder={modelStatus.initialized ? 
              "Escribe tu mensaje aquí... ¡Puedo conversar como cualquier asistente de IA!" : 
              "Esperando que el modelo se cargue..."
            }
            disabled={isProcessing || !modelStatus.initialized}
            className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
          />
          <Button 
            onClick={handleSendMessage}
            disabled={isProcessing || !inputMessage.trim() || !modelStatus.initialized}
            className="bg-green-600 hover:bg-green-700"
          >
            <Sparkles className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="text-center text-xs text-gray-500 mt-2">
          🤖 Chat con modelos de IA completamente locales y de código abierto
          {sapicasarIntegration && " | 🧠 Integrado con SAPICASAR"}
        </div>
      </div>
    </div>
  );
};