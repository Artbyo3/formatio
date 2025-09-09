"use client";

import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Terminal,
  Play,
  Square,
  RotateCcw,
  Copy,
  Download,
  Upload,
  Settings,
  Maximize,
  Minimize
} from "lucide-react";

export interface TerminalEditorRef {
  executeCommand: (command: string) => void;
  clear: () => void;
  focus: () => void;
  getHistory: () => string[];
  addToHistory: (command: string) => void;
}

interface TerminalEditorProps {
  onCommandExecute?: (command: string) => void;
  darkMode?: boolean;
  fullscreen?: boolean;
  className?: string;
}

interface TerminalLine {
  id: string;
  type: 'command' | 'output' | 'error' | 'info';
  content: string;
  timestamp: Date;
}

export const TerminalEditor = forwardRef<TerminalEditorRef, TerminalEditorProps>(({
  onCommandExecute,
  darkMode = true,
  fullscreen = false,
  className = ""
}, ref) => {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: '1',
      type: 'info',
      content: 'Terminal iniciado. Escribe comandos y presiona Enter para ejecutar.',
      timestamp: new Date()
    }
  ]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isExecuting, setIsExecuting] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll al final
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  // Agregar línea al terminal
  const addLine = (type: TerminalLine['type'], content: string) => {
    const newLine: TerminalLine = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date()
    };
    setLines(prev => [...prev, newLine]);
  };

  // Ejecutar comando
  const executeCommand = (command: string) => {
    if (!command.trim()) return;

    // Agregar comando al historial
    addLine('command', `$ ${command}`);
    setCommandHistory(prev => [...prev, command]);
    setHistoryIndex(-1);

    // Simular ejecución del comando
    setIsExecuting(true);
    
    // Simular delay de ejecución
    setTimeout(() => {
      const result = simulateCommand(command);
      addLine(result.type, result.content);
      setIsExecuting(false);
      
      if (onCommandExecute) {
        onCommandExecute(command);
      }
    }, 500);
  };

  // Simular comandos del terminal
  const simulateCommand = (command: string): { type: TerminalLine['type'], content: string } => {
    const cmd = command.trim().toLowerCase();
    
    if (cmd === 'clear') {
      setLines([]);
      return { type: 'info', content: 'Terminal limpiado.' };
    }
    
    if (cmd === 'help') {
      return {
        type: 'output',
        content: `Comandos disponibles:
- help: Muestra esta ayuda
- clear: Limpia la pantalla
- date: Muestra la fecha actual
- time: Muestra la hora actual
- echo <texto>: Repite el texto
- ls: Lista archivos (simulado)
- pwd: Muestra el directorio actual
- whoami: Muestra el usuario actual
- history: Muestra el historial de comandos`
      };
    }
    
    if (cmd === 'date') {
      return { type: 'output', content: new Date().toLocaleDateString() };
    }
    
    if (cmd === 'time') {
      return { type: 'output', content: new Date().toLocaleTimeString() };
    }
    
    if (cmd.startsWith('echo ')) {
      return { type: 'output', content: command.substring(5) };
    }
    
    if (cmd === 'ls') {
      return {
        type: 'output',
        content: `archivo1.txt  archivo2.txt  directorio1/  directorio2/
total: 4 archivos, 2 directorios`
      };
    }
    
    if (cmd === 'pwd') {
      return { type: 'output', content: '/home/usuario/documentos' };
    }
    
    if (cmd === 'whoami') {
      return { type: 'output', content: 'usuario' };
    }
    
    if (cmd === 'history') {
      return {
        type: 'output',
        content: commandHistory.map((cmd, index) => `${index + 1}  ${cmd}`).join('\n')
      };
    }
    
    // Comando no reconocido
    return {
      type: 'error',
      content: `Comando no encontrado: ${command}. Escribe 'help' para ver los comandos disponibles.`
    };
  };

  // Manejar envío de comando
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentCommand.trim() && !isExecuting) {
      executeCommand(currentCommand);
      setCurrentCommand('');
    }
  };

  // Manejar teclas especiales
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentCommand('');
        } else {
          setHistoryIndex(newIndex);
          setCurrentCommand(commandHistory[newIndex]);
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Auto-completar con comandos comunes
      const commonCommands = ['help', 'clear', 'date', 'time', 'ls', 'pwd', 'whoami', 'history'];
      const matches = commonCommands.filter(cmd => cmd.startsWith(currentCommand.toLowerCase()));
      if (matches.length === 1) {
        setCurrentCommand(matches[0]);
      }
    }
  };

  // Limpiar terminal
  const clear = () => {
    setLines([]);
    addLine('info', 'Terminal limpiado.');
  };

  // Copiar contenido del terminal
  const copyTerminalContent = () => {
    const content = lines.map(line => line.content).join('\n');
    navigator.clipboard.writeText(content);
  };

  // Exponer funciones para uso externo
  useImperativeHandle(ref, () => ({
    executeCommand,
    clear,
    focus: () => inputRef.current?.focus(),
    getHistory: () => commandHistory,
    addToHistory: (command: string) => setCommandHistory(prev => [...prev, command])
  }), [commandHistory, executeCommand, clear]);

  return (
    <div className={`w-full h-full flex flex-col ${darkMode ? 'bg-gray-900 text-green-400' : 'bg-transparent'} ${className}`}>
      {/* Header del terminal */}
      <div className="flex items-center justify-between p-3 border-b border-white/10 glass-sidebar">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4" />
          <span className="text-sm font-medium">Terminal</span>
          {isExecuting && (
            <div className="flex items-center gap-1 text-xs text-yellow-400">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              Ejecutando...
            </div>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={clear}
            className="h-6 w-6 p-0 text-green-400 hover:bg-green-400/20"
            title="Limpiar terminal"
          >
            <RotateCcw className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyTerminalContent}
            className="h-6 w-6 p-0 text-green-400 hover:bg-green-400/20"
            title="Copiar contenido"
          >
            <Copy className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Contenido del terminal */}
      <div
        ref={terminalRef}
        className="flex-1 overflow-y-auto p-4 font-mono text-sm scrollbar-thin"
        style={{ fontFamily: 'Monaco, Consolas, "Courier New", monospace' }}
      >
        {lines.map((line) => (
          <div
            key={line.id}
            className={`mb-1 ${
              line.type === 'command' ? 'text-green-400 font-semibold' :
              line.type === 'error' ? 'text-red-400' :
              line.type === 'info' ? 'text-blue-400' :
              'text-gray-300'
            }`}
          >
            {line.content}
          </div>
        ))}
      </div>

      {/* Input del terminal */}
      <div className="border-t border-white/10 p-3">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <span className="text-green-400 font-semibold">$</span>
          <Input
            ref={inputRef}
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe un comando..."
            className={`flex-1 border-0 shadow-none focus-visible:ring-0 bg-transparent ${
              darkMode ? 'text-green-400 placeholder:text-green-400/60' : 'text-gray-900 placeholder:text-gray-500'
            }`}
            disabled={isExecuting}
          />
          <Button
            type="submit"
            size="sm"
            disabled={!currentCommand.trim() || isExecuting}
            className="h-8 px-3 bg-green-600 hover:bg-green-700 text-white"
          >
            <Play className="h-3 w-3" />
          </Button>
        </form>
      </div>

      {/* Información del terminal */}
      <div className="p-2 border-t border-white/10 glass-sidebar text-xs text-gray-400">
        <div className="flex items-center justify-between">
          <span>
            {lines.length} líneas • {commandHistory.length} comandos en historial
          </span>
          <span>
            Usa ↑↓ para navegar el historial • Tab para autocompletar
          </span>
        </div>
      </div>
    </div>
  );
});

TerminalEditor.displayName = 'TerminalEditor';
