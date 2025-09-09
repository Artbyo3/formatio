"use client";

import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLineManager } from "../hooks/use-line-manager";
import { 
  FileText, 
  Code, 
  Table, 
  Layout, 
  Save, 
  Undo, 
  Redo, 
  Bold, 
  Italic, 
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Wrench,
  X,
  Eye,
  Maximize,
  Minimize,
  Columns
} from "lucide-react";
import { Document } from "@/lib/document-manager";

// Tipos de área de trabajo
export type WorkspaceMode = 
  | 'text'      // Escritura vertical
  | 'code';     // Código horizontal

export interface WorkspaceConfig {
  mode: WorkspaceMode;
  orientation: 'vertical' | 'horizontal';
  showLineNumbers: boolean;
  showCodeLines: boolean;
  showDistractionFree: boolean;
  showWideMargins: boolean;
  showJustification: boolean;
  fullscreen: boolean;
}

interface FlexibleWorkspaceProps {
  document: Document | null;
  onContentChange: (content: string) => void;
  onSelectionChange: (start: number, end: number) => void;
  onTitleChange: (title: string) => void;
  onSave: () => void;
  onUndo: () => void;
  onRedo: () => void;
  isDirty: boolean;
  canUndo: boolean;
  canRedo: boolean;
  className?: string;
}

export interface FlexibleWorkspaceRef {
  applyFormat: (command: string, value?: string) => void;
  focus: () => void;
  switchMode: (mode: WorkspaceMode) => void;
  toggleFullscreen: () => void;
}

const defaultConfig: WorkspaceConfig = {
  mode: 'text',
  orientation: 'vertical',
  showLineNumbers: false,
  showCodeLines: true,
  showDistractionFree: false,
  showWideMargins: false,
  showJustification: false,
  fullscreen: false
};

const modeConfigs: Record<WorkspaceMode, Partial<WorkspaceConfig>> = {
  text: {
    orientation: 'vertical',
    showDistractionFree: true,
    showWideMargins: true,
    showJustification: true
  },
  code: {
    orientation: 'horizontal',
    showLineNumbers: true,
    showCodeLines: true
  }
};

