
import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { useIsMobile } from '../hooks/use-mobile';

interface DraggablePoetrPanelProps {
  children: ReactNode;
  title: string;
  defaultPosition?: { x: number; y: number };
  minWidth?: number;
  minHeight?: number;
  resizable?: boolean;
  className?: string;
  onClose?: () => void;
}

export const DraggablePoetryPanel = ({
  children,
  title,
  defaultPosition = { x: 100, y: 100 },
  minWidth = 300,
  minHeight = 200,
  resizable = false,
  className = '',
  onClose
}: DraggablePoetrPanelProps) => {
  const [position, setPosition] = useState(defaultPosition);
  const [size, setSize] = useState({ width: minWidth, height: minHeight });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isMinimized, setIsMinimized] = useState(false);
  
  const isMobile = useIsMobile();
  const panelRef = useRef<HTMLDivElement>(null);

  // Handle dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !isMobile) {
        setPosition({
          x: Math.max(0, Math.min(window.innerWidth - size.width, e.clientX - dragOffset.x)),
          y: Math.max(0, Math.min(window.innerHeight - 50, e.clientY - dragOffset.y))
        });
      }
      
      if (isResizing && !isMobile) {
        setSize({
          width: Math.max(minWidth, e.clientX - position.x),
          height: Math.max(minHeight, e.clientY - position.y)
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragOffset, position, size, minWidth, minHeight, isMobile]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMobile) return;
    
    const rect = panelRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDragging(true);
    }
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    if (isMobile) return;
    e.stopPropagation();
    setIsResizing(true);
  };

  return (
    <div
      ref={panelRef}
      className={`fixed z-40 bg-black/95 border border-purple-500/50 rounded-xl backdrop-blur-lg shadow-2xl transition-all duration-300 ${
        isMobile ? 'inset-4' : ''
      } ${className}`}
      style={!isMobile ? {
        left: position.x,
        top: position.y,
        width: size.width,
        height: isMinimized ? 'auto' : size.height
      } : {}}
    >
      {/* Header */}
      <div
        onMouseDown={handleMouseDown}
        className={`flex items-center justify-between p-3 border-b border-purple-500/30 bg-gradient-to-r from-purple-900/30 to-cyan-900/30 rounded-t-xl ${
          !isMobile ? 'cursor-move' : ''
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse shadow-lg shadow-purple-400/50" />
          <span className="text-purple-400 font-mono text-sm font-medium">
            {title}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-gray-400 hover:text-white transition-colors p-1 rounded"
            title={isMinimized ? 'Expandir' : 'Minimizar'}
          >
            {isMinimized ? '□' : '−'}
          </button>
          
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-red-400 transition-colors p-1 rounded"
              title="Cerrar"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      {!isMinimized && (
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
      )}

      {/* Resize handle */}
      {resizable && !isMobile && !isMinimized && (
        <div
          onMouseDown={handleResizeMouseDown}
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
        >
          <div className="absolute bottom-1 right-1 w-2 h-2 border-r-2 border-b-2 border-gray-500" />
        </div>
      )}
    </div>
  );
};
