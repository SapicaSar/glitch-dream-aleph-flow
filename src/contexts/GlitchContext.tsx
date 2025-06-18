
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface GlitchState {
  intensity: number;
  isActive: boolean;
  glitchType: 'visual' | 'textual' | 'temporal' | 'dimensional';
  affectedComponents: string[];
  randomSeed: number;
}

interface GlitchContextType {
  glitchState: GlitchState;
  triggerGlitch: () => void;
  addGlitchListener: (componentId: string) => void;
  removeGlitchListener: (componentId: string) => void;
}

const GlitchContext = createContext<GlitchContextType | undefined>(undefined);

export const useGlitch = () => {
  const context = useContext(GlitchContext);
  if (!context) {
    throw new Error('useGlitch must be used within a GlitchProvider');
  }
  return context;
};

interface GlitchProviderProps {
  children: ReactNode;
}

export const GlitchProvider = ({ children }: GlitchProviderProps) => {
  const [glitchState, setGlitchState] = useState<GlitchState>({
    intensity: 0,
    isActive: false,
    glitchType: 'visual',
    affectedComponents: [],
    randomSeed: 0
  });

  const triggerGlitch = useCallback(() => {
    const glitchTypes: GlitchState['glitchType'][] = ['visual', 'textual', 'temporal', 'dimensional'];
    const randomType = glitchTypes[Math.floor(Math.random() * glitchTypes.length)];
    const intensity = 0.3 + Math.random() * 0.7;
    const seed = Math.random() * 1000;

    setGlitchState({
      intensity,
      isActive: true,
      glitchType: randomType,
      affectedComponents: [],
      randomSeed: seed
    });

    // Auto-desactivar después de un tiempo aleatorio
    setTimeout(() => {
      setGlitchState(prev => ({ ...prev, isActive: false, intensity: 0 }));
    }, 200 + Math.random() * 800);

  }, []);

  const addGlitchListener = useCallback((componentId: string) => {
    setGlitchState(prev => ({
      ...prev,
      affectedComponents: [...prev.affectedComponents, componentId]
    }));
  }, []);

  const removeGlitchListener = useCallback((componentId: string) => {
    setGlitchState(prev => ({
      ...prev,
      affectedComponents: prev.affectedComponents.filter(id => id !== componentId)
    }));
  }, []);

  return (
    <GlitchContext.Provider value={{
      glitchState,
      triggerGlitch,
      addGlitchListener,
      removeGlitchListener
    }}>
      {children}
    </GlitchContext.Provider>
  );
};
