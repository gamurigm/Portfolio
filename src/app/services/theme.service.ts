import { Injectable, Renderer2, RendererFactory2, signal, computed, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  
  // Signal para el estado del tema oscuro
  private _isDarkMode = signal<boolean>(false);
  
  // Signal público de solo lectura
  public readonly isDarkMode = this._isDarkMode.asReadonly();
  
  // Computed signal para el nombre del tema
  public readonly themeName = computed(() => 
    this._isDarkMode() ? 'oscuro' : 'claro'
  );
  
  // Computed signal para el icono del tema
  public readonly themeIcon = computed(() => 
    this._isDarkMode() ? 'fas fa-sun' : 'fas fa-moon'
  );

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.loadTheme();
    
    // Effect para aplicar cambios de tema automáticamente
    effect(() => {
      this.applyThemeToDOM(this._isDarkMode());
      // Guardar en localStorage cuando cambie el tema
      localStorage.setItem('tema', this.themeName());
    });
  }

  private loadTheme(): void {
    const savedTheme = localStorage.getItem('tema');
    const isDark = savedTheme === 'oscuro';
    this._isDarkMode.set(isDark);
  }

  toggleTheme(): void {
    this._isDarkMode.update(current => !current);
  }

  setTheme(isDark: boolean): void {
    this._isDarkMode.set(isDark);
  }

  private applyThemeToDOM(isDark: boolean): void {
    if (isDark) {
      this.renderer.addClass(document.body, 'modo-oscuro');
    } else {
      this.renderer.removeClass(document.body, 'modo-oscuro');
    }
  }
}
