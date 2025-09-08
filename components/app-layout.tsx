"use client";

import { useState, useEffect } from "react";
import { AppNavigation, AppView } from "./app-navigation";
import { Dashboard } from "./dashboard";
import { CleanEditor } from "./clean-editor";
import { ToolsView } from "./tools-view";
import { SettingsView } from "./settings-view";
import { Document, DocumentManager } from "@/lib/document-manager";
import { ExportManager } from "@/lib/export-utils";
import { RichTextEditorRef } from "./rich-text-editor";

interface AppLayoutProps {
  documents: Document[];
  currentDocument: Document | null;
  onSwitchDocument: (id: string) => void;
  onCreateDocument: () => void;
  onDeleteDocument: (id: string) => void;
  onUpdateTitle: (title: string) => void;
  onUpdateContent: (content: string) => void;
  onUpdateSelection: (start: number, end: number) => void;
  isDirty: boolean;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onSave: () => void;
  editorRef: React.RefObject<RichTextEditorRef>;
}

export function AppLayout({
  documents,
  currentDocument,
  onSwitchDocument,
  onCreateDocument,
  onDeleteDocument,
  onUpdateTitle,
  onUpdateContent,
  onUpdateSelection,
  isDirty,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onSave,
  editorRef
}: AppLayoutProps) {
  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Cerrar menú móvil al cambiar de vista
  useEffect(() => {
    setShowMobileMenu(false);
  }, [currentView]);

  // Manejar exportación de documentos
  const handleExportDocument = (documentId: string, format: string) => {
    const doc = documents.find(d => d.id === documentId);
    if (!doc) return;

    const filename = ExportManager.formatFilename(doc.title, format);
    
    switch (format) {
      case 'txt':
        ExportManager.exportToText(doc.content, filename);
        break;
      case 'html':
        ExportManager.exportToHtml(doc.content, filename);
        break;
      case 'pdf':
        ExportManager.exportToPdf(doc.content, filename);
        break;
    }
  };

  // Manejar favoritos
  const handleToggleFavorite = (documentId: string) => {
    const doc = documents.find(d => d.id === documentId);
    if (!doc) return;

    const updatedDoc = { ...doc, isFavorite: !doc.isFavorite };
    DocumentManager.saveDocument(updatedDoc);
    
    // Actualizar la lista de documentos
    window.location.reload(); // Simplificado para este ejemplo
  };


  // Manejar exportación de configuración
  const handleExportSettings = () => {
    const settings = {
      theme: 'system',
      autoSave: true,
      // ... otros ajustes
    };
    
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'formatio-settings.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Manejar importación de configuración
  const handleImportSettings = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const settings = JSON.parse(e.target?.result as string);
        // Aplicar configuración
        console.log('Settings imported:', settings);
      } catch (error) {
        console.error('Error importing settings:', error);
      }
    };
    reader.readAsText(file);
  };

  // Manejar restablecimiento de configuración
  const handleResetSettings = () => {
    if (confirm('¿Estás seguro de que quieres restablecer toda la configuración?')) {
      // Restablecer configuración
      console.log('Settings reset');
    }
  };

  // Renderizar vista actual
  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <Dashboard
            documents={documents}
            onOpenDocument={(id) => {
              onSwitchDocument(id);
              setCurrentView('editor');
            }}
            onCreateDocument={() => {
              onCreateDocument();
              setCurrentView('editor');
            }}
            onDeleteDocument={onDeleteDocument}
            onExportDocument={handleExportDocument}
            onToggleFavorite={handleToggleFavorite}
          />
        );
      
      case 'editor':
        return (
          <CleanEditor
            documents={documents}
            currentDocument={currentDocument}
            onSwitchDocument={onSwitchDocument}
            onCreateDocument={onCreateDocument}
            onUpdateTitle={onUpdateTitle}
            onUpdateContent={onUpdateContent}
            onUpdateSelection={onUpdateSelection}
            isDirty={isDirty}
            canUndo={canUndo}
            canRedo={canRedo}
            onUndo={onUndo}
            onRedo={onRedo}
            onSave={onSave}
            editorRef={editorRef}
            onViewChange={(view: string) => setCurrentView(view as AppView)}
          />
        );
      
      case 'tools':
        return (
          <ToolsView
            content={currentDocument?.content || ''}
            onContentChange={onUpdateContent}
          />
        );
      
      case 'settings':
        return (
          <SettingsView
            onExportSettings={handleExportSettings}
            onImportSettings={handleImportSettings}
            onResetSettings={handleResetSettings}
          />
        );
      
      default:
        return (
          <Dashboard
            documents={documents}
            onOpenDocument={() => {}}
            onCreateDocument={() => {}}
            onDeleteDocument={() => {}}
            onExportDocument={() => {}}
            onToggleFavorite={() => {}}
          />
        );
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Navegación */}
      <AppNavigation
        currentView={currentView}
        onViewChange={setCurrentView}
        documentCount={documents.length}
        isDirty={isDirty}
        showMobileMenu={showMobileMenu}
        onToggleMobileMenu={() => setShowMobileMenu(!showMobileMenu)}
      />

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col min-w-0">
        {renderCurrentView()}
      </div>
    </div>
  );
}
