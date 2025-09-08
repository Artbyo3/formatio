"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  MoreHorizontal,
  Settings,
  BarChart3,
  HardDrive
} from "lucide-react";
import { RichTextEditor } from "./rich-text-editor";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CleanEditorProps {
  documents: any[];
  currentDocument: any;
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
  editorRef: React.RefObject<any>;
  onViewChange: (view: string) => void;
}

export function CleanEditor({
  documents,
  currentDocument,
  onSwitchDocument,
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
  editorRef,
  onViewChange
}: CleanEditorProps) {
  const [showDocumentTabs, setShowDocumentTabs] = useState(false);

  if (!currentDocument) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <FileText className="h-16 w-16 text-muted-foreground mx-auto" />
          <div>
            <h2 className="text-xl font-semibold mb-2">No hay documento abierto</h2>
            <p className="text-muted-foreground mb-4">
              Selecciona un documento existente o crea uno nuevo
            </p>
            <Button onClick={onCreateDocument}>
              Crear Nuevo Documento
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header del editor - minimalista */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Título del documento */}
          <div className="flex-1 min-w-0">
            <Input
              value={currentDocument.title}
              onChange={(e) => onUpdateTitle(e.target.value)}
              className="text-lg font-medium border-none shadow-none focus-visible:ring-0 p-0 h-auto"
              placeholder="Título del documento..."
            />
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
              <span>{currentDocument.wordCount || 0} palabras</span>
              <span>•</span>
              <span>{currentDocument.charCount || 0} caracteres</span>
              {isDirty && (
                <>
                  <span>•</span>
                  <span className="text-orange-500">Sin guardar</span>
                </>
              )}
            </div>
          </div>

          {/* Acciones principales */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDocumentTabs(!showDocumentTabs)}
            >
              <FileText className="h-4 w-4 mr-2" />
              {documents.length} docs
            </Button>
            
            <Button variant="ghost" size="sm" onClick={onSave} disabled={!isDirty}>
              <Save className="h-4 w-4" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onViewChange('tools')}>
                  <Settings className="h-4 w-4 mr-2" />
                  Herramientas
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onViewChange('tools')}>
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Análisis
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onViewChange('tools')}>
                  <HardDrive className="h-4 w-4 mr-2" />
                  Almacenamiento
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Pestañas de documentos - colapsable */}
        {showDocumentTabs && documents.length > 1 && (
          <div className="border-t px-4 py-2">
            <div className="flex gap-1 overflow-x-auto">
              {documents.map((doc) => (
                <Button
                  key={doc.id}
                  variant={doc.id === currentDocument.id ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => onSwitchDocument(doc.id)}
                  className="whitespace-nowrap"
                >
                  {doc.title || "Sin título"}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={onCreateDocument}
                className="whitespace-nowrap"
              >
                + Nuevo
              </Button>
            </div>
          </div>
        )}

        {/* Barra de herramientas - compacta */}
        <div className="border-t px-4 py-2">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={onUndo}
              disabled={!canUndo}
            >
              <Undo className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onRedo}
              disabled={!canRedo}
            >
              <Redo className="h-4 w-4" />
            </Button>
            
            <div className="w-px h-6 bg-border mx-2" />
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => document.execCommand('bold')}
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => document.execCommand('italic')}
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => document.execCommand('underline')}
            >
              <Underline className="h-4 w-4" />
            </Button>
            
            <div className="w-px h-6 bg-border mx-2" />
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => document.execCommand('justifyLeft')}
            >
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => document.execCommand('justifyCenter')}
            >
              <AlignCenter className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => document.execCommand('justifyRight')}
            >
              <AlignRight className="h-4 w-4" />
            </Button>
            
            <div className="w-px h-6 bg-border mx-2" />
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => document.execCommand('insertUnorderedList')}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => document.execCommand('insertOrderedList')}
            >
              <ListOrdered className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => document.execCommand('formatBlock', false, 'blockquote')}
            >
              <Quote className="h-4 w-4" />
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
  );
}
