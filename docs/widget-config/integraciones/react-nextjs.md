```ts
// lib/useAIFindr.ts
import { useEffect } from 'react';

export function useAIFindr(context?: Record<string, unknown>) {
  useEffect(() => {
    if (!window?.AIFindrWidget) return;
    window.AIFindrWidget.ready(() => {
      if (context) window.AIFindrWidget.mergeContext(context);
    });
  }, [context]);
}
````

```tsx
// pages/_app.tsx (Next.js Pages Router)
<Script
  src="https://app.aifindr.ai/widget-loader.js"
  data-client-id="mi-ecommerce"
  data-meta-channel="web"
  strategy="afterInteractive"
/>
```

*El resto del archivo es idéntico al que enviaste; sólo añadí aclaraciones de rutas y el `strategy` recomendado.*
