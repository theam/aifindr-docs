---
title: Contexto y Metadatos
description: Personaliza las respuestas del asistente enviando datos relevantes del usuario y la aplicación
slug: /widget-config/contexto-metadatos
sidebar_position: 5
---

# Contexto y Metadatos

El widget de AIFindr permite personalizar las respuestas del asistente mediante dos tipos de datos: **metadatos** (fijos) y **contexto** (dinámico).

## Diferencias clave

| Aspecto | Metadatos | Contexto |
|---------|-----------|----------|
| **¿Cuándo se define?** | En el `<script>` con `data-meta-*` o por autocaptura | Con la API JavaScript |
| **¿Se puede cambiar?** | No (inmutable) | Sí (dinámico) |
| **¿La IA lo ve?** | No (solo analíticas) | Sí (en conversaciones) |
| **Propósito** | Segmentación y métricas | Personalización de respuestas |
| **Persistencia** | Toda la sesión | Se puede actualizar en tiempo real |

## Metadatos

Los metadatos son **información fija** que defines al cargar el widget. Son como etiquetas permanentes que ayudan a segmentar y analizar el uso del asistente, pero **no afectan las respuestas** que da la IA.

### Casos de uso comunes

#### 1. Marketing y campañas (UTMs)

Los parámetros UTM son códigos que identifican de dónde vienen tus visitantes. El widget los captura de dos formas:

**Opción A: Autocaptura desde la URL** (más fácil)
```html
<!-- El widget detecta automáticamente los UTMs de la URL -->
<script
  src="https://hub.aifindr.ai/widget.js"
  data-client-id="TU_CLIENT_ID"
  defer
></script>
```

Si alguien visita: `tusitio.com?utm_source=google&utm_medium=cpc`
El widget captura automáticamente esos valores.

**Opción B: Definir UTMs fijos** (más control)
```html
<!-- Útil cuando quieres valores específicos independientes de la URL -->
<script
  src="https://hub.aifindr.ai/widget.js"
  data-client-id="TU_CLIENT_ID"
  data-meta-utm-source="google"
  data-meta-utm-medium="cpc"
  data-meta-utm-campaign="verano2025"
  defer
></script>
```

**¿Cómo funciona la autocaptura?**
- Detecta automáticamente: `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`
- Los agrupa en un objeto `utm` para fácil acceso
- Si defines valores fijos con `data-meta-utm-*`, estos tienen prioridad sobre la autocaptura

**Verificar qué se capturó:**
```js
AIFindrWidget.ready(() => {
  console.log('Metadatos capturados:', AIFindrWidget.getMetadata());
  // { utm: { source: "google", medium: "cpc" }, ... }
});
```

#### 2. Segmentación de usuarios

Usa metadatos para **clasificar usuarios** sin afectar las respuestas del chat:

**E-commerce:**
```html
<script
  src="https://hub.aifindr.ai/widget.js"
  data-client-id="TU_CLIENT_ID"
  data-meta-store="madrid-centro"
  data-meta-segment="premium"
  data-meta-ab-test="checkout-v2"
  defer
></script>
```

**SaaS/Aplicaciones:**
```html
<script
  src="https://hub.aifindr.ai/widget.js"
  data-client-id="TU_CLIENT_ID"
  data-meta-tenant="empresa-abc"
  data-meta-plan="enterprise"
  data-meta-environment="production"
  defer
></script>
```

**Identificadores de usuario (solo tracking):**
```html
<!-- Para analítica, NO para personalización -->
<script
  src="https://hub.aifindr.ai/widget.js"
  data-client-id="TU_CLIENT_ID"
  data-meta-user-id="12345"
  data-meta-account-type="premium"
  defer
></script>
```

> **Tip:** Si necesitas que la IA personalice respuestas según el usuario, usa **contexto** en lugar de metadatos (ver sección siguiente).

#### 3. Configuración y entorno

Útil para diferenciar ambientes y versiones:

```html
<script
  src="https://hub.aifindr.ai/widget.js"
  data-client-id="TU_CLIENT_ID"
  data-meta-environment="production"
  data-meta-version="2.1.0"
  data-meta-region="eu-west"
  data-meta-feature-flags="dark-mode,new-ui"
  defer
></script>
```

### Convenciones recomendadas

