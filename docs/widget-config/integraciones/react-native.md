---
title: React Native
description: Integración del widget de AIFindr en apps React Native con react-native-webview
slug: /widget-config/integraciones/react-native
sidebar_position: 2
---

:::info ¿Primera vez?
Lee la [guía de instalación](../instalacion.md) primero para entender los conceptos básicos.
:::

# React Native

En React Native, la integración del widget se hace cargando una página HTML autocontenida dentro de un `WebView`. Una forma práctica de organizarlo es separar:

- un builder HTML que vive dentro del `WebView`
- un wrapper `AIFindrWebView` que carga ese HTML y expone una forma segura de actualizar contexto desde React Native

Puedes adaptar esta lógica a la estructura que ya tenga tu app. Los nombres de archivos y componentes en esta guía son solo ejemplos.

:::info Patrón recomendado
El flujo actual es **auto-open-only**: el HTML renderiza un trigger oculto con `id="ai-findr-trigger"`, espera `AIFindrWidget.ready()` y abre el widget automáticamente con `AIFindrWidget.open()`.
:::

:::caution Entorno de prueba
No pruebes esta integración en la preview web. `react-native-webview` necesita un runtime nativo: Expo Go, simulador iOS, emulador Android o dispositivo físico.
:::

## 1. Construir el HTML del widget

La parte delicada está en el HTML que vive dentro del `WebView`: trigger oculto, `data-client-id`, metadatos por `data-meta-*`, `data-var` opcional, `data-widget-url` opcional, cola de contexto hasta `ready()` y bridge de eventos hacia React Native.

