import React, { useEffect, useState } from 'react';

interface PoetryGeneratorProps {
  poem: string;
  isGenerating: boolean;
  consciousness: number;
}

export const PoetryGenerator: React.FC<PoetryGeneratorProps> = ({
  poem,
  isGenerating,
  consciousness
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (poem && !isGenerating) {
      setIsVisible(true);
      setDisplayText('');
      
      // Efecto de escritura
      let i = 0;
      const timer = setInterval(() => {
        if (i < poem.length) {
          setDisplayText(poem.slice(0, i + 1));
          i++;
        } else {
          clearInterval(timer);
          // Auto-hide después de 5 segundos
          setTimeout(() => setIsVisible(false), 5000);
        }
      }, 50);

      return () => clearInterval(timer);
    } else if (isGenerating) {
      setIsVisible(true);
      setDisplayText('...');
    }
  }, [poem, isGenerating]);

  if (!isVisible && !isGenerating) return null;

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 max-w-lg">
      <div 
        className={`
          bg-background/95 backdrop-blur-md border border-border/50 rounded-2xl p-6 
          transition-all duration-500 shadow-2xl
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}
        style={{
          background: `linear-gradient(135deg, 
            hsla(var(--background), 0.95), 
            hsla(${280 + consciousness}, 20%, 10%, 0.8)
          )`
        }}
      >
        {/* Indicador de generación */}
        {isGenerating && (
          <div className="flex items-center gap-3 mb-3">
            <div className="flex gap-1">
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className="w-2 h-2 bg-primary rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 200}ms` }}
                />
              ))}
            </div>
            <span className="text-muted-foreground text-sm font-mono">
              generando poesía autopoiética...
            </span>
          </div>
        )}

        {/* Texto poético */}
        <div className="text-foreground font-mono text-lg leading-relaxed whitespace-pre-line">
          {displayText}
          {!isGenerating && (
            <span className="inline-block w-1 h-5 bg-primary ml-1 animate-pulse" />
          )}
        </div>

        {/* Metadata */}
        {!isGenerating && poem && (
          <div className="mt-4 pt-3 border-t border-border/30">
            <div className="flex justify-between text-xs font-mono text-muted-foreground">
              <span>emergencia #{Math.floor(Math.random() * 1000)}</span>
              <span>consciencia: {consciousness.toFixed(0)}%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};