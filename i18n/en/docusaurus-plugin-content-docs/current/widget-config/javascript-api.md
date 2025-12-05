---
title: API Reference
description: Complete reference of the AIFindr widget JavaScript API
slug: /widget-config/api-reference
sidebar_position: 6
---

# API Reference

Complete documentation of the AIFindr widget JavaScript API. The global `AIFindrWidget` object provides a complete interface for controlling the widget.

## Initialization

### `AIFindrWidget.ready(callback?)`

Executes code when the widget is fully loaded.

**Parameters:**
- `callback` (function, optional): Function to execute when ready

**Returns:**
- If no callback passed: `Promise<void>`
- If callback passed: `undefined`

```js
// Using callback
AIFindrWidget.ready(() => {
  console.log('Widget ready!');
  AIFindrWidget.setContext({ userId: '123' });
});

// Using Promise
await AIFindrWidget.ready();
console.log('Widget ready!');
```

### `AIFindrWidget.isReady()`

Checks if the widget is ready to use.

**Returns:** `boolean`

```js
if (AIFindrWidget.isReady()) {
  AIFindrWidget.open();
} else {
  console.log('Widget is not ready yet');
}
```

## Widget Control

### `AIFindrWidget.open()`

Opens the widget and displays the chat interface.

**Returns:** `Promise<void>`

```js
// Open the widget
try {
  await AIFindrWidget.open();
  console.log('Widget opened successfully');
} catch (error) {
  console.error('Error opening widget:', error);
}
```

### `AIFindrWidget.close()`

Closes the widget and hides the interface.

**Returns:** `Promise<void>`

```js
// Close the widget
try {
  await AIFindrWidget.close();
  console.log('Widget closed');
} catch (error) {
  console.error('Error closing widget:', error);
}
```

### `AIFindrWidget.toggle()`

Toggles between opening and closing the widget.

**Returns:** `Promise<void>`

```js
// Toggle widget state
await AIFindrWidget.toggle();
```

## Context Management

### `AIFindrWidget.setContext(context)`

Completely replaces the current context.

**Parameters:**
- `context` (object): New context to set

**Notes:**
- Keys that match metadata will be ignored with a warning
- Context is automatically sent to iframe when open

```js
AIFindrWidget.setContext({
  userId: '12345',
  userType: 'premium',
  currentPage: 'dashboard',
  language: 'en'
});
```

### `AIFindrWidget.mergeContext(contextUpdate)`

Adds or updates specific context keys without affecting the rest.

**Parameters:**
- `contextUpdate` (object): Object with keys to add/update

```js
// Initial context
AIFindrWidget.setContext({ userId: '123', page: 'home' });

// Update only the page
AIFindrWidget.mergeContext({ page: 'products', timestamp: Date.now() });

// Result: { userId: '123', page: 'products', timestamp: 1703123456789 }
```

### `AIFindrWidget.getContext()`

Gets a copy of the current context.

**Returns:** `object` - Copy of current context

```js
const currentContext = AIFindrWidget.getContext();
console.log('Context:', currentContext);

// Modifying the copy doesn't affect the real context
currentContext.newKey = 'value'; // Doesn't affect the widget
```

### `AIFindrWidget.getMetadata()`

Gets the metadata defined in the script.

**Returns:** `object` - Copy of metadata

```js
// If the script has: data-meta-environment="production"
const metadata = AIFindrWidget.getMetadata();
console.log(metadata); // { environment: "production" }
```

**Notes:**
- Metadata combines `data-meta-*` attributes from the script with UTM parameters from the URL
- UTM parameters from the URL are automatically grouped under the `utm` key
- This information is read-only and defined when loading the widget

```js
// Example 1: Script metadata only
// Script: <script data-meta-environment="production" data-meta-market="en">
const metadata = AIFindrWidget.getMetadata();
console.log(metadata);
// { environment: "production", market: "en" }

// Example 2: Script metadata + UTM parameters
// Script: <script data-meta-market="en">
// URL: https://example.com?utm_source=google&utm_medium=cpc
const metadata = AIFindrWidget.getMetadata();
console.log(metadata);
// { market: "en", utm: { source: "google", medium: "cpc" } }
```

## Event System

### `AIFindrWidget.on(event, callback)`

