---
title: Personalización Visual
description: Guía completa para personalizar la apariencia y comportamiento del widget de AIFindr
slug: /widget-config/personalizacion
sidebar_position: 7
---

# Personalización Visual

El widget de AIFindr ofrece múltiples opciones de personalización para adaptarse perfectamente a tu diseño y marca.

## Configuración del Widget

La personalización se realiza a través de la **configuración del proyecto** en tu dashboard de AIFindr, que se aplica automáticamente sin necesidad de código adicional.

### Modos de Visualización

#### `displayMode: "overlay"` (Por defecto)
Widget que ocupa toda la pantalla con overlay de fondo.

```html
<!-- Se adapta automáticamente al header fijo -->
<header id="main-header">Mi Header</header>
<script
  src="https://hub.aifindr.ai/widget.js"
  data-client-id="TU_CLIENT_ID"
  defer
></script>
```

#### `displayMode: "floating"`
Widget flotante en una esquina de la pantalla.

## CSS Variables Disponibles

### Variable de altura del header

La variable `--ai-nav-height` controla el desplazamiento del overlay para headers fijos:

```css
:root {
  /* Altura fija */
  --ai-nav-height: 64px;
  
  /* Cálculo dinámico */
  --ai-nav-height: calc(60px + 1rem);
  
  /* Responsive */
  --ai-nav-height: clamp(60px, 8vh, 80px);
}
```

### Variables de personalización del botón

```css
.ai-findr-trigger-button {
  /* Estas propiedades se configuran desde el dashboard, 
     pero puedes sobrescribirlas con CSS */
  
  --button-gap: 8px;
  --button-padding: 12px 16px;
  --button-border-radius: 8px;
  --button-background: #2563eb;
  --button-text-color: #ffffff;
  --button-border: 1px solid transparent;
  --button-font-size: 14px;
  --button-font-weight: 500;
  --button-box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
```

## Tipos de Trigger y Estilos

### Botón Trigger

El botón tiene clases específicas para personalización:

```css
/* Botón base */
.ai-findr-trigger-button {
  /* Estilos base aplicados automáticamente */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: opacity .2s ease, transform .2s ease;
}

/* Estado hover */
.ai-findr-trigger-button:hover {
  opacity: 0.8; /* Configurable desde dashboard */
}

/* Estado cuando el widget está abierto */
.ai-findr-trigger-button.ai-findr-open {
  opacity: 0;
  transform: scale(.9);
  pointer-events: none;
}

/* Icono del magnifier con sparkles */
.ai-magnifier {
  position: relative;
  width: 24px;
  height: 24px;
  color: inherit;
}

/* Sparkles animados */
.ai-magnifier::before,
.ai-magnifier::after {
  /* Estrellas que aparecen con animación */
  animation: bcp-animar-estrella-ia 2s cubic-bezier(.18,0.89,0.32,1.28) infinite;
}
```

### Input Trigger

Para triggers de tipo input, se generan automáticamente estas clases:

```css
/* Container del input */
.ai-findr-trigger-input-container {
  display: inline-flex;
  align-items: center;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow .2s ease, border-color .2s ease;
}

.ai-findr-trigger-input-container:focus-within {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Icono dentro del input */
.ai-findr-trigger-icon {
  display: flex;
  align-items: center;
  padding: 0 12px;
}

/* Campo de texto */
.ai-findr-trigger-input {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
}

/* Botón de submit */
.ai-findr-trigger-submit {
  display: flex;
  align-items: center;
  padding: 0 16px;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: opacity .2s ease;
}
```

## Estados del Widget

### Estados del overlay/floating container

```css
/* Container oculto */
#ai-findr-widget-overlay,
#ai-findr-floating-container {
  opacity: 0;
  pointer-events: none;
  transition: opacity .25s ease;
}

/* Container visible */
#ai-findr-widget-overlay.ai-findr-visible,
#ai-findr-floating-container.ai-findr-visible {
  opacity: 1;
  pointer-events: auto;
}

/* Floating container específico */
#ai-findr-floating-container {
  transform: translateY(20px);
  transition: all .3s ease;
}

#ai-findr-floating-container.ai-findr-visible {
  transform: translateY(0);
}
```

### Botón de cerrar

```css
.ai-findr-close-button {
  opacity: 0;
  position: absolute;
  top: 15px;
  right: 20px;
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: scale .15s, opacity .25s ease;
}

.ai-findr-close-button:hover {
  scale: 1.1;
}

.ai-findr-visible .ai-findr-close-button {
  opacity: 1;
}
```

## Troubleshooting de Estilos

### Problemas comunes

```css
/* Problema: Estilos no se aplican */
/* Solución: Aumentar especificidad */
.ai-findr-trigger-button.ai-findr-trigger-button {
  background: #custom-color !important;
}

/* Problema: Animaciones conflictivas */
/* Solución: Resetear animaciones */
.ai-findr-trigger-button {
  animation: none;
}

/* Problema: z-index conflicts */
/* Solución: Asegurar z-index alto */
#ai-findr-widget-overlay {
  z-index: 2147483646 !important;
}

#ai-findr-floating-container {
  z-index: 2147483646 !important;
}
```

### Debug de estilos

```js
// Ver estilos aplicados
const trigger = document.getElementById('ai-findr-trigger');
console.log('Estilos computados:', getComputedStyle(trigger));

// Ver clases aplicadas
console.log('Clases:', trigger.className);

// Ver estado del widget
console.log('Estado widget:', AIFindrWidget.getState());
```

## Mejores Prácticas

1. **Consistencia**: Mantener coherencia con el diseño existente
2. **Accesibilidad**: Asegurar contraste adecuado y focus visible
3. **Performance**: Evitar animaciones complejas en móviles
4. **Responsive**: Probar en diferentes tamaños de pantalla
5. **Testing**: Verificar en diferentes navegadores
6. **Fallbacks**: Proporcionar estilos de respaldo para navegadores antiguos
