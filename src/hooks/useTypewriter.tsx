
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
  const [showCursor, setShowCursor] = useState(false);

  const {
    speed = 50,
    delay = 1000,
    loop = false,
    cursor = true,
    randomSpeed = true
  } = options;

  useEffect(() => {
    if (!text) {
      setDisplayText('');
      return;
    }

    let currentIndex = 0;
    setDisplayText('');
    setIsTyping(true);

    const typeInterval = setInterval(() => {
      if (currentIndex >= text.length) {
        setIsTyping(false);
        if (loop) {
          setTimeout(() => {
            currentIndex = 0;
            setDisplayText('');
            setIsTyping(true);
          }, delay);
        }
        clearInterval(typeInterval);
        return;
      }

      setDisplayText(text.substring(0, currentIndex + 1));
      currentIndex++;
    }, randomSpeed ? speed + Math.random() * 50 : speed);

    return () => clearInterval(typeInterval);
  }, [text, speed, delay, loop, randomSpeed]);

  // Cursor blinking effect
  useEffect(() => {
    if (!cursor) return;

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, [cursor]);

  const cursorChar = cursor && (isTyping || showCursor) ? '█' : '';
  return `${displayText}${cursorChar}`;
};
