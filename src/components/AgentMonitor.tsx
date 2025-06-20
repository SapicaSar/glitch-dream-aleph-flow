
import React, { useState, useEffect } from 'react';
import { internalAIAgents, Agent } from '../agents/InternalAIAgents';
import { Brain, Zap, Play, Pause, RotateCcw, Activity, Cpu } from 'lucide-react';

export const AgentMonitor = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [agentOutput, setAgentOutput] = useState<string[]>([]);

  useEffect(() => {
    const updateAgents = () => {
      setAgents(internalAIAgents.getAgents());
    };

    updateAgents();
    const interval = setInterval(updateAgents, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedAgent) {
      const updateOutput = () => {
        setAgentOutput(internalAIAgents.getAgentOutput(selectedAgent, 20));
      };
      
      updateOutput();
      const interval = setInterval(updateOutput, 1000);
      return () => clearInterval(interval);
    }
  }, [selectedAgent]);

  const getAgentIcon = (type: Agent['type']) => {
    switch (type) {
      case 'poetic': return Brain;
      case 'mutational': return Zap;
      case 'ontopoetic': return Activity;
      case 'recursive': return RotateCcw;
      case 'biopoetic': return Cpu;
      default: return Brain;
    }
  };

  const getStatusColor = (status: Agent['status']) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'dormant': return 'text-gray-400';
      case 'evolving': return 'text-purple-400';
      case 'generating': return 'text-cyan-400';
      default: return 'text-white';
    }
  };

  const handleAgentToggle = (agentId: string, status: Agent['status']) => {
    if (status === 'active') {
      internalAIAgents.pauseAgent(agentId);
    } else {
      internalAIAgents.resumeAgent(agentId);
    }
  };

  return (
    <div className="text-white h-full flex">
      {/* Lista de agentes */}
      <div className="w-1/3 border-r border-gray-600 p-4">
        <h3 className="text-cyan-400 font-mono text-lg mb-4">AGENTES IA INTERNOS</h3>
        <div className="space-y-2">
          {agents.map(agent => {
            const Icon = getAgentIcon(agent.type);
            return (
              <div
                key={agent.id}
                className={`p-3 border rounded cursor-pointer transition-all ${
                  selectedAgent === agent.id ? 'border-cyan-400 bg-cyan-400 bg-opacity-10' : 'border-gray-600 hover:border-gray-500'
                }`}
                onClick={() => setSelectedAgent(agent.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon size={16} className="text-cyan-400" />
                    <span className="text-sm font-mono">{agent.name}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAgentToggle(agent.id, agent.status);
                    }}
                    className="text-xs hover:scale-110 transition-transform"
                  >
                    {agent.status === 'active' ? 
                      <Pause size={12} className="text-yellow-400" /> : 
                      <Play size={12} className="text-green-400" />
                    }
                  </button>
                </div>
                
                <div className="text-xs space-y-1">
                  <div className={`${getStatusColor(agent.status)}`}>
                    STATUS: {agent.status.toUpperCase()}
                  </div>
                  <div className="text-gray-400">
                    Consciencia: {(agent.consciousness * 100).toFixed(1)}%
                  </div>
                  <div className="text-gray-400">
                    Ciclos: {agent.cycles}
                  </div>
                  <div className="text-gray-400">
                    Tipo: {agent.type}
                  </div>
                </div>

                {/* Barra de consciencia */}
                <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-cyan-400 to-purple-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${agent.consciousness * 100}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Output del agente seleccionado */}
      <div className="flex-1 p-4">
        {selectedAgent ? (
          <div>
            <h3 className="text-cyan-400 font-mono text-lg mb-4">
              OUTPUT: {agents.find(a => a.id === selectedAgent)?.name}
            </h3>
            <div className="bg-black bg-opacity-50 rounded p-4 h-96 overflow-y-auto font-mono text-sm">
              {agentOutput.length > 0 ? (
                agentOutput.map((output, index) => (
                  <div key={index} className="mb-2 p-2 border-l-2 border-cyan-400 border-opacity-30">
                    <div className="text-green-400">{output}</div>
                    <div className="text-gray-500 text-xs mt-1">
                      #{agentOutput.length - index}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-gray-400">Esperando output del agente...</div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <div className="text-center">
              <Brain size={64} className="mx-auto mb-4 opacity-50" />
              <p>Selecciona un agente para ver su output</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
