---
title: React & Next.js
description: Integración del widget en proyectos React o Next.js con hooks optimizados
slug: /widget-config/integraciones/react-nextjs
sidebar_position: 1
---

:::info ¿Primera vez?
Lee la [guía de instalación](../instalacion) primero para entender los conceptos básicos.
:::

# React & Next.js

Integración completa del widget de AIFindr en aplicaciones React y Next.js con hooks personalizados, manejo de estado y SSR.

## React (CRA, Vite, etc.)

### 1. Script en index.html

Añade el script en `public/index.html` antes de `</body>`:

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Mi App React</title>
  </head>
  <body>
    <noscript>Necesitas JavaScript para ejecutar esta app.</noscript>
    <div id="root"></div>
    
    <!-- Widget de AIFindr -->
    <script
      src="https://hub.aifindr.ai/widget.js"
      data-client-id="TU_CLIENT_ID"
      defer
    ></script>
  </body>
</html>
```

### 2. Hook personalizado

Crea `hooks/useAIFindr.ts`:

```typescript
import { useEffect, useCallback, useRef } from 'react';

interface AIFindrWidget {
  ready: (callback: () => void) => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
  setContext: (context: Record<string, any>) => void;
  mergeContext: (context: Record<string, any>) => void;
  getContext: () => Record<string, any>;
  on: (event: string, callback: Function) => void;
}

declare global {
  interface Window {
    AIFindrWidget?: AIFindrWidget;
  }
}

interface UseAIFindrOptions {
  context?: Record<string, any>;
  autoSetContext?: boolean;
}

export function useAIFindr(options: UseAIFindrOptions = {}) {
  const { context, autoSetContext = true } = options;
  const isReady = useRef(false);
  const widget = useRef<AIFindrWidget | null>(null);

  useEffect(() => {
    const initWidget = () => {
      if (window.AIFindrWidget) {
        widget.current = window.AIFindrWidget;
        
        window.AIFindrWidget.ready(() => {
          isReady.current = true;
          
          if (autoSetContext && context) {
            window.AIFindrWidget?.mergeContext(context);
          }
        });
      } else {
        // Reintentar si el widget no está disponible
        setTimeout(initWidget, 100);
      }
    };

    initWidget();
  }, []);

  // Actualizar contexto cuando cambie
  useEffect(() => {
    if (isReady.current && autoSetContext && context) {
      window.AIFindrWidget?.mergeContext(context);
    }
  }, [context, autoSetContext]);

  const open = useCallback(() => {
    window.AIFindrWidget?.open();
  }, []);

  const close = useCallback(() => {
    window.AIFindrWidget?.close();
  }, []);

  const toggle = useCallback(() => {
    window.AIFindrWidget?.toggle();
  }, []);

  const setContext = useCallback((newContext: Record<string, any>) => {
    window.AIFindrWidget?.setContext(newContext);
  }, []);

  const mergeContext = useCallback((newContext: Record<string, any>) => {
    window.AIFindrWidget?.mergeContext(newContext);
  }, []);

  const getContext = useCallback(() => {
    return window.AIFindrWidget?.getContext() || {};
  }, []);

  return {
    open,
    close,
    toggle,
    setContext,
    mergeContext,
    getContext,
    isReady: isReady.current
  };
}
```

## Next.js

### 1. Script con Next.js Script

En `pages/_app.tsx` o `app/layout.tsx`:

```tsx
import Script from 'next/script';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      
      <Script
        src="https://hub.aifindr.ai/widget.js"
        data-client-id="TU_CLIENT_ID"
        strategy="afterInteractive"
      />
    </>
  );
}
```

### 2. Provider Context

Crea `context/AIFindrProvider.tsx`:

```tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface AIFindrContextType {
  isReady: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  setContext: (context: Record<string, any>) => void;
  mergeContext: (context: Record<string, any>) => void;
}

const AIFindrContext = createContext<AIFindrContextType | null>(null);

export function AIFindrProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const initWidget = () => {
      if (window.AIFindrWidget) {
        window.AIFindrWidget.ready(() => {
          setIsReady(true);
          
          // Contexto inicial
          window.AIFindrWidget.setContext({
            framework: 'nextjs',
            route: router.pathname,
            timestamp: new Date().toISOString()
          });
        });
      } else {
        setTimeout(initWidget, 100);
      }
    };

    initWidget();
  }, []);

  // Actualizar contexto en cambios de ruta
  useEffect(() => {
    if (isReady) {
      window.AIFindrWidget?.mergeContext({
        route: router.pathname,
        query: router.query,
        updated_at: new Date().toISOString()
      });
    }
  }, [router.pathname, router.query, isReady]);

  const contextValue: AIFindrContextType = {
    isReady,
    open: () => window.AIFindrWidget?.open(),
    close: () => window.AIFindrWidget?.close(),
    toggle: () => window.AIFindrWidget?.toggle(),
    setContext: (context) => window.AIFindrWidget?.setContext(context),
    mergeContext: (context) => window.AIFindrWidget?.mergeContext(context)
  };

  return (
    <AIFindrContext.Provider value={contextValue}>
      {children}
    </AIFindrContext.Provider>
  );
}

