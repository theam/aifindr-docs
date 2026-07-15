---
title: API Reference
description: Referencia completa de la API JavaScript del widget de AIFindr
slug: /widget-config/api-reference
sidebar_position: 6
---

# API Reference

Documentación completa de la API JavaScript del widget de AIFindr. El objeto global `AIFindrWidget` proporciona una interfaz completa para controlar el widget.

## Inicialización

### `AIFindrWidget.ready(callback?)`

Ejecuta código cuando el widget está completamente cargado.

**Parámetros:**
- `callback` (function, opcional): Función a ejecutar cuando esté listo

**Retorna:**
- Si no se pasa callback: `Promise<void>`
- Si se pasa callback: `undefined`

```js
// Usando callback
AIFindrWidget.ready(() => {
  console.log('Widget listo!');
  AIFindrWidget.setContext({ userId: '123' });
});

// Usando Promise
await AIFindrWidget.ready();
console.log('Widget listo!');
```

### `AIFindrWidget.isReady()`

Verifica si el widget está listo para usar.

**Retorna:** `boolean`

```js
if (AIFindrWidget.isReady()) {
  AIFindrWidget.open();
} else {
  console.log('Widget aún no está listo');
}
```

## Control del Widget

### `AIFindrWidget.open()`

Abre el widget y muestra la interfaz de chat.

**Retorna:** `Promise<void>`

```js
// Abrir el widget
try {
  await AIFindrWidget.open();
  console.log('Widget abierto exitosamente');
} catch (error) {
  console.error('Error al abrir widget:', error);
}
```

### `AIFindrWidget.close()`

Cierra el widget y oculta la interfaz.

**Retorna:** `Promise<void>`

```js
// Cerrar el widget
try {
  await AIFindrWidget.close();
  console.log('Widget cerrado');
} catch (error) {
  console.error('Error al cerrar widget:', error);
}
```

### `AIFindrWidget.toggle()`

Alterna entre abrir y cerrar el widget.

**Retorna:** `Promise<void>`

```js
// Alternar estado del widget
await AIFindrWidget.toggle();
```

## Gestión de Contexto

### `AIFindrWidget.setContext(context)`

Reemplaza completamente el contexto actual.

**Parámetros:**
- `context` (object): Nuevo contexto a establecer

**Notas:**
- Las claves que coincidan con metadatos serán ignoradas con un warning
- El contexto se envía automáticamente al iframe cuando está abierto

```js
AIFindrWidget.setContext({
  userId: '12345',
  userType: 'premium',
  currentPage: 'dashboard',
  language: 'es'
});
```

### `AIFindrWidget.mergeContext(contextUpdate)`

Añade o actualiza claves específicas del contexto sin afectar el resto.

**Parámetros:**
- `contextUpdate` (object): Objeto con las claves a añadir/actualizar

```js
// Contexto inicial
AIFindrWidget.setContext({ userId: '123', page: 'home' });

// Actualizar solo la página
AIFindrWidget.mergeContext({ page: 'products', timestamp: Date.now() });

// Resultado: { userId: '123', page: 'products', timestamp: 1703123456789 }
```

### `AIFindrWidget.getContext()`

Obtiene una copia del contexto actual.

**Retorna:** `object` - Copia del contexto actual

```js
const currentContext = AIFindrWidget.getContext();
console.log('Contexto:', currentContext);

// Modificar la copia no afecta el contexto real
currentContext.newKey = 'value'; // No afecta el widget
```

### `AIFindrWidget.getMetadata()`

Obtiene los metadatos definidos en el script.

**Retorna:** `object` - Copia de los metadatos

```js
// Si el script tiene: data-meta-environment="production"
const metadata = AIFindrWidget.getMetadata();
console.log(metadata); // { environment: "production" }
```

**Notas:**
- Los metadatos combinan atributos `data-meta-*` del script con parámetros UTM de la URL
- Los parámetros UTM de la URL se agrupan automáticamente bajo la clave `utm`
- Esta información es de solo lectura y se define al cargar el widget

```js
// Ejemplo 1: Solo metadatos del script
// Script: <script data-meta-environment="production" data-meta-market="es">
const metadata = AIFindrWidget.getMetadata();
console.log(metadata);
// { environment: "production", market: "es" }

// Ejemplo 2: Metadatos del script + parámetros UTM
// Script: <script data-meta-market="es">
// URL: https://example.com?utm_source=google&utm_medium=cpc
const metadata = AIFindrWidget.getMetadata();
console.log(metadata);
// { market: "es", utm: { source: "google", medium: "cpc" } }
```

