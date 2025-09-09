"use client";

import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Table, 
  Plus, 
  Minus, 
  Copy, 
  Clipboard, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  ArrowLeft, 
  ArrowRight,
  Grid,
  AlignLeft,
  AlignCenter,
  AlignRight,
  SortAsc,
  SortDesc
} from "lucide-react";

export interface DataTableEditorRef {
  getData: () => string[][];
  setData: (data: string[][]) => void;
  addRow: () => void;
  addColumn: () => void;
  deleteRow: (index: number) => void;
  deleteColumn: (index: number) => void;
  focus: () => void;
}

interface DataTableEditorProps {
  data?: string[][];
  onDataChange: (data: string[][]) => void;
  showGrid?: boolean;
  className?: string;
}

export const DataTableEditor = forwardRef<DataTableEditorRef, DataTableEditorProps>(({
  data = [['', '', ''], ['', '', ''], ['', '', '']],
  onDataChange,
  showGrid = true,
  className = ""
}, ref) => {
  const [tableData, setTableData] = useState<string[][]>(data);
  const [selectedCell, setSelectedCell] = useState<{row: number, col: number} | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Actualizar datos cuando cambie la prop
  useEffect(() => {
    setTableData(data);
  }, [data]);

  // Manejar cambio de datos
  const handleDataChange = (newData: string[][]) => {
    setTableData(newData);
    onDataChange(newData);
  };

  // Agregar fila
  const addRow = () => {
    const newRow = new Array(tableData[0]?.length || 1).fill('');
    const newData = [...tableData, newRow];
    handleDataChange(newData);
  };

  // Agregar columna
  const addColumn = () => {
    const newData = tableData.map(row => [...row, '']);
    handleDataChange(newData);
  };

  // Eliminar fila
  const deleteRow = (index: number) => {
    if (tableData.length > 1) {
      const newData = tableData.filter((_, i) => i !== index);
      handleDataChange(newData);
    }
  };

  // Eliminar columna
  const deleteColumn = (index: number) => {
    if (tableData[0]?.length > 1) {
      const newData = tableData.map(row => row.filter((_, i) => i !== index));
      handleDataChange(newData);
    }
  };

  // Manejar clic en celda
  const handleCellClick = (row: number, col: number) => {
    setSelectedCell({ row, col });
    setEditValue(tableData[row][col] || '');
    setIsEditing(true);
  };

  // Manejar doble clic para editar
  const handleCellDoubleClick = (row: number, col: number) => {
    handleCellClick(row, col);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  // Manejar cambio de valor
  const handleValueChange = (value: string) => {
    setEditValue(value);
  };

  // Guardar cambios
  const saveChanges = () => {
    if (selectedCell) {
      const newData = [...tableData];
      newData[selectedCell.row][selectedCell.col] = editValue;
      handleDataChange(newData);
    }
    setIsEditing(false);
    setSelectedCell(null);
  };

  // Cancelar edición
  const cancelEdit = () => {
    setIsEditing(false);
    setSelectedCell(null);
  };

  // Manejar teclas
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveChanges();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      cancelEdit();
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (selectedCell) {
        const { row, col } = selectedCell;
        const nextCol = e.shiftKey ? col - 1 : col + 1;
        const nextRow = e.shiftKey ? (nextCol < 0 ? row - 1 : row) : (nextCol >= tableData[0].length ? row + 1 : row);
        const finalCol = e.shiftKey ? (nextCol < 0 ? tableData[0].length - 1 : nextCol) : (nextCol >= tableData[0].length ? 0 : nextCol);
        
        if (nextRow >= 0 && nextRow < tableData.length) {
          handleCellClick(nextRow, finalCol);
        }
      }
    }
  };

  // Copiar fila
  const copyRow = (index: number) => {
    const rowData = tableData[index].join('\t');
    navigator.clipboard.writeText(rowData);
  };

  // Pegar fila
  const pasteRow = async (index: number) => {
    try {
      const text = await navigator.clipboard.readText();
      const newRow = text.split('\t');
      const newData = [...tableData];
      newData[index] = newRow;
      handleDataChange(newData);
    } catch (err) {
      console.error('Error al pegar:', err);
    }
  };

  // Exponer funciones para uso externo
  useImperativeHandle(ref, () => ({
    getData: () => tableData,
    setData: (data: string[][]) => handleDataChange(data),
    addRow,
    addColumn,
    deleteRow,
    deleteColumn,
    focus: () => inputRef.current?.focus()
  }), [tableData, addRow, addColumn, deleteRow, deleteColumn, handleDataChange]);

  return (
    <div className={`w-full h-full ${className}`}>
      {/* Barra de herramientas */}
      <div className="flex items-center gap-2 p-4 border-b border-white/10 glass-sidebar">
        <Button
          variant="ghost"
          size="sm"
          onClick={addRow}
          className="h-8 px-3 rounded-lg glass hover:shadow-glass"
        >
          <Plus className="h-4 w-4 mr-1" />
          Fila
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={addColumn}
          className="h-8 px-3 rounded-lg glass hover:shadow-glass"
        >
          <Plus className="h-4 w-4 mr-1" />
          Columna
        </Button>
        <div className="w-px h-6 bg-white/20 mx-2" />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => selectedCell && deleteRow(selectedCell.row)}
          disabled={!selectedCell || tableData.length <= 1}
          className="h-8 px-3 rounded-lg glass hover:shadow-glass disabled:opacity-50"
        >
          <Minus className="h-4 w-4 mr-1" />
          Eliminar Fila
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => selectedCell && deleteColumn(selectedCell.col)}
          disabled={!selectedCell || tableData[0].length <= 1}
          className="h-8 px-3 rounded-lg glass hover:shadow-glass disabled:opacity-50"
        >
          <Minus className="h-4 w-4 mr-1" />
          Eliminar Columna
        </Button>
        <div className="w-px h-6 bg-white/20 mx-2" />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => selectedCell && copyRow(selectedCell.row)}
          disabled={!selectedCell}
          className="h-8 px-3 rounded-lg glass hover:shadow-glass disabled:opacity-50"
        >
          <Copy className="h-4 w-4 mr-1" />
          Copiar Fila
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => selectedCell && pasteRow(selectedCell.row)}
          disabled={!selectedCell}
          className="h-8 px-3 rounded-lg glass hover:shadow-glass disabled:opacity-50"
        >
          <Clipboard className="h-4 w-4 mr-1" />
          Pegar Fila
        </Button>
      </div>

      {/* Tabla */}
      <div className="flex-1 overflow-auto p-4 scrollbar-thin">
        <div className="inline-block min-w-full">
          <table className={`w-full ${showGrid ? 'border-collapse border border-white/20' : 'border-collapse'}`}>
            <thead>
              <tr>
                {tableData[0]?.map((_, colIndex) => (
                  <th
                    key={colIndex}
                    className={`p-2 text-left font-medium bg-muted/30 ${
                      showGrid ? 'border border-white/20' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>Columna {colIndex + 1}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteColumn(colIndex)}
                        disabled={tableData[0].length <= 1}
                        className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, rowIndex) => (
                <tr key={rowIndex} className="group hover:bg-muted/20">
                  {row.map((cell, colIndex) => (
                    <td
                      key={`${rowIndex}-${colIndex}`}
                      className={`p-2 ${
                        showGrid ? 'border border-white/20' : ''
                      } ${
                        selectedCell?.row === rowIndex && selectedCell?.col === colIndex
                          ? 'bg-primary/20 ring-2 ring-primary'
                          : ''
                      }`}
                      onClick={() => handleCellClick(rowIndex, colIndex)}
                      onDoubleClick={() => handleCellDoubleClick(rowIndex, colIndex)}
                    >
                      {isEditing && selectedCell?.row === rowIndex && selectedCell?.col === colIndex ? (
                        <Input
                          ref={inputRef}
                          value={editValue}
                          onChange={(e) => handleValueChange(e.target.value)}
                          onBlur={saveChanges}
                          onKeyDown={handleKeyDown}
                          className="w-full h-8 text-sm border-0 shadow-none focus-visible:ring-0 p-1"
                          autoFocus
                        />
                      ) : (
                        <div className="min-h-[32px] flex items-center text-sm">
                          {cell || <span className="text-muted-foreground italic">Vacío</span>}
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Información de la tabla */}
      <div className="p-4 border-t border-white/10 glass-sidebar text-sm text-muted-foreground">
        <div className="flex items-center justify-between">
          <span>
            {tableData.length} filas × {tableData[0]?.length || 0} columnas
          </span>
          {selectedCell && (
            <span>
              Celda: {selectedCell.row + 1}, {selectedCell.col + 1}
            </span>
          )}
        </div>
      </div>
    </div>
  );
});

DataTableEditor.displayName = 'DataTableEditor';