```ts
export type AIFindrMetadata = Record<
  string,
  string | number | boolean | null | undefined
>;
export type AIFindrInitialContext = Record<string, unknown>;

export const WIDGET_BASE_URL = 'https://hub.aifindr.ai/';
const WIDGET_SCRIPT = `${WIDGET_BASE_URL}widget.js`;

function escapeHTMLAttribute(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function buildWidgetHTML(
  clientId: string,
  metadata?: AIFindrMetadata,
  options?: {
    hideCloseButton?: boolean;
    initialContext?: AIFindrInitialContext;
    /** Ejemplo: "ar" para una variant en árabe. Omite este valor para usar la vista por defecto del proyecto. */
    variant?: string;
    /** Ejemplo: "https://hub.ksa.aifindr.ai". Solo úsalo si el equipo de AIFindr te indica apuntar a otro hub. */
    widgetUrl?: string;
  }
): string {
  const metadataAttributes = Object.entries(metadata ?? {})
    .filter(([key, value]) => {
      return value !== undefined && value !== null && key.trim() !== '';
    })
    .map(([key, value]) => {
      return `data-meta-${key}="${escapeHTMLAttribute(String(value))}"`;
    })
    .join('\n          ');

  const shouldHideCloseButton = options?.hideCloseButton ?? false;
  const initialContext = options?.initialContext ?? null;
  const variant = options?.variant ?? '';
  const widgetUrl = options?.widgetUrl ?? '';

  const widgetBootstrapScript = `
    <script>
      (function () {
        var initialContext = ${JSON.stringify(initialContext)};
        var pendingContext = typeof window.__AIFindrPendingContext === 'undefined'
          ? initialContext
          : window.__AIFindrPendingContext;
        var eventNames = [
          'widget.opened',
          'widget.closed',
          'widget.error',
          'conversation.started',
          'message.sent',
          'message.received'
        ];

        function postEventToReactNative(type, payload) {
          if (
            !window.ReactNativeWebView ||
            typeof window.ReactNativeWebView.postMessage !== 'function'
          ) {
            return;
          }

          var message = payload === undefined
            ? { type: type }
            : { type: type, payload: payload };

          window.ReactNativeWebView.postMessage(JSON.stringify(message));
        }

        var contextBridge = {
          pendingContext: pendingContext,
          isReady: false,
          hasAutoOpened: false,
          readyEventPosted: false,
          widgetEventListenersRegistered: false,
          flushPendingContext: function () {
            if (
              !this.isReady ||
              this.pendingContext === null ||
              typeof window.AIFindrWidget === 'undefined' ||
              typeof window.AIFindrWidget.setContext !== 'function'
            ) {
              return;
            }

            window.AIFindrWidget.setContext(this.pendingContext);
            this.pendingContext = null;
            window.__AIFindrPendingContext = null;
          },
          setPendingContext: function (context) {
            this.pendingContext = context;
            window.__AIFindrPendingContext = context;
            this.flushPendingContext();
          },
          registerWidgetEventListeners: function () {
            if (
              this.widgetEventListenersRegistered ||
              typeof window.AIFindrWidget === 'undefined' ||
              typeof window.AIFindrWidget.on !== 'function'
            ) {
              return;
            }

            this.widgetEventListenersRegistered = true;

            eventNames.forEach(function (eventName) {
              window.AIFindrWidget.on(eventName, function (payload) {
                postEventToReactNative(eventName, payload);
              });
            });
          }
        };

        window.__AIFindrContextBridge = contextBridge;

        function registerReadyCallback() {
          if (
            typeof window.AIFindrWidget === 'undefined' ||
            typeof window.AIFindrWidget.ready !== 'function'
          ) {
            return;
          }

          window.AIFindrWidget.ready(function () {
            contextBridge.isReady = true;
            contextBridge.registerWidgetEventListeners();
            contextBridge.flushPendingContext();

            if (!contextBridge.readyEventPosted) {
              contextBridge.readyEventPosted = true;
              postEventToReactNative('widget.ready');
            }

            if (!contextBridge.hasAutoOpened) {
              contextBridge.hasAutoOpened = true;
              Promise.resolve(window.AIFindrWidget.open()).catch(function () {});
            }
          });
        }

        var loader = document.getElementById('aifindr-loader');
        if (loader) {
          loader.addEventListener('load', registerReadyCallback);
        }

        window.addEventListener('load', registerReadyCallback);
        registerReadyCallback();
      })();
    </script>
  `;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        >
        <base href="${WIDGET_BASE_URL}">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { height: 100vh; overflow: hidden; background: #fff; }
          #ai-findr-trigger,
          .ai-findr-trigger-button {
            position: absolute !important;
            width: 1px !important;
            height: 1px !important;
            opacity: 0 !important;
            pointer-events: none !important;
          }
          ${
            shouldHideCloseButton
              ? `
          .ai-findr-close-button {
            display: none !important;
            opacity: 0 !important;
            pointer-events: none !important;
            visibility: hidden !important;
          }
          `
              : ''
          }
        </style>
      </head>
      <body>
        <div id="ai-findr-trigger" aria-hidden="true"></div>

        <script
          id="aifindr-loader"
          src="${WIDGET_SCRIPT}"
          data-client-id="${escapeHTMLAttribute(clientId)}"
          ${widgetUrl ? `data-widget-url="${escapeHTMLAttribute(widgetUrl)}"` : ''}
          ${variant ? `data-var="${escapeHTMLAttribute(variant)}"` : ''}
          ${metadataAttributes}
          defer
        ></script>

        ${widgetBootstrapScript}
      </body>
    </html>
  `;
}
```

### Qué hace este HTML

- Sigue cargando el widget oficial desde `https://hub.aifindr.ai/widget.js`
- Mantiene el trigger oculto con `id="ai-findr-trigger"` porque el widget lo necesita
- Pasa metadatos estáticos como atributos `data-meta-*`
- Permite pasar `data-widget-url` si el equipo te pide apuntar a otro hub
- Encola el contexto hasta que `AIFindrWidget.ready()` dispara y entonces llama `setContext()`
- Reenvía eventos a React Native con `window.ReactNativeWebView.postMessage(...)`

## 2. Envolver el `WebView` en React Native

Este wrapper es código de tu app nativa, no una API oficial adicional del widget. Internamente sigue usando `AIFindrWidget.ready()`, `setContext()` y `AIFindrWidget.on(...)`.

