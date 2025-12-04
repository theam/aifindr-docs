---
title: React & Next.js
description: Widget integration in React or Next.js projects with optimized hooks
slug: /widget-config/integrations/react-nextjs
sidebar_position: 1
---

:::info First time?
Read the [installation guide](../instalacion) first to understand the basics.
:::

# React & Next.js

Complete integration of the AIFindr widget in React and Next.js applications with custom hooks, state management, and SSR.

## React (CRA, Vite, etc.)

### 1. Script in index.html

Add the script in `public/index.html` before `</body>`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>My React App</title>
  </head>
  <body>
    <noscript>You need JavaScript to run this app.</noscript>
    <div id="root"></div>

    <!-- AIFindr Widget -->
    <script
      src="https://hub.aifindr.ai/widget.js"
      data-client-id="YOUR_CLIENT_ID"
      defer
    ></script>
  </body>
</html>
```

### 2. Custom Hook

Create `hooks/useAIFindr.ts`:

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
        // Retry if widget is not available
        setTimeout(initWidget, 100);
      }
    };

    initWidget();
  }, []);

  // Update context when it changes
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

### 1. Script with Next.js Script

In `pages/_app.tsx` or `app/layout.tsx`:

```tsx
import Script from 'next/script';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />

      <Script
        src="https://hub.aifindr.ai/widget.js"
        data-client-id="YOUR_CLIENT_ID"
        strategy="afterInteractive"
      />
    </>
  );
}
```

### 2. Provider Context

Create `context/AIFindrProvider.tsx`:

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

          // Initial context
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

  // Update context on route changes
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
    throw new Error('useAIFindrContext must be used within AIFindrProvider');
  }
  return context;
}
```

## Components

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

### Header with context

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
        <h1>My App</h1>
        <AIFindrTrigger
          className="help-button"
          onClick={handleHelpClick}
        >
          Need help?
        </AIFindrTrigger>
      </nav>
    </header>
  );
}
```

## Advanced Usage

### Hook with local state

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

### Page component with specific context

```tsx
// pages/dashboard.tsx (Next.js) or components/Dashboard.tsx (React)
import { useEffect } from 'react';
import { useAIFindr } from '../hooks/useAIFindr';

export default function Dashboard() {
  const { mergeContext, setContext } = useAIFindr();

  useEffect(() => {
    // Dashboard-specific context
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
        View Analytics
      </button>
      {/* Rest of content */}
    </div>
  );
}
```

### Hook for SSR/SSG (Next.js)

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

## React/Next.js Troubleshooting

### Common problems

| Problem | Solution |
|----------|----------|
| Widget doesn't load on SSR | Use `useEffect` and check `typeof window !== 'undefined'` |
| Hook runs before script | Add retry logic in `useAIFindr` |
| Context not updating | Use correct dependencies in `useEffect` |
| Hydration mismatch | Use `useAIFindrSSR` for SSR/CSR handling |

### Debug in development

```tsx
// In development
if (process.env.NODE_ENV === 'development') {
  useEffect(() => {
    if (window.AIFindrWidget) {
      window.AIFindrWidget.ready(() => {
        console.log('AIFindr ready');
        console.log('Context:', window.AIFindrWidget.getContext());
      });
    }
  }, []);
}
```

## Next Steps

- [Visual customization](../personalizacion) for styles with CSS-in-JS
- [API Reference](../api-reference) for advanced methods
- [Context and metadata](../contexto-metadatos) for dynamic personalization