| Tipo de dato | Convención | Ejemplo |
|--------------|------------|---------|
| **Entorno** | `data-meta-environment` | `"production"`, `"staging"` |
| **Experimentos** | `data-meta-ab-test` | `"header-v2"`, `"checkout-flow-b"` |
| **Geografía** | `data-meta-region` | `"latam"`, `"eu-west"` |
| **Negocio** | `data-meta-segment` | `"premium"`, `"freemium"` |
| **Usuario** | `data-meta-user-id` | `"12345"`, `"abc-def-123"` |
| **UTMs (auto)** | Se capturan de la URL | `utm.source`, `utm.medium` |
| **UTMs (manual)** | `data-meta-utm-source` | `utmSource`, `utmMedium` |

### Importante: Metadatos vs Contexto

**Regla clave:** Si defines una clave como metadato, NO puedes usarla en contexto:

```js
// Si tienes: data-meta-user-id="123"
AIFindrWidget.setContext({
  userId: '456' // Se ignorará con warning
});
// Console: "userId was declared as metadata. Metadata is immutable"
```

**¿Cuándo usar cada uno?**
- **Metadatos**: Tracking, analítica, segmentación (la IA no los ve)
- **Contexto**: Personalización de respuestas (la IA sí los ve)

## Contexto

El contexto es **dinámico** y personaliza las respuestas del asistente en tiempo real.

### Métodos de gestión

#### `setContext(object)` - Reemplaza todo el contexto

```js
AIFindrWidget.ready(() => {
  AIFindrWidget.setContext({
    userId: '12345',
    userType: 'premium',
    currentPage: 'checkout',
    cartTotal: 299.99
  });
});
```

#### `mergeContext(object)` - Añade o actualiza claves

```js
// Contexto inicial
AIFindrWidget.setContext({ userId: '12345', page: 'home' });

// Actualizar solo la página
AIFindrWidget.mergeContext({ page: 'products' });

// Resultado: { userId: '12345', page: 'products' }
```

#### `getContext()` - Obtiene el contexto actual

```js
const currentContext = AIFindrWidget.getContext();
console.log('Contexto actual:', currentContext);
```

## Casos de uso por industria

### E-commerce

```js
// Contexto base del usuario
AIFindrWidget.setContext({
  userId: user.id,
  userType: user.subscription,
  currency: 'EUR',
  language: 'es',
  hasOrders: user.orderCount > 0
});

// En página de producto
AIFindrWidget.mergeContext({
  page: 'product',
  productId: product.id,
  productCategory: product.category,
  productPrice: product.price,
  inStock: product.stock > 0
});

// En carrito
AIFindrWidget.mergeContext({
  page: 'cart',
  cartItems: cart.items.length,
  cartTotal: cart.total,
  hasDiscount: cart.discount > 0
});

// En checkout
AIFindrWidget.mergeContext({
  page: 'checkout',
  checkoutStep: 'payment',
  shippingMethod: selectedShipping.type
});
```

### SaaS Dashboard

```js
// Contexto del usuario y organización
AIFindrWidget.setContext({
  userId: user.id,
  organizationId: org.id,
  role: user.role,
  plan: org.subscription.plan,
  features: org.enabledFeatures,
  onboardingCompleted: user.onboarding.completed
});

// Por sección de la app
switch (currentSection) {
  case 'dashboard':
    AIFindrWidget.mergeContext({
      section: 'dashboard',
      widgets: visibleWidgets,
      dateRange: selectedDateRange
    });
    break;
    
  case 'settings':
    AIFindrWidget.mergeContext({
      section: 'settings',
      subsection: currentTab,
      hasChanges: form.isDirty
    });
    break;
    
  case 'billing':
    AIFindrWidget.mergeContext({
      section: 'billing',
      nextBilling: subscription.nextBillingDate,
      usage: currentUsage
    });
    break;
}
```

### Plataforma de aprendizaje

```js
// Contexto del estudiante
AIFindrWidget.setContext({
  studentId: student.id,
  courseId: currentCourse.id,
  courseName: currentCourse.name,
  progress: student.progress.percentage,
  currentModule: currentModule.id,
  completedLessons: student.completedLessons.length,
  strugglingTopics: student.strugglingAreas
});

// Actualizar durante la lección
AIFindrWidget.mergeContext({
  lesson: currentLesson.id,
  lessonType: currentLesson.type, // video, quiz, reading
  timeSpent: sessionTime,
  attempts: quizAttempts
});
```

## Patrones avanzados

### Contexto jerárquico

