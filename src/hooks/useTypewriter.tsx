
import { useState, useEffect } from 'react';

interface TypewriterOptions {
  speed?: number;
  delay?: number;
  loop?: boolean;
  cursor?: boolean;
  randomSpeed?: boolean;
}

export const useTypewriter = (
  text: string, 
  options: TypewriterOptions = {}
) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const {
    speed = 50,
    delay = 1000,
    loop = false,
    cursor = true,
    randomSpeed = true
  } = options;

  useEffect(() => {
    if (!text) return;

    setIsTyping(true);
    setCurrentIndex(0);
    setDisplayText('');

    const typeInterval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= text.length) {
          setIsTyping(false);
          if (loop) {
            setTimeout(() => {
              setCurrentIndex(0);
              setDisplayText('');
            }, delay);
          }
          clearInterval(typeInterval);
          return prev;
        }

        const newIndex = prev + 1;
        setDisplayText(text.substring(0, newIndex));
        return newIndex;
      });
    }, randomSpeed ? speed + Math.random() * 100 : speed);

    return () => clearInterval(typeInterval);
  }, [text, speed, delay, loop, randomSpeed]);

  const cursorChar = cursor && isTyping ? '█' : '';
  return `${displayText}${cursorChar}`;
};
