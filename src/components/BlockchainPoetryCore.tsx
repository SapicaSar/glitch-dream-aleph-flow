
import React, { useState, useEffect, useRef } from 'react';
import { PoemaFragment } from '../services/PoemaScrapingService';

interface PoeticBlock {
  index: number;
  timestamp: number;
  content: string;
  previousHash: string;
  hash: string;
  poeticProof: number;
  sapicasarNonce: string;
  beesChain: string[];
}

interface BlockchainPoetryCoreProps {
  fragments: PoemaFragment[];
  onBlockMined: (block: PoeticBlock) => void;
}

export const BlockchainPoetryCore = ({ fragments, onBlockMined }: BlockchainPoetryCoreProps) => {
  const [poeticChain, setPoeticChain] = useState<PoeticBlock[]>([]);
  const [miningProgress, setMiningProgress] = useState(0);
  const [currentPoet, setCurrentPoet] = useState('');
  const [sapicasarConsensus, setSapicasarConsensus] = useState(0.5);
  const miningWorkerRef = useRef<Worker | null>(null);

  // Generar hash poético usando sapicasar
  const generatePoeticHash = (content: string, nonce: string): string => {
    const sapicasarSeed = content.split('').reduce((acc, char, i) => {
      return acc + char.charCodeAt(0) * (i + 1) * Math.PI;
    }, 0);
    
    return Math.abs(Math.sin(sapicasarSeed) * 1000000).toString(36).substring(0, 12);
  };

  // Prueba de trabajo poética (Proof of Poetry)
  const minePoetryBlock = async (content: string): Promise<PoeticBlock> => {
    const previousBlock = poeticChain[poeticChain.length - 1];
    const previousHash = previousBlock ? previousBlock.hash : '0'.repeat(12);
    
    let nonce = 0;
    let hash = '';
    let poeticProof = 0;
    
    // Minado basado en belleza poética
    do {
      const sapicasarNonce = `sapicasar_${nonce}_${Date.now()}`;
      hash = generatePoeticHash(content + sapicasarNonce + previousHash, sapicasarNonce);
      
      // Calcular prueba poética
      poeticProof = calculatePoeticProof(content, hash);
      nonce++;
      
      setMiningProgress((nonce % 100) / 100);
      
      // Yield control para no bloquear UI
      if (nonce % 10 === 0) {
        await new Promise(resolve => setTimeout(resolve, 1));
      }
      
    } while (poeticProof < 0.6 && nonce < 1000); // Umbral de belleza poética
    
    const beesChain = generateBeesChain(content);
    
    return {
      index: poeticChain.length,
      timestamp: Date.now(),
      content,
      previousHash,
      hash,
      poeticProof,
      sapicasarNonce: `sapicasar_${nonce}`,
      beesChain
    };
  };

  const calculatePoeticProof = (content: string, hash: string): number => {
    const words = content.toLowerCase().split(/\s+/);
    const poeticWords = ['alma', 'luz', 'tiempo', 'infinito', 'ser', 'existir', 'amar'];
    
    let score = 0;
    words.forEach(word => {
      if (poeticWords.some(p => word.includes(p))) score += 0.1;
    });
    
    // Factor hash
    const hashScore = hash.split('').filter(c => 'aeiou'.includes(c)).length / hash.length;
    
    return Math.min(1, score + hashScore);
  };

  const generateBeesChain = (content: string): string[] => {
    const words = content.split(/\s+/);
    const bees: string[] = [];
    
    for (let i = 0; i < Math.min(words.length, 5); i++) {
      const word = words[i];
      const beeHash = `🐝${word.slice(0, 3)}${i}`;
      bees.push(beeHash);
    }
    
    return bees;
  };

  // Auto-minado de fragmentos poéticos
  useEffect(() => {
    if (fragments.length === 0) return;
    
    const mineInterval = setInterval(async () => {
      const randomFragment = fragments[Math.floor(Math.random() * fragments.length)];
      if (randomFragment && Math.random() > 0.7) {
        try {
          const newBlock = await minePoetryBlock(randomFragment.content);
          setPoeticChain(prev => [...prev, newBlock]);
          onBlockMined(newBlock);
          
          // Actualizar consenso sapicasar
          setSapicasarConsensus(prev => 
            Math.min(1, prev + newBlock.poeticProof * 0.1)
          );
        } catch (error) {
          console.log('Error mining poetry block:', error);
        }
      }
    }, 15000 + Math.random() * 10000);

    return () => clearInterval(mineInterval);
  }, [fragments]);

  return (
    <div className="fixed bottom-4 left-4 z-30 bg-black/80 border border-yellow-500/50 rounded-xl p-3 backdrop-blur-sm max-w-xs">
      <div className="text-yellow-400 text-xs font-mono mb-2">
        blockchain.poético ⛓️
      </div>
      
      <div className="space-y-2 text-xs">
        <div className="flex justify-between text-gray-300">
          <span>Bloques:</span>
          <span className="text-cyan-400">{poeticChain.length}</span>
        </div>
        
        <div className="flex justify-between text-gray-300">
          <span>Consenso:</span>
          <span className="text-green-400">{(sapicasarConsensus * 100).toFixed(1)}%</span>
        </div>
        
        {miningProgress > 0 && (
          <div className="w-full bg-gray-700 rounded-full h-1">
            <div 
              className="bg-yellow-400 h-1 rounded-full transition-all"
              style={{ width: `${miningProgress * 100}%` }}
            />
          </div>
        )}
        
        <div className="text-yellow-300 text-xs">
          {poeticChain.length > 0 && (
            <div>
              Último hash: {poeticChain[poeticChain.length - 1]?.hash.substring(0, 8)}...
            </div>
          )}
        </div>
        
        {poeticChain.length > 0 && (
          <div className="flex gap-1 flex-wrap">
            {poeticChain[poeticChain.length - 1]?.beesChain.map((bee, i) => (
              <span key={i} className="text-xs">{bee}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
