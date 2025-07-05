
import React, { useRef, useEffect, useState, ReactNode } from 'react';
import { useIsMobile } from '../hooks/use-mobile';

interface OptimizedScrollAreaProps {
  children: ReactNode;
  className?: string;
  height?: string;
  onScroll?: (scrollTop: number, scrollHeight: number) => void;
}

export const OptimizedScrollArea = ({ 
  children, 
  className = '', 
  height = 'h-full',
  onScroll 
}: OptimizedScrollAreaProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showScrollbar, setShowScrollbar] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollElement;
      const progress = scrollTop / (scrollHeight - clientHeight);
      
      setScrollProgress(progress);
      setShowScrollbar(true);
      
      onScroll?.(scrollTop, scrollHeight);
      
      // Auto-hide scrollbar después de scroll
      setTimeout(() => setShowScrollbar(false), 1500);
    };

    const handleMouseEnter = () => setShowScrollbar(true);
    const handleMouseLeave = () => setShowScrollbar(false);

    scrollElement.addEventListener('scroll', handleScroll);
    if (!isMobile) {
      scrollElement.addEventListener('mouseenter', handleMouseEnter);
      scrollElement.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      scrollElement.removeEventListener('scroll', handleScroll);
      if (!isMobile) {
        scrollElement.removeEventListener('mouseenter', handleMouseEnter);
        scrollElement.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [onScroll, isMobile]);

  return (
    <div className={`relative ${className}`}>
      <div
        ref={scrollRef}
        className={`${height} overflow-y-auto overflow-x-hidden scrollbar-hide ${
          isMobile ? 'scroll-smooth' : ''
        }`}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {children}
      </div>
      
      {/* Barra de scroll personalizada y elegante */}
      {showScrollbar && (
        <div className="absolute right-1 top-1 bottom-1 w-1 bg-gray-800/30 rounded-full">
          <div
            className="w-full bg-gradient-to-b from-purple-400 to-cyan-400 rounded-full transition-all duration-300"
            style={{
              height: `${Math.max(10, (1 - scrollProgress) * 100)}%`,
              transform: `translateY(${scrollProgress * 100}%)`
            }}
          />
        </div>
      )}
      
      {/* Indicador de progreso estético */}
      <div 
        className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30"
        style={{
          transform: `scaleX(${scrollProgress})`,
          transformOrigin: 'left center'
        }}
      />
    </div>
  );
};
