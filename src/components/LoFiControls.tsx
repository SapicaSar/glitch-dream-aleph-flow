
import React, { useState } from 'react';
import { Play, Pause, Shuffle, RefreshCw, Brain, Zap } from 'lucide-react';

interface LoFiControlsProps {
  onScrapeNew: () => void;
  onToggleAI: () => void;
  onRandomize: () => void;
  isAIActive: boolean;
  isLoading: boolean;
}

export const LoFiControls = ({ 
  onScrapeNew, 
  onToggleAI, 
  onRandomize, 
  isAIActive, 
  isLoading 
}: LoFiControlsProps) => {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className="fixed top-6 right-6 z-50">
      <div className="bg-black/80 border border-green-400 rounded-lg p-4 backdrop-blur-sm">
        <div className="text-green-400 text-xs font-mono mb-3 text-center">
          LAPOEMA.CONTROL_PANEL
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          {/* Play/Pause Universe */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`
              flex items-center justify-center p-3 rounded border transition-all
              ${isPlaying 
                ? 'bg-green-500/20 border-green-400 text-green-400' 
                : 'bg-gray-800/50 border-gray-600 text-gray-400 hover:border-green-400'
              }
            `}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>

          {/* Scrape New Content */}
          <button
            onClick={onScrapeNew}
            disabled={isLoading}
            className="flex items-center justify-center p-3 rounded border border-cyan-400 text-cyan-400 hover:bg-cyan-500/20 transition-all disabled:opacity-50"
          >
            <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
          </button>

          {/* Toggle AI Agent */}
          <button
            onClick={onToggleAI}
            className={`
              flex items-center justify-center p-3 rounded border transition-all
              ${isAIActive 
                ? 'bg-purple-500/20 border-purple-400 text-purple-400' 
                : 'bg-gray-800/50 border-gray-600 text-gray-400 hover:border-purple-400'
              }
            `}
          >
            <Brain size={16} />
          </button>

          {/* Randomize Universe */}
          <button
            onClick={onRandomize}
            className="flex items-center justify-center p-3 rounded border border-yellow-400 text-yellow-400 hover:bg-yellow-500/20 transition-all"
          >
            <Shuffle size={16} />
          </button>
        </div>

        {/* Status Indicators */}
        <div className="mt-3 space-y-1">
          <div className="flex items-center gap-2 text-xs">
            <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-400 animate-pulse' : 'bg-gray-600'}`} />
            <span className="text-green-400 font-mono">UNIVERSO</span>
          </div>
          
          <div className="flex items-center gap-2 text-xs">
            <div className={`w-2 h-2 rounded-full ${isAIActive ? 'bg-purple-400 animate-pulse' : 'bg-gray-600'}`} />
            <span className="text-purple-400 font-mono">AI_AGENT</span>
          </div>
          
          <div className="flex items-center gap-2 text-xs">
            <Zap size={10} className="text-yellow-400" />
            <span className="text-yellow-400 font-mono">GLITCH_SYS</span>
          </div>
        </div>
      </div>
    </div>
  );
};
