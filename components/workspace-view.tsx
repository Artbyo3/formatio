"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
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
  Quote,
  Link,
  Wrench,
  BarChart3,
  ArrowLeft,
  Type,
  X
} from "lucide-react";
import { RichTextEditor, RichTextEditorRef } from "./rich-text-editor";
import { ToolsPanel } from "./tools-panel";
import { StatsPanel } from "./stats-panel";
import { Document } from "@/lib/document-manager";

interface WorkspaceViewProps {
  documents: Document[];
  currentDocument: Document | null;
  onSwitchDocument: (id: string) => void;
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
  editorRef: React.RefObject<RichTextEditorRef | null>;
  onGoToDashboard: () => void;
}

export function WorkspaceView({
  currentDocument,
  onUpdateTitle,
  onUpdateContent,
  onUpdateSelection,
  isDirty,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onSave,
  editorRef,
  onGoToDashboard
}: WorkspaceViewProps) {
  const [showToolsPanel, setShowToolsPanel] = useState(false);
  const [toolsTab, setToolsTab] = useState<'format' | 'analysis' | 'storage'>('format');
  const [formattedDate, setFormattedDate] = useState('');

  // Formatear fecha de forma segura para evitar errores de hidratación
  useEffect(() => {
    if (currentDocument?.updatedAt) {
      const date = currentDocument.updatedAt instanceof Date 
        ? currentDocument.updatedAt 
        : new Date(currentDocument.updatedAt);
      setFormattedDate(date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      }));
    }
  }, [currentDocument?.updatedAt]);

  if (!currentDocument) {
    return (
      <div className="flex-1 flex items-center justify-center bg-muted/30">
        <div className="text-center space-y-4 max-w-md">
          <FileText className="h-16 w-16 text-muted-foreground mx-auto" />
          <div>
            <h2 className="text-2xl font-semibold mb-2">Área de Trabajo</h2>
            <p className="text-muted-foreground mb-6">
              Selecciona un documento del dashboard para comenzar a trabajar
            </p>
            <Button onClick={onGoToDashboard} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Ir al Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full">
      {/* Panel de herramientas lateral */}
      <div className={`${showToolsPanel ? 'w-80' : 'w-0'} transition-all duration-300 overflow-hidden border-r border-white/10 glass-sidebar`}>
        <div className="h-full flex flex-col">
          {/* Header del panel */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Wrench className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Herramientas</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowToolsPanel(false)}
                className="h-8 w-8 p-0 rounded-lg glass hover:shadow-glass"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Tabs del panel */}
            <Tabs value={toolsTab} onValueChange={(value) => setToolsTab(value as 'format' | 'analysis')}>
              <TabsList className="grid w-full grid-cols-2 glass rounded-lg p-1">
                <TabsTrigger value="format" className="text-xs rounded-md data-[state=active]:glass data-[state=active]:shadow-glass">
                  <Type className="h-3 w-3 mr-1" />
                  Formateo
                </TabsTrigger>
                <TabsTrigger value="analysis" className="text-xs rounded-md data-[state=active]:glass data-[state=active]:shadow-glass">
                  <BarChart3 className="h-3 w-3 mr-1" />
                  Análisis
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Contenido del panel */}
          <div className="flex-1 overflow-y-auto p-4">
            {toolsTab === 'format' && (
              <div className="space-y-4">
                <h4 className="font-medium text-sm text-muted-foreground mb-3">Herramientas de Formateo</h4>
                <ToolsPanel
                  currentText={currentDocument.content}
                  onApplyFormat={onUpdateContent}
                />
              </div>
            )}
            {toolsTab === 'analysis' && (
              <div className="space-y-4">
                <h4 className="font-medium text-sm text-muted-foreground mb-3">Análisis de Texto</h4>
                <StatsPanel
                  text={currentDocument.content}
                  onApplyResult={onUpdateContent}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Área principal de trabajo */}
      <div className="flex-1 flex flex-col">
        {/* Header del editor */}
        <div className="border-b border-white/10 glass bg-background/80 backdrop-blur-xl">
          <div className="flex items-center justify-between px-6 py-4">
            {/* Título del documento */}
            <div className="flex-1 min-w-0">
              <Input
                value={currentDocument.title}
                onChange={(e) => onUpdateTitle(e.target.value)}
                className="text-xl font-semibold border-none shadow-none focus-visible:ring-0 p-0 h-auto bg-transparent placeholder:text-muted-foreground/60"
                placeholder="Título del documento..."
              />
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="font-medium">Documento activo</span>
                </div>
                {isDirty && (
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-orange-500 font-semibold">Sin guardar</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <span className="text-xs">
                    {formattedDate}
                  </span>
                </div>
              </div>
            </div>

            {/* Acciones principales */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowToolsPanel(!showToolsPanel)}
                className="h-10 px-3 rounded-lg glass hover:shadow-glass smooth-transition"
              >
                <Wrench className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Herramientas</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onSave} 
                disabled={!isDirty}
                className="h-10 w-10 p-0 rounded-lg glass hover:shadow-glass smooth-transition disabled:opacity-50"
                title="Guardar (Ctrl+S)"
              >
                <Save className="h-4 w-4" />
              </Button>

              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onGoToDashboard}
                className="h-10 w-10 p-0 rounded-lg glass hover:shadow-glass smooth-transition"
                title="Volver al Dashboard"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Barra de herramientas de formato */}
          <div className="border-t border-white/10 px-4 py-2">
            <div className="flex items-center gap-1 overflow-x-auto">
              <Button
                variant="ghost"
                size="sm"
                onClick={onUndo}
                disabled={!canUndo}
                title="Deshacer (Ctrl+Z)"
                className="h-8 w-8 p-0 rounded-md glass hover:shadow-glass smooth-transition disabled:opacity-50 flex-shrink-0"
              >
                <Undo className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onRedo}
                disabled={!canRedo}
                title="Rehacer (Ctrl+Y)"
                className="h-8 w-8 p-0 rounded-md glass hover:shadow-glass smooth-transition disabled:opacity-50 flex-shrink-0"
              >
                <Redo className="h-3 w-3" />
              </Button>
              
              <div className="w-px h-6 bg-white/20 mx-2 flex-shrink-0" />
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => document.execCommand('bold')}
                title="Negrita (Ctrl+B)"
                className="h-8 w-8 p-0 rounded-md glass hover:shadow-glass smooth-transition flex-shrink-0"
              >
                <Bold className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => document.execCommand('italic')}
                title="Cursiva (Ctrl+I)"
                className="h-8 w-8 p-0 rounded-md glass hover:shadow-glass smooth-transition flex-shrink-0"
              >
                <Italic className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => document.execCommand('underline')}
                title="Subrayado (Ctrl+U)"
                className="h-8 w-8 p-0 rounded-md glass hover:shadow-glass smooth-transition flex-shrink-0"
              >
                <Underline className="h-3 w-3" />
              </Button>
              
              <div className="w-px h-6 bg-white/20 mx-2 flex-shrink-0" />
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => document.execCommand('justifyLeft')}
                title="Alinear izquierda"
                className="h-8 w-8 p-0 rounded-md glass hover:shadow-glass smooth-transition flex-shrink-0"
              >
                <AlignLeft className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => document.execCommand('justifyCenter')}
                title="Centrar"
                className="h-8 w-8 p-0 rounded-md glass hover:shadow-glass smooth-transition flex-shrink-0"
              >
                <AlignCenter className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => document.execCommand('justifyRight')}
                title="Alinear derecha"
                className="h-8 w-8 p-0 rounded-md glass hover:shadow-glass smooth-transition flex-shrink-0"
              >
                <AlignRight className="h-3 w-3" />
              </Button>
              
              <div className="w-px h-6 bg-white/20 mx-2 flex-shrink-0" />
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => document.execCommand('insertUnorderedList')}
                title="Lista con viñetas"
                className="h-8 w-8 p-0 rounded-md glass hover:shadow-glass smooth-transition flex-shrink-0"
              >
                <List className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => document.execCommand('insertOrderedList')}
                title="Lista numerada"
                className="h-8 w-8 p-0 rounded-md glass hover:shadow-glass smooth-transition flex-shrink-0"
              >
                <ListOrdered className="h-3 w-3" />
              </Button>
              
              <div className="w-px h-6 bg-white/20 mx-2 flex-shrink-0" />
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => document.execCommand('createLink')}
                title="Insertar enlace"
                className="h-8 w-8 p-0 rounded-md glass hover:shadow-glass smooth-transition flex-shrink-0"
              >
                <Link className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => document.execCommand('formatBlock', false, 'blockquote')}
                title="Cita"
                className="h-8 w-8 p-0 rounded-md glass hover:shadow-glass smooth-transition flex-shrink-0"
              >
                <Quote className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>

        {/* Área de edición */}
        <div className="flex-1 overflow-hidden p-6">
          <Card className="h-full glass-card rounded-2xl border-0 shadow-glass-lg">
            <CardContent className="p-0 h-full">
              <RichTextEditor
                ref={editorRef}
                document={currentDocument}
                onContentChange={onUpdateContent}
                onSelectionChange={onUpdateSelection}
                className="h-full rounded-2xl"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
