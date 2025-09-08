"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Document } from "@/lib/document-manager";
import { 
  HardDrive, 
  Trash2, 
  FileText,
  Code,
  Archive
} from "lucide-react";

interface StorageInfo {
  used: number;
  available: number;
  total: number;
  percentage: number;
  documents: number;
  estimatedSize: number;
  breakdown: {
    text: number;
    json: number;
    html: number;
    other: number;
  };
}

export function StorageMonitor() {
  const [storageInfo, setStorageInfo] = useState<StorageInfo | null>(null);
  const [isClearing, setIsClearing] = useState(false);

  // Calcular uso de almacenamiento
  const calculateStorageUsage = () => {
    try {
      let totalSize = 0;
      let documentCount = 0;
      const breakdown = {
        text: 0,
        json: 0,
        html: 0,
        other: 0
      };

      // Calcular tamaño de documentos
      const documents = JSON.parse(localStorage.getItem('formatio_documents') || '[]');
      documentCount = documents.length;
      
      documents.forEach((doc: Document) => {
        const docSize = JSON.stringify(doc).length * 2; // Aproximación en bytes
        totalSize += docSize;
        
        // Clasificar por tipo de contenido
        const content = doc.content.toLowerCase();
        if (content.includes('<html') || content.includes('<div') || content.includes('<p')) {
          breakdown.html += docSize;
        } else if (content.includes('{') && content.includes('}') && content.includes('"')) {
          breakdown.json += docSize;
        } else if (content.trim().length > 0) {
          breakdown.text += docSize;
        } else {
          breakdown.other += docSize;
        }
      });

      // Calcular otros datos de la aplicación
      const otherKeys = Object.keys(localStorage).filter(key => 
        key.startsWith('formatio_') && key !== 'formatio_documents'
      );
      
      otherKeys.forEach(key => {
        const keySize = (localStorage.getItem(key)?.length || 0) * 2;
        totalSize += keySize;
        breakdown.other += keySize;
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
        estimatedSize: totalSize,
        breakdown
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


  const getBreakdownItems = () => {
    const items = [];
    if (storageInfo.breakdown.text > 0) {
      items.push({
        name: 'Texto',
        size: storageInfo.breakdown.text,
        icon: FileText,
        color: 'bg-blue-500'
      });
    }
    if (storageInfo.breakdown.html > 0) {
      items.push({
        name: 'HTML',
        size: storageInfo.breakdown.html,
        icon: Code,
        color: 'bg-orange-500'
      });
    }
    if (storageInfo.breakdown.json > 0) {
      items.push({
        name: 'JSON',
        size: storageInfo.breakdown.json,
        icon: Archive,
        color: 'bg-green-500'
      });
    }
    if (storageInfo.breakdown.other > 0) {
      items.push({
        name: 'Otros',
        size: storageInfo.breakdown.other,
        icon: HardDrive,
        color: 'bg-gray-500'
      });
    }
    return items;
  };

  return (
    <div className="space-y-1">
      {/* Información básica */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{storageInfo.documents} docs</span>
        <span>{formatBytes(storageInfo.used)} / {formatBytes(storageInfo.total)}</span>
      </div>

      {/* Barra de almacenamiento visual */}
      <div className="flex h-2 bg-muted/30 rounded-full overflow-hidden group relative">
        {getBreakdownItems().map((item) => {
          const percentage = (item.size / storageInfo.used) * 100;
          return (
            <div
              key={item.name}
              className={`${item.color} transition-all duration-300 hover:brightness-110 relative group/item`}
              style={{ width: `${percentage}%` }}
            >
              {/* Tooltip que aparece arriba */}
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/item:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20 pointer-events-none">
                <div className="font-medium">{item.name}</div>
                <div className="text-[10px] opacity-90">{formatBytes(item.size)}</div>
                {/* Flecha del tooltip */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-black/90"></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Acciones solo cuando se necesita */}
      {storageInfo.percentage >= 70 && (
        <div className="flex gap-1 pt-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearOldDocuments}
            disabled={isClearing || storageInfo.documents <= 20}
            className="h-6 text-xs px-2"
          >
            <Trash2 className="h-3 w-3 mr-1" />
            {isClearing ? 'Limpiando...' : 'Limpiar'}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllData}
            className="h-6 text-xs px-2 text-red-500 hover:text-red-600"
          >
            <Trash2 className="h-3 w-3 mr-1" />
            Eliminar todo
          </Button>
        </div>
      )}
    </div>
  );
}
