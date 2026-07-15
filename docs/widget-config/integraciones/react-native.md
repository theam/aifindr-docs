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
    /** Actívalo solo cuando la app tenga un handler real para navigation.request. */
    nativeNavigationEnabled?: boolean;
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
  const nativeNavigationEnabled = options?.nativeNavigationEnabled ?? false;
  const variant = options?.variant ?? '';
  const widgetUrl = options?.widgetUrl ?? '';

  const widgetBootstrapScript = `
    <script>
      (function () {
        var initialContext = ${JSON.stringify(initialContext)};
        var nativeNavigationEnabled = ${JSON.stringify(nativeNavigationEnabled)};
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

        function postNavigationRequestToReactNative(request) {
          if (
            !nativeNavigationEnabled ||
            !window.ReactNativeWebView ||
            typeof window.ReactNativeWebView.postMessage !== 'function'
          ) {
            return;
          }

          window.ReactNativeWebView.postMessage(JSON.stringify(request));
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

            if (
              nativeNavigationEnabled &&
              window.ReactNativeWebView &&
              typeof window.ReactNativeWebView.postMessage === 'function'
            ) {
              window.AIFindrWidget.on(
                'navigation.request',
                postNavigationRequestToReactNative
              );
            }
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
- Si existe un router nativo, registra `navigation.request` antes de abrir el widget y reenvía su envelope sin modificarlo

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

export type NavigationParamValue = string | number | boolean | null;
export type NavigationParams = Record<string, NavigationParamValue>;

export type NavigationRequest = {
  source: 'aifindr';
  version: 1;
  type: 'navigation.request';
  requestId: string;
  payload: {
    destination: string;
    params: NavigationParams;
  };
};

export type NavigationHandlingResult = {
  type: 'navigation.opened' | 'navigation.failed';
  payload?: Record<string, unknown>;
};

export type WidgetEvent = {
  type: WidgetEventType;
  payload?: unknown;
} | NavigationRequest;

export interface AIFindrWebViewProps {
  clientId: string;
  metadata?: AIFindrMetadata;
  initialContext?: AIFindrInitialContext;
  variant?: string;
  widgetUrl?: string;
  hideCloseButton?: boolean;
  onWidgetEvent?: (event: WidgetEvent) => void;
  onNavigationRequest?: (
    request: NavigationRequest
  ) => NavigationHandlingResult | Promise<NavigationHandlingResult>;
}

export interface AIFindrWebViewRef {
  updateContext: (context: Record<string, unknown>) => void;
  sendNavigationAcknowledgement: (
    type: 'navigation.opened' | 'navigation.closed' | 'navigation.failed',
    requestId: string,
    payload?: Record<string, unknown>
  ) => void;
}

type NativeWebViewHandle = {
  injectJavaScript: (script: string) => void;
};

const NativeWebView =
  Platform.OS === 'web' ? null : require('react-native-webview').WebView;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isNavigationRequest(value: unknown): value is NavigationRequest {
  if (!isRecord(value) || !isRecord(value.payload) || !isRecord(value.payload.params)) {
    return false;
  }

  const params = value.payload.params;
  return (
    value.source === 'aifindr' &&
    value.version === 1 &&
    value.type === 'navigation.request' &&
    typeof value.requestId === 'string' &&
    value.requestId.length > 0 &&
    value.requestId.length <= 128 &&
    typeof value.payload.destination === 'string' &&
    value.payload.destination.length <= 128 &&
    /^[a-z][A-Za-z0-9_-]*(?:\.[a-z][A-Za-z0-9_-]*)+$/.test(
      value.payload.destination
    ) &&
    Object.keys(params).length <= 20 &&
    Object.entries(params).every(([key, param]) =>
      /^[A-Za-z][A-Za-z0-9_]{0,63}$/.test(key) &&
      (
        param === null ||
        typeof param === 'string' ||
        (typeof param === 'number' && Number.isFinite(param)) ||
        typeof param === 'boolean'
      )
    )
  );
}

const AIFindrWebView = React.forwardRef<AIFindrWebViewRef, AIFindrWebViewProps>(
  ({ clientId, metadata, initialContext, variant, widgetUrl, hideCloseButton = false, onWidgetEvent, onNavigationRequest }, ref) => {
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

    const sendNavigationAcknowledgement = useCallback((
      type: 'navigation.opened' | 'navigation.closed' | 'navigation.failed',
      requestId: string,
      payload?: Record<string, unknown>
    ) => {
      const acknowledgement = {
        source: 'your-app',
        version: 1,
        type,
        requestId,
        payload,
      };

      webViewRef.current?.injectJavaScript(`
        window.AIFindrWidget.dispatch(
          ${JSON.stringify(type)},
          ${JSON.stringify(acknowledgement)}
        );
        true;
      `);
    }, []);

    const handleMessage = useCallback((event: { nativeEvent: { data: string } }) => {
      try {
        const message: unknown = JSON.parse(event.nativeEvent.data);

        if (isRecord(message) && message.type === 'navigation.request') {
          if (!isNavigationRequest(message) || !onNavigationRequest) return;

          onWidgetEvent?.(message);
          void Promise.resolve(onNavigationRequest(message))
            .then((result) => {
              sendNavigationAcknowledgement(
                result.type,
                message.requestId,
                result.payload
              );
            })
            .catch(() => {
              sendNavigationAcknowledgement(
                'navigation.failed',
                message.requestId,
                { reason: 'handler_error' }
              );
            });
          return;
        }

        if (isRecord(message) && typeof message.type === 'string') {
          onWidgetEvent?.(message as WidgetEvent);
        }
      } catch {}
    }, [onNavigationRequest, onWidgetEvent, sendNavigationAcknowledgement]);

    React.useImperativeHandle(
      ref,
      () => ({ updateContext, sendNavigationAcknowledgement }),
      [sendNavigationAcknowledgement, updateContext]
    );

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
            nativeNavigationEnabled: Boolean(onNavigationRequest),
            variant,
            widgetUrl,
          }),
          baseUrl: WIDGET_BASE_URL,
        }}
        originWhitelist={['*']}
        javaScriptEnabled
        domStorageEnabled
        onMessage={handleMessage}
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
- `onNavigationRequest`: router nativo. Incluirlo registra la capacidad; omitirlo conserva los fallbacks web/query
- `sendNavigationAcknowledgement(...)`: confirmación opcional para observabilidad
- `hideCloseButton`: forma práctica de ocultar `.ai-findr-close-button`

## 3. Navegación nativa desde tarjetas

La integración tiene tres responsabilidades distintas:

1. El agente genera una tarjeta `MC` con `nav` y `params`. No construye ningún `postMessage`.
2. `widget.js` valida esos atributos y crea el envelope con un `requestId` único.
3. La app host registra el listener, recibe el envelope, valida el destino y abre su pantalla nativa.

Una tarjeta puede declarar un destino nativo y conservar un fallback web:

```html
<MC
  t="Kudu Restaurant"
  img="..."
  nav="store.detail"
  params='{"storeId":252648}'
  url="https://..."
