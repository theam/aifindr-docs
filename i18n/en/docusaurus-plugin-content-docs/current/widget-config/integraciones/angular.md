---
title: Angular
description: AIFindr widget integration in Angular applications with TypeScript
slug: /widget-config/integraciones/angular
sidebar_position: 2
---

:::info First time?
Read the [installation guide](../instalacion) first to understand the basics.
:::

# Angular

Complete integration of the AIFindr widget in Angular applications with TypeScript, routing, and state management.

## Installation

### 1. Script in index.html

Add the script in `src/index.html` before `</body>`:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>My Angular App</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
  <app-root></app-root>

  <!-- AIFindr Widget -->
  <script
    src="https://hub.aifindr.ai/widget.js"
    data-client-id="YOUR_CLIENT_ID"
    defer
  ></script>
</body>
</html>
```

### 2. TypeScript Typing

Create `src/types/aifindr.d.ts`:

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

## Angular Service

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
      // Retry if widget is not available yet
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

## Components

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
  @Input() label: string = 'Need help?';
  @Input() buttonClass: string = 'aifindr-btn';
}
```

### Header Component with context

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
        <h1>My App</h1>
        <app-aifindr-trigger
          label="Help"
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
    // Update context on every route change
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

## Router Integration

### Route Guard with context

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
    // Add route-specific context
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

### Usage in routing

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

## Advanced Usage

### Component with programmatic control

```typescript
// help-center.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AIFindrService } from '../services/aifindr.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-help-center',
  template: `
    <div class="help-center">
      <h2>Help Center</h2>

      <div class="help-options">
        <button (click)="openWithContext('faq')">
          View FAQ
        </button>
        <button (click)="openWithContext('contact')">
          Contact Support
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

### Interceptor for automatic context

```typescript
// aifindr-context.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AIFindrService } from '../services/aifindr.service';

@Injectable()
export class AIFindrContextInterceptor implements HttpInterceptor {

  constructor(private aifindr: AIFindrService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Add API call context
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

## Angular Troubleshooting

### Common problems

| Problem | Solution |
|----------|----------|
| `AIFindrWidget is not defined` | Verify the script is in `index.html` and use the service |
| Context not updating | Use `AIFindrService.isReady$` before calling methods |
| Conflicts with SSR | Check `typeof window !== 'undefined'` |
| TypeScript types | Add the `aifindr.d.ts` declaration file |

### Debug in development

```typescript
// In development, add logs
if (!environment.production) {
  window.AIFindrWidget.ready(() => {
    console.log('AIFindr ready');
    console.log('Initial context:', window.AIFindrWidget.getContext());
  });
}
```

## Next Steps

- [Visual customization](../personalizacion) for Angular Material styles
- [API Reference](../api-reference) for advanced methods
- [Context and metadata](../contexto-metadatos) for dynamic personalization
