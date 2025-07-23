---
title: Contexto y Metadatos
description: Personaliza las respuestas del asistente enviando datos relevantes
sidebar_position: 4
---

# 🏷️ Metadatos vs 💬 Contexto

| Aspecto | Metadatos | Contexto |
|---------|-----------|----------|
| ¿Cuándo se define? | En el `<script>` (atributos `data-meta-*`) | Vía API (`setContext`, `mergeContext`) |
| ¿Se puede cambiar? | ❌ No | ✅ Sí (shallow merge) |
| ¿La IA lo ve? | ❌ No | ✅ Sí |
| ¿Aparece en el dashboard? | ✅ Sí | ❌ No |

## 1. Metadatos (estáticos)

```html
<script
  src="https://app.aifindr.ai/widget-loader.js"
  data-client-id="mi-tienda"
  data-meta-market="es"
  data-meta-campaign="summer-2025"
  defer
></script>
````

*Usa **kebab‑case** y valores concisos.*

## 2. Contexto (dinámico)

```js
AIFindrWidget.ready(() => {
  // Contexto inicial
  AIFindrWidget.setContext({
    userId: '123',
    stage : 'landing'
  });

  // Actualizar más tarde
  AIFindrWidget.mergeContext({
    stage: 'checkout',
    cartTotal: 199.99
  });
});
```

\:::tip Do / Don’t
**✅ Haz**: enviar sólo datos útiles para la IA.
**❌ No envíes** datos sensibles (tarjetas, contraseñas).
\:::

### Debug rápido

```js
console.log('Context:', AIFindrWidget.getContext());
console.log('Metadata:', AIFindrWidget.getMetadata());
```

> Pásate a la [**API Reference**](./api-reference) para ver todos los métodos disponibles.