/>
```

Para acciones sin parámetros, omite `params`. El widget enviará `{}`:

```html
<MC t="Ver todas las ofertas" nav="offers.tab" />
```

`nav` debe ser un destino separado por puntos, como `store.detail`. `params` debe ser JSON plano, con un máximo de 20 claves y valores `string`, `number`, `boolean` o `null`. Si el atributo supera 2048 caracteres o no es válido, la navegación se ignora y la tarjeta conserva su comportamiento `q`/`url`.

Dentro de un valor string usa entidades para los caracteres que pueden interferir con el markup. El host recibe el texto ya decodificado:

```html
<MC t="Moda" nav="search.results" params='{"query":"women&#39;s shoes &amp; bags"}' />
```

### Flujo completo

1. El wrapper registra `navigation.request` durante `AIFindrWidget.ready()` y antes de llamar a `open()`.
2. `widget.js` sincroniza la capacidad con el iframe, también después de una recarga interna.
3. Al pulsar una tarjeta válida, el iframe envía `navigation.request` al host web.
4. El host reenvía el mismo envelope con `window.ReactNativeWebView.postMessage(...)`.
5. `onMessage` valida el envelope, aplica la allowlist de destinos y valida los parámetros de esa ruta.
6. La app abre la pantalla nativa inmediatamente. Nunca espera un acknowledgement.
7. La app puede devolver `navigation.opened`, `navigation.closed` o `navigation.failed` para observabilidad.

Activa la capacidad solo cuando el wrapper tenga un router real:

```tsx
html: buildWidgetHTML(clientId, metadata, {
  hideCloseButton,
  initialContext,
  nativeNavigationEnabled: Boolean(onNavigationRequest),
  variant,
  widgetUrl,
})
```

El listener recibe este envelope exacto, generado por el widget:

```json
{
  "source": "aifindr",
  "version": 1,
  "type": "navigation.request",
  "requestId": "nav_550e8400-e29b-41d4-a716-446655440000",
  "payload": {
    "destination": "store.detail",
    "params": { "storeId": 252648 }
  }
}
```

### Precedencia y fallback

| Estado | Resultado del click |
|---|---|
| `nav` válido y listener registrado | Envía `navigation.request`; no ejecuta `q` ni `url` |
| Sin listener y con `q` o `url` | Ejecuta el fallback existente, con `q` antes que `url` |
| Sin listener y sin fallback | La tarjeta queda inactiva |
| `nav` o `params` inválido | Ignora la navegación y conserva `q`/`url` |
| Listener registrado pero destino no soportado por la app | La app devuelve `navigation.failed`; no se ejecuta fallback después del click |

El listener anuncia capacidad para `navigation.request`, no para cada destino individual. Por eso la allowlist del host y los destinos permitidos en el prompt deben evolucionar juntos.

### Contrato del ejemplo Cenomi

Los destinos no están reservados por AIFindr: son un contrato entre el prompt y la app host. El ejemplo de React Native implementa este contrato:

| Destino | Parámetros | ID que debe copiar el agente |
|---|---|---|
| `store.detail` | `{ "storeId": number }` | `brand_id` |
| `offer.detail` | `{ "offerId": number }` | `engagement_id` de tipo `offers` |
| `event.detail` | `{ "eventId": number }` | `engagement_id` de tipo `events` |
| `movie.detail` | `{ "movieId": number }` | `muvilist[].id`, expuesto como `filmId` por el Product Search actual |
| `service.detail` | `{ "serviceId": number }` | `service.id` |
| `offers.tab` | `{}` | No aplica |
| `events.list` | `{}` | No aplica |
| `loyalty.mallOffers` | `{}` | No aplica |

Los IDs de detalle deben ser enteros positivos copiados literalmente de la fuente, nunca inferidos desde nombres. Los destinos sin parámetros rechazan claves inesperadas. El mapa indoor no forma parte de este contrato y debe seguir usando el componente `Map` existente.

Valida el envelope y permite explícitamente cada destino antes de navegar:

```tsx
const DETAIL_PARAM_BY_DESTINATION = {
  'store.detail': 'storeId',
  'offer.detail': 'offerId',
  'event.detail': 'eventId',
  'movie.detail': 'movieId',
  'service.detail': 'serviceId',
} as const;

