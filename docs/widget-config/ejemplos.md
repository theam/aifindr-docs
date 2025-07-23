---
title: Ejemplos completos
sidebar_position: 4
---

# Ejemplos de integración

A continuación tienes ejemplos 100 % funcionales que cubren las situaciones más comunes.

## 1 · HTML estático

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Mi landing</title>
    <script
      src="https://app.aifindr.ai/widget.js"
      data-client-id="tu_CLIENT_ID"
      defer
    ></script>
    <style>
      :root { --ai-nav-height: 64px; }
    </style>
  </head>
  <body>
    <header style="height:64px; position:fixed; top:0; width:100%; background:#fff">
      <button id="ai-findr-trigger">Buscar</button>
    </header>
    <main style="padding-top:64px">
      <!-- Contenido -->
    </main>
  </body>
</html>
````

## 2 · Angular (módulo raíz)

```ts
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

Luego sigue los pasos de la pestaña *Angular* de la guía de instalación.

## 3 · WordPress con WPCode

Incluye el snippet del botón y el script global; ajusta la variable `--ai-nav-height` en **Apariencia > Personalizar > CSS adicional**.

```css
:root { --ai-nav-height: 254px; }
@media (max-width: 1200px) { :root { --ai-nav-height: 102px; } }
```

> ¿Necesitas más ayuda? Escríbenos a **[producteam@aifindr.ai](mailto:producteam@aifindr.ai)**.
