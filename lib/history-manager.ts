export interface HistoryState {
  content: string;
  timestamp: number;
}

export class HistoryManager {
  private history: HistoryState[] = [];
  private currentIndex: number = -1;
  private maxHistorySize: number = 50;

  constructor(maxSize: number = 50) {
    this.maxHistorySize = maxSize;
  }

  // Agregar estado al historial
  addState(content: string): void {
    const newState: HistoryState = {
      content,
      timestamp: Date.now()
    };

    // Si estamos en el medio del historial, eliminar estados futuros
    if (this.currentIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.currentIndex + 1);
    }

    // Agregar nuevo estado
    this.history.push(newState);
    this.currentIndex = this.history.length - 1;

    // Limitar tamaño del historial
    if (this.history.length > this.maxHistorySize) {
      this.history = this.history.slice(-this.maxHistorySize);
      this.currentIndex = this.history.length - 1;
    }
  }

  // Deshacer
  undo(): string | null {
    if (this.canUndo()) {
      this.currentIndex--;
      return this.history[this.currentIndex].content;
    }
    return null;
  }

  // Rehacer
  redo(): string | null {
    if (this.canRedo()) {
      this.currentIndex++;
      return this.history[this.currentIndex].content;
    }
    return null;
  }

  // Verificar si se puede deshacer
  canUndo(): boolean {
    return this.currentIndex > 0;
  }

  // Verificar si se puede rehacer
  canRedo(): boolean {
    return this.currentIndex < this.history.length - 1;
  }

  // Obtener estado actual
  getCurrentState(): string | null {
    if (this.currentIndex >= 0 && this.currentIndex < this.history.length) {
      return this.history[this.currentIndex].content;
    }
    return null;
  }

  // Limpiar historial
  clear(): void {
    this.history = [];
    this.currentIndex = -1;
  }

  // Obtener información del historial
  getHistoryInfo(): { current: number; total: number } {
    return {
      current: this.currentIndex + 1,
      total: this.history.length
    };
  }
}