```js
// Estructura de contexto organizativo
AIFindrWidget.setContext({
  // Nivel global
  app: {
    version: '2.1.0',
    environment: 'production',
    region: 'eu-west-1'
  },
  
  // Nivel de usuario
  user: {
    id: user.id,
    type: user.accountType,
    preferences: user.settings,
    permissions: user.permissions
  },
  
  // Nivel de sesión
  session: {
    duration: sessionLength,
    pagesVisited: visitedPages.length,
    referrer: document.referrer,
    userAgent: navigator.userAgent.includes('Mobile') ? 'mobile' : 'desktop'
  },
  
  // Nivel de página actual  
  page: {
    path: window.location.pathname,
    title: document.title,
    loadTime: performance.now()
  }
});
```

### Contexto temporal

```js
// Actualizar contexto basado en tiempo
setInterval(() => {
  AIFindrWidget.mergeContext({
    sessionDuration: Math.floor((Date.now() - sessionStart) / 1000),
    currentTime: new Date().toISOString(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  });
}, 30000); // Cada 30 segundos
```

### Contexto por interacciones

```js
// Rastrear comportamiento del usuario
document.addEventListener('click', (e) => {
  if (e.target.matches('[data-track]')) {
    AIFindrWidget.mergeContext({
      lastAction: e.target.dataset.track,
      actionTimestamp: new Date().toISOString(),
      actionContext: {
        elementType: e.target.tagName.toLowerCase(),
        elementText: e.target.textContent.trim()
      }
    });
  }
});

// Rastrear errores
window.addEventListener('error', () => {
  AIFindrWidget.mergeContext({
    hasErrors: true,
    lastError: new Date().toISOString()
  });
});
```

## Integración por tecnología

### React Hook personalizado

```tsx
// hooks/useAIFindrContext.ts
import { useEffect } from 'react';
import { useUser } from './useUser';
import { useRouter } from 'next/router';

export function useAIFindrContext() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!window.AIFindrWidget || !user) return;

    // Contexto base del usuario
    AIFindrWidget.setContext({
      userId: user.id,
      userType: user.type,
      language: user.preferences.language,
      timezone: user.timezone
    });
  }, [user]);

  useEffect(() => {
    if (!window.AIFindrWidget) return;

    // Actualizar en cambios de ruta
    AIFindrWidget.mergeContext({
      route: router.pathname,
      query: router.query,
      navigationTime: new Date().toISOString()
    });
  }, [router.pathname, router.query]);

  const updateContext = (newContext: Record<string, any>) => {
    if (window.AIFindrWidget) {
      AIFindrWidget.mergeContext(newContext);
    }
  };

  return { updateContext };
}
```

### Angular Service

```typescript
// aifindr-context.service.ts
@Injectable({ providedIn: 'root' })
export class AIFindrContextService {
  private readonly contextSubject = new BehaviorSubject<Record<string, any>>({});
  public context$ = this.contextSubject.asObservable();

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.initializeContext();
  }

  private initializeContext(): void {
    combineLatest([
      this.userService.user$,
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        startWith(null)
      )
    ]).subscribe(([user, navigationEvent]) => {
      this.updateBaseContext(user, navigationEvent);
    });
  }

  private updateBaseContext(user: any, navigation: any): void {
    const context = {
      userId: user?.id,
      userRole: user?.role,
      route: this.router.url,
      timestamp: new Date().toISOString()
    };

    if (window.AIFindrWidget) {
      AIFindrWidget.setContext(context);
      this.contextSubject.next(context);
    }
  }

  updateContext(partialContext: Record<string, any>): void {
    if (window.AIFindrWidget) {
      AIFindrWidget.mergeContext(partialContext);
      
      const currentContext = this.contextSubject.value;
      this.contextSubject.next({ ...currentContext, ...partialContext });
    }
  }
}
```

### WordPress con contexto dinámico

