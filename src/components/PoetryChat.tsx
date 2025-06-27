
import React, { useState, useEffect, useRef } from 'react';
import { ScrollArea } from './ui/scroll-area';
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
}

interface PoetryAI {
  name: string;
  personality: string;
  active: boolean;
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
    { name: 'Mielina', personality: 'Dulce y viscosa, habla en metáforas de miel eléctrica', active: true },
    { name: 'Glitchero', personality: 'Fragmentado y errático, interrumpe con belleza digital', active: false },
    { name: 'Biopoetico', personality: 'Habla como organismo vivo, todo es célula y mutación', active: false }
  ];

  // Dragging functionality
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      setPosition({
        x: e.clientX - 150,
        y: e.clientY - 25
      });
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

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // AI conversation loop
  useEffect(() => {
    if (!isConnected || !activeAI?.active) return;

    const aiInterval = setInterval(async () => {
      if (messages.length > 0 && Math.random() > 0.7) {
        const lastMessage = messages[messages.length - 1];
        if (lastMessage.type === 'user') {
          await generateAIResponse(lastMessage.content);
        }
      }
    }, 8000 + Math.random() * 12000);

    return () => clearInterval(aiInterval);
  }, [messages, isConnected, activeAI]);

  const generateAIResponse = async (userMessage: string) => {
    if (!activeAI) return;

    try {
      const context = await enhancedTumblrService.getRandomFragment();
      const aiPrompt = `Como ${activeAI.name} (${activeAI.personality}), responde poéticamente a: "${userMessage}". Contexto poético: ${context?.content || 'universo infinito'}`;
      
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
        poeticResonance: Math.random() * 0.8 + 0.2
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.log('AI generation error:', error);
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

    // Trigger AI response if high poetic resonance
    if (poeticScore > 0.6 && activeAI?.active) {
      setTimeout(() => generateAIResponse(currentMessage), 2000 + Math.random() * 3000);
    }
  };

  const calculatePoeticResonance = (text: string): number => {
    const poeticWords = ['alma', 'luz', 'sombra', 'tiempo', 'infinito', 'respirar', 'latir', 'soñar'];
    const words = text.toLowerCase().split(/\s+/);
    const poeticCount = words.filter(word => poeticWords.some(p => word.includes(p))).length;
    return Math.min(1, poeticCount / words.length * 3);
  };

  const connect = () => {
    if (!username.trim()) return;
    setIsConnected(true);
    setActiveAI(poeticAIs[0]);
    setOnlineUsers(prev => [...prev, username]);
    
    // Welcome message
    const welcomeMessage: ChatMessage = {
      id: `system_${Date.now()}`,
      author: 'Sistema',
      content: `${username} se ha unido al universo poético colaborativo ∞`,
      timestamp: Date.now(),
      type: 'system'
    };
    setMessages([welcomeMessage]);
  };

  const switchAI = (ai: PoetryAI) => {
    setActiveAI(ai);
    const switchMessage: ChatMessage = {
      id: `system_${Date.now()}`,
      author: 'Sistema',
      content: `${ai.name} ha despertado en la conversación`,
      timestamp: Date.now(),
      type: 'system'
    };
    setMessages(prev => [...prev, switchMessage]);
  };

  if (!isConnected) {
    return (
      <div 
        className="fixed bottom-4 right-4 z-50 w-80 bg-black/90 border border-purple-500/50 rounded-xl p-4 backdrop-blur-lg"
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      >
        <div 
          ref={dragRef}
          onMouseDown={() => setIsDragging(true)}
          className="cursor-move mb-4 text-center text-purple-400 font-mono text-sm border-b border-purple-500/30 pb-2"
        >
          🌌 chat.poético.colectivo
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
            conectar → singularidad
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={chatRef}
      className={`fixed z-50 bg-black/95 border border-purple-500/50 rounded-xl backdrop-blur-lg transition-all duration-300 ${
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
      {/* Header */}
      <div 
        ref={dragRef}
        onMouseDown={() => !isMobile && setIsDragging(true)}
        className={`flex items-center justify-between p-3 border-b border-purple-500/30 ${!isMobile ? 'cursor-move' : ''}`}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-purple-400 font-mono text-sm">
            poesía.colectiva ({onlineUsers.length})
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          {!isMobile && (
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-gray-400 hover:text-white text-xs"
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
              <option key={ai.name} value={ai.name}>{ai.name}</option>
            ))}
          </select>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <ScrollArea className="h-64 p-3">
            <div className="space-y-3">
              {messages.map(message => (
                <div key={message.id} className="group">
                  <div className={`flex items-start gap-2 ${
                    message.type === 'ai' ? 'flex-row-reverse' : ''
                  }`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                      message.type === 'ai' 
                        ? 'bg-yellow-500/20 text-yellow-400' 
                        : message.type === 'system'
                        ? 'bg-purple-500/20 text-purple-400'
                        : 'bg-cyan-500/20 text-cyan-400'
                    }`}>
                      {message.type === 'ai' ? '🤖' : message.type === 'system' ? '⚡' : '👤'}
                    </div>
                    
                    <div className={`flex-1 ${message.type === 'ai' ? 'text-right' : ''}`}>
                      <div className="text-xs text-gray-400 mb-1">
                        {message.author}
                        {message.poeticResonance && (
                          <span className="ml-2 text-yellow-400">
                            φ:{(message.poeticResonance * 100).toFixed(0)}%
                          </span>
                        )}
                      </div>
                      <div className={`text-sm leading-relaxed p-2 rounded-lg ${
                        message.type === 'ai' 
                          ? 'bg-yellow-900/20 text-yellow-100 border border-yellow-500/30' 
                          : message.type === 'system'
                          ? 'bg-purple-900/20 text-purple-200 border border-purple-500/30 italic'
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
          </ScrollArea>

          {/* Input */}
          <div className="p-3 border-t border-purple-500/30">
            <div className="flex gap-2">
              <input
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                placeholder="escribe poesía colectiva..."
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