```tsx
import React, { useCallback, useRef } from 'react';
import { Platform, Text, View } from 'react-native';

import {
  AIFindrInitialContext,
  AIFindrMetadata,
  buildWidgetHTML,
  WIDGET_BASE_URL,
} from './aifindrWidgetHTML';

export type WidgetEventType =
  | 'widget.ready'
  | 'widget.opened'
  | 'widget.closed'
  | 'widget.error'
  | 'conversation.started'
  | 'message.sent'
  | 'message.received';

export type WidgetEvent = {
  type: WidgetEventType;
  payload?: unknown;
};

export interface AIFindrWebViewProps {
  clientId: string;
  metadata?: AIFindrMetadata;
  initialContext?: AIFindrInitialContext;
  variant?: string;
  widgetUrl?: string;
  hideCloseButton?: boolean;
  onWidgetEvent?: (event: WidgetEvent) => void;
}

export interface AIFindrWebViewRef {
  updateContext: (context: Record<string, unknown>) => void;
}

type NativeWebViewHandle = {
  injectJavaScript: (script: string) => void;
};

const NativeWebView =
  Platform.OS === 'web' ? null : require('react-native-webview').WebView;

const AIFindrWebView = React.forwardRef<AIFindrWebViewRef, AIFindrWebViewProps>(
  ({ clientId, metadata, initialContext, variant, widgetUrl, hideCloseButton = false, onWidgetEvent }, ref) => {
    const webViewRef = useRef<NativeWebViewHandle | null>(null);

    const updateContext = useCallback((context: Record<string, unknown>) => {
      const script = `
        (function () {
          var nextContext = ${JSON.stringify(context)};
          var contextBridge = window.__AIFindrContextBridge;

          if (contextBridge && typeof contextBridge.setPendingContext === 'function') {
            contextBridge.setPendingContext(nextContext);
            return true;
          }

          window.__AIFindrPendingContext = nextContext;
          return true;
        })();
      `;

      webViewRef.current?.injectJavaScript(script);
    }, []);

    React.useImperativeHandle(ref, () => ({ updateContext }), [updateContext]);

    if (!NativeWebView) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <Text>
            Abre esta pantalla en Expo Go, simulador iOS o emulador Android para probar
            la integración real.
          </Text>
        </View>
      );
    }

    const WebViewComponent = NativeWebView as any;

    return (
      <WebViewComponent
        ref={webViewRef}
        source={{
          html: buildWidgetHTML(clientId, metadata, {
            hideCloseButton,
            initialContext,
            variant,
            widgetUrl,
          }),
          baseUrl: WIDGET_BASE_URL,
        }}
        originWhitelist={['*']}
        javaScriptEnabled
        domStorageEnabled
        onMessage={(event: { nativeEvent: { data: string } }) => {
          try {
            onWidgetEvent?.(JSON.parse(event.nativeEvent.data));
          } catch {}
        }}
        style={{ flex: 1 }}
      />
    );
  }
);

AIFindrWebView.displayName = 'AIFindrWebView';

export default AIFindrWebView;
```

### Qué expone este wrapper

- `metadata`: datos fijos que terminan como `data-meta-*`
- `initialContext`: contexto inicial que el HTML encola hasta `ready()`
- `widgetUrl`: se traduce a `data-widget-url` si el equipo te pide apuntar a otro hub
- `updateContext(...)`: puente desde React Native hacia `setContext()`
- `onWidgetEvent`: eventos reenviados desde `AIFindrWidget.on(...)`
- `hideCloseButton`: forma práctica de ocultar `.ai-findr-close-button`

## 3. Caso práctico: una pantalla que abre el widget

Si tu app usa tabs, stacks o navegación interna, un patrón útil es mantener el `WebView` montado y solo ocultarlo visualmente cuando no está activo. Eso evita recargas y evita que iOS cierre el proceso del `WKWebView`.

```tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';

import AIFindrWebView, {
  AIFindrWebViewRef,
  WidgetEvent,
} from '@/components/AIFindrWebView';

const WIDGET_METADATA = {
  'user-id': 'user-12345',
  tenant: 'mobile-app',
} as const;

const WIDGET_INITIAL_CONTEXT = {
  entrypoint: 'home',
} as const;

export default function HomeScreen() {
  const webViewRef = React.useRef<AIFindrWebViewRef>(null);
  const [activeTab, setActiveTab] = React.useState<'home' | 'plus-ai' | 'profile'>('home');

  const handleTabPress = React.useCallback(
    (tab: 'home' | 'plus-ai' | 'profile') => {
      if (tab === 'plus-ai' && activeTab !== 'plus-ai') {
        webViewRef.current?.updateContext({
          entrypoint: activeTab,
        });
      }

      setActiveTab(tab);
    },
    [activeTab]
  );

  const handleWidgetEvent = React.useCallback((event: WidgetEvent) => {
    console.log(event);
  }, []);

  return (
    <View style={styles.fill}>
      <View style={styles.fill} pointerEvents={activeTab === 'plus-ai' ? 'auto' : 'none'}>
        <View style={[styles.fill, activeTab !== 'plus-ai' && styles.invisible]}>
          <AIFindrWebView
            ref={webViewRef}
            clientId="TU_CLIENT_ID"
            metadata={WIDGET_METADATA}
            initialContext={WIDGET_INITIAL_CONTEXT}
            onWidgetEvent={handleWidgetEvent}
            hideCloseButton
          />
        </View>
      </View>

      {activeTab !== 'plus-ai' && (
        <View style={StyleSheet.absoluteFillObject}>
          {/* Resto de contenido de la app */}
        </View>
      )}

      {/* En tu UI real, abre la vista del widget desde tu navegación */}
    </View>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  invisible: {
    opacity: 0,
  },
});
```

### Por qué este ejemplo es más estable

- `WIDGET_METADATA` y `WIDGET_INITIAL_CONTEXT` viven fuera del render, así el HTML no se regenera en cada render
- `updateContext(...)` se ejecuta antes de cambiar a la tab del widget, por lo que el contexto ya está listo cuando el chat se abre
- el `WebView` no se desmonta al cambiar de tab

Si tu app no usa tabs, quédate con la misma idea base: no recrees el `WebView` sin necesidad y actualiza el contexto antes de abrir o mostrar el widget.

## `variant` es opcional

Si necesitas forzar una `variant` concreta, añádela en el wrapper:

```tsx
<AIFindrWebView
  clientId="TU_CLIENT_ID"
  variant="ar"
/>
```

- `variant="ar"` es solo un ejemplo de una `variant` en árabe
- si omites `variant` o lo dejas vacío, el widget usa la vista por defecto del proyecto
- si no has configurado una `variant` específica, normalmente no necesitas enviarla

## `widgetUrl` solo si lo indica el equipo

Si el equipo de AIFindr te pide apuntar el widget a otro hub, pásalo al wrapper para que termine como `data-widget-url` en el `<script>` interno del `WebView`:

```tsx
<AIFindrWebView
  clientId="TU_CLIENT_ID"
  widgetUrl="https://hub.ksa.aifindr.ai"
/>
```

- `widgetUrl="https://hub.ksa.aifindr.ai"` es solo un ejemplo
- no cambies este valor salvo que el equipo de AIFindr te lo indique

## Eventos que conviene reenviar a React Native

Los eventos más útiles para bridgear son:

- `widget.ready`
- `widget.opened`
- `widget.closed`
- `widget.error`
- `conversation.started`
- `message.sent`
- `message.received`

## Troubleshooting React Native

| Problema | Solución |
|----------|----------|
| Lo pruebas en web y no funciona | Usa Expo Go, simulador iOS, emulador Android o dispositivo físico |
| El `WebView` se recarga al cambiar de tab | No lo desmontes. Mantenlo montado y ocúltalo con `opacity: 0` y `pointerEvents: 'none'` |
| El contexto se pierde antes de `ready()` | Encola el contexto en `window.__AIFindrContextBridge` y haz `setContext()` solo cuando el widget ya esté listo |
| El `WebView` se recarga en cada render de React | No crees `metadata` ni `initialContext` inline dentro del render |
| El widget abre con el `entrypoint` equivocado | Llama `updateContext(...)` antes de cambiar a la tab del widget |
| No llegan eventos al lado nativo | Verifica `onMessage` en el `WebView` y `window.ReactNativeWebView.postMessage(...)` dentro del HTML |

## Próximos pasos

- [Contexto y metadatos](../contexto-metadatos.md) para separar bien datos fijos y dinámicos
- [Personalización visual](../personalizacion.md) para estilos y `variants`
- [API Reference](../javascript-api.md) para ampliar el uso de métodos y eventos
- [Ejemplo completo en GitHub](https://github.com/theam/aifindr-react-native-webview-example) si necesitas una implementación más extensa
