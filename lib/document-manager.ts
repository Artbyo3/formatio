export interface Document {
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

export class DocumentManager {
  private static STORAGE_KEY = 'formatio_documents';
  private static CURRENT_DOC_KEY = 'formatio_current_document';

  static getAllDocuments(): Document[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return [];
      
      const documents = JSON.parse(stored);
      return documents.map((doc: Document) => ({
        ...doc,
        createdAt: new Date(doc.createdAt),
        updatedAt: new Date(doc.updatedAt)
      }));
    } catch (error) {
      console.error('Error loading documents:', error);
      return [];
    }
  }

  static saveDocument(document: Document): void {
    if (typeof window === 'undefined') return;
    
    try {
      const documents = this.getAllDocuments();
      const existingIndex = documents.findIndex(doc => doc.id === document.id);
      
      if (existingIndex >= 0) {
        documents[existingIndex] = document;
      } else {
        documents.push(document);
      }
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(documents));
    } catch (error) {
      console.error('Error saving document:', error);
    }
  }

  static deleteDocument(documentId: string): void {
    if (typeof window === 'undefined') return;
    
    try {
      const documents = this.getAllDocuments();
      const filtered = documents.filter(doc => doc.id !== documentId);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  }

  static getCurrentDocumentId(): string | null {
    if (typeof window === 'undefined') return null;
    
    try {
      return localStorage.getItem(this.CURRENT_DOC_KEY);
    } catch (error) {
      console.error('Error getting current document:', error);
      return null;
    }
  }

  static setCurrentDocumentId(documentId: string): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(this.CURRENT_DOC_KEY, documentId);
    } catch (error) {
      console.error('Error setting current document:', error);
    }
  }

  static createNewDocument(): Document {
    const id = Date.now().toString();
    const now = new Date();
    
    return {
      id,
      title: `Documento ${new Date().toLocaleDateString()}`,
      content: '',
      createdAt: now,
      updatedAt: now,
      wordCount: 0,
      charCount: 0,
      isFavorite: false,
      category: 'General'
    };
  }

  static updateDocumentStats(document: Document): Document {
    const words = document.content.trim() ? document.content.trim().split(/\s+/).length : 0;
    const chars = document.content.length;
    
    return {
      ...document,
      wordCount: words,
      charCount: chars,
      updatedAt: new Date()
    };
  }
}
