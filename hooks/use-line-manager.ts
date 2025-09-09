import { useState, useEffect, useCallback, useRef } from 'react';

export interface Line {
  id: string;
  number: number;
  content: string;
  startOffset: number;
  endOffset: number;
  length: number;
}

export interface LineManager {
  lines: Line[];
  lineCount: number;
  getLineByNumber: (lineNumber: number) => Line | undefined;
  getLineByOffset: (offset: number) => Line | undefined;
  getLineContent: (lineNumber: number) => string;
  insertLine: (lineNumber: number, content: string) => void;
  deleteLine: (lineNumber: number) => void;
  updateLine: (lineNumber: number, content: string) => void;
  splitLine: (lineNumber: number, splitOffset: number) => void;
  mergeLines: (lineNumber: number) => void;
  getCursorLine: () => number;
  getCursorColumn: () => number;
  setCursorPosition: (lineNumber: number, column: number) => void;
  refreshLines: () => void;
}

export function useLineManager(content: string, editorRef: React.RefObject<HTMLElement>): LineManager {
  const [lines, setLines] = useState<Line[]>([]);
  const [lineCount, setLineCount] = useState(0);

  // Función para parsear el contenido y crear las líneas
  const parseContentToLines = useCallback((text: string): Line[] => {
    if (!text || text.trim() === '') {
      return [{ id: '1', number: 1, content: '', startOffset: 0, endOffset: 0, length: 0 }];
    }
    
    // Limpiar el texto de HTML tags si es necesario
    const cleanText = text.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
    const lineStrings = cleanText.split('\n');
    const parsedLines: Line[] = [];
    let currentOffset = 0;

    lineStrings.forEach((lineContent, index) => {
      const lineNumber = index + 1;
      const startOffset = currentOffset;
      const endOffset = currentOffset + lineContent.length;
      
      parsedLines.push({
        id: `line-${lineNumber}`,
        number: lineNumber,
        content: lineContent,
        startOffset,
        endOffset,
        length: lineContent.length
      });
      
      currentOffset = endOffset + 1; // +1 for the newline character
    });

    return parsedLines;
  }, []);

  // Función para actualizar las líneas
  const refreshLines = useCallback(() => {
    if (editorRef.current) {
      const textContent = editorRef.current.textContent || '';
      const newLines = parseContentToLines(textContent);
      setLines(newLines);
      setLineCount(newLines.length);
    }
  }, [parseContentToLines, editorRef]);

  // Efecto para actualizar líneas cuando cambie el contenido
  useEffect(() => {
    if (editorRef.current) {
      const textContent = editorRef.current.textContent || '';
      const newLines = parseContentToLines(textContent);
      setLines(newLines);
      setLineCount(newLines.length);
    }
  }, [content, parseContentToLines, editorRef]);

  // Función para obtener una línea por número
  const getLineByNumber = useCallback((lineNumber: number): Line | undefined => {
    return lines.find(line => line.number === lineNumber);
  }, [lines]);

  // Función para obtener una línea por offset
  const getLineByOffset = useCallback((offset: number): Line | undefined => {
    return lines.find(line => offset >= line.startOffset && offset <= line.endOffset);
  }, [lines]);

  // Función para obtener el contenido de una línea
  const getLineContent = useCallback((lineNumber: number): string => {
    const line = getLineByNumber(lineNumber);
    return line ? line.content : '';
  }, [getLineByNumber]);

  // Función para insertar una línea
  const insertLine = useCallback((lineNumber: number, content: string) => {
    if (editorRef.current) {
      const textContent = editorRef.current.textContent || '';
      const lineStrings = textContent.split('\n');
      
      if (lineNumber > lineStrings.length) {
        lineStrings.push(content);
      } else {
        lineStrings.splice(lineNumber - 1, 0, content);
      }
      
      const newContent = lineStrings.join('\n');
      editorRef.current.textContent = newContent;
      // Trigger a content change event to update lines
      const event = new Event('input', { bubbles: true });
      editorRef.current.dispatchEvent(event);
    }
  }, [editorRef]);

  // Función para eliminar una línea
  const deleteLine = useCallback((lineNumber: number) => {
    if (editorRef.current && lineCount > 1) {
      const textContent = editorRef.current.textContent || '';
      const lineStrings = textContent.split('\n');
      
      if (lineNumber >= 1 && lineNumber <= lineStrings.length) {
        lineStrings.splice(lineNumber - 1, 1);
        const newContent = lineStrings.join('\n');
        editorRef.current.textContent = newContent;
        // Trigger a content change event to update lines
        const event = new Event('input', { bubbles: true });
        editorRef.current.dispatchEvent(event);
      }
    }
  }, [editorRef, lineCount]);

  // Función para actualizar una línea
  const updateLine = useCallback((lineNumber: number, content: string) => {
    if (editorRef.current) {
      const textContent = editorRef.current.textContent || '';
      const lineStrings = textContent.split('\n');
      
      if (lineNumber >= 1 && lineNumber <= lineStrings.length) {
        lineStrings[lineNumber - 1] = content;
        const newContent = lineStrings.join('\n');
        editorRef.current.textContent = newContent;
        // Trigger a content change event to update lines
        const event = new Event('input', { bubbles: true });
        editorRef.current.dispatchEvent(event);
      }
    }
  }, [editorRef]);

  // Función para dividir una línea
  const splitLine = useCallback((lineNumber: number, splitOffset: number) => {
    if (editorRef.current) {
      const textContent = editorRef.current.textContent || '';
      const lineStrings = textContent.split('\n');
      
      if (lineNumber >= 1 && lineNumber <= lineStrings.length) {
        const lineContent = lineStrings[lineNumber - 1];
        const beforeSplit = lineContent.substring(0, splitOffset);
        const afterSplit = lineContent.substring(splitOffset);
        
        lineStrings[lineNumber - 1] = beforeSplit;
        lineStrings.splice(lineNumber, 0, afterSplit);
        
        const newContent = lineStrings.join('\n');
        editorRef.current.textContent = newContent;
        // Trigger a content change event to update lines
        const event = new Event('input', { bubbles: true });
        editorRef.current.dispatchEvent(event);
      }
    }
  }, [editorRef]);

  // Función para fusionar líneas
  const mergeLines = useCallback((lineNumber: number) => {
    if (editorRef.current && lineNumber < lineCount) {
      const textContent = editorRef.current.textContent || '';
      const lineStrings = textContent.split('\n');
      
      if (lineNumber >= 1 && lineNumber < lineStrings.length) {
        const currentLine = lineStrings[lineNumber - 1];
        const nextLine = lineStrings[lineNumber];
        lineStrings[lineNumber - 1] = currentLine + nextLine;
        lineStrings.splice(lineNumber, 1);
        
        const newContent = lineStrings.join('\n');
        editorRef.current.textContent = newContent;
        // Trigger a content change event to update lines
        const event = new Event('input', { bubbles: true });
        editorRef.current.dispatchEvent(event);
      }
    }
  }, [editorRef, lineCount]);

  // Función para obtener la línea del cursor
  const getCursorLine = useCallback((): number => {
    if (editorRef.current) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const textContent = editorRef.current.textContent || '';
        const textBeforeCursor = textContent.substring(0, range.startOffset);
        const linesBeforeCursor = textBeforeCursor.split('\n');
        return linesBeforeCursor.length;
      }
    }
    return 1;
  }, [editorRef]);

  // Función para obtener la columna del cursor
  const getCursorColumn = useCallback((): number => {
    if (editorRef.current) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const textContent = editorRef.current.textContent || '';
        const textBeforeCursor = textContent.substring(0, range.startOffset);
        const linesBeforeCursor = textBeforeCursor.split('\n');
        const currentLine = linesBeforeCursor[linesBeforeCursor.length - 1];
        return currentLine.length + 1;
      }
    }
    return 1;
  }, [editorRef]);

  // Función para establecer la posición del cursor
  const setCursorPosition = useCallback((lineNumber: number, column: number) => {
    if (editorRef.current) {
      const textContent = editorRef.current.textContent || '';
      const lineStrings = textContent.split('\n');
      
      if (lineNumber >= 1 && lineNumber <= lineStrings.length) {
        let offset = 0;
        for (let i = 0; i < lineNumber - 1; i++) {
          offset += lineStrings[i].length + 1; // +1 for newline
        }
        offset += Math.min(column - 1, lineStrings[lineNumber - 1].length);
        
        const range = document.createRange();
        const textNode = editorRef.current.firstChild;
        if (textNode) {
          range.setStart(textNode, offset);
          range.setEnd(textNode, offset);
          const selection = window.getSelection();
          if (selection) {
            selection.removeAllRanges();
            selection.addRange(range);
          }
        }
      }
    }
  }, [editorRef]);

  return {
    lines,
    lineCount,
    getLineByNumber,
    getLineByOffset,
    getLineContent,
    insertLine,
    deleteLine,
    updateLine,
    splitLine,
    mergeLines,
    getCursorLine,
    getCursorColumn,
    setCursorPosition,
    refreshLines
  };
}