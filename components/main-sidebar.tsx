"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
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
  EyeOff,
  Zap,
  X
} from "lucide-react";

import { Document } from "@/lib/document-manager";

interface MainSidebarProps {
  documents: Document[];
  currentDocument: Document | null;
  onSwitchDocument: (id: string) => void;
  onCreateDocument: (template?: { content: string; name: string }) => void;
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
  const [showTemplatesModal, setShowTemplatesModal] = useState(false);

  // Plantillas disponibles
  const templates = [
    {
      id: 'letter',
      name: 'Carta Formal',
      description: 'Plantilla para cartas formales y comerciales',
      icon: '📝',
      category: 'Correspondencia'
    },
    {
      id: 'report',
      name: 'Informe',
      description: 'Estructura para informes y reportes',
      icon: '📊',
      category: 'Documentos'
    },
    {
      id: 'meeting',
      name: 'Acta de Reunión',
      description: 'Plantilla para actas de reuniones',
      icon: '👥',
      category: 'Reuniones'
    },
    {
      id: 'proposal',
      name: 'Propuesta',
      description: 'Estructura para propuestas comerciales',
      icon: '💼',
      category: 'Comercial'
    },
    {
      id: 'resume',
      name: 'Currículum',
      description: 'Plantilla para currículum vitae',
      icon: '👤',
      category: 'Personal'
    },
    {
      id: 'article',
      name: 'Artículo',
      description: 'Estructura para artículos y blogs',
      icon: '📰',
      category: 'Contenido'
    }
  ];

  const recentDocuments = documents
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
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
        
        <Button onClick={() => setShowTemplatesModal(true)} className="w-full" size="sm">
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
                        <span>{doc.updatedAt.toLocaleDateString()}</span>
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

      {/* Modal de Plantillas */}
      {showTemplatesModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="glass-card rounded-2xl border-0 shadow-glass-lg w-full max-w-4xl max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <Zap className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Plantillas</h2>
                    <p className="text-sm text-muted-foreground">Selecciona una plantilla para crear tu documento</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowTemplatesModal(false)}
                  className="h-10 w-10 p-0 rounded-xl glass hover:shadow-glass"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {templates.map((template) => (
                  <Card
                    key={template.id}
                    className="glass-card rounded-xl border-0 shadow-glass smooth-transition hover:shadow-glass-lg hover:scale-105 cursor-pointer"
                    onClick={() => {
                      // Crear documento desde plantilla
                      onCreateDocument();
                      setShowTemplatesModal(false);
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">{template.icon}</div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm mb-1">{template.name}</h3>
                          <p className="text-xs text-muted-foreground mb-2">{template.description}</p>
                          <Badge variant="outline" className="text-xs">
                            {template.category}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="p-6 border-t border-white/10">
              <div className="flex justify-end gap-3">
                <Button
                  variant="ghost"
                  onClick={() => setShowTemplatesModal(false)}
                  className="rounded-xl glass hover:shadow-glass"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={() => {
                    // Crear documento en blanco
                    onCreateDocument();
                    setShowTemplatesModal(false);
                  }}
                  className="rounded-xl glass shadow-glass-lg"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Documento en Blanco
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
