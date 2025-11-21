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
<input id="ai-findr-trigger" type="text" placeholder="¿En qué te puedo ayudar?" />
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