Registers a listener for a specific event.

**Parameters:**
- `event` (string): Event name
- `callback` (function): Function to execute when the event occurs

```js
AIFindrWidget.on('widget.opened', () => {
  console.log('Widget was opened');
});

AIFindrWidget.on('widget.closed', () => {
  console.log('Widget was closed');
});
```

### `AIFindrWidget.off(event, callback)`

Unregisters a specific event listener.

**Parameters:**
- `event` (string): Event name
- `callback` (function): Listener function to remove

```js
const handler = () => console.log('Widget opened');

// Register
AIFindrWidget.on('widget.opened', handler);

// Unregister
AIFindrWidget.off('widget.opened', handler);
```

## Available Events

### `AIFindrWidget.EVENTS`

Constants with the names of all available events.

```js
const { EVENTS } = AIFindrWidget;

// Widget lifecycle events
AIFindrWidget.on(EVENTS.WIDGET_READY, () => {
  console.log('Widget initialized and ready');
});

AIFindrWidget.on(EVENTS.WIDGET_OPENED, () => {
  console.log('Widget opened');
});

AIFindrWidget.on(EVENTS.WIDGET_CLOSED, () => {
  console.log('Widget closed');
});

AIFindrWidget.on(EVENTS.WIDGET_ERROR, (error) => {
  console.error('Widget error:', error);
});

// Conversation events
AIFindrWidget.on(EVENTS.CONV_STARTED, (data) => {
  console.log('Conversation started:', data);
});

AIFindrWidget.on(EVENTS.MESSAGE_SENT, (message) => {
  console.log('Message sent:', message);
});

AIFindrWidget.on(EVENTS.MESSAGE_RECV, (message) => {
  console.log('Message received:', message);
});
```

### Event List

| Event | Description | Data |
|--------|-------------|-------|
| `widget.ready` | Widget initialized and ready | `undefined` |
| `widget.opened` | Widget opened successfully | `undefined` |
| `widget.closed` | Widget closed | `undefined` |
| `widget.error` | Error in widget | `Error object` |
| `conversation.started` | New conversation started | `{ conversationId, timestamp }` |
| `message.sent` | User sent a message | `{ message, timestamp }` |
| `message.received` | AI responded with a message | `{ message, timestamp }` |

## Advanced Methods

### `AIFindrWidget.dispatch(event, payload)`

Sends a custom event to the widget iframe.

**Parameters:**
- `event` (string): Event name
- `payload` (object, optional): Data to send

**Notes:**
- Only works with events defined in `BRIDGE_EVENTS`
- Automatically queues if widget is not ready

```js
// Send custom event
AIFindrWidget.dispatch('custom.event', {
  action: 'highlight_feature',
  featureId: 'new-dashboard'
});
```

### `AIFindrWidget.getState()`

Gets the current widget state.

**Returns:** `string` - Current state ('init', 'loading', 'ready', 'open', 'closing', 'error')

```js
const state = AIFindrWidget.getState();
console.log('Current state:', state);

if (state === 'ready') {
  AIFindrWidget.open();
}
```

## Lifecycle Management

### `AIFindrWidget.initialize()`

Initializes the widget manually. Normally runs automatically.

**Returns:** `Promise<void>`

```js
// Rarely needed, widget initializes automatically
await AIFindrWidget.initialize();
```

### `AIFindrWidget.destroy()`

Completely destroys the widget and cleans up all resources.

```js
// Clean up widget when exiting page
window.addEventListener('beforeunload', () => {
  AIFindrWidget.destroy();
});
```

## Debug API

### `AIFindrWidget._debug`

Internal methods for debugging (development only).

```js
// Get complete internal state
const debugInfo = AIFindrWidget._debug.getState();
console.log('Debug info:', debugInfo);

// Get current context (direct reference)
const contextRef = AIFindrWidget._debug.getContext();

// Get event listeners
const listeners = AIFindrWidget._debug.getEventListeners();

// Get initialization configuration
const options = AIFindrWidget._debug.getOptions();
```

### Debug Mode

Activates detailed logging for troubleshooting:

```js
// Activate debug mode
localStorage.setItem('aifindr_debug', 'true');

// Reload page to apply
location.reload();

// View debug state
console.log(AIFindrWidget._debug.getState());
```

