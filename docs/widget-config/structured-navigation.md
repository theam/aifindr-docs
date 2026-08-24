---
title: Eventos de navegación (navigation.request)
description: Abre pantallas nativas mediante destinos y parámetros enviados como eventos estructurados
slug: /widget-config/structured-navigation
sidebar_position: 8
---

# Eventos de navegación (`navigation.request`)

Este mecanismo está pensado para integraciones en las que AIFindr y el host acuerdan destinos lógicos y sus parámetros. Para activarlo, el host registra `navigation.request` antes de abrir el widget. El listener funciona como un handshake de capacidad: si no existe, las tarjetas conservan su comportamiento habitual.

Si la aplicación utiliza `react-native-webview`, consulta [Implementar eventos de navegación en React Native](./integraciones/react-native.md#32-eventos-de-navegación-navigationrequest). Esa guía contiene el wrapper completo; esta página define el contrato y la validación del mecanismo.

```js
AIFindrWidget.on('navigation.request', (request) => {
  handleNavigationRequest(request);
});
```

## Envelope del evento

El listener recibe un envelope generado por el widget:

```json
{
  "source": "aifindr",
  "version": 1,
  "type": "navigation.request",
  "requestId": "nav_550e8400-e29b-41d4-a716-446655440000",
  "payload": {
    "destination": "product.detail",
    "params": { "productId": 123 }
  }
}
```

## Flujo en una WebView

1. El wrapper registra `navigation.request` durante `AIFindrWidget.ready()` y antes de llamar a `open()`.
2. Al pulsar una tarjeta válida, el iframe envía el evento al host web.
3. El host reenvía el mismo envelope mediante `window.ReactNativeWebView.postMessage(...)`.
4. La aplicación valida el envelope, permite únicamente destinos conocidos y valida los parámetros de la ruta.
5. La aplicación abre la pantalla nativa y puede responder con `navigation.opened`, `navigation.closed` o `navigation.failed` para observabilidad.

## Validación de destinos

El listener anuncia soporte para `navigation.request`, no para cada destino individual. La allowlist del host debe cubrir todos los destinos habilitados en el proyecto:

```tsx
type NativeRoute = {
  validate: (params: NavigationParams) => boolean;
  open: (params: NavigationParams) => void;
};

const nativeRoutes: Record<string, NativeRoute> = {
  'product.detail': {
    validate: (params) => {
      const productId = params.productId;
      return (
        Object.keys(params).length === 1 &&
        typeof productId === 'number' &&
        Number.isSafeInteger(productId) &&
        productId > 0
      );
    },
    open: (params) => nativeRouter.openProductDetail(params.productId as number),
  },
};

function handleNavigationRequest(request: NavigationRequest) {
  const { destination, params } = request.payload;
  const route = nativeRoutes[destination];

  if (!route || !route.validate(params)) {
    return {
      type: 'navigation.failed' as const,
      payload: { destination, reason: 'unsupported_or_invalid_destination' },
    };
  }

  route.open(params);
  return {
    type: 'navigation.opened' as const,
    payload: { destination, params },
  };
}
```

## Acknowledgements

Los acknowledgements son opcionales y solo sirven para observabilidad. No controlan ningún fallback y no deben contener credenciales, tokens ni parámetros ajenos al routing.

Consulta la referencia completa de [`navigation.request`](./javascript-api.md#navegación-nativa) para ver los tipos y eventos disponibles.