export function useAIFindrContext() {
  const context = useContext(AIFindrContext);
  if (!context) {
    throw new Error('useAIFindrContext debe usarse dentro de AIFindrProvider');
  }
  return context;
}
```

## Componentes

### Trigger Component

```tsx
// components/AIFindrTrigger.tsx
import React from 'react';

interface AIFindrTriggerProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function AIFindrTrigger({ 
  children, 
  className = '', 
  onClick 
}: AIFindrTriggerProps) {
  return (
    <button
      id="ai-findr-trigger"
      type="button"
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

### Header con contexto

```tsx
// components/Header.tsx
import { AIFindrTrigger } from './AIFindrTrigger';
import { useAIFindr } from '../hooks/useAIFindr';

export function Header() {
  const { mergeContext } = useAIFindr({
    context: {
      component: 'header',
      user_action: 'viewing_navigation'
    }
  });

  const handleHelpClick = () => {
    mergeContext({
      help_source: 'header_button',
      clicked_at: new Date().toISOString()
    });
  };

  return (
    <header className="header">
      <nav>
        <h1>Mi App</h1>
        <AIFindrTrigger 
          className="help-button"
          onClick={handleHelpClick}
        >
          ¿Necesitas ayuda?
        </AIFindrTrigger>
      </nav>
    </header>
  );
}
```

## Uso avanzado

### Hook con estado local

```tsx
// hooks/useAIFindrWithState.ts
import { useState, useCallback } from 'react';
import { useAIFindr } from './useAIFindr';

interface UserState {
  isLoggedIn: boolean;
  userType: 'free' | 'premium' | 'enterprise';
  currentPlan?: string;
}

export function useAIFindrWithState(userState: UserState) {
  const [isOpen, setIsOpen] = useState(false);
  
  const { open, close, toggle, mergeContext } = useAIFindr({
    context: {
      user_logged_in: userState.isLoggedIn,
      user_type: userState.userType,
      current_plan: userState.currentPlan
    }
  });

  const openWithState = useCallback(() => {
    setIsOpen(true);
    mergeContext({
      opened_at: new Date().toISOString(),
      user_state: userState
    });
    open();
  }, [open, mergeContext, userState]);

  const closeWithState = useCallback(() => {
    setIsOpen(false);
    close();
  }, [close]);

  return {
    isOpen,
    open: openWithState,
    close: closeWithState,
    toggle,
    mergeContext
  };
}
```

### Componente de página con contexto específico

```tsx
// pages/dashboard.tsx (Next.js) o components/Dashboard.tsx (React)
import { useEffect } from 'react';
import { useAIFindr } from '../hooks/useAIFindr';

export default function Dashboard() {
  const { mergeContext, setContext } = useAIFindr();

  useEffect(() => {
    // Contexto específico del dashboard
    setContext({
      page: 'dashboard',
      available_actions: ['view_analytics', 'manage_settings', 'export_data'],
      user_permissions: ['read', 'write'],
      last_visit: localStorage.getItem('lastDashboardVisit') || 'first_time'
    });
  }, [setContext]);

  const handleAnalyticsView = () => {
    mergeContext({
      viewing: 'analytics',
      timestamp: new Date().toISOString()
    });
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <button onClick={handleAnalyticsView}>
        Ver Analytics
      </button>
      {/* Resto del contenido */}
    </div>
  );
}
```

### Hook para SSR/SSG (Next.js)

```tsx
// hooks/useAIFindrSSR.ts
import { useEffect, useState } from 'react';

export function useAIFindrSSR() {
  const [isClient, setIsClient] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const initWidget = () => {
      if (window.AIFindrWidget) {
        window.AIFindrWidget.ready(() => {
          setIsReady(true);
        });
      } else {
        setTimeout(initWidget, 100);
      }
    };

    initWidget();
  }, [isClient]);

  return {
    isClient,
    isReady,
    widget: isClient && isReady ? window.AIFindrWidget : null
  };
}
```

## Troubleshooting React/Next.js

### Problemas comunes

| Problema | Solución |
|----------|----------|
| Widget no se carga en SSR | Usar `useEffect` y verificar `typeof window !== 'undefined'` |
| Hook se ejecuta antes del script | Añadir lógica de retry en `useAIFindr` |
| Contexto no se actualiza | Usar dependencias correctas en `useEffect` |
| Hydration mismatch | Usar `useAIFindrSSR` para manejo SSR/CSR |

### Debug en desarrollo

```tsx
// En desarrollo
if (process.env.NODE_ENV === 'development') {
  useEffect(() => {
    if (window.AIFindrWidget) {
      window.AIFindrWidget.ready(() => {
        console.log('AIFindr listo');
        console.log('Contexto:', window.AIFindrWidget.getContext());
      });
    }
  }, []);
}
```

## Próximos pasos

- [Personalización visual](../personalizacion) para estilos con CSS-in-JS
- [API Reference](../api-reference) para métodos avanzados  
- [Contexto y metadatos](../contexto-metadatos) para personalización dinámica
