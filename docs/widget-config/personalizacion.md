---
title: Personalización del Header
sidebar_position: 3
---

# Ajustar la altura del encabezado

Para evitar que el panel flote sobre tu *navbar*, indica la altura del header.

## Opción A · Solo CSS (header fijo)

```css
:root {
  --ai-nav-height: 70px;
}

@media (min-width: 768px) {
  :root {
    --ai-nav-height: 80px;
  }
}
````

## Opción B · JavaScript (header dinámico)

```html
<script>
  (function () {
    const headerSelector = 'header'; // Ajusta si tu selector es diferente
    const header = document.querySelector(headerSelector);

    function sendHeight () {
      const h = header ? header.offsetHeight : 0;
      window.postMessage({ type: 'ai-header-height', value: h }, '*');
    }

    if (header) {
      sendHeight();
      window.addEventListener('resize', sendHeight, { passive: true });
      window.addEventListener('scroll', sendHeight, { passive: true });
      new ResizeObserver(sendHeight).observe(header);
    } else {
      console.warn('Header no encontrado con el selector:', headerSelector);
    }
  })();
</script>
```
