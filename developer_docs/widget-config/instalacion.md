---
title: Guía de Instalación
description: Cómo instalar el widget de AIFindr en tu sitio web paso a paso
slug: /widget-config/instalacion
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Instalación del Widget

La integración del widget se realiza en dos simples pasos. ¡Vamos allá!

## Paso 1 · Añade el elemento trigger

El trigger es el elemento que tus usuarios utilizarán para abrir el asistente. 

<Tabs>
  <TabItem value="button" label="Botón" default>

```html
<button id="ai-findr-trigger" type="button">Buscar</button>
```

  </TabItem>
  <TabItem value="input" label="Campo de búsqueda">

```html
<input 
  id="ai-findr-trigger" 
  type="text" 
  placeholder="¿En qué te puedo ayudar?"
/>
```

  </TabItem>
</Tabs>

:::caution Importante
El atributo `id="ai-findr-trigger"` es **obligatorio** para que el widget detecte el elemento.
:::

## Paso 2 · Carga el script del widget

```html
<script
  src="https://hub.aifindr.ai/widget.js"
  data-client-id="TU_CLIENT_ID"
  defer
></script>
```

:::info
Reemplaza `TU_CLIENT_ID` con el identificador único proporcionado por AIFindr. Sin él, el widget no funcionará.
:::

### ¿Dónde colocar el script?

- **Opción recomendada**: Antes del cierre de `</body>`
- **Alternativa**: En el `<head>` con el atributo `defer`

El atributo `defer` asegura que el script no bloquee la carga de tu página.

## ¡Listo! 🎉

Con estos dos pasos, el widget ya está funcionando. Los usuarios pueden hacer clic en el trigger para abrir el asistente.

---

## Siguiente paso: Guía específica para tu stack

<div className="stack-cards">
  
**HTML / JavaScript**  
Integración simple para sitios estáticos  
[Ver guía →](./integraciones/html)

**React & Next.js**  
Con hooks optimizados y SSR  
[Ver guía →](./integraciones/react-nextjs)

**Angular**  
Integración con TypeScript y routing  
[Ver guía →](./integraciones/angular)

**WordPress**  
Plugins y personalización de temas  
[Ver guía →](./integraciones/wordpress)

</div>

---

## Verificar la instalación

1. **Abre la consola del navegador** (F12)
2. **Escribe**: `AIFindrWidget`
3. **Deberías ver**: Un objeto con métodos disponibles
