# 🚀 Portfolio Personal - Angular 19

[![Angular](https://img.shields.io/badge/Angular-19.1.0-red.svg)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue.svg)](https://www.typescriptlang.org/)
[![Signals](https://img.shields.io/badge/Angular-Signals-green.svg)](https://angular.dev/guide/signals)
[![SCSS](https://img.shields.io/badge/Styles-SCSS-ff69b4.svg)](https://sass-lang.com/)

## 📋 Descripción del Proyecto

Landing page personal y profesional desarrollada con **Angular 19** que cumple con los requerimientos de una carta de presentación digital moderna. Implementa las últimas características de Angular 19, incluyendo **standalone components** y **Angular Signals**, con un diseño completamente responsivo.

### ✨ Características Técnicas Principales

- 🎯 **100% Standalone Components** - Arquitectura sin módulos usando Angular 19
- ⚡ **Angular Signals** - Gestión de estado reactiva para el sistema de temas
- 📱 **Diseño Completamente Responsivo** - Adaptativo para todos los dispositivos
- 🌓 **Sistema de Temas Dinámico** - Alternancia claro/oscuro con persistencia
- 🎨 **Animaciones de Scroll** - Intersection Observer API para efectos visuales
- 🔧 **TypeScript Estricto** - Tipado fuerte y configuración rigurosa

## 🛠️ Stack Tecnológico

### Core Framework
- **Angular 19.1.0** - Framework principal con las últimas características
- **TypeScript 5.7.2** - Lenguaje de programación con tipado estático
- **RxJS 7.8.0** - Programación reactiva para observables

### Herramientas de Desarrollo
- **Angular CLI 19.1.5** - Tooling y scaffolding
- 

### APIs del Navegador
- **Intersection Observer API** - Detección de elementos visibles
- **LocalStorage API** - Persistencia de preferencias de tema
- **CSS Custom Properties** - Variables CSS dinámicas

## 🏗️ Arquitectura Standalone Components

El proyecto está completamente construido sin módulos de Angular, utilizando la nueva arquitectura de standalone components:

```
src/app/
├── components/               # Componentes standalone
│   ├── header/              # Header con sistema de temas
│   ├── about/               # Sección "Sobre Mí"
│   ├── projects/            # Portafolio de proyectos
│   ├── skills/              # Habilidades técnicas
│   ├── contact/             # Información de contacto
│   ├── footer/              # Footer con copyright
│   └── notifications/       # Sistema de notificaciones (preparado)
├── services/                # Servicios con inyección de dependencias
│   ├── theme.service.ts     # Gestión de temas con signals
│   ├── portfolio.service.ts # Datos del portfolio
│   ├── scroll-animation.service.ts # Animaciones de scroll
│   └── app-state.service.ts # Estado global (preparado)
├── interfaces/              # Definiciones TypeScript
│   └── project.interface.ts # Interface para proyectos
├── app.component.ts         # Componente raíz standalone
├── app.config.ts           # Configuración de la aplicación
└── app.routes.ts           # Configuración de rutas
```

### Configuración Standalone Component

Cada componente utiliza la nueva sintaxis de Angular 19:

```typescript
@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'  // Nota: styleUrl (singular)
})
export class HeaderComponent {
  // Implementación del componente
}
```

## ⚡ Implementación de Angular Signals

### Theme Service con Signals

El sistema de temas está completamente implementado con Angular Signals:

```typescript
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // Signal privado para el estado del tema
  private _isDarkMode = signal<boolean>(false);
  
  // Signal público de solo lectura
  public readonly isDarkMode = this._isDarkMode.asReadonly();
  
  // Computed signals derivados
  public readonly themeName = computed(() => 
    this._isDarkMode() ? 'oscuro' : 'claro'
  );
  
  public readonly themeIcon = computed(() => 
    this._isDarkMode() ? 'fas fa-sun' : 'fas fa-moon'
  );

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.loadTheme();
    
    // Effect para side effects automáticos
    effect(() => {
      this.applyThemeToDOM(this._isDarkMode());
      localStorage.setItem('tema', this.themeName());
    });
  }
}
```

### Características de los Signals Implementados

- **Signals Reactivos**: Actualizaciones automáticas de la UI
- **Computed Signals**: Valores derivados que se recalculan automáticamente
- **Effects**: Side effects controlados para persistencia y DOM
- **Signals de Solo Lectura**: Encapsulación del estado interno

## 🎨 Sistema de Temas Técnico

### Paleta de Colores CSS Custom Properties

```scss
// Tema claro (por defecto)
:root {
  --color-primario: #1C1678;
  --color-primario-alt: #8576FF;
  --color-acento: #7BC9FF;
  --color-acento-secundario: #A3FFD6;
  --color-fondo: #FFFFFF;
  --color-texto: #2C2C2C;
  --color-superficie: #F8F9FA;
}

// Tema oscuro (clase CSS dinámica)
.modo-oscuro {
  --color-fondo: #0F0B1F;
  --color-superficie: #1A1332;
  --color-primario: #A3FFD6;
  --color-acento: #7BC9FF;
  --color-texto: #FFFFFF;
}
```

### Implementación del Toggle de Tema

```typescript
// En el header component
toggleTheme(): void {
  this.themeService.toggleTheme();
}

// Template binding con signals
<i [class]="themeIcon()"></i>
```

## 📱 Sistema Responsivo

### Breakpoints CSS Grid

```scss
// Mobile First approach
.rejilla-proyectos {
  display: grid;
  gap: 2rem;
  
  // Mobile: 1 columna
  grid-template-columns: 1fr;
  
  // Tablet: 2 columnas
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  // Desktop: 3 columnas
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### Optimizaciones Responsivas

- **Imágenes adaptativas** con `object-fit: cover`
- **Tipografía escalable** con `clamp()` CSS
- **Espaciado relativo** con unidades `rem` y `em`
- **Touch targets** mínimos de 44px para dispositivos móviles

## 🎪 Sistema de Animaciones

### Intersection Observer Implementation

```typescript
@Injectable({
  providedIn: 'root'
})
export class ScrollAnimationService {
  private observer!: IntersectionObserver;

  private initObserver(): void {
    const options = {
      root: null,
      rootMargin: '-20% 0px',  // Trigger antes de que sea visible
      threshold: 0.1           // 10% del elemento visible
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // Animaciones específicas por sección
          if (entry.target.id === 'proyectos') {
            this.animateProjectCards(entry.target);
          }
        }
      });
    }, options);
  }
}
```

### CSS Animations Performantes

```scss
// Animaciones optimizadas con transform y opacity
.tarjeta-proyecto {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform, opacity;
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
}
```

## 🔧 Configuración del Proyecto

### Angular Configuration (angular.json)

- **Builder**: `@angular-devkit/build-angular:application`
- **Styles**: SCSS con soporte inline
- **Assets**: Gestión automática de archivos estáticos
- **TypeScript**: Configuración estricta

### TypeScript Configuration

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitAny": true
  }
}
```

## 📊 Interfaces y Tipos TypeScript

### Project Interface

```typescript
export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
}
```

### Datos del Portfolio

El portfolio incluye proyectos reales con implementaciones técnicas:

1. **Optimización Criptográfica con CUDA**
   - Implementación AES-CTR
   - Paralelización con CUDA
   - GitHub: [AES-CTR_CUDA](https://github.com/gamurigm/AES-CTR_CUDA)

2. **Distributed Load Balancer**
   - Arquitectura distribuida
   - Go y gRPC
   - GitHub: [Distributed_load_balancer](https://github.com/gamurigm/Distributed_load_balancer)

3. **AVLGraphic**
   - Visualización de estructuras de datos
   - C++ con algoritmos de balanceo
   - GitHub: [AVLGraphic](https://github.com/gamurigm/AVLGraphic)

## 🚀 Scripts de Desarrollo

### Comandos Disponibles

```bash
# Desarrollo local
npm start              # ng serve en puerto 4200
npm run watch          # Build en modo watch

# Producción
npm run build          # Build optimizado para producción

# Testing
npm test              # Jest/Jasmine tests unitarios
```

### Configuración de Desarrollo

- **Hot Module Replacement** habilitado
- **Source Maps** para debugging
- **Live Reload** automático
- **Error Overlay** en desarrollo

## 📦 Gestión de Dependencias

### Dependencies Core

```json
{
  "@angular/core": "^19.1.0",
  "@angular/common": "^19.1.0",
  "@angular/platform-browser": "^19.1.0",
  "rxjs": "~7.8.0",
  "tslib": "^2.3.0",
  "zone.js": "~0.15.0"
}
```

### Dev Dependencies

```json
{
  "@angular/cli": "^19.1.5",
  "@angular/compiler-cli": "^19.1.0",
  "typescript": "~5.7.2",
  "karma": "~6.4.0",
  "jasmine-core": "~5.5.0"
}
```

## 🔍 Performance y Optimizaciones

### Técnicas Implementadas

- **Lazy Loading** preparado para imágenes
- **OnPush Change Detection** compatible
- **Tree Shaking** automático con Angular CLI
- **CSS will-change** para animaciones performantes
- **Intersection Observer** para scroll eficiente

### Bundle Optimization

- **Minificación** automática en producción
- **Dead Code Elimination** con TypeScript
- **CSS Purging** de estilos no utilizados
- **Compression** con gzip/brotli

## 🧪 Testing Strategy

### Unit Testing Configuration

- **Karma** como test runner
- **Jasmine** como testing framework
- **Chrome Headless** para ejecución CI/CD
- **Coverage reports** integrados

### Testeable Components

Todos los componentes están estructurados para testing:

```typescript
// Ejemplo de test de signals
it('should toggle theme correctly', () => {
  const service = TestBed.inject(ThemeService);
  service.toggleTheme();
  expect(service.isDarkMode()).toBe(true);
});
```

## 🌐 Deployment y Producción

### Build de Producción

```bash
ng build --configuration=production
```

### Optimizaciones de Build

- **Ahead of Time (AOT)** compilation
- **Tree shaking** automático
- **Minificación** de CSS y JavaScript
- **Source maps** optimizados
- **Asset optimization** automática

### Hosting Compatible

- ✅ **GitHub Pages**
- ✅ **Netlify**
- ✅ **Vercel**
- ✅ **Firebase Hosting**
- ✅ **AWS S3 + CloudFront**

## 📞 Información de Contacto

**Gabriel Murillo Medina**
- 🎓 **Universidad**: Universidad de las Fuerzas Armadas ESPE
- 💼 **LinkedIn**: [@gamuridev](https://linkedin.com/in/gamuridev)
- 🐱 **GitHub**: [@gamurigm](https://github.com/gamurigm)
- 📧 **Email**: gamurigm@gmail.com

## 🎯 Funcionalidades Implementadas

### ✅ Completadas
- [x] **Standalone Components** sin módulos
- [x] **Angular Signals** para gestión de estado
- [x] **Sistema de temas** claro/oscuro
- [x] **Diseño responsivo** completo
- [x] **Animaciones de scroll** optimizadas
- [x] **Persistencia** de preferencias
- [x] **TypeScript estricto** configurado
- [x] **Performance optimizations** implementadas

### 🔄 Preparadas para Extensión
- [ ] **SSR (Server Side Rendering)** con Angular Universal
- [ ] **PWA** con Service Workers
- [ ] **Internacionalización** (i18n)
- [ ] **Formulario de contacto** funcional
- [ ] **Blog** integrado
- [ ] **SEO** avanzado

---

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**.

---

> **Nota**: Este proyecto cumple completamente con los requerimientos de una landing page profesional utilizando Angular 19, standalone components y signals, desarrollado como carta de presentación digital para mostrar datos personales, habilidades, experiencia y portafolio de proyectos con diseño completamente responsivo.

**⭐ Desarrollado con Angular 19 y las mejores prácticas de desarrollo frontend.**
