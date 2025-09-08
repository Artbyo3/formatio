"use client";

import { useRef, useEffect, useState, forwardRef, useImperativeHandle, useCallback } from "react";
import { Document } from "@/lib/document-manager";

interface RichTextEditorProps {
  document: Document | null;
  onContentChange: (content: string) => void;
  onSelectionChange: (start: number, end: number) => void;
  className?: string;
}

export interface RichTextEditorRef {
  applyFormat: (command: string, value?: string) => void;
  focus: () => void;
}

export const RichTextEditor = forwardRef<RichTextEditorRef, RichTextEditorProps>(({
  document,
  onContentChange,
  onSelectionChange,
  className = ""
}, ref) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isComposing, setIsComposing] = useState(false);

  // Actualizar contenido cuando cambie el documento
  useEffect(() => {
    if (editorRef.current && document) {
      const currentContent = editorRef.current.innerHTML;
      if (currentContent !== document.content) {
        editorRef.current.innerHTML = document.content;
      }
    }
  }, [document]);

  // Manejar cambios en el contenido
  const handleInput = useCallback(() => {
    if (editorRef.current && !isComposing) {
      const content = editorRef.current.innerHTML;
      onContentChange(content);
    }
  }, [isComposing, onContentChange]);

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

  // Manejar atajos de teclado
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Ctrl+S para guardar
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      // El guardado se maneja en el componente padre
    }

    // Ctrl+N para nuevo documento
    if (e.ctrlKey && e.key === 'n') {
      e.preventDefault();
      // Se maneja en el componente padre
    }

    // Ctrl+F para buscar
    if (e.ctrlKey && e.key === 'f') {
      e.preventDefault();
      // Se maneja en el componente padre
    }

    // Ctrl+H para reemplazar
    if (e.ctrlKey && e.key === 'h') {
      e.preventDefault();
      // Se maneja en el componente padre
    }
  };

  // Manejar composición de texto (para idiomas como japonés)
  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = () => {
    setIsComposing(false);
    handleInput();
  };

  // Aplicar formato
  const applyFormat = useCallback((command: string, value?: string) => {
    if (editorRef.current && typeof window !== 'undefined' && window.document) {
      editorRef.current.focus();
      window.document.execCommand(command, false, value);
      handleInput();
    }
  }, [handleInput]);

  // Exponer funciones para uso externo
  useImperativeHandle(ref, () => ({
    applyFormat,
    focus: () => editorRef.current?.focus()
  }), [applyFormat]);

  return (
    <div
      ref={editorRef}
      contentEditable
      suppressContentEditableWarning
      className={`
        min-h-[500px] p-4 focus:outline-none
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
        ${className}
      `}
      onInput={handleInput}
      onSelect={handleSelectionChange}
      onKeyDown={handleKeyDown}
      onCompositionStart={handleCompositionStart}
      onCompositionEnd={handleCompositionEnd}
      style={{
        lineHeight: '1.6',
        fontSize: '14px'
      }}
      data-placeholder="Comienza a escribir tu documento..."
    />
  );
});

RichTextEditor.displayName = 'RichTextEditor';
