---
title: Esquemas de enlaces nativos
description: Habilita enlaces de media cards hacia pantallas nativas de forma explícita y segura
slug: /widget-config/native-link-schemes
sidebar_position: 7
---

# Esquemas de enlaces nativos

`nativeLinkSchemes` permite que las media cards utilicen URLs con protocolos propios de una aplicación, por ejemplo `acme://product/123`.

Los esquemas personalizados están deshabilitados por defecto. Debes habilitar únicamente los que el host pueda interceptar y validar.

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

## Media cards y fallback conversacional

Una tarjeta puede incluir el enlace nativo y una consulta de fallback:

```html
<MC
  t="Product 123"
  url="acme://product/123"
  q=""
/>
```

El comportamiento al pulsarla es:

1. Si el host declara `acme`, la URL nativa tiene prioridad.
2. Si el host no declara `acme`, el widget descarta esa URL y utiliza `q` como siguiente consulta.
3. Un `q=""` presente utiliza el valor exacto de `t`, en este caso `Product 123`.
4. Si se omite `q` y el esquema no está habilitado, la tarjeta no tendrá una acción de fallback.

El fallback depende de la configuración, no del resultado de navegación. Si el host habilita `acme` pero después rechaza `acme://product/123`, el widget no ejecutará `q` automáticamente.

## Validación en una WebView

El host debe interceptar el enlace, validar su estructura completa y cancelar la navegación de la WebView tanto si lo acepta como si lo rechaza:

```ts
function parseAcmeProductUrl(rawUrl: string): { productId: number } | undefined {
  try {
    const url = new URL(rawUrl);
    if (url.protocol !== 'acme:' || url.hostname !== 'product') return;

    const rawProductId = url.pathname.slice(1);
    if (!/^[1-9]\d*$/.test(rawProductId)) return;

    return { productId: Number(rawProductId) };
  } catch {
    return;
  }
}

function onShouldStartLoadWithRequest({ url }: { url: string }): boolean {
  if (!/^acme:/i.test(url)) return true;

  const target = parseAcmeProductUrl(url);
  if (target) openNativeProduct(target.productId);

  return false;
}
```

Conecta el handler a la WebView que contiene el widget:

```tsx
<WebView onShouldStartLoadWithRequest={onShouldStartLoadWithRequest} />
```

La allowlist debe cubrir el esquema, la ruta, los parámetros y el formato de cada identificador. No abras una URL solo porque su protocolo coincide.

## Política de seguridad

- `http:` y `https:` mantienen su comportamiento habitual y no necesitan configuración.
- Cada esquema adicional requiere opt-in explícito.
- Se aceptan hasta ocho esquemas personalizados por instancia del widget.
- Protocolos ejecutables o privilegiados como `javascript:`, `data:`, `file:` e `intent:` permanecen bloqueados aunque se declaren.
- Los esquemas de plataforma, como `tel:`, solo se habilitan si el host los declara explícitamente.

## Verificación recomendada

1. Prueba la tarjeta sin `nativeLinkSchemes` y confirma que ejecuta el fallback `q`.
2. Habilita el esquema y confirma que el host recibe la URL completa.
3. Prueba rutas e identificadores inválidos y confirma que el host los rechaza sin permitir la navegación de la WebView.
4. Verifica el comportamiento en un dispositivo real; una preview web no reproduce de forma fiable la navegación entre la WebView y una app nativa.
