## Métodos avanzados

### dispatch(event, payload?)

Envía un evento personalizado al iframe del widget.

```js
AIFindrWidget.dispatch('my.custom.event', { foo: 1 });
````

### create(opts)

Crea **otra instancia** del widget —sólo para integraciones especiales (multi‑tenant en la misma SPA).

```js
const another = AIFindrWidget.create({
  clientId: 'cliente‑beta',
  triggerId: 'ai-findr-trigger-beta'
});
another.open();
```

### destroy()

Limpia listeners, Remueve el iframe y devuelve la página a su estado original.

```js
// Al cambiar de route en una SPA
router.beforeEach(() => {
  AIFindrWidget.destroy();
});
```
