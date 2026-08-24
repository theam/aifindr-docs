---
title: React Native
description: AIFindr widget integration in React Native apps with react-native-webview
slug: /widget-config/integraciones/react-native
sidebar_position: 2
---

:::info First time?
Read the [installation guide](../instalacion.md) first to understand the basics.
:::

# React Native

In React Native, the widget is integrated by loading a self-contained HTML page inside a `WebView`. A practical way to organize it is to separate:

- an HTML builder that runs inside the `WebView`
- an `AIFindrWebView` wrapper that loads that HTML and exposes a safe way to update context from React Native

You can adapt this logic to whatever structure your app already uses. File names and component names in this guide are only examples.

:::info Recommended pattern
The current flow is **auto-open-only**: the HTML renders a hidden trigger with `id="ai-findr-trigger"`, waits for `AIFindrWidget.ready()`, and opens the widget automatically with `AIFindrWidget.open()`.
:::

:::caution Testing environment
Do not test this integration in the web preview. `react-native-webview` needs a native runtime: Expo Go, iOS Simulator, Android Emulator, or a physical device.
:::

## 1. Build the widget HTML

The delicate part lives inside the HTML loaded by the `WebView`: hidden trigger, `data-client-id`, metadata via `data-meta-*`, optional `data-var`, optional `data-widget-url`, queued context until `ready()`, and the event bridge back to React Native.

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
    /** Declare only schemes that onNativeLink can validate and handle. */
    nativeLinkSchemes?: readonly string[];
    /** Enable only when the app has a real navigation.request handler. */
    nativeNavigationEnabled?: boolean;
    /** Example: "ar" for an Arabic variant. Omit this value to use the project default view. */
    variant?: string;
    /** Example: "https://hub.ksa.aifindr.ai". Only use this if the AIFindr team tells you to point to another hub. */
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
  const nativeLinkSchemes = options?.nativeLinkSchemes ?? [];
  const nativeLinkSchemesAttribute = nativeLinkSchemes.length > 0
    ? `data-native-link-schemes="${escapeHTMLAttribute(nativeLinkSchemes.join(','))}"`
    : '';
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
          ${nativeLinkSchemesAttribute}
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

### What this HTML does

- Still loads the official widget from `https://hub.aifindr.ai/widget.js`
- Keeps the hidden trigger with `id="ai-findr-trigger"` because the widget expects it
- Passes fixed metadata as `data-meta-*` attributes
- Lets you pass `data-widget-url` if the team asks you to point to another hub
- Declares `data-native-link-schemes` when the application configures native links
- Queues context until `AIFindrWidget.ready()` fires and then calls `setContext()`
- Sends widget events back to React Native with `window.ReactNativeWebView.postMessage(...)`
- If a native router exists, registers `navigation.request` before opening the widget and forwards its envelope unchanged

## 2. Wrap the `WebView` in React Native

This wrapper is app code, not a new official widget API. Internally it still relies on `AIFindrWidget.ready()`, `setContext()`, and `AIFindrWidget.on(...)`.

