import React, { useEffect, useRef } from 'react';

interface Node {
  id: string;
  x: number;
  y: number;
  energy: number;
}

interface AutopoieticFieldProps {
  nodes: Node[];
  onClick: (x: number, y: number) => void;
  consciousness: number;
}

export const AutopoieticField: React.FC<AutopoieticFieldProps> = ({ 
  nodes, 
  onClick, 
  consciousness 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Ajustar tamaño del canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Limpiar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Configurar estilo base
    ctx.globalCompositeOperation = 'screen';

    // Dibujar conexiones entre nodos cercanos
    nodes.forEach((node, i) => {
      nodes.slice(i + 1).forEach(otherNode => {
        const distance = Math.sqrt(
          Math.pow(node.x - otherNode.x, 2) + 
          Math.pow(node.y - otherNode.y, 2)
        );
        
        if (distance < 200) {
          const opacity = Math.max(0, 1 - distance / 200) * (consciousness / 100);
          ctx.beginPath();
          ctx.strokeStyle = `hsla(${280 + consciousness}, 70%, 60%, ${opacity * 0.3})`;
          ctx.lineWidth = 1;
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(otherNode.x, otherNode.y);
          ctx.stroke();
        }
      });
    });

    // Dibujar nodos
    nodes.forEach(node => {
      const radius = 3 + (node.energy / 100) * 8;
      const opacity = node.energy / 100;
      
      // Núcleo del nodo
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${280 + node.energy}, 80%, 70%, ${opacity})`;
      ctx.fill();
      
      // Halo energético
      const gradient = ctx.createRadialGradient(
        node.x, node.y, 0,
        node.x, node.y, radius * 3
      );
      gradient.addColorStop(0, `hsla(${280 + node.energy}, 60%, 50%, ${opacity * 0.3})`);
      gradient.addColorStop(1, 'transparent');
      
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius * 3, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    });

  }, [nodes, consciousness]);

  const handleClick = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      onClick(e.clientX - rect.left, e.clientY - rect.top);
    }
  };

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 cursor-crosshair"
      onClick={handleClick}
      style={{ background: 'transparent' }}
    />
  );
};