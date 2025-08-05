---
title: Tipos de Triggers
description: Todos los elementos que pueden abrir el widget y cómo personalizarlos
slug: /widget-config/triggers
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Tipos de Triggers

El widget detecta **cualquier elemento** con `id="ai-findr-trigger"`—botones, enlaces, inputs o divs custom—y lo convierte en disparador.

## 1 · Botón

```html
<button id="ai-findr-trigger" type="button">Ayuda</button>
```

## 2 · Input de búsqueda

```html
<input
  id="ai-findr-trigger"
  type="text"
  placeholder="¿En qué te puedo ayudar?"
/>
```

## 3 · Otros elementos

```html
<a id="ai-findr-trigger" role="button">Asistente virtual</a>
```

## 4 · Control programático

```js
AIFindrWidget.open();
AIFindrWidget.close();
AIFindrWidget.toggle();
```

## 5 · Apertura automática

Para que el widget se abra automáticamente al cargar la página, necesitas agregar estos elementos:

### En el `<head>`, después del script del widget:

```html
<!-- Ocultar botón de cerrar del widget -->
<style>
  .ai-findr-close-button {
    display: none !important;
  }
</style>
```

### En el `<body>`, agrega el botón trigger oculto:

```html
<!-- Botón trigger oculto (requerido por el widget loader) -->
<button id="ai-findr-trigger" style="display: none;">AI</button>
```

### Al final del `<body>`, antes del cierre de la etiqueta:

```html
<!-- Script para auto-abrir el widget -->
<script>
  document.addEventListener("DOMContentLoaded", () => {
    const triggerBtn = document.getElementById("ai-findr-trigger");
    if (triggerBtn) {
      // Delay pequeño para permitir que el loader adjunte el event handler
      setTimeout(() => triggerBtn.click(), 300);
    }
  });
</script>
```

### Ejemplo completo:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mi Sitio con Widget Auto-abierto</title>

    <!-- Widget script -->
    <script
      src="https://hub.aifindr.ai/widget.js"
      data-client-id="tu-client-id"
      defer
    ></script>

    <!-- Ocultar botón de cerrar del widget -->
    <style>
      .ai-findr-close-button {
        display: none !important;
      }
    </style>
  </head>

  <body>
    <!-- ... -->
    <!-- Botón trigger oculto (requerido por el widget loader) -->
    <button id="ai-findr-trigger" style="display: none;">AI</button>

    <!-- Script para auto-abrir el widget -->
    <script>
      document.addEventListener("DOMContentLoaded", () => {
        const triggerBtn = document.getElementById("ai-findr-trigger");
        if (triggerBtn) {
          // Delay pequeño para permitir que el loader adjunte el event handler
          setTimeout(() => triggerBtn.click(), 300);
        }
      });
    </script>
  </body>
</html>
```

### Notas importantes:

- Reemplaza `"tu-client-id"` con tu ID de cliente real
- El delay de 300ms es crucial para la correcta inicialización del widget
- El botón trigger oculto es requerido por el widget loader
- El widget se abrirá automáticamente una vez que la página termine de cargar
