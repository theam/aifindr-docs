---
title: Installation Guide
description: How to install the AIFindr widget on your website step by step
slug: /widget-config/instalacion
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Widget Installation

Widget integration is done in two simple steps. Let's get started!

## Step 1 · Add the trigger element

The trigger is the element your users will use to open the assistant.

<Tabs>
  <TabItem value="button" label="Button" default>

```html
<button id="ai-findr-trigger" type="button">Search</button>
```

  </TabItem>
  <TabItem value="input" label="Search Field">

```html
<input
  id="ai-findr-trigger"
  type="text"
  placeholder="How can I help you?"
/>
```

  </TabItem>
</Tabs>

:::caution Important
The `id="ai-findr-trigger"` attribute is **required** for the widget to detect the element.
:::

## Step 2 · Load the widget script

```html
<script
  src="https://hub.aifindr.ai/widget.js"
  data-client-id="YOUR_CLIENT_ID"
  defer
></script>
```

:::info
Replace `YOUR_CLIENT_ID` with the unique identifier provided by AIFindr. Without it, the widget won't work.
:::

### Where to place the script?

- **Recommended option**: Before the closing `</body>` tag
- **Alternative**: In the `<head>` with the `defer` attribute

The `defer` attribute ensures the script doesn't block your page load.

## Done! 🎉

With these two steps, the widget is now working. Users can click on the trigger to open the assistant.

---

## Next step: Specific guide for your stack

<div className="stack-cards">

**HTML / JavaScript**
Simple integration for static sites
[View guide →](./integrations/html)

**React & Next.js**
With optimized hooks and SSR
[View guide →](./integrations/react-nextjs)

**Angular**
Integration with TypeScript and routing
[View guide →](./integrations/angular)

**WordPress**
Plugins and theme customization
[View guide →](./integrations/wordpress)

</div>

---

## Verify installation

1. **Open the browser console** (F12)
2. **Type**: `AIFindrWidget`
3. **You should see**: An object with available methods
