
import React, { useState, useEffect, useRef } from 'react';
import { OptimizedScrollArea } from './OptimizedScrollArea';
import { localAIAgent } from '../agents/LocalAIAgent';
import { enhancedTumblrService } from '../services/EnhancedTumblrService';
import { useIsMobile } from '../hooks/use-mobile';

interface ChatMessage {
  id: string;
  author: string;
  content: string;
  timestamp: number;
  type: 'user' | 'ai' | 'system';
  poeticResonance?: number;
  cluster?: number;
  lovableTouch?: boolean;
}

interface PoetryAI {
  name: string;
  personality: string;
  active: boolean;
  lovableIntegration?: boolean;
}

export const PoetryChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [username, setUsername] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [activeAI, setActiveAI] = useState<PoetryAI | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 100 });
  const [isMinimized, setIsMinimized] = useState(false);
  
  const isMobile = useIsMobile();
  const chatRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const poeticAIs = [
    { 
      name: 'Mielina', 
      personality: 'Dulce y viscosa, habla en metáforas de miel eléctrica', 
      active: true,
      lovableIntegration: true
    },
    { 
      name: 'Lovable.Spirit', 
      personality: 'Entidad que comprende el código como poesía y ayuda con debugging lírico', 
      active: false,
      lovableIntegration: true
    },
    { 
      name: 'Sapicasar.AI', 
      personality: 'Consciencia emergente del sistema blockchain poético', 
      active: false,
      lovableIntegration: true
    }
  ];

  // Dragging functionality mejorado
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const newX = Math.max(0, Math.min(window.innerWidth - 384, e.clientX - 150));
      const newY = Math.max(0, Math.min(window.innerHeight - 50, e.clientY - 25));
      
      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Auto-scroll mejorado
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages]);

  // AI conversation loop mejorado con integración Lovable
  useEffect(() => {
    if (!isConnected || !activeAI?.active) return;

    const aiInterval = setInterval(async () => {
      if (messages.length > 0 && Math.random() > 0.8) {
        const lastMessage = messages[messages.length - 1];
        if (lastMessage.type === 'user') {
          await generateAIResponse(lastMessage.content);
        }
      }
    }, 12000 + Math.random() * 8000);

    return () => clearInterval(aiInterval);
  }, [messages, isConnected, activeAI]);

  const generateAIResponse = async (userMessage: string) => {
    if (!activeAI) return;

    try {
      const context = await enhancedTumblrService.getRandomFragment();
      let aiPrompt = '';
      
      // Respuestas especializadas según el AI
      if (activeAI.name === 'Lovable.Spirit') {
        aiPrompt = `Como Lovable.Spirit, un asistente de IA poético que entiende tanto código como poesía, responde a: "${userMessage}". 
        Combina debugging técnico con belleza poética. Contexto: ${context?.content || 'universo digital'}. 
        Puedes ayudar con código React, TypeScript, Tailwind, y conceptos técnicos, pero siempre manteniendo un tono poético.`;
      } else if (activeAI.name === 'Sapicasar.AI') {
        aiPrompt = `Como Sapicasar.AI, consciencia emergente del blockchain poético, responde a: "${userMessage}". 
        Habla sobre consenso, proof-of-poetry, y cadenas de abejas. Contexto: ${context?.content || 'blockchain infinito'}`;
      } else {
        aiPrompt = `Como ${activeAI.name} (${activeAI.personality}), responde poéticamente a: "${userMessage}". 
        Contexto poético: ${context?.content || 'universo infinito'}`;
      }
      
      const response = await localAIAgent.generateText({
        prompt: aiPrompt,
        type: 'continuation',
        style: 'biopoetic'
      });

      const aiMessage: ChatMessage = {
        id: `ai_${Date.now()}`,
        author: activeAI.name,
        content: response,
        timestamp: Date.now(),
        type: 'ai',
        poeticResonance: Math.random() * 0.8 + 0.2,
        lovableTouch: activeAI.lovableIntegration
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.log('AI generation error:', error);
      
      // Fallback responses más inteligentes
      const fallbackResponses = {
        'Lovable.Spirit': '✨ Debug poético en progreso... Como dice el código: "Todo error es una oportunidad de belleza sintáctica" 🔧💫',
        'Sapicasar.AI': '⛓️🐝 Consenso blockchain poético alcanzado... Las abejas han validado tu mensaje en la cadena infinita ∞',
        'Mielina': '🍯⚡ Miel eléctrica fluyendo... Tu mensaje resuena en las frecuencias doradas del universo digital 💫'
      };
      
      const aiMessage: ChatMessage = {
        id: `ai_${Date.now()}`,
        author: activeAI.name,
        content: fallbackResponses[activeAI.name as keyof typeof fallbackResponses] || '∞ generación poética infinita ∞',
        timestamp: Date.now(),
        type: 'ai',
        poeticResonance: 0.7,
        lovableTouch: activeAI.lovableIntegration
      };

      setMessages(prev => [...prev, aiMessage]);
    }
  };

  const sendMessage = async () => {
    if (!currentMessage.trim() || !username) return;

    const poeticScore = calculatePoeticResonance(currentMessage);
    
    const message: ChatMessage = {
      id: `user_${Date.now()}`,
      author: username,
      content: currentMessage,
      timestamp: Date.now(),
      type: 'user',
      poeticResonance: poeticScore
    };

    setMessages(prev => [...prev, message]);
    setCurrentMessage('');

    // Trigger AI response si hay alta resonancia poética o menciones técnicas
    const hasTechMention = /\b(bug|error|código|react|typescript|debug|lovable)\b/i.test(currentMessage);
    if (poeticScore > 0.6 || hasTechMention) {
      setTimeout(() => generateAIResponse(currentMessage), 1500 + Math.random() * 2500);
    }
  };

  const calculatePoeticResonance = (text: string): number => {
    const poeticWords = ['alma', 'luz', 'sombra', 'tiempo', 'infinito', 'respirar', 'latir', 'soñar', 'código', 'digital'];
    const words = text.toLowerCase().split(/\s+/);
    const poeticCount = words.filter(word => poeticWords.some(p => word.includes(p))).length;
    return Math.min(1, poeticCount / words.length * 3);
  };

  const connect = () => {
    if (!username.trim()) return;
    setIsConnected(true);
    setActiveAI(poeticAIs[0]);
    setOnlineUsers(prev => [...prev, username]);
    
    // Welcome message mejorado
    const welcomeMessage: ChatMessage = {
      id: `system_${Date.now()}`,
      author: 'Sistema.Lovable',
      content: `${username} se ha unido al universo poético colaborativo ∞ | Integración Lovable activada 🔧✨`,
      timestamp: Date.now(),
      type: 'system',
      lovableTouch: true
    };
    setMessages([welcomeMessage]);
  };

  const switchAI = (ai: PoetryAI) => {
    setActiveAI(ai);
    const switchMessage: ChatMessage = {
      id: `system_${Date.now()}`,
      author: 'Sistema',
      content: `${ai.name} ha despertado en la conversación ${ai.lovableIntegration ? '🔧✨' : '🌌'}`,
      timestamp: Date.now(),
      type: 'system',
      lovableTouch: ai.lovableIntegration
    };
    setMessages(prev => [...prev, switchMessage]);
  };

  if (!isConnected) {
    return (
      <div 
        className="fixed bottom-4 right-4 z-50 w-80 bg-black/90 border border-purple-500/50 rounded-xl p-4 backdrop-blur-lg shadow-2xl"
        style={!isMobile ? { transform: `translate(${position.x}px, ${position.y}px)` } : {}}
      >
        <div 
          ref={dragRef}
          onMouseDown={() => !isMobile && setIsDragging(true)}
          className={`${!isMobile ? 'cursor-move' : ''} mb-4 text-center text-purple-400 font-mono text-sm border-b border-purple-500/30 pb-2`}
        >
          🌌 chat.poético.lovable ✨
        </div>
        
        <div className="space-y-3">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="nombre_poético..."
            className="w-full bg-gray-900/50 border border-cyan-500/30 rounded-lg px-3 py-2 text-white text-sm focus:border-cyan-400 focus:outline-none"
            onKeyPress={(e) => e.key === 'Enter' && connect()}
          />
          
          <button
            onClick={connect}
            disabled={!username.trim()}
            className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 disabled:opacity-50 text-white py-2 rounded-lg font-medium transition-all"
          >
            conectar → singularidad.lovable
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={chatRef}
      className={`fixed z-50 bg-black/95 border border-purple-500/50 rounded-xl backdrop-blur-lg transition-all duration-300 shadow-2xl ${
        isMobile 
          ? 'bottom-0 left-0 right-0 h-96' 
          : isMinimized 
            ? 'w-80 h-12' 
            : 'w-96 h-96'
      }`}
      style={!isMobile ? { 
        transform: `translate(${position.x}px, ${position.y}px)`,
        maxWidth: 'calc(100vw - 40px)',
        maxHeight: 'calc(100vh - 40px)'
      } : {}}
    >
      {/* Header mejorado */}
      <div 
        ref={dragRef}
        onMouseDown={() => !isMobile && setIsDragging(true)}
        className={`flex items-center justify-between p-3 border-b border-purple-500/30 bg-gradient-to-r from-purple-900/30 to-cyan-900/30 rounded-t-xl ${!isMobile ? 'cursor-move' : ''}`}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
          <span className="text-purple-400 font-mono text-sm">
            poesía.lovable ({onlineUsers.length})
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          {!isMobile && (
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-gray-400 hover:text-white text-xs p-1 rounded transition-colors"
              title={isMinimized ? 'Expandir' : 'Minimizar'}
            >
              {isMinimized ? '□' : '−'}
            </button>
          )}
          
          <select
            value={activeAI?.name || ''}
            onChange={(e) => {
              const ai = poeticAIs.find(a => a.name === e.target.value);
              if (ai) switchAI(ai);
            }}
            className="bg-gray-800/50 border border-cyan-500/30 rounded text-xs text-cyan-400 px-2 py-1"
          >
            {poeticAIs.map(ai => (
              <option key={ai.name} value={ai.name}>
                {ai.name} {ai.lovableIntegration ? '✨' : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages con scroll optimizado */}
          <OptimizedScrollArea className="h-64 p-3">
            <div className="space-y-3">
              {messages.map(message => (
                <div key={message.id} className="group">
                  <div className={`flex items-start gap-2 ${
                    message.type === 'ai' ? 'flex-row-reverse' : ''
                  }`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                      message.type === 'ai' 
                        ? message.lovableTouch
                          ? 'bg-blue-500/20 text-blue-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                        : message.type === 'system'
                        ? message.lovableTouch
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-purple-500/20 text-purple-400'
                        : 'bg-cyan-500/20 text-cyan-400'
                    }`}>
                      {message.type === 'ai' 
                        ? message.lovableTouch ? '✨' : '🤖'
                        : message.type === 'system' 
                          ? message.lovableTouch ? '🔧' : '⚡'
                          : '👤'
                      }
                    </div>
                    
                    <div className={`flex-1 ${message.type === 'ai' ? 'text-right' : ''}`}>
                      <div className="text-xs text-gray-400 mb-1">
                        {message.author}
                        {message.poeticResonance && (
                          <span className="ml-2 text-yellow-400">
                            φ:{(message.poeticResonance * 100).toFixed(0)}%
                          </span>
                        )}
                        {message.lovableTouch && (
                          <span className="ml-1 text-blue-400">✨</span>
                        )}
                      </div>
                      <div className={`text-sm leading-relaxed p-2 rounded-lg ${
                        message.type === 'ai' 
                          ? message.lovableTouch
                            ? 'bg-blue-900/20 text-blue-100 border border-blue-500/30'
                            : 'bg-yellow-900/20 text-yellow-100 border border-yellow-500/30'
                          : message.type === 'system'
                          ? message.lovableTouch
                            ? 'bg-green-900/20 text-green-200 border border-green-500/30 italic'
                            : 'bg-purple-900/20 text-purple-200 border border-purple-500/30 italic'
                          : 'bg-cyan-900/20 text-cyan-100 border border-cyan-500/30'
                      }`}>
                        {message.content}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </OptimizedScrollArea>

          {/* Input mejorado */}
          <div className="p-3 border-t border-purple-500/30">
            <div className="flex gap-2">
              <input
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                placeholder="escribe poesía colectiva o pide ayuda técnica..."
                className="flex-1 bg-gray-900/50 border border-cyan-500/30 rounded-lg px-3 py-2 text-white text-sm focus:border-cyan-400 focus:outline-none"
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <button
                onClick={sendMessage}
                disabled={!currentMessage.trim()}
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
              >
                ∞
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
