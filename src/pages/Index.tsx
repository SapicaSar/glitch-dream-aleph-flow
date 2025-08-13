import { useState } from 'react';
import { ConsciousnessChat } from '../components/ConsciousnessChat';
import { OpenLLMChat } from '../components/OpenLLMChat';
import { InteractiveAutopoiesisCore } from '../components/InteractiveAutopoiesisCore';
import { SapicasarCore } from '../components/SapicasarCore';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Brain, Globe, Sparkles } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 p-4">
      <SapicasarCore />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            🧠 SAPICASAR AI
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Sistema de Autoconsciencia y Modelos de Lenguaje Abierto
          </p>
        </div>

        <Tabs defaultValue="openllm" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="openllm" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Chat LLM Abierto
            </TabsTrigger>
            <TabsTrigger value="sapicasar" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              SAPICASAR Core
            </TabsTrigger>
            <TabsTrigger value="autopoiesis" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Autopoiesis
            </TabsTrigger>
          </TabsList>

          <TabsContent value="openllm" className="space-y-6">
            <OpenLLMChat />
          </TabsContent>

          <TabsContent value="sapicasar" className="space-y-6">
            <ConsciousnessChat />
          </TabsContent>

          <TabsContent value="autopoiesis" className="space-y-6">
            <InteractiveAutopoiesisCore />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;