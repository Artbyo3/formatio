"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Grid, 
  List, 
  MoreHorizontal,
  Edit,
  Trash2,
  Download,
  Star,
  Clock,
} from "lucide-react";

interface Document {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  wordCount: number;
  charCount: number;
  isFavorite?: boolean;
  category?: string;
}

interface DashboardProps {
  documents: Document[];
  onOpenDocument: (id: string) => void;
  onCreateDocument: () => void;
  onDeleteDocument: (id: string) => void;
  onExportDocument: (id: string, format: string) => void;
  onToggleFavorite: (id: string) => void;
}

export function Dashboard({
  documents,
  onOpenDocument,
  onCreateDocument,
  onDeleteDocument,
  onExportDocument,
  onToggleFavorite
}: DashboardProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterBy, setFilterBy] = useState<'all' | 'favorites' | 'recent'>('all');


  // Filtrar y ordenar documentos
  const filteredDocuments = documents
    .filter(doc => {
      const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           doc.content.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (!matchesSearch) return false;
      
      if (filterBy === 'favorites') return doc.isFavorite;
      if (filterBy === 'recent') {
        const daysSinceUpdate = (Date.now() - new Date(doc.updatedAt).getTime()) / (1000 * 60 * 60 * 24);
        return daysSinceUpdate <= 7;
      }
      
      // Category filtering removed for simplicity
      
      return true;
    })
    .sort((a, b) => {
      // Sort by updated date by default
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

  // Categorías únicas

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Hoy';
    if (days === 1) return 'Ayer';
    if (days < 7) return `${days} días`;
    if (days < 30) return `${Math.floor(days / 7)} semanas`;
    return `${Math.floor(days / 30)} meses`;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header simplificado */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Mis Documentos</h1>
          <p className="text-sm text-muted-foreground">
            {documents.length} documentos
          </p>
        </div>
        <Button onClick={onCreateDocument} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo
        </Button>
      </div>

      {/* Estadísticas compactas - solo si hay documentos */}
      {documents.length > 0 && (
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
            <FileText className="h-4 w-4" />
            <span className="font-medium">{documents.length}</span>
            <span className="text-muted-foreground">documentos</span>
          </div>
        </div>
      )}

      {/* Búsqueda simplificada */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar documentos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              {filterBy === 'all' ? 'Todos' : 
               filterBy === 'favorites' ? 'Favoritos' : 'Recientes'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setFilterBy('all')}>Todos</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterBy('favorites')}>Favoritos</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterBy('recent')}>Recientes</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex border rounded-md">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className="rounded-r-none"
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
            className="rounded-l-none"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Lista de documentos */}
      {filteredDocuments.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              {searchQuery ? 'No se encontraron documentos' : 'No hay documentos'}
            </h3>
            <p className="text-muted-foreground text-center mb-4">
              {searchQuery 
                ? 'Intenta con otros términos de búsqueda'
                : 'Crea tu primer documento para comenzar'
              }
            </p>
            {!searchQuery && (
              <Button onClick={onCreateDocument}>
                <Plus className="h-4 w-4 mr-2" />
                Crear Documento
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
          : 'space-y-2'
        }>
          {filteredDocuments.map((doc) => (
            <Card key={doc.id} className="group hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate mb-1">{doc.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{formatRelativeTime(new Date(doc.updatedAt))}</span>
                      <span>•</span>
                      <span>{doc.wordCount} palabras</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    {doc.isFavorite && (
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onOpenDocument(doc.id)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Abrir
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onToggleFavorite(doc.id)}>
                          <Star className="h-4 w-4 mr-2" />
                          {doc.isFavorite ? 'Quitar de favoritos' : 'Marcar como favorito'}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onExportDocument(doc.id, 'txt')}>
                          <Download className="h-4 w-4 mr-2" />
                          Exportar como TXT
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onExportDocument(doc.id, 'html')}>
                          <Download className="h-4 w-4 mr-2" />
                          Exportar como HTML
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => onDeleteDocument(doc.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{formatDate(new Date(doc.createdAt))}</span>
                  <Badge variant="outline">{doc.charCount} caracteres</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
