---
title: HTML / JavaScript
description: Integración del widget de AIFindr en sitios web estáticos con HTML y JavaScript
slug: /widget-config/integraciones/html
sidebar_position: 4
---

:::info ¿Primera vez?
Lee la [guía de instalación](../instalacion) primero para entender los conceptos básicos.
:::

# HTML / JavaScript

La integración más simple y directa del widget de AIFindr. Ideal para sitios estáticos, landing pages o proyectos que no usan frameworks.

## Instalación completa

### 1. Estructura HTML básica

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mi sitio web</title>
</head>
<body>
  <!-- Tu contenido principal -->
  <header>
    <nav>
      <button id="ai-findr-trigger">¿Necesitas ayuda?</button>
    </nav>
  </header>

  <main>
    <!-- Contenido de tu página -->
  </main>

  <!-- Script del widget - antes de </body> -->
  <script
    src="https://hub.aifindr.ai/widget.js"
    data-client-id="TU_CLIENT_ID"
    defer
  ></script>
</body>
</html>
```

### 2. Personalización del trigger

El elemento trigger puede ser cualquier cosa que tenga `id="ai-findr-trigger"`:

```html
<!-- Botón tradicional -->
<button id="ai-findr-trigger" class="help-btn">
  Ayuda
</button>

<!-- Input de búsqueda -->
<input 
  id="ai-findr-trigger" 
  type="text" 
  placeholder="¿En qué te puedo ayudar?"
  class="search-input"
/>

<!-- Enlace convertido -->
<a id="ai-findr-trigger" role="button" class="help-link">
  Asistente virtual
</a>

<!-- Div personalizado -->
<div id="ai-findr-trigger" class="custom-trigger">
  <span>💬</span> Chat
</div>
```

## Control programático

### Métodos básicos

```html
<script>
// Esperar a que el widget esté listo
window.addEventListener('load', function() {
  if (window.AIFindrWidget) {
    // Abrir el widget
    AIFindrWidget.open();
    
    // Cerrar el widget
    AIFindrWidget.close();
    
    // Alternar (abrir/cerrar)
    AIFindrWidget.toggle();
  }
});
</script>
```

### Con contexto dinámico

```html
<script>
// Añadir contexto específico de la página
AIFindrWidget.ready(() => {
  AIFindrWidget.setContext({
    page: 'homepage',
    user_type: 'visitor',
    timestamp: new Date().toISOString()
  });
});

// Actualizar contexto dinámicamente
function updateContext(newData) {
  if (window.AIFindrWidget) {
    AIFindrWidget.mergeContext(newData);
  }
}
</script>
```

## Ejemplos de uso

### Landing page con formulario

```html
<!DOCTYPE html>
<html lang="es">
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
    <h1>Mi Producto</h1>
  </header>

  <main>
    <form id="contact-form">
      <input type="email" placeholder="Tu email" required>
      <button type="submit">Empezar</button>
    </form>
  </main>

  <!-- Botón flotante de ayuda -->
  <button id="ai-findr-trigger" class="help-btn">
    ¿Necesitas ayuda?
  </button>

  <script
    src="https://hub.aifindr.ai/widget.js"
    data-client-id="TU_CLIENT_ID"
    defer
  ></script>

  <script>
    // Contexto basado en interacciones
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

### Multi-página con contexto compartido

```html
<!-- En todas las páginas -->
<script>
  // Contexto global del sitio
  window.siteContext = {
    site_name: 'Mi Empresa',
    version: '1.0',
    language: 'es'
  };

  // Aplicar contexto cuando el widget esté listo
  AIFindrWidget.ready(() => {
    AIFindrWidget.setContext({
      ...window.siteContext,
      page: document.title,
      url: window.location.pathname
    });
  });
</script>
```

## Troubleshooting específico

### Verificar carga correcta

```html
<script>
window.addEventListener('load', function() {
  // Verificar que el widget se cargó
  if (typeof AIFindrWidget === 'object') {
    console.log('✅ Widget cargado correctamente');
    console.log('Métodos disponibles:', Object.keys(AIFindrWidget));
  } else {
    console.error('❌ Widget no encontrado');
  }
  
  // Verificar que el trigger existe
  const trigger = document.getElementById('ai-findr-trigger');
  if (trigger) {
    console.log('✅ Trigger encontrado:', trigger);
  } else {
    console.error('❌ Trigger no encontrado');
  }
});
</script>
```

### Problemas comunes

| Problema | Solución |
|----------|----------|
| Widget no aparece | Verificar `data-client-id` y que el script devuelva 200 OK |
| Trigger no funciona | Asegurar que existe `id="ai-findr-trigger"` |
| Contexto no se aplica | Usar `AIFindrWidget.ready()` antes de llamar métodos |
| Conflictos con otros scripts | Cargar el script con `defer` o al final del `<body>` |

## Próximos pasos

- [Personalización visual](../personalizacion) para adaptar el estilo
- [Contexto y metadatos](../contexto-metadatos) para respuestas más precisas
- [Tipos de triggers](../triggers) para diferentes elementos de activación