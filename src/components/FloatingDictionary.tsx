
import React, { useState, useEffect } from 'react';

const poeticGlossary = {
  deseo: {
    'latido': 'origen vibrante del pulso textual',
    'fragmento': 'núcleo disperso del yo multiplicado',
    'metamorfosis': 'proceso perpetuo de devenir-otro'
  },
  cuerpo: {
    'carne': 'sustancia que sueña con ser código',
    'geografía': 'mapa de cicatrices luminosas',
    'animal': 'instinto que late bajo el lenguaje'
  },
  error: {
    'glitch': 'revelación del código oculto',
    'falla': 'grieta por donde se filtra lo real',
    'bug': 'insecto digital que devora la norma'
  },
  sueño: {
    'noche': 'río negro del inconsciente',
    'onírico': 'portal a la memoria ancestral',
    'vigilia': 'estado intermedio entre mundos'
  }
};

interface FloatingDictionaryProps {
  currentState: string;
  breathingPhase: number;
}

export const FloatingDictionary = ({ currentState, breathingPhase }: FloatingDictionaryProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  
  const currentGlossary = poeticGlossary[currentState as keyof typeof poeticGlossary] || {};

  return (
    <div className="fixed top-4 right-4 z-30">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white border-2 border-white hover:scale-110 transition-transform duration-300"
        style={{
          transform: `scale(${1 + Math.sin(breathingPhase) * 0.05}) rotate(${Math.sin(breathingPhase * 0.5) * 3}deg)`,
          boxShadow: `0 0 ${Math.sin(breathingPhase) * 15 + 10}px rgba(168, 85, 247, 0.5)`
        }}
      >
        <span className="text-sm font-mono">dic</span>
      </button>
      
      {isOpen && (
        <div 
          className="absolute top-full right-0 mt-2 w-80 bg-black bg-opacity-95 border border-pink-400 rounded-lg p-4 backdrop-blur-sm"
          style={{
            transform: `scale(${1 + Math.sin(breathingPhase * 0.7) * 0.02})`,
            borderColor: `hsl(${Math.sin(breathingPhase) * 60 + 300}, 70%, 60%)`
          }}
        >
          <h3 className="text-pink-400 text-sm font-mono mb-3 border-b border-pink-400 pb-2">
            diccionario poético / {currentState}
          </h3>
          
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {Object.entries(currentGlossary).map(([word, definition]) => (
              <div
                key={word}
                className="cursor-pointer hover:bg-pink-500 hover:bg-opacity-20 p-2 rounded transition-colors duration-200"
                onClick={() => setSelectedWord(selectedWord === word ? null : word)}
                style={{
                  opacity: 0.8 + Math.sin(breathingPhase + word.length) * 0.2
                }}
              >
                <div className="text-cyan-400 font-mono text-sm">{word}</div>
                {selectedWord === word && (
                  <div className="text-white text-xs mt-1 opacity-90 leading-relaxed">
                    {definition}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-3 text-xs opacity-60 text-center border-t border-gray-600 pt-2">
            glosario mágico-ritual expandible
          </div>
        </div>
      )}
    </div>
  );
};
