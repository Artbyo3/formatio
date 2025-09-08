"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Quote,
  Code,
  Link,
  Image,
  Table,
  Undo,
  Redo,
  Save,
  FileText,
  Search,
  Replace,
  Download,
  Upload,
  Type,
  Palette,
  MoreHorizontal,
  Plus
} from "lucide-react";

interface EditorToolbarProps {
  onFormat: (format: string, value?: any) => void;
  onSave: () => void;
  onExport: (format: 'txt' | 'pdf' | 'docx') => void;
  onImport: () => void;
  onSearch: () => void;
  onReplace: () => void;
  onInsert: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
}

export function EditorToolbar({
  onFormat,
  onSave,
  onExport,
  onImport,
  onSearch,
  onReplace,
  onInsert,
  canUndo,
  canRedo,
  onUndo,
  onRedo
}: EditorToolbarProps) {
  const formatButtons = [
    {
      icon: Bold,
      label: "Negrita",
      format: "bold",
      shortcut: "Ctrl+B"
    },
    {
      icon: Italic,
      label: "Cursiva", 
      format: "italic",
      shortcut: "Ctrl+I"
    },
    {
      icon: Underline,
      label: "Subrayado",
      format: "underline",
      shortcut: "Ctrl+U"
    },
    {
      icon: Strikethrough,
      label: "Tachado",
      format: "strikethrough"
    }
  ];

  const alignmentButtons = [
    {
      icon: AlignLeft,
      label: "Izquierda",
      format: "justifyLeft"
    },
    {
      icon: AlignCenter,
      label: "Centro",
      format: "justifyCenter"
    },
    {
      icon: AlignRight,
      label: "Derecha",
      format: "justifyRight"
    },
    {
      icon: AlignJustify,
      label: "Justificar",
      format: "justifyFull"
    }
  ];

  const listButtons = [
    {
      icon: List,
      label: "Lista con viñetas",
      format: "insertUnorderedList"
    },
    {
      icon: ListOrdered,
      label: "Lista numerada",
      format: "insertOrderedList"
    }
  ];

  const specialButtons = [
    {
      icon: Quote,
      label: "Cita",
      format: "formatBlock",
      value: "blockquote"
    },
    {
      icon: Code,
      label: "Código",
      format: "formatBlock",
      value: "pre"
    }
  ];

  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="flex items-center gap-1 p-2 overflow-x-auto">
        {/* Archivo */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={onSave}>
            <Save className="h-4 w-4 mr-1" />
            Guardar
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <FileText className="h-4 w-4 mr-1" />
                Archivo
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={onImport}>
                <Upload className="h-4 w-4 mr-2" />
                Importar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onExport('txt')}>
                <Download className="h-4 w-4 mr-2" />
                Exportar como TXT
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onExport('pdf')}>
                <Download className="h-4 w-4 mr-2" />
                Exportar como PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onExport('docx')}>
                <Download className="h-4 w-4 mr-2" />
                Exportar como DOCX
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Deshacer/Rehacer */}
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
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Formato de texto */}
        <div className="flex items-center gap-1">
          {formatButtons.map((button) => (
            <Button
              key={button.format}
              variant="ghost"
              size="sm"
              onClick={() => onFormat(button.format)}
              title={`${button.label} (${button.shortcut || ''})`}
            >
              <button.icon className="h-4 w-4" />
            </Button>
          ))}
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Alineación */}
        <div className="flex items-center gap-1">
          {alignmentButtons.map((button) => (
            <Button
              key={button.format}
              variant="ghost"
              size="sm"
              onClick={() => onFormat(button.format)}
              title={button.label}
            >
              <button.icon className="h-4 w-4" />
            </Button>
          ))}
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Listas */}
        <div className="flex items-center gap-1">
          {listButtons.map((button) => (
            <Button
              key={button.format}
              variant="ghost"
              size="sm"
              onClick={() => onFormat(button.format)}
              title={button.label}
            >
              <button.icon className="h-4 w-4" />
            </Button>
          ))}
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Elementos especiales */}
        <div className="flex items-center gap-1">
          {specialButtons.map((button) => (
            <Button
              key={button.format}
              variant="ghost"
              size="sm"
              onClick={() => onFormat(button.format, button.value)}
              title={button.label}
            >
              <button.icon className="h-4 w-4" />
            </Button>
          ))}
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Insertar elementos */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={onInsert}
            title="Insertar elementos"
          >
            <Plus className="h-4 w-4 mr-1" />
            Insertar
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Búsqueda y reemplazo */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={onSearch}
            title="Buscar (Ctrl+F)"
          >
            <Search className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onReplace}
            title="Reemplazar (Ctrl+H)"
          >
            <Replace className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Más opciones */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onFormat('fontSize', '12px')}>
              <Type className="h-4 w-4 mr-2" />
              Tamaño de fuente
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onFormat('foreColor', '#000000')}>
              <Palette className="h-4 w-4 mr-2" />
              Color de texto
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onFormat('backColor', '#ffff00')}>
              <Palette className="h-4 w-4 mr-2" />
              Color de fondo
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
