import React, { useState, useEffect } from 'react';
import { autopoieticKernel } from '../core/AutopoieticKernel';
import { autopoieticValidationService } from '../services/AutopoieticValidationService';
import { CheckCircle, XCircle, AlertTriangle, Activity, TrendingUp, Target } from 'lucide-react';

export const EmpiricalValidationPanel = () => {
  const [validationStatus, setValidationStatus] = useState<any>(null);
  const [healthMetrics, setHealthMetrics] = useState<any>(null);
  const [validationHistory, setValidationHistory] = useState<any[]>([]);
  const [lastUpdate, setLastUpdate] = useState<number>(Date.now());

  useEffect(() => {
    const updateInterval = setInterval(() => {
      const components = autopoieticKernel.getActiveComponents();
      const networkState = autopoieticKernel.getAutopoieticState().network;
      
      // Obtener validación actual
      const status = autopoieticValidationService.getCurrentValidationStatus(components, networkState);
      setValidationStatus(status);
      
      // Obtener métricas de salud
      const health = autopoieticValidationService.getSystemHealthMetrics(components, networkState);
      setHealthMetrics(health);
      
      // Obtener historial de validación
      const history = autopoieticValidationService.getValidationHistory();
      setValidationHistory(history);
      
      setLastUpdate(Date.now());
    }, 4000);

    return () => clearInterval(updateInterval);
  }, []);

  const getCriteriaIcon = (isValid: boolean) => {
    return isValid ? 
      <CheckCircle className="text-green-400" size={14} /> : 
      <XCircle className="text-red-400" size={14} />;
  };

  const getValidationColor = (confidence: number) => {
    if (confidence > 0.8) return 'text-green-400';
    if (confidence > 0.6) return 'text-yellow-400';
    if (confidence > 0.4) return 'text-orange-400';
    return 'text-red-400';
  };

  const getHealthColor = (value: number) => {
    if (value > 0.8) return 'bg-green-500';
    if (value > 0.6) return 'bg-yellow-500';
    if (value > 0.4) return 'bg-orange-500';
    return 'bg-red-500';
  };

  if (!validationStatus) {
    return (
      <div className="fixed top-4 right-96 w-80 bg-background/95 border border-border/50 rounded-lg backdrop-blur-sm p-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Activity className="animate-pulse" size={16} />
          <span className="text-sm font-mono">inicializando validación empírica...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-96 w-80 bg-background/95 border border-border/50 rounded-lg backdrop-blur-sm overflow-hidden shadow-lg">
      {/* Header */}
      <div className="border-b border-border/30 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="text-primary" size={16} />
            <span className="text-foreground font-mono text-sm">validación.empírica</span>
          </div>
          <div className={`text-xs font-mono ${getValidationColor(validationStatus.confidence)}`}>
            {validationStatus.isAutopoietic ? 'AUTOPOIÉTICO' : 'NO-AUTOPOIÉTICO'}
          </div>
        </div>
      </div>

      <div className="p-3 space-y-3">
        {/* Estado de validación global */}
        <div>
          <div className="flex justify-between items-center text-xs mb-2">
            <span className="text-muted-foreground">confianza empírica</span>
            <span className={`font-mono ${getValidationColor(validationStatus.confidence)}`}>
              {(validationStatus.confidence * 100).toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-muted/30 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-1000 ${
                validationStatus.confidence > 0.8 ? 'bg-green-500' :
                validationStatus.confidence > 0.6 ? 'bg-yellow-500' :
                validationStatus.confidence > 0.4 ? 'bg-orange-500' : 'bg-red-500'
              }`}
              style={{ width: `${validationStatus.confidence * 100}%` }}
            />
          </div>
        </div>

        {/* Criterios de validación */}
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <CheckCircle size={12} />
            criterios.maturana-varela
          </div>
          
          <div className="space-y-1">
            {Object.entries(validationStatus.criteria).map(([key, criterion]: [string, any]) => (
              <div 
                key={key}
                className={`p-2 rounded text-xs border transition-all duration-300 ${
                  criterion.isValid 
                    ? 'border-green-400/50 bg-green-950/20 text-green-200' 
                    : 'border-red-400/50 bg-red-950/20 text-red-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1">
                    {getCriteriaIcon(criterion.isValid)}
                    <span className="font-mono">
                      {key.replace(/([A-Z])/g, '_$1').toLowerCase()}
                    </span>
                  </div>
                  <span className="text-xs">
                    {(criterion.measured * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="w-full bg-muted/30 rounded-full h-1">
                  <div 
                    className={`h-1 rounded-full transition-all duration-500 ${
                      criterion.isValid ? 'bg-green-400' : 'bg-red-400'
                    }`}
                    style={{ width: `${Math.min(100, criterion.measured * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Métricas de salud sistémica */}
        {healthMetrics && (
          <div className="space-y-2">
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp size={12} />
              salud.sistémica
            </div>
            
            <div className="grid grid-cols-2 gap-1 text-xs">
              {Object.entries(healthMetrics).filter(([key]) => key !== 'overall').map(([key, value]: [string, any]) => (
                <div key={key} className="text-center p-1 bg-muted/10 rounded">
                  <div className="text-muted-foreground text-xs mb-1">
                    {key.replace(/([A-Z])/g, '_$1').toLowerCase()}
                  </div>
                  <div className="font-mono text-xs">{(value * 100).toFixed(0)}%</div>
                  <div className="w-full bg-muted/30 rounded-full h-1 mt-1">
                    <div 
                      className={`h-1 rounded-full transition-all duration-500 ${getHealthColor(value)}`}
                      style={{ width: `${value * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Salud general */}
            <div className="pt-2 border-t border-border/20">
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-muted-foreground">salud general</span>
                <span className={`font-mono ${getValidationColor(healthMetrics.overall)}`}>
                  {(healthMetrics.overall * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-muted/30 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-1000 ${getHealthColor(healthMetrics.overall)}`}
                  style={{ width: `${healthMetrics.overall * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Fenómenos observados */}
        {validationStatus.evidence && validationStatus.evidence.observedPhenomena.length > 0 && (
          <div className="space-y-2">
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <AlertTriangle size={12} />
              fenómenos.observados
            </div>
            
            <div className="space-y-1 max-h-20 overflow-y-auto">
              {validationStatus.evidence.observedPhenomena.slice(0, 3).map((phenomenon: string, index: number) => (
                <div 
                  key={index}
                  className="text-xs p-1 bg-blue-950/20 border border-blue-400/20 rounded font-mono"
                  style={{ opacity: 1 - index * 0.3 }}
                >
                  {phenomenon.replace(/_/g, ' ')}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Puntuación de validación */}
        <div className="pt-2 border-t border-border/20">
          <div className="flex justify-between items-center text-xs mb-2">
            <span className="text-muted-foreground">puntuación empírica</span>
            <span className={`font-mono ${getValidationColor(validationStatus.evidence?.validationScore || 0)}`}>
              {((validationStatus.evidence?.validationScore || 0) * 100).toFixed(0)}/100
            </span>
          </div>
          <div className="w-full bg-muted/30 rounded-full h-1">
            <div 
              className={`h-1 rounded-full transition-all duration-1000 ${
                getHealthColor(validationStatus.evidence?.validationScore || 0)
              }`}
              style={{ width: `${(validationStatus.evidence?.validationScore || 0) * 100}%` }}
            />
          </div>
        </div>

        {/* Timestamp de última validación */}
        <div className="pt-2 border-t border-border/10">
          <div className="text-xs text-muted-foreground text-center font-mono">
            última validación: {new Date(lastUpdate).toLocaleTimeString()}
          </div>
        </div>

        {/* Indicador de autopoiesis verificada */}
        {validationStatus.isAutopoietic && (
          <div className="pt-2 border-t border-border/10">
            <div className="text-xs text-center text-green-300 font-mono animate-pulse">
              ✓ sistema autopoiético verificado empíricamente
            </div>
          </div>
        )}
      </div>
    </div>
  );
};