## Sistema de Eventos

### `AIFindrWidget.on(event, callback)`

Registra un listener para un evento específico.

**Parámetros:**
- `event` (string): Nombre del evento
- `callback` (function): Función a ejecutar cuando ocurra el evento

```js
AIFindrWidget.on('widget.opened', () => {
  console.log('Widget se abrió');
});

AIFindrWidget.on('widget.closed', () => {
  console.log('Widget se cerró');
});
```

### `AIFindrWidget.off(event, callback)`

Desregistra un listener de evento específico.

**Parámetros:**
- `event` (string): Nombre del evento
- `callback` (function): Función listener a remover

```js
const handler = () => console.log('Widget abierto');

// Registrar
AIFindrWidget.on('widget.opened', handler);

// Desregistrar
AIFindrWidget.off('widget.opened', handler);
```

## Eventos Disponibles

### `AIFindrWidget.EVENTS`

Constantes con los nombres de todos los eventos disponibles.

```js
const { EVENTS } = AIFindrWidget;

// Eventos del ciclo de vida del widget
AIFindrWidget.on(EVENTS.WIDGET_READY, () => {
  console.log('Widget inicializado y listo');
});

AIFindrWidget.on(EVENTS.WIDGET_OPENED, () => {
  console.log('Widget abierto');
});

AIFindrWidget.on(EVENTS.WIDGET_CLOSED, () => {
  console.log('Widget cerrado');
});

AIFindrWidget.on(EVENTS.WIDGET_ERROR, (error) => {
  console.error('Error en widget:', error);
});

// Eventos de conversación
AIFindrWidget.on(EVENTS.CONV_STARTED, (data) => {
  console.log('Conversación iniciada:', data);
});

AIFindrWidget.on(EVENTS.MESSAGE_SENT, (message) => {
  console.log('Mensaje enviado:', message);
});

AIFindrWidget.on(EVENTS.MESSAGE_RECV, (message) => {
  console.log('Mensaje recibido:', message);
});

// Requests de navegación nativa
AIFindrWidget.on(EVENTS.NAVIGATION_REQUEST, handleNavigationRequest);
```

### Lista de Eventos

| Evento | Dirección | Descripción | Datos |
|--------|-----------|-------------|-------|
| `widget.ready` | iframe → host | Widget inicializado y listo | `undefined` |
| `widget.opened` | iframe → host | Widget abierto exitosamente | `undefined` |
| `widget.closed` | iframe → host | Widget cerrado | `undefined` |
| `widget.error` | iframe → host | Error en el widget | `Error object` |
| `conversation.started` | iframe → host | Nueva conversación iniciada | `{ conversationId, timestamp }` |
| `message.sent` | iframe → host | Usuario envió un mensaje | `{ message, timestamp }` |
| `message.received` | iframe → host | IA respondió con un mensaje | `{ message, timestamp }` |
| `navigation.request` | iframe → host | Una tarjeta solicita navegación del host | `NavigationRequest` |
| `navigation.opened` | host → iframe | El host confirma que abrió el destino | `NavigationAcknowledgement` |
| `navigation.closed` | host → iframe | El host confirma que cerró el destino | `NavigationAcknowledgement` |
| `navigation.failed` | host → iframe | El host informa que no pudo abrir el destino | `NavigationAcknowledgement` |

### Navegación nativa

Registra `navigation.request` antes de abrir el widget. Este listener funciona como un handshake de capacidad: informa al widget de que el host puede recibir solicitudes y abrir pantallas nativas. Regístralo solo cuando exista un router real para todos los destinos habilitados en el proyecto.

```js
AIFindrWidget.on('navigation.request', (request) => {
  if (!isValidNavigationRequest(request)) return;
  handleNavigationRequest(request);
});
```

