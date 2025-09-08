"use client";

import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Document } from "@/lib/document-manager";
import { 
  HardDrive, 
  Trash2, 
  AlertTriangle, 
  CheckCircle,
  MoreHorizontal
} from "lucide-react";

interface StorageInfo {
  used: number;
  available: number;
  total: number;
  percentage: number;
  documents: number;
  estimatedSize: number;
}

export function StorageMonitor() {
  const [storageInfo, setStorageInfo] = useState<StorageInfo | null>(null);
  const [isClearing, setIsClearing] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Calcular uso de almacenamiento
  const calculateStorageUsage = () => {
    try {
      let totalSize = 0;
      let documentCount = 0;

      // Calcular tamaño de documentos
      const documents = JSON.parse(localStorage.getItem('formatio_documents') || '[]');
      documentCount = documents.length;
      
      documents.forEach((doc: Document) => {
        totalSize += JSON.stringify(doc).length * 2; // Aproximación en bytes
      });

      // Calcular otros datos de la aplicación
      const otherKeys = Object.keys(localStorage).filter(key => 
        key.startsWith('formatio_') && key !== 'formatio_documents'
      );
      
      otherKeys.forEach(key => {
        totalSize += (localStorage.getItem(key)?.length || 0) * 2;
      });

      // Estimación del límite de localStorage (5-10MB típicamente)
      const estimatedLimit = 5 * 1024 * 1024; // 5MB como estimación conservadora
      const available = Math.max(0, estimatedLimit - totalSize);
      const percentage = (totalSize / estimatedLimit) * 100;

      return {
        used: totalSize,
        available,
        total: estimatedLimit,
        percentage: Math.min(percentage, 100),
        documents: documentCount,
        estimatedSize: totalSize
      };
    } catch (error) {
      console.error('Error calculating storage usage:', error);
      return null;
    }
  };

  useEffect(() => {
    const updateStorageInfo = () => {
      const info = calculateStorageUsage();
      setStorageInfo(info);
    };

    updateStorageInfo();
    
    // Actualizar cada 5 segundos
    const interval = setInterval(updateStorageInfo, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const clearOldDocuments = () => {
    setIsClearing(true);
    try {
      const documents = JSON.parse(localStorage.getItem('formatio_documents') || '[]');
      
      // Ordenar por fecha de actualización y mantener solo los 20 más recientes
          const sortedDocs = documents.sort((a: Document, b: Document) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
      
      const recentDocs = sortedDocs.slice(0, 20);
      localStorage.setItem('formatio_documents', JSON.stringify(recentDocs));
      
      // Actualizar información
      const info = calculateStorageUsage();
      setStorageInfo(info);
    } catch (error) {
      console.error('Error clearing old documents:', error);
    } finally {
      setIsClearing(false);
    }
  };

  const clearAllData = () => {
    if (confirm('¿Estás seguro de que quieres eliminar todos los datos? Esta acción no se puede deshacer.')) {
      try {
        // Eliminar solo los datos de Formatio
        const keys = Object.keys(localStorage).filter(key => key.startsWith('formatio_'));
        keys.forEach(key => localStorage.removeItem(key));
        
        // Actualizar información
        const info = calculateStorageUsage();
        setStorageInfo(info);
      } catch (error) {
        console.error('Error clearing all data:', error);
      }
    }
  };

  if (!storageInfo) {
    return (
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <HardDrive className="h-3 w-3" />
        <span>Almacenamiento no disponible</span>
      </div>
    );
  }

  const getStatusIcon = () => {
    if (storageInfo.percentage >= 90) return <AlertTriangle className="h-3 w-3 text-red-500" />;
    if (storageInfo.percentage >= 70) return <AlertTriangle className="h-3 w-3 text-yellow-500" />;
    return <CheckCircle className="h-3 w-3 text-green-500" />;
  };

  return (
    <div className="space-y-2">
      {/* Vista compacta */}
      <div 
        className="flex items-center justify-between cursor-pointer hover:bg-white/5 rounded-lg p-2 smooth-transition"
        onClick={() => setShowDetails(!showDetails)}
      >
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <span className="text-xs font-medium">Almacenamiento</span>
          <span className="text-xs text-muted-foreground">
            {storageInfo.percentage.toFixed(0)}%
          </span>
        </div>
        <MoreHorizontal className="h-3 w-3 text-muted-foreground" />
      </div>

      {/* Barra de progreso compacta */}
      <div className="px-2">
        <Progress value={storageInfo.percentage} className="h-1" />
      </div>

      {/* Detalles expandibles */}
      {showDetails && (
        <div className="space-y-3 text-xs">
          <div className="flex justify-between text-muted-foreground">
            <span>{formatBytes(storageInfo.used)} usados</span>
            <span>{formatBytes(storageInfo.available)} libres</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Documentos:</span>
            <span className="font-medium">{storageInfo.documents}</span>
          </div>

          {/* Advertencia compacta */}
          {storageInfo.percentage >= 70 && (
            <div className="flex items-center gap-2 p-2 bg-yellow-500/10 rounded-md">
              <AlertTriangle className="h-3 w-3 text-yellow-500" />
              <span className="text-yellow-600 text-xs">
                {storageInfo.percentage >= 90 ? 'Almacenamiento lleno' : 'Almacenamiento alto'}
              </span>
            </div>
          )}

          {/* Acciones compactas */}
          <div className="space-y-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearOldDocuments}
              disabled={isClearing || storageInfo.documents <= 20}
              className="h-6 w-full text-xs"
            >
              <Trash2 className="h-3 w-3 mr-1" />
              {isClearing ? 'Limpiando...' : 'Limpiar antiguos'}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllData}
              className="h-6 w-full text-xs text-red-500 hover:text-red-600"
            >
              <Trash2 className="h-3 w-3 mr-1" />
              Eliminar todo
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
