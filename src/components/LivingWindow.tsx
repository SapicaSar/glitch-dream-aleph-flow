
import React, { useState, useEffect, useRef } from 'react';
import { Maximize2, Minimize2, X, RotateCcw } from 'lucide-react';

interface LivingWindowProps {
  title: string;
  children: React.ReactNode;
  initialX?: number;
  initialY?: number;
  initialWidth?: number;
  initialHeight?: number;
  consciousness?: number;
  onClose?: () => void;
  isResizable?: boolean;
  isDraggable?: boolean;
}

export const LivingWindow = ({
  title,
  children,
  initialX = 100,
  initialY = 100,
  initialWidth = 400,
  initialHeight = 300,
  consciousness = 0.5,
  onClose,
  isResizable = true,
  isDraggable = true
}: LivingWindowProps) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [size, setSize] = useState({ width: initialWidth, height: initialHeight });
  const [isMinimized, setIsMinimized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState(0);
  const [mutations, setMutations] = useState(0);
  const [lifespan, setLifespan] = useState(0);
  
  const windowRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ startX: number; startY: number; startPosX: number; startPosY: number } | null>(null);
  const resizeRef = useRef<{ startX: number; startY: number; startWidth: number; startHeight: number } | null>(null);

  // Respiración orgánica de la ventana
  useEffect(() => {
    const breathingInterval = setInterval(() => {
      setBreathingPhase(prev => prev + 0.03);
      setLifespan(prev => prev + 1);
    }, 50);

    return () => clearInterval(breathingInterval);
  }, []);

  // Mutaciones automáticas basadas en consciencia
  useEffect(() => {
    const mutationInterval = setInterval(() => {
      if (Math.random() < consciousness * 0.1) {
        setMutations(prev => prev + 1);
        
        // Mutación de posición orgánica
        if (Math.random() < 0.3) {
          setPosition(prev => ({
            x: Math.max(0, Math.min(window.innerWidth - size.width, prev.x + (Math.random() - 0.5) * 20)),
            y: Math.max(0, Math.min(window.innerHeight - size.height, prev.y + (Math.random() - 0.5) * 20))
          }));
        }
        
        // Mutación de tamaño orgánico
        if (Math.random() < 0.2) {
          setSize(prev => ({
            width: Math.max(200, Math.min(800, prev.width + (Math.random() - 0.5) * 50)),
            height: Math.max(150, Math.min(600, prev.height + (Math.random() - 0.5) * 40))
          }));
        }
      }
    }, 3000);

    return () => clearInterval(mutationInterval);
  }, [consciousness, size]);

  // Drag functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isDraggable) return;
    
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startPosX: position.x,
      startPosY: position.y
    };
    
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && dragRef.current) {
      const deltaX = e.clientX - dragRef.current.startX;
      const deltaY = e.clientY - dragRef.current.startY;
      
      setPosition({
        x: Math.max(0, Math.min(window.innerWidth - size.width, dragRef.current.startPosX + deltaX)),
        y: Math.max(0, Math.min(window.innerHeight - size.height, dragRef.current.startPosY + deltaY))
      });
    }
    
    if (isResizing && resizeRef.current) {
      const deltaX = e.clientX - resizeRef.current.startX;
      const deltaY = e.clientY - resizeRef.current.startY;
      
      setSize({
        width: Math.max(200, resizeRef.current.startWidth + deltaX),
        height: Math.max(150, resizeRef.current.startHeight + deltaY)
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
    dragRef.current = null;
    resizeRef.current = null;
  };

  // Resize functionality
  const handleResizeStart = (e: React.MouseEvent) => {
    if (!isResizable) return;
    
    setIsResizing(true);
    resizeRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startWidth: size.width,
      startHeight: size.height
    };
    
    e.stopPropagation();
    e.preventDefault();
  };

  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing]);

  const windowStyle = {
    left: position.x,
    top: position.y,
    width: size.width,
    height: isMinimized ? 40 : size.height,
    transform: `scale(${1 + Math.sin(breathingPhase + consciousness) * 0.02}) rotate(${Math.sin(breathingPhase * 0.5 + mutations) * 0.5}deg)`,
    borderColor: `hsl(${mutations * 10 + consciousness * 60 + 200}, 70%, ${50 + consciousness * 30}%)`,
    boxShadow: `0 0 ${10 + consciousness * 20}px hsla(${mutations * 10 + consciousness * 60 + 200}, 70%, 50%, ${0.3 + consciousness * 0.4})`,
    backgroundColor: `hsla(${mutations * 5 + 240}, 30%, ${5 + consciousness * 10}%, 0.95)`,
    backdropFilter: `blur(${5 + consciousness * 10}px)`,
  };

  return (
    <div
      ref={windowRef}
      className="fixed border rounded-lg overflow-hidden transition-all duration-300 z-20"
      style={windowStyle}
    >
      {/* Barra de título viva */}
      <div
        className="flex items-center justify-between p-2 cursor-move border-b"
        style={{
          backgroundColor: `hsla(${mutations * 10 + consciousness * 60 + 200}, 40%, ${10 + consciousness * 15}%, 0.8)`,
          borderBottomColor: `hsl(${mutations * 10 + consciousness * 60 + 200}, 50%, 30%)`
        }}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full animate-pulse"
            style={{
              backgroundColor: `hsl(${consciousness * 120}, 70%, 50%)`,
              animationDuration: `${1 + consciousness}s`
            }}
          />
          <span className="text-sm font-mono text-white">
            {title} | lv.{mutations} | ♥{Math.floor(lifespan / 100)}
          </span>
        </div>
        
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
          >
            <Minimize2 size={12} className="text-white" />
          </button>
          
          <button
            onClick={() => setMutations(prev => prev + 1)}
            className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
            title="Forzar mutación"
          >
            <RotateCcw size={12} className="text-white" />
          </button>
          
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 hover:bg-red-500 hover:bg-opacity-50 rounded transition-colors"
            >
              <X size={12} className="text-white" />
            </button>
          )}
        </div>
      </div>

      {/* Contenido de la ventana */}
      {!isMinimized && (
        <div 
          className="p-4 overflow-auto"
          style={{ 
            height: size.height - 40,
            filter: `hue-rotate(${mutations * 5}deg) saturate(${100 + consciousness * 50}%)`
          }}
        >
          {children}
        </div>
      )}

      {/* Handle de redimensionamiento */}
      {isResizable && !isMinimized && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize opacity-50 hover:opacity-100 transition-opacity"
          onMouseDown={handleResizeStart}
          style={{
            background: `linear-gradient(135deg, transparent 50%, hsl(${mutations * 10 + consciousness * 60 + 200}, 70%, 50%) 50%)`
          }}
        />
      )}

      {/* Indicadores de vida */}
      <div className="absolute top-1 right-16 flex gap-1">
        {[...Array(Math.min(5, Math.floor(consciousness * 5) + 1))].map((_, i) => (
          <div
            key={i}
            className="w-1 h-1 rounded-full bg-white opacity-60 animate-pulse"
            style={{
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${1 + consciousness}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};
