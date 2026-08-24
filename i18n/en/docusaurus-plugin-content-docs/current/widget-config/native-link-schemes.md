---
title: Native links (URL)
description: Explicitly and safely enable media-card links to native screens
slug: /widget-config/native-link-schemes
sidebar_position: 7
---

# Native links (URL)

`nativeLinkSchemes` allows media cards to use URLs with application-specific protocols, such as `acme://product/123`.

This mechanism is intended for applications that already expose deep links and want to reuse them from the widget. Custom schemes are disabled by default. Enable only the schemes that the embedding host can intercept and validate.

:::caution Host responsibility
This option allows a scheme, but it does not validate its routes or identifiers. Before opening a native screen, the host must inspect the complete URL and reject every target it does not explicitly support.
:::

## Script configuration

Add `data-native-link-schemes` to the widget script. Separate multiple schemes with commas:

```html
<script
  src="https://hub.aifindr.ai/widget.js"
  data-client-id="YOUR_CLIENT_ID"
  data-native-link-schemes="acme,partner-app"
  defer
></script>
```

Scheme names are normalized to lowercase and may be written with or without `:`. Enable only schemes owned by trusted hosts.

## Programmatic configuration

If you create the widget through the JavaScript factory, use the equivalent `nativeLinkSchemes` option:

```js
const widget = AIFindrWidget.create({
  clientId: 'YOUR_CLIENT_ID',
  nativeLinkSchemes: ['acme'],
});

await widget.initialize();
```

The configuration is read during initialization. To change it, destroy and recreate the widget.

## Media cards and conversational fallback

A card can contain both the native link and a fallback query:

```html
<MC
  t="Product 123"
  url="acme://product/123"
  q=""
/>
```

When the user selects the card:

1. If the host declares `acme`, the native URL takes precedence.
2. If the host does not declare `acme`, the widget discards that URL and uses `q` as the next query.
3. A present `q=""` uses the exact `t` value, in this example `Product 123`.
4. If `q` is omitted and the scheme is not enabled, the card has no fallback action.

The fallback depends on configuration, not on the navigation result. If the host enables `acme` but later rejects `acme://product/123`, the widget does not execute `q` automatically.

## React Native

When the application embeds the widget in `react-native-webview`, it must propagate the schemes to the script, intercept the URLs, and validate them before opening a screen.

See [Implement native links in React Native](./integraciones/react-native.md#31-native-links-url) for the complete wrapper and example. The React Native guide links back to this page as the contract, fallback, and security reference.

## Security policy

- `http:` and `https:` retain their normal behavior and require no configuration.
- Every additional scheme requires explicit opt-in.
- Each widget instance accepts up to eight custom schemes.
- Executable or privileged protocols such as `javascript:`, `data:`, `file:`, and `intent:` remain blocked even when declared.
- Platform schemes such as `tel:` are enabled only when the host explicitly declares them.

## Recommended verification

1. Test the card without `nativeLinkSchemes` and confirm that it executes the `q` fallback.
2. Enable the scheme and confirm that the host receives the complete URL.
3. Test both regular navigation and links that request a new window.
4. Test invalid routes and identifiers and confirm that the host rejects them without allowing WebView navigation.
5. Verify the behavior on a real device; a web preview cannot reliably reproduce navigation between a WebView and a native app.
