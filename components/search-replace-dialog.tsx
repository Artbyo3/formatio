"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Replace, 
  ArrowUp, 
  ArrowDown, 
  X,
  CaseSensitive,
  WholeWord
} from "lucide-react";

interface SearchReplaceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string, options: SearchOptions) => void;
  onReplace: (query: string, replacement: string, options: SearchOptions) => void;
  onReplaceAll: (query: string, replacement: string, options: SearchOptions) => void;
  currentMatch?: number;
  totalMatches?: number;
}

interface SearchOptions {
  caseSensitive: boolean;
  wholeWord: boolean;
  useRegex: boolean;
}

export function SearchReplaceDialog({
  isOpen,
  onClose,
  onSearch,
  onReplace,
  onReplaceAll,
  currentMatch = 0,
  totalMatches = 0
}: SearchReplaceDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [replaceQuery, setReplaceQuery] = useState("");
  const [options, setOptions] = useState<SearchOptions>({
    caseSensitive: false,
    wholeWord: false,
    useRegex: false
  });
  const [isReplaceMode, setIsReplaceMode] = useState(false);

  // Buscar cuando cambie la consulta
  useEffect(() => {
    if (searchQuery && isOpen) {
      onSearch(searchQuery, options);
    }
  }, [searchQuery, options, isOpen, onSearch]);

  const handleSearch = () => {
    if (searchQuery) {
      onSearch(searchQuery, options);
    }
  };

  const handleReplace = () => {
    if (searchQuery) {
      onReplace(searchQuery, replaceQuery, options);
    }
  };

  const handleReplaceAll = () => {
    if (searchQuery) {
      onReplaceAll(searchQuery, replaceQuery, options);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        handleReplace();
      } else {
        handleSearch();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isReplaceMode ? (
              <>
                <Replace className="h-5 w-5" />
                Buscar y Reemplazar
              </>
            ) : (
              <>
                <Search className="h-5 w-5" />
                Buscar
              </>
            )}
          </DialogTitle>
          <DialogDescription>
            {isReplaceMode 
              ? "Busca texto y reemplázalo en tu documento"
              : "Busca texto en tu documento"
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Campo de búsqueda */}
          <div className="space-y-2">
            <Label htmlFor="search">Buscar</Label>
            <div className="flex gap-2">
              <Input
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Texto a buscar..."
                autoFocus
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsReplaceMode(!isReplaceMode)}
                title={isReplaceMode ? "Modo búsqueda" : "Modo reemplazar"}
              >
                {isReplaceMode ? <Search className="h-4 w-4" /> : <Replace className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Campo de reemplazo */}
          {isReplaceMode && (
            <div className="space-y-2">
              <Label htmlFor="replace">Reemplazar con</Label>
              <Input
                id="replace"
                value={replaceQuery}
                onChange={(e) => setReplaceQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Texto de reemplazo..."
              />
            </div>
          )}

          {/* Opciones de búsqueda */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="caseSensitive"
                checked={options.caseSensitive}
                onCheckedChange={(checked) => 
                  setOptions(prev => ({ ...prev, caseSensitive: !!checked }))
                }
              />
              <Label htmlFor="caseSensitive" className="flex items-center gap-2">
                <CaseSensitive className="h-4 w-4" />
                Distinguir mayúsculas y minúsculas
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="wholeWord"
                checked={options.wholeWord}
                onCheckedChange={(checked) => 
                  setOptions(prev => ({ ...prev, wholeWord: !!checked }))
                }
              />
              <Label htmlFor="wholeWord" className="flex items-center gap-2">
                <WholeWord className="h-4 w-4" />
                Palabra completa
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="useRegex"
                checked={options.useRegex}
                onCheckedChange={(checked) => 
                  setOptions(prev => ({ ...prev, useRegex: !!checked }))
                }
              />
              <Label htmlFor="useRegex">
                Usar expresiones regulares
              </Label>
            </div>
          </div>

          {/* Información de resultados */}
          {totalMatches > 0 && (
            <div className="flex items-center justify-between p-2 bg-muted rounded-md">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">
                  {currentMatch} de {totalMatches}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  coincidencias encontradas
                </span>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" title="Anterior">
                  <ArrowUp className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" title="Siguiente">
                  <ArrowDown className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4 mr-2" />
            Cerrar
          </Button>
          
          <div className="flex gap-2">
            {isReplaceMode && (
              <>
                <Button variant="outline" onClick={handleReplace}>
                  Reemplazar
                </Button>
                <Button variant="outline" onClick={handleReplaceAll}>
                  Reemplazar todo
                </Button>
              </>
            )}
            <Button onClick={handleSearch}>
              Buscar
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
