---
title: Enlaces nativos (URL)
description: Habilita enlaces de media cards hacia pantallas nativas de forma explícita y segura
slug: /widget-config/native-link-schemes
sidebar_position: 7
---

# Enlaces nativos (URL)

`nativeLinkSchemes` permite que las media cards utilicen URLs con protocolos propios de una aplicación, por ejemplo `acme://product/123`.

Este mecanismo está pensado para aplicaciones que ya tienen deep links y quieren reutilizarlos desde el widget. Los esquemas personalizados están deshabilitados por defecto. Habilita únicamente los que el host pueda interceptar y validar.

:::caution Responsabilidad del host
Esta opción permite el esquema, pero no valida sus rutas ni identificadores. Antes de abrir una pantalla nativa, el host debe comprobar la URL completa y rechazar cualquier destino que no esté expresamente soportado.
:::

## Activación desde el script

Añade `data-native-link-schemes` al script del widget. Para declarar varios esquemas, sepáralos con comas:

```html
<script
  src="https://hub.aifindr.ai/widget.js"
  data-client-id="TU_CLIENT_ID"
  data-native-link-schemes="acme,partner-app"
  defer
></script>
```

Los nombres se normalizan a minúsculas y puedes escribirlos con o sin `:`. Habilita solo esquemas propios de hosts de confianza.

## Activación programática

Si creas el widget mediante la factory JavaScript, utiliza la opción equivalente `nativeLinkSchemes`:

```js
const widget = AIFindrWidget.create({
  clientId: 'TU_CLIENT_ID',
  nativeLinkSchemes: ['acme'],
});

await widget.initialize();
```

La configuración se lee durante la inicialización. Si necesitas cambiarla, destruye y vuelve a crear el widget.

## React Native

Si la aplicación integra el widget dentro de `react-native-webview`, debe propagar los esquemas al script, interceptar las URLs y validarlas antes de abrir una pantalla.

Consulta [Implementar enlaces nativos en React Native](./integraciones/react-native.md#31-enlaces-nativos-url) para ver el wrapper y el ejemplo completos. La guía de React Native enlaza de vuelta a esta página como referencia de configuración y seguridad.

## Política de seguridad

- `http:` y `https:` mantienen su comportamiento habitual y no necesitan configuración.
- Cada esquema adicional requiere opt-in explícito.
- Se aceptan hasta ocho esquemas personalizados por instancia del widget.
- Protocolos ejecutables o privilegiados como `javascript:`, `data:`, `file:` e `intent:` permanecen bloqueados aunque se declaren.
- Los esquemas de plataforma, como `tel:`, solo se habilitan si el host los declara explícitamente.

## Verificación recomendada

1. Habilita el esquema y confirma que el host recibe la URL completa.
2. Prueba tanto navegación normal como enlaces que solicitan una nueva ventana.
3. Prueba rutas e identificadores inválidos y confirma que el host los rechaza sin permitir la navegación de la WebView.
4. Verifica el comportamiento en un dispositivo real; una preview web no reproduce de forma fiable la navegación entre la WebView y una app nativa.