```tsx
import React, { useCallback, useRef } from 'react';
import { Linking, Platform, Text, View } from 'react-native';

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
  nativeLinkSchemes?: readonly string[];
  onNativeLink?: (url: string) => boolean;
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

type WebViewLoadRequest = {
  isTopFrame?: boolean;
  url: string;
};

type WebViewOpenWindowEvent = {
  nativeEvent: { targetUrl?: string };
};

const NativeWebView =
  Platform.OS === 'web' ? null : require('react-native-webview').WebView;

function shouldOpenInBrowser(
  url: string,
  activeWidgetUrl = WIDGET_BASE_URL
): boolean {
  try {
    const parsed = new URL(url);
    const widgetHostname = new URL(activeWidgetUrl).hostname;
    return (
      (parsed.protocol === 'http:' || parsed.protocol === 'https:') &&
      parsed.hostname !== widgetHostname
    );
  } catch {
    return false;
  }
}

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
  ({ clientId, metadata, initialContext, variant, widgetUrl, hideCloseButton = false, nativeLinkSchemes, onNativeLink, onWidgetEvent, onNavigationRequest }, ref) => {
    const webViewRef = useRef<NativeWebViewHandle | null>(null);

    const openUrlInBrowser = useCallback((url: string) => {
      Linking.openURL(url).catch((error: unknown) => {
        console.warn('Failed to open external URL:', url, error);
      });
    }, []);

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

    const handleShouldStartLoad = useCallback((request: WebViewLoadRequest) => {
      if (request.isTopFrame === false) return true;

      const handledByNativeApp = onNativeLink?.(request.url) ?? false;
      const opensInBrowser =
        !handledByNativeApp &&
        shouldOpenInBrowser(request.url, widgetUrl ?? WIDGET_BASE_URL);

      if (opensInBrowser) openUrlInBrowser(request.url);
      return !handledByNativeApp && !opensInBrowser;
    }, [onNativeLink, openUrlInBrowser, widgetUrl]);

    const handleOpenWindow = useCallback((event: WebViewOpenWindowEvent) => {
      const targetUrl = event.nativeEvent.targetUrl;
      if (!targetUrl) return;

      const handledByNativeApp = onNativeLink?.(targetUrl) ?? false;
      if (
        !handledByNativeApp &&
        shouldOpenInBrowser(targetUrl, widgetUrl ?? WIDGET_BASE_URL)
      ) {
        openUrlInBrowser(targetUrl);
      }
    }, [onNativeLink, openUrlInBrowser, widgetUrl]);

    React.useImperativeHandle(
      ref,
      () => ({ updateContext, sendNavigationAcknowledgement }),
      [sendNavigationAcknowledgement, updateContext]
    );

    if (!NativeWebView) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <Text>
            Open this screen in Expo Go, iOS Simulator, or Android Emulator to test
            the real integration.
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
            nativeLinkSchemes: onNativeLink ? nativeLinkSchemes : undefined,
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
        setSupportMultipleWindows
        onShouldStartLoadWithRequest={handleShouldStartLoad}
        onOpenWindow={handleOpenWindow}
        style={{ flex: 1 }}
      />
    );
  }
);

AIFindrWebView.displayName = 'AIFindrWebView';

export default AIFindrWebView;
```

### What this wrapper exposes

- `metadata`: fixed data that becomes `data-meta-*`
- `initialContext`: initial context that the HTML queues until `ready()`
- `widgetUrl`: becomes `data-widget-url` if the team asks you to point to another hub
- `updateContext(...)`: bridge from React Native into `setContext()`
- `onWidgetEvent`: events forwarded from `AIFindrWidget.on(...)`
- `nativeLinkSchemes` + `onNativeLink`: URL schemes declared, validated, and handled by the host
- External HTTP/HTTPS links are delegated to `Linking.openURL(...)`; adapt `shouldOpenInBrowser` to your application's navigation policy
- `onNavigationRequest`: native router. Passing it registers the capability; omitting it preserves the current card behavior
- `sendNavigationAcknowledgement(...)`: optional acknowledgement for observability
- `hideCloseButton`: a practical way to hide `.ai-findr-close-button`

## 3. Native navigation from cards

The widget supports two different contracts for opening native screens from a media card:

- [Native links (URL)](../native-link-schemes.md), for applications that already expose their own deep links.
- [Navigation events (`navigation.request`)](../structured-navigation.md), generated through `nav` and `params`.

Configure only the contract used by the project. Do not combine `url` and `nav` to represent the same action on a card.

### 3.1. Native links (URL)

See [Native links (URL)](../native-link-schemes.md) for the complete contract, including widget configuration, conversational fallback, and the security policy.

The wrapper above advertises `nativeLinkSchemes` only when it also receives `onNativeLink`. The callback must validate the complete URL and return `true` when it recognizes the scheme, even if the route is invalid, so the `WebView` never attempts to open it:

```tsx
function parseAcmeProductUrl(rawUrl: string): { productId: number } | undefined {
  try {
    const url = new URL(rawUrl);
    if (url.protocol !== 'acme:' || url.hostname !== 'product') return;

    const rawProductId = url.pathname.slice(1);
    if (!/^[1-9]\d*$/.test(rawProductId)) return;

    return { productId: Number(rawProductId) };
  } catch {
    return;
  }
}

function consumeNativeUrl(rawUrl: string): boolean {
  if (!/^acme:/i.test(rawUrl)) return false;

  const target = parseAcmeProductUrl(rawUrl);
  if (target) nativeRouter.openProductDetail(target.productId);

  return true;
}

<AIFindrWebView
  clientId="YOUR_CLIENT_ID"
  nativeLinkSchemes={['acme']}
  onNativeLink={consumeNativeUrl}
/>
```

