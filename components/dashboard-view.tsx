"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  Calendar,
  BarChart3,
  HardDrive,
  Settings,
  Eye,
  Copy,
  Zap,
  Upload,
  X
} from "lucide-react";

interface DashboardViewProps {
  documents: any[];
  onOpenDocument: (id: string) => void;
  onCreateDocument: () => void;
  onDeleteDocument: (id: string) => void;
}

export function DashboardView({
  documents,
  onOpenDocument,
  onCreateDocument,
  onDeleteDocument
}: DashboardViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'updated' | 'created' | 'title' | 'words'>('updated');
  const [filterBy, setFilterBy] = useState<'all' | 'favorites' | 'recent'>('all');
  const [showTemplatesModal, setShowTemplatesModal] = useState(false);

  // Plantillas disponibles
  const templates = [
    {
      id: 'letter',
      name: 'Carta Formal',
      description: 'Plantilla para cartas formales y comerciales',
      icon: '📝',
      category: 'Correspondencia'
    },
    {
      id: 'report',
      name: 'Informe',
      description: 'Estructura para informes y reportes',
      icon: '📊',
      category: 'Documentos'
    },
    {
      id: 'meeting',
      name: 'Acta de Reunión',
      description: 'Plantilla para actas de reuniones',
      icon: '👥',
      category: 'Reuniones'
    },
    {
      id: 'proposal',
      name: 'Propuesta',
      description: 'Estructura para propuestas comerciales',
      icon: '💼',
      category: 'Comercial'
    },
    {
      id: 'resume',
      name: 'Currículum',
      description: 'Plantilla para currículum vitae',
      icon: '👤',
      category: 'Personal'
    },
    {
      id: 'article',
      name: 'Artículo',
      description: 'Estructura para artículos y blogs',
      icon: '📰',
      category: 'Contenido'
    }
  ];

  // Estadísticas del dashboard
  const stats = {
    totalDocuments: documents.length,
    totalWords: documents.reduce((sum, doc) => sum + (doc.wordCount || 0), 0),
    totalCharacters: documents.reduce((sum, doc) => sum + (doc.charCount || 0), 0),
    favorites: documents.filter(doc => doc.isFavorite).length,
    recent: documents.filter(doc => {
      const daysSinceUpdate = (Date.now() - new Date(doc.updatedAt).getTime()) / (1000 * 60 * 60 * 24);
      return daysSinceUpdate <= 7;
    }).length
  };

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
      
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'words':
          return (b.wordCount || 0) - (a.wordCount || 0);
        case 'created':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'updated':
        default:
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }
    });

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

  const handleExportDocument = (documentId: string, format: string) => {
    const doc = documents.find(d => d.id === documentId);
    if (!doc) return;

    const filename = `${doc.title || 'documento'}.${format}`;
    const blob = new Blob([doc.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleToggleFavorite = (documentId: string) => {
    // Implementar toggle de favorito
    console.log('Toggle favorite:', documentId);
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header del dashboard */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-muted-foreground text-lg mt-2">
            Gestiona todos tus documentos y archivos
          </p>
        </div>
        <Button 
          onClick={onCreateDocument} 
          size="lg" 
          className="glass shadow-glass-lg rounded-2xl h-14 px-8 smooth-transition hover:scale-105"
        >
          <Plus className="h-6 w-6 mr-3" />
          <span className="font-semibold">Nuevo Documento</span>
        </Button>
      </div>

      {/* Acción rápida - Plantillas */}
      <div className="flex justify-center">
        <Card 
          className="glass-card rounded-2xl border-0 shadow-glass-lg smooth-transition hover:scale-105 cursor-pointer w-full max-w-md"
          onClick={() => setShowTemplatesModal(true)}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Acceso Rápido</CardTitle>
            <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <Zap className="h-5 w-5 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground mb-2">Plantillas</div>
            <p className="text-sm text-muted-foreground">
              Crear desde plantillas predefinidas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Controles de búsqueda y filtrado */}
      <Card className="glass-card rounded-2xl border-0 shadow-glass">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Buscar documentos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 rounded-xl glass border-white/20 focus:border-primary/50 smooth-transition"
                />
              </div>
            </div>
            
            <div className="flex gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-12 px-4 rounded-xl glass border-white/20 hover:border-primary/50 smooth-transition"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    {filterBy === 'all' ? 'Todos' : 
                     filterBy === 'favorites' ? 'Favoritos' : 'Recientes'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="glass-card rounded-xl border-white/20">
                  <DropdownMenuItem onClick={() => setFilterBy('all')} className="rounded-lg">
                    Todos los documentos
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterBy('favorites')} className="rounded-lg">
                    Solo favoritos
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterBy('recent')} className="rounded-lg">
                    Recientes (7 días)
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-12 px-4 rounded-xl glass border-white/20 hover:border-primary/50 smooth-transition"
                  >
                    Ordenar por {sortBy === 'updated' ? 'Modificación' :
                                sortBy === 'created' ? 'Creación' :
                                sortBy === 'title' ? 'Título' : 'Palabras'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="glass-card rounded-xl border-white/20">
                  <DropdownMenuItem onClick={() => setSortBy('updated')} className="rounded-lg">
                    Última modificación
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy('created')} className="rounded-lg">
                    Fecha de creación
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy('title')} className="rounded-lg">
                    Título (A-Z)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy('words')} className="rounded-lg">
                    Número de palabras
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="flex border border-white/20 rounded-xl overflow-hidden">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none h-12 px-4 glass"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none h-12 px-4 glass"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

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
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          : 'space-y-4'
        }>
          {filteredDocuments.map((doc) => (
            <Card 
              key={doc.id} 
              className="group glass-card rounded-2xl border-0 shadow-glass smooth-transition hover:shadow-glass-lg hover:scale-105"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg truncate mb-2 text-foreground">
                      {doc.title || 'Sin título'}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{formatRelativeTime(new Date(doc.updatedAt))}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        <span>{doc.wordCount || 0} palabras</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {doc.isFavorite && (
                      <div className="w-8 h-8 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      </div>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-10 w-10 p-0 rounded-xl glass hover:shadow-glass"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="glass-card rounded-xl border-white/20">
                        <DropdownMenuItem onClick={() => onOpenDocument(doc.id)} className="rounded-lg">
                          <Edit className="h-4 w-4 mr-3" />
                          Abrir
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleFavorite(doc.id)} className="rounded-lg">
                          <Star className="h-4 w-4 mr-3" />
                          {doc.isFavorite ? 'Quitar de favoritos' : 'Marcar como favorito'}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleExportDocument(doc.id, 'txt')} className="rounded-lg">
                          <Download className="h-4 w-4 mr-3" />
                          Exportar como TXT
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleExportDocument(doc.id, 'html')} className="rounded-lg">
                          <Download className="h-4 w-4 mr-3" />
                          Exportar como HTML
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => onDeleteDocument(doc.id)}
                          className="text-destructive rounded-lg"
                        >
                          <Trash2 className="h-4 w-4 mr-3" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {formatDate(new Date(doc.createdAt))}
                  </span>
                  <Badge 
                    variant="outline" 
                    className="glass border-white/20 rounded-lg px-3 py-1"
                  >
                    {doc.charCount || 0} caracteres
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Modal de Plantillas */}
      {showTemplatesModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="glass-card rounded-2xl border-0 shadow-glass-lg w-full max-w-4xl max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <Zap className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Plantillas</h2>
                    <p className="text-sm text-muted-foreground">Selecciona una plantilla para crear tu documento</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowTemplatesModal(false)}
                  className="h-10 w-10 p-0 rounded-xl glass hover:shadow-glass"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {templates.map((template) => (
                  <Card
                    key={template.id}
                    className="glass-card rounded-xl border-0 shadow-glass smooth-transition hover:shadow-glass-lg hover:scale-105 cursor-pointer"
                    onClick={() => {
                      // Aquí se implementará la funcionalidad de crear documento desde plantilla
                      console.log('Crear documento desde plantilla:', template.id);
                      setShowTemplatesModal(false);
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">{template.icon}</div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm mb-1">{template.name}</h3>
                          <p className="text-xs text-muted-foreground mb-2">{template.description}</p>
                          <Badge variant="outline" className="text-xs">
                            {template.category}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="p-6 border-t border-white/10">
              <div className="flex justify-end gap-3">
                <Button
                  variant="ghost"
                  onClick={() => setShowTemplatesModal(false)}
                  className="rounded-xl glass hover:shadow-glass"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={() => {
                    // Crear documento en blanco
                    onCreateDocument();
                    setShowTemplatesModal(false);
                  }}
                  className="rounded-xl glass shadow-glass-lg"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Documento en Blanco
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
