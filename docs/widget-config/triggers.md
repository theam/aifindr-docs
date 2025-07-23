---
title: Tipos de Triggers
description: Todos los elementos que pueden abrir el widget y cómo personalizarlos
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Tipos de Triggers

El widget detecta **cualquier elemento** con `id="ai-findr-trigger"`—botones, enlaces, inputs o divs custom—y lo convierte en disparador.

## 1 · Botón (`<button>` / `<a role="button">`)

| Ventaja | Detalle |
| ------- | ------- |
| ✨ Ícono animado | Se añade automáticamente (lupa con estrellitas) |
| 🎭 Ocultación auto | Desaparece suavemente cuando el widget está abierto |
| 🎨 Hereda estilos | Respeta tus clases y variables de diseño |

```html
<button id="ai-findr-trigger" type="button">
  Ayuda
</button>
````

## 2 · Input (`<input type="text">`) — *Búsqueda conversacional*

* El usuario escribe su pregunta → pulsa **Enter** → el widget se abre con la consulta precargada.
* El campo se envuelve en `.ai-findr-trigger-input-container`, con lupa y botón *submit*.

```html
<input
  id="ai-findr-trigger"
  type="text"
  placeholder="¿En qué te puedo ayudar?"
/>
```

## 3 · Otros elementos (link, div, etc.)

```html
<a id="ai-findr-trigger" role="button">Asistente virtual</a>

<div id="ai-findr-trigger" class="help-chip">
  <span>¿Necesitas ayuda?</span>
</div>
```

## 4 · Triggers múltiples y dinámicos

Puedes tener *muchos* triggers; el loader observa el DOM y enlaza los que aparezcan más tarde.

```js
// Trigger añadido dinámicamente
const btn = document.createElement('button');
btn.id = 'ai-findr-trigger';
btn.textContent = 'Nuevo trigger';
document.body.appendChild(btn); // El widget lo detecta
```

## 5 · Control programático

```js
// Abrir
AIFindrWidget.open();

// Cerrar
AIFindrWidget.close();

// Alternar
AIFindrWidget.toggle();
```

> Continúa en [**Contexto y Metadatos**](./contexto-metadatos) para ver cómo precargar preguntas o información del usuario.
