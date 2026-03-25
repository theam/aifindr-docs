---
title: React Native
description: Integración del widget de AIFindr en apps React Native con react-native-webview
slug: /widget-config/integraciones/react-native
sidebar_position: 2
---

:::info ¿Primera vez?
Lee la [guía de instalación](../instalacion) primero para entender los conceptos básicos.
:::

# React Native

En React Native, la integración del widget se hace cargando una página HTML autocontenida dentro de un `WebView`. Ese HTML carga `https://hub.aifindr.ai/widget.js`, mantiene el trigger que el widget necesita y se comunica con la app nativa usando `window.ReactNativeWebView.postMessage(...)`.

:::info Patrón recomendado
El wrapper actual está pensado como flujo **auto-open-only**: el `WebView` monta el HTML, espera `AIFindrWidget.ready()` y abre el widget automáticamente con `AIFindrWidget.open()`.
:::

:::caution Entorno de prueba
La preview web no es el camino correcto para validar esta integración. Pruébala en un runtime nativo real: simulador iOS/Android, emulador o Expo Go.
:::

## Cómo se estructura la integración

- El `WebView` carga un HTML autocontenido.
- Ese HTML renderiza un trigger oculto con `id="ai-findr-trigger"` porque el widget lo espera internamente.
- El script del widget se configura con `data-client-id`, metadatos opcionales por `data-meta-*` y `variant` opcional por `data-var`.
- El contexto debe respetar `AIFindrWidget.ready()`: primero se encola y luego se aplica con `setContext()`.
- Los eventos del widget se escuchan con `AIFindrWidget.on(...)` y se reenvían a React Native con `window.ReactNativeWebView.postMessage(JSON.stringify({ type, payload }))`.

## Ejemplo base completo

```tsx
import React, { useRef } from 'react';
import { Button, SafeAreaView, View } from 'react-native';
import WebView, { WebViewMessageEvent } from 'react-native-webview';

const WIDGET_EVENTS = [
  'widget.ready',
  'widget.opened',
  'widget.closed',
  'widget.error',
  'conversation.started',
  'message.sent',
  'message.received',
] as const;

type WidgetMessage = {
  type: (typeof WIDGET_EVENTS)[number] | string;
  payload?: unknown;
};

function escapeHtmlAttribute(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildWidgetHtml({
  clientId,
  metadata,
  variant,
  initialContext,
}: {
  clientId: string;
  metadata?: Record<string, string>;
  variant?: string;
  initialContext?: Record<string, unknown>;
}) {
  const metadataAttributes = Object.entries(metadata ?? {})
    .map(([key, value]) => {
      return `data-meta-${key}="${escapeHtmlAttribute(String(value))}"`;
    })
    .join('\n      ');

  const variantAttribute =
    variant && variant.trim()
      ? `data-var="${escapeHtmlAttribute(variant)}"`
      : '';

  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width,initial-scale=1,viewport-fit=cover"
    />
    <style>
      html, body {
        margin: 0;
        padding: 0;
        background: #ffffff;
      }

      #ai-findr-trigger {
        position: absolute;
        width: 1px;
        height: 1px;
        opacity: 0;
        pointer-events: none;
      }
    </style>
  </head>
  <body>
    <button
      id="ai-findr-trigger"
      type="button"
      aria-hidden="true"
      tabindex="-1"
    >
      Abrir asistente
    </button>

    <script>
      (function () {
        var widgetReady = false;
        var pendingContext = ${JSON.stringify(initialContext ?? {})};
        var eventNames = ${JSON.stringify(WIDGET_EVENTS)};

        function postToNative(type, payload) {
          if (
            window.ReactNativeWebView &&
            typeof window.ReactNativeWebView.postMessage === 'function'
          ) {
            window.ReactNativeWebView.postMessage(
              JSON.stringify({ type: type, payload: payload })
            );
          }
        }

        function flushPendingContext() {
          if (!widgetReady || !window.AIFindrWidget || !pendingContext) {
            return;
          }

          window.AIFindrWidget.setContext(pendingContext);
          pendingContext = null;
        }

        window.__AIFINDR_BRIDGE__ = {
          setContext: function (nextContext) {
            pendingContext = nextContext || {};

            if (widgetReady && window.AIFindrWidget) {
              window.AIFindrWidget.setContext(pendingContext);
            }
          },
          mergeContext: function (partialContext) {
            if (!partialContext) {
              return;
            }

            if (!widgetReady || !window.AIFindrWidget) {
              pendingContext = Object.assign({}, pendingContext || {}, partialContext);
              return;
            }

            window.AIFindrWidget.mergeContext(partialContext);
          }
        };

        window.addEventListener('load', function () {
          if (!window.AIFindrWidget) {
            postToNative('widget.error', {
              message: 'AIFindrWidget no está disponible en window'
            });
            return;
          }

          eventNames.forEach(function (eventName) {
            window.AIFindrWidget.on(eventName, function (payload) {
              postToNative(eventName, payload);
            });
          });

          window.AIFindrWidget.ready(function () {
            widgetReady = true;
            flushPendingContext();
            window.AIFindrWidget.open();
          });
        });
      })();
    </script>

    <script
      src="https://hub.aifindr.ai/widget.js"
      data-client-id="${escapeHtmlAttribute(clientId)}"
      ${variantAttribute}
      ${metadataAttributes}
      defer
    ></script>
  </body>
</html>`;
}

