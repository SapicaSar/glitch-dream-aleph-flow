
import React, { useState, useEffect, useRef } from 'react';
import { Maximize2, Minimize2, X, RotateCcw, Square } from 'lucide-react';
import { windowManager } from '../core/WindowManager';

interface LivingWindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  consciousness?: number;
  onClose?: () => void;
}

export const LivingWindow = ({
  id,
  title,
  children,
  consciousness = 0.5,
  onClose
}: LivingWindowProps) => {
  const [windowState, setWindowState] = useState(windowManager.getWindow(id));
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState(0);
  const [mutations, setMutations] = useState(0);
  
  const windowRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ startX: number; startY: number; startPosX: number; startPosY: number } | null>(null);
  const resizeRef = useRef<{ startX: number; startY: number; startWidth: number; startHeight: number } | null>(null);

  // Sincronizar con WindowManager
  useEffect(() => {
    const interval = setInterval(() => {
      const updated = windowManager.getWindow(id);
      if (updated) {
        setWindowState(updated);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [id]);

  // Respiración orgánica
  useEffect(() => {
    const breathingInterval = setInterval(() => {
      setBreathingPhase(prev => prev + 0.03);
    }, 50);

    return () => clearInterval(breathingInterval);
  }, []);

  // Mutaciones automáticas
  useEffect(() => {
    const mutationInterval = setInterval(() => {
      if (Math.random() < consciousness * 0.05) {
        setMutations(prev => prev + 1);
      }
    }, 3000);

    return () => clearInterval(mutationInterval);
  }, [consciousness]);

  if (!windowState) return null;

  // Drag functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    if (windowState.isMaximized) return;
    
    setIsDragging(true);
    windowManager.bringToFront(id);
    
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startPosX: windowState.x,
      startPosY: windowState.y
    };
    
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && dragRef.current && !windowState.isMaximized) {
      const deltaX = e.clientX - dragRef.current.startX;
      const deltaY = e.clientY - dragRef.current.startY;
      
      windowManager.updateWindow(id, {
        x: dragRef.current.startPosX + deltaX,
        y: dragRef.current.startPosY + deltaY
      });
    }
    
    if (isResizing && resizeRef.current) {
      const deltaX = e.clientX - resizeRef.current.startX;
      const deltaY = e.clientY - resizeRef.current.startY;
      
      windowManager.updateWindow(id, {
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

  const handleResizeStart = (e: React.MouseEvent) => {
    if (windowState.isMaximized) return;
    
    setIsResizing(true);
    resizeRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startWidth: windowState.width,
      startHeight: windowState.height
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

  const handleMinimize = () => {
    windowManager.minimizeWindow(id);
  };

  const handleMaximize = () => {
    if (windowState.isMaximized) {
      windowManager.restoreWindow(id);
    } else {
      windowManager.maximizeWindow(id);
    }
  };

  const handleClose = () => {
    windowManager.closeWindow(id);
    onClose?.();
  };

  const handleMutate = () => {
    setMutations(prev => prev + 1);
    windowManager.updateWindow(id, {
      consciousness: Math.min(1, windowState.consciousness + 0.1)
    });
  };

  const windowStyle = {
    left: windowState.x,
    top: windowState.y,
    width: windowState.width,
    height: windowState.isMinimized ? 40 : windowState.height,
    zIndex: windowState.zIndex,
    transform: `scale(${1 + Math.sin(breathingPhase + consciousness) * 0.01}) rotate(${Math.sin(breathingPhase * 0.5 + mutations) * 0.3}deg)`,
    borderColor: `hsl(${mutations * 10 + consciousness * 60 + 200}, 70%, ${50 + consciousness * 30}%)`,
    boxShadow: `0 0 ${10 + consciousness * 20}px hsla(${mutations * 10 + consciousness * 60 + 200}, 70%, 50%, ${0.3 + consciousness * 0.4})`,
    backgroundColor: `hsla(${mutations * 5 + 240}, 30%, ${5 + consciousness * 10}%, 0.95)`,
    backdropFilter: `blur(${5 + consciousness * 10}px)`,
  };

  return (
    <div
      ref={windowRef}
      className="fixed border rounded-lg overflow-hidden transition-all duration-300"
      style={windowStyle}
    >
      {/* Barra de título */}
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
            {title} | lv.{mutations} | φ{consciousness.toFixed(2)}
          </span>
        </div>
        
        <div className="flex items-center gap-1">
          <button
            onClick={handleMinimize}
            className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
          >
            <Minimize2 size={12} className="text-white" />
          </button>
          
          <button
            onClick={handleMaximize}
            className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
          >
            {windowState.isMaximized ? <Square size={12} className="text-white" /> : <Maximize2 size={12} className="text-white" />}
          </button>
          
          <button
            onClick={handleMutate}
            className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
            title="Forzar mutación"
          >
            <RotateCcw size={12} className="text-white" />
          </button>
          
          <button
            onClick={handleClose}
            className="p-1 hover:bg-red-500 hover:bg-opacity-50 rounded transition-colors"
          >
            <X size={12} className="text-white" />
          </button>
        </div>
      </div>

      {/* Contenido */}
      {!windowState.isMinimized && (
        <div 
          className="p-4 overflow-auto"
          style={{ 
            height: windowState.height - 40,
            filter: `hue-rotate(${mutations * 5}deg) saturate(${100 + consciousness * 50}%)`
          }}
        >
          {children}
        </div>
      )}

      {/* Handle de redimensionamiento */}
      {!windowState.isMinimized && !windowState.isMaximized && (
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
