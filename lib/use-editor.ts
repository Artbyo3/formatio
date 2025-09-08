import { useState, useEffect, useCallback, useRef } from 'react';
import { Document, DocumentManager } from './document-manager';
import { HistoryManager } from './history-manager';

export interface EditorState {
  currentDocument: Document | null;
  documents: Document[];
  isDirty: boolean;
  selection: {
    start: number;
    end: number;
  };
  canUndo: boolean;
  canRedo: boolean;
}

export function useEditor() {
  const [state, setState] = useState<EditorState>({
    currentDocument: null,
    documents: [],
    isDirty: false,
    selection: { start: 0, end: 0 },
    canUndo: false,
    canRedo: false
  });

  const historyManagerRef = useRef<HistoryManager>(new HistoryManager());

  // Cargar documentos al inicializar
  useEffect(() => {
    const documents = DocumentManager.getAllDocuments();
    const currentDocId = DocumentManager.getCurrentDocumentId();
    const currentDocument = currentDocId 
      ? documents.find(doc => doc.id === currentDocId) || null
      : null;

    setState(prev => ({
      ...prev,
      documents,
      currentDocument
    }));
  }, []);

  // Crear nuevo documento
  const createNewDocument = useCallback((template?: { content: string; name: string }) => {
    const newDoc = DocumentManager.createNewDocument();
    
    // Si hay una plantilla, aplicar el contenido y título
    if (template) {
      newDoc.content = template.content;
      newDoc.title = template.name;
    }
    
    DocumentManager.saveDocument(newDoc);
    DocumentManager.setCurrentDocumentId(newDoc.id);
    
    setState(prev => ({
      ...prev,
      currentDocument: newDoc,
      documents: [...prev.documents, newDoc],
      isDirty: false
    }));
  }, []);

  // Cambiar documento actual
  const switchToDocument = useCallback((documentId: string) => {
    const document = state.documents.find(doc => doc.id === documentId);
    if (document) {
      DocumentManager.setCurrentDocumentId(documentId);
      setState(prev => ({
        ...prev,
        currentDocument: document,
        isDirty: false
      }));
    }
  }, [state.documents]);

  // Actualizar contenido del documento
  const updateContent = useCallback((content: string) => {
    if (!state.currentDocument) return;

    // Agregar al historial si el contenido cambió
    const currentContent = state.currentDocument.content;
    if (content !== currentContent) {
      historyManagerRef.current.addState(content);
    }

    const updatedDoc = DocumentManager.updateDocumentStats({
      ...state.currentDocument,
      content
    });

    DocumentManager.saveDocument(updatedDoc);
    
    setState(prev => ({
      ...prev,
      currentDocument: updatedDoc,
      documents: prev.documents.map(doc => 
        doc.id === updatedDoc.id ? updatedDoc : doc
      ),
      isDirty: true,
      canUndo: historyManagerRef.current.canUndo(),
      canRedo: historyManagerRef.current.canRedo()
    }));
  }, [state.currentDocument]);

  // Actualizar título del documento
  const updateTitle = useCallback((title: string) => {
    if (!state.currentDocument) return;

    const updatedDoc = {
      ...state.currentDocument,
      title,
      updatedAt: new Date()
    };

    DocumentManager.saveDocument(updatedDoc);
    
    setState(prev => ({
      ...prev,
      currentDocument: updatedDoc,
      documents: prev.documents.map(doc => 
        doc.id === updatedDoc.id ? updatedDoc : doc
      )
    }));
  }, [state.currentDocument]);

  // Eliminar documento
  const deleteDocument = useCallback((documentId: string) => {
    DocumentManager.deleteDocument(documentId);
    
    setState(prev => {
      const newDocuments = prev.documents.filter(doc => doc.id !== documentId);
      const newCurrentDoc = prev.currentDocument?.id === documentId 
        ? (newDocuments[0] || null)
        : prev.currentDocument;

      if (newCurrentDoc) {
        DocumentManager.setCurrentDocumentId(newCurrentDoc.id);
      }

      return {
        ...prev,
        documents: newDocuments,
        currentDocument: newCurrentDoc,
        isDirty: false
      };
    });
  }, []);

  // Guardar documento
  const saveDocument = useCallback(() => {
    if (state.currentDocument) {
      DocumentManager.saveDocument(state.currentDocument);
      setState(prev => ({ ...prev, isDirty: false }));
    }
  }, [state.currentDocument]);

  // Actualizar selección
  const updateSelection = useCallback((start: number, end: number) => {
    setState(prev => ({
      ...prev,
      selection: { start, end }
    }));
  }, []);

  // Deshacer
  const undo = useCallback(() => {
    if (!state.currentDocument) return;
    
    const previousContent = historyManagerRef.current.undo();
    if (previousContent !== null) {
      const updatedDoc = DocumentManager.updateDocumentStats({
        ...state.currentDocument,
        content: previousContent
      });

      DocumentManager.saveDocument(updatedDoc);
      
      setState(prev => ({
        ...prev,
        currentDocument: updatedDoc,
        documents: prev.documents.map(doc => 
          doc.id === updatedDoc.id ? updatedDoc : doc
        ),
        canUndo: historyManagerRef.current.canUndo(),
        canRedo: historyManagerRef.current.canRedo()
      }));
    }
  }, [state.currentDocument]);

  // Rehacer
  const redo = useCallback(() => {
    if (!state.currentDocument) return;
    
    const nextContent = historyManagerRef.current.redo();
    if (nextContent !== null) {
      const updatedDoc = DocumentManager.updateDocumentStats({
        ...state.currentDocument,
        content: nextContent
      });

      DocumentManager.saveDocument(updatedDoc);
      
      setState(prev => ({
        ...prev,
        currentDocument: updatedDoc,
        documents: prev.documents.map(doc => 
          doc.id === updatedDoc.id ? updatedDoc : doc
        ),
        canUndo: historyManagerRef.current.canUndo(),
        canRedo: historyManagerRef.current.canRedo()
      }));
    }
  }, [state.currentDocument]);

  return {
    ...state,
    createNewDocument,
    switchToDocument,
    updateContent,
    updateTitle,
    deleteDocument,
    saveDocument,
    updateSelection,
    undo,
    redo
  };
}