export function AIFindrSupportScreen() {
  const webViewRef = useRef<WebView>(null);
  const htmlRef = useRef(
    buildWidgetHtml({
      clientId: 'TU_CLIENT_ID',
      variant: 'ar', // Ejemplo: variant en árabe
      metadata: {
        platform: 'react-native',
        environment: 'production',
        tenant: 'mobile-app',
      },
      initialContext: {
        source: 'native-app',
        appSection: 'support',
        locale: 'es-AR',
        userId: 'user_123',
      },
    })
  );
  const handleMessage = (event: WebViewMessageEvent) => {
    try {
      const message = JSON.parse(event.nativeEvent.data) as WidgetMessage;

      if (message.type === 'conversation.started') {
        console.log('Conversación iniciada:', message.payload);
      }

      if (message.type === 'widget.error') {
        console.warn('Error del widget:', message.payload);
      }
    } catch (error) {
      console.warn('Mensaje inválido desde el WebView:', error);
    }
  };

  const mergeWidgetContext = (partialContext: Record<string, unknown>) => {
    const serializedContext = JSON.stringify(partialContext);

    webViewRef.current?.injectJavaScript(`
      window.__AIFINDR_BRIDGE__?.mergeContext(${serializedContext});
      true;
    `);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Button
        title="Actualizar contexto"
        onPress={() =>
          mergeWidgetContext({
            currentScreen: 'checkout',
            cartTotal: 129.99,
            hasOpenTicket: false,
          })
        }
      />

      <View style={{ flex: 1 }}>
        <WebView
          ref={webViewRef}
          originWhitelist={['*']}
          source={{ html: htmlRef.current }}
          javaScriptEnabled
          onMessage={handleMessage}
        />
      </View>
    </SafeAreaView>
  );
}
```

### Qué resuelve este patrón

- Mantiene un trigger oculto con `id="ai-findr-trigger"` para cumplir la expectativa del widget.
- Respeta `AIFindrWidget.ready()` antes de aplicar contexto.
- Encola el contexto inicial y lo aplica con `setContext()` cuando el widget ya está listo.
- Reenvía a React Native los eventos `widget.ready`, `widget.opened`, `widget.closed`, `widget.error`, `conversation.started`, `message.sent` y `message.received`.
- Permite fijar una `variant` concreta con `data-var="ar"`. En este ejemplo, `ar` representa una variante en árabe. Si omites `data-var` o lo envías vacío, se usa la vista por defecto del proyecto. Salvo que tengas una `variant` específica configurada, normalmente no hace falta enviarlo.

## Actualizar contexto desde React Native

Si el estado de la app cambia después de montar el `WebView`, actualiza el contexto usando `injectJavaScript(...)` contra el bridge interno:

```tsx
function runInWidget(
  method: 'setContext' | 'mergeContext',
  payload: Record<string, unknown>
) {
  const serializedPayload = JSON.stringify(payload);

  webViewRef.current?.injectJavaScript(`
    window.__AIFINDR_BRIDGE__?.${method}(${serializedPayload});
    true;
  `);
}

runInWidget('setContext', {
  userId: 'user_123',
  plan: 'pro',
  currentScreen: 'account',
});

runInWidget('mergeContext', {
  currentScreen: 'checkout',
  cartItems: 3,
});
```

Usa `setContext()` cuando quieras reemplazar todo el contexto y `mergeContext()` para añadir o actualizar claves concretas.

## Reenviar eventos del widget a React Native

El bridge del HTML puede reenviar cualquier evento soportado por el widget. Este es el patrón base:

```js
var eventNames = [
  'widget.ready',
  'widget.opened',
  'widget.closed',
  'widget.error',
  'conversation.started',
  'message.sent',
  'message.received'
];

eventNames.forEach(function (eventName) {
  window.AIFindrWidget.on(eventName, function (payload) {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({ type: eventName, payload: payload })
    );
  });
});
```

En React Native, captura esos mensajes con `onMessage` para analítica, logging o sincronización de UI nativa.

## Ajustes visuales opcionales

Si quieres que la pantalla nativa controle totalmente el cierre, puedes ocultar el botón interno del widget con CSS:

```css
.ai-findr-close-button {
  display: none !important;
}
```

Hazlo solo si tu flujo nativo ya ofrece una salida clara para cerrar o desmontar la vista.

## Troubleshooting React Native

| Problema | Solución |
|----------|----------|
| El contexto se actualiza antes de `ready()` | No llames `setContext()` directamente desde React Native. Encola el contexto y aplícalo dentro de `AIFindrWidget.ready()` |
| El `WebView` se recarga en cada render | Mantén el HTML estable con `useRef` para no regenerar `source={{ html }}` en cada render |
| Se pierde el estado del widget al desmontar la pantalla | Evita desmontar/remontar el `WebView` si quieres conservar la conversación; mantén viva la vista o el contenedor |
| No llegan eventos al lado nativo | Verifica que existe `onMessage` en el `WebView` y que el HTML llama `window.ReactNativeWebView.postMessage(...)` |
| La integración parece rota en web | No la valides en preview web. Usa simulador, emulador, dispositivo físico o Expo Go |

## Próximos pasos

- [Contexto y metadatos](../contexto-metadatos) para separar datos fijos y dinámicos correctamente
- [Personalización visual](../personalizacion) para estilos y variants
- [API Reference](../api-reference) para ampliar el uso de métodos y eventos
