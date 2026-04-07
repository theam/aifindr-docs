---
title: HTML / JavaScript
description: AIFindr widget integration in static websites with HTML and JavaScript
slug: /widget-config/integraciones/html
sidebar_position: 5
---

:::info First time?
Read the [installation guide](../instalacion.md) first to understand the basics.
:::

# HTML / JavaScript

The simplest and most straightforward integration of the AIFindr widget. Ideal for static sites, landing pages, or projects that don't use frameworks.

## Complete Installation

### 1. Basic HTML structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My website</title>
</head>
<body>
  <!-- Your main content -->
  <header>
    <nav>
      <button id="ai-findr-trigger">Need help?</button>
    </nav>
  </header>

  <main>
    <!-- Your page content -->
  </main>

  <!-- Widget script - before </body> -->
  <script
    src="https://hub.aifindr.ai/widget.js"
    data-client-id="YOUR_CLIENT_ID"
    data-var="ar"
    defer
  ></script>
</body>
</html>
```

If you need a specific `variant`, add `data-var="ar"` to the script. Here, `ar` is just an example of an Arabic variant. If omitted or empty, the widget uses the project default view. Unless you have configured a specific `variant`, you do not need to include this attribute.

### Alternate hub only if the team tells you to

If the AIFindr team asks you to point the widget to another hub, you can add `data-widget-url` to the script:

```html
<script
  src="https://hub.aifindr.ai/widget.js"
  data-client-id="YOUR_CLIENT_ID"
  data-widget-url="https://hub.ksa.aifindr.ai"
  defer
></script>
```

In this example, `data-widget-url` points to `https://hub.ksa.aifindr.ai`. Do not change this value on your own: it should only be updated if the AIFindr team tells you to.

### 2. Trigger customization

The trigger element can be anything that has `id="ai-findr-trigger"`:

```html
<!-- Traditional button -->
<button id="ai-findr-trigger" class="help-btn">
  Help
</button>

<!-- Search input -->
<input
  id="ai-findr-trigger"
  type="text"
  placeholder="How can I help you?"
  class="search-input"
/>

<!-- Converted link -->
<a id="ai-findr-trigger" role="button" class="help-link">
  Virtual assistant
</a>

<!-- Custom div -->
<div id="ai-findr-trigger" class="custom-trigger">
  Chat
</div>
```

## Programmatic Control

### Basic methods

```html
<script>
// Wait for widget to be ready
window.addEventListener('load', function() {
  if (window.AIFindrWidget) {
    // Open widget
    AIFindrWidget.open();

    // Close widget
    AIFindrWidget.close();

    // Toggle (open/close)
    AIFindrWidget.toggle();
  }
});
</script>
```

### With dynamic context

```html
<script>
// Add page-specific context
AIFindrWidget.ready(() => {
  AIFindrWidget.setContext({
    page: 'homepage',
    user_type: 'visitor',
    timestamp: new Date().toISOString()
  });
});

// Update context dynamically
function updateContext(newData) {
  if (window.AIFindrWidget) {
    AIFindrWidget.mergeContext(newData);
  }
}
</script>
```

## Usage Examples

### Landing page with form

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Landing Page</title>
  <style>
    .help-btn {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 50px;
      padding: 15px 20px;
      cursor: pointer;
      z-index: 1000;
    }
  </style>
</head>
<body>
  <header>
    <h1>My Product</h1>
  </header>

  <main>
    <form id="contact-form">
      <input type="email" placeholder="Your email" required>
      <button type="submit">Get Started</button>
    </form>
  </main>

  <!-- Floating help button -->
  <button id="ai-findr-trigger" class="help-btn">
    Need help?
  </button>

  <script
    src="https://hub.aifindr.ai/widget.js"
    data-client-id="YOUR_CLIENT_ID"
    defer
  ></script>

  <script>
    // Context based on interactions
    document.getElementById('contact-form').addEventListener('focus', function() {
      if (window.AIFindrWidget) {
        AIFindrWidget.mergeContext({
          action: 'viewing_form',
          page_section: 'contact'
        });
      }
    }, true);
  </script>
</body>
</html>
```

### Multi-page with shared context

```html
<!-- On all pages -->
<script>
  // Site-wide global context
  window.siteContext = {
    site_name: 'My Company',
    version: '1.0',
    language: 'en'
  };

  // Apply context when widget is ready
  AIFindrWidget.ready(() => {
    AIFindrWidget.setContext({
      ...window.siteContext,
      page: document.title,
      url: window.location.pathname
    });
  });
</script>
```

## Specific Troubleshooting

### Verify correct loading

```html
<script>
window.addEventListener('load', function() {
  // Check if widget loaded
  if (typeof AIFindrWidget === 'object') {
    console.log('✅ Widget loaded correctly');
    console.log('Available methods:', Object.keys(AIFindrWidget));
  } else {
    console.error('❌ Widget not found');
  }

  // Check if trigger exists
  const trigger = document.getElementById('ai-findr-trigger');
  if (trigger) {
    console.log('✅ Trigger found:', trigger);
  } else {
    console.error('❌ Trigger not found');
  }
});
</script>
```

### Common problems

| Problem | Solution |
|----------|----------|
| Widget doesn't appear | Verify `data-client-id` and that the script returns 200 OK |
| Trigger doesn't work | Ensure `id="ai-findr-trigger"` exists |
| Context not applying | Use `AIFindrWidget.ready()` before calling methods |
| Conflicts with other scripts | Load script with `defer` or at end of `<body>` |

## Next Steps

- [Visual customization](../personalizacion.md) to adapt the style
- [Context and metadata](../contexto-metadatos.md) for more accurate responses
- [Trigger types](../events-triggers.md) for different activation elements