```php
<?php
// Contexto dinámico en WordPress
function aifindr_dynamic_context() {
    if (is_admin()) return;
    
    global $post, $current_user;
    
    $context = [
        'platform' => 'wordpress',
        'wp_version' => get_bloginfo('version'),
        'theme' => get_stylesheet(),
        'post_type' => get_post_type(),
        'is_logged_in' => is_user_logged_in()
    ];
    
    // Contexto de página
    if (is_home()) {
        $context['page_type'] = 'home';
    } elseif (is_single()) {
        $context['page_type'] = 'post';
        $context['post_id'] = get_the_ID();
        $context['categories'] = wp_get_post_categories($post->ID, ['fields' => 'names']);
    } elseif (is_page()) {
        $context['page_type'] = 'page';
        $context['page_template'] = get_page_template_slug();
    }
    
    // Contexto de usuario
    if (is_user_logged_in()) {
        $context['user_id'] = $current_user->ID;
        $context['user_roles'] = $current_user->roles;
        $context['user_registered'] = $current_user->user_registered;
    }
    
    // Contexto de WooCommerce
    if (class_exists('WooCommerce')) {
        if (is_shop()) {
            $context['wc_page'] = 'shop';
        } elseif (is_product()) {
            $context['wc_page'] = 'product';
            $context['product_id'] = get_the_ID();
            $context['product_type'] = wc_get_product()->get_type();
        } elseif (is_cart()) {
            $context['wc_page'] = 'cart';
            $context['cart_items'] = WC()->cart->get_cart_contents_count();
            $context['cart_total'] = WC()->cart->get_cart_total();
        }
    }
    ?>
    <script>
    document.addEventListener('DOMContentLoaded', function() {
        if (window.AIFindrWidget) {
            AIFindrWidget.ready(() => {
                AIFindrWidget.setContext(<?php echo json_encode($context); ?>);
            });
        }
    });
    </script>
    <?php
}
add_action('wp_footer', 'aifindr_dynamic_context');
```

## Protección de metadatos

El widget **protege automáticamente** los metadatos de ser sobrescritos por el contexto:

```js
// Si tienes metadatos: data-meta-environment="production"
AIFindrWidget.setContext({
  userId: '123',
  environment: 'development' // Ignorado con warning
});

// Console: "AIFindr Widget: "environment" was declared as metadata in data-meta-environment.
// Metadata is immutable; updateContext ignored this key."
```

## Troubleshooting

### Contexto no se actualiza

```js
// Mal: llamar antes de que esté listo
AIFindrWidget.setContext({ userId: '123' });

// Bien: esperar a que esté listo
AIFindrWidget.ready(() => {
  AIFindrWidget.setContext({ userId: '123' });
});
```

### Verificar contexto actual

```js
// Debug del contexto
console.log('Contexto actual:', AIFindrWidget.getContext());
console.log('Metadatos:', AIFindrWidget.getMetadata());

// Debug completo
console.log('Estado widget:', AIFindrWidget._debug.getState());
```

### Contexto demasiado grande

```js
// Evitar objetos muy grandes
AIFindrWidget.setContext({
  userId: '123',
  fullUserData: { /* 1000+ properties */ } // Muy pesado
});

// Mejor: solo datos relevantes
AIFindrWidget.setContext({
  userId: '123',
  userType: user.type,
  preferences: {
    language: user.lang,
    currency: user.currency
  }
});
```

### Problemas comunes con UTMs

**No veo UTMs en getMetadata():**
- Verifica que la URL realmente tenga parámetros `utm_*`
- Si defines `data-meta-utm-*`, no se creará `metadata.utm` (verás las claves namespaced como `utmSource`)
- Si defines `data-meta-utm` como string, bloquea la creación de `metadata.utm`

**Necesito "forzar" valores que vengan en la URL:**
- Declara valores fijos con `data-meta-utm-*` en el script
- Estos tendrán prioridad sobre la autocaptura de la URL

```js
// Ejemplo: Forzar valores específicos
// <script data-meta-utm-source="email" data-meta-utm-campaign="newsletter">
// Aunque la URL tenga ?utm_source=google, prevalecerá "email"
```

## Buenas prácticas

1. **UTMs**: Usa autocaptura por URL o `data-meta-utm-*` para fijarlos
2. **IDs de usuario**:
   - Metadatos (`data-meta-user-id`) para analítica y trazabilidad
   - Contexto (`userId` en setContext) para personalización de la IA
3. **Metadatos**: Para datos fijos de segmentación y analytics
4. **Contexto**: Para personalización dinámica de respuestas
5. **Inicializar temprano**: Usar `AIFindrWidget.ready()` siempre
6. **Actualizar frecuentemente**: `mergeContext()` en navegación y eventos
7. **Datos mínimos**: Solo enviar información relevante para la IA
8. **Nombres descriptivos**: Usar claves claras y consistentes
9. **No duplicar claves**: Evita usar la misma clave en metadatos y contexto