const PARAMETERLESS_DESTINATIONS = new Set([
  'offers.tab',
  'events.list',
  'loyalty.mallOffers',
]);

function handleNavigationRequest(request: NavigationRequest) {
  const { destination, params } = request.payload;
  const paramName = DETAIL_PARAM_BY_DESTINATION[
    destination as keyof typeof DETAIL_PARAM_BY_DESTINATION
  ];

  if (paramName) {
    const id = params[paramName];
    if (
      Object.keys(params).length !== 1 ||
      typeof id !== 'number' ||
      !Number.isSafeInteger(id) ||
      id <= 0
    ) {
      return {
        type: 'navigation.failed' as const,
        payload: { destination, reason: 'invalid_navigation_params' },
      };
    }
  } else if (
    !PARAMETERLESS_DESTINATIONS.has(destination) ||
    Object.keys(params).length !== 0
  ) {
    return {
      type: 'navigation.failed' as const,
      payload: { destination, reason: 'unsupported_or_invalid_destination' },
    };
  }

  openNativeScreen(destination, params);
  return {
    type: 'navigation.opened' as const,
    payload: { destination, params },
  };
}
```

El wrapper anterior reenvía el request sin envolverlo otra vez y devuelve el resultado del handler al iframe. Cuando el usuario cierre la pantalla nativa, la app puede correlacionar el cierre con el mismo `requestId`:

```tsx
webViewRef.current?.sendNavigationAcknowledgement(
  'navigation.closed',
  requestId,
  { destination, reason: 'user_back' }
);
```

Los acknowledgements son opcionales y solo sirven para observabilidad. No controlan el fallback y no deben incluir credenciales, tokens ni parámetros ajenos al routing.

## 4. Caso práctico: una pantalla que abre el widget

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
