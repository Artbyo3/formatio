"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { 
  FileText, 
  Plus, 
  Save, 
  Undo, 
  Redo, 
  Bold, 
  Italic, 
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Settings,
  Wrench,
  BarChart3,
  HardDrive,
  X,
} from "lucide-react";
import { RichTextEditor } from "./rich-text-editor";
import { ToolsPanel } from "./tools-panel";
import { StatsPanel } from "./stats-panel";
import { StorageMonitor } from "./storage-monitor";

import { Document } from "@/lib/document-manager";

import { RichTextEditorRef } from "./rich-text-editor";

interface SimpleLayoutProps {
  currentDocument: Document | null;
  onCreateDocument: () => void;
  onUpdateTitle: (title: string) => void;
  onUpdateContent: (content: string) => void;
  onUpdateSelection: (start: number, end: number) => void;
  isDirty: boolean;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onSave: () => void;
  editorRef: React.RefObject<RichTextEditorRef>;
}

export function SimpleLayout({
  currentDocument,
  onCreateDocument,
  onUpdateTitle,
  onUpdateContent,
  onUpdateSelection,
  isDirty,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onSave,
  editorRef
}: SimpleLayoutProps) {
  const [showSidebar, setShowSidebar] = useState(false);
  const [sidebarTab, setSidebarTab] = useState<'tools' | 'stats' | 'storage'>('tools');

  if (!currentDocument) {
    return (
      <div className="h-screen flex items-center justify-center bg-muted/30">
        <div className="text-center space-y-4 max-w-md">
          <FileText className="h-16 w-16 text-muted-foreground mx-auto" />
          <div>
            <h2 className="text-2xl font-semibold mb-2">Bienvenido a Formatio</h2>
            <p className="text-muted-foreground mb-6">
              Tu editor de texto completo con herramientas de formateo avanzadas
            </p>
            <Button onClick={onCreateDocument} size="lg">
              <Plus className="h-5 w-5 mr-2" />
              Crear Primer Documento
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-background">
      {/* Sidebar colapsable */}
      <div className={`${showSidebar ? 'w-80' : 'w-0'} transition-all duration-300 overflow-hidden border-r bg-muted/30`}>
        <div className="h-full flex flex-col">
          {/* Header del sidebar */}
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Herramientas</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSidebar(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Tabs del sidebar */}
            <div className="flex gap-1">
              <Button
                variant={sidebarTab === 'tools' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSidebarTab('tools')}
                className="flex-1"
              >
                <Wrench className="h-4 w-4 mr-2" />
                Formateo
              </Button>
              <Button
                variant={sidebarTab === 'stats' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSidebarTab('stats')}
                className="flex-1"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Análisis
              </Button>
              <Button
                variant={sidebarTab === 'storage' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSidebarTab('storage')}
                className="flex-1"
              >
                <HardDrive className="h-4 w-4 mr-2" />
                Almacenamiento
              </Button>
            </div>
          </div>

          {/* Contenido del sidebar */}
          <div className="flex-1 overflow-y-auto p-4">
            {sidebarTab === 'tools' && (
              <ToolsPanel
                currentText={currentDocument?.content || ''}
                onApplyFormat={onUpdateContent}
              />
            )}
            {sidebarTab === 'stats' && (
              <StatsPanel
                text={currentDocument?.content || ''}
                onApplyResult={onUpdateContent}
              />
            )}
            {sidebarTab === 'storage' && (
              <StorageMonitor />
            )}
          </div>
        </div>
      </div>

      {/* Área principal */}
      <div className="flex-1 flex flex-col">
        {/* Header principal */}
        <div className="border-b bg-background/95 backdrop-blur">
          <div className="flex items-center justify-between px-4 py-3">
            {/* Título del documento */}
            <div className="flex-1 min-w-0">
              <Input
                value={currentDocument.title}
                onChange={(e) => onUpdateTitle(e.target.value)}
                className="text-lg font-medium border-none shadow-none focus-visible:ring-0 p-0 h-auto"
                placeholder="Título del documento..."
              />
              <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                <span>{currentDocument.wordCount || 0} palabras</span>
                <span>•</span>
                <span>{currentDocument.charCount || 0} caracteres</span>
                {isDirty && (
                  <>
                    <span>•</span>
                    <span className="text-orange-500 font-medium">Sin guardar</span>
                  </>
                )}
              </div>
            </div>

            {/* Acciones principales */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSidebar(!showSidebar)}
              >
                <Wrench className="h-4 w-4 mr-2" />
                Herramientas
              </Button>
              
              <Button variant="ghost" size="sm" onClick={onSave} disabled={!isDirty}>
                <Save className="h-4 w-4" />
              </Button>

              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Barra de herramientas de formato */}
          <div className="border-t px-4 py-2">
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={onUndo}
                disabled={!canUndo}
                title="Deshacer (Ctrl+Z)"
              >
                <Undo className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onRedo}
                disabled={!canRedo}
                title="Rehacer (Ctrl+Y)"
              >
                <Redo className="h-4 w-4" />
              </Button>
              
              <div className="w-px h-6 bg-border mx-2" />
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => document.execCommand('bold')}
                title="Negrita (Ctrl+B)"
              >
                <Bold className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => document.execCommand('italic')}
                title="Cursiva (Ctrl+I)"
              >
                <Italic className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => document.execCommand('underline')}
                title="Subrayado (Ctrl+U)"
              >
                <Underline className="h-4 w-4" />
              </Button>
              
              <div className="w-px h-6 bg-border mx-2" />
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => document.execCommand('justifyLeft')}
                title="Alinear izquierda"
              >
                <AlignLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => document.execCommand('justifyCenter')}
                title="Centrar"
              >
                <AlignCenter className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => document.execCommand('justifyRight')}
                title="Alinear derecha"
              >
                <AlignRight className="h-4 w-4" />
              </Button>
              
              <div className="w-px h-6 bg-border mx-2" />
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => document.execCommand('insertUnorderedList')}
                title="Lista con viñetas"
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => document.execCommand('insertOrderedList')}
                title="Lista numerada"
              >
                <ListOrdered className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Área de edición */}
        <div className="flex-1 overflow-hidden">
          <Card className="h-full border-0 rounded-none">
            <CardContent className="p-0 h-full">
              <RichTextEditor
                ref={editorRef}
                document={currentDocument}
                onContentChange={onUpdateContent}
                onSelectionChange={onUpdateSelection}
                className="h-full"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
