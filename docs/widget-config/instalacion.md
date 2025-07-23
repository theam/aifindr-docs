---
title: Guía de Instalación
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Instalación básica

Sigue dos pasos: colocar el botón *trigger* y cargar el script del widget.

## Paso 1 · Añade el botón *trigger*

```html
<button id="ai-findr-trigger">Buscar</button>
````

<small>⚠️ El atributo **id="ai-findr-trigger"** es imprescindible para que el widget lo detecte.</small>

## Paso 2 · Carga el script

```html
<script
  src="https://app.aifindr.ai/widget-loader.js"
  data-client-id="CLIENT_ID"
  defer
></script>
```

> Sustituye **CLIENT\_ID** por tu identificador único. Sin él, el widget no funcionará.

---

## Instalación según tu *stack*

<Tabs groupId="framework">
  <TabItem value="html" label="HTML genérico" default>

Coloca el script al final de `<body>` o justo antes de `</head>`.
El atributo `defer` evita que bloquee la carga de la página.

  </TabItem>
  <TabItem value="angular" label="Angular">

1. **Botón** → `src/app/layout/header/header.component.html`

   ```html
   <button id="ai-findr-trigger" type="button">Buscar</button>
   ```
2. **Script** → `src/index.html` (antes de `</body>` o `</head>`).

   ```html
   <script
     src="https://app.aifindr.ai/widget-loader.js"
     data-client-id="CLIENT_ID"
     data-widget-url="https://app.aifindr.ai/widget"
     defer
   ></script>
   ```

  </TabItem>
  <TabItem value="wordpress" label="WordPress">

1. **Menú** → Apariencia > Menús → Enlace personal → URL `#aifindr`
2. **Snippet** (WPCode u otro) para convertir el enlace en botón:

   ```js
   /* ==== AIFindr Trigger ===== */
   (function () {
     function placeTrigger () {
       const link = document.querySelector('a[href="#aifindr"]');
       if (!link || document.getElementById('ai-findr-trigger')) return;
       const btn = document.createElement('button');
       btn.id = 'ai-findr-trigger';
       btn.type = 'button';
       btn.textContent = 'Chatear';
       btn.className = link.className;
       link.replaceWith(btn);
     }
     placeTrigger();
   })();
   ```
3. **Script** → Apariencia > Editor de temas → `footer.php` antes de `</body>` (igual que en HTML).

  </TabItem>
</Tabs>

---

## Resolución de problemas comunes

| Problema                        | Solución                                                                       |
| ------------------------------- | ------------------------------------------------------------------------------ |
| El botón no abre el panel       | Comprueba que el id sea **ai-findr-trigger** y que el script devuelve 200 OK.  |
| El panel tapa tu encabezado     | Define la variable `--ai-nav-height` o envía la altura por JS (ver más abajo). |
| Error: “Missing data‑client‑id” | Asegúrate de incluir tu **CLIENT\_ID** real.                                   |
| El panel parpadea o desaparece  | Algún CSS global pisa `body { overflow }`. Revísalo o elimínalo.               |
| El widget no carga              | Revisa si hay extensiones/ad‑blockers o políticas CSP restrictivas.            |