## TypeScript

Type definitions for use with TypeScript:

```typescript
declare global {
  interface Window {
    AIFindrWidget: {
      // Constants
      EVENTS: {
        WIDGET_READY: 'widget.ready';
        WIDGET_OPENED: 'widget.opened';
        WIDGET_CLOSED: 'widget.closed';
        WIDGET_ERROR: 'widget.error';
        CONV_STARTED: 'conversation.started';
        MESSAGE_SENT: 'message.sent';
        MESSAGE_RECV: 'message.received';
      };

      // Widget control
      ready: (callback?: () => void) => Promise<void> | undefined;
      isReady: () => boolean;
      open: () => Promise<void>;
      close: () => Promise<void>;
      toggle: () => Promise<void>;

      // Context management
      setContext: (context: Record<string, any>) => void;
      mergeContext: (contextUpdate: Record<string, any>) => void;
      getContext: () => Record<string, any>;
      getMetadata: () => Record<string, any>;

      // Events
      on: (event: string, callback: (data?: any) => void) => void;
      off: (event: string, callback: (data?: any) => void) => void;

      // Advanced methods
      dispatch: (event: string, payload?: any) => void;
      getState: () => 'init' | 'loading' | 'ready' | 'open' | 'closing' | 'error';

      // Lifecycle
      initialize: () => Promise<void>;
      destroy: () => void;

      // Debug (development)
      _debug: {
        getState: () => any;
        getContext: () => Record<string, any>;
        getEventListeners: () => Record<string, Function[]>;
        getOptions: () => any;
      };
    };
  }
}

// Types for events
interface WidgetEventData {
  'widget.ready': undefined;
  'widget.opened': undefined;
  'widget.closed': undefined;
  'widget.error': Error;
  'conversation.started': { conversationId: string; timestamp: string };
  'message.sent': { message: string; timestamp: string };
  'message.received': { message: string; timestamp: string };
}

// Helper for typed listeners
function onWidgetEvent<T extends keyof WidgetEventData>(
  event: T,
  callback: (data: WidgetEventData[T]) => void
): void {
  AIFindrWidget.on(event, callback);
}
```

## Usage Examples

### Basic Integration

```js
// Wait until ready and initialize context
AIFindrWidget.ready(() => {
  // Set initial context
  AIFindrWidget.setContext({
    userId: getCurrentUserId(),
    language: getUserLanguage(),
    plan: getUserPlan()
  });

  // Set up listeners
  AIFindrWidget.on('widget.opened', () => {
    trackEvent('widget_opened');
  });

  AIFindrWidget.on('conversation.started', () => {
    trackEvent('conversation_started');
  });
});
```

### Dynamic Context Update

```js
// In a SPA, update context on navigation
router.on('route:changed', (route) => {
  AIFindrWidget.mergeContext({
    currentRoute: route.path,
    routeParams: route.params,
    timestamp: new Date().toISOString()
  });
});

// Update context based on application state
store.subscribe((state) => {
  AIFindrWidget.mergeContext({
    userPreferences: state.user.preferences,
    cartItems: state.cart.itemCount,
    currentSection: state.ui.currentSection
  });
});
```

### Advanced Programmatic Control

```js
// Open widget with specific query
async function openWithQuery(query) {
  // Set specific context
  AIFindrWidget.mergeContext({
    pendingQuery: query,
    querySource: 'programmatic'
  });

  try {
    await AIFindrWidget.open();
    console.log('Widget opened with query:', query);
  } catch (error) {
    console.error('Error opening widget:', error);
  }
}

// Use in specific buttons
document.querySelector('#help-billing').addEventListener('click', () => {
  openWithQuery('I have a question about my billing');
});

document.querySelector('#help-features').addEventListener('click', () => {
  openWithQuery('How does this feature work?');
});
```

## Best Practices

1. **Always use `ready()`**: Never call methods before the widget is ready
2. **Error handling**: Handle errors in async operations like `open()` and `close()`
3. **Minimal context**: Only send data relevant for improving responses
4. **Listener cleanup**: Remove listeners when not needed
5. **TypeScript**: Use type definitions for better DX
6. **Debug in development**: Activate debug mode for troubleshooting