export const FlexibleWorkspace = forwardRef<FlexibleWorkspaceRef, FlexibleWorkspaceProps>(({
  document,
  onContentChange,
  onSelectionChange,
  onTitleChange,
  onSave,
  onUndo,
  onRedo,
  isDirty,
  canUndo,
  canRedo,
  className = ""
}, ref) => {
  const [config, setConfig] = useState<WorkspaceConfig>(defaultConfig);
  const [showToolsPanel, setShowToolsPanel] = useState(false);
  const [showModeSelector, setShowModeSelector] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  // Aplicar configuración del modo
  const applyModeConfig = (mode: WorkspaceMode) => {
    const modeConfig = modeConfigs[mode];
    setConfig(prev => ({
      ...prev,
      ...modeConfig,
      mode
    }));
  };

  // Cambiar modo de trabajo
  const switchMode = (mode: WorkspaceMode) => {
    applyModeConfig(mode);
    setShowModeSelector(false);
  };


  // Toggle fullscreen
  const toggleFullscreen = () => {
    setConfig(prev => ({ ...prev, fullscreen: !prev.fullscreen }));
  };

  // Manejar cambios en el contenido
  const handleInput = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      onContentChange(content);
      
      // The line manager will automatically update when content changes
      // No need to manually call refreshLines here
    }
  };

  // Manejar cambios en la selección
  const handleSelectionChange = () => {
    if (editorRef.current) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const start = getTextOffset(editorRef.current, range.startContainer, range.startOffset);
        const end = getTextOffset(editorRef.current, range.endContainer, range.endOffset);
        onSelectionChange(start, end);
      }
    }
  };

  // Calcular offset de texto
  const getTextOffset = (container: Node, node: Node, offset: number): number => {
    let textOffset = 0;
    if (typeof window === 'undefined' || !window.document) return 0;
    
    const walker = window.document.createTreeWalker(
      container,
      NodeFilter.SHOW_TEXT,
      null
    );

    let currentNode;
    while (currentNode = walker.nextNode()) {
      if (currentNode === node) {
        return textOffset + offset;
      }
      textOffset += currentNode.textContent?.length || 0;
    }
    return textOffset;
  };

  // Aplicar formato
  const applyFormat = (command: string, value?: string) => {
    if (editorRef.current && typeof window !== 'undefined' && window.document) {
      editorRef.current.focus();
      window.document.execCommand(command, false, value);
      handleInput();
    }
  };

  // Exponer funciones para uso externo
  useImperativeHandle(ref, () => ({
    applyFormat,
    focus: () => editorRef.current?.focus(),
    switchMode,
    toggleFullscreen
  }), [applyFormat, switchMode, toggleFullscreen]);

  // Actualizar contenido cuando cambie el documento
  useEffect(() => {
    if (editorRef.current && document) {
      const currentContent = editorRef.current.innerHTML;
      if (currentContent !== document.content) {
        editorRef.current.innerHTML = document.content;
      }
    }
  }, [document]);

  // Sistema de gestión de líneas
  const lineManager = useLineManager(document?.content || '', editorRef as React.RefObject<HTMLElement>);
  
  // Referencias para sincronizar scroll
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const editorContainerRef = useRef<HTMLDivElement>(null);

  // Efecto para actualizar líneas cuando cambie el documento
  useEffect(() => {
    if (config.mode === 'code' && editorRef.current) {
      // The line manager will automatically update when content changes
      // No need to manually call refreshLines here
    }
  }, [document?.content, config.mode]);

  // Efecto para actualizar líneas cuando cambie la selección
  useEffect(() => {
    if (config.mode === 'code') {
      // The line manager will automatically update when content changes
      // Selection changes don't need to trigger line refreshes
    }
  }, [config.mode]);

  // Sincronizar scroll entre numeración y editor
  useEffect(() => {
    const editor = editorRef.current;
    const lineNumbers = lineNumbersRef.current;
    
    if (editor && lineNumbers) {
      const syncScroll = () => {
        lineNumbers.scrollTop = editor.scrollTop;
      };
      
      editor.addEventListener('scroll', syncScroll);
      return () => editor.removeEventListener('scroll', syncScroll);
    }
  }, [config.mode]);


  // Renderizar editor según el modo
  const renderEditor = () => {
    const baseClasses = `
      min-h-[500px] p-4 focus:outline-none
      bg-transparent
      ${config.showDistractionFree ? 'max-w-4xl mx-auto' : ''}
      ${config.showWideMargins ? 'px-12' : ''}
      ${config.showJustification ? 'text-justify' : ''}
      ${config.showLineNumbers ? 'font-mono' : ''}
    `;

    const proseClasses = config.mode === 'code' ? '' : `
      prose prose-sm max-w-none
      prose-headings:font-semibold
      prose-p:my-2
      prose-ul:my-2
      prose-ol:my-2
      prose-li:my-1
      prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic
      prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
      prose-pre:bg-muted prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
      prose-table:border-collapse prose-table:border prose-table:border-border
      prose-th:border prose-th:border-border prose-th:bg-muted prose-th:p-2
      prose-td:border prose-td:border-border prose-td:p-2
    `;

    if (config.mode === 'code') {
      return (
        <div className="relative h-full flex bg-background">
          {/* Numeración de líneas */}
          {config.showLineNumbers && (
            <div 
              ref={lineNumbersRef}
              className="flex-shrink-0 bg-muted/10 border-r border-border/20 text-right select-none overflow-hidden" 
              style={{ width: '50px' }}
            >
              <div 
                className="font-mono text-xs text-muted-foreground px-2 py-4"
                style={{
                  lineHeight: '1.4em',
                  fontSize: '13px',
                  fontFamily: 'Monaco, Consolas, "Courier New", monospace',
                  minHeight: '100%'
                }}
              >
                {lineManager.lines.map((line) => (
                  <div 
                    key={line.id} 
                    style={{ height: '1.4em', lineHeight: '1.4em' }}
                    className="hover:bg-muted/20 transition-colors cursor-pointer"
                    onClick={() => lineManager.setCursorPosition(line.number, 1)}
                    title={`Línea ${line.number}: ${line.content.substring(0, 50)}${line.content.length > 50 ? '...' : ''}`}
                  >
                    {line.number}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Contenedor del editor con líneas de fondo */}
          <div ref={editorContainerRef} className="flex-1 relative overflow-auto">
            {/* Líneas de código de fondo */}
            {config.showCodeLines && (
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: `repeating-linear-gradient(
                    transparent,
                    transparent calc(1.4em - 1px),
                    rgba(255, 255, 255, 0.08) calc(1.4em - 1px),
                    rgba(255, 255, 255, 0.08) 1.4em
                  )`,
                  lineHeight: '1.4em'
                }}
              />
            )}
            
            {/* Editor de código */}
            <div
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              className={`${baseClasses} ${className} relative z-10 min-h-full`}
              onInput={handleInput}
              onSelect={handleSelectionChange}
              style={{
                lineHeight: '1.4em',
                fontSize: '13px',
                fontFamily: 'Monaco, Consolas, "Courier New", monospace',
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                padding: '16px',
                outline: 'none',
                minHeight: '100%'
              }}
              data-placeholder="// Comienza a escribir tu código..."
            />
          </div>
        </div>
      );
    }

    return (
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        className={`${baseClasses} ${proseClasses} ${className}`}
        onInput={handleInput}
        onSelect={handleSelectionChange}
        style={{
          lineHeight: '1.6',
          fontSize: '14px',
          fontFamily: 'inherit'
        }}
        data-placeholder="Comienza a escribir tu documento..."
      />
    );
  };

  // Renderizar barra de herramientas específica del modo
  const renderModeToolbar = () => {
    const commonTools = (
      <>
        <Button
          variant="ghost"
          size="sm"
          onClick={onUndo}
          disabled={!canUndo}
          title="Deshacer (Ctrl+Z)"
          className="h-8 w-8 p-0 rounded-md glass hover:shadow-glass smooth-transition disabled:opacity-50"
        >
          <Undo className="h-3 w-3" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onRedo}
          disabled={!canRedo}
          title="Rehacer (Ctrl+Y)"
          className="h-8 w-8 p-0 rounded-md glass hover:shadow-glass smooth-transition disabled:opacity-50"
        >
          <Redo className="h-3 w-3" />
        </Button>
      </>
    );

    if (config.mode === 'text') {
      return (
        <>
          {commonTools}
          <div className="w-px h-6 bg-white/20 mx-2" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => (document as any)?.execCommand('bold')}
            title="Negrita (Ctrl+B)"
            className="h-8 w-8 p-0 rounded-md glass hover:shadow-glass smooth-transition"
          >
            <Bold className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => (document as any)?.execCommand('italic')}
            title="Cursiva (Ctrl+I)"
            className="h-8 w-8 p-0 rounded-md glass hover:shadow-glass smooth-transition"
          >
            <Italic className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => (document as any)?.execCommand('underline')}
            title="Subrayado (Ctrl+U)"
            className="h-8 w-8 p-0 rounded-md glass hover:shadow-glass smooth-transition"
          >
            <Underline className="h-3 w-3" />
          </Button>
          <div className="w-px h-6 bg-white/20 mx-2" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => (document as any)?.execCommand('justifyLeft')}
            title="Alinear izquierda"
            className="h-8 w-8 p-0 rounded-md glass hover:shadow-glass smooth-transition"
          >
            <AlignLeft className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => (document as any)?.execCommand('justifyCenter')}
            title="Centrar"
            className="h-8 w-8 p-0 rounded-md glass hover:shadow-glass smooth-transition"
          >
            <AlignCenter className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => (document as any)?.execCommand('justifyRight')}
            title="Alinear derecha"
            className="h-8 w-8 p-0 rounded-md glass hover:shadow-glass smooth-transition"
          >
            <AlignRight className="h-3 w-3" />
          </Button>
        </>
      );
    }

    if (config.mode === 'code') {
      return (
        <>
          {commonTools}
          <div className="w-px h-6 bg-white/20 mx-2" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setConfig(prev => ({ ...prev, showLineNumbers: !prev.showLineNumbers }))}
            title="Mostrar/Ocultar números de línea"
            className="h-8 w-8 p-0 rounded-md glass hover:shadow-glass smooth-transition"
          >
            <Columns className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setConfig(prev => ({ ...prev, showCodeLines: !prev.showCodeLines }))}
            title="Mostrar/Ocultar líneas de código"
            className="h-8 w-8 p-0 rounded-md glass hover:shadow-glass smooth-transition"
          >
            <Table className="h-3 w-3" />
          </Button>
        </>
      );
    }

    return commonTools;
  };

  if (!document) {
    return (
      <div className="flex-1 flex items-center justify-center bg-muted/30">
        <div className="text-center space-y-4 max-w-md">
          <FileText className="h-16 w-16 text-muted-foreground mx-auto" />
          <div>
            <h2 className="text-2xl font-semibold mb-2">Área de Trabajo</h2>
            <p className="text-muted-foreground mb-6">
              Selecciona un documento del dashboard para comenzar a trabajar
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex h-full ${config.fullscreen ? 'fixed inset-0 z-50 bg-background' : ''}`}>
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
          </div>

          {/* Contenido del panel */}
          <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">
            <div className="space-y-4">
              <h4 className="font-medium text-sm text-muted-foreground mb-3">Configuración del Tipo</h4>
              
              {/* Selector de modo */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Tipo de Área de Trabajo</label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(modeConfigs).map(([mode, _]) => (
                    <Button
                      key={mode}
                      variant={config.mode === mode ? "default" : "outline"}
                      size="sm"
                      onClick={() => switchMode(mode as WorkspaceMode)}
                      className="text-xs"
                    >
                      {mode === 'text' && <FileText className="h-3 w-3 mr-1" />}
                      {mode === 'code' && <Code className="h-3 w-3 mr-1" />}
                      {mode === 'text' && 'Escritura'}
                      {mode === 'code' && 'Código'}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Información de líneas para modo código */}
              {config.mode === 'code' && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Información de Líneas</label>
                  <div className="glass-card p-3 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Líneas totales:</span>
                      <span className="font-mono">{lineManager.lineCount}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Línea actual:</span>
                      <span className="font-mono">{lineManager.getCursorLine()}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Columna actual:</span>
                      <span className="font-mono">{lineManager.getCursorColumn()}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <span>Contenido de la línea:</span>
                      <div className="font-mono bg-muted/20 p-2 rounded mt-1 text-xs">
                        {lineManager.getLineContent(lineManager.getCursorLine()) || '(vacía)'}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Configuraciones específicas del modo */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Opciones</label>
                <div className="space-y-2">
                  {config.mode === 'text' && (
                    <>
                      <Button
                        variant={config.showDistractionFree ? "default" : "outline"}
                        size="sm"
                        onClick={() => setConfig(prev => ({ ...prev, showDistractionFree: !prev.showDistractionFree }))}
                        className="w-full justify-start text-xs"
                      >
                        <Eye className="h-3 w-3 mr-2" />
                        Sin distracciones
                      </Button>
                      <Button
                        variant={config.showWideMargins ? "default" : "outline"}
                        size="sm"
                        onClick={() => setConfig(prev => ({ ...prev, showWideMargins: !prev.showWideMargins }))}
                        className="w-full justify-start text-xs"
                      >
                        <Columns className="h-3 w-3 mr-2" />
                        Márgenes amplios
                      </Button>
                      <Button
                        variant={config.showJustification ? "default" : "outline"}
                        size="sm"
                        onClick={() => setConfig(prev => ({ ...prev, showJustification: !prev.showJustification }))}
                        className="w-full justify-start text-xs"
                      >
                        <AlignLeft className="h-3 w-3 mr-2" />
                        Justificación
                      </Button>
                    </>
                  )}
                  
                  {config.mode === 'code' && (
                    <>
                      <Button
                        variant={config.showLineNumbers ? "default" : "outline"}
                        size="sm"
                        onClick={() => setConfig(prev => ({ ...prev, showLineNumbers: !prev.showLineNumbers }))}
                        className="w-full justify-start text-xs"
                      >
                        <Columns className="h-3 w-3 mr-2" />
                        Números de línea
                      </Button>
                      <Button
                        variant={config.showCodeLines ? "default" : "outline"}
                        size="sm"
                        onClick={() => setConfig(prev => ({ ...prev, showCodeLines: !prev.showCodeLines }))}
                        className="w-full justify-start text-xs"
                      >
                        <Table className="h-3 w-3 mr-2" />
                        Líneas de código
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
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
                value={document.title}
                onChange={(e) => onTitleChange(e.target.value)}
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
                <Badge variant="outline" className="text-xs">
                  {config.mode === 'text' && 'Escritura'}
                  {config.mode === 'code' && 'Código'}
                </Badge>
              </div>
            </div>

            {/* Acciones principales */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowModeSelector(!showModeSelector)}
                className="h-10 px-3 rounded-lg glass hover:shadow-glass smooth-transition"
              >
                <Layout className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Tipo</span>
              </Button>

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
                onClick={toggleFullscreen}
                className="h-10 w-10 p-0 rounded-lg glass hover:shadow-glass smooth-transition"
                title="Pantalla completa"
              >
                {config.fullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Barra de herramientas específica del modo */}
          <div className="border-t border-white/10 px-4 py-2">
            <div className="flex items-center gap-1 overflow-x-auto">
              {renderModeToolbar()}
            </div>
          </div>
        </div>

        {/* Área de edición */}
        <div className="flex-1 overflow-hidden p-6">
          <Card className="h-full glass-card rounded-2xl border-0 shadow-glass-lg">
            <CardContent className="p-0 h-full">
              <div className="h-full w-full">
                {renderEditor()}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Selector de modo */}
      {showModeSelector && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="glass-card rounded-2xl border-0 shadow-glass-lg w-full max-w-2xl">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                    <Layout className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Seleccionar Tipo de Área de Trabajo</h2>
                    <p className="text-sm text-muted-foreground">Elige el tipo que mejor se adapte a tu contenido</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowModeSelector(false)}
                  className="h-10 w-10 p-0 rounded-xl glass hover:shadow-glass"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(modeConfigs).map(([mode, config]) => (
                  <Card
                    key={mode}
                    className={`glass-card rounded-xl border-0 shadow-glass smooth-transition hover:shadow-glass-lg hover:scale-105 cursor-pointer ${
                      config.mode === mode ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => switchMode(mode as WorkspaceMode)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                          {mode === 'text' && <FileText className="h-5 w-5 text-primary" />}
                          {mode === 'code' && <Code className="h-5 w-5 text-primary" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm mb-1">
                            {mode === 'text' && 'Escritura Vertical'}
                            {mode === 'code' && 'Código Horizontal'}
                          </h3>
                          <p className="text-xs text-muted-foreground mb-2">
                            {mode === 'text' && 'Orientación vertical, modo sin distracciones, márgenes amplios'}
                            {mode === 'code' && 'Orientación horizontal, numeración de líneas, fuente monoespaciada'}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

FlexibleWorkspace.displayName = 'FlexibleWorkspace';
