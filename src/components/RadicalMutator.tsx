
import React, { useState, useEffect } from 'react';

interface RadicalMutatorProps {
  children: React.ReactNode;
  mutationIntensity: number;
  onMutation: () => void;
}

interface MutationState {
  backgroundColor: string;
  transform: string;
  filter: string;
  borderRadius: string;
  animation: string;
  mixBlendMode: string;
}

export const RadicalMutator = ({ children, mutationIntensity, onMutation }: RadicalMutatorProps) => {
  const [mutationState, setMutationState] = useState<MutationState>({
    backgroundColor: 'transparent',
    transform: 'none',
    filter: 'none',
    borderRadius: '0',
    animation: 'none',
    mixBlendMode: 'normal'
  });

  const [isMutating, setIsMutating] = useState(false);

  useEffect(() => {
    const mutationInterval = setInterval(() => {
      if (Math.random() < mutationIntensity * 0.3) {
        triggerRadicalMutation();
      }
    }, 2000 + Math.random() * 3000);

    return () => clearInterval(mutationInterval);
  }, [mutationIntensity]);

  const triggerRadicalMutation = () => {
    setIsMutating(true);
    onMutation();

    const mutations = [
      // Mutación cromática
      {
        backgroundColor: `hsl(${Math.random() * 360}, 50%, 10%)`,
        filter: `hue-rotate(${Math.random() * 360}deg) saturate(${100 + Math.random() * 200}%)`,
        transform: 'none',
        borderRadius: '0',
        animation: 'none',
        mixBlendMode: 'normal'
      },
      // Mutación dimensional
      {
        backgroundColor: 'transparent',
        transform: `scale(${0.8 + Math.random() * 0.4}) rotate(${(Math.random() - 0.5) * 10}deg) skew(${(Math.random() - 0.5) * 5}deg)`,
        filter: `blur(${Math.random() * 2}px)`,
        borderRadius: `${Math.random() * 30}px`,
        animation: 'none',
        mixBlendMode: 'normal'
      },
      // Mutación temporal
      {
        backgroundColor: 'transparent',
        transform: 'none',
        filter: `contrast(${100 + Math.random() * 100}%) brightness(${80 + Math.random() * 40}%)`,
        borderRadius: '0',
        animation: Math.random() > 0.5 ? 'pulse 2s infinite' : 'bounce 1s infinite',
        mixBlendMode: 'normal'
      },
      // Mutación glitch
      {
        backgroundColor: Math.random() > 0.5 ? 'rgba(255, 0, 255, 0.1)' : 'rgba(0, 255, 255, 0.1)',
        transform: `translateX(${(Math.random() - 0.5) * 20}px) translateY(${(Math.random() - 0.5) * 10}px)`,
        filter: `invert(${Math.random() > 0.7 ? 1 : 0}) sepia(${Math.random()})`,
        borderRadius: '0',
        animation: 'none',
        mixBlendMode: Math.random() > 0.5 ? 'difference' : 'overlay'
      },
      // Mutación orgánica
      {
        backgroundColor: 'transparent',
        transform: `scale(${0.95 + Math.sin(Date.now() * 0.01) * 0.1})`,
        filter: `drop-shadow(0 0 ${5 + Math.random() * 15}px rgba(255, 255, 255, 0.3))`,
        borderRadius: `${20 + Math.random() * 30}px`,
        animation: 'none',
        mixBlendMode: 'normal'
      }
    ];

    const selectedMutation = mutations[Math.floor(Math.random() * mutations.length)];
    setMutationState(selectedMutation);

    // Revertir después de un tiempo aleatorio
    setTimeout(() => {
      setMutationState({
        backgroundColor: 'transparent',
        transform: 'none',
        filter: 'none',
        borderRadius: '0',
        animation: 'none',
        mixBlendMode: 'normal'
      });
      setIsMutating(false);
    }, 1000 + Math.random() * 4000);
  };

  return (
    <div
      className={`transition-all duration-1000 ${isMutating ? 'z-50' : ''}`}
      style={{
        backgroundColor: mutationState.backgroundColor,
        transform: mutationState.transform,
        filter: mutationState.filter,
        borderRadius: mutationState.borderRadius,
        animation: mutationState.animation,
        mixBlendMode: mutationState.mixBlendMode as any,
      }}
      onClick={() => Math.random() > 0.7 && triggerRadicalMutation()}
    >
      {children}
    </div>
  );
};
