
import { useEffect, useState } from 'react';
import { useGlitch } from '../contexts/GlitchContext';

interface GlitchEffects {
  textGlitch: string;
  colorShift: string;
  transform: string;
  opacity: number;
  filter: string;
  animation: string;
}

export const useGlitchEffects = (componentId: string): GlitchEffects => {
  const { glitchState, addGlitchListener, removeGlitchListener } = useGlitch();
  const [effects, setEffects] = useState<GlitchEffects>({
    textGlitch: '',
    colorShift: '',
    transform: '',
    opacity: 1,
    filter: '',
    animation: ''
  });

  useEffect(() => {
    addGlitchListener(componentId);
    return () => removeGlitchListener(componentId);
  }, [componentId, addGlitchListener, removeGlitchListener]);

  useEffect(() => {
    if (!glitchState.isActive) {
      setEffects({
        textGlitch: '',
        colorShift: '',
        transform: '',
        opacity: 1,
        filter: '',
        animation: ''
      });
      return;
    }

    const { intensity, glitchType, randomSeed } = glitchState;
    const random = (seed: number) => (Math.sin(seed * 12.9898) * 43758.5453) % 1;

    let newEffects: GlitchEffects = {
      textGlitch: '',
      colorShift: '',
      transform: '',
      opacity: 1,
      filter: '',
      animation: ''
    };

    switch (glitchType) {
      case 'visual':
        newEffects = {
          textGlitch: random(randomSeed + 1) > 0.7 ? 'animate-pulse' : '',
          colorShift: `hue-rotate(${random(randomSeed + 2) * 360}deg)`,
          transform: `scale(${1 + (random(randomSeed + 3) - 0.5) * intensity * 0.1}) rotate(${(random(randomSeed + 4) - 0.5) * intensity * 5}deg)`,
          opacity: 0.7 + random(randomSeed + 5) * 0.3,
          filter: `blur(${random(randomSeed + 6) * intensity * 2}px) contrast(${100 + random(randomSeed + 7) * intensity * 50}%)`,
          animation: random(randomSeed + 8) > 0.8 ? 'animate-bounce' : ''
        };
        break;

      case 'textual':
        const glitchChars = ['░', '▓', '▒', '█', '▄', '▀', '┃', '━', '┏', '┓', '┗', '┛'];
        newEffects = {
          textGlitch: random(randomSeed + 1) > 0.6 ? glitchChars[Math.floor(random(randomSeed + 2) * glitchChars.length)] : '',
          colorShift: `hue-rotate(${random(randomSeed + 3) * 180}deg)`,
          transform: `translateX(${(random(randomSeed + 4) - 0.5) * intensity * 10}px)`,
          opacity: 0.8 + random(randomSeed + 5) * 0.2,
          filter: `contrast(${120 + random(randomSeed + 6) * intensity * 30}%)`,
          animation: 'animate-pulse'
        };
        break;

      case 'temporal':
        newEffects = {
          textGlitch: '',
          colorShift: `hue-rotate(${random(randomSeed + 1) * 60}deg)`,
          transform: `scale(${1 + Math.sin(randomSeed * 10) * intensity * 0.05})`,
          opacity: 0.9 + random(randomSeed + 2) * 0.1,
          filter: `brightness(${100 + random(randomSeed + 3) * intensity * 20}%)`,
          animation: random(randomSeed + 4) > 0.7 ? 'animate-ping' : ''
        };
        break;

      case 'dimensional':
        newEffects = {
          textGlitch: '',
          colorShift: `hue-rotate(${random(randomSeed + 1) * 120}deg) saturate(${100 + random(randomSeed + 2) * 50}%)`,
          transform: `perspective(1000px) rotateX(${(random(randomSeed + 3) - 0.5) * intensity * 10}deg) rotateY(${(random(randomSeed + 4) - 0.5) * intensity * 10}deg)`,
          opacity: 0.85 + random(randomSeed + 5) * 0.15,
          filter: `blur(${random(randomSeed + 6) * intensity}px) drop-shadow(${random(randomSeed + 7) * intensity * 5}px ${random(randomSeed + 8) * intensity * 5}px ${random(randomSeed + 9) * intensity * 10}px rgba(255,0,255,0.5))`,
          animation: ''
        };
        break;
    }

    setEffects(newEffects);
  }, [glitchState]);

  return effects;
};
