---
title: Angular
description: Integración del widget de AIFindr en aplicaciones Angular con TypeScript
slug: /widget-config/integraciones/angular
sidebar_position: 2
---

:::info ¿Primera vez?
Lee la [guía de instalación](../instalacion) primero para entender los conceptos básicos.
:::

# Angular

Integración completa del widget de AIFindr en aplicaciones Angular con TypeScript, routing y manejo de estado.

## Instalación

### 1. Script en index.html

Añade el script en `src/index.html` antes de `</body>`:

```html
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Mi App Angular</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
  <app-root></app-root>
  
  <!-- Widget de AIFindr -->
  <script
    src="https://hub.aifindr.ai/widget.js"
    data-client-id="TU_CLIENT_ID"
    defer
  ></script>
</body>
</html>
```

### 2. Tipado TypeScript

Crea `src/types/aifindr.d.ts`:

```typescript
declare global {
  interface Window {
    AIFindrWidget: {
      ready: (callback: () => void) => void;
      open: () => void;
      close: () => void;
      toggle: () => void;
      setContext: (context: Record<string, any>) => void;
      mergeContext: (context: Record<string, any>) => void;
      getContext: () => Record<string, any>;
      on: (event: string, callback: Function) => void;
    };
  }
}

export {};
```

## Servicio Angular

### aifindr.service.ts

```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AIFindrService {
  private isReady = new BehaviorSubject<boolean>(false);
  public isReady$ = this.isReady.asObservable();

  constructor() {
    this.initWidget();
  }

  private initWidget(): void {
    if (typeof window !== 'undefined' && window.AIFindrWidget) {
      window.AIFindrWidget.ready(() => {
        this.isReady.next(true);
      });
    } else {
      // Reintentar si el widget no está disponible aún
      setTimeout(() => this.initWidget(), 100);
    }
  }

  open(): void {
    if (window.AIFindrWidget) {
      window.AIFindrWidget.open();
    }
  }

  close(): void {
    if (window.AIFindrWidget) {
      window.AIFindrWidget.close();
    }
  }

  toggle(): void {
    if (window.AIFindrWidget) {
      window.AIFindrWidget.toggle();
    }
  }

  setContext(context: Record<string, any>): void {
    if (window.AIFindrWidget) {
      window.AIFindrWidget.setContext(context);
    }
  }

  mergeContext(context: Record<string, any>): void {
    if (window.AIFindrWidget) {
      window.AIFindrWidget.mergeContext(context);
    }
  }

  getContext(): Record<string, any> {
    return window.AIFindrWidget ? window.AIFindrWidget.getContext() : {};
  }
}
```

## Componentes

### Trigger Component

```typescript
// aifindr-trigger.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-aifindr-trigger',
  template: `
    <button 
      id="ai-findr-trigger" 
      type="button" 
      [class]="buttonClass"
    >
      <ng-content>{{ label }}</ng-content>
    </button>
  `
})
export class AIFindrTriggerComponent {
  @Input() label: string = '¿Necesitas ayuda?';
  @Input() buttonClass: string = 'aifindr-btn';
}
```

### Header Component con contexto

```typescript
// header.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AIFindrService } from '../services/aifindr.service';

@Component({
  selector: 'app-header',
  template: `
    <header>
      <nav>
        <h1>Mi App</h1>
        <app-aifindr-trigger 
          label="Ayuda"
          buttonClass="help-button">
        </app-aifindr-trigger>
      </nav>
    </header>
  `
})
export class HeaderComponent implements OnInit {
  
  constructor(
    private router: Router,
    private aifindr: AIFindrService
  ) {}

  ngOnInit(): void {
    // Actualizar contexto en cada cambio de ruta
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateContext(event.url);
      }
    });
  }

  private updateContext(url: string): void {
    this.aifindr.mergeContext({
      current_route: url,
      timestamp: new Date().toISOString(),
      app_section: this.getSectionFromUrl(url)
    });
  }

  private getSectionFromUrl(url: string): string {
    if (url.includes('/dashboard')) return 'dashboard';
    if (url.includes('/profile')) return 'profile';
    if (url.includes('/settings')) return 'settings';
    return 'home';
  }
}
```

## Integración con Router

### Route Guard con contexto

```typescript
// aifindr-context.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AIFindrService } from '../services/aifindr.service';

@Injectable({
  providedIn: 'root'
})
export class AIFindrContextGuard implements CanActivate {
  
  constructor(private aifindr: AIFindrService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // Añadir contexto específico de la ruta
    const routeContext = {
      page: route.data?.['page'] || 'unknown',
      permissions: route.data?.['permissions'] || [],
      params: route.params
    };

    this.aifindr.mergeContext(routeContext);
    return true;
  }
}
```

### Uso en routing

```typescript
// app-routing.module.ts
const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AIFindrContextGuard],
    data: { page: 'dashboard', permissions: ['read_dashboard'] }
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AIFindrContextGuard],
    data: { page: 'profile' }
  }
];
```

## Uso avanzado

### Componente con control programático

```typescript
// help-center.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AIFindrService } from '../services/aifindr.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-help-center',
  template: `
    <div class="help-center">
      <h2>Centro de Ayuda</h2>
      
      <div class="help-options">
        <button (click)="openWithContext('faq')">
          Ver FAQ
        </button>
        <button (click)="openWithContext('contact')">
          Contactar Soporte
        </button>
        <button (click)="openWithContext('tutorial')">
          Tutorial
        </button>
      </div>
    </div>
  `
})
export class HelpCenterComponent implements OnInit, OnDestroy {
  private subscription?: Subscription;

  constructor(private aifindr: AIFindrService) {}

  ngOnInit(): void {
    this.subscription = this.aifindr.isReady$.subscribe(ready => {
      if (ready) {
        this.aifindr.setContext({
          page: 'help_center',
          available_options: ['faq', 'contact', 'tutorial']
        });
      }
    });
  }

  openWithContext(option: string): void {
    this.aifindr.mergeContext({
      help_option: option,
      clicked_at: new Date().toISOString()
    });
    this.aifindr.open();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
```

### Interceptor para contexto automático

```typescript
// aifindr-context.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AIFindrService } from '../services/aifindr.service';

@Injectable()
export class AIFindrContextInterceptor implements HttpInterceptor {
  
  constructor(private aifindr: AIFindrService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Añadir contexto de API calls
    if (req.url.includes('/api/')) {
      this.aifindr.mergeContext({
        last_api_call: req.url,
        api_method: req.method,
        timestamp: new Date().toISOString()
      });
    }

    return next.handle(req);
  }
}
```

## Troubleshooting Angular

### Problemas comunes

| Problema | Solución |
|----------|----------|
| `AIFindrWidget is not defined` | Verificar que el script esté en `index.html` y usar el servicio |
| Contexto no se actualiza | Usar `AIFindrService.isReady$` antes de llamar métodos |
| Conflictos con SSR | Verificar `typeof window !== 'undefined'` |
| Tipos TypeScript | Añadir el archivo de declaraciones `aifindr.d.ts` |

### Debug en desarrollo

```typescript
// En desarrollo, añadir logs
if (!environment.production) {
  window.AIFindrWidget.ready(() => {
    console.log('AIFindr listo');
    console.log('Contexto inicial:', window.AIFindrWidget.getContext());
  });
}
```

## Próximos pasos

- [Personalización visual](../personalizacion) para estilos Angular Material
- [API Reference](../api-reference) para métodos avanzados
- [Contexto y metadatos](../contexto-metadatos) para personalización dinámica