The wrapper propagates the schemes to the script and intercepts both top-frame navigation and new-window requests. HTTP/HTTPS URLs that are not recognized as native links are delegated to the host's external-link policy. If `onNativeLink` opens the URL through `Linking.openURL(...)` instead of the internal router, register the scheme on iOS and Android as well.

### 3.2. Navigation events (`navigation.request`)

See [Navigation events (`navigation.request`)](../structured-navigation.md) for the complete contract, event envelope, destination validation, and acknowledgements.

The wrapper above implements this mechanism through `onNavigationRequest`. Passing the callback registers the capability and forwards each valid request to React Native; omitting it preserves the cards' normal behavior.

## 4. Practical case: a screen that opens the widget

If your app uses tabs, stacks, or internal navigation, one useful pattern is to keep the `WebView` mounted and only hide it visually when inactive. That avoids reloads and helps prevent iOS from killing the `WKWebView` process.

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
            clientId="YOUR_CLIENT_ID"
            metadata={WIDGET_METADATA}
            initialContext={WIDGET_INITIAL_CONTEXT}
            onWidgetEvent={handleWidgetEvent}
            hideCloseButton
          />
        </View>
      </View>

      {activeTab !== 'plus-ai' && (
        <View style={StyleSheet.absoluteFillObject}>
          {/* Rest of your app content */}
        </View>
      )}

      {/* In your real UI, open the widget view from your navigation */}
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

### Why this example is more stable

- `WIDGET_METADATA` and `WIDGET_INITIAL_CONTEXT` live outside render, so the HTML is not rebuilt on every render
- `updateContext(...)` runs before switching to the widget tab, so the context is already in place when the chat opens
- the `WebView` is not unmounted on every tab change

If your app does not use tabs, keep the same core idea: avoid recreating the `WebView` unnecessarily, and update context before opening or showing the widget.

## `variant` is optional

If you need to force a specific `variant`, add it in the wrapper:

```tsx
<AIFindrWebView
  clientId="YOUR_CLIENT_ID"
  variant="ar"
/>
```

- `variant="ar"` is only an example of an Arabic `variant`
- if you omit `variant` or leave it empty, the widget uses the project default view
- if you have not configured a specific `variant`, you usually do not need to send it

## `widgetUrl` only if the team tells you to

If the AIFindr team asks you to point the widget to another hub, pass it to the wrapper so it becomes `data-widget-url` in the internal `WebView` script:

```tsx
<AIFindrWebView
  clientId="YOUR_CLIENT_ID"
  widgetUrl="https://hub.ksa.aifindr.ai"
/>
```

- `widgetUrl="https://hub.ksa.aifindr.ai"` is only an example
- do not change this value unless the AIFindr team tells you to

## Events worth forwarding to React Native

The most useful events to bridge back are:

- `widget.ready`
- `widget.opened`
- `widget.closed`
- `widget.error`
- `conversation.started`
- `message.sent`
- `message.received`

## React Native troubleshooting

| Problem | Solution |
|----------|----------|
| You test it on web and it does not work | Use Expo Go, iOS Simulator, Android Emulator, or a physical device |
| The `WebView` reloads when switching tabs | Do not unmount it. Keep it mounted and hide it with `opacity: 0` and `pointerEvents: 'none'` |
| Context is lost before `ready()` | Queue it in `window.__AIFindrContextBridge` and only call `setContext()` when the widget is ready |
| The `WebView` reloads on every React render | Do not create `metadata` or `initialContext` inline inside render |
| The widget opens with the wrong `entrypoint` | Call `updateContext(...)` before switching to the widget screen or tab |
| Events do not reach the native side | Verify `onMessage` in the `WebView` and `window.ReactNativeWebView.postMessage(...)` inside the HTML |

## Next steps

- [Context and metadata](../contexto-metadatos.md) to separate fixed and dynamic data correctly
- [Visual customization](../personalizacion.md) for styles and `variants`
- [API Reference](../javascript-api.md) for more advanced methods and events
- [Full GitHub example](https://github.com/theam/aifindr-react-native-webview-example) if you need a more complete implementation
