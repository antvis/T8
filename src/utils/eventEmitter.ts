type Listener = (...args: unknown[]) => void;

export class EventEmitter<K extends string> {
  private listeners: Map<K, Listener[]> = new Map();

  on(event: K, listener: Listener): void {
    const listeners = this.listeners.get(event) || [];
    listeners.push(listener);
    this.listeners.set(event, listeners);
  }

  emit(event: K, ...args: unknown[]): void {
    const listeners = this.listeners.get(event);
    if (!listeners) return;

    listeners.forEach((listener) => {
      try {
        listener(...args);
      } catch (error) {
        console.error(`Error in event listener for ${event}:`, error);
      }
    });
  }

  off(event: K, listener: Listener): void {
    const listeners = this.listeners.get(event);
    if (!listeners) return;

    const filteredListeners = listeners.filter((l) => l !== listener);
    if (filteredListeners.length === 0) {
      this.listeners.delete(event);
    } else {
      this.listeners.set(event, filteredListeners);
    }
  }

  once(event: K, listener: Listener): void {
    const onceWrapper = (...args: unknown[]) => {
      this.off(event, onceWrapper);
      listener(...args);
    };
    this.on(event, onceWrapper);
  }

  removeAllListeners(event?: K[]): void {
    if (event) event.forEach((e) => this.listeners.delete(e));
    else this.listeners.clear();
  }
}
