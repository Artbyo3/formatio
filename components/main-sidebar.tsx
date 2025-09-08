"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  FileText, 
  BarChart3, 
  Wrench, 
  Download,
  Upload,
  Save,
  Plus,
  Clock,
  Trash2,
  Eye,
  EyeOff
} from "lucide-react";

interface MainSidebarProps {
  documents: any[];
  currentDocument: any;
  onSwitchDocument: (id: string) => void;
  onCreateDocument: () => void;
  onDeleteDocument: (id: string) => void;
  onSave: () => void;
  onExport: (format: string) => void;
  onImport: () => void;
  showToolsPanel: boolean;
  showStatsPanel: boolean;
  onToggleTools: () => void;
  onToggleStats: () => void;
  isDirty: boolean;
}

export function MainSidebar({
  documents,
  currentDocument,
  onSwitchDocument,
  onCreateDocument,
  onDeleteDocument,
  onSave,
  onExport,
  onImport,
  showToolsPanel,
  showStatsPanel,
  onToggleTools,
  onToggleStats,
  isDirty
}: MainSidebarProps) {
  const [showRecent, setShowRecent] = useState(true);

  const recentDocuments = documents
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  return (
    <div className="w-64 bg-muted/30 border-r flex flex-col h-full">
      {/* Header del sidebar */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <FileText className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-lg">Formatio</h1>
            <p className="text-xs text-muted-foreground">Editor de Texto</p>
          </div>
        </div>
        
        <Button onClick={onCreateDocument} className="w-full" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Documento
        </Button>
      </div>

      {/* Navegación principal */}
      <div className="p-4 space-y-2">
        <div className="space-y-1">
          <Button
            variant={showToolsPanel ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={onToggleTools}
            size="sm"
          >
            <Wrench className="h-4 w-4 mr-2" />
            Herramientas
            {showToolsPanel && <Badge variant="outline" className="ml-auto text-xs">ON</Badge>}
          </Button>
          
          <Button
            variant={showStatsPanel ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={onToggleStats}
            size="sm"
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Estadísticas
            {showStatsPanel && <Badge variant="outline" className="ml-auto text-xs">ON</Badge>}
          </Button>
        </div>

        <Separator className="my-4" />

        {/* Acciones rápidas */}
        <div className="space-y-1">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Acciones Rápidas
          </h3>
          
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={onSave}
            size="sm"
            disabled={!isDirty}
          >
            <Save className="h-4 w-4 mr-2" />
            Guardar
            {isDirty && <Badge variant="destructive" className="ml-auto text-xs">!</Badge>}
          </Button>
          
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => onExport('txt')}
            size="sm"
          >
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={onImport}
            size="sm"
          >
            <Upload className="h-4 w-4 mr-2" />
            Importar
          </Button>
        </div>
      </div>

      {/* Documentos recientes */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Documentos Recientes
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowRecent(!showRecent)}
              className="h-6 w-6 p-0"
            >
              {showRecent ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
            </Button>
          </div>
          
          {showRecent && (
            <div className="space-y-1">
              {recentDocuments.length === 0 ? (
                <p className="text-xs text-muted-foreground text-center py-4">
                  No hay documentos recientes
                </p>
              ) : (
                recentDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className={`group flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors ${
                      currentDocument?.id === doc.id
                        ? 'bg-primary/10 border border-primary/20'
                        : 'hover:bg-muted'
                    }`}
                    onClick={() => onSwitchDocument(doc.id)}
                  >
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{doc.title}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{new Date(doc.updatedAt).toLocaleDateString()}</span>
                        <Badge variant="outline" className="text-xs">
                          {doc.wordCount}w
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteDocument(doc.id);
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer del sidebar */}
      <div className="p-4 border-t">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Documentos</span>
            <Badge variant="outline">{documents.length}</Badge>
          </div>
          
          {currentDocument && (
            <div className="space-y-1 text-xs text-muted-foreground">
              <div className="flex justify-between">
                <span>Palabras:</span>
                <span className="font-medium">{currentDocument.wordCount}</span>
              </div>
              <div className="flex justify-between">
                <span>Caracteres:</span>
                <span className="font-medium">{currentDocument.charCount}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