`isValidNavigationRequest` debe verificar el envelope completo. `handleNavigationRequest` debe aplicar una allowlist de destinos, validar los parámetros exactos de cada pantalla y abrir la ruta nativa correspondiente. La [integración React Native](./integraciones/react-native.md#3-navegación-nativa-desde-tarjetas) incluye una implementación completa.

El callback recibe el envelope completo:

```json
{
  "source": "aifindr",
  "version": 1,
  "type": "navigation.request",
  "requestId": "nav_...",
  "payload": {
    "destination": "store.detail",
    "params": { "storeId": 252648 }
  }
}
```

`params` siempre es un objeto plano de hasta 20 claves con valores `string`, `number`, `boolean` o `null`. Las operaciones sin parámetros llegan como `{}`.

El host debe validar el envelope, permitir destinos explícitamente y validar los parámetros exactos de cada pantalla. Un listener registrado toma posesión de la interacción: si la app no soporta el destino debe enviar `navigation.failed`, pero el widget no ejecutará el comportamiento anterior después. Sin listener, las tarjetas conservan su comportamiento actual.

La dirección es importante: `navigation.request` viaja del iframe al host; `navigation.opened`, `navigation.closed` y `navigation.failed` viajan del host al iframe mediante `dispatch`.

## Métodos Avanzados

### `AIFindrWidget.dispatch(event, payload)`

Envía un evento soportado al iframe del widget.

**Parámetros:**
- `event` (string): Nombre del evento
- `payload` (object, opcional): Datos a enviar

**Notas:**
- Solo funciona con eventos definidos en `BRIDGE_EVENTS`
- Se encola automáticamente si el widget no está listo

```js
const acknowledgement = {
  source: 'your-app',
  version: 1,
  type: 'navigation.opened',
  requestId: request.requestId,
  payload: { destination: request.payload.destination }
};

AIFindrWidget.dispatch(acknowledgement.type, acknowledgement);
```

Los acknowledgements `navigation.opened`, `navigation.closed` y `navigation.failed` son opcionales y solo sirven para observabilidad. La tarjeta nunca espera su respuesta antes de navegar o usar un fallback.

### `AIFindrWidget.getState()`

Obtiene el estado actual del widget.

**Retorna:** `string` - Estado actual ('init', 'loading', 'ready', 'open', 'closing', 'error')

```js
const state = AIFindrWidget.getState();
console.log('Estado actual:', state);

if (state === 'ready') {
  AIFindrWidget.open();
}
```

## Gestión del Ciclo de Vida

### `AIFindrWidget.initialize()`

Inicializa el widget manualmente. Normalmente se ejecuta automáticamente.

**Retorna:** `Promise<void>`

```js
// Raramente necesario, el widget se inicializa automáticamente
await AIFindrWidget.initialize();
```

### `AIFindrWidget.destroy()`

Destruye completamente el widget y limpia todos los recursos.

```js
// Limpiar el widget al salir de la página
window.addEventListener('beforeunload', () => {
  AIFindrWidget.destroy();
});
```

## API de Debug

### `AIFindrWidget._debug`

Métodos internos para debugging (solo en desarrollo).

```js
// Obtener estado interno completo
const debugInfo = AIFindrWidget._debug.getState();
console.log('Debug info:', debugInfo);

// Obtener contexto actual (referencia directa)
const contextRef = AIFindrWidget._debug.getContext();

// Obtener listeners de eventos
const listeners = AIFindrWidget._debug.getEventListeners();

// Obtener configuración de inicialización
const options = AIFindrWidget._debug.getOptions();
```

### Modo Debug

Activa logging detallado para troubleshooting:

```js
// Activar modo debug
localStorage.setItem('aifindr_debug', 'true');

// Recargar página para aplicar
location.reload();

// Ver estado debug
console.log(AIFindrWidget._debug.getState());
```

## TypeScript

Definiciones de tipos para usar con TypeScript:

```typescript
declare global {
  interface Window {
    AIFindrWidget: {
      // Constantes
      EVENTS: {
        WIDGET_READY: 'widget.ready';
        WIDGET_OPENED: 'widget.opened';
        WIDGET_CLOSED: 'widget.closed';
        WIDGET_ERROR: 'widget.error';
        CONV_STARTED: 'conversation.started';
        MESSAGE_SENT: 'message.sent';
        MESSAGE_RECV: 'message.received';
        NAVIGATION_REQUEST: 'navigation.request';
        NAVIGATION_OPENED: 'navigation.opened';
        NAVIGATION_CLOSED: 'navigation.closed';
        NAVIGATION_FAILED: 'navigation.failed';
      };
      
      // Control del widget
      ready: (callback?: () => void) => Promise<void> | undefined;
      isReady: () => boolean;
      open: () => Promise<void>;
      close: () => Promise<void>;
      toggle: () => Promise<void>;
      
      // Gestión de contexto
      setContext: (context: Record<string, any>) => void;
      mergeContext: (contextUpdate: Record<string, any>) => void;
      getContext: () => Record<string, any>;
      getMetadata: () => Record<string, any>;
      
      // Eventos
      on: (event: string, callback: (data?: any) => void) => void;
      off: (event: string, callback: (data?: any) => void) => void;
      
      // Métodos avanzados
      dispatch: (event: string, payload?: any) => void;
      getState: () => 'init' | 'loading' | 'ready' | 'open' | 'closing' | 'error';
      
      // Ciclo de vida
      initialize: () => Promise<void>;
      destroy: () => void;
      
      // Debug (desarrollo)
      _debug: {
        getState: () => any;
        getContext: () => Record<string, any>;
        getEventListeners: () => Record<string, Function[]>;
        getOptions: () => any;
      };
    };
  }
}

// Tipos para eventos
interface WidgetEventData {
  'widget.ready': undefined;
  'widget.opened': undefined;
  'widget.closed': undefined;
  'widget.error': Error;
  'conversation.started': { conversationId: string; timestamp: string };
  'message.sent': { message: string; timestamp: string };
  'message.received': { message: string; timestamp: string };
  'navigation.request': {
    source: 'aifindr';
    version: 1;
    type: 'navigation.request';
    requestId: string;
    payload: {
      destination: string;
      params: Record<string, string | number | boolean | null>;
    };
  };
}

interface NavigationAcknowledgement {
  source: string;
  version: 1;
  type: 'navigation.opened' | 'navigation.closed' | 'navigation.failed';
  requestId: string;
  payload?: Record<string, unknown>;
}

// Helper para listeners tipados
function onWidgetEvent<T extends keyof WidgetEventData>(
  event: T,
  callback: (data: WidgetEventData[T]) => void
): void {
  AIFindrWidget.on(event, callback);
}
```

## Ejemplos de Uso

### Integración básica

```js
// Esperar a que esté listo e inicializar contexto
AIFindrWidget.ready(() => {
  // Configurar contexto inicial
  AIFindrWidget.setContext({
    userId: getCurrentUserId(),
    language: getUserLanguage(),
    plan: getUserPlan()
  });
  
  // Configurar listeners
  AIFindrWidget.on('widget.opened', () => {
    trackEvent('widget_opened');
  });
  
  AIFindrWidget.on('conversation.started', () => {
    trackEvent('conversation_started');
  });
});
```

### Actualización dinámica de contexto

```js
// En una SPA, actualizar contexto en navegación
router.on('route:changed', (route) => {
  AIFindrWidget.mergeContext({
    currentRoute: route.path,
    routeParams: route.params,
    timestamp: new Date().toISOString()
  });
});

// Actualizar contexto basado en estado de la aplicación
store.subscribe((state) => {
  AIFindrWidget.mergeContext({
    userPreferences: state.user.preferences,
    cartItems: state.cart.itemCount,
    currentSection: state.ui.currentSection
  });
});
```

### Control programático avanzado

```js
// Abrir widget con query específica
async function openWithQuery(query) {
  // Establecer contexto específico
  AIFindrWidget.mergeContext({
    pendingQuery: query,
    querySource: 'programmatic'
  });
  
  try {
    await AIFindrWidget.open();
    console.log('Widget abierto con query:', query);
  } catch (error) {
    console.error('Error abriendo widget:', error);
  }
}

// Usar en botones específicos
document.querySelector('#help-billing').addEventListener('click', () => {
  openWithQuery('Tengo una pregunta sobre mi facturación');
});

document.querySelector('#help-features').addEventListener('click', () => {
  openWithQuery('¿Cómo funciona esta funcionalidad?');
});
```

## Mejores Prácticas

1. **Usar siempre `ready()`**: Nunca llamar métodos antes de que el widget esté listo
2. **Gestión de errores**: Manejar errores en operaciones async como `open()` y `close()`
3. **Contexto mínimo**: Solo enviar datos relevantes para mejorar respuestas
4. **Cleanup de listeners**: Remover listeners cuando no se necesiten
5. **TypeScript**: Usar las definiciones de tipos para mejor DX
6. **Debug en desarrollo**: Activar modo debug para troubleshooting
