"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  X, 
  Plus, 
  FileText, 
  Save,
  AlertCircle
} from "lucide-react";
import { Document } from "@/lib/document-manager";

interface DocumentTabsProps {
  documents: Document[];
  currentDocument: Document | null;
  onSwitchDocument: (documentId: string) => void;
  onCloseDocument: (documentId: string) => void;
  onCreateDocument: () => void;
  isDirty: boolean;
}

export function DocumentTabs({
  documents,
  currentDocument,
  onSwitchDocument,
  onCloseDocument,
  onCreateDocument,
  isDirty
}: DocumentTabsProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getDocumentStatus = (doc: Document) => {
    if (doc.id === currentDocument?.id) {
      return isDirty ? 'dirty' : 'saved';
    }
    return 'inactive';
  };

  return (
    <div className="border-b bg-muted/30">
      <div className="flex items-center gap-1 p-2 overflow-x-auto">
        {/* Botón para crear nuevo documento */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onCreateDocument}
          className="shrink-0"
          title="Nuevo documento (Ctrl+N)"
        >
          <Plus className="h-4 w-4 mr-1" />
          Nuevo
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Pestañas de documentos */}
        <div className="flex items-center gap-1 min-w-0">
          {documents.map((doc) => {
            const status = getDocumentStatus(doc);
            const isActive = doc.id === currentDocument?.id;
            
            return (
              <div
                key={doc.id}
                className={`
                  flex items-center gap-2 px-3 py-2 rounded-md min-w-0 max-w-48
                  ${isActive 
                    ? 'bg-background border shadow-sm' 
                    : 'hover:bg-muted/50 cursor-pointer'
                  }
                  transition-colors
                `}
                onClick={() => onSwitchDocument(doc.id)}
              >
                <FileText className="h-4 w-4 shrink-0" />
                
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-medium">
                      {doc.title}
                    </span>
                    {status === 'dirty' && (
                      <AlertCircle className="h-3 w-3 text-orange-500 shrink-0" />
                    )}
                    {status === 'saved' && (
                      <Save className="h-3 w-3 text-green-500 shrink-0" />
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{doc.wordCount} palabras</span>
                    <span>•</span>
                    <span>{formatDate(doc.updatedAt)}</span>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground shrink-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCloseDocument(doc.id);
                  }}
                  title="Cerrar documento"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            );
          })}
        </div>

        {/* Información del documento actual */}
        {currentDocument && (
          <>
            <div className="w-px h-6 bg-border mx-1" />
            <div className="flex items-center gap-2 text-sm text-muted-foreground shrink-0">
              <Badge variant="outline" className="text-xs">
                {currentDocument.charCount} caracteres
              </Badge>
              <Badge variant="outline" className="text-xs">
                {currentDocument.wordCount} palabras
              </Badge>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
