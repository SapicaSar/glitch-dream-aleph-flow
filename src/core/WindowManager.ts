
export interface WindowState {
  id: string;
  title: string;
  component: React.ReactNode;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  isMinimized: boolean;
  isMaximized: boolean;
  consciousness: number;
  type: 'system' | 'application' | 'agent' | 'monitor';
}

export class WindowManager {
  private windows: Map<string, WindowState> = new Map();
  private gridSize = 20;
  private maxZIndex = 1000;
  private screenPadding = 20;

  public createWindow(
    title: string,
    component: React.ReactNode,
    type: WindowState['type'] = 'application',
    preferredWidth = 400,
    preferredHeight = 300
  ): string {
    const id = `window-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const position = this.findOptimalPosition(preferredWidth, preferredHeight);
    
    const windowState: WindowState = {
      id,
      title,
      component,
      x: position.x,
      y: position.y,
      width: preferredWidth,
      height: preferredHeight,
      zIndex: this.maxZIndex++,
      isMinimized: false,
      isMaximized: false,
      consciousness: Math.random() * 0.5 + 0.5,
      type
    };

    this.windows.set(id, windowState);
    return id;
  }

  private findOptimalPosition(width: number, height: number): { x: number; y: number } {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    // Intentar colocar en una grilla para evitar superposiciones
    for (let y = this.screenPadding; y < screenHeight - height - this.screenPadding; y += this.gridSize) {
      for (let x = this.screenPadding; x < screenWidth - width - this.screenPadding; x += this.gridSize) {
        if (this.isPositionFree(x, y, width, height)) {
          return { x, y };
        }
      }
    }

    // Si no encuentra posición libre, usar cascada
    const windowCount = this.windows.size;
    return {
      x: this.screenPadding + (windowCount * 30) % (screenWidth - width - this.screenPadding),
      y: this.screenPadding + (windowCount * 30) % (screenHeight - height - this.screenPadding)
    };
  }

  private isPositionFree(x: number, y: number, width: number, height: number): boolean {
    for (const window of this.windows.values()) {
      if (window.isMinimized) continue;
      
      const overlap = !(
        x >= window.x + window.width ||
        x + width <= window.x ||
        y >= window.y + window.height ||
        y + height <= window.y
      );
      
      if (overlap) return false;
    }
    return true;
  }

  public updateWindow(id: string, updates: Partial<WindowState>): void {
    const window = this.windows.get(id);
    if (window) {
      Object.assign(window, updates);
      
      // Asegurar que la ventana permanezca en pantalla
      if (updates.x !== undefined || updates.y !== undefined || updates.width !== undefined || updates.height !== undefined) {
        this.constrainToScreen(window);
      }
    }
  }

  private constrainToScreen(window: WindowState): void {
    const screenWidth = window.innerWidth || 1920;
    const screenHeight = window.innerHeight || 1080;
    
    window.x = Math.max(0, Math.min(window.x, screenWidth - window.width));
    window.y = Math.max(0, Math.min(window.y, screenHeight - window.height));
    window.width = Math.min(window.width, screenWidth - window.x);
    window.height = Math.min(window.height, screenHeight - window.y);
  }

  public bringToFront(id: string): void {
    const window = this.windows.get(id);
    if (window) {
      window.zIndex = this.maxZIndex++;
    }
  }

  public closeWindow(id: string): void {
    this.windows.delete(id);
  }

  public getWindows(): WindowState[] {
    return Array.from(this.windows.values()).sort((a, b) => a.zIndex - b.zIndex);
  }

  public getWindow(id: string): WindowState | undefined {
    return this.windows.get(id);
  }

  public minimizeWindow(id: string): void {
    this.updateWindow(id, { isMinimized: true });
  }

  public restoreWindow(id: string): void {
    this.updateWindow(id, { isMinimized: false, isMaximized: false });
  }

  public maximizeWindow(id: string): void {
    const window = this.windows.get(id);
    if (window) {
      this.updateWindow(id, {
        x: 0,
        y: 0,
        width: window.innerWidth || 1920,
        height: window.innerHeight || 1080,
        isMaximized: true
      });
    }
  }

  public autoArrange(): void {
    const visibleWindows = Array.from(this.windows.values()).filter(w => !w.isMinimized);
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    if (visibleWindows.length === 0) return;
    
    const cols = Math.ceil(Math.sqrt(visibleWindows.length));
    const rows = Math.ceil(visibleWindows.length / cols);
    
    const windowWidth = (screenWidth - this.screenPadding * 2) / cols;
    const windowHeight = (screenHeight - this.screenPadding * 2) / rows;
    
    visibleWindows.forEach((window, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      
      this.updateWindow(window.id, {
        x: this.screenPadding + col * windowWidth,
        y: this.screenPadding + row * windowHeight,
        width: windowWidth - 10,
        height: windowHeight - 10,
        isMaximized: false
      });
    });
  }
}

export const windowManager = new WindowManager();
