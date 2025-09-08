"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Save, 
  Download, 
  Upload, 
  Search, 
  Settings, 
  MoreHorizontal,
  FileText,
  AlertCircle,
  CheckCircle
} from "lucide-react";

interface ImprovedHeaderProps {
  documentTitle: string;
  onTitleChange: (title: string) => void;
  onSave: () => void;
  onExport: (format: string) => void;
  onImport: () => void;
  onSearch: () => void;
  isDirty: boolean;
  lastSaved?: Date;
  wordCount: number;
  charCount: number;
  showToolsPanel: boolean;
  showStatsPanel: boolean;
  onToggleTools: () => void;
  onToggleStats: () => void;
}

export function ImprovedHeader({
  documentTitle,
  onTitleChange,
  onSave,
  onExport,
  onImport,
  onSearch,
  isDirty,
  lastSaved,
  wordCount,
  charCount,
  showToolsPanel,
  showStatsPanel,
  onToggleTools,
  onToggleStats
}: ImprovedHeaderProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const formatLastSaved = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return "Ahora";
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    return `${days}d`;
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Título del documento */}
          <div className="flex-1 min-w-0 mr-4">
            {isEditingTitle ? (
              <Input
                value={documentTitle}
                onChange={(e) => onTitleChange(e.target.value)}
                onBlur={() => setIsEditingTitle(false)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setIsEditingTitle(false);
                  }
                  if (e.key === 'Escape') {
                    setIsEditingTitle(false);
                  }
                }}
                className="text-xl font-semibold border-none shadow-none focus-visible:ring-0 p-0 h-auto"
                placeholder="Título del documento..."
                autoFocus
              />
            ) : (
              <button
                onClick={() => setIsEditingTitle(true)}
                className="text-xl font-semibold hover:bg-muted/50 px-2 py-1 rounded transition-colors text-left w-full"
              >
                {documentTitle || "Documento sin título"}
              </button>
            )}
          </div>

          {/* Información del documento */}
          <div className="flex items-center gap-4 mr-4">
            {/* Estado de guardado */}
            <div className="flex items-center gap-2">
              {isDirty ? (
                <div className="flex items-center gap-1 text-orange-600">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">Sin guardar</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm">Guardado</span>
                </div>
              )}
              
              {lastSaved && (
                <span className="text-xs text-muted-foreground">
                  {formatLastSaved(lastSaved)}
                </span>
              )}
            </div>

            {/* Estadísticas rápidas */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Badge variant="outline" className="text-xs">
                {wordCount} palabras
              </Badge>
              <Badge variant="outline" className="text-xs">
                {charCount} caracteres
              </Badge>
            </div>
          </div>

          {/* Controles principales */}
          <div className="flex items-center gap-2">
            {/* Botón de búsqueda */}
            <Button
              variant="outline"
              size="sm"
              onClick={onSearch}
              title="Buscar (Ctrl+F)"
            >
              <Search className="h-4 w-4" />
            </Button>

            {/* Botón de guardar */}
            <Button
              variant="outline"
              size="sm"
              onClick={onSave}
              disabled={!isDirty}
              title="Guardar (Ctrl+S)"
            >
              <Save className="h-4 w-4" />
            </Button>

            {/* Menú de archivo */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={onImport}>
                  <Upload className="h-4 w-4 mr-2" />
                  Importar
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onExport('txt')}>
                  <Download className="h-4 w-4 mr-2" />
                  Exportar como TXT
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onExport('html')}>
                  <Download className="h-4 w-4 mr-2" />
                  Exportar como HTML
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onExport('pdf')}>
                  <Download className="h-4 w-4 mr-2" />
                  Exportar como PDF
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onToggleTools}>
                  <FileText className="h-4 w-4 mr-2" />
                  {showToolsPanel ? 'Ocultar' : 'Mostrar'} Herramientas
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onToggleStats}>
                  <Settings className="h-4 w-4 mr-2" />
                  {showStatsPanel ? 'Ocultar' : 'Mostrar'} Estadísticas
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
