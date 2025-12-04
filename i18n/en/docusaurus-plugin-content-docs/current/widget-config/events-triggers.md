---
title: Trigger Types
description: All elements that can open the widget and how to customize them
slug: /widget-config/triggers
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Trigger Types

The widget detects **any element** with `id="ai-findr-trigger"`—buttons, links, inputs, or custom divs—and converts it into a trigger.

## 1 · Button

```html
<button id="ai-findr-trigger" type="button">Help</button>
```

## 2 · Search Input

```html
<input id="ai-findr-trigger" type="text" placeholder="How can I help you?" />
```

## 3 · Other Elements

```html
<a id="ai-findr-trigger" role="button">Virtual Assistant</a>
```

## 4 · Programmatic Control

```js
AIFindrWidget.open();
AIFindrWidget.close();
AIFindrWidget.toggle();
```